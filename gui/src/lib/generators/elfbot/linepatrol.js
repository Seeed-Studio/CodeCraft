const colorDict = [
    'red', 'green', 'blue', 'yellow', 'cyan', 'purple', 'black', 'white'
]

export default Blockly => {
    Blockly.Elfbot['sensing_elfbot_linepatrol_detect_color'] = function (block) {
        var color = block.getFieldValue("COLOR");
        var code = `elfbot.is_color('${colorDict[color - 1]}')`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['sensing_elfbot_linepatrol_line_location'] = function (block) {
        var opt = block.getFieldValue("OPT");
        var liner = block.getFieldValue("LINER");
        var code = `False`;
        switch (opt) {
            case 'middle': code = `elfbot.get_line_position(${liner}) == 1`; break;
            case 'lost': code = `elfbot.get_line_position(${liner}) == 2`; break;
            case 'left': code = `elfbot.get_line_position(${liner}) == 3`; break;
            case 'left-most': code = `elfbot.get_line_position(${liner}) == 4`; break;
            case 'right': code = `elfbot.get_line_position(${liner}) == 5`; break;
            case 'right-most': code = `elfbot.get_line_position(${liner}) == 6`; break;

        }
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['sensing_elfbot_linepatrol_last_line'] = function (block) {
        var opt = block.getFieldValue("OPT");

        var code = `elfbot.get_liner() == ${opt}`;

        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot['sensing_elfbot_linepatrol_get_value'] = function (block) {
        return `elfbot.liner_read()\n`;
    }



}


