const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Imu9Dof extends Ability {
    constructor() {
        super();
        // this.instruct = instructs.grovezero.imu9Instruct;
        this.i2cList = [0x0c];
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                this.postIOData('gestureSensor', this.eventParser(message));
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                this.saveRawData(message);
                break;
        }
    }

    eventParser(message) {
        let status = message[8];
        switch (status) {
            case 0x02: status = { CONTROL_OPT: 'swipe_left' }; break;
            case 0x01: status = { CONTROL_OPT: 'swipe_right' }; break;
            case 0x03: status = { CONTROL_OPT: 'swipe_up' }; break;
            case 0x04: status = { CONTROL_OPT: 'swipe_down' }; break;
            case 0x05: status = { CONTROL_OPT: 'approaching' }; break;
            case 0x06: status = { CONTROL_OPT: 'departing' }; break;
            case 0x07: status = { CONTROL_OPT: 'circle_clockwise' }; break;
            case 0x08: status = { CONTROL_OPT: 'circle_anticlockwise' }; break;
            case 0x09: status = { CONTROL_OPT: 'finger_waving' }; break;
        }
        return status;
    }
}

module.exports = Imu9Dof;