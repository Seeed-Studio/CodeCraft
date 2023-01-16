export default Blockly => {
    Blockly.Microbit['motion_microbit_vision_sensor1'] = function (block) {
        Blockly.Microbit.importFile('detect_ball.py');
        Blockly.Microbit.importFile('i2c.py');
        Blockly.Microbit.initfuncs_['init_vision'] = 'init_vision()'
        var ballType = block.getFieldValue('OPT');
        var code = `isBall(${ballType})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Microbit['motion_microbit_vision_sensor2'] = function (block) {
        Blockly.Microbit.importFile('detect_card.py');
        Blockly.Microbit.importFile('i2c.py');
        Blockly.Microbit.initfuncs_['init_vision'] = 'init_vision()'
        var opt = block.getFieldValue('OPT');
        var code = `isCard(0x07, ${opt})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Microbit['motion_microbit_vision_sensor3'] = function (block) {
        Blockly.Microbit.importFile('detect_card.py');
        Blockly.Microbit.importFile('i2c.py');
        Blockly.Microbit.initfuncs_['init_vision'] = 'init_vision()'
        var opt = block.getFieldValue('OPT');
        var code = `isCard(0x08, ${opt})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Microbit['motion_microbit_vision_sensor4'] = function (block) {
        Blockly.Microbit.importFile('detect_card.py');
        Blockly.Microbit.importFile('i2c.py');
        Blockly.Microbit.initfuncs_['init_vision'] = 'init_vision()'
        var opt = block.getFieldValue('OPT');
        var code = `isCard(0x06, ${opt})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Microbit['motion_microbit_vision_sensor5'] = function (block) {
        Blockly.Microbit.importFile('detect_body.py');
        Blockly.Microbit.importFile('i2c.py');
        Blockly.Microbit.initfuncs_['init_vision'] = 'init_vision()'
        var code = 'isBody()';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Microbit['motion_microbit_vision_sensor6'] = function (block) {
        Blockly.Microbit.importFile('detect_color.py');
        Blockly.Microbit.importFile('i2c.py');
        Blockly.Microbit.initfuncs_['init_vision'] = 'init_vision()'
        var color = block.getFieldValue('COLOR');
        var code = `isColor(${color})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Microbit['motion_microbit_vision_sensor7'] = function (block) {
        Blockly.Microbit.importFile('get_color_value.py');
        Blockly.Microbit.importFile('i2c.py');
        Blockly.Microbit.initfuncs_['init_vision'] = 'init_vision()'
        var code = `getColor()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Microbit['motion_microbit_vision_sensor8'] = function (block) {
        Blockly.Microbit.importFile('get_ball_xy.py');
        Blockly.Microbit.importFile('i2c.py');
        Blockly.Microbit.initfuncs_['init_vision'] = 'init_vision()'
        var ballType = block.getFieldValue('OPT');
        var code = `getBallValue(${ballType})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
}