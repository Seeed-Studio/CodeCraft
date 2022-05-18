export default (Blockly) => {
    Blockly.C['sensing_g0_sound_sensor_get_value'] = function (block) {
        Blockly.C.definitions_['define_soundsensor'] = '#define USE_SOUNDSENSOR 1';
        var code = 'grovezero->soundsensor->getvalue()';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }
}
