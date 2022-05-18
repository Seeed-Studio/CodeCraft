const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');
const Color = require('../../../util/color');

const hexToColorArg = (colorHex) => {
    colorHex = colorHex.replace(/"/g, '');
    var r = colorHex.slice(1, 3);
    var g = colorHex.slice(3, 5);
    var b = colorHex.slice(5, 7);
    return `\\x${r}\\x${g}\\x${b}`
}
class Rgbled extends Ability {
    constructor() {
        super();
        this.instruct = instructs.elfbot.rgbled;
    }

    /**
     * 根据模式亮
     * @param {*} mode 
     * @param {*} rgb 
     */
    displayAtMode(mode, rgb) {
        this.execPyApi(`elfbot.rgb_style('${mode}', ${rgb.r}, ${rgb.g}, ${rgb.b})\r\n`);
    }

    /**
     * 亮颜色值
     * @param {*} position 
     * @param {*} duration 
     * @param {*} rgb 
     */
    displayAtColor(position, duration, rgb) {
        this.execPyApi(`elfbot.rgb('${position}', ${rgb.r}, ${rgb.g}, ${rgb.b}, 655)\r\n`);
        if (duration === 0) return;
        return new Promise(resolve => {
            setTimeout(() => {
                this.execPyApi(`elfbot.rgb_close()\r\n`);
                resolve()
            }, duration * 1000);
        });
    }

    /**
     * 亮具体颜色值
     * @param {*} position 
     * @param {*} color 
     */
    displayAtDesignatedColor(position, color) {
        this.execPyApi(`elfbot.rgb_color('${color}','all')\r\n`);
    }

    /**
     * 设置亮度调整值
     * @param {*} brightness 
     */
    setRgbledBrightness(brightness) {
        this.execPyApi(`rgb_lightness(${brightness})\r\n`);
    }

    /**
     * 关闭
     */
    close() {
        this.execPyApi(`elfbot.rgb_close()\r\n`);
    }
}

module.exports = Rgbled;