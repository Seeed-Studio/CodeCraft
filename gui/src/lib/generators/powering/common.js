export default Blockly => {

    Blockly.Powering['text'] = function (block) {
        var code = block.getFieldValue('TEXT');
        return [`"${code}"`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['math_number'] = function (block) {
        var code = parseFloat(block.getFieldValue('NUM') || '0');
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['math_number_for_plotter_print'] = function (block) {
        var code = block.getFieldValue('NUM') || '"null"';
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['math_whole_number'] = Blockly.Powering['math_number'];
    Blockly.Powering['math_positive_number'] = Blockly.Powering['math_number'];
    Blockly.Powering['math_angle'] = Blockly.Powering['math_number'];
    Blockly.Powering['math_integer'] = Blockly.Powering['math_number'];

    Blockly.Powering['colour_picker'] = function (block) {
        var color = block.getFieldValue('COLOUR');
        return [`"${color}"`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['math_cc_number'] = Blockly.Powering['math_number'];
    Blockly.Powering['math_cc_time_number'] = Blockly.Powering['math_number'];
    Blockly.Powering['math_cc_positive_whole_number'] = Blockly.Powering['math_number'];
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
        { min: 0, max: 127 },
        { min: 0, max: 63 },
        { min: 0, max: 30 },
        { min: -999999999, max: 999999999 },
    ];
    for (let x = 0, item; item = list[x]; x++) {
        Blockly.Powering[`math_cc_min_${item.min}_max_${item.max}_number`] = Blockly.Powering['math_number'];
    }

    /**
     * control
     */
    Blockly.Powering['control_mpython_print'] = function (block) {
        var value = Blockly.Powering.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_ATOMIC) || 0;
        console.log(value)
        return `print(${value})\n`;
    }

    Blockly.Powering['control_wait'] = function (block) {
        var duration = Blockly.Powering.valueToCode(block, 'DURATION', Blockly.Powering.ORDER_NONE);
        Blockly.Powering.definitions_['import_time'] = 'import time';
        return `time.sleep(${duration})\n`;
    }

    Blockly.Powering['control_repeat'] = function (block) {
        Blockly.Powering.definitions_['import_time'] = 'import time';
        var times = Blockly.Powering.valueToCode(block, 'TIMES', Blockly.Powering.ORDER_NONE);
        var substack = Blockly.Powering.statementToCode(block, 'SUBSTACK') || Blockly.Powering.PASS;
        var code = [
            `for count in range(${times}):`,
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.Powering['control_forever'] = function (block) {
        Blockly.Powering.definitions_['import_time'] = 'import time';
        var substack = Blockly.Powering.statementToCode(block, 'SUBSTACK') || Blockly.Powering.PASS;
        if (block.getChildren().length === 0) {
            var code = [
                `while True:`,
                `    break`
            ]
        } else {
            var code = [
                `while True:`,
                `    time.sleep(0.02)`,
                `${substack}`
            ]
        }
        return code.join('\n');
    }

    Blockly.Powering['control_repeat_until'] = function (block) {
        Blockly.Powering.definitions_['import_time'] = 'import time';
        var condition = Blockly.Powering.valueToCode(block, 'CONDITION', Blockly.Powering.ORDER_LOGICAL_NOT) || 'False';
        var branch = Blockly.Powering.statementToCode(block, 'SUBSTACK') || Blockly.Powering.PASS;
        if (block.getChildren().length === 0) {
            var code = [
                `while not ${condition}:`,
                `    break`
            ]

        } else {
            var code = [
                `while not ${condition}:`,
                `    time.sleep(0.02)`,
                `${branch}`
            ]
        }
        return code.join('\n');
    }

    Blockly.Powering['motion_arduino_for'] = function (block) {
        var a = Blockly.Powering.valueToCode(block, 'A', Blockly.Powering.ORDER_NONE);
        var b = Blockly.Powering.valueToCode(block, 'B', Blockly.Powering.ORDER_NONE);
        var c = Blockly.Powering.valueToCode(block, 'C', Blockly.Powering.ORDER_NONE);
        var variable = block.getFieldValue('VARIABLE') || 'i';
        var substack = Blockly.Powering.statementToCode(block, 'SUBSTACK');
        var v = Blockly.Powering.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        var code = [
            `for globalvals.${v} in range(${a}, ${b} + 1, ${c}):`,
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.Powering['control_mpython_each_project_for'] = function (block) {
        var substack = Blockly.Powering.statementToCode(block, 'SUBSTACK');
        var variable = block.getFieldValue('VARIABLE') || 'i';
        var v = Blockly.Powering.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        var code = [
            `for globalvals.${v} in []:\n` +
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.Powering['motion_arduino_break'] = function (block) {
        return 'break\n';
    }

    Blockly.Powering['control_if'] = function (block) {
        var condition = Blockly.Powering.valueToCode(block, 'CONDITION', Blockly.Powering.ORDER_NONE) || 'False';
        var substack = Blockly.Powering.statementToCode(block, 'SUBSTACK') || Blockly.Powering.PASS;
        var code = [
            `if ${condition}:`,
            `${substack}`,
        ]
        return code.join('\n');
    }

    Blockly.Powering['control_if_else'] = function (block) {
        var condition = Blockly.Powering.valueToCode(block, 'CONDITION', Blockly.Powering.ORDER_NONE) || 'False';
        var substack = Blockly.Powering.statementToCode(block, 'SUBSTACK') || Blockly.Powering.PASS;
        var substack2 = Blockly.Powering.statementToCode(block, 'SUBSTACK2') || Blockly.Powering.PASS;

        var code = [
            `if ${condition}:`,
            `${substack}else:`,
            `${substack2}`
        ];
        return code.join('\n');
    }

    Blockly.Powering['control_wait_until'] = function (block) {
        Blockly.Powering.definitions_['import_time'] = 'import time';
        var condition = Blockly.Powering.valueToCode(block, 'CONDITION', Blockly.Powering.ORDER_LOGICAL_NOT) || 'False';
        if (block.getNextBlock() === null) {
            var code = [
                `while not ${condition}:`,
                `    break`
            ]
        } else {
            var code = [
                `while not ${condition}:`,
                `    time.sleep(0.02)`,
            ]
        }

        return code.join('\n') + '\n';
    }

    /**
     * operators
     */
    Blockly.Powering['operator_add'] = function (block) {
        var num1 = Blockly.Powering.valueToCode(block, 'NUM1', Blockly.Powering.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Powering.valueToCode(block, 'NUM2', Blockly.Powering.ORDER_ATOMIC) || 0;
        var code = `${num1} + ${num2}`;
        return [code, Blockly.Powering.ORDER_UNARY_SIGN];
    }

    Blockly.Powering['operator_subtract'] = function (block) {
        var num1 = Blockly.Powering.valueToCode(block, 'NUM1', Blockly.Powering.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Powering.valueToCode(block, 'NUM2', Blockly.Powering.ORDER_ATOMIC) || 0;
        var code = `${num1} - ${num2}`;
        return [code, Blockly.Powering.ORDER_UNARY_SIGN];
    }

    Blockly.Powering['operator_multiply'] = function (block) {
        var num1 = Blockly.Powering.valueToCode(block, 'NUM1', Blockly.Powering.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Powering.valueToCode(block, 'NUM2', Blockly.Powering.ORDER_ATOMIC) || 0;
        var code = `${num1} * ${num2}`;
        return [code, Blockly.Powering.ORDER_MULTIPLICATIVE];
    }

    Blockly.Powering['operator_divide'] = function (block) {
        var num1 = Blockly.Powering.valueToCode(block, 'NUM1', Blockly.Powering.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Powering.valueToCode(block, 'NUM2', Blockly.Powering.ORDER_ATOMIC) || 0;
        var code = `${num1} / ${num2}`;
        return [code, Blockly.Powering.ORDER_MULTIPLICATIVE];
    }

    Blockly.Powering['operator_random'] = function (block) {
        Blockly.Powering.definitions_['import_random'] = 'import random';
        var from = Blockly.Powering.valueToCode(block, 'FROM', Blockly.Powering.ORDER_NONE) || 0;
        var to = Blockly.Powering.valueToCode(block, 'TO', Blockly.Powering.ORDER_NONE) || 0;
        var code = `random.randint(int(${from}), int(${to}))`;
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['operator_gt'] = function (block) {
        var operator1 = Blockly.Powering.valueToCode(block, 'OPERAND1', Blockly.Powering.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Powering.valueToCode(block, 'OPERAND2', Blockly.Powering.ORDER_RELATIONAL) || 0;
        var code = `${operator1} > ${operator2}`;
        return [code, Blockly.Powering.ORDER_RELATIONAL];
    }

    Blockly.Powering['operator_lt'] = function (block) {
        var operator1 = Blockly.Powering.valueToCode(block, 'OPERAND1', Blockly.Powering.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Powering.valueToCode(block, 'OPERAND2', Blockly.Powering.ORDER_RELATIONAL) || 0;
        var code = `${operator1} < ${operator2}`;
        return [code, Blockly.Powering.ORDER_RELATIONAL];
    }

    Blockly.Powering['operator_equals'] = function (block) {
        var operator1 = Blockly.Powering.valueToCode(block, 'OPERAND1', Blockly.Powering.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Powering.valueToCode(block, 'OPERAND2', Blockly.Powering.ORDER_RELATIONAL) || 0;
        var code = `${operator1} == ${operator2}`;
        return [code, Blockly.Powering.ORDER_RELATIONAL];
    }

    Blockly.Powering['operator_gt_equals'] = function (block) {
        var argument0 = Blockly.Powering.valueToCode(block, 'OPERAND1', Blockly.Powering.ORDER_NONE);
        if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
          argument0 = argument0.replace(/"/g, '');
        }
        var argument1 = Blockly.Powering.valueToCode(block, 'OPERAND2', Blockly.Powering.ORDER_NONE);
        if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
          argument1 = argument1.replace(/"/g, '');
        }
        var code = argument0 + ' >= ' + argument1;
        return [code, Blockly.Powering.ORDER_RELATIONAL];
      };

    Blockly.Powering['operator_lt_equals'] = function (block) {
        var argument0 = Blockly.Powering.valueToCode(block, 'OPERAND1', Blockly.Powering.ORDER_ATOMIC);
        if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
          argument0 = argument0.replace(/"/g, '');
        }
        var argument1 = Blockly.Powering.valueToCode(block, 'OPERAND2', Blockly.Powering.ORDER_ATOMIC);
        if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
          argument1 = argument1.replace(/"/g, '');
        }
        var code = argument0 + ' <= ' + argument1;
        return [code, Blockly.Powering.ORDER_RELATIONAL];
      };

    Blockly.Powering['operator_not_equals'] = function (block) {
        var argument0 = Blockly.Powering.valueToCode(block, 'OPERAND1', Blockly.Powering.ORDER_ATOMIC);
        if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
          argument0 = argument0.replace(/"/g, '');
        }
        var argument1 = Blockly.Powering.valueToCode(block, 'OPERAND2', Blockly.Powering.ORDER_ATOMIC);
        if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
          argument1 = argument1.replace(/"/g, '');
        }
        var code = argument0 + ' != ' + argument1;
        return [code, Blockly.Powering.ORDER_EQUALITY];
      };

    Blockly.Powering['operator_and'] = function (block) {
        var operator1 = Blockly.Powering.valueToCode(block, 'OPERAND1', Blockly.Powering.ORDER_LOGICAL_AND) || 'False';
        var operator2 = Blockly.Powering.valueToCode(block, 'OPERAND2', Blockly.Powering.ORDER_LOGICAL_AND) || 'False';
        var code = `${operator1} and ${operator2}`;
        return [code, Blockly.Powering.ORDER_LOGICAL_AND];
    }

    Blockly.Powering['operator_or'] = function (block) {
        var operator1 = Blockly.Powering.valueToCode(block, 'OPERAND1', Blockly.Powering.ORDER_LOGICAL_OR) || 'False';
        var operator2 = Blockly.Powering.valueToCode(block, 'OPERAND2', Blockly.Powering.ORDER_LOGICAL_OR) || 'False';
        var code = `${operator1} or ${operator2}`;
        return [code, Blockly.Powering.ORDER_LOGICAL_OR];
    }

    Blockly.Powering['operator_not'] = function (block) {
        var operator = Blockly.Powering.valueToCode(block, 'OPERAND', Blockly.Powering.ORDER_LOGICAL_NOT) || 'True';
        var code = `not ${operator}`;
        return [code, Blockly.Powering.ORDER_LOGICAL_NOT];
    }

    Blockly.Powering['operators_mpython_get_type_'] = function (block) {
        var v = Blockly.Powering.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_LOGICAL_NOT);
        var code = `type(${v})`;
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['operators_mpython_judge_type'] = function (block) {
        var v = Blockly.Powering.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_LOGICAL_NOT);
        var type = block.getFieldValue('KEY');
        var code = `type(${v}) == ${type}`;
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['operator_mod'] = function (block) {
        var num1 = Blockly.Powering.valueToCode(block, 'NUM1', Blockly.Powering.ORDER_NONE) || 0;
        var num2 = Blockly.Powering.valueToCode(block, 'NUM2', Blockly.Powering.ORDER_NONE) || 0;
        var code = `${num1} % ${num2}`;
        return [code, Blockly.Powering.ORDER_MULTIPLICATIVE];
    }

    Blockly.Powering['operators_mpython_mod_int'] = function (block) {
        var num1 = Blockly.Powering.valueToCode(block, 'NUM1', Blockly.Powering.ORDER_NONE) || 0;
        var num2 = Blockly.Powering.valueToCode(block, 'NUM2', Blockly.Powering.ORDER_NONE) || 0;
        var code = `${num1} // ${num2}`;
        return [code, Blockly.Powering.ORDER_MULTIPLICATIVE];
    }

    Blockly.Powering['operator_round'] = function (block) {
        var num = Blockly.Powering.valueToCode(block, 'NUM', Blockly.Powering.ORDER_NONE) || 0;
        var code = `round(${num})`;
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['operator_mathop'] = function (block) {
        var opeerator = block.getFieldValue('OPERATOR');
        var num = Blockly.Powering.valueToCode(block, 'NUM', Blockly.Powering.ORDER_NONE) || 0;
        Blockly.Powering.definitions_['import_math'] = 'import math';
        var opt = '';
        switch (opeerator) {
            case 'abs': opt = 'fabs'; break;
            case 'floor': opt = 'floor'; break;
            case 'ceiling': opt = 'ceil'; break;
            case 'sqrt': opt = 'sqrt'; break;
            case 'sin': opt = 'sin'; break;
            case 'cos': opt = 'cos'; break;
            case 'tan': opt = 'tan'; break;
            case 'asin': opt = 'asin'; break;
            case 'acos': opt = 'acos'; break;
            case 'atan': opt = 'atan'; break;
            case 'ln': opt = 'log'; break;
            case 'log': opt = 'log10'; break;
            case 'e ^': opt = 'exp'; break;
            case '10 ^': opt = 'exp'; break;

        }
        var code = '';
        if(opeerator == 'abs'){
            code = `int(math.fabs(${num}))`
        }else{
            code = `math.${opt}(${num})`;
        }
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['operators_mpython_get_const'] = function (block) {
        Blockly.Powering.definitions_['import_math'] = 'import math';
        var v = block.getFieldValue('KEY');
        console.log(v)
        return [`${v}`, Blockly.Powering.ORDER_ATOMIC];
    };

    Blockly.Powering['operators_mpython_judge_result'] = function (block) {
        var v = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_ATOMIC);
        var d = block.getFieldValue('KEY');
        return [`${v}${d}`, Blockly.Powering.ORDER_ATOMIC];
    };

    Blockly.Powering['operators_mpython_keep_two_decimals'] = function (block) {
        var v = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_ATOMIC);
        var r = Blockly.Arduino.valueToCode(block, 'RESULT', Blockly.Powering.ORDER_ATOMIC);
        return [`round(${v}, ${r})`, Blockly.Powering.ORDER_ATOMIC];
    };

    Blockly.Powering['operators_mpython_limit_range'] = function (block) {
        var v = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_ATOMIC);
        var s = Blockly.Arduino.valueToCode(block, 'START', Blockly.Powering.ORDER_ATOMIC);
        var e = Blockly.Arduino.valueToCode(block, 'END', Blockly.Powering.ORDER_ATOMIC);
        return [`min(max(${v}, ${s}), ${e})`, Blockly.Powering.ORDER_ATOMIC];
    };
    Blockly.Powering['operators_mpython_mapping_range'] = function (block) {
        var v = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_ATOMIC);
        var s1 = Blockly.Arduino.valueToCode(block, 'START1', Blockly.Powering.ORDER_ATOMIC);
        var s2 = Blockly.Arduino.valueToCode(block, 'START2', Blockly.Powering.ORDER_ATOMIC);
        var e1 = Blockly.Arduino.valueToCode(block, 'END1', Blockly.Powering.ORDER_ATOMIC);
        var e2 = Blockly.Arduino.valueToCode(block, 'END2', Blockly.Powering.ORDER_ATOMIC);
        return [`numberMap(${v},${s1},${s2},${e1},${e2})`, Blockly.Powering.ORDER_ATOMIC];
    };

    Blockly.Powering['operators_mpython_conversion_type'] = function (block) {
        var d = block.getFieldValue('TYPE');
        return [`${d}()`, Blockly.Powering.ORDER_ATOMIC];
    };

    Blockly.Powering['operator_arduino_itoa'] = function (block) {
        // Blockly.Powering.definitions_['var_itoa_string'] = `char itoaString[64];`;
        var value = Blockly.Powering.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_ATOMIC);
        // var code =`itoa(${value}, itoaString, 10)`;
        return [`${value}.decode('UTF-8','ignore')`, Blockly.Powering.ORDER_ATOMIC];
    };

    Blockly.Powering['operator_join'] = function (block) {
        var str1 = Blockly.Powering.valueToCode(block, 'STRING1', Blockly.Powering.ORDER_NONE) || '';
        var str2 = Blockly.Powering.valueToCode(block, 'STRING2', Blockly.Powering.ORDER_NONE) || '';
        var code = `str(${str1}) + str(${str2})`;
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }
 
    Blockly.Powering['operator_letter_of'] = function (block) {
        var letter = Blockly.Powering.valueToCode(block, 'LETTER', Blockly.Powering.ORDER_NONE) || 0;
        var str = Blockly.Powering.valueToCode(block, 'STRING', Blockly.Powering.ORDER_NONE) || '';
        var code = `str(${str})[${letter}]`;
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['operator_length'] = function (block) {
        var str = Blockly.Powering.valueToCode(block, 'STRING', Blockly.Powering.ORDER_NONE) || '';
        var code = `len(${str})`;
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['operator_contains'] = function (block) {
        var str1 = Blockly.Powering.valueToCode(block, 'STRING1', Blockly.Powering.ORDER_NONE) || '';
        var str2 = Blockly.Powering.valueToCode(block, 'STRING2', Blockly.Powering.ORDER_NONE) || '';
        var code = `str(${str1}).find(str(${str2})) > -1`;
        return [code, Blockly.Powering.ORDER_ATOMIC];
    }

    /**
     * variables
     */
    Blockly.Powering['data_variable'] = function (block) {
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Powering.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return [`globalvals.${varName}`, Blockly.Powering.ORDER_ATOMIC];
    };

    Blockly.Powering['data_setvariableto'] = function (block) {
        var value = Blockly.Powering.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_ATOMIC);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Powering.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} = ${value}\n`;
    };

    Blockly.Powering['data_changevariableby'] = function (block) {
        var value = Blockly.Powering.valueToCode(block, 'VALUE', Blockly.Powering.ORDER_ASSIGNMENT);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Powering.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} += ${value}\n`;
    };

    Blockly.Powering['data_showvariable'] = function (block) {
        return `\n`;
    };

    Blockly.Powering['data_hidevariable'] = function (block) {
        return `\n`;
    };


    /**
     * myblocks
     */
    Blockly.Powering['procedures_call'] = function (block) {
        let defineBlock = Blockly.Procedures.getDefineBlock(block.getProcCode(), block.workspace);
        if(!defineBlock) return '';
        let childBlocks = block.childBlocks_ || [];
        let params = []
        for (let x = 0, block_; block_ = childBlocks[x]; x++) {
            let codeArgs = Blockly.Powering.blockToCode(block_);
            if (codeArgs.constructor == Array) {
                params.push(codeArgs[0])
            }
        }
        return `${defineBlock.funcName}(${params.join(',')})\n`;
    }

    Blockly.Powering['procedures_definition'] = function (block) {
        let childBlocks = block.childBlocks_ || [];
        let params = []
        let funcName = Blockly.Powering.variableDB_.getDistinctName(`definition_fun`, Blockly.Variables.NAME_TYPE);
        for (let x = 0, block_; block_ = childBlocks[0].childBlocks_[x]; x++) {
            let value = block_.getFieldValue('VALUE') || '';
            let argName = Blockly.Powering.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || 'aa';
            params.push(argName);
        }
        var code = [
            `def ${funcName}(${params.join(',')}):`,
            `    pass`
        ]

        block.category_ = "events";
        block.funcName = funcName;
        return code.join('\n') + '\n';
    }

    Blockly.Powering['argument_reporter_string_number'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.Powering.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || '0';
        return [argName, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['argument_reporter_boolean'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.Powering.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || 'false';
        return [argName, Blockly.Powering.ORDER_ATOMIC];
    }

}