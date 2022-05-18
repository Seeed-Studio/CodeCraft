export default (Blockly) => {
    Blockly.C['event_g0_pir_motion_sensor_detect_someone'] = function (block) {
        Blockly.C.definitions_['define_mechkey'] = '#define USE_PIRMOTION 1';
        let callbackName = Blockly.C.variableDB_.getDistinctName('onPirMotion', Blockly.Variables.NAME_TYPE);
        block.callbackCodeHead = `void ${callbackName}(uint8_t *p)\n` +
            `{\n` +
            `if ( p && p[1] == NODE_INS_EVT && p[4] == EVT_PIRMOTION_CREATURE_DETD )` +
            `{\n`;
        block.callbackCodeTail = '}\n' + '}\n\n';
        let code = `_co_registerCB_(REGPIRMOTION,(uint32_t)${callbackName},0,0);\n`;
        return code;
    }
}

