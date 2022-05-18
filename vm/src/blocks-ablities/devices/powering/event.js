const Ability = require('../../ability.js');

class Event extends Ability {

    constructor() {
        super();

        this.keyState = '0';
        this.shakeState = 'Flase';
        this.punchState = 'Flase';

    }

    handleButtonPressed() {
        let currState = this.getRawData('keyState');
        if (currState == '1' &&
            currState != this.keyState) {
            this.keyState = currState;
            return true;
        } else {
            this.keyState = currState;
            return false;
        }
    }

    handleShake() {
        let currState = this.getRawData('shakeState');
        if (currState == 'True' &&
            currState != this.shakeState) {
            this.shakeState = currState;
            return true;
        } else {
            this.shakeState = currState;
            return false;
        }
    }

    handlePunch() {
        let currState = this.getRawData('punchState');
        if (currState == 'True' &&
            currState != this.punchState) {
            this.punchState = currState;
            return true;
        } else {
            this.punchState = currState;
            return false;
        }
    }

    powerOff(){
        this.execPyApi(`ring.power_off()\r\n`);
    }

}

module.exports = Event;


