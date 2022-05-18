const NodeInstruction = require('./node');

class Light extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x03;
    }
}

module.exports = Light;