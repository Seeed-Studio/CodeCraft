const NodeInstruction = require('./node');

class Linepatrol extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x04;
    }
}

module.exports = Linepatrol;