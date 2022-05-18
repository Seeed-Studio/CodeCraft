export default (Blockly) => {
  Blockly.Arduino['data_variable'] = function (block) {
    var variable = block.getFieldValue('VARIABLE') || '';
    var code = Blockly.Arduino.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino['data_setvariableto'] = function (block) {
    var variable = block.getFieldValue('VARIABLE') || '';
    var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var varName = Blockly.Arduino.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    if ('NULL' == argument0
      || 'NaN' == argument0) {
      argument0 = '0';
    }
    // var num = Number(argument0.substring(1, argument0.length - 1));
    // argument0 = isNaN(num) ? argument0 : num;
    //为变量定义类型
    {
      var type = 'float';
      var workspace = Blockly.getMainWorkspace();
      var variables = workspace.getAllVariables();
      for (var i = 0; i < variables.length; i++) {
        if (variables[i].id_ === block.getFieldValue('VARIABLE')) {
          variables[i].c_type = type;
          break;
        }
      }
    }
    return varName + ' = ' + argument0 + ';\n';
  };

  Blockly.Arduino['data_changevariableby'] = function (block) {
    var variable = block.getFieldValue('VARIABLE') || '';
    var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
    if ('NULL' == argument0
      || 'NaN' == argument0) {
      argument0 = '0';
    }
    var varName = Blockly.Arduino.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    return varName + ' = ' + varName + ' + ' + argument0 + ';\n';
  };


  Blockly.Arduino['data_showvariable'] = function (block) {
    return ``;
  };
  Blockly.Arduino['data_hidevariable'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_listcontents'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_listindexall'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_listindexrandom'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_addtolist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_deleteoflist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_deletealloflist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_insertatlist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_replaceitemoflist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_itemoflist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_itemnumoflist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_lengthoflist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_listcontainsitem'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_showlist'] = Blockly.Arduino['data_showvariable'];
  Blockly.Arduino['data_hidelist'] = Blockly.Arduino['data_showvariable'];
}