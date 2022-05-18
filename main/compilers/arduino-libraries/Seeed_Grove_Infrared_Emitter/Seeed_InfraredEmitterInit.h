/*
 * IRremote
 * Version 0.1 July, 2009
 * Copyright 2009 Ken Shirriff
 * For details, see http://arcfn.com/2009/08/multi-protocol-infrared-remote-library.html
 *
 * Modified by Paul Stoffregen <paul@pjrc.com> to support other boards and timers
 *
 * Interrupt code based on NECIRrcv by Joe Knapp
 * http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1210243556
 * Also influenced by http://zovirl.com/2008/11/12/building-a-universal-remote-with-an-arduino/
 *
 * JVC and Panasonic protocol added by Kristian Lauszus (Thanks to zenwheel and other people at the original blog post)
 */

#ifndef _Seeed_Infrared_Emitter_Init_H_
#define _Seeed_Infrared_Emitter_Init_H_


#include <Arduino.h>


//Arduino Duemilanove, Diecimila, LilyPad, Mini, Fio, etc
//#define IR_USE_TIMER1   // tx = pin 9
//#define IR_USE_TIMER2   // tx = pin 3


#ifdef F_CPU
#define SYSCLOCK F_CPU     // main Arduino clock
#else
#define SYSCLOCK 16000000  // main Arduino clock
#endif

#define ERR 0
#define DECODED 1


// defines for setting and clearing register bits
#ifndef cbi
#define cbi(sfr, bit) (_SFR_BYTE(sfr) &= ~_BV(bit))
#endif
#ifndef sbi
#define sbi(sfr, bit) (_SFR_BYTE(sfr) |= _BV(bit))
#endif


#define TOLERANCE 25  // percent tolerance in measurements
#define LTOL (1.0 - TOLERANCE/100.)
#define UTOL (1.0 + TOLERANCE/100.)

#define _GAP 5000 // Minimum map between transmissions
#define GAP_TICKS (_GAP/USECPERTICK)

#define TICKS_LOW(us) (int) (((us)*LTOL/USECPERTICK))
#define TICKS_HIGH(us) (int) (((us)*UTOL/USECPERTICK + 1))


// receiver states
#define STATE_IDLE     2
#define STATE_MARK     3
#define STATE_SPACE    4
#define STATE_STOP     5

// information for the interrupt handler
typedef struct {
    uint8_t recvpin;              // pin for IR data from detector
    uint8_t rcvstate;             // state machine
    unsigned int timer;           // state timer, counts 50uS ticks.
    unsigned int rawbuf[RAWBUF];  // raw data
    uint8_t rawlen;               // counter of entries in rawbuf
} irparams_t;

// Defined in IRremote.cpp
extern volatile irparams_t irparams;

// IR detector output is active low
#define MARK  0
#define SPACE 1

#define TOPBIT 0x80000000


// defines for timer2 (8 bits)
// defined(IR_USE_TIMER2)

#define TIMER2_RESET
#define TIMER2_ENABLE_PWM     (TCCR2A |= _BV(COM2B1))
#define TIMER2_DISABLE_PWM    (TCCR2A &= ~(_BV(COM2B1)))
#define TIMER2_ENABLE_INTR    (TIMSK2 = _BV(OCIE2A))
#define TIMER2_DISABLE_INTR   (TIMSK2 = 0)
#define TIMER2_INTR_NAME      TIMER2_COMPA_vect
#define TIMER2_CONFIG_KHZ(val) ({ \
  const uint8_t pwmval = SYSCLOCK / 2000 / (val); \
  TCCR2A = _BV(WGM20); \
  TCCR2B = _BV(WGM22) | _BV(CS20); \
  OCR2A = pwmval; \
  OCR2B = pwmval / (100/10); \
})

#define TIMER2_COUNT_TOP      (SYSCLOCK * USECPERTICK / 1000000)
#if (TIMER2_COUNT_TOP < 256)
#define TIMER2_CONFIG_NORMAL() ({ \
  TCCR2A = _BV(WGM21); \
  TCCR2B = _BV(CS20); \
  OCR2A = TIMER_COUNT_TOP; \
  TCNT2 = 0; \
})
#else
#define TIMER2_CONFIG_NORMAL() ({ \
  TCCR2A = _BV(WGM21); \
  TCCR2B = _BV(CS21); \
  OCR2A = TIMER_COUNT_TOP / 8; \
  TCNT2 = 0; \
})
#endif
#define TIMER2_PWM_PIN        3



// defines for timer1 (16 bits)
// defined(IR_USE_TIMER1)
#define TIMER1_RESET
#define TIMER1_ENABLE_PWM     (TCCR1A |= _BV(COM1A1))
#define TIMER1_DISABLE_PWM    (TCCR1A &= ~(_BV(COM1A1)))

#define TIMER1_ENABLE_INTR    (TIMSK1 = _BV(OCIE1A))
#define TIMER1_DISABLE_INTR   (TIMSK1 = 0)

#define TIMER1_INTR_NAME      TIMER1_COMPA_vect

#define TIMER1_CONFIG_KHZ(val) ({ \
  const uint16_t pwmval = SYSCLOCK / 2000 / (val); \
  TCCR1A = _BV(WGM11); \
  TCCR1B = _BV(WGM13) | _BV(CS10); \
  ICR1 = pwmval; \
  OCR1A = pwmval / 3; \
})

#define TIMER1_CONFIG_NORMAL() ({ \
  TCCR1A = 0; \
  TCCR1B = _BV(WGM12) | _BV(CS10); \
  OCR1A = SYSCLOCK * USECPERTICK / 1000000; \
  TCNT1 = 0; \
})

#define TIMER1_PWM_PIN        9


#endif
