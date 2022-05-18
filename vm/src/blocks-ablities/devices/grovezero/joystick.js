const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Joystick extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.joystick;
        this.i2cList = [0x31, 0x3a, 0x3b, 0x3c];
        this.joysticks = {};
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

    isPushedTo(args) {
        let i2c = args.I2C;
        let direct = args.DIRECT;
        i2c = parseInt(i2c);
        direct = parseInt(direct);
        if (!this.joysticks[i2c]) {
            this.joysticks[i2c] = {
                xPostion: 0,
                yPostion: 0,
                isEnable: false,
                timer: null
            };
        }
        this.onRawData(i2c);

        let xPostion = this.joysticks[i2c].xPostion;
        let yPostion = this.joysticks[i2c].yPostion;

        let location = 0;
        if (xPostion<300) {
            location = 1;
        }else if (xPostion>=300&&xPostion<=724) {
            location = 4;
        }else if (xPostion>724) {
            location = 7;
        }
        if (yPostion<300) {
            location += 0;
        }else if (yPostion>=300&&yPostion<=724) {
            location += 1;
        }else if (yPostion>724) {
            location += 2;
        }

        //位置转换为积木上显示的位置
        if (location==1) {
            location=7;
        }else if (location==2) {
            location=4;
        }else if (location==3) {
            location=1;
        }else if (location==4) {
            location=8;
        }else if (location==6) {
            location=2;
        }else if (location==7) {
            location=9;
        }else if (location==8) {
            location=6;
        }else if (location==9) {
            location=3;
        }
        return location === direct;
    }

    getPosition(args) {
        let i2c = parseInt(args.I2C);
        let direct = args.DIRECT;
        if (!this.joysticks[i2c]) {
            this.joysticks[i2c] = {
                xPostion: 0,
                yPostion: 0,
                isEnable: false,
                timer: null
            };
        }
        this.onRawData(i2c);
        let postion = 0;
        if (direct == 'x') {
            postion = this.joysticks[i2c].xPostion
        }else if (direct == 'y') {
            postion = this.joysticks[i2c].yPostion
        }
        return postion;
    }

    onRawData(i2c) {
        // 如果raw开关未打开
        if (!this.joysticks[i2c].isEnable) {
            this.instruct.setAddress(i2c);
            this.execRawDataOn(100);
        }
    }

    saveRawData(message) {
        let i2c = message[6];
        if (!this.joysticks[i2c]) {
            return;
        }
        // 清除计时器
        clearTimeout(this.joysticks[i2c].timer);
        // 重置raw打开关闭标记
        this.joysticks[i2c].isEnable = true;

        let xPostion =  message[9]*256 + message[8];
        let yPostion =  message[11]*256 + message[10];

        this.joysticks[i2c].xPostion = xPostion;
        this.joysticks[i2c].yPostion = yPostion;

        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.joysticks[i2c].timer = setTimeout(() => {
            this.joysticks[i2c].isEnable = false;
        }, 3000);
    }

}

module.exports = Joystick;