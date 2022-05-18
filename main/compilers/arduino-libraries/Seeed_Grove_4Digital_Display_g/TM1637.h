/*
 * TM1637.h
 * A library for the 4 digit display
 *
 * Copyright (c) 2012 seeed technology inc.
 * Website    : www.seeed.cc
 * Author     : Frankie.Chu
 * Create Time: 9 April,2012
 * Change Log :
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

#ifndef TM1637_h
#define TM1637_h
#include <inttypes.h>
#include <Arduino.h>
//************definitions for TM1637*********************
#define ADDR_AUTO  0x40
#define ADDR_FIXED 0x44

#define STARTADDR  0xc0
/**** definitions for the clock point of the digit tube *******/
#define POINT_ON   1
#define POINT_OFF  0
/**************definitions for brightness***********************/
#define  BRIGHT_DARKEST 0
#define  BRIGHT_TYPICAL 2
#define  BRIGHTEST      7

class TM1637
{
    
public:     // api for graphical programming project - loovee@2015-8-4

    TM1637(){set(BRIGHTEST);}
    
    /*
     * Function Name: DigitDisplayWrite
     * Input - pinClk, pin of clock
     *         pinDta, pin of data
     *         num, number to display, should be between 0-9999
     * Return - NULL
     */
    void DigitDisplayWrite(int pinClk, int pinDta, int num)
    {
        int Postive = 0x7f;
        
        if(num>9999)num=9999;
        if(num<-999)num=-999;
        
        //static int num_buf = 0;
        //if(num == num_buf)return;
        //num_buf = num;

        // init io
        Clkpin  = pinClk;
        Datapin = pinDta;
        pinMode(Clkpin, OUTPUT);
        pinMode(Datapin, OUTPUT);
  
        if(num<0)
        {
            num = -num;
            Postive = 16;
        }
        
        
        if(num<10)
        {
            display(3, num);
            display(2, Postive);
            display(1, 0x7f);
            display(0, 0x7f);
        }
        else if(num<100)
        {
            display(3, num%10);
            display(2, (num/10)%10);
            display(1, Postive);
            display(0, 0x7f);
        }
        else if(num<1000)
        {
            display(3, num%10);
            display(2, (num/10)%10);
            display(1, (num/100)%10);
            display(0, Postive);
        }
        else
        {
            display(3, num%10);
            display(2, (num/10)%10);
            display(1, (num/100)%10);
            display(0, (num/1000)%10);
        }
    }

public:

    TM1637(uint8_t, uint8_t);
    void init(void);        //To clear the display

    void display(int8_t DispData[]);
    void display(uint8_t BitAddr,int8_t DispData);
    void clearDisplay(void);
    void set(uint8_t = BRIGHT_TYPICAL,uint8_t = 0x40,uint8_t = 0xc0);//To take effect the next time it displays.
    void point(boolean PointFlag);//whether to light the clock point ":".To take effect the next time it displays.

    
private:
    uint8_t Clkpin;
    uint8_t Datapin;
    
    uint8_t Cmd_SetData;
    uint8_t Cmd_SetAddr;
    uint8_t Cmd_DispCtrl;
    boolean _PointFlag;     //_PointFlag=1:the clock point on

private:

    int  writeByte(int8_t wr_data);//write 8bit data to tm1637
    void start(void);//send start bits
    void stop(void); //send stop bits
    void coding(int8_t DispData[]);
    int8_t coding(int8_t DispData);
    void bitDelay(void);
};
#endif
