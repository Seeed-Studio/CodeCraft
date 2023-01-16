ChainableLED
---------------

[Grove - Chainable RGB LED](https://www.seeedstudio.com/Grove-Chainable-RGB-LED-p-850.html)

<img src=https://statics3.seeedstudio.com/images/product/chanbalelednb1.jpg width=300><img src=https://statics3.seeedstudio.com/product/chanbalelednb1_02.jpg width=300>

[Grove – Chainable RGB Led V2.0](https://www.seeedstudio.com/Grove-%E2%80%93-Chainable-RGB-Led-V2.0-p-2903.html)

<img src=https://statics3.seeedstudio.com/seeed/file/2017-07/bazaar501790_10402004845.jpg width=300><img src=https://statics3.seeedstudio.com/seeed/file/2017-07/bazaar501794_1040200484.jpg width=300>


Arduino library compatible with Grove Chainable LED and the P9813 chip. It allows controlling a chain of LEDS individually. 
Supports both RGB and HSB color spaces for setting the color of each individual LED.

For more information please visit [Seeed wiki](http://wiki.seeedstudio.com/Grove-Chainable_RGB_LED/) or [the author's Gitub](https://github.com/pjpmarques/ChainableLED).

### Usage:

#### Installation

- Install library from Arduino Library Manager

    or

- Download source code from GitHub.

#### Library Interface

```c++
    class ChainableLED {
      public:
        ChainableLED(byte clk_pin, byte data_pin, byte number_of_leds);

        void setColorRGB(byte led, byte red, byte green, byte blue);
        void setColorHSB(byte led, float hue, float saturation, float brightness);
    }
```

For more information, please refer to [author's wiki page](https://github.com/pjpmarques/ChainableLED/wiki) or [seeedstudio's wiki page](http://www.seeedstudio.com/wiki/Grove_-_Chainable_RGB_LED).

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


