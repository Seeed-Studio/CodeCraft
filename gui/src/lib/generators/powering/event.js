export default Blockly => {

    Blockly.Powering['event_haloboad_when_startup'] = function (block) {
        var funcName = Blockly.Powering.variableDB_.getDistinctName('on_start', Blockly.Variables.NAME_TYPE);
        Blockly.Powering.initfuncs_[`@event.${funcName}`] = `${funcName}()`;
        return `def ${funcName}():\n`;
    }

    Blockly.Powering['event_haloboad_when_button_pressed'] = function (block) {
        Blockly.Powering.definitions_['import_thread'] = 'import _thread';
        var callFuncName = Blockly.Powering.variableDB_.getDistinctName('func_on_button', Blockly.Variables.NAME_TYPE);
        var defineFuncName = Blockly.Powering.variableDB_.getDistinctName('key_press', Blockly.Variables.NAME_TYPE);
        var defineKeyEvent =
            `@event.on_button_pressed\n` +
            `def ${defineFuncName}():\n` +
            `    _thread.start_new_thread(${callFuncName}, ())\n`;
        Blockly.Powering.definitions_[`var_${defineKeyEvent}`] = defineKeyEvent;
        return `def ${callFuncName}():\n`;
    }

    Blockly.Powering['event_haloboad_when_button_pressed_greaterthan_3_sec'] = function (block) {
        return `@event.on_button_hold\ndef key_hold():\n`;
    }

    Blockly.Powering['event_haloboad_when_shaking'] = function (block) {
        Blockly.Powering.definitions_['import_thread'] = 'import _thread';
        Blockly.Powering.definitions_['var_motionEvent'] = 'motion = PoweRingMotion(ring.imu)';
        var callFuncName = Blockly.Powering.variableDB_.getDistinctName('func_on_shake', Blockly.Variables.NAME_TYPE);
        var defineFuncName = Blockly.Powering.variableDB_.getDistinctName('shake_handle', Blockly.Variables.NAME_TYPE);
        var defineKeyEvent =
            `@motion.on_shake\n` +
            `def ${defineFuncName}():\n` +
            `    _thread.start_new_thread(${callFuncName}, ())\n`;
        Blockly.Powering.definitions_[`var_${defineKeyEvent}`] = defineKeyEvent;
        return `def ${callFuncName}():\n`;
    }

    Blockly.Powering['event_haloboad_when_punching'] = function (block) {
        Blockly.Powering.definitions_['import_thread'] = 'import _thread';
        Blockly.Powering.definitions_['var_motionEvent'] = 'motion = PoweRingMotion(ring.imu)';
        var callFuncName = Blockly.Powering.variableDB_.getDistinctName('func_on_punch', Blockly.Variables.NAME_TYPE);
        var defineFuncName = Blockly.Powering.variableDB_.getDistinctName('punch_handle', Blockly.Variables.NAME_TYPE);
        var defineKeyEvent =
            `@motion.on_punch\n` +
            `def ${defineFuncName}():\n` +
            `    _thread.start_new_thread(${callFuncName}, ())\n`;
        Blockly.Powering.definitions_[`var_${defineKeyEvent}`] = defineKeyEvent;
        return `def ${callFuncName}():\n`;
    }

    Blockly.Powering['event_haloboad_waituntil_end'] = function (block) {
        return `ring.turn_on('all',20,0,0)\ntime.sleep(0.15)\nring.power_off()\n`;
    }

}