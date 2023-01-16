const hexToRgb = (hex) => {
    hex = hex.replace(/\"/g, '');
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

export default Blockly => {

    Blockly.MPython['motion_mpython_sysresoures_buttonpressed'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var key_value = block.getFieldValue('BUTTON');
        var code = (key_value == 'a+b'? `button_a.value() == 0 and button_b.value() == 0` : `button_${key_value}.value() == 0`)
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_buttontouched'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var touch_pin = block.getFieldValue('KEY');
        return [`touch_button(${touch_pin})`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_touchvalue'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var touch_pin = block.getFieldValue('KEY');
        return [`touch_value(${touch_pin})`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_volume'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        return [`sound_read()`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_light'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        return [`light_read()`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_acceleration'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var argu = block.getFieldValue('KEY');
        return [`get_accelerometer('${argu}')`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_slope'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var argu = block.getFieldValue('KEY');
        return [`get_tilt_angle('${argu}')`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_sharked'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        return [`get_shake_status()`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_slope_angle'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var argu = block.getFieldValue('KEY');
        return [`tilt_posision('${argu}')`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_set_single_color'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var arg = Blockly.MPython.valueToCode(block, 'LED', Blockly.MPython.ORDER_ATOMIC) || 0;
        var rgbHex = Blockly.MPython.valueToCode(block, 'COLOR', Blockly.MPython.ORDER_NONE);
        var rgb = hexToRgb(rgbHex);
        return `set_rgb(${arg}, ${rgb.r}, ${rgb.g}, ${rgb.b}) \n`
    }

    Blockly.MPython['motion_mpython_sysresoures_set_single_rgb'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var arg = Blockly.MPython.valueToCode(block, 'LED', Blockly.MPython.ORDER_ATOMIC) || 0;
        var r = Blockly.MPython.valueToCode(block, 'R', Blockly.MPython.ORDER_ATOMIC);
        var g = Blockly.MPython.valueToCode(block, 'G', Blockly.MPython.ORDER_ATOMIC);
        var b = Blockly.MPython.valueToCode(block, 'B', Blockly.MPython.ORDER_ATOMIC);
        return `set_rgb(${arg}, ${r}, ${g}, ${b}) \n`
    }

    Blockly.MPython['motion_mpython_sysresoures_set_all_color'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var rgbHex = Blockly.MPython.valueToCode(block, 'COLOR', Blockly.MPython.ORDER_NONE);
        var rgb = hexToRgb(rgbHex);
        return `set_all_rgb_lights_color(${rgb.r}, ${rgb.g}, ${rgb.b}) \n`
    }

    Blockly.MPython['motion_mpython_sysresoures_set_all_rgb'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var r = Blockly.MPython.valueToCode(block, 'R', Blockly.MPython.ORDER_ATOMIC);
        var g = Blockly.MPython.valueToCode(block, 'G', Blockly.MPython.ORDER_ATOMIC);
        var b = Blockly.MPython.valueToCode(block, 'B', Blockly.MPython.ORDER_ATOMIC);
        return `set_all_rgb_lights_color(${r}, ${g}, ${b}) \n`
    }
    
    Blockly.MPython['motion_mpython_sysresoures_close_rgb'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        return `turn_off_rgb_lights() \n`
    }

    Blockly.MPython['motion_mpython_sysresoures_set_bme280'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var arg = block.getFieldValue('ACTION');
        return [`get_bme280_value('${arg}')`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_draw_clock'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC);
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC);
        var r = Blockly.MPython.valueToCode(block, 'R', Blockly.MPython.ORDER_ATOMIC);
        var code = `my_clock = Clock(oled, ${x}, ${y}, ${r}) \nmy_clock.settime() \nmy_clock.drawClock() \noled.show() \n`;
        return code;
    }

    Blockly.MPython['motion_mpython_sysresoures_clock_operate'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var arg = block.getFieldValue('KEY');
        var a = 
        "my_clock.settime()\n" +
        "my_clock.drawClock()\n" +
        "oled.show()\n" +
        "my_clock.clear()\n"
        var b =
        "oled.show()\n" +
        "my_clock.clear()\n" +
        "oled.show()\n"
        var code =
        arg == 1? a : b
        // arg == 1?`\nmy_clock.settime()\nmy_clock.drawClock()\noled.show()\nmy_clock.clear()\n`
        // :
        // `\noled.show()\nmy_clock.clear()\noled.show()\n`
        return code
    }

    Blockly.MPython['motion_mpython_sysresoures_set_run_time'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var arg = block.getFieldValue('TIME');
        return [`run_time('${arg}')`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_set_local_time'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        var arg = block.getFieldValue('TIME');
        return [`get_localtime(${arg})`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_sysresoures_reset'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        return `machine_reset() \n`
    }

    Blockly.MPython['motion_mpython_sysresoures_mac_address'] = function (block) {
        Blockly.MPython.definitions_['import_system'] = 'from system import * ';
        return [`get_mac_address()`, Blockly.MPython.ORDER_ATOMIC];
    }
}