def toHex(num: int) -> str:
    hex_dict = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: 'a', 11: 'b', 12: 'c',
        13: 'd', 14: 'e', 15: 'f'}
    lis = []
    i = 6
    if num <= 0:
        return  '0'
    else:
        while i > 0:
            lis.append(hex_dict[num % 16])
            num //= 16
            i -=1
        lis.append('#')    
        lis.reverse()
        return ''.join(lis)


# get Color
def getColor():
    VISION_ID_COLOR = 0x02
    RESULT_DATA1 = 0x40
    RESULT_DATA2 = 0x41
    RESULT_DATA3 = 0x42
    REG_CAMERA_CONF1 = 0x10
    REG_PARAM_VALUE1 = 0x25
    REG_PARAM_VALUE2 = 0x26
    RESULT_NUM = 0x34
    REG_VISION_ID = 0x20
    i2c_write8(REG_CAMERA_CONF1, 0x30)
    i2c_write8(REG_VISION_ID, VISION_ID_COLOR)
    i2c_write8(REG_PARAM_VALUE1, 50)
    i2c_write8(REG_PARAM_VALUE2, 50)
    if (i2c_read8(RESULT_NUM) > 0):
        r = i2c_read8(RESULT_DATA1)
        g = i2c_read8(RESULT_DATA2)
        b = i2c_read8(RESULT_DATA3)
        rgb = (r << 16) | (g << 8) | (b << 0)
        return toHex(rgb)
    else:
        colorHex = "#FFFFFF"
        return colorHex