
const NodeInstruct = require('./node');

class FourDigitDisplayInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x22;
        this.opt = this.slaveAddress;
    }
}

module.exports = FourDigitDisplayInstruct;