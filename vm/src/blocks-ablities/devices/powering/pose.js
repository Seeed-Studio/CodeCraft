const Ability = require('../../ability.js');

class Pose extends Ability {

    constructor() {
        super();
    }

    isFacingUp() {
        return this.getRawData('faceState') == 0;
    }

    isFacingDown() {
        return this.getRawData('faceState') == 1;
    }

    isFacingLeft() {
        return this.getRawData('faceState') == 2;
    }

    isFacingRight() {
        return this.getRawData('faceState') == 3;
    }

    isFacingForward() {
        return this.getRawData('faceState') == 4;
    }

    isFacingBackward() {
        return this.getRawData('faceState') == 5;
    }

    getAccelerationValue(xyz = 0) {
        if (xyz == 0) {
            return this.getRawData('accelerationX') || 0;
        }
        if (xyz == 1) {
            return this.getRawData('accelerationY') || 0;
        }
        if (xyz == 2) {
            return - this.getRawData('accelerationZ') || 0;
        }
        return 0;
    }

}

module.exports = Pose;