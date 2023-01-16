export default Blockly => {

    Blockly.Powering['motion_haloboad_timer_resetall'] = function (block) {
        Blockly.Powering.definitions_['import_timerapi'] = 'from timerapi import*';
        return `timer_all_reset()\n`;
    }

    Blockly.Powering['motion_haloboad_timer_resetA'] = function (block) {
        Blockly.Powering.definitions_['import_timerapi'] = 'from timerapi import*';
        return `timer_A_reset()\n`;
    }

    Blockly.Powering['motion_haloboad_timer_getvalueA'] = function (block) {
        Blockly.Powering.definitions_['import_timerapi'] = 'from timerapi import*';
        return [`get_timer_A()`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['event_haloboad_timerA_when_greaterthan'] = function (block) {
        Blockly.Powering.definitions_['import_timerapi'] = 'from timerapi import*';
        Blockly.Powering.definitions_['import_thread'] = 'import _thread';
        var secs = Blockly.Powering.valueToCode(block, 'SEC', Blockly.Powering.ORDER_ATOMIC) || 0;
        var callFuncName = Blockly.Powering.variableDB_.getDistinctName('func_on_timerA', Blockly.Variables.NAME_TYPE);
        var defineFuncName = Blockly.Powering.variableDB_.getDistinctName('timer_A', Blockly.Variables.NAME_TYPE);
        var defineKeyEvent =
            `@on_event_timer_A(${secs})\n` +
            `def ${defineFuncName}(Time):\n` +
            `    _thread.start_new_thread(${callFuncName}, ())\n`;
        Blockly.Powering.definitions_[`var_${defineKeyEvent}`] = defineKeyEvent;
        return `def ${callFuncName}():\n`;
    }

    Blockly.Powering['motion_haloboad_timer_resetB'] = function (block) {
        Blockly.Powering.definitions_['import_timerapi'] = 'from timerapi import*';
        return `timer_B_reset()\n`;
    }

    Blockly.Powering['motion_haloboad_timer_getvalueB'] = function (block) {
        Blockly.Powering.definitions_['import_timerapi'] = 'from timerapi import*';
        return [`get_timer_B()`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['event_haloboad_timerB_when_greaterthan'] = function (block) {
        Blockly.Powering.definitions_['import_timerapi'] = 'from timerapi import*';
        Blockly.Powering.definitions_['import_thread'] = 'import _thread';
        var secs = Blockly.Powering.valueToCode(block, 'SEC', Blockly.Powering.ORDER_ATOMIC) || 0;
        var callFuncName = Blockly.Powering.variableDB_.getDistinctName('func_on_timerB', Blockly.Variables.NAME_TYPE);
        var defineFuncName = Blockly.Powering.variableDB_.getDistinctName('timer_B', Blockly.Variables.NAME_TYPE);
        var defineKeyEvent =
            `@on_event_timer_B(${secs})\n` +
            `def ${defineFuncName}(Time):\n` +
            `    _thread.start_new_thread(${callFuncName}, ())\n`;
        Blockly.Powering.definitions_[`var_${defineKeyEvent}`] = defineKeyEvent;
        return `def ${callFuncName}():\n`;
    }

    Blockly.Powering['motion_haloboad_timer_reset'] = function (block) {
        return "";
    }

    Blockly.Powering['motion_haloboad_timer_getvalue'] = function (block) {
        return "";
    }

    Blockly.Powering['event_haloboad_timer_when_greaterthan'] = function (block) {
        return "";
    }

}