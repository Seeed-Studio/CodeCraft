const { sleep } = require('../../../../util/async-util');
//主控通讯类型
const MODE_COMMUNICATION_DONGLE = 0;
const MODE_COMMUNICATION_SERIAL = 1;

class MainControl {

    constructor(dongle) {

        /**
         * 主控名字
         */
        this.name = '';
        /**
         * 重启标记
         */
        this.resetFlag = '';

        this.onResult = this.onResult.bind(this);
        this.setVersion = this.setVersion.bind(this);
        this.onDeviceDisconnect = this.onDeviceDisconnect.bind(this);
        this.onResponseMessage = this.onResponseMessage.bind(this);

        /**
         * 实例化dongle对象
         */
        this._context = dongle;
        this._context.on('control-burn-resp', this.onResult);
        this._context.on('control-version-resp', this.setVersion);
        this._context.on('device-disconnect', this.onDeviceDisconnect);
        this._context.on('response', this.onResponseMessage);

        /**
         * 当前通讯模式
         */
        this.communicateMode = dongle.mode;
        /**
         * 主控版本
         */
        this.version = {};
        /**
         * 主控固件版本
         */
        this.firmwareVer = {};
        /**
         * sendblock count
         */
        this.sendDataNo = 0;
        /**
         * 执行状态
         */
        this.execStatus = MainControl.EXEC_STATUS_IDLE;
    }
    /**
     * 上传
     */
    upload(code, reslove, reject) { }
    /**
     * 升级
     */
    upgrade(reslove, reject) { }
    /**
     * 烧录结果
     * @param {*} result 
     */
    onResult(result) {
        this.sendDataNo = 0;
    }
    /**
     * 设置当前主控版本号
     * @param {*} _ver 
     */
    setVersion(_ver) { this.version = _ver }
    /**
     * 设备断开事件
     */
    onDeviceDisconnect() { }

    /**
     * 数据上报
     * @param {*} data 
     */
    onResponseMessage(data){ }

    /**
     * 判断是否需要升级？
     */
    isUpgrade() { return false }

    /**
     * 初始状态
     */
    static get EXEC_STATUS_IDLE() { return 0 }
    /**
     * 上传状态
     */
    static get EXEC_STATUS_CODE() { return 1 }
    /**
     * 烧录状态
     */
    static get EXEC_STATUS_UPGRADE() { return 3 }

    /**
     * 往下位机发送数据
     * @param {*} data 
     */
    async _sendToLowerComputer(data) {
        let block4kCount = Math.ceil(data.buf.length / 16 / 256);
        for (let i = 0; i < block4kCount; i++) {
            if (i === block4kCount - 1) {
                let tailRowCount = data.buf.length / 16 - i * 256;
                await this._send4kBlock(data, tailRowCount, i);
                await this._sendEnd(tailRowCount);
            } else {
                await this._send4kBlock(data, 256, i);
            }
        }
    }

    /**
     * 发送4k块
     */
    async _send4kBlock(data, rowCount, block4kNum) {
        console.log('_send4kBlock---------------');
        let beginPosition = block4kNum * 256;
        let baseAddr = data.addrList[beginPosition];
        await this._sendStart(baseAddr);
        for (let i = 0; i < rowCount; i++) {
            await this._sendData(data.buf, i + beginPosition);
        }
        try {
            // 获取烧录结果
            let burnResult = await this._context.queryBurn4K(rowCount);
            let {
                errCount,
                missData
            } = burnResult;
            // 烧录失败
            if (errCount > 0) {
                // 重试烧录
                await this.trySendMissed4kBlock(data, rowCount, block4kNum, missData);
            }
        } catch (error) {
            // 失败不处理
            console.log('queryBurn4K------ error ---------');
        }
    }

    /**
     * 重试烧录
     * @param {*} data 
     * @param {*} rowCount 
     * @param {*} block4kNum 
     * @param {*} burnResult 
     */
    async trySendMissed4kBlock(data, rowCount, block4kNum, lostData){
        let tryCount = 3;
        // 尝试烧录3次
        for (let index = 0; index < tryCount; tryCount++) {
            // 补充丢掉的数据
            let beginPosition = block4kNum * 256;
            for (let i = 0; i < lostData.length; i++) {
                const itemIndex = lostData[i];
                await this._sendData(data.buf, itemIndex + beginPosition);
            }
            try {
                // 获取烧录结果
                let burnResult = await this._context.queryBurn4K(rowCount);
                let {
                    errCount
                } = burnResult;
                if(errCount === 0){
                    console.log('try send datas succ');  
                    break;
                }else{
                    console.log('try send datas fail');  
                    continue;
                }
            } catch (error) {
                // 失败不处理
            } 
        }
    }

    /**
     * 0x96 (dongle): 0x16
     * RAM编程数据, 上位机 -> BLE主控
     * LEN(0x14) + TYPE(0xA5) + CMD(0x16) + OPT(块号) + 数据(16B)
     * 块号,0-255,每块表示16B的数据,256个块 = 4KB
     */
    async _sendData(hexBuf, n) {
        // 发送Data
        let headBuf = Buffer.from([0x14, 0xA5, 0x16, n]);
        let dataBuf = hexBuf.slice(n * 16, (n + 1) * 16);
        let writeBuf = Buffer.concat([headBuf, dataBuf]);
        this._context.write(writeBuf);
        this.sendDataNo++; // 计时变量
        // MODE_COMMUNICATION_DONGLE 模式下延时 100
        if (this.communicateMode === MODE_COMMUNICATION_DONGLE) {
            if (this.sendDataNo % 4 === 0) {
                this.sendDataNo = 0;
                await sleep(100);
            }
        }
    }

    /**
     * 0x10
     * 编程开始, 上位机 -> BLE主控
     * LEN(0x08) + TYPE(0xA5) + CMD(0x10) + OPT(0xFF) + 参数(4B,编程地址)
     * @param {*} baseAddr 
     */
    async _sendStart(baseAddr) {
        let writeBuf = Buffer.from([0x08, 0xA5, 0x10, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
        writeBuf.writeUInt32LE(baseAddr, 4);
        this._context.write(writeBuf);
        await sleep(500);
    }

    /**
     * 0x97 (dongle) : 0x17
     * RAM数据结束, 上位机 -> BLE主控
     * LEN(0x08) + TYPE(0xA5) + CMD(0x17) + OPT(块数)
     * @param {*} block4kCount 
     */
    async _sendEnd(block4kCount) {
        this._context.write([0x04, 0xA5, 0x17, block4kCount]);
        await sleep(500);
    }

    /**
     * 释放资源
     */
    release() {
        this._context.removeListener('control-burn-resp', this.onResult);
        this._context.removeListener('control-version-resp', this.setVersion);
        this._context.removeListener('device-disconnect', this.onDeviceDisconnect);
        this._context.removeListener('response', this.onResponseMessage);

        this._context = null;
        this.execStatus = MainControl.EXEC_STATUS_IDLE;
    }

}

module.exports = MainControl;