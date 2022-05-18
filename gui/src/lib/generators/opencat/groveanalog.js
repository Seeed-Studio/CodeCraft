export default Blockly => {
    Blockly.ArduinoOpenCat['motion_opencat_seeed_temperature'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_analog_' + pin] = 'pinMode(' + pin + ', 2);';
        var code = 'analogRead(' + pin + ')*0.048';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    Blockly.ArduinoOpenCat['motion_opencat_seeed_rotation'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_analog_' + pin] = 'pinMode(' + pin + ', 2);';
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    Blockly.ArduinoOpenCat['motion_opencat_seeed_sound'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    Blockly.ArduinoOpenCat['motion_opencat_seeed_light'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_analog_' + pin] = 'pinMode(' + pin + ', 0);';
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    Blockly.ArduinoOpenCat['motion_opencat_seeed_quality'] = function (block) {
        var pin = block.getFieldValue('PIN');
        
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = `airqualitysensor.init(${pin});`;

        Blockly.ArduinoOpenCat.definitions_['include_quality'] = '#include "AirQuality.h"';
        Blockly.ArduinoOpenCat.definitions_['var_quality'] = `AirQuality airqualitysensor;`;

        Blockly.ArduinoOpenCat.define_fun['quality'] =
            'ISR(TIMER2_OVF_vect){\n' +
            '    if(airqualitysensor.counter==122){\n' +
            '        airqualitysensor.last_vol=airqualitysensor.first_vol;\n' +
            '        airqualitysensor.first_vol=analogRead(A0);\n' +
            '        airqualitysensor.counter=0;\n' +
            '        airqualitysensor.timer_index=1;\n' +
            '        PORTB=PORTB^0x20;\n}\n' +
            '    else{\n' +
            '        airqualitysensor.counter++;\n' +
            '    }\n' +
            '}\n' +

            'int getAirQualityValue(){\n' +
            '    int current_quality=airqualitysensor.slope();\n' +
            '    while (current_quality >= 0)\n' +
            '        return current_quality;\n' +
            '}\n' +
            '';

        var code = 'getAirQualityValue()';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    Blockly.ArduinoOpenCat['motion_opencat_seeed_slide_pot'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_analog_' + pin] = 'pinMode(' + pin + ', 0);';
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
}