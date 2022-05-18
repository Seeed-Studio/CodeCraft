def isBody():
    VISION_ID_BODY = 0x05
    REG_VISION_CONF1 = 0x21
    RESULT_NUM = 0x34
    REG_VISION_ID = 0x20
    i2c_write8(REG_VISION_ID, VISION_ID_BODY)
    i2c_write8(REG_VISION_CONF1, 0x21)
    if (i2c_read8(RESULT_NUM) > 0):
        return 1
    else:
        return 0