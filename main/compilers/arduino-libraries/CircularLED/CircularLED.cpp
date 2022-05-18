/*
 2012 Copyright (c) Seeed Technology Inc.

 Author: LG
  
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
 Foundation, Inc.,51 Franklin St,Fifth Floor, Boston, MA 02110-1301 USA

*/



#include "CircularLED.h"
#include <Arduino.h>

unsigned int CmdMode=0b0000000000000000;

CircularLED::CircularLED( int data,  int clk)
{
_data= data;
_clk = clk;
//if ((0<=_data)&&(_data<=7))
//{
 pinMode(_data, OUTPUT);  
 pinMode(_clk, OUTPUT);  
 PORT_Data = portOutputRegister(digitalPinToPort(_data));
 PORT_Clk = portOutputRegister(digitalPinToPort(_clk));
 if ((0<=_data)&&(_data<=7))
{
	BIT_Data = (0x01<<(_data));
}
else if ((8<=_data)&&(_data<=13))
{
	BIT_Data = (0x01<<(_data-8));
}
else
{
	BIT_Data = (0x01<<(_data-14));
}
if ((0<=_clk)&&(_clk<=7))
{
	BIT_Clk= (0x01<<(_clk));
}
else if ((8<=_clk)&&(_clk<=13))
{
	BIT_Clk = (0x01<<(_clk-8));
}
else
{
	BIT_Clk = (0x01<<(_clk-14));
}

 //PORT_Data = &PORTD;
// BIT_Data = (0x01<<(_data));
//}
/*
else if ((8<=_data)&&(_data<=13))
{
 DDR_Data = &DDRB;
 PORT_Data = &PORTB;
 BIT_Data = (0x01<<(_data-8));
}
else
{
 DDR_Data = &DDRC;
 PORT_Data = &PORTC;
 BIT_Data = (0x01<<(_data-14));
}
/*
#if ((0<=_clk)&&(_clk<=7))
#define DDR_Clk  DDRD
#define PORT_Clk  PORTD
#define BIT_Clk  (0x01<<(_clk))

# else if ((8<=_clk)&&(_clk<=13))
#define DDR_Clk  DDRB
#define PORT_Clk  PORTB
#define BIT_Clk  (0x01<<(_clk-8))

#else 
#define DDR_Clk  DDRC
#define PORT_Clk  PORTC
#define BIT_Clk  (0x01<<(_clk-14))
*/	
}

void CircularLED::Sent16bit(unsigned int data)
{
   for(unsigned char i=0;i<16;i++)
  {
    if(data&0x8000)
      *PORT_Data |= BIT_Data;
    else
      *PORT_Data &=~ BIT_Data;

    *PORT_Clk ^= BIT_Clk;
    data <<= 1;
	
  }
}
void CircularLED::CircularLEDWrite(unsigned int data[24])
{
  //DDR_Data |= BIT_Data;
  //DDR_Clk |= BIT_Clk;
  pinMode(_data, OUTPUT);  
  pinMode(_clk, OUTPUT);  
  //PORT_Data &=~ BIT_Data;
  //PORT_Clk &=~ BIT_Clk;
  unsigned char count=0;
  Sent16bit(CmdMode);  
  for(count=0;count<12;count++)
  {
    Sent16bit(data[count]);
  }
  Sent16bit(CmdMode);  
  for(count=12;count<24;count++)
  {
    Sent16bit(data[count]);  
  }
  Latch();
}
void CircularLED::ClearDisplay()
{
  unsigned char i=0;
  unsigned char f=0;
  Sent16bit(CmdMode);  
  *PORT_Data &=~ BIT_Data;
  for(i=0;i<192;i++)
  {
    *PORT_Clk ^= BIT_Clk;
	
  }
  Sent16bit(CmdMode);  
  *PORT_Data &=~ BIT_Data;
  for(i=0;i<192;i++)
  {
    *PORT_Clk ^= BIT_Clk;
	
  }
  Latch();
  
}

void CircularLED::Latch(void)
{
  *PORT_Data &=~ BIT_Data;

  delayMicroseconds(10);
  for(unsigned char i=0;i<8;i++)
  {
    *PORT_Data ^= BIT_Data;
  } 
}
//CircularLED circularLED;
