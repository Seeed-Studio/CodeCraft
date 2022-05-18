/*
 * Seeed_MiniTrackBall.cpp
 * A library for Grove - Mini Track ball v1.0
 *
 * Copyright (c) 2015 seeed technology inc.
 * Website    : www.seeed.cc
 * Author     : Fuhua.Chen & Ruibin Wu
 * Modified Time: Nov 2015
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

#ifndef _SEEED_MINITRACKBALL_H_
#define _SEEED_MINITRACKBALL_H_

#include "Arduino.h"

/*---------------------------------------------------------------------------------------//
 * define the default data
 */
#define ReadMode 0
#define WriteMode 1
#define DeAddr 0X4A
#define ConfigValid 0x3a6fb67c

/*---------------------------------------------------------------------------------------//
 * define the enum type for Register
 */
enum MOTION_REG_ADDR
{
	MOTION_REG_UP = 0X00,
	MOTION_REG_DOWN,
	MOTION_REG_LEFT,
	MOTION_REG_RIGHT,
	MOTION_REG_CONFIRM,
	MOTION_REG_NUM
};

enum CONFIG_REG_ADDR
{
	CONFIG_REG_VALID = MOTION_REG_NUM,
	CONFIG_REG_I2C_ADDR = CONFIG_REG_VALID + 4,
	CONFIG_REG_I2C_SPEED,
	CONFIG_REG_LED_MODE = CONFIG_REG_I2C_SPEED + 2,
	CONFIG_REG_LED_FLASH_TIME,
	CONFIG_REG_DATA_CLEAR_TIME = CONFIG_REG_LED_FLASH_TIME + 2,  //CONFIG_REG_LED_FLASH_TIME has 2bytes
	CONFIG_REG_DATA_READ_TIME = CONFIG_REG_DATA_CLEAR_TIME + 2,
	CONFIG_REG_NUM = CONFIG_REG_DATA_READ_TIME + 2
};


/*---------------------------------------------------------------------------------------//
 * define the LED word mode
 */
enum LED_MODE
{
	LED_FLASH_1 = 0X00,
	LED_FLASH_2,
	LED_FLASH_TOGGLE,
	LED_FLASH_ALL,
	LED_ALWAYS_ON_1,
	LED_ALWAYS_ON_2, 
	LED_ALWAYS_ON_ALL,
	LED_ALWAYS_OFF,
	LED_BREATHING_1,
	LED_BREATHING_2,
	LED_BREATHING_ALL,
	LED_MOVE_FLASH,
	LED_MODE_NUM
};

#define MOTION_UP_EVENT			1
#define MOTION_DOWN_EVENT		2
#define MOTION_LEFT_EVENT		3
#define MOTION_RIGHT_EVENT		4
#define MOTION_CONFIRM_EVENT	5


class MiniTrackBall
{
public:  
	
	int Available(void)
	{
		unsigned char track_data_new[5];
		
		GetTrackData(track_data_new);
		
		if(track_data_new[0] != track_data[0] || track_data_new[1] != track_data[1] || \
		   track_data_new[2] != track_data[2] || track_data_new[3] != track_data[3] || \
		   track_data_new[4] != track_data[4])
		{
			track_data[0] = track_data_new[0];
			track_data[1] = track_data_new[1];
			track_data[2] = track_data_new[2];
			track_data[3] = track_data_new[3];
			track_data[4] = track_data_new[4];
			
			return 1;
		}
		return 0;
	}
	
	int miniTrackBallRead(int data)
	{
		switch(data)
		{
			case MOTION_UP_EVENT:
			return track_data[0];
			
			case MOTION_DOWN_EVENT:
			return track_data[1];
			
			case MOTION_LEFT_EVENT:
			return track_data[2];
			
			case MOTION_RIGHT_EVENT:
			return track_data[3];
			
			case MOTION_CONFIRM_EVENT:
			return track_data[4];
		}
	}

private:
	void SetLedMode(uint8_t LED_MODE);
	void SetDefault(void);
	void GetTrackData(uint8_t data[]);
	
	void WriteByte(uint8_t Reg, uint8_t Value);
	void WriteNByte(uint8_t Reg , uint8_t * Value , uint8_t len);
	void WriteOneWord(uint8_t Reg, uint32_t Value);
	void WriteHalfWord(uint8_t Reg, uint16_t Value);

	uint8_t ReadByte(uint8_t Reg);
	uint16_t ReadHalfWord(uint8_t Reg);
	uint32_t ReadOneWord(uint8_t Reg);
	
	void test_SetLedMode(void);
	void test_WriteReg(void);
	void test_SetDefault(void);
	
	unsigned char track_data[5];
};


#endif
