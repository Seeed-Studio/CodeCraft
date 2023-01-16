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

#ifndef _Seeed_CO2_H_
#define _Seeed_CO2_H_

#include "Arduino.h"
#include <SoftwareSerial.h>

#define GET_TEMP_CMD	0
#define GET_CO2PPM_CMD	1

class CO2
{
public:	

	CO2(int Rx, int Tx);
	void Init(void);
	int Read(int command);
	
private:

	int temperature;
	int CO2PPM;
	SoftwareSerial *mySerial;
};


#endif
