const NodeInstruct = require('./node');

class Imu9DofInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x04;
        this.opt = this.slaveAddress;
    }

}


module.exports = Imu9DofInstruct;