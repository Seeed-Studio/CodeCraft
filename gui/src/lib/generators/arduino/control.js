export default (Blockly) => {
  Blockly.Arduino['control_wait'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_NONE);
    return 'groveZeroMainBoard.wait(' + argument0 + ');\r\n';
  };

  Blockly.Arduino['control_repeat'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'TIMES', Blockly.Arduino.ORDER_NONE);
    var loopVar = Blockly.Arduino.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    return 'for (int ' + loopVar + ' = 0; ' + loopVar + ' < ' + argument0 + '; ' + loopVar + '++) {\n' + branch + '}\n';
  };

  Blockly.Arduino['control_if'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    return 'if (' + argument0 + ') {\n' + branch + '}\n';
  };

  Blockly.Arduino['control_if_else'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_NONE);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var branch0 = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    var branch1 = Blockly.Arduino.statementToCode(block, 'SUBSTACK2');
    branch0 = Blockly.Arduino.addLoopTrap(branch0, block.id);
    branch1 = Blockly.Arduino.addLoopTrap(branch1, block.id);
    return 'if (' + argument0 + ') {\n' + branch0 + '} else {\n' + branch1 + '}\n';
  };

  Blockly.Arduino['control_wait_until'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    return 'while(' + argument0 + ' == false){\n}\n';
  };

  Blockly.Arduino['control_repeat_until'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    return 'while (' + argument0 + ' == false) {\n' + branch + '}\n';
  };

  Blockly.Arduino['control_forever'] = function (block) {
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    return 'while (1) {\n' + branch + '}\n';
  };

  Blockly.Arduino['motion_arduino_repeat'] = function (block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_ATOMIC);
    if (argument0 === '') {
      argument0 = 'NULL';
    } else {
      argument0 = argument0;
    }
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
  }

  Blockly.Arduino['motion_arduino_setup_loop'] = function (block) {
    var branch1 = Blockly.Arduino.statementToCode(block, 'SUBSTACK1');
    var branch2 = Blockly.Arduino.statementToCode(block, 'SUBSTACK2');
    Blockly.Arduino.setups_['setup_branch'] = branch1;
    Blockly.Arduino.loops_['loop_branch'] = branch2;
    return '';
  }

  // for
  Blockly.Arduino['motion_arduino_for'] = function (block) {
    var a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_NONE);
    var b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_NONE);
    var c = Blockly.Arduino.valueToCode(block, 'C', Blockly.Arduino.ORDER_NONE);
    var variable = block.getFieldValue('VARIABLE') || 'i';
    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    var v = Blockly.Arduino.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
    var code = `for(${v}=${a};${v}<=${b};${v}+=${c})\n{\n${branch}\n}\n`;
    return code;
  }

}