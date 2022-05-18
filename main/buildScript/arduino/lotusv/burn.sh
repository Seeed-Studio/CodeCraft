#!/bin/bash
"$2"/contents/hardware/tools/avr/bin/avrdude -C"$2"/contents/hardware/tools/avr/etc/avrdude.conf -v -patmega328p -carduino -P"$1" -b115200 -D -Uflash:w:"$3":i 

rm -f "$3"