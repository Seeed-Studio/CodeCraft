const i2cToDefine = (i2c) => {
    switch (i2c) {
        case '0x10':
            return '0';
        case '0x18':
            return '1';
        case '0x30':
            return '2';
        case '0x38':
            return '3';
    }
};

const getEventDefine = (opt) => {
    switch (opt) {
        case 'clockwise':
            return 'EVT_KNOB_CLOCK';
        case 'anticlockwise':
            return 'EVT_KNOB_ANTICLOCK';
        case 'click':
            return 'EVT_KNOB_CLICK';
    }
};



export default (Blockly) => {
    Blockly.C['event_g0_knob_when_change'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        var opt = block.getFieldValue('CONTROL_OPT');
        i2c = i2cToDefine(i2c);
        Blockly.C.definitions_[`define_knob${i2c}`] = `#define USE_KNOB_${i2c} 1`;

        var callbackName = Blockly.C.variableDB_.getDistinctName('onKnob', Blockly.Variables.NAME_TYPE);
        block.callbackCodeHead = `void ${callbackName}(uint8_t *p)\n` +
            `{\n` +
            `if ( p && p[1] == NODE_INS_EVT && p[4] == ${getEventDefine(opt)} )` +
            `{\n`;
        block.callbackCodeTail = '}\n' + '}\n\n';
        var code = `_co_registerCB_(REGKNOB${i2c},(uint32_t)${callbackName},0,0);\n`;
        return code;
    }
}

