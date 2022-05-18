const NodeInstruct = require('./node');


class TouchpadInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x37;
        this.opt = this.slaveAddress;
    }
}

module.exports = TouchpadInstruct;