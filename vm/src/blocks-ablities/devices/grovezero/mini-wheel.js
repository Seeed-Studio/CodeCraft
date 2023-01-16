const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class MiniWheel extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.miniWheel;
    }

    run(args) {
        let velocity = args.VELOCITY;
        let azimuth = args.AZIMUTH;
        let v = 120;
        switch (velocity) {
            case 'low': v = 120; break;
            case 'medium': v = 170; break;
            case 'high': v = 255; break;
        }
        let leftPower = 0; let rightPower = 0;
        switch (azimuth) {
            case 'forward':
                leftPower = v; rightPower = v;
                break;
            case 'backward':
                leftPower = -v; rightPower = -v;
                break;
            case 'left':
                leftPower = 16; rightPower = v;
                break;
            case 'right':
                rightPower = 16; leftPower = v;
                break;
            case 'clockwise':
                leftPower = v; rightPower = -v;
                break;
            case 'counterclockwise':
                leftPower = -v; rightPower = v;
                break;
        }
        this.setPower(leftPower, rightPower);
    }

    setPowerAtRate(args) {
        let leftPower = args.LEFT_POWER;
        let rightPower = args.RIGHT_POWER;
        leftPower = this.rateToPower(leftPower);
        rightPower = this.rateToPower(rightPower);
        this.setPower(leftPower, rightPower);
    }

    stop() {
        this.setPower(0, 0);
    }

    rateToPower(rate) {
        rate = parseInt(rate);
        if (Math.abs(rate) > 100) {
            return rate > 0 ? 255 : -255;
        }

        if (rate === 0) {
            return 16;
        }

        if (rate > 0) {
            return parseInt(175 * rate / 100 + 80);
        }
        else {
            return parseInt(175 * rate / 100 - 80);
        }
    }


    /**
     * 动力
     * XXXX(16~255 -255~-16)
     */
    setPower(leftPower, rightPower) {
        leftPower = this._numberoperate(leftPower);
        rightPower = this._numberoperate(rightPower);
        let cmd = 0x90;
        let params = leftPower.concat(rightPower);
        this.exec(cmd, params);
    }



}

module.exports = MiniWheel;