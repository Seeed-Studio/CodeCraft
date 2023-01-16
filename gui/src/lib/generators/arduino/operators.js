const priorityOper = (oper) => {
  return `(${oper})`;
}

export default (Blockly) => {
  
  Blockly.Arduino['operator_arduino_itoa'] = function (block) {
      Blockly.Arduino.definitions_['var_itoa_string'] = `char itoaString[64];`;
      var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
      var code =`ltoa(${value}, itoaString, 10)`;
      return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino['operator_arduino_map'] = function (block) {
      var p1 = Blockly.Arduino.valueToCode(block, 'PARAMETER1', Blockly.Arduino.ORDER_ATOMIC);
      var p2 = Blockly.Arduino.valueToCode(block, 'PARAMETER2', Blockly.Arduino.ORDER_ATOMIC);
      var p3 = Blockly.Arduino.valueToCode(block, 'PARAMETER3', Blockly.Arduino.ORDER_ATOMIC);
      var p4 = Blockly.Arduino.valueToCode(block, 'PARAMETER4', Blockly.Arduino.ORDER_ATOMIC);
      var p5 = Blockly.Arduino.valueToCode(block, 'PARAMETER5', Blockly.Arduino.ORDER_ATOMIC);
      var code =`map(${p1}, ${p2}, ${p3}, ${p4}, ${p5})`;
      return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino['operator_add'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_ATOMIC);
    var argument1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_ATOMIC);
    var code = argument0 + ' + ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_ADDITION];
  };

  Blockly.Arduino['operator_subtract'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_ATOMIC);
    var argument1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_ATOMIC);
    var code = argument0 + ' - ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_SUBTRACTION];
  };

  Blockly.Arduino['operator_multiply'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_ATOMIC);
    var argument1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_ATOMIC);
    var code = argument0 + ' * ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_MULTIPLICATION];
  };

  Blockly.Arduino['operator_divide'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_ATOMIC);
    var argument1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_ATOMIC);
    var code = argument0 + ' / ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_DIVISION];
  };

  Blockly.Arduino['operator_random'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_ATOMIC);
    var argument1 = Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'random(' + argument0 + ', ' + argument1 + '+1 )';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }

  Blockly.Arduino['operator_lt'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' < ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_RELATIONAL];
  };

  Blockly.Arduino['operator_lt_equals'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' <= ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_RELATIONAL];
  };



  Blockly.Arduino['operator_equals'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' == ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_EQUALITY];
  };

  Blockly.Arduino['operator_not_equals'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' != ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_EQUALITY];
  };

  Blockly.Arduino['operator_gt_equals'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_NONE);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_NONE);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' >= ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_RELATIONAL];
  };

  Blockly.Arduino['operator_gt'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_NONE);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_NONE);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = argument0 + ' > ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_RELATIONAL];
  };

  Blockly.Arduino['operator_and'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var argument1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC);
    if (argument1 === '') {
      argument1 = 'NULL';
    } else {
      argument1 = argument1;
    }
    var code = argument0 + ' && ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_BITWISE_AND];
  };

  Blockly.Arduino['operator_or'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND1', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var argument1 = Blockly.Arduino.valueToCode(block, 'OPERAND2', Blockly.Arduino.ORDER_ATOMIC);
    if (argument1 === '') {
      argument1 = 'NULL';
    } else {
      argument1 = argument1;
    }
    var code = argument0 + ' || ' + argument1;
    code = priorityOper(code);
    return [code, Blockly.Arduino.ORDER_BITWISE_OR];
  };

  Blockly.Arduino['operator_not'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'OPERAND', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var code = '!' + argument0;
    return [code, Blockly.Arduino.ORDER_LOGICAL_NOT];
  };

  Blockly.Arduino['operator_join'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'STRING1', Blockly.Arduino.ORDER_ATOMIC);
    var argument1 = Blockly.Arduino.valueToCode(block, 'STRING2', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'String(' + argument0 + ') + String(' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_UNARY_PLUS];
  };

  Blockly.Arduino['operator_letter_of'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'LETTER', Blockly.Arduino.ORDER_NONE);
    var argument1 = Blockly.Arduino.valueToCode(block, 'STRING', Blockly.Arduino.ORDER_NONE);
    var code = 'groveZeroMainBoard.charAt(' + argument1 + ',' + argument0 + ')';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  };

  Blockly.Arduino['operator_length'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'STRING', Blockly.Arduino.ORDER_NONE);
    var code = 'sizeof(' + argument0 + ')';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  };

  Blockly.Arduino['operator_contains'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'STRING1', Blockly.Arduino.ORDER_NONE);
    var argument1 = Blockly.Arduino.valueToCode(block, 'STRING2', Blockly.Arduino.ORDER_NONE);
    var code = 'strstr(' + argument0 + ',' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  };

  Blockly.Arduino['operator_mod'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'NUM1', Blockly.Arduino.ORDER_NONE);
    var argument1 = Blockly.Arduino.valueToCode(block, 'NUM2', Blockly.Arduino.ORDER_NONE);
    var code = 'fmod(' + argument0 + ',' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  };

  Blockly.Arduino['operator_mathop'] = function (block) {
    var argument0 = block.getFieldValue('OPERATOR');
    var argument1 = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_NONE);
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
        code = 'cos(' + argument1 + ')';
        break;
      case 'tan':
        code = 'tan(' + argument1 + ')';
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
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
}
