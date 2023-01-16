const NodeInstruct = require('./node');

class LightSensorInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x05;
        this.opt = this.slaveAddress;
    }
}


module.exports = LightSensorInstruct;