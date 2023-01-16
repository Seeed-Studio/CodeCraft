const NodeInstruct = require('./node');


class JoystickInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x31;
        this.opt = this.slaveAddress;
    }
}

module.exports = JoystickInstruct;