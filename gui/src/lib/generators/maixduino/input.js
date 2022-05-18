
export default Blockly => {

    Blockly.Maixduino['motion_maixduino_figure_input'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        var pin = block.getFieldValue('PIN');
        return [`get_gpio_input(${pin})`, Blockly.Maixduino.ORDER_ATOMIC];
    }
    
    Blockly.Maixduino['motion_maixduino_input_systemtime'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        var unit = block.getFieldValue('UNIT');
        return [`get_system_time_tick(${unit})`, Blockly.Maixduino.ORDER_ATOMIC];
    }
    
}