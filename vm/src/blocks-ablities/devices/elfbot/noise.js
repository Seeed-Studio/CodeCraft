const Ability = require('../../ability.js');

class Noise extends Ability {

    constructor() {
        super();
        /**
         * 声音强度
         */
        this.loudness = 0;
        /**
         * 阀值 默认 300
         */
        this.threshold = 100;
    }

    /**
     * 获取声音强度
     */
    getLoudness() {
        this.execPyApi(`elfbot.read_mic()\r\n`);
        let value = this.getRawData('micval');
        if (value === undefined) {
            this.loudness = -1;
        }
        else {
            this.loudness = value;
        }
        return this.loudness;
    }
}

module.exports = Noise;