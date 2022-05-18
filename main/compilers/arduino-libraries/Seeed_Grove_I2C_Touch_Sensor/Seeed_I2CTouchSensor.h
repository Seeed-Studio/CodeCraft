/*
 * Seeed_I2CTouchSensor.h
 * A library for Grove-Guesture 1.0
 *
 * Copyright (c) 2015 seeed technology inc.
 * Website    : www.seeed.cc
 * Author     : JY.W
 * Modified Time: 2016-01-18
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#ifndef _SEEED_I2C_TOUCH_SENSOR_H_
#define _SEEED_I2C_TOUCH_SENSOR_H_

#include "Arduino.h"
#include <Wire.h>


class I2CTouch 
{    
public:
	I2CTouch(void);
	I2CTouch(int pin);
	
	void Init(void); 
	int I2CTouchRead(int CH)
	{
		getTouchState();
		if(touched & (1 << CH))return 1;
		else return 0;
	}

	
	void readTouchInputs();   
	void  getTouchState();    
	
	
private:
	int _irqPin;    
	boolean _touchStates[12];
	uint16_t touched; 
	
	void mpr121_setup();   
	boolean checkInterrupt();   
	void set_register(int address, unsigned char r, unsigned char v);
};


#endif
