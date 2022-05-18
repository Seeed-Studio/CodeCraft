export default Blockly => {

    Blockly.Elfbot["sensing_elfbot_sound_loudness"] = function (block) {
        var code =  `elfbot.get_loudness()`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

}