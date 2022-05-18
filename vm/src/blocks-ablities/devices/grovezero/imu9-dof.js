const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Imu9Dof extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.imu9Instruct;
        this.i2cList = [0x04];
        this.status = null;
        this.timer = null;
        this.isEnable = false;
        this.value = { x: 0, y: 0, z: 0 }; //加速度
        this.magneticValue = { x: 0, y: 0, z: 0 }; //磁场方向
        this.angularRateValue = { x: 0, y: 0, z: 0 }; //角速度
        this.rotationValue = { pitch: 0, roll: 0}; //旋转角度

    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                this.postIOData('imu9Dof', this.eventParser(message));
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                this.saveRawData(message);
                break;
        }
    }

    eventParser(message) {
        this.status = message[8];
        switch (this.status) {
            case 5: this.status = { OPT: 'face_up' }; break;
            case 6: this.status = { OPT: 'face_down' }; break;
            case 1: this.status = { OPT: 'straight_up' }; break;
            case 2: this.status = { OPT: 'straight_down' }; break;
            case 4: this.status = { OPT: 'tilt_left' }; break;
            case 3: this.status = { OPT: 'tilt_right' }; break;
            case 7: this.status = { OPT: 'shake' }; break;
            case 8: this.status = { OPT: 'free_fail' }; break;
        }
        return Object.assign({}, this.status);
    }

    statusIs(args) {
        if (!this.status) return false;
        return this.status.OPT === args.OPT;
    }

    saveRawData(message) {
        // 清除计时器
        clearTimeout(this.timer);
        this.timer = null;
        // 重置raw打开关闭标记
        this.isEnable = true;
        let msgType = message[2];
        
        let length = message.length;
        let value8 = 0;
        let value10 = 0;
        let value12 = 0;
        //兼容老的九轴固件，长度没有14位，不支持旋转角度积木的固件
        if (length>=14) {
            value8 = message.readInt16LE(8);
            value10 = message.readInt16LE(10);
            value12 = message.readInt16LE(12);
        }

        if (msgType === 0xD1) {//加速度
            // 设置当前value值
            this.value.x = value8;
            this.value.y = value10;
            this.value.z = value12;
        } else if (msgType === 0xD2) {//角速度
            this.angularRateValue.x = value8;
            this.angularRateValue.y = value10;
            this.angularRateValue.z = value12;
        } else if (msgType === 0xD4) {//磁场方向
            this.magneticValue.x = value8;
            this.magneticValue.y = value10;
            this.magneticValue.z = value12;
        } else if (msgType === 0xD8) {//旋转角度
            this.rotationValue.pitch = value8;
            this.rotationValue.roll = value10;
        }

        //若三秒后没收到原始数据，将isEnable设
        //为false，下次触发getValue将发送enable命令 
        this.timer = setTimeout(() => {
            this.isEnable = false;
        }, 3000);
    }

    getValue(args) {
        let direct = args.DIRECT;
        // 如果raw开关未打开
        if (!this.isEnable) {
            this.onRawData(); // 打开raw开关
        }
        switch (direct) {
            case 'x': return this.value.x;
            case 'y': return this.value.y;
            case 'z': return this.value.z
            default: return 0;
        }
    }

    getMagneticValue(args) {
        let direct = args.DIRECT;
        // 如果raw开关未打开
        if (!this.isEnable) {
            this.onRawData(); // 打开raw开关
        }
        switch (direct) {
            case 'x': return this.magneticValue.x;
            case 'y': return this.magneticValue.y;
            case 'z': return this.magneticValue.z
            case 'strength': 
                let total = Math.pow(this.magneticValue.x,2)+Math.pow(this.magneticValue.y,2)+Math.pow(this.magneticValue.z,2);
                return parseInt(Math.sqrt(total))
            default: return 0;
        }
    }

    getAngularRateValue(args) {
        let direct = args.DIRECT;
        // 如果raw开关未打开
        if (!this.isEnable) {
            this.onRawData(); // 打开raw开关
        }
        switch (direct) {
            case 'x': return this.angularRateValue.x;
            case 'y': return this.angularRateValue.y;
            case 'z': return this.angularRateValue.z
            default: return 0;
        }
    }

    getRotationValue(args) {
        let action = args.ACTION;
        // 如果raw开关未打开
        if (!this.isEnable) {
            this.onRawData(); // 打开raw开关
        }
        switch (action) {
            case '0': return this.rotationValue.pitch;
            case '1': return this.rotationValue.roll;
            default: return 0;
        }
    }

    onRawData() {
        this.execRawDataOn(90, 0xDF);
    }

}

module.exports = Imu9Dof;