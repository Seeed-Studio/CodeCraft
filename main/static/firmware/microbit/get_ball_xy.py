def getBallValue(xy):
    VISION_ID_BALL = 0x03
    REG_VISION_CONF1 = 0x21
    RESULT_NUM = 0x34
    REG_VISION_ID = 0x20
    i2c_write8(REG_VISION_ID, VISION_ID_BALL)
    i2c_write8(REG_VISION_CONF1, 0x21)
    if (i2c_read8(RESULT_NUM) > 0):
        if(xy==1): 
            return i2c_read8(0x40)
        else:
            return i2c_read8(0x41)
    else:
        return -1
        