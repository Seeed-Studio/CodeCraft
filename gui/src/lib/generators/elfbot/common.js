export default Blockly => {

    Blockly.Elfbot['text'] = function (block) {
        var code = block.getFieldValue('TEXT');
        return [`"${code}"`, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['math_number'] = function (block) {
        var code = parseFloat(block.getFieldValue('NUM') || '0');
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['math_whole_number'] = Blockly.Elfbot['math_number'];
    Blockly.Elfbot['math_positive_number'] = Blockly.Elfbot['math_number'];
    Blockly.Elfbot['math_angle'] = Blockly.Elfbot['math_number'];
    Blockly.Elfbot['math_integer'] = Blockly.Elfbot['math_number'];

    Blockly.Elfbot['colour_picker'] = function (block) {
        var color = block.getFieldValue('COLOUR');
        return [`"${color}"`, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['math_cc_number'] = Blockly.Elfbot['math_number'];
    Blockly.Elfbot['math_cc_time_number'] = Blockly.Elfbot['math_number'];
    Blockly.Elfbot['math_cc_positive_whole_number'] = Blockly.Elfbot['math_number'];
    Blockly.Elfbot['math_cc_duration_time'] = Blockly.Elfbot['math_number'];

    let list = [
        { min: -100, max: 100 },
        { min: 0, max: 180 },
        { min: 0, max: 4 },
        { min: 0, max: 5 },
        { min: 0, max: 100 },
        { min: 0, max: 255 },
        { min: 0, max: 32 },
        { min: 0, max: 7 },
        { min: 0, max: 15 },
        { min: 262, max: 1976 },
        { min: -999, max: 9999 },
        { min: 0, max: 9999 },
        { min: 60, max: 960 },
        { min: 1, max: 64 },
        { min: 1, max: 999999999 },
        { min: -100, max: 100 },
        { min: -999999999, max: 999999999 },
    ];
    for (let x = 0, item; item = list[x]; x++) {
        Blockly.Elfbot[`math_cc_min_${item.min}_max_${item.max}_number`] = Blockly.Elfbot['math_number'];
    }

    /**
     * control
     */
    Blockly.Elfbot['control_wait'] = function (block) {
        var duration = Blockly.Elfbot.valueToCode(block, 'DURATION', Blockly.Elfbot.ORDER_NONE);
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        return `elfbot.ch_delay(${duration})\n`;
    }

    Blockly.Elfbot['control_repeat'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var times = Blockly.Elfbot.valueToCode(block, 'TIMES', Blockly.Elfbot.ORDER_NONE);
        var substack = Blockly.Elfbot.statementToCode(block, 'SUBSTACK') || Blockly.Elfbot.PASS;
        var code = [
            `for count in range(${times}):`,
            `    if self._is_stoped:`,
            `        return`,
            `    time.sleep(0.02)`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.Elfbot['control_forever'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var substack = Blockly.Elfbot.statementToCode(block, 'SUBSTACK') || Blockly.Elfbot.PASS;
        if (block.getChildren().length === 0) {
            var code = [
                `while True:`,
                `    break`
            ]
        } else {
            var code = [
                `while True:`,
                `    if self._is_stoped:`,
                `        return`,
                `    time.sleep(0.02)`,
                `${substack}`
            ]
        }
        return code.join('\n');
    }

    Blockly.Elfbot['control_if'] = function (block) {
        var condition = Blockly.Elfbot.valueToCode(block, 'CONDITION', Blockly.Elfbot.ORDER_NONE) || 'False';
        var substack = Blockly.Elfbot.statementToCode(block, 'SUBSTACK') || Blockly.Elfbot.PASS;
        var code = [
            `if ${condition}:`,
            `${substack}`
        ]
        return code.join('\n');
    }

    Blockly.Elfbot['control_if_else'] = function (block) {
        var condition = Blockly.Elfbot.valueToCode(block, 'CONDITION', Blockly.Elfbot.ORDER_NONE) || 'False';
        var substack = Blockly.Elfbot.statementToCode(block, 'SUBSTACK') || Blockly.Elfbot.PASS;
        var substack2 = Blockly.Elfbot.statementToCode(block, 'SUBSTACK2') || Blockly.Elfbot.PASS;

        var code = [
            `if ${condition}:`,
            `${substack}else:`,
            `${substack2}`
        ];
        return code.join('\n');
    }

    Blockly.Elfbot['control_wait_until'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var condition = Blockly.Elfbot.valueToCode(block, 'CONDITION', Blockly.Elfbot.ORDER_LOGICAL_NOT) || 'False';
        if (block.getNextBlock() === null) {
            var code = [
                `while not (${condition}):`,
                `    break`,
                ``
            ]
        } else {
            var code = [
                `while not (${condition}):`,
                `    if self._is_stoped:`,
                `        return`,
                `    time.sleep(0.02)`,
                `${Blockly.Elfbot.PASS}`
            ]
        }

        return code.join('\n');
    }

    Blockly.Elfbot['control_repeat_until'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var condition = Blockly.Elfbot.valueToCode(block, 'CONDITION', Blockly.Elfbot.ORDER_LOGICAL_NOT) || 'False';
        var branch = Blockly.Elfbot.statementToCode(block, 'SUBSTACK') || Blockly.Elfbot.PASS;
        if (block.getChildren().length === 0) {
            var code = [
                `while not (${condition}):`,
                `    break`,
                ``
            ]

        } else {
            var code = [
                `while not (${condition}):`,
                `    if self._is_stoped:`,
                `        return`,
                `    time.sleep(0.02)`,
                `${branch}`
            ]
        }
        return code.join('\n');
    }

    /**
     * operators
     */
    Blockly.Elfbot['operator_add'] = function (block) {
        var num1 = Blockly.Elfbot.valueToCode(block, 'NUM1', Blockly.Elfbot.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Elfbot.valueToCode(block, 'NUM2', Blockly.Elfbot.ORDER_ATOMIC) || 0;
        var code = `${num1} + ${num2}`;
        return [code, Blockly.Elfbot.ORDER_UNARY_SIGN];
    }

    Blockly.Elfbot['operator_subtract'] = function (block) {
        var num1 = Blockly.Elfbot.valueToCode(block, 'NUM1', Blockly.Elfbot.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Elfbot.valueToCode(block, 'NUM2', Blockly.Elfbot.ORDER_ATOMIC) || 0;
        var code = `${num1} - ${num2}`;
        return [code, Blockly.Elfbot.ORDER_UNARY_SIGN];
    }

    Blockly.Elfbot['operator_multiply'] = function (block) {
        var num1 = Blockly.Elfbot.valueToCode(block, 'NUM1', Blockly.Elfbot.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Elfbot.valueToCode(block, 'NUM2', Blockly.Elfbot.ORDER_ATOMIC) || 0;
        var code = `${num1} * ${num2}`;
        return [code, Blockly.Elfbot.ORDER_MULTIPLICATIVE];
    }

    Blockly.Elfbot['operator_divide'] = function (block) {
        var num1 = Blockly.Elfbot.valueToCode(block, 'NUM1', Blockly.Elfbot.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Elfbot.valueToCode(block, 'NUM2', Blockly.Elfbot.ORDER_ATOMIC) || 0;
        var code = `${num1} / ${num2}`;
        return [code, Blockly.Elfbot.ORDER_MULTIPLICATIVE];
    }

    Blockly.Elfbot['operator_random'] = function (block) {
        Blockly.Elfbot.definitions_['import_random'] = 'import random';
        var from = Blockly.Elfbot.valueToCode(block, 'FROM', Blockly.Elfbot.ORDER_NONE) || 0;
        var to = Blockly.Elfbot.valueToCode(block, 'TO', Blockly.Elfbot.ORDER_NONE) || 0;
        var code = `random.randint(int(${from}), int(${to}))`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['operator_gt'] = function (block) {
        var operator1 = Blockly.Elfbot.valueToCode(block, 'OPERAND1', Blockly.Elfbot.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Elfbot.valueToCode(block, 'OPERAND2', Blockly.Elfbot.ORDER_RELATIONAL) || 0;
        var code = `${operator1} > ${operator2}`;
        return [code, Blockly.Elfbot.ORDER_RELATIONAL];
    }

    Blockly.Elfbot['operator_lt'] = function (block) {
        var operator1 = Blockly.Elfbot.valueToCode(block, 'OPERAND1', Blockly.Elfbot.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Elfbot.valueToCode(block, 'OPERAND2', Blockly.Elfbot.ORDER_RELATIONAL) || 0;
        var code = `${operator1} < ${operator2}`;
        return [code, Blockly.Elfbot.ORDER_RELATIONAL];
    }

    Blockly.Elfbot['operator_equals'] = function (block) {
        var operator1 = Blockly.Elfbot.valueToCode(block, 'OPERAND1', Blockly.Elfbot.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Elfbot.valueToCode(block, 'OPERAND2', Blockly.Elfbot.ORDER_RELATIONAL) || 0;
        var code = `${operator1} == ${operator2}`;
        return [code, Blockly.Elfbot.ORDER_RELATIONAL];
    }

    Blockly.Elfbot['operator_and'] = function (block) {
        var operator1 = Blockly.Elfbot.valueToCode(block, 'OPERAND1', Blockly.Elfbot.ORDER_LOGICAL_AND) || 'False';
        var operator2 = Blockly.Elfbot.valueToCode(block, 'OPERAND2', Blockly.Elfbot.ORDER_LOGICAL_AND) || 'False';
        var code = `${operator1} and ${operator2}`;
        return [code, Blockly.Elfbot.ORDER_LOGICAL_AND];
    }

    Blockly.Elfbot['operator_or'] = function (block) {
        var operator1 = Blockly.Elfbot.valueToCode(block, 'OPERAND1', Blockly.Elfbot.ORDER_LOGICAL_OR) || 'False';
        var operator2 = Blockly.Elfbot.valueToCode(block, 'OPERAND2', Blockly.Elfbot.ORDER_LOGICAL_OR) || 'False';
        var code = `${operator1} or ${operator2}`;
        return [code, Blockly.Elfbot.ORDER_LOGICAL_OR];
    }

    Blockly.Elfbot['operator_not'] = function (block) {
        var operator = Blockly.Elfbot.valueToCode(block, 'OPERAND', Blockly.Elfbot.ORDER_LOGICAL_NOT) || 'True';
        var code = `not ${operator}`;
        return [code, Blockly.Elfbot.ORDER_LOGICAL_NOT];
    }

    Blockly.Elfbot['operator_join'] = function (block) {
        var str1 = Blockly.Elfbot.valueToCode(block, 'STRING1', Blockly.Elfbot.ORDER_NONE) || '';
        var str2 = Blockly.Elfbot.valueToCode(block, 'STRING2', Blockly.Elfbot.ORDER_NONE) || '';
        var code = `str(${str1}) + str(${str2})`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['operator_letter_of'] = function (block) {
        var letter = Blockly.Elfbot.valueToCode(block, 'LETTER', Blockly.Elfbot.ORDER_NONE) || 0;
        var str = Blockly.Elfbot.valueToCode(block, 'STRING', Blockly.Elfbot.ORDER_NONE) || '';
        var code = `str(${str})[${letter}]`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['operator_length'] = function (block) {
        var str = Blockly.Elfbot.valueToCode(block, 'STRING', Blockly.Elfbot.ORDER_NONE) || '';
        var code = `len(${str})`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['operator_contains'] = function (block) {
        var str1 = Blockly.Elfbot.valueToCode(block, 'STRING1', Blockly.Elfbot.ORDER_NONE) || '';
        var str2 = Blockly.Elfbot.valueToCode(block, 'STRING2', Blockly.Elfbot.ORDER_NONE) || '';
        var code = `str(${str1}).find(str(${str2})) > -1`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['operator_mod'] = function (block) {
        var num1 = Blockly.Elfbot.valueToCode(block, 'NUM1', Blockly.Elfbot.ORDER_NONE) || 0;
        var num2 = Blockly.Elfbot.valueToCode(block, 'NUM2', Blockly.Elfbot.ORDER_NONE) || 0;
        var code = `${num1} % ${num2}`;
        return [code, Blockly.Elfbot.ORDER_MULTIPLICATIVE];
    }

    Blockly.Elfbot['operator_round'] = function (block) {
        var num = Blockly.Elfbot.valueToCode(block, 'NUM', Blockly.Elfbot.ORDER_NONE) || 0;
        var code = `round(${num})`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['operator_mathop'] = function (block) {
        var opeerator = block.getFieldValue('OPERATOR');
        var num = Blockly.Elfbot.valueToCode(block, 'NUM', Blockly.Elfbot.ORDER_NONE) || 0;
        Blockly.Elfbot.definitions_['import_math'] = 'import math';
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

        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    /**
     * variables
     */
    Blockly.Elfbot['data_variable'] = function (block) {
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Elfbot.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return [`globalvals.${varName}`, Blockly.Elfbot.ORDER_ATOMIC];
    };

    Blockly.Elfbot['data_setvariableto'] = function (block) {
        var value = Blockly.Elfbot.valueToCode(block, 'VALUE', Blockly.Elfbot.ORDER_ATOMIC);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Elfbot.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} = ${value}\n`;
    };

    Blockly.Elfbot['data_changevariableby'] = function (block) {
        var value = Blockly.Elfbot.valueToCode(block, 'VALUE', Blockly.Elfbot.ORDER_ASSIGNMENT);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Elfbot.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} += ${value}\n`;
    };

    Blockly.Elfbot['data_showvariable'] = function (block) {
        return `\n`;
    };

    Blockly.Elfbot['data_hidevariable'] = function (block) {
        return `\n`;
    };
}