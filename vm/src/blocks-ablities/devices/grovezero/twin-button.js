const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class TwinButton extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.twinButton;
        this.i2cList = [0x02, 0x1a, 0x12, 0x0a];
        this.buttons = {};
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                this.postIOData('twinButton', this.eventParser(message));
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                this.saveRawData(message);
                break;
        }
    }

    eventParser(message) {
        let status = message[8];
        let i2c = message[6].toString(16).toUpperCase();
        i2c = '0x00'.slice(0, 4 - i2c.length) + i2c;
        switch (status) {
            case 1:
                return { I2C: i2c, KEY: 'A', OPT: 'click' };
            case 2:
                return { I2C: i2c, KEY: 'A', OPT: 'double click' };
            case 3:
                return { I2C: i2c, KEY: 'A', OPT: 'hold' };
            case 4:
                return { I2C: i2c, KEY: 'B', OPT: 'click' };
            case 5:
                return { I2C: i2c, KEY: 'B', OPT: 'double click' };
            case 6:
                return { I2C: i2c, KEY: 'B', OPT: 'hold' };
            case 7:
                return { I2C: i2c, KEY: 'AB', OPT: 'click' };
            case 8:
                return { I2C: i2c, KEY: 'AB', OPT: 'double click' };
            case 9:
                return { I2C: i2c, KEY: 'AB', OPT: 'hold' };
        }
    }



    isPressed(args) {
        let i2c = args.I2C;
        let key = args.KEY;
        i2c = parseInt(i2c);
        if (!this.buttons[i2c]) {
            this.buttons[i2c] = {
                isPressed: null,
                isEnable: false,
                timer: null
            };
        }

        // 如果raw开关未打开
        if (!this.buttons[i2c].isEnable) {
            this.onRawData(i2c); // 打开raw开关
        }
        return this.buttons[i2c].isPressed === key;
    }

    onRawData(i2c) {
        this.instruct.setAddress(i2c);
        this.execRawDataOn(160);
    }


    saveRawData(message) {
        let i2c = message[6];
        // 如果无buttons对象
        if (!this.buttons[i2c]) {
            return;
        }
        // 清除计时器
        clearTimeout(this.buttons[i2c].timer);
        // 重置raw打开关闭标记
        this.buttons[i2c].isEnable = true;
        // 获取被按下key
        let key = null;
        switch (message[8]) {
            case 0x0A: key = 'A'; break;
            case 0x0B: key = 'B'; break;
            case 0x0C: key = 'AB'; break;
        }
        this.buttons[i2c].isPressed = key;
        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.buttons[i2c].timer = setTimeout(() => {
            this.buttons[i2c].isEnable = false;
        }, 3000);
    }


}

module.exports = TwinButton;