const NodeInstruct = require('./node');

class SoundSensorInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x06;
        this.opt = this.slaveAddress;
    }
}


module.exports = SoundSensorInstruct;