export default (Blockly) => {
    Blockly.C['motion_g0_dc_motor_trun_power'] = function (block) {
        Blockly.C.definitions_['define_dcMotor'] = '#define USE_DCMOTOR 1';
        var motorNum = block.getFieldValue('MOTOR_NO');
        var power = Blockly.C.valueToCode(block, 'POWER', Blockly.C.ORDER_NONE);
        switch (motorNum) {
            case '0x03': motorNum = 1; break;
            case '0x02': motorNum = 2; break;
        }
        return `grovezero->dcmotor->run_duration(${motorNum}, ${power}, ${0});\n`;
    }

    Blockly.C['motion_g0_dc_motor_stop'] = function (block) {
        Blockly.C.definitions_['define_dcMotor'] = '#define USE_DCMOTOR 1';
        var motorNum = block.getFieldValue('MOTOR_NO');
        switch (motorNum) {
            case '0x03': motorNum = 1; break;
            case '0x02': motorNum = 2; break;
        }
        return `grovezero->dcmotor->run_duration(${motorNum}, 0, 0);\n`;
    }
}

