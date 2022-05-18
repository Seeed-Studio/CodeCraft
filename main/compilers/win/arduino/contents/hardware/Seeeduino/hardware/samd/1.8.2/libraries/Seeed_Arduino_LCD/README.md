# Seeed-Arduino-LCD  [![Build Status](https://travis-ci.com/Seeed-Studio/Seeed_Arduino_LCD.svg?branch=master)](https://travis-ci.com/Seeed-Studio/Seeed_Arduino_LCD)

### Introduction

This library fork form [TFT_eSPI](https://github.com/Bodmer/TFT_eSPI). It is used to drive LCD screen.

### Start
You need to configure User_Setup.h to make your board work with LCD.
For example, if you use the LCD screen of ILI9341, then you uncomment #define ILI9341_DRIVER to make it support.
And you need to specify the pins of the connection. Here is the default configuration。
##### SAMD21
 TFT   | PIN
 :-:   | :-:
 TFT_CS |  5 
 TFT_DC |  6  
 TFT_RST | -1  
 
 You can change pin definitions according to your needs.
 

### Boards
 We recommend using it on internal flash chips larger than 128k. If you have a smaller flash device, I recommend using the [TFT_Touch_Shield_V2](https://github.com/Seeed-Studio/TFT_Touch_Shield_V2).

### Note
  You can get more information [here](https://github.com/Bodmer/TFT_eSPI). 

