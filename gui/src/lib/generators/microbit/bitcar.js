export default Blockly => {
    Blockly.Microbit['sensing_microbit_bitcar_move'] = function (block) {
        Blockly.Microbit.importFile('bitcar_move.py');
        var left = Blockly.Microbit.valueToCode(block, 'LEFT', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var right = Blockly.Microbit.valueToCode(block, 'RIGHT', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `move(${left},${right})\n`
    }

    Blockly.Microbit['sensing_microbit_bitcar_stop'] = function (block) {
        Blockly.Microbit.importFile('bitcar_move.py');
        return `stop()\n`
    }

    Blockly.Microbit['sensing_microbit_bitcar_standup_still'] = function (block) {
        Blockly.Microbit.importFile('bitcar_move.py');
        var speed = Blockly.Microbit.valueToCode(block, 'SPEED', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var charge = Blockly.Microbit.valueToCode(block, 'CHARGE', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `standup_still(${speed},${charge})\n`
    }

    Blockly.Microbit['sensing_microbit_bitcar_line_under_sensor'] = function (block) {
        Blockly.Microbit.importFile('bitcar_linesensor.py');
        var key = block.getFieldValue('KEY');
        return [`linesensor(${key})`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_bitcar_line_follow_at_speed'] = function (block) {
        Blockly.Microbit.importFile('bitcar_move.py');
        Blockly.Microbit.importFile('bitcar_linesensor.py');
        Blockly.Microbit.importFile('bitcar_find_follow.py');
        var speed = Blockly.Microbit.valueToCode(block, 'SPEED', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `linefollow(${speed})\n`
    }

}