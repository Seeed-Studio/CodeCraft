/*
  Software serial multiple serial test

 Receives from the hardware serial, sends to software serial.
 Receives from software serial, sends to hardware serial.

 The circuit:
 * RX is digital pin 9 (connect to TX of other device)
 * TX is digital pin 10 (connect to RX of other device)
 
 Note:
 You shouldn't use pin 2
 
 This example code is in the public domain.

 */

#include <SoftwareSerial.h>

SoftwareSerial mySerial(9, 10); // RX, TX

void setup()
{
  // Open serial communications and wait for port to open:
  SerialUSB.begin(115200);
  // set the data rate for the SoftwareSerial port
  mySerial.begin(9600); // Tx ok, Rx ok
  //mySerial.begin(19200); // Tx ok, Rx ok
  //mySerial.begin(38400); // Tx ok, Rx fail
  //mySerial.begin(57600); // Tx ok, Rx fail
  //mySerial.begin(115200); // Tx fail, Rx fail
}

void loop() // run over and over//
{
  if (mySerial.available()) 
    SerialUSB.write(mySerial.read());

  if (SerialUSB.available())
    mySerial.write(SerialUSB.read());
}

