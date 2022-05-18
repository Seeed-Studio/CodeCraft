const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Servo extends Ability {
    constructor() {
        super();
        this.instruct = instructs.elfbot.servo;
    }

    /**
     * 舵机运动
     * @param {*} postion  0x00头左\0x01头右\0X02头上\0X03头下\0X04耳朵前\0X05耳朵后 
     * @param {*} angle  头左右角度（0-60）\ 头上角度（0-25）\头下角度（0-10）\耳朵前后角度（0-60）
     */
    run(postion, angle) {
        this.execPyApi(`elfbot.servo_turn(${postion},${angle})\r\n`);
    }

    /**
     * 归位
     */
    reset() {
        this.execPyApi(`elfbot.servo_reset()\r\n`);
    }


}

module.exports = Servo;