const NodeInstruct = require('./node');

class DcMotorInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x29;
        this.opt = this.slaveAddress;
    }
}


module.exports = DcMotorInstruct;