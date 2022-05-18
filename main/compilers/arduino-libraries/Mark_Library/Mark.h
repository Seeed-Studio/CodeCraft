/*!
 * @file Mark.h
 *
 * This is part of Mark's driver for the Arduino uno platform.  It is
 * designed specifically to work with the MARK products that use chaihuo technology.
 *
 * These chips use I2C to communicate, 2 pins (SCL+SDA) are required
 * to interface with the board.
 *
 * CH invests time and resources providing this open source code,
 * please support CH and open-source hardware by purchasing
 * products from CH!
 *
 * Written by Dean Miller for CH Industries.
 *
 * BSD license, all text here must be included in any redistribution.
 *
 */

#ifndef LIB_MARK_H
#define LIB_MARK_H

#include "Arduino.h"

#include <Wire.h>

/*=========================================================================
    I2C ADDRESS/BITS
    -----------------------------------------------------------------------*/
#define MARK_ADDRESS                (0x58) ///< Default MARK I2C address
/*=========================================================================*/
#define SERVO_MAX_ANGLE     180

#define I2C_CMD_SET_SERVO_ANGLE 0x02 // set angle of servo

#define I2C_CMD_WHEEL_RUN       0x03 //
#define I2C_CMD_WHEEL_MOTION    0x04 //

#define I2C_CMD_MOTOR_LEFT_RUN  0x05 //
#define I2C_CMD_MOTOR_RIGHT_RUN 0x06 //

#define I2C_CMD_MODE_CHG        0x08 //
#define I2C_CMD_DRIVE_RUN       0x09 //

#define I2C_CMD_SET_MOTOR_PWM   0x0A //
#define I2C_CMD_SET_DRIVE_STEP  0x0B //
#define I2C_CMD_SET_DRIVE_RPM   0x0C //

#define I2C_CMD_TEST_GET_VER    0xe2 //

/*=========================================================================
    REGISTERS
    -----------------------------------------------------------------------*/

/**************************************************************************/
/*! 
    @brief  Class that stores state and functions for interacting with mark helper IC
*/
/**************************************************************************/
class CH_mark{
	public:
	// constructors
        CH_mark(TwoWire *Wi=NULL);
        ~CH_mark(void) {};
		
	bool begin(uint8_t addr = MARK_ADDRESS);
        uint32_t getVersion();

        void ServoAngle(uint8_t Servo, uint8_t Angle);
		void MotorRun(int8_t Left, int8_t Right, uint16_t Time);
        void MotorMotion(uint8_t Speed, uint8_t Dir, uint16_t Time);
        void MotorLeft(int8_t Left, uint16_t Time);
        void MotorRight(int8_t Right, uint16_t Time);
        void MotorAngle(int16_t Angle, uint8_t Speed, uint8_t sensitivity);
		void DriveSetRpm(uint8_t Rpm);
		void DriveSetStep(uint8_t Step);
        void DriveRun(uint8_t Dir, uint16_t Step);

	protected:
		uint8_t _i2caddr; /*!< The I2C address used to communicate with the mark */
		TwoWire *_i2cbus; /*!< The I2C Bus used to communicate with the mark */

		void read(uint8_t cmd, uint8_t *buf, uint8_t num, uint16_t delay = 125);
		void write(uint8_t *buf, uint8_t num);
		void _i2c_init();

};

#endif
