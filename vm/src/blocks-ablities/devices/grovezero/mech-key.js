const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');
class MechKey extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.mechKey;
        this.i2cList = [0x0F, 0x1F, 0x2F, 0x3F];
        this.mechKeys = {};
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                this.postIOData('mechKey', this.eventParser(message));
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
            case 0x01:
                return { I2C: i2c, OPT: 'click' };
            case 0x02:
                return { I2C: i2c, OPT: 'hold' };
        }
    }



    isPressed(args) {
        let i2c = args.I2C;
        i2c = parseInt(i2c);
        if (!this.mechKeys[i2c]) {
            this.mechKeys[i2c] = {
                isPressed: false,
                isEnable: false,
                timer: null
            };
        }

        // 如果raw开关未打开
        if (!this.mechKeys[i2c].isEnable) {
            this.onRawData(i2c); // 打开raw开关
        }
        return this.mechKeys[i2c].isPressed;
    }

    onRawData(i2c) {
        this.instruct.setAddress(i2c);
        this.execRawDataOn(100);
    }


    saveRawData(message) {
        let i2c = message[6];
        // 如果无mechKeys对象
        if (!this.mechKeys[i2c]) {
            return;
        }
        // 清除计时器
        clearTimeout(this.mechKeys[i2c].timer);
        // 重置raw打开关闭标记
        this.mechKeys[i2c].isEnable = true;
        this.mechKeys[i2c].isPressed = message[8] === 0x01;
        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.mechKeys[i2c].timer = setTimeout(() => {
            this.mechKeys[i2c].isEnable = false;
        }, 3000);
    }


    setRgb(args) {
        let i2c = parseInt(args.I2C);
        let color = args.COLOR;
        let r = '0x' + color.substring(1, 3);
        let g = '0x' + color.substring(3, 5);
        let b = '0x' + color.substring(5, 7);
        let birghtness = 0x31;
        let duration = 0x00;
        let data = [r, g, b, birghtness, duration];
        this.instruct.setAddress(i2c);
        this.exec(0x02, data);
    }

    close(args) {
        let i2c = parseInt(args.I2C);
        let color = '#000000';
        this.setRgb({ I2C: i2c, COLOR: color });
    }

}

module.exports = MechKey;