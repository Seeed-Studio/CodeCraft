export default Blockly => {

    Blockly.Elfbot["sensing_elfbot_ultrasonic_distance"] = function (block) {
        var code =  `elfbot.get_obstacle_distance()`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot["sensing_elfbot_ultrasonic_isdetectedobject"] = function (block) {
        var code =  `elfbot.get_obstacle_distance() < 300`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

}