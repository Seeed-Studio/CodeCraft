export default Blockly => {

    Blockly.Microbit['text'] = function (block) {
        var code = block.getFieldValue('TEXT');
        return [`"${code}"`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['math_number'] = function (block) {
        var code = parseFloat(block.getFieldValue('NUM') || '0');
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['math_whole_number'] = Blockly.Microbit['math_number'];
    Blockly.Microbit['math_positive_number'] = Blockly.Microbit['math_number'];
    Blockly.Microbit['math_angle'] = Blockly.Microbit['math_number'];
    Blockly.Microbit['math_integer'] = Blockly.Microbit['math_number'];

    Blockly.Microbit['colour_picker'] = function (block) {
        var color = block.getFieldValue('COLOUR');
        return [`"${color}"`, Blockly.Microbit.ORDER_ATOMIC];
    }

    /**
     * control
     */
    Blockly.Microbit['control_wait'] = function (block) {
        var duration = Blockly.Microbit.valueToCode(block, 'DURATION', Blockly.Microbit.ORDER_NONE);
        return `sleep(${duration}*1000)\n`;
    }

    Blockly.Microbit['control_repeat'] = function (block) {
        var times = Blockly.Microbit.valueToCode(block, 'TIMES', Blockly.Microbit.ORDER_NONE);
        var substack = Blockly.Microbit.statementToCode(block, 'SUBSTACK') || Blockly.Microbit.PASS;
        var code = `for count in range(${times}):\n${substack}`;
        return code;
    }

    Blockly.Microbit['control_forever'] = function (block) {
        var branch = Blockly.Microbit.statementToCode(block, 'SUBSTACK') || Blockly.Microbit.PASS;
        var code = `while True:\n${branch}`;
        return code;
    }

    Blockly.Microbit['control_if'] = function (block) {
        var condition = Blockly.Microbit.valueToCode(block, 'CONDITION', Blockly.Microbit.ORDER_NONE) || 'False';
        var branch = Blockly.Microbit.statementToCode(block, 'SUBSTACK') || Blockly.Microbit.PASS;
        var code = `if ${condition}:\n${branch}`;
        return code;
    }

    Blockly.Microbit['control_if_else'] = function (block) {
        var condition = Blockly.Microbit.valueToCode(block, 'CONDITION', Blockly.Microbit.ORDER_NONE) || 'False';
        var branch = Blockly.Microbit.statementToCode(block, 'SUBSTACK') || Blockly.Microbit.PASS;
        var branch2 = Blockly.Microbit.statementToCode(block, 'SUBSTACK2') || Blockly.Microbit.PASS;
        var code = `if ${condition}:\n${branch}else:\n${branch2}`;
        return code;
    }

    Blockly.Microbit['control_wait_until'] = function (block) {
        var condition = Blockly.Microbit.valueToCode(block, 'CONDITION', Blockly.Microbit.ORDER_LOGICAL_NOT) || 'False';
        var code = `while not ${condition}:\n${Blockly.Microbit.PASS}`;
        return code;
    }

    Blockly.Microbit['control_repeat_until'] = function (block) {
        var condition = Blockly.Microbit.valueToCode(block, 'CONDITION', Blockly.Microbit.ORDER_LOGICAL_NOT) || 'False';
        var branch = Blockly.Microbit.statementToCode(block, 'SUBSTACK') || Blockly.Microbit.PASS;
        var code = `while not ${condition}:\n${branch}`;
        return code;
    }

    /**
     * operators
     */
    Blockly.Microbit['operator_add'] = function (block) {
        var num1 = Blockly.Microbit.valueToCode(block, 'NUM1', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Microbit.valueToCode(block, 'NUM2', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var code = `${num1} + ${num2}`;
        return [code, Blockly.Microbit.ORDER_UNARY_SIGN];
    }

    Blockly.Microbit['operator_subtract'] = function (block) {
        var num1 = Blockly.Microbit.valueToCode(block, 'NUM1', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Microbit.valueToCode(block, 'NUM2', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var code = `${num1} - ${num2}`;
        return [code, Blockly.Microbit.ORDER_UNARY_SIGN];
    }

    Blockly.Microbit['operator_multiply'] = function (block) {
        var num1 = Blockly.Microbit.valueToCode(block, 'NUM1', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Microbit.valueToCode(block, 'NUM2', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var code = `${num1} * ${num2}`;
        return [code, Blockly.Microbit.ORDER_MULTIPLICATIVE];
    }

    Blockly.Microbit['operator_divide'] = function (block) {
        var num1 = Blockly.Microbit.valueToCode(block, 'NUM1', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var num2 = Blockly.Microbit.valueToCode(block, 'NUM2', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var code = `${num1} / ${num2}`;
        return [code, Blockly.Microbit.ORDER_MULTIPLICATIVE];
    }

    Blockly.Microbit['operator_random'] = function (block) {
        var from = Blockly.Microbit.valueToCode(block, 'FROM', Blockly.Microbit.ORDER_NONE) || 0;
        var to = Blockly.Microbit.valueToCode(block, 'TO', Blockly.Microbit.ORDER_NONE) || 0;
        var code = `random.randint(${from}, ${to})`;
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['operator_gt'] = function (block) {
        var operator1 = Blockly.Microbit.valueToCode(block, 'OPERAND1', Blockly.Microbit.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Microbit.valueToCode(block, 'OPERAND2', Blockly.Microbit.ORDER_RELATIONAL) || 0;
        var code = `${operator1} > ${operator2}`;
        return [code, Blockly.Microbit.ORDER_RELATIONAL];
    }

    Blockly.Microbit['operator_lt'] = function (block) {
        var operator1 = Blockly.Microbit.valueToCode(block, 'OPERAND1', Blockly.Microbit.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Microbit.valueToCode(block, 'OPERAND2', Blockly.Microbit.ORDER_RELATIONAL) || 0;
        var code = `${operator1} < ${operator2}`;
        return [code, Blockly.Microbit.ORDER_RELATIONAL];
    }

    Blockly.Microbit['operator_equals'] = function (block) {
        var operator1 = Blockly.Microbit.valueToCode(block, 'OPERAND1', Blockly.Microbit.ORDER_RELATIONAL) || 0;
        var operator2 = Blockly.Microbit.valueToCode(block, 'OPERAND2', Blockly.Microbit.ORDER_RELATIONAL) || 0;
        var code = `${operator1} == ${operator2}`;
        return [code, Blockly.Microbit.ORDER_RELATIONAL];
    }

    Blockly.Microbit['operator_and'] = function (block) {
        var operator1 = Blockly.Microbit.valueToCode(block, 'OPERAND1', Blockly.Microbit.ORDER_LOGICAL_AND) || 'False';
        var operator2 = Blockly.Microbit.valueToCode(block, 'OPERAND2', Blockly.Microbit.ORDER_LOGICAL_AND) || 'False';
        var code = `${operator1} and ${operator2}`;
        return [code, Blockly.Microbit.ORDER_LOGICAL_AND];
    }

    Blockly.Microbit['operator_or'] = function (block) {
        var operator1 = Blockly.Microbit.valueToCode(block, 'OPERAND1', Blockly.Microbit.ORDER_LOGICAL_OR) || 'False';
        var operator2 = Blockly.Microbit.valueToCode(block, 'OPERAND2', Blockly.Microbit.ORDER_LOGICAL_OR) || 'False';
        var code = `${operator1} or ${operator2}`;
        return [code, Blockly.Microbit.ORDER_LOGICAL_OR];
    }

    Blockly.Microbit['operator_not'] = function (block) {
        var operator = Blockly.Microbit.valueToCode(block, 'OPERAND', Blockly.Microbit.ORDER_LOGICAL_NOT) || 'True';
        var code = `not ${operator}`;
        return [code, Blockly.Microbit.ORDER_LOGICAL_NOT];
    }

    Blockly.Microbit['operator_join'] = function (block) {
        var str1 = Blockly.Microbit.valueToCode(block, 'STRING1', Blockly.Microbit.ORDER_NONE) || '';
        var str2 = Blockly.Microbit.valueToCode(block, 'STRING2', Blockly.Microbit.ORDER_NONE) || '';
        var code = `str(${str1}) + str(${str2})`;
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['operator_letter_of'] = function (block) {
        var letter = Blockly.Microbit.valueToCode(block, 'LETTER', Blockly.Microbit.ORDER_NONE) || 0;
        var str = Blockly.Microbit.valueToCode(block, 'STRING', Blockly.Microbit.ORDER_NONE) || '';
        var code = `str(${str})[${letter}]`;
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['operator_length'] = function (block) {
        var str = Blockly.Microbit.valueToCode(block, 'STRING', Blockly.Microbit.ORDER_NONE) || '';
        var code = `len(${str})`;
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['operator_contains'] = function (block) {
        var str1 = Blockly.Microbit.valueToCode(block, 'STRING1', Blockly.Microbit.ORDER_NONE) || '';
        var str2 = Blockly.Microbit.valueToCode(block, 'STRING2', Blockly.Microbit.ORDER_NONE) || '';
        var code = `str(${str1}).find(str(${str2})) > -1`;
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['operator_mod'] = function (block) {
        var num1 = Blockly.Microbit.valueToCode(block, 'NUM1', Blockly.Microbit.ORDER_NONE) || 0;
        var num2 = Blockly.Microbit.valueToCode(block, 'NUM2', Blockly.Microbit.ORDER_NONE) || 0;
        var code = `${num1} % ${num2}`;
        return [code, Blockly.Microbit.ORDER_MULTIPLICATIVE];
    }

    Blockly.Microbit['operator_round'] = function (block) {
        var num = Blockly.Microbit.valueToCode(block, 'NUM', Blockly.Microbit.ORDER_NONE) || 0;
        var code = `round(${num})`;
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['operator_mathop'] = function (block) {
        var opeerator = block.getFieldValue('OPERATOR');
        var num = Blockly.Microbit.valueToCode(block, 'NUM', Blockly.Microbit.ORDER_NONE) || 0;
        Blockly.Microbit.definitions_['import_math'] = 'import math';
        var code = `math.${opeerator}(${num})`;
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }
    
    Blockly.Microbit['operator_arduino_itoa'] = function (block) {
        var value = Blockly.Microbit.valueToCode(block, 'VALUE', Blockly.Microbit.ORDER_ATOMIC);
        var code =`str(${value})`;
        return [code, Blockly.Microbit.ORDER_ATOMIC];
    }

    /**
     * variables
     */
    Blockly.Microbit['data_variable'] = function (block) {
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Microbit.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return [`globalvals.${varName}`, Blockly.Microbit.ORDER_ATOMIC];
    };

    Blockly.Microbit['data_setvariableto'] = function (block) {
        var value = Blockly.Microbit.valueToCode(block, 'VALUE', Blockly.Microbit.ORDER_NONE) || 0;
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Microbit.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} = ${value}\n`;
    };

    Blockly.Microbit['data_changevariableby'] = function (block) {
        var value = Blockly.Microbit.valueToCode(block, 'VALUE', Blockly.Microbit.ORDER_NONE) || 0;
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Microbit.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `globalvals.${varName} = ${varName} + ${value}\n`;
    };

    Blockly.Microbit['data_showvariable'] = function (block) {
        return ``;
    };

    Blockly.Microbit['data_hidevariable'] = function (block) {
        return ``;
    };

     /**
     * myblocks
     */
    Blockly.Microbit['procedures_call'] = function (block) {
        let defineBlock = Blockly.Procedures.getDefineBlock(block.getProcCode(), block.workspace);
        if(!defineBlock) return '';
        let childBlocks = block.childBlocks_ || [];
        let params = []
        for (let x = 0, block_; block_ = childBlocks[x]; x++) {
            let codeArgs = Blockly.Microbit.blockToCode(block_);
            if (codeArgs.constructor == Array) {
                params.push(codeArgs[0])
            }
        }
        return `${defineBlock.funcName}(${params.join(',')})\n`;
    }

    Blockly.Microbit['procedures_definition'] = function (block) {
        let childBlocks = block.childBlocks_ || [];
        let params = []
        let funcName = Blockly.Microbit.variableDB_.getDistinctName(`definition_fun`, Blockly.Variables.NAME_TYPE);
        for (let x = 0, block_; block_ = childBlocks[0].childBlocks_[x]; x++) {
            let value = block_.getFieldValue('VALUE') || '';
            let argName = Blockly.Microbit.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || 'aa';
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

    Blockly.Microbit['argument_reporter_string_number'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.Microbit.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || '0';
        return [argName, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['argument_reporter_boolean'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.Microbit.variableDB_.getName(value, Blockly.Variables.NAME_TYPE) || 'false';
        return [argName, Blockly.Microbit.ORDER_ATOMIC];
    }

    /**
     * events
     */
    Blockly.Microbit['event_microbit_whenstartup'] = function (block) {
        var funcName = Blockly.Microbit.variableDB_.getDistinctName('whenstartup', Blockly.Variables.NAME_TYPE);
        Blockly.Microbit.initfuncs_[`@event.${funcName}`] = `${funcName}()`;
        return `def ${funcName}():\n    pass\n`;
    };
    
    Blockly.Microbit['event_microbit_whenbuttonpressed'] = function (block) {
        var key = block.getFieldValue('KEY');
        var funcName = Blockly.Microbit.variableDB_.getDistinctName(`on_button_${key}`, Blockly.Variables.NAME_TYPE);
        var event ={
            condition: `button_${key}.is_pressed()`,
            callback: funcName,
        }
        Blockly.Microbit.functionNames_[`@event.${funcName}`] = event;
        return `def ${funcName}():\n    pass\n`;
    };

    Blockly.Microbit['event_microbit_whenpinsconnected'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var funcName = Blockly.Microbit.variableDB_.getDistinctName(`on_pin${pin}`, Blockly.Variables.NAME_TYPE);
        var event ={
            condition: `pin${pin}.is_touched()`,
            callback: funcName,
        }
        Blockly.Microbit.functionNames_[`@event.${funcName}`] = event;
        return `def ${funcName}():\n    pass\n`;
    };

    Blockly.Microbit['event_microbit_whengesture'] = function (block) {
        var gesture = block.getFieldValue('GESTURE');
        var funcName = Blockly.Microbit.variableDB_.getDistinctName(`on_${gesture}`, Blockly.Variables.NAME_TYPE);
        var event ={
            condition: `accelerometer.was_gesture('${gesture}')`,
            callback: funcName,
        }
        Blockly.Microbit.functionNames_[`@event.${funcName}`] = event;
        return `def ${funcName}():\n    pass\n`;
    };

}