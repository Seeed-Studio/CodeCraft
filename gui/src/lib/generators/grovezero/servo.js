export default (Blockly) => {

    Blockly.C['motion_g0_servo_turn_angle'] = function (block) {
        Blockly.C.definitions_['define_servo'] = '#define USE_SERVO 1';
        var angle = Blockly.C.valueToCode(block, 'ANGLE', Blockly.C.ORDER_NONE);
        var code = `grovezero->servo->setAngle(${angle});\n`;
        return code;
    }

}
