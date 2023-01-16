# idDHTLib

Interrupt driven DHT11 & DHT22 temperature and humidity sensor Arduino library.


## Usage

#### Instantiate the sensor object
```c++
    // for DHT11
    idDHTLib DHTLib(pinNumber);
    
     // for DHT11 and DHT22, sensorType can be idDHTLib::DHT11 or idDHTLib::DHT22
    idDHTLib DHTLib(pinNumber, sensorType);
```

*pinNumber* is the digital pin number from the Arduino board and must be an external interrupt capable pin

<table class="rich-diff-level-zero">
  <thead class="rich-diff-level-one">
    <tr>
      <th>Board</th>
      <th>int.0</th>
      <th>int.1</th>
      <th>int.2</th>
      <th>int.3</th>
      <th>int.4</th>
      <th>int.5</th>
    </tr>
  </thead>
  <tbody class="rich-diff-level-one">
    <tr>
      <td>Uno, Ethernet</td>
      <td align="center">2</td>
      <td align="center">3</td>
      <td align="center"></td>
      <td align="center"></td>
      <td align="center"></td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>Mega2560</td>
      <td align="center">2</td>
      <td align="center">3</td>
      <td align="center">21</td>
      <td align="center">20</td>
      <td align="center">19</td>
      <td align="center">18</td>
    </tr>
    <tr>
      <td>Leonardo</td>
      <td align="center">3</td>
      <td align="center">2</td>
      <td align="center">0</td>
      <td align="center">1</td>
      <td align="center"></td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>Due</td>
      <td colspan="6">(any pin, more info <a href="http://arduino.cc/en/Reference/AttachInterrupt">http://arduino.cc/en/Reference/AttachInterrupt</a>)</td>
    </tr>
  </tbody>
</table>


#### Start the reading

The sensor reading can be started with one of these methods
```c++
//lasts about 18ms
DHTLib.acquire();

//lasts a few uS but need the acquiring() function to be called at intervals < 10ms
//this should be used in cases where the other tasks in the loop() have to respond fast
DHTLib.acquireFastLoop();

//blocks the execution until the reading is complete
DHTLib.acquireAndWait();
```

#### Checking for completion

```c++
DHTLib.acquiring() //returns false when reading is complete (or not started)
```

#### Checking for errors

After the reading is complete
```c++
DHTLib.getStatus() 
```
* returns one of these values
	* IDDHTLIB_OK - the reading was successful
	* IDDHTLIB_ERROR_CHECKSUM
	* IDDHTLIB_ERROR_TIMEOUT
	* IDDHTLIB_ERROR_ACQUIRING
	* IDDHTLIB_ERROR_DELTA
	* IDDHTLIB_ERROR_NOTSTARTED


#### Sensor data

After the reading is complete and the status was `IDDHTLIB_OK`
```c++
DHTLib.getCelsius() // float 
DHTLib.getFahrenheit() // float 
DHTLib.getKelvin() // float 
DHTLib.getDewPoint() // double, 5x faster than dewPointSlow(), delta max = 0.6544 wrt dewPointSlow()
DHTLib.getDewPointSlow() // double
DHTLib.getHumidity() // float 
```


## Basic example

```c++
idDHTLib DHTLib(2, idDHTLib::DHT11);

void setup() {
  Serial.begin(9600);
}

void loop() {
  int result = DHTLib.acquireAndWait();
  if (result == IDDHTLIB_OK) {
    Serial.print("Humidity (%): ");
    Serial.println(DHTLib.getHumidity(), 2);
  
    Serial.print("Temperature (oC): ");
    Serial.println(DHTLib.getCelsius(), 2);
  
    Serial.print("Temperature (oF): ");
    Serial.println(DHTLib.getFahrenheit(), 2);
  
    Serial.print("Temperature (K): ");
    Serial.println(DHTLib.getKelvin(), 2);
  
    Serial.print("Dew Point (oC): ");
    Serial.println(DHTLib.getDewPoint());
  
    Serial.print("Dew Point Slow (oC): ");
    Serial.println(DHTLib.getDewPointSlow());
  } else {
    Serial.println("Error");
  }
  delay(2000);
}
```

## Changelog
* v 0.0.1
	* fork from idDHT11 lib
	* change names to idDHTLib
	* added DHT22 functionality
* v 0.0.2
	* Optimization on shift var (pylon from Arduino Forum)
* v 0.0.3
	* Timing correction to finally work properly on DHT22 (Dessimat0r from Arduino forum)
* v 1.0.0
	* autoformat code with Arduino IDE code formatting standards (kcsoft)
	* remove the interrupt number from the constructor by using digitalPinToInterrupt (kcsoft)
	* fix type for us and timeout when no interrupt is triggered (kcsoft)
	* removed the callback parameter from the constructor, added sensor type (DHT11, DHT22) as optional param (kcsoft)
	* removed temp/humid calculation from the isr (kcsoft)
	* new function acquireFastLoop to remove delay when start acquiring (kcsoft)
	* update README.md file (kcsoft)


## Datasheet
[DHT11](http://www.micro4you.com/files/sensor/DHT11.pdf)  
[DHT22](http://www.adafruit.com/datasheets/DHT22.pdf)


## Based on
[idDHT11 library](https://github.com/niesteszeck/idDHT11)  
[DHTLib library](http://playground.arduino.cc/Main/DHTLib)  
[Code proposed on Arduino forum](https://forum.arduino.cc/index.php?topic=175356.0)


## License
[GPL v3](http://www.gnu.org/licenses/gpl.html)
