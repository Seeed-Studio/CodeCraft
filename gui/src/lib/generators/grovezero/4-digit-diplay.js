export default (Blockly) => {
    Blockly.C['event_g0_four_digit_display_when_countdown_end'] = function (block) {
        Blockly.C.definitions_['define_fourDigit'] = '#define  USE_4DIGITDISPLAY 1';

        var callbackName = Blockly.C.variableDB_.getDistinctName('onFourDigitTimeEnd', Blockly.Variables.NAME_TYPE);

        block.callbackCodeHead = `void ${callbackName}(uint8_t *p)\n` +
            `{\n` +
            `if ( p && p[1] == NODE_INS_EVT && p[4] == EVT_FOURDIGDISP_TIMEDUE )` +
            `{\n`;
        block.callbackCodeTail = '}\n' + '}\n\n';
        var code = `_co_registerCB_(REG4DIGDISP,(uint32_t)${callbackName},0,0);\n`;
        return code;
    }


    Blockly.C['looks_g0_four_digit_display_show_number'] = function (block) {
        Blockly.C.definitions_['define_fourDigit'] = '#define  USE_4DIGITDISPLAY 1';
        var value = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        var code = `grovezero->fourdigitdisplay->displayNum(${value});\n`;
        return code;
    }
    Blockly.C['looks_g0_four_digit_display_off'] = function (block) {
        Blockly.C.definitions_['define_fourDigit'] = '#define  USE_4DIGITDISPLAY 1';
        var code = `grovezero->fourdigitdisplay->displayOff();\n`;
        return code;
    }
    Blockly.C['looks_g0_four_digit_display_start_countdown'] = function (block) {
        Blockly.C.definitions_['define_fourDigit'] = '#define  USE_4DIGITDISPLAY 1';
        var value = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        var code = `grovezero->fourdigitdisplay->startTimer(${value});\n`;
        return code;
    }

    Blockly.C['looks_g0_four_digit_display_set_brightness'] = function (block) {
        Blockly.C.definitions_['define_fourDigit'] = '#define  USE_4DIGITDISPLAY 1';
        var value = Blockly.C.valueToCode(block, 'BRIGHTNESS', Blockly.C.ORDER_NONE);
        var code = `grovezero->fourdigitdisplay->displayLevel(${value});\n`;
        return code;
    }

}

