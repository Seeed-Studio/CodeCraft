const hexToColorArg = (colorHex) => {
    colorHex = colorHex.replace(/"/g, "");
    var r = '0x' + colorHex.slice(1, 3);
    var g = '0x' + colorHex.slice(3, 5);
    var b = '0x' + colorHex.slice(5, 7);
    return { r, g, b }
}

export default Blockly => {

    Blockly.Microbit['sensing_microbit_bitwear_set_led_color'] = function (block) {
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitWear.py');
        var color = Blockly.Microbit.valueToCode(block, 'COLOR', Blockly.Microbit.ORDER_ATOMIC);
        var rgb = hexToColorArg(color)
        return `BitWear_Set_RGB(${rgb.r},${rgb.g},${rgb.b})\n`
    }

    Blockly.Microbit['sensing_microbit_bitwear_vibration'] = function (block) {
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitWear.py');
        var opt = block.getFieldValue('OPT');
        return `SetMotor(${opt})\n`
    }
}