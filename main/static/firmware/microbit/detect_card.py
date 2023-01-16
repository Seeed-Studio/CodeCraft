def isCard(visionId, cardValue):
    REG_VISION_CONF1 = 0x21
    RESULT_NUM = 0x34
    REG_VISION_ID = 0x20
    i2c_write8(REG_VISION_ID, visionId)
    i2c_write8(REG_VISION_CONF1, 0x21)
    value_1 = i2c_read8(RESULT_NUM)
    if (value_1 > 0):
        value_2 = i2c_read8(0x44)
        return cardValue == value_2
    else:
        return 0