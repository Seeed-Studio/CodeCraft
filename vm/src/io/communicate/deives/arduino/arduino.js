const Device = require('../device');

/**
 * micropython 指令应答数据解析 print((0,0,0,0,0))
 * @param {*} buffer
 * @param {*} handleMessage 
 */
let responseForPrint = '';

const parseCommand = (buffer, handlePrintMessage, handleBroadcastMessage) => {
    responseForPrint += buffer.toString('utf-8');

    if (responseForPrint.indexOf('waiting for download') > -1) {
        responseForPrint = '';
    }

    let printfMethodIndex = responseForPrint.indexOf('printf');
    let broadcastMethodIndex = responseForPrint.indexOf('broadcast');

    // 解析print resp
    let firstLeftIndex = responseForPrint.indexOf('(');
    let firstRightIndex = responseForPrint.indexOf(')');

    //判断合法的打印或者广播
    if ((printfMethodIndex != -1 || broadcastMethodIndex != -1) &&
        (firstLeftIndex != -1 && firstRightIndex != -1 && firstRightIndex > firstLeftIndex)) {
        //截取方法体
        let chartDataStr = responseForPrint.substring(firstLeftIndex, firstRightIndex + 1);
        //打印方法
        if (printfMethodIndex != -1) {
            if (chartDataStr.split(',').length == 5) {
                handlePrintMessage(chartDataStr);
            }
        } else if (broadcastMethodIndex != -1) {//广播
            if (chartDataStr.split(',').length == 2) {
                handleBroadcastMessage(chartDataStr)
            }
        }
        //处理过的字符截取掉
        responseForPrint = responseForPrint.substring(firstRightIndex + 1);

        // if (firstRightIndex != -1) {
        //     responseForPrint = responseForPrint.substring(firstRightIndex + 1);
        // }
    }

}

class Arduino extends Device {

    constructor(contex) {
        super(contex);
        //编译器对象
        this.compiler = 'arduino';
        //是否需要打开设备
        //如果无需打开设备只记录comName即可
        this.isNeedOpenDevice = false;
        //设备类型
        this.deviceType = '';
    }

    /**
     * 创建设备连接
     * @param {*} comName 
     */
    connect(comName, resolve, reject, realSucc) {
        if (this.isNeedOpenDevice) {
            this.comName = comName;
            super.connect(comName, ()=>{
                resolve();
                realSucc();
            }, reject);
        } else {
            this.comName = comName;
            resolve();
        }
    }

    /**
     * 上传代码
     * @param {*} code 
     * @param {*} resolve 
     * @param {*} reject 
     */
    upload(code, resolve, reject) {
        this.compile(
            { code: code, type: this.deviceType },
            resolve, reject
        );
    }

    /**
     * 数据响应
     * @param {*} data 
     */
    onResponse(data) {
        //剔除全是0的内容
        if (Number(data.join('')) != 0) {
            parseCommand(data, message => { this.handlePrintMessage(message) }, message => { this.handleBroadcastMessage(message) });
        }
        this.emit('response', data);
    }

    /**
     * 处理打印消息
     * @param {*} message 
     */
    handlePrintMessage(message){
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
     * 处理广播消息
     * @param {*} message 
     */
    handleBroadcastMessage(message){
        message = message.replace('(', "");
        message = message.replace(')', "");
        message = message.replace(' ', "");
        let result = message.split(',')
        this.emit("broadcast-response", result);
    }

}

module.exports = Arduino;