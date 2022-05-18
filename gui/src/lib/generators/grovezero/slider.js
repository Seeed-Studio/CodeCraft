/**
 * i2cToDefine：i2c地址 -> 宏定义
 * @param {String} i2c 
 */
const i2cToDefine = i2c => {
    switch (i2c) {
        case '0x21': return '0';
        case '0x2A': return '1';
        case '0x2B': return '2';
        case '0x2C': return '3';
    }
}

export default (Blockly) => {
    Blockly.C['sensing_g0_slider_get_value'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = i2cToDefine(i2c);
        Blockly.C.definitions_[`define_sliderdimmer_${i2c}`] = `#define USE_SLIDERDIMMER_${i2c} 1`;
        var code = `grovezero->sliderdimmer->getvalue(${i2c})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }
}
