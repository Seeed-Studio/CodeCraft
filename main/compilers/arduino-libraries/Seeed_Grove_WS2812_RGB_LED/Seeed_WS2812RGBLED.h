/*--------------------------------------------------------------------
  This file is part of the Adafruit NeoPixel library.

  NeoPixel is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as
  published by the Free Software Foundation, either version 3 of
  the License, or (at your option) any later version.

  NeoPixel is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with NeoPixel.  If not, see
  <http://www.gnu.org/licenses/>.
  --------------------------------------------------------------------*/

#ifndef _Seeed_WS2812_RGB_LED_H_
#define _Seeed_WS2812_RGB_LED_H_


#if (ARDUINO >= 100)
	#include <Arduino.h>
#else
	#include <WProgram.h>
	#include <pins_arduino.h>
#endif


// 'type' flags for LED pixels (third parameter to constructor):
#define NEO_RGB     0x00 // Wired for RGB data order
#define NEO_GRB     0x01 // Wired for GRB data order
#define NEO_COLMASK 0x01
#define NEO_KHZ400  0x00 // 400 KHz datastream
#define NEO_KHZ800  0x02 // 800 KHz datastream
#define NEO_SPDMASK 0x02

#define LED_MAX_NUM	32


class WS2812RGBLED
{
public:
	/**
	*  \brief Initialize LED strip.
	*
	*  \param [in] p the pin number.
	*
	*/
	WS2812RGBLED(int p);

	/**
	*  \brief Start up the LED strip.
	*
	*/
	void Init(void);
	
	/**
	*  \brief Set data to LED strip.
	*
	*  \param [in] i the serial number of LEDs.
	*  \param [in] red the red color data, from 0 to 255.
	*  \param [in] green the green color data, from 0 to 255.
	*  \param [in] blue the blue color data, from 0 to 255.
	*
	*/
	void setPixelColor(int i,int red,int green,int blue);
    
    WS2812RGBLED()
    {
        numLEDs = LED_MAX_NUM;
        numBytes = LED_MAX_NUM * 3;
        
        type = NEO_GRB + NEO_KHZ800;

        if((pixels = (uint8_t *)malloc(numBytes)))
        {
            memset(pixels, 0, numBytes);
        }
    }
    
    void Ws2812WriteData(int p, int i,int red,int green,int blue)
    {
        pin = p;
        
#ifdef __AVR__
        port = portOutputRegister(digitalPinToPort(p));
        pinMask = digitalPinToBitMask(p);
#endif
        pinMode(pin, OUTPUT);
        digitalWrite(pin, LOW);
        
        setPixelColor(i, red, green, blue);
    }

private:

	void show(void);
	void setPixelColor(uint16_t n, uint32_t c);
	void setBrightness(uint8_t b);
	uint16_t numPixels(void);
	static uint32_t	Color(uint8_t r, uint8_t g, uint8_t b);
	uint32_t getPixelColor(uint16_t n);
	
	uint16_t numLEDs;      // Number of RGB LEDs in strip
	uint16_t numBytes;     // Size of 'pixels' buffer below
	uint8_t pin;           // Output pin number
	uint8_t type;          // Pixel flags (400 vs 800 KHz, RGB vs GRB color)
	
	uint8_t	brightness;
	uint8_t *pixels;        	 // Holds LED color values (3 bytes each)
	uint32_t endTime;       	 // Latch timing reference
	
#ifdef __AVR__
	volatile uint8_t *port; // Output PORT register
	uint8_t pinMask;        // Output PORT bitmask
#endif
};


#endif // _ADAFRUIT_NEOPIXEL_H_
