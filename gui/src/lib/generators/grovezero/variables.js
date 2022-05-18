
const isNumberString = (value) => {
  if (typeof (value) == 'string') {
    let length = value.length;
    let firstQuotation = value.indexOf('/"');
    let lastQuotation = value.lastIndexOf('/"');
    if (firstQuotation == 0 && lastQuotation == length - 1) {
      let numStr = value.substring(1, length);
      if (Number(numStr) != NaN) {
        return true;
      }
    }
  }
  return false;
}

const toNumber = (value) => {
  return value.substring(1, value.length);
}

export default (Blockly) => {

  Blockly.C['data_variable'] = function (block) {
    let variable = block.getFieldValue('VARIABLE') || '';
    var code = Blockly.C.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    return [code, Blockly.C.ORDER_ATOMIC];
  };

  Blockly.C['data_setvariableto'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_ATOMIC) || '0';
    var variable = block.getFieldValue('VARIABLE') || '';
    var varName = Blockly.C.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);

    if (isNumberString(argument0)) argument0 = toNumber(argument0);
    if ('NULL' == argument0
      || 'NaN' == argument0) {
      argument0 = '0';
    }

    {
      // console.log(block.childBlocks_[0].type);
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

  Blockly.C['data_changevariableby'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_ASSIGNMENT);
    var variable = block.getFieldValue('VARIABLE') || '';
    var varName = Blockly.C.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);

    if (isNumberString(argument0)) argument0 = toNumber(argument0);
    if ('NULL' == argument0
      || 'NaN' == argument0) {
      argument0 = '0';
    }
    
    return varName + ' = ' + varName + ' + ' + argument0 + ';\n';
  };


  Blockly.C['data_showvariable'] = function (block) {
    return ``;
  };

  Blockly.C['data_hidevariable'] = Blockly.C['data_showvariable'];
  Blockly.C['data_listcontents'] = Blockly.C['data_showvariable'];
  Blockly.C['data_listindexall'] = Blockly.C['data_showvariable'];
  Blockly.C['data_listindexrandom'] = Blockly.C['data_showvariable'];
  Blockly.C['data_addtolist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_deleteoflist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_deletealloflist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_insertatlist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_replaceitemoflist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_itemoflist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_itemnumoflist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_lengthoflist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_listcontainsitem'] = Blockly.C['data_showvariable'];
  Blockly.C['data_showlist'] = Blockly.C['data_showvariable'];
  Blockly.C['data_hidelist'] = Blockly.C['data_showvariable'];

}
