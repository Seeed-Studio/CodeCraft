const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class TwinButton extends Ability {
    constructor() {
        super();
        this.i2cList = [0x10, 0x18, 0x30, 0x38];
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                this.postIOData('knob', this.eventParser(message));
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                this.saveRawData(message);
                break;
        }
    }

    eventParser(message) {
        let status = message[8];
        let i2c = message[6].toString(16).toUpperCase();
        i2c = '0x00'.slice(0, 4 - i2c.length) + i2c;
        switch (status) {
            case 0x01:
                return { I2C: i2c, CONTROL_OPT: 'clockwise' };
            case 0x02:
                return { I2C: i2c, CONTROL_OPT: 'anticlockwise' };
            case 0x03:
                return { I2C: i2c, CONTROL_OPT: 'click' };
        }
    }

}

module.exports = TwinButton;