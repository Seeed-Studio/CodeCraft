export default (Blockly) => {
  Blockly.C['operator_add'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'NUM1', Blockly.C.ORDER_ATOMIC);
    var argument1 = Blockly.C.valueToCode(block, 'NUM2', Blockly.C.ORDER_ATOMIC);
    var code = argument0 + ' + ' + argument1;
    return [code, Blockly.C.ORDER_ADDITION];
  };

  Blockly.C['operator_subtract'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'NUM1', Blockly.C.ORDER_ATOMIC);
    var argument1 = Blockly.C.valueToCode(block, 'NUM2', Blockly.C.ORDER_ATOMIC);
    var code = argument0 + ' - ' + argument1;
    return [code, Blockly.C.ORDER_SUBTRACTION];
  };

  Blockly.C['operator_multiply'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'NUM1', Blockly.C.ORDER_ATOMIC);
    var argument1 = Blockly.C.valueToCode(block, 'NUM2', Blockly.C.ORDER_ATOMIC);
    var code = argument0 + ' * ' + argument1;
    return [code, Blockly.C.ORDER_MULTIPLICATION];
  };

  Blockly.C['operator_divide'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'NUM1', Blockly.C.ORDER_ATOMIC);
    var argument1 = Blockly.C.valueToCode(block, 'NUM2', Blockly.C.ORDER_ATOMIC);
    var code = argument0 + ' / ' + argument1;
    return [code, Blockly.C.ORDER_DIVISION];
  };

  Blockly.C['operator_random'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'FROM', Blockly.C.ORDER_ATOMIC);
    var argument1 = Blockly.C.valueToCode(block, 'TO', Blockly.C.ORDER_ATOMIC);
    var code = `grovezero->math->randf((float)${argument0},(float)${argument1})`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  }

  Blockly.C['operator_lt'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'OPERAND1', Blockly.C.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.C.valueToCode(block, 'OPERAND2', Blockly.C.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = `grovezero->math->isless((float)${argument0},(float)${argument1})`;
    return [code, Blockly.C.ORDER_RELATIONAL];
  };

  Blockly.C['operator_equals'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'OPERAND1', Blockly.C.ORDER_ATOMIC);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.C.valueToCode(block, 'OPERAND2', Blockly.C.ORDER_ATOMIC);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = `grovezero->math->isequal((float)${argument0},(float)${argument1})`;
    return [code, Blockly.C.ORDER_EQUALITY];
  };

  Blockly.C['operator_gt'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'OPERAND1', Blockly.C.ORDER_NONE);
    if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
      argument0 = argument0.replace(/"/g, '');
    }
    var argument1 = Blockly.C.valueToCode(block, 'OPERAND2', Blockly.C.ORDER_NONE);
    if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
      argument1 = argument1.replace(/"/g, '');
    }
    var code = `grovezero->math->islarger((float)${argument0},(float)${argument1})`;
    return [code, Blockly.C.ORDER_RELATIONAL];
  };

  Blockly.C['operator_and'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'OPERAND1', Blockly.C.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var argument1 = Blockly.C.valueToCode(block, 'OPERAND2', Blockly.C.ORDER_ATOMIC);
    if (argument1 === '') {
      argument1 = 'NULL';
    } else {
      argument1 = argument1;
    }
    var code = argument0 + ' && ' + argument1;
    return [code, Blockly.C.ORDER_BITWISE_AND];
  };

  Blockly.C['operator_or'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'OPERAND1', Blockly.C.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var argument1 = Blockly.C.valueToCode(block, 'OPERAND2', Blockly.C.ORDER_ATOMIC);
    if (argument1 === '') {
      argument1 = 'NULL';
    } else {
      argument1 = argument1;
    }
    var code = argument0 + ' || ' + argument1;
    return [code, Blockly.C.ORDER_BITWISE_OR];
  };

  Blockly.C['operator_not'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'OPERAND', Blockly.C.ORDER_ATOMIC);
    var code = '!' + argument0;
    return [code, Blockly.C.ORDER_LOGICAL_NOT];
  };

  Blockly.C['operator_join'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'STRING1', Blockly.C.ORDER_ATOMIC);
    var argument1 = Blockly.C.valueToCode(block, 'STRING2', Blockly.C.ORDER_ATOMIC);
    var code = `grovezero->string->strcat(${argument0},${argument1})`;
    return [code, Blockly.C.ORDER_UNARY_PLUS];
  };

  Blockly.C['operator_letter_of'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'LETTER', Blockly.C.ORDER_NONE);
    var argument1 = Blockly.C.valueToCode(block, 'STRING', Blockly.C.ORDER_NONE);
    Blockly.C.definitions_['ncstr'] = `char ncstr[2]={0x00,0x00};`;
    var code = `grovezero->string->strnc(${argument0},${argument1},ncstr)`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['operator_length'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'STRING', Blockly.C.ORDER_NONE);
    var code = `grovezero->string->strlen(${argument0})`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['operator_contains'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'STRING1', Blockly.C.ORDER_NONE);
    var argument1 = Blockly.C.valueToCode(block, 'STRING2', Blockly.C.ORDER_NONE);
    var code = `grovezero->string->strstr(${argument0},${argument1})`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };

  Blockly.C['operator_mod'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'NUM1', Blockly.C.ORDER_NONE);
    var argument1 = Blockly.C.valueToCode(block, 'NUM2', Blockly.C.ORDER_NONE);
    var code = `grovezero->math->fmod((float)${argument0},(float)${argument1})`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  };


  Blockly.C['operator_mathop'] = function (block) {
    var argument0 = block.getFieldValue('OPERATOR');
    var argument1 = Blockly.C.valueToCode(block, 'NUM', Blockly.C.ORDER_NONE);
    if (argument0 == 'sin' || argument0 == 'cos' || argument0 == 'tan') {
      Blockly.C.definitions_['include_PI'] = '#define PI 3.14159265';
      Blockly.C.definitions_['degrees_to_radians'] =
        'float degrees_to_radians(float param)\n' +
        '{\n' +
        '    return param * PI / 180.0;\n' +
        '}\n';
    } else if (argument0 == 'asin' || argument0 == 'acos' || argument0 == 'atan') {
      Blockly.C.definitions_['include_PI'] = '#define PI 3.14159265';
      Blockly.C.definitions_['radians_to_degrees'] =
        'float radians_to_degrees(float param)\n' +
        '{\n' +
        '    return param * 180.0 / PI;\n' +
        '}\n';
    }
    var code;
    switch (argument0) {
      case 'abs':
        code = `grovezero->math->fabs((float)${argument1})`;
        break;
      case 'floor':
        code = `grovezero->math->floor((float)${argument1})`;
        break;
      case 'ceiling':
        code = `grovezero->math->ceil((float)${argument1})`;
        break;
      case 'sqrt':
        code = `grovezero->math->sqrt((float)${argument1})`;
        break;
      case 'sin':
        code = `grovezero->math->sin(degrees_to_radians((float)${argument1}))`;
        break;
      case 'cos':
        code = `grovezero->math->cos(degrees_to_radians((float)${argument1}))`;
        break;
      case 'tan':
        code = `grovezero->math->tan(degrees_to_radians((float)${argument1}))`;
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
        code = `grovezero->math->ln((float)${argument1})`;
        break;
      case 'log':
        code = `grovezero->math->log10((float)${argument1})`;
        break;
      case 'e ^':
        code = `grovezero->math->exp((float)${argument1})`;
        break;
      case '10 ^':
        code = `grovezero->math->pow(10,(float)${argument1})`;
        break;
    }
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  }


  Blockly.C['sensing_timer'] = function (block) {
    return 'grovezero.ble.getTimer(uint8_t timer_event_id);\n';
  }

  Blockly.C['sensing_resettimer'] = function (block) {
    return 'grovezero.ble.resetTimer(uint8_t timer_event_id);\n';
  }

  Blockly.C['operator_round'] = function (block) {
    var argument0 = Blockly.C.valueToCode(block, 'NUM', Blockly.C.ORDER_NONE);
    var code = `grovezero->math->round((float)${argument0})`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  }

  Blockly.C['grovezero_math_itoa'] = function (block) {
    var itoastr = Blockly.C.variableDB_.getDistinctName('itoastr', Blockly.Variables.NAME_TYPE);
    Blockly.C.definitions_[`define_${itoastr}`] = `const char ${itoastr}[64];`;
    var argument0 = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
    var code = `grovezero->string->itoa(${argument0},${itoastr},10)`;
    return [code, Blockly.C.ORDER_FUNCTION_CALL];
  }

}
