const NodeInstruct = require('./node');


class LedMatrixInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x07;
        this.opt = this.slaveAddress;
    }
}

module.exports = LedMatrixInstruct;