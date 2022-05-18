export default Blockly => {

    Blockly.Elfbot["sensing_elfbot_light_intensity"] = function (block) {
        var code = `elfbot.get_light_strength()`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }
    
}