const io = require('socket.io-client');
const { EventEmitter } = require('events');
const { 
    usable,
    getDeviceType,
    CMC_DEVICE_GROVEZERO,
    CMC_DEVICE_ARDUINO,
    CMC_DEVICE_ARDUINO_MEGA,
    CMC_DEVICE_DAVINCI_AI,
    CMC_DEVICE_GROVE_JOINS,
    CMC_DEVICE_WIO_TERMINAL,
    CMC_DEVICE_OPENCAT,
    CMC_DEVICE_MAIXDUINO,
 } = require('./deives/device-filter');


const SOCKET_SERVER_URL = 'http://localhost:62377';
const SOCKET_SERVER_EXTRA_PATH = '/codecraft/scoketio/main';

const CONNECTION_TIMEOUT_MS = 2 * 1000;

const SUCC = 0;
const ERROR_CODE_SOCKET_ONLY_ONE = -1;
const ERROR_CODE_SOCKET_CONNECT_TIMEOUT = -2;


const SOCKET_STATUS_IDLE = 0;
const SOCKET_STATUS_CONNECT = 1;
const SOCKET_STATUS_ONLY_ONE = 2;
const SOCKET_STATUS_RECONNET = 3
const SOCKET_STATUS_DISCONNET = 4
const SOCKET_STATUS_SUCC = 5;

class SocketService extends EventEmitter {

    constructor() {
        super();
        /**
         * resolve
         * @type {Function}
         * @private
         */
        this._resolve = null;
        /**
         * reject
         * @type {Function}
         * @private
         */
        this._reject = null;
        /**
         * The socket for the device being opened.
         * @type {Socket}
         * @private
         */
        this._socket = null;
        /**
         * Equipment connection status
         */
        this._equipmentConnected = false;
        /**
         * If this timeout expires before a successful connection, the connection attempt will be canceled.
         * @type {Object}
         * @private
         */
        this._connectionTimeout = null;
        // 实例化socket对象
        this._socket = io(SOCKET_SERVER_URL, {
            autoConnect: false,
            path: SOCKET_SERVER_EXTRA_PATH,
            upgrade: false,
            transports:	['websocket']
        });
        // socket connect resp
        this._socket.on('reconnect', () => this.onReConnect());
        this._socket.on('disconnect', (reason) => this.onDisconnect(reason));
        this._socket.on('server-connect', (resp) => { this.onWasOpened(resp) });
        this._socket.on('message', (message) => this.onMessage(message));
        // 初始化socket 连接状态
        this.socketStatus = SOCKET_STATUS_IDLE;
        // 设备断开标记
        this._disType = 0; // '0' 自动 '1' 手动
    }

    /**
     * 开启链路
     * @param {*} resolve 
     * @param {*} reject 
     */
    open() {
        // 如果已连接，返回连接结果
        if (this.isConnected()) {
            return Promise.resolve();
        }
        // 开启socket连接
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            // 开启socket连接
            this._socket.open();
            // 开启sokcet 连接超时计时
            this._connectionTimeout = setTimeout(() => this.onTimeout(), CONNECTION_TIMEOUT_MS);
            // 更新socket 连接状态
            this.socketStatus = SOCKET_STATUS_CONNECT;
        });
    }

    /**
     * Determine if the equipment is connected
     */
    isEquipmentConnected() {
        return this.isConnected() && this._equipmentConnected;
    }

    /**
     * Determine if the socket is connected
     */

    isConnected() {
        return this._socket ? this.socketStatus === SOCKET_STATUS_SUCC : false;
    }

    /**
     * React to a 'deviceWasOpened' message from the Device Manager application.
     * 
     */
    onWasOpened(resp) {
        console.log('socket onConnect ... resp : ' + JSON.stringify(resp));
        // 清空连接超时计时器
        this.clearConnectionTimeout();
        // 获取错误码
        let errCode = resp.errCode;
        // socket 连接有且只有一个 
        if (ERROR_CODE_SOCKET_ONLY_ONE === errCode) {
            // 如果是connect触发的连接成功，处理返回结果
            if (this.socketStatus === SOCKET_STATUS_CONNECT) {
                this._reject(ERROR_CODE_SOCKET_ONLY_ONE);
            }
            this.socketStatus = SOCKET_STATUS_ONLY_ONE;
            //关闭异常的连接
            if (this._socket && this._socket.connected) {
                this._socket.disconnect();
            }
        } else {
            // 如果是connect触发的连接成功，处理返回结果
            if (this.socketStatus === SOCKET_STATUS_CONNECT) {
                this._resolve();
            }
            this.emit('socket-connect');
            this.socketStatus = SOCKET_STATUS_SUCC;
        }
    }

    /**
     * 设备重連
     * 
     */
    onReConnect() {
        console.log('onReConnect ... resp : ');
        // 重新連接，更新socket 状态
        this.socketStatus = SOCKET_STATUS_RECONNET;
    }

    /**
     * React to the socket becoming disconnected.
     */
    onDisconnect(reason) {
        console.log('socket client onDisconnect ...reason : ' + reason);
        this.clearConnectionTimeout();
        this.emit('socket-disconnect');
        // 如果是connect触发的连接成功，处理返回结果 
        if (this.socketStatus === SOCKET_STATUS_CONNECT) {
            this._reject();
        }
        // 更新设备连接状态
        this._equipmentConnected = false;
        // 更新当前socket状态
        this.socketStatus = SOCKET_STATUS_DISCONNET;
    }

    /**
    * React to the connection timeout expiring. This could mean that the socket itself timed out, or that the Device
    * Manager took too long to send a 'deviceWasOpened' message back.
    */
    onTimeout() {
        this.clearConnectionTimeout();
        if (this._socket.connected) {
            this._socket.disconnect();
        } else {
            console.log('connection attempt timed out')
            // 如果是connect触发的连接成功，处理返回结果 
            if (this.socketStatus === SOCKET_STATUS_CONNECT) {
                this._reject(ERROR_CODE_SOCKET_CONNECT_TIMEOUT);
            }
        }
    }
    /**
     * Cancel the connection timeout.
     */
    clearConnectionTimeout() {
        if (this._connectionTimeout !== null) {
            clearTimeout(this._connectionTimeout);
            this._connectionTimeout = null;
        }
    }

    /**
     * Scan
     * @param {*} resolve 
     * @param {*} reject 
     */
    scan() {
        return new Promise((resolve, reject) => {
            this._reject = reject;
            this._resolve = resolve;
            this.sendMessage({ method: 'scan' });
        });
    }

    //检查arduino库是否已经部署
    checkLibrary(data) {
        return new Promise((resolve, reject) => {
            this._reject = reject;
            this._resolve = resolve;
            this.sendMessage({
                method: 'checkLibrary',
                data: data
            });
        });
    }

    //检查上传部署TensorFlow arduino库是否已经部署
    checkTensorFlowLibrary(data) {
        return new Promise((resolve, reject) => {
            this._reject = reject;
            this._resolve = resolve;
            this.sendMessage({
                method: 'checkTensorFlowLibrary',
                data: data
            });
        });
    }

    //上传部署arduino库
    uploadLibrary(data, resolve, reject) {
        return new Promise((resolve, reject) => {
            this._reject = reject;
            this._resolve = resolve;
            this.sendMessage({
                method: 'uploadLibrary',
                data: data
            });
        });
    }

    //上传部署TensorFlow arduino库
    uploadTensorFlowLibrary(data, resolve, reject) {
        return new Promise((resolve, reject) => {
            this._reject = reject;
            this._resolve = resolve;
            this.sendMessage({
                method: 'uploadTensorFlowLibrary',
                data: data
            });
        });
    }

    /**
    * 处理arduino库上传响应
    * @param {*} result 
    */
    handleUploadLibrary(data) {
        const {
            success
        } = data
        if (this._resolve) {
            this._resolve(success);
        }
        this._resolve = null;
        this._reject = null;
    }

    handleeUploadTensorFlowLibrary(data) {
        const {
            success
        } = data
        if (this._resolve) {
            this._resolve(success);
        }
        this._resolve = null;
        this._reject = null;
    }

    /**
     * 处理检查arduino库响应
     * @param {*} result 
     */
    handleCheckLibrary(data) {
        const {
            libraryExist
        } = data
        if (this._resolve) {
            this._resolve(libraryExist);
        }
        this._resolve = null;
        this._reject = null;
    }


    handleCheckTensorFlowLibrary(data) {
        const {
            libraryExist
        } = data
        if (this._resolve) {
            this._resolve(libraryExist);
        }
        this._resolve = null;
        this._reject = null;
    }

    /**
     * 断开连接
     */
    disconnect() {
        if (!this.isEquipmentConnected()) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            this._reject = reject;
            this._resolve = resolve;
            this.sendMessage({ method: 'disconnect' });
            this._disType = 1;
        });
    }

    /**
     * 发送消息
     * @param {*} message 
     */
    sendMessage(message) {
        if (this.isConnected()) {
            setTimeout(() => this._socket.send(message));
        }
    }

    /**
     * 处理扫描结果
     * @param {*} data 
     */
    handleScan(data) {
        let devices = data.filter(item => { return usable(item) }).map(item => {
            let deviceType = getDeviceType(item);
            let deviceId = 0
            if (deviceType == CMC_DEVICE_GROVEZERO) {
                deviceId = 1001;
            }else if (deviceType == CMC_DEVICE_ARDUINO || deviceType == CMC_DEVICE_ARDUINO_MEGA) {
                deviceId = 1002;
            }else if (deviceType == CMC_DEVICE_DAVINCI_AI) {
                deviceId = 1004;
            }else if (deviceType == CMC_DEVICE_MAIXDUINO) {
                deviceId = 1005;
            }else if (deviceType == CMC_DEVICE_GROVE_JOINS) {
                deviceId = 1006;
            }else if (deviceType == CMC_DEVICE_OPENCAT) {
                deviceId = 1009;
            }else if (deviceType == CMC_DEVICE_WIO_TERMINAL) {
                deviceId = 1010;
            }
            return Object.assign(item, {
                deviceType: deviceType,
                deviceId: deviceId
            });
        }).sort(({ comName: comNameA }, { comName: comNameB }) => {
            return comNameA.localeCompare(comNameB);
        });
        this._resolve(devices);
    }

    /**
     * 处理服务端
     * 发送过来的消息
     * @param {*} message 
     */
    onMessage(message) {
        const {
            method,
            data
        } = message;
        // 处理设备扫描结果
        if ('device-scan' === method) {
            this.handleScan(data);
        }else if ('device-connect' === method) {// 设备连接成功
            // 更新设备连接状态
            this._equipmentConnected = data;
            // 设备连接成功
            if (this._equipmentConnected) {
                this.emit('device-connect');
            }
        }else if ('device-disconnect' === method) {// 设备断开
            // 只有设备连接成功后，才触发断开
            if (this._equipmentConnected) {
                // 更新设备连接状态
                this._equipmentConnected = false;
                this.emit('device-disconnect', {
                    disType: this._disType
                });
            }
            // 返回断开连接结果
            if (this._disType === 1) {
                this._resolve();
                this._reject = null;
                this._resolve = null;
            }
            // 重置 disType 状态
            this._disType = 0; 
        }else if ('uploadLibrary-resp' === method) {//上传arduino库
            this.handleUploadLibrary(data);
        }else if ('uploadTensorFlowLibrary-resp' === method) {//上传arduino库
            this.handleeUploadTensorFlowLibrary(data);
        }else if ('checkLibrary-resp' === method) {//检查arduino库是否存在
            this.handleCheckLibrary(data);
        }else if ('checkTensorFlowLibrary-resp' === method) {//检查arduino库是否存在
            this.handleCheckTensorFlowLibrary(data);
        }

        // 处理其他消息
        this.emit('message', message);
    }

    /**
     * 关闭服务
     */
    close() {
        try {
            this.removeAllListeners();
            if (this._socket) {
                this._socket.close();
                this._socket = null;
            }
            this._reject = null;
            this._resolve = null;
        } catch (error) {

        }
    }
}

module.exports = SocketService;



