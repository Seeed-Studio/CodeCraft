def isColor(color):
    VISION_ID_COLOR = 0x02
    REG_CAMERA_CONF1 = 0x10
    i2c_write8(REG_CAMERA_CONF1, 0x30)
    i2c_write8(REG_VISION_ID, VISION_ID_COLOR)
    REG_PARAM_VALUE1 = 0x25
    REG_PARAM_VALUE2 = 0x26
    i2c_write8(REG_PARAM_VALUE1, 50)
    i2c_write8(REG_PARAM_VALUE2, 50)
    if (i2c_read8(RESULT_NUM) > 0):
        return color == i2c_read8(0x44)
    else:
        return 0
        