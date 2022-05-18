export default (Blockly) => {
    Blockly.C['procedures_call'] = function (block) {
        let defineBlock = Blockly.Procedures.getDefineBlock(block.getProcCode(), block.workspace);
        if (!defineBlock) return '';
        let childBlocks = block.childBlocks_ || [];
        let code = `${defineBlock.funName}(`;
        for (let x = 0, isFirstArg = true, block_; block_ = childBlocks[x]; x++) {
            let argText = Blockly.C.blockToCode(block_);
            if (argText.constructor == Array) {
                code = `${code}${isFirstArg ? '' : ','}${argText[0]}`;
                isFirstArg = false;
            }
        }
        code = `${code});\n`;
        return code;
    }

    Blockly.C['procedures_definition'] = function (block) {
        let childBlocks = block.childBlocks_ || [];
        let funName = Blockly.C.variableDB_.getDistinctName(`definition_fun`, Blockly.Variables.NAME_TYPE);
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
            argName = Blockly.C.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
            callbackCodeHead = `${callbackCodeHead}${x === 0 ? '' : ','}${argType} ${argName}`;
        }
        callbackCodeHead = `${callbackCodeHead})\n{\n`;
        block.callbackCodeHead = callbackCodeHead;
        block.callbackCodeTail = '}\n\n';
        return '';
    }


    Blockly.C['argument_reporter_string_number'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.C.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
        return [argName, Blockly.C.ORDER_ATOMIC];
    }

    Blockly.C['argument_reporter_boolean'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.C.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
        return [argName, Blockly.C.ORDER_ATOMIC];
    }

    // Blockly.C['argument_editor_boolean'] = function (block) {
    //     return block.getFieldValue('TEXT');
    // }

    // Blockly.C['argument_editor_string_number'] = function (block) {
    //     return block.getFieldValue('TEXT');
    // }

    // Blockly.C['procedures_prototype'] = function (block) {
    //     console.log('procedures_prototype');
    // }

    // Blockly.C['procedures_declaration'] = function (block) {
    //     console.log('procedures_declaration');
    // }



}

