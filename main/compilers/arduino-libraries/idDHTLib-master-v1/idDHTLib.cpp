/*
	FILE: 		idDHTLib.cpp
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

#include "idDHTLib.h"
#define DEBUG_idDHTLIB

const pCallback idDHTLib::pCallbackArray[] = {PFUNC_CALLBACKS};
idDHTLib * idDHTLib::objectAtInt[MAX_INTERRUPT + 1];

idDHTLib::idDHTLib(int pin) {
  init(pin, DHT11);
}

idDHTLib::idDHTLib(int pin, DHTType sensorType) {
  init(pin, sensorType);
}

void idDHTLib::init(int pin, DHTType sensorType) {
  intNumber = digitalPinToInterrupt(pin);
  this->pin = pin;
  this->sensorType = sensorType;
  objectAtInt[intNumber] = this;
  hum = 0;
  temp = 0;
  pinMode(pin, OUTPUT);
  digitalWrite(pin, HIGH);
  state = STOPPED;
  status = IDDHTLIB_ERROR_NOTSTARTED;
}

int idDHTLib::startSignal(bool useDelay) {
  if (state == STOPPED || state == ACQUIRED) {

    //set the state machine for interruptions analisis of the signal
    state = useDelay ? RESPONSE : START_SIGNAL;

    // EMPTY BUFFER and vars
    for (byte i = 0; i < 5; i++) bits[i] = 0;
    cnt = 7;
    idx = 0;
    hum = 0;
    temp = 0;

    // REQUEST SAMPLE
    pinMode(pin, OUTPUT);
    digitalWrite(pin, LOW);

    if (useDelay) {
      delay(18);
      digitalWrite(pin, HIGH);
      delayMicroseconds(25);
      pinMode(pin, INPUT);
    }

    us = micros();
    // Analize the data in an interrupt
    if (useDelay)
      attachInterrupt(intNumber, pCallbackArray[intNumber], FALLING);

    return IDDHTLIB_ACQUIRING;
  } else
    return IDDHTLIB_ERROR_ACQUIRING;
}

int idDHTLib::acquire() {
  return startSignal(true);
}

// start acquiring but don't do the start delay here, instead will be done
// in the acquiring() function that has to be called in a loop with < 10ms delay 
int idDHTLib::acquireFastLoop() {
  return startSignal(false);
}

int idDHTLib::acquireAndWait() {
  acquire();
  while (acquiring())
    ;
  return getStatus();
}
void idDHTLib::dhtCallback() {
  unsigned long newUs = micros();
  byte delta;
  if (newUs - us > 255) {
    status = IDDHTLIB_ERROR_TIMEOUT;
    state = STOPPED;
    detachInterrupt(intNumber);
    return;
  }

  delta = newUs - us;
  us = newUs;

  switch (state) {
    case RESPONSE:
      if (delta < 25) {
        us -= delta;
        break; //do nothing, it started the response signal
      } if (125 < delta && delta < 190) {
        state = DATA;
      } else {
        detachInterrupt(intNumber);
        status = IDDHTLIB_ERROR_TIMEOUT;
        state = STOPPED;
      }
      break;
    case DATA:
      if (60 < delta && delta < 145) { //valid in timing
        bits[idx] <<= 1; //shift the data
        if (delta > 100) //is a one
          bits[idx] |= 1;
        if (cnt == 0) {  // when we have fulfilled the byte, go to the next
          cnt = 7;    // restart at MSB
          if (++idx == 5) { // go to next byte; when we have got 5 bytes, stop.
            detachInterrupt(intNumber);
            state = RAW_DATA_READY;
            break;
          }
        } else cnt--;
      } else if (delta < 10) {
        detachInterrupt(intNumber);
        status = IDDHTLIB_ERROR_DELTA;
        state = STOPPED;
      } else {
        detachInterrupt(intNumber);
        status = IDDHTLIB_ERROR_TIMEOUT;
        state = STOPPED;
      }
      break;
    default:
      break;
  }
}
bool idDHTLib::acquiring() {
  unsigned long delta;
  if (state != ACQUIRED && state != STOPPED) {
    if (state == RAW_DATA_READY) {
      // WRITE TO RIGHT VARS
      uint8_t sum;
      if (sensorType == DHT22) {
        hum = word(bits[0], bits[1]) * 0.1;
        temp = (bits[2] & 0x80 ?
                -word(bits[2] & 0x7F, bits[3]) :
                word(bits[2], bits[3]))
               * 0.1;
        sum = bits[0] + bits[1] + bits[2] + bits[3];
      } else {
        hum    = bits[0];
        // as bits[1] and bits[3] are always zero they are omitted in formulas.
        temp = bits[2];
        sum = bits[0] + bits[2];
      }
      if (bits[4] != (sum & 0xFF)) {
        status = IDDHTLIB_ERROR_CHECKSUM;
        state = STOPPED;
      } else {
        status = IDDHTLIB_OK;
        state = ACQUIRED;
      }
    } else {
      cli();
      delta = micros() - us;
      sei();
      if (state == START_SIGNAL) {
        if (delta > 18000) {
          state = RESPONSE;
          digitalWrite(pin, HIGH);
          delayMicroseconds(25);
          pinMode(pin, INPUT);
          us = micros();
          // Analize the data in an interrupt
          attachInterrupt(intNumber, pCallbackArray[intNumber], FALLING);
        }
      } else {
        if (delta > 255) {
          status = IDDHTLIB_ERROR_TIMEOUT;
          state = STOPPED;
          detachInterrupt(intNumber);
          return false;
        }
      }
      return true;
    }
  }
  return false;
}
int idDHTLib::getStatus() {
  return status;
}
float idDHTLib::getCelsius() {
  IDDHTLIB_CHECK_STATE;
  return temp;
}

float idDHTLib::getHumidity() {
  IDDHTLIB_CHECK_STATE;
  return hum;
}

float idDHTLib::getFahrenheit() {
  IDDHTLIB_CHECK_STATE;
  return temp * 1.8 + 32;
}

float idDHTLib::getKelvin() {
  IDDHTLIB_CHECK_STATE;
  return temp + 273.15;
}

// delta max = 0.6544 wrt dewPoint()
// 5x faster than dewPoint()
// reference: http://en.wikipedia.org/wiki/Dew_point
double idDHTLib::getDewPoint() {
  IDDHTLIB_CHECK_STATE;
  double a = 17.271;
  double b = 237.7;
  double temp_ = (a * (double) temp) / (b + (double) temp) + log( (double) hum / 100);
  double Td = (b * temp_) / (a - temp_);
  return Td;

}
// dewPoint function NOAA
// reference: http://wahiduddin.net/calc/density_algorithms.htm
double idDHTLib::getDewPointSlow() {
  IDDHTLIB_CHECK_STATE;
  double A0 = 373.15 / (273.15 + (double) temp);
  double SUM = -7.90298 * (A0 - 1);
  SUM += 5.02808 * log10(A0);
  SUM += -1.3816e-7 * (pow(10, (11.344 * (1 - 1 / A0))) - 1) ;
  SUM += 8.1328e-3 * (pow(10, (-3.49149 * (A0 - 1))) - 1) ;
  SUM += log10(1013.246);
  double VP = pow(10, SUM - 3) * (double) hum;
  double T = log(VP / 0.61078); // temp var
  return (241.88 * T) / (17.558 - T);
}
// EOF
