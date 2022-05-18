export default Blockly => {
    Blockly.Microbit['sensing_microbit_grove_one_servo_set_angle'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.importFile('GroveOne.py');
        var pin = block.getFieldValue('PIN');
        var angle = Blockly.Microbit.valueToCode(block, 'ANGLE', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `servo(${pin},${angle})\n`
    }

    Blockly.Microbit['sensing_microbit_grove_one_mini_fan_set_speed'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.importFile('GroveOne.py');
        var pin = block.getFieldValue('PIN');
        var speed = Blockly.Microbit.valueToCode(block, 'SPEED', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `minifan(${pin},${speed})\n`
    }

    Blockly.Microbit['sensing_microbit_grove_one_ultrasonic_get_distance'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.importFile('GroveOne.py');
        var pin = block.getFieldValue('PIN');
        var type = block.getFieldValue('TYPE');
        return [`measureInCentimeters(${pin},${type})`, Blockly.Microbit.ORDER_ATOMIC];
    }
}