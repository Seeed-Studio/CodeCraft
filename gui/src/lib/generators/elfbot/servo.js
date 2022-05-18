export default Blockly => {

    Blockly.Elfbot['motion_elfbot_headservo_lookleft'] = function (block) {

        var degress = block.getFieldValue('DEGREES')
        return `elfbot.look_left(${degress})\n`;
    }

    Blockly.Elfbot['motion_elfbot_headservo_lookright'] = function (block) {
        var degress = block.getFieldValue('DEGREES')
        return `elfbot.look_right(${degress})\n`;
    }

    Blockly.Elfbot['motion_elfbot_headservo_lookup'] = function (block) {
        var degress = block.getFieldValue('DEGREES')
        return `elfbot.look_up(${degress})\n`;
    }

    Blockly.Elfbot['motion_elfbot_headservo_lookdown'] = function (block) {
        var degress = block.getFieldValue('DEGREES')
        return `elfbot.look_down(${degress})\n`;
    }

    Blockly.Elfbot['motion_elfbot_earservo_turnforword'] = function (block) {
        var degress = block.getFieldValue('DEGREES')
        return `elfbot.ear_turn_front(${degress})\n`;
    }

    Blockly.Elfbot['motion_elfbot_earservo_turnbackword'] = function (block) {
        var degress = block.getFieldValue('DEGREES')
        return `elfbot.ear_turn_back(${degress})\n`;
    }

}