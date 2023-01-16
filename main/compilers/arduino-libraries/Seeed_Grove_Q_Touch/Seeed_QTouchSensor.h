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
#ifndef _SEEED_QTOUCH_SENSOR_H_
#define _SEEED_QTOUCH_SENSOR_H_

#define ADDR_QTOUCH     0x1B                    // address of QTouch


#define QTOUCH_REG_CHIPID       0x00            // read chip id
#define QTOUCH_REG_VERSION      0x01            // Firmware Version
#define QTOUCH_REG_DETSTATUS    0X02            // detection status
#define QTOUCH_REG_KEYSTATUS    0X03            // key status

#define QTOUCH_REG_SIGMSBK0      0X04            // MSByte of KEY0
#define QTOUCH_REG_SIGLSBK0      0X05            // LSByte of KEY0

#define QTOUCH_REG_REFMSBK0		18
#define QTOUCH_REG_REFLSBK0		19

#define QTOUCH_REG_NTHRK0		32
#define QTOUCH_REG_AVEASK0		39
#define QTOUCH_REG_DIK0			46

#define QTOUCH_REG_LPMODE       0X36            // low power mode
#define QTOUCH_REG_MAXDURA      0X37            // max on duration
#define QTOUCH_REG_CALIBRATE    0X38            // calibrate
#define QTOUCH_REG_RESET        0X39            // reset


class QTouch
{

public:
    
    QTouch(void);
	
	void Init(void);
	
	int QTouchRead(void)
	{
		return touchNum();
	}
	
    unsigned char isTouch(int key);                     // if certain key touched, return 1 - touched, 0 untouched
    unsigned char getState();                           // return all key state, bit0 for key0, bit1 for key1....
    int touchNum();                                     // if no touch return -1, else return key number 

	void setNTHRForKey(char nthr,char pin)
	{
		writeReg(QTOUCH_REG_NTHRK0+pin,nthr);
	}
	int getSignalForKey(char pin)
	{
		return((readReg(QTOUCH_REG_SIGMSBK0+pin)<<8)+readReg(QTOUCH_REG_SIGLSBK0+pin));
	}
 	int getRefDataForKey(char pin)
	{
		return((readReg(QTOUCH_REG_REFMSBK0+pin)<<8)+readReg(QTOUCH_REG_REFLSBK0+pin));
	}
    void setLowPowerMode(int val)                       // set low power mode
    {
        writeReg(QTOUCH_REG_LPMODE, val);
    }
    
    void reset()                                        // reset
    {
        writeReg(QTOUCH_REG_RESET, 0x55);               // write a non-zero value to reset 
    }
    
    void setMaxDuration(char val)                        // set maxim duration
    {
        writeReg(QTOUCH_REG_MAXDURA, val);
    }
    
    void calibrate()                                    // calibrate
    {
        writeReg(QTOUCH_REG_RESET, 0x55);               // write a non-zero value to re-calibrate the device
    }
    
private:

    unsigned char readReg(unsigned char addr_reg);                          // read register
    unsigned char writeReg(unsigned char addr_reg, unsigned char dta);      // write register
};


#endif
