const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');
const Color = require('../../../util/color');

class ColorLineFollower extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.colorLineFollower;
        this.i2cList = [0x27];
        this.timer = null;
        this.isEnable = false;
        this.status = {
            color: null,
            position: null,
            colorValue: null,
        }
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


    saveRawData(message) {
        // 清除计时器
        clearTimeout(this.timer);
        this.timer = null;
        // 重置raw打开关闭标记
        this.isEnable = true;

        this.status.color = message[8];
        this.status.position = message[9];
        this.status.colorValue = {
            r: message[10],
            g: message[11],
            b: message[12],
        };

        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.timer = setTimeout(() => {
            this.isEnable = false;
        }, 3000);
    }

    isColor(args) {
        let color = args.COLOR;
        // 如果raw开关未打开
        if (!this.isEnable) {
            this.onRawData(); // 打开raw开关
        }
        switch (this.status.color) {
            case 2:
                return 'red' === color;
            case 3:
                return 'green' === color;
            case 4:
                return 'blue' === color;
            case 1:
                return 'black' === color;
            case 5:
                return 'white' === color;
        }
    }

    isPosition(args) {
        let position = args.POSITION;
        // 如果raw开关未打开
        if (!this.isEnable) {
            this.onRawData(); // 打开raw开关
        }

        switch (this.status.position) {
            case 1:
                return 'middle' === position;
            case 5:
                return 'right' === position;
            case 6:
                return 'right-most' === position;
            case 3:
                return 'left' === position;
            case 4:
                return 'left-most' === position;
            case 2:
                return 'lost' === position;
        }

    }


    getColor() {
        // 如果raw开关未打开
        if (!this.isEnable) {
            this.onRawData(); // 打开raw开关
        }

        return Color.rgbToHex(this.status.colorValue);
    }



    onRawData() {
        this.execRawDataOn(110);
    }





}

module.exports = ColorLineFollower;