const NodeInstruction = require('./node');

class Loudspeaker extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x0A;
    }

}

module.exports = Loudspeaker;