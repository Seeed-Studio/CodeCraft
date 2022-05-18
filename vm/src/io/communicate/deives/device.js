const { EventEmitter } = require("events")
const { recognize } = require('./device-filter')

const DEVICE_STATUS_IDLE = 0;
const DEVICE_STATUS_CONECT = 1;
const DEVICE_STATUS_COMPILE = 2;

class Device extends EventEmitter {

    constructor(contex) {
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
         * 设备编译器
         */
        this.compiler = null;
        /**
         * 绑定消息接受函数
         */
        this.onReceiveMessage = this.onReceiveMessage.bind(this);
        /**
         * 通讯引擎上下文
         * 监听消息事件
         */
        this._commCotext = contex;
        this._commCotext.on('message', this.onReceiveMessage);
        /**
         * 设备状态
         */
        this.deviceStatus = DEVICE_STATUS_IDLE;

        /**
         * 当前要连接
         * 的设备
         */
        this.comName = null;
    }

    /**
     * 创建设备连接
     * @param {*} comName 
     */
    connect(comName, resolve, reject) {
        this._reject = reject;
        this._resolve = resolve;
        this.deviceStatus = DEVICE_STATUS_CONECT;
        this._commCotext.sendMessage({
            method: 'connect',
            data: {
                comName: comName
            }
        });
    }

    /**
     * write
     * @param {*} data 
     */
    write(_data) {
        // console.log('write:', _data, '\n');
        this._commCotext.sendMessage({
            method: 'write',
            data: _data
        });
    }

    /**
     * update baudrate
     * @param {*} _data 
     */
    updateBaudRate(_data) {
        this._commCotext.sendMessage({
            method: 'update-baudrate',
            data: _data
        });
    }

    /**
     * 上传
     * @param {*} code 
     * @param {*} resolve 
     * @param {*} reject 
     */
    upload(code, resolve, reject) {

    }

    /**
     * 升级
     * @param {*} resolve 
     * @param {*} reject 
     */
    upgrade(resolve, reject) {

    }

    /**
     *  * complie
     * @param {*} _data 
     * @param {*} reject 
     * @param {*} resolve 
     */
    compile(_data, resolve, reject) {
        this._reject = reject;
        this._resolve = resolve;
        this.deviceStatus = DEVICE_STATUS_COMPILE;
        this._commCotext.sendMessage({
            method: 'compile',
            data: {
                comName: this.comName ? this.comName : null,
                compiler: this.compiler,
                data: _data,
            }
        });
    }

    getVersion() { }

    getFirmwareVersion() { }

    /**
     * 识别设备
     * @param {*} type 
     */
    onRecognizeDeviceAuth(type) {
        this.emit('device-recognize', recognize(type));
    }

    /**
     * 数据上报
     * @param {*} data 
     */
    onResponse(data) {
        console.log('onResponse : ' + data);
    }

    /**
    * 调试模式放生变化
    * @param {*} mode 
    */
    onDebugModeChanged(mode) {

    }

    /**
     * 处理设备连接结果
     * @param {*} result 
     */
    _handleConnect(isSucc) {
        // 正在连接设备
        if (this.deviceStatus === DEVICE_STATUS_CONECT) {
            if (isSucc) {
                if (this._resolve) {
                    this._resolve();
                }
                this.deviceStatus = DEVICE_STATUS_IDLE;
                this._resolve = null;
                this._reject = null;

            } else {
                if (this._reject) {
                    this._reject();
                }
                this.deviceStatus = DEVICE_STATUS_IDLE;
                this._resolve = null;
                this._reject = null;
            }
        }
    }

    /**
     * 设备连接
     * 断开
     */
    onDeviceDisConnect() {
        if (this.deviceStatus
            !== DEVICE_STATUS_IDLE) {
            if (this._reject) {
                this._reject();
            }
            this.deviceStatus = DEVICE_STATUS_IDLE;
            this._resolve = null;
            this._reject = null;
        }
    }
    /**
     * 处理编译
     * @param {*} data 
     */
    _handleCompile(data) {
        console.log('data',data)
        // 正在编译代码
        if (this.deviceStatus === DEVICE_STATUS_COMPILE) {
            const {
                compileSucc,
                compileType,
                content
            } = data;
            if (compileSucc) {
                if (this._resolve) {
                    this._resolve({
                        data: content,
                        compileType: compileType
                    });
                    this.deviceStatus = DEVICE_STATUS_IDLE;
                    this._resolve = null;
                    this._reject = null;
                }
            } else {
                if (this._reject) {
                    this._reject();
                }
                this.deviceStatus = DEVICE_STATUS_IDLE;
                this._resolve = null;
                this._reject = null;
            }
        }
    }

    /**
     * 处理消息
     * @param {*} message 
     */
    onReceiveMessage(message) {
        const {
            method,
            data
        } = message;
        // 设备连接成功
        if ('device-connect' === method) {
            this._handleConnect(data);
        }
        if ('device-disconnect' === method) {
            this.onDeviceDisConnect();
        }
        // 编译
        if ('compile-resp' === method) {
            this._handleCompile(data);
        }
        // 数据上报
        if ('report-resp' === method) {
            let respData = JSON.parse(data);
            if (respData && respData.data) {
                this.onResponse(Buffer.from(respData.data));
            }
        }
    }

    /**
     * 释放资源
     */
    release() {
        this._commCotext.removeListener('message', this.onReceiveMessage);
        this._commCotext = null;
        this.removeAllListeners()
    }

}


module.exports = Device;