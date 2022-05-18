const NodeInstruct = require('./node');

class TemperatureSensorInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x03;
        this.opt = this.slaveAddress;
    }
}


module.exports = TemperatureSensorInstruct;