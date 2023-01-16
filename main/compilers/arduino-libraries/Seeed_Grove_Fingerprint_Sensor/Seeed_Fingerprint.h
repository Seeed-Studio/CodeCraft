/*************************************************** 
  This is a library for our optical Fingerprint sensor

  Designed specifically to work with the Adafruit Fingerprint sensor
  ----> http://www.adafruit.com/products/751

  These displays use TTL Serial to communicate, 2 pins are required to 
  interface
  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/
 
#ifndef _Seeed_Fingerprint_H_
#define _Seeed_Fingerprint_H_

#include "Arduino.h"
#include <SoftwareSerial.h>


#define FINGERPRINT_OK 0x00
#define FINGERPRINT_PACKETRECIEVEERR 0x01
#define FINGERPRINT_NOFINGER 0x02
#define FINGERPRINT_IMAGEFAIL 0x03
#define FINGERPRINT_IMAGEMESS 0x06
#define FINGERPRINT_FEATUREFAIL 0x07
#define FINGERPRINT_NOMATCH 0x08
#define FINGERPRINT_NOTFOUND 0x09
#define FINGERPRINT_ENROLLMISMATCH 0x0A
#define FINGERPRINT_BADLOCATION 0x0B
#define FINGERPRINT_DBRANGEFAIL 0x0C
#define FINGERPRINT_UPLOADFEATUREFAIL 0x0D
#define FINGERPRINT_PACKETRESPONSEFAIL 0x0E
#define FINGERPRINT_UPLOADFAIL 0x0F
#define FINGERPRINT_DELETEFAIL 0x10
#define FINGERPRINT_DBCLEARFAIL 0x11
#define FINGERPRINT_PASSFAIL 0x13
#define FINGERPRINT_INVALIDIMAGE 0x15
#define FINGERPRINT_FLASHERR 0x18
#define FINGERPRINT_INVALIDREG 0x1A
#define FINGERPRINT_ADDRCODE 0x20
#define FINGERPRINT_PASSVERIFY 0x21

#define FINGERPRINT_STARTCODE 0xEF01

#define FINGERPRINT_COMMANDPACKET 0x1
#define FINGERPRINT_DATAPACKET 0x2
#define FINGERPRINT_ACKPACKET 0x7
#define FINGERPRINT_ENDDATAPACKET 0x8

#define FINGERPRINT_TIMEOUT 0xFF
#define FINGERPRINT_BADPACKET 0xFE

#define FINGERPRINT_GETIMAGE 0x01
#define FINGERPRINT_IMAGE2TZ 0x02
#define FINGERPRINT_REGMODEL 0x05
#define FINGERPRINT_STORE 0x06
#define FINGERPRINT_DELETE 0x0C
#define FINGERPRINT_EMPTY 0x0D
#define FINGERPRINT_VERIFYPASSWORD 0x13
#define FINGERPRINT_HISPEEDSEARCH 0x1B
#define FINGERPRINT_TEMPLATECOUNT 0x1D

//#define FINGERPRINT_DEBUG 

#define DEFAULTTIMEOUT 5000  // milliseconds


class Fingerprint
{
public:

	Fingerprint(int Rx, int Tx);
	
	int Init(void);
	
	int FingerprintRead(void)
	{
		uint8_t p = getImage();
		if(p != FINGERPRINT_OK)return -1;
		p = image2Tz();
		if(p != FINGERPRINT_OK)return -1;
		p = fingerFastSearch();
		if(p != FINGERPRINT_OK)return -1;
		return fingerID; 
	}
	
	int FingerprintWrite(int ID)
	{
		uint8_t p = -1;
		
		ID_temp = ID;
		
		while(p != FINGERPRINT_OK)p = getImage();	
		
		// OK success!
		p = image2Tz(1);

		Serial.println("Remove finger");
		delay(2000);
		p = 0;
		while(p != FINGERPRINT_NOFINGER)p = getImage();
		
		p = -1;
		Serial.println("Place same finger again");
		while(p != FINGERPRINT_OK)
		{
			p = getImage();
			switch(p)
			{
				case FINGERPRINT_OK:
				Serial.println("Image taken");
				break;
				case FINGERPRINT_NOFINGER:
				Serial.print(".");
				break;
				case FINGERPRINT_PACKETRECIEVEERR:
				Serial.println("Communication error");
				break;
				case FINGERPRINT_IMAGEFAIL:
				Serial.println("Imaging error");
				break;
				default:
				Serial.println("Unknown error");
				break;
			}
		}
		
		// OK success!
		p = image2Tz(2);
		
		// OK converted!
		p = createModel();
		if(p == FINGERPRINT_OK)
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Prints matched!");
#endif
		}
		else if(p == FINGERPRINT_PACKETRECIEVEERR)
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Communication error");
#endif
			return p;
		}
		else if(p == FINGERPRINT_ENROLLMISMATCH)
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Fingerprints did not match");
#endif
			return p;
		}
		else
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Unknown error");
#endif
			return p;
		}
		p = storeModel(ID_temp);
		if(p == FINGERPRINT_OK)
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Stored!");
#endif
		}
		else if(p == FINGERPRINT_PACKETRECIEVEERR)
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Communication error");
#endif
			return p;
		}
		else if(p == FINGERPRINT_BADLOCATION)
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Could not store in that location");
#endif
			return p;
		}
		else if(p == FINGERPRINT_FLASHERR)
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Error writing to flash");
#endif
			return p;
		}
		else
		{
#ifdef FINGERPRINT_DEBUG
			Serial.println("Unknown error");
#endif
			return p;
		}
	}

private: 

	boolean verifyPassword(void);
	uint8_t getImage(void);
	uint8_t image2Tz(uint8_t slot = 1);
	uint8_t createModel(void);

	uint8_t emptyDatabase(void);
	uint8_t storeModel(uint16_t id);
	uint8_t deleteModel(uint16_t id);
	uint8_t fingerFastSearch(void);
	uint8_t getTemplateCount(void);
	void writePacket(uint32_t addr, uint8_t packettype, uint16_t len, uint8_t *packet);
	uint8_t getReply(uint8_t packet[], uint16_t timeout=DEFAULTTIMEOUT);

	uint16_t fingerID, confidence, templateCount;

	int ID_temp;
	uint32_t thePassword;
	uint32_t theAddress;
	
	SoftwareSerial *mySerial;

};


#endif