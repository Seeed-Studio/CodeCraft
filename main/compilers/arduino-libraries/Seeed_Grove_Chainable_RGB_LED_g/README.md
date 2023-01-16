ChainableLED
---------------

[![ChainableLED](http://www.seeedstudio.com/wiki/images/thumb/9/94/Chanbalelednb1.jpg/300px-Chanbalelednb1.jpg)](http://www.seeedstudio.com/depot/twig-chainable-rgb-led-p-850.html?cPath=156_157)

Arduino library compatible with Grove Chainable LED and the P9813 chip. It allows controlling a chain of LEDS individually. 
Supports both RGB and HSB color spaces for setting the color of each individual LED.


**Note:**

This library is used for Seeed graphical programming Project only.

API 
--
	/* 
	* Function Name: ChainableRGBLEDWrite 
	* Input - pinClk: pin name of clock 
	*         pinDta: pin name of data 
	*         led_num: how many leds 
	*         red, green, blue - RGB value of the color 
	* Return - NULL 
	*/ 
	void ChainableRGBLEDWrite(int pinClk, int pinDta, int led_num, unsigned char red, unsigned char 
	green, unsigned char blue) 

Test Case 
--

R->G->B, 500ms 

	// test for seeed graphical programming project 
	// loovee @ 2015-8-4 
	 
	#include <ChainableLED.h> 
	 
	#define NUM_LEDS  5         // number of leds 
	 
	ChainableLED leds; 
	 
	const int pinClk = 7; 
	const int pinDta = 8; 
	 
	void setup() 
	{ 
	 
	} 
	 
	void loop() 
	{ 
	    leds.ChainableRGBLEDWrite(pinClk, pinDta, NUM_LEDS, 255, 0, 0);         // red 
	    delay(500); 
	    leds.ChainableRGBLEDWrite(pinClk, pinDta, NUM_LEDS, 0, 255, 0);         // green 
	    delay(500); 
	    leds.ChainableRGBLEDWrite(pinClk, pinDta, NUM_LEDS, 0, 0, 255);         // blue 
	    delay(500); 
	}

----

This software is written by pjp.marques@gmail.com.

Contributing to this software is warmly welcomed. You can do this basically by<br>
[forking](https://help.github.com/articles/fork-a-repo), committing modifications and then [pulling requests](https://help.github.com/articles/using-pull-requests) (follow the links above<br>
for operating guide). Adding change log and your contact into file header is encouraged.<br>
Thanks for your contribution.

Seeed Studio is an open hardware facilitation company based in Shenzhen, China. <br>
Benefiting from local manufacture power and convenient global logistic system, <br>
we integrate resources to serve new era of innovation. Seeed also works with <br>
global distributors and partners to push open hardware movement.<br>


[![Analytics](https://ga-beacon.appspot.com/UA-46589105-3/Grove_Chainable_RGB_LED)](https://github.com/igrigorik/ga-beacon)


