
TARGET = ../../buildCache/grovezero/code

PROJ_DIR := .

OBJS   = ../../buildCache/grovezero/startup.o
## Bit15-8,Software version, Bit7-0,Hardware version
VERSION= 0101

#########################################################################
#########################################################################

VPATH := .
GPATH := $(VPATH)


#########################################################################

# GNU_INSTALL_ROOT := /usr/local/gcc-arm-none-eabi-4_9-2015q3/bin/
GNU_VERSION := 4.9.3
GNU_PREFIX  := arm-none-eabi
# Toolchain commands
CC      := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-gcc
CXX     := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-c++
AS      := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-as
AR      := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-ar -r
LD      := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-ld -v -nostartfiles
NM      := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-nm
OBJDUMP := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-objdump
OBJCOPY := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-objcopy
SIZE    := "$(GNU_INSTALL_ROOT)"$(GNU_PREFIX)-size



OPT = -Os
TARGET_ARCH = -mcpu=cortex-m4 -mthumb -mabi=aapcs -mfloat-abi=soft
WARNINGS = -Wall
F_NO_EXCEPTIONS = -fno-exceptions


CFLAGS  =  $(WARNINGS)
CFLAGS +=  $(TARGET_ARCH)
CFLAGS +=  $(F_NO_EXCEPTIONS)
CFLAGS += -nostdlib -std=c99
CFLAGS += -fno-builtin -fshort-enums
CFLAGS += -ffunction-sections -fdata-sections -fno-strict-aliasing
CFLAGS += -fno-common
CFLAGS += $(OPT)
CFLAGS += -DNRF52832_XXAA
CFLAGS += -DS132
CFLAGS += -DSOFTDEVICE_PRESENT
CFLAGS += -DSWI_DISABLE0
CFLAGS += -DLEVEL3
##CFLAGS += -g


CFLAGS += -I$(PROJ_DIR)
# Include folders common to all targets


LINKER_SCRIPT = usr.ld


# Linker flags
LDFLAGS = --gc-sections -Map=$(@:.elf=.map)


#########################################################################

#########################################################################
.PRECIOUS: %.o %.elf
.PHONY: all clean $(TARGET).sym $(TARGET).lss
.PHONY: $(TARGET).hex $(TARGET).bin


all: $(TARGET).elf $(TARGET).hex


$(TARGET).lss: $(TARGET).elf
	@$(OBJDUMP) -h -S -D $< > $@

$(TARGET).sym:
	@$(NM) -n $(TARGET).elf > $@


$(TARGET).hex: $(TARGET).elf
	$(OBJCOPY) -O ihex $< $@


$(TARGET).elf: $(OBJS)
	$(LD) $(LDFLAGS) -T$(LINKER_SCRIPT) -o $@ $^ libgcc.a
	$(SIZE) $@



# Create object files from C source files
$(OBJS): ../../buildCache/grovezero/%.o:%.c
	$(CC) -MP -MD -c -o $@ $(CFLAGS) $<

# Create object files from C++ source files
%.cpp.o:
	$(CC) -MP -MD -c -o ../../buildCache/grovezero/$@ $(CFLAGS) $(CXXFLAGS) $<

# Create object files from assembly source files
%.S.o %.s.o.o:
	$(CC) -x assembler-with-cpp $(ASMFLAGS) $<


clean:
	@rm -f ../../buildCache/grovezero/*.o ../../buildCache/grovezero/*.elf ../../buildCache/grovezero/*.bin ../../buildCache/grovezero/*.hex ../../buildCache/grovezero/*.lss ../../buildCache/grovezero/*.map ../../buildCache/grovezero/*.sym 


