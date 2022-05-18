const NodeInstruction = require('./node');

class Infrared extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x01;
    }
}

module.exports = Infrared;