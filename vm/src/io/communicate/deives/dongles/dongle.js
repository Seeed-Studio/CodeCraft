const Device = require('../device')
const donglehex = require('../../hex/dongle/dongle')

const {
    CMC_DEVICE_UNKNOWN,
    CMC_DEVICE_GROVEZERO,
    CMC_DEVICE_ARDUINO,
    CMC_DEVICE_DAVINCI_AI,
    CMC_DEVICE_DONGLE,
    CMC_DEVICE_ELFBOT,
    getDeviceType
} = require('../device-filter')

const { sleep } = require('../../../../util/async-util')

const { createControl } = require('./mcontrol-factory')


//查询 dongle 信息
const COMMAND_GET_DONGLE_INFO = [0x04, 0xA5, 0x80, 0x00];
//查询 dongle 版本
const COMMAND_GET_DONGLE_VERSION = [0x04, 0xA5, 0x8D, 0x00];



//查询 dongle 信息
const COMMAND_GET_INFO = [0x04, 0xA5, 0x00, 0x00];
//查询 dongle 版本
const COMMAND_GET_VERSION = [0x04, 0xA5, 0x0D, 0x00];

// BLE在线模式
const COMMAND_ENABLE_BLE_MODE = [0x04, 0xA5, 0x08, 0x02];
// 串口在线模式
const COMMAND_ENABLE_SERIAL_MODE = [0x04, 0xA5, 0x08, 0x01];

//boot
const COMMAND_BOOT = [
    0x14, 0xA5, 0x8F, 0x00,
    0xEF, 0xBE, 0xAD, 0xDE,
    0xEF, 0xBE, 0xAD, 0xDE,
    0x74, 0x6F, 0x6F, 0x42,
    0x65, 0x64, 0x6F, 0x4D
];
//reboot
//14A50F00EFBEADDEEFBEADDE6F62655254424572
const COMMAND_REBOOT = [
    0x14, 0xA5, 0x0F, 0x00,
    0xEF, 0xBE, 0xAD, 0xDE,
    0xEF, 0xBE, 0xAD, 0xDE,
    0x6F, 0x62, 0x65, 0x52,
    0x54, 0x42, 0x45, 0x72
];

const UARTCMD_STATUS_IDLE = 0;
const UARTCMD_STATUS_LENG = 1;
const UARTCMD_STATUS_TYPE = 2;
const UARTCMD_STATUS_OPTI = 3;
const UARTCMD_STATUS_CONT = 4;

const ENALBE_MODE_DELAY = 100;
const GET_DG_INFO_TIMEOUT_MS = 100;

const CONN_TIMEOUT_MS = 1200;

const MODE_DONGLE = 0;
const MODE_SERIAL = 1;

const UPGRADE_STATUS_IDLE = 0;
const UPGRADE_STATUS_COTROL = 1;
const UPGRADE_STATUS_DONGLE = 2;

// 当前模式指令状态
let uarcmdStatus = UARTCMD_STATUS_IDLE;
// 数据解析变量值
let buffer = Buffer.alloc(0);
let leftOver = 0;
let msg = [];
/**
 * 解析指令数据
 * @param {*} data 
 */
const parseCommandData = (data, handleConsole, handleSpecial, handleMessage) => {
    // 拼接buffer字符
    buffer = Buffer.concat([buffer, data]);
    // 检测字符，获取重启标记
    handleConsole(buffer.toString());
    // 解析buffer
    while (buffer.length > 0) {
        let byte = buffer.readUInt8(0);
        switch (uarcmdStatus) {
            case UARTCMD_STATUS_IDLE:
                if (byte >= 0x41 && byte <= 0x5A) {
                    handleSpecial(byte);
                }
                else if (byte >= 4 && byte <= 20) {
                    msg.push(byte);
                    leftOver = byte;
                    uarcmdStatus = UARTCMD_STATUS_LENG;
                }
                else {
                    msg = [];
                    leftOver = 0;
                }
                break;
            case UARTCMD_STATUS_LENG:
                if (byte === 0xD2 || byte === 0xF0) {
                    msg.push(byte);
                    uarcmdStatus = UARTCMD_STATUS_TYPE;
                } else {
                    msg = [];
                    uarcmdStatus = UARTCMD_STATUS_IDLE;
                }
                break;
            case UARTCMD_STATUS_TYPE:
                msg.push(byte);
                uarcmdStatus = UARTCMD_STATUS_OPTI;
                break;
            case UARTCMD_STATUS_OPTI:
                msg.push(byte);
                leftOver = leftOver - 4;
                if (leftOver === 0) {
                    handleMessage(msg);
                    msg = [];
                    uarcmdStatus = UARTCMD_STATUS_IDLE;
                } else {
                    uarcmdStatus = UARTCMD_STATUS_CONT;
                }
                break;
            case UARTCMD_STATUS_CONT:
                msg.push(byte);
                leftOver--;
                if (leftOver === 0) {
                    handleMessage(msg);
                    msg = [];
                    uarcmdStatus = UARTCMD_STATUS_IDLE;
                }
                break;
            default:
                uarcmdStatus = UARTCMD_STATUS_IDLE;
                break;
        }
        buffer = buffer.slice(1, buffer.length);
    }
}

/**
 * Dongle 系列设备
 */
class Dongle extends Device {

    constructor(contex) {
        super(contex);
        /**
         * 获取doogleinfo超时计时
         */
        this.getDongleInfoTimeout = null;
        /**
         * 连接 mode 
         */
        this.mode = MODE_DONGLE;
        /**
         * dongle 版本号
         */
        this.version = '0001';
        /**
         * dongle 固件版本号
         */
        this.firmwareVer = '0001';
        /**
         * 主控类型
         */
        this.controlType = CMC_DEVICE_DONGLE;
        /**
         * 主控对象
         */
        this.mainControl = null;
        /**
         * 编译器
         */
        this.compiler = 'c';
        /**
         * 烧录状态
         */
        this.upgradeStatus = UPGRADE_STATUS_IDLE;
        /**
         * 成功回调
         */
        this._upgradeReslove = null;
        /**
         * 错误回调
         */
        this._upgradeReject = null;

        /**
         * 4k
         */
        this.status4KCallback = null;

        /**
         * reset status
         */
        this.resetStatus = false;

        this._connReject = null;
        this._connReslove = null;
        this._connTimeout = null;

    }

    /**
     * 连接
     * @param {*} comName 
     * @param {*} resolve 
     * @param {*} reject 
     */
    connect(comName, resolve, reject) {
        super.connect(comName,
            () => {
                this._connReject = reject;
                this._connReslove = resolve;
                // 查询 dongle 信息
                this.write(COMMAND_GET_DONGLE_INFO);
                this.getDongleInfoTimeout = setTimeout(() => this._onTimeout(), GET_DG_INFO_TIMEOUT_MS);
            }, () => {
                reject();
            });
        //启动连接计时器
        this._connTimeout = setTimeout(() => this._onConnTimeout(), CONN_TIMEOUT_MS);
    }

    /**
     * 上传
     * @param {*} code 
     * @param {*} resolve 
     * @param {*} reject 
     */
    upload(code, resolve, reject) {
        // 无主控对象直接返回
        if (!this.mainControl) {
            reject();
        }
        // 触发上传
        this.mainControl.upload(code, resolve, reject);
    }

    /**
     * 升级
     * @param {*} resolve 
     * @param {*} reject 
     */
    upgrade(resolve, reject) {
        this._upgradeReject = reject;
        this._upgradeReslove = resolve;
        // 串口模式
        if (this.mode === MODE_SERIAL) {
            this.upgradeStatus = UPGRADE_STATUS_COTROL;
            this.mainControl.upgrade(() => {
                this._upgradeReslove();
                this.upgradeStatus = UPGRADE_STATUS_IDLE;
                // 获取主控版本
                this.write(COMMAND_GET_VERSION);
            }, () => {
                this._upgradeReject();
                this.upgradeStatus = UPGRADE_STATUS_IDLE;
            });
        }
        // dongle模式
        else {
            this._checkAndUpgrade();
        }
    }

    /**
     * 重置主控
     */
    resetControl() {
        return new Promise(resolve => {
            console.log('resetControl')
            //重置状态更新
            this.resetStatus = true;
            //发送重置命令
            this.write(COMMAND_REBOOT);
            //重置延时
            setTimeout(() => {
                this.resetStatus = false;
                resolve();
            }, 500);
        });
    }

    /**
     * 检测升级
     */
    _checkAndUpgrade() {
        // 更新主控
        if (this._isControlUpgrade()) {
            this.upgradeStatus = UPGRADE_STATUS_COTROL;
            this.mainControl.upgrade(() => {
                console.log('upgrade control succ !')
                //主控更新成功后重新检测
                this._checkAndUpgrade();
            }, () => {
                this._upgradeReject();
                this.upgradeStatus = UPGRADE_STATUS_IDLE;
            });
        }
        // 更新dongle 
        else if (this._isDongleUpgrade()) {
            this.upgradeStatus = UPGRADE_STATUS_DONGLE;
            this.upgradeDongle();
        } else {
            this._upgradeReslove();
            this.upgradeStatus = UPGRADE_STATUS_IDLE;
            // 获取主控版本
            this.write(COMMAND_GET_VERSION);
        }
    }

    /**
     * 写入数据
     * @param {*} message 
     */
    write(message) {
        super.write(message);
    }

    /**
     * 重置状态
     */
    reset() {
        // 主控对象
        this.mainControl = null;
        // 烧录模式
        this.mode = MODE_DONGLE;
        // 设置主控类型为 CMC_DEVICE_DONGLE
        this.controlType = CMC_DEVICE_DONGLE;

        this._clearTimeout();

        // 检测当前版本是否需要更新
        this._checkVersion();
        // 识别当前主控设备
        this.onRecognizeDeviceAuth(this.controlType);
    }

    /**
     * 获取dongle信息超时
     */
    _onTimeout() {
        // 清除计时器
        this._clearTimeout();
        // 切换至串口模式
        this.write(COMMAND_ENABLE_SERIAL_MODE);
        // 延时处理保证模式切换完成
        sleep(ENALBE_MODE_DELAY).then(() => {
            // 获取主控信息
            this.write(COMMAND_GET_INFO);
            // 获取主控版本
            this.write(COMMAND_GET_VERSION);
            // 切换模式为串口模式
            this.mode = MODE_SERIAL;
        });
    }

    _onConnTimeout() {
        // 清空连接计时器
        this._clearConnTimeout();
        // 回调连接失败
        if (this._connReject) {
            this._connReject();
            this._connReject = null;
            this._connReslove = null;
        }
    }

    _clearConnTimeout() {
        if (this._connTimeout) {
            clearTimeout(this._connTimeout);
            this._connTimeout = null;
        }
    }

    /**
     * Cancel the timeout.
     */
    _clearTimeout() {
        if (this.getDongleInfoTimeout !== null) {
            clearTimeout(this.getDongleInfoTimeout);
            this.getDongleInfoTimeout = null;
        }
    }

    /**
     * 处理dongle info
     * @param {*} message 
     */
    _handleDongleInfo(message) {
        // 清除计时器
        this._clearTimeout();

        // 切换模式为串口模式
        this.mode = MODE_DONGLE;
        // 设置主控类型为 CMC_DEVICE_DONGLE
        this.controlType = CMC_DEVICE_DONGLE;

        // 获取dangle版本信息
        this.write(COMMAND_GET_DONGLE_VERSION);

        // 获取状态字节
        const byte = message.readUInt8(7);
        // BLE连接标志
        const bleState = byte & 0x0F;
        // ble已经连接主控
        if (bleState === 0x01) {
            // 切换至蓝牙模式
            this.write(COMMAND_ENABLE_BLE_MODE);
            // 延时处理保证模式切换完成
            sleep(ENALBE_MODE_DELAY).then(() => {
                // 获取主控信息
                this.write(COMMAND_GET_INFO);
                // 获取主控版本
                this.write(COMMAND_GET_VERSION);
            });
        }
        const result = (byte & 0xF0) === 0x10;
        // 烧录成功标记
        this._onDongleBurnResult(result);

        // 清空连接计时器
        this._clearConnTimeout();
        // 返回连接成功失败结果
        if (this._connReslove) {
            this._connReslove();
            this._connReject = null;
            this._connReslove = null;
        }
       
    }

    /**
     * 处理主控获取info
     * @param {*} message 
     */
    _handleInfo(message) {
        let controlTypeTemp = CMC_DEVICE_DONGLE;
        // 获取设备类型标记
        const type = message.readUInt8(3);
        // 匹配主控类型
        switch (type) {
            case 0xB1:// G0
                controlTypeTemp = CMC_DEVICE_GROVEZERO;
                break;
            case 0xEB:// Elfbot
                controlTypeTemp = CMC_DEVICE_ELFBOT;
                break;
        }
        // 获取状态字节

        // 实例化主控对象
        if (this.mainControl === null
            || this.controlType != controlTypeTemp) {
            this.mainControl = createControl(this, controlTypeTemp);
        } else { }
        // 主控类型
        this.controlType = controlTypeTemp;
    
        const byte = message.readUInt8(7) & 0xF0;
        const result = (byte & 0xF0) === 0x10;
        // 烧录成功标记
        this.emit('control-burn-resp', result);

        console.log('mainControl', this.mainControl);

        // 清空连接计时器
        this._clearConnTimeout();

        if (type == 0xB1) {
            // 成功回调释放资源
            if (this._connReslove) {
                this._connReslove();
                this._connReject = null;
                this._connReslove = null;
            }
            // 延时发起识别
            setTimeout(() => {
                this.onRecognizeDeviceAuth(this.controlType);
            }, 100);
        } else {
            if (this._connReject) {
                this._connReject();
                this._connReject = null;
                this._connReslove = null;
            }
        }

    }

    /**
     * 处理dongle烧录结果
     * @param {*} result 
     */
    _onDongleBurnResult(result) {
        //  UPGRADE_STATUS_DONGLE状态下处理逻辑
        if (this.upgradeStatus === UPGRADE_STATUS_DONGLE) {
            if (!result) {
                this._upgradeReject();
                this.upgradeStatus = UPGRADE_STATUS_IDLE;
            } else {
                this._upgradeReslove();
                this.upgradeStatus = UPGRADE_STATUS_IDLE;
            }
        }
    }

    /**
     * 处理获取版本号
     * @param {*} message 
     */
    _handleGetVersion(message) {
        console.log('_handleGetVersion');
        let l2V = message.readUInt16LE(8).toString(16);
        let l3V = message.readUInt16LE(10).toString(16);
        let l4V = message.readUInt16LE(12).toString(16);

        // 生命主控版本号
        const version = {
            l2: '0000'.slice(0, 4 - l2V.length) + l2V,
            l3: '0000'.slice(0, 4 - l3V.length) + l3V,
            l4: '0000'.slice(0, 4 - l4V.length) + l4V
        }
        // 为设置主控当前版本信息
        this.emit('control-version-resp', version);
        // 检测版本
        this._checkVersion();
    }

    /**
     * 处理获取Dongle版本号
     * @param {*} message 
     */
    _handleGetDongleVersion(message) {
        console.log('_handleGetDongleVersion');
        //获取Dongle版本号
        const version = message.readUInt8(8).toString(16);

        this.version = '0000'.slice(0, 4 - version.length) + version;
        // 检测版本
        this._checkVersion();
    }

    /**
     * 判断Dongle是否需要升级
     */
    _isDongleUpgrade() {
        return this.version < this.firmwareVer;
    }

    /**
     * 判断主控是否需要升级
     */
    _isControlUpgrade() {
        let controlIsUpgrade = false;
        if (this.mainControl) {
            controlIsUpgrade = this.mainControl.isUpgrade();
        }
        return controlIsUpgrade;
    }

    /**
     * 判断是否需要升级
     */
    _isUpgrade() {
        let dongleIsUpgrade = this.version < this.firmwareVer;
        let controlIsUpgrade = false;
        if (this.mainControl) {
            controlIsUpgrade = this.mainControl.isUpgrade();
        }
        return dongleIsUpgrade || controlIsUpgrade;
    }

    /**
     * 检测固件版本
     */
    _checkVersion() {
        this.emit('isUpgrade', this._isUpgrade());
    }

    /**
     * 获取主控版本号
     */
    getVersion() {
        if (!this.mainControl) {
            return {
                l2: '0000',
                l3: '0000',
                l4: '0000',
                dongle: this.version
            }
        } else {
            return Object.assign(this.mainControl.version, {
                dongle: this.version
            })
        }
    }

    /**
     * 获取固件版本号
     */
    getFirmwareVersion() {
        if (!this.mainControl) {
            return {
                l2: '0000',
                l3: '0000',
                l4: '0000',
                dongle: this.firmwareVer
            }
        } else {
            return Object.assign(this.mainControl.firmwareVer, {
                dongle: this.firmwareVer
            })
        }
    }

    /**
     * 处理Dongle蓝牙连接成功
     * @param {*} message 
     */
    _handleDongleBLEConnect(message) {
        // 切换至蓝牙模式
        this.write(COMMAND_ENABLE_BLE_MODE);
        // 延时处理保证模式切换完成
        sleep(ENALBE_MODE_DELAY).then(() => {
            // 获取主控信息
            this.write(COMMAND_GET_INFO);
            // 获取主控版本
            this.write(COMMAND_GET_VERSION);
        });
    }

    /**
     * 处理donggle蓝牙连接断开
     * @param {*} message 
     */
    _handleDongleBLEDisconnect(message) {
        //重置状态
        this.reset();
        //发送dongle ble 断开广播
        this.emit('dongle-ble-discnnect');
    }

    /**
     * 查询4k块烧录结果
     * @param {*} message 
     */
    _handleBurn4KResult(message) {
        console.log('burn4KResult : ', message);
        const errCount = message[3];
        const missData = errCount > 0 ? message.slice(4) : [];
        console.log('errCount : ', errCount);
        console.log('missData : ', missData);
        if (this.status4KCallback) {
            this.status4KCallback({
                errCount: errCount,
                missData: missData
            });
            this.status4KCallback = null;
        }
        clearTimeout(this.status4KTimer);
    }

    /**
     * 升级dongle
     */
    upgradeDongle() {
        this._sendToLowerComputer(this._packageToBuffer(donglehex));
    }

    /**
    * package
    * @param {*} hex 读取的hex字符串
    * @param {*} isCrc 是否计算crc
    */
    _packageToBuffer(hex, isCrc = true) {
        let addrList = [];
        let hexList = [];
        let baseAddrList = [];
        hex = hex.split(':');
        let hexLen = hex.length;
        for (let i = 1, type, len, addr; i < hexLen; i++) {
            type = hex[i].slice(6, 8);
            if (type === '00') {
                len = parseInt(`0x${hex[i].slice(0, 2)}`);
                addr = parseInt(`0x${hex[i].slice(2, 6)}`);
                addrList.push(addr + baseAddrList[baseAddrList.length - 1]);
                hexList.push([]);

                for (let j = 0, a, b; j < len; j++) {
                    a = j * 2 + 8;
                    b = a + 2;
                    hexList[hexList.length - 1].push(parseInt(`0x${hex[i].slice(a, b)}`));
                }
            } else if (type === '02') {
                baseAddrList.push(parseInt(`0x${hex[i].slice(8, 12)}`) << 4);
            }
        }

        let addrListLen = addrList.length;
        let buf = Buffer.alloc(addrListLen * 16, 0xFF);
        for (let i = 0; i < addrListLen; i++) {
            Buffer.from(hexList[i]).copy(buf, addrList[i] - addrList[0]);
        }
        buf.writeUInt16LE(buf.length >> 2, 4); //长度 4byte为一个单位
        // buf.writeUInt16LE(0x0001, 6); //版本号
        if (isCrc) {
            let crc = 0x00000000;
            for (let i = 0, bufLen = buf.length; i < bufLen; i = i + 4) {
                crc = crc + buf.readUInt32LE(i);
            }
            crc = ~crc + 1;
            console.log('crc:', crc);
            buf.writeUInt32LE(crc >>> 0, 12);
        }
        return {
            buf: buf,
            addrList: addrList
        };
    }

    /**
     * 往下位机写数据
     * @param {*} data 
     */
    _sendToLowerComputer(data) {
        let block4ks = [];
        let block4kCount = Math.ceil(data.buf.length / 16 / 256);
        for (let i = 0; i < block4kCount; i++) {
            if (i === block4kCount - 1) {
                let tailRowCount = data.buf.length / 16 - i * 256;
                block4ks.push(this._sendBlock(data, tailRowCount, i));
                block4ks.push(this._sendEnd(tailRowCount));
            } else {
                block4ks.push(this._sendBlock(data, 256, i));
            }
        }
        return Promise.all(block4ks);
    }

    /**
     * 发送4k块
     */
    _sendBlock(data, rowCount, block4kNum) {
        let beginPosition = block4kNum * 256;
        let baseAddr = data.addrList[beginPosition];
        let start = this._sendStart(baseAddr);
        let datas = [].concat(start);
        for (let i = 0; i < rowCount; i++) {
            datas.push(this._sendData(data.buf, i + beginPosition));
        }
        return Promise.all(datas);
    }

    /**
     * 0x96 (dongle): 0x16
     * RAM编程数据, 上位机 -> BLE主控
     * LEN(0x14) + TYPE(0xA5) + CMD(0x16) + OPT(块号) + 数据(16B)
     * 块号,0-255,每块表示16B的数据,256个块 = 4KB
     */
    _sendData(hexBuf, n) {
        let headBuf = Buffer.from([0x14, 0xA5, 0x96, n]);
        let dataBuf = hexBuf.slice(n * 16, (n + 1) * 16);
        let writeBuf = Buffer.concat([headBuf, dataBuf]);
        this.write(writeBuf);
        return sleep(100);
    }

    /**
     * 0x90 (dongle) : 0x10
     * 编程开始, 上位机 -> BLE主控
     * LEN(0x08) + TYPE(0xA5) + CMD(0x10) + OPT(0xFF) + 参数(4B,编程地址)
     * @param {*} baseAddr 
     * @param {*} target 
     */
    _sendStart(baseAddr) {
        let writeBuf = Buffer.from([0x08, 0xA5, 0x90, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
        writeBuf.writeUInt32LE(baseAddr, 4);
        this.write(writeBuf);
        return sleep(1000);
    }

    /**
     * 0x97 (dongle)
     * RAM数据结束, 上位机 -> BLE主控
     * LEN(0x08) + TYPE(0xA5) + CMD(0x17) + OPT(块数)
     * @param {*} block4kCount 
     * @param {*} target 
     */
    _sendEnd(block4kCount) {
        this.write([0x04, 0xA5, 0x97, block4kCount]);
        return sleep(500);
    }

    /**
     * 处理主控重启
     */
    async _handleConsole(log) {
        // 判断是否已经识别设备
        if (!this.mainControl) return;
        if (this.mainControl.name !== 'elfbot') return;
        // 获取主控重启标记
        let resetFlag = this.mainControl.resetFlag;
        // 判断主控是否重启
        if (log.indexOf(resetFlag) != -1) {
            console.log('control reset -------------- ');
            // 状态重置
            if (this.resetStatus) {
                console.log('_handleCommandAtoZ 0x42 .... reboot');
                this.resetStatus = false;
                return;
            }
            // 延时1秒
            await sleep(1000);
            // 如果当前正在烧录 dongle 
            if (this.upgradeStatus === UPGRADE_STATUS_DONGLE) {
                // 获取主控版本,重新设置版本号
                this.write(COMMAND_GET_VERSION);
                //获取dongle版本号
                this.write(COMMAND_GET_DONGLE_VERSION);
                //获取dongle信息
                this.write(COMMAND_GET_DONGLE_INFO);
            }
            // 获取主控信息
            this.write(COMMAND_GET_INFO);
        }
    }

    /**
     * // 0x42
     * 处理0x41-0x5A 指令
     * @param {*} byte 
     */
    async _handleCommandAtoZ(byte) {
        // 如果主控是 elfbot ;不处理
        if (this.mainControl
            && this.mainControl.name === 'elfbot') {
            return;
        }
        switch (byte) {
            case 0x41:
                console.log('................. 0x41');
                break;
            case 0x42:
                console.log('................. 0x42');
                // 状态重置
                if (this.resetStatus) {
                    console.log('_handleCommandAtoZ 0x42 .... reboot');
                    this.resetStatus = false;
                    return;
                }
                // 延时1秒
                await sleep(1000);
                // 如果当前正在烧录 dongle 
                if (this.upgradeStatus === UPGRADE_STATUS_DONGLE) {
                    // 获取主控版本,重新设置版本号
                    this.write(COMMAND_GET_VERSION);
                    //获取dongle版本号
                    this.write(COMMAND_GET_DONGLE_VERSION);
                    //获取dongle信息
                    this.write(COMMAND_GET_DONGLE_INFO);
                }
                // 获取主控信息
                this.write(COMMAND_GET_INFO);
                break;
        }
    }

    /**
     * 处理消息
     * @param {*} data 
     */
    _handleMessage(data) {
        console.log('handleMessage:', data, '\n');
        let msgBuf = Buffer.from(data);
        switch (data[2]) {
            case 0x00:
                this._handleInfo(msgBuf);
                break;
            case 0x80: // dongle 信息查询应答
                this._handleDongleInfo(msgBuf);
                break;
            case 0x0D: //  版本查询应答
                this._handleGetVersion(msgBuf);
                break;
            case 0x8D: // dongle 版本查询应答
                this._handleGetDongleVersion(msgBuf);
                break;
            case 0xA4: // dongle BLE连接事件
                this._handleDongleBLEConnect();
                break;
            case 0xA5: // dongle BLE断开事件
                this._handleDongleBLEDisconnect();
                break;
            case 0x13: // 4K结果查询
                this._handleBurn4KResult(msgBuf);
                break;
            default:   // 数据上报
                this.emit('response', msgBuf);
                break;
        }

    }

    /**
     * 数据解析
     * @param {*} data 
     */
    onResponse(data) {
        parseCommandData(data,
            (console) => this._handleConsole(console),
            (command) => this._handleCommandAtoZ(command),
            (message) => this._handleMessage(message)
        );
    }

    /**
    * 调试模式放生变化
    * @param {*} mode 
    */
    onDebugModeChanged(mode) {
        // 切换至在线模式处理，否则不处理
        if (mode !== 1) return;
        // 切换至蓝牙模式
        if (this.mode === MODE_SERIAL) {
            this.write(COMMAND_ENABLE_SERIAL_MODE);
        }
        // 切换至蓝牙模式
        else if (this.mode === MODE_DONGLE) {
            this.write(COMMAND_ENABLE_BLE_MODE);
        }
    }

    /**
     * 设备断开事件
     */
    onDeviceDisConnect() {
        super.onDeviceDisConnect();
        this.emit('device-disconnect');
    }

    /**
     * 查询4k烧录结果
     * @param {*} position 
     */
    queryBurn4K(position, checkSum) {
        return new Promise((resolve, reject) => {
            // let buffer = Buffer.from([0x08, 0xA5, 0x13, position, 0xFF, 0xFF, 0xFF, 0xFF])
            // // 将 totalCount 写入到 buffer 里，小端对齐
            // buffer.writeUInt32LE(checkSum, 4);
            // this.write(buffer);
            this.write([0x08, 0xA5, 0x13, position, 0x89, 0xAB, 0xCD, 0xEF])
            this.status4KTimer = setTimeout(() => {
                reject();
            }, 100 * 10);
            this.status4KCallback = resolve;
        });
    }

    /**
     * 释放资源
     */
    release() {
        super.release();
        if (this.mainControl) {
            this.mainControl.release();
            this.mainControl = null;
        }
    }

}

module.exports = Dongle;