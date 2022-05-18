export default Blockly => {

    Blockly.MPython['event_mpython_whenstartup'] = function (block) {
        var funcName = Blockly.MPython.variableDB_.getDistinctName('whenstartup', Blockly.Variables.NAME_TYPE);
        Blockly.MPython.initfuncs_[`@event.${funcName}`] = `${funcName}()`;
        return `def ${funcName}():\n`;
    }

    Blockly.MPython['sensing_maixduino_print'] = function (block) {
        var value = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC) || 0;
        return `print(${value})\n`;
    }

    Blockly.MPython['event_mpython_whenaction'] = function (block) {
        var mode = block.getFieldValue('MODE');
        var action = block.getFieldValue('ACTION');
        var trigger = action == 'down'? 'FALLING' : 'RISING'
        var funcName = Blockly.MPython.variableDB_.getDistinctName(`on_button_${mode}_${action}`, Blockly.Variables.NAME_TYPE);
        Blockly.MPython.initfuncs_[`attach_${funcName}`] = `button_${mode}.irq(trigger=Pin.IRQ_${trigger}, handler=on_button_${mode}_${action})`;
        return `def ${funcName}(_):\n`;
    }

    Blockly.MPython['event_mpython_whenpinvoltage'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var voltage = block.getFieldValue('VOLTAGE');
        var trigger = voltage == 'low'? 'FALLING' : 'RISING'
        Blockly.MPython.definitions_[`var_pin${pin}`] = `p${pin} = MPythonPin(${pin}, PinMode.IN)`;
        var funcName = Blockly.MPython.variableDB_.getDistinctName(`on_pin${pin}_to_${voltage}`, Blockly.Variables.NAME_TYPE);
        Blockly.MPython.initfuncs_[`fun_p${pin}_irq`] = `p${pin}.irq(trigger=Pin.IRQ_${trigger}, handler=on_pin${pin}_to_${voltage})`;
        return `def ${funcName}(_):\n`;
    }

    Blockly.MPython['event_mpython_whenshark'] = function (block) {
        Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
        Blockly.MPython.definitions_[`var_shaked`] =
        "_is_shaked = False\n"+
        "_last_x = _last_y = _last_z = _count_shaked = 0\n"+
        "def on_shaked():pass\n"+
        
        "tim11 = Timer(11)\n"+
        
        "def timer11_tick(_):\n"+
        "    global _is_shaked, _last_x, _last_y, _last_z, _count_shaked\n"+
        "    if _is_shaked:\n"+
        "        _count_shaked += 1\n"+
        "        if _count_shaked == 5: _count_shaked = 0\n"+
        "    x=accelerometer.get_x(); y=accelerometer.get_y(); z=accelerometer.get_z()\n"+
        "    if _last_x == 0 and _last_y == 0 and _last_z == 0:\n"+
        "        _last_x = x; _last_y = y; _last_z = z; return\n"+
        "    diff_x = x - _last_x; diff_y = y - _last_y; diff_z = z - _last_z\n"+
        "    _last_x = x; _last_y = y; _last_z = z\n"+
        "    if _count_shaked > 0: return\n"+
        "    _is_shaked = (diff_x * diff_x + diff_y * diff_y + diff_z * diff_z > 1)\n"+
        "    if _is_shaked: on_shaked()\n"+
        
        "tim11.init(period=100, mode=Timer.PERIODIC, callback=timer11_tick)\n"
        var funcName = Blockly.MPython.variableDB_.getDistinctName(`on_shaked`, Blockly.Variables.NAME_TYPE);
        return `def ${funcName}():\n`;
    }

    Blockly.MPython['event_mpython_whentilt'] = function (block) {
        Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
        Blockly.MPython.definitions_[`var_tilt`] =
        "_dir = ''\n" +
        "def on_tilt_forward():pass\n" +
        "def on_tilt_back():pass\n" +
        "def on_tilt_right():pass\n" +
        "def on_tilt_left():pass\n" +
        "def on_tilt_none():pass\n" +

        "tim14 = Timer(14)\n" +

        "def timer14_tick(_):\n" +
        "    global _dir\n" +
        "    if accelerometer.get_x() < -0.5:\n" +
        "        if 'F' != _dir:_dir = 'F';on_tilt_forward()\n" +
        "    elif accelerometer.get_x() > 0.5:\n" +
        "        if 'B' != _dir:_dir = 'B';on_tilt_back()\n" +
        "    elif accelerometer.get_y() < -0.5:\n" +
        "        if 'R' != _dir:_dir = 'R';on_tilt_right()\n" +
        "    elif accelerometer.get_y() > 0.5:\n" +
        "        if 'L' != _dir:_dir = 'L';on_tilt_left()\n" +
        "    else:\n" +
        "        if '' != _dir:_dir = '';on_tilt_none()\n" +

        "tim14.init(period=200, mode=Timer.PERIODIC, callback=timer14_tick)\n"
        var tilt = block.getFieldValue('TILT');
        var funcName = Blockly.MPython.variableDB_.getDistinctName(`on_tilt_${tilt}`, Blockly.Variables.NAME_TYPE);
        return `def ${funcName}():\n`;
    }

    Blockly.MPython['event_mpython_whentouchkey'] = function (block) {
        Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
        Blockly.MPython.definitions_[`var_touchpad`] =
        "_status_p = _status_y = _status_t = _status_h = _status_o = _status_n = 0\n" +
        "def on_touchpad_P_pressed():pass\n" +
        "def on_touchpad_P_unpressed():pass\n" +
        "def on_touchpad_Y_pressed():pass\n" +
        "def on_touchpad_Y_unpressed():pass\n" +
        "def on_touchpad_T_pressed():pass\n" +
        "def on_touchpad_T_unpressed():pass\n" +
        "def on_touchpad_H_pressed():pass\n" +
        "def on_touchpad_H_unpressed():pass\n" +
        "def on_touchpad_O_pressed():pass\n" +
        "def on_touchpad_O_unpressed():pass\n" +
        "def on_touchpad_N_pressed():pass\n" +
        "def on_touchpad_N_unpressed():pass\n" +

        "tim12 = Timer(12)\n" +
        
        "def timer12_tick(_):\n" +
        "    global _status_p, _status_y, _status_t, _status_h, _status_o, _status_n\n" +
        "    try:\n" +
        "        touchPad_P.read();pass\n" +
        "    except:\n" +
        "        return\n" +
        "    if touchPad_P.read() < 400:\n" +
        "        if 1 != _status_p:_status_p = 1;on_touchpad_P_pressed()\n" +
        "    else:\n" +
        "        if 0 != _status_p:_status_p = 0;on_touchpad_P_unpressed()\n" +
        "    if touchPad_Y.read() < 400:\n" +
        "        if 1 != _status_y:_status_y = 1;on_touchpad_Y_pressed()\n" +
        "    else:\n" +
        "        if 0 != _status_y:_status_y = 0;on_touchpad_Y_unpressed()\n" +
        "    if touchPad_T.read() < 400:\n" +
        "        if 1 != _status_t:_status_t = 1;on_touchpad_T_pressed()\n" +
        "    else:\n" +
        "        if 0 != _status_t:_status_t = 0;on_touchpad_T_unpressed()\n" +
        "    if touchPad_H.read() < 400:\n" +
        "        if 1 != _status_h:_status_h = 1;on_touchpad_H_pressed()\n" +
        "    else:\n" +
        "        if 0 != _status_h:_status_h = 0;on_touchpad_H_unpressed()\n" +
        "    if touchPad_O.read() < 400:\n" +
        "        if 1 != _status_o:_status_o = 1;on_touchpad_O_pressed()\n" +
        "    else:\n" +
        "        if 0 != _status_o:_status_o = 0;on_touchpad_O_unpressed()\n" +
        "    if touchPad_N.read() < 400:\n" +
        "        if 1 != _status_n:_status_n = 1;on_touchpad_N_pressed()\n" +
        "    else:\n" +
        "        if 0 != _status_n:_status_n = 0;on_touchpad_N_unpressed()\n" +
        
        "tim12.init(period=100, mode=Timer.PERIODIC, callback=timer12_tick)\n"
        var key = block.getFieldValue('TOUCHUKEY');
        var action = block.getFieldValue('ACTION');
        var funcName = Blockly.MPython.variableDB_.getDistinctName(`on_touchpad_${key}_${action}`, Blockly.Variables.NAME_TYPE);
        return `def ${funcName}():\n`;
    }

    Blockly.MPython['event_mpython_set_timer'] = function (block) {
        Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
        var t = block.getFieldValue('TIMES');
        var action = block.getFieldValue('ACTION');
        var period = Blockly.MPython.valueToCode(block, 'PERIOD', Blockly.MPython.ORDER_NONE);
        var funcName = Blockly.MPython.variableDB_.getDistinctName(`timer${t}_tick`, Blockly.Variables.NAME_TYPE);
        Blockly.MPython.definitions_[`var_timer${t}`] = `tim${t} = Timer(${t})`;
        Blockly.MPython.initfuncs_[`attach_${funcName}`] = `tim${t}.init(period=${period}, mode=Timer.${action}, callback=timer${t}_tick)`;
        return `def ${funcName}(_):\n`;
    }

    Blockly.MPython['event_mpython_cleartimer'] = function (block) {
        var count = block.getFieldValue('TIMES');
        return `tim${count}.deinit()\n`;
    }
    
    Blockly.MPython['event_mpython_timer_count'] = function (block) {
        var count = block.getFieldValue('TIMES');
        return [`tim${count}.value()`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['event_mpython_set_event'] = function (block) {
        Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
        var t = block.getFieldValue('THREAD');
        var e = Blockly.MPython.valueToCode(block, 'EVENT', Blockly.MPython.ORDER_NONE);
        Blockly.MPython.definitions_[`var_timer${t}_tick`] =
        `_event_changed_${t} = False\n` +

        `tim${t} = Timer(${t})\n` +

        `def timer${t}_tick(_):\n` +
        `    global _event_changed_${t}\n` +
        `    if (${e}):\n` +
        `        if not _event_changed_${t}: _event_changed_${t} = True; on_custom_event_${t}()\n` +
        `    else: _event_changed_${t} = False\n`
        var funcName = Blockly.MPython.variableDB_.getDistinctName(`on_custom_event_${t}`, Blockly.Variables.NAME_TYPE);
        Blockly.MPython.initfuncs_[`attach_tim${funcName}`] = `tim${t}.init(period=100, mode=Timer.PERIODIC, callback=timer${t}_tick)`;
        return `def ${funcName}():\n`;
    }

    Blockly.MPython['event_mpython_child_thread'] = function (block) {
        Blockly.MPython.definitions_['import_thread'] = 'import _thread';
        var t = block.getFieldValue('THREAD');
        var funcName = Blockly.MPython.variableDB_.getDistinctName(`thread_${t}`, Blockly.Variables.NAME_TYPE);
        Blockly.MPython.initfuncs_[`attach_thread${t}`] = `_thread.start_new_thread(thread_${t}, ())`;
        return `def ${funcName}():\n`;
    }
}
