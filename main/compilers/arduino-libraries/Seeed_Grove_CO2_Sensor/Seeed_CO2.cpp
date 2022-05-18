/*
  CO2 library v1.0
  2010 Copyright (c) Seeed Technology Inc.  All right reserved.
 
  Original Author: 
  
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

#include <Arduino.h>
#include <SoftwareSerial.h>
#include "Seeed_CO2.h"


const unsigned char cmd_get_sensor[] =
{
    0xff, 0x01, 0x86, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x79
};


CO2::CO2(int Rx, int Tx)
{
	static SoftwareSerial ss(Rx, Tx);
	mySerial = &ss;
}

void CO2::Init(void)
{
	mySerial->begin(9600);
}

int CO2::Read(int command)
{
	unsigned char data[9];
    int i = 0;
 
    //transmit command data
    for(i=0; i<sizeof(cmd_get_sensor); i++)
    {
        mySerial -> write(cmd_get_sensor[i]);
    }
    delay(10);
	
    //begin reveiceing data
    if(mySerial -> available())
    {
        while(mySerial -> available())
        {
            for(int i=0;i<9; i++)
            {
                data[i] = mySerial -> read();
            }
        }
    }
	
    if((i != 9) || (1 + (0xFF ^ (byte)(data[1] + data[2] + data[3] + data[4] + data[5] + data[6] + data[7]))) != data[8])
    {
        return -1;
    }
	
	temperature = (int)data[4] - 40;
    CO2PPM = (int)data[2] * 256 + (int)data[3];

	
	if(command == GET_TEMP_CMD)return temperature;
	else if(command == GET_CO2PPM_CMD)return CO2PPM;
}
