/*
	FILE: 		idDHTLib.h
	VERSION: 	0.0.3
	PURPOSE: 	Interrupt driven Lib for DHT11 and DHT22 with Arduino.
	LICENCE:	GPL v3 (http://www.gnu.org/licenses/gpl.html)
	DATASHEET: http://www.micro4you.com/files/sensor/DHT11.pdf
	DATASHEET: http://www.adafruit.com/datasheets/DHT22.pdf

	Based on idDHT11 library: https://github.com/niesteszeck/idDHT11
	Based on DHTLib library: http://playground.arduino.cc/Main/DHTLib
	Based on code proposed: http://forum.arduino.cc/index.php?PHPSESSID=j6n105kl2h07nbj72ac4vbh4s5&topic=175356.0

  Changelog:
    v 0.0.1
      fork from idDHT11 lib
      change names to idDHTLib
      added DHT22 functionality
    v 0.0.2
      Optimization on shift var (pylon from Arduino Forum)
    v 0.0.3
      Timing correction to finally work properly on DHT22
      (Dessimat0r from Arduino forum)
    v 1.0.0
      autoformat code with Arduino IDE code formatting standards (kcsoft)
      remove the interrupt number from the constructor by using digitalPinToInterrupt (kcsoft)
      fix type for us and timeout when no interrupt is triggered (kcsoft)
      removed the callback parameter from the constructor, added sensor type (DHT11, DHT22) as optional param (kcsoft)
      removed temp/humid calculation from the isr (kcsoft)
      new function acquireFastLoop to remove delay when start acquiring (kcsoft)
      update README.md file (kcsoft)
 */

#ifndef idDHTLib_H__
#define idDHTLib_H__

#if defined(ARDUINO) && (ARDUINO >= 100)
#include <Arduino.h>
#else
#include <WProgram.h>
#endif

#define IDDHTLIB_VERSION "1.0.0"

// state codes
#define IDDHTLIB_OK			0
#define IDDHTLIB_ACQUIRING		1
#define IDDHTLIB_ACQUIRED		2
#define IDDHTLIB_RESPONSE_OK		3

// error codes
#define IDDHTLIB_ERROR_CHECKSUM		-1
#define IDDHTLIB_ERROR_TIMEOUT		-2
#define IDDHTLIB_ERROR_ACQUIRING	-3
#define IDDHTLIB_ERROR_DELTA		-4
#define IDDHTLIB_ERROR_NOTSTARTED	-5

#define IDDHTLIB_CHECK_STATE		if(state == STOPPED)			\
    return status;			\
  else if(state != ACQUIRED)		\
    return IDDHTLIB_ERROR_ACQUIRING;

typedef void (*pCallback)();

class idDHTLib
{
  public:
    enum DHTType {DHT11, DHT22};

    idDHTLib(int pin);
    idDHTLib(int pin, DHTType sensorType);
    void init(int pin, DHTType sensorType);
    int acquire();
    int acquireFastLoop();
    int acquireAndWait();
    float getCelsius();
    float getFahrenheit();
    float getKelvin();
    double getDewPoint();
    double getDewPointSlow();
    float getHumidity();
    bool acquiring();
    int getStatus();

  private:
    enum states {RESPONSE = 0, DATA = 1, ACQUIRED = 2, STOPPED = 3, ACQUIRING = 4, RAW_DATA_READY = 5, START_SIGNAL = 6};
    volatile states state;
    volatile int status;
    volatile byte bits[5];
    volatile byte cnt;
    volatile byte idx;
    volatile unsigned long us;
    int intNumber;
    int pin;
    DHTType sensorType;
    volatile float hum;
    volatile float temp;
    void dhtCallback();
    int startSignal(bool useDelay);

#include "idDHTLib_cb.h"
    const static pCallback pCallbackArray[MAX_INTERRUPT + 1];
    static idDHTLib * objectAtInt[MAX_INTERRUPT + 1];
};
#endif // idDHTLib_H__
