def move(left_number, right_number):
    if (left_number >= 0):
        pin13.write_analog(0)
        pin14.write_analog(left_number/100*1023)
    elif (left_number < 0):
        pin14.write_analog(0)
        pin13.write_analog(abs(left_number)/100*1023)
    if (right_number >= 0):
        pin16.write_analog(0)
        pin15.write_analog(right_number/100*1023)
    elif (right_number < 0):
        pin16.write_analog(abs(right_number)/100*1023)
        pin15.write_analog(0)

def stop():
    pin13.write_analog(0)
    pin14.write_analog(0)
    pin15.write_analog(0)
    pin16.write_analog(0)

def standup_still(speed, charge):
    move(-speed, -speed)
    sleep(200)
    move(speed, speed)
    sleep(charge)
    stop()