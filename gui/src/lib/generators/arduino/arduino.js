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

const powerAtActionAndSpeed = (action, power) => {
    let left = 0, right = 0;
    if ('forward' === action) {
        left = -power;
        right = -power
    } else if ('back' === action) {
        left = power;
        right = power
    } else if ('left' === action) {
        left = -power;
        right = power
    } else if ('right' === action) {
        left = power;
        right = -power
    }
    return [left, right]
}

const motorCode = (motor = '1') => {
    let code = 'a';
    if ('1' === motor) {
        code = 'a';
    } else if ('2' === motor) {
        code = 'b';
    }
    return code;
}

export default (Blockly) => {

    Blockly.Arduino['text'] = Blockly.C['text'];

    /* 数字输出 -------------------------------------------------- */
    Blockly.Arduino['motion_arduino_figure_output'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var dropdownStat = block.getFieldValue('STAT');
        Blockly.Arduino.setups_['setup_output_' + pin] = '  pinMode(' + pin + ', OUTPUT);';
        var code = 'digitalWrite(' + pin + ',' + dropdownStat + ');\n'
        return code;
    }
    Blockly.Arduino['motion_arduino_seeed_led'] = Blockly.Arduino['motion_arduino_figure_output'];
    // Blockly.Arduino['motion_arduino_seeed_buzzer'] = Blockly.Arduino['motion_arduino_figure_output'];
    Blockly.Arduino['motion_arduino_seeed_relay'] = Blockly.Arduino['motion_arduino_figure_output'];
    Blockly.Arduino['motion_arduino_seeed_el_driver'] = Blockly.Arduino['motion_arduino_figure_output'];
    Blockly.Arduino['motion_arduino_seeed_vibration_motor'] = Blockly.Arduino['motion_arduino_figure_output'];
    Blockly.Arduino['motion_arduino_seeed_electromagnet'] = Blockly.Arduino['motion_arduino_figure_output'];
    Blockly.Arduino['motion_arduino_seeed_mini_fan'] = Blockly.Arduino['motion_arduino_figure_output'];

    Blockly.Arduino['motion_arduino_seeed_recorder'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var dropdownStat = block.getFieldValue('STAT');

        Blockly.Arduino.setups_['setup_output_' + pin] = '  pinMode(' + pin + ', OUTPUT);';
        Blockly.Arduino.define_fun['recorder'] =
            'void recorderPlay(uint8_t isPlay)\n{\n' +
            `digitalWrite(${pin}, LOW);\n` +
            `delay(100);\n` +
            `if(isPlay) digitalWrite(${pin}, HIGH);\n` +
            '\n}\n';
        var code = `recorderPlay(${dropdownStat});\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_seeed_buzzer'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var dropdownStat = block.getFieldValue('STAT');
        Blockly.Arduino.setups_['setup_output_' + pin] = '  pinMode(' + pin + ', OUTPUT);';
        var code = 'analogWrite(' + pin + ',' + dropdownStat + ');\n'
        return code;
    }


    /* 数字输入 -------------------------------------------------- */
    Blockly.Arduino['motion_arduino_figure_input'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.setups_['setup_input_' + pin] = '  pinMode(' + pin + ', INPUT);';
        var code = 'digitalRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_seeed_btn'] = Blockly.Arduino['motion_arduino_figure_input'];
    Blockly.Arduino['motion_arduino_seeed_tilt'] = Blockly.Arduino['motion_arduino_figure_input'];
    Blockly.Arduino['motion_arduino_seeed_touch'] = Blockly.Arduino['motion_arduino_figure_input'];
    Blockly.Arduino['motion_arduino_seeed_water'] = Blockly.Arduino['motion_arduino_figure_input'];
    Blockly.Arduino['motion_arduino_seeed_magnetic_switch'] = Blockly.Arduino['motion_arduino_figure_input'];
    Blockly.Arduino['motion_arduino_seeed_pir_motion'] = Blockly.Arduino['motion_arduino_figure_input'];
    Blockly.Arduino['motion_arduino_seeed_collision'] = Blockly.Arduino['motion_arduino_figure_input'];
    Blockly.Arduino['motion_arduino_seeed_hall'] = Blockly.Arduino['motion_arduino_figure_input'];
    Blockly.Arduino['motion_arduino_seeed_line_finder_r'] = Blockly.Arduino['motion_arduino_figure_input'];

    Blockly.Arduino['motion_arduino_seeed_line_finder_rcolor'] = function (block) {

        var pin = block.getFieldValue('PIN');
        var color = block.getFieldValue('COLOR');
        Blockly.Arduino.setups_['setup_input_' + pin] = '  pinMode(' + pin + ', INPUT);';
        var code = 'digitalRead(' + pin + ')';
        return [`${color == '0' ? '' : 'not '}${code}`, Blockly.Arduino.ORDER_ATOMIC];

    }

    Blockly.Arduino['motion_arduino_seeed_line_finder'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.setups_['setup_input_' + pin] = '  pinMode(' + pin + ', INPUT);';
        var code = '!digitalRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_seeed_flame'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.setups_['setup_input_' + pin] = '  pinMode(' + pin + ', INPUT);';
        var code = '!digitalRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }



    /* 模拟输入 -------------------------------------------------- */
    Blockly.Arduino['motion_arduino_analog_input'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.setups_['setup_analog_' + pin] = '  pinMode(' + pin + ', 2);';
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Arduino['motion_arduino_seeed_light'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.setups_['setup_analog_' + pin] = '  pinMode(' + pin + ', 0);';
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_seeed_rotation'] = Blockly.Arduino['motion_arduino_analog_input'];
    Blockly.Arduino['motion_arduino_seeed_slide_pot'] = Blockly.Arduino['motion_arduino_analog_input'];
    Blockly.Arduino['motion_arduino_seeed_moisture'] = Blockly.Arduino['motion_arduino_analog_input'];
    Blockly.Arduino['motion_arduino_seeed_temperature'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.setups_['setup_analog_' + pin] = '  pinMode(' + pin + ', 2);';
        var code = 'analogRead(' + pin + ')*0.048';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_seeed_sound'] = function (block) {
        var pin = block.getFieldValue('PIN');
        // var code = 'analogRead(' + pin + ')';
        Blockly.Arduino.define_fun[`get_analog_${pin}_sound_avg`] =
            `long get_analog_${pin}_sound_avg(){\n` +
            '    long sum = 0;\n' +
            '    for(int i=0; i<32; i++){\n' +
            `        sum += analogRead(${pin});\n` +
            '    }\n' +
            '    sum >>= 5;\n' +
            '    return sum;\n' +
            '}';
        return [`get_analog_${pin}_sound_avg()`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_seeed_thumb_joystick'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var xy = block.getFieldValue('XY');
        if (xy === '1') {
            pin = `A${parseInt(pin[1]) + 1}`;
        }
        var code = 'analogRead(' + pin + ')';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    /* 模拟输出 -------------------------------------------------- */
    Blockly.Arduino['motion_arduino_analog_output'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
        var code = `analogWrite(${pin}, ${num});\n`;
        return code;
    }

    /* 脉冲长度 -------------------------------------------------- */
    Blockly.Arduino['motion_arduino_pulse_len'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var stat = block.getFieldValue('STAT');
        Blockly.Arduino.setups_['setup_input_' + pin] = '  pinMode(' + pin + ', INPUT);';
        var code = `pulseIn(${pin}, ${stat})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Arduino['motion_arduino_pulse_len_us'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var stat = block.getFieldValue('STAT');
        var time = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
        Blockly.Arduino.setups_['setup_input_' + pin] = '  pinMode(' + pin + ', INPUT);';
        var code = `pulseIn(${pin}, ${stat},${time})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    /* 串口 -------------------------------------------------- */
    Blockly.Arduino['motion_arduino_serial_baud_rate'] = function (block) {
        var br = block.getFieldValue('BR');
        // Blockly.Arduino.setups_['setup_serial_begin'] = `Serial.begin(${br});`;
        return `Serial.begin(${br});\n`;
    }
    Blockly.Arduino['motion_arduino_serial_print'] = function (block) {
        var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
        var code = `Serial.println(${text});\n`;
        return code;
    }
    Blockly.Arduino['motion_arduino_serial_read'] = function (block) {
        var code = `Serial.readString()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Arduino['motion_arduino_serial_is_readable'] = function (block) {
        var code = `Serial.available()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Arduino['motion_arduino_serial_strtonumber'] = function (block) {
        var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
        return [`${text}.toFloat()`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['math_number_for_plotter_print'] = function (block) {
        var code = block.getFieldValue('NUM') || '"null"';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_serial_chart_print'] = function (block) {
        // Blockly.Arduino.definitions_['var_serial_putchar'] =
        //     'FILE serial_stdout;\n' +
        //     'int serial_putchar(char c, FILE* f) {\n' +
        //     '  if (c == \'\\n\') serial_putchar(\'\\r\', f);\n' +
        //     '  return Serial.write(c) == 1? 0 : 1;\n' +
        //     '}\n';
        // Blockly.Arduino.setups_['setup_fdev_setup_stream'] =
        //     '  fdev_setup_stream(&serial_stdout, serial_putchar, NULL, _FDEV_SETUP_WRITE);\n' +
        //     '  stdout = &serial_stdout;\n';
        let nullvalue = "\"null\"";
        var args0 = Blockly.Arduino.valueToCode(block, 'ARGS_0', Blockly.Arduino.ORDER_NONE) || nullvalue;
        var args1 = Blockly.Arduino.valueToCode(block, 'ARGS_1', Blockly.Arduino.ORDER_NONE) || nullvalue;
        var args2 = Blockly.Arduino.valueToCode(block, 'ARGS_2', Blockly.Arduino.ORDER_NONE) || nullvalue;
        var args3 = Blockly.Arduino.valueToCode(block, 'ARGS_3', Blockly.Arduino.ORDER_NONE) || nullvalue;
        var args4 = Blockly.Arduino.valueToCode(block, 'ARGS_4', Blockly.Arduino.ORDER_NONE) || nullvalue;
        return `Serial.println("printf("+String(${args0})+","+String(${args1})+","+String(${args2})+","+String(${args3})+","+String(${args4})+")");\n`
        // return `printf("printf(${args0==nullvalue?'%s':'%ld'},${args1==nullvalue?'%s':'%ld'},${args2==nullvalue?'%s':'%ld'},${args3==nullvalue?'%s':'%ld'},${args4==nullvalue?'%s':'%ld'})",${args0},${args1},${args2},${args3},${args4});\n`
    }

    Blockly.Arduino['motion_arduino_broadcast_menu'] = function (block) {
        var opt = block.getFieldValue('BROADCAST_OPTION');
        return [opt, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_broadcast'] = function (block) {
        // Blockly.Arduino.definitions_['var_serial_putchar'] =
        //     'FILE serial_stdout;\n' +
        //     'int broadcastValueLength=0;\n' +
        //     'int serial_putchar(char c, FILE* f) {\n' +
        //     '  if (c == \'\\n\') serial_putchar(\'\\r\', f);\n' +
        //     '  return Serial.write(c) == 1? 0 : 1;\n' +
        //     '}\n';
        // Blockly.Arduino.setups_['setup_fdev_setup_stream'] =
        //     '  fdev_setup_stream(&serial_stdout, serial_putchar, NULL, _FDEV_SETUP_WRITE);\n' +
        //     '  stdout = &serial_stdout;\n';
        let opt = Blockly.Arduino.valueToCode(block, 'BROADCAST_INPUT', Blockly.Arduino.ORDER_NONE);
        let value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);

        if (value=="\"null\""||value==null||value=='') {
            value = 0
        }
        let code = `Serial.println("broadcast(${opt},"+String(${value})+")");\n`;
//         let code = `broadcastValueLength = sizeof(${value});
// if(broadcastValueLength==4) printf("broadcast(%s,%ld)","${opt}",${value});
// else printf("broadcast(%s,%d)","${opt}",${value});`
        return code;
    }
    
    /* 延时 -------------------------------------------------- */
    Blockly.Arduino['motion_arduino_delay_ms'] = function (block) {
        var time = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
        var code = `delay(${time});\n`;
        return code;
    }
    Blockly.Arduino['motion_arduino_delay_us'] = function (block) {
        var time = Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
        var code = `delayMicroseconds(${time});\n`;
        return code;
    }

    /* 系统运行时间 -------------------------------------------------- */
    Blockly.Arduino['motion_arduino_sys_time'] = function (block) {
        var type = block.getFieldValue('TYPE');
        var code = '';
        if (type === 'ms') {
            code = 'millis()';
        } else {
            code = 'micros()';
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_seeed_read_gesture'] = function (block) {
        Blockly.Arduino.definitions_['include_paj7620'] = '#include <paj7620.h>';
        Blockly.Arduino.setups_['setup_paj7620Init'] = '  paj7620Init();';
        // Blockly.Arduino.setups_['setup_var_gesture'] = 'uint8_t gesture;';
        Blockly.Arduino.define_fun['var_gesture'] = 'uint8_t gesture;';
        Blockly.Arduino.define_fun['getGestureValue'] =
`uint8_t getGestureValue(uint8_t addr)
{
    uint8_t data = 0;
    paj7620ReadReg(addr, 1, &data);
    if(data != 0) return data;
    else return 0;
}`;
        var code = `gesture = getGestureValue(0x43)`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    // 手势识别
    Blockly.Arduino['motion_arduino_seeed_gesture'] = function (block) {
        var opt = block.getFieldValue('OPT');
        var addr = '0x43';
        switch (opt) {
            case 'GES_WAVE_FLAG': addr = '0x44'; break;
            default: addr = '0x43'; break;
        }
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_paj7620'] = '#include <paj7620.h>';
        Blockly.Arduino.setups_['setup_paj7620Init'] = '  paj7620Init();';
        Blockly.Arduino.define_fun['gesture'] =
            `uint8_t getGestureValue(uint8_t addr,uint8_t opt)\n{\nuint8_t data = 0;\nwhile(1){\npaj7620ReadReg(addr, 1, &data);\nif(data != 0) return data == opt;\n}\n}`;
        var code = `getGestureValue(${addr},${opt})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    // 语音识别
    Blockly.Arduino['motion_arduino_seeed_speech_recognizer'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var opt = block.getFieldValue('OPT');
        var pins = ['2', '3'];
        switch (pin) {
            case '2': pins = ['2', '3']; break;
            case '3': pins = ['3', '4']; break;
            case '4': pins = ['4', '5']; break;
            case '5': pins = ['5', '6']; break;
            case '6': pins = ['6', '7']; break;
            case '7': pins = ['7', '8']; break;
            case '8': pins = ['8', '9']; break;
        }
        Blockly.Arduino.definitions_['include_softwareserial'] = '#include <SoftwareSerial.h>';
        Blockly.Arduino.definitions_[`var_softSerial_${pin}`] = `SoftwareSerial softSerial_${pin}(${pins[0]},${pins[1]});`;
        Blockly.Arduino.definitions_[`var_func_softSerial_${pin}`] =
            `uint8_t softSerialRead_${pin}()\n` +
            '{\n' +
            `    if (softSerial_${pin}.available())\n` +
            `        return softSerial_${pin}.read();\n` +
            '    else\n' +
            '        return -1;\n' +
            '}\n';
        Blockly.Arduino.setups_[`setup_softserial_begin_${pin}`] = `  softSerial_${pin}.begin(9600);`;
        Blockly.Arduino.setups_[`setup_softserial_listen_${pin}`] = `  softSerial_${pin}.listen();`;
        return [`softSerialRead_${pin}() == ${parseInt(opt) + 1}`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_seeed_speech_recognizer_getvalue'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var opt = block.getFieldValue('OPT');
        var pins = ['2', '3'];
        switch (pin) {
            case '2': pins = ['2', '3']; break;
            case '3': pins = ['3', '4']; break;
            case '4': pins = ['4', '5']; break;
            case '5': pins = ['5', '6']; break;
            case '6': pins = ['6', '7']; break;
            case '7': pins = ['7', '8']; break;
            case '8': pins = ['8', '9']; break;
        }
        Blockly.Arduino.definitions_['include_softwareserial'] = '#include <SoftwareSerial.h>';
        Blockly.Arduino.definitions_[`var_softSerial_${pin}`] = `SoftwareSerial softSerial_${pin}(${pins[0]},${pins[1]});`;
        Blockly.Arduino.definitions_[`var_func_softSerial_${pin}`] =
            `uint8_t softSerialRead_${pin}()\n` +
            '{\n' +
            `    if (softSerial_${pin}.available())\n` +
            `        return softSerial_${pin}.read();\n` +
            '    else\n' +
            '        return -1;\n' +
            '}\n';
        Blockly.Arduino.setups_[`setup_softserial_begin_${pin}`] = `  softSerial_${pin}.begin(9600);`;
        Blockly.Arduino.setups_[`setup_softserial_listen_${pin}`] = `  softSerial_${pin}.listen();`;
        return [`softSerialRead_${pin}()`, Blockly.Arduino.ORDER_ATOMIC];
    }

    //超声波
    Blockly.Arduino['motion_arduino_seeed_ult'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.definitions_['include_ultrasonic'] = '#include <Ultrasonic.h>';
        Blockly.Arduino.definitions_[`var_ult${pin}`] = `Ultrasonic ult${pin}(${pin});`;
        var code = `(long)ult${pin}.MeasureInCentimeters()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    //mini 电机
    Blockly.Arduino['motion_arduino_grove_serial_mini_motor_driver'] = function (block) {
        var ch = block.getFieldValue('CH');
        var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
        Blockly.Arduino.definitions_['include_SparkFunMiniMoto'] = '#include <SparkFunMiniMoto.h>';
        Blockly.Arduino.definitions_['var_motor0'] = 'MiniMoto motor_CH1(0xC4);';
        Blockly.Arduino.definitions_['var_motor1'] = 'MiniMoto motor_CH2(0xC0);';
        Blockly.Arduino.setups_['setup_mini_motor_driver'] = '  motor_CH1.stop();\n  motor_CH2.stop();';
        var code = `motor_${ch}.drive(${speed});\n`
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_serial_mini_motor_driver_stop'] = function (block) {
        var ch = block.getFieldValue('CH');
        Blockly.Arduino.definitions_['include_SparkFunMiniMoto'] = '#include <SparkFunMiniMoto.h>';
        Blockly.Arduino.definitions_['var_motor0'] = 'MiniMoto motor_CH1(0xC4);';
        Blockly.Arduino.definitions_['var_motor1'] = 'MiniMoto motor_CH2(0xC0);';
        Blockly.Arduino.setups_['setup_mini_motor_driver'] = '  motor_CH1.stop();\n  motor_CH2.stop();';
        var code = `motor_${ch}.stop();`
        return code;
    }



    //全彩lcd背光
    Blockly.Arduino['motion_arduino_grove_serial_lcd_print'] = function (block) {
        var str1 = Blockly.Arduino.valueToCode(block, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC) || 'String(\\"\\")'
        var str2 = Blockly.Arduino.valueToCode(block, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || 'String(\\"\\")'
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_lcd'] = '#include <rgb_lcd.h>';
        Blockly.Arduino.definitions_['var_lcd_rgb'] = 'rgb_lcd lcd;';
        Blockly.Arduino.setups_['setup_lcd_rgb'] = '  lcd.begin(16, 2);';
        var code = 'lcd.setCursor(0, 0);\n'
        code += 'lcd.print(' + str1 + ');\n';
        code += 'lcd.setCursor(0, 1);\n';
        code += 'lcd.print(' + str2 + ');\n';
        return code;
    }


    Blockly.Arduino['motion_arduino_grove_serial_lcd_print2'] = function (block) {
        var str = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\\"\\")'
        var row = Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) || '1';
        var column = Blockly.Arduino.valueToCode(block, 'COLUMN', Blockly.Arduino.ORDER_ATOMIC) || '1';
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_lcd'] = '#include <rgb_lcd.h>';
        Blockly.Arduino.definitions_['var_lcd_rgb'] = 'rgb_lcd lcd;';
        Blockly.Arduino.setups_['setup_lcd_rgb'] = '  lcd.begin(16, 2);';
        var code = 'lcd.setCursor(' + column + '-1, ' + row + '-1);\n'
        code += 'lcd.print(' + str + ');\n';
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_serial_lcd_setrgb'] = function (block) {
        var r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_ATOMIC) || '255'
        var g = Blockly.Arduino.valueToCode(block, 'G', Blockly.Arduino.ORDER_ATOMIC) || '255'
        var b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_ATOMIC) || '255'
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_lcd'] = '#include <rgb_lcd.h>';
        Blockly.Arduino.definitions_['var_lcd_rgb'] = 'rgb_lcd lcd;';
        Blockly.Arduino.setups_['setup_lcd_rgb'] = '  lcd.begin(16, 2);';
        var code = 'lcd.setRGB(' + r + ', ' + g + ', ' + b + ');\n'
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_serial_lcd_power'] = function (block) {
        var dropdownStat = block.getFieldValue('STAT');
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_lcd'] = '#include <rgb_lcd.h>';
        Blockly.Arduino.definitions_['var_lcd_rgb'] = 'rgb_lcd lcd;';
        Blockly.Arduino.setups_['setup_lcd_rgb'] = '  lcd.begin(16, 2);';
        var code = 'lcd.' + dropdownStat + '();\n'
        return code;
    }

    Blockly.Arduino['motion_arduino_seeed_rgb_led'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var num = block.getFieldValue('NUM');
        // var num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_NONE);
        var color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
        var r = `0x${color[2]}${color[3]}`;
        var g = `0x${color[4]}${color[5]}`;
        var b = `0x${color[6]}${color[7]}`;
        var pins = ['2', '3'];
        switch (pin) {
            case '2': pins = ['2', '3']; break;
            case '3': pins = ['3', '4']; break;
            case '4': pins = ['4', '5']; break;
            case '5': pins = ['5', '6']; break;
            case '6': pins = ['6', '7']; break;
            case '7': pins = ['7', '8']; break;
            case '8': pins = ['8', '9']; break;
            case '9': pins = ['9', '10']; break;
            case '10': pins = ['10', '11']; break;
            case '11': pins = ['11', '12']; break;
            case '12': pins = ['12', '13']; break;
            case '13': pins = ['13', '14']; break;
            case '14': pins = ['14', '15']; break;
            case '15': pins = ['15', '16']; break;
            case '46': pins = ['46', '47']; break;
            case '47': pins = ['47', '48']; break;
            case '48': pins = ['48', '49']; break;
            case '49': pins = ['49', '50']; break;
        }
        Blockly.Arduino.definitions_['include_chainable_led'] = '#include <ChainableLED.h>';
        Blockly.Arduino.definitions_[`var_${pin}`] = `ChainableLED led${pin}(${pins[0]}, ${pins[1]}, 10);`;
        var code = `led${pin}.setColorRGB(${num},${r},${g},${b});\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_seeed_rgb_led1'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var num = block.getFieldValue('NUM');
        // var num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_NONE);

        var r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_NONE);
        var g = Blockly.Arduino.valueToCode(block, 'G', Blockly.Arduino.ORDER_NONE);
        var b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_NONE);

        var pins = ['2', '3'];
        switch (pin) {
            case '2': pins = ['2', '3']; break;
            case '3': pins = ['3', '4']; break;
            case '4': pins = ['4', '5']; break;
            case '5': pins = ['5', '6']; break;
            case '6': pins = ['6', '7']; break;
            case '7': pins = ['7', '8']; break;
            case '8': pins = ['8', '9']; break;
            case '9': pins = ['9', '10']; break;
            case '10': pins = ['10', '11']; break;
            case '11': pins = ['11', '12']; break;
            case '12': pins = ['12', '13']; break;
            case '13': pins = ['13', '14']; break;
            case '14': pins = ['14', '15']; break;
            case '15': pins = ['15', '16']; break;
            case '46': pins = ['46', '47']; break;
            case '47': pins = ['47', '48']; break;
            case '48': pins = ['48', '49']; break;
            case '49': pins = ['49', '50']; break;
        }
        Blockly.Arduino.definitions_['include_chainable_led'] = '#include <ChainableLED.h>';
        Blockly.Arduino.definitions_[`var_${pin}`] = `ChainableLED led${pin}(${pins[0]}, ${pins[1]}, 10);`;
        var code = `led${pin}.setColorRGB(${num},${r},${g},${b});\n`;
        return code;
    }

    //WS2813 Mini 彩灯/灯条
    Blockly.Arduino['motion_arduino_seeed_rgb_led_mini'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var num = block.getFieldValue('NUM');

        var r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_NONE);
        var g = Blockly.Arduino.valueToCode(block, 'G', Blockly.Arduino.ORDER_NONE);
        var b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_NONE);

        Blockly.Arduino.definitions_['include_NeoPixel'] = '#include "Adafruit_NeoPixel.h"';
        Blockly.Arduino.definitions_[`var_NUM_LEDS`] = `#define NUM_LEDS 10`;
        Blockly.Arduino.definitions_[`var_PIN_${pin}`] = `#define PIN_${pin} ${pin}`;
        Blockly.Arduino.definitions_[`var_pixels_${pin}`] = `Adafruit_NeoPixel pixels_${pin} = Adafruit_NeoPixel(NUM_LEDS, PIN_${pin}, NEO_GRB + NEO_KHZ800);`;

        Blockly.Arduino.setups_[`setup_neopixel_setBrightness_${pin}`] = `  pixels_${pin}.setBrightness(255);`;
        Blockly.Arduino.setups_[`setup_neopixel_${pin}`] = `  pixels_${pin}.begin();`;
        var code = `pixels_${pin}.setPixelColor(${num-1}, pixels_${pin}.Color(${r},${g},${b}));\n`;
        code += `pixels_${pin}.show();\n`;
        return code;
    }
    
    //环形led
    Blockly.Arduino['motion_arduino_seeed_circular_led'] = function (block) {
        try {
            var pin = block.getFieldValue('PIN');
            var stat = block.getFieldValue('STAT');
            var pins = ['2', '3'];
            switch (pin) {
                case '2': pins = ['2', '3']; break;
                case '3': pins = ['3', '4']; break;
                case '4': pins = ['4', '5']; break;
                case '5': pins = ['5', '6']; break;
                case '6': pins = ['6', '7']; break;
                case '7': pins = ['7', '8']; break;
                case '8': pins = ['8', '9']; break;
            }

            Blockly.Arduino.definitions_['include_circular_led'] = '#include <CircularLED.h>';
            Blockly.Arduino.definitions_['var_circular_led'] = `CircularLED circularLed(${pins[1]}, ${pins[0]});`;
            Blockly.Arduino.define_fun['circular_led'] =
                `void circularLedDisplay(unsigned int data[])\n{\n` +
                `circularLed.CircularLEDWrite(data);\n` +
                `\n}\n`;
            stat = stat.split('|');
            var args = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var x = 0, s; s = stat[x]; x++) {
                args[parseInt(s)] = '0xFF';
            }
            var varName = Blockly.Arduino.variableDB_.getDistinctName('circularLedData', Blockly.Variables.NAME_TYPE);
            var code = `unsigned int ${varName}[24] = {${args.join(',')}};\n`
                + `circularLed.CircularLEDWrite(${varName});\n`;
            return code;
        } catch (e) {
            return '';
        }
    }

    //柱状led
    Blockly.Arduino['motion_arduino_seeed_led_bar'] = function (block) {
        try {
            var pin = block.getFieldValue('PIN');
            var stat = block.getFieldValue('STAT');
            var opt = block.getFieldValue('OPT');
            var pins = ['2', '3'];
            switch (pin) {
                case '2': pins = ['2', '3']; break;
                case '3': pins = ['3', '4']; break;
                case '4': pins = ['4', '5']; break;
                case '5': pins = ['5', '6']; break;
                case '6': pins = ['6', '7']; break;
                case '7': pins = ['7', '8']; break;
                case '8': pins = ['8', '9']; break;
            }
            Blockly.Arduino.definitions_['include_grove_led_bar'] = '#include <Grove_LED_Bar.h>';
            Blockly.Arduino.definitions_['var_grove_led_bar'] = `Grove_LED_Bar groveLedBar(${pins[1]}, ${pins[0]},0);`;
            Blockly.Arduino.setups_['setup_grove_led_bar'] = '  groveLedBar.begin();';
            stat = stat.split('|');
            var code = '';
            for (var x = 0, s; s = stat[x]; x++) {
                code += `groveLedBar.setLed(${parseInt(s) + 1},${opt});\n`;
            }
            return code;
        } catch (e) {
            return '';
        }

    }

    //四位数码管
    Blockly.Arduino['motion_arduino_seeed_4digit_display'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_NONE);
        var pins = ['2', '3'];
        switch (pin) {
            case '2': pins = ['2', '3']; break;
            case '3': pins = ['3', '4']; break;
            case '4': pins = ['4', '5']; break;
            case '5': pins = ['5', '6']; break;
            case '6': pins = ['6', '7']; break;
            case '7': pins = ['7', '8']; break;
            case '8': pins = ['8', '9']; break;
        }

        Blockly.Arduino.definitions_['include_4digit_display'] = '#include <TM1637.h>';
        Blockly.Arduino.definitions_['var_4digit_display'] = `TM1637 tm1637(${pins[0]}, ${pins[1]});`;
        Blockly.Arduino.setups_['setup_4digit_display_init'] = '  tm1637.init();';
        Blockly.Arduino.setups_['setup_4digit_display_set'] = '  tm1637.set(BRIGHT_TYPICAL);';
        Blockly.Arduino.define_fun['4digit_display']
            = 'void showNumber(uint16_t num)\n'
            + '{\n'
            + `tm1637.display(3,num%10);\n`
            + `num = num / 10;\n`
            + `tm1637.display(2,num%10);\n`
            + `num = num / 10;\n`
            + `tm1637.display(1,num%10);\n`
            + `num = num / 10;\n`
            + `tm1637.display(0,num%10);\n`
            + '}\n';
        var code = `showNumber(${num});\n`;
        return code;
    }

    //3轴 1.5g
    Blockly.Arduino['motion_arduino_grove_serial_3ada15'] = function (block) {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_MMA'] = '#include "MMA7660.h"';
        Blockly.Arduino.definitions_['var_MMA'] = 'MMA7660 accelemeter;';
        Blockly.Arduino.setups_['setup_mmaInit'] = '  accelemeter.init();';
        Blockly.Arduino.define_fun['func_get3ada15Value'] =
            'float get3ada15Value(char xyz)\n' +
            '{\n' +
            '  float ax, ay, az;\n' +
            '  accelemeter.getAcceleration(&ax, &ay, &az);\n' +
            '  if(xyz == 0) return ax;\n' +
            '  if(xyz == 1) return ay;\n' +
            '  if(xyz == 2) return az;\n' +
            '}\n';
        var xyz = block.getFieldValue('XYZ');
        return [`get3ada15Value(${xyz})`, Blockly.Arduino.ORDER_ATOMIC];
    }

    //3轴 16g
    Blockly.Arduino['motion_arduino_grove_serial_3ada16'] = function (block) {
        Blockly.Arduino.definitions_['include_Suli'] = '#include <Suli.h>';
        Blockly.Arduino.definitions_['include_grove_serial_3ada'] = '#include <acc_adxl345_Arduino.h>';
        Blockly.Arduino.definitions_['var_grove_serial_3ada'] = `Acc_Adxl345 acc;`;
        Blockly.Arduino.setups_['setup_acc_begin'] = '  acc.begin();';
        Blockly.Arduino.define_fun['func_get3ada16Value'] =
            'float get3ada16Value(char xyz)\n' +
            '{\n' +
            '  float ax, ay, az;\n' +
            '  acc.get(&ax, &ay, &az);\n' +
            '  if(xyz == 0) return ax;\n' +
            '  if(xyz == 1) return ay;\n' +
            '  if(xyz == 2) return az;\n' +
            '}\n';
        var xyz = block.getFieldValue('XYZ');
        var code = `get3ada16Value(${xyz})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    //3轴 LIS3DHTR
    Blockly.Arduino['motion_arduino_grove_serial_3ada_m'] = function (block) {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_LIS'] = '#include "LIS3DHTR.h"';
        Blockly.Arduino.definitions_['var_grove_3ada_LIS'] = `LIS3DHTR<TwoWire> LIS;`;
        Blockly.Arduino.definitions_['var_grove_3ada_Wire'] = `#define WIRE Wire`;

        Blockly.Arduino.setups_['setup_LIS_begin'] = '  LIS.begin(WIRE, 0x19);\n'+
        '  LIS.openTemp();\n'+
        '  delay(100);\n'+
        '  LIS.setOutputDataRate(LIS3DHTR_DATARATE_50HZ);\n'+
        '  LIS.setHighSolution(true);\n';
        
        var xyz = block.getFieldValue('XYZ');
        var code = ''
        if (xyz=='0') {
            code = 'LIS.getAccelerationX()';
        }else if (xyz=='1') {
            code = 'LIS.getAccelerationY()';
        }else if (xyz=='2') {
            code = 'LIS.getAccelerationZ()';
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    //温湿度DHT11
    Blockly.Arduino['motion_arduino_seeed_temperature_humidity'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var th = block.getFieldValue('TH');
        Blockly.Arduino.definitions_['include_DHT'] = '#include "DHT.h"';
        Blockly.Arduino.definitions_['var_DHTTYPE_11'] = '#define DHTTYPE11 DHT11';
        Blockly.Arduino.definitions_[`var_DHTPIN`] = `#define DHTPIN ${pin}`;
        Blockly.Arduino.definitions_[`var_DHT_11`] = `DHT dht11(DHTPIN, DHTTYPE11);`;
        Blockly.Arduino.setups_['setup_dht_11_begin'] = '  dht11.begin();';
        var code = "";
        if (th == '0') {
            code = `dht11.readTemperature()`;
        } else {
            code = `dht11.readHumidity()`;
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    //温湿度DHT20
    Blockly.Arduino['motion_arduino_seeed_temperature_humidity_dht20'] = function (block) {
        var th = block.getFieldValue('TH');
        Blockly.Arduino.definitions_['include_DHT'] = '#include "DHT.h"';
        Blockly.Arduino.definitions_['include_Wire'] = '#include "Wire.h"';
        Blockly.Arduino.definitions_['var_DHTTYPE_20'] = '#define DHTTYPE20 DHT20';
        Blockly.Arduino.definitions_[`var_DHT_20`] = `DHT dht20(DHTTYPE20);`;
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_dht_20_begin'] = '  dht20.begin();';
        var code = "";
        if (th == '0') {
            code = `dht20.readTemperature()`;
        } else {
            code = `dht20.readHumidity()`;
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    
    Blockly.Arduino['motion_arduino_seeed_servo_move'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var value_degree = Blockly.Arduino.valueToCode(block, 'DEGREES', Blockly.Arduino.ORDER_NONE);
        var delay_time = Blockly.Arduino.valueToCode(block, 'DELAY_TIME', Blockly.Arduino.ORDER_NONE) || '0';
        Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>\n';
        Blockly.Arduino.definitions_['var_servo' + pin] = 'Servo servo_' + pin + ';\n';
        Blockly.Arduino.setups_['setup_servo_' + pin] = '  servo_' + pin + '.attach(' + pin + ');\n';
        var code = 'servo_' + pin + '.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
        return code;
    }

    Blockly.Arduino['motion_arduino_seeed_servo_read_degrees'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>\n';
        Blockly.Arduino.definitions_['var_servo' + pin] = 'Servo servo_' + pin + ';\n';
        Blockly.Arduino.setups_['setup_servo_' + pin] = '  servo_' + pin + '.attach(' + pin + ');\n';
        var code = 'servo_' + pin + '.read()';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    Blockly.Arduino['motion_arduino_seeed_speaker'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var note = block.getFieldValue('NOTE');
        var beat = block.getFieldValue('BEAT');
        Blockly.Arduino.definitions_['include_speaker'] = '#include <GroveChSpeaker.h>\n';
        Blockly.Arduino.definitions_[`var_speaker${pin}`] = `GroveChSpeaker groveChSpeaker${pin}(${pin});\n`;
        var code = `groveChSpeaker${pin}.playNote(${note},${beat});\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_buzzer_speaker'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var note = block.getFieldValue('NOTE');
        var beat = block.getFieldValue('BEAT');
        if (beat=='1/2') {
            beat=0.5
        }else if (beat=='1/4') {
            beat=0.25
        }else if (beat=='1/8') {
            beat=0.125
        }
        beat = beat*1000;
        Blockly.Arduino.definitions_['var_buzzer_init'] =
            'void buzzer_tune(int pin, int note ,int duration)\n' +
            '{\n' +
            '    if (note > 0)\n' +
            '    {\n' +
            '       tone(pin, note);\n' +
            '       delay(duration);\n' +
            '       noTone(pin);\n' +
            '    }\n' +
            '    else\n' +
            '    {\n' +
            '       noTone(pin);\n' +
            '    }\n' +
            '}\n';
        var code = `buzzer_tune(${pin}, ${note}, ${beat});\n`;
        return code;
    }

    // 触摸
    Blockly.Arduino['motion_arduino_grove_serial_touch'] = function (block) {
        var ch = block.getFieldValue('CH');
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_touch_sensor'] = '#include <i2c_touch_sensor.h>';
        Blockly.Arduino.definitions_['include_MPR121'] = '#include <MPR121.h>';
        Blockly.Arduino.definitions_[`var_touchsensor`] = `i2ctouchsensor touchsensor;`;
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_touchsensor_init'] = '  touchsensor.initialize();';
        Blockly.Arduino.define_fun['touchsensor'] =
            `uint8_t getTouchSensorValue()\n{\ntouchsensor.getTouchState();\nwhile(1)\n{\ntouchsensor.getTouchState();\nfor (int i=0;i<12;i++) if (touchsensor.touched&(1<<i)) return i;\ndelay(100);\n}\n}`;
        var code = `getTouchSensorValue() == ${ch}`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    //一直等待
    Blockly.Arduino['motion_arduino_keep_wait'] = function (block) {
        var code = `while(1){}\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_break'] = function (block) {
        var code = `break;\n`;
        return code;
    }

    //rgb matrix
    Blockly.Arduino['motion_arduino_grove_serial_rgb_led_matrix_on_point'] = function (block) {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_matrix'] = '#include <grove_two_rgb_led_matrix.h>';
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.definitions_['var_rgb_matrix'] = 'GroveTwoRGBLedMatrixClass rgbMatrix;';

        let data = [];
        for (let i = 0; i < 64; i++) {
            data.push('0xFF');
        }
        Blockly.Arduino.definitions_['var_rgb_matrix_data'] = `char rgbMatrixData[64] = {${data}};`;
        Blockly.Arduino.define_fun['rgbMatrixOnPoint'] =
            `void rgbMatrixOnPoint(uint8_t x,uint8_t y,uint8_t c)\n{\n` +
            `if(x<0||x>7||y<0||y>7) return;\n` +
            `rgbMatrixData[x*8+y] = c;\n` +
            `rgbMatrix.displayFrames(rgbMatrixData,0,1,1);` +
            `}`;

        var color = block.getFieldValue('COLOR');
        var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
        var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_NONE);
        var code = `rgbMatrixOnPoint(${x},${y},${color});\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_serial_rgb_led_matrix_show_text'] = function (block) {
        var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_NONE);
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_matrix'] = '#include <grove_two_rgb_led_matrix.h>';
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.definitions_['var_rgb_matrix'] = 'GroveTwoRGBLedMatrixClass rgbMatrix;';
        var strName = Blockly.Arduino.variableDB_.getDistinctName('rgbMatrixStr', Blockly.Variables.NAME_TYPE);
        var code = `char *${strName}=${text};\n`;
        code += `rgbMatrix.displayString(${strName},${(text.length - 2) * 1000},0,1);\ndelay(${(text.length - 2) * 1000});\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_serial_rgb_led_matrix_show_emoji'] = function (block) {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_matrix'] = '#include <grove_two_rgb_led_matrix.h>';
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.definitions_['var_rgb_matrix'] = 'GroveTwoRGBLedMatrixClass rgbMatrix;';

        let shape = block.getFieldValue('SHAPE');
        let matrix = JSON.parse(shape);
        let _color_matrix = matrix.colors_matrix;
        // 声明矩阵行列
        let _rows = 8, _cols = 8;
        // 声明结果字符串
        let result = [];
        // 遍历颜色矩阵
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

        Blockly.Arduino.definitions_['var_rgb_matrix_shape_data'] = `char rgbMatrixShapeData[64] = {${data}};`;


        Blockly.Arduino.define_fun['var_rgb_matrix_data1'] = 'void setRgbMatrixShapeData(';
        for (let i = 0; i < 64; i++) {
            Blockly.Arduino.define_fun['var_rgb_matrix_data1'] += `char c${i}${i < 63 ? ',' : ''}`;
        }
        Blockly.Arduino.define_fun['var_rgb_matrix_data1'] += ')\n{\n';
        for (let i = 0; i < 64; i++) {
            Blockly.Arduino.define_fun['var_rgb_matrix_data1'] += `rgbMatrixShapeData[${i}]=c${i};\n`;
        }
        Blockly.Arduino.define_fun['var_rgb_matrix_data1'] += '}\n';

        let code = `setRgbMatrixShapeData(${result});\n`;
        code += `rgbMatrix.displayFrames(rgbMatrixShapeData,0,1,1);\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_serial_red_led_matrix_on_point'] = function (block) {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_matrix'] = '#include "Grove_LED_Matrix_Driver_HT16K33.h"';
        Blockly.Arduino.definitions_['var_rgb_matrix'] = 'Matrix_8x8 matrix;';

        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_matrix_init'] = '  matrix.init();';
        Blockly.Arduino.setups_['setup_matrix_setBrightness'] = '  matrix.setBrightness(0);';
        Blockly.Arduino.setups_['setup_matrix_setBlinkRate'] = '  matrix.setBlinkRate(BLINK_OFF);';

        var x = Blockly.Arduino.valueToCode(block, 'X', Blockly.Arduino.ORDER_NONE);
        var y = Blockly.Arduino.valueToCode(block, 'Y', Blockly.Arduino.ORDER_NONE);
        let code = `matrix.setDisplayOrientation(DISPLAY_ROTATE_270);\n`;
        code += `matrix.writePixel(${x},${y});\n`;
        code += `matrix.display();\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_serial_red_led_matrix_show_text'] = function (block) {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_matrix'] = '#include "Grove_LED_Matrix_Driver_HT16K33.h"';
        Blockly.Arduino.definitions_['var_rgb_matrix'] = 'Matrix_8x8 matrix;';

        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_matrix_init'] = '  matrix.init();';
        Blockly.Arduino.setups_['setup_matrix_setBrightness'] = '  matrix.setBrightness(0);';
        Blockly.Arduino.setups_['setup_matrix_setBlinkRate'] = '  matrix.setBlinkRate(BLINK_OFF);';

        var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_NONE);
        let code = `matrix.setDisplayOrientation(DISPLAY_ROTATE_0);\n`;
        code += `matrix.writeString(${text}, 1000, ACTION_SCROLLING);\n`;
        code += `matrix.display();\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_serial_red_led_matrix_show_emoji'] = function (block) {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_rgb_matrix'] = '#include "Grove_LED_Matrix_Driver_HT16K33.h"';
        Blockly.Arduino.definitions_['var_rgb_matrix'] = 'Matrix_8x8 matrix;';

        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_matrix_init'] = '  matrix.init();';
        Blockly.Arduino.setups_['setup_matrix_setBrightness'] = '  matrix.setBrightness(0);';
        Blockly.Arduino.setups_['setup_matrix_setBlinkRate'] = '  matrix.setBlinkRate(BLINK_OFF);';

        let shape = block.getFieldValue('SHAPE');
        
        let shapeJson = JSON.parse(shape);
        let matrix = shapeJson.matrix;
        // 声明矩阵行列
        let _rows = 8, _cols = 8;
        // 声明结果字符串
        let result = '0x';
        let str = '';
        // 遍历颜色矩阵
        let number = 0;
        for (let i = 0; i < _rows; i++) {
            for (let j = 0; j < _cols; j++) {
                number++;
                let _color = matrix[i][j];
                if (number == 1) {
                    str = '';
                }
                str += _color;
                if (number==4) {
                    let value = parseInt(str, 2);
                    let _code = value.toString(16)
                    result += _code;
                    number = 0;
                }
            }
        }
        let code = `matrix.setDisplayOrientation(DISPLAY_ROTATE_180);\n`;
        code += `matrix.writeOnePicture(${result});\n`;
        code += `matrix.display();\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_grove_otto_diy_robot1'] = function (block) {
        Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
        Blockly.Arduino.definitions_['include_oscillator'] = '#include <Oscillator.h>';
        Blockly.Arduino.definitions_['include_us'] = '#include <US.h>';
        Blockly.Arduino.definitions_['include_otto'] = '#include <Otto.h>';
        Blockly.Arduino.definitions_['var_otto'] = 'Otto otto;';
        Blockly.Arduino.setups_['setup_otto_init'] = `  otto.init(6,2,7,3,false);`;
        Blockly.Arduino.setups_['setup_otto_sing'] = '  otto.sing(S_connection);';
        Blockly.Arduino.setups_['setup_otto_home'] = '  otto.home();';
        Blockly.Arduino.setups_['setup_otto_delay'] = '  delay(1000);';
        let opt = block.getFieldValue('OPT');
        let steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_NONE) || 1;
        var time = Blockly.Arduino.valueToCode(block, 'T', Blockly.Arduino.ORDER_NONE) || 1;
        let code = '';
        switch (opt) {
            case '0': code = `otto.walk(${steps},${time},FORWARD);\n`; break;
            case '1': code = `otto.walk(${steps},${time},BACKWARD);\n`; break;
            case '2': code = `otto.turn(${steps},${time},LEFT);\n`; break;
            case '3': code = `otto.turn(${steps},${time},RIGHT);\n`; break;
        }
        return code;

    }
    //Rest, Jump, Bend, ShakeLeg, UpDown, Swing, TipToeSwing, Jitter, AscendingTurn, Moonwalker, Crusaito, Flapping；默认值Rest
    Blockly.Arduino['motion_arduino_grove_otto_diy_robot2'] = function (block) {
        Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
        Blockly.Arduino.definitions_['include_oscillator'] = '#include <Oscillator.h>';
        Blockly.Arduino.definitions_['include_us'] = '#include <US.h>';
        Blockly.Arduino.definitions_['include_otto'] = '#include <Otto.h>';
        Blockly.Arduino.definitions_['var_otto'] = 'Otto otto;';
        Blockly.Arduino.setups_['setup_otto_init'] = `  otto.init(6,2,7,3,false);`;
        Blockly.Arduino.setups_['setup_otto_sing'] = '  otto.sing(S_connection);';
        Blockly.Arduino.setups_['setup_otto_home'] = '  otto.home();';
        Blockly.Arduino.setups_['setup_otto_delay'] = '  delay(1000);';
        let opt = block.getFieldValue('OPT');
        let dir = block.getFieldValue('DIR');
        var steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_NONE) || 1;
        var time = Blockly.Arduino.valueToCode(block, 'T', Blockly.Arduino.ORDER_NONE) || 1;
        var dirId = 'LEFT';
        switch (dir) {
            case '0': dirId = 'RIGHT'; break;
            case '1': dirId = 'LEFT'; break;
        }
        let code = '';
        switch (opt) {
            case 'Rest':
                code = `otto.home();`;
                break;
            case 'Jump':
                code = `otto.jump(${steps},${time});`;
                break;
            case 'Bend':
                code = `otto.bend(${steps},${time},${dirId});`;
                break;
            case 'ShakeLeg':
                code = `otto.shakeLeg(${steps},${time},${dirId});`;
                break;
            case 'UpDown':
                code = `otto.updown(${steps},${time},22);`;
                break;
            case 'Swing':
                code = `otto.swing(${steps},${time},22);`;
                break;
            case 'TipToeSwing':
                code = `otto.tiptoeSwing(${steps},${time},22);`;
                break;
            case 'Jitter':
                code = `otto.jitter(${steps},${time},22);`;
                break;
            case 'AscendingTurn':
                code = `otto.ascendingTurn(${steps},${time},22);`;
                break;
            case 'Moonwalker':
                code = `otto.moonwalker(${steps},${time},22,${dirId});`;
                break;
            case 'Crusaito':
                code = `otto.crusaito(${steps},${time},22,${dirId});`;
                break;
            case 'Flapping':
                switch (dir) {
                    case '0': dirId = 'FORWARD'; break;
                    case '1': dirId = 'BACKWARD'; break;
                }
                code = `otto.flapping(${steps},${time},22,${dirId});`;
                break;
        }
        code += '\n';
        return code;
    }


    //小车
    Blockly.Arduino['motion_arduino_shield_bot1'] = function (block) {
        Blockly.Arduino.definitions_['include_shieldbot'] = '#include <Shieldbot.h>';
        Blockly.Arduino.definitions_['var_shieldbot'] = 'Shieldbot shieldbot = Shieldbot();';
        Blockly.Arduino.setups_['setup_shieldbot'] = `  shieldbot.setMaxSpeed(255,255);`;
        let v = block.getFieldValue('V');
        let dir = block.getFieldValue('DIR');
        switch (dir) {
            case 'forward': dir = 'CC_DIR_FORWARD'; break;
            case 'back': dir = 'CC_DIR_BACK'; break;
            case 'left': dir = 'CC_DIR_LEFT'; break;
            case 'right': dir = 'CC_DIR_RIGHT'; break;
            case 'stop': dir = 'CC_DIR_STOP'; break;
        }
        switch (v) {
            case 'low': v = 'CC_V_LOW'; break;
            case 'middle': v = 'CC_V_MIDDLE'; break;
            case 'high': v = 'CC_V_HIGH'; break;
        }
        var code = `shieldbot.run(${dir},${v});\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_shield_bot2'] = function (block) {
        Blockly.Arduino.definitions_['include_shieldbot'] = '#include <Shieldbot.h>';
        Blockly.Arduino.definitions_['var_shieldbot'] = 'Shieldbot shieldbot = Shieldbot();';
        Blockly.Arduino.setups_['setup_shieldbot'] = `  shieldbot.setMaxSpeed(255,255);`;
        let position = block.getFieldValue('POSITION');
        switch (position) {
            case 'middle': position = 'CC_POSITION_MIDDLE'; break;
            case 'left': position = 'CC_POSITION_LEFT'; break;
            case 'most-left': position = 'CC_POSITION_MOST_LEFT'; break;
            case 'right': position = 'CC_POSITION_RIGHT'; break;
            case 'most-right': position = 'CC_POSITION_MOST_RIGHT'; break;
            case 'lose': position = 'CC_POSITION_LOSE'; break;
        }
        var code = `shieldbot.getPosition(${position})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    Blockly.Arduino['motion_arduino_color_read_sensor'] = function (block) {
        Blockly.Arduino.definitions_['include_Adafruit_TCS34725'] = '#include <Adafruit_TCS34725.h>';
        Blockly.Arduino.definitions_['var_CC_COLOR_RED'] = '#define CC_COLOR_RED 1';
        Blockly.Arduino.definitions_['var_CC_COLOR_GREEN'] = '#define CC_COLOR_GREEN 2';
        Blockly.Arduino.definitions_['var_CC_COLOR_BLUE'] = '#define CC_COLOR_BLUE 3';
        Blockly.Arduino.definitions_['var_CC_COLOR_BLACK'] = '#define CC_COLOR_BLACK 4';
        Blockly.Arduino.definitions_['var_CC_COLOR_OTHER'] = '#define CC_COLOR_OTHER 5';
        Blockly.Arduino.definitions_['var_CC_COLOR_WHITE'] = '#define CC_COLOR_WHITE 6';
        Blockly.Arduino.definitions_['var_Adafruit_TCS34725'] = 'Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);';
        Blockly.Arduino.setups_['setup_var_color'] = '  uint8_t color;';
        Blockly.Arduino.setups_['setup_Adafruit_TCS34725'] = `  tcs.begin();`;
        Blockly.Arduino.definitions_['var_color'] = `uint8_t color;`;
        Blockly.Arduino.define_fun['isColor'] =
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
        var code = `color = isColor()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino['motion_arduino_color_sensor'] = function (block) {
        var color = block.getFieldValue('COLOR');
        // Blockly.Arduino.definitions_['include_Adafruit_TCS34725'] = '#include <Adafruit_TCS34725.h>';
        // Blockly.Arduino.definitions_['var_Adafruit_TCS34725'] = 'Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);';
        // Blockly.Arduino.setups_['setup_Adafruit_TCS34725'] = `tcs.begin();`;
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    const webServerInit = function (ssid, password) {
        Blockly.Arduino.definitions_['include_webserver'] =
            '#include <SD.h>\n' +
            '#include "WiFiEsp.h"\n' +
            '#define HTML "index.htm"\n' +
            '#define REQ_BUF_SZ 20\n' +
            '';
        Blockly.Arduino.definitions_['var_webserver'] =
            'struct Note\n' +
            '{\n' +
            '    float value;\n' +
            '    char *name;\n' +
            '    char *img;\n' +
            '};\n' +
            'WiFiEspServer server(80);\n' +
            'File webFile;\n' +
            `char ssid[] = ${ssid};\n` +
            `char pass[] = ${password};\n` +
            // 'char ssid[] = "ArduinoWebServer";\n' +
            // 'char pass[] = "12345678";\n' +
            'int status = WL_IDLE_STATUS;\n' +
            'byte tBuf[1000];\n' +
            'size_t bufSz;\n' +
            'Note note[10];\n' +
            'char HTTP_req[REQ_BUF_SZ] = {0};\n' +
            'char req_index = 0;\n' +
            '';
        Blockly.Arduino.setups_['setup_serial_begin'] = '  Serial.begin(115200);\n';
        Blockly.Arduino.setups_['setup_webserver'] =
            '  Serial1.begin(115200);\n' +
            '    Serial1.println("AT+UART=9600,8,1,0,0");\n' +
            '    delay(100);\n' +
            '    Serial1.begin(9600 ); //初始化用于wifi数据传输的串口\n' +
            '    for (int i = 0; i < 10; i++)\n' +
            '    {\n' +
            '        note[i].value = -200;\n' +
            '        note[i].name = "";\n' +
            '        note[i].img = "";\n' +
            '    }\n' +
            '    if (!SD.begin(53))\n' +
            '    {\n' +
            '        Serial.println("ERROR - SD card initialization failed!");\n' +
            '        return;\n' +
            '    }\n' +
            '    Serial.println("SUCCESS - SD card initialized.");\n' +
            '    if (!SD.exists(HTML))\n' +
            '    {\n' +
            '        Serial.println("ERROR - Can\'t find index.htm file!");\n' +
            '        return;\n' +
            '    }\n' +
            '    Serial.println("SUCCESS - Found index.htm file.");\n' +
            '    WiFi.init(&Serial1);\n' +
            '    if (WiFi.status() == WL_NO_SHIELD)\n' +
            '    {\n' +
            '        Serial.println("WiFi shield not present");\n' +
            '        while (true);\n' +
            '    }\n' +
            '    Serial.print("Attempting to start AP ");\n' +
            '    Serial.println(ssid);\n' +
            '    IPAddress localIp(192, 168, 1, 1);\n' +
            '    WiFi.configAP(localIp);\n' +
            '    status = WiFi.beginAP(ssid, 10, pass, ENC_TYPE_WPA2_PSK);\n' +
            '    Serial.println("Access point started");\n' +
            '    server.begin();\n' +
            '    Serial.println("Server started");\n';
        Blockly.Arduino.define_fun['webserver'] =
            'void setNote(uint8_t idx, float value, char *name, char *img)\n' +
            '{\n' +
            '    note[idx].value = value;\n' +
            '    note[idx].name = name;\n' +
            '    note[idx].img = img;\n' +
            '}\n' +


            'void webStartListening()\n' +
            '{\n' +
            '    WiFiEspClient client = server.available();\n' +
            '    if (client)\n' +
            '    {\n' +
            '        boolean currentLineIsBlank = true;\n' +
            '        while (client.connected())\n' +
            '        {\n' +
            '            if (client.available())\n' +
            '            {\n' +
            '                char c = client.read();\n' +
            '                if (req_index < (REQ_BUF_SZ - 1))\n' +
            '                {\n' +
            '                    HTTP_req[req_index] = c;\n' +
            '                    req_index++;\n' +
            '                }\n' +
            `                if (c == '\\n' && currentLineIsBlank)\n` +
            '                {\n' +
            '                    boolean bContainHome = StrContains(HTTP_req, "GET /");\n' +
            '                    boolean bContainGetData = StrContains(HTTP_req, "GET /get_data");\n' +
            '                    if (bContainHome && !bContainGetData)\n' +
            '                    {\n' +
            '                        client.println("HTTP/1.1 200 OK");\n' +
            '                        client.println("Content-Type: text/html");\n' +
            '                        client.println("Connnection: close");\n' +
            '                        client.println();\n' +
            '                        webFile = SD.open(HTML);\n' +
            '                        if (webFile)\n' +
            '                        {\n' +
            '                            while (webFile.available())\n' +
            '                            {\n' +
            '                                bufSz = webFile.read(tBuf, 1000);\n' +
            '                                client.write((byte *)tBuf, bufSz);\n' +
            '                            }\n' +
            '                        }\n' +
            '                    }\n' +

            '                    if (bContainGetData)\n' +
            '                    {\n' +
            '                        client.println("HTTP/1.1 200 OK");\n' +
            '                        client.println();\n' +
            '                        sendData(client);\n' +
            '                    }\n' +
            '                    req_index = 0;\n' +
            '                    StrClear(HTTP_req, REQ_BUF_SZ);\n' +
            '                    break;\n' +
            '                }\n' +
            `                if (c == '\\n') currentLineIsBlank = true;\n` +
            `                else if (c != '\\r') currentLineIsBlank = false;\n` +
            '            }\n' +
            '        }\n' +
            '        client.stop();\n' +
            '    }\n' +
            '}\n' +

            'void sendData(WiFiEspClient client)\n' +
            '{\n' +
            '    String stringStart = String("[");\n' +
            '    String stringEnd = String("]");\n' +
            '    String stringzhong = String("}");\n' +
            '    String stringAll_buffer3;\n' +
            '    boolean isTop = true;\n' +
            '    for (int i = 1; i < 9; i++)\n' +
            '    {\n' +
            '        if (note[i].value > -200)\n' +
            '        {\n' +
            '            if (isTop)\n' +
            '            {\n' +
            '               stringAll_buffer3 += stringStart+(String("{")+String("\\"idx\\":")+String(i)+String(",")+String("\\"img\\":\\"")+String(note[i].img)+String("\\",")+String("\\"value\\":")+(note[i].value)+String(",")+String("\\"name\\":\\"")+String(note[i].name)+String("\\"")+stringzhong);\n' +
            '               isTop = false;\n' +
            '            }\n' +
            '             else\n' +
            '            {\n' +
            '               stringAll_buffer3 += (String(",{")+String("\\"idx\\":")+String(i)+String(",")+String("\\"img\\":\\"")+String(note[i].img)+String("\\",")+String("\\"value\\":")+(note[i].value)+String(",")+String("\\"name\\":\\"")+String(note[i].name)+String("\\"")+stringzhong);\n' +
            '            }\n' +
            '         }\n' +
            '     }\n' +
            '     stringAll_buffer3 += stringEnd;\n' +
            '     int len = client.print(stringAll_buffer3);\n' +
            '     stringAll_buffer3 = "";\n' +
            '}\n' +

            'void StrClear(char *str, char length)\n' +
            '{\n' +
            '    for (int i = 0; i < length; i++)\n' +
            '    {\n' +
            '        str[i] = 0;\n' +
            '    }\n' +
            '}\n' +


            'char StrContains(char *str, char *sfind)\n' +
            '{\n' +
            '    char found = 0;\n' +
            '    char index = 0;\n' +
            '    char len;\n' +
            '    len = strlen(str);\n' +
            '    if (strlen(sfind) > len)\n' +
            '    {\n' +
            '        return 0;\n' +
            '    }\n' +
            '    while (index < len)\n' +
            '    {\n' +
            '        if (str[index] == sfind[found])\n' +
            '        {\n' +
            '            found++;\n' +
            '            if (strlen(sfind) == found)\n' +
            '            {\n' +
            '                return 1;\n' +
            '            }\n' +
            '        }\n' +
            '        else\n' +
            '        {\n' +
            '            found = 0;\n' +
            '        }\n' +
            '        index++;\n' +
            '    }\n' +
            '    return 0;\n' +
            '}\n' +
            '';

    }

    Blockly.Arduino['motion_arduino_webserver_init'] = function (block) {
        var ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_NONE) || "";
        var password = Blockly.Arduino.valueToCode(block, 'PWD', Blockly.Arduino.ORDER_NONE) || "";
        webServerInit(ssid, password);
        return '';
    }

    Blockly.Arduino['motion_arduino_webserver_show'] = function (block) {
        var no = block.getFieldValue('NO');
        var img = block.getFieldValue('IMG');
        var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_NONE);
        var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);
        Blockly.Arduino.loopsEnd_['webListening'] = 'webStartListening();';
        var code = `setNote(${no},${value},${name},"${img}");\n`
        return code;
    }


    Blockly.Arduino['motion_arduino_seeed_voltage'] = Blockly.Arduino['motion_arduino_analog_input'];
    Blockly.Arduino['motion_arduino_seeed_water_analog'] = Blockly.Arduino['motion_arduino_analog_input'];
    Blockly.Arduino['motion_arduino_seeed_quality'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.Arduino.setups_['setup_input_' + pin] = `  airqualitysensor.init(${pin});`;

        Blockly.Arduino.definitions_['include_quality'] = '#include "AirQuality.h"';
        Blockly.Arduino.definitions_['var_quality'] = `AirQuality airqualitysensor;`;

        Blockly.Arduino.define_fun['quality'] =
            'ISR(TIMER2_OVF_vect){\n' +
            '    if(airqualitysensor.counter==122){\n' +
            '        airqualitysensor.last_vol=airqualitysensor.first_vol;\n' +
            '        airqualitysensor.first_vol=analogRead(A0);\n' +
            '        airqualitysensor.counter=0;\n' +
            '        airqualitysensor.timer_index=1;\n' +
            '        PORTB=PORTB^0x20;\n}\n' +
            '    else{\n' +
            '        airqualitysensor.counter++;\n' +
            '    }\n' +
            '}\n' +

            'int getAirQualityValue(){\n' +
            '    int current_quality=airqualitysensor.slope();\n' +
            '    while (current_quality >= 0)\n' +
            '        return current_quality;\n' +
            '}\n' +
            '';

        var code = 'getAirQualityValue()';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_seeed_vibration'] = Blockly.Arduino['motion_arduino_figure_input'];

    Blockly.Arduino['motion_arduino_seeed_humidifier'] = Blockly.Arduino['motion_arduino_figure_output'];
    Blockly.Arduino['motion_arduino_seeed_led_analog'] = Blockly.Arduino['motion_arduino_analog_output'];


    const visionDefine = function () {
        Blockly.Arduino.definitions_['var_vision_sensor'] =
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

        Blockly.Arduino.define_fun['vision_sensor_i2c_read8'] =
            'int i2c_read8(uint8_t reg)\n' +
            '{\n' +
            '    Wire.beginTransmission(MU_ADDRESS);\n' +
            '    Wire.write(reg);\n' +
            '    Wire.endTransmission();\n' +
            '    Wire.requestFrom(MU_ADDRESS, 1);\n' +
            '    return Wire.read();\n' +
            '}\n';
        Blockly.Arduino.define_fun['vision_sensor_i2c_write8'] =
            'void i2c_write8(const uint8_t reg, const uint8_t value)\n' +
            '{\n' +
            '    Wire.beginTransmission(MU_ADDRESS);\n' +
            '    Wire.write(reg);\n' +
            '    Wire.write(value);\n' +
            '    Wire.endTransmission();\n' +
            '}\n';

        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_vision_sensor'] =
            '  delay(500);\n' +
            '  i2c_write8(REG_VISION_CONF1, 0x21);\n' +
            '  delay(1000);\n';
    }

        //图像交通标示卡片手势检测
    Blockly.Arduino['motion_arduino_traffic_read_sensor'] = function (block) {
        Blockly.Arduino.setups_['setup_Adafruit_WIRE34725'] = '  Wire.begin();';
        visionDefine();
        Blockly.Arduino.setups_['setup_card'] = '  uint8_t card;';
        Blockly.Arduino.define_fun['var_card'] = 'uint8_t card;';
        Blockly.Arduino.define_fun['isCard'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    //图像数字卡片手势检测
    Blockly.Arduino['motion_arduino_number_read_sensor'] = function (block) {
        Blockly.Arduino.setups_['setup_Adafruit_WIRE34725'] = '  Wire.begin();';
        visionDefine();
        Blockly.Arduino.setups_['setup_card'] = '  uint8_t card;';
        Blockly.Arduino.define_fun['var_card'] = 'uint8_t card;';
        Blockly.Arduino.define_fun['isCard'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    //图像图形卡片手势检测
    Blockly.Arduino['motion_arduino_symbol_read_sensor'] = function (block) {
        Blockly.Arduino.setups_['setup_Adafruit_WIRE34725'] = '  Wire.begin();';
        visionDefine();
        Blockly.Arduino.setups_['setup_card'] = '  uint8_t card;';
        Blockly.Arduino.define_fun['var_card'] = 'uint8_t card;';
        Blockly.Arduino.define_fun['isCard'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    //图像运动手势开启
    Blockly.Arduino['motion_arduino_gesture_read_sensor'] = function (block) {
        Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
        Blockly.Arduino.setups_['setup_Adafruit_WIRE34725'] = '  Wire.begin();';
        visionDefine();
        Blockly.Arduino.setups_['setup_var_gesture'] = '  uint8_t gesture;';
        Blockly.Arduino.define_fun['var_gesture'] = 'uint8_t gesture;';

        Blockly.Arduino.define_fun['getGestureValue'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['motion_arduino_vision_sensor1'] = function (block) {
        visionDefine();
        Blockly.Arduino.define_fun['vision_sensor_isBall'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_vision_sensor1_ext'] = function (block) {
        visionDefine();
        Blockly.Arduino.define_fun['vision_sensor_getBallValue'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_pressure_sensor'] = function (block) {
        Blockly.Arduino.definitions_['include_BMP280'] = '#include "Seeed_BMP280.h"';
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['var_bmp280'] = 'BMP280 bmp280;';
        Blockly.Arduino.setups_['setup_bmp280'] = '  bmp280.init();';
        var opt = block.getFieldValue('OPT');
        var code = '';
        if (opt == '1') {
            code = 'bmp280.getPressure()'
        }
        else if (opt == '2') {
            code = 'bmp280.getTemperature()'
        }
        else if (opt == '3') {
            code = 'bmp280.calcAltitude(bmp280.getPressure())'
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_vision_sensor2'] = function (block) {
        // visionDefine();
        // Blockly.Arduino.define_fun['vision_sensor_isCard'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    Blockly.Arduino['motion_arduino_vision_sensor3'] = function (block) {
        // visionDefine();
        // Blockly.Arduino.define_fun['vision_sensor_isCard'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    Blockly.Arduino['motion_arduino_vision_sensor4'] = function (block) {
        // visionDefine();
        // Blockly.Arduino.define_fun['vision_sensor_isCard'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    // 识别人体
    Blockly.Arduino['motion_arduino_vision_sensor5'] = function (block) {
        visionDefine();
        Blockly.Arduino.define_fun['vision_sensor_isBody'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    // 识别颜色
    Blockly.Arduino['motion_arduino_vision_sensor6'] = function (block) {
        visionDefine();
        Blockly.Arduino.define_fun['vision_sensor_isColor'] =
            'uint8_t isColor(uint8_t color)\n' +
            '{\n' +
            '    i2c_write8(REG_CAMERA_CONF1, 0x30);\n' +
            '    i2c_write8(REG_VISION_ID, VISION_ID_COLOR);\n' +
            '    i2c_write8(REG_PARAM_VALUE1, 50);\n' +
            '    i2c_write8(REG_PARAM_VALUE2, 50);\n' +
            '    if (i2c_read8(RESULT_NUM) > 0)\n' +
            '    {\n' +
            '        return color == i2c_read8(RESULT_DATA5);\n' +
            '    }\n' +
            '    else\n' +
            '    {\n' +
            '        return 0;\n' +
            '    }\n' +
            '}\n';
        var color = block.getFieldValue('COLOR');
        var code = `isColor(${color})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    // 获取颜色值
    Blockly.Arduino['motion_arduino_vision_sensor7'] = function (block) {
        visionDefine();
        Blockly.Arduino.define_fun['vision_sensor_getColor'] =
            'char *toColorHex(uint32_t rgb, char *colorHex)\n' +
            '{\n' +
            '    char hexTable[] = "0123456789ABCDEF";\n' +
            '    uint32_t i = 6, n = 0;\n' +
            `    colorHex[0] = '#';\n` +
            '    while (i > 0)\n' +
            '    {\n' +
            '        n = rgb % 16;\n' +
            '        colorHex[i--] = hexTable[n];\n' +
            '        rgb = (rgb - n) / 16;\n' +
            '    }\n' +
            '    return colorHex;\n' +
            '}\n\n' +
            'char *getColor(char *colorHex)\n' +
            '{\n' +
            '    i2c_write8(REG_CAMERA_CONF1, 0x30);\n' +
            '    i2c_write8(REG_VISION_ID, VISION_ID_COLOR);\n' +
            '    i2c_write8(REG_PARAM_VALUE1, 50);\n' +
            '    i2c_write8(REG_PARAM_VALUE2, 50);\n' +
            '    if (i2c_read8(RESULT_NUM) > 0)\n' +
            '    {\n' +
            '        uint8_t r = i2c_read8(RESULT_DATA1);\n' +
            '        uint8_t g = i2c_read8(RESULT_DATA2);\n' +
            '        uint8_t b = i2c_read8(RESULT_DATA3);\n' +
            '        uint32_t rgb = ((uint32_t)r << 16) | ((uint32_t)g << 8) | ((uint32_t)b << 0);\n' +
            '        return toColorHex(rgb, colorHex);\n' +
            '    }\n' +
            '    else\n' +
            '    {\n' +
            '        colorHex = "#FFFFFF";\n' +
            '        return colorHex;\n' +
            '    }\n' +
            '}\n';
        Blockly.Arduino.definitions_['var_vision_sensor_colorHex'] = 'char colorHex[7];';
        var code = `getColor(colorHex)`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    // 识别手势
    Blockly.Arduino['motion_arduino_vision_sensor10'] = function (block) {
        // visionDefine();
        // Blockly.Arduino.define_fun['vision_sensor_isGesture'] =
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

        // Blockly.Arduino.setups_['setup_isGesture'] = 
        // '  uint8_t  visionId;\n' +
        // '  visionId = i2c_read8(REG_LIGHT_SENSOR);\n' +
        // '  visionId |= LS_GESTURE_ENABLE;\n' +
        // '  i2c_write8(REG_LIGHT_SENSOR, visionId);\n';

        var opt = block.getFieldValue('OPT');
        var code = `gesture == ${opt}`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    // 读取环境光检测
    Blockly.Arduino['motion_arduino_vision_sensor11'] = function (block) {
        visionDefine();
        Blockly.Arduino.define_fun['vision_sensor_isInghtSensor'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    // 读取接近检测
    Blockly.Arduino['motion_arduino_vision_sensor12'] = function (block) {
        visionDefine();
        Blockly.Arduino.define_fun['vision_sensor_isProximity'] =
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
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    

    Blockly.Arduino['motion_arduino_oled1'] = function (block) {
        var id = block.id;
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_oled'] = '#include <SeeedGrayOLED.h>';
        var shape = block.getFieldValue('SHAPE');
        Blockly.Arduino.definitions_[`var_oled_${id}`] = `const unsigned char oledMatrix_${id}[] PROGMEM = {${shape}};`;
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_oled'] = '  SeeedGrayOled.init(SH1107G);';
        var code = `SeeedGrayOled.drawBitmap(oledMatrix_${id},sizeof oledMatrix_${id});\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_oled2'] = function (block) {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_oled'] = '#include <SeeedGrayOLED.h>';
        var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_NONE);
        var row = Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_NONE);
        var col = Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_NONE);
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_oled'] = '  SeeedGrayOled.init(SH1107G);\nSeeedGrayOled.clearDisplay();';
        var code = `SeeedGrayOled.setTextXY(uint8_t(${row}),uint8_t(${col}));\nSeeedGrayOled.putString(${text});\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_oled3'] = function () {
        Blockly.Arduino.definitions_['include_i2c'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_oled'] = '#include <SeeedGrayOLED.h>';
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_oled'] = '  SeeedGrayOled.init(SH1107G);\nSeeedGrayOled.clearDisplay();';
        var code = `SeeedGrayOled.clearDisplay();\n`;
        return code;
    }

    Blockly.Arduino['motion_arduino_oled11'] = function (block) {
        var id = block.id;
        Blockly.Arduino.definitions_['include_arduino'] = '#include <Arduino.h>';
        Blockly.Arduino.definitions_['include_u8x8lib'] = '#include <U8x8lib.h>';
        Blockly.Arduino.definitions_['var_u8x8'] = 'U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(U8X8_PIN_NONE);';
        Blockly.Arduino.definitions_['var_u8x8_tiles1'] = 'uint8_t  U8X8_tiles1[8] = {0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff};';

        Blockly.Arduino.define_fun['u8x8_drawpic'] =
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
            
        Blockly.Arduino.setups_['setup_u8x8'] = '  u8x8.begin();\n  u8x8.setFlipMode(1);\n  u8x8.setFont(u8x8_font_chroma48medium8_r);';
        var shape = block.getFieldValue('SHAPE');
        Blockly.Arduino.definitions_[`var_u8x8_${id}`] = `uint8_t U8X8_tiles_${id}[128] = {${shape}};`;
        return `drawpic(U8X8_tiles_${id});\n`;
    }

    Blockly.Arduino['motion_arduino_oled22'] = function (block) {
        Blockly.Arduino.definitions_['include_arduino'] = '#include <Arduino.h>';
        Blockly.Arduino.definitions_['include_u8x8lib'] = '#include <U8x8lib.h>';
        Blockly.Arduino.definitions_['var_u8x8'] = 'U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(U8X8_PIN_NONE);';
        Blockly.Arduino.setups_['setup_u8x8'] = '  u8x8.begin();\n  u8x8.setFlipMode(1);\n  u8x8.setFont(u8x8_font_chroma48medium8_r);';
        var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_NONE);
        var row = Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_NONE);
        var col = Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_NONE);
        return `u8x8.drawString(uint8_t(${col}-1),uint8_t(${row}-1),${text});\n`;
    }

    Blockly.Arduino['motion_arduino_oled33'] = function () {
        Blockly.Arduino.definitions_['include_arduino'] = '#include <Arduino.h>';
        Blockly.Arduino.definitions_['include_u8x8lib'] = '#include <U8x8lib.h>';
        Blockly.Arduino.definitions_['var_u8x8'] = 'U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(U8X8_PIN_NONE);';
        Blockly.Arduino.setups_['setup_u8x8'] = '  u8x8.begin();\n  u8x8.setFlipMode(1);\n  u8x8.setFont(u8x8_font_chroma48medium8_r);';
        return `u8x8.clear();\n`;
    }

    Blockly.Arduino['motion_arduino_led_strip1'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_NONE);
        var g = Blockly.Arduino.valueToCode(block, 'G', Blockly.Arduino.ORDER_NONE);
        var b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_NONE);
        var no = Blockly.Arduino.valueToCode(block, 'NO', Blockly.Arduino.ORDER_NONE);
        Blockly.Arduino.definitions_['include_led_strip1'] = '#include <Adafruit_NeoPixel.h>';
        Blockly.Arduino.definitions_[`var_led_strip1_${pin}`] = `Adafruit_NeoPixel pixels_${pin} = Adafruit_NeoPixel(250, ${pin}, NEO_GRB + NEO_KHZ800);`;

        Blockly.Arduino.setups_[`setup_led_strip1_${pin}`] = `  pixels_${pin}.setBrightness(255);\n  pixels_${pin}.begin();\n`;

        var code = `pixels_${pin}.setPixelColor(${no}, pixels_${pin}.Color(${r}, ${g}, ${b}));\npixels_${pin}.show();\n`;
        return code;
    }


    Blockly.Arduino['motion_arduino_led_strip2'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var r = Blockly.Arduino.valueToCode(block, 'R', Blockly.Arduino.ORDER_NONE);
        var g = Blockly.Arduino.valueToCode(block, 'G', Blockly.Arduino.ORDER_NONE);
        var b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_NONE);

        Blockly.Arduino.definitions_['include_led_strip1'] = '#include <Adafruit_NeoPixel.h>';
        Blockly.Arduino.definitions_[`var_led_strip1_${pin}`] = `Adafruit_NeoPixel pixels_${pin} = Adafruit_NeoPixel(250, ${pin}, NEO_GRB + NEO_KHZ800);`;

        Blockly.Arduino.setups_[`setup_led_strip1_${pin}`] = `  pixels_${pin}.setBrightness(255);\n  pixels_${pin}.begin();\n`;

        Blockly.Arduino.define_fun['led_strip1_ledStripLightPoint'] =
            'void ledStripLightAll(const Adafruit_NeoPixel &pixels, const uint8_t &r,const uint8_t &g,const uint8_t &b)\n' +
            '{\n' +
            '    for(int i=0;i<250;i++){\n' +
            '        pixels.setPixelColor(i, pixels.Color(r,g,b));\n' +
            '        pixels.show();\n' +
            '    }\n' +
            '}\n' +
            '';
        return `ledStripLightAll(pixels_${pin}, ${r}, ${g}, ${b});\n`;
    }

    Blockly.Arduino['motion_arduino_mark_run'] = function (block) {

        Blockly.Arduino.definitions_['include_Mark'] = '#include "Mark.h"';
        Blockly.Arduino.definitions_['var_CH_mark'] = 'CH_mark mk;';

        Blockly.Arduino.setups_['init_crickit'] = '  if(!mk.begin()){\n    while(1);\n  }';

        var action = block.getFieldValue('DIR');
        var scale = block.getFieldValue('V');
        if (action == '0') {
            return `mk.MotorRun(0, 0, 0);\n`;
        } else {
            return `mk.MotorMotion(${scale}, ${action}, -1);\n`;
        }

    }

    Blockly.Arduino['motion_arduino_mark_motorrun'] = function (block) {

        Blockly.Arduino.definitions_['include_Mark'] = '#include "Mark.h"';
        Blockly.Arduino.definitions_['var_CH_mark'] = 'CH_mark mk;';

        Blockly.Arduino.setups_['init_crickit'] = '  if(!mk.begin()){\n    while(1);\n  }';

        var motor = block.getFieldValue('MOTOR');
        var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';

        if ('1' == motor) {
            return `mk.MotorLeft(${speed}, -1);\n`
        }
        if ('2' == motor) {
            return `mk.MotorRight(${speed}, -1);\n`
        }

        return `mk.MotorRun(0, 0, 0);\n`;
    }


    Blockly.Arduino['motion_arduino_mark_servorun'] = function (block) {

        Blockly.Arduino.definitions_['include_Mark'] = '#include "Mark.h"';
        Blockly.Arduino.definitions_['var_CH_mark'] = 'CH_mark mk;';

        Blockly.Arduino.setups_['init_crickit'] = '  if(!mk.begin()){\n    while(1);\n  }';

        var motor = block.getFieldValue('MOTOR');
        var angle = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC) || 0;

        return `mk.ServoAngle(${motor}, ${angle});\n`;
    }

    Blockly.Arduino['motion_arduino_lotusv_setble'] = function (block) {

        var pins = block.getFieldValue('PIN1');
        var [
            pin1,
            pin2
        ] = pins.split('#');

        Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
        Blockly.Arduino.definitions_[`var_lotusvble_init${pin1}_${pin2}`] = `SoftwareSerial blueToothSerial${pin1}_${pin2}(${pin1}, ${pin2});`;

        var id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_ATOMIC) || 'SeeedBTSlave';
        var pwd = Blockly.Arduino.valueToCode(block, 'PWD', Blockly.Arduino.ORDER_ATOMIC) || '1234';

        id = id.replace(/\"/g, "");
        pwd = pwd.replace(/\"/g, "");

        var initCode = [
            `blueToothSerial${pin1}_${pin2}.begin(9600);`,
            `blueToothSerial${pin1}_${pin2}.print("AT");`,
            'delay(400);',
            `blueToothSerial${pin1}_${pin2}.print("AT+DEFAULT");`,          // Restore all setup value to factory setup
            'delay(2000);',
            `blueToothSerial${pin1}_${pin2}.print("AT+NAME${id}");`,   // set the bluetooth name as "SeeedBTSlave" ,the length of bluetooth name must less than 12 characters.
            'delay(400);',
            `blueToothSerial${pin1}_${pin2}.print("AT+PIN${pwd}");`,             // set the pair code to connect 
            'delay(400);',
            `blueToothSerial${pin1}_${pin2}.print("AT+AUTH1");`,          //
            'delay(400);',
            `blueToothSerial${pin1}_${pin2}.flush();`,
        ]

        return initCode.join('\n') + '\n';
    }

    Blockly.Arduino['motion_arduino_lotusv_getblevalue'] = function (block) {
        var pins = block.getFieldValue('PIN1');
        var [
            pin1,
            pin2
        ] = pins.split('#');
        Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
        Blockly.Arduino.definitions_[`var_lotusvble_init${pin1}_${pin2}`] = `SoftwareSerial blueToothSerial${pin1}_${pin2}(${pin1}, ${pin2});`;
        Blockly.Arduino.definitions_[`var_btValue`] = 'char bt_data[24]={0,};';
        var initValueCode =
            '\n' +
            '    int i=0;\n' +
            `    while (blueToothSerial${pin1}_${pin2}.available())\n` +
            '    {\n' +
            `        bt_data[i++]=blueToothSerial${pin1}_${pin2}.read();\n` +
            '        delay(50);\n' +
            '        if (i>=(23))break;\n' +
            '    }\n' +
            '    bt_data[i]=0;';
        Blockly.Arduino.loopsEnd_['init_btValue'] = initValueCode;
        return ['bt_data', Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_rtc_setdatetime'] = function (block) {
        Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_DS1307'] = '#include <DS1307.h>';
        Blockly.Arduino.definitions_['var_DS1307'] = 'DS1307 clock;';
        var year = Blockly.Arduino.valueToCode(block, 'YEAR', Blockly.Arduino.ORDER_ATOMIC) || '2020';
        var month = Blockly.Arduino.valueToCode(block, 'MONTH', Blockly.Arduino.ORDER_ATOMIC) || '00';
        var day = Blockly.Arduino.valueToCode(block, 'DAY', Blockly.Arduino.ORDER_ATOMIC) || '00';
        var hour = Blockly.Arduino.valueToCode(block, 'HOUR', Blockly.Arduino.ORDER_ATOMIC) || '12';
        var minute = Blockly.Arduino.valueToCode(block, 'MINUTE', Blockly.Arduino.ORDER_ATOMIC) || '00';
        var second = Blockly.Arduino.valueToCode(block, 'SECOND', Blockly.Arduino.ORDER_ATOMIC) || '00';
        var code = [
            'clock.begin();',
            `clock.fillByYMD(${year}, ${month}, ${day});`,
            `clock.fillByHMS(${hour}, ${minute}, ${second});`,
            'clock.setTime();'
        ]
        return code.join('\n') + '\n';
    }

    Blockly.Arduino['motion_arduino_rtc_getdate'] = function (block) {
        Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_DS1307'] = '#include <DS1307.h>';
        Blockly.Arduino.definitions_['var_DS1307'] = 'DS1307 clock;';
        Blockly.Arduino.definitions_['var_getDate'] =
            'String GetYMDTime()\n' +
            '{\n' +
            '  String year, month, day, ymd;\n' +
            '  clock.getTime();\n' +
            '  year = String(clock.year+2000);\n' +
            '  month = String(clock.month);\n' +
            '  day = String(clock.dayOfMonth);\n' +
            '  ymd = year + "/" + month  + "/" + day;\n' +
            '  return ymd;\n' +
            '}\n';
        return ['GetYMDTime()', Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_rtc_gettime'] = function (block) {
        Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_DS1307'] = '#include <DS1307.h>';
        Blockly.Arduino.definitions_['var_DS1307'] = 'DS1307 clock;';
        Blockly.Arduino.definitions_['var_getTime'] =
            'String GetHMMTime()\n' +
            '{\n' +
            '    clock.getTime();\n' +
            '    String hour, minute, second, hmm;\n' +
            '    clock.getTime();\n' +
            '    hour = String(clock.hour);\n' +
            '    minute = String(clock.minute);\n' +
            '    second = String(clock.second);\n' +
            '    hmm = hour + ":" + minute  + ":" + second;\n' +
            '    return hmm;\n' +
            '}\n';
        return ['GetHMMTime()', Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['motion_arduino_infrared_send'] = function (block) {
        Blockly.Arduino.definitions_['include_ir_SendBase'] = '#include <IRLibSendBase.h>';
        Blockly.Arduino.definitions_['include_ir_P01_NEC'] = '#include <IRLib_P01_NEC.h>';
        Blockly.Arduino.definitions_['include_ir_Combo'] = '#include <IRLibCombo.h>';
        Blockly.Arduino.definitions_[`var_IR_SEND_PWM_PIN`] = `#define IR_SEND_PWM_PIN D3`;
        Blockly.Arduino.definitions_[`var_ir_send`] = `IRsend mySender;`;
        let address = Blockly.Arduino.valueToCode(block, 'ADDRESS', Blockly.Arduino.ORDER_NONE) || '';
        address = address.replace(/"/g, '');
        let code = `mySender.send(NEC,${address},0);`;
        return code;
    }

    Blockly.Arduino['motion_arduino_infrared_receive'] = function (block) {
        var pin = block.getFieldValue('PIN') || '2';
        Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>';
        Blockly.Arduino.definitions_['var_IRrecv'] = `IRrecv irrecv(${pin});`;
        Blockly.Arduino.definitions_['var_decode_results'] = 'decode_results results;';
        Blockly.Arduino.setups_['init_IRIn'] = `  irrecv.enableIRIn();`;

        Blockly.Arduino.define_fun['get_ir_value'] =
            'long unsigned int get_ir_value() {\n' +
            '  if (irrecv.decode(&results))\n' +
            '  {\n' +
            '    irrecv.resume();\n' +
            '    return results.value;\n' +
            '  }\n' +
            '  return 0;\n' +
            '}';
        return [`get_ir_value()`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['ottoDiyRobot_menu_direct'] = function (block) {
        var branch = block.getFieldValue('direct');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['ottoDiyRobot_menu_action'] = function (block) {
        var branch = block.getFieldValue('action');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['ottoDiyRobot_menu_directs'] = function (block) {
        var branch = block.getFieldValue('directs');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['ottoDiyRobot_ottoDiyRobot1'] = function (block) {
        Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
        Blockly.Arduino.definitions_['include_oscillator'] = '#include <Oscillator.h>';
        Blockly.Arduino.definitions_['include_us'] = '#include <US.h>';
        Blockly.Arduino.definitions_['include_otto'] = '#include <Otto.h>';
        Blockly.Arduino.definitions_['var_otto'] = 'Otto otto;';
        Blockly.Arduino.setups_['setup_otto_init'] = '  otto.init(6,2,7,3,false);';
        Blockly.Arduino.setups_['setup_otto_sing'] = '  otto.sing(S_connection);';
        Blockly.Arduino.setups_['setup_otto_home'] = '  otto.home();';
        Blockly.Arduino.setups_['setup_otto_delay'] = '  delay(1000);';
        let direct = Blockly.Arduino.valueToCode(block, 'DIRECT', Blockly.Arduino.ORDER_NONE) || '0';
        let steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_NONE) || 1;
        var time = Blockly.Arduino.valueToCode(block, 'TIMES', Blockly.Arduino.ORDER_NONE) || 1;
        let code = '';
        switch (direct) {
            case '0': code = `otto.walk(${steps},${time},FORWARD);\n`; break;
            case '1': code = `otto.walk(${steps},${time},BACKWARD);\n`; break;
            case '2': code = `otto.turn(${steps},${time},LEFT);\n`; break;
            case '3': code = `otto.turn(${steps},${time},RIGHT);\n`; break;
        }
        return code;
    }

    Blockly.Arduino['ottoDiyRobot_ottoDiyRobot2'] = function (block) {
        Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
        Blockly.Arduino.definitions_['include_oscillator'] = '#include <Oscillator.h>';
        Blockly.Arduino.definitions_['include_us'] = '#include <US.h>';
        Blockly.Arduino.definitions_['include_otto'] = '#include <Otto.h>';
        Blockly.Arduino.definitions_['var_otto'] = 'Otto otto;';
        Blockly.Arduino.setups_['setup_otto_init'] = `  otto.init(6,2,7,3,false);`;
        Blockly.Arduino.setups_['setup_otto_sing'] = '  otto.sing(S_connection);';
        Blockly.Arduino.setups_['setup_otto_home'] = '  otto.home();';
        Blockly.Arduino.setups_['setup_otto_delay'] = '  delay(1000);';
        let action = Blockly.Arduino.valueToCode(block, 'ACTION', Blockly.Arduino.ORDER_NONE) || 'Rest';
        let direct = Blockly.Arduino.valueToCode(block, 'DIRECTS', Blockly.Arduino.ORDER_NONE) || '0';
        var steps = Blockly.Arduino.valueToCode(block, 'STEPS', Blockly.Arduino.ORDER_NONE) || 1;
        var time = Blockly.Arduino.valueToCode(block, 'TIMES', Blockly.Arduino.ORDER_NONE) || 1;
        var dirId = 'LEFT';
        switch (direct) {
            case '0': dirId = 'RIGHT'; break;
            case '1': dirId = 'LEFT'; break;
        }
        let code = '';
        switch (action) {
            case 'Rest':
                code = `otto.home();`;
                break;
            case 'Jump':
                code = `otto.jump(${steps},${time});`;
                break;
            case 'Bend':
                code = `otto.bend(${steps},${time},${dirId});`;
                break;
            case 'ShakeLeg':
                code = `otto.shakeLeg(${steps},${time},${dirId});`;
                break;
            case 'UpDown':
                code = `otto.updown(${steps},${time},22);`;
                break;
            case 'Swing':
                code = `otto.swing(${steps},${time},22);`;
                break;
            case 'TipToeSwing':
                code = `otto.tiptoeSwing(${steps},${time},22);`;
                break;
            case 'Jitter':
                code = `otto.jitter(${steps},${time},22);`;
                break;
            case 'AscendingTurn':
                code = `otto.ascendingTurn(${steps},${time},22);`;
                break;
            case 'Moonwalker':
                code = `otto.moonwalker(${steps},${time},22,${dirId});`;
                break;
            case 'Crusaito':
                code = `otto.crusaito(${steps},${time},22,${dirId});`;
                break;
            case 'Flapping':
                switch (direct) {
                    case '0': dirId = 'FORWARD'; break;
                    case '1': dirId = 'BACKWARD'; break;
                }
                code = `otto.flapping(${steps},${time},22,${dirId});`;
                break;
        }
        code += '\n';
        return code;
    }

    Blockly.Arduino['shieldBot_menu_direct'] = function (block) {
        var branch = block.getFieldValue('direct');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['shieldBot_menu_speed'] = function (block) {
        var branch = block.getFieldValue('speed');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['shieldBot_menu_position'] = function (block) {
        var branch = block.getFieldValue('position');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    //小车
    Blockly.Arduino['shieldBot_shieldBot1'] = function (block) {
        Blockly.Arduino.definitions_['include_shieldbot'] = '#include <Shieldbot.h>';
        Blockly.Arduino.definitions_['var_shieldbot'] = 'Shieldbot shieldbot = Shieldbot();';
        Blockly.Arduino.setups_['setup_shieldbot'] = `  shieldbot.setMaxSpeed(255,255);`;

        let direct = Blockly.Arduino.valueToCode(block, 'DIRECT', Blockly.Arduino.ORDER_NONE) || 'forward';
        let speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_NONE) || 'low';

        switch (direct) {
            case 'forward': direct = 'CC_DIR_FORWARD'; break;
            case 'back': direct = 'CC_DIR_BACK'; break;
            case 'left': direct = 'CC_DIR_LEFT'; break;
            case 'right': direct = 'CC_DIR_RIGHT'; break;
            case 'stop': direct = 'CC_DIR_STOP'; break;
        }
        switch (speed) {
            case 'low': speed = 'CC_V_LOW'; break;
            case 'middle': speed = 'CC_V_MIDDLE'; break;
            case 'high': speed = 'CC_V_HIGH'; break;
        }
        var code = `shieldbot.run(${direct},${speed});\n`;
        return code;
    }

    Blockly.Arduino['shieldBot_shieldBot2'] = function (block) {
        Blockly.Arduino.definitions_['include_shieldbot'] = '#include <Shieldbot.h>';
        Blockly.Arduino.definitions_['var_shieldbot'] = 'Shieldbot shieldbot = Shieldbot();';
        Blockly.Arduino.setups_['setup_shieldbot'] = `  shieldbot.setMaxSpeed(255,255);`;
        let position = Blockly.Arduino.valueToCode(block, 'POSITION', Blockly.Arduino.ORDER_NONE) || 'middle';
        
        switch (position) {
            case 'middle': position = 'CC_POSITION_MIDDLE'; break;
            case 'left': position = 'CC_POSITION_LEFT'; break;
            case 'most-left': position = 'CC_POSITION_MOST_LEFT'; break;
            case 'right': position = 'CC_POSITION_RIGHT'; break;
            case 'most-right': position = 'CC_POSITION_MOST_RIGHT'; break;
            case 'lose': position = 'CC_POSITION_LOSE'; break;
        }
        var code = `shieldbot.getPosition(${position})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }


    Blockly.Arduino['mark_menu_direct'] = function (block) {
        var branch = block.getFieldValue('direct');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['mark_menu_speed'] = function (block) {
        var branch = block.getFieldValue('speed');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['mark_menu_motorrunType'] = function (block) {
        var branch = block.getFieldValue('motorrunType');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['mark_menu_servorunType'] = function (block) {
        var branch = block.getFieldValue('servorunType');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };
    
    Blockly.Arduino['mark_run'] = function (block) {
        Blockly.Arduino.definitions_['include_Mark'] = '#include "Mark.h"';
        Blockly.Arduino.definitions_['var_CH_mark'] = 'CH_mark mk;';
        Blockly.Arduino.setups_['init_crickit'] = '  if(!mk.begin()){\n    while(1);\n  }';

        let action = Blockly.Arduino.valueToCode(block, 'DIRECT', Blockly.Arduino.ORDER_NONE) || '1';
        let scale = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_NONE) || '1';

        if (action == '0') {
            return `mk.MotorRun(0, 0, 0);\n`;
        } else {
            return `mk.MotorMotion(${scale}, ${action}, -1);\n`;
        }

    }

    Blockly.Arduino['mark_motorrun'] = function (block) {
        Blockly.Arduino.definitions_['include_Mark'] = '#include "Mark.h"';
        Blockly.Arduino.definitions_['var_CH_mark'] = 'CH_mark mk;';

        Blockly.Arduino.setups_['init_crickit'] = '  if(!mk.begin()){\n    while(1);\n  }';

        let motor = Blockly.Arduino.valueToCode(block, 'MOTOR', Blockly.Arduino.ORDER_NONE) || '1';
        let speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || 1;

        if ('1' == motor) {
            return `mk.MotorLeft(${speed}, -1);\n`
        }
        if ('2' == motor) {
            return `mk.MotorRight(${speed}, -1);\n`
        }

        return `mk.MotorRun(0, 0, 0);\n`;
    }


    Blockly.Arduino['mark_servorun'] = function (block) {
        Blockly.Arduino.definitions_['include_Mark'] = '#include "Mark.h"';
        Blockly.Arduino.definitions_['var_CH_mark'] = 'CH_mark mk;';

        Blockly.Arduino.setups_['init_crickit'] = '  if(!mk.begin()){\n    while(1);\n  }';

        let motor = Blockly.Arduino.valueToCode(block, 'MOTOR', Blockly.Arduino.ORDER_NONE) || '1';
        let speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || 1;

        return `mk.ServoAngle(${motor}, ${speed});\n`;
    }

    Blockly.Arduino['wireless_menu_number'] = function (block) {
        var branch = block.getFieldValue('number');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['wireless_menu_sensor'] = function (block) {
        var branch = block.getFieldValue('sensor');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['wireless_menu_pin1'] = function (block) {
        var branch = block.getFieldValue('pin1');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['wireless_menu_pin2'] = function (block) {
        var branch = block.getFieldValue('pin2');
        return [branch, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['wireless_webserverInit'] = function (block) {
        var ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_NONE) || "";
        var password = Blockly.Arduino.valueToCode(block, 'PWD', Blockly.Arduino.ORDER_NONE) || "";
        webServerInit(ssid, password);
        return '';
    }

    Blockly.Arduino['wireless_webserverShow'] = function (block) {
        let number = Blockly.Arduino.valueToCode(block, 'NUMBER', Blockly.Arduino.ORDER_NONE) || '1';
        let sensor = Blockly.Arduino.valueToCode(block, 'SENSOR', Blockly.Arduino.ORDER_NONE) || 'img-water';
        let name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_NONE) || "";
        let value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || "";
        Blockly.Arduino.loopsEnd_['webListening'] = 'webStartListening();';
        var code = `setNote(${number},${value},${name},"${sensor}");\n`
        return code;
    }

    Blockly.Arduino['wireless_lotusvsetble'] = function (block) {
        let pins = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_NONE) || '2#3';
        var [
            pin1,
            pin2
        ] = pins.split('#');

        Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
        Blockly.Arduino.definitions_[`var_lotusvble_init${pin1}_${pin2}`] = `SoftwareSerial blueToothSerial${pin1}_${pin2}(${pin1}, ${pin2});`;

        var id = Blockly.Arduino.valueToCode(block, 'ID', Blockly.Arduino.ORDER_ATOMIC) || 'SeeedBTSlave';
        var pwd = Blockly.Arduino.valueToCode(block, 'PWD', Blockly.Arduino.ORDER_ATOMIC) || '1234';

        id = id.replace(/\"/g, "");
        pwd = pwd.replace(/\"/g, "");

        var initCode = [
            `blueToothSerial${pin1}_${pin2}.begin(9600);`,
            `blueToothSerial${pin1}_${pin2}.print("AT");`,
            'delay(400);',
            `blueToothSerial${pin1}_${pin2}.print("AT+DEFAULT");`,          // Restore all setup value to factory setup
            'delay(2000);',
            `blueToothSerial${pin1}_${pin2}.print("AT+NAME${id}");`,   // set the bluetooth name as "SeeedBTSlave" ,the length of bluetooth name must less than 12 characters.
            'delay(400);',
            `blueToothSerial${pin1}_${pin2}.print("AT+PIN${pwd}");`,             // set the pair code to connect 
            'delay(400);',
            `blueToothSerial${pin1}_${pin2}.print("AT+AUTH1");`,          //
            'delay(400);',
            `blueToothSerial${pin1}_${pin2}.flush();`,
        ]

        return initCode.join('\n') + '\n';
    }

    Blockly.Arduino['wireless_lotusvgetblevalue'] = function (block) {
        let pins = Blockly.Arduino.valueToCode(block, 'PIN1', Blockly.Arduino.ORDER_NONE) || '2#3';
        var [
            pin1,
            pin2
        ] = pins.split('#');
        Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
        Blockly.Arduino.definitions_[`var_lotusvble_init${pin1}_${pin2}`] = `SoftwareSerial blueToothSerial${pin1}_${pin2}(${pin1}, ${pin2});`;
        Blockly.Arduino.definitions_[`var_btValue`] = 'char bt_data[24]={0,};';
        var initValueCode =
            '\n' +
            '    int i=0;\n' +
            `    while (blueToothSerial${pin1}_${pin2}.available())\n` +
            '    {\n' +
            `        bt_data[i++]=blueToothSerial${pin1}_${pin2}.read();\n` +
            '        delay(50);\n' +
            '        if (i>=(23))break;\n' +
            '    }\n' +
            '    bt_data[i]=0;';
        Blockly.Arduino.loopsEnd_['init_btValue'] = initValueCode;
        return ['bt_data', Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['wireless_infraredSend'] = function (block) {
        // Blockly.Arduino.definitions_['include_IRSendRev'] = '#include <IRSendRev.h>';
        // Blockly.Arduino.definitions_['var_defInfraredVars'] =
        //     '#define BIT_LEN         0\n' +
        //     '#define BIT_START_H     1\n' +
        //     '#define BIT_START_L     2\n' +
        //     '#define BIT_DATA_H      3\n' +
        //     '#define BIT_DATA_L      4\n' +
        //     '#define BIT_DATA_LEN    5\n' +
        //     '#define BIT_DATA        6\n' +
        //     '\n' +
        //     'unsigned char dta[20];\n'+
        //     'unsigned char dtaSend[20];\n';

        // Blockly.Arduino.definitions_['var_send_ir_value'] =
        //     'void send_ir_value(int argu) {\n' +
        //     '    dtaSend[BIT_LEN]        = 6;\n' +
        //     '    dtaSend[BIT_START_H]    = 179;\n' +
        //     '    dtaSend[BIT_START_L]    = 90;\n' +
        //     '    dtaSend[BIT_DATA_H]     = 11;\n' +
        //     '    dtaSend[BIT_DATA_L]     = 33;\n' +
        //     '    dtaSend[BIT_DATA_LEN]   = 1;\n' +
        //     '    dtaSend[BIT_DATA + 0]     = argu;\n' +
        //     '    IR.Send(dtaSend, 38);\n'+
        //     '}\n';
        // var message = Blockly.Arduino.valueToCode(block, 'MESSAGE', Blockly.Arduino.ORDER_ATOMIC) || '';
        // return `send_ir_value(${message});\n`;

        Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>';
        Blockly.Arduino.definitions_['var_IRsend'] = 'IRsend irsend;';

        var message = Blockly.Arduino.valueToCode(block, 'MESSAGE', Blockly.Arduino.ORDER_ATOMIC) || '';
        return `irsend.sendNEC(${message}, 32);\n`;
    }

    Blockly.Arduino['wireless_infraredReceive'] = function (block) {
        // Blockly.Arduino.definitions_['include_IRSendRev'] = '#include <IRSendRev.h>';
        // Blockly.Arduino.definitions_['var_defInfraredVars'] =
        //     '#define BIT_LEN         0\n' +
        //     '#define BIT_START_H     1\n' +
        //     '#define BIT_START_L     2\n' +
        //     '#define BIT_DATA_H      3\n' +
        //     '#define BIT_DATA_L      4\n' +
        //     '#define BIT_DATA_LEN    5\n' +
        //     '#define BIT_DATA        6\n' +
        //     '\n' +
        //     'unsigned char dta[20];\n' +
        //     'unsigned char dtaSend[20];\n';
        // Blockly.Arduino.definitions_['var_get_ir_value'] =
        //     'int get_ir_value() {\n' +
        //     '    if (IR.IsDta())\n' +
        //     '    {\n' +
        //     '        IR.Recv(dta);\n' +
        //     '        return int(dta[BIT_DATA]);\n' +
        //     '    }\n' +
        //     '}';
        // let pin = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_NONE) || '2';
        // Blockly.Arduino.setups_['init_IR'] = `IR.Init(${pin});`;
        // return [`get_ir_value()`, Blockly.Arduino.ORDER_ATOMIC];

        var pin = Blockly.Arduino.valueToCode(block, 'PIN2', Blockly.Arduino.ORDER_NONE) || '2';

        Blockly.Arduino.definitions_['include_IRremote'] = '#include <IRremote.h>';
        Blockly.Arduino.definitions_['var_IRrecv'] = `IRrecv irrecv(${pin});`;
        Blockly.Arduino.definitions_['var_decode_results'] = 'decode_results results;';

        Blockly.Arduino.definitions_['var_get_ir_value'] =
            'long unsigned int get_ir_value() {\n' +
            '    if (irrecv.decode(&results))\n' +
            '    {\n' +
            '        irrecv.resume();\n' +
            '        return results.value;\n' +
            '    }\n' +
            '    return 0;\n' +
            '}';
        Blockly.Arduino.setups_['init_IRIn'] = `  irrecv.enableIRIn();`;
        return [`get_ir_value()`, Blockly.Arduino.ORDER_ATOMIC];
    }
        /**
     * myblocks
     */
    Blockly.Arduino['procedures_call'] = function (block) {
        let defineBlock = Blockly.Procedures.getDefineBlock(block.getProcCode(), block.workspace);
        if (!defineBlock) return '';
        let childBlocks = block.childBlocks_ || [];
        let code = `${defineBlock.funName}(`;
        for (let x = 0, isFirstArg = true, block_; block_ = childBlocks[x]; x++) {
            let argText = Blockly.Arduino.blockToCode(block_);
            if (argText.constructor == Array) {
                code = `${code}${isFirstArg ? '' : ','}${argText[0]}`;
                isFirstArg = false;
            }
        }
        code = `${code});\n`;
        return code;
    }

    Blockly.Arduino['procedures_definition'] = function (block) {
        let childBlocks = block.childBlocks_ || [];
        let funName = Blockly.Arduino.variableDB_.getDistinctName(`definition_fun`, Blockly.Variables.NAME_TYPE);
        block.funName = funName;
        let callbackCodeHead = `void ${funName}(`;
        for (let x = 0, block_; block_ = childBlocks[0].childBlocks_[x]; x++) {
            let argName = '', argType = '';
            if (block_.type === "argument_reporter_string_number") {
                argType = 'float';
            } else if (block_.type === "argument_reporter_boolean") {
                argType = 'uint8_t';
            }
            let value = block_.getFieldValue('VALUE') || '';
            argName = Blockly.Arduino.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
            callbackCodeHead = `${callbackCodeHead}${x === 0 ? '' : ','}${argType} ${argName}`;
        }
        callbackCodeHead = `${callbackCodeHead}){\n`;
        block.callbackCodeHead = callbackCodeHead;
        block.callbackCodeTail = '}\n\n';
        return '';
    }

    Blockly.Arduino['argument_reporter_string_number'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.Arduino.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
        return [argName, Blockly.Arduino.ORDER_ATOMIC];
    }
    
    Blockly.Arduino['argument_reporter_boolean'] = function (block) {
        let value = block.getFieldValue('VALUE') || '';
        let argName = Blockly.Arduino.variableDB_.getName(value, Blockly.Variables.NAME_TYPE);
        return [argName, Blockly.Arduino.ORDER_ATOMIC];
    }

}


