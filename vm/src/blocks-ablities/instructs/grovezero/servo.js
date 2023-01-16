const NodeInstruct = require('./node');


class ServoInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x24;
        this.opt = this.slaveAddress;
    }

}

module.exports= ServoInstruct;