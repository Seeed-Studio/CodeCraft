const NodeInstruct = require('./node');

class UltrasonicSensorInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x23;
        this.opt = this.slaveAddress;
    }
}


module.exports = UltrasonicSensorInstruct;