const NodeInstruct = require('./node');

class RgbMatrixInstruct extends NodeInstruct {

    constructor() {
        super();
        this.slaveAddress = 0x60;
        this.opt = this.slaveAddress;
    }
}

module.exports = RgbMatrixInstruct;