const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Ultrasonicled extends Ability {
    constructor() {
        super();
        this.instruct = instructs.elfbot.ultrasonicled;
    }


    /**
     * 显示某种颜色
     * @param {*} color 
     */
    display(color) {
        this.execPyApi(`elfbot.ult_rgb_color('${color}')\r\n`)
    }

    /**
     * 关闭超声波 led 
     */
    close() {
        this.execPyApi(`elfbot.ult_rgb_close()\r\n`)
    }

}

module.exports = Ultrasonicled;