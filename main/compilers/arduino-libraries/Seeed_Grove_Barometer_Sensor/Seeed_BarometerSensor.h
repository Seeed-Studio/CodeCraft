/*
 * Barometer.h
 * A library for barometer
 *
 * Copyright (c) 2012 seeed technology inc.
 * Website    : www.seeed.cc
 * Author     : LG
 * Create Time:
 * Change Log :
 *
 * loovee 9-24-2014
 * Change all int to short, all unsigned int to unsigned short to fit some 32bit system
 *
 * The MIT License (MIT)
 *
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
#ifndef _SEEED_BAROMETER_SENSOR_H_
#define _SEEED_BAROMETER_SENSOR_H_

#include <Arduino.h>
#include <Wire.h>


#define BMP085_ADDRESS 0x77

#define GET_TEMPERATURE_CMD			0
#define GET_PRESSURE_CMD			1
#define GET_RALATED_ATMOSPHERE_CMD	2
#define GET_ALTITUDE_CMD			3

const unsigned char OSS = 0;

class Barometer
{
public:
	Barometer(void);
	
    void Init(void);
	float BarometerRead(int Type)
	{
		float temperature;
		float pressure;
		float atm;
		float altitude;

		switch(Type)
		{
			case GET_TEMPERATURE_CMD:
				temperature = bmp085GetTemperature(bmp085ReadUT());
				return temperature;
			break;
			
			case GET_PRESSURE_CMD:
				pressure = bmp085GetPressure(bmp085ReadUP());
				return pressure;
			break;
			
			case GET_RALATED_ATMOSPHERE_CMD:
				pressure = bmp085GetPressure(bmp085ReadUP());
				atm = pressure / 101325;
				return atm;
			break;
			
			case GET_ALTITUDE_CMD:
				pressure = bmp085GetPressure(bmp085ReadUP());
				altitude = calcAltitude(pressure);
				return altitude; 
			break;
		}
	}
	
    long PressureCompensate;
    float bmp085GetTemperature(unsigned short ut);
    long bmp085GetPressure(unsigned long up);
    float calcAltitude(float pressure);
    unsigned short bmp085ReadUT(void);
    unsigned long bmp085ReadUP(void);

private:
    short ac1;
    short ac2;
    short ac3;
    unsigned short ac4;
    unsigned short ac5;
    unsigned short ac6;
    short b1;
    short b2;
    short mb;
    short mc;
    short md;
    char bmp085Read(unsigned char address);
    short bmp085ReadInt(unsigned char address);
    void writeRegister(short deviceAddress, byte address, byte val);
    short readRegister(short deviceAddress, byte address);
};


#endif
