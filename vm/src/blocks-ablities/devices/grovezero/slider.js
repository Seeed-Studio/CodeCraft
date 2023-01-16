const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Slider extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.slider;
        this.i2cList = [0x21, 0x2A, 0x2B, 0x2C];
        this.sliderValues = {};
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
        let i2c = parseInt(args.I2C);
        if (!this.sliderValues[i2c]) {
            this.sliderValues[i2c] = {
                value: 0,
                isEnable: false,
                timer: null
            };
        }
        this.onRawData(i2c);
        return this.sliderValues[i2c].value;
    }


    onRawData(i2c) {
        // 如果raw开关未打开
        if (!this.sliderValues[i2c].isEnable) {
            this.instruct.setAddress(i2c);
            this.execRawDataOn(160);
        }

    }


    saveRawData(message) {
        let i2c = message[6];
        // 如果无sliderValues对象
        if (!this.sliderValues[i2c]) {
            return;
        }
        // 清除计时器
        clearTimeout(this.sliderValues[i2c].timer);
        // 重置raw打开关闭标记
        this.sliderValues[i2c].isEnable = true;

        this.sliderValues[i2c].value = message.readUInt16LE(8);

        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.sliderValues[i2c].timer = setTimeout(() => {
            this.sliderValues[i2c].isEnable = false;
        }, 3000);
    }


}

module.exports = Slider;