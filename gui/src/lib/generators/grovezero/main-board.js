export default (Blockly) => {
    Blockly.C['event_g0_mainboard_start'] = function (block) {

        var callbackName = Blockly.C.variableDB_.getDistinctName('onStartUp', Blockly.Variables.NAME_TYPE);
        block.callbackCodeHead = `void ${callbackName}(void)\n` + `{\n`
        block.callbackCodeTail = '}\n\n';

        var code = `grovezero->blecore->onstartup((int)${callbackName});\n`;
        return code;
    };

    Blockly.C['event_g0_mainboard_when_arrival_time'] = function (block) {
        var value = Blockly.C.valueToCode(block, 'TIME', Blockly.C.ORDER_NONE);
        var callbackName = Blockly.C.variableDB_.getDistinctName('onTimer', Blockly.Variables.NAME_TYPE);

        block.callbackCodeHead = `void ${callbackName}(void)\n` + `{\n`
        block.callbackCodeTail = '}\n\n';

        var code = `grovezero->blecore->addtimer(${value},(int)${callbackName});\n`;
        return code;
    };

    Blockly.C['sensing_g0_mainboard_resettimer'] = function (block) {
        var code = 'grovezero->blecore->resettimer();\n';
        return code;
    };

    Blockly.C['sensing_g0_mainboard_timer'] = function (block) {
        var code = `grovezero->blecore->gettimer()`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

    Blockly.C['event_g0_mainboard_broadcast'] = function (block) {
        let value = Blockly.C.valueToCode(block, 'BROADCAST_OPTION', Blockly.C.ORDER_NONE);
        let brocastStr = value;
        return `grovezero->blecore->broadcastsend(${brocastStr});\n`;
    }

    Blockly.C['event_g0_mainboard_stop_broadcast'] = function (block) {
        return 'grovezero->blecore->broadcaststop();\n';
    }

    Blockly.C['event_g0_mainboard_set_broadcast_channel'] = function (block) {
        let ch = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        return `grovezero->blecore->broadcastset(${ch});\n`;
    }

    Blockly.C['event_g0_mainboard_when_radio_receive'] = function (block) {
        let value = Blockly.C.valueToCode(block, 'RECEIVE', Blockly.C.ORDER_NONE);
        let brocastStr = value;
        let callbackName = Blockly.C.variableDB_.getDistinctName('onWirelessReceive', Blockly.Variables.NAME_TYPE);
        block.callbackCodeHead = `void ${callbackName}(void)\n` + `{\n`
        block.callbackCodeTail = '}\n\n';
        let code = `grovezero->blecore->onbroadcastrecv((int)${callbackName},${brocastStr});\n`;
        return code;
    }


    Blockly.C['operator_g0_itoa'] = function (block) {
        var itoastr = Blockly.C.variableDB_.getDistinctName('itoastr', Blockly.Variables.NAME_TYPE);
        Blockly.C.definitions_[`define_${itoastr}`] = `const char ${itoastr}[64];`;
        var argument0 = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        var code = `grovezero->string->itoa(${argument0},${itoastr},10)`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
      }
}

