const NodeInstruct = require('./node');


class MiniWheelInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x28;
        this.opt = this.slaveAddress;
    }
}

module.exports = MiniWheelInstruct;