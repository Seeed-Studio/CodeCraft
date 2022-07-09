/* MECH KEY */
// #define	REGMK0							0xFF0F
// #define	REGMK1							0xFF1F
// #define	REGMK2							0xFF2F
// #define	REGMK3							0xFF3F

/* MECH KEY */
// #define  EVT_MECHKEY_CLICK       0x11
// #define  EVT_MECHKEY_LONGCLICK   0x12

/**
 * 事件宏定义
 * Event define
 * @param {*} motion 
 */
const evtDefine = (motion) => {
    switch (motion) {
        case 'click':
            return 'EVT_MECHKEY_CLICK';
        case 'hold':
            return 'EVT_MECHKEY_LONGCLICK';
        default:
            return 'EVT_MECHKEY_CLICK';
    }
}

export default (Blockly) => {
    Blockly.C['event_g0_mech_key_when_click'] = function (block) {

        let i2c = block.getFieldValue('I2C');
        let i2cIndex = i2c.substring(2, 3);

        Blockly.C.definitions_[`define_mechkey${i2cIndex}`] = `#define  USE_MECHKEY_${i2cIndex} 1`;

        let i2cAddr = `REGMK${i2cIndex}`;
        let motion = block.getFieldValue('OPT');

        let callbackName = Blockly.C.variableDB_.getDistinctName('onMechkey', Blockly.Variables.NAME_TYPE);
        block.callbackCodeHead = `void ${callbackName}(uint8_t *p)\n` +
            `{\n` +
            `if ( p && p[1] == NODE_INS_EVT && p[4] == ${evtDefine(motion)} )` +
            `{\n`;
        block.callbackCodeTail = '}\n' + '}\n\n';

        let code = `_co_registerCB_(${i2cAddr},(uint32_t)${callbackName},0,0);\n`;

        return code;
    }

    Blockly.C['sensing_g0_mech_key_set_rgb'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        let i2cNum = i2c.substring(2, 3);
        Blockly.C.definitions_[`define_mechkey${i2cNum}`] = `#define  USE_MECHKEY_${i2cNum} 1`;
        let color = Blockly.C.valueToCode(block, 'COLOR', Blockly.C.ORDER_NONE);

        let code = `grovezero->mechkey->ledOnColor(${i2cNum},31,0,${color});\n`;

        return code;
    }

    Blockly.C['sensing_g0_mech_key_close'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        let i2cNum = i2c.substring(2, 3);
        Blockly.C.definitions_[`define_mechkey${i2cNum}`] = `#define  USE_MECHKEY_${i2cNum} 1`;
        let code = `grovezero->mechkey->ledOnColor(${i2cNum},31,0,"#000000");\n`;
        return code;
    }

    Blockly.C['sensing_g0_mech_key_is_pressed'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        let i2cNum = i2c.substring(2, 3);
        Blockly.C.definitions_[`define_mechkey${i2cNum}`] = `#define  USE_MECHKEY_${i2cNum} 1`;
        let code = `grovezero->mechkey->isPressed(${i2cNum})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    };
}


// #define  USE_MECHKEY_0                  0
// #define  USE_MECHKEY_1                  0
// #define  USE_MECHKEY_2                  0
// #define  USE_MECHKEY_3                  0