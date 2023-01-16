/*
 * IRremote
 * Version 0.1 July, 2009
 * Copyright 2009 Ken Shirriff
 * For details, see http://arcfn.com/2009/08/multi-protocol-infrared-remote-library.htm http://arcfn.com
 * Edited by Mitra to add new controller SANYO
 *
 * Interrupt code based on NECIRrcv by Joe Knapp
 * http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1210243556
 * Also influenced by http://zovirl.com/2008/11/12/building-a-universal-remote-with-an-arduino/
 *
 * JVC and Panasonic protocol added by Kristian Lauszus (Thanks to zenwheel and other people at the original blog post)
 */

#ifndef _Seeed_Infrared_Emitter_H_
#define _Seeed_Infrared_Emitter_H_


// len, start_H, start_L, nshort, nlong, data_len, data[data_len]....
#define D_LEN       0
#define D_STARTH    1
#define D_STARTL    2
#define D_SHORT     3
#define D_LONG      4
#define D_DATALEN   5
#define D_DATA      6


#define USECPERTICK 50  // microseconds per clock interrupt tick
#define RAWBUF 300 // Length of raw duration buffer

#define __DEBUG     0


// main class for receiving IR
class InfraredEmitter
{   
public:
	
	InfraredEmitter(int senPin);
	void Init(void);
	void InfraredEmitterWrite(unsigned char *idata);
	
private:

    void sendRaw(unsigned int buf[], int len, int hz);
    void mark(int usec);
    void space(int usec);
	void enableIROut(int khz);
	
	int _pin;
};


#endif
