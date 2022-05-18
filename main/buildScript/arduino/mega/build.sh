rm -f "$2"/grove_.ino.hex
rm -f "$2"/Temp/arduino_build/grove_.ino.hex

"$1"/contents/arduino-builder \
-dump-prefs \
-logger=machine \
-hardware "$1"/contents/hardware \
-tools "$1"/contents/tools-builder \
-tools "$1"/contents/hardware/tools/avr \
-tools "$1"/contents/hardware \
-built-in-libraries "$1"/contents/libraries \
-libraries "$3" \
-libraries "$4" \
-fqbn=arduino:avr:mega:cpu=atmega2560 \
-ide-version=10815 \
-build-path "$2"/Temp/arduino_build \
-warnings=all \
-build-cache "$2"/Temp/arduino_cache \
-prefs=build.warn_data_percentage=75 \
-prefs=runtime.tools.avr-gcc.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.avrdude.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.arduinoOTA.path="$1"/contents/hardware/tools/avr \
-verbose "$2"/grove_/grove_.ino

"$1"/contents/arduino-builder \
-compile \
-logger=machine \
-hardware "$1"/contents/hardware \
-tools "$1"/contents/tools-builder \
-tools "$1"/contents/hardware/tools/avr \
-tools "$1"/contents/hardware \
-built-in-libraries "$1"/contents/libraries \
-libraries "$3" \
-libraries "$4" \
-fqbn=arduino:avr:mega:cpu=atmega2560 \
-ide-version=10815 \
-build-path "$2"/Temp/arduino_build \
-warnings=all \
-build-cache "$2"/Temp/arduino_cache \
-prefs=build.warn_data_percentage=75 \
-prefs=runtime.tools.avr-gcc.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.avrdude.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.arduinoOTA.path="$1"/contents/hardware/tools/avr \
-verbose "$2"/grove_/grove_.ino

cp "$2"/Temp/arduino_build/grove_.ino.hex "$2"
