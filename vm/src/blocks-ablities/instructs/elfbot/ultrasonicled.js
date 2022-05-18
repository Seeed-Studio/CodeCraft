const NodeInstruction = require('./node');

class Ultrasonicled extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x07;
    }

}

module.exports = Ultrasonicled;