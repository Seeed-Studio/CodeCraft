/*
 * Seeed_Gesture.cpp
 * A library for Grove - Mini I2C Motor Driver
 *
 * Copyright (c) 2015 seeed technology inc.
 * Website    : www.seeed.cc
 * Author     : Loovee && JY.W
 * Modified Time: 2016-04-21
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

#ifndef _Seeed_I2C_Mini_Motor_Driver_SW_H_
#define _Seeed_I2C_Mini_Motor_Driver_SW_H_

#include <Arduino.h>


#define DELAY i2c_delay

#define __Debug        1                      // debug mode


#define  GETACK        1                      // get ack                        
#define  GETNAK        0                      // get nak   
   
#ifndef  HIGH        
#define  HIGH          1
#endif
#ifndef  LOW
#define  LOW           0
#endif

#define uchar unsigned char


class SoftwareI2C
{
private:
    
    int pinSda;
    int pinScl;
    
    int recv_len;
    
private:
    
    void sdaSet(uchar ucDta); 
    void sclSet(uchar ucDta);                                                                   
    void i2c_delay(void);          

    void sendStart(void);
    void sendStop(void);
    uchar getAck(void);
    void sendByte(uchar ucDta);
    uchar sendByteAck(uchar ucDta);                                 // send byte and get ack
    
public:
    
    void begin(int Sda, int Scl); 
    uchar beginTransmission(uchar addr);
    void endTransmission();
    
    uchar write(uchar dta);
    uchar write(uchar len, uchar *dta);
    uchar requestFrom(uchar addr, uchar len);
    uchar read();

};

extern SoftwareI2C Wire;


// I2C support constants
#define I2C_READ    0x01 // I2C read bit set

// Fault constants
#define FAULT 0x01
#define ILIMIT 0x10
#define OTS 0x08
#define UVLO 0x04
#define OCP 0x02


class MiniMoto
{
public:
    MiniMoto(byte addr);
	
    void drive(int speed);
    void stop();
    void brake();
    byte getFault();
	
private:
    void I2CWriteBytes(byte addr, byte *buffer, byte len);
    void I2CReadBytes(byte addr, byte *buffer, byte len);
    byte _addr;
};


#define MOTER_ADDR_0	0xC4
#define MOTER_ADDR_1	0xC0


class MiniI2CMotorDriver
{
public:
	MiniI2CMotorDriver(void);
	void Driver(int motor,int Deve);
	
private:
	MiniMoto *motor0;
	MiniMoto *motor1;
};

#endif