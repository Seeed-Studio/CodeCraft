Grove_4Digital_Display
--------------------------------

[![Grove_4Digital_Display](http://www.seeedstudio.com/depot/bmz_cache/3/3a9f79323a82950c12fc7e69fa9fab4d.image.530x397.jpg)](http://www.seeedstudio.com/depot/Grove-4Digit-Display-p-1198.html)

4 digit display module is usually a 12 pin module. In this Grove gadget, we utilize a TM1637 to scale down the controlling pins into 2 Grove pins. It only takes 2 digital pins of Arduino or Seeeduino to control the content, even the luminance of this display. For projects that require of alpha-numeric display, this can be a nice choice.

**Note:**

This library is used for Seeed graphical programming Project only.

API 
--
	/* 
	* Function Name: DigitDisplayWrite 
	* Input - pinClk, pin of clock 
	*         pinDta, pin of data 
	*         num, number to display, should be between 0-9999 
	* Return - NULL 
	*/ 
	void DigitDisplayWrite(int pinClk, int pinDta, int num) 

Test Case 
--
Dispaly 0-9999 on the Grove, change per 10ms 

	// test for seeed graphical programming project 
	// loovee @ 2015-8-4 
	 
	#include "TM1637.h" 
	 
	const int pinClk = 2; 
	const int pinDta = 3; 
	 
	TM1637 led; 
	 
	 
	void setup() 
	{ 
	} 
	 
	void loop() 
	{ 
	    for(int i=0; i<10000; i++) 
	    { 
	        led.DigitDisplayWrite(pinClk, pinDta, i); 
	        delay(10); 
	    } 
	}

    
----

This software is written by Loovee for for [Seeed Technology Inc.](http://www.seeed.cc) and is licensed under [The MIT License](http://opensource.org/licenses/mit-license.php). Check License.txt/LICENSE for the details of MIT license. The TimerOne library is refered from the arduino community and its copyright follows the original.

Contributing to this software is warmly welcomed. You can do this basically by<br>
[forking](https://help.github.com/articles/fork-a-repo), committing modifications and then [pulling requests](https://help.github.com/articles/using-pull-requests) (follow the links above<br>
for operating guide). Adding change log and your contact into file header is encouraged.<br>
Thanks for your contribution.

Seeed is a hardware innovation platform for makers to grow inspirations into differentiating products. By working closely with technology providers of all scale, Seeed provides accessible technologies with quality, speed and supply chain knowledge. When prototypes are ready to iterate, Seeed helps productize 1 to 1,000 pcs using in-house engineering, supply chain management and agile manufacture forces. Seeed also team up with incubators, Chinese tech ecosystem, investors and distribution channels to portal Maker startups beyond.




[![Analytics](https://ga-beacon.appspot.com/UA-46589105-3/Grove_4Digital_Display)](https://github.com/igrigorik/ga-beacon)
