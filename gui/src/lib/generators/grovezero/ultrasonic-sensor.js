export default (Blockly) => {
  Blockly.C['sensing_g0_ultrasonic_sensor_get_value'] = function (block) {
    Blockly.C.definitions_['define_ultrasonic'] = '#define USE_ULTRASONIC 1';
    var code = 'grovezero->ultrasonic->getvalue()';
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  }
}