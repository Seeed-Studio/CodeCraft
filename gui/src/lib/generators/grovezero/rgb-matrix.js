const getColorCode = (value) => {
    switch (value) {
        case '#ff0000': return 0;
        case '#ff0600': return 1;
        case '#ff0c00': return 2;
        case '#ff1200': return 3;
        case '#ff1800': return 4;
        case '#ff1e00': return 5;
        case '#ff2400': return 6;
        case '#ff2a00': return 7;
        case '#ff3000': return 8;
        case '#ff3600': return 9;
        case '#ff3c00': return 10;
        case '#ff4200': return 11;
        case '#ff4800': return 12;
        case '#ff4e00': return 13;
        case '#ff5400': return 14;
        case '#ff5a00': return 15;
        case '#ff6000': return 16;
        case '#ff6600': return 17;
        case '#ff6c00': return 18;
        case '#ff7200': return 19;
        case '#ff7800': return 20;
        case '#ff7e00': return 21;
        case '#ff8400': return 22;
        case '#ff8a00': return 23;
        case '#ff9000': return 24;
        case '#ff9600': return 25;
        case '#ff9c00': return 26;
        case '#ffa200': return 27;
        case '#ffa800': return 28;
        case '#ffae00': return 29;
        case '#ffb400': return 30;
        case '#ffba00': return 31;
        case '#ffc000': return 32;
        case '#ffc600': return 33;
        case '#ffcc00': return 34;
        case '#ffd200': return 35;
        case '#ffd800': return 36;
        case '#ffde00': return 37;
        case '#ffe400': return 38;
        case '#ffea00': return 39;
        case '#fff000': return 40;
        case '#fff600': return 41;
        case '#ffff00': return 42;
        case '#f9ff00': return 43;
        case '#f3ff00': return 44;
        case '#edff00': return 45;
        case '#e7ff00': return 46;
        case '#e1ff00': return 47;
        case '#dbff00': return 48;
        case '#d5ff00': return 49;
        case '#cfff00': return 50;
        case '#c9ff00': return 51;
        case '#c3ff00': return 52;
        case '#bdff00': return 53;
        case '#b7ff00': return 54;
        case '#b1ff00': return 55;
        case '#abff00': return 56;
        case '#a5ff00': return 57;
        case '#9fff00': return 58;
        case '#99ff00': return 59;
        case '#93ff00': return 60;
        case '#8dff00': return 61;
        case '#87ff00': return 62;
        case '#81ff00': return 63;
        case '#7bff00': return 64;
        case '#75ff00': return 65;
        case '#6fff00': return 66;
        case '#69ff00': return 67;
        case '#63ff00': return 68;
        case '#5dff00': return 69;
        case '#57ff00': return 70;
        case '#51ff00': return 71;
        case '#4bff00': return 72;
        case '#45ff00': return 73;
        case '#3fff00': return 74;
        case '#39ff00': return 75;
        case '#33ff00': return 76;
        case '#2dff00': return 77;
        case '#27ff00': return 78;
        case '#21ff00': return 79;
        case '#1bff00': return 80;
        case '#15ff00': return 81;
        case '#0fff00': return 82;
        case '#09ff00': return 83;
        case '#03ff00': return 84;
        case '#00ff00': return 85;
        case '#00ff06': return 86;
        case '#00ff0c': return 87;
        case '#00ff12': return 88;
        case '#00ff18': return 89;
        case '#00ff1e': return 90;
        case '#00ff24': return 91;
        case '#00ff2a': return 92;
        case '#00ff30': return 93;
        case '#00ff36': return 94;
        case '#00ff3c': return 95;
        case '#00ff42': return 96;
        case '#00ff48': return 97;
        case '#00ff4e': return 98;
        case '#00ff54': return 99;
        case '#00ff5a': return 100;
        case '#00ff60': return 101;
        case '#00ff66': return 102;
        case '#00ff6c': return 103;
        case '#00ff72': return 104;
        case '#00ff78': return 105;
        case '#00ff7e': return 106;
        case '#00ff84': return 107;
        case '#00ff8a': return 108;
        case '#00ff90': return 109;
        case '#00ff96': return 110;
        case '#00ff9c': return 111;
        case '#00ffa2': return 112;
        case '#00ffa8': return 113;
        case '#00ffae': return 114;
        case '#00ffb4': return 115;
        case '#00ffba': return 116;
        case '#00ffc0': return 117;
        case '#00ffc6': return 118;
        case '#00ffcc': return 119;
        case '#00ffd2': return 120;
        case '#00ffd8': return 121;
        case '#00ffde': return 122;
        case '#00ffe4': return 123;
        case '#00ffea': return 124;
        case '#00fff0': return 125;
        case '#00fff6': return 126;
        case '#00fffc': return 127;
        case '#00ffff': return 128;
        case '#00f9ff': return 129;
        case '#00f3ff': return 130;
        case '#00edff': return 131;
        case '#00e7ff': return 132;
        case '#00e1ff': return 133;
        case '#00dbff': return 134;
        case '#00d5ff': return 135;
        case '#00cfff': return 136;
        case '#00c9ff': return 137;
        case '#00c3ff': return 138;
        case '#00bdff': return 139;
        case '#00b7ff': return 140;
        case '#00b1ff': return 141;
        case '#00abff': return 142;
        case '#00a5ff': return 143;
        case '#009fff': return 144;
        case '#0099ff': return 145;
        case '#0093ff': return 146;
        case '#008dff': return 147;
        case '#0087ff': return 148;
        case '#0081ff': return 149;
        case '#007bff': return 150;
        case '#0075ff': return 151;
        case '#006fff': return 152;
        case '#0069ff': return 153;
        case '#0063ff': return 154;
        case '#005dff': return 155;
        case '#0057ff': return 156;
        case '#0051ff': return 157;
        case '#004bff': return 158;
        case '#0045ff': return 159;
        case '#003fff': return 160;
        case '#0039ff': return 161;
        case '#0033ff': return 162;
        case '#002dff': return 163;
        case '#0027ff': return 164;
        case '#0021ff': return 165;
        case '#001bff': return 166;
        case '#0015ff': return 167;
        case '#000fff': return 168;
        case '#0009ff': return 169;
        case '#0000ff': return 170;
        case '#0600ff': return 171;
        case '#0c00ff': return 172;
        case '#1200ff': return 173;
        case '#1800ff': return 174;
        case '#1e00ff': return 175;
        case '#2400ff': return 176;
        case '#2a00ff': return 177;
        case '#3000ff': return 178;
        case '#3600ff': return 179;
        case '#3c00ff': return 180;
        case '#4200ff': return 181;
        case '#4800ff': return 182;
        case '#4e00ff': return 183;
        case '#5400ff': return 184;
        case '#5a00ff': return 185;
        case '#6000ff': return 186;
        case '#6600ff': return 187;
        case '#6c00ff': return 188;
        case '#7200ff': return 189;
        case '#7800ff': return 190;
        case '#7e00ff': return 191;
        case '#8400ff': return 192;
        case '#8a00ff': return 193;
        case '#9000ff': return 194;
        case '#9600ff': return 195;
        case '#9c00ff': return 196;
        case '#a200ff': return 197;
        case '#a800ff': return 198;
        case '#ae00ff': return 199;
        case '#b400ff': return 200;
        case '#ba00ff': return 201;
        case '#c000ff': return 202;
        case '#c600ff': return 203;
        case '#cc00ff': return 204;
        case '#d200ff': return 205;
        case '#d800ff': return 206;
        case '#de00ff': return 207;
        case '#e400ff': return 208;
        case '#ea00ff': return 209;
        case '#f000ff': return 210;
        case '#f600ff': return 211;
        case '#ff00ff': return 212;
        case '#ff00f9': return 213;
        case '#ff00f3': return 214;
        case '#ff00ed': return 215;
        case '#ff00e7': return 216;
        case '#ff00e1': return 217;
        case '#ff00db': return 218;
        case '#ff00d5': return 219;
        case '#ff00cf': return 220;
        case '#ff00c9': return 221;
        case '#ff00c3': return 222;
        case '#ff00bd': return 223;
        case '#ff00b7': return 224;
        case '#ff00b1': return 225;
        case '#ff00ab': return 226;
        case '#ff00a5': return 227;
        case '#ff009f': return 228;
        case '#ff0099': return 229;
        case '#ff0093': return 230;
        case '#ff008d': return 231;
        case '#ff0087': return 232;
        case '#ff0081': return 233;
        case '#ff007b': return 234;
        case '#ff0075': return 235;
        case '#ff006f': return 236;
        case '#ff0069': return 237;
        case '#ff0063': return 238;
        case '#ff005d': return 239;
        case '#ff0057': return 240;
        case '#ff0051': return 241;
        case '#ff004b': return 242;
        case '#ff0045': return 243;
        case '#ff003f': return 244;
        case '#ff0039': return 245;
        case '#ff0033': return 246;
        case '#ff002d': return 247;
        case '#ff0027': return 248;
        case '#ff0021': return 249;
        case '#ff001b': return 250;
        case '#ff0015': return 251;
        case '#ff000f': return 252;
        case '#ff0009': return 253;
        case '#ffffff': return 254;
        case '#000000': return 255;
    }
    return 255;
}

export default (Blockly) => {
    /**
     * RGB 矩阵【数字选择控件】 显示图案【彩色画图选择控件】
     * GROVEZERO_RGBMATRIX_SHOW_PATTERN_MESSAGE0
     */
    Blockly.C['looks_g0_rgb_matrix_show_shape'] = function (block) {
        let i2c = parseInt(block.getFieldValue('I2C')) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;

        let shape = block.getFieldValue('SHAPE');
        let matrix = JSON.parse(shape);
        // 获取默认图案编号  Get the default emoji number
        let emoji_number = matrix.emoji_number;
        // 自定义图案  Self defined emoji
        if (emoji_number === undefined) {
            // 获取颜色矩阵  Get the color matrix
            let _color_matrix = matrix.colors_matrix;
            // 声明矩阵行列  Define rows and columns
            let _rows = 8, _cols = 8;
            // 声明结果字符串  Define the result array
            let result = [];
            // 遍历颜色矩阵  Iterate the color matrix
            for (let i = 0; i < _rows; i++) {
                for (let j = 0; j < _cols; j++) {
                    let _color = _color_matrix[i][j];
                    let _color_code = getColorCode(_color);
                    let _code16 = _color_code.toString(16)
                    let _code;
                    if (_code16.length === 1) {
                        _code = _code16 + '0';
                    } else {
                        _code = '' + _code16;
                    }
                    result.push('0x' + _code);
                }
            }
            // console.log('result : ', result);
            let variable = Blockly.C.variableDB_.getDistinctName('str', Blockly.Variables.NAME_TYPE);
            Blockly.C.definitions_[variable] = `const char ${variable}[64]={${result}};`;
            return `grovezero->rgbledmatrix->displayCustom(${i2c}, 0, 1, 1, 0, ${variable});\n`;
        }
        // 默认图案  Default emoji
        else {
            return `grovezero->rgbledmatrix->displayEmoji(${i2c}, ${emoji_number}, 0, 1);\n`;
        }
    }
    
    /**
     * RGB 矩阵【数字选择控件】 显示动画【选择控件】直到结束
     */
    Blockly.C['looks_g0_rgb_matrix_show_anima'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;

        let anima = parseInt(block.getFieldValue('ANIMA'));
        let time = 4;
        let code;
        if (anima === 1) {
            code = `grovezero->rgbledmatrix->displayWave(${i2c}, 0xfe, ${time}, 0);\n`;
        } else if (anima < 6) {
            let wiseMode, wiseSize;
            switch (anima) {
                case 2: wiseMode = 0x01; wiseSize = 0x01; break;
                case 3: wiseMode = 0x01; wiseSize = 0x00; break;
                case 4: wiseMode = 0x00; wiseSize = 0x01; break;
                case 5: wiseMode = 0x00; wiseSize = 0x00; break;
                default: wiseMode = 0x00; wiseSize = 0x00; break;
            }
            code = `grovezero->rgbledmatrix->displayClock(${i2c}, ${wiseMode}, ${wiseSize}, ${time}, 0);\n`;
        } else {
            let start = 42, end = 43;
            switch (anima) {
                case 6: start = 255; end = 255; break;
                case 7: start = 254; end = 254; break;
                case 8: start = 42; end = 43; break;
                case 9: start = 44; end = 52; break;
            }
            code = `grovezero->rgbledmatrix->displayGIF(${i2c}, ${start}, ${end}, ${time}, 0);\n`;
        }
        return code;
    };
    /**
     * RGB 矩阵【数字选择控件】 显示柱状图 值为【数字输入控件】
     * HISTOGRAM
     */
    Blockly.C['looks_g0_rgb_matrix_show_histogram'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;

        let value = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        let code = ` grovezero->rgbledmatrix->displayColorBar (${i2c}, ${value}, 0, 0x01);\n`;
        return code;
    };

    /**
     * RGB 矩阵 【数字选择控件】显示【文本输入控件】直到结束
     */
    Blockly.C['looks_g0_rgb_matrix_show_string'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        let textColor = block.getFieldValue('COLOR');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;
        let text = Blockly.C.valueToCode(block, 'STRING', Blockly.C.ORDER_NONE);
        let forever = 0;
        let time = 1000;
        let color = parseInt(textColor);
        let code = `grovezero->rgbledmatrix->displayStr(${i2c}, ${forever},${time}, ${color}, ${text});\n`;
        return code;
    };
    /**
     * RGB 矩阵 【数字选择控件】点亮 x:【数字输入控件】y:【数字输入控件】【颜色选择控件】
     */
    Blockly.C['looks_g0_rgb_matrix_xy_set_on'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;
        let x = Blockly.C.valueToCode(block, 'Y', Blockly.C.ORDER_NONE);
        let y = Blockly.C.valueToCode(block, 'X', Blockly.C.ORDER_NONE);
        let color = block.getFieldValue('COLOR');
        let code = `grovezero->rgbledmatrix->displaySet(${i2c}, ${x}, ${y}, ${color});\n`;
        return code;
    };
    /**
     * RGB 矩阵 【数字选择控件】熄灭 x:【数字输入控件】y:【数字输入控件】
     */
    Blockly.C['looks_g0_rgb_matrix_xy_set_off'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;
        let x = Blockly.C.valueToCode(block, 'Y', Blockly.C.ORDER_NONE);
        let y = Blockly.C.valueToCode(block, 'X', Blockly.C.ORDER_NONE);
        let code = `grovezero->rgbledmatrix->displaySet(${i2c}, ${x}, ${y}, 0xff);\n`;
        return code;
    };
    /**
     * RGB 矩阵【数字选择控件】切换点亮或熄灭 x:【数字输入控件】y:【数字输入控件】【颜色选择控件】
     * GROVEZERO_RGBMATRIX_ONOFF_BY_POSITION_AND_COLOR_MESSAGE0
     */
    Blockly.C['looks_g0_rgb_matrix_xy_set_on_off'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;
        let x = Blockly.C.valueToCode(block, 'Y', Blockly.C.ORDER_NONE);
        let y = Blockly.C.valueToCode(block, 'X', Blockly.C.ORDER_NONE);
        let color = block.getFieldValue('COLOR');
        let code = `grovezero->rgbledmatrix->switchOnOff(${i2c}, ${x}, ${y}, ${color});\n`;
        return code;
    };
    /**
     * RGB 矩阵 【数字选择控件】 x:【数字输入控件】y:【数字输入控件】是否被点亮？
     * GROVEZERO_RGBMATRIX_LIGHTED_BY_POSITION_MESSAGE0
     */
    Blockly.C['sensing_g0_rgb_matrix_xy_is_on'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;
        let x = Blockly.C.valueToCode(block, 'Y', Blockly.C.ORDER_NONE);
        let y = Blockly.C.valueToCode(block, 'X', Blockly.C.ORDER_NONE);
        let code = `grovezero->rgbledmatrix->checkOnOff(${i2c} ,${x}, ${y})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    };
    /**
     * RGB 矩阵 【数字选择控件】 x:【数字输入控件】y:【数字输入控件】颜色值
     * GROVEZERO_RGBMATRIX_COLOR_VALUE_BY_POSITION_MESSAGE0
     */
    Blockly.C['sensing_g0_rgb_matrix_xy_get_color'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;
        let x = Blockly.C.valueToCode(block, 'Y', Blockly.C.ORDER_NONE);
        let y = Blockly.C.valueToCode(block, 'X', Blockly.C.ORDER_NONE);
        let code = `grovezero->rgbledmatrix->getXYColor(${i2c} ,${x}, ${y})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    };

    /**
     * RGB 矩阵 全部熄灭
     * GROVEZERO_RGBMATRIX_QUENCH_MESSAGE0
     */
    Blockly.C['sensing_g0_rgb_matrix_clean'] = function (block) {
        let i2c = block.getFieldValue('I2C');
        i2c = parseInt(i2c) - 1;
        Blockly.C.definitions_[`define_rgbledmatrix_${i2c}`] = `#define USE_RGBLEDMATRIX_${i2c} 1`;
        let code = `grovezero->rgbledmatrix->displayOff(${i2c});\n`;
        return code;
    };
}
