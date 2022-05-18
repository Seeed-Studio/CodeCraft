const Ability = require('../../ability.js');

class Ultrasonic extends Ability {
    constructor() {
        super();
        /**
         * 超声波距离障碍物的距离
         */
        this.distance = -1;

        /**
         * 阀值 默认 300
         */
        this.threshold = 300;
    }

    /**
     * 获取障碍物距离
     */
    getDistance() {
        this.execPyApi(`elfbot.ult_read()\r\n`);
        let value = this.getRawData('ultval');
        if (value === undefined) {
            this.distance = -1;
            return 0;
        }
        else {
            this.distance = value;
        }
        return this.distance;
    }

    /**
     * 前方是否有障碍物
     * @param {*} color 
     */
    hasObstacle() {
        this.getDistance();
        if (this.distance === -1 || this.distance === 0) {
            return false;
        }
        else {
            return this.distance < this.threshold;
        }
    }
}

module.exports = Ultrasonic;