const i2cToDefine = i2c => {
    switch (i2c) {
        case '0x02': return 'REGTB0';
        case '0x0A': return 'REGTB1';
        case '0x12': return 'REGTB2';
        case '0x1A': return 'REGTB3';
    }
}

const getEventDefine = (key, opt) => {
    switch (key + opt) {
        case 'Aclick': return 'EVT_TWINBUTTON_A__CLICK';
        case 'Bclick': return 'EVT_TWINBUTTON_B__CLICK';
        case 'ABclick': return 'EVT_TWINBUTTON_AB_CLICK';
        case 'Ahold': return 'EVT_TWINBUTTON_A__LONGCLICK';
        case 'Bhold': return 'EVT_TWINBUTTON_B__LONGCLICK';
        case 'ABhold': return 'EVT_TWINBUTTON_AB_LONGCLICK';
    }
}

const i2cToIndex = i2c => {
    switch (i2c) {
        case '0x02': return '0';
        case '0x0A': return '1';
        case '0x12': return '2';
        case '0x1A': return '3';
    }
}

export default (Blockly) => {

    Blockly.C['event_g0_twin_button_when_click'] = function (block) {
        var i2c = block.getFieldValue('I2C');
        var i2cDefine = i2cToDefine(i2c);
        var i2cIndex = i2cToIndex(i2c);
        var key = block.getFieldValue('KEY');
        var opt = block.getFieldValue('OPT');
        Blockly.C.definitions_[`define_twinbutton_${i2cIndex}`] = `#define USE_TWINBUTTON_${i2cIndex} 1`;
        var callbackName = Blockly.C.variableDB_.getDistinctName('onTwinButtonClick', Blockly.Variables.NAME_TYPE);
        block.callbackCodeHead = `void ${callbackName}(uint8_t *p)\n`
            + `{\n`
            + `if ( p && p[1] == NODE_INS_EVT && p[4] == ${getEventDefine(key, opt)} )`
            + `{\n`;
        block.callbackCodeTail = '}\n' + '}\n\n';

        var code = `_co_registerCB_(${i2cDefine},(uint32_t)${callbackName},0,0);\n`;
        return code;
    };

    Blockly.C['sensing_g0_twin_button_is_pressed'] = function (block) {
        var key = block.getFieldValue('KEY');
        var i2c = block.getFieldValue('I2C');
        var i2cIndex = i2cToIndex(i2c);
        Blockly.C.definitions_[`define_twinbutton_${i2cIndex}`] = `#define USE_TWINBUTTON_${i2cIndex} 1`;
        switch (key) {
            case 'A':
                key = '0';
                break;
            case 'B':
                key = '1';
                break;
            case 'AB':
                key = '2';
                break;
        }
        var code = `grovezero->twinbutton->isPressed(${i2cIndex},${key})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    };


}
