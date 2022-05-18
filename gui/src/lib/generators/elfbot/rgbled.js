const hexToColorArg = (colorHex) => {
    colorHex = colorHex.replace(/"/g, "");
    var r = colorHex.slice(1, 3);
    var g = colorHex.slice(3, 5);
    var b = colorHex.slice(5, 7);
    return `\\x${r}\\x${g}\\x${b}`
}

/**
 * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
 * CC-BY-SA Tim Down:
 * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param {!string} hex Hex representation of the color.
 * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
 */
const hexToRgb = (hex) => {
    hex = hex.replace(/\"/g, '');
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}


export default Blockly => {

    Blockly.Elfbot["looks_elfbot_rgbled_show_effectscolor"] = function (block) {
        var effect = block.getFieldValue("EFFECT");
        var color = Blockly.Elfbot.valueToCode(block, "COLOR", Blockly.Elfbot.ORDER_NONE);
        var rgb = hexToRgb(color);
        return `elfbot.rgb_style('${effect}', ${rgb.r}, ${rgb.g}, ${rgb.b})\n`;
    }

    Blockly.Elfbot["looks_elfbot_rgbled_show_positioncolor"] = function (block) {
        var positon = block.getFieldValue("POSITION");
        var color = Blockly.Elfbot.valueToCode(block, "COLOR", Blockly.Elfbot.ORDER_NONE);
        var rgb = hexToRgb(color);
        return `elfbot.rgb("${positon}", ${rgb.r}, ${rgb.g}, ${rgb.b}, 655)\n`;
    }

    Blockly.Elfbot["looks_elfbot_rgbled_show_positioncolor_duration"] = function (block) {
        var positon = block.getFieldValue("POSITION");
        var color = Blockly.Elfbot.valueToCode(block, "COLOR", Blockly.Elfbot.ORDER_NONE);
        var timer = Blockly.Elfbot.valueToCode(block, "TIMER", Blockly.Elfbot.ORDER_NONE);
        var rgb = hexToRgb(color);
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        return `elfbot.rgb("${positon}", ${rgb.r}, ${rgb.g}, ${rgb.b}, 655)\ntime.sleep(${timer})\nelfbot.rgb_close()\n`;
    }

    Blockly.Elfbot["looks_elfbot_rgbled_show_color"] = function (block) {
        var color = block.getFieldValue("COLOR");
        return `elfbot.rgb_color("${color}","all")\n`;
    }

    Blockly.Elfbot["looks_elfbot_rgbled_crushout"] = function () {
        return `elfbot.rgb_close()\n`;
    }
}