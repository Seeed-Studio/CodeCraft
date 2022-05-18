export default Blockly => {
    Blockly.ArduinoOpenCat['motion_opencat_gait_run_craw'] = function (block) {
        var opts = block.getFieldValue('OPTS');
        var code = `bitty_set(F("${opts}"));`;
        return code
    };
    Blockly.ArduinoOpenCat['motion_opencat_gait_run_back'] = function (block) {
        var opts = block.getFieldValue('OPTS');
        // return `BittyBack(${opts}, ${secs});\n`;
        var code = `bitty_set(F("${opts}"));`;
        return code
    };
    Blockly.ArduinoOpenCat['motion_opencat_gait_run_trot'] = function (block) {
        var opts = block.getFieldValue('OPTS');
        // return `BittyTrot(${opts}, ${secs});\n`;
        var code = `bitty_set(F("${opts}"));`;
        return code
    };
    Blockly.ArduinoOpenCat['motion_opencat_gait_run_walk'] = function (block) {
        var opts = block.getFieldValue('OPTS');
        // return `BittyWalk(${opts}, ${secs});\n`;
        var code = `bitty_set(F("${opts}"));`;
        return code
    };
    Blockly.ArduinoOpenCat['motion_opencat_gait_run_eggs'] = function (block) {
        // var secs = Blockly.ArduinoOpenCat.valueToCode(block, 'SECS', Blockly.ArduinoOpenCat.ORDER_ATOMIC) || 0;
        // return `BittyEggs(${secs});\n`;
        var code = `bitty_set(F("bdF"));`;
        return code
    };

    Blockly.ArduinoOpenCat['motion_opencat_gait_step_in_place'] = function (block) {
        var code = `bitty_set(F("vt"));`;
        return code
    };

    Blockly.ArduinoOpenCat['motion_opencat_posture_fixed_run'] = function (block) {
        var opts = block.getFieldValue('OPTS');
        // return `BittyGait(${opts});\n`;
        var code = `bitty_set(F("${opts}"));`;
        return code
    };

    Blockly.ArduinoOpenCat['motion_opencat_posture_run'] = function (block) {
        var opts = block.getFieldValue('OPTS');
        // var secs = Blockly.ArduinoOpenCat.valueToCode(block, 'SECS', Blockly.ArduinoOpenCat.ORDER_ATOMIC) || 0;
        // return `BittyPosture(${opts}, ${secs});\n`;
        var val
        switch (opts) {
            case 'cd1':
                val = 'cd';
                break;
            case 'hi':
                val = 'hi';
                break;
            case 'pee':
                val = 'pee';
                break;
            case 'pu1':
                val = 'pu';
                break;
        }
        var code = `bitty_set(F("${val}"));`;
        return code
    };

    Blockly.ArduinoOpenCat['motion_opencat_pause_action'] = function (block) {
        // return 'delay(3);\nbitty_move();';
        return '\nbitty_move();';

    };
    Blockly.ArduinoOpenCat['motion_opencat_stop_action'] = function (block) {
        // return 'BittyStop();\n';
        return 'bitty_set(F("rest"));\n';
    };
    Blockly.ArduinoOpenCat['motion_opencat_legservo_set'] = function (block) {
        var opts = block.getFieldValue('SETVALUE');
        var angle = Blockly.ArduinoOpenCat.valueToCode(block, 'ANGLE', Blockly.ArduinoOpenCat.ORDER_ATOMIC) || 0;
        return `BittyServo(${opts}, ${angle});\n`;
    };
    Blockly.ArduinoOpenCat['motion_opencat_headservo_set'] = function (block) {
        var angle = Blockly.ArduinoOpenCat.valueToCode(block, 'ANGLE', Blockly.ArduinoOpenCat.ORDER_ATOMIC) || 0;
        return `BittyServo(0,${angle});\n`;
    };
}
