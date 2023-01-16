## OLED_Display_96X96
![image](https://statics3.seeedstudio.com/images/product/oled1281281.jpg)

Grove OLED Display 1.12'' V1.0
===
It is a 16 color grayscale 96×96 dot matrix OLED display module with Grove compatible 4pin I2C interface. Grove - OLED 96x96 is constructed with 96 x 96 dot matrix OLED module LY120 and SSD1327 driver IC. Comparing to LCD, OLED screens are more competitive, which has a number of advantages such as high brightness, self-emission, high contrast ratio, slim / thin outline, wide viewing angle, wide temperature range, and low power consumption.

- See ./examples/OLED_SSD1327_v1

When using V1.0 hardware, please check initialize functionality before uploading Arduino sketch.
```
SeeedGrayOled.init(SSD1327);
```

Grove OLED Display 1.12'' V2.0
===
**Note that the OLED v2.0 has a 128x128 dot matrix OLED display, when showing image, bitmap size should be 128x128 pixel.**

- See ./examples/OLED_SH1107G_v2

Change driver IC to SH1107G, when using V2.0 hardware, please check initialize functionality before uploading Arduino sketch.


```
SeeedGrayOled.init(SH1107G);
```

For more information, please refer to [wiki page][1]

----
This software is written by Visweswara R for seeed studio and is licensed under The GPL v2 License.<br>

Contributing to this software is warmly welcomed. You can do this basically by<br>
[forking](https://help.github.com/articles/fork-a-repo), committing modifications and then [pulling requests](https://help.github.com/articles/using-pull-requests) (follow the links above<br>
for operating guide). Adding change log and your contact into file header is encouraged.<br>
Thanks for your contribution.

Seeed is a hardware innovation platform for makers to grow inspirations into differentiating products. By working closely with technology providers of all scale, Seeed provides accessible technologies with quality, speed and supply chain knowledge. When prototypes are ready to iterate, Seeed helps productize 1 to 1,000 pcs using in-house engineering, supply chain management and agile manufacture forces. Seeed also team up with incubators, Chinese tech ecosystem, investors and distribution channels to portal Maker startups beyond.


[1]:http://wiki.seeedstudio.com/Grove-OLED_Display_1.12inch/



[![Analytics](https://ga-beacon.appspot.com/UA-46589105-3/OLED_Display_96X96)](https://github.com/igrigorik/ga-beacon)
