/*
  Hercules_Stepper.cpp
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
#include <Arduino.h>
#include <SparkFunMiniMoto.h>  // Include the MiniMoto library

#include "Hercules_Stepper.h"

// Create two MiniMoto instances, with different address settings.
MiniMoto motorA(0xC4); // A1 = 1, A0 = clear
MiniMoto motorB(0xC0); // A1 = 1, A0 = 1 (default)

/*
 *   constructor for four-pin version
 *   Sets which wires should control the motor.
 */
stepper_4wd::stepper_4wd(int number_of_steps)
{

    this->step_number = 0;      // which step the motor is on
    this->direction   = 0;      // motor direction
    this->number_of_steps = number_of_steps;    // total number of steps for this motor


    // pin_count is used by the stepMotor() method:
    this->pin_count = 4;

}

/*
  Sets the speed in revs per minute
*/
void stepper_4wd::setSpeed(long rpm_start, long rpm_max)
{
    this->delay_max_speed = 60L * 1000L *1000L / this->number_of_steps / rpm_max;
    this->delay_start_speed = 60L * 1000L * 1000L/ this->number_of_steps / rpm_start;
}

/*
  Moves the motor steps_to_move steps.  If the number is negative,
   the motor moves in the reverse direction.
 */
#define SPD_BUFF_STEPS        100

void stepper_4wd::step(int steps_to_move)
{

    int steps_left = abs(steps_to_move);  // how many steps to take
    int steps_orig = steps_left;
    int steps_buffer = SPD_BUFF_STEPS;

    if (steps_orig < steps_buffer*2)
    steps_buffer = steps_left/2;

    float delays = this->delay_start_speed;
    float delay_minus = (delays - this->delay_max_speed)/SPD_BUFF_STEPS;

    // determine direction based on whether steps_to_mode is + or -:
    if (steps_to_move > 0) {this->direction = 1;}
    if (steps_to_move < 0) {this->direction = 0;}

    // decrement the number of steps, moving one step each time:
    while(steps_left > 0) {
        delayMicroseconds(delays);
        if (this->direction == 1) {
            this->step_number++;
            if (this->step_number == this->number_of_steps) {
                this->step_number = 0;
            }
        }
        else {
            if (this->step_number == 0) {
                this->step_number = this->number_of_steps;
            }
            this->step_number--;
        }
        // decrement the steps left:
        steps_left--;
        if ((steps_orig - steps_left) <= steps_buffer)
        delays -= delay_minus;
        else if (steps_left <= steps_buffer)
        delays += delay_minus;

        // step the motor to step number 0, 1, 2, or 3:
        stepMotor(this->step_number % 4);
    }

}

/*
 * Moves the motor forward or backwards.
 */
void stepper_4wd::stepMotor(int thisStep)
{
    if (this->pin_count == 4) {
        switch (thisStep) {
            case 0:    // 1010
          /*  digitalWrite(motor_pin_a_plus, HIGH);
            digitalWrite(motor_pin_a_minus, LOW);
            digitalWrite(motor_pin_b_plus, HIGH);
            digitalWrite(motor_pin_b_minus, LOW);
            */
            motorA.drive(100);
            motorB.drive(100);
            
            
            break;
            case 1:    // 0110
            /*digitalWrite(motor_pin_a_plus, LOW);
            digitalWrite(motor_pin_a_minus, HIGH);
            digitalWrite(motor_pin_b_plus, HIGH);
            digitalWrite(motor_pin_b_minus, LOW);
            */
            motorA.drive(-100);
            motorB.drive(100);
            
            break;
            case 2:    //0101
            digitalWrite(motor_pin_a_plus, LOW);
            digitalWrite(motor_pin_a_minus, HIGH);
            digitalWrite(motor_pin_b_plus, LOW);
            digitalWrite(motor_pin_b_minus, HIGH);
            
            motorA.drive(-100);
            motorB.drive(-100);
            
            break;
            case 3:    //1001
            digitalWrite(motor_pin_a_plus, HIGH);
            digitalWrite(motor_pin_a_minus, LOW);
            digitalWrite(motor_pin_b_plus, LOW);
            digitalWrite(motor_pin_b_minus, HIGH);
            
            motorA.drive(100);
            motorB.drive(-100);
            
            break;
            default:
            digitalWrite(motor_pin_a_plus, 0);
            digitalWrite(motor_pin_a_minus, 0);
            digitalWrite(motor_pin_b_plus, 0);
            digitalWrite(motor_pin_b_minus, 0);
            
            motorA.drive(0);
            motorB.drive(0);
            
            break;
        }
    }
}
