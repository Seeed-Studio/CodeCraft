const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');
const Color = require('../../../util/color');
const Cast = require('../../../util/cast');


class RgbLed extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.rgbLed;
    }

    showStyleColor(args) {
        let color = Cast.toRgbColorList(args.COLOR);
        let brightness = args.BRIGHTNESS;
        //时长 间隔
        let interval, duration, cmd, params;
        switch (brightness) {
            case 'light':
                cmd = 0x90;
                duration = this._numberoperate(0);
                params = color.concat(duration);
                break;
            case 'blink':
                cmd = 0x91;
                interval = this._numberoperate(250);
                duration = this._numberoperate(0);
                params = color.concat(interval, duration);
                break;
            case 'breath':
                cmd = 0x92;
                interval = this._numberoperate(8);
                duration = this._numberoperate(0);
                params = color.concat(interval, duration);
                break;
        }
        this.exec(cmd, params);
    }


    showStyle(args) {
        let style = args.STYLE;
        //时长 间隔
        let interval, duration, cmd, params;
        switch (style) {
            case 'rainbow':
                cmd = 0x93;
                interval = this._numberoperate(10);
                duration = this._numberoperate(0);
                params = interval.concat(duration);
                break;
            case 'random_color':
                cmd = 0x95;
                duration = this._numberoperate(0);
                params = duration;
                break;
        }
        this.exec(cmd, params);
    }

    fadeFromColor1ToColor2(args) {
        let color1 = Cast.toRgbColorList(args.COLOR1);
        let color2 = Cast.toRgbColorList(args.COLOR2);
        //时长 间隔
        let interval = this._numberoperate(40);
        let duration = this._numberoperate(0xFFFF);
        let params = color1.concat(color2, interval, duration);
        this.exec(0x94, params);
    }

    setBrightness(args) {
        let percent = args.BRIGHTNESS;
        if (percent < 0) {
            percent = 0;
        }
        if (percent > 100) {
            percent = 100;
        }
        let brightness = this._numberoperate(parseInt(percent / 100 * 255));
        this.exec(0x96, brightness);
    }

    lightOff() {
        this.exec(0x97);
    }

    rgbToColor(args) {
        let red = parseInt(args.RED);
        let green = parseInt(args.GREEN);
        let blue = parseInt(args.BLUE);
        if (red > 255) {
            red = 255
        }
        if (red < 0) {
            red = 0;
        }
        if (green > 255) {
            green = 255
        }
        if (green < 0) {
            green = 0;
        }
        if (blue > 255) {
            blue = 255
        }
        if (blue < 0) {
            blue = 0;
        }

        let rgb = {
            r: red,
            g: green,
            b: blue,
        };
        console.log(rgb);
        let decimal = Color.rgbToDecimal(rgb);
        console.log(decimal);

        let hexstr = Color.decimalToHex(decimal);
        console.log(hexstr);

        return hexstr;
    }

    hslToColor(args) {
        let color = parseInt(args.COLOR);
        let staturation = parseInt(args.STATURATION);
        let brightness = parseInt(args.BRIGHTNESS);

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

        let rgb = Color.hsvToRgb({
            h: h,
            s: s,
            v: v,
        });
        let decimal = Color.rgbToDecimal(rgb);
        let hexstr = Color.decimalToHex(decimal);
        return hexstr;
    }
}

module.exports = RgbLed;