/*
 * Seeed_GPS.h
 * A library for Grove - GPS
 *
 * Copyright (c) 2015 seeed technology inc.
 * Website    : www.seeed.cc
 * Author     : JY.W
 * Modified Time: 2016-01-20
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
 
#ifndef _Seeed_GPS_H_
#define _Seeed_GPS_H_

#include "Arduino.h"
#include <SoftwareSerial.h>


#define NMEA_NULL     0x00
#define NMEA_GPGGA    0x01
#define NMEA_GPGSA    0x02
#define NMEA_GPGSV    0x04
#define NMEA_GPRMC    0x08

#define GPS_SCAN_ID				0 // 4 bytes
#define GPS_SCAN_SIZE			4

#define GPS_UTC_DATE_TIME_ID	1 // 6 bytes
#define GPS_UTC_DATE_TIME_SIZE  6

#define GPS_STATUS_ID			2 // 1 byte
#define GPS_STATUS_SIZE			1

#define GPS_LATITUDE_ID			3 // 9 bytes
#define GPS_LATITUDE_SIZE		9

#define GPS_NS_ID				4 // 1 byte
#define GPS_NS_SIZE				1

#define GPS_LONGITUDE_ID		5 // 10 bytes
#define GPS_LONGITUDE_SIZE		10

#define GPS_EW_ID				6 // 1 byte
#define GPS_EW_SIZE				1

#define GPS_SPEED_ID			7 // 5 bytes
#define GPS_SPEED_SIZE			5

#define GPS_COURSE_ID			8 // 5 bytes
#define GPS_COURSE_SIZE			5

#define GPS_POSITION_FIX_ID		9 // 1 byte
#define GPS_POSITION_FIX_SIZE	1

#define GPS_SATE_USED_ID		10 // 2 bytes
#define GPS_SATE_USED_SIZE		2

#define GPS_ALTITUDE_ID			11 // 7 bytes
#define GPS_ALTITUDE_SIZE		7

#define GPS_MODE_ID				12 // 1 byte
#define GPS_MODE_SIZE			1

#define GPS_MODE2_ID			13 // 1 byte
#define GPS_MODE2_SIZE			1

#define GPS_SATE_IN_VIEW_ID		14 // 1 byte
#define GPS_SATE_IN_VIEW_SIZE	1


typedef struct
{
	uint8_t UTCDateTime[6]; // YMDHMS
	uint8_t Status;         // A/V
	uint8_t Latitude[9];    // ddmm.mmmm
	uint8_t NS;             // N/S
	uint8_t Longitude[10];  // dddmm.mmmm
	uint8_t EW;             // E/W
	uint8_t Speed[5];       // 000.0~999.9 Knots
	uint8_t Course[5];      // 000.0~359.9
}stru_GPSRMC;

typedef struct
{
	//uint8_t UTCTime[10];    // hhmmss.mmm
	//uint8_t Latitude[9];    // ddmm.mmmm
	//uint8_t NS;             // N/S
	//uint8_t Longitude[10];  // dddmm.mmmm
	//uint8_t EW;             // E/W
	uint8_t PositionFix;      // 0,1,2,6
	uint8_t SatUsed[2];       // 00~12
	//uint8_t HDOP[4];        // 0.5~99.9
	uint8_t Altitude[7];      // -9999.9~99999.9
}stru_GPSGGA;

typedef struct
{
	uint8_t Mode;            // A/M
	uint8_t Mode2;           // 0,1,2,3
	uint8_t SatUsedList[12];
	uint8_t PDOP[4];
	uint8_t HDOP[4];
	uint8_t VDOP[4];
}stru_GPSGSA;

typedef struct
{
	uint8_t SatID;
	//uint8_t Elevation[2]; // 0-90 degree
	//uint8_t Azimuth[3];   // 0-359 degree
	uint8_t SNR;            // 0-99 dbHz
}stru_SatInfo;

typedef struct
{
	uint8_t SatInView;
    stru_SatInfo SatInfo[12];
}stru_GPSGSV;


class GPS
{
public:
	GPS(int Rx, int Tx);
	void Init(void);
	int Available(void);
	float GPS_X();
	float GPS_Y();
	float GPS_Z();
	
	void gps_sate_data_init(void);
	void gps_parser(void);
	bool gps_recive_ok(void);
	void gps_data_convert(void);
	
	void ParserGPGGA(void);
	void ParserGPRMC(void);
	void ParserGPGSA(void);
	void ParserGPGSV(void);

	
private: 
	SoftwareSerial *mySerial;
	
};


#endif