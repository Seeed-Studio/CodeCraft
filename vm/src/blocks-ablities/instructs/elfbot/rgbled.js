const NodeInstruction = require('./node');

class Rgbled extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x06;
    }

}

module.exports = Rgbled;