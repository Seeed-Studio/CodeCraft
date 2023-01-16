const NodeInstruct = require('./node');


class MechKeyInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x0F;
        this.opt = this.slaveAddress;
    }
}

module.exports = MechKeyInstruct;