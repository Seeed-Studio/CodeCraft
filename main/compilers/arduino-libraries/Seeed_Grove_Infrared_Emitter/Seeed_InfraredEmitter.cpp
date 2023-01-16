/*
 * IRremote
 * Version 0.11 August, 2009
 * Copyright 2009 Ken Shirriff
 * For details, see http://arcfn.com/2009/08/multi-protocol-infrared-remote-library.html
 *
 * Modified by Paul Stoffregen <paul@pjrc.com> to support other boards and timers
 * Modified  by Mitra Ardron <mitra@mitra.biz> 
 * Added Sanyo and Mitsubishi controllers
 * Modified Sony to spot the repeat codes that some Sony's send
 * 
 * Modifier by
 * Interrupt code based on NECIRrcv by Joe Knapp
 * http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1210243556
 * Also influenced by http://zovirl.com/2008/11/12/building-a-universal-remote-with-an-arduino/
 *
 * JVC and Panasonic protocol added by Kristian Lauszus (Thanks to zenwheel and other people at the original blog post)
 */

#include "Seeed_InfraredEmitter.h"
#include "Seeed_InfraredEmitterInit.h"


int timer_define = 0;


InfraredEmitter::InfraredEmitter(int senPin)
{
	_pin = senPin;
}

void InfraredEmitter::Init(void)
{
	if(_pin == 3)timer_define = 2;
	else if(_pin == 9)timer_define = 1;
	
}

void InfraredEmitter::InfraredEmitterWrite(unsigned char *idata)
{
	unsigned char ifreq = 38;	
	int len = 5 + strlen((const char*)idata);
	unsigned char datalen    = strlen((const char*)idata);
    unsigned int start_high = 179;
    unsigned int start_low  = 90;
    unsigned int nshort     = 11;
    unsigned int nlong      = 33;
    
    unsigned int *pSt = (unsigned int *)malloc((4+datalen*16)*sizeof(unsigned int));

    if(NULL == pSt)
    {
#if __DEBUG
        Serial.println("not enough place!!\r\n");
#endif
        exit(1);
    }

#if __DEBUG
    Serial.println("begin to send ir:\r\n");
    Serial.print("ifreq = ");Serial.println(ifreq);
    Serial.print("len = ");Serial.println(len);
    Serial.print("start_high = ");Serial.println(start_high);
    Serial.print("start_low = ");Serial.println(start_low);
    Serial.print("nshort = ");Serial.println(nshort);
    Serial.print("nlong = ");Serial.println(nlong);
    Serial.print("datalen = ");Serial.println(datalen);
#endif

    pSt[0] = start_high*50;
    pSt[1] = start_low*50;

    for(int i = 0; i<datalen; i++)
    {
        for(int j = 0; j<8; j++)
        {
            if(idata[i] & 0x01<<(7-j))
            {
                pSt[16*i + 2*j + 2] = nshort*50;
                pSt[16*i + 2*j+3]   = nlong*50;
            }
            else
            {
                pSt[16*i + 2*j+2]   = nshort*50;
                pSt[16*i + 2*j+3]   = nshort*50;
            }
        }
    }

    pSt[2+datalen*16]   = nshort*50;
    pSt[2+datalen*16+1] = nshort*50;

#if __DEBUG
    for(int i = 0; i<4+datalen*16; i++)
    {
        Serial.print("pSt is ");Serial.print(pSt[i]);Serial.print("\t");
    }
    Serial.println();
#endif
    sendRaw(pSt, 4+datalen*16, ifreq);
    free(pSt);
}

void InfraredEmitter::sendRaw(unsigned int buf[], int len, int hz)
{
	enableIROut(hz);

	for(int i = 0; i < len; i++)
	{
		if(i & 1)
		{
			space(buf[i]);
		} 
		else
		{
			mark(buf[i]);
		}
	}
	
	space(0); // Just to be sure
}

void InfraredEmitter::mark(int time)
{
	// Sends an IR mark for the specified number of microseconds.
	// The mark output is modulated at the PWM frequency.
	if(timer_define == 1)
		TIMER1_ENABLE_PWM;
	else if(timer_define == 2)
		TIMER2_ENABLE_PWM;
	delayMicroseconds(time);
}

/* Leave pin off for time (given in microseconds) */
void InfraredEmitter::space(int time)
{
	// Sends an IR space for the specified number of microseconds.
	// A space is no output, so the PWM output is disabled.
	if(timer_define == 1)
		TIMER1_DISABLE_PWM;
	else if(timer_define == 2)
		TIMER2_DISABLE_PWM;
	delayMicroseconds(time);
}

void InfraredEmitter::enableIROut(int khz)
{
	// Enables IR output.  The khz value controls the modulation frequency in kilohertz.
	// The IR output will be on pin 3 (OC2B).
	// This routine is designed for 36-40KHz; if you use it for other values, it's up to you
	// to make sure it gives reasonable results.  (Watch out for overflow / underflow / rounding.)
	// TIMER2 is used in phase-correct PWM mode, with OCR2A controlling the frequency and OCR2B
	// controlling the duty cycle.
	// There is no prescaling, so the output frequency is 16MHz / (2 * OCR2A)
	// To turn the output on and off, we leave the PWM running, but connect and disconnect the output pin.
	// A few hours staring at the ATmega documentation and this will all make sense.
	// See my Secrets of Arduino PWM at http://arcfn.com/2009/07/secrets-of-arduino-pwm.html for details.

	// Disable the Interrupt (which is used for receiving IR)
	if(timer_define == 1)
	{
		TIMER1_DISABLE_INTR;
		pinMode(TIMER1_PWM_PIN, OUTPUT);
		digitalWrite(TIMER1_PWM_PIN, LOW);
		TIMER1_CONFIG_KHZ(khz);
		TIMER1_ENABLE_PWM;
	}
	else if(timer_define == 2)
	{
		TIMER2_DISABLE_INTR;
		pinMode(TIMER2_PWM_PIN, OUTPUT);
		digitalWrite(TIMER2_PWM_PIN, LOW);
		TIMER2_CONFIG_KHZ(khz);
		TIMER2_ENABLE_PWM;
	}	
}
