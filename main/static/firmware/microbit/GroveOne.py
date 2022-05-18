"""
I2C init  freq scl sda
"""
def i2c_init(freq):
    i2c.init(100000, pin19, pin20)

"""
Read one number to a 7-bit address
read n bytes from device with addr; repeat=True means a stop bit won't
be sent.
"""
def read_i2c(addr, NumberFormat, bool):
    return i2c.read(addr, NumberFormat, bool)


"""
# write buf to device with addr; repeat=True means a stop bit won't be sent.
"""
def wirte_i2c(addr, value, NumberFormat, bool):
    i2c.write(addr, value, NumberFormat, bool)
    
def measureInCentimeters(groveport, Unit):
    duration = 0
    distance = 0
    distanceBackup = 0
    pin = getattr(microbit, 'pin{}'.format(groveport))
    pin.write_digital(0)
    utime.sleep_us(2)
    pin.write_digital(1)
    utime.sleep_us(10)
    pin.write_digital(0)
    pin.read_digital()
    duration = machine.time_pulse_us(pin, 1, 10500)
    if (Unit == 1):
        distance = duration * 153 / 58 / 100
    else:
        distance = duration * 153 / 148 / 100
    if (distance > 0):
        distanceBackup = distance
    else:
        distance = distanceBackup
    sleep(50)

    return round(distance, 1)


def minifan(analogport, speed):
    pin = getattr(microbit, 'pin{}'.format(analogport))
    pin.write_analog((speed/(100-0)*(1023-0) + 0))


class Servo:
    def __init__(self, pin, freq=50, min_us=600, max_us=2400, angle=180):
        self.min_us = min_us
        self.max_us = max_us
        self.us = 0
        self.freq = freq
        self.angle = angle
        self.analog_period = 0
        pin = getattr(microbit, 'pin{}'.format(pin))
        self.pin = pin
        analog_period = round((1/self.freq) * 1000)  # hertz to miliseconds
        self.pin.set_analog_period(analog_period)

    def write_us(self, us):
        us = min(self.max_us, max(self.min_us, us))
        duty = round(us * 1024 * self.freq // 1000000)
        self.pin.write_analog(duty)
        # self.pin.write_digital(0)  # turn the pin off

    def write_angle(self, degrees=None):
        degrees = degrees % 360
        total_range = self.max_us - self.min_us
        degre = round(total_range * (degrees/(180-0)*(180-10)+0))
        
        us = self.min_us + degre // self.angle
        self.write_us(us)

def servo(analogport, angle):
    Servo(analogport).write_angle(angle)


