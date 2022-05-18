const NodeInstruct = require('./node');


class TemHumSensorInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x0e;
        this.opt = this.slaveAddress;
    }

}


module.exports = TemHumSensorInstruct;