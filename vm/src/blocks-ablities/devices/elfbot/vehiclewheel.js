const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class VehicleWheel extends Ability {
    constructor() {
        super();
        this.instruct = instructs.elfbot.vehicleWheel;

        this.ABS_POWER = 100; //小车动力范围
        this.INIT_POWER = 0;
    }

    stop() {
        this.execPyApi(`elfbot.stop()\r\n`);

    }

    runAtPower(lPower, rPower) {
        this.execPyApi(`elfbot.run(${lPower},${rPower}, 655)\r\n`);
    }

    /**
     * 小车行驶吃持续一定时间
     * @param {*} direction 
     * @param {*} percent 
     * @param {*} duration 
     */
    runForDuration(direction, percent, duration) {
        this.run(direction, percent, duration);
        return new Promise(resolve => {
            setTimeout(() => resolve(), duration * 1000);
        });
    }

    /**
     * 小车行驶 
     * @param {*} direction 
     * @param {*} percent 
     * @param {*} duration 
     */
    run(direction, percent, duration) {
        // 前进
        if (direction === 'forward') {
            this.execPyApi(`elfbot.forward(${percent}, ${duration})\r\n`);
        }
        // 后退
        else if (direction === 'back') {
            this.execPyApi(`elfbot.backward(${percent}, ${duration})\r\n`);
        }
        // 左转
        else if (direction === 'left') {
            this.execPyApi(`elfbot.turn_left(${percent}, ${duration})\r\n`);
        }
        // 右转
        else if (direction === 'right') {
            this.execPyApi(`elfbot.turn_right(${percent}, ${duration})\r\n`);
        }
    }




    /**
     * 直线前进
     */
    goForward(duration) {
        this.execPyApi(`elfbot.go_forward(${duration})\r\n`);
        return new Promise(resolve => {
            setTimeout(() => resolve(), duration * 1000);
        });
    }

    /**
     * 直线前进
     */
    goBackward(duration) {
        this.execPyApi(`elfbot.go_backward(${duration})\r\n`);
        return new Promise(resolve => {
            setTimeout(() => resolve(), duration * 1000);
        });
    }

}

module.exports = VehicleWheel;