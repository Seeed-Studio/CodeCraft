/**
    The MIT License (MIT)

    title: a Arduino library for XPT2046

    Author: Seeed

    Copyright (C) 2019  Seeed Technology Co.,Ltd.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

#ifndef __XPT2046_H
#define	__XPT2046_H

#include "Arduino.h"
/******************************* XPT2046 touch screen parameters ***************************/
//The difference threshold of AD value of touch coordinates when calibrating touch screen
#define             XPT2046_THRESHOLD_CalDiff                    2

#define	            XPT2046_CHANNEL_X 	                          0x90 	          //Channel Y+ 
#define	            XPT2046_CHANNEL_Y 	                          0xd0	          //Channel X+ 

/*******************************  XPT2046 data type ***************************/
typedef	struct {        //LCD　coordinate
    /*A negative number indicates no new data*/
    int16_t x;			//Record the latest touch coordinate
    int16_t y;

    /*Record the last touch coordinate during long press*/
    int16_t pre_x;
    int16_t pre_y;

} strType_XPT2046_Coordinate;

typedef struct {       //Calibrate factor structures
    float An,  		 //ps:sizeof(long double) = 8
          Bn,
          Cn,
          Dn,
          En,
          Fn,
          Divider;

} strType_XPT2046_Calibration;


typedef struct {       //Calibration factor structure (final use)
    float dX_X,
          dX_Y,
          dX,
          dY_X,
          dY_Y,
          dY;

} strType_XPT2046_TouchPara;

/******touch state******/
typedef enum {
    XPT2046_STATE_RELEASE  = 0,	//release
    XPT2046_STATE_WAITING,			//press
    XPT2046_STATE_PRESSED,			//press
} enumTouchState	;

#define TOUCH_PRESSED 				1
#define TOUCH_NOT_PRESSED			0

//Touch the buffering threshold
#define DURIATION_TIME				2

class XPT2046 {
  private:
    uint32_t _mosi;
    uint32_t _miso;
    uint32_t _sck;
    uint32_t _cs;
    uint32_t _penIrq;
    uint8_t _touchFlag;

    void writeCMD(uint8_t cmd);
    uint8_t touchDetect(void);
    uint16_t readCMD(void);
    uint16_t readADC(uint8_t channel);

  public:
    XPT2046(uint32_t mosi, uint32_t miso, uint32_t sck, uint32_t cs, uint32_t penIrq);
    ~XPT2046();
    void begin();
    void getRaw(uint16_t* sX_Ad, uint16_t* sY_Ad);
    uint8_t getXY(uint16_t* sX_Ad, uint16_t* sY_Ad);
    uint8_t Calculate_CalibrationFactor(strType_XPT2046_Coordinate* pDisplayCoordinate,
                                        strType_XPT2046_Coordinate* pScreenSample, strType_XPT2046_Calibration* pCalibrationFactor);
    void Touch_Calibrate();
    bool touchDown();
    bool touchUp();
    strType_XPT2046_TouchPara strXPT2046_TouchPara[48];

};


static void XPT2046_DelayUS(uint32_t ulCount) {
    uint32_t i;

    for (i = 0; i < ulCount; i ++) {
        uint8_t uc = 12;

        while (uc --);       //delay 1 us

    }

}

XPT2046::XPT2046(uint32_t mosi, uint32_t miso, uint32_t sck, uint32_t cs, uint32_t penIrq) {
    _mosi = mosi;
    _miso = miso;
    _sck = sck;
    _cs = cs;
    _penIrq = penIrq;
}

XPT2046::~XPT2046() {

}

void XPT2046::begin() {
    /* IO Mux */

    pinMode(_mosi, OUTPUT);
    pinMode(_miso, INPUT_PULLDOWN);
    pinMode(_cs, OUTPUT);
    pinMode(_sck, OUTPUT);

    pinMode(_penIrq, INPUT_PULLUP);

    digitalWrite(_cs, LOW);
}

void XPT2046::writeCMD(uint8_t ucCmd) {
    uint8_t i;

    digitalWrite(_mosi, LOW);
    digitalWrite(_sck, LOW);


    for (i = 0; i < 8; i ++) {
        ((ucCmd >> (7 - i)) & 0x01) ? digitalWrite(_mosi, HIGH) : digitalWrite(_mosi, LOW);

        XPT2046_DelayUS(5);
        digitalWrite(_sck, HIGH);
        XPT2046_DelayUS(5);
        digitalWrite(_sck, LOW);
    }
}

uint16_t XPT2046::readCMD() {
    uint8_t i;
    uint16_t usBuf = 0, usTemp;

    digitalWrite(_mosi, LOW);
    digitalWrite(_sck, HIGH);

    for (i = 0; i < 12; i++) {
        digitalWrite(_sck, LOW);

        usTemp = digitalRead(_miso);

        usBuf |= usTemp << (11 - i);

        digitalWrite(_sck, HIGH);

    }
    return usBuf;
}

uint16_t XPT2046::readADC(uint8_t ucChannel) {
    writeCMD(ucChannel);

    return readCMD();
}

void XPT2046::getRaw(uint16_t* sX_Ad, uint16_t* sY_Ad) {
    uint16_t sX_Ad_Temp, sY_Ad_Temp;

    sX_Ad_Temp = readADC(XPT2046_CHANNEL_X);

    XPT2046_DelayUS(1);

    sY_Ad_Temp = readADC(XPT2046_CHANNEL_Y);

    * sX_Ad = sX_Ad_Temp;
    * sY_Ad = sY_Ad_Temp;
}

bool XPT2046::touchDown() {
    if (touchDetect() == TOUCH_PRESSED) {
        return true;
    } else {
        return false;
    }
}

bool XPT2046::touchUp() {
    if (touchDetect() != TOUCH_PRESSED) {
        return true;
    } else {
        return false;
    }
}

uint8_t XPT2046::touchDetect() {
    static enumTouchState touch_state = XPT2046_STATE_RELEASE;
    static uint32_t i;
    uint8_t detectResult = TOUCH_NOT_PRESSED;

    switch (touch_state) {
        case XPT2046_STATE_RELEASE:
            if (digitalRead(_penIrq) == 0) { //First touch signal
                touch_state = XPT2046_STATE_WAITING;
                detectResult = TOUCH_NOT_PRESSED;
            } else {	//No touch
                touch_state = XPT2046_STATE_RELEASE;
                detectResult = TOUCH_NOT_PRESSED;
            }
            break;

        case XPT2046_STATE_WAITING:
            if (digitalRead(_penIrq) == 0) {
                i++;
                //If the wait time is greater than the threshold, the touch is considered to be pressed
                //Buffeting time = DURIATION_TIME * the interval between calls to this function
                //If called in the timer, every 10ms, the buffeting time is: DURIATION_TIME*10ms
                if (i > DURIATION_TIME) {
                    i = 0;
                    touch_state = XPT2046_STATE_PRESSED;
                    detectResult = TOUCH_PRESSED;
                } else {											//Accumulation of waiting time
                    touch_state = XPT2046_STATE_WAITING;
                    detectResult =	 TOUCH_NOT_PRESSED;
                }
            } else {	//Wait time value does not reach the threshold value is invalid level, as jitter processing
                i = 0;
                touch_state = XPT2046_STATE_RELEASE;
                detectResult = TOUCH_NOT_PRESSED;
            }

            break;

        case XPT2046_STATE_PRESSED:
            if (digitalRead(_penIrq) == 0) {	//Touch keeps pressing down
                touch_state = XPT2046_STATE_PRESSED;
                detectResult = TOUCH_PRESSED;
            } else {	//Touch release
                touch_state = XPT2046_STATE_RELEASE;
                detectResult = TOUCH_NOT_PRESSED;
            }
            break;

        default:
            touch_state = XPT2046_STATE_RELEASE;
            detectResult = TOUCH_NOT_PRESSED;
            break;

    }

    return detectResult;
}

uint8_t XPT2046::Calculate_CalibrationFactor(strType_XPT2046_Coordinate* pDisplayCoordinate,
        strType_XPT2046_Coordinate* pScreenSample, strType_XPT2046_Calibration* pCalibrationFactor) {
    uint8_t ucRet = 1;

    /* K＝ ( X0－X2 )  ( Y1－Y2 )－ ( X1－X2 )  ( Y0－Y2 ) */
    pCalibrationFactor -> Divider = ((pScreenSample [ 0 ] .x - pScreenSample [ 2 ] .x) *
                                     (pScreenSample [ 1 ] .y - pScreenSample [ 2 ] .y)) -
                                    ((pScreenSample [ 1 ] .x - pScreenSample [ 2 ] .x) * (pScreenSample [ 0 ] .y - pScreenSample [ 2 ] .y)) ;


    if (pCalibrationFactor -> Divider == 0) {
        ucRet = 0;
    }

    else {
        /* A＝ (  ( XD0－XD2 )  ( Y1－Y2 )－ ( XD1－XD2 )  ( Y0－Y2 ) )／K	*/
        pCalibrationFactor -> An = ((pDisplayCoordinate [ 0 ] .x - pDisplayCoordinate [ 2 ] .x) *
                                    (pScreenSample [ 1 ] .y - pScreenSample [ 2 ] .y)) -
                                   ((pDisplayCoordinate [ 1 ] .x - pDisplayCoordinate [ 2 ] .x) * (pScreenSample [ 0 ] .y - pScreenSample [ 2 ] .y));

        /* B＝ (  ( X0－X2 )  ( XD1－XD2 )－ ( XD0－XD2 )  ( X1－X2 ) )／K	*/
        pCalibrationFactor -> Bn = ((pScreenSample [ 0 ] .x - pScreenSample [ 2 ] .x) * (pDisplayCoordinate [ 1 ] .x -
                                    pDisplayCoordinate [ 2 ] .x)) -
                                   ((pDisplayCoordinate [ 0 ] .x - pDisplayCoordinate [ 2 ] .x) * (pScreenSample [ 1 ] .x - pScreenSample [ 2 ] .x));

        /* C＝ ( Y0 ( X2XD1－X1XD2 )+Y1 ( X0XD2－X2XD0 )+Y2 ( X1XD0－X0XD1 ) )／K */
        pCalibrationFactor -> Cn = (pScreenSample [ 2 ] .x * pDisplayCoordinate [ 1 ] .x - pScreenSample [ 1 ] .x *
                                    pDisplayCoordinate [ 2 ] .x) * pScreenSample [ 0 ] .y +
                                   (pScreenSample [ 0 ] .x * pDisplayCoordinate [ 2 ] .x - pScreenSample [ 2 ] .x * pDisplayCoordinate [ 0 ] .x) *
                                   pScreenSample [ 1 ] .y +
                                   (pScreenSample [ 1 ] .x * pDisplayCoordinate [ 0 ] .x - pScreenSample [ 0 ] .x * pDisplayCoordinate [ 1 ] .x) *
                                   pScreenSample [ 2 ] .y ;

        /* D＝ (  ( YD0－YD2 )  ( Y1－Y2 )－ ( YD1－YD2 )  ( Y0－Y2 ) )／K	*/
        pCalibrationFactor -> Dn = ((pDisplayCoordinate [ 0 ] .y - pDisplayCoordinate [ 2 ] .y) *
                                    (pScreenSample [ 1 ] .y - pScreenSample [ 2 ] .y)) -
                                   ((pDisplayCoordinate [ 1 ] .y - pDisplayCoordinate [ 2 ] .y) * (pScreenSample [ 0 ] .y - pScreenSample [ 2 ] .y)) ;

        /* E＝ (  ( X0－X2 )  ( YD1－YD2 )－ ( YD0－YD2 )  ( X1－X2 ) )／K	*/
        pCalibrationFactor -> En = ((pScreenSample [ 0 ] .x - pScreenSample [ 2 ] .x) * (pDisplayCoordinate [ 1 ] .y -
                                    pDisplayCoordinate [ 2 ] .y)) -
                                   ((pDisplayCoordinate [ 0 ] .y - pDisplayCoordinate [ 2 ] .y) * (pScreenSample [ 1 ] .x - pScreenSample [ 2 ] .x)) ;


        /* F＝ ( Y0 ( X2YD1－X1YD2 )+Y1 ( X0YD2－X2YD0 )+Y2 ( X1YD0－X0YD1 ) )／K */
        pCalibrationFactor -> Fn = (pScreenSample [ 2 ] .x * pDisplayCoordinate [ 1 ] .y - pScreenSample [ 1 ] .x *
                                    pDisplayCoordinate [ 2 ] .y) * pScreenSample [ 0 ] .y +
                                   (pScreenSample [ 0 ] .x * pDisplayCoordinate [ 2 ] .y - pScreenSample [ 2 ] .x * pDisplayCoordinate [ 0 ] .y) *
                                   pScreenSample [ 1 ] .y +
                                   (pScreenSample [ 1 ] .x * pDisplayCoordinate [ 0 ] .y - pScreenSample [ 0 ] .x * pDisplayCoordinate [ 1 ] .y) *
                                   pScreenSample [ 2 ] .y;

    }

    return ucRet;

}

void XPT2046::Touch_Calibrate() {
    // TODO
    return;
}

uint8_t XPT2046::getXY(uint16_t* sX_Ad, uint16_t* sY_Ad) {
    uint8_t ucCount = 0, i;

    uint16_t sAD_X, sAD_Y;
    int16_t sBufferArray [ 2 ] [ 10 ] = { { 0 }, { 0 } }; //The coordinates X and Y are sampled multiple times

    //tore the minimum and maximum values in the sample
    int32_t lX_Min, lX_Max, lY_Min, lY_Max;


    /* Cycle sampling 10 times */
    do {
        getRaw(& sAD_X, & sAD_Y);

        sBufferArray [ 0 ] [ ucCount ] = sAD_X;
        sBufferArray [ 1 ] [ ucCount ] = sAD_Y;

        ucCount ++;

    }	while ((digitalRead(_penIrq) == 0)
               && (ucCount < 10));      //when the user clicks on the touch screen, the TP_INT_IN signal is low and ucCount<10


    /*If the pen pops up*/
    if (digitalRead(_penIrq) != 0) {
        _touchFlag = 0;    //Interrupt mark reset
    }


    /*If 5 samples are successfully sampled*/
    if (ucCount == 10) {
        lX_Max = lX_Min = sBufferArray [ 0 ] [ 0 ];
        lY_Max = lY_Min = sBufferArray [ 1 ] [ 0 ];

        for (i = 1; i < 10; i ++) {
            if (sBufferArray[ 0 ] [ i ] < lX_Min) {
                lX_Min = sBufferArray [ 0 ] [ i ];
            }

            else if (sBufferArray [ 0 ] [ i ] > lX_Max) {
                lX_Max = sBufferArray [ 0 ] [ i ];
            }

        }

        for (i = 1; i < 10; i ++) {
            if (sBufferArray [ 1 ] [ i ] < lY_Min) {
                lY_Min = sBufferArray [ 1 ] [ i ];
            }

            else if (sBufferArray [ 1 ] [ i ] > lY_Max) {
                lY_Max = sBufferArray [ 1 ] [ i ];
            }

        }


        /*Take the average after removing the minimum and maximum*/
        *sX_Ad = (sBufferArray [ 0 ] [ 0 ] + sBufferArray [ 0 ] [ 1 ] + sBufferArray [ 0 ] [ 2 ] + sBufferArray [ 0 ] [ 3 ] +
                  sBufferArray [ 0 ] [ 4 ] +
                  sBufferArray [ 0 ] [ 5 ] + sBufferArray [ 0 ] [ 6 ] + sBufferArray [ 0 ] [ 7 ] + sBufferArray [ 0 ] [ 8 ] +
                  sBufferArray [ 0 ] [ 9 ] - lX_Min - lX_Max) >> 3;

        *sY_Ad = (sBufferArray [ 1 ] [ 0 ] + sBufferArray [ 1 ] [ 1 ] + sBufferArray [ 1 ] [ 2 ] + sBufferArray [ 1 ] [ 3 ] +
                  sBufferArray [ 1 ] [ 4 ] +
                  sBufferArray [ 1 ] [ 5 ] + sBufferArray [ 1 ] [ 6 ] + sBufferArray [ 1 ] [ 7 ] + sBufferArray [ 1 ] [ 8 ] +
                  sBufferArray [ 1 ] [ 9 ] - lY_Min - lY_Max) >> 3;

        return 1;
    }
    return 0;
}
XPT2046 xpt(XPT_MOSI, XPT_MISO, XPT_CLK, XPT_CS, XPT_PENIRQ);
#endif /*__XPT2046_H*/
