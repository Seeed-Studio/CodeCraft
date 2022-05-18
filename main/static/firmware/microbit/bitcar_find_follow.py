
def linefollow(speed):
    if (linesensor(1) and linesensor(2)):
        move(speed, speed)
    else:
        if (not (linesensor(1)) and linesensor(2)):
            move(speed, 0)
            if (not (linesensor(1)) and not (linesensor(2))):
                move(speed, 0)
        else:
            if (not (linesensor(2)) and linesensor(1)):
                move(0, speed)
                if (not (linesensor(1)) and not (linesensor(2))):
                    move(0, speed)  
