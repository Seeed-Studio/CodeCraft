export default Blockly => {

    Blockly.Maixduino['text'] = function (block) {
        var code = block.getFieldValue('TEXT');
        return [`"${code}"`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['math_number'] = function (block) {
        var code = parseFloat(block.getFieldValue('NUM') || '0');
        return [code, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['math_number_for_plotter_print'] = function (block) {
        var code = block.getFieldValue('NUM') || '"null"';
        return [code, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['math_whole_number'] = Blockly.Maixduino['math_number'];
    Blockly.Maixduino['math_positive_number'] = Blockly.Maixduino['math_number'];
    Blockly.Maixduino['math_angle'] = Blockly.Maixduino['math_number'];
    Blockly.Maixduino['math_integer'] = Blockly.Maixduino['math_number'];

    Blockly.Maixduino['colour_picker'] = function (block) {
        var color = block.getFieldValue('COLOUR');
        return [`"${color}"`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['math_cc_number'] = Blockly.Maixduino['math_number'];
    Blockly.Maixduino['math_cc_time_number'] = Blockly.Maixduino['math_number'];
    Blockly.Maixduino['math_cc_positive_whole_number'] = Blockly.Maixduino['math_number'];
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
        Blockly.Maixduino[`math_cc_min_${item.min}_max_${item.max}_number`] = Blockly.Maixduino['math_number'];
    }

    /**
     * control
     */
    Blockly.Maixduino['control_wait'] = function (block) {
        var duration = Blockly.Maixduino.valueToCode(block, 'DURATION', Blockly.Maixduino.ORDER_NONE);
        Blockly.Maixduino.definitions_['import_time'] = 'import time';
        return `time.sleep(${duration})\n`;
    }

    Blockly.Maixduino['motion_arduino_delay_ms'] = function (block) {
        var time = Blockly.Maixduino.valueToCode(block, 'TIME', Blockly.Maixduino.ORDER_ATOMIC);
        Blockly.Maixduino.definitions_['import_utime'] = 'import utime';
        var code = `utime.sleep_ms(${time})\n`;
        return code;
    }

    Blockly.Maixduino['motion_arduino_delay_us'] = function (block) {
        var time = Blockly.Maixduino.valueToCode(block, 'TIME', Blockly.Maixduino.ORDER_ATOMIC);
        Blockly.Maixduino.definitions_['import_utime'] = 'import utime';
        var code = `utime.sleep_us(${time})\n`;
        return code;
    }

    Blockly.Maixduino['motion_arduino_break'] = function (block) {
        return 'break\n';
    }

    Blockly.Maixduino['motion_arduino_keep_wait'] = function (block) {
        var code = [
            `while True:`,
            `    time.sleep(0.02)`,
        ]
        return code.join('\n') + "\n";
    }

    Blockly.Maixduino['motion_arduino_for'] = function (block) {
        var a = Blockly.Maixduino.valueToCode(block, 'A', Blockly.Maixduino.ORDER_NONE);
        var b = Blockly.Maixduino.valueToCode(block, 'B', Blockly.Maixduino.ORDER_NONE);
        var c = Blockly.Maixduino.valueToCode(block, 'C', Blockly.Maixduino.ORDER_NONE);
        var variable = block.getFieldValue('VARIABLE') || 'i';
        var substack = Blockly.Maixduino.statementToCode(block, 'SUBSTACK');
        var v = Blockly.Maixduino.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        var code = [
            `for globalvals.${v} in range(${a}, ${b} + 1, ${c}):`,
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }
    
    Blockly.Maixduino['control_repeat'] = function (block) {
        Blockly.Maixduino.definitions_['import_time'] = 'import time';
        var times = Blockly.Maixduino.valueToCode(block, 'TIMES', Blockly.Maixduino.ORDER_NONE);
        var substack = Blockly.Maixduino.statementToCode(block, 'SUBSTACK') || Blockly.Maixduino.PASS;
        var code = [
            `for count in range(${times}):`,
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.Maixduino['control_forever'] = function (block) {
        Blockly.Maixduino.definitions_['import_time'] = 'import time';
        var substack = Blockly.Maixduino.statementToCode(block, 'SUBSTACK') || Blockly.Maixduino.PASS;
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

    Blockly.Maixduino['control_if'] = function (block) {
        var condition = Blockly.Maixduino.valueToCode(block, 'CONDITION', Blockly.Maixduino.ORDER_NONE) || 'False';
        var substack = Blockly.Maixduino.statementToCode(block, 'SUBSTACK') || Blockly.Maixduino.PASS;
        var code = [
            `if ${condition}:`,
            `${substack}`,
        ]
        return code.join('\n');
    }

    Blockly.Maixduino['control_if_else'] = function (block) {
        var condition = Blockly.Maixduino.valueToCode(block, 'CONDITION', Blockly.Maixduino.ORDER_NONE) || 'False';
        var substack = Blockly.Maixduino.statementToCode(block, 'SUBSTACK') || Blockly.Maixduino.PASS;
        var substack2 = Blockly.Maixduino.statementToCode(block, 'SUBSTACK2') || Blockly.Maixduino.PASS;

        var code = [
            `if ${condition}:`,
            `${substack}else:`,
            `${substack2}`
        ];
        return code.join('\n');
    }

    Blockly.Maixduino['control_wait_until'] = function (block) {
        Blockly.Maixduino.definitions_['import_time'] = 'import time';
        var condition = Blockly.Maixduino.valueToCode(block, 'CONDITION', Blockly.Maixduino.ORDER_LOGICAL_NOT) || 'False';
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

    Blockly.Maixduino['control_repeat_until'] = function (block) {
        Blockly.Maixduino.definitions_['import_time'] = 'import time';
        var condition = Blockly.Maixduino.valueToCode(block, 'CONDITION', Blockly.Maixduino.ORDER_LOGICAL_NOT) || 'False';
        var branch = Blockly.Maixduino.statementToCode(block, 'SUBSTACK') || Blockly.Maixduino.PASS;
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

    /**
     * operators
     */
    Blockly.Maixduino['operator_add'] = function (block) {
        var num1 = Blockly.Maixduino.valueToCode(block, 'NUM1', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Maixduino.valueToCode(block, 'NUM2', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var code = `${num1} + ${num2}`;
        return [code, Blockly.Maixduino.ORDER_UNARY_SIGN];
    }

    Blockly.Maixduino['operator_subtract'] = function (block) {
        var num1 = Blockly.Maixduino.valueToCode(block, 'NUM1', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Maixduino.valueToCode(block, 'NUM2', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var code = `${num1} - ${num2}`;
        return [code, Blockly.Maixduino.ORDER_UNARY_SIGN];
    }

    Blockly.Maixduino['operator_multiply'] = function (block) {
        var num1 = Blockly.Maixduino.valueToCode(block, 'NUM1', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Maixduino.valueToCode(block, 'NUM2', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var code = `${num1} * ${num2}`;
        return [code, Blockly.Maixduino.ORDER_MULTIPLICATIVE];
    }

    Blockly.Maixduino['operator_divide'] = function (block) {
        var num1 = Blockly.Maixduino.valueToCode(block, 'NUM1', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Maixduino.valueToCode(block, 'NUM2', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var code = `${num1} / ${num2}`;
        return [code, Blockly.Maixduino.ORDER_MULTIPLICATIVE];
    }

    Blockly.Maixduino['operator_random'] = function (block) {
        Blockly.Maixduino.definitions_['import_random'] = 'import random';
        Blockly.Maixduino.definitions_['var_random'] =
            'def random_float_or_int(a, b):\n' +
            '    type_a = type(a)\n' +
            '    type_b = type(b)\n' +
            '    type_accept = [type(1), type(1.0)]\n' +
            '    if (not type_a in type_accept) or (not type_b in type_accept):\n' +
            '        return random.random()\n' +
            '    elif ((not isinstance(a, int)) or (not isinstance(b, int))):\n' +
            '        return random.uniform(a, b)\n' +
            '    elif isinstance(a, int) and isinstance(b, int):\n' +
            '        return random.randint(a, b)\n';
        var from = Blockly.Maixduino.valueToCode(block, 'FROM', Blockly.Maixduino.ORDER_NONE) || 0;
        var to = Blockly.Maixduino.valueToCode(block, 'TO', Blockly.Maixduino.ORDER_NONE) || 0;
        return [`random_float_or_int(${from}, ${to})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['operator_gt'] = function (block) {
        var operator1 = Blockly.Maixduino.valueToCode(block, 'OPERAND1', Blockly.Maixduino.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Maixduino.valueToCode(block, 'OPERAND2', Blockly.Maixduino.ORDER_RELATIONAL) || 0;
        var code = `${operator1} > ${operator2}`;
        return [code, Blockly.Maixduino.ORDER_RELATIONAL];
    }

    Blockly.Maixduino['operator_lt'] = function (block) {
        var operator1 = Blockly.Maixduino.valueToCode(block, 'OPERAND1', Blockly.Maixduino.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Maixduino.valueToCode(block, 'OPERAND2', Blockly.Maixduino.ORDER_RELATIONAL) || 0;
        var code = `${operator1} < ${operator2}`;
        return [code, Blockly.Maixduino.ORDER_RELATIONAL];
    }

    Blockly.Maixduino['operator_equals'] = function (block) {
        var operator1 = Blockly.Maixduino.valueToCode(block, 'OPERAND1', Blockly.Maixduino.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Maixduino.valueToCode(block, 'OPERAND2', Blockly.Maixduino.ORDER_RELATIONAL) || 0;
        var code = `${operator1} == ${operator2}`;
        return [code, Blockly.Maixduino.ORDER_RELATIONAL];
    }

    Blockly.Maixduino['operator_and'] = function (block) {
        var operator1 = Blockly.Maixduino.valueToCode(block, 'OPERAND1', Blockly.Maixduino.ORDER_LOGICAL_AND) || 'False';
        var operator2 = Blockly.Maixduino.valueToCode(block, 'OPERAND2', Blockly.Maixduino.ORDER_LOGICAL_AND) || 'False';
        var code = `${operator1} and ${operator2}`;
        return [code, Blockly.Maixduino.ORDER_LOGICAL_AND];
    }

    Blockly.Maixduino['operator_or'] = function (block) {
        var operator1 = Blockly.Maixduino.valueToCode(block, 'OPERAND1', Blockly.Maixduino.ORDER_LOGICAL_OR) || 'False';
        var operator2 = Blockly.Maixduino.valueToCode(block, 'OPERAND2', Blockly.Maixduino.ORDER_LOGICAL_OR) || 'False';
        var code = `${operator1} or ${operator2}`;
        return [code, Blockly.Maixduino.ORDER_LOGICAL_OR];
    }

    Blockly.Maixduino['operator_not'] = function (block) {
        var operator = Blockly.Maixduino.valueToCode(block, 'OPERAND', Blockly.Maixduino.ORDER_LOGICAL_NOT) || 'True';
        var code = `not ${operator}`;
        return [code, Blockly.Maixduino.ORDER_LOGICAL_NOT];
    }

    Blockly.Maixduino['operator_join'] = function (block) {
        var str1 = Blockly.Maixduino.valueToCode(block, 'STRING1', Blockly.Maixduino.ORDER_NONE) || '';
        var str2 = Blockly.Maixduino.valueToCode(block, 'STRING2', Blockly.Maixduino.ORDER_NONE) || '';
        return [`str(${str1}) + str(${str2})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['operator_letter_of'] = function (block) {
        var letter = Blockly.Maixduino.valueToCode(block, 'LETTER', Blockly.Maixduino.ORDER_NONE) || 0;
        var str = Blockly.Maixduino.valueToCode(block, 'STRING', Blockly.Maixduino.ORDER_NONE) || '';
        return [`str(${str})[${letter} - 1]`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['operator_length'] = function (block) {
        var str = Blockly.Maixduino.valueToCode(block, 'STRING', Blockly.Maixduino.ORDER_NONE) || '';
        var code = `len(str(${str}))`;
        return [code, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['operator_contains'] = function (block) {
        var str1 = Blockly.Maixduino.valueToCode(block, 'STRING1', Blockly.Maixduino.ORDER_NONE) || '';
        var str2 = Blockly.Maixduino.valueToCode(block, 'STRING2', Blockly.Maixduino.ORDER_NONE) || '';
        return [`str(${str2}) in str(${str1})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['operator_mod'] = function (block) {
        var num1 = Blockly.Maixduino.valueToCode(block, 'NUM1', Blockly.Maixduino.ORDER_NONE) || 0;
        var num2 = Blockly.Maixduino.valueToCode(block, 'NUM2', Blockly.Maixduino.ORDER_NONE) || 0;
        var code = `${num1} % ${num2}`;
        return [code, Blockly.Maixduino.ORDER_MULTIPLICATIVE];
    }

    Blockly.Maixduino['operator_round'] = function (block) {
        var num = Blockly.Maixduino.valueToCode(block, 'NUM', Blockly.Maixduino.ORDER_NONE) || 0;
        var code = `round(${num})`;
        return [code, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['operator_mathop'] = function (block) {
        var opeerator = block.getFieldValue('OPERATOR');
        var num = Blockly.Maixduino.valueToCode(block, 'NUM', Blockly.Maixduino.ORDER_NONE) || 0;
        Blockly.Maixduino.definitions_['import_math'] = 'import math';
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

        return [code, Blockly.Maixduino.ORDER_ATOMIC];
    }

    /**
     * variables
     */
    Blockly.Maixduino['data_variable'] = function (block) {
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Maixduino.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return [`globalvals.${varName}`, Blockly.Maixduino.ORDER_ATOMIC];
    };

    Blockly.Maixduino['data_setvariableto'] = function (block) {
        var value = Blockly.Maixduino.valueToCode(block, 'VALUE', Blockly.Maixduino.ORDER_ATOMIC);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Maixduino.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} = ${value}\n`;
    };

    Blockly.Maixduino['data_changevariableby'] = function (block) {
        var value = Blockly.Maixduino.valueToCode(block, 'VALUE', Blockly.Maixduino.ORDER_ASSIGNMENT);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Maixduino.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} += ${value}\n`;
    };

    Blockly.Maixduino['data_showvariable'] = function (block) {
        return `\n`;
    };

    Blockly.Maixduino['data_hidevariable'] = function (block) {
        return `\n`;
    };


    /**
     * myblocks
     */
    Blockly.Maixduino['procedures_call'] = function (block) {
        let defineBlock = Blockly.Procedures.getDefineBlock(block.getProcCode(), block.workspace);
        if(!defineBlock) return '';
        let childBlocks = block.childBlocks_ || [];
        let params = []
        for (let x = 0, block_; block_ = childBlocks[x]; x++) {
            let codeArgs = Blockly.Maixduino.blockToCode(block_);
            if (codeArgs.constructor == Array) {
                params.push(codeArgs[0])
            }
        }
        return `${defineBlock.funcName}(${params.join(',')})\n`;
    }

    Blockly.Maixduino['procedures_definition'] = function (block) {
        let childBlocks = block.childBlocks_ || [];
        let params = []
        let funcName = Blockly.Maixduino.variableDB_.getDistinctName(`definition_fun`, Blockly.Variables.NAME_TYPE);
        for (let x = 0, block_; block_ = childBlocks[0].childBlocks_[x]; x++) {
            let value = block_.getFieldValue('VALUE') || '';
            let argName = Blockly.Maixduino.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || 'aa';
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

    Blockly.Maixduino['argument_reporter_string_number'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.Maixduino.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || '0';
        return [argName, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['argument_reporter_boolean'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.Maixduino.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || 'false';
        return [argName, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['motion_maixduino_print'] = function (block) {
        var args0 = Blockly.Maixduino.valueToCode(block, 'ARGS_0', Blockly.Maixduino.ORDER_NONE) || 'null';
        var args1 = Blockly.Maixduino.valueToCode(block, 'ARGS_1', Blockly.Maixduino.ORDER_NONE) || 'null';
        var args2 = Blockly.Maixduino.valueToCode(block, 'ARGS_2', Blockly.Maixduino.ORDER_NONE) || 'null';
        var args3 = Blockly.Maixduino.valueToCode(block, 'ARGS_3', Blockly.Maixduino.ORDER_NONE) || 'null';
        var args4 = Blockly.Maixduino.valueToCode(block, 'ARGS_4', Blockly.Maixduino.ORDER_NONE) || 'null';
        return `print((${args0}, ${args1}, ${args2}, ${args3}, ${args4}))\n`;
    }

}
