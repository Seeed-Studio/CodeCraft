/*
  Hercules_Stepper.h
  2012 Copyright (c) Seeed Technology Inc.  All right reserved.
 
  Author: Jack Shao
  
  Modify: Loovee
  
  ChangeLog:
  
  2014-6-27
  
  - Change name to Hercules.h, add pwm_lvc to the local folder
  - Add Stepper control
  
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


#ifndef __HERCULES_STEPPER_H__
#define __HERCULES_STEPPER_H__


// library interface description
class stepper_4wd {

public:
    // constructors:
    stepper_4wd(int number_of_steps);

    // speed setter method:
    void setSpeed(long rpm_start, long rpm_max);

    // mover method:
    void step(int number_of_steps);


private:
  
    void stepMotor(int this_step);
    
    int direction;                              // Direction of rotation
    unsigned long delay_max_speed;              // delay between steps, in us, based on speed
    unsigned long delay_start_speed;            // delay at startup,in us
    int number_of_steps;                        // total number of steps this motor can take
    int pin_count;                              // whether you're driving the motor with 2 or 4 pins
    int step_number;                            // which step the motor is on
    
    // motor pin numbers:
    int motor_pin_a_plus;
    int motor_pin_a_minus;
    int motor_pin_b_plus;
    int motor_pin_b_minus;
};

#endif