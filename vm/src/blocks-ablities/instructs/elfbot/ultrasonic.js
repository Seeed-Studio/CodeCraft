const NodeInstruction = require('./node');

class Ultrasonic extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x02;
    }

}

module.exports = Ultrasonic;