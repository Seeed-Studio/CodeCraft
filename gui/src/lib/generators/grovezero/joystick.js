// const evtDefine = (numopt) => {
//     switch (numopt) {
//         case '1':
//             return 'EVT_TOUCHPAD_PAD0_CLICK';
//         case '2':
//             return 'EVT_TOUCHPAD_PAD1_CLICK';
//         case '3':
//             return 'EVT_TOUCHPAD_PAD2_CLICK';
//         case '4':
//             return 'EVT_TOUCHPAD_PAD3_CLICK';
//         default:
//             return 'EVT_TOUCHPAD_PAD0_CLICK';
//     }
// }

/**
 * i2cToIndex：i2c地址 -> index
 * @param {String} i2c 
 */
const i2cToIndex = i2c => {
    switch (i2c) {
        case '0x31': return '0';
        case '0x3a': return '1';
        case '0x3b': return '2';
        case '0x3c': return '3';
    }
}

export default (Blockly) => {

    Blockly.C['sensing_g0_joystick_is_pushed_to'] = function (block) {
        var i2c = block.getFieldValue('I2C');
        var i2cIndex = i2cToIndex(i2c);
        Blockly.C.definitions_[`define_joystick_${i2cIndex}`] = `#define USE_ROCKER_${i2cIndex} 1`;

        let direct = block.getFieldValue('DIRECT');
        let code = `grovezero->rocker->rockerlocation(${i2cIndex}, ${direct})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

    Blockly.C['sensing_g0_joystick_get_position'] = function (block) {
        var i2c = block.getFieldValue('I2C');
        var i2cIndex = i2cToIndex(i2c);
        Blockly.C.definitions_[`define_joystick_${i2cIndex}`] = `#define USE_ROCKER_${i2cIndex} 1`;

        let direct = block.getFieldValue('DIRECT');
        let _val;
        switch (direct) {
            case 'x': _val = '0'; break;
            case 'y': _val = '1'; break;
            default: break;
        }
        let code = `grovezero->rocker->getvalue(${i2cIndex}, ${_val})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }
    
}
