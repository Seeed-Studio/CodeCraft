export default Blockly => {

    Blockly.Microbit['motion_microbit_wireless_open'] = function (block) {
        Blockly.Microbit.definitions_['radio_import'] = 'import radio';
        return `radio.on()\n`;
    }

    Blockly.Microbit['motion_microbit_wireless_closed'] = function (block) {
        Blockly.Microbit.definitions_['radio_import'] = 'import radio';
        return `radio.off()\n`;
    }

    Blockly.Microbit['motion_microbit_wireless_reset'] = function (block) {
        Blockly.Microbit.definitions_['radio_import'] = 'import radio';
        return `radio.reset()\n`;
    }

    Blockly.Microbit['motion_microbit_wireless_send'] = function (block) {
        Blockly.Microbit.definitions_['radio_import'] = 'import radio';
        var message = Blockly.Microbit.valueToCode(block, 'MESSAGE', Blockly.Microbit.ORDER_ATOMIC) || '';
        return `radio.send(str(${message}))\n`;
    }

    Blockly.Microbit['motion_microbit_wireless_receive'] = function (block) {
        Blockly.Microbit.definitions_['radio_import'] = 'import radio';
        return [`radio.receive()`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['motion_microbit_wireless_setchannel'] = function (block) {
        Blockly.Microbit.definitions_['radio_import'] = 'import radio';
        var channel = block.getFieldValue('CHANNEL');
        return `radio.config(channel=${channel})\n`;
    }

}