export default Blockly => {

    Blockly.MPython['motion_mpython_get_pin_value'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.MPython.definitions_[`var_pin${pin}`] = `p${pin} = MPythonPin(${pin}, PinMode.IN)`;
        return [`p${pin}.read_digital()`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_set_pin_value'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.MPython.definitions_[`var_p${pin}`] = `p${pin} = MPythonPin(${pin}, PinMode.OUT)`;
        var status = block.getFieldValue('VALUE');
        return `p${pin}.write_digital(${status}) \n`;
    }

    Blockly.MPython['motion_mpython_get_pin_analog_value'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.MPython.definitions_[`var_p${pin}_analog`] = `p${pin} = MPythonPin(${pin}, PinMode.ANALOG)`;
        return [`p${pin}.read_analog()`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_set_pin_analog_value'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.MPython.definitions_[`var_p${pin}_pwm`] = `p${pin} = MPythonPin(${pin}, PinMode.PWM)`;
        var pwm = Blockly.MPython.valueToCode(block, 'PWM', Blockly.MPython.ORDER_ATOMIC) || 0;
        return `p${pin}.write_analog(${pwm}) \n`;
    }

    Blockly.MPython['motion_mpython_set_servo_angle'] = function (block) {
        Blockly.MPython.definitions_['import_servo'] = 'from servo import Servo';
        var pin = block.getFieldValue('PIN');
        Blockly.MPython.definitions_[`var_pin${pin}_servo`] = `servo_${pin} = Servo(${pin}, min_us=750, max_us=2250, actuation_range=180)`;
        var angle = Blockly.MPython.valueToCode(block, 'ANGLE', Blockly.MPython.ORDER_ATOMIC) || 0;
        return `servo_${pin}.write_angle(${angle}) \n`;
    }

    Blockly.MPython['motion_mpython_set_servo_pwm_maxangle'] = function (block) {
        Blockly.MPython.definitions_['import_servo'] = 'from servo import Servo';
        var pin = block.getFieldValue('PIN');
        var angle = Blockly.MPython.valueToCode(block, 'ANGLE', Blockly.MPython.ORDER_ATOMIC) || 0;
        var minus = Blockly.MPython.valueToCode(block, 'PWMSTART', Blockly.MPython.ORDER_ATOMIC) || 0;
        var maxus = Blockly.MPython.valueToCode(block, 'PWMEND', Blockly.MPython.ORDER_ATOMIC) || 0;
        var range = Blockly.MPython.valueToCode(block, 'MAXANGLE', Blockly.MPython.ORDER_ATOMIC) || 0;
        Blockly.MPython.definitions_[`var_pin${pin}_servo`] = `servo_${pin} = Servo(${pin}, min_us=${minus || 750}, max_us=${maxus || 2250}, actuation_range=${range || 180})`;
        return `servo_${pin}.write_angle(${angle}) \n`;
    }

    Blockly.MPython['motion_mpython_set_pin_mode'] = function (block) {
        Blockly.MPython.definitions_['import_machine'] = 'import machine';
        var pin = block.getFieldValue('PIN');
        var status = block.getFieldValue('STATUS');
        var mode = block.getFieldValue('MODE');
        return `p${pin} = machine.Pin(Pin.P${pin}, Pin.${status}, ${mode}) \n`;
    }

    Blockly.MPython['motion_mpython_external_level_duration'] = function (block) {
        Blockly.MPython.definitions_['import_machine'] = 'import machine';
        var pin = block.getFieldValue('PIN');
        var v = block.getFieldValue('VALUE');
        return [`machine.time_pulse_us(Pin(Pin.P${pin}), ${v}, timeout_us=1000000)`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_dht11_value'] = function (block) {
        Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
        Blockly.MPython.definitions_['import_dht'] = 'import dht';
        var pin = block.getFieldValue('PIN');
        Blockly.MPython.definitions_[`var_dht11`] = `dht11 = dht.DHT11(Pin(Pin.P${pin}))\n`
        Blockly.MPython.definitions_[`var_dht`] =
            "tim13 = Timer(13)\n" +

            "def timer13_tick(_):\n" +
            "    try: dht11.measure()\n" +
            "    except: pass\n" +

            "tim13.init(period=1000, mode=Timer.PERIODIC, callback=timer13_tick)"

        var v = block.getFieldValue('VALUE');
        return [`dht11.${v}()`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_dht22_value'] = function (block) {
        Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
        Blockly.MPython.definitions_['import_dht'] = 'import dht';
        var pin = block.getFieldValue('PIN');
        Blockly.MPython.definitions_[`var_dht22`] = `dht22 = dht.DHT11(Pin(Pin.P${pin}))\n`
        Blockly.MPython.definitions_[`var_dht`] =
            "tim13 = Timer(13)\n" +

            "def timer13_tick(_):\n" +
            "    try: dht11.measure()\n" +
            "    except: pass\n" +

            "tim13.init(period=1000, mode=Timer.PERIODIC, callback=timer13_tick)"

        var v = block.getFieldValue('VALUE');
        return [`dht22.${v}()`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_init_i2c_baud_rate'] = function (block) {
        var v = block.getFieldValue('RATE');
        return `i2c = I2C(scl=Pin(Pin.P19), sda=Pin(Pin.P20), freq=${v}) \n`;
    }

    Blockly.MPython['motion_mpython_init_i2c_scl_sda_baud'] = function (block) {
        var scl = block.getFieldValue('SCL');
        var sda = block.getFieldValue('SDA');
        var rate = block.getFieldValue('RATE');
        return `i2c = I2C(scl=Pin(Pin.P${scl}), sda=Pin(Pin.P${sda}), freq=${rate}) \n`;
    }

    Blockly.MPython['motion_mpython_i2c_address_write'] = function (block) {
        var addr = Blockly.MPython.valueToCode(block, 'ADDRESS', Blockly.MPython.ORDER_ATOMIC) || 0;
        var v = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC) || 0;
        return `i2c.writeto(${addr}, ${v}) \n`;
    }

    Blockly.MPython['motion_mpython_i2c_address_get_bytes_num'] = function (block) {
        var addr = Blockly.MPython.valueToCode(block, 'ADDRESS', Blockly.MPython.ORDER_ATOMIC) || 0;
        var v = Blockly.MPython.valueToCode(block, 'NUM', Blockly.MPython.ORDER_ATOMIC) || 0;
        return [`str(i2c.readfrom(${addr}, ${v}))`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_hcsr04_ultrasonic_init'] = function (block) {
        Blockly.MPython.definitions_['import_hcsr04'] = 'from hcsr04 import HCSR04';
        var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","") || 0;
        var trigger = block.getFieldValue('TRIGGER');
        var echo = block.getFieldValue('ECHO');
        return `${name} = HCSR04(trigger_pin=Pin.P${trigger}, echo_pin=Pin.P${echo}) \n`;
    }

    Blockly.MPython['motion_mpython_hcsr04_ultrasonic_distance_unit'] = function (block) {
        Blockly.MPython.definitions_['import_hcsr04'] = 'from hcsr04 import HCSR04';
        var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","") || 0;
        var unit = block.getFieldValue('UNIT');
        return [`${name}.distance_${unit}()`, Blockly.MPython.ORDER_ATOMIC];
    }

}
