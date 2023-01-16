const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class TwinButton extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.fourDigitDisplay;
        this.i2cList = [0x22];
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                this.postIOData('fourDigitDisplay');
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                break;
        }
    }

    startCountdown(args) {
        let value = parseInt(args.VALUE);
        value = this._numberoperate(value);
        this.exec(0x91, value);
    }

    showNumber(args) {
        let value = parseInt(args.VALUE);
        if (value > 9999) {
            value = 9999;
        }
        if (value < -999) {
            value = -999;
        }
        value = this._numberoperate(value);
        this.exec(0x90, value);
    }

    off(args) {
        this.exec(0x92, [0x05]);
    }

    setBrightness(args) {
        let value = parseInt(args.BRIGHTNESS);
        if (value <= 0) {
            value = [0];
        }
        else {
            value -= 1;
            value = parseInt(value / 14 + 1);
            if (value > 7) value = 7;
        }
        value = this._numberoperate(value);
        this.exec(0x0B, value);
    }



}

module.exports = TwinButton;