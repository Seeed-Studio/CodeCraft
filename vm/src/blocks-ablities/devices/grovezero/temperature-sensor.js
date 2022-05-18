const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class TemperatureSensor extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.temperatureSensor;
        this.i2cList = [0x03];
        this.value = 0;
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

    getValue(args) {

        // 如果raw开关未打开
        if (!this.isEnable) {
            this.execRawDataOn(300);
        }

        return args.UNIT === 'F' ? this.value * 1.8 + 32 : this.value;
    }

    saveRawData(message) {
        // 清除计时器
        clearTimeout(this.timer);
        this.timer = null;
        // 重置raw打开关闭标记
        this.isEnable = true;

        this.value = message.readUInt16LE(8);

        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.timer = setTimeout(() => {
            this.isEnable = false;
        }, 3000);
    }


}

module.exports = TemperatureSensor;