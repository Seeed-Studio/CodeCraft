##Accelerometer_ADXL345
![image](http://www.seeedstudio.com/wiki/images/1/17/3-axis_Accelerometer_ADXL345.jpg)

This is a high resolution digital accelerometer providing you at max 3.9mg/LSB resolution and large ±16g measurement range. It's base on an advanced 3-axis IC ADXL345. Have no worry to implement it into your free-fall detection project, cause it's robust enough to survive upto 10,000g shock. Meanwhile, it's agile enough to detect single and double taps.It's ideal for motion detection, Gesture detection as well as robotics.

**Note:**

This library is used for Seeed graphical programming Project only.

API 
--
**Initialize:**

	void init();  // should be called before read data 

**Read data**

	/* 
	 * Function Name: AxisDigitalAccelerometerRead 
	 * Input: PinName, useless, can be any value 
	 *        _xyz – chanel choose 
	              'X' - read acc_x 
	              'Y' - read acc_y 
	              'Z' - read acc_z 
	 * Return: distance in cm   
	 */ 
	float AxisDigitalAccelerometerRead(int PinName, char _xyz); 

**Test Case**

Get acc of X, Y, Z in turn, and print to Serial monitor. 

	// test for seeed graphical programming project 
	// loovee @ 2015-8-4 
	#include <Wire.h> 
	#include <ADXL345.h> 
	 
	ADXL345 adxl; 
	 
	void setup() 
	{ 
	    adxl.init(); 
	    Serial.begin(115200); 
	} 
	 
	void loop() 
	{ 
	    float ax, ay, az; 
	     
	    ax = adxl.AxisDigitalAccelerometerRead(5, 'X'); 
	    ay = adxl.AxisDigitalAccelerometerRead(5, 'Y'); 
	    az = adxl.AxisDigitalAccelerometerRead(5, 'Z'); 
	     
	    Serial.print(ax, 2); Serial.print('\t'); 
	 
	    Serial.print(ay, 2); Serial.print('\t'); 
	    Serial.println(az, 2); 
	     
	    delay(20); 
	}



----
This software is written by Loovee for seeed studio<br>
and is licensed under [The MIT License](http://opensource.org/licenses/mit-license.php). Check License.txt for more information.<br>

Contributing to this software is warmly welcomed. You can do this basically by<br>
[forking](https://help.github.com/articles/fork-a-repo), committing modifications and then [pulling requests](https://help.github.com/articles/using-pull-requests) (follow the links above<br>
for operating guide). Adding change log and your contact into file header is encouraged.<br>
Thanks for your contribution.

Seeed is a hardware innovation platform for makers to grow inspirations into differentiating products. By working closely with technology providers of all scale, Seeed provides accessible technologies with quality, speed and supply chain knowledge. When prototypes are ready to iterate, Seeed helps productize 1 to 1,000 pcs using in-house engineering, supply chain management and agile manufacture forces. Seeed also team up with incubators, Chinese tech ecosystem, investors and distribution channels to portal Maker startups beyond.


[1]: http://www.seeedstudio.com/wiki/Grove_-_3-Axis_Digital_Accelerometer(%C2%B116g)


[![Analytics](https://ga-beacon.appspot.com/UA-46589105-3/Accelerometer_ADXL345)](https://github.com/igrigorik/ga-beacon)

