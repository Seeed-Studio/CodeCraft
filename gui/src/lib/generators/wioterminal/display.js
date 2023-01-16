export default (Blockly) => {

    const hex24_16 = (color) => {
        let rstr = color.slice(2,4);
        let gstr = color.slice(4,6);
        let bstr = color.slice(6,8);

        let r = parseInt(rstr, 16) >> 3;
        let g = parseInt(gstr, 16) >> 2;
        let b = parseInt(bstr, 16) >> 3;

        let c = r*2048 + g*32 + b;
        let hex = c.toString(16).toUpperCase();
        return hex;
    }

    Blockly.Arduino['display_wioterminal_screen_towards'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let direct = block.getFieldValue('DIRECT');
        let code = `tft.setRotation(${direct});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_set_screen_background_color'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        
        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#FFFFFF";
        let hex = hex24_16(color);
        let code = `tft.fillScreen(0x${hex});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_set_text_size'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let size = block.getFieldValue('SIZE');
        let code = `tft.setTextSize(${size});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_set_text_color'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';

        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#FFFFFF";
        let hex = hex24_16(color);
        let code = `tft.setTextColor(0x${hex});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_println_string'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let message = Blockly.Arduino.valueToCode(block, 'MESSAGE', Blockly.Arduino.ORDER_NONE) || "";
        let code = `tft.println(${message});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_print_string_at_point'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let message = Blockly.Arduino.valueToCode(block, 'MESSAGE', Blockly.Arduino.ORDER_NONE) || "";
        let x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
        let y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_NONE);
        let code = `tft.drawString((String)${message}, ${x}, ${y});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_screen_clear_reset'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#000000";
        let hex = hex24_16(color);
        let code = `tft.fillScreen(0x${hex});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_show_image'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['include_seeed_fs'] = '#include"Seeed_FS.h"';
        Blockly.Arduino.definitions_['include_raw_image'] = '#include"RawImage.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_sd_begin'] = 
`   if (!SD.begin(SDCARD_SS_PIN, SDCARD_SPI)) {
        while (1);
    }`;
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let imgPath = Blockly.Arduino.valueToCode(block, 'IMG_PATH', Blockly.Arduino.ORDER_NONE) || "";
        let x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
        let y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_NONE);
        let code = `drawImage<uint8_t>(${imgPath}, ${x},${y});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_draw_pixel'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
        let y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_NONE);
        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#FFFFFF";
        let hex = hex24_16(color);
        let code = `tft.drawPixel(${x},${y},0x${hex});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_draw_line'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let p1x = Blockly.Arduino.valueToCode(block, 'P1X', Blockly.Arduino.ORDER_NONE);
        let p1y = Blockly.Arduino.valueToCode(block, 'P1Y', Blockly.Arduino.ORDER_NONE);
        let p2x = Blockly.Arduino.valueToCode(block, 'P2X', Blockly.Arduino.ORDER_NONE);
        let p2y = Blockly.Arduino.valueToCode(block, 'P2Y', Blockly.Arduino.ORDER_NONE);
        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#FFFFFF";
        let hex = hex24_16(color);
        let code = `tft.drawLine(${p1x},${p1y},${p2x},${p2y},0x${hex});\n`;
        return code;
    };

    Blockly.Arduino['display_wioterminal_draw_rect'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
        let y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_NONE);
        let width = Blockly.Arduino.valueToCode(block, 'WIDTH', Blockly.Arduino.ORDER_NONE);
        let height = Blockly.Arduino.valueToCode(block, 'HEIGHT', Blockly.Arduino.ORDER_NONE);
        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#FFFFFF";
        let hex = hex24_16(color);
        let fill = block.getFieldValue('FILL');
        let code = `tft.drawRect(${x},${y},${width},${height},0x${hex});\n`;
        if (fill=='2') {
            code += `tft.fillRect(${x},${y},${width},${height},0x${hex});\n`;
        }
        return code;
    };

    Blockly.Arduino['display_wioterminal_draw_circle'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
        let y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_NONE);
        let r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_NONE);
        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#FFFFFF";
        let hex = hex24_16(color);
        let fill = block.getFieldValue('FILL');
        let code = `tft.drawCircle(${x},${y},${r},0x${hex});\n`;
        if (fill=='2') {
            code += `tft.fillCircle(${x},${y},${r},0x${hex});\n`;
        }
        return code;
    };

    Blockly.Arduino['display_wioterminal_draw_triangles'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let p1x = Blockly.Arduino.valueToCode(block, 'P1X', Blockly.Arduino.ORDER_NONE);
        let p1y = Blockly.Arduino.valueToCode(block, 'P1Y', Blockly.Arduino.ORDER_NONE);
        let p2x = Blockly.Arduino.valueToCode(block, 'P2X', Blockly.Arduino.ORDER_NONE);
        let p2y = Blockly.Arduino.valueToCode(block, 'P2Y', Blockly.Arduino.ORDER_NONE);
        let p3x = Blockly.Arduino.valueToCode(block, 'P3X', Blockly.Arduino.ORDER_NONE);
        let p3y = Blockly.Arduino.valueToCode(block, 'P3Y', Blockly.Arduino.ORDER_NONE);
        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#FFFFFF";
        let hex = hex24_16(color);
        let fill = block.getFieldValue('FILL');
        let code = `tft.drawTriangle(${p1x},${p1y},${p2x},${p2y},${p3x},${p3y},0x${hex});\n`;
        if (fill=='2') {
            code += `tft.fillTriangle(${p1x},${p1y},${p2x},${p2y},${p3x},${p3y},0x${hex});\n`;
        }
        return code;
    };

    Blockly.Arduino['display_wioterminal_draw_round_rect'] = function (block) {
        Blockly.Arduino.definitions_['include_tft'] = '#include"TFT_eSPI.h"';
        Blockly.Arduino.definitions_['var_tft'] = 'TFT_eSPI tft;';
        Blockly.Arduino.setups_['setup_tft'] = '  tft.begin();';
        let x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
        let y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_NONE);
        let width = Blockly.Arduino.valueToCode(block, 'WIDTH', Blockly.Arduino.ORDER_NONE);
        let height = Blockly.Arduino.valueToCode(block, 'HEIGHT', Blockly.Arduino.ORDER_NONE);
        let r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_NONE);
        let color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE) || "#FFFFFF";
        let hex = hex24_16(color);
        let fill = block.getFieldValue('FILL');
        let code = `tft.drawRoundRect(${x},${y},${width},${height},${r},0x${hex});\n`;
        if (fill=='2') {
            code += `tft.fillRoundRect(${x},${y},${width},${height},${r},0x${hex});\n`;
        }
        return code;
    };

}