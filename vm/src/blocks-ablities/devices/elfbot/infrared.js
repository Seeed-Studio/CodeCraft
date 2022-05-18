const Ability = require('../../ability.js');

class Infrared extends Ability {

    constructor() {
        super();

        /**
         * 精灵悬空状态
         */
        this.vacantStatus = 2000;

        /**
         * 红外反射光强度
         */
        this.lightness = 0;
    }

    /**
     * 判断是否被悬空
     */
    isVacant() {
        this.getLightness();
        return this.lightness < this.vacantStatus
    }

    /**
     * 获取 红外反射光强度
     */
    getLightness() {
        let value = this.getRawData('irrval');
        if (value === undefined) {
            this.lightness = -1;
        }
        else {
            this.lightness = value;
        }
        return this.lightness;
    }



}

module.exports = Infrared;