/*
  acc_adxl345_Arduino.h
  
  For Arduino Only

  2014 Copyright (c) Seeed Technology Inc.  All right reserved.
  
  Loovee
  2013-4-1

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

#ifndef __ACC_ADXL345_ARDUINO_H__
#define __ACC_ADXL345_ARDUINO_H__


#include <Wire.h>
#include <Arduino.h>
#include <Suli.h>

#include "ACC_Adxl345_Suli.h"

class Acc_Adxl345{

public:


    void begin()
    {
        Wire.begin();
        acc_adxl345_init(&Wire);
    }
    
    void get(float *ax, float *ay, float *az)
    {
        acc_adxl345_read_acc(ax, ay, az);
    }
    
    void get(float *axyz)
    {
        acc_adxl345_read_acc_buff(axyz);
    }

};

#endif