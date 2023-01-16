#include "WiFlyClient.h"

boolean WiFlyClient::join(const char *ssid, const char *phrase, int auth){
	_WiFly.reset();
	delay(500);
	_WiFly.sendCommand("set com remote 0\r", "OK",DEFAULT_WAIT_RESPONSE_TIME*2);
	delay(500);
	return _WiFly.join(ssid, phrase, auth);
}

int WiFlyClient::connect(const char* host, uint16_t port) {
	return _WiFly.connect(host, port);
}

int WiFlyClient::connect(IPAddress ip, uint16_t port){
	char ipAddr[17];
    snprintf(ipAddr, sizeof(ipAddr), "%d.%d.%d.%d", (int)((ip>>24)&0xff),(int)((ip>>16)&0xff),(int)((ip>>8)&0xff),(int)(ip&0xff)); 
	return _WiFly.connect(ipAddr,port);
}

size_t WiFlyClient::write(uint8_t b) {
	  return _WiFly.write(&b, 1);
}

size_t WiFlyClient::write(const uint8_t *buf, size_t size) {
	return _WiFly.send(buf, size);
}

int WiFlyClient::available() {
	return _WiFly.available();
}

int WiFlyClient::read() {
	return _WiFly.read();
}


int WiFlyClient::read(uint8_t* buf, size_t size) {
	 _WiFly.receive(buf,size);
	 return 0;
}

int WiFlyClient::peek() {
	return _WiFly.peek();
}

void WiFlyClient::flush() {
  while (available())
    read();
}

void WiFlyClient::stop() {
	_WiFly.sendCommand("close\r");
}

uint8_t WiFlyClient::connected() {
	return 1;
}

WiFlyClient::operator bool() {
	return 1;
}
