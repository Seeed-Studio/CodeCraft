/*****************************************************************************
 *                                                                           *
   COPYRIGHT (C) 2020 Chaihuo-edu - All Rights Reserved
 *                                                                           *
   Chaihuo-edu makes no warranty express or implied including but not
   limited to, any warranty of
 *                                                                           *
 *                                                                           *
    (i)  merchantability or fitness for a particular purpose and/or
 *                                                                           *
    (ii) requirements, for a particular purpose in relation to the LICENSED
         MATERIALS, which is provided AS IS, WITH ALL FAULTS. Chaihuo-edu
         does not represent or warrant that the LICENSED MATERIALS provided
         here under is free of infringement of any third party patents,
         copyrights, trade secrets or other intellectual property rights.
         ALL WARRANTIES, CONDITIONS OR OTHER TERMS IMPLIED BY LAW ARE
         EXCLUDED TO THE FULLEST EXTENT PERMITTED BY LAW
 *                                                                           *
 *****************************************************************************
 * */

/* ch_p.h -*- mode:C/C++; -*- */
/*
   @author Ruiqian Tang <ruiqian.tang@chaihuo.org>

*/

#define MAIN_SKETCH
#include "OpenCat.h"

#include <I2Cdev.h>
#include <MPU6050_6Axis_MotionApps20.h>


#define PACKET_SIZE 42
#define OVERFLOW_THRESHOLD 128

//#if OVERFLOW_THRESHOLD>1024-1024%PACKET_SIZE-1   // when using (1024-1024%PACKET_SIZE) as the overflow resetThreshold, the packet buffer may be broken
// and the reading will be unpredictable. it should be replaced with previous reading to avoid jumping
#define FIX_OVERFLOW
//#endif
#define HISTORY 2
int8_t lag = 0;
float ypr[3];         // [yaw, pitch, roll]   yaw/pitch/roll container and gravity vector
float yprLag[HISTORY][3];

MPU6050 mpu;
#define OUTPUT_READABLE_YAWPITCHROLL
// MPU control/status vars
//bool dmpReady = false;  // set true if DMP init was successful
uint8_t mpuIntStatus;   // holds actual interrupt status byte from MPU
uint8_t devStatus;      // return status after each device operation (0 = success, !0 = error)
uint16_t packetSize;    // expected DMP packet size (default is 42 bytes)
uint16_t fifoCount;     // count of all bytes currently in FIFO
uint8_t fifoBuffer[PACKET_SIZE]; // FIFO storage buffer

// orientation/motion vars
Quaternion q;           // [w, x, y, z]         quaternion container
VectorFloat gravity;    // [x, y, z]            gravity vector

// ================================================================
// ===               INTERRUPT DETECTION ROUTINE                ===
// ================================================================

volatile bool mpuInterrupt = false;     // indicates whether MPU interrupt pin has gone high
void dmpDataReady() {
  mpuInterrupt = true;
}
char token;
#define CMD_LEN 10
int8_t portmode = 0;
char *lastCmd = new char[CMD_LEN];
char *newCmd = new char[CMD_LEN];
uint16_t newCmd1 = 0;
uint16_t lastCmd1 = 0;
byte newCmdIdx = 0;
byte hold = 0;
int8_t offsetLR = 0;
bool checkGyro = true;
int8_t skipGyro = 3;
int8_t countDown = 0;
#define COUNT_DOWN 60
uint8_t timer = 0;
#ifdef SKIP
byte updateFrame = 0;
#endif
byte firstMotionJoint;
byte jointIdx = 0;
//int8_t tStep = 1;
int8_t newtype = 0;
int8_t headLR = 0;
int8_t rollflag = 0;//当bitty翻转是为1，重新设置动作时重置为0，否则一直为1，bitty进行翻转动作
void bitty_set(String CCsig);
void bitty_set_diy(char *CCsig , int8_t setLR);

unsigned long usedTime = 0;
void getFIFO() {//get FIFO only without further processing
  while (fifoCount < packetSize) fifoCount = mpu.getFIFOCount();

  // read a packet from FIFO
  mpu.getFIFOBytes(fifoBuffer, packetSize);

  // track FIFO count here in case there is > 1 packet available
  // (this lets us immediately read more without waiting for an interrupt)
  fifoCount -= packetSize;
}

void getYPR() {//get YPR angles from FIFO data, takes time
  // wait for MPU interrupt or extra packet(s) available
  //while (!mpuInterrupt && fifoCount < packetSize) ;
  if (mpuInterrupt || fifoCount >= packetSize)
  {
    // reset interrupt flag and get INT_STATUS byte
    mpuInterrupt = false;
    mpuIntStatus = mpu.getIntStatus();

    // get current FIFO count
    fifoCount = mpu.getFIFOCount();
    //PTL(fifoCount);
    // check for overflow (this should never happen unless our code is too inefficient)
    if ((mpuIntStatus & 0x10) || fifoCount > OVERFLOW_THRESHOLD) { //1024) {
      // reset so we can continue cleanly
      mpu.resetFIFO();
      // otherwise, check for DMP data ready interrupt (this should happen frequently)

      // -- RzLi --
#ifdef FIX_OVERFLOW
#ifdef DEVELOPER
      PTLF("reset FIFO!");//FIFO overflow! Using last reading!
#endif
      lag = (lag - 1 + HISTORY) % HISTORY;
#endif
      // --
    }
    else if (mpuIntStatus & 0x02) {


      // wait for correct available data length, should be a VERY short wait
      getFIFO();

#ifdef OUTPUT_READABLE_YAWPITCHROLL
      // display Euler angles in degrees
      mpu.dmpGetQuaternion(&q, fifoBuffer);
      mpu.dmpGetGravity(&gravity, &q);
      mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);

#ifdef MPU_YAW180
      ypr[2] = -ypr[2];
      ypr[1] = -ypr[1];

#endif
#endif
      for (byte g = 1; g < 3; g++)
        ypr[g] *= degPerRad;        //ypr converted to degree

      // overflow is detected after the ypr is read. it's necessary to keep a lag record of previous reading.  -- RzLi --
#ifdef FIX_OVERFLOW
      for (byte g = 1; g < 3; g++) {
        yprLag[lag][g] = ypr[g];
        ypr[g] = yprLag[(lag - 1 + HISTORY) % HISTORY][g] ;
      }
      lag = (lag + 1) % HISTORY;
#endif

#ifdef DEVELOPER
      PT(ypr[0]);
      PTF("\t");
      PT(ypr[1]);
      PTF("\t");
      PTL(ypr[2]);
#endif
    }
  }
}
void checkBodyMotion()  {
  //if (!dmpReady) return;
  getYPR();
  // --
  //deal with accidents
  if (fabs(ypr[1]) > LARGE_PITCH || fabs(ypr[2]) > LARGE_ROLL) {//wait until stable
    for (byte w = 0; w < 50; w++) {
      getYPR();
      delay(10);
    }
    if (fabs(ypr[1]) > LARGE_PITCH || fabs(ypr[2]) > LARGE_ROLL) {//check again
	  if (fabs(ypr[2]) > LARGE_ROLL) {
        bitty_set(F("rc"));
      }
      else {
        if (!hold) {
          if (ypr[1] > LARGE_PITCH) {
            bitty_set(F("lifted"));
          }
          else {
            bitty_set(F("dropped"));
          }
        }
      }
      hold = 10;
    }
  }

  // recover
  else if (hold) {
    if (hold == 1) {
      rollflag = 0;
      motion.loadBySkillName("balance");
	  transform( motion.dutyAngles,  1, 0);
    }
    hold --;
    if (!hold) {
      strcpy(newCmd, lastCmd);
      strcpy(lastCmd, "balance");
	  newCmd1 = lastCmd1;
      lastCmd1 =  0;
      if (newtype == 1) {
        bitty_set(newCmd);
      }
      else if (newtype == 2) {
        bitty_set_diy(newCmd1, headLR);
      }
      meow();
    }
  }
  //calculate deviation
  for (byte i = 0; i < 2; i++) {
    RollPitchDeviation[i] = ypr[2 - i] - motion.expectedRollPitch[i]; //all in degrees
    //
    //    PT('\t');
    //    PT(ypr[2 - i]); // in degree
    //    PT('\t');
    //

    RollPitchDeviation[i] = sign(ypr[2 - i]) * max(fabs(RollPitchDeviation[i]) - levelTolerance[i], 0); //filter out small angles
    //    PT(RollPitchDeviation[i]);
    //    PT("\t");
  }
  //  PTL();

}

int AcceGet(uint8_t xyz)
{
  float Value = 0.0;
  int16_t ax, ay, az, gx, gy, gz;             //鍔犻�熷害璁￠檧铻轰华鍘熷鏁版嵁
   mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz); //璇诲彇鍏酱鍘熷鏁板�?
  switch (xyz)
  {
    case 0: // X
      Value = ax / 16384.0;
      break;
    case 1: //
      Value = ay / 16384.0;
      break;
    case 2: //
      Value = az / 16384.0;
      break;
    default :
      break;
  }
  return (int)Value;
}

int GyroGet(uint8_t xyz)
{
  int16_t ax, ay, az, gx, gy, gz;             //鍔犻�熷害璁￠檧铻轰华鍘熷鏁版嵁
   mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz); //璇诲彇鍏酱鍘熷鏁板�?
  switch (xyz)
  {
    case 0: // X
      return gx/131.0;
    case 1: // Y
      return gy/131.0;
    case 2: // Z
      return gz/131.0;
    default :
      break;
  }
  return -1;
}

void voltage_chk()
{
  float voltage = analogRead(BATT);

  while (voltage <
#ifdef NyBoard_V0_1
         400
#else
         250
#endif
        ) { //give the cat a break when voltage drops after sprint
    //adjust the thresholds according to your batteries' voltage
    //if set too high, Nybble will keep crying.
    //If too low, Nybble may faint due to temporary voltage drop
    PTL(voltage);//relative voltage
    meow();
	voltage = analogRead(BATT);
  }
  return;
}

void oc_setup() {
  pinMode(BUZZER, OUTPUT);
#ifdef PIXEL_PIN
  pixels.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
  pixels.clear(); // Set all pixel colors to 'off'
  // pixels.Color() takes RGB values, from 0,0,0 up to 255,255,255
  pixels.setPixelColor(3, pixels.Color(0, 0, LIT_ON));

  pixels.show();   // Send the updated pixel colors to the hardware.
#endif
  // join I2C bus (I2Cdev library doesn't do this automatically)
#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
  Wire.begin();
  //Wire.setClock(400000);
  TWBR = 24; // 400kHz I2C clock (200kHz if CPU is 8MHz)
#elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
  Fastwire::setup(400, true);
#endif

  Serial.begin(BAUD_RATE);
  Serial.setTimeout(10);
  while (!Serial);
  // wait for ready
  while (Serial.available() && Serial.read()); // empty buffer
  delay(100);
  PTLF("\n* Start *");
  PTLF("Initialize I2C");
  PTLF("Connect MPU6050");
  mpu.initialize();
  //do
  {
    delay(500);
    // verify connection
    PTLF("Test connection");
    PTL(mpu.testConnection() ? F("MPU successful") : F("MPU failed"));//sometimes it shows "failed" but is ok to bypass.
  } //while (!mpu.testConnection());

  // load and configure the DMP
  do {
    PTLF("Initialize DMP");
    devStatus = mpu.dmpInitialize();
    delay(500);
    // supply your own gyro offsets here, scaled for min sensitivity

    for (byte i = 0; i < 4; i++) {
      PT(EEPROMReadInt(MPUCALIB + 4 + i * 2));
      PT(" ");
    }
    PTL();
    mpu.setZAccelOffset(EEPROMReadInt(MPUCALIB + 4));
    mpu.setXGyroOffset(EEPROMReadInt(MPUCALIB + 6));
    mpu.setYGyroOffset(EEPROMReadInt(MPUCALIB + 8));
    mpu.setZGyroOffset(EEPROMReadInt(MPUCALIB + 10));
    // make sure it worked (returns 0 if so)
    if (devStatus == 0) {
      // turn on the DMP, now that it's ready
      PTLF("Enable DMP");
      mpu.setDMPEnabled(true);

      // enable Arduino interrupt detection
      PTLF("Enable interrupt");
      attachInterrupt(INTERRUPT, dmpDataReady, RISING);
      mpuIntStatus = mpu.getIntStatus();

      // set our DMP Ready flag so the main loop() function knows it's okay to use it
      PTLF("DMP ready!");
      //dmpReady = true;

      // get expected DMP packet size for later comparison
      packetSize = mpu.dmpGetFIFOPacketSize();
    } else {
      // ERROR!
      // 1 = initial memory load failed
      // 2 = DMP configuration updates failed
      // (if it's going to break, usually the code will be 1)
      PTLF("DMP failed (code ");
      PT(devStatus);
      PTLF(")");
      PTL();
    }
  } while (devStatus);

  //opening music
#if WALKING_DOF == 8
  playMelody(MELODY);
#endif

  assignSkillAddressToOnboardEeprom();
  PTL();

  // servo
  { pwm.begin();
    pwm.setPWMFreq(60 * PWM_FACTOR); // Analog servos run at ~60 Hz updates
    delay(200);

    //meow();
    strcpy(lastCmd, "rest");
    motion.loadBySkillName("rest");
    for (int8_t i = DOF - 1; i >= 0; i--) {
      pulsePerDegree[i] = float(PWM_RANGE) / servoAngleRange(i);
      servoCalibs[i] = servoCalib(i);
      calibratedDuty0[i] =  SERVOMIN + PWM_RANGE / 2 + float(middleShift(i) + servoCalibs[i]) * pulsePerDegree[i]  * rotationDirection(i) ;
      //PTL(SERVOMIN + PWM_RANGE / 2 + float(middleShift(i) + servoCalibs[i]) * pulsePerDegree[i] * rotationDirection(i) );
      calibratedPWM(i, motion.dutyAngles[i]);
      delay(20);
    }
    randomSeed(analogRead(0));//use the fluctuation of voltage caused by servos as entropy pool
    shutServos();
    token = 'd';
  }
  beep(30);

  pinMode(BATT, INPUT);
  pinMode(BUZZER, OUTPUT);

  //opening music
  //#if WALKING_DOF == 8
  //  playMelody(MELODY);
  //#endif

  meow();
}

void oc_loop() {
  do {
    float voltage = analogRead(BATT);
    if (voltage <
#ifdef NyBoard_V0_1
      650
#else
      300
#endif
       ) { //give the cat a break when voltage drops after sprint
      //adjust the thresholds according to your batteries' voltage
      //if set too high, Nybble will keep crying.
      //If too low, Nybble may faint due to temporary voltage drop
      PTL(voltage);//relative voltage
      meow();
    }
    else {
      newCmd[0] = '\0';
      newCmdIdx = 0;

      // input block
      if ( Serial.available() > 0) {
        token = Serial.read();
        newCmdIdx = 3;
        portmode = 1;
      }
      if(portmode){
#ifdef GYRO //if opt out the gyro, the calculation can be really fast
        if (checkGyro) {
          if (!(timer % skipGyro) && countDown == 0)
            checkBodyMotion();
          else if (mpuInterrupt || fifoCount >= packetSize)
          {
          // reset interrupt flag and get INT_STATUS byte
            mpuInterrupt = false;
            mpuIntStatus = mpu.getIntStatus();
            getFIFO();
          }
        }
#endif	
      }
      //    PT(millis() - tag);
      //    PTL(" imu");
      // accident block
    //...
      //...
      //for obstacle avoidance and auto recovery
      //}
      if (newCmdIdx) {
        PTL(token);
        beep(newCmdIdx * 4);
        // this block handles argumentless tokens
        switch (token) {
          case 'h': {
              PTLF("* :P *");// print the help document. not implemented on NyBoard Vo due to limited space
              break;
            }
          case 'z': { //turn off servos only
              shutServos();
              break;
            }
          case 'd': {
              skillByName("rest");
              break;
            }

          case 's': {
              PTLF("save offset");
              saveCalib(servoCalibs);
              break;
            }
          case 'a': {
              PTLF("aborted");
              for (byte i = 0; i < DOF; i++) {
                servoCalibs[i] = servoCalib( i);
              }
              break;
            }

          // this block handles array like arguments
          case 'i': //indexed joint motions: joint0, angle0, joint1, angle1, ...
          case 'l': //list of all 16 joint: angle0, angle2,... angle15
            //case 'o': //for melody
            {
              String inBuffer = Serial.readStringUntil('~');
              int8_t numArg = inBuffer.length();
              char* list = inBuffer.c_str();

              char *targetFrame = new char [DOF];
              for (int i = 0; i < DOF; i += 1) {
                targetFrame[i] = currentAng[i];
              }
              if (token == 'i') {
                for (int i = 0; i < numArg; i += 2) {
                  targetFrame[list[i]] = list[i + 1];
                }
              }
              else if (token == 'l') {
                for (int i = 0; i < DOF; i += 1) {
                  targetFrame[i] = list[i];
                }
              }
              transform(targetFrame, 1, 3);
              delete [] targetFrame;
              break;
            }
          case 'j': { //show the list of current joint anles
              printRange(DOF);
              printList(currentAng);
              break;
            }
          case 'e': {
              portmode = 0;
			  oc_setup();
              break;
            }
		  case 'g': {//Gyro 		
              if (!checkGyro)
                checkBodyMotion();
//            countDown = COUNT_DOWN;
              checkGyro = !checkGyro;
			  break;
		  }
          case 'c': //calibration
          case 'm': //move jointIndex to angle
          case 'u': //meow (repeat, increament)
          case 'b': //beep (tone, duration): tone 0 is pause, duration range is 0~255
            {
              int target[2] = {};
              String inBuffer = Serial.readStringUntil('\n');
              byte inLen = 0;
              strcpy(newCmd, inBuffer.c_str());
              char *pch;
              pch = strtok (newCmd, " ,");
              for (byte c = 0; pch != NULL; c++)
              {
                target[c] = atoi(pch);
                pch = strtok (NULL, " ,\t");
                inLen++;
              }
              if (token == 'c') {
                //PTLF("calibrating [ targetIdx, angle ]: ");
                if (strcmp(lastCmd, "c")) { //first time entering the calibration function
                  motion.loadBySkillName("calib");
                  transform( motion.dutyAngles);
                }
                if (inLen == 2)
                  servoCalibs[target[0]] = target[1];
                PTL();
                printRange(DOF);
                printList(servoCalibs);
                yield();
              }
              else if (token == 'm') {
                //SPF("moving [ targetIdx, angle ]: ");
                currentAng[target[0]] = motion.dutyAngles[target[0]] = target[1];
              }
              else if (token == 'u') {
                meow(target[0], 0, 50, 200, 1 + target[1]);
              }
              else if (token == 'b') {
                beep(target[0], (byte)target[1]);
              }
              PT(token);
              printList(target, 2);
              if (token == 'c' || token == 'm') {
                int duty = SERVOMIN + PWM_RANGE / 2 + float(middleShift(target[0])  + servoCalibs[target[0]] + motion.dutyAngles[target[0]]) * pulsePerDegree[target[0]] * rotationDirection(target[0]);
                pwm.setPWM(pin(target[0]), 0,  duty);
              }
              break;
            }
          default: if (Serial.available() > 0) {
              String inBuffer = Serial.readStringUntil('\n');
              strcpy(newCmd, inBuffer.c_str());
            }
        }
        while (Serial.available() && Serial.read()); //flush the remaining serial buffer in case the commands are parsed incorrectly
        //check above

        if (strcmp(newCmd, "") && strcmp(newCmd, lastCmd) ) {
          if (token == 'w') {}; //some words for undefined behaviors

          if (token == 'k') { //validating key

            motion.loadBySkillName(newCmd);
            char lr = newCmd[strlen(newCmd) - 1];
            offsetLR = (lr == 'L' ? 15 : (lr == 'R' ? -15 : 0));

            //motion.info();
            timer = 0;
            if (strcmp(newCmd, "balance") && strcmp(newCmd, "lifted") && strcmp(newCmd, "dropped") )
              strcpy(lastCmd, newCmd);
            // Xconfig = strcmp(newCmd, "wkX") ? false : true;

#ifdef POSTURE_WALKING_FACTOR
          postureOrWalkingFactor = (motion.period == 1 ? 1 : POSTURE_WALKING_FACTOR);
#endif
            // if posture, start jointIdx from 0
            // if gait, walking DOF = 8, start jointIdx from 8
            //          walking DOF = 12, start jointIdx from 4
          firstMotionJoint = (motion.period <= 1) ? 0 : DOF - WALKING_DOF;


          if (motion.period < 1) {
            int8_t repeat = motion.loopCycle[2] - 1;
            for (byte c = 0; c < abs(motion.period); c++) { //the last two in the row are transition speed and delay
              transform(motion.dutyAngles + c * 18, motion.angleDataRatio, motion.dutyAngles[16 + c * 18] / 4.0);
              delay(motion.dutyAngles[17 + c * 18] * 100);
              if (c == motion.loopCycle[1] && repeat > 0) {
                c = motion.loopCycle[0] - 1;
                repeat--;
              }
            }
            skillByName("balance", 1, 2, false);
            strcpy(lastCmd, "balance");
          }
          else {
            transform( motion.dutyAngles, motion.angleDataRatio, 1, firstMotionJoint);
            jointIdx = DOF;
          }

            if (!strcmp(newCmd, "rest")) {
              shutServos();
              token = 'd';
            }
          }
          else {
            lastCmd[0] = token;
            memset(lastCmd + 1, '\0', CMD_LEN - 1);
          }
        }
      }

      //motion block
      {
        if (token == 'k') {
          if (jointIdx == DOF) {
#ifdef SKIP
            if (updateFrame++ == SKIP) {
              updateFrame = 0;
#endif
              timer += tStep;
            if (timer == abs(motion.period)) {
                timer = 0;
              }
              else if (timer == 255)
                timer = abs(motion.period) - 1;

#ifdef SKIP
            }
#endif
            jointIdx =
#ifdef HEAD  //start from head
              0;
#else
#ifdef TAIL
              2;
#else
              DOF - WALKING_DOF;
#endif
#endif
          }
#ifndef TAIL
          if (jointIdx == 1)
            jointIdx = DOF - WALKING_DOF;
#endif

        if (jointIdx < firstMotionJoint && abs(motion.period) > 1) {
            calibratedPWM(jointIdx, (jointIdx != 1 ? offsetLR : 0) //look left or right
                        + 10 * sin (timer * (jointIdx + 2) * M_PI / abs(motion.period)) //look around
#ifdef GYRO
                          + (checkGyro ? adjust(jointIdx) : 0)
#endif
                         );
          }
          else if (jointIdx >= firstMotionJoint) {
            int dutyIdx = timer * WALKING_DOF + jointIdx - firstMotionJoint;
          calibratedPWM(jointIdx, motion.dutyAngles[dutyIdx]*motion.angleDataRatio//+ ((Xconfig && (jointIdx == 14 || jointIdx == 15)) ? 180 : 0)
#ifdef GYRO
                        + (checkGyro ? ((!(timer % skipGyro) && countDown == 0) ? adjust(jointIdx) : currentAdjust[jointIdx]) : 0)
#endif
                         );
          }
          jointIdx++;
        }
        else
          ;//timer = 0;
      }
    }
  } while (portmode);
}


void bitty_set_diy(char *CCsig , int8_t setLR) {
  rollflag = 0;
  newCmd1 = 0;
  newtype = 2;
  if (CCsig != 0) {
    newCmd1 = CCsig;
  }
  if (newCmd1 != 0 && newCmd1 != lastCmd1 ) {
    motion.period = CCsig[0];
    for (int i = 0; i < 2; i++)
      motion.expectedRollPitch[i] = (int8_t)CCsig[1 + i];
    motion.angleDataRatio = CCsig[3];
    byte skillHeader = 4;
    byte frameSize;
    if (motion.period < -1) {
      frameSize = 18;
      for (byte i = 0; i < 3; i++)
        motion.loopCycle[i] = CCsig[ skillHeader + i];
      skillHeader = 7;
    }
    else
      frameSize = motion.period > 1 ? WALKING_DOF : 16;
    int len = abs(motion.period) * frameSize;
    delete[] motion.dutyAngles; //check here
    motion.dutyAngles = new char[len];
    for (int k = 0; k < len; k++) {
      motion.dutyAngles[k] = CCsig[skillHeader + k];
    }

    offsetLR = setLR;
    timer = 0;
    lastCmd1 = newCmd1;
	lastCmd[0] = '\0';

#ifdef POSTURE_WALKING_FACTOR
    postureOrWalkingFactor = (motion.period == 1 ? 1  : POSTURE_WALKING_FACTOR);
#endif
    // if posture, start jointIdx from 0
    // if gait, walking DOF = 8, start jointIdx from 8
    //          walking DOF = 12, start jointIdx from 4
    firstMotionJoint = (motion.period == 1) ? 0 : DOF - WALKING_DOF;
    //transform( motion.dutyAngles,  1, firstMotionJoint);
    //jointIdx = DOF;
    if (motion.period < 1) {
      int8_t repeat = motion.loopCycle[2] - 1;
      for (byte c = 0; c < abs(motion.period); c++) { //the last two in the row are transition speed and delay
        transform(motion.dutyAngles + c * 18, motion.angleDataRatio, motion.dutyAngles[16 + c * 18] / 4.0);
        delay(motion.dutyAngles[17 + c * 18] * 100);
        if (c == motion.loopCycle[1] && repeat > 0) {
          c = motion.loopCycle[0] - 1;
          repeat--;
        }
      }
      skillByName("balance", 1, 2, false);
      strcpy(lastCmd, "balance");
    }
    else {
      transform( motion.dutyAngles, motion.angleDataRatio, 1, firstMotionJoint);
      jointIdx = DOF;
    }
  }
}

void bitty_set(String CCsig) {
  rollflag = 0;
  newCmd[0] = '\0';
  
  if (CCsig != "") {
    strcpy(newCmd, CCsig.c_str());
  }
  if (strcmp(newCmd, "") && strcmp(newCmd, lastCmd) ) {
    //PTL(newCmd);
    motion.loadBySkillName(newCmd);
    char lr = newCmd[strlen(newCmd) - 1];
    offsetLR = (lr == 'L' ? 15 : (lr == 'R' ? -15 : 0));

    //motion.info();
    timer = 0;
    if (strcmp(newCmd, "lifted") && strcmp(newCmd, "dropped") && strcmp(newCmd, "rc"))
	{
      strcpy(lastCmd, newCmd);
	  lastCmd1 = 0;
	  newtype = 1;
	}
    // Xconfig = strcmp(newCmd, "wkX") ? false : true;

#ifdef POSTURE_WALKING_FACTOR
    postureOrWalkingFactor = (motion.period == 1 ? 1  : POSTURE_WALKING_FACTOR);
#endif

    firstMotionJoint = (motion.period <= 1) ? 0 : DOF - WALKING_DOF;

    //transform( motion.dutyAngles,  1, firstMotionJoint);
    //jointIdx = DOF;

    if (motion.period < 1) {
      int8_t repeat = motion.loopCycle[2] - 1;
      for (byte c = 0; c < abs(motion.period); c++) { //the last two in the row are transition speed and delay
        transform(motion.dutyAngles + c * 18, motion.angleDataRatio, motion.dutyAngles[16 + c * 18] / 4.0);
        delay(motion.dutyAngles[17 + c * 18] * 100);
        if (c == motion.loopCycle[1] && repeat > 0) {
          c = motion.loopCycle[0] - 1;
          repeat--;
        }
      }
	  skillByName("balance", 1, 2, false);
	  if(strcmp(newCmd, "rc")){
		strcpy(lastCmd, "balance");
	  }
    }
    else {
      transform( motion.dutyAngles, motion.angleDataRatio, 1, firstMotionJoint);
      jointIdx = DOF;
    }
    if (!strcmp(newCmd, "rest")) {
      shutServos();
    }
  }
}

void bitty_move()
{
  // MPU block
  voltage_chk();
#ifdef GYRO //if opt out the gyro, the calculation can be really fast
      if (checkGyro) {
        if (!(timer % skipGyro) && countDown == 0)
          checkBodyMotion();
        else if (mpuInterrupt || fifoCount >= packetSize)
        {
          // reset interrupt flag and get INT_STATUS byte
          mpuInterrupt = false;
          mpuIntStatus = mpu.getIntStatus();
          getFIFO();
        }
      }
#endif
  if (jointIdx == DOF) {
#ifdef SKIP
      if (updateFrame++ == SKIP) {
        updateFrame = 0;
#endif
      // timer = (timer + 1) % motion.period;
      timer += tStep;
      if (timer == abs(motion.period)) {
        timer = 0;
      }
      else if (timer == 255)
        timer = abs(motion.period) - 1;

#ifdef SKIP
      }
#endif
      jointIdx =
#ifdef HEAD  //start from head
        0;
#else
#ifdef TAIL
        2;
#else
        DOF - WALKING_DOF;
#endif
#endif
    }
#ifndef TAIL
    if (jointIdx == 1)
      jointIdx = DOF - WALKING_DOF;
#endif

  if (jointIdx < firstMotionJoint && abs(motion.period) > 1) {
    calibratedPWM(jointIdx, (jointIdx != 1 ? offsetLR : 0) //look left or right
                  + 10 * sin (timer * (jointIdx + 2) * M_PI / motion.period) //look around
#ifdef GYRO
                    + (checkGyro ? adjust(jointIdx) : 0)
#endif
                   );
    }
    else if (jointIdx >= firstMotionJoint) {
      int dutyIdx = timer * WALKING_DOF + jointIdx - firstMotionJoint;
      calibratedPWM(jointIdx, motion.dutyAngles[dutyIdx] //+ ((Xconfig && (jointIdx == 14 || jointIdx == 15)) ? 180 : 0)
#ifdef GYRO
                  + (checkGyro ? ((!(timer % skipGyro) && countDown == 0) ? adjust(jointIdx) : currentAdjust[jointIdx]) : 0)
#endif
                 );

  }

  jointIdx++;
  
}
void BittyServo(uint8_t Id, float angle)
{
  if ((Id > 7) && (Id < 16) || Id == 0)
  {
    calibratedPWM(Id, angle);
  }
}
