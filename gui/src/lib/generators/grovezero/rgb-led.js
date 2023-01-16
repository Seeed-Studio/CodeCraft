/**
 * Convert an HSV color to RGB format.
 * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
 * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
 */
const hsvToRgb = (hsv) => {
    let h = hsv.h % 360;
    if (h < 0) h += 360;
    const s = Math.max(0, Math.min(hsv.s, 1));
    const v = Math.max(0, Math.min(hsv.v, 1));

    const i = Math.floor(h / 60);
    const f = (h / 60) - i;
    const p = v * (1 - s);
    const q = v * (1 - (s * f));
    const t = v * (1 - (s * (1 - f)));

    let r;
    let g;
    let b;

    switch (i) {
        default:
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }

    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}

/**
 * Convert an RGB color object to a Scratch decimal color.
 * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
 * @return {!number} Number representing the color.
 */
const rgbToDecimal = (rgb) => {
    return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
}


/**
 * Convert a Scratch decimal color to a hex string, #RRGGBB.
 * @param {number} decimal RGB color as a decimal.
 * @return {string} RGB color as #RRGGBB hex string.
 */
const decimalToHex = (decimal) => {
    if (decimal < 0) {
        decimal += 0xFFFFFF + 1;
    }
    let hex = Number(decimal).toString(16);
    hex = `#${'000000'.substr(0, 6 - hex.length)}${hex}`;
    return hex;
}


const rgbLedBrightnessToKey = (brightness) => {
    let key = 0;
    switch (brightness) {
        case 'light': key = 0; break;
        case 'blink': key = 1; break;
        case 'breath': key = 2; break;
    }
    return key;
}

const rgbLedLampEffectToKey = (lampEffect) => {
    let key = 0;
    switch (lampEffect) {
        case 'rainbow': key = 0; break;
        case 'random_color': key = 1; break;
    }
    return key;
}

export default (Blockly) => {
    Blockly.C['looks_g0_rgb_led_show_style_color'] = function (block) {
        Blockly.C.definitions_['define_rgbled'] = '#define USE_RGBLED 1';
        var brightness = block.getFieldValue('BRIGHTNESS');
        var color = Blockly.C.valueToCode(block, 'COLOR', Blockly.C.ORDER_NONE);
        brightness = rgbLedBrightnessToKey(brightness);

        var code = `grovezero->rgbled->displayColor_style(${brightness},${color});\n`;
        return code;
    }

    Blockly.C['looks_g0_rgb_led_show_style'] = function (block) {
        Blockly.C.definitions_['define_rgbled'] = '#define USE_RGBLED 1';
        var lampEffect = block.getFieldValue('STYLE');
        lampEffect = rgbLedLampEffectToKey(lampEffect);
        var code = `grovezero->rgbled->displayMagic(${lampEffect});\n`;
        return code;
    }

    Blockly.C['looks_g0_rgb_led_fade_from_color1_to_color2'] = function (block) {
        Blockly.C.definitions_['define_rgbled'] = '#define USE_RGBLED 1';
        var color1 = Blockly.C.valueToCode(block, 'COLOR1', Blockly.C.ORDER_NONE);
        var color2 = Blockly.C.valueToCode(block, 'COLOR2', Blockly.C.ORDER_NONE);
        var code = `grovezero->rgbled->displayFade(40,0xffff,${color1},${color2});\n`;
        return code;
    }

    Blockly.C['looks_g0_rgb_led_set_brightness'] = function (block) {
        Blockly.C.definitions_['define_rgbled'] = '#define USE_RGBLED 1';
        var brightness = Blockly.C.valueToCode(block, 'BRIGHTNESS', Blockly.C.ORDER_NONE);
        var code = `grovezero->rgbled->setBrightness(${brightness});\n`;
        return code;
    }

    Blockly.C['looks_g0_rgb_led_light_off'] = function (block) {
        Blockly.C.definitions_['define_rgbled'] = '#define USE_RGBLED 1';
        var code = 'grovezero->rgbled->displayStop();\n';
        return code;
    }

    Blockly.C['sensing_g0_rgb_to_color'] = function (block) {
        let red = Blockly.C.valueToCode(block, 'RED', Blockly.C.ORDER_NONE);
        let green = Blockly.C.valueToCode(block, 'GREEN', Blockly.C.ORDER_NONE);
        let blue = Blockly.C.valueToCode(block, 'BLUE', Blockly.C.ORDER_NONE);
        Blockly.C.definitions_['color_str'] = "char colorStr[8]={0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};";
        let code = `grovezero->blecore->getinputcolor(${red},${green},${blue},colorStr)`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

    Blockly.C['sensing_g0_hsl_to_color'] = function (block) {
        let color = Blockly.C.valueToCode(block, 'COLOR', Blockly.C.ORDER_NONE);
        let staturation = Blockly.C.valueToCode(block, 'STATURATION', Blockly.C.ORDER_NONE);
        let brightness = Blockly.C.valueToCode(block, 'BRIGHTNESS', Blockly.C.ORDER_NONE);

        color = parseInt(color);
        staturation = parseInt(staturation);
        brightness = parseInt(brightness);

        if (color < 0) {
            color = 0;
        } else if (color > 100) {
            color = 100;
        }
        if (staturation < 0) {
            staturation = 0;
        } else if (staturation > 100) {
            staturation = 100;
        }
        if (brightness < 0) {
            brightness = 0;
        } else if (brightness > 100) {
            brightness = 100;
        }

        /**{h: hue [0,360), s: saturation [0,1], v: value [0,1]}*/
        let h = color / 100 * 359;
        let s = staturation / 100 * 1;
        let v = brightness / 100 * 1;

        let rgb = hsvToRgb({
            h: h,
            s: s,
            v: v,
        });
        let decimal = rgbToDecimal(rgb);
        let hexstr = decimalToHex(decimal);
        return [`"${hexstr}"`, Blockly.C.ORDER_FUNCTION_CALL];
    }




}

