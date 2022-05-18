export default Blockly => {

    Blockly.Elfbot["looks_elfbot_ultrasonicled_show_color"] = function (block) {
        var color = block.getFieldValue("COLOR");
        return `elfbot.ult_rgb_color("${color}")\n`;
    }

    Blockly.Elfbot["looks_elfbot_ultrasonicled_crushout"] = function (block) {
        return `elfbot.ult_rgb_close()\n`;
    }

}