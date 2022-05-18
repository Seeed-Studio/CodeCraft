const evtDefine = (numopt) => {
    switch (numopt) {
        case '1':
            return 'EVT_TOUCHPAD_PAD0_CLICK';
        case '2':
            return 'EVT_TOUCHPAD_PAD1_CLICK';
        case '3':
            return 'EVT_TOUCHPAD_PAD2_CLICK';
        case '4':
            return 'EVT_TOUCHPAD_PAD3_CLICK';
        default:
            return 'EVT_TOUCHPAD_PAD0_CLICK';
    }
}

/**
 * i2cToIndex：i2c地址 -> index
 * @param {String} i2c 
 */
const i2cToIndex = i2c => {
    switch (i2c) {
        case '0x34': return '0';
        case '0x35': return '1';
        case '0x36': return '2';
        case '0x37': return '3';
    }
}

export default (Blockly) => {

    Blockly.C['event_g0_touchpad_when_click'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        let i2cIndex = i2cToIndex(i2c);
        let num = block.getFieldValue('NUM_OPT');
        Blockly.C.definitions_[`define_touchpad_${i2cIndex}`] = `#define USE_TOUCHPAD_${i2cIndex} 1`;
        let i2cAddr = `REGTP${i2cIndex}`;
        let callbackName = Blockly.C.variableDB_.getDistinctName('onTouchpad', Blockly.Variables.NAME_TYPE);
        block.callbackCodeHead = `void ${callbackName}(uint8_t *p)\n` +
            `{\n` +
            `if ( p && p[1] == NODE_INS_EVT && p[4] == ${evtDefine(num)} )` +
            `{\n`;
        block.callbackCodeTail = '}\n' + '}\n\n';
        let code = `_co_registerCB_(${i2cAddr},(uint32_t)${callbackName},0,0);\n`;
        return code;
    }

    Blockly.C['sensing_g0_touchpad_is_pressed'] = function (block) {
        var i2c = block.getFieldValue('I2C');
        var i2cIndex = i2cToIndex(i2c);
        Blockly.C.definitions_[`define_touchpad_${i2cIndex}`] = `#define USE_TOUCHPAD_${i2cIndex} 1`;

        let num = block.getFieldValue('NUM_OPT');
        let _val;
        switch (num) {
            case '1': _val = '1'; break;
            case '2': _val = '2'; break;
            case '3': _val = '4'; break;
            case '4': _val = '8'; break;
            default: break;
        }
        let code = `grovezero->touchpad->isTouched(${i2cIndex}, ${_val})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }
}
