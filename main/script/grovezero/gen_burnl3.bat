@echo off
REM set PATH2TOOLS=D:\gcc-arm\bin\
REM set PATH=%PATH2TOOLS%;%PATH%
arm-none-eabi-gcc -Wall -mcpu=cortex-m4 -mthumb -mabi=aapcs -mfloat-abi=soft -fno-exceptions -nostdlib -std=c99 -fno-builtin -fshort-enums -ffunction-sections -fdata-sections -fno-strict-aliasing -fno-common -Os -DNRF52832_XXAA -DS112 -DSOFTDEVICE_PRESENT -DSWI_DISABLE0 -I../  -mcpu=cortex-m4 -mthumb -mabi=aapcs -mfloat-abi=soft -c -o ../../buildTemp/grovezero/startup.o startup.c
arm-none-eabi-ld -v -nostartfiles --gc-sections -Map=../../buildTemp/grovezero/third.map -T usr.ld -o ../../buildTemp/grovezero/third.elf ../../buildTemp/grovezero/startup.o libgcc.a
arm-none-eabi-size ../../buildTemp/grovezero/third.elf
arm-none-eabi-objcopy -O ihex ../../buildTemp/grovezero/third.elf ../../buildTemp/grovezero/code.hex
