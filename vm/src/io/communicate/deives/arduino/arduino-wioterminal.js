const Arduino = require('./arduino');

class ArdunioWioTerminal extends Arduino {
    constructor(contex) {
        super(contex);
        this.deviceType = 'wio-terminal';
    }

    /**
     * 创建设备连接
     * @param {*} comName 
     */
    connect(comName, resolve, reject) {
        super.connect(comName, resolve, reject, () => {
            setTimeout(() => this.onRecognizeDeviceAuth('wio-terminal'), 100);
        });
    }
}

module.exports = ArdunioWioTerminal;