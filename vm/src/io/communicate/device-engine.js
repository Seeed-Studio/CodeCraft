const SocketService = require('./socket-service');
const { createDevice } = require('./deives/device-fatory');
const { EventEmitter } = require('events');
// const { getDeviceType, getSpecialDevicecomName } = require('./fatory');
// const { buildMicroPython } = require('./deives/micropython/chMicroPythonBuilder');
const { createRescuer } = require('./rescuer/fatory')
// 设备连接超时时间
const DEVICE_CONNECT_TIMEOUT = 3 * 1000;
// 设备上传超时时间
const DEVICE_UPLOAD_TIMEOUT = 2 * 60 * 1000;
const DEVICE_UPGRADE_TIMEOUT = 10 * 60 * 1000;

/**
 * DeviceEngine
 * 设备管理引擎
 */
class DeviceEngine extends EventEmitter {

    constructor() {
        super();

        /**
         * 设备对象
         */
        this.device = null;
        
        // /**
        //  * 设备检测中
        //  */
        // this.deviceChecking = false;

        /**
         *io server
         */
        this._io = new SocketService();
        this._io.on('device-connect', () => {
            // if (this.deviceChecking) return;
            this.emit('device-connect');
        });
        this._io.on('device-disconnect', args => {
            // if (this.deviceChecking) return;
            this.onDeviceDisconnect();
            this.emit('device-disconnect', args);
        });
        this._io.on('socket-connect', () => { this.emit('socket-connect') });
        this._io.on('socket-disconnect', () => {
            this.clearTimeout();
            this.emit('socket-disconnect')
        });
        // 监听版本检测回调广播
        this._io.on('message', ({ method, data }) => {
            if ('versionupgrade' == method) {
                this.emit('versionupgrade', data)
            }
            if ('projectSave' == method) {
                this.emit('projectSave', data)
            }
            if ('before-quit' == method) {
                this.emit('before-quit');
            }
        });
        /**
         * 超时器
         */
        this.timeout = null;

        /**
         * 自动连接socketio
         */
        setTimeout(() => this.open(), 1000);
    }

    /**
     * 开启链路
     * @param {*} resolve 
     * @param {*} reject 
     */
    open() {
        return this._io.open();
    }

    /**
     * Determine if the socket is connected
     */
    isConnected() {
        return this._io.isConnected();
    }

    /**
     * Determine if the equipment is connected
     */
    isEquipmentConnected() {
        return this.device ? this._io.isEquipmentConnected() : false;
    }

    /**
     * Scan
     * @param {*} resolve 
     * @param {*} reject 
     */
    scan() {
        if (!this._io.isConnected()) {
            return Promise.reject('socket disconnect...');
        }
        return this._io.scan();
    }

    /**
     * 发送版本更新相关消息
     * @param {*} message {action, args}
     */
    sendVersionUpgradeMessage(message = {}) {
        this.sendMessage({
            method: 'versionupgrade',
            data: message
        })
    }

    /**
     * 发送文件保存相关消息
     * @param {*} message {action, args}
     */
    sendProjectSaveMessage(message = {}) {
        this.sendMessage({
            method: 'projectSave',
            data: message
        });
    }
    /**
     * 发送窗口相关消息
     * @param {} message 
     */
    sendWindowMessage(message = {}) {
        this.sendMessage({
            method: 'window',
            data: message
        })
    }

    /**
     * 发送消息
     * @param {*} message 
     */
    sendMessage(message) {
        this._io.sendMessage(message);
    }

    /**
     * 断开连接
     */
    disconnect() {
        if (!this._io.isConnected()) {
            return Promise.resolve();
        }
        return this._io.disconnect();
    }

    /**
     * 连接设备
     * @param {*} device 
     * @param {*} resolve 
     * @param {*} reject 
     */
    connect(device) {

        if (!this._io.isConnected()) {
            return Promise.reject('socket disconnect...');
        }

        //释放上次连接的设备
        if (this.device) {
            this.device.release();
            this.device = null;
        }

        return new Promise(async (resolve, reject) => {
            //获取设备中存在的信息
            const {
                deviceType,
                comName,
                needOpenDevice = true, // 默认打开串口
            } = device;
            //根据设备类型返回对应的设备对象
            this.device = createDevice(this._io, deviceType);
            //设置设备事件监听
            this.device.isNeedOpenDevice = needOpenDevice;
            this.device.on('response', (data) => { this.emit('response', data) });
            this.device.on('print-response', (data) => { this.emit('print-response', data) });
            this.device.on('broadcast-response', (data) => { this.emit('broadcast-response', data) });
            this.device.on('rawdata-event', (data) => { this.emit('rawdata-event', data) });
            this.device.on('isUpgrade', (result) => { this.emit('isUpgrade', result) });
            this.device.on('device-recognize', (id) => { this.emit('device-recognize', id) });
            this.device.connect(comName, () => {
                this.clearTimeout();
                resolve();
            }, () => {
                this.disconnect();
                this.clearTimeout();
                reject();
            });
            // 设置设备连接超时计时
            this.timeout = setTimeout(() => {
                reject();
            }, DEVICE_CONNECT_TIMEOUT);
        });
        // return new Promise(async (resolve, reject) => {
        //     const {
        //         deviceType,
        //         comName,
        //         needOpenDevice = true,
        //     } = device;
        //     // 释放设备资源
        //     if (this.device) {
        //         this.device.release();
        //         this.device = null;
        //     }

        //     if (deviceType === 'unknown' && needOpenDevice) {
        //         /* ----------------设备检测中----------------- */
        //         this.deviceChecking = true;
        //         let type = await getDeviceType(this._io, comName);
        //         /* ----------------设备检测中----------------- */
        //         if (type === 'micropython') {
        //             let dName = await getSpecialDevicecomName(this._io, comName);
        //             if (dName == 'mpython-grove') {
        //                 // navigator.platform == 'Win32'
        //                 this.deviceChecking = false;
        //                 this.device = buildMicroPython(this._io, type);
        //                 this.device.setOptions = {}
        //                 // this.device.isSpecial = true;
        //             } else {
        //                 this.deviceChecking = false;
        //                 this.device = buildMicroPython(this._io, type);
        //             }
        //         } else {
        //             this.deviceChecking = false;
        //             this.device = createDevice(this._io, deviceType);
        //         }
        //     } else if (deviceType === 'maixduino') {
        //         this.device = buildMicroPython(this._io, deviceType);
        //         this.device.setOptions = {}
        //         //this.device.isSpecial = true;
        //     } else {
        //         this.device = createDevice(this._io, deviceType);
        //     }

        //     console.log('创建设备', this.device);

        //     // 获取当前设备、连接设备
        //     this.device.isNeedOpenDevice = needOpenDevice;
        //     this.device.on('response', (data) => { this.emit('response', data) });
        //     this.device.on('rawdata-event', (data) => { this.emit('rawdata-event', data) });
        //     this.device.on('isUpgrade', (result) => { this.emit('isUpgrade', result) });
        //     this.device.on('device-recognize', (id) => { this.emit('device-recognize', id) });
        //     this.device.connect(comName, () => {
        //         this.clearTimeout();
        //         console.log('连接成功');
        //         resolve();
        //     }, () => {
        //         this.clearTimeout();
        //         reject();
        //     });
        //     // 设置设备连接超时计时
        //     this.timeout = setTimeout(() => {
        //         reject();
        //     }, DEVICE_CONNECT_TIMEOUT);
        // });
    }

    /**
     * 设备断开回调
     */
    onDeviceDisconnect() {
      
    }

    /**
     * 中断MicroPython系统
     */
    interruptMicroPython(){
        if (this.device && 
            this.device.interruptMicroPython) {
            this.device.interruptMicroPython();
        }
    }

    /**
     * reset device at open serial
     */
    resetAtOpenSerial() {
        if (this.device && 
            this.device.resetAtOpenSerial) {
            this.device.resetAtOpenSerial();
        }
    }

    /**
     * 获取raw data 数据
     * @param {*} key 
     */
    getRawData(key) {
        if (!this.device || !this.device.getRawData) return;
        return this.device.getRawData(key);
    }

    /**
     * 获取主控版本号
     */
    getVersion() {
        if (this.isEquipmentConnected()) {
            return this.device.getVersion();
        }
        return null;
    }

    /**
     * 获取固件版本号
     */
    getFirmwareVersion() {
        if (this.isEquipmentConnected()) {
            return this.device.getFirmwareVersion();
        }
        return null;
    }

    /**
     * 写入
     * @param {*} data 
     */
    write(_data) {
        if (!this.isEquipmentConnected()) {
            return;
        }
        this.device.write(_data);
    }

    /**
     * 更新串口波特率
     * @param {*} _data 
     */
    updateBaudRate(_data) {
        if (!this.isEquipmentConnected()) {
            return;
        }
        this.device.updateBaudRate(_data);
    }

    /**
     * 上传
     * @param {*} code 
     * @param {*} resolve 
     * @param {*} reject 
     */
    upload(code) {
        return new Promise((resolve, reject) => {
            this.device.upload(code, (value) => {
                this.clearTimeout();
                resolve(value);
            }, () => {
                this.clearTimeout();
                reject();
            });
            // 设置设备连接超时计时
            this.timeout = setTimeout(() => {
                reject();
            }, DEVICE_UPLOAD_TIMEOUT);
        });
    }

    /**
     * 升级
     * @param {*} resolve 
     * @param {*} reject 
     */
    upgrade(isForceUpgrade = false) {
        // isForceUpgrade 是否强制调用upgrade
        // elfbot 需要断开后升级固件 
        if (!this.isEquipmentConnected() && !isForceUpgrade) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            this.device.upgrade(() => {
                this.clearTimeout();
                resolve();
            }, () => {
                this.clearTimeout();
                reject();
            });
            // 设置设备连接超时计时
            this.timeout = setTimeout(() => {
                reject();
            }, DEVICE_UPGRADE_TIMEOUT);
        });
    }

    setUpgradeMode(mode) {
        return this.device.setUpgradeMode(mode);
    }
    
    createRescuer(deviceType, comName) {
        return createRescuer(deviceType, comName, this._io);
    }

    isDownFirmwareFile() {
        return this.device.isDownFirmwareFile();
    }

    downFirmwareFile() {
        return this.device.downFirmwareFile();
    }

    /**
     * 清除timer
     */
    clearTimeout() {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    /**
     * 调试模式放生变化
     * @param {*} mode 
     */
    onDebugModeChanged(mode) {
        if (!this.device) return;
        if (this.device.onDebugModeChanged) {
            this.device.onDebugModeChanged(mode);
        } else {
            this.device.emit('onCodeModeChanged', mode);
        }
    }


    release() {
        if (this.device) {
            this.device.release();
            this.device = null;
        }
        if (_io) {
            this._io.close();
            this._io = null;
        }
    }

}

module.exports = DeviceEngine;