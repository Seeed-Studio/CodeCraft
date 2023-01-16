const Ability = require('../../ability.js');

class Timer extends Ability {

    constructor() {
        super();
        this.timerValueA = 0.0;
        this.timerValueB = 0.0;
    }

    resetAllTimer() {
        this.execPyApi(`timer_all_reset()\r\n`);
    }

    resetAllTimerA() {
        this.execPyApi(`timer_A_reset()\r\n`);
    }

    getTimerA() {
        this.timerValueA = this.getRawData('timeValueA');
        return this.timerValueA;
    }

    whenTimerAGreaterthan(count) {
        let timerCount = this.getRawData('timeValueA');
        if (timerCount > count &&
            timerCount < this.timerValueA) {
            this.timerValueA = timerCount;
            return true;
        }else{
            this.timerValueA = timerCount;
            return false; 
        }
    }

    resetAllTimerB() {
        this.execPyApi(`timer_B_reset()\r\n`);
    }

    getTimerB() {
        this.timerValueB = this.getRawData('timeValueB');
        return this.timerValueB;
    }

    whenTimerBGreaterthan(count) {
        let timerCount = this.getRawData('timeValueB');
        if (timerCount > count &&
            timerCount < this.timerValueB) {
            this.timerValueB = timerCount;
            return true;
        }else{
            this.timerValueB = timerCount;
            return false; 
        }
    }

}

module.exports = Timer;