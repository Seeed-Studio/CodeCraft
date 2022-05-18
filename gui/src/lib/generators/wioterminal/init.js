export default (Blockly) => {

    Blockly.Arduino['motion_wioterminal_setup_loop'] = Blockly.Arduino['motion_arduino_setup_loop'];


    Blockly.Arduino['edgeimpulse_startReadData'] = function (block) {

        Blockly.Arduino.setups_['setup_edgeimpulse_serial_begin'] = '  Serial.begin(9600);\n';

        let frequency = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_NONE) || 1;
        let sensor = Blockly.Arduino.valueToCode(block, 'SENSOR', Blockly.Arduino.ORDER_ATOMIC);

        let code = `delay(${1000/frequency});\n`
        code += `Serial.println(${sensor});\n`;

        return code;
    }

    Blockly.Arduino['edgeimpulse_stopReadData'] = function (block) {

        return ``;
    }


    
}