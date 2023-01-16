export default (Blockly) => {

  Blockly.Arduino['math_number'] = function (block) {
    // 数值类型，允许包含符号及小数。 Signed number with decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code)) {
      code = 'NULL';
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino['math_cc_min_0_max_200_number'] = Blockly.Arduino['math_number'];

  Blockly.Arduino['math_whole_number'] = function (block) {
    // 数值类型，不允许包含符号及小数。 Unsigned number without decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code) || code < 0 || String(code).indexOf('.') > -1) {
      code = 'NULL';
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino['math_positive_number'] = function (block) {
    // 数值类型，不允许包含符号，但可以包含小数.  Unsigned number with decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code) || code < 0) {
      code = 'NULL';
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino['colour_picker'] = function (block) {
    var code = block.getFieldValue('COLOUR');
    return [`"${code}"`, Blockly.Arduino.ORDER_ATOMIC];
  }

}

