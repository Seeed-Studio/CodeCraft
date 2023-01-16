const getEventDefine = (opt) => {
    let key;
    switch (opt) {
        case 'swipe_left':
            key = 'EVT_GESTURE_LEFT';
            break;
        case 'swipe_right':
            key = 'EVT_GESTURE_RIGHT';
            break;
        case 'swipe_up':
            key = 'EVT_GESTURE_UP';
            break;
        case 'swipe_down':
            key = 'EVT_GESTURE_DOWN';
            break;
        case 'approaching':
            key = 'EVT_GESTURE_CLOSE';
            break;
        case 'departing':
            key = 'EVT_GESTURE_ESCAPE';
            break;
        case 'circle_clockwise':
            key = 'EVT_GESTURE_CLOCKWISE';
            break;
        case 'circle_anticlockwise':
            key = 'EVT_GESTURE_ANTICLOCKWISE';
            break;
        case 'finger_waving':
            key = 'EVT_GESTURE_WAVE';
            break;
        default:
            break;
    }
    return key;
}

export default (Blockly) => {
    Blockly.C['event_g0_gesture_sensor_when_change'] = function (block) {
        Blockly.C.definitions_['define_gesture'] = '#define USE_GESTURE 1';
        var opt = block.getFieldValue('CONTROL_OPT');

        var callbackName = Blockly.C.variableDB_.getDistinctName('onGesture', Blockly.Variables.NAME_TYPE);;
        block.callbackCodeHead = `void ${callbackName}(uint8_t *p)\n` +
            `{\n` +
            `if ( p && p[1] == NODE_INS_EVT && p[4] == ${getEventDefine(opt)} )` +
            `{\n`;
        block.callbackCodeTail = '}\n' + '}\n\n';
        var code = `_co_registerCB_(REGGESTURE,(uint32_t)${callbackName},0,0);\n`;
        return code;
    }
}

