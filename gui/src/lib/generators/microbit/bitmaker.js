const hexToColorArg = (colorHex) => {
    colorHex = colorHex.replace(/"/g, "");
    var r = '0x' + colorHex.slice(1, 3);
    var g = '0x' + colorHex.slice(3, 5);
    var b = '0x' + colorHex.slice(5, 7);
    return { r, g, b }
}

export default Blockly => {
    Blockly.Microbit['sensing_microbit_bitmaker_set_led_color'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var NO = block.getFieldValue('NO');
        var color = Blockly.Microbit.valueToCode(block, 'COLOR', Blockly.Microbit.ORDER_ATOMIC);
        var rgb = hexToColorArg(color)
        return `BitMaker_Set_RGB(${NO},${rgb.r},${rgb.g},${rgb.b})\n`
    }
}