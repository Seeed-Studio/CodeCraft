const NodeInstruct = require('./node');

class Mp3Instruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x26;
        this.opt = this.slaveAddress;
    }
}


module.exports = Mp3Instruct;