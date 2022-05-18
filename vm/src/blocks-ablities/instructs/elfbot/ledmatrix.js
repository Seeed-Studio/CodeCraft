const NodeInstruction = require('./node');

class LedMatrix extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x05;
    }
}

module.exports = LedMatrix;