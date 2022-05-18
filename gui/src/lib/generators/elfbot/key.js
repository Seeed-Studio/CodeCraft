export default Blockly => {

    Blockly.Elfbot["sensing_elfbot_button_s_ispressed"] = function (block) {
        var code = `elfbot.is_button_pressed()`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

}