/*
 * ADXL345.h
 * Library for accelerometer_ADXL345
 *
 * Copyright (c) 2013 seeed technology inc.
 * Author        :   FrankieChu
 * Create Time   :   Jan 2013
 * Change Log    :
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

#include "Arduino.h"
#include "ADXL345.h"
#include <Wire.h>

#define ADXL345_DEVICE (0x53)    // ADXL345 device address
#define ADXL345_TO_READ (6)      // num of bytes we are going to read each time (two bytes for each axis)

ADXL345::ADXL345() {

    status = ADXL345_OK;
    error_code = ADXL345_NO_ERROR;

    gains[0] = 0.00376390;
    gains[1] = 0.00376009;
    gains[2] = 0.00349265;

}

void ADXL345::init()
{
    powerOn();

    //set activity/ inactivity thresholds (0-255)
    setActivityThreshold(75); //62.5mg per increment
    setInactivityThreshold(75); //62.5mg per increment
    setTimeInactivity(10); // how many seconds of no activity is inactive?

    //look of activity movement on this axes - 1 == on; 0 == off
    setActivityX(1);
    setActivityY(1);
    setActivityZ(1);

    //look of inactivity movement on this axes - 1 == on; 0 == off
    setInactivityX(1);
    setInactivityY(1);
    setInactivityZ(1);

    //look of tap movement on this axes - 1 == on; 0 == off
    setTapDetectionOnX(0);
    setTapDetectionOnY(0);
    setTapDetectionOnZ(1);

    //set values for what is a tap, and what is a double tap (0-255)
    setTapThreshold(50); //62.5mg per increment
    setTapDuration(15); //625us per increment
    setDoubleTapLatency(80); //1.25ms per increment
    setDoubleTapWindow(200); //1.25ms per increment

    //set values for what is considered freefall (0-255)
    setFreeFallThreshold(7); //(5 - 9) recommended - 62.5mg per increment
    setFreeFallDuration(45); //(20 - 70) recommended - 5ms per increment

    //setting all interrupts to take place on int pin 1
    //I had issues with int pin 2, was unable to reset it
    setInterruptMapping( ADXL345_INT_SINGLE_TAP_BIT,   ADXL345_INT1_PIN );
    setInterruptMapping( ADXL345_INT_DOUBLE_TAP_BIT,   ADXL345_INT1_PIN );
    setInterruptMapping( ADXL345_INT_FREE_FALL_BIT,    ADXL345_INT1_PIN );
    setInterruptMapping( ADXL345_INT_ACTIVITY_BIT,     ADXL345_INT1_PIN );
    setInterruptMapping( ADXL345_INT_INACTIVITY_BIT,   ADXL345_INT1_PIN );

    //register interrupt actions - 1 == on; 0 == off
    setInterrupt( ADXL345_INT_SINGLE_TAP_BIT, 1);
    setInterrupt( ADXL345_INT_DOUBLE_TAP_BIT, 1);
    setInterrupt( ADXL345_INT_FREE_FALL_BIT,  1);
    setInterrupt( ADXL345_INT_ACTIVITY_BIT,   1);
    setInterrupt( ADXL345_INT_INACTIVITY_BIT, 1);
}


void ADXL345::powerOn() {
    
    Wire.begin();        // join i2c bus (address optional for master)
    //Turning on the ADXL345
    writeTo(ADXL345_POWER_CTL, 0);
    writeTo(ADXL345_POWER_CTL, 16);
    writeTo(ADXL345_POWER_CTL, 8);
}

// Reads the acceleration into three variable x, y and z
void ADXL345::readAccel(int *xyz){
    readXYZ(xyz, xyz + 1, xyz + 2);
}
void ADXL345::readXYZ(int *x, int *y, int *z) {
    readFrom(ADXL345_DATAX0, ADXL345_TO_READ, _buff); //read the acceleration data from the ADXL345
    *x = (short)((((unsigned short)_buff[1]) << 8) | _buff[0]);
    *y = (short)((((unsigned short)_buff[3]) << 8) | _buff[2]);
    *z = (short)((((unsigned short)_buff[5]) << 8) | _buff[4]);
}

void ADXL345::getAcceleration(double *xyz){
    int i;
    int xyz_int[3];
    readAccel(xyz_int);
    for(i=0; i<3; i++){
        xyz[i] = xyz_int[i] * gains[i];
    }
}
// Writes val to address register on device
void ADXL345::writeTo(byte address, byte val) {
    Wire.beginTransmission(ADXL345_DEVICE); // start transmission to device
    Wire.write(address);             // send register address
    Wire.write(val);                 // send value to write
    Wire.endTransmission();         // end transmission
}

// Reads num bytes starting from address register on device in to _buff array
void ADXL345::readFrom(byte address, int num, byte _buff[]) {
    Wire.beginTransmission(ADXL345_DEVICE); // start transmission to device
    Wire.write(address);             // sends address to read from
    Wire.endTransmission();         // end transmission

    Wire.beginTransmission(ADXL345_DEVICE); // start transmission to device
    Wire.requestFrom(ADXL345_DEVICE, num);    // request 6 bytes from device

    int i = 0;
    while(Wire.available())         // device may send less than requested (abnormal)
    {
        _buff[i] = Wire.read();    // receive a byte
        i++;
    }
    if(i != num){
        status = ADXL345_ERROR;
        error_code = ADXL345_READ_ERROR;
    }
    Wire.endTransmission();         // end transmission
}

// Gets the range setting and return it into rangeSetting
// it can be 2, 4, 8 or 16
void ADXL345::getRangeSetting(byte* rangeSetting) {
    byte _b;
    readFrom(ADXL345_DATA_FORMAT, 1, &_b);
    *rangeSetting = _b & B00000011;
}

// Sets the range setting, possible values are: 2, 4, 8, 16
void ADXL345::setRangeSetting(int val) {
    byte _s;
    byte _b;

    switch (val) {
        case 2:
        _s = B00000000;
        break;
        case 4:
        _s = B00000001;
        break;
        case 8:
        _s = B00000010;
        break;
        case 16:
        _s = B00000011;
        break;
        default:
        _s = B00000000;
    }
    readFrom(ADXL345_DATA_FORMAT, 1, &_b);
    _s |= (_b & B11101100);
    writeTo(ADXL345_DATA_FORMAT, _s);
}
// gets the state of the SELF_TEST bit
bool ADXL345::getSelfTestBit() {
    return getRegisterBit(ADXL345_DATA_FORMAT, 7);
}

// Sets the SELF-TEST bit
// if set to 1 it applies a self-test force to the sensor causing a shift in the output data
// if set to 0 it disables the self-test force
void ADXL345::setSelfTestBit(bool selfTestBit) {
    setRegisterBit(ADXL345_DATA_FORMAT, 7, selfTestBit);
}

// Gets the state of the SPI bit
bool ADXL345::getSpiBit() {
    return getRegisterBit(ADXL345_DATA_FORMAT, 6);
}

// Sets the SPI bit
// if set to 1 it sets the device to 3-wire mode
// if set to 0 it sets the device to 4-wire SPI mode
void ADXL345::setSpiBit(bool spiBit) {
    setRegisterBit(ADXL345_DATA_FORMAT, 6, spiBit);
}

// Gets the state of the INT_INVERT bit
bool ADXL345::getInterruptLevelBit() {
    return getRegisterBit(ADXL345_DATA_FORMAT, 5);
}

// Sets the INT_INVERT bit
// if set to 0 sets the interrupts to active high
// if set to 1 sets the interrupts to active low
void ADXL345::setInterruptLevelBit(bool interruptLevelBit) {
    setRegisterBit(ADXL345_DATA_FORMAT, 5, interruptLevelBit);
}

// Gets the state of the FULL_RES bit
bool ADXL345::getFullResBit() {
    return getRegisterBit(ADXL345_DATA_FORMAT, 3);
}

// Sets the FULL_RES bit
// if set to 1, the device is in full resolution mode, where the output resolution increases with the
//   g range set by the range bits to maintain a 4mg/LSB scal factor
// if set to 0, the device is in 10-bit mode, and the range buts determine the maximum g range
//   and scale factor
void ADXL345::setFullResBit(bool fullResBit) {
    setRegisterBit(ADXL345_DATA_FORMAT, 3, fullResBit);
}

// Gets the state of the justify bit
bool ADXL345::getJustifyBit() {
    return getRegisterBit(ADXL345_DATA_FORMAT, 2);
}

// Sets the JUSTIFY bit
// if sets to 1 selects the left justified mode
// if sets to 0 selects right justified mode with sign extension
void ADXL345::setJustifyBit(bool justifyBit) {
    setRegisterBit(ADXL345_DATA_FORMAT, 2, justifyBit);
}

// Sets the THRESH_TAP byte value
// it should be between 0 and 255
// the scale factor is 62.5 mg/LSB
// A value of 0 may result in undesirable behavior
void ADXL345::setTapThreshold(int tapThreshold) {
    tapThreshold = constrain(tapThreshold,0,255);
    byte _b = byte (tapThreshold);
    writeTo(ADXL345_THRESH_TAP, _b);
}

// Gets the THRESH_TAP byte value
// return value is comprised between 0 and 255
// the scale factor is 62.5 mg/LSB
int ADXL345::getTapThreshold() {
    byte _b;
    readFrom(ADXL345_THRESH_TAP, 1, &_b);
    return int (_b);
}

// set/get the gain for each axis in Gs / count
void ADXL345::setAxisGains(double *_gains){
    int i;
    for(i = 0; i < 3; i++){
        gains[i] = _gains[i];
    }
}
void ADXL345::getAxisGains(double *_gains){
    int i;
    for(i = 0; i < 3; i++){
        _gains[i] = gains[i];
    }
}


// Sets the OFSX, OFSY and OFSZ bytes
// OFSX, OFSY and OFSZ are user offset adjustments in twos complement format with
// a scale factor of 15,6mg/LSB
// OFSX, OFSY and OFSZ should be comprised between
void ADXL345::setAxisOffset(int x, int y, int z) {
    writeTo(ADXL345_OFSX, byte (x));
    writeTo(ADXL345_OFSY, byte (y));
    writeTo(ADXL345_OFSZ, byte (z));
}

// Gets the OFSX, OFSY and OFSZ bytes
void ADXL345::getAxisOffset(int* x, int* y, int*z) {
    byte _b;
    readFrom(ADXL345_OFSX, 1, &_b);
    *x = int (_b);
    readFrom(ADXL345_OFSY, 1, &_b);
    *y = int (_b);
    readFrom(ADXL345_OFSZ, 1, &_b);
    *z = int (_b);
}

// Sets the DUR byte
// The DUR byte contains an unsigned time value representing the maximum time
// that an event must be above THRESH_TAP threshold to qualify as a tap event
// The scale factor is 625μs/LSB
// A value of 0 disables the tap/double tap funcitons. Max value is 255.
void ADXL345::setTapDuration(int tapDuration) {
    tapDuration = constrain(tapDuration,0,255);
    byte _b = byte (tapDuration);
    writeTo(ADXL345_DUR, _b);
}

// Gets the DUR byte
int ADXL345::getTapDuration() {
    byte _b;
    readFrom(ADXL345_DUR, 1, &_b);
    return int (_b);
}

// Sets the latency (latent register) which contains an unsigned time value
// representing the wait time from the detection of a tap event to the start
// of the time window, during which a possible second tap can be detected.
// The scale factor is 1.25ms/LSB. A value of 0 disables the double tap function.
// It accepts a maximum value of 255.
void ADXL345::setDoubleTapLatency(int doubleTapLatency) {
    byte _b = byte (doubleTapLatency);
    writeTo(ADXL345_LATENT, _b);
}

// Gets the Latent value
int ADXL345::getDoubleTapLatency() {
    byte _b;
    readFrom(ADXL345_LATENT, 1, &_b);
    return int (_b);
}

// Sets the Window register, which contains an unsigned time value representing
// the amount of time after the expiration of the latency time (Latent register)
// during which a second valud tap can begin. The scale factor is 1.25ms/LSB. A
// value of 0 disables the double tap function. The maximum value is 255.
void ADXL345::setDoubleTapWindow(int doubleTapWindow) {
    doubleTapWindow = constrain(doubleTapWindow,0,255);
    byte _b = byte (doubleTapWindow);
    writeTo(ADXL345_WINDOW, _b);
}

// Gets the Window register
int ADXL345::getDoubleTapWindow() {
    byte _b;
    readFrom(ADXL345_WINDOW, 1, &_b);
    return int (_b);
}

// Sets the THRESH_ACT byte which holds the threshold value for detecting activity.
// The data format is unsigned, so the magnitude of the activity event is compared
// with the value is compared with the value in the THRESH_ACT register. The scale
// factor is 62.5mg/LSB. A value of 0 may result in undesirable behavior if the
// activity interrupt is enabled. The maximum value is 255.
void ADXL345::setActivityThreshold(int activityThreshold) {
    activityThreshold = constrain(activityThreshold,0,255);
    byte _b = byte (activityThreshold);
    writeTo(ADXL345_THRESH_ACT, _b);
}

// Gets the THRESH_ACT byte
int ADXL345::getActivityThreshold() {
    byte _b;
    readFrom(ADXL345_THRESH_ACT, 1, &_b);
    return int (_b);
}

// Sets the THRESH_INACT byte which holds the threshold value for detecting inactivity.
// The data format is unsigned, so the magnitude of the inactivity event is compared
// with the value is compared with the value in the THRESH_INACT register. The scale
// factor is 62.5mg/LSB. A value of 0 may result in undesirable behavior if the
// inactivity interrupt is enabled. The maximum value is 255.
void ADXL345::setInactivityThreshold(int inactivityThreshold) {
    inactivityThreshold = constrain(inactivityThreshold,0,255);
    byte _b = byte (inactivityThreshold);
    writeTo(ADXL345_THRESH_INACT, _b);
}

// Gets the THRESH_INACT byte
int ADXL345::getInactivityThreshold() {
    byte _b;
    readFrom(ADXL345_THRESH_INACT, 1, &_b);
    return int (_b);
}

// Sets the TIME_INACT register, which contains an unsigned time value representing the
// amount of time that acceleration must be less thant the value in the THRESH_INACT
// register for inactivity to be declared. The scale factor is 1sec/LSB. The value must
// be between 0 and 255.
void ADXL345::setTimeInactivity(int timeInactivity) {
    timeInactivity = constrain(timeInactivity,0,255);
    byte _b = byte (timeInactivity);
    writeTo(ADXL345_TIME_INACT, _b);
}

// Gets the TIME_INACT register
int ADXL345::getTimeInactivity() {
    byte _b;
    readFrom(ADXL345_TIME_INACT, 1, &_b);
    return int (_b);
}

// Sets the THRESH_FF register which holds the threshold value, in an unsigned format, for
// free-fall detection. The root-sum-square (RSS) value of all axes is calculated and
// compared whith the value in THRESH_FF to determine if a free-fall event occured. The
// scale factor is 62.5mg/LSB. A value of 0 may result in undesirable behavior if the free-fall
// interrupt is enabled. The maximum value is 255.
void ADXL345::setFreeFallThreshold(int freeFallThreshold) {
    freeFallThreshold = constrain(freeFallThreshold,0,255);
    byte _b = byte (freeFallThreshold);
    writeTo(ADXL345_THRESH_FF, _b);
}

// Gets the THRESH_FF register.
int ADXL345::getFreeFallThreshold() {
    byte _b;
    readFrom(ADXL345_THRESH_FF, 1, &_b);
    return int (_b);
}

// Sets the TIME_FF register, which holds an unsigned time value representing the minimum
// time that the RSS value of all axes must be less than THRESH_FF to generate a free-fall
// interrupt. The scale factor is 5ms/LSB. A value of 0 may result in undesirable behavior if
// the free-fall interrupt is enabled. The maximum value is 255.
void ADXL345::setFreeFallDuration(int freeFallDuration) {
    freeFallDuration = constrain(freeFallDuration,0,255);
    byte _b = byte (freeFallDuration);
    writeTo(ADXL345_TIME_FF, _b);
}

// Gets the TIME_FF register.
int ADXL345::getFreeFallDuration() {
    byte _b;
    readFrom(ADXL345_TIME_FF, 1, &_b);
    return int (_b);
}

bool ADXL345::isActivityXEnabled() {
    return getRegisterBit(ADXL345_ACT_INACT_CTL, 6);
}
bool ADXL345::isActivityYEnabled() {
    return getRegisterBit(ADXL345_ACT_INACT_CTL, 5);
}
bool ADXL345::isActivityZEnabled() {
    return getRegisterBit(ADXL345_ACT_INACT_CTL, 4);
}
bool ADXL345::isInactivityXEnabled() {
    return getRegisterBit(ADXL345_ACT_INACT_CTL, 2);
}
bool ADXL345::isInactivityYEnabled() {
    return getRegisterBit(ADXL345_ACT_INACT_CTL, 1);
}
bool ADXL345::isInactivityZEnabled() {
    return getRegisterBit(ADXL345_ACT_INACT_CTL, 0);
}

void ADXL345::setActivityX(bool state) {
    setRegisterBit(ADXL345_ACT_INACT_CTL, 6, state);
}
void ADXL345::setActivityY(bool state) {
    setRegisterBit(ADXL345_ACT_INACT_CTL, 5, state);
}
void ADXL345::setActivityZ(bool state) {
    setRegisterBit(ADXL345_ACT_INACT_CTL, 4, state);
}
void ADXL345::setInactivityX(bool state) {
    setRegisterBit(ADXL345_ACT_INACT_CTL, 2, state);
}
void ADXL345::setInactivityY(bool state) {
    setRegisterBit(ADXL345_ACT_INACT_CTL, 1, state);
}
void ADXL345::setInactivityZ(bool state) {
    setRegisterBit(ADXL345_ACT_INACT_CTL, 0, state);
}

bool ADXL345::isActivityAc() {
    return getRegisterBit(ADXL345_ACT_INACT_CTL, 7);
}
bool ADXL345::isInactivityAc(){
    return getRegisterBit(ADXL345_ACT_INACT_CTL, 3);
}

void ADXL345::setActivityAc(bool state) {
    setRegisterBit(ADXL345_ACT_INACT_CTL, 7, state);
}
void ADXL345::setInactivityAc(bool state) {
    setRegisterBit(ADXL345_ACT_INACT_CTL, 3, state);
}

bool ADXL345::getSuppressBit(){
    return getRegisterBit(ADXL345_TAP_AXES, 3);
}
void ADXL345::setSuppressBit(bool state) {
    setRegisterBit(ADXL345_TAP_AXES, 3, state);
}

bool ADXL345::isTapDetectionOnX(){
    return getRegisterBit(ADXL345_TAP_AXES, 2);
}
void ADXL345::setTapDetectionOnX(bool state) {
    setRegisterBit(ADXL345_TAP_AXES, 2, state);
}
bool ADXL345::isTapDetectionOnY(){
    return getRegisterBit(ADXL345_TAP_AXES, 1);
}
void ADXL345::setTapDetectionOnY(bool state) {
    setRegisterBit(ADXL345_TAP_AXES, 1, state);
}
bool ADXL345::isTapDetectionOnZ(){
    return getRegisterBit(ADXL345_TAP_AXES, 0);
}
void ADXL345::setTapDetectionOnZ(bool state) {
    setRegisterBit(ADXL345_TAP_AXES, 0, state);
}

bool ADXL345::isActivitySourceOnX(){
    return getRegisterBit(ADXL345_ACT_TAP_STATUS, 6);
}
bool ADXL345::isActivitySourceOnY(){
    return getRegisterBit(ADXL345_ACT_TAP_STATUS, 5);
}
bool ADXL345::isActivitySourceOnZ(){
    return getRegisterBit(ADXL345_ACT_TAP_STATUS, 4);
}

bool ADXL345::isTapSourceOnX(){
    return getRegisterBit(ADXL345_ACT_TAP_STATUS, 2);
}
bool ADXL345::isTapSourceOnY(){
    return getRegisterBit(ADXL345_ACT_TAP_STATUS, 1);
}
bool ADXL345::isTapSourceOnZ(){
    return getRegisterBit(ADXL345_ACT_TAP_STATUS, 0);
}

bool ADXL345::isAsleep(){
    return getRegisterBit(ADXL345_ACT_TAP_STATUS, 3);
}

bool ADXL345::isLowPower(){
    return getRegisterBit(ADXL345_BW_RATE, 4);
}
void ADXL345::setLowPower(bool state) {
    setRegisterBit(ADXL345_BW_RATE, 4, state);
}

double ADXL345::getRate(){
    byte _b;
    readFrom(ADXL345_BW_RATE, 1, &_b);
    _b &= B00001111;
    return (pow(2,((int) _b)-6)) * 6.25;
}

void ADXL345::setRate(double rate){
    byte _b,_s;
    int v = (int) (rate / 6.25);
    int r = 0;
    while (v >>= 1)
    {
        r++;
    }
    if (r <= 9) {
        readFrom(ADXL345_BW_RATE, 1, &_b);
        _s = (byte) (r + 6) | (_b & B11110000);
        writeTo(ADXL345_BW_RATE, _s);
    }
}

void ADXL345::set_bw(byte bw_code){
    if((bw_code < ADXL345_BW_3) || (bw_code > ADXL345_BW_1600)){
        status = false;
        error_code = ADXL345_BAD_ARG;
    }
    else{
        writeTo(ADXL345_BW_RATE, bw_code);
    }
}

byte ADXL345::get_bw_code(){
    byte bw_code;
    readFrom(ADXL345_BW_RATE, 1, &bw_code);
    return bw_code;
}





//Used to check if action was triggered in interrupts
//Example triggered(interrupts, ADXL345_SINGLE_TAP);
bool ADXL345::triggered(byte interrupts, int mask){
    return ((interrupts >> mask) & 1);
}


/*
 ADXL345_DATA_READY
 ADXL345_SINGLE_TAP
 ADXL345_DOUBLE_TAP
 ADXL345_ACTIVITY
 ADXL345_INACTIVITY
 ADXL345_FREE_FALL
 ADXL345_WATERMARK
 ADXL345_OVERRUNY
 */





byte ADXL345::getInterruptSource() {
    byte _b;
    readFrom(ADXL345_INT_SOURCE, 1, &_b);
    return _b;
}

bool ADXL345::getInterruptSource(byte interruptBit) {
    return getRegisterBit(ADXL345_INT_SOURCE,interruptBit);
}

bool ADXL345::getInterruptMapping(byte interruptBit) {
    return getRegisterBit(ADXL345_INT_MAP,interruptBit);
}

// Set the mapping of an interrupt to pin1 or pin2
// eg: setInterruptMapping(ADXL345_INT_DOUBLE_TAP_BIT,ADXL345_INT2_PIN);
void ADXL345::setInterruptMapping(byte interruptBit, bool interruptPin) {
    setRegisterBit(ADXL345_INT_MAP, interruptBit, interruptPin);
}

bool ADXL345::isInterruptEnabled(byte interruptBit) {
    return getRegisterBit(ADXL345_INT_ENABLE,interruptBit);
}

void ADXL345::setInterrupt(byte interruptBit, bool state) {
    setRegisterBit(ADXL345_INT_ENABLE, interruptBit, state);
}

void ADXL345::setRegisterBit(byte regAdress, int bitPos, bool state) {
    byte _b;
    readFrom(regAdress, 1, &_b);
    if (state) {
        _b |= (1 << bitPos);  // forces nth bit of _b to be 1.  all other bits left alone.
    }
    else {
        _b &= ~(1 << bitPos); // forces nth bit of _b to be 0.  all other bits left alone.
    }
    writeTo(regAdress, _b);
}

bool ADXL345::getRegisterBit(byte regAdress, int bitPos) {
    byte _b;
    readFrom(regAdress, 1, &_b);
    return ((_b >> bitPos) & 1);
}

// print all register value to the serial ouptut, which requires it to be setup
// this can be used to manually to check the current configuration of the device
void ADXL345::printAllRegister() {
    byte _b;
    Serial.print("0x00: ");
    readFrom(0x00, 1, &_b);
    print_byte(_b);
    Serial.println("");
    int i;
    for (i=29;i<=57;i++){
        Serial.print("0x");
        Serial.print(i, HEX);
        Serial.print(": ");
        readFrom(i, 1, &_b);
        print_byte(_b);
        Serial.println("");
    }
}

void print_byte(byte val){
    int i;
    Serial.print("B");
    for(i=7; i>=0; i--){
        Serial.print(val >> i & 1, BIN);
    }
}
