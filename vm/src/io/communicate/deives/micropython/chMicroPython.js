const ChBaseDevice = require("./chBaseDevice")
const EXEC_STATUS_IDLE = 0;
const EXEC_STATUS_CONECT = 1;

/**
 * 中文正则
 */
const zhReg = /[\u4e00-\u9fa5]/g;

/**
 * 中文字符unicode
 * @param {*} str 
 */
const zhCharUnicode = function (str) {
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs += "\\u" + ("0000" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return rs;
}

/**
 * 中文字符编码过滤
 * @param {*} string 
 */
const zhCharCodeFilter = (string = "") => {
    let chars = string.match(zhReg);
    if (chars &&
        chars.length > 0) {
        chars.forEach(item => {
            string = string.replace(item, zhCharUnicode)
        })
    }
    return string;
}

/**
 * micropython 指令应答数据解析
 * @param {*} buffer 
 * @param {*} handleMessage 
 */
let response = '';

const parseCommand = (buffer, handleMessage) => {
    response += buffer.toString('utf-8');
    console.log('%c' + buffer.toString('utf-8'), 'color:red');

    // 收到...，串口丢失数据中包含），抛到上层按需处理
    if (response.indexOf('...') > -1) {
        handleMessage({
            key: '...',
            value: 'error'
        });
    }

    // 进入download模式，清空存在异常数据的response
    if (response.indexOf('waiting for download') > -1) {
        response = '';
    }

    let lastIndex = response.lastIndexOf('>>>');
    if (lastIndex !== -1) {
        let processed = response.substring(0, lastIndex);
        let datas = processed.split('>>>');

        datas.forEach(item => {
            let data = item.split('\r\n');
            let key = data[0];
            let value = data[1] || '';
            handleMessage({ key, value });
        })
        response = response.substring(lastIndex + 3);
    }
}

/**
 * micropython 指令应答数据解析 print((0,0,0,0,0))
 * @param {*} buffer
 * @param {*} handleMessage 
 */
let responseForPrint = '';

const parseCommandForPrint = (buffer, handleMessage) => {

    responseForPrint += buffer.toString('utf-8');

    if (responseForPrint.indexOf('waiting for download') > -1) {
        responseForPrint = '';
    }

    // 解析print resp
    let firstLeftIndex = responseForPrint.indexOf('(');
    let firstRightIndex = responseForPrint.indexOf(')');
    if (firstLeftIndex != -1
        && firstRightIndex != -1
        && firstRightIndex > firstLeftIndex) {
        let chartDataStr = responseForPrint.substring(firstLeftIndex, firstRightIndex + 1);
        if (chartDataStr.split(',').length == 5) {
            handleMessage(chartDataStr);
        }
        responseForPrint = responseForPrint.substring(firstRightIndex + 1);
    } 
    // 过滤掉特殊回调文本
    else if (firstRightIndex != -1) {
        responseForPrint = responseForPrint.substring(firstRightIndex + 1);
    }

    let lastIndex = responseForPrint.lastIndexOf('>>>');
    if (lastIndex !== -1) {
        responseForPrint = responseForPrint.substring(lastIndex + 3);
    }

}

// const specialConfig = {
//     rtscts: true,
//     xoff: true,
//     xon: true
// }

class ChMicroPython extends ChBaseDevice {

    constructor(context) {
        super();

        this.onResponse = this.onResponse.bind(this);
        this.onCodeModeChanged = this.onCodeModeChanged.bind(this);

        this.context = context;
        this.context.on('message', this.onResponse);

        this.on('onCodeModeChanged', this.onCodeModeChanged);

        this.execStatus = EXEC_STATUS_IDLE;
        this.comName = null;

        this.isSpecial = false;
        this.setOptions = null;
    }

    /**
     * 连接设备
     * @param {*} comName 
     * @param {*} connParams 
     * @param {*} resolve 
     * @param {*} reject 
     */
    connect(comName, connParams, resolve, reject) {
        this.comName = comName;
        this.__resolve = resolve;
        this.__reject = reject;
        this.execStatus = EXEC_STATUS_CONECT;
        this.context.sendMessage({
            method: 'connect',
            data: {
                comName: comName,
                setOptions: connParams
            }
        });
    }

    write(command, hasString = false) {
        return this.__write(command, hasString);
    }

    setLocal(lang) {
        this.__write('from chproduct import *\r\n'); // maixduino兼容
        this.__write(`get_system_info('${lang}')\r\n`);
    }

    getProductName() {
        this.__write('from chproduct import *\r\n'); // maixduino兼容
        this.__write('product_name()\r\n');
        return new Promise((resolve) => {
            this._getProductNameResolve = resolve;
        })
    }

    getProductVersion() {
        this.__write('product_version()\r\n');
        return new Promise((resolve) => {
            this._getProductVersionResolve = resolve;
        })
    }

    /**
     * 写数据
     * @param {*} command 
     */
    __write(command, hasString = false) {
        console.log('%c' + command, 'color:blue');
        if (hasString) {
            this.context.sendMessage({ method: 'write', data: zhCharCodeFilter(command) });
        } else {
            this.context.sendMessage({ method: 'write', data: command });
        }
    }

    compile(data) {
        this.context.sendMessage({
            method: 'compile',
            data
        });
    }

    /**
     * 处理消息
     * @param {*} message 
     */
    handleMessage(message) {
        const {
            key,
            value
        } = message;
        if (key.indexOf('product_name()') > -1) {
            this.productName = value
                .replace(/\\r/g, '')
                .replace(/'/g, '')
                .replace(/\\n/g, '')
            if (this._getProductNameResolve) {
                this._getProductNameResolve(this.productName);
            }
        }
        else if (key.indexOf('product_version()') > -1) {
            let version = value
                .replace(/\\r/g, '')
                .replace(/'/g, '')
                .replace(/\\n/g, '')
            this.version = version;
            if (this._getProductVersionResolve) {
                this._getProductVersionResolve(this.version);
            }
        }
        else {
            this.emit('handle-message', message);
        }
    }

    /**
     * 处理打印消息
     * @param {*} message 
     */
    handlePrintMessage(message) {
        message = message.replace('(', "");
        message = message.replace(')', "");
        message = message.replace(' ', "");
        let result = message.split(',')
            .map(item => {
                if (item.indexOf('null') != -1) {
                    return null;
                } else {
                    return Number(item);
                }
            });
        this.emit("print-response", result);
    }

    /**
     * 处理数据消息
     * @param {*} message 
     */
    onResponse(message) {
        const {
            method,
            data
        } = message;
        // 设备连接成功
        if ('device-connect' === method) {
            // 非连接状态，不处理
            if (this.execStatus !== EXEC_STATUS_CONECT) return;
            if (data) {
                if (this.__resolve) {
                    this.__resolve();
                    this.__resolve = null;
                }
                if (this.__reject) this.__reject = null;
                this.execStatus = EXEC_STATUS_CONECT;
            } else {
                if (this.__reject) {
                    this.__reject();
                    this.__reject = null;
                }
                if (this.__resolve) this.__resolve = null;
                this.execStatus = EXEC_STATUS_IDLE;
            }
        }
        if ('device-disconnect' === method) {
            this.onDeviceDisconnect();
        }
        // 数据上报
        if ('report-resp' === method) {
            let respData = JSON.parse(data);
            if (respData && respData.data) {
                parseCommand(Buffer.from(respData.data), message => { this.handleMessage(message) });
                parseCommandForPrint(Buffer.from(respData.data), message => { this.handlePrintMessage(message) });
            }
        }
        if ('compile-resp' === method) {
            this.handleCompileResp(data);
        }
    }

    /**
     * 处理代码模式变化
     * @param {*} mode 
     */
    onCodeModeChanged(mode) {
        console.log('onCodeModeChanged', mode)
    }

    /**
     * 设备断开连接
     */
    onDeviceDisconnect() {
        response = ''; // 清空response缓存
        if (this.execStatus === EXEC_STATUS_IDLE) return;
        if (this.__reject) {
            this.__reject();
            this.__reject = null;
        }
        if (this.__resolve) this.__resolve = null;
        this.execStatus = EXEC_STATUS_IDLE;
        this.emit('device-disconnect');
    }

    /**
     * 释放资源
     */
    release() {
        super.release();
        this.context.removeListener('message', this.onResponse);
        this.context.removeListener('onCodeModeChanged', this.onCodeModeChanged);
        this.context = null;
    }


}

module.exports = ChMicroPython;