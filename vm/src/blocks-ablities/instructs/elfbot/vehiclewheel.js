const NodeInstruction = require('./node');

class VehicleWheel extends NodeInstruction {
    constructor() {
        super();
        this.address = 0x09;
    }

}

module.exports = VehicleWheel;