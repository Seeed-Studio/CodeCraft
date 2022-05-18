export default Blockly => {

    Blockly.Microbit['sensing_microbit_bitplayer_key_is_pressed'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_math'] = 'import math';
        Blockly.Microbit.importFile('BitPlayer.py');
        var key = block.getFieldValue('KEY');
        return [`KeyPressed(${key})`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_bitplayer_joystick'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_math'] = 'import math';
        Blockly.Microbit.importFile('BitPlayer.py');
        var key = block.getFieldValue('KEY');
        return [`OnJoystick(${key})`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_bitplayer_vibration'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_math'] = 'import math';
        Blockly.Microbit.importFile('BitPlayer.py');
        var key = block.getFieldValue('KEY');
        return `SetMotor(${key})\n`
    }

}