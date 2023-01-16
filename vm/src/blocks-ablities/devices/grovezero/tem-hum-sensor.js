const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class TemHumSensor extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.temHumSensor;
        this.i2cList = [0x0e];
        this.humldyValue = 0;
        this.temperatureValue = 0;
        this.timer = null;
        this.isEnable = false;
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                this.saveRawData(message);
                break;
        }
    }

    onRawData() {
        // 如果raw开关未打开
        if (!this.isEnable) {
            this.execRawDataOn(300);
        }
    }

    getTemValue(args) {
        this.onRawData();
        return args.UNIT === 'F' ? this.temperatureValue * 1.8 + 32 : this.temperatureValue;
    }


    getHumValue() {
        this.onRawData();
        return this.humldyValue;
    }

    saveRawData(message) {
        // 清除计时器
        clearTimeout(this.timer);
        this.timer = null;
        // 重置raw打开关闭标记
        this.isEnable = true;

        this.humldyValue = message.readUInt16LE(8);

        let intPart = message.readUInt8(10);
        let floatPart = message.readUInt8(11) / 10;
        let a = floatPart & 0b10000000;
        let b = floatPart & 0b01111111;
        if (b === 1) {
            this.temperatureValue = -(intPart + floatPart);
        } else {
            this.temperatureValue = intPart + floatPart;
        }

        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.timer = setTimeout(() => {
            this.isEnable = false;
        }, 3000);
    }


}

module.exports = TemHumSensor;