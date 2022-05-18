const NodeInstruct = require('./node');

class MainboardInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x20;
        this.opt = this.slaveAddress;
    }

}


module.exports = MainboardInstruct;