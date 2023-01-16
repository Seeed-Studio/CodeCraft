def SetMotor(on):
    if on:
        pin2.write_digital(1)
    else:
        pin2.write_digital(0)
        
BitWear_np = neopixel.NeoPixel(pin1, 1)
def BitWear_Set_RGB(red, green, blue):
    BitWear_np[0] = (red, green, blue)
    BitWear_np.show()
    
