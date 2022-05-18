const NodeInstruct = require('./node');

class BuzzerInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x08;
        this.opt = this.slaveAddress;
    }
}


module.exports = BuzzerInstruct;