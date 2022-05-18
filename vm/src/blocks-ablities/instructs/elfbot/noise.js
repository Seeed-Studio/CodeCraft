const NodeInstruction = require('./node');

class Noise extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x0B;
    }

}

module.exports = Noise;