/**
 * 矩阵转 image
 * Matrix to image
 * @param {*} shape 
 */
const toImage = (shape) => {
    let result = [];
    let temp = '';
    let shapeArr = shape.split('');
    for (let i = 0; i < shapeArr.length; i++) {
        const element = shapeArr[i];
        temp += element;
        if ((i + 1) % 5 === 0) {
            result.push(temp);
            temp = '';
        }
    }
    return result.join(':');
}

export default Blockly => {

    Blockly.Microbit['looks_microbit_showimage'] = function (block) {
        var shape = block.getFieldValue('SHAPE');
        var imagedata = toImage(shape);
        return `display.show(Image("${imagedata}") * 9)\n`;
    }

    Blockly.Microbit['looks_microbit_showimage_for'] = function (block) {
        var shape = block.getFieldValue('SHAPE');
        var secs = Blockly.Microbit.valueToCode(block, 'SECS', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var imagedata = toImage(shape);
        return `display.show(Image("${imagedata}") * 9, wait=True, loop=False, clear=True, delay=int(${secs})*1000)\n`;
    }

    Blockly.Microbit['looks_microbit_showmirroringimage'] = function (block) {
        var shape = block.getFieldValue('SHAPE');
        var imagedata = toImage(shape);
        return `display.show(Image("${imagedata}") * 9)\n`;
    }

    Blockly.Microbit['looks_microbit_setimage'] = function (block) {
        var shape = block.getFieldValue('SHAPE');
        var position = block.getFieldValue('POSITION');
        var step = Blockly.Microbit.valueToCode(block, 'VALUE', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var imagedata = toImage(shape);
        return `display.show((Image("${imagedata}") * 9).shift_${position}(int(${step})))\n`;
    }

    Blockly.Microbit['looks_microbit_showtext'] = function (block) {
        var text = Blockly.Microbit.valueToCode(block, 'TEXT', Blockly.Microbit.ORDER_ATOMIC) || '';
        return `display.scroll(str(${text}), wait=False, loop=False)\n`;
    }

    Blockly.Microbit['looks_microbit_showtext_until'] = function (block) {
        var text = Blockly.Microbit.valueToCode(block, 'TEXT', Blockly.Microbit.ORDER_ATOMIC) || '';
        return `display.scroll(str(${text}), wait=True, loop=False)\n`;
    }

    Blockly.Microbit['looks_microbit_close_matrix'] = function (block) {
        return `display.clear()\n`;
    }

    Blockly.Microbit['looks_microbit_lightuporoff'] = function (block) {
        var action = block.getFieldValue('ACTION');
        var x = Blockly.Microbit.valueToCode(block, 'X', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var y = Blockly.Microbit.valueToCode(block, 'Y', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `display.set_pixel(int(${x}), int(${y}), ${action})\n`;
    }

    Blockly.Microbit['looks_microbit_lightonbrightness'] = function (block) {
        var action = block.getFieldValue('BRIGHTNESS');
        var x = Blockly.Microbit.valueToCode(block, 'X', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var y = Blockly.Microbit.valueToCode(block, 'Y', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `display.set_pixel(int(${x}), int(${y}), ${action})\n`;
    }

    Blockly.Microbit['looks_microbit_lightbrightness'] = function (block) {
        var x = Blockly.Microbit.valueToCode(block, 'X', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var y = Blockly.Microbit.valueToCode(block, 'Y', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return [`display.get_pixel(int(${x}), int(${y}))`, Blockly.Microbit.ORDER_ATOMIC];
    }

}