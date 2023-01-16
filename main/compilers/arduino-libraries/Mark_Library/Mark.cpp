/*!
 * @file CH_mark.cpp
 *
 * @mainpage Adafruit mark arduino driver
 *
 * @section intro_sec Introduction
 *
 * This is part of Adafruit's mark driver for the Arduino platform.  It is
 * designed specifically to work with the Adafruit products that use mark technology.
 *
 * These chips use I2C to communicate, 2 pins (SCL+SDA) are required
 * to interface with the board.
 *
 * Adafruit invests time and resources providing this open source code,
 * please support Adafruit and open-source hardware by purchasing
 * products from Adafruit!
 *
 * @section author Author
 *
 * Written by Dean Miller for Adafruit Industries.
 *
 * @section license License
 *
 * BSD license, all text here must be included in any redistribution.
 *
 */

#include "Mark.h"

/**
 *****************************************************************************************
 *  @brief      Create a mark object on a given I2C bus
 *
 *  @param      i2c_bus the I2C bus connected to the mark, defaults to "Wire"
 ****************************************************************************************/
CH_mark::CH_mark(TwoWire *i2c_bus)
{
  if (i2c_bus == NULL) {
    _i2cbus = &Wire;
  } else {
    _i2cbus = i2c_bus;
  }
}
	

/**
 *****************************************************************************************
 *  @brief      Start the mark
 *
 *				This should be called when your sketch is connecting to the mark
 * 
 *  @param      addr the I2C address of the mark
 *  @param      flow the flow control pin to use
 *  @param		reset pass true to reset the mark on startup. Defaults to true.
 *
 *  @return     true if we could connect to the mark, false otherwise
 ****************************************************************************************/
bool CH_mark::begin(uint8_t addr)
{
	_i2caddr = addr;

	_i2c_init();

	return true;
}

/**
 *****************************************************************************************
 *  @brief      Returns the version of the mark
 *
 *  @return     The version code. Bits [31:16] will be a date code, [15:0] will be the product id.
 ****************************************************************************************/
uint32_t CH_mark::getVersion()
{
	uint8_t buf[4];
	this->read(I2C_CMD_TEST_GET_VER, buf, 2);
	uint32_t ret = ((uint16_t)buf[0]) | ((uint16_t)buf[1] << 8);
	return ret;
}

/**
 *****************************************************************************************
 ****************************************************************************************/
void CH_mark::ServoAngle(uint8_t Servo, uint8_t Angle)
{
	uint8_t buf[4];
	
	if (Servo > 3)return;
	if (Angle > SERVO_MAX_ANGLE)Angle = SERVO_MAX_ANGLE;
	
	buf[0] = I2C_CMD_SET_SERVO_ANGLE;
	buf[1] = Servo;
	buf[2] = Angle;
	this->write(buf, 3);
}

/**
 *****************************************************************************************
 ****************************************************************************************/
void CH_mark::MotorRun(int8_t Left, int8_t Right, uint16_t Time)
{
	uint8_t buf[] = {I2C_CMD_WHEEL_RUN, (uint8_t)Left, (uint8_t)Right, (uint8_t)(Time & 0xFF), (uint8_t)(Time >> 8) };
	this->write(buf, 5);
}


/**
 *****************************************************************************************
 ****************************************************************************************/
void CH_mark::MotorMotion(uint8_t Speed, uint8_t Dir, uint16_t Time)
{
	uint8_t buf[] = { I2C_CMD_WHEEL_MOTION, Speed, Dir, (uint8_t)(Time & 0xFF), (uint8_t)(Time >> 8) };
	
	this->write(buf, 5);
}


/**
 *****************************************************************************************
 ****************************************************************************************/
void CH_mark::MotorLeft(int8_t Left, uint16_t Time)
{
	uint8_t buf[] = { I2C_CMD_MOTOR_LEFT_RUN, (uint8_t)Left, (uint8_t)(Time & 0xFF), (uint8_t)(Time >> 8) };
	this->write(buf, 4);
}


/**
 *****************************************************************************************
 ****************************************************************************************/
void CH_mark::MotorRight(int8_t Right, uint16_t Time)
{
	uint8_t buf[] = { I2C_CMD_MOTOR_RIGHT_RUN, (uint8_t)Right, (uint8_t)(Time & 0xFF), (uint8_t)(Time >> 8) };
	
	this->write(buf, 4);
}


/**
 *****************************************************************************************
 ****************************************************************************************/
#if 0
void CH_mark::MotorAngle(int16_t Angle, uint8_t Speed)
{
	uint8_t buf[8];

	if (Speed > 100)Speed = 100;
	if (Angle > 0)
	{
		buf[1] = 10 + (Speed*9/10);
		buf[2] = 10;
	}else if (Angle < 0)
	{
		buf[1] = 10;
		buf[2] = 10 + (Speed*9/10);
		Angle = -Angle;
	}else
	{
		buf[1] = 10 + (Speed*9/10);
		buf[2] = 10 + (Speed*9/10);
	}
	
	buf[0] = I2C_CMD_WHEEL_RUN;
	buf[3] = (uint8_t)(Angle & 0xFF);
	buf[4] = (uint8_t)(Angle >> 8);
	
	this->write(buf, 5);
}
#else
void CH_mark::MotorAngle(int16_t Angle, uint8_t Speed, uint8_t sensitivity)
{
	uint8_t buf[8], init_speed, steer;

	if (Angle > 90)Angle = 90;
	if (Angle < -90)Angle = -90;
	
	init_speed = (Speed*2*(1-sensitivity/100));
    steer      = ((Angle/2)*2*(sensitivity/100));

	buf[0] = I2C_CMD_WHEEL_RUN;
	buf[1] = init_speed+steer;
	buf[2] = init_speed-steer;
	buf[3] = 0xE8;
	buf[4] = 3;
	
	this->write(buf, 5);
}
#endif

/** 
       if Angle > 90:
            Angle = 90
        if Angle < -90:
            Angle = -90
        init_speed = int(speed*2*(1-sensitivity/100))
        steer = int((Angle/2)*2*(sensitivity/100))
        #self.motor_run(25+int(Angle/2), 25-int(Angle/2), 1000)
        self.motor_run(init_speed+steer, init_speed-steer, 1000)

 *****************************************************************************************
 ****************************************************************************************/
void CH_mark::DriveSetRpm(uint8_t Rpm)
{
	uint8_t buf[4];

	if ((Rpm <= 180) && (Rpm > 0))
	{
		buf[0] = I2C_CMD_SET_DRIVE_RPM;
		buf[1] = Rpm;
		this->write(buf, 2);
	}
}



/**
 *****************************************************************************************
 ****************************************************************************************/
void CH_mark::DriveSetStep(uint8_t Step)
{
	uint8_t buf[] = { I2C_CMD_SET_DRIVE_STEP, Step };
	
	this->write(buf, 2);
}



/**
 *****************************************************************************************
 ****************************************************************************************/
void CH_mark::DriveRun(uint8_t Dir, uint16_t Step)
{
	uint8_t buf[] = { I2C_CMD_DRIVE_RUN, Dir, (uint8_t)(Step & 0xFF), (uint8_t)(Step >> 8) };
	
	this->write(buf, 4);
}


/**
 *****************************************************************************************
 *  @brief      Initialize I2C. On arduino this just calls i2c->begin()
 * 
 *
 *  @return     none
 ****************************************************************************************/
void CH_mark::_i2c_init()
{
  _i2cbus->begin();
}

/**
 *****************************************************************************************
 *  @brief      Read a specified number of bytes into a buffer from the mark.
 * 
 *  @param      regHigh the module address register (ex. SEESAW_STATUS_BASE)
 *	@param		regLow the function address register (ex. SEESAW_STATUS_VERSION)
 *	@param		buf the buffer to read the bytes into
 *	@param		num the number of bytes to read.
 *	@param		delay an optional delay in between setting the read register and reading
 *				out the data. This is required for some mark functions (ex. reading ADC data)
 *
 *  @return     none
 ****************************************************************************************/
void CH_mark::read(uint8_t cmd, uint8_t *buf, uint8_t num, uint16_t delay)
{
	uint8_t pos = 0;
	
	//on arduino we need to read in 32 byte chunks
	while(pos < num){
		
		uint8_t read_now = min(32, num - pos);
		_i2cbus->beginTransmission((uint8_t)_i2caddr);
		_i2cbus->write((uint8_t)cmd);
		_i2cbus->endTransmission();

		//TODO: tune this
		delayMicroseconds(delay);

		_i2cbus->requestFrom((uint8_t)_i2caddr, read_now);
		
		for(int i=0; i<read_now; i++){
			buf[pos] = _i2cbus->read();
			pos++;
		}
	}
}

/**
 *****************************************************************************************
 *  @brief      Write a specified number of bytes to the mark from the passed buffer.
 * 
 *  @param      regHigh the module address register (ex. SEESAW_GPIO_BASE)
 *	@param		regLow the function address register (ex. SEESAW_GPIO_BULK_SET)
 *	@param		buf the buffer the the bytes from
 *	@param		num the number of bytes to write.
 *
 *  @return     none
 ****************************************************************************************/
void CH_mark::write(uint8_t *buf, uint8_t num)
{ 
	_i2cbus->beginTransmission((uint8_t)_i2caddr);
	_i2cbus->write((uint8_t *)buf, num);
	_i2cbus->endTransmission();
}

