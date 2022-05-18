/*
  LED bar library V2.0
  Copyright (c) 2010 Seeed Technology Inc.

  Original Author: LG

  Modify: Loovee, 2014-2-26
  User can choose which Io to be used.

  The MIT License (MIT)

  Copyright (c) 2013 Seeed Technology Inc.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

#include "Grove_LED_Bar.h"

Grove_LED_Bar::Grove_LED_Bar(unsigned char pinClock, unsigned char pinData, bool greenToRed)
{
  __pinClock = pinClock;
  __pinData = pinData;
  __greenToRed = greenToRed;  // ascending or decending

  for (byte i = 0; i < 10; i++)
    __state[i] = 0x00;  // persist state so individual leds can be toggled

  pinMode(__pinClock, OUTPUT);
  pinMode(__pinData, OUTPUT);
}


// Send the latch command
void Grove_LED_Bar::latchData()
{
  digitalWrite(__pinData, LOW);
  delayMicroseconds(10);

  for (unsigned char i = 0; i < 4; i++)
  {
    digitalWrite(__pinData, HIGH);
    digitalWrite(__pinData, LOW);
  }
}


// Send 16 bits of data
void Grove_LED_Bar::sendData(unsigned int data)
{
  unsigned int state = 0;
  for (unsigned char i = 0; i < 16; i++)
  {
    unsigned int state1 = (data & 0x8000) ? HIGH : LOW;
    digitalWrite(__pinData, state1);

    //state = digitalRead(__pinClock) ? LOW : HIGH;
    state = 1-state;
    digitalWrite(__pinClock, state);

    data <<= 1;
  }
}


// Change the orientation
// Green to red, or red to green
void Grove_LED_Bar::setGreenToRed(bool greenToRed)
{
  __greenToRed = greenToRed;

  setData(__state);
}


// Set level (0-10)
// Level 0 means all leds off
// Level 10 means all leds on
// Level 4.5 means 4 LEDs on and the 5th LED's half on
void Grove_LED_Bar::setLevel(float level)
{
  level = max(0.0F, min(10.0F, level));
  level *= 8; // there are 8 (noticable) levels of brightness on each segment

  // Place number of 'level' of 1-bits on __state
  for (byte i = 0; i < 10; i++) {
    __state[i] = (level > 8) ? ~0 :
                 (level > 0) ? ~(~0 << byte(level)) : 0;

    level -= 8;
  };

  setData(__state);
}


// Set a single led
// led (1-10)
// brightness (0-1)
void Grove_LED_Bar::setLed(unsigned char led, float brightness)
{
  led = max(1, min(10, (int) led));
  brightness = max(0.0F, min(brightness, 1.0F));

  // Zero based index 0-9 for bitwise operations
  led--;

  // 8 (noticable) levels of brightness
  // 00000000 darkest
  // 00000011 brighter
  // ........
  // 11111111 brightest
  __state[led] = ~(~0 << (unsigned char) (brightness*8));

  setData(__state);
}


// Toggle a single led
// led (1-10)
void Grove_LED_Bar::toggleLed(unsigned char led)
{
  led = max(1, min(10, (int) led));

  // Zero based index 0-9 for bitwise operations
  led--;

  __state[led] = __state[led] ? 0 : ~0;

  setData(__state);
}

// each element in the state will hold the brightness level
// 00000000 darkest
// 00000011 brighter
// ........
// 11111111 brightest
void Grove_LED_Bar::setData(unsigned char __state[])
{

  sendData(GLB_CMDMODE);

  for (unsigned char i = 0; i < 10; i++)
  {
    if (__greenToRed)
    {
	  // Go backward on __state
      sendData(__state[10-i-1]);
    }
    else
    {
	  // Go forward on __state
      sendData(__state[i]);
    }
  }

  // Two extra empty bits for padding the command to the correct length
  sendData(0x00);
  sendData(0x00);

  latchData();
}

void Grove_LED_Bar::setBits(unsigned int bits)
{

  for (unsigned char i = 0; i < 10; i++)
  {

    if ((bits % 2) == 1)
      __state[i] = 0xFF;
    else
      __state[i] = 0x00;
    bits /= 2;
  }

  setData(__state);
}


// Return the current bits
unsigned int const Grove_LED_Bar::getBits()
{
  unsigned int __bits = 0x00;
  for (unsigned char i = 0; i < 10; i++)
  {
    if (__state[i] != 0x0)
        __bits |= (0x1 << i);
  }
  return __bits;
}
