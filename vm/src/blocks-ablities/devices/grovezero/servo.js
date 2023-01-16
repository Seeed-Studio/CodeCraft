const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Servo extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.servo;
    }

    turnAngle(args) {
        let angle = args.ANGLE;
        if (angle < 0) {
            angle = 0;
        } else if (angle > 180) {
            angle = 180;
        }
        let cmd = 0x90;
        angle = this._numberoperate(angle);
        this.exec(cmd, angle);
    }

}

module.exports = Servo;