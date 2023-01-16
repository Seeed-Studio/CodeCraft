export default Blockly => {

    Blockly.Maixduino['motion_maixduino_oled1'] = function (block) {
        Blockly.Maixduino.definitions_['import_oled'] = 'from  oled_sh1107 import * ';
        var shape = block.getFieldValue('SHAPE');
        return `drawBitmap([${shape}]) \n`;
    }

    Blockly.Maixduino['motion_maixduino_oled2'] = function (block) {
        Blockly.Maixduino.definitions_['import_oled'] = 'from  oled_sh1107 import * ';
        var text = Blockly.Maixduino.valueToCode(block, 'TEXT', Blockly.Maixduino.ORDER_ATOMIC);
        var row = Blockly.Maixduino.valueToCode(block, 'ROW', Blockly.Maixduino.ORDER_ATOMIC);
        var col = Blockly.Maixduino.valueToCode(block, 'COL', Blockly.Maixduino.ORDER_ATOMIC);
        return `oled_display_string(${text},${row},${col}) \n`;
    }
    
}

