const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class PirMotionSensor extends Ability {
    constructor() {
        super();
        this.i2cList = [0x09];
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                if (message[8] === 0x01)
                    this.postIOData('pirMotionSensor');
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                this.saveRawData(message);
                break;
        }
    }
}

module.exports = PirMotionSensor;