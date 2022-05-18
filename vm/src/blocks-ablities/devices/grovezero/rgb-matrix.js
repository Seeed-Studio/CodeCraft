const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');
/**
 * 高位地位互换算法 （数值）
 * @param {*} data 
 */
const bit_operate = (data) => {
    let _hight = (data & 0xFF00) >> 8;
    let _low = data & 0x00FF;
    return [_low, _hight];
}

/**
 * 获取设备地址
 * @param {*} index 
 */
const _addr = (index) => {
    let _addr = 0x60;
    switch (index) {
        case 1:
            _addr = 0x60;
            break;
        case 2:
            _addr = 0x61;
            break;
        case 3:
            _addr = 0x62;
            break;
        case 4:
            _addr = 0x63;
            break;
        case 5:
            _addr = 0x64;
            break;
        case 6:
            _addr = 0x65;
            break;
        case 7:
            _addr = 0x66;
            break;
        case 8:
            _addr = 0x67;
            break;
        case 9:
            _addr = 0x68;
            break;
        default:
            break;
    }
    return _addr;
}

/**
 * 获取动画参数
 * @param {*} index 
 */
const getAnimaArgs = (index) => {
    let _args = [42, 43];
    switch (index) {
        case 6:
            _args = [255, 255];
            break;
        case 7:
            _args = [254, 254];
            break;
        case 8:
            _args = [42, 43];
            break;
        case 9:
            _args = [44, 52];
            break;
        default:
            break;
    }
    return _args;
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

const getColorHex = (value) => {
    switch (value) {
        case 0: return '#ff0000';
        case 1: return '#ff0600';
        case 2: return '#ff0c00';
        case 3: return '#ff1200';
        case 4: return '#ff1800';
        case 5: return '#ff1e00';
        case 6: return '#ff2400';
        case 7: return '#ff2a00';
        case 8: return '#ff3000';
        case 9: return '#ff3600';
        case 10: return '#ff3c00';
        case 11: return '#ff4200';
        case 12: return '#ff4800';
        case 13: return '#ff4e00';
        case 14: return '#ff5400';
        case 15: return '#ff5a00';
        case 16: return '#ff6000';
        case 17: return '#ff6600';
        case 18: return '#ff6c00';
        case 19: return '#ff7200';
        case 20: return '#ff7800';
        case 21: return '#ff7e00';
        case 22: return '#ff8400';
        case 23: return '#ff8a00';
        case 24: return '#ff9000';
        case 25: return '#ff9600';
        case 26: return '#ff9c00';
        case 27: return '#ffa200';
        case 28: return '#ffa800';
        case 29: return '#ffae00';
        case 30: return '#ffb400';
        case 31: return '#ffba00';
        case 32: return '#ffc000';
        case 33: return '#ffc600';
        case 34: return '#ffcc00';
        case 35: return '#ffd200';
        case 36: return '#ffd800';
        case 37: return '#ffde00';
        case 38: return '#ffe400';
        case 39: return '#ffea00';
        case 40: return '#fff000';
        case 41: return '#fff600';
        case 42: return '#ffff00';
        case 43: return '#f9ff00';
        case 44: return '#f3ff00';
        case 45: return '#edff00';
        case 46: return '#e7ff00';
        case 47: return '#e1ff00';
        case 48: return '#dbff00';
        case 49: return '#d5ff00';
        case 50: return '#cfff00';
        case 51: return '#c9ff00';
        case 52: return '#c3ff00';
        case 53: return '#bdff00';
        case 54: return '#b7ff00';
        case 55: return '#b1ff00';
        case 56: return '#abff00';
        case 57: return '#a5ff00';
        case 58: return '#9fff00';
        case 59: return '#99ff00';
        case 60: return '#93ff00';
        case 61: return '#8dff00';
        case 62: return '#87ff00';
        case 63: return '#81ff00';
        case 64: return '#7bff00';
        case 65: return '#75ff00';
        case 66: return '#6fff00';
        case 67: return '#69ff00';
        case 68: return '#63ff00';
        case 69: return '#5dff00';
        case 70: return '#57ff00';
        case 71: return '#51ff00';
        case 72: return '#4bff00';
        case 73: return '#45ff00';
        case 74: return '#3fff00';
        case 75: return '#39ff00';
        case 76: return '#33ff00';
        case 77: return '#2dff00';
        case 78: return '#27ff00';
        case 79: return '#21ff00';
        case 80: return '#1bff00';
        case 81: return '#15ff00';
        case 82: return '#0fff00';
        case 83: return '#09ff00';
        case 84: return '#03ff00';
        case 85: return '#00ff00';
        case 86: return '#00ff06';
        case 87: return '#00ff0c';
        case 88: return '#00ff12';
        case 89: return '#00ff18';
        case 90: return '#00ff1e';
        case 91: return '#00ff24';
        case 92: return '#00ff2a';
        case 93: return '#00ff30';
        case 94: return '#00ff36';
        case 95: return '#00ff3c';
        case 96: return '#00ff42';
        case 97: return '#00ff48';
        case 98: return '#00ff4e';
        case 99: return '#00ff54';
        case 100: return '#00ff5a';
        case 101: return '#00ff60';
        case 102: return '#00ff66';
        case 103: return '#00ff6c';
        case 104: return '#00ff72';
        case 105: return '#00ff78';
        case 106: return '#00ff7e';
        case 107: return '#00ff84';
        case 108: return '#00ff8a';
        case 109: return '#00ff90';
        case 110: return '#00ff96';
        case 111: return '#00ff9c';
        case 112: return '#00ffa2';
        case 113: return '#00ffa8';
        case 114: return '#00ffae';
        case 115: return '#00ffb4';
        case 116: return '#00ffba';
        case 117: return '#00ffc0';
        case 118: return '#00ffc6';
        case 119: return '#00ffcc';
        case 120: return '#00ffd2';
        case 121: return '#00ffd8';
        case 122: return '#00ffde';
        case 123: return '#00ffe4';
        case 124: return '#00ffea';
        case 125: return '#00fff0';
        case 126: return '#00fff6';
        case 127: return '#00fffc';
        case 128: return '#00ffff';
        case 129: return '#00f9ff';
        case 130: return '#00f3ff';
        case 131: return '#00edff';
        case 132: return '#00e7ff';
        case 133: return '#00e1ff';
        case 134: return '#00dbff';
        case 135: return '#00d5ff';
        case 136: return '#00cfff';
        case 137: return '#00c9ff';
        case 138: return '#00c3ff';
        case 139: return '#00bdff';
        case 140: return '#00b7ff';
        case 141: return '#00b1ff';
        case 142: return '#00abff';
        case 143: return '#00a5ff';
        case 144: return '#009fff';
        case 145: return '#0099ff';
        case 146: return '#0093ff';
        case 147: return '#008dff';
        case 148: return '#0087ff';
        case 149: return '#0081ff';
        case 150: return '#007bff';
        case 151: return '#0075ff';
        case 152: return '#006fff';
        case 153: return '#0069ff';
        case 154: return '#0063ff';
        case 155: return '#005dff';
        case 156: return '#0057ff';
        case 157: return '#0051ff';
        case 158: return '#004bff';
        case 159: return '#0045ff';
        case 160: return '#003fff';
        case 161: return '#0039ff';
        case 162: return '#0033ff';
        case 163: return '#002dff';
        case 164: return '#0027ff';
        case 165: return '#0021ff';
        case 166: return '#001bff';
        case 167: return '#0015ff';
        case 168: return '#000fff';
        case 169: return '#0009ff';
        case 170: return '#0000ff';
        case 171: return '#0600ff';
        case 172: return '#0c00ff';
        case 173: return '#1200ff';
        case 174: return '#1800ff';
        case 175: return '#1e00ff';
        case 176: return '#2400ff';
        case 177: return '#2a00ff';
        case 178: return '#3000ff';
        case 179: return '#3600ff';
        case 180: return '#3c00ff';
        case 181: return '#4200ff';
        case 182: return '#4800ff';
        case 183: return '#4e00ff';
        case 184: return '#5400ff';
        case 185: return '#5a00ff';
        case 186: return '#6000ff';
        case 187: return '#6600ff';
        case 188: return '#6c00ff';
        case 189: return '#7200ff';
        case 190: return '#7800ff';
        case 191: return '#7e00ff';
        case 192: return '#8400ff';
        case 193: return '#8a00ff';
        case 194: return '#9000ff';
        case 195: return '#9600ff';
        case 196: return '#9c00ff';
        case 197: return '#a200ff';
        case 198: return '#a800ff';
        case 199: return '#ae00ff';
        case 200: return '#b400ff';
        case 201: return '#ba00ff';
        case 202: return '#c000ff';
        case 203: return '#c600ff';
        case 204: return '#cc00ff';
        case 205: return '#d200ff';
        case 206: return '#d800ff';
        case 207: return '#de00ff';
        case 208: return '#e400ff';
        case 209: return '#ea00ff';
        case 210: return '#f000ff';
        case 211: return '#f600ff';
        case 212: return '#ff00ff';
        case 213: return '#ff00f9';
        case 214: return '#ff00f3';
        case 215: return '#ff00ed';
        case 216: return '#ff00e7';
        case 217: return '#ff00e1';
        case 218: return '#ff00db';
        case 219: return '#ff00d5';
        case 220: return '#ff00cf';
        case 221: return '#ff00c9';
        case 222: return '#ff00c3';
        case 223: return '#ff00bd';
        case 224: return '#ff00b7';
        case 225: return '#ff00b1';
        case 226: return '#ff00ab';
        case 227: return '#ff00a5';
        case 228: return '#ff009f';
        case 229: return '#ff0099';
        case 230: return '#ff0093';
        case 231: return '#ff008d';
        case 232: return '#ff0087';
        case 233: return '#ff0081';
        case 234: return '#ff007b';
        case 235: return '#ff0075';
        case 236: return '#ff006f';
        case 237: return '#ff0069';
        case 238: return '#ff0063';
        case 239: return '#ff005d';
        case 240: return '#ff0057';
        case 241: return '#ff0051';
        case 242: return '#ff004b';
        case 243: return '#ff0045';
        case 244: return '#ff003f';
        case 245: return '#ff0039';
        case 246: return '#ff0033';
        case 247: return '#ff002d';
        case 248: return '#ff0027';
        case 249: return '#ff0021';
        case 250: return '#ff001b';
        case 251: return '#ff0015';
        case 252: return '#ff000f';
        case 253: return '#ff0009';
        case 254: return '#ffffff';
        case 255: return '#000000';
    }
    return '#000000';
}


class RgbMatrixData {
    constructor(_addr) {
        this.addr = _addr;
        this.color = 0x00;
        this.matrix = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.colors_matrix = [
            ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
            ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
            ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
            ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
            ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
            ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
            ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
            ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
        ]
    }
}

class RgbMatrix extends Ability {

    constructor() {
        super();
        this.instruct = instructs.grovezero.rgbMatrix;
        this.matrixgroup = {};

    }


    exec(address, command, params) {
        this.instruct.setAddress(address);
        super.exec(command, params);
    }


    /**
     * 显示动画
     * @param {*} address 硬件模块游标地址
     * @param {*} index 动画游标
     * 动画默认持续两秒
     * RGBLedMatrix.DisplayGif									Start	End	Duration	Forever Flag
     * 0F	  C3	40	60+x	   4B	0C	60+x	DefinedByPC		XX	XX	XXXX	XX
     * 
     */
    showAnima(address, index) {
        // 获取硬件地址
        let _address = _addr(address);
        // 定义默认时长
        let _duration = 4000;
        // 设置不循环 '0x01'循环播放 
        let _foreverflag = 0x00;
        // gif 动画
        if (index > 5) {
            // 获取动画参数
            let _anima_args = getAnimaArgs(index);
            //数据参数
            let _params = _anima_args.concat(bit_operate(_duration)).concat(_foreverflag);
            //执行命令
            this.exec(_address, 0x0C, _params);
        }
        // 波浪
        else if (index === 1) {
            this.exec(_address, 0x0A, [0xfe].concat(bit_operate(_duration)).concat(_foreverflag));
        }
        // 顺时针、逆时针
        else if (index === 2
            || index === 3
            || index === 4
            || index === 5) {
            let _wise_mode = 0x01;
            let _wise_size = 0x01;
            switch (index) {
                case 2:
                    _wise_mode = 0x01;
                    _wise_size = 0x01;
                    break;
                case 3:
                    _wise_mode = 0x01;
                    _wise_size = 0x00;
                    break;
                case 4:
                    _wise_mode = 0x00;
                    _wise_size = 0x01;
                    break;
                case 5:
                    _wise_mode = 0x00;
                    _wise_size = 0x00;
                    break;
                default:
                    break;
            }
            this.exec(_address, 0x0B, [_wise_mode, _wise_size].concat(bit_operate(_duration)).concat(_foreverflag));
        }
        return new Promise((resolve) => {
            //设置阻塞
            setTimeout(() => {
                resolve();
            }, _duration);
        });
    }


    /**
     * 显示柱状图
     * @param {*} address 
     * @param {*} index 
     * RGBLedMatrix.DisplayBar									Bar Level	Duration	Forever Flag	Color
     * 0D	  C3	40	60+x	   49	1	60+x	DefinedByPC		XX(0-32)	XXXX	XX	XX
     *
     */
    showHistoram(address, value) {
        // 获取硬件地址
        let _address = _addr(address);
        // 定义默认时长
        let _duration = 0;
        // 设置不循环 '0x01'循环播放 
        let _foreverflag = 0x01;
        // 值范围过滤
        if (value > 32) {
            value = 32;
        } else if (value < 0) {
            value = 0;
        }
        //数据参数
        let _params = [value].concat(bit_operate(_duration)).concat(_foreverflag);
        //执行命令
        this.exec(_address, 0x09, _params);
    }

    /**
     * 显示字符串到结束
     * @param {*} address 
     * @param {*} str 
     * RGBLedMatrix.DisplayStr			X is string len in current packet, if it's less than String len, other strings data was transfered in continue packet.						Forever Flag	Duration	String len	Color	String
     * 0D+X	  C3	40	60+x	   49+X	4	60+x	DefinedByPC		XX	XXXX	XX	XX	……
     *
     */
    showText(address, str, color) {
        // 空判断
        if (str === undefined
            || str === null
            || str === ''
            || str.length === 0) {
            return;
        }
        if (str.length > 30) {
            str = str.slice(0, 30);
        }
        console.log(str);
        // 对象转字符串
        str = str.toString();
        // 获取硬件地址
        let _address = _addr(address);
        // 设置不循环 '0x01'循环播放 
        let _foreverflag = 0x00;
        if (str.length > 1) {
            _foreverflag = 0x00;
        } else {
            _foreverflag = 0x01;
        }
        // 颜色值默认为白色
        let _color = color;
        console.log('color : ' + _color)
        let _data = [];
        str.split('').forEach((value, index) => {
            _data.push(value.charCodeAt());
        });

        // 获取字符串长度
        let _len = _data.length;
        // 定义默认时长
        let _duration = bit_operate(_len * 1000);
        // 判断是否需要打包
        let _is_packet = _len / 7 > 1;
        if (_is_packet) {
            let _detail_data = _data.slice(0, 7);
            let _detail_un_data = _data.slice(7, _len);
            console.log('--- _detail_data : ' + _detail_data);
            console.log('--- _detail_un_data : ' + _detail_un_data);
            let _params = [_foreverflag].concat(_duration).concat([_len, _color]);
            this.exec(_address, 0x04, _params.concat(_detail_data));
            this.execReplenishPackage(_address, _detail_un_data);
            // execStr(_address, _detail_un_data);
        } else {
            let _params = [_foreverflag].concat(_duration).concat([_len, _color]);
            console.log('--- _params : ' + _params);
            this.exec(_address, 0x04, _params.concat(_data));
        }
        return new Promise((resolve) => {
            //设置阻塞
            setTimeout(() => {
                resolve();
            }, _len * 1000);
        });
    }


    /**
     * 点亮rgb矩阵
     * @param {*} address 
     * @param {*} pos 位置
     * @param {*} color 颜色
     * RGBLedMatrix.DisplaySet									X	Y	Color
     * 0A	  C3	40	60+x	   46	95	60+x	DefinedByPC		XX(0-7)	XX(0-7)	XX
     */
    lightRgbMatrix(address, pos, color) {
        // 获取硬件地址
        let _address = _addr(address);
        // 获取坐标值
        let _x = pos.y;
        let _y = pos.x;
        if (_x > 7
            || _x < 0
            || _y > 7
            || _y < 0) {
            return;
        }
        //数据参数
        let _params = [_x, _y, color];
        //执行命令
        this.exec(_address, 0x07, _params);
        //保存矩阵状态
        let _currr_addr = "" + _address;
        if (this.matrixgroup[_currr_addr] === undefined) {
            this.matrixgroup[_currr_addr] = new RgbMatrixData(_address);
        }
        if ('0xff' === color) {
            this.matrixgroup[_currr_addr].matrix[_x][_y] = 0;
        } else {
            this.matrixgroup[_currr_addr].matrix[_x][_y] = 1;
        }
        let colorNum = parseInt(color, 16);
        let colorHex = getColorHex(colorNum);
        // 保存当前位置的颜色值
        this.matrixgroup[_currr_addr].colors_matrix[_x][_y] = colorHex;
    }

    /**
     * 熄灭rgb矩阵
     * @param {*} address 
     * @param {*} pos 
     */
    quenchRgbMatrix(address, pos) {
        this.lightRgbMatrix(address, pos, '0xff');
    }


    /**
     * 打开或者关闭rgb
     * @param {*} address 
     * @param {*} pos 
     * @param {*} color 
     */
    trunonoffRgbMatrix(address, pos, color) {
        // 获取硬件地址
        let _address = _addr(address);
        // 获取x,y坐标
        let _x = pos.y, _y = pos.x;
        //设置currrgb当前状态
        let _currr_addr = "" + _address;
        let _curr_pos = _x + "_" + _y;
        //打开
        if (this.matrixgroup[_currr_addr] === undefined
            || this.matrixgroup[_currr_addr].matrix[_x][_y] === 0) {
            this.lightRgbMatrix(address, pos, color);
        }
        //关闭
        else {
            this.quenchRgbMatrix(address, pos);
        }
    }


    /**
     * 关闭所有
     * 矩阵rgb灯
     */
    quenchAll(address) {
        // 获取硬件地址
        let _address = _addr(address);
        let rgbmatrix = this.matrixgroup[_address + ''];
        if (!rgbmatrix) return;
        rgbmatrix.matrix = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]];
        //关闭制定地址的矩阵
        this.exec(_address, 0x06);
    }


    /**
     * 是否被点亮
     * @param {*} address 
     * @param {*} pos 
     */
    isLisghted(address, pos) {
        // 获取硬件地址
        let _address = _addr(address);
        // 获取x,y坐标
        let _x = pos.y, _y = pos.x;
        //设置currrgb当前状态
        let _currr_addr = "" + _address;
        //判断当前位置是否被点亮
        if (this.matrixgroup[_currr_addr] === undefined) {
            return false;
        } else {
            return this.matrixgroup[_currr_addr].matrix[_x][_y] === 1;
        }
    }


    /**
      * 获取当前颜色值
      * @param {*} address 
      * @param {*} pos 
      */
    getColorValue(address, pos) {
        // 获取硬件地址
        let _address = _addr(address);
        // 获取x,y坐标
        let _x = pos.y, _y = pos.x;
        //设置currrgb当前状态
        let _currr_addr = "" + _address;

        if (this.matrixgroup[_currr_addr] === undefined) {
            return '#000000';
        } else {
            return this.matrixgroup[_currr_addr].colors_matrix[_x][_y];
        }
    }


    /**
     * rgb 自定义彩图控件
     * @param {*} address 
     * @param {*} rgb_matrix 
     */
    ShowPattern(address, rgb_matrix) {
        // 获取硬件地址
        let _address = _addr(address);
        // 获取默认图案编号
        let _emoji_number = rgb_matrix.emoji_number;
        // 持续时长
        let _duration = 0;
        // 设置不循环 '0x01'循环播放 
        let _foreverflag = 0x01;
        // 自定义彩图
        if (_emoji_number === undefined) {
            let _currr_addr = "" + _address;
            if (this.matrixgroup[_currr_addr] === undefined) {
                this.matrixgroup[_currr_addr] = new RgbMatrixData(_address);
            }
            // 获取颜色矩阵
            let _color_matrix = rgb_matrix.colors_matrix;
            // 声明矩阵行列
            let _rows = 8, _cols = 8;
            // 声明结果字符串
            let _reslut = [];
            // 遍历颜色矩阵
            for (let i = 0; i < _rows; i++) {
                for (let j = 0; j < _cols; j++) {
                    let _color = _color_matrix[i][j];
                    let _color_code = getColorCode(_color);
                    this.matrixgroup[_currr_addr].colors_matrix[i][j] = _color;
                    this.matrixgroup[_currr_addr].matrix[i][j] = _color_code === 255 ? 0 : 1;
                    _reslut.push(_color_code);
                }
            }

            // console.log('result : ' + _reslut);

            let _params = bit_operate(_duration).concat([_foreverflag, 0x01, 0x00, 0x00, 0x00]);

            // 获取字符串长度
            let _len = _reslut.length;
            // 判断是否需要打包
            let _is_packet = _len / 4 > 1;
            if (_is_packet) {
                let _detail_data = _reslut.slice(0, 4);
                let _detail_un_data = _reslut.slice(4, _len);
                this.exec(_address, 0x05, _params.concat(_detail_data));
                this.execReplenishPackage(_address, _detail_un_data);
            } else {
                this.exec(_address, 0x05, _params.concat(_reslut));
            }
        }
        // 默认彩图
        else {
            // 给当前矩阵存储赋值
            let _currr_addr = "" + _address;
            if (this.matrixgroup[_currr_addr] === undefined) {
                this.matrixgroup[_currr_addr] = new RgbMatrixData(_address);
            }
            // 获取颜色矩阵
            let _color_matrix = rgb_matrix.colors_matrix;
            // 声明矩阵行列
            let _rows = 8, _cols = 8;
            // 遍历颜色矩阵
            for (let i = 0; i < _rows; i++) {
                for (let j = 0; j < _cols; j++) {
                    let _color = _color_matrix[i][j];
                    let _color_code = getColorCode(_color);
                    this.matrixgroup[_currr_addr].colors_matrix[i][j] = _color;
                    this.matrixgroup[_currr_addr].matrix[i][j] = _color_code === 255 ? 0 : 1;
                }
            }
            // 执行默认图案命令
            this.exec(_address, 0x02, [_emoji_number].concat(bit_operate(_duration)).concat(_foreverflag));
        }
    }

    /**
     * rgb 自定义彩图控件
     * @param {*} address 
     * @param {*} rgb_matrix 
     */
    ShowPatternForDuration(address, rgb_matrix, duration) {
        if (duration <= 0
            || duration > (Math.pow(16, 4) - 1) / 1000) {
            duration = 0.1;
        }
        // 获取硬件地址
        let _address = _addr(address);
        // 获取默认图案编号
        let _emoji_number = rgb_matrix.emoji_number;
        // 持续时长
        let _duration = duration * 1000;
        // 设置不循环 '0x01'循环播放 
        let _foreverflag = 0x00;
        // 自定义彩图
        if (_emoji_number === undefined) {
            let _currr_addr = "" + _address;
            if (this.matrixgroup[_currr_addr] === undefined) {
                this.matrixgroup[_currr_addr] = new RgbMatrixData(_address);
            }
            // 获取颜色矩阵
            let _color_matrix = rgb_matrix.colors_matrix;
            // 声明矩阵行列
            let _rows = 8, _cols = 8;
            // 声明结果字符串
            let _reslut = [];
            // 遍历颜色矩阵
            for (let i = 0; i < _rows; i++) {
                for (let j = 0; j < _rows; j++) {
                    let _color = _color_matrix[i][j];
                    let _color_code = getColorCode(_color);
                    this.matrixgroup[_currr_addr].colors_matrix[i][j] = _color;
                    this.matrixgroup[_currr_addr].matrix[i][j] = _color_code === 255 ? 0 : 1;
                    _reslut.push(_color_code);
                }
            }

            // console.log('result : ' + _reslut);

            let _params = bit_operate(_duration).concat([_foreverflag, 0x01, 0x00, 0x00, 0x00]);

            // 获取字符串长度
            let _len = _reslut.length;
            // 判断是否需要打包
            let _is_packet = _len / 4 > 1;
            if (_is_packet) {
                let _detail_data = _reslut.slice(0, 4);
                let _detail_un_data = _reslut.slice(4, _len);
                this.exec(_address, 0x05, _params.concat(_detail_data));
                this.execReplenishPackage(_address, _detail_un_data);
            } else {
                this.exec(_address, 0x05, _params.concat(_reslut));
            }
        }
        // 默认彩图
        else {
            this.exec(_address, 0x02, [_emoji_number].concat(bit_operate(_duration)).concat(_foreverflag));
        }

        return new Promise((resolve) => {
            //设置阻塞
            setTimeout(() => {
                resolve();
            }, _duration);
        });

    }





}



module.exports = RgbMatrix;