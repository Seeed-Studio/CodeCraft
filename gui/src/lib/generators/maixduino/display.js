export default Blockly => {

    Blockly.Maixduino['looks_maixduino_camera_set_screen'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var rotation = block.getFieldValue('SCREEN_DIRECTION');
        return `lcd.rotation(${rotation})\n`;
    }

    Blockly.Maixduino['looks_maixduino_dispalystr_atrow'] = function (block) {
        Blockly.Maixduino.isClearLed = true;
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var str = Blockly.Maixduino.valueToCode(block, 'STRING', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var row = block.getFieldValue('ROW');
        return `lcd_display_string_row(${str}, ${row})\n`;
    }

    Blockly.Maixduino['looks_maixduino_dispalystr_atposition'] = function (block) {
        Blockly.Maixduino.isClearLed = true;
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var str = Blockly.Maixduino.valueToCode(block, 'STRING', Blockly.Maixduino.ORDER_ATOMIC) || 'hello world';
        var x = Blockly.Maixduino.valueToCode(block, 'X', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var y = Blockly.Maixduino.valueToCode(block, 'Y', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `lcd_string(${str}, ${x}, ${y})\n`;
    }

    Blockly.Maixduino['looks_maixduino_display_img'] = function (block) {
        Blockly.Maixduino.isClearLed = true;
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var img_path = Blockly.Maixduino.valueToCode(block, 'IMG_PATH', Blockly.Maixduino.ORDER_ATOMIC) || '/sd/img.jpg';
        return `load_img(${img_path})\n`;
    }

    Blockly.Maixduino['looks_maixduino_draw_circle'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var x = Blockly.Maixduino.valueToCode(block, 'XCOORD', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var y = Blockly.Maixduino.valueToCode(block, 'YCOORD', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var r = Blockly.Maixduino.valueToCode(block, 'RVALUE', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `draw_circle(${x}, ${y}, ${r})\n`;
    }

    Blockly.Maixduino['looks_maixduino_draw_rectangle_wh'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var w = Blockly.Maixduino.valueToCode(block, 'W', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var h = Blockly.Maixduino.valueToCode(block, 'H', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var x = Blockly.Maixduino.valueToCode(block, 'X', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var y = Blockly.Maixduino.valueToCode(block, 'Y', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `draw_rectangle_wh(${w}, ${h}, ${x}, ${y})\n`;
    }

    Blockly.Maixduino['looks_maixduino_draw_rectangle'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var x1 = Blockly.Maixduino.valueToCode(block, 'XMIN', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var y1 = Blockly.Maixduino.valueToCode(block, 'YMIN', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var x2 = Blockly.Maixduino.valueToCode(block, 'XMAX', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var y2 = Blockly.Maixduino.valueToCode(block, 'YMAX', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `draw_rectangle_minmax(${x1}, ${y1}, ${x2}, ${y2})\n`;
    }

    Blockly.Maixduino['looks_maixduino_screen_clear'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        return `lcd.clear()\n`;
    }

}