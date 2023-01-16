const NodeInstruct = require('./node');


class TwinButtonInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x02;
        this.opt = this.slaveAddress;
    }
    
}

module.exports = TwinButtonInstruct;