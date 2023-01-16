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

#include <stdlib.h>
#include "Seeed_GPS.h"
#include <SoftwareSerial.h>


static uint8_t NMEA_CMD = NMEA_NULL;
static uint8_t NMEA_CMD_Buff[] = "$GPxxx,";
static uint8_t NMEA_CMD_Index = 0;
static bool NMEA_CMD_Parsered = 0;
static uint8_t NMEA_DAT_Block = 0;
static uint8_t NMEA_DAT_BlockIndex = 0;
static bool NMEA_CMD_Start = 0;
static bool ReciveFlag = 0;

static uint8_t ucTempA = 0;
static uint8_t SateInfoIndex = 0;

uint8_t SBUF;
uint8_t buffer[64];
stru_GPSRMC GPS_RMC_Data;
stru_GPSGGA GPS_GGA_Data;
stru_GPSGSA GPS_GSA_Data;
stru_GPSGSV GPS_GSV_Data;


GPS::GPS(int Rx, int Tx)
{
	static SoftwareSerial ss(Rx, Tx);
	mySerial = &ss; 
}

void GPS::Init(void)
{
	mySerial->begin(9600);
}

int GPS::Available(void)
{
	int i,j;
	
	memset(buffer, 0, sizeof(buffer));
	if(mySerial->available())
	{
		while(mySerial->available())
		{
			buffer[i++] = mySerial->read();
			if(i == sizeof(buffer))break;
		}
		//Serial.write(buffer, i); 
		for(j=0;j<i;j++)
		{
			SBUF = buffer[j];
			gps_parser();
		}
	}
	if(gps_recive_ok())
	{
		gps_data_convert();
		/*
		Serial.print(GPS_RMC_Data.UTCDateTime[0]);
		Serial.print("-");
		Serial.print(GPS_RMC_Data.UTCDateTime[1]);
		Serial.print("-");
		Serial.print(GPS_RMC_Data.UTCDateTime[2]);
		Serial.print(" ");
		Serial.print(GPS_RMC_Data.UTCDateTime[3]);
		Serial.print(":");
		Serial.print(GPS_RMC_Data.UTCDateTime[4]);
		Serial.print(":");
		Serial.println(GPS_RMC_Data.UTCDateTime[5]);
		*/
		return 1;
	}
	return 0;
}

float GPS::GPS_X() // longitude -180 ~ +180, '-' -> W, '+' -> E
{
	float longitude;
	longitude = atof((const char *)GPS_RMC_Data.Longitude);
	//if(GPS_RMC_Data.NS == 'N')longitude = longitude * (-1);
	if(GPS_RMC_Data.NS == 'S')longitude = longitude * (-1);
	return longitude;
	
}

float GPS::GPS_Y() // latitude -90 ~ +90, '-' -> S, '+' -> N
{
	float latitude;
	latitude = atof((const char *)GPS_RMC_Data.Latitude);
	//if(GPS_RMC_Data.EW == 'E')latitude = latitude * (-1);
	if(GPS_RMC_Data.EW == 'W')latitude = latitude * (-1);
	return latitude;
}

float GPS::GPS_Z() // altitude
{
	return atof((const char *)GPS_GGA_Data.Altitude);
}
	
void GPS::gps_sate_data_init(void)
{
    uint8_t i;
    for(i=0;i<12;i++)
    {
        GPS_GSV_Data.SatInfo[i].SatID=0x00;
        GPS_GSA_Data.HDOP[0]=0x01;
        GPS_GSA_Data.HDOP[1]=0x01;
        GPS_GSA_Data.HDOP[2]=0x01;
        GPS_GSA_Data.HDOP[3]=0x01;
    }
}

bool GPS::gps_recive_ok(void)
{
    if (ReciveFlag)
    {
        ReciveFlag=0;
        return 1;
    }
    else
    {
        return 0;
    }
}

void GPS::gps_data_convert(void)
{
	int8_t i;
	uint32_t Data;

	Data = 0;
	for(i=2;i<9;i++)
	{
		if(i == 4)continue;
		Data = Data * 10 + GPS_RMC_Data.Latitude[i] - '0';
	}

	Data = Data * 5 / 3;

	GPS_RMC_Data.Latitude[2] = '.';

	for(i=8;i>2;i--)
	{
		GPS_RMC_Data.Latitude[i] = Data % 10 + '0';
		Data = Data / 10;
	}

	Data = 0;
	for(i=2;i<10;i++)
	{
		if(i == 5)continue;
		Data = Data * 10 + GPS_RMC_Data.Longitude[i] - '0';
	}

	Data = Data * 5 / 3;

	GPS_RMC_Data.Longitude[3] = '.';
	for(i=9;i>3;i--)
	{
		GPS_RMC_Data.Longitude[i] = Data % 10 + '0';
		Data = Data / 10;
	}
}

void GPS::ParserGPGGA(void)
{
    switch(SBUF)
    {
        case '*':
            NMEA_CMD_Start=0;
            break;
        case ',':
            NMEA_DAT_Block++;
            NMEA_DAT_BlockIndex=0;
            break;
        default:
            switch(NMEA_DAT_Block)
            {

                case 5:
                    GPS_GGA_Data.PositionFix=SBUF;
                    break;
                case 6:
                    GPS_GGA_Data.SatUsed[NMEA_DAT_BlockIndex]=SBUF;
                    break;

                    case 8:
                    GPS_GGA_Data.Altitude[NMEA_DAT_BlockIndex]=SBUF;
                    break;
            }
            NMEA_DAT_BlockIndex++;
    }
}

void GPS::ParserGPRMC(void)
{
    switch(SBUF)
    {
        case '*':
            NMEA_CMD_Start=0;
            ReciveFlag=1;
            break;
        case ',':
            NMEA_DAT_Block++;
            NMEA_DAT_BlockIndex=0;
            break;
        default:
            switch(NMEA_DAT_Block)
            {
                case 0:
                    switch(NMEA_DAT_BlockIndex)
                    {
                        case 0:
                        case 2:
                        case 4:
                            ucTempA=SBUF-'0';
                            break;
                        case 1:
                            GPS_RMC_Data.UTCDateTime[3]=ucTempA*10+SBUF-'0';
                            break;
                        case 3:
                            GPS_RMC_Data.UTCDateTime[4]=ucTempA*10+SBUF-'0';
                            break;
                        case 5:
                            GPS_RMC_Data.UTCDateTime[5]=ucTempA*10+SBUF-'0';
                            break;
                    }
                    break;
                case 1:
                    GPS_RMC_Data.Status=SBUF;
                    break;
                case 2:
                    GPS_RMC_Data.Latitude[NMEA_DAT_BlockIndex]=SBUF;
                    break;
                case 3:
                    GPS_RMC_Data.NS=SBUF;
                    break;
                case 4:
                    GPS_RMC_Data.Longitude[NMEA_DAT_BlockIndex]=SBUF;
                    break;
                case 5:
                    GPS_RMC_Data.EW=SBUF;
                    break;
                case 6:
                    GPS_RMC_Data.Speed[NMEA_DAT_BlockIndex]=SBUF;
                    break;
                case 7:
                    GPS_RMC_Data.Course[NMEA_DAT_BlockIndex]=SBUF;
                    break;
                case 8:
                    switch(NMEA_DAT_BlockIndex)
                    {
                        case 0:
                        case 2:
                        case 4:
                            ucTempA=SBUF-'0';
                            break;
                        case 1:
                            GPS_RMC_Data.UTCDateTime[2]=ucTempA*10+SBUF-'0';
                            break;
                        case 3:
                            GPS_RMC_Data.UTCDateTime[1]=ucTempA*10+SBUF-'0';
                            break;
                        case 5:
                            GPS_RMC_Data.UTCDateTime[0]=ucTempA*10+SBUF-'0';
                            break;
                    }
                    break;
            }
            NMEA_DAT_BlockIndex++;
    }
}

void GPS::ParserGPGSA(void)
{
    switch(SBUF)
    {
        case '*':
            NMEA_CMD_Start=0;
            break;
        case ',':
            NMEA_DAT_Block++;
            NMEA_DAT_BlockIndex=0;
            if((NMEA_DAT_Block>=2)||(NMEA_DAT_Block<=13))
                GPS_GSA_Data.SatUsedList[NMEA_DAT_Block-2]=0x00;
            break;
        default:
            switch(NMEA_DAT_Block)
            {
                case 0:
                    GPS_GSA_Data.Mode=SBUF;
                    break;
                case 1:
                    GPS_GSA_Data.Mode2=SBUF;
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                    switch(NMEA_DAT_BlockIndex)
                    {
                        case 0:
                            ucTempA=SBUF-'0';
                            break;
                        case 1:
                            GPS_GSA_Data.SatUsedList[NMEA_DAT_Block-2]=ucTempA*10+SBUF-'0';
                            break;
                    }
                    break;
                case 14:
                    GPS_GSA_Data.PDOP[NMEA_DAT_BlockIndex]=SBUF;
                    break;
                case 15:
                    GPS_GSA_Data.HDOP[NMEA_DAT_BlockIndex]=SBUF;
                    break;
                case 16:
                    GPS_GSA_Data.VDOP[NMEA_DAT_BlockIndex]=SBUF;
                    break;
                }
            NMEA_DAT_BlockIndex++;
    }
}

void GPS::ParserGPGSV(void)
{
    switch(SBUF)
    {
        case '*':
            NMEA_CMD_Start=0;
            break;
        case ',':
            NMEA_DAT_Block++;
            NMEA_DAT_BlockIndex=0;
            break;
        default:
            switch(NMEA_DAT_Block)
            {

                case 1:
                    if (SBUF=='1') SateInfoIndex=0;
                    break;
                case 2:
                    switch(NMEA_DAT_BlockIndex)
                    {
                        case 0:
                            ucTempA=SBUF-'0';
                            break;
                        case 1:
                            GPS_GSV_Data.SatInView=ucTempA*10+SBUF-'0';
                            break;
                    }
                    break;
                case 3:
                case 7:
                case 11:
                case 15:
                    switch(NMEA_DAT_BlockIndex)
                    {
                        case 0:
                            ucTempA=SBUF-'0';
                            break;
                        case 1:
                            GPS_GSV_Data.SatInfo[SateInfoIndex].SatID=ucTempA*10+SBUF-'0';
                            GPS_GSV_Data.SatInfo[SateInfoIndex].SNR=0x00;
                            SateInfoIndex++;
                            break;
                    }
                    break;

                case 6:
                case 10:
                case 14:
                case 18:
                    switch(NMEA_DAT_BlockIndex)
                    {
                        case 0:
                            ucTempA=SBUF-'0';
                            break;
                        case 1:
                            GPS_GSV_Data.SatInfo[SateInfoIndex-1].SNR=ucTempA*10+SBUF-'0';
                            break;
                    }
                    break;
             }
        NMEA_DAT_BlockIndex++;
    }
}

void GPS::gps_parser(void)
{
    if(NMEA_CMD_Start)
    {
        if(NMEA_CMD_Parsered)
        {
            switch(NMEA_CMD)
            {
                case NMEA_GPGGA:
                    ParserGPGGA();
                    break;
                case NMEA_GPGSA:
                    ParserGPGSA();
                    break;
                case NMEA_GPGSV:
                    ParserGPGSV();
                    break;
                case NMEA_GPRMC:
                    ParserGPRMC();
                    break;
                default:
                    NMEA_CMD=NMEA_NULL;
                    NMEA_CMD_Parsered=0;
                    NMEA_CMD_Index=1;
                    NMEA_CMD_Start=0;
            }
        }
        else
        {
            switch(SBUF)
            {
                case ',':
                    if(NMEA_CMD_Buff[4]=='G'&&NMEA_CMD_Buff[5]=='A') NMEA_CMD=NMEA_GPGGA;
                    if(NMEA_CMD_Buff[4]=='S'&&NMEA_CMD_Buff[5]=='A') NMEA_CMD=NMEA_GPGSA;
                    if(NMEA_CMD_Buff[5]=='V') NMEA_CMD=NMEA_GPGSV;
                    if(NMEA_CMD_Buff[5]=='C') NMEA_CMD=NMEA_GPRMC;
                    NMEA_CMD_Parsered=1;
                    NMEA_CMD_Index=1;
                    NMEA_DAT_Block=0;
                    NMEA_DAT_BlockIndex=0;
                    break;
                case '*':
                    NMEA_CMD_Start=0;
                    break;
                default:
                    NMEA_CMD_Buff[NMEA_CMD_Index]=SBUF;
                    NMEA_CMD_Index++;
                    if(NMEA_CMD_Index>6) NMEA_CMD_Start=0;
            }
        }
    }
    else
    {
        if (SBUF=='$')
        {
            NMEA_CMD_Buff[0]=SBUF;
            NMEA_CMD_Start=1;
            NMEA_CMD_Index=1;
            NMEA_CMD_Parsered=0;
            NMEA_CMD=NMEA_NULL;
            NMEA_DAT_Block=0;
            NMEA_DAT_BlockIndex=0;
        }
    }
}
