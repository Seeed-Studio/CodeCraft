#ifndef _WIFLY_CLIENT_H_
#define _WIFLY_CLIENT_H_

#include "Arduino.h"	
#include "Print.h"
#include "Client.h"
#include "IPAddress.h"
#include "WiFly.h"
#include "SoftwareSerial.h"

//use pin2/3 as Serial
#define PIN_TX			2
#define PIN_RX			3
#define SERIAL_BAUDRATE	9600
#define MAX_SOCK_NUM 	1

class WiFlyClient : public Client{
public:
	WiFlyClient():wifiSerial(PIN_TX,PIN_RX),_WiFly(&wifiSerial){
		wifiSerial.begin(SERIAL_BAUDRATE);
	};
	boolean join(const char *ssid, const char *phrase, int auth);
	int connect(const char *host, uint16_t port);
	int connect(IPAddress ip, uint16_t port);
	size_t write(uint8_t);
	size_t write(const uint8_t *buf, size_t size);
	int available();
	int read();
	int read(uint8_t *buf, size_t size);
	int peek();
	void flush();
	void stop();
	uint8_t connected();
	operator bool();
	using Print::write;
private:
	SoftwareSerial wifiSerial;
	WiFly _WiFly;
};

#endif
