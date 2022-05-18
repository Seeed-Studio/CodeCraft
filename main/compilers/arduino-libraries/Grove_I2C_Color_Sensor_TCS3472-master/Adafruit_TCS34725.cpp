/**************************************************************************/
/*!
    @file     Adafruit_TCS34725.cpp
    @author   KTOWN (Adafruit Industries)
    @license  BSD (see license.txt)

    Driver for the TCS34725 digital color sensors.

    Adafruit invests time and resources providing this open source code,
    please support Adafruit and open-source hardware by purchasing
    products from Adafruit!

    @section  HISTORY

    v1.0 - First release
*/
/**************************************************************************/
#ifdef __AVR
#include <avr/pgmspace.h>
#elif defined(ESP8266)
#include <pgmspace.h>
#endif
#include <stdlib.h>
#include <math.h>

#include "Adafruit_TCS34725.h"

/*========================================================================*/
/*                          PRIVATE FUNCTIONS                             */
/*========================================================================*/

/**************************************************************************/
/*!
    @brief  Implements missing powf function
*/
/**************************************************************************/
float powf(const float x, const float y)
{
  return (float)(pow((double)x, (double)y));
}

/**************************************************************************/
/*!
    @brief  Writes a register and an 8 bit value over I2C
*/
/**************************************************************************/
void Adafruit_TCS34725::write8(uint8_t reg, uint32_t value)
{
  Wire.beginTransmission(TCS34725_ADDRESS);
#if ARDUINO >= 100
  Wire.write(TCS34725_COMMAND_BIT | reg);
  Wire.write(value & 0xFF);
#else
  Wire.send(TCS34725_COMMAND_BIT | reg);
  Wire.send(value & 0xFF);
#endif
  Wire.endTransmission();
}

/**************************************************************************/
/*!
    @brief  Reads an 8 bit value over I2C
*/
/**************************************************************************/
uint8_t Adafruit_TCS34725::read8(uint8_t reg)
{
  Wire.beginTransmission(TCS34725_ADDRESS);
#if ARDUINO >= 100
  Wire.write(TCS34725_COMMAND_BIT | reg);
#else
  Wire.send(TCS34725_COMMAND_BIT | reg);
#endif
  Wire.endTransmission();

  Wire.requestFrom(TCS34725_ADDRESS, 1);
#if ARDUINO >= 100
  return Wire.read();
#else
  return Wire.receive();
#endif
}

/**************************************************************************/
/*!
    @brief  Reads a 16 bit values over I2C
*/
/**************************************************************************/
uint16_t Adafruit_TCS34725::read16(uint8_t reg)
{
  uint16_t x;
  uint16_t t;

  Wire.beginTransmission(TCS34725_ADDRESS);
#if ARDUINO >= 100
  Wire.write(TCS34725_COMMAND_BIT | reg);
#else
  Wire.send(TCS34725_COMMAND_BIT | reg);
#endif
  Wire.endTransmission();

  Wire.requestFrom(TCS34725_ADDRESS, 2);
#if ARDUINO >= 100
  t = Wire.read();
  x = Wire.read();
#else
  t = Wire.receive();
  x = Wire.receive();
#endif
  x <<= 8;
  x |= t;
  return x;
}

/**************************************************************************/
/*!
    Enables the device
*/
/**************************************************************************/
void Adafruit_TCS34725::enable(void)
{
  write8(TCS34725_ENABLE, TCS34725_ENABLE_PON);
  delay(3);
  write8(TCS34725_ENABLE, TCS34725_ENABLE_PON | TCS34725_ENABLE_AEN);
}

/**************************************************************************/
/*!
    Disables the device (putting it in lower power sleep mode)
*/
/**************************************************************************/
void Adafruit_TCS34725::disable(void)
{
  /* Turn the device off to save power */
  uint8_t reg = 0;
  reg = read8(TCS34725_ENABLE);
  write8(TCS34725_ENABLE, reg & ~(TCS34725_ENABLE_PON | TCS34725_ENABLE_AEN));
}

/*========================================================================*/
/*                            CONSTRUCTORS                                */
/*========================================================================*/

/**************************************************************************/
/*!
    Constructor
*/
/**************************************************************************/
Adafruit_TCS34725::Adafruit_TCS34725(tcs34725IntegrationTime_t it, tcs34725Gain_t gain)
{
  _tcs34725Initialised = false;
  _tcs34725IntegrationTime = it;
  _tcs34725Gain = gain;
}

/*========================================================================*/
/*                           PUBLIC FUNCTIONS                             */
/*========================================================================*/

/**************************************************************************/
/*!
    Initializes I2C and configures the sensor (call this function before
    doing anything else)
*/
/**************************************************************************/
boolean Adafruit_TCS34725::begin(void)
{
  Wire.begin();

  /* Make sure we're actually connected */
  uint8_t x = read8(TCS34725_ID);
  if ((x != 0x44) && (x != 0x10))
  {
    return false;
  }
  _tcs34725Initialised = true;

  /* Set default integration time and gain */
  setIntegrationTime(_tcs34725IntegrationTime);
  setGain(_tcs34725Gain);

  /* Note: by default, the device is in power down mode on bootup */
  enable();

  return true;
}

/**************************************************************************/
/*!
    Sets the integration time for the TC34725
*/
/**************************************************************************/
void Adafruit_TCS34725::setIntegrationTime(tcs34725IntegrationTime_t it)
{
  if (!_tcs34725Initialised)
    begin();

  /* Update the timing register */
  write8(TCS34725_ATIME, it);

  /* Update value placeholders */
  _tcs34725IntegrationTime = it;
}

/**************************************************************************/
/*!
    Adjusts the gain on the TCS34725 (adjusts the sensitivity to light)
*/
/**************************************************************************/
void Adafruit_TCS34725::setGain(tcs34725Gain_t gain)
{
  if (!_tcs34725Initialised)
    begin();

  /* Update the timing register */
  write8(TCS34725_CONTROL, gain);

  /* Update value placeholders */
  _tcs34725Gain = gain;
}

/**************************************************************************/
/*!
    @brief  Reads the raw red, green, blue and clear channel values
*/
/**************************************************************************/
void Adafruit_TCS34725::getRawData(uint16_t *r, uint16_t *g, uint16_t *b, uint16_t *c)
{
  if (!_tcs34725Initialised)
    begin();

  *c = read16(TCS34725_CDATAL);
  *r = read16(TCS34725_RDATAL);
  *g = read16(TCS34725_GDATAL);
  *b = read16(TCS34725_BDATAL);

  /* Set a delay for the integration time */
  switch (_tcs34725IntegrationTime)
  {
  case TCS34725_INTEGRATIONTIME_2_4MS:
    delay(3);
    break;
  case TCS34725_INTEGRATIONTIME_24MS:
    delay(24);
    break;
  case TCS34725_INTEGRATIONTIME_50MS:
    delay(50);
    break;
  case TCS34725_INTEGRATIONTIME_101MS:
    delay(101);
    break;
  case TCS34725_INTEGRATIONTIME_154MS:
    delay(154);
    break;
  case TCS34725_INTEGRATIONTIME_700MS:
    delay(700);
    break;
  }
}

/**************************************************************************/
/*!
    @brief  Converts the raw R/G/B values to color temperature in degrees
            Kelvin
*/
/**************************************************************************/
uint16_t Adafruit_TCS34725::calculateColorTemperature(uint16_t r, uint16_t g, uint16_t b)
{
  float X, Y, Z; /* RGB to XYZ correlation      */
  float xc, yc;  /* Chromaticity co-ordinates   */
  float n;       /* McCamy's formula            */
  float cct;

  /* 1. Map RGB values to their XYZ counterparts.    */
  /* Based on 6500K fluorescent, 3000K fluorescent   */
  /* and 60W incandescent values for a wide range.   */
  /* Note: Y = Illuminance or lux                    */
  X = (-0.14282F * r) + (1.54924F * g) + (-0.95641F * b);
  Y = (-0.32466F * r) + (1.57837F * g) + (-0.73191F * b);
  Z = (-0.68202F * r) + (0.77073F * g) + (0.56332F * b);

  /* 2. Calculate the chromaticity co-ordinates      */
  xc = (X) / (X + Y + Z);
  yc = (Y) / (X + Y + Z);

  /* 3. Use McCamy's formula to determine the CCT    */
  n = (xc - 0.3320F) / (0.1858F - yc);

  /* Calculate the final CCT */
  cct = (449.0F * powf(n, 3)) + (3525.0F * powf(n, 2)) + (6823.3F * n) + 5520.33F;

  /* Return the results in degrees Kelvin */
  return (uint16_t)cct;
}

/**************************************************************************/
/*!
    @brief  Converts the raw R/G/B values to lux
*/
/**************************************************************************/
uint16_t Adafruit_TCS34725::calculateLux(uint16_t r, uint16_t g, uint16_t b)
{
  float illuminance;

  /* This only uses RGB ... how can we integrate clear or calculate lux */
  /* based exclusively on clear since this might be more reliable?      */
  illuminance = (-0.32466F * r) + (1.57837F * g) + (-0.73191F * b);

  return (uint16_t)illuminance;
}

void Adafruit_TCS34725::setInterrupt(boolean i)
{
  uint8_t r = read8(TCS34725_ENABLE);
  if (i)
  {
    r |= TCS34725_ENABLE_AIEN;
  }
  else
  {
    r &= ~TCS34725_ENABLE_AIEN;
  }
  write8(TCS34725_ENABLE, r);
}

void Adafruit_TCS34725::clearInterrupt(void)
{
  Wire.beginTransmission(TCS34725_ADDRESS);
#if ARDUINO >= 100
  Wire.write(TCS34725_COMMAND_BIT | 0x66);
#else
  Wire.send(TCS34725_COMMAND_BIT | 0x66);
#endif
  Wire.endTransmission();
}

void Adafruit_TCS34725::setIntLimits(uint16_t low, uint16_t high)
{
  write8(0x04, low & 0xFF);
  write8(0x05, low >> 8);
  write8(0x06, high & 0xFF);
  write8(0x07, high >> 8);
}

uint8_t Adafruit_TCS34725::isColor(uint8_t colorId)
{
  // uint16_t blackColorOffset[4] = {613, 163, 203, 186};
  // uint16_t whiteColorOffset[4] = {3562 - 613, 1121 - 163, 1194 - 203, 995 - 186};
  uint16_t clearCode, redCode, greenCode, blueCode;
  setInterrupt(false);
  delay(100);
  getRawData(&redCode, &greenCode, &blueCode, &clearCode);
  setInterrupt(true);
  if (clearCode > 3000)
  {
#ifdef SERIAL_DEBUG_IN_BITTY
    Serial.println("White");
#endif
    return colorId == CC_COLOR_WHITE; //White;
  }
  else if ((clearCode < 1000) && (redCode < (clearCode / 3)) && (greenCode < (clearCode / 3)) && (blueCode < (clearCode / 3)))
  {
#ifdef SERIAL_DEBUG_IN_BITTY
    Serial.println("black");
#endif

    return colorId == CC_COLOR_BLACK; // black
  }
  else if (redCode > (clearCode / 3))
  {
#ifdef SERIAL_DEBUG_IN_BITTY
    Serial.println("red");
#endif

    return colorId == CC_COLOR_RED; // red
  }
  else if (greenCode > (clearCode / 3))
  {
#ifdef SERIAL_DEBUG_IN_BITTY
    Serial.println("green");
#endif

    return colorId == CC_COLOR_GREEN; // green
  }
  else if (blueCode > (clearCode / 3))
  {
#ifdef SERIAL_DEBUG_IN_BITTY
    Serial.println("blue");
#endif

    return colorId == CC_COLOR_BLUE; // blue
  }
  else
  {
#ifdef SERIAL_DEBUG_IN_BITTY
    Serial.println("other");
#endif
    return colorId == CC_COLOR_OTHER; // other color
  }
  // if (clearCode > blackColorOffset[0])
  //   clearCode = clearCode - blackColorOffset[0];
  // else
  //   clearCode = 0;
  // if (redCode > blackColorOffset[1])
  //   redCode = redCode - blackColorOffset[1];
  // else
  //   redCode = 0;
  // if (greenCode > blackColorOffset[2])
  //   greenCode = greenCode - blackColorOffset[2];
  // else
  //   greenCode = 0;
  // if (blueCode > blackColorOffset[3])
  //   blueCode = blueCode - blackColorOffset[3];
  // else
  //   blueCode = 0;
  // uint32_t r, g, b;
  // r = redCode;
  // g = greenCode;
  // b = blueCode;
  // if (whiteColorOffset[1] > 0)
  //   r = r * whiteColorOffset[0] / whiteColorOffset[1];
  // if (whiteColorOffset[2] > 0)
  //   g = g * whiteColorOffset[0] / whiteColorOffset[2];
  // if (whiteColorOffset[3] > 0)
  //   b = b * whiteColorOffset[0] / whiteColorOffset[3];
  // redCode = r;
  // greenCode = g;
  // blueCode = b;

  // r = redCode << 14;
  // if (whiteColorOffset[0] > 0)
  //   r /= whiteColorOffset[0];
  // g = greenCode << 14;
  // if (whiteColorOffset[0] > 0)
  //   g /= whiteColorOffset[0];
  // b = blueCode << 14;
  // if (whiteColorOffset[0] > 0)
  //   b /= whiteColorOffset[0];

  // uint16_t red = r >> 5;
  // uint16_t green = g >> 5;
  // uint16_t blue = b >> 5; // color multiply by 2
  // if (red > 255)
  //   red = 255;
  // if (green > 255)
  //   green = 255;
  // if (blue > 255)
  //   blue = 255;
  // uint32_t color = (red << 16) + (green << 8) + blue;

  // int32_t rp, gp, bp;
  // uint16_t offsetLess = whiteColorOffset[0] / 50;
  // uint16_t offsetMiddle = whiteColorOffset[0] / 30;
  // uint16_t offsetGreater = whiteColorOffset[0] * 7 / 10;
  // rp = (r * 1000) / (r + g + b);
  // gp = (g * 1000) / (r + g + b);
  // bp = (b * 1000) / (r + g + b);

  // if (clearCode < offsetLess)
  // {
  //   return colorId == CC_COLOR_BLACK;
  // }
  // else if ((clearCode > offsetMiddle) && (clearCode < offsetGreater) && ((rp - gp) > 120) && ((rp - bp) > 120))
  // {
  //   return colorId == CC_COLOR_RED;
  // }
  // else if ((clearCode > offsetMiddle) && (clearCode < offsetGreater) && ((gp - rp) > 100) && ((gp - bp) > 100))
  // {
  //   return colorId == CC_COLOR_GREEN;
  // }
  // else if ((clearCode > offsetMiddle) && (clearCode < offsetGreater) && ((bp - gp) > 140) && ((bp - rp) > 140))
  // {
  //   return colorId == CC_COLOR_BLUE;
  // }
  // else
  // {
  //   return colorId == CC_COLOR_OTHER;
  // }
}
