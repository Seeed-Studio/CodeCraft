/*
  Created to support the release of the Sheildbot from SeeedStudios
  http://www.seeedstudio.com/wiki/Shield_Bot

  Created by Jacob Rosenthal and Colin Ho, December 30, 2012.
  Released into the public domain.
*/

// ensure this library description is only included once
#ifndef Shieldbot_h
#define Shieldbot_h


// include types & constants of Wiring core API
#include "Arduino.h"

#define CC_POSITION_LOSE 0       // 失去焦点
#define CC_POSITION_MIDDLE 1     // 中
#define CC_POSITION_LEFT 2       // 左
#define CC_POSITION_MOST_LEFT 3  // 最左
#define CC_POSITION_RIGHT 4      // 右
#define CC_POSITION_MOST_RIGHT 5 // 最右

#define CC_DIR_FORWARD 1
#define CC_DIR_BACK 2
#define CC_DIR_LEFT 3
#define CC_DIR_RIGHT 4
#define CC_DIR_STOP 5

#define CC_V_LOW 1
#define CC_V_MIDDLE 2
#define CC_V_HIGH 3

#define CC_LOW 30
#define CC_MIDDLE 75
#define CC_HIGH 127
#define CC_SWERVE 10

// library interface description
class Shieldbot
{
  // user-accessible "public" interface
  public:
	Shieldbot();
	int readS1();
	int readS2();
	int readS3();
	int readS4();
	int readS5();
	void setMaxSpeed(int);
	void setMaxSpeed(int, int);
	void setMaxLeftSpeed(int);
	void setMaxRightSpeed(int);
	void rightMotor(char);
	void leftMotor(char);
	void drive(char, char);
	void forward();
	void backward();
	void stop();
	void stopRight();
	void stopLeft();
	void fastStopLeft();
	void fastStopRight();
	void fastStop();

	int getPosition(int);
	void run(int,int);

};

#endif