export default Blockly => {

    Blockly.MPython['text'] = function (block) {
        var code = block.getFieldValue('TEXT');
        return [`"${code}"`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['math_number'] = function (block) {
        var code = parseFloat(block.getFieldValue('NUM') || '0');
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['math_number_for_plotter_print'] = function (block) {
        var code = block.getFieldValue('NUM') || '"null"';
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['math_whole_number'] = Blockly.MPython['math_number'];
    Blockly.MPython['math_positive_number'] = Blockly.MPython['math_number'];
    Blockly.MPython['math_angle'] = Blockly.MPython['math_number'];
    Blockly.MPython['math_integer'] = Blockly.MPython['math_number'];

    Blockly.MPython['colour_picker'] = function (block) {
        var color = block.getFieldValue('COLOUR');
        return [`"${color}"`, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['math_cc_number'] = Blockly.MPython['math_number'];
    Blockly.MPython['math_cc_time_number'] = Blockly.MPython['math_number'];
    Blockly.MPython['math_cc_positive_whole_number'] = Blockly.MPython['math_number'];
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
        Blockly.MPython[`math_cc_min_${item.min}_max_${item.max}_number`] = Blockly.MPython['math_number'];
    }

    /**
     * control
     */
    Blockly.MPython['control_mpython_print'] = function (block) {
        var value = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC) || 0;
        console.log(value)
        return `print(${value})\n`;
    }

    Blockly.MPython['control_wait'] = function (block) {
        var duration = Blockly.MPython.valueToCode(block, 'DURATION', Blockly.MPython.ORDER_NONE);
        Blockly.MPython.definitions_['import_time'] = 'import time';
        return `time.sleep(${duration})\n`;
    }

    Blockly.MPython['control_repeat'] = function (block) {
        Blockly.MPython.definitions_['import_time'] = 'import time';
        var times = Blockly.MPython.valueToCode(block, 'TIMES', Blockly.MPython.ORDER_NONE);
        var substack = Blockly.MPython.statementToCode(block, 'SUBSTACK') || Blockly.MPython.PASS;
        var code = [
            `for count in range(${times}):`,
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.MPython['control_forever'] = function (block) {
        Blockly.MPython.definitions_['import_time'] = 'import time';
        var substack = Blockly.MPython.statementToCode(block, 'SUBSTACK') || Blockly.MPython.PASS;
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

    Blockly.MPython['control_repeat_until'] = function (block) {
        Blockly.MPython.definitions_['import_time'] = 'import time';
        var condition = Blockly.MPython.valueToCode(block, 'CONDITION', Blockly.MPython.ORDER_LOGICAL_NOT) || 'False';
        var branch = Blockly.MPython.statementToCode(block, 'SUBSTACK') || Blockly.MPython.PASS;
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

    Blockly.MPython['motion_arduino_for'] = function (block) {
        var a = Blockly.MPython.valueToCode(block, 'A', Blockly.MPython.ORDER_NONE);
        var b = Blockly.MPython.valueToCode(block, 'B', Blockly.MPython.ORDER_NONE);
        var c = Blockly.MPython.valueToCode(block, 'C', Blockly.MPython.ORDER_NONE);
        var variable = block.getFieldValue('VARIABLE') || 'i';
        var substack = Blockly.MPython.statementToCode(block, 'SUBSTACK');
        var v = Blockly.MPython.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        var code = [
            `for globalvals.${v} in range(${a}, ${b} + 1, ${c}):`,
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.MPython['control_mpython_each_project_for'] = function (block) {
        var substack = Blockly.MPython.statementToCode(block, 'SUBSTACK');
        var variable = block.getFieldValue('VARIABLE') || 'i';
        var v = Blockly.MPython.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        var code = [
            `for globalvals.${v} in []:\n` +
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.MPython['motion_arduino_break'] = function (block) {
        return 'break\n';
    }

    Blockly.MPython['control_if'] = function (block) {
        var condition = Blockly.MPython.valueToCode(block, 'CONDITION', Blockly.MPython.ORDER_NONE) || 'False';
        var substack = Blockly.MPython.statementToCode(block, 'SUBSTACK') || Blockly.MPython.PASS;
        var code = [
            `if ${condition}:`,
            `${substack}`,
        ]
        return code.join('\n');
    }

    Blockly.MPython['control_if_else'] = function (block) {
        var condition = Blockly.MPython.valueToCode(block, 'CONDITION', Blockly.MPython.ORDER_NONE) || 'False';
        var substack = Blockly.MPython.statementToCode(block, 'SUBSTACK') || Blockly.MPython.PASS;
        var substack2 = Blockly.MPython.statementToCode(block, 'SUBSTACK2') || Blockly.MPython.PASS;

        var code = [
            `if ${condition}:`,
            `${substack}else:`,
            `${substack2}`
        ];
        return code.join('\n');
    }

    Blockly.MPython['control_wait_until'] = function (block) {
        Blockly.MPython.definitions_['import_time'] = 'import time';
        var condition = Blockly.MPython.valueToCode(block, 'CONDITION', Blockly.MPython.ORDER_LOGICAL_NOT) || 'False';
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
    Blockly.MPython['operator_add'] = function (block) {
        var num1 = Blockly.MPython.valueToCode(block, 'NUM1', Blockly.MPython.ORDER_ATOMIC) || 0;
        var num2 = Blockly.MPython.valueToCode(block, 'NUM2', Blockly.MPython.ORDER_ATOMIC) || 0;
        var code = `${num1} + ${num2}`;
        return [code, Blockly.MPython.ORDER_UNARY_SIGN];
    }

    Blockly.MPython['operator_subtract'] = function (block) {
        var num1 = Blockly.MPython.valueToCode(block, 'NUM1', Blockly.MPython.ORDER_ATOMIC) || 0;
        var num2 = Blockly.MPython.valueToCode(block, 'NUM2', Blockly.MPython.ORDER_ATOMIC) || 0;
        var code = `${num1} - ${num2}`;
        return [code, Blockly.MPython.ORDER_UNARY_SIGN];
    }

    Blockly.MPython['operator_multiply'] = function (block) {
        var num1 = Blockly.MPython.valueToCode(block, 'NUM1', Blockly.MPython.ORDER_ATOMIC) || 0;
        var num2 = Blockly.MPython.valueToCode(block, 'NUM2', Blockly.MPython.ORDER_ATOMIC) || 0;
        var code = `${num1} * ${num2}`;
        return [code, Blockly.MPython.ORDER_MULTIPLICATIVE];
    }

    Blockly.MPython['operator_divide'] = function (block) {
        var num1 = Blockly.MPython.valueToCode(block, 'NUM1', Blockly.MPython.ORDER_ATOMIC) || 0;
        var num2 = Blockly.MPython.valueToCode(block, 'NUM2', Blockly.MPython.ORDER_ATOMIC) || 0;
        var code = `${num1} / ${num2}`;
        return [code, Blockly.MPython.ORDER_MULTIPLICATIVE];
    }

    Blockly.MPython['operator_random'] = function (block) {
        Blockly.MPython.definitions_['import_random'] = 'import random';
        var from = Blockly.MPython.valueToCode(block, 'FROM', Blockly.MPython.ORDER_NONE) || 0;
        var to = Blockly.MPython.valueToCode(block, 'TO', Blockly.MPython.ORDER_NONE) || 0;
        var code = `random.randint(int(${from}), int(${to}))`;
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['operator_gt'] = function (block) {
        var operator1 = Blockly.MPython.valueToCode(block, 'OPERAND1', Blockly.MPython.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.MPython.valueToCode(block, 'OPERAND2', Blockly.MPython.ORDER_RELATIONAL) || 0;
        var code = `${operator1} > ${operator2}`;
        return [code, Blockly.MPython.ORDER_RELATIONAL];
    }

    Blockly.MPython['operator_lt'] = function (block) {
        var operator1 = Blockly.MPython.valueToCode(block, 'OPERAND1', Blockly.MPython.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.MPython.valueToCode(block, 'OPERAND2', Blockly.MPython.ORDER_RELATIONAL) || 0;
        var code = `${operator1} < ${operator2}`;
        return [code, Blockly.MPython.ORDER_RELATIONAL];
    }

    Blockly.MPython['operator_equals'] = function (block) {
        var operator1 = Blockly.MPython.valueToCode(block, 'OPERAND1', Blockly.MPython.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.MPython.valueToCode(block, 'OPERAND2', Blockly.MPython.ORDER_RELATIONAL) || 0;
        var code = `${operator1} == ${operator2}`;
        return [code, Blockly.MPython.ORDER_RELATIONAL];
    }

    Blockly.MPython['operator_gt_equals'] = function (block) {
        var argument0 = Blockly.MPython.valueToCode(block, 'OPERAND1', Blockly.MPython.ORDER_NONE);
        if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
          argument0 = argument0.replace(/"/g, '');
        }
        var argument1 = Blockly.MPython.valueToCode(block, 'OPERAND2', Blockly.MPython.ORDER_NONE);
        if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
          argument1 = argument1.replace(/"/g, '');
        }
        var code = argument0 + ' >= ' + argument1;
        return [code, Blockly.MPython.ORDER_RELATIONAL];
      };

    Blockly.MPython['operator_lt_equals'] = function (block) {
        var argument0 = Blockly.MPython.valueToCode(block, 'OPERAND1', Blockly.MPython.ORDER_ATOMIC);
        if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
          argument0 = argument0.replace(/"/g, '');
        }
        var argument1 = Blockly.MPython.valueToCode(block, 'OPERAND2', Blockly.MPython.ORDER_ATOMIC);
        if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
          argument1 = argument1.replace(/"/g, '');
        }
        var code = argument0 + ' <= ' + argument1;
        return [code, Blockly.MPython.ORDER_RELATIONAL];
      };

    Blockly.MPython['operator_not_equals'] = function (block) {
        var argument0 = Blockly.MPython.valueToCode(block, 'OPERAND1', Blockly.MPython.ORDER_ATOMIC);
        if (argument0 !== '""' && !isNaN(argument0.replace(/"/g, ''))) {
          argument0 = argument0.replace(/"/g, '');
        }
        var argument1 = Blockly.MPython.valueToCode(block, 'OPERAND2', Blockly.MPython.ORDER_ATOMIC);
        if (argument1 !== '""' && !isNaN(argument1.replace(/"/g, ''))) {
          argument1 = argument1.replace(/"/g, '');
        }
        var code = argument0 + ' != ' + argument1;
        return [code, Blockly.MPython.ORDER_EQUALITY];
      };

    Blockly.MPython['operator_and'] = function (block) {
        var operator1 = Blockly.MPython.valueToCode(block, 'OPERAND1', Blockly.MPython.ORDER_LOGICAL_AND) || 'False';
        var operator2 = Blockly.MPython.valueToCode(block, 'OPERAND2', Blockly.MPython.ORDER_LOGICAL_AND) || 'False';
        var code = `${operator1} and ${operator2}`;
        return [code, Blockly.MPython.ORDER_LOGICAL_AND];
    }

    Blockly.MPython['operator_or'] = function (block) {
        var operator1 = Blockly.MPython.valueToCode(block, 'OPERAND1', Blockly.MPython.ORDER_LOGICAL_OR) || 'False';
        var operator2 = Blockly.MPython.valueToCode(block, 'OPERAND2', Blockly.MPython.ORDER_LOGICAL_OR) || 'False';
        var code = `${operator1} or ${operator2}`;
        return [code, Blockly.MPython.ORDER_LOGICAL_OR];
    }

    Blockly.MPython['operator_not'] = function (block) {
        var operator = Blockly.MPython.valueToCode(block, 'OPERAND', Blockly.MPython.ORDER_LOGICAL_NOT) || 'True';
        var code = `not ${operator}`;
        return [code, Blockly.MPython.ORDER_LOGICAL_NOT];
    }

    Blockly.MPython['operators_mpython_get_type_'] = function (block) {
        var v = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_LOGICAL_NOT);
        var code = `type(${v})`;
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['operators_mpython_judge_type'] = function (block) {
        var v = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_LOGICAL_NOT);
        var type = block.getFieldValue('KEY');
        var code = `type(${v}) == ${type}`;
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['operator_mod'] = function (block) {
        var num1 = Blockly.MPython.valueToCode(block, 'NUM1', Blockly.MPython.ORDER_NONE) || 0;
        var num2 = Blockly.MPython.valueToCode(block, 'NUM2', Blockly.MPython.ORDER_NONE) || 0;
        var code = `${num1} % ${num2}`;
        return [code, Blockly.MPython.ORDER_MULTIPLICATIVE];
    }

    Blockly.MPython['operators_mpython_mod_int'] = function (block) {
        var num1 = Blockly.MPython.valueToCode(block, 'NUM1', Blockly.MPython.ORDER_NONE) || 0;
        var num2 = Blockly.MPython.valueToCode(block, 'NUM2', Blockly.MPython.ORDER_NONE) || 0;
        var code = `${num1} // ${num2}`;
        return [code, Blockly.MPython.ORDER_MULTIPLICATIVE];
    }

    Blockly.MPython['operator_round'] = function (block) {
        var num = Blockly.MPython.valueToCode(block, 'NUM', Blockly.MPython.ORDER_NONE) || 0;
        var code = `round(${num})`;
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['operator_mathop'] = function (block) {
        var opeerator = block.getFieldValue('OPERATOR');
        var num = Blockly.MPython.valueToCode(block, 'NUM', Blockly.MPython.ORDER_NONE) || 0;
        Blockly.MPython.definitions_['import_math'] = 'import math';
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
        var code = `math.${opt}(${num})`;

        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['operators_mpython_get_const'] = function (block) {
        Blockly.MPython.definitions_['import_math'] = 'import math';
        var v = block.getFieldValue('KEY');
        console.log(v)
        return [`${v}`, Blockly.MPython.ORDER_ATOMIC];
    };

    Blockly.MPython['operators_mpython_judge_result'] = function (block) {
        var v = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC);
        var d = block.getFieldValue('KEY');
        return [`${v}${d}`, Blockly.MPython.ORDER_ATOMIC];
    };

    Blockly.MPython['operators_mpython_keep_two_decimals'] = function (block) {
        var v = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC);
        var r = Blockly.Arduino.valueToCode(block, 'RESULT', Blockly.MPython.ORDER_ATOMIC);
        return [`round(${v}, ${r})`, Blockly.MPython.ORDER_ATOMIC];
    };

    Blockly.MPython['operators_mpython_limit_range'] = function (block) {
        var v = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC);
        var s = Blockly.Arduino.valueToCode(block, 'START', Blockly.MPython.ORDER_ATOMIC);
        var e = Blockly.Arduino.valueToCode(block, 'END', Blockly.MPython.ORDER_ATOMIC);
        return [`min(max(${v}, ${s}), ${e})`, Blockly.MPython.ORDER_ATOMIC];
    };
    Blockly.MPython['operators_mpython_mapping_range'] = function (block) {
        var v = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC);
        var s1 = Blockly.Arduino.valueToCode(block, 'START1', Blockly.MPython.ORDER_ATOMIC);
        var s2 = Blockly.Arduino.valueToCode(block, 'START2', Blockly.MPython.ORDER_ATOMIC);
        var e1 = Blockly.Arduino.valueToCode(block, 'END1', Blockly.MPython.ORDER_ATOMIC);
        var e2 = Blockly.Arduino.valueToCode(block, 'END2', Blockly.MPython.ORDER_ATOMIC);
        return [`numberMap(${v},${s1},${s2},${e1},${e2})`, Blockly.MPython.ORDER_ATOMIC];
    };

    Blockly.MPython['operators_mpython_conversion_type'] = function (block) {
        var d = block.getFieldValue('TYPE');
        return [`${d}()`, Blockly.MPython.ORDER_ATOMIC];
    };

    Blockly.MPython['operator_arduino_itoa'] = function (block) {
        // Blockly.MPython.definitions_['var_itoa_string'] = `char itoaString[64];`;
        var value = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC);
        // var code =`itoa(${value}, itoaString, 10)`;
        return [`${value}.decode('UTF-8','ignore')`, Blockly.MPython.ORDER_ATOMIC];
    };

    Blockly.MPython['operator_join'] = function (block) {
        var str1 = Blockly.MPython.valueToCode(block, 'STRING1', Blockly.MPython.ORDER_NONE) || '';
        var str2 = Blockly.MPython.valueToCode(block, 'STRING2', Blockly.MPython.ORDER_NONE) || '';
        var code = `str(${str1}) + str(${str2})`;
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }
 
    Blockly.MPython['operator_letter_of'] = function (block) {
        var letter = Blockly.MPython.valueToCode(block, 'LETTER', Blockly.MPython.ORDER_NONE) || 0;
        var str = Blockly.MPython.valueToCode(block, 'STRING', Blockly.MPython.ORDER_NONE) || '';
        var code = `str(${str})[${letter}]`;
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['operator_length'] = function (block) {
        var str = Blockly.MPython.valueToCode(block, 'STRING', Blockly.MPython.ORDER_NONE) || '';
        var code = `len(${str})`;
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['operator_contains'] = function (block) {
        var str1 = Blockly.MPython.valueToCode(block, 'STRING1', Blockly.MPython.ORDER_NONE) || '';
        var str2 = Blockly.MPython.valueToCode(block, 'STRING2', Blockly.MPython.ORDER_NONE) || '';
        var code = `str(${str1}).find(str(${str2})) > -1`;
        return [code, Blockly.MPython.ORDER_ATOMIC];
    }

    /**
     * variables
     */
    Blockly.MPython['data_variable'] = function (block) {
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.MPython.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return [`globalvals.${varName}`, Blockly.MPython.ORDER_ATOMIC];
    };

    Blockly.MPython['data_setvariableto'] = function (block) {
        var value = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.MPython.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} = ${value}\n`;
    };

    Blockly.MPython['data_changevariableby'] = function (block) {
        var value = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ASSIGNMENT);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.MPython.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} += ${value}\n`;
    };

    Blockly.MPython['data_showvariable'] = function (block) {
        return `\n`;
    };

    Blockly.MPython['data_hidevariable'] = function (block) {
        return `\n`;
    };


    /**
     * myblocks
     */
    Blockly.MPython['procedures_call'] = function (block) {
        let defineBlock = Blockly.Procedures.getDefineBlock(block.getProcCode(), block.workspace);
        if(!defineBlock) return '';
        let childBlocks = block.childBlocks_ || [];
        let params = []
        for (let x = 0, block_; block_ = childBlocks[x]; x++) {
            let codeArgs = Blockly.MPython.blockToCode(block_);
            if (codeArgs.constructor == Array) {
                params.push(codeArgs[0])
            }
        }
        return `${defineBlock.funcName}(${params.join(',')})\n`;
    }

    Blockly.MPython['procedures_definition'] = function (block) {
        let childBlocks = block.childBlocks_ || [];
        let params = []
        let funcName = Blockly.MPython.variableDB_.getDistinctName(`definition_fun`, Blockly.Variables.NAME_TYPE);
        for (let x = 0, block_; block_ = childBlocks[0].childBlocks_[x]; x++) {
            let value = block_.getFieldValue('VALUE') || '';
            let argName = Blockly.MPython.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || 'aa';
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

    Blockly.MPython['argument_reporter_string_number'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.MPython.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || '0';
        return [argName, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['argument_reporter_boolean'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.MPython.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || 'false';
        return [argName, Blockly.MPython.ORDER_ATOMIC];
    }

    Blockly.MPython['motion_mpython_print'] = function (block) {
        var args0 = Blockly.MPython.valueToCode(block, 'ARGS_0', Blockly.MPython.ORDER_NONE) || 'null';
        var args1 = Blockly.MPython.valueToCode(block, 'ARGS_1', Blockly.MPython.ORDER_NONE) || 'null';
        var args2 = Blockly.MPython.valueToCode(block, 'ARGS_2', Blockly.MPython.ORDER_NONE) || 'null';
        var args3 = Blockly.MPython.valueToCode(block, 'ARGS_3', Blockly.MPython.ORDER_NONE) || 'null';
        var args4 = Blockly.MPython.valueToCode(block, 'ARGS_4', Blockly.MPython.ORDER_NONE) || 'null';
        return `print((${args0}, ${args1}, ${args2}, ${args3}, ${args4}))\n`;
    }
}