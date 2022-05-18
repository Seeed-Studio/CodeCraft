const Ability = require('../../ability.js');

class Key extends Ability {

    constructor() {
        super();
        this.keystatus = 0;
    }
    
    /**
     * 判断按键s是否被按下
     */
    isPressed() {
        let value = this.getRawData('keyevent');
        if (value === undefined) {
            this.keystatus = -1;
        }
        else {
            this.keystatus = value;
        }
        return value === 0x01;
    }
}

module.exports = Key;