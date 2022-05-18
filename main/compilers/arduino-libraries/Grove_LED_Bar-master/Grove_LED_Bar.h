/*
  LED bar library V2.0
  Copyright (c) 2010 Seeed Technology Inc.

  Original Author: LG

  Modify: Loovee, 2014-2-26
  User can choose which Io to be used.
  
  Modify: Long, 2015-01-07
  User can change the brightness level for each LED segment
  Rename constant to avoid name conflict
  
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
#ifndef Grove_LED_Bar_H
#define Grove_LED_Bar_H

#include <Arduino.h>

// Avoid name conflict
#define GLB_CMDMODE 0x00  // Work on 8-bit mode
#define GLB_ON      0xff  // 8-bit 1 data
#define GLB_OFF     0x00  // 8-bit 0 data

class Grove_LED_Bar
{

private:

  unsigned int __pinClock;  // Clock pin
  unsigned int __pinData;   // Data pin
  bool __greenToRed;        // Orientation (0 = red to green, 1 = green to red)
  unsigned char __state[10];// Led state, brightness for each LED

  void sendData(unsigned int data);  // Send a word to led bar
  void latchData(void);              // Load data into the latch register
  void setData(unsigned char bits[]);//Set data array

public:

  Grove_LED_Bar(unsigned char pinClock, unsigned char pinData, bool greenToRed);  // Initialize
  void begin(){pinMode(__pinClock, OUTPUT); pinMode(__pinData, OUTPUT);}
  void setGreenToRed(bool greenToRed);             // (Re)set orientation
  void setLevel(float level);                      // Set level, range from 0 to 10
  void setLed(unsigned char led, float brightness);// Set brightness for a single led, range from 0 to 1
  void toggleLed(unsigned char led);               // Toggle a single led
  void setBits(unsigned int bits);                 // Toggle leds to match given bits
  unsigned int const getBits();                    // Get the current state
};

#endif
