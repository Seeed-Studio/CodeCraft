export default (Blockly) => {
    Blockly.C['sensing_g0_light_sensor_get_value'] = function (block) {
        Blockly.C.definitions_['define_lightsensor'] = '#define USE_LIGHTSENSOR 1';
        var code = 'grovezero->lightsensor->getvalue()';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }
}
