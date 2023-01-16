export default Blockly => {

    Blockly.MPython['looks_mpython_oled'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var arg = block.getFieldValue('DISPLAY');
        return `oled_display('${arg}')\n`;
    }

    Blockly.MPython['looks_mpython_oled_line_text'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var line = block.getFieldValue('LINE');
        var string = Blockly.MPython.valueToCode(block, 'TEXT', Blockly.MPython.ORDER_ATOMIC) || '';
        var text_mode = block.getFieldValue('MODE');
        return `oled_show_string_mode(${line}, ${string}, ${text_mode})\n`;
    }

    Blockly.MPython['looks_mpython_oled_clear_line'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var line = block.getFieldValue('LINE');
        return `oled_clear_line(${line})\n`;
    }

    Blockly.MPython['looks_mpython_display_text'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var string = Blockly.MPython.valueToCode(block, 'TEXT', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
        var text_mode = block.getFieldValue('MODE');
        return `oled_show_text('${string}', ${x}, ${y}, ${text_mode})\n`;
    }

    Blockly.MPython['looks_mpython_trace_point'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var mode = block.getFieldValue('MODE');
        return `draw_a_point(${x},${y}, ${mode})\n`;
    }

    Blockly.MPython['looks_mpython_progress'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var w = Blockly.MPython.valueToCode(block, 'W', Blockly.MPython.ORDER_ATOMIC) || 0;
        var h = Blockly.MPython.valueToCode(block, 'H', Blockly.MPython.ORDER_ATOMIC) || 0;
        var percent = Blockly.MPython.valueToCode(block, 'PROGRESS', Blockly.MPython.ORDER_ATOMIC);
        return `progress_bar(${x},${y},${w},${h},${percent})\n`;
    }

    Blockly.MPython['looks_mpython_column_strip'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var w = Blockly.MPython.valueToCode(block, 'W', Blockly.MPython.ORDER_ATOMIC) || 0;
        var h = Blockly.MPython.valueToCode(block, 'H', Blockly.MPython.ORDER_ATOMIC) || 0;
        var percent = Blockly.MPython.valueToCode(block, 'PROGRESS', Blockly.MPython.ORDER_ATOMIC) || 0;
        var direction = block.getFieldValue('DIRECTION');
        return `column_bar(${direction}, ${x}, ${y}, ${w}, ${h}, ${percent})\n`;
    }

    Blockly.MPython['looks_mpython_draw_line'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x1 = Blockly.MPython.valueToCode(block, 'X1', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y1 = Blockly.MPython.valueToCode(block, 'Y1', Blockly.MPython.ORDER_ATOMIC) || 0;
        var x2 = Blockly.MPython.valueToCode(block, 'X2', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y2 = Blockly.MPython.valueToCode(block, 'Y2', Blockly.MPython.ORDER_ATOMIC) || 0;
        var status = block.getFieldValue('ACTION');
        return `draw_line_two_point(${status}, ${x1}, ${y1}, ${x2}, ${y2})\n`;
    }

    Blockly.MPython['looks_mpython_draw_frame'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var w = Blockly.MPython.valueToCode(block, 'W', Blockly.MPython.ORDER_ATOMIC) || 0;
        var h = Blockly.MPython.valueToCode(block, 'H', Blockly.MPython.ORDER_ATOMIC) || 0;
        var status = block.getFieldValue('ACTION');
        return `draw_border(${status}, ${x}, ${y}, ${w}, ${h})\n`;
    }

    Blockly.MPython['looks_mpython_draw_arc_border'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var w = Blockly.MPython.valueToCode(block, 'W', Blockly.MPython.ORDER_ATOMIC) || 0;
        var h = Blockly.MPython.valueToCode(block, 'H', Blockly.MPython.ORDER_ATOMIC) || 0;
        var r = Blockly.MPython.valueToCode(block, 'H', Blockly.MPython.ORDER_ATOMIC) || 0;
        var status = block.getFieldValue('ACTION');
        return `draw_arc_border(${status}, ${x}, ${y}, ${w}, ${h}, ${r})\n`;
    }

    Blockly.MPython['looks_mpython_draw_rect'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var w = Blockly.MPython.valueToCode(block, 'W', Blockly.MPython.ORDER_ATOMIC) || 0;
        var h = Blockly.MPython.valueToCode(block, 'H', Blockly.MPython.ORDER_ATOMIC) || 0;
        var status = block.getFieldValue('ACTION');
        return `draw_rectangle(${x}, ${y}, ${w}, ${h}, ${status})\n`;
    }

    Blockly.MPython['looks_mpython_draw_circle'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var r = Blockly.MPython.valueToCode(block, 'R', Blockly.MPython.ORDER_ATOMIC) || 0;
        var status = block.getFieldValue('ACTION');
        var variety = block.getFieldValue('SHAPE');
        return `draw_circle_type(${status}, ${variety}, ${x}, ${y}, ${r})\n`;
    }

    Blockly.MPython['looks_mpython_draw_triangle'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x1 = Blockly.MPython.valueToCode(block, 'X1', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y1 = Blockly.MPython.valueToCode(block, 'Y1', Blockly.MPython.ORDER_ATOMIC) || 0;
        var x2 = Blockly.MPython.valueToCode(block, 'X2', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y2 = Blockly.MPython.valueToCode(block, 'Y2', Blockly.MPython.ORDER_ATOMIC) || 0;
        var x3 = Blockly.MPython.valueToCode(block, 'X3', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y3 = Blockly.MPython.valueToCode(block, 'Y3', Blockly.MPython.ORDER_ATOMIC) || 0;
        var status = block.getFieldValue('ACTION');
        var variety = block.getFieldValue('SHAPE');
        return `draw_triangle_type(${status}, ${variety}, ${x1}, ${y1}, ${x2}, ${y2},${x3}, ${y3},)\n`;
    }

    Blockly.MPython['looks_mpython_draw_display_picture'] = function (block) {
        Blockly.MPython.definitions_['import_show'] = 'from show import * ';
        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var image_name = block.getFieldValue('SHAPE');
        return `display_image('face/${image_name}', ${x}, ${y})\n`;
    }

    Blockly.MPython['looks_mpython_draw_display'] = function (block) {
        Blockly.MPython.definitions_['import_framebuf'] = 'import framebuf';
        Blockly.MPython.definitions_['var_displayfontfunc'] =
        "def display_font(_font, _str, _x, _y, _wrap, _z=0):\n" +
        "    _start = _x\n" +
        "    for _c in _str:\n" +
        "        _d = _font.get_ch(_c)\n" +
        "        if _wrap and _x > 128 - _d[2]: _x = _start; _y += _d[1]\n" +
        "        if _c == '1' and _z > 0: oled.fill_rect(_x, _y, _d[2], _d[1], 0)\n" +
        "        oled.blit(framebuf.FrameBuffer(bytearray(_d[0]), _d[2], _d[1],\n" +
        "        framebuf.MONO_HLSB), (_x+int(_d[2]/_z)) if _c=='1' and _z>0 else _x, _y)\n" +
        "        _x += _d[2]\n"
        

        var x = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC) || 0;
        var y = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC) || 0;
        var string = Blockly.MPython.valueToCode(block, 'DISPLAY', Blockly.MPython.ORDER_ATOMIC) || '';
        var pixel = block.getFieldValue('TUBE');
        var status = block.getFieldValue('ACTION');
        Blockly.MPython.definitions_[`import_${pixel}`] = `import font.${pixel}`;
        return `display_font(font.${pixel}, ${string}, ${x}, ${y}, ${status},2)\noled.show()\n`;
    }

}

