export default (Blockly) => {
    Blockly.C['sensing_g0_temperature_sensor_get_value'] = function (block) {
        var unit = block.getFieldValue('UNIT');
        switch (unit) {
            case 'C':
                unit = '0';
                break;
            case 'F':
                unit = '1';
                break;
        }
        var code = `grovezero->temperaturesensor->getvalue(${unit})`;
        Blockly.C.definitions_['define_tempsensor'] = '#define USE_TEMPERATURESENSOR 1';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

}