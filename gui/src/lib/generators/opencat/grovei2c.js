

export default Blockly => {

    const visionDefine = function () {
        Blockly.ArduinoOpenCat.definitions_['var_vision_sensor'] =
            
            '#define MU_ADDRESS 0x50\n' +
            '#define PROTOCOL_VER 0x03\n' +
            '#define VISION_ID_COLOR 0x02\n' +
            '#define VISION_ID_BALL 0x03\n' +
            '#define VISION_ID_BODY 0x05\n' +
            '#define VISION_ID_SHAPE_CARD 0x06\n' +
            '#define VISION_ID_TRAFFIC_CARD 0x07\n' +
            '#define VISION_ID_NUMBER_CARD 0x08\n' +
            '#define REG_PROTOCOL_VER 0x01\n' +
            '#define REG_LED1_CONF 0x06\n' +
            '#define REG_LED2_CONF 0x07\n' +
            '#define REG_LED_LEVEL 0x08\n' +
            '#define REG_LIGHT_SENSOR 0x0A\n' +
            '#define REG_CAMERA_CONF1 0x10\n' +
            '#define REG_FRAME_CNT 0x1F\n' +
            '#define REG_VISION_ID 0x20\n' +
            '#define REG_VISION_CONF1 0x21\n' +
            '#define REG_PARAM_VALUE1 0x25\n' +
            '#define REG_PARAM_VALUE2 0x26\n' +
            '#define REG_PARAM_VALUE3 0x27\n' +
            '#define REG_PARAM_VALUE4 0x28\n' +
            '#define REG_PARAM_VALUE5 0x29\n' +
            '#define RESULT_NUM 0x34\n' +
            '#define RESULT_DATA1 0x40\n' +
            '#define RESULT_DATA2 0x41\n' +
            '#define RESULT_DATA3 0x42\n' +
            '#define RESULT_DATA4 0x43\n' +
            '#define RESULT_DATA5 0x44\n' +
            '#define REG_LS_PROXIMITY 0x50\n' +
            '#define REG_LS_ALS_L 0x51\n' +
            '#define REG_LS_ALS_H 0x52\n' +
            '#define REG_LS_COLOR 0x59\n' +
            '#define REG_GESTURE 0x5A\n' +
            '#define BALL_TYPE_PING_PONG 1\n' +
            '#define BALL_TYPE_TENNIS 2\n' +
            '#define LS_PROXIMITY_ENABLE 1\n' +
            '#define LS_AMBIENT_LIGHT_ENABLE 2\n' +
            '#define LS_COLOR_ENABLE 4\n' +
            '#define LS_GESTURE_ENABLE 8\n' +
            '#define LS_SENSITIVITY_L 16\n' +
            '#define LS_SENSITIVITY_H 32\n' +
            '#define LS_WHITE_BALANCE_ENABLE 64\n' +
            '#define CARD_SHAPE_TICK 1\n' +
            '#define CARD_SHAPE_CROSS 2\n' +
            '#define CARD_SHAPE_CIRCLE 3\n' +
            '#define CARD_SHAPE_SQUARE 4\n' +
            '#define CARD_SHAPE_TRIANGLE 5\n' +
            '#define CARD_TRAFFIC_FORWARD 1\n' +
            '#define CARD_TRAFFIC_LEFT 2\n' +
            '#define CARD_TRAFFIC_RIGHT 3\n' +
            '#define CARD_TRAFFIC_TRUN_AROUND 4\n' +
            '#define CARD_TRAFFIC_PARK 5\n' +
            '#define CARD_NUMBER_0 11\n' +
            '#define CARD_NUMBER_1 1\n' +
            '#define CARD_NUMBER_2 2\n' +
            '#define CARD_NUMBER_3 3\n' +
            '#define CARD_NUMBER_4 4\n' +
            '#define CARD_NUMBER_5 5\n' +
            '#define CARD_NUMBER_6 6\n' +
            '#define CARD_NUMBER_7 7\n' +
            '#define CARD_NUMBER_8 8\n' +
            '#define CARD_NUMBER_9 9\n' +
            '#define CARD_GESTURENONE 0\n'+
            '#define CARD_DOWNWARD 1\n' +
            '#define CARD_UPWARD 2\n' +
            '#define CARD_LEFTWARD 3\n' +
            '#define CARD_RIGHTWARD 4\n' +
            '#define CARD_PUSH_DOWN 5\n' +
            '#define CARD_LIFT_UP 6\n';
            // '#define CC_COLOR_OTHER 0\n' +
            // '#define CC_COLOR_BLACK 1\n' +
            // '#define CC_COLOR_WHITE 2\n' +
            // '#define CC_COLOR_RED 3\n' +
            // '#define CC_COLOR_YELLOW 4\n' +
            // '#define CC_COLOR_GREEN 5\n' +
            // '#define CC_COLOR_CYAN 6\n' +
            // '#define CC_COLOR_BLUE 7\n' +
            // '#define CC_COLOR_PURPLE 8\n';
    
        Blockly.ArduinoOpenCat.define_fun['vision_sensor_i2c_read8'] =
            'int i2c_read8(uint8_t reg)\n' +
            '{\n' +
            '    Wire.beginTransmission(MU_ADDRESS);\n' +
            '    Wire.write(reg);\n' +
            '    Wire.endTransmission();\n' +
            '    Wire.requestFrom(MU_ADDRESS, 1);\n' +
            '    return Wire.read();\n' +
            '}\n';
        Blockly.ArduinoOpenCat.define_fun['vision_sensor_i2c_write8'] =
            'void i2c_write8(const uint8_t reg, const uint8_t value)\n' +
            '{\n' +
            '    Wire.beginTransmission(MU_ADDRESS);\n' +
            '    Wire.write(reg);\n' +
            '    Wire.write(value);\n' +
            '    Wire.endTransmission();\n' +
            '}\n';
    
        Blockly.ArduinoOpenCat.setups_['setup_vision_sensor'] =
            'delay(500);\n' +
            '  i2c_write8(REG_VISION_CONF1, 0x21);\n' +
            '  delay(1000);\n';
        Blockly.ArduinoOpenCat.definitions_['include_Wire'] = '#include <Wire.h>';
        
    }
    
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
    
    Blockly.ArduinoOpenCat['motion_opencat_seeed_read_gesture'] = function (block) {
        Blockly.ArduinoOpenCat.definitions_['include_paj7620'] = '#include <paj7620.h>';
        Blockly.ArduinoOpenCat.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.ArduinoOpenCat.setups_['setup_paj7620Init'] = 'paj7620Init();';
        Blockly.ArduinoOpenCat.define_fun['var_gesture'] = 'uint8_t gesture;';
        Blockly.ArduinoOpenCat.define_fun['getGestureValue'] =
`uint8_t getGestureValue(uint8_t addr)
{
    uint8_t data = 0;
    paj7620ReadReg(addr, 1, &data);
    if(data != 0) return data;
    else return 0;
}`;
        var code = `gesture = getGestureValue(0x43)`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_gesture'] = function (block) {
        var opt = block.getFieldValue('OPT');
        // var addr = '0x43';
        // switch (opt) {
        //     case 'GES_WAVE_FLAG': addr = '0x44'; break;
        //     default: addr = '0x43'; break;
        // }
        // Blockly.ArduinoOpenCat.definitions_['include_paj7620'] = '#include <paj7620.h>';
        // Blockly.ArduinoOpenCat.setups_['setup_paj7620Init'] = 'paj7620Init();';
        // Blockly.ArduinoOpenCat.define_fun['gesture'] =
        //     `uint8_t getGestureValue(uint8_t addr,uint8_t opt)\n{\nuint8_t data = 0;\nwhile(1){\npaj7620ReadReg(addr, 1, &data);\nif(data != 0) return data == opt;\n}\n}`;
        var code = `gesture == ${opt}`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_grove_serial_rgb_led_matrix_on_point'] = function (block) {
        Blockly.ArduinoOpenCat.definitions_['include_rgb_matrix'] = '#include <grove_two_rgb_led_matrix.h>';
        Blockly.ArduinoOpenCat.definitions_['var_rgb_matrix'] = 'GroveTwoRGBLedMatrixClass rgbMatrix;';

        let data = [];
        for (let i = 0; i < 64; i++) {
            data.push('0xFF');
        }
        Blockly.ArduinoOpenCat.definitions_['var_rgb_matrix_data'] = `char rgbMatrixData[64] = {${data}};`;
        Blockly.ArduinoOpenCat.define_fun['rgbMatrixOnPoint'] =
            `void rgbMatrixOnPoint(uint8_t x,uint8_t y,uint8_t c)\n{\n` +
            `if(x<0||x>7||y<0||y>7) return;\n` +
            `rgbMatrixData[x*8+y] = c;\n` +
            `rgbMatrix.displayFrames(rgbMatrixData,0,1,1);` +
            `}`;

        var color = block.getFieldValue('COLOR');
        var x = Blockly.ArduinoOpenCat.valueToCode(block, 'X', Blockly.ArduinoOpenCat.ORDER_NONE);
        var y = Blockly.ArduinoOpenCat.valueToCode(block, 'Y', Blockly.ArduinoOpenCat.ORDER_NONE);
        var code = `rgbMatrixOnPoint(${x},${y},${color});\n`;
        return code;
    };

    Blockly.ArduinoOpenCat['motion_opencat_grove_serial_rgb_led_matrix_show_text'] = function (block) {
        var text = Blockly.ArduinoOpenCat.valueToCode(block, 'TEXT', Blockly.ArduinoOpenCat.ORDER_NONE);
        Blockly.ArduinoOpenCat.definitions_['include_rgb_matrix'] = '#include <grove_two_rgb_led_matrix.h>';
        Blockly.ArduinoOpenCat.definitions_['var_rgb_matrix'] = 'GroveTwoRGBLedMatrixClass rgbMatrix;';
        var strName = Blockly.ArduinoOpenCat.variableDB_.getDistinctName('rgbMatrixStr', Blockly.Variables.NAME_TYPE);
        var code = `char *${strName}=${text};\n`;
        code += `rgbMatrix.displayString(${strName},${(text.length - 2) * 1000},0,1);\ndelay(${(text.length - 2) * 1000});\n`;
        return code;
    };

    Blockly.ArduinoOpenCat['motion_opencat_grove_serial_rgb_led_matrix_show_emoji'] = function (block) {
        Blockly.ArduinoOpenCat.definitions_['include_rgb_matrix'] = '#include <grove_two_rgb_led_matrix.h>';
        Blockly.ArduinoOpenCat.definitions_['var_rgb_matrix'] = 'GroveTwoRGBLedMatrixClass rgbMatrix;';

        let shape = block.getFieldValue('SHAPE');
        let matrix = JSON.parse(shape);
        let _color_matrix = matrix.colors_matrix;
        // 声明矩阵行列  Define rows and columns
        let _rows = 8, _cols = 8;
        // 声明结果字符串  Define result array
        let result = [];
        // 遍历颜色矩阵  Iterate color matrix
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

        let data = [];
        for (let i = 0; i < 64; i++) {
            data.push('0xFF');
        }
        Blockly.ArduinoOpenCat.definitions_['var_rgb_matrix_shape_data'] = `char rgbMatrixShapeData[64] = {${data}};`;


        Blockly.ArduinoOpenCat.define_fun['var_rgb_matrix_data1'] = 'void setRgbMatrixShapeData(';
        for (let i = 0; i < 64; i++) {
            Blockly.ArduinoOpenCat.define_fun['var_rgb_matrix_data1'] += `char c${i}${i < 63 ? ',' : ''}`;
        }
        Blockly.ArduinoOpenCat.define_fun['var_rgb_matrix_data1'] += ')\n{\n';
        for (let i = 0; i < 64; i++) {
            Blockly.ArduinoOpenCat.define_fun['var_rgb_matrix_data1'] += `rgbMatrixShapeData[${i}]=c${i};\n`;
        }
        Blockly.ArduinoOpenCat.define_fun['var_rgb_matrix_data1'] += '}\n';

        let code = `setRgbMatrixShapeData(${result});\n`;
        code += `rgbMatrix.displayFrames(rgbMatrixShapeData,0,1,1);\n`;
        return code;
    };

    Blockly.ArduinoOpenCat['motion_opencat_color_read_sensor'] = function (block) {
        Blockly.ArduinoOpenCat.definitions_['include_Adafruit_TCS34725'] = '#include <Adafruit_TCS34725.h>';
        Blockly.ArduinoOpenCat.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.ArduinoOpenCat.definitions_['var_CC_COLOR_RED'] = '#define CC_COLOR_RED 1';
        Blockly.ArduinoOpenCat.definitions_['var_CC_COLOR_GREEN'] = '#define CC_COLOR_GREEN 2';
        Blockly.ArduinoOpenCat.definitions_['var_CC_COLOR_BLUE'] = '#define CC_COLOR_BLUE 3';
        Blockly.ArduinoOpenCat.definitions_['var_CC_COLOR_BLACK'] = '#define CC_COLOR_BLACK 4';
        Blockly.ArduinoOpenCat.definitions_['var_CC_COLOR_OTHER'] = '#define CC_COLOR_OTHER 5';
        Blockly.ArduinoOpenCat.definitions_['var_CC_COLOR_WHITE'] = '#define CC_COLOR_WHITE 6';
        Blockly.ArduinoOpenCat.definitions_['var_Adafruit_TCS34725'] = 'Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);';
        Blockly.ArduinoOpenCat.definitions_['var_color'] = 'uint8_t color;';
        Blockly.ArduinoOpenCat.setups_['setup_Adafruit_TCS34725'] = `tcs.begin();`;
        Blockly.ArduinoOpenCat.define_fun['isColor'] =
`uint8_t isColor()
{
    uint16_t clearCode, redCode, greenCode, blueCode;
    tcs.setInterrupt(false);
    delay(100);
    tcs.getRawData(&redCode, &greenCode, &blueCode, &clearCode);
    tcs.setInterrupt(true);
    if (clearCode > 3000)
    {
        return CC_COLOR_WHITE; //White;
    }
    else if ((clearCode < 1000) && (redCode < (clearCode / 3)) && (greenCode < (clearCode / 3)) && (blueCode < (clearCode / 3)))
    {
        return CC_COLOR_BLACK; // black
    }
    else if (redCode > (clearCode / 3))
    {
        return CC_COLOR_RED; // red
    }
    else if (greenCode > (clearCode / 3))
    {
        return CC_COLOR_GREEN; // green
    }
    else if (blueCode > (clearCode / 3))
    {
        return CC_COLOR_BLUE; // blue
    }
    else
    {
        return CC_COLOR_OTHER; // other color
    }
}`;
        // switch (color) {
        //     case 'red':
        //         color = 'CC_COLOR_RED';
        //         break;
        //     case 'green':
        //         color = 'CC_COLOR_GREEN';
        //         break;
        //     case 'blue':
        //         color = 'CC_COLOR_BLUE';
        //         break;
        //     case 'black':
        //         color = 'CC_COLOR_BLACK';
        //         break;
        //     case 'white':
        //         color = 'CC_COLOR_WHITE';
        //         break;
        //     case 'other':
        //         color = 'CC_COLOR_OTHER';
        //         break;

        // }
        var code = `color = isColor()`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_color_sensor'] = function (block) {
         var color = block.getFieldValue('COLOR');
        // Blockly.ArduinoOpenCat.definitions_['include_Adafruit_TCS34725'] = '#include <Adafruit_TCS34725.h>';
        // Blockly.ArduinoOpenCat.definitions_['var_Adafruit_TCS34725'] = 'Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);';
        // Blockly.ArduinoOpenCat.setups_['setup_Adafruit_TCS34725'] = `tcs.begin();`;
        switch (color) {
            case 'red':
                color = 'CC_COLOR_RED';
                break;
            case 'green':
                color = 'CC_COLOR_GREEN';
                break;
            case 'blue':
                color = 'CC_COLOR_BLUE';
                break;
            case 'black':
                color = 'CC_COLOR_BLACK';
                break;
            case 'white':
                color = 'CC_COLOR_WHITE';
                break;
            case 'other':
                color = 'CC_COLOR_OTHER';
                break;

        }
        var code = `color == ${color}`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    //图像交通标示卡片手势检测
    Blockly.ArduinoOpenCat['motion_opencat_traffic_read_sensor'] = function (block) {
        Blockly.ArduinoOpenCat.setups_['setup_Adafruit_WIRE34725'] = 'Wire.begin();';
        visionDefine();
        
        Blockly.ArduinoOpenCat.define_fun['var_card'] = 'uint8_t card;';
        Blockly.ArduinoOpenCat.define_fun['isCard'] =
`   
uint8_t isCard(uint8_t visionId)
{
    i2c_write8(REG_VISION_ID, visionId);
    i2c_write8(REG_VISION_CONF1, 0x21);
    if (i2c_read8(RESULT_NUM) > 0)
    {
        uint8_t re = i2c_read8(RESULT_DATA5);
        return  re;
    }
    else
    {
        return 0;
    }
}

`;      
        var code = `card = isCard(VISION_ID_TRAFFIC_CARD)`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    //图像数字卡片手势检测
    Blockly.ArduinoOpenCat['motion_opencat_number_read_sensor'] = function (block) {
        Blockly.ArduinoOpenCat.setups_['setup_Adafruit_WIRE34725'] = 'Wire.begin();';
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['var_card'] = 'uint8_t card;';
        Blockly.ArduinoOpenCat.define_fun['isCard'] =
`   
uint8_t isCard(uint8_t visionId)
{
    i2c_write8(REG_VISION_ID, visionId);
    i2c_write8(REG_VISION_CONF1, 0x21);
    if (i2c_read8(RESULT_NUM) > 0)
    {
        uint8_t re = i2c_read8(RESULT_DATA5);
        if (!re)  re = 11;
        return  re;
    }
    else
    {
        return 0;
    }
}

`;      
        var code = `card = isCard(VISION_ID_NUMBER_CARD)`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    //图像图形卡片手势检测  Pattern gesture detection
    Blockly.ArduinoOpenCat['motion_opencat_symbol_read_sensor'] = function (block) {
        Blockly.ArduinoOpenCat.setups_['setup_Adafruit_WIRE34725'] = 'Wire.begin();';
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['var_card'] = 'uint8_t card;';
        Blockly.ArduinoOpenCat.define_fun['isCard'] =
`   
uint8_t isCard(uint8_t visionId)
{
    i2c_write8(REG_VISION_ID, visionId);
    i2c_write8(REG_VISION_CONF1, 0x21);
    if (i2c_read8(RESULT_NUM) > 0)
    {
        uint8_t re = i2c_read8(RESULT_DATA5);
        return  re;
    }
    else
    {
        return 0;
    }
}

`;      
        var code = `card = isCard(VISION_ID_SHAPE_CARD)`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    //图像运动手势开启  Pattern motion gesture
    Blockly.ArduinoOpenCat['motion_opencat_gesture_read_sensor'] = function (block) {
        Blockly.ArduinoOpenCat.setups_['setup_Adafruit_WIRE34725'] = 'Wire.begin();';
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['var_gesture'] = 'uint8_t gesture;';
        Blockly.ArduinoOpenCat.define_fun['getGestureValue'] =
`uint8_t isGesture()
{
    uint8_t gesture,gesture_sure,visionId;   

    visionId = i2c_read8(REG_LIGHT_SENSOR);
    visionId |= LS_GESTURE_ENABLE;
    i2c_write8(REG_LIGHT_SENSOR, visionId);
    
    gesture = i2c_read8(REG_GESTURE);
    gesture_sure = gesture;
    if (gesture) {
      gesture= CARD_GESTURENONE;
      i2c_write8(REG_GESTURE, gesture);
      return gesture_sure ;
   }
    else
    {
        return 0;
    }
}`;
        var code = `gesture = isGesture()`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor1_ext'] = function (block) {
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['vision_sensor_getBallValue'] =
            'int getBallValue(uint8_t xy)\n' +
            '{\n' +
            '    i2c_write8(REG_VISION_ID, VISION_ID_BALL);\n' +
            '    i2c_write8(REG_VISION_CONF1, 0x21);\n' +
            '    if (i2c_read8(RESULT_NUM) > 0)\n' +
            '    {\n' +
            '        if(xy==1) return i2c_read8(RESULT_DATA1);\n' +
            '        else return i2c_read8(RESULT_DATA2);\n' +
            '    }\n' +
            '    else\n' +
            '    {\n' +
            '        return -1;\n' +
            '    }\n' +
            '}\n';
        var opt = block.getFieldValue('XY');
        var code = `getBallValue(${opt})`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    }
    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor1'] = function (block) {
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['vision_sensor_isBall'] =
            'uint8_t isBall(uint8_t ballType)\n' +
            '{\n' +
            '    i2c_write8(REG_VISION_ID, VISION_ID_BALL);\n' +
            '    i2c_write8(REG_VISION_CONF1, 0x21);\n' +
            '    if (i2c_read8(RESULT_NUM) > 0)\n' +
            '    {\n' +
            '        return ballType == i2c_read8(RESULT_DATA5);\n' +
            '    }\n' +
            '    else\n' +
            '    {\n' +
            '        return 0;\n' +
            '    }\n' +
            '}\n';
        var ballType = block.getFieldValue('OPT');
        var code = `isBall(${ballType})`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor2'] = function (block) {
        // visionDefine();
        // Blockly.ArduinoOpenCat.define_fun['vision_sensor_isCard'] =
        //     'uint8_t isCard(uint8_t visionId, uint8_t cardValue)\n' +
        //     '{\n' +
        //     '    i2c_write8(REG_VISION_ID, visionId);\n' +
        //     '    i2c_write8(REG_VISION_CONF1, 0x21);\n' +
        //     '    if (i2c_read8(RESULT_NUM) > 0)\n' +
        //     '    {\n' +
        //     '        uint8_t re = i2c_read8(RESULT_DATA5);\n' +
        //     '        return cardValue == re;\n' +
        //     '    }\n' +
        //     '    else\n' +
        //     '    {\n' +
        //     '        return 0;\n' +
        //     '    }\n' +
        //     '}\n';
        var opt = block.getFieldValue('OPT');
        var code = `card == ${opt}`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor3'] = function (block) {
        // visionDefine();
        // Blockly.ArduinoOpenCat.define_fun['vision_sensor_isCard'] =
        //     'uint8_t isCard(uint8_t visionId, uint8_t cardValue)\n' +
        //     '{\n' +
        //     '    i2c_write8(REG_VISION_ID, visionId);\n' +
        //     '    i2c_write8(REG_VISION_CONF1, 0x21);\n' +
        //     '    if (i2c_read8(RESULT_NUM) > 0)\n' +
        //     '    {\n' +
        //     '        uint8_t re = i2c_read8(RESULT_DATA5);\n' +
        //     '        return cardValue == re;\n' +
        //     '    }\n' +
        //     '    else\n' +
        //     '    {\n' +
        //     '        return 0;\n' +
        //     '    }\n' +
        //     '}\n';
        var opt = block.getFieldValue('OPT');
        console.log('opt',opt)
        var code = `card == ${opt}`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor4'] = function (block) {
        // visionDefine();
        // Blockly.ArduinoOpenCat.define_fun['vision_sensor_isCard'] =
        //     'uint8_t isCard(uint8_t visionId, uint8_t cardValue)\n' +
        //     '{\n' +
        //     '    i2c_write8(REG_VISION_ID, visionId);\n' +
        //     '    i2c_write8(REG_VISION_CONF1, 0x21);\n' +
        //     '    if (i2c_read8(RESULT_NUM) > 0)\n' +
        //     '    {\n' +
        //     '        uint8_t re = i2c_read8(RESULT_DATA5);\n' +
        //     '        return cardValue == re;\n' +
        //     '    }\n' +
        //     '    else\n' +
        //     '    {\n' +
        //     '        return 0;\n' +
        //     '    }\n' +
        //     '}\n';
        var opt = block.getFieldValue('OPT');
        var code = `card == ${opt}`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor5'] = function (block) {
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['vision_sensor_isBody'] =
            'uint8_t isBody()\n' +
            '{\n' +
            '    i2c_write8(REG_VISION_ID, VISION_ID_BODY);\n' +
            '    i2c_write8(REG_VISION_CONF1, 0x21);\n' +
            '    if (i2c_read8(RESULT_NUM) > 0)\n' +
            '        return 1;\n' +
            '    else\n' +
            '        return 0;\n' +
            '}\n';
        var code = `isBody()`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor8'] = function (block) {
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['vision_sensor_getBallValue'] =
            'int getBallValue(uint8_t xy)\n' +
            '{\n' +
            '    i2c_write8(REG_VISION_ID, VISION_ID_BALL);\n' +
            '    i2c_write8(REG_VISION_CONF1, 0x21);\n' +
            '    if (i2c_read8(RESULT_NUM) > 0)\n' +
            '    {\n' +
            '        if(xy==1) return i2c_read8(RESULT_DATA1);\n' +
            '        else return i2c_read8(RESULT_DATA2);\n' +
            '    }\n' +
            '    else\n' +
            '    {\n' +
            '        return -1;\n' +
            '    }\n' +
            '}\n';
        var opt = block.getFieldValue('OPT');
        var code = `getBallValue(${opt})`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    // 识别手势  Read gesture
    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor10'] = function (block) {
        // visionDefine();
        // Blockly.ArduinoOpenCat.define_fun['vision_sensor_isGesture'] =
        //     'bool isGesture(uint8_t gestureValue)\n' +
        //     '{\n' +
        //     '    uint8_t gesture,gesture_sure;\n' +
        //     '    gesture = i2c_read8(REG_GESTURE);\n' +
        //     '    gesture_sure = gesture;\n' +
        //     '    if (gesture) {\n' +
        //     '        gesture= CARD_GESTURENONE;\n' +
        //     '        i2c_write8(REG_GESTURE, gesture);\n' +
        //     '        return gesture_sure == gestureValue;\n' +
        //     '    }\n' +
        //     '    else\n' +
        //     '    {\n' +
        //     '        return 0;\n' +
        //     '    }\n' +
        //     '}\n';

        // Blockly.ArduinoOpenCat.setups_['setup_isGesture'] = 
        // '  uint8_t  visionId;\n' +
        // '  visionId = i2c_read8(REG_LIGHT_SENSOR);\n' +
        // '  visionId |= LS_GESTURE_ENABLE;\n' +
        // '  i2c_write8(REG_LIGHT_SENSOR, visionId);\n';

        var opt = block.getFieldValue('OPT');
        var code = `gesture == ${opt}`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    }
    // 读取环境光检测  Read from evironmental light sensor
    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor11'] = function (block) {
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['vision_sensor_isInghtSensor'] =
            'uint16_t isInghtSensor()\n' +
            '{\n' +
            '    uint8_t Als[2],visionId;\n' +
            '    visionId = i2c_read8(REG_LIGHT_SENSOR);\n' +
            '    visionId |= LS_PROXIMITY_ENABLE | LS_AMBIENT_LIGHT_ENABLE | LS_COLOR_ENABLE | LS_SENSITIVITY_H;\n' +
            '    i2c_write8(REG_LIGHT_SENSOR, visionId);\n' +
            '    visionId = i2c_read8(REG_LIGHT_SENSOR);\n' +
            '    visionId |= LS_WHITE_BALANCE_ENABLE;\n' +
            '    i2c_write8(REG_LIGHT_SENSOR, visionId);\n' +
            '    do{\n' +
            '       visionId = i2c_read8(REG_LIGHT_SENSOR);\n' +
            '    }while(visionId == (visionId | LS_WHITE_BALANCE_ENABLE));\n' +
            '    uint16_t* ret = (uint16_t *)Als;\n' +
            '    Als[0] = i2c_read8(REG_LS_ALS_L);\n' +
            '    Als[1] = i2c_read8(REG_LS_ALS_H);\n' +
            '    return  *ret;\n' +
            '}\n';
        var code = `isInghtSensor()`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    }


    // 读取接近检测  Read from proximity sensor
    Blockly.ArduinoOpenCat['motion_opencat_vision_sensor12'] = function (block) {
        visionDefine();
        Blockly.ArduinoOpenCat.define_fun['vision_sensor_isProximity'] =
            'uint8_t isProximity()\n' +
            '{\n' +
            '    uint8_t proximity,visionId;\n' +
            '    visionId = i2c_read8(REG_LIGHT_SENSOR);\n' +
            '    visionId |= LS_PROXIMITY_ENABLE | LS_AMBIENT_LIGHT_ENABLE | LS_COLOR_ENABLE | LS_SENSITIVITY_H;\n' +
            '    i2c_write8(REG_LIGHT_SENSOR, visionId);\n' +
            '    visionId = i2c_read8(REG_LIGHT_SENSOR);\n' +
            '    visionId |= LS_WHITE_BALANCE_ENABLE;\n' +
            '    i2c_write8(REG_LIGHT_SENSOR, visionId);\n' +
            '    do{\n' +
            '       visionId = i2c_read8(REG_LIGHT_SENSOR);\n' +
            '    }while(visionId == (visionId | LS_WHITE_BALANCE_ENABLE));\n' +
            '    proximity = i2c_read8(REG_LS_PROXIMITY);\n' +
            '    return  proximity;\n' +
            '}\n';
        var code = `isProximity()`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    }
    Blockly.ArduinoOpenCat['motion_opencat_oled11'] = function (block) {
      var id = block.id;
      // Blockly.ArduinoOpenCat.definitions_['include_arduino'] = '#include <Arduino.h>';
      Blockly.ArduinoOpenCat.definitions_['include_u8x8lib'] = '#include <U8x8lib.h>';
      Blockly.ArduinoOpenCat.definitions_['var_u8x8'] = 'U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(U8X8_PIN_NONE);';
      Blockly.ArduinoOpenCat.definitions_['var_u8x8_tiles1'] = 'uint8_t  U8X8_tiles1[8] = {0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff};';

      Blockly.ArduinoOpenCat.define_fun['u8x8_drawpic'] =
      'void drawpic(uint8_t *pic) {\n' +
      '    uint8_t x, y;\n' +
      '    for (x = 0; x < 8; x++) {\n' +
      '        for (y = 0; y < 16; y++) {\n' +
      '            if (pic[x * 16 + y]) {\n' +
      '                u8x8.drawTile( y, x , 1, U8X8_tiles1);\n' +
      '            }\n' +
      '        }\n' +
      '    }\n' +
      '}\n'
          
      Blockly.ArduinoOpenCat.setups_['setup_u8x8'] = '  u8x8.begin();\n  u8x8.setFlipMode(1);\n  u8x8.setFont(u8x8_font_chroma48medium8_r);';
          var shape = block.getFieldValue('SHAPE');
          Blockly.ArduinoOpenCat.definitions_[`var_u8x8_${id}`] = `uint8_t U8X8_tiles_${id}[128] = {${shape}};`;
          return `drawpic(U8X8_tiles_${id});\n`;
      }

    Blockly.ArduinoOpenCat['motion_opencat_oled22'] = function (block) {
        // Blockly.ArduinoOpenCat.definitions_['include_arduino'] = '#include <Arduino.h>';
        Blockly.ArduinoOpenCat.definitions_['include_u8x8lib'] = '#include <U8x8lib.h>';
        Blockly.ArduinoOpenCat.definitions_['var_u8x8'] = 'U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(U8X8_PIN_NONE);';
        Blockly.ArduinoOpenCat.setups_['setup_u8x8'] = '  u8x8.begin();\n  u8x8.setFlipMode(1);\n  u8x8.setFont(u8x8_font_chroma48medium8_r);';
        var text = Blockly.ArduinoOpenCat.valueToCode(block, 'TEXT', Blockly.ArduinoOpenCat.ORDER_NONE);
        var row = Blockly.ArduinoOpenCat.valueToCode(block, 'ROW', Blockly.ArduinoOpenCat.ORDER_NONE);
        var col = Blockly.ArduinoOpenCat.valueToCode(block, 'COL', Blockly.ArduinoOpenCat.ORDER_NONE);
        return `u8x8.drawString(${col-1},${row-1},${text});\n`;
    }

    Blockly.ArduinoOpenCat['motion_opencat_oled33'] = function () {
        // Blockly.ArduinoOpenCat.definitions_['include_arduino'] = '#include <Arduino.h>';
        Blockly.ArduinoOpenCat.definitions_['include_u8x8lib'] = '#include <U8x8lib.h>';
        Blockly.ArduinoOpenCat.definitions_['var_u8x8'] = 'U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(U8X8_PIN_NONE);';
        Blockly.ArduinoOpenCat.setups_['setup_u8x8'] = '  u8x8.begin();\n  u8x8.setFlipMode(1);\n  u8x8.setFont(u8x8_font_chroma48medium8_r);';
        return `u8x8.clear();\n`;
    }
    //calibrateServos
    Blockly.ArduinoOpenCat['calibrateServos_restoreFactorySettingsOnclick'] = function (block) {
        var code = '';
        // Blockly.ArduinoOpenCat.definitions_['var_MAIN_SKETCH'] = '#define MAIN_SKETCH';
        Blockly.ArduinoOpenCat.definitions_['include_chp'] = `#define MAIN_SKETCH 
#include "OpenCat.h"`;
        Blockly.ArduinoOpenCat.setups_['setup_chp_init'] = ' ';
        Blockly.ArduinoOpenCat.loopsEnd_['chp_release'] = ' ';
        // Blockly.ArduinoOpenCat.definitions_['include_WriteInstinct'] = "#include 'WriteInstinct/OpenCat.h' ";
        Blockly.ArduinoOpenCat.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
        // Blockly.ArduinoOpenCat.definitions_['include_IRremote'] = '#include <IRremote.h>';
        Blockly.ArduinoOpenCat.definitions_['include_MotionApps'] = '#include <MPU6050_6Axis_MotionApps20.h>';
        Blockly.ArduinoOpenCat.definitions_['var_Int'] = `
#define PACKET_SIZE 42
#define OVERFLOW_THRESHOLD 128
#define FIX_OVERFLOW
#define HISTORY 2
int8_t lag = 0;
float ypr[3];
float yprLag[HISTORY][3];
MPU6050 mpu;
#define OUTPUT_READABLE_YAWPITCHROLL
uint8_t mpuIntStatus;
uint8_t devStatus;
uint16_t packetSize;
uint16_t fifoCount;
uint8_t fifoBuffer[PACKET_SIZE];
Quaternion q;
VectorFloat gravity;
volatile bool mpuInterrupt = false;
void dmpDataReady() {
  mpuInterrupt = true;
}
#include <IRremote.h>
IRrecv irrecv(IR_RECIEVER);
decode_results results;
String translateIR()
{
  switch (results.value) {

    case 0xFFA25D:       return (F(K00));
    case 0xFF629D:        return (F(K01));
    case 0xFFE21D:          return (F(K02));

    case 0xFF22DD:        return (F(K10));
    case 0xFF02FD:          return (F(K11));
    case 0xFFC23D:         return (F(K12));

    case 0xFFE01F:         return (F(K20));
    case 0xFFA857:          return (F(K21));
    case 0xFF906F:         return (F(K22));

    case 0xFF6897:        return (F(K30));
    case 0xFF9867:        return (F(K31));
    case 0xFFB04F:         return (F(K32));

    case 0xFF30CF:         return (F(K40));
    case 0xFF18E7:         return (F(K41));
    case 0xFF7A85:         return (F(K42));

    case 0xFF10EF:          return (F(K50));
    case 0xFF38C7:          return (F(K51));
    case 0xFF5AA5:          return (F(K52));

    case 0xFF42BD:         return (F(K60));
    case 0xFF4AB5:          return (F(K61));
    case 0xFF52AD:          return (F(K62));

    case 0xFFFFFFFF: return ("");

    default: {
      }
      return ("");
  }
}
char token;
char lastToken;
#define CMD_LEN 10
char *lastCmd = new char[CMD_LEN];
char *newCmd = new char[CMD_LEN];
byte newCmdIdx = 0;
byte hold = 0;
int8_t offsetLR = 0;
bool checkGyro = true;
int8_t skipGyro = 3;
int8_t countDown = 0;
#define COUNT_DOWN 60

uint8_t timer = 0;
#ifdef SKIP
byte updateFrame = 0;
#endif
byte firstMotionJoint;
byte jointIdx = 0;


unsigned long usedTime = 0;
void getFIFO() {
  while (fifoCount < packetSize) fifoCount = mpu.getFIFOCount();
  mpu.getFIFOBytes(fifoBuffer, packetSize);
  fifoCount -= packetSize;
}

void getYPR() {
  if (mpuInterrupt || fifoCount >= packetSize)
  {
    mpuInterrupt = false;
    mpuIntStatus = mpu.getIntStatus();
    fifoCount = mpu.getFIFOCount();
    if ((mpuIntStatus & 0x10) || fifoCount > OVERFLOW_THRESHOLD) {

      mpu.resetFIFO();
#ifdef FIX_OVERFLOW
#ifdef DEVELOPER
      PTLF("reset FIFO!");
#endif
      lag = (lag - 1 + HISTORY) % HISTORY;
#endif
    }
    else if (mpuIntStatus & 0x02) {
      getFIFO();

#ifdef OUTPUT_READABLE_YAWPITCHROLL
      mpu.dmpGetQuaternion(&q, fifoBuffer);
      mpu.dmpGetGravity(&gravity, &q);
      mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);

#ifdef MPU_YAW180
      ypr[2] = -ypr[2];
      ypr[1] = -ypr[1];

#endif
#endif
      for (byte g = 1; g < 3; g++)
        ypr[g] *= degPerRad;
#ifdef FIX_OVERFLOW
      for (byte g = 1; g < 3; g++) {
        yprLag[lag][g] = ypr[g];
        ypr[g] = yprLag[(lag - 1 + HISTORY) % HISTORY][g] ;
      }
      lag = (lag + 1) % HISTORY;
#endif

#ifdef DEVELOPER
      PT(ypr[0]);
      PTF("\\t");
      PT(ypr[1]);
      PTF("\\t");
      PTL(ypr[2]);
#endif
    }
  }
}
void checkBodyMotion()  {
  getYPR();
  if (fabs(ypr[1]) > LARGE_PITCH || fabs(ypr[2]) > LARGE_ROLL) {
    if (!hold)
      for (byte w = 0; w < 50; w++) {
        getYPR();
        delay(10);
      }
    if (fabs(ypr[1]) > LARGE_PITCH || fabs(ypr[2]) > LARGE_ROLL) {
      if (!hold) {
        token = 'k';
        if (fabs(ypr[2]) > LARGE_ROLL) {
          strcpy(newCmd, "rc");
          newCmdIdx = 4;
        }
        else {
          strcpy(newCmd, ypr[1] < LARGE_PITCH ? "lifted" : "dropped");
          newCmdIdx = 1;
        }
      }
      hold = 10;
    }
  }
  else if (hold) {
    if (hold == 1) {
      token = 'k';
      strcpy(newCmd, "balance");
      newCmdIdx = 1;
    }
    hold --;
    if (!hold) {
      char temp[CMD_LEN];
      strcpy(temp, newCmd);
      strcpy(newCmd, lastCmd);
      strcpy(lastCmd, temp);
      newCmdIdx = 1;
      meow();
    }
  }
  for (byte i = 0; i < 2; i++) {
    RollPitchDeviation[i] = ypr[2 - i] - motion.expectedRollPitch[i];
    RollPitchDeviation[i] = sign(ypr[2 - i]) * max(fabs(RollPitchDeviation[i]) - levelTolerance[i], 0);
  }
}`;
      Blockly.ArduinoOpenCat.setups_['setup_begin'] = `
pinMode(BUZZER, OUTPUT);
#ifdef PIXEL_PIN
  pixels.begin();
  pixels.clear();
  pixels.setPixelColor(3, pixels.Color(0, 0, LIT_ON));

  pixels.show();
#endif
#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
  Wire.begin();
  TWBR = 24;
#elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
  Fastwire::setup(400, true);
#endif

  Serial.begin(BAUD_RATE);
  Serial.setTimeout(10);
  while (!Serial);
  while (Serial.available() && Serial.read());
  delay(100);
  PTLF("\\n* Start *");
  PTLF("Initialize I2C");
  PTLF("Connect MPU6050");
  mpu.initialize();
  {
    delay(500);
    PTLF("Test connection");
    PTL(mpu.testConnection() ? F("MPU successful") : F("MPU failed"));
  }
  do {
    PTLF("Initialize DMP");
    devStatus = mpu.dmpInitialize();
    delay(500);
    for (byte i = 0; i < 4; i++) {
      PT(EEPROMReadInt(MPUCALIB + 4 + i * 2));
      PT(" ");
    }
    PTL();
    mpu.setZAccelOffset(EEPROMReadInt(MPUCALIB + 4));
    mpu.setXGyroOffset(EEPROMReadInt(MPUCALIB + 6));
    mpu.setYGyroOffset(EEPROMReadInt(MPUCALIB + 8));
    mpu.setZGyroOffset(EEPROMReadInt(MPUCALIB + 10));
    if (devStatus == 0) {
      PTLF("Enable DMP");
      mpu.setDMPEnabled(true);
      PTLF("Enable interrupt");
      attachInterrupt(INTERRUPT, dmpDataReady, RISING);
      mpuIntStatus = mpu.getIntStatus();
      PTLF("DMP ready!");
      packetSize = mpu.dmpGetFIFOPacketSize();
    } else {
      PTLF("DMP failed (code ");
      PT(devStatus);
      PTLF(")");
      PTL();
    }
  } while (devStatus);
#if WALKING_DOF == 8
  playMelody(MELODY);
#endif
  {
    irrecv.enableIRIn();
  }

  assignSkillAddressToOnboardEeprom();
  PTL();
  {
    pwm.begin();
    pwm.setPWMFreq(60 * PWM_FACTOR);
    delay(200);
    strcpy(lastCmd, "rest");
    motion.loadBySkillName("rest");
    for (int8_t i = DOF - 1; i >= 0; i--) {
      pulsePerDegree[i] = float(PWM_RANGE) / servoAngleRange(i);
      servoCalibs[i] = servoCalib(i);
      calibratedDuty0[i] =  SERVOMIN + PWM_RANGE / 2 + float(middleShift(i) + servoCalibs[i]) * pulsePerDegree[i]  * rotationDirection(i) ;
      calibratedPWM(i, motion.dutyAngles[i]);
      delay(20);
    }
    randomSeed(analogRead(0));
    shutServos();
    token = 'd';
  }
  beep(30);

  pinMode(BATT, INPUT);
  pinMode(BUZZER, OUTPUT);
  meow();      
`
    Blockly.ArduinoOpenCat.loops_['loops_begin'] = `
  float voltage = analogRead(BATT);
  if (voltage <
#ifdef NyBoard_V0_1
      650
#else
      300
#endif
      ) {
    PTL(voltage);
    meow();
  }
  else {
    newCmd[0] = '\\0';
    newCmdIdx = 0;
    if (irrecv.decode(&results)) {
      String IRsig = irParser(translateIR());
      if (IRsig != "") {
        strcpy(newCmd, IRsig.c_str());
        if (!strcmp(newCmd, "d"))
          token = 'd';
        else if (!strcmp(newCmd, "z"))
          token = 'z';
        else if (!strcmp(newCmd, "p"))
          tStep = !tStep;
        else if (!strcmp(newCmd, "g")) {
          if (!checkGyro)
            checkBodyMotion();
          checkGyro = !checkGyro;
        }
        else if (!strcmp(newCmd, "sl")) {
          ramp = (ramp == 1) ? -1.5 : 1;
        }
        else if (!strcmp(newCmd, "c")) {
          token = 'c';
          checkGyro = false;
        }
        else
          token = 'k';
        newCmdIdx = 2;
      }
      irrecv.resume();
    }
    if ( Serial.available() > 0) {
      token = Serial.read();
      newCmdIdx = 3;
    }
    {
#ifdef GYRO
      if (checkGyro) {
        if (!(timer % skipGyro) && countDown == 0)
          checkBodyMotion();
        else if (mpuInterrupt || fifoCount >= packetSize)
        {
          // reset interrupt flag and get INT_STATUS byte
          mpuInterrupt = false;
          mpuIntStatus = mpu.getIntStatus();
          getFIFO();
        }
      }
#endif
    }
    if (newCmdIdx) {
      PTL(token);
      beep(newCmdIdx * 4);
      switch (token) {
        case 'h': {
            PTLF("* Help Info *");
            break;
          }
        case 'z': {
            shutServos();
            break;
          }
        case 'd': {
            skillByName("rest");
            break;
          }

        case 's': {
            PTLF("save offset");
            saveCalib(servoCalibs);
            break;
          }
        case 'a': {
            PTLF("aborted");
            for (byte i = 0; i < DOF; i++) {
              servoCalibs[i] = servoCalib( i);
            }
            break;
          }
        case 'i':
        case 'l':
          {
            String inBuffer = Serial.readStringUntil('~');
            int8_t numArg = inBuffer.length();
            char* list = inBuffer.c_str();
            char *targetFrame = new char [DOF];
            for (int i = 0; i < DOF; i += 1) {
              targetFrame[i] = currentAng[i];
            }
            if (token == 'i') {
              for (int i = 0; i < numArg; i += 2) {
                targetFrame[list[i]] = list[i + 1];
              }
            }
            else if (token == 'l') {
              for (int i = 0; i < DOF; i += 1) {
                targetFrame[i] = list[i];
              }
            }
            transform(targetFrame, 1, 3);
            delete [] targetFrame;

            break;
          }
        case 'j': {
            printRange(DOF);
            printList(currentAng);
            break;
          }
        case 'c':
        case 'm':
        case 'u':
        case 'b':
          {
            int target[2] = {};
            String inBuffer = Serial.readStringUntil('\\n');
            byte inLen = 0;
            strcpy(newCmd, inBuffer.c_str());
            char *pch;
            pch = strtok (newCmd, " ,");
            for (byte c = 0; pch != NULL; c++)
            {
              target[c] = atoi(pch);
              pch = strtok (NULL, " ,\\t");
              inLen++;
            }
            if (token == 'c') {
              if (strcmp(lastCmd, "c")) {
                motion.loadBySkillName("calib");
                transform( motion.dutyAngles);
              }
              if (inLen == 2)
                servoCalibs[target[0]] = target[1];
              PTL();
              printRange(DOF);
              printList(servoCalibs);
              yield();
            }
            else if (token == 'm') {
              currentAng[target[0]] = motion.dutyAngles[target[0]] = target[1];
            }
            else if (token == 'u') {
              meow(target[0], 0, 50, 200, 1 + target[1]);
            }
            else if (token == 'b') {
              beep(target[0], (byte)target[1]);
            }
            PT(token);
            printList(target, 2);
            if (token == 'c' || token == 'm') {
              int duty = SERVOMIN + PWM_RANGE / 2 + float(middleShift(target[0])  + servoCalibs[target[0]] + motion.dutyAngles[target[0]]) * pulsePerDegree[target[0]] * rotationDirection(target[0]);
              pwm.setPWM(pin(target[0]), 0,  duty);
            }
            break;
          }


        default: if (Serial.available() > 0) {
            String inBuffer = Serial.readStringUntil('\\n');
            strcpy(newCmd, inBuffer.c_str());
          }
      }
      while (Serial.available() && Serial.read()); 
      if (strcmp(newCmd, "") && strcmp(newCmd, lastCmd) ) {
        if (token == 'w') {};

        if (token == 'k') {

          motion.loadBySkillName(newCmd);

          char lr = newCmd[strlen(newCmd) - 1];
          offsetLR = (lr == 'L' ? 15 : (lr == 'R' ? -15 : 0));
          timer = 0;
          if (strcmp(newCmd, "balance") && strcmp(newCmd, "lifted") && strcmp(newCmd, "dropped") )
            strcpy(lastCmd, newCmd);

#ifdef POSTURE_WALKING_FACTOR
          postureOrWalkingFactor = (motion.period == 1 ? 1 : POSTURE_WALKING_FACTOR);
#endif
          firstMotionJoint = (motion.period <= 1) ? 0 : DOF - WALKING_DOF;

          if (motion.period < 1) {
            int8_t repeat = motion.loopCycle[2] - 1;
            for (byte c = 0; c < abs(motion.period); c++) {
              transform(motion.dutyAngles + c * 18, motion.angleDataRatio, motion.dutyAngles[16 + c * 18] / 4.0);
              delay(motion.dutyAngles[17 + c * 18] * 100);
              if (c == motion.loopCycle[1] && repeat > 0) {
                c = motion.loopCycle[0] - 1;
                repeat--;
              }
            }
            skillByName("balance", 1, 2, false);
            strcpy(lastCmd, "balance");
            hold = 0;
          }
          else {
            transform( motion.dutyAngles, motion.angleDataRatio, 1, firstMotionJoint);
            jointIdx = DOF;
          }

          if (!strcmp(newCmd, "rest")) {
            shutServos();
            token = 'd';
          }
        }
        else {
          lastCmd[0] = token;
          memset(lastCmd + 1, '\\0', CMD_LEN - 1);
        }
      }
    }
    {
      if (token == 'k') {
        if (jointIdx == DOF) {
#ifdef SKIP
          if (updateFrame++ == SKIP) {
            updateFrame = 0;
#endif
            timer += tStep;
            if (timer == abs(motion.period)) {
              timer = 0;
            }
            else if (timer == 255)
              timer = abs(motion.period) - 1;
#ifdef SKIP
          }
#endif
          jointIdx =
#ifdef HEAD
            0;
#else
#ifdef TAIL
            2;
#else
            DOF - WALKING_DOF;
#endif
#endif
        }
#ifndef TAIL
        if (jointIdx == 1)
          jointIdx = DOF - WALKING_DOF;
#endif
        if (jointIdx < firstMotionJoint && abs(motion.period) > 1) {
          calibratedPWM(jointIdx, (jointIdx != 1 ? offsetLR : 0)
                        + 10 * sin (timer * (jointIdx + 2) * M_PI / abs(motion.period))
#ifdef GYRO
                        + (checkGyro ? adjust(jointIdx) : 0)
#endif
                        );
        }
        else if (jointIdx >= firstMotionJoint) {
          int dutyIdx = timer * WALKING_DOF + jointIdx - firstMotionJoint;
          calibratedPWM(jointIdx, motion.dutyAngles[dutyIdx]*motion.angleDataRatio
#ifdef GYRO
                        + (checkGyro ? ((!(timer % skipGyro) && countDown == 0) ? adjust(jointIdx) : currentAdjust[jointIdx]) : 0)
#endif
                        );
        }
        jointIdx++;
      }
      else
        timer = 0;
    }
  }    
`

        return  code;    
    }
    Blockly.ArduinoOpenCat['calibrateServos_updatePreloadedSkillsOnclick'] = function (block) {
      Blockly.ArduinoOpenCat.definitions_['include_chp'] = '#include <OpenCat.h>';

      Blockly.ArduinoOpenCat.setups_['setup_chp_init'] = ' ';
      Blockly.ArduinoOpenCat.loopsEnd_['chp_release'] = ' ';
      // Blockly.ArduinoOpenCat.definitions_['var_IMAIN_SKETCH'] = '#define MAIN_SKETCH';
      Blockly.ArduinoOpenCat.definitions_['var_INSTINCT_SKETCH'] = '#define INSTINCT_SKETCH';
      Blockly.ArduinoOpenCat.definitions_['var_saveMPUcalib'] = `void saveMPUcalib(int * var) {
for (byte i = 0; i < 6; i++)
    EEPROM.update(MPUCALIB + i, var[i]);
}`;
      Blockly.ArduinoOpenCat.definitions_['var_writeConst'] = `void writeConst() {
        EEPROM.update(MELODY, sizeof(melody));
        for (byte i = 0; i < sizeof(melody); i++)
          EEPROM.update(MELODY - 1 - i, melody[i]);
        PTLF("Reset joint calibration? (Y/n)");
      #ifndef AUTORUN
        char resetJointCalibrationQ = 'Y';
      #endif
        for (byte i = 0; i < DOF; i++) {
      #ifndef AUTORUN
          if (resetJointCalibrationQ == 'Y')
            EEPROM.update(CALIB + i, calibs[i]);
      #endif
          EEPROM.update(PIN + i, pins[i]);
          EEPROM.update(MID_SHIFT + i, middleShifts[i]);
          EEPROM.update(ROTATION_DIRECTION + i, rotationDirections[i]);
          EEPROM.update(SERVO_ANGLE_RANGE + i, servoAngleRanges[i]);
          for (byte para = 0; para < NUM_ADAPT_PARAM; para++) {
            EEPROM.update(ADAPT_PARAM + i * NUM_ADAPT_PARAM + para, round(adaptiveParameterArray[i][para]));
          }
        }
}`;
    Blockly.ArduinoOpenCat.definitions_['var_saveSkillInfoFromProgmemToOnboardEeprom'] = `void saveSkillInfoFromProgmemToOnboardEeprom() {
      int skillAddressShift = 0;
      unsigned int i2cEepromAddress = 0; 
    #ifdef I2C_EEPROM
      PTLF("\\n* Update Instincts? (Y/n)");
    #ifndef AUTORUN
      char choice = 'Y';
      PT(choice == 'Y' ? "Will" : "Won't");
    #endif
      PTL(" overwrite Instincts on external I2C EEPROM!");
    #endif
      PTLF("Saving skill info...");
      for (byte s = 0; s < NUM_SKILLS; s++) {
        byte len = strlen(skillNameWithType[s]);
        EEPROM.update(SKILLS + skillAddressShift++, len - 1); 
        PT(skillNameWithType[s][len - 1] == 'I' ? "I nstinct:\t" : "N ewbility:\t");
        for (byte l = 0; l < len; l++) {
          PT(skillNameWithType[s][l]);
          EEPROM.update(SKILLS + skillAddressShift++, skillNameWithType[s][l]);
        }
        PTL();
    #ifdef I2C_EEPROM
        if (!EEPROMOverflow)
          if (skillNameWithType[s][len - 1] == 'I'
    #ifndef AUTORUN
              && choice == 'Y'
    #endif
             ) {
            EEPROMWriteInt(SKILLS + skillAddressShift, i2cEepromAddress);
            copyDataFromPgmToI2cEeprom(i2cEepromAddress,  (unsigned int) progmemPointer[s]);
          }
    #endif
        skillAddressShift += 2; 
      }
      PTLF("  *********** Notice! *********");
      PTLF("    Maximal storage of onboard EEPROM is 1024 bytes.");
      PTF("\\tInstinctive dictionary used ");
      PT(SKILLS + skillAddressShift);
      PT(" bytes (");
      PT(float(100) * (SKILLS + skillAddressShift) / 1024);
      PTLF(" %)!");
    #ifdef I2C_EEPROM
    #ifndef AUTORUN
      if (choice == 'Y')
    #endif
      {
        PTF("    Maximal storage of external I2C EEPROM is ");
        PT(EEPROM_SIZE);
        PTLF(" bytes.");
        PT("\\tInstinctive data used ");
        PT(i2cEepromAddress);
        PT(" bytes (");
        PT(float(100)*i2cEepromAddress / EEPROM_SIZE);
        PTLF(" %)!");
      }
    #endif
      PTLF("  *****************************");
      PTLF("Finished!"); 
}`;
// Blockly.ArduinoOpenCat.definitions_['include_OpenCat'] = '#include "WriteInstinct/OpenCat.h"';

      Blockly.ArduinoOpenCat.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
      Blockly.ArduinoOpenCat.definitions_['include_MPU6050'] = '#include <MPU6050.h>';
      Blockly.ArduinoOpenCat.definitions_['include_Wire'] = '#include <Wire.h>';
      Blockly.ArduinoOpenCat.definitions_['var_Int'] = `
int discard = 100;
int buffersize = 1000;   //Amount of readings used to average, make it higher to get more precision but sketch will be slower  (default:1000)
int acel_deadzone = 8;   //Acelerometer error allowed, make it lower to get more precision, but sketch may not converge  (default:8)
int giro_deadzone = 1;   //Giro error allowed, make it lower to get more precision, but sketch may not converge  (default:1)
byte stage = 0;
char choice;
int ag[6];      //int16_t ax, ay, az, gx, gy, gz;
int agMean[6];  //mean_ax, mean_ay, mean_az, mean_gx, mean_gy, mean_gz;
int agOffset[6];  //ax_offset, ay_offset, az_offset, gx_offset, gy_offset, gz_offset;
int mpuOffset[6];
#define SKIP 3
#ifdef SKIP
byte updateFrame = 0;
#endif
byte firstValidJoint;
#define CMD_LEN 10
#define CMD_LEN 10
bool printMPU = false;
MPU6050 mpu;
byte jointIdx = 0;
uint8_t timer = 0;
char token;
char *lastCmd = new char[CMD_LEN];      
`;
      Blockly.ArduinoOpenCat.definitions_['var_meansensors'] = `void meansensors() {
        long i = 0;
        long * agBuff = new long[6] {0, 0, 0, 0, 0, 0}; 
      
        while (i < (buffersize + discard + 1)) {
          mpu.getMotion6(ag, ag + 1, ag + 2, ag + 3, ag + 4, ag + 5);
      
          if (i > discard && i <= (buffersize + discard)) { 
            for (byte i = 0; i < 6; i++)
              agBuff[i] += ag[i];
      
          }
          if (i == (buffersize + discard)) {
            for (byte i = 0; i < 6; i++)
              agMean[i] = agBuff[i] / buffersize;
      
          }
          i++;
          delay(2); 
        }
        delete [] agBuff;
}`;
Blockly.ArduinoOpenCat.definitions_['var_calibration'] = `void calibration() {
  for (int i = 0; i < 6; i++) {
    agOffset[i] = ((i == 2 ? 16384 : 0) - agMean[i]) / 8; 
  }
  while (1) {
    int ready = 0;
    mpu.setXAccelOffset(agOffset[0]);
    mpu.setYAccelOffset(agOffset[1]);
    mpu.setZAccelOffset(agOffset[2]);
    mpu.setXGyroOffset(agOffset[3]);
    mpu.setYGyroOffset(agOffset[4]);
    mpu.setZGyroOffset(agOffset[5]);


    meansensors();

    for (int i = 0; i < 6; i++) {
      int tolerance = (i < 3) ? acel_deadzone : giro_deadzone;
      if (abs((i == 2 ? 16384 : 0) - agMean[i]) <= tolerance) {
        PT(i + 1);
        beep(i * 2 + (i == 3 ? 0 : 1), 100, 10);
#ifdef PIXEL_PIN
        pixels.setPixelColor(i, pixels.Color(0, LIT_ON, 0));
#endif
        ready++;
      }
      else {
        PT('.');
#ifdef PIXEL_PIN
        pixels.setPixelColor(i, pixels.Color(LIT_ON, 0, 0));
#endif

        agOffset[i] -= (agMean[i] - (i == 2 ? 16384 : 0)) / (tolerance == 1 ? 3 : tolerance);
      }
    }
#ifdef PIXEL_PIN
    pixels.show();   
#endif
    PTL();
    for (int i = 0; i < 6; i++) {
      PT(agOffset[i]);
      PT("\\t");
    }
    PTL();

    if (ready == 6) {
      delay(100);
      beep(100, 1000);
#ifdef PIXEL_PIN
      for (int i = 0; i < NUMPIXELS - 1; i++) { 
        pixels.setPixelColor(i, pixels.Color(0, 0, LIT_ON));
      }
      pixels.setPixelColor(NUMPIXELS - 1, pixels.Color(0, LIT_ON, 0));
      pixels.show();   
#endif
      break;
    }
  }
}
`;
      Blockly.ArduinoOpenCat.setups_['setup_begin'] = `
      #ifdef PIXEL_PIN
      pixels.begin(); 
      pixels.clear(); 
      pixels.setPixelColor(NUMPIXELS - 1, pixels.Color(LIT_ON, 0, 0));
    
      pixels.show();   
    #endif
    
    
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
      Wire.begin();
      TWBR = 24; 
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
      Fastwire::setup(400, true);
    #endif
    
      Serial.begin(BAUD_RATE);
      Serial.setTimeout(5);
      delay(1);
      while (!Serial);
    
      beep(100, 50);
      mpu.initialize();
    
      while (Serial.available() && Serial.read()); 
      PTLF("\\n* Include your robot's header file in OpenCat.h");
      PTLF("\\n* Change the \\"V*_*\\" in \\"#define NyBoard_V1_0\\" according to your NyBoard version!");
      PTLF("\\n* OpenCat Writing Constants to EEPROM...");
      writeConst(); 
      beep(30);
      saveSkillInfoFromProgmemToOnboardEeprom();
      assignSkillAddressToOnboardEeprom();
    
      // servo
      { pwm.begin();
        pwm.setPWMFreq(60 * PWM_FACTOR); 
        delay(100);
        strcpy(lastCmd, "rest");
        motion.loadBySkillName("rest");
        for (byte i = 0; i < DOF; i++) {
          pulsePerDegree[i] = float(PWM_RANGE) / servoAngleRange(i);
          servoCalibs[i] = servoCalib(i);
          calibratedDuty0[i] =  SERVOMIN + PWM_RANGE / 2 + float(middleShift(i) + servoCalibs[i]) * pulsePerDegree[i]  * rotationDirection(i) ;
          calibratedPWM(i, motion.dutyAngles[i]);
        }
        shutServos();
        token = 'd';
      }
      beep(30);
      PTLF("\\nCalibrate MPU? (Y/n)");
    #ifndef AUTORUN
      choice = 'Y';
      PTLF("Gotcha!");
      if (choice == 'Y')
    #endif
      {
        PTLF("\\n* MPU6050 Calibration Routine");
    #ifdef PIXEL_PIN
        pixels.setPixelColor(NUMPIXELS - 1, pixels.Color(0, 0, LIT_ON));
        pixels.show();  
    #endif
        delay(100);
        PTL(mpu.testConnection() ? F("MPU6050 connection successful") : F("MPU6050 connection failed (sometimes it shows \\"failed\\" but is ok to bypass."));
        delay(100);
        mpu.setXAccelOffset(0);
        mpu.setYAccelOffset(0);
        mpu.setZAccelOffset(0);
        mpu.setXGyroOffset(0);
        mpu.setYGyroOffset(0);
        mpu.setZGyroOffset(0);
      }
`;    
  Blockly.ArduinoOpenCat.loops_['loops_begin'] = `
  #ifndef AUTORUN
  if (choice == 'Y')
#endif
  {
    if (stage == 0) {
      PTLF("\\nReading sensors for first time...");
      meansensors();
      stage++;
      delay(100);
    }

    if (stage == 1) {
      PTLF("\\nYour MPU6050 should be placed in horizontal position, with package letters facing up.");
      PTLF("Don't touch it until all six numbers appear. You should hear a long beep followed by a Meooow!");
      calibration();
      stage++;
      delay(100);
    }

    if (stage == 2) {
      meansensors();
      PTLF("FINISHED!");
      PTLF("\\nData is printed as:\\t\\tacelX\\tacelY\\tacelZ\\tgiroX\\tgiroY\\tgiroZ");
      PTLF("Readings should be close to:\\t0\\t0\\t16384\\t0\\t0\\t0");

      PTF("Sensor readings with offsets:\\t");
      printList(agMean, 6);

      PTF("Your calibration offsets:\\t");
      printList(agOffset, 6);

      PTLF("The offsets are saved and automatically sent to mpu.setXAccelOffset(yourOffset)\\n");
      for (byte i = 0; i < 6; i++) {
        mpuOffset[i] = agOffset[i];
        EEPROMWriteInt(MPUCALIB + i * 2, mpuOffset[i]);
      }

      mpu.setXAccelOffset(agOffset[0]);
      mpu.setYAccelOffset(agOffset[1]);
      mpu.setZAccelOffset(agOffset[2]);
      mpu.setXGyroOffset(agOffset[3]);
      mpu.setYGyroOffset(agOffset[4]);
      mpu.setZGyroOffset(agOffset[5]);
      stage = 3;
      meow();
    }
  }

  char cmd[CMD_LEN] = {};
  byte newCmd = 0;
  if (Serial.available() > 0) {
    token = Serial.read();
    newCmd = 3;
  }
  if (newCmd) {
    beep(newCmd * 10);

    switch (token) {
      case 'g': {
          printMPU = !printMPU;
          break;
        }
      case 'z': {
          shutServos();
          break;
        }
      case 'd' : {
          skillByName("rest");
          break;
        }
      case 'j': {
          printRange(DOF);
          printList(currentAng);
          break;
        }
      case 's': {
          PTLF("save calibration");
          saveCalib(servoCalibs);
          break;
        }
      case 'a': {
          PTLF("abort calibration");
          for (byte i = 0; i < DOF; i++) {
            servoCalibs[i] = servoCalib( i);
          }
          break;
        }
      case 'c':
      case 'm': {
          int target[2] = {};
          String inBuffer = Serial.readStringUntil('\\n');
          byte inLen = 0;
          strcpy(cmd, inBuffer.c_str());
          char *pch;
          pch = strtok (cmd, " ,\\t");
          for (int c = 0; pch != NULL; c++)
          {
            target[c] = atoi(pch);
            pch = strtok (NULL, " ,");
            inLen++;
          }

          if (token == 'c') {
            if (strcmp(lastCmd, "c")) { 
              motion.loadBySkillName("calib");
              transform(motion.dutyAngles, 1, 1, 0.5);
            }
            if (inLen == 2)
              servoCalibs[target[0]] = target[1];
            PTL();
            printRange(DOF);
            printList(servoCalibs);
            yield();

          }
          else if (token == 'm') {
            PTLF("moving [ targetIdx, angle ]: ");
            currentAng[target[0]] = motion.dutyAngles[target[0]] = target[1];
          }
          PT(token);
          printList(target, 2);

          int duty = SERVOMIN + PWM_RANGE / 2 + float(middleShift(target[0])  + servoCalibs[target[0]] +  motion.dutyAngles[target[0]]) * pulsePerDegree[target[0]] * rotationDirection(target[0]) ;
          pwm.setPWM(pin(target[0]), 0,  duty);
          break;
        }
      default: if (Serial.available() > 0) {
          String inBuffer = Serial.readStringUntil('\\n');
          strcpy(cmd, inBuffer.c_str());
        }
    }
    while (Serial.available() && Serial.read());

    if (strcmp(cmd, "") && strcmp(lastCmd, cmd) ) {
      if (token == 'w') {}; 
      if (token == 'k') { 
        motion.loadBySkillName(cmd);
#ifdef DEVELOPER
        PTF("free memory: ");
        PTL(freeMemory());
#endif
        timer = 0;
        if (strcmp(cmd, "balance") && strcmp(cmd, "lifted") && strcmp(cmd, "dropped") )
          strcpy(lastCmd, cmd);

        firstValidJoint = (motion.period == 1) ? 0 : DOF - WALKING_DOF;
        jointIdx = firstValidJoint;
        transform( motion.dutyAngles, 1, 1, firstValidJoint);
        if (!strcmp(cmd, "rest")) {
          shutServos();
          token = 'd';
        }
      }
      else {
        lastCmd[0] = token;
        memset(lastCmd + 1, '\\0', CMD_LEN - 1);
      }
    }
  }

  {
    if (printMPU) {
      mpu.getMotion6(ag, ag + 1, ag + 2, ag + 3, ag + 4, ag + 5);

      printList(ag, 6);
    }

    if (token == 'k') {
#ifndef HEAD  
      if (jointIdx == 0)
        jointIdx = 2;
#endif
#ifndef TAIL  
      if (jointIdx == 2)
        jointIdx = 4;
#endif
      if (motion.period != 1) {
        if (jointIdx < 4)
          jointIdx = 4;

      }
#if WALKING_DOF==8 
      if (jointIdx == 4)
        jointIdx = 8;
#endif
      int dutyIdx = timer * WALKING_DOF + jointIdx - firstValidJoint;
      calibratedPWM(jointIdx, motion.dutyAngles[dutyIdx] );
      jointIdx++;

      if (jointIdx == DOF) {
        jointIdx = 0;
#ifdef SKIP
        if (updateFrame++ == SKIP) {
          updateFrame = 0;
#endif
          timer = (timer + 1) % motion.period;
#ifdef SKIP
        }
#endif
      }
    }
  }


`;
      var code
      return code;
    } 
}