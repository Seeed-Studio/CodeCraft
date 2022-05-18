/*
 * Seeed_I2CTouchSensor.cpp
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

#include "Seeed_I2CTouchSensor.h"
#include "mpr121.h"
#include <Wire.h>


I2CTouch::I2CTouch(void)
{
	_irqPin = 0xffff;
}

I2CTouch::I2CTouch(int pin)
{
	_irqPin = pin;
}

void I2CTouch::Init(void)
{
	Wire.begin();
	mpr121_setup();
	if(_irqPin != 0xffff)pinMode(_irqPin, INPUT);
}

void I2CTouch::mpr121_setup()
{      
	// Section A - Controls filtering when data is > baseline.   
	set_register(0x5A, MHD_R, 0x01);    
	set_register(0x5A, NHD_R, 0x01);   
	set_register(0x5A, NCL_R, 0x00);   
	set_register(0x5A, FDL_R, 0x00);       

	// Section B - Controls filtering when data is < baseline.    
	set_register(0x5A, MHD_F, 0x01);    
	set_register(0x5A, NHD_F, 0x01);    
	set_register(0x5A, NCL_F, 0xFF);    
	set_register(0x5A, FDL_F, 0x02);       

	// Section C - Sets touch and release thresholds for each electrode    
	set_register(0x5A, ELE0_T, TOU_THRESH);    
	set_register(0x5A, ELE0_R, REL_THRESH);       
	set_register(0x5A, ELE1_T, TOU_THRESH);    
	set_register(0x5A, ELE1_R, REL_THRESH);       
	set_register(0x5A, ELE2_T, TOU_THRESH);   
	set_register(0x5A, ELE2_R, REL_THRESH);        
	set_register(0x5A, ELE3_T, TOU_THRESH);   
	set_register(0x5A, ELE3_R, REL_THRESH);      
	set_register(0x5A, ELE4_T, TOU_THRESH);    
	set_register(0x5A, ELE4_R, REL_THRESH);       
	set_register(0x5A, ELE5_T, TOU_THRESH);    
	set_register(0x5A, ELE5_R, REL_THRESH);        
	set_register(0x5A, ELE6_T, TOU_THRESH);    
	set_register(0x5A, ELE6_R, REL_THRESH);       
	set_register(0x5A, ELE7_T, TOU_THRESH);   
	set_register(0x5A, ELE7_R, REL_THRESH);       
	set_register(0x5A, ELE8_T, TOU_THRESH);    
	set_register(0x5A, ELE8_R, REL_THRESH);        
	set_register(0x5A, ELE9_T, TOU_THRESH);    
	set_register(0x5A, ELE9_R, REL_THRESH);       
	set_register(0x5A, ELE10_T, TOU_THRESH);   
	set_register(0x5A, ELE10_R, REL_THRESH);        
	set_register(0x5A, ELE11_T, TOU_THRESH);   
	set_register(0x5A, ELE11_R, REL_THRESH);       

	// Section D   
	// Set the Filter Configuration  
	// Set ESI2    
	set_register(0x5A, FIL_CFG, 0x04);   
	//set_register(0x5A,ATO_CFGU, 0xC9);  // USL = (Vdd-0.7)/vdd*256 = 0xC9 @3.3V   mpr121Write(ATO_CFGL, 0x82);	// LSL = 0.65*USL = 0x82 @3.3V
	//set_register(0x5A,ATO_CFGL, 0x82);  // Target = 0.9*USL = 0xB5 @3.3V
	//set_register(0x5A,ATO_CFGT,0xb5);
	//set_register(0x5A,ATO_CFG0, 0x1B);
	// Section E   
	// Electrode Configuration    
	// Set ELE_CFG to 0x00 to return to standby mode    
	set_register(0x5A, ELE_CFG, 0x0C);  // Enables all 12 Electrodes        
	// Section F   
	// Enable Auto Config and auto Reconfig    
	/*
	set_register(0x5A, ATO_CFG0, 0x0B);     
	set_register(0x5A, ATO_CFGU, 0xC9);  // USL = (Vdd-0.7)/vdd*256 = 0xC9 @3.3V  
	set_register(0x5A, ATO_CFGL, 0x82);  // LSL = 0.65*USL = 0x82 @3.3V    
	set_register(0x5A, ATO_CFGT, 0xB5);  // Target = 0.9*USL = 0xB5 @3.3V
	*/  
}

boolean I2CTouch::checkInterrupt()
{   
	return digitalRead(_irqPin);
}

void I2CTouch::set_register(int address, unsigned char r, unsigned char v)
{    
	Wire.beginTransmission(address);    
	Wire.write(r);   
	Wire.write(v);   
	Wire.endTransmission();
}

void I2CTouch::readTouchInputs()
{   
	if(!checkInterrupt())
	{               
		//read the touch state from the MPR121        
		Wire.requestFrom(0x5A,2);                 
		byte LSB = Wire.read();       
		byte MSB = Wire.read();
		
		uint16_t touched = ((MSB << 8) | LSB); //16bits that make up the touch states
		
		for(int i=0; i < 12; i++)// Check what electrodes were pressed
		{              
			if(touched & (1<<i))
			{                           
				_touchStates[i] = 1;               
			}
			else
			{                            
				_touchStates[i] = 0;          
			}                   
		}           
	}
}

void I2CTouch::getTouchState() 
{  
	Wire.requestFrom(0x5A,2);
	byte LSB = Wire.read();
	byte MSB = Wire.read();
	touched= ((MSB<<8)|LSB);
}
