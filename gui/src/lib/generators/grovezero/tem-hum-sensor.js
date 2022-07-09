export default (Blockly) => {
  // 温度值  Tempreture
  Blockly.C['sensing_g0_temhum_sensor_get_tem_value'] = function (block) {
    Blockly.C.definitions_['define_temperaturehumidity'] = '#define USE_TEMPERATUREHUMIDITY 1';
    let unit = block.getFieldValue('UNIT');
    switch (unit) {
      case 'C':
        unit = '0';
        break;
      case 'F':
        unit = '1';
        break;
    }
    var code = `grovezero->temperaturehumidity->gettempvalue(${unit})`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  }

  // 湿度值  Humidy
  Blockly.C['sensing_g0_temhum_sensor_get_hum_value'] = function (block) {
    Blockly.C.definitions_['define_temperaturehumidity'] = '#define USE_TEMPERATUREHUMIDITY 1';
    var code = `grovezero->temperaturehumidity->gethumidvalue()`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  }
}

