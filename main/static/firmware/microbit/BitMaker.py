def read_Ain(AnalogPort):
    pin = getattr(microbit, 'pin{}'.format(AnalogPort))
    return pin.read_analog()

def convert_Ain(AnalogPort, low_value, high_value):
    pin = getattr(microbit, 'pin{}'.format(AnalogPort))
    return map(pin.read_analog(), 0, 1023, low_value, high_value)

def write_analog(AnalogPort, value):
    pin = getattr(microbit, 'pin{}'.format(AnalogPort))
    pin.write_analog(value)

def config_PWM(AnalogPort, value):
    pin = getattr(microbit, 'pin{}'.format(AnalogPort))
    pin.set_analog_period(value)

def read_Din_value(groveport):
    pin = getattr(microbit, 'pin{}'.format(groveport))
    return pin.read_digital()

def read_Din(groveport, bool):
    pin = getattr(microbit, 'pin{}'.format(groveport))
    Din_stat = pin.read_digital()
    if (
        (bool is True and Din_stat == 1)
            or (bool is False and Din_stat == 0)
       ):
        return True
    else:
        return False

def set_Dout(GrovePort, bool):
    pin = getattr(microbit, 'pin{}'.format(GrovePort))
    if bool:
        pin.write_digital(1)
    else:
        pin.write_digital(0)

BitMaker_np = neopixel.NeoPixel(pin13, 4)
def BitMaker_Set_RGB(RGB_Number, red, green, blue):
    BitMaker_np[RGB_Number] = (red, green, blue)
    BitMaker_np.show()