/**
 * shapeToUint2：转换成嵌入式所需的图形数据格式
 * 001000       00000
 * 011100       00100
 * 001110 =>    01110
 * 011100       11111
 * 001000       01010
 *              00000
 * @param {String} shape 
 */
const shapeToUint2 = (shape) => {
    var shapeData = '';
    for (let i = 0; i < 6; i++) {
        let row = '';
        for (let j = 0; j < 5; j++) {
            row = shape[j * 6 + i] + row;
        }
        shapeData = row + shapeData;
    }
    return '0b' + shapeData;
}


export default (Blockly) => {

    Blockly.C['looks_g0_ledmatrix_show_shape'] = function (block) {
        Blockly.C.definitions_['define_ledmatrix'] = '#define USE_LEDMATRIX 1';
        var shape = block.getFieldValue('SHAPE');
        var shapeUint2 = shapeToUint2(shape);
        var code = `grovezero->ledmatrix->setShape(${shapeUint2},0);\n`;
        return code;
    };

    Blockly.C['looks_g0_ledmatrix_show_string'] = function (block) {
        Blockly.C.definitions_['define_ledmatrix'] = '#define USE_LEDMATRIX 1';
        var text = Blockly.C.valueToCode(block, 'STRING', Blockly.C.ORDER_NONE);
        var code = `grovezero->ledmatrix->scrollText(0,${text});\n`;
        return code;
    };

    Blockly.C['looks_g0_ledmatrix_xy_set_on'] = function (block) {
        Blockly.C.definitions_['define_ledmatrix'] = '#define USE_LEDMATRIX 1';
        var x = Blockly.C.valueToCode(block, 'X', Blockly.C.ORDER_NONE);
        var y = Blockly.C.valueToCode(block, 'Y', Blockly.C.ORDER_NONE);
        var code = `grovezero->ledmatrix->turnOn(${x},${y});\n`;
        return code;
    };

    Blockly.C['looks_g0_ledmatrix_xy_set_off'] = function (block) {
        Blockly.C.definitions_['define_ledmatrix'] = '#define USE_LEDMATRIX 1';
        var x = Blockly.C.valueToCode(block, 'X', Blockly.C.ORDER_NONE);
        var y = Blockly.C.valueToCode(block, 'Y', Blockly.C.ORDER_NONE);
        var code = `grovezero->ledmatrix->turnOff(${x},${y});\n`;
        return code;
    };

    Blockly.C['looks_g0_ledmatrix_clean'] = function (block) {
        Blockly.C.definitions_['define_ledmatrix'] = '#define USE_LEDMATRIX 1';
        var code = 'grovezero->ledmatrix->clean();\n';
        return code;
    };

    Blockly.C['sensing_g0_ledmatrix_xy_is_on'] = function (block) {
        Blockly.C.definitions_['define_ledmatrix'] = '#define USE_LEDMATRIX 1';
        var x = Blockly.C.valueToCode(block, 'X', Blockly.C.ORDER_NONE);
        var y = Blockly.C.valueToCode(block, 'Y', Blockly.C.ORDER_NONE);
        var code = `grovezero->ledmatrix->checkOnOff(${x},${y})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    };

}