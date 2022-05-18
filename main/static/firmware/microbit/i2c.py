# I2C init  freq scl sda
def i2c_init():
    i2c.init(freq=100000, sda=pin20, scl=pin19)

def i2c_read8(reg):
    MU_ADDRESS = 0x50
    data_0 = reg & 0xff
    cmd = bytearray([data_0])
    i2c.write(MU_ADDRESS, cmd)
    bytes = i2c.read(MU_ADDRESS, 1)
    result = 0
    for b in bytes:
        result = result * 256 + int(b)
    return result
    
def i2c_write8(reg, value):
    MU_ADDRESS = 0x50
    data_0 = reg & 0xff
    data_1 = value & 0xff
    cmd = bytearray([data_0, data_1])
    i2c.write(MU_ADDRESS, cmd)

def init_vision():
    i2c_init()
    sleep(200)
    i2c_write8(0x21, 0x21)
    sleep(1000)    
    