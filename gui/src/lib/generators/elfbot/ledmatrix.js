export default Blockly => {

    Blockly.Elfbot["looks_elfbot_ledmatrix_showimage"] = function (block) {
        var shape = block.getFieldValue("SHAPE");
        return `elfbot.display_cus("${shape}", 655)\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_showimage_duration"] = function (block) {
        var shape = block.getFieldValue("SHAPE");
        var secs = Blockly.Elfbot.valueToCode(block, "SECS", Blockly.Elfbot.ORDER_NONE);
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        return `elfbot.display_cus("${shape}", 655)\ntime.sleep(${secs})\nelfbot.display_off()\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_plot"] = function (block) {
        var x = Blockly.Elfbot.valueToCode(block, "X", Blockly.Elfbot.ORDER_NONE);
        var y = Blockly.Elfbot.valueToCode(block, "Y", Blockly.Elfbot.ORDER_NONE);
        return `elfbot.pixel_on(${x}, ${y})\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_unplot"] = function (block) {
        var x = Blockly.Elfbot.valueToCode(block, "X", Blockly.Elfbot.ORDER_NONE);
        var y = Blockly.Elfbot.valueToCode(block, "Y", Blockly.Elfbot.ORDER_NONE);
        return `elfbot.pixel_off(${x}, ${y})\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_plotorunplot"] = function (block) {
        var x = Blockly.Elfbot.valueToCode(block, "X", Blockly.Elfbot.ORDER_NONE);
        var y = Blockly.Elfbot.valueToCode(block, "Y", Blockly.Elfbot.ORDER_NONE);
        return `elfbot.pixel_blink(${x}, ${y})\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_isplot"] = function (block) {
        var x = Blockly.Elfbot.valueToCode(block, "X", Blockly.Elfbot.ORDER_NONE);
        var y = Blockly.Elfbot.valueToCode(block, "Y", Blockly.Elfbot.ORDER_NONE);
        var code = `elfbot.is_pixel_on(${x}, ${y})`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_showtext"] = function (block) {
        var value = Blockly.Elfbot.valueToCode(block, "VALUE", Blockly.Elfbot.ORDER_NONE);
        return `elfbot.display_string(str(${value}), 1)\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_showtext_untildone"] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var value = Blockly.Elfbot.valueToCode(block, "VALUE", Blockly.Elfbot.ORDER_NONE);
        return `elfbot.display_string(str(${value}), 0)\ntime.sleep(0.6 * len(str(${value})))\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_showemoticon"] = function (block) {
        var emoticon = block.getFieldValue("EMOTICON");
        emoticon = emoticon.toString(16);
        emoticon = '00'.slice(0, 2 - emoticon.length) + emoticon;
        return `elfbot.display_emoji(b"\\x${emoticon}", 655)\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_showemoticon_duration"] = function (block) {
        var emoticon = block.getFieldValue("EMOTICON");
        var timer = Blockly.Elfbot.valueToCode(block, "TIMER", Blockly.Elfbot.ORDER_NONE);
        emoticon = emoticon.toString(16);
        emoticon = '00'.slice(0, 2 - emoticon.length) + emoticon;
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        return `elfbot.display_emoji(b"\\x${emoticon}", 655)\ntime.sleep(${timer})\nelfbot.display_off()\n`;
    }

    Blockly.Elfbot["looks_elfbot_ledmatrix_crushoutscreen"] = function (block) {
        return `elfbot.display_off()\n`;
    }
    
}