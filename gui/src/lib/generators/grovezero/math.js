export default (Blockly) => {

  Blockly.C['math_number'] = function (block) {
    // 数值类型，允许包含符号及小数。 Signed number with decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code)) {
      code = 'NULL';
    }
    return [code, Blockly.C.ORDER_ATOMIC];
  };

  Blockly.C['math_whole_number'] = function (block) {
    // 数值类型，不允许包含符号及小数。 Unsigned number without decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code) || code < 0 || String(code).indexOf('.') > -1) {
      code = 'NULL';
    }
    return [code, Blockly.C.ORDER_ATOMIC];
  };

  Blockly.C['math_positive_number'] = function (block) {
    // 数值类型，不允许包含符号，但可以包含小数.  Unsigned number with decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code) || code < 0) {
      code = 'NULL';
    }
    return [code, Blockly.C.ORDER_ATOMIC];
  };
  

  

  Blockly.C['colour_picker'] = function (block) {
    var code = block.getFieldValue('COLOUR');
    return [`"${code}"`, Blockly.C.ORDER_ATOMIC];
  }



  
  Blockly.C['math_cc_number'] = Blockly.C['math_number'];
  Blockly.C['math_cc_time_number'] = Blockly.C['math_number'];
  Blockly.C['math_cc_positive_whole_number'] = Blockly.C['math_number'];
  let list = [
    { min: -100, max: 100 },
    { min: 0, max: 180 },
    { min: 0, max: 4 },
    { min: 0, max: 5 },
    { min: 0, max: 100 },
    { min: 0, max: 255 },
    { min: 0, max: 32 },
    { min: 0, max: 7 },
    { min: -999, max: 9999 },
    { min: 0, max: 9999 },
    { min: 60, max: 960 },
    { min: 1, max: 64 },
    { min: -999999999, max: 999999999 },
  ];
  for (let x = 0, item; item = list[x]; x++) {
    Blockly.C[`math_cc_min_${item.min}_max_${item.max}_number`] = Blockly.C['math_number'];
  }
}

