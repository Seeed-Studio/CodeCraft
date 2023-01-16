def KeyPressed(BitPlayerKey):
    pin = getattr(microbit, 'pin{}'.format(BitPlayerKey))
    pin.set_pull(pin.PULL_UP)
    return pin.read_digital() == 0

def SetMotor(bool):
    if bool is True:
        pin8.write_digital(1)
    else:
        pin8.write_digital(0)

def OnJoystick(position):
    UpLeft = 1
    Up = 2
    UpRight = 3
    Left = 4
    Middle = 5
    Right = 6
    LowerLeft = 7
    Down = 8
    LowerRight = 9
    x0 = 500
    y0 = 500
    d0 = 250
    x = pin1.read_analog() - x0
    y = pin2.read_analog() - y0
    d = round(math.sqrt(abs(x * x) + abs(y * y)))
    value1 = round(d * 0.38)
    value2 = round(d * 0.92)
    getPosition = Middle

    if (d > d0):
        if (x > 0 and y > 0):               # (x,y) is at top right area
            if (y > value2):
                getPosition = Up
            elif (y < value1):
                getPosition = Right
            else:
                getPosition = UpRight
        elif (x > 0 and y < 0):        # (x,y) is at bot right area
            if (x > value2):
                getPosition = Right
            elif (x < value1):
                getPosition = Down
            else:
                getPosition = LowerRight

        elif (x < 0 and y < 0):         # (x,y) is at bot left area
            y = abs(y)
            if (y > value2):
                getPosition = Down
            elif (y < value1):
                getPosition = Left
            else:
                getPosition = LowerLeft
        elif (x < 0 and y > 0):         # (x,y) is at top left area
            if (y > value2):
                getPosition = Up
            elif (y < value1):
                getPosition = Left
            else:
                getPosition = UpLeft
    else:
        getPosition = Middle
    if (getPosition == position):
        return True
    else:
        return False
