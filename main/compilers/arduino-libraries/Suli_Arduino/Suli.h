/*
  seeed_unified_library_interface.h
  Seeed Unified Library Interface for Arduino
  
  2014 Copyright (c) Seeed Technology Inc.  All right reserved.

  Author:Loovee
  2014-3-7 - Create File
  2014-3-11 - I2C test ok
  2014-3-14 - UART test ok

  2014-4-16 - UART add functions:
  suli_uart_write_float()
  suli_uart_write_int()
  
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

#ifndef __SEEED_UNIFIED_LIBRARY_INTERFACE_H__
#define __SEEED_UNIFIED_LIBRARY_INTERFACE_H__

#include <Arduino.h>

/**
 * GPIO TYPE, it means the data type you gpio name, 
 * such as, for Arduino, we use pinMode(pin, INPUT), and pin is int. 
 * but for mbed, it's gpio_t
 * For porting, you should modify here
 */
typedef     int     IO_T;                           // IO type
typedef     int     PIN_T;                          // pin name
typedef     int     DIR_T;                          // pin direction

typedef int ANALOG_T;                               // pin analog


/** 
 * PIN MODE
 * INPUT or OUTPUT
 */
#define HAL_PIN_INPUT   INPUT                       // INPUT and OUTPUT was declared in Arduino IDE
#define HAL_PIN_OUTPUT  OUTPUT


/**
 * PIN STATE
 * HIGH or LOW
 */
#define HAL_PIN_HIGH    HIGH                        // HIGH and LOW was declered in Arduino IDE
#define HAL_PIN_LOW     LOW


/**
 * DATA TYPE
 * ALL our suly-compatible library will will those data type
 */
typedef signed char     int8;
typedef unsigned char   uint8;
typedef signed short    int16;
typedef unsigned short  uint16;
typedef signed long     int32;
typedef unsigned long   uint32;


/**
 * Digital IO Operation
 * when use an IO, this IO should be initialized first.
 */
void suli_pin_init(IO_T *pio, PIN_T pin);      // pin initialize
void suli_pin_dir(IO_T *pio, DIR_T dir);       // set pin direction
void suli_pin_write(IO_T *pio, int16 state);   // write pin
int16 suli_pin_read(IO_T *pio);                // read pin


/**
 * Reads a pulse (either HIGH or LOW) on a pin. For example, if value is HIGH, 
 * suli_pulse_in() waits for the pin to go HIGH, starts timing, 
 * then waits for the pin to go LOW and stops timing. Returns the length of the pulse in microseconds. 
 * Gives up and returns 0 if no pulse starts within a specified time out.
 * para -
 * - pin: pins which you want to read the pulse.
 * - state: type of pulse to read: either HIGH or LOW. (int)
 * - timeout (optional): the number of microseconds to wait for the pulse to start; default is one second (unsigned long)
 */
uint32 suli_pulse_in(IO_T *pio, uint8 state, uint32 timeout);


/*
 * Analog IO Operation
 * As usually, 10bit ADC is enough, to increase the compatibility, will use only 10bit.
 * if if your ADC is 12bit, you need to >>2, or your ADC is 8Bit, you need to <<2
 */
void suli_analog_init(ANALOG_T * aio, PIN_T pin);
int16 suli_analog_read(ANALOG_T * aio);


/*
 * delay
 */
void suli_delay_us(uint32 us);                 // delay us
void suli_delay_ms(uint32 ms);                 // delay ms


/*
 * Returns the number of milliseconds since your board began running the current program. 
 * This number will overflow (go back to zero), after approximately 50 days.
*/
uint32 suli_millis(void);


/*
 * Returns the number of microseconds since your board began running the current program. 
 * This number will overflow (go back to zero), after approximately 70 minutes.
 * Note: there are 1,000 microseconds in a millisecond and 1,000,000 microseconds in a second.
 */
uint32 suli_micros(void);


// I2C

/*
 * I2C interface initialize. 
 */
void suli_i2c_init(void * i2c_device);


/*
 * write a buff to I2C
 */
uint8 suli_i2c_write(void * i2c_device, uint8 dev_addr, uint8 *data, uint8 len);

/*
 * read data from I2C
 */
uint8 suli_i2c_read(void * i2c_device, uint8 dev_addr, uint8 *buff, uint8 len);


// UART

/*
 * uart init
 */
void suli_uart_init(void * uart_device, int16 uart_num, uint32 baud);


/*
 * send a buff to uart
 */
void suli_uart_send(void * uart_device, int16 uart_num, uint8 *data, uint16 len);


/*
 * send a byte to uart
 */
void suli_uart_send_byte(void * uart_device, int16 uart_num, uint8 data);


/*
 * read a byte from uart
 */
uint8 suli_uart_read_byte(void * uart_device, int16 uart_num);


/*
 * if uart get data, return 1-readable, 0-unreadable
 */
uint16 suli_uart_readable(void * uart_device, int16 uart_num);


/*
 * write a float
 * num - number to write
 * decimal - x decimal point
 */
void suli_uart_write_float(void * uart_device, int16 uart_num, float num, uint8 decimal);


/*
 * write an integer
 * num - number to write
 */
void suli_uart_write_int(void * uart_device, int16 uart_num, int32 num);


#endif
