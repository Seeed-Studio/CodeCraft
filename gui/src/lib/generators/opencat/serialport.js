export default Blockly => {
    Blockly.ArduinoOpenCat['motion_opencat_serial_baud_rate'] = function (block) {
        var br = block.getFieldValue('BR');
        return `Serial.begin(${br});\n`;
    };
    Blockly.ArduinoOpenCat['motion_opencat_serial_print'] = function (block) {
        var text = Blockly.ArduinoOpenCat.valueToCode(block, 'TEXT', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
        var code = `Serial.println(${text});\n`;
        return code;
    };
    Blockly.ArduinoOpenCat['motion_opencat_serial_is_readable'] = function (block) {
        return ['Serial.available()', Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    Blockly.ArduinoOpenCat['motion_opencat_serial_read'] = function (block) {
        var code = `Serial.readString()`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    Blockly.ArduinoOpenCat['motion_opencat_serial_strtonumber'] = function (block) {
        var text = Blockly.ArduinoOpenCat.valueToCode(block, 'TEXT', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
        return [`${text}.toFloat()`, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
}