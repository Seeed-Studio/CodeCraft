/*
  seeed_unified_library_interface.cpp
  Seeed Unified Library Interface for Arduino Only
  
  2013 Copyright (c) Seeed Technology Inc.  All right reserved.

  Author:Loovee
  2012-3-7 - Create File
  2013-3-11 - I2C test ok
  2013-3-14 - UART test ok

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

#include "Arduino.h"
#include "Wire.h"
#include "SoftwareSerial.h"
#include "Suli.h"


/*
 * IO initialize
 * *pio - IO
 * pin - pin name
 */
void suli_pin_init(IO_T *pio, PIN_T pin)
{
    *pio = pin;
}


/*
 * set IO direction
 * - pio: IO device pointer
 * - dir: INPUT or OUTPUT
 */
void suli_pin_dir(IO_T *pio, DIR_T dir)
{
    pinMode(*pio, dir);
}


/*
 * write to IO
 * - pio: IO device pointer
 * - state: HIGH or LOW
 */
void suli_pin_write(IO_T *pio, int16 state)
{
    digitalWrite(*pio, state);
}


/*
 * read IO state
 * - pio: IO device pointer
 * return HIGH or LOW
 */
int16 suli_pin_read(IO_T *pio)
{
    return digitalRead(*pio);
}


/**
 * Reads a pulse (either HIGH or LOW) on a pin. For example, if value is HIGH, 
 * suli_pulse_in() waits for the pin to go HIGH, starts timing, 
 * then waits for the pin to go LOW and stops timing. Returns the length of the pulse in microseconds. 
 * Gives up and returns 0 if no pulse starts within a specified time out.
 * para -
 * pin: pins which you want to read the pulse.
 * state: type of pulse to read: either HIGH or LOW. (int)
 * timeout (optional): the number of microseconds to wait for the pulse to start; default is one second (unsigned long)
 */
 
 
uint32 suli_pulse_in(IO_T *pio, uint8 state, uint32 timeout)
{
    return pulseIn(*pio, state, timeout);
}


/*
 * Analog Init
 * - aio: gpio device pointer
 * - pin: pin name
 */
void suli_analog_init(ANALOG_T * aio, PIN_T pin)
{
    *aio = pin;
}


/*
 * Analog Read
 * As usually, 10bit ADC is enough, to increase the compatibility, will use only 10bit.
 * if if your ADC is 12bit, you need to >>2, or your ADC is 8Bit, you need to <<2
 */
int16 suli_analog_read(ANALOG_T * aio)
{
    return analogRead(*aio);
}


/*
 * delay us
 */
void suli_delay_us(uint32 us)
{
    delayMicroseconds(us);
}


/*
 * delay ms
 */
void suli_delay_ms(uint32 ms)
{
    delay(ms);
}


/*
 * Returns the number of milliseconds since your board began running the current program. 
 * This number will overflow (go back to zero), after approximately 50 days.
 */
uint32 suli_millis()
{
    return millis();
}


/*
 * Returns the number of microseconds since your board began running the current program. 
 * This number will overflow (go back to zero), after approximately 70 minutes.
 * Note: there are 1,000 microseconds in a millisecond and 1,000,000 microseconds in a second.
 */
uint32 suli_micros()
{
    return micros();
}


/*
 * I2C interface initialize. 
 */
void suli_i2c_init(void * i2c_device)
{
    ((TwoWire*)i2c_device) -> begin();
}


/*
 * write a buff to I2C
 * - i2c_device: i2c device pointer
 * - dev_addr: device address
 * - data: data buff
 * - len: data lenght
 */
uint8 suli_i2c_write(void * i2c_device, uint8 dev_addr, uint8 *data, uint8 len)
{
    dev_addr = dev_addr>>1;                                         
    
    ((TwoWire*)i2c_device) -> beginTransmission(dev_addr);          // start 
    for(int i=0; i<len; i++)
    {
        ((TwoWire*)i2c_device) -> write(data[i]);                   // send a byte
    }
    ((TwoWire*)i2c_device) -> endTransmission();                    // end 
    
    return len;
}


/*
 * read a buff to I2C
 * - i2c_device: i2c device pointer
 * - dev_addr: device address
 * - data: data buff
 * - len: data lenght
 * return
 */
uint8 suli_i2c_read(void * i2c_device, uint8 dev_addr, uint8 *buff, uint8 len)
{
    dev_addr = dev_addr>>1;
    ((TwoWire*)i2c_device) -> requestFrom(dev_addr, len);
    
    int sum_len = 0;
    while(((TwoWire*)i2c_device) -> available())
    {
        buff[sum_len++] = ((TwoWire*)i2c_device) -> read();
    }
    return sum_len;
}


/*
 * UART Init
 * - uart_device: uart device pointer
 * - uart_num: for some MCU, there's more than one uart, this is the number of uart
 *   for Arduino-UNO(or others use 328, 32u4, 168), these is a hardware uart and software uart.
 *   uart_num = -1 - Software Serial
 *   uart_num = 0, uart0
 *   uart_num = 1, uart1, Arduino Mega Only
 *   uart_num = 2, uart2, Arduino Mega Only
 *   uart_num = 3, uart3, Arduino Mega Only
 * - baud： baudrate
 */
void suli_uart_init(void * uart_device, int16 uart_num, uint32 baud)
{
    if(-1 == uart_num)
    {
        ((SoftwareSerial *)uart_device) -> begin(baud);
    }
    else if(0 == uart_num)
    {
#if defined(__AVR_ATmega32U4__)
        Serial1.begin(baud);
#else
        Serial.begin(baud);
#endif
    }
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
    else if(1 == uart_num)
    {
        Serial1.begin(baud);
    }
    else if(2 == uart_num)
    {
        Serial2.begin(baud);
    }
    else if(3 == uart_num)
    {
        Serial3.begin(baud);
    }
#endif
    
}


/*
 * Send a Buff to uart
 * - uart_device: uart device pointer
 * - uart_num: uart number
 * - *data: buff to sent
 * - len: data length
 */
void suli_uart_send(void * uart_device, int16 uart_num, uint8 *data, uint16 len)
{
    for(int i=0; i<len; i++)
    {
        suli_uart_send_byte(uart_device, uart_num, data[i]);
    }
}


/*
 * seed a byte to uart
 */
void suli_uart_send_byte(void * uart_device, int16 uart_num, uint8 data)
{
    if(-1 == uart_num)
    {
        ((SoftwareSerial *)uart_device) -> write(data);
    }
    else if(0 == uart_num)
    {
#if defined(__AVR_ATmega32U4__)
        Serial1.write(data);
#else
        Serial.write(data);
#endif
    }
    
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
    else if(1 == uart_num)
    {
        Serial1.write(data);
    }
    else if(2 == uart_num)
    {
        Serial2.write(data);
    }
    else if(3 == uart_num)
    {
        Serial3.write(data);
    }
#endif

}


/*
 * read a byte from uart
 */
uint8 suli_uart_read_byte(void * uart_device, int16 uart_num)
{

    if(-1 == uart_num)
    {
        return ((SoftwareSerial *)uart_device) -> read();
    }
    else if(0 == uart_num)
    {
#if defined(__AVR_ATmega32U4__)
        return Serial1.read();
#else
        return Serial.read();
#endif
    }
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
    else if(1 == uart_num)
    {
        return Serial1.read();
    }
    else if(2 == uart_num)
    {
        return Serial2.read();
    }
    else if(3 == uart_num)
    {
        return Serial3.read();
    }
#endif

}


/*
 * if uart get data, return 1-readable, 0-unreadable
 */
uint16 suli_uart_readable(void * uart_device, int16 uart_num)
{

    if(-1 == uart_num)
    {
        return ((SoftwareSerial *)uart_device) -> available();
    }
    else if(0 == uart_num)
    {
#if defined(__AVR_ATmega32U4__)
        return Serial1.available();
#else
        return Serial.available();
#endif
    }
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
    else if(1 == uart_num)
    {
        return Serial1.available();
    }
    else if(2 == uart_num)
    {
        return Serial2.available();
    }
    else if(3 == uart_num)
    {
        return Serial3.available();
    }
#endif

}

/*
 * write a float
 * num - number to write
 * decimal - x decimal point
 */
void suli_uart_write_float(void * uart_device, int16 uart_num, float num, uint8 decimal)
{

    if(-1 == uart_num)
    {
        ((SoftwareSerial *)uart_device) -> print(num, decimal);
    }
    else if(0 == uart_num)
    {
#if defined(__AVR_ATmega32U4__)
        Serial1.print(num, decimal);
#else
        Serial.print(num, decimal);
#endif
    }
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
    else if(1 == uart_num)
    {
        Serial1.print(num, decimal);
    }
    else if(2 == uart_num)
    {
        Serial2.print(num, decimal);
    }
    else if(3 == uart_num)
    {
        Serial3.print(num, decimal);
    }
#endif
}


/*
 * write an integer
 * num - number to write
 */
void suli_uart_write_int(void * uart_device, int16 uart_num, int32 num)
{
    if(-1 == uart_num)
    {
        ((SoftwareSerial *)uart_device) -> print(num);
    }
    else if(0 == uart_num)
    {
#if defined(__AVR_ATmega32U4__)
        Serial1.print(num);
#else
        Serial.print(num);
#endif
    }
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
    else if(1 == uart_num)
    {
        Serial1.print(num);
    }
    else if(2 == uart_num)
    {
        Serial2.print(num);
    }
    else if(3 == uart_num)
    {
        Serial3.print(num);
    }
#endif
}


