export default (Blockly) => {
  Blockly.C['text'] = function (block) {
    // Text value.
    var code = Blockly.C.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.C.ORDER_ATOMIC];
  };
  Blockly.C['text12'] = Blockly.C['text'];
  Blockly.C['text31'] = Blockly.C['text'];
  Blockly.C['text32'] = Blockly.C['text'];
}
