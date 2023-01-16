const NodeInstruct = require('./node');

class ReplenishPackageInstruct extends NodeInstruct {
    constructor() {
        super();
        this.slaveAddress = 0x26;
        this.opt = this.slaveAddress;
    }

    setPackageId(id) {
        this.idOfCaller = id;
    }

}

module.exports = ReplenishPackageInstruct;