export default Blockly => {

    Blockly.Maixduino['motion_maixduino_figure_output'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        var pin = block.getFieldValue('PIN');
        var dropdownStat = block.getFieldValue('STAT');
        return `set_gpio_output(${pin}, ${dropdownStat})\n`;
    }

    Blockly.Maixduino['motion_maixduino_analog_output'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        var pin = block.getFieldValue('PIN');
        var num = Blockly.Maixduino.valueToCode(block, 'NUM', Blockly.Maixduino.ORDER_ATOMIC);
        return `MaixAnalogWrite(${pin}, ${num})\n`;
    }

}