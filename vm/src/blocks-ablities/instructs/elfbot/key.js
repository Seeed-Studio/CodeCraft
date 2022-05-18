const NodeInstruction = require('./node');

class Key extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x0C;
    }
}

module.exports = Key;