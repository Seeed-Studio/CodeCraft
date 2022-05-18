export default Blockly => {

    // 红外反射光强度
    Blockly.Elfbot["sensing_elfbot_infrared_lightintensity"] = function (block) {
        var code = `elfbot.get_ir_reflected()`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    // 是否悬空
    Blockly.Elfbot["sensing_elfbot_infrared_detected_ishead"] = function (block) {
        var code = `elfbot.get_ir_reflected() < 2000`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

}