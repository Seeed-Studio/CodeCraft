const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class DcMotor extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.dcMotor;
    }

    turnPower(args) {
        let motorNo = args.MOTOR_NO;
        let power = args.POWER;
        power = this.rateToPower(power);
        power = this._numberoperate(power);
        // let duration = this._numberoperate(1000);
        // let params = power.concat(duration);
        this.exec(motorNo, power);

    }

    rateToPower(rate) {
        rate = parseInt(rate);
        if (Math.abs(rate) > 100) {
            return rate > 0 ? 100 : -100;
        }

        if (rate === 0) {
            return 0;
        }

        if (rate > 0) {
            return parseInt(70 * rate / 100 + 30);
        }
        else {
            return parseInt(70 * rate / 100 - 30);
        }
    }

    stop(args) {
        let motorNo = args.MOTOR_NO;
        let power = this._numberoperate(0);
        this.exec(motorNo, power);
    }



}

module.exports = DcMotor;