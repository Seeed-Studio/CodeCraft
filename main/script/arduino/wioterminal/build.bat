del "%~2"\grove_.ino.bin
del "%~2"\Temp\arduino_build\grove_.ino.bin

"%~1"\contents\arduino-builder ^
-dump-prefs ^
-logger=machine ^
-hardware "%~1"\contents\hardware ^
-tools "%~1"\contents\tools-builder ^
-tools "%~1"\contents\hardware\tools\avr ^
-libraries "%~1"\contents\libraries ^
-libraries "%~3" ^
-libraries "%~4" ^
-fqbn=Seeeduino:samd:seeed_wio_terminal:role=master,cache=on,speed=120,opt=small,maxqspi=50,usbstack=arduino,debug=off,txrxled=on ^
-vid-pid=0X2341_0X0043 ^
-ide-version=10815 ^
-build-path "%~2"\Temp\arduino_build ^
-warnings=all ^
-build-cache "%~2"\Temp\arduino_cache ^
-prefs=build.warn_data_percentage=75 ^
-prefs=runtime.tools.CMSIS.path="%~1"\contents\hardware\Seeeduino\tools\CMSIS\5.7.0 ^
-prefs=runtime.tools.CMSIS-5.7.0.path="%~1"\contents\hardware\Seeeduino\tools\CMSIS\5.7.0 ^
-prefs=runtime.tools.CMSIS-Atmel.path="%~1"\contents\hardware\Seeeduino\tools\CMSIS-Atmel\1.2.1 ^
-prefs=runtime.tools.CMSIS-Atmel-1.2.1.path="%~1"\contents\hardware\Seeeduino\tools\CMSIS-Atmel\1.2.1 ^
-prefs=runtime.tools.arm-none-eabi-gcc.path="%~1"\..\c ^
-prefs=runtime.tools.arm-none-eabi-gcc-7-2017q4.path="%~1"\..\c ^
-prefs=runtime.tools.arduinoOTA.path="%~1"\contents\hardware\tools\avr ^
-prefs=runtime.tools.arduinoOTA-1.2.1.path="%~1"\contents\hardware\tools\avr ^
-prefs=runtime.tools.bossac.path="%~1"\contents\hardware\Seeeduino\tools\bossac\1.8.0-48-gb176eee ^
-prefs=runtime.tools.bossac-1.7.0-arduino3.path="%~1"\contents\hardware\Seeeduino\tools\bossac\1.7.0-arduino3 ^
-prefs=runtime.tools.bossac-1.8.0-48-gb176eee.path="%~1"\contents\hardware\Seeeduino\tools\bossac\1.8.0-48-gb176eee ^
-prefs=runtime.tools.openocd.path="%~1"\contents\hardware\tools\avr ^
-prefs=runtime.tools.openocd-0.10.0-arduino7.path="%~1"\contents\hardware\tools\avr ^
-verbose "%~2"\grove_\grove_.ino

"%~1"\contents\arduino-builder ^
-compile ^
-logger=machine ^
-hardware "%~1"\contents\hardware ^
-tools "%~1"\contents\tools-builder ^
-tools "%~1"\contents\hardware\tools\avr ^
-libraries "%~1"\contents\libraries ^
-libraries "%~3" ^
-libraries "%~4" ^
-fqbn=Seeeduino:samd:seeed_wio_terminal:role=master,cache=on,speed=120,opt=small,maxqspi=50,usbstack=arduino,debug=off,txrxled=on ^
-vid-pid=0X2341_0X0043 ^
-ide-version=10815 ^
-build-path "%~2"\Temp\arduino_build ^
-warnings=all ^
-build-cache "%~2"\Temp\arduino_cache ^
-prefs=build.warn_data_percentage=75 ^
-prefs=runtime.tools.CMSIS.path="%~1"\contents\hardware\Seeeduino\tools\CMSIS\5.7.0 ^
-prefs=runtime.tools.CMSIS-5.7.0.path="%~1"\contents\hardware\Seeeduino\tools\CMSIS\5.7.0 ^
-prefs=runtime.tools.CMSIS-Atmel.path="%~1"\contents\hardware\Seeeduino\tools\CMSIS-Atmel\1.2.1 ^
-prefs=runtime.tools.CMSIS-Atmel-1.2.1.path="%~1"\contents\hardware\Seeeduino\tools\CMSIS-Atmel\1.2.1 ^
-prefs=runtime.tools.arm-none-eabi-gcc.path="%~1"\..\c ^
-prefs=runtime.tools.arm-none-eabi-gcc-7-2017q4.path="%~1"\..\c ^
-prefs=runtime.tools.arduinoOTA.path="%~1"\contents\hardware\tools\avr ^
-prefs=runtime.tools.arduinoOTA-1.2.1.path="%~1"\contents\hardware\tools\avr ^
-prefs=runtime.tools.bossac.path="%~1"\contents\hardware\Seeeduino\tools\bossac\1.8.0-48-gb176eee ^
-prefs=runtime.tools.bossac-1.7.0-arduino3.path="%~1"\contents\hardware\Seeeduino\tools\bossac\1.7.0-arduino3 ^
-prefs=runtime.tools.bossac-1.8.0-48-gb176eee.path="%~1"\contents\hardware\Seeeduino\tools\bossac\1.8.0-48-gb176eee ^
-prefs=runtime.tools.openocd.path="%~1"\contents\hardware\tools\avr ^
-prefs=runtime.tools.openocd-0.10.0-arduino7.path="%~1"\contents\hardware\tools\avr ^
-verbose "%~2"\grove_\grove_.ino

copy "%~2"\Temp\arduino_build\grove_.ino.bin "%~2"