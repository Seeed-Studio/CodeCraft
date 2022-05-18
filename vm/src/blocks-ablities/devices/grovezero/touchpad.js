const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Touchpad extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.touchpad;
        this.i2cList = [0x34, 0x35, 0x36, 0x37];
        this.touchpads = {};
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                this.postIOData('touchpad', this.eventParser(message));
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                this.saveRawData(message);
                break;
        }
    }

    eventParser(message) {
        let key = message[8];
        let i2c = message[6].toString(16).toUpperCase();
        i2c = '0x00'.slice(0, 4 - i2c.length) + i2c;
        switch (key) {
            case 0x01: key = 1; break;
            case 0x02: key = 2; break;
            case 0x04: key = 3; break;
            case 0x08: key = 4; break;
        }
        key = key.toString();
        return { I2C: i2c, NUM_OPT: key };
    }



    isPressed(args) {
        let i2c = args.I2C;
        let key = args.NUM_OPT;
        i2c = parseInt(i2c);
        if (!this.touchpads[i2c]) {
            this.touchpads[i2c] = {
                isPressed: null,
                isEnable: false,
                timer: null
            };
        }

        // 如果raw开关未打开
        if (!this.touchpads[i2c].isEnable) {
            this.onRawData(i2c); // 打开raw开关
        }
        return this.touchpads[i2c].isPressed === key;
    }

    onRawData(i2c) {
        this.instruct.setAddress(i2c);
        this.execRawDataOn(100);
    }


    saveRawData(message) {
        let i2c = message[6];

        if (!this.touchpads[i2c]) {
            return;
        }

        // 清除计时器
        clearTimeout(this.touchpads[i2c].timer);
        // 重置raw打开关闭标记
        this.touchpads[i2c].isEnable = true;
        // 获取被按下key
        let key = null;
        switch (message[8]) {
            case 0x01: key = '1'; break;
            case 0x02: key = '2'; break;
            case 0x04: key = '3'; break;
            case 0x08: key = '4'; break;
        }
        this.touchpads[i2c].isPressed = key;
        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.touchpads[i2c].timer = setTimeout(() => {
            this.touchpads[i2c].isEnable = false;
        }, 3000);
    }


}

module.exports = Touchpad;