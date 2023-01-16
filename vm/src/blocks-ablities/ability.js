const EventEmitter = require('events');
const dispatcher = require('./ability-message-dispatch');
const ReplenishPackageInstruct = require('./instructs/grovezero/replenish-package');
// raw data 指令
const RAWDATA_COMMAND = 0xD0;


class Ability extends EventEmitter {

    constructor() {
        super();
        /**
         * 指令构建对象
         */
        this.instruct = null;
        /**
         * 补充分包 指令构建对象
         */
        this.replenishPackageInstruct = new ReplenishPackageInstruct();
        /**
         * node的i2c地址
         */
        this.i2cList = [];
        /**
         * 注册response事件
         */
        dispatcher.on('response', (data) => this.onResponse(data));
        dispatcher.on('rawdata-event', (data) => this.handleRawDataEvent(data))
    }

    static get EVENT_WRITE() { return 'wirte' }
    static get EVENT_POST_IODATA() { return 'event_post' }

    static get RAWDATA_ON() { return 0x01 }
    static get RAWDATA_OFF() { return 0x00 }

    /**
     * msg不属于该node
     */
    static get BELONG_THIS_MSG_TYPE_NOT() {
        return 'BELONG_THIS_MSG_TYPE_NOT';
    }
    /**
     * msg为event
     */
    static get BELONG_THIS_MSG_TYPE_EVENT() {
        return 'BELONG_THIS_MSG_TYPE_EVENT';
    }
    /**
     * msg为raw data
     */
    static get BELONG_THIS_MSG_TYPE_RAWDATA() {
        return 'BELONG_THIS_MSG_TYPE_RAWDATA';
    }
    /**
     * 数据上报检测间隔
     */
    static get REPORT_CHECK_TIME_INTERVAL() {
        return 3000;
    }

    handleRawDataEvent(data) {
    }
    /**
     * 高低位数值换算
     * @param {*} num 
     */
    _numberoperate(num) {
        let _hight = (num & 0xFF00) >> 8;
        let _low = num & 0x00FF;
        let _result = [_low, _hight];
        return _result;
    }

    /**
     * 执行命令
     * @param {*} command 
     * @param {*} params 
     */
    exec(command, params) {
        if (!this.instruct) return;
        this.emit(Ability.EVENT_WRITE, this.instruct.createInstruction(command, params));
    }

    execPyApi(cmd) {
        this.emit(Ability.EVENT_WRITE, cmd);
    }

    /**
     * 执行拼接命令
     * @param {*} command 
     * @param {*} pos 
     * @param {*} params 
     */
    execSpell(command, pos, params) {
        if (!this.instruct) return;
        if (!this.instruct.spellInstruction) return;
        this.emit(Ability.EVENT_WRITE, this.instruct.spellInstruction(command, pos, params));
    }

    /**
     * 打开rawdata上报
     * @param {*} command 
     */
    execRawDataOn(mills, cmd = 0xD0) {
        if (!this.instruct) return;
        const duration = this._numberoperate(mills);
        const args = [Ability.RAWDATA_ON].concat(duration);
        this.emit(Ability.EVENT_WRITE, this.instruct.createInstruction(cmd, args));
    }

    /**
     * 关闭rawdata上报
     * @param {*} command 
     */
    execRawDataOff(mills, cmd = 0xD0) {
        if (!this.instruct) return;
        const duration = this._numberoperate(mills);
        const args = [Ability.RAWDATA_OFF].concat(duration);
        this.emit(Ability.EVENT_WRITE, this.instruct.createInstruction(cmd, args));
    }

    /**
     * vm io 回调
     * 
     * @param {*} _io 
     * @param {*} _data 
     */
    postIOData(_io, _data) {
        this.emit(Ability.EVENT_POST_IODATA, {
            io: _io,
            data: _data
        });
    }


    /**
     * 下位机上报数据
     * 响应接口
     * @param {*} event 
     * @param {*} message 
     */
    onResponse(message) {

    }

    /**
     * 用于判断message是否属于该node
     * @param {*} _i2c 
     */
    isThisMsg(_i2c) {
        for (let x = 0, i2c; i2c = this.i2cList[x]; x++) {
            if (_i2c === i2c) {
                return true;
            }
        }
        return false;
    }

    /**
     * 解析数据类型 
     * @param {*} msg 
     */
    getBelongThisMsgType(msg) {
        let i2c = msg[6];
        if (!this.isThisMsg(i2c)) {
            return Ability.BELONG_THIS_MSG_TYPE_NOT;
        }

        let msgType = msg[2];


        if (msgType === 0x0E) {
            return Ability.BELONG_THIS_MSG_TYPE_EVENT;
        }

        if ((msgType & 0xF0) === 0xD0) {
            return Ability.BELONG_THIS_MSG_TYPE_RAWDATA;
        }

        return Ability.BELONG_THIS_MSG_TYPE_NOT;
    }

    /**
     * 补充分包
     */
    execReplenishPackage(i2c, params, id = 1) {
        this.replenishPackageInstruct.setPackageId(id);
        this.replenishPackageInstruct.setAddress(i2c);
        id++;
        setTimeout((() => {
            if (params.length <= 7) {
                this.emit(Ability.EVENT_WRITE, this.replenishPackageInstruct.createInstruction(0x41, params));
                return;
            }
            let thisSendParams = params.slice(0, 7);
            let lastSendParams = params.slice(7);
            this.emit(Ability.EVENT_WRITE, this.replenishPackageInstruct.createInstruction(0x41, thisSendParams));
            this.execReplenishPackage(i2c, lastSendParams, id);

        }).bind(this), 0);

    }



}

module.exports = Ability;