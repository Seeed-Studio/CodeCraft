const NodeInstruction = require('./node');

class Servo extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x08;
    }

}

module.exports = Servo;