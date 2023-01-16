def linesensor(sensor):
    result = False
    if (sensor == 1):
        if (pin1.read_analog() < 500):
            result = True
    elif (sensor == 2):
        if (pin2.read_analog() < 500):
            result = True
    return result
