/**
 * Instruct
 * 指令构造抽象
 */
class NodeInstruct {
    constructor() {

        // 主控 参数字段 0-3
        this.len = null;
        this.type = 0xc3;
        this.cmd = 0x40;
        this.opt = null;


        // i2c 参数字段 4-7
        this.lenOfI2CEvt = null;
        this.idOfCaller = 0xfe;
        this.i2cIntruction = null;
        this.slaveAddress = null;

    }

    setAddress(address) {
        this.slaveAddress = address;
        this.opt = address;
    }

    createInstruction(i2cIntruction, parameters = []) {
        let parametersLength = parameters.length;
        this.setLen(parametersLength);
        this.setLenOfI2CEvt(parametersLength);
        this.setI2CIntruction(i2cIntruction);
        let intructionArray = [
            this.len,
            this.type,
            this.cmd,
            this.opt,
            this.lenOfI2CEvt,
            this.i2cIntruction,
            this.slaveAddress,
            this.idOfCaller
        ]
        return intructionArray.concat(parameters);
    }


    setLenOfI2CEvt(parametersLength) {
        this.lenOfI2CEvt = 0x40 + 4 + parametersLength;
    }

    setI2CIntruction(i2cIntruction) {
        this.i2cIntruction = i2cIntruction;
    }

    setSlaveAddress(slaveAddress) {
        this.slaveAddress = slaveAddress;
    }

    setLen(parametersLength) {
        this.len = 8 + parametersLength;
    }

    setOpt(opt) {
        this.opt = opt;
    }
}

module.exports = NodeInstruct;