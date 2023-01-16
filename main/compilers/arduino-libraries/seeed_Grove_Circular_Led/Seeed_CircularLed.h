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

#ifndef _Seeed_Circular_Led_H_
#define _Seeed_Circular_Led_H_

#include "Arduino.h"


class CircularLedClass
{
public:
	/**
	*  \brief Initialize circular led.
	*
	*  \param [in] data the data pin number of circular led.
	*  \param [in] clk the clk pin number of circular led.
	*
	*/
	CircularLedClass(int data, int clk);
	
	/**
	*  \brief Write dispaly data to circular led.
	*
	*  \param [in] data the buffer of display data.
	*
	*/
	void WriteData(unsigned int data[24]);
	
	/**
	*  \brief Clear circular led display.
	*
	*/
	void ClearDisplay(void);
    
    CircularLedClass(){};
    
    void CircularLedWriteData(int clk, int data, int number)
    {
        int i;
        unsigned int LED[24] = {0};
        
        _clk = clk;
        _data = data;

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
        
        if(number >= 12)number = 12;
        else if(number <= -12)number = -12;
        
        if(number > 0)
        {
            for(i = 0;i < 12; i ++)LED[i] = 0;   
            for(i = 0;i < number; i ++)LED[i + 12] = 0xff;             
        }
        else if(number < 0)
        {
            number = number * (-1);
            for(i = 12;i < 24; i ++)LED[i] = 0;
            for(i = 0;i < number; i ++)LED[i + 12 - number] = 0xff; 
        }

        WriteData(LED);
    }
    

private:
	void Sent16bit(unsigned int data);
	void Latch(void);

	volatile uint8_t *PORT_Data;
	volatile uint8_t *PORT_Clk;
    
    uint8_t _clk;
	uint8_t _data;

	uint8_t BIT_Data;
	uint8_t BIT_Clk;
};


#endif;
