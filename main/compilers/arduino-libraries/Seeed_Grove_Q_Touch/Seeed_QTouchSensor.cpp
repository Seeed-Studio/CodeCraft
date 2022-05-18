/*
  QTouch Library
  2014 Copyright (c) Seeed Technology Inc.  All right reserved.

  Author: ZhangKun & Loovee
  2013-3-20
  
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

#include <Wire.h>
#include <Arduino.h>
#include "Seeed_QTouchSensor.h"


QTouch::QTouch(void)
{
    
}

void QTouch::Init(void)
{
	Wire.begin();
}

// if certain key touched, return 1 - touched, 0 untouched
unsigned char QTouch::isTouch(int key)
{
    if(key>7)return 0;                  // err input
    unsigned char st = getState();
    return ((0x01<<key)&st);            // if touched return 1, else return 0
}

// return all key state, bit0 for key0, bit1 for key1....
unsigned char QTouch::getState()
{
    return readReg(0x03);
}

int QTouch::touchNum()
{
    unsigned char state = getState();
    
    if(0 == state)return -1;
    
    for(int i=0; i<7; i++)
    {
        if((state>>i) & 0x01)
        {
            return i;
        }
    }
    
    return -1;
}

// read register
unsigned char QTouch::readReg(unsigned char addr_reg)
{

    Wire.beginTransmission(ADDR_QTOUCH);
    Wire.write(addr_reg); // register to read
    Wire.endTransmission();

    Wire.requestFrom(ADDR_QTOUCH, 1); // read a byte

    while(Wire.available()) 
    {
        return Wire.read();
    }
}

// write data to register 
unsigned char QTouch::writeReg(unsigned char addr_reg, unsigned char dta)      // write register
{
    Wire.beginTransmission(ADDR_QTOUCH);
    Wire.write(addr_reg); // register to read
    Wire.write(dta);
    Wire.endTransmission();
}
