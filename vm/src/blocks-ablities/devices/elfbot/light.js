const Ability = require('../../ability.js');


class Light extends Ability {

    constructor() {
        super();
        /**
         * 环境光亮度
         */
        this.lightness = 0;
        /**
         * 阀值 默认 300
         */
        this.threshold = 500;
    }

    /**
     * 获取环境光亮度
     */
    getLightness() {
        this.execPyApi(`elfbot.light_read()\r\n`);
        let value = this.getRawData('ligval');
        if (value === undefined) {
            this.lightness = -1;
        }
        else {
            this.lightness = value;
        }
        return this.lightness;
    }

}

module.exports = Light;