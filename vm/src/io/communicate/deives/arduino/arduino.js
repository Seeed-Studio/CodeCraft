const Device = require('../device');


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
        this.incompletePrintStr = ''
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

    uploadBin(bin, resolve, reject) {
        this.burnBin(
            { bin: bin, type: this.deviceType },
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
            let dadaString = data.toString();
            let collectMethodList = dadaString.split('\r\n');
            collectMethodList.map((item, index) => {
                if (item != '') {
                    let collectMethodIndex = item.indexOf('c:')
                    let printfMethodIndex = item.indexOf('printf');
                    let broadcastMethodIndex = item.indexOf('broadcast');
                    let firstLeftIndex = item.indexOf('(');
                    let firstRightIndex = item.indexOf(')');
    
                    let currentParsing = ''
                    if (((collectMethodIndex > -1||printfMethodIndex > -1||broadcastMethodIndex > -1) && firstLeftIndex > -1 && firstRightIndex > -1
                        && (firstRightIndex > firstLeftIndex))) {
                        currentParsing = item;
                    } else {
                        this.incompletePrintStr = this.incompletePrintStr + item;
                        collectMethodIndex = this.incompletePrintStr.indexOf('c:')
                        printfMethodIndex = this.incompletePrintStr.indexOf('printf');
                        broadcastMethodIndex = this.incompletePrintStr.indexOf('broadcast');
                        firstLeftIndex = this.incompletePrintStr.indexOf('(');
                        firstRightIndex = this.incompletePrintStr.indexOf(')');
                        if (((collectMethodIndex > -1||printfMethodIndex > -1||broadcastMethodIndex > -1) && firstLeftIndex > -1 && firstRightIndex > -1
                            && (firstRightIndex > firstLeftIndex))) {
                            currentParsing = this.incompletePrintStr;
                            this.incompletePrintStr = '';
                        }else if (this.incompletePrintStr.length>600) {//防止普通内容输出内存消耗过大
                            this.incompletePrintStr = '';
                        }
                    }
                    if (currentParsing.length > 0) {
                        let chartDataStr = currentParsing.substring(firstLeftIndex + 1, firstRightIndex);
                        //打印方法
                        if (printfMethodIndex > -1) {
                            if (chartDataStr.split(',').length == 5) {
                                this.handlePrintMessage(chartDataStr);
                            }
                        } else if (broadcastMethodIndex > -1) {//广播
                            if (chartDataStr.split(',').length == 2) {
                                this.handleBroadcastMessage(chartDataStr)
                            }
                        } 
                    }
                }
            })
        }
        this.emit('response', data);
    }

    /**
     * 处理打印消息
     * @param {*} message 
     */
    handlePrintMessage(message){
        // message = message.replace('(', "");
        // message = message.replace(')', "");
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
        // message = message.replace('(', "");
        // message = message.replace(')', "");
        message = message.replace(' ', "");
        let result = message.split(',')
        this.emit("broadcast-response", result);
    }

}

module.exports = Arduino;