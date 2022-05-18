export default (Blockly) => {

    Blockly.Arduino['motion_wioterminal_light_sensor'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.setups_['setup_analog_' + pin] = 'pinMode(' + pin + ', 0);';
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

}