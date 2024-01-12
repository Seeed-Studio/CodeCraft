rm -f "$2"/grove_.ino.hex
rm -f "$2"/Temp/arduino_build/grove_.ino.hex

"$1"/contents/arduino-builder \
-dump-prefs \
-logger=machine \
-hardware "$1"/contents/hardware \
-tools "$1"/contents/tools-builder \
-tools "$1"/contents/hardware/tools/avr \
-libraries "$1"/contents/libraries \
-libraries "$3" \
-libraries "$4" \
-fqbn=arduino:avr:uno \
-vid-pid=0X2341_0X0043 \
-ide-version=10815 \
-build-path "$2"/Temp/arduino_build \
-warnings=all \
-prefs=build.warn_data_percentage=75 \
-prefs=runtime.tools.arduinoOTA.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.avrdude.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.avr-gcc.path="$1"/contents/hardware/tools/avr \
-verbose "$2"/grove_/grove_.ino

"$1"/contents/arduino-builder \
-compile \
-logger=machine \
-hardware "$1"/contents/hardware \
-tools "$1"/contents/tools-builder \
-tools "$1"/contents/hardware/tools/avr \
-libraries "$1"/contents/libraries \
-libraries "$3" \
-libraries "$4" \
-fqbn=arduino:avr:uno \
-vid-pid=0X2341_0X0043 \
-ide-version=10815 \
-build-path "$2"/Temp/arduino_build \
-warnings=all \
-build-cache "$2"/Temp/arduino_cache \
-prefs=build.warn_data_percentage=75 \
-prefs=runtime.tools.arduinoOTA.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.avrdude.path="$1"/contents/hardware/tools/avr \
-prefs=runtime.tools.avr-gcc.path="$1"/contents/hardware/tools/avr \
-verbose "$2"/grove_/grove_.ino

cp "$2"/Temp/arduino_build/grove_.ino.hex "$2"
