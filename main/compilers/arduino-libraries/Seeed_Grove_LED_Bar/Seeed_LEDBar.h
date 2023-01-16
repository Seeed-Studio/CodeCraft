/*
  LED bar library V2.0
  2010 Copyright (c) Seeed Technology Inc.  All right reserved.

  Original Author: LG

  Modify: Loovee, 2014-2-26
  User can choose which Io to be used.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
/*
  Modify: Long, 2015-01-07
  User can change the brightness level for each LED segment
  Rename constant to avoid name conflict
*/

#ifndef _Seeed_LED_Bar_H_
#define _Seeed_LED_Bar_H_


#include <Arduino.h>


// Avoid name conflict
#define GLB_CMDMODE 0x00  // Work on 8-bit mode
#define GLB_ON      0xff  // 8-bit 1 data
#define GLB_OFF     0x00  // 8-bit 0 data


class LEDBarClass
{
public:
	
	LEDBarClass(int pinData, int pinClock);
    
	void Init(void);
    
	void SetLevel(float level);
    
    LEDBarClass(){};
    
    void LEDBarWriteData(int data, int clk, int number)
    {
        __pinClock = clk;
        __pinData = data;
        
        pinMode(__pinClock, OUTPUT);  
        pinMode(__pinData, OUTPUT);
        
        if(number >= 10)number = 10;
        
        SetLevel(number);
    }
    
private:

	int __pinClock;  // Clock pin
	int __pinData;   // Data pin
	bool __greenToRed;        // Orientation (0 = red to green, 1 = green to red)
	unsigned char __state[10];// Led state, brightness for each LED

	void sendData(unsigned int data);  // Send a word to led bar
	void latchData(void);              // Load data into the latch register
	void setData(unsigned char bits[]);//Set data array
	
	void setGreenToRed(bool greenToRed);
	void setLed(unsigned char led, float brightness);
	void toggleLed(unsigned char led);
	void setBits(unsigned int bits);
	unsigned int const getBits();
};


#endif