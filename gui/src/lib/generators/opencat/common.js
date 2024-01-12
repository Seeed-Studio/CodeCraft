const priorityOper = (oper) => {
  return `(${oper})`;
}

export default (Blockly) => {

  // text
  Blockly.ArduinoOpenCat['text'] = Blockly.C['text'];

  //一直等待  Keep waiting
  Blockly.ArduinoOpenCat['motion_arduino_keep_wait'] = function (block) {
    var code = `while(1){}\n`;
    return code;
  }

  Blockly.ArduinoOpenCat['motion_arduino_break'] = function (block) {
    var code = `break;\n`;
    return code;
  }

  /* 延时  Delay -------------------------------------------------- */
  Blockly.ArduinoOpenCat['motion_arduino_delay_ms'] = function (block) {
    var time = Blockly.ArduinoOpenCat.valueToCode(block, 'TIME', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = `delay(${time});\n`;
    return code;
  }
  Blockly.ArduinoOpenCat['motion_arduino_delay_us'] = function (block) {
    var time = Blockly.ArduinoOpenCat.valueToCode(block, 'TIME', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = `delayMicroseconds(${time});\n`;
    return code;
  }

  /* 系统运行时间  System running time -------------------------------------------------- */
  Blockly.ArduinoOpenCat['motion_arduino_sys_time'] = function (block) {
    var type = block.getFieldValue('TYPE');
    var code = '';
    if (type === 'ms') {
      code = 'millis()';
    } else {
      code = 'micros()';
    }
    return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
  }

  // 变量  Variable
  Blockly.ArduinoOpenCat['data_variable'] = function (block) {
    var variable = block.getFieldValue('VARIABLE') || '';
    var code = Blockly.ArduinoOpenCat.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
  };

  Blockly.ArduinoOpenCat['data_setvariableto'] = function (block) {
    var variable = block.getFieldValue('VARIABLE') || '';
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'VALUE', Blockly.ArduinoOpenCat.ORDER_ATOMIC) || '0';
    var varName = Blockly.ArduinoOpenCat.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    if ('NULL' == argument0
      || 'NaN' == argument0) {
      argument0 = '0';
    }
    // var num = Number(argument0.substring(1, argument0.length - 1));
    // argument0 = isNaN(num) ? argument0 : num;
    //为变量定义类型  Assign types to variables
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

  Blockly.ArduinoOpenCat['data_changevariableby'] = function (block) {
    var variable = block.getFieldValue('VARIABLE') || '';
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'VALUE', Blockly.ArduinoOpenCat.ORDER_ASSIGNMENT);
    if ('NULL' == argument0
      || 'NaN' == argument0) {
      argument0 = '0';
    }
    var varName = Blockly.ArduinoOpenCat.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    return varName + ' = ' + varName + ' + ' + argument0 + ';\n';
  };


  Blockly.ArduinoOpenCat['data_showvariable'] = function (block) {
    return ``;
  };
  Blockly.ArduinoOpenCat['data_hidevariable'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_listcontents'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_listindexall'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_listindexrandom'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_addtolist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_deleteoflist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_deletealloflist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_insertatlist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_replaceitemoflist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_itemoflist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_itemnumoflist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_lengthoflist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_listcontainsitem'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_showlist'] = Blockly.ArduinoOpenCat['data_showvariable'];
  Blockly.ArduinoOpenCat['data_hidelist'] = Blockly.ArduinoOpenCat['data_showvariable'];

  // math
  Blockly.ArduinoOpenCat['math_number'] = function (block) {
    // 数值类型，允许包含符号及小数。Signed number with decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code)) {
      code = 'NULL';
    }
    return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
  };
  Blockly.ArduinoOpenCat['math_cc_min_0_max_200_number'] = Blockly.ArduinoOpenCat['math_number'];
  Blockly.ArduinoOpenCat['math_cc_positive_whole_number'] = Blockly.ArduinoOpenCat['math_number'];

  Blockly.ArduinoOpenCat['math_whole_number'] = function (block) {
    // 数值类型，不允许包含符号及小数。Unsigned number without decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code) || code < 0 || String(code).indexOf('.') > -1) {
      code = 'NULL';
    }
    return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
  };

  Blockly.ArduinoOpenCat['math_positive_number'] = function (block) {
    // 数值类型，不允许包含符号，但可以包含小数.  Unsigned number with decimals
    var code = parseFloat(block.getFieldValue('NUM'));
    if (isNaN(code) || code < 0) {
      code = 'NULL';
    }
    return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
  };

  Blockly.ArduinoOpenCat['colour_picker'] = function (block) {
    var code = block.getFieldValue('COLOUR');
    return [`"${code}"`, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
  }

  // operator
  Blockly.ArduinoOpenCat['operator_arduino_itoa'] = function (block) {
    Blockly.ArduinoOpenCat.definitions_['var_itoa_string'] = `char itoaString[64];`;
    var value = Blockly.ArduinoOpenCat.valueToCode(block, 'VALUE', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = `itoa(${value}, itoaString, 10)`;
    return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
  };

  Blockly.ArduinoOpenCat['operator_add'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = argument0 + ' + ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_ADDITION];
  };

  Blockly.ArduinoOpenCat['operator_subtract'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = argument0 + ' - ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_SUBTRACTION];
  };

  Blockly.ArduinoOpenCat['operator_multiply'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = argument0 + ' * ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_MULTIPLICATION];
  };

  Blockly.ArduinoOpenCat['operator_divide'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = argument0 + ' / ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_DIVISION];
  };

  Blockly.ArduinoOpenCat['operator_random'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'FROM', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'TO', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = 'random(' + argument0 + ', ' + argument1 + '+1 )';
    return [code, Blockly.ArduinoOpenCat.ORDER_FUNCTION_CALL];
  }

  Blockly.ArduinoOpenCat['operator_lt'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' < ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_RELATIONAL];
  };

  Blockly.ArduinoOpenCat['operator_lt_equals'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' <= ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_RELATIONAL];
  };

  Blockly.ArduinoOpenCat['control_wait'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'DURATION', Blockly.ArduinoOpenCat.ORDER_NONE);
    return 'groveZeroMainBoard.wait(' + argument0 + ');\r\n';
  };

  Blockly.ArduinoOpenCat['control_repeat'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'TIMES', Blockly.ArduinoOpenCat.ORDER_NONE);
    var loopVar = Blockly.ArduinoOpenCat.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
    var branch = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK');
    branch = Blockly.ArduinoOpenCat.addLoopTrap(branch, block.id);
    return 'for (int ' + loopVar + ' = 0; ' + loopVar + ' < ' + argument0 + '; ' + loopVar + '++) {\n' + branch + '}\n';
  };

  Blockly.ArduinoOpenCat['control_if'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'CONDITION', Blockly.ArduinoOpenCat.ORDER_NONE);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var branch = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK');
    branch = Blockly.ArduinoOpenCat.addLoopTrap(branch, block.id);
    return 'if (' + argument0 + ') {\n' + branch + '}\n';
  };

  Blockly.ArduinoOpenCat['control_if_else'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'CONDITION', Blockly.ArduinoOpenCat.ORDER_NONE);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var branch0 = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK');
    var branch1 = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK2');
    branch0 = Blockly.ArduinoOpenCat.addLoopTrap(branch0, block.id);
    branch1 = Blockly.ArduinoOpenCat.addLoopTrap(branch1, block.id);
    return 'if (' + argument0 + ') {\n' + branch0 + '} else {\n' + branch1 + '}\n';
  };

  Blockly.ArduinoOpenCat['control_wait_until'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'CONDITION', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    return 'while(' + argument0 + ' == false){\n}\n';
  };

  Blockly.ArduinoOpenCat['control_repeat_until'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'CONDITION', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var branch = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK');
    branch = Blockly.ArduinoOpenCat.addLoopTrap(branch, block.id);
    return 'while (' + argument0 + ' == false) {\n' + branch + '}\n';
  };

  Blockly.ArduinoOpenCat['control_forever'] = function (block) {
    var branch = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK');
    branch = Blockly.ArduinoOpenCat.addLoopTrap(branch, block.id);
    return 'while (1) {\n' + branch + '}\n';
  };

  Blockly.ArduinoOpenCat['motion_arduino_repeat'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'CONDITION', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var branch = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK');
    branch = Blockly.ArduinoOpenCat.addLoopTrap(branch, block.id);
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
  }

  Blockly.ArduinoOpenCat['motion_arduino_setup_loop'] = function (block) {
    var branch1 = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK1');
    var branch2 = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK2');
    Blockly.ArduinoOpenCat.setups_['setup_branch'] = branch1;
    Blockly.ArduinoOpenCat.loops_['loop_branch'] = branch2;
    return '';
  }

  // for
  Blockly.ArduinoOpenCat['motion_arduino_for'] = function (block) {
    var a = Blockly.ArduinoOpenCat.valueToCode(block, 'A', Blockly.ArduinoOpenCat.ORDER_NONE);
    var b = Blockly.ArduinoOpenCat.valueToCode(block, 'B', Blockly.ArduinoOpenCat.ORDER_NONE);
    var c = Blockly.ArduinoOpenCat.valueToCode(block, 'C', Blockly.ArduinoOpenCat.ORDER_NONE);
    var variable = block.getFieldValue('VARIABLE') || 'i';
    var branch = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK');
    var v = Blockly.ArduinoOpenCat.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    var code = `for(${v}=${a};${v}<=${b};${v}+=${c})\n{\n${branch}\n}\n`;
    return code;
  }

  // operator
  Blockly.ArduinoOpenCat['operator_equals'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' == ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_EQUALITY];
  };

  Blockly.ArduinoOpenCat['operator_not_equals'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' != ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_EQUALITY];
  };

  Blockly.ArduinoOpenCat['operator_gt_equals'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND1', Blockly.ArduinoOpenCat.ORDER_NONE);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND2', Blockly.ArduinoOpenCat.ORDER_NONE);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' >= ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_RELATIONAL];
  };

  Blockly.ArduinoOpenCat['operator_gt'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND1', Blockly.ArduinoOpenCat.ORDER_NONE);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND2', Blockly.ArduinoOpenCat.ORDER_NONE);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' > ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_RELATIONAL];
  };

  Blockly.ArduinoOpenCat['operator_and'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument1 === '') {
      argument1 = 'NULL';
    } else {
      argument1 = argument1;
    }
    var code = argument0 + ' && ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_BITWISE_AND];
  };

  Blockly.ArduinoOpenCat['operator_or'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument1 === '') {
      argument1 = 'NULL';
    } else {
      argument1 = argument1;
    }
    var code = argument0 + ' || ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.ArduinoOpenCat.ORDER_BITWISE_OR];
  };

  Blockly.ArduinoOpenCat['operator_not'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'OPERAND', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var code = '!' + argument0;
    return [code, Blockly.ArduinoOpenCat.ORDER_LOGICAL_NOT];
  };

  Blockly.ArduinoOpenCat['operator_join'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'STRING1', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'STRING2', Blockly.ArduinoOpenCat.ORDER_ATOMIC);
    var code = 'String(' + argument0 + ') + String(' + argument1 + ')';
    return [code, Blockly.ArduinoOpenCat.ORDER_UNARY_PLUS];
  };

  Blockly.ArduinoOpenCat['operator_letter_of'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'LETTER', Blockly.ArduinoOpenCat.ORDER_NONE);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'STRING', Blockly.ArduinoOpenCat.ORDER_NONE);
    Blockly.ArduinoOpenCat.define_fun['charAt'] =
    'char charAt(char *src,int index)\n' +
    '{\n' +
    '    char *p=src; \n' +
    '    if(index<0||index>strlen(src))\n' +
    '        return 0;\n' +
    '    return p[index];\n' +
    '}\n';
    var code = 'charAt(' + argument1 + ',' + argument0 + ')';
    return [code, Blockly.ArduinoOpenCat.ORDER_FUNCTION_CALL];
  };

  Blockly.ArduinoOpenCat['operator_length'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'STRING', Blockly.ArduinoOpenCat.ORDER_NONE);
    var code = '(sizeof(' + argument0 + ')-1)';
    return [code, Blockly.ArduinoOpenCat.ORDER_FUNCTION_CALL];
  };

  Blockly.ArduinoOpenCat['operator_contains'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'STRING1', Blockly.ArduinoOpenCat.ORDER_NONE);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'STRING2', Blockly.ArduinoOpenCat.ORDER_NONE);
    var code = 'strstr(' + argument0 + ',' + argument1 + ')';
    return [code, Blockly.ArduinoOpenCat.ORDER_FUNCTION_CALL];
  };

  Blockly.ArduinoOpenCat['operator_mod'] = function (block) {
    var argument0 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM1', Blockly.ArduinoOpenCat.ORDER_NONE);
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM2', Blockly.ArduinoOpenCat.ORDER_NONE);
    var code = 'fmod(' + argument0 + ',' + argument1 + ')';
    return [code, Blockly.ArduinoOpenCat.ORDER_FUNCTION_CALL];
  };

  Blockly.ArduinoOpenCat['operator_mathop'] = function (block) {
    var argument0 = block.getFieldValue('OPERATOR');
    var argument1 = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM', Blockly.ArduinoOpenCat.ORDER_NONE);
    if (argument0 == 'sin' || argument0 == 'cos' || argument0 == 'tan') {
      Blockly.ArduinoOpenCat.definitions_['include_PI'] = '#define PI 3.14159265';
      Blockly.ArduinoOpenCat.define_fun['degrees_to_radians'] =
        'double degrees_to_radians(double param)\n' +
        '{\n' +
        '    return param * PI / 180.0;\n' +
        '}\n';
    } else if (argument0 == 'asin' || argument0 == 'acos' || argument0 == 'atan') {
      Blockly.ArduinoOpenCat.definitions_['include_PI'] = '#define PI 3.14159265';
      Blockly.ArduinoOpenCat.define_fun['radians_to_degrees'] =
        'double radians_to_degrees(double param)\n' +
        '{\n' +
        '    return param * 180.0 / PI;\n' +
        '}\n';
    }
    argument1 = argument1 === 'NaN' ? '0' : argument1;
    var code;
    switch (argument0) {
      case 'abs':
        code = 'abs(' + argument1 + ')';
        break;
      case 'floor':
        code = 'floor(' + argument1 + ')';
        break;
      case 'ceiling':
        code = 'ceil(' + argument1 + ')';
        break;
      case 'sqrt':
        code = 'sqrt(' + argument1 + ')';
        break;
      case 'sin':
        code = 'sin(degrees_to_radians(' + argument1 + '))';
        break;
      case 'cos':
        code = 'cos(degrees_to_radians(' + argument1 + '))';
        break;
      case 'tan':
        code = 'tan(degrees_to_radians(' + argument1 + '))';
        break;
      case 'asin':
        code = 'radians_to_degrees(asin(' + argument1 + '))';
        break;
      case 'acos':
        code = 'radians_to_degrees(acos(' + argument1 + '))';
        break;
      case 'atan':
        code = 'radians_to_degrees(atan(' + argument1 + '))';
        break;
      case 'ln':
        code = 'log(' + argument1 + ')';
        break;
      case 'log':
        code = 'log10(' + argument1 + ')';
        break;
      case 'e ^':
        code = 'exp(' + argument1 + ')';
        break;
      case '10 ^':
        code = 'pow(10,' + argument1 + ')';
        break;
    }
    return [code, Blockly.ArduinoOpenCat.ORDER_FUNCTION_CALL];
  }

  //自定义积木  Self defined block
  Blockly.ArduinoOpenCat['procedures_call'] = function (block) {
    let defineBlock = Blockly.Procedures.getDefineBlock(block.getProcCode(), block.workspace);
    if (!defineBlock) return '';
    let childBlocks = block.childBlocks_ || [];
    let code = `${defineBlock.funName}(`;
    for (let x = 0, isFirstArg = true, block_; block_ = childBlocks[x]; x++) {
        let argText = Blockly.ArduinoOpenCat.blockToCode(block_);
        if (argText.constructor == Array) {
            code = `${code}${isFirstArg ? '' : ','}${argText[0]}`;
            isFirstArg = false;
        }
    }
    code = `${code});\n`;
    return code;
}

Blockly.ArduinoOpenCat['procedures_definition'] = function (block) {
    let childBlocks = block.childBlocks_ || [];
    let funName = Blockly.ArduinoOpenCat.variableDB_.getDistinctName(`definition_fun`, Blockly.Variables.NAME_TYPE);
    block.funName = funName;
    let callbackCodeHead = `void ${funName}(`;
    for (let x = 0, block_; block_ = childBlocks[0].childBlocks_[x]; x++) {
        let argName = '', argType = '';
        if (block_.type === "argument_reporter_string_number") {
            argType = 'float';
        } else if (block_.type === "argument_reporter_boolean") {
            argType = 'uint8_t';
        }
        let value = block_.getFieldValue('VALUE') || '';
        argName = Blockly.ArduinoOpenCat.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
        callbackCodeHead = `${callbackCodeHead}${x === 0 ? '' : ','}${argType} ${argName}`;
    }
    callbackCodeHead = `${callbackCodeHead}){\n`;
    block.callbackCodeHead = callbackCodeHead;
    block.callbackCodeTail = '}\n\n';
    return '';
}


Blockly.ArduinoOpenCat['argument_reporter_string_number'] = function (block) {
    let value = block.getFieldValue('VALUE') || '';
    let argName = Blockly.ArduinoOpenCat.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
    return [argName, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
}

Blockly.ArduinoOpenCat['argument_reporter_boolean'] = function (block) {
    let value = block.getFieldValue('VALUE') || '';
    let argName = Blockly.ArduinoOpenCat.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
    return [argName, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
}



}


