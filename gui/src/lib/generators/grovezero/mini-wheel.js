const miniwheelVelocityToKey = (velocity) => {
    let key = 0;
    switch (velocity) {
        case 'low': key = 1; break;
        case 'medium': key = 2; break;
        case 'high': key = 3; break;
    }
    return key;
}
const miniwheelAzimuthToKey = (azimuth) => {
    let key = 0;
    switch (azimuth) {
        case 'forward': key = 1; break;
        case 'backward': key = 2; break;
        case 'left': key = 3; break;
        case 'right': key = 4; break;
        case 'clockwise': key = 5; break;
        case 'counterclockwise': key = 6; break;
    }
    return key;
}

export default (Blockly) => {
    Blockly.C['motion_g0_miniwheel_run_velocity_azimuth'] = function (block) {
        Blockly.C.definitions_['define_miniwheel'] = '#define USE_MINIWHEEL 1';
        var velocity = block.getFieldValue('VELOCITY');
        var azimuth = block.getFieldValue('AZIMUTH');
        velocity = miniwheelVelocityToKey(velocity);
        azimuth = miniwheelAzimuthToKey(azimuth);
        var code = 'grovezero->chassis->motion(' + velocity + ',' + azimuth + ');\n';
        return code;
    }

    Blockly.C['motion_g0_miniwheel_stop'] = function (block) {
        Blockly.C.definitions_['define_miniwheel'] = '#define USE_MINIWHEEL 1';
        var code = 'grovezero->chassis->stop();\n';
        return code;
    }

    Blockly.C['motion_g0_miniwheel_set_power'] = function (block) {
        Blockly.C.definitions_['define_miniwheel'] = '#define USE_MINIWHEEL 1';
        let left = Blockly.C.valueToCode(block, 'LEFT_POWER', Blockly.C.ORDER_NONE);
        let right = Blockly.C.valueToCode(block, 'RIGHT_POWER', Blockly.C.ORDER_NONE);
        let code = 'grovezero->chassis->run(' + left + ',' + right + ');\n';
        return code;
    }
}

