export default Blockly => {

    Blockly.Powering['motion_haloboad_radio_when_revmsg'] = function (block) {
        var message = Blockly.Powering.valueToCode(block, 'MES', Blockly.Powering.ORDER_ATOMIC);
        var msgName = Blockly.Powering.variableDB_.getDistinctName('msg', Blockly.Variables.NAME_TYPE);
        var msgFlag = Blockly.Powering.variableDB_.getDistinctName('flag', Blockly.Variables.NAME_TYPE);
        var blockFuncName = `exec_receive_${msgName}`;

        var initCode =
            `msg_${msgFlag} = 1\n` +
            `\n\n` +
            `def receive_radio_${msgName}(msg = ${message}):\n` +
            `    if not sta_radio.ReceiveMsg.comparestr(msg):\n` +
            `        return\n` +
            `    global msg_${msgFlag}\n` +
            `    if msg_${msgFlag}:\n` +
            `        msg_${msgFlag} = 0\n` +
            `        pass\n` +
            `        ${blockFuncName}()\n`;

        Blockly.Powering.defradiorevs_[`receive${msgName}`] = `receive_radio_${msgName}(${message})`;
        Blockly.Powering.definitions_['import_staradio'] = 'import sta_radio\nfrom sta_radio import ReceiveMsg';
        Blockly.Powering.definitions_[`var_init${msgName}`] = initCode;
        return `def ${blockFuncName}():\n`;
    }

    Blockly.Powering['motion_haloboad_radio_setchannel'] = function (block) {
        Blockly.Powering.definitions_['import_apradio'] = 'from ap_radio import RadioMessage';
        Blockly.Powering.definitions_['var_initradio'] = 'radio = RadioMessage()';
        var channel = Blockly.Powering.valueToCode(block, 'CHANNEL', Blockly.Powering.ORDER_ATOMIC) || 0;
        return `radio.setChannel(${channel})\n`;
    }

    Blockly.Powering['motion_haloboad_radio_sendmsg'] = function (block) {
        Blockly.Powering.definitions_['import_apradio'] = 'from ap_radio import RadioMessage';
        Blockly.Powering.definitions_['var_initradio'] = 'radio = RadioMessage()';
        var message = Blockly.Powering.valueToCode(block, 'MES', Blockly.Powering.ORDER_ATOMIC) || 0;
        return `radio.send_radio_msg(${message})\n`;
    }

    Blockly.Powering['event_whenbroadcastreceived'] = function (block) {
        return ``;
    }

    Blockly.Powering['event_broadcast'] = function (block) {
        return ``;
    }

    Blockly.Powering['event_broadcastandwait'] = function (block) {
        return ``;
    }

    Blockly.Powering['event_broadcast_menu'] = function (block) {
        return [``, Blockly.Powering.ORDER_ATOMIC];
    }

}
