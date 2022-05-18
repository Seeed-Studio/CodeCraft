const NodeInstruct = require('./node');

class SliderInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x21;
        this.opt = this.slaveAddress;
    }
}


module.exports = SliderInstruct;