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

#include <Arduino.h>
#include "Seeed_MiniI2CMotorDriverSW.h"


/*************************************************************************************************
 * Function Name: begin
 * Description:  config IO
 * Parameters: Sda: Scl:
 * Return: none
*************************************************************************************************/
void SoftwareI2C::begin(int Sda, int Scl)
{
    pinSda = Sda;
    pinScl = Scl;

    pinMode(pinScl, OUTPUT);
    pinMode(pinSda, OUTPUT);
    digitalWrite(pinScl, HIGH);
    digitalWrite(pinSda, HIGH);

}

/*************************************************************************************************
 * Function Name: sdaSet
 * Description:  set sda
 * Parameters: ucDta: HIGH or LOW
 * Return: none
*************************************************************************************************/
void SoftwareI2C::sdaSet(uchar ucDta)
{
    pinMode(pinSda, OUTPUT);
    digitalWrite(pinSda, ucDta);
    DELAY();
}

/*************************************************************************************************
 * Function Name: sclSet
 * Description:  set scl
 * Parameters: ucDta: HIGH or LOW
 * Return: none
*************************************************************************************************/
void SoftwareI2C::sclSet(uchar ucDta)
{
    digitalWrite(pinScl, ucDta);
    DELAY();
}

/*************************************************************************************************
 * Function Name: i2c_delay
 * Description:  delay 1 us
 * Parameters: None
 * Return: None
*************************************************************************************************/
void SoftwareI2C::i2c_delay(void)
{
    delayMicroseconds(1);
}

/*************************************************************************************************
 * Function Name: getAck
 * Description:  get ack
 * Parameters: None
 * Return: 0 – Nak; 1 – Ack
*************************************************************************************************/
uchar SoftwareI2C::getAck(void)
{
    unsigned int ntime = 50000;

    sclSet(LOW); 
    pinMode(pinSda, INPUT);
    digitalWrite(pinSda, HIGH);
    sclSet(HIGH);
    while(ntime--)
    {
        if(!digitalRead(pinSda))                                // get ack
        {
            DELAY();
            return GETACK;
        }
    }

    if(ntime<1)
    {
#if __Debug
        Serial.println("get nak");
#endif
    }
    return GETNAK;
}

/*************************************************************************************************
 * Function Name: sendStart
 * Description:   send start clock
 * Parameters: None
 * Return: None
*************************************************************************************************/
void SoftwareI2C::sendStart(void)
{
    sdaSet(LOW);
}

/*************************************************************************************************
 * Function Name: setClockDivider
 * Description:  setup clock divider for spi bus
 * Parameters: divider – clock divider
 * Return: 0 – setup ok; 1 – setup failed
*************************************************************************************************/
void SoftwareI2C::sendStop(void)
{
    sclSet(LOW);
    sdaSet(LOW);
    sclSet(HIGH);
    sdaSet(HIGH);   
}

/*************************************************************************************************
 * Function Name: sendByte
 * Description:  send a byte
 * Parameters: ucDta: data to send
 * Return: None
*************************************************************************************************/
void SoftwareI2C::sendByte(uchar ucDta)
{
    for(int i=0; i<8; i++)
    {
        sclSet(LOW);
        sdaSet((ucDta&0x80)!=0);
        ucDta = ucDta<<1;
        sclSet(HIGH);
    }
}

/*************************************************************************************************
 * Function Name: sendByteAck
 * Description:  send a byte and get ack signal
 * Parameters: ucDta: data to send
 * Return: 0: get nak  1: get ack
*************************************************************************************************/
uchar SoftwareI2C::sendByteAck(uchar ucDta)
{
    sendByte(ucDta);
    return getAck();
}

/*************************************************************************************************
 * Function Name: beginTransmission
 * Description:  send begin signal
 * Parameters: divider – clock divider
 * Return: 0: get nak  1: get ack
*************************************************************************************************/
uchar SoftwareI2C::beginTransmission(uchar addr)
{
    sendStart();                       // start signal
    uchar ret = sendByteAck(addr<<1);       // send write address and get ack
    sclSet(LOW);
    return ret;
}

/*************************************************************************************************
 * Function Name: endTransmission
 * Description:  send stop signal
 * Parameters: None
 * Return: None
*************************************************************************************************/
void SoftwareI2C::endTransmission()
{
    sendStop();   
}

/*************************************************************************************************
 * Function Name: write
 * Description:  send a byte
 * Parameters: dta: data to send
 * Return: 0: get nak  1: get ack
*************************************************************************************************/  
uchar SoftwareI2C::write(uchar dta)
{
    return sendByteAck(dta);
}

/*************************************************************************************************
 * Function Name: write
 * Description:  write array
 * Parameters: len - length of the array
               *dta - array to be sent
 * Return: 0: get nak  1: get ack
*************************************************************************************************/
uchar SoftwareI2C::write(uchar len, uchar *dta)
{
    for(int i=0; i<len; i++)
    {
        if(GETACK != write(dta[i]))
        {
            return GETNAK;
        }
    }
    
    return GETACK;
}

/*************************************************************************************************
 * Function Name: requestFrom
 * Description:  request data from slave
 * Parameters: addr - address of slave
               len  - length of request
 * Return: 0: get nak  1: get ack
*************************************************************************************************/
uchar SoftwareI2C::requestFrom(uchar addr, uchar len)
{
    sendStart();                       // start signal
    recv_len = len;
    uchar ret = sendByteAck((addr<<1)+1);       // send write address and get ack
    sclSet(LOW);
    return ret;
}

/*************************************************************************************************
 * Function Name: read
 * Description:  read a byte from i2c
 * Parameters: None
 * Return: data get
*************************************************************************************************/
uchar SoftwareI2C::read()
{
    if(-1 == recv_len)return 0;

    unsigned  char  ucRt = 0;
    unsigned  char  i;
    
    for(int i=0; i<8; i++)
    {
        unsigned  char  ucBit;
        sclSet(LOW);
        
        pinMode(pinSda, INPUT);
        digitalWrite(pinSda, HIGH);
        sclSet(HIGH);
        ucBit = digitalRead(pinSda);
        ucRt = (ucRt << 1) + ucBit;
    }  
    uchar dta = ucRt;
    recv_len--;

    if(recv_len>0)
    {
        sclSet(LOW);                                                // sclSet(HIGH)    
        sdaSet(LOW);                                                // sdaSet(LOW)                 
        sclSet(HIGH);                                               // sclSet(LOW)  
        sclSet(LOW);        
    }
    else
    {
        sclSet(LOW);                                                // sclSet(HIGH)    
        sdaSet(LOW);                                                // sdaSet(LOW)                 
        sclSet(HIGH);                                               // sclSet(LOW) 
        sendStop();
        recv_len=-1;
    }
    delayMicroseconds(100);
    return dta;
}

SoftwareI2C Wire;


// The address of the part is set by a jumper on the board. 
//  See datasheet or schematic for details; default is 0xD0.
MiniMoto::MiniMoto(byte addr)
{
  _addr = (addr >> 1);
  Wire.begin(6, 5);
}

// Return the fault status of the DRV8830 chip. Also clears any existing faults.
byte MiniMoto::getFault()
{
  byte buffer = 0;
  byte clearFault = 0x80;
  I2CReadBytes(0x01, &buffer, 1);
  I2CWriteBytes(0x01, &clearFault, 1);
  return buffer;
}

// Send the drive command over I2C to the DRV8830 chip. Bits 7:2 are the speed
//  setting; range is 0-63. Bits 1:0 are the mode setting:
//  - 00 = HI-Z
//  - 01 = Reverse
//  - 10 = Forward
//  - 11 = H-H (brake)
void MiniMoto::drive(int speed)
{
  byte regValue = 0x80;             // Before we do anything, we'll want to
                                    //  clear the fault status. To do that
                                    //  write 0x80 to register 0x01 on the
                                    //  DRV8830.
  I2CWriteBytes(0x01, &regValue, 1); // Clear the fault status.
  regValue = (byte)abs(speed);      // Find the byte-ish abs value of the input
  if (regValue > 63) regValue = 63; // Cap the value at 63.
  regValue = regValue<<2;           // Left shift to make room for bits 1:0
  if (speed < 0) regValue |= 0x01;  // Set bits 1:0 based on sign of input.
  else           regValue |= 0x02;
  
  I2CWriteBytes(0x00, &regValue, 1);  
}

// Coast to a stop by hi-z'ing the drivers.
void MiniMoto::stop()
{
  byte regValue = 0;                // See above for bit 1:0 explanation.
  
  I2CWriteBytes(0x00, &regValue, 1); 
}

// Stop the motor by providing a heavy load on it.
void MiniMoto::brake()
{
  byte regValue = 0x03;                // See above for bit 1:0 explanation.
  
  I2CWriteBytes(0x00, &regValue, 1); 
}

// Private function that reads some number of bytes from the accelerometer.
void MiniMoto::I2CReadBytes(byte addr, byte *buffer, byte len)
{
    Wire.beginTransmission(_addr);
    Wire.requestFrom(addr, len);
    Wire.beginTransmission(_addr | I2C_READ);
    for(byte i = 0; i < len; i ++)
    buffer[i] = Wire.read();   
}

void MiniMoto::I2CWriteBytes(byte addr, byte *buffer, byte len)
{
    Wire.beginTransmission(_addr);
    Wire.write(addr);
    Wire.write(len, buffer);
    Wire.endTransmission();
}

MiniI2CMotorDriver::MiniI2CMotorDriver(void)
{
	static MiniMoto motor_0(MOTER_ADDR_0);
	static MiniMoto motor_1(MOTER_ADDR_1);
	
	motor0 = &motor_0;
	motor1 = &motor_1;
}

void MiniI2CMotorDriver::Driver(int motor,int Deve)
{
	if(motor == 0)
	{
		if(Deve == 0)motor0 -> stop();
		else if(Deve == -1)motor0 -> brake();
		else motor0 -> drive(Deve);
	}
	else if(motor == 1)
	{
		if(Deve == 0)motor1 -> stop();
		else if(Deve == -1)motor1 -> brake();
		else motor1 -> drive(Deve);
	}
}
	