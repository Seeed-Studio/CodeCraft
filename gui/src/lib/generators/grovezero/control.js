export default (Blockly) => {

    Blockly.C['control_wait'] = function (block) {
        var duration = Blockly.C.valueToCode(block, 'DURATION', Blockly.C.ORDER_NONE);
        return `grovezero->blecore->wait(${duration});\n`
    };

    Blockly.C['control_forever'] = function (block) {
        var branch = Blockly.C.statementToCode(block, 'SUBSTACK');
        branch = Blockly.C.addLoopTrap(branch, block.id);
        var code = 'while(1)\n' +
            '{\n' +
            branch +
            '_co_switch_();\n' +
            '}\n';
        return code;
    };

    Blockly.C['control_repeat'] = function (block) {
        var argument0 = Blockly.C.valueToCode(block, 'TIMES', Blockly.C.ORDER_NONE);
        var loopVar = Blockly.C.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
        var branch = Blockly.C.statementToCode(block, 'SUBSTACK');
        branch = Blockly.C.addLoopTrap(branch, block.id);

        var code = `for(int ${loopVar}=0;${loopVar}<${argument0};${loopVar}++)\n` +
            '{\n' +
            branch +
            '   _co_switch_ ();\n' +
            '}\n';
        return code;
    };

    Blockly.C['control_if'] = function (block) {
        var argument0 = Blockly.C.valueToCode(block, 'CONDITION', Blockly.C.ORDER_NONE);
        if (argument0 === '') {
            argument0 = 'NULL';
        } else {
            argument0 = argument0;
        }
        var branch = Blockly.C.statementToCode(block, 'SUBSTACK');
        branch = Blockly.C.addLoopTrap(branch, block.id);
        return 'if (' + argument0 + ') {\n' + branch + '}\n';
    };

    Blockly.C['control_if_else'] = function (block) {
        var argument0 = Blockly.C.valueToCode(block, 'CONDITION', Blockly.C.ORDER_NONE);
        if (argument0 === '') {
            argument0 = 'NULL';
        } else {
            argument0 = argument0;
        }
        var branch0 = Blockly.C.statementToCode(block, 'SUBSTACK');
        var branch1 = Blockly.C.statementToCode(block, 'SUBSTACK2');
        branch0 = Blockly.C.addLoopTrap(branch0, block.id);
        branch1 = Blockly.C.addLoopTrap(branch1, block.id);
        return 'if (' + argument0 + ') {\n' + branch0 + '} else {\n' + branch1 + '}\n';
    };

    Blockly.C['control_wait_until'] = function (block) {
        var argument0 = Blockly.C.valueToCode(block, 'CONDITION', Blockly.C.ORDER_ATOMIC);
        if (argument0 === '') {
            argument0 = 'NULL';
        } else {
            argument0 = argument0;
        }
        return 'while(' + argument0 + ' == 0){_co_switch_();}\n';
    };

    Blockly.C['control_repeat_until'] = function (block) {
        var argument0 = Blockly.C.valueToCode(block, 'CONDITION', Blockly.C.ORDER_ATOMIC);
        if (argument0 === '') {
            argument0 = 'NULL';
        } else {
            argument0 = argument0;
        }
        var branch = Blockly.C.statementToCode(block, 'SUBSTACK');
        branch = Blockly.C.addLoopTrap(branch, block.id);
        return 'do\n{' + branch + '\n_co_switch_();\n}while(' + argument0 + ' == 0);\n';
    };
}

