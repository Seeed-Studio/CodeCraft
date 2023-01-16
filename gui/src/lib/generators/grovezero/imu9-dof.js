const getEventDefine = (key) => {
    switch (key) {
        case 'straight_down':
            return 'EVT_IMU9SENEOR_FRONT';
        case 'straight_up':
            return 'EVT_IMU9SENEOR_BACK';
        case 'tilt_right':
            return 'EVT_IMU9SENEOR_RIGHT';
        case 'tilt_left':
            return 'EVT_IMU9SENEOR_LEFT';
        case 'face_up':
            return 'EVT_IMU9SENEOR_FACEUP';
        case 'face_down':
            return 'EVT_IMU9SENEOR_FACEDOWN';
        case 'shake':
            return 'EVT_IMU9SENEOR_SHAKE';
        case 'free_fail':
            return 'EVT_IMU9SENEOR_FALLING';
    }
}
export default (Blockly) => {

    Blockly.C['event_g0_imu9_dof_status_when_change'] = function (block) {
        var opt = block.getFieldValue('OPT');
        Blockly.C.definitions_['define_imu9sensor'] = '#define USE_IMU9SENSOR 1';

        var callbackName = Blockly.C.variableDB_.getDistinctName('onIMU9Sensor', Blockly.Variables.NAME_TYPE);
        block.callbackCodeHead = `void ${callbackName}(uint8_t *p)\n` +
            `{\n` +
            `if ( p && p[1] == NODE_INS_EVT && p[4] == ${getEventDefine(opt)} )` +
            `{\n`;
        block.callbackCodeTail = '}\n' + '}\n\n';

        var code = `_co_registerCB_(REGIMU9,(uint32_t)${callbackName},0,0);\n`;
        return code;
    };


    Blockly.C['sensing_g0_imu9_dof_get_value'] = function (block) {
        var direct = block.getFieldValue('DIRECT');
        switch (direct) {
            case 'x':
                direct = '0';
                break;
            case 'y':
                direct = '1';
                break;
            case 'z':
                direct = '2';
                break;
        }
        var code = `(int)(grovezero->imu9->getvalue(${direct}))`;
        Blockly.C.definitions_['define_imu9sensor'] = '#define USE_IMU9SENSOR 1';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

    Blockly.C['sensing_g0_imu9_magnetic_get_value'] = function (block) {
        var direct = block.getFieldValue('DIRECT');
        switch (direct) {
            case 'x':
                direct = '0';
                break;
            case 'y':
                direct = '1';
                break;
            case 'z':
                direct = '2';
                break;
            case 'strength':
                direct = '3';
                break;
        }
        var code = `(int)(grovezero->imu9->getmagnetic(${direct}))`;
        Blockly.C.definitions_['define_imu9sensor'] = '#define USE_IMU9SENSOR 1';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

    Blockly.C['sensing_g0_imu9_angular_rate_get_value'] = function (block) {
        var direct = block.getFieldValue('DIRECT');
        switch (direct) {
            case 'x':
                direct = '0';
                break;
            case 'y':
                direct = '1';
                break;
            case 'z':
                direct = '2';
                break;
        }
        var code = `(int)(grovezero->imu9->getangular(${direct}))`;
        Blockly.C.definitions_['define_imu9sensor'] = '#define USE_IMU9SENSOR 1';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

    Blockly.C['sensing_g0_imu9_rotation_get_value'] = function (block) {
        var action = block.getFieldValue('ACTION');
        var code = `(int)(grovezero->imu9->getrotation(${action}))`;
        Blockly.C.definitions_['define_imu9sensor'] = '#define USE_IMU9SENSOR 1';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }
}

