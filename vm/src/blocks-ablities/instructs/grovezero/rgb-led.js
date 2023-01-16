const NodeInstruct = require('./node');

class RgbLedInstruct extends NodeInstruct {

    constructor() {
        super();
        this.slaveAddress = 0x0B;
        this.opt = this.slaveAddress;
    }

}

module.exports = RgbLedInstruct;