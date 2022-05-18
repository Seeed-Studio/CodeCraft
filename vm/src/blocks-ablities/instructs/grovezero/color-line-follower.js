const NodeInstruct = require('./node');

class ColorLineFollowerInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x27;
        this.opt = this.slaveAddress;
    }
}


module.exports = ColorLineFollowerInstruct;