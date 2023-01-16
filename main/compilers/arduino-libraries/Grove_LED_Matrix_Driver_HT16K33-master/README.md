# Grove - LED Matrix Driver(HT16K33 with 8x8 LED Matrix)  [![Build Status](https://travis-ci.com/Seeed-Studio/Grove_LED_Matrix_Driver_HT16K33.svg?branch=master)](https://travis-ci.com/Seeed-Studio/Grove_LED_Matrix_Driver_HT16K33)

The HT16K33 is a memory mapping and multi-function LED controller driver. 

## How to use

Grove - LED Matrix Driver is an I2C device, just connect it to the I2C, and power it with 5V.

## Examples

### display_bar

This example shows the `bar mode`. There are 33 levels of the bar. It can be used to display distance, volume, or etc.

### display_icon

This example shows the `icon mode`. There are 29 icons in our library, include some smile faces, arrows, shapes... If you want to make you own icons, please go to `display_custom_pictures`.

### display_number

This example shows how to display a integer number. The display range of writeNumber() is int32_t (from -2147483648 to 2147483647).

### display_string

This example shows how to display a string. The string size should be less than 48(if you want more, please change `MAX_BIG_BUFFER_SIZE` at the header file).

### display_custom_pictures

This example shows how to make your own pictures and display them. Firstly, create uint64_t type 8x8 matrix picture at https://xantorohara.github.io/led-matrix-editor/# .
Then copy the uint64_t array(on the right side of the page) to your arduino IDE and pass the array name to `writePictures()` or `writeOnePicture()`.

### offset_and_rotate

This example shows how to set offset and rotate. Note that `setDisplayOffset()` works after call `display()` and `setDisplayOrientation` works after call `writeXXX()`.

### others

You can use `setBrightness()` to change the brightness of LED. Note that the brighter you set, the larger current will be needed.


When set `setBlinkRate(BLINK_1HZ)` or `setBlinkRate(BLINK_2HZ)`, LED will blink automatically.

More informations in `Grove_LED_Matrix_Driver_HT16K33.h`

## Change I2C Address

There are 8 possible I2C address of this grove, from 0x70 to 0x77. You can change the I2C address by soliding those pads in a red box in the following picture. For example, if I want to change the address to 0x73, I need to connect pad A1,A0 and disconnect pad A2. Then I will get address 0b01110011, that is 0x73.

![](https://user-images.githubusercontent.com/18615354/42156790-9c8733ea-7e1e-11e8-9de4-4b6292940a52.png)

----

This software is written by Jerry Yip for seeed studio and is licensed under [The MIT License](http://opensource.org/licenses/mit-license.php). Check License.txt for more information.<br>

Contributing to this software is warmly welcomed. You can do this basically by<br>
[forking](https://help.github.com/articles/fork-a-repo), committing modifications and then [pulling requests](https://help.github.com/articles/using-pull-requests) (follow the links above<br>
for operating guide). Adding change log and your contact into file header is encouraged.<br>
Thanks for your contribution.

Seeed Studio is an open hardware facilitation company based in Shenzhen, China. <br>
Benefiting from local manufacture power and convenient global logistic system, <br>
we integrate resources to serve new era of innovation. Seeed also works with <br>
global distributors and partners to push open hardware movement.<br>


[![Analytics](https://ga-beacon.appspot.com/UA-46589105-3/grove-led-matrix-driver-ht16k33)](https://github.com/igrigorik/ga-beacon)
