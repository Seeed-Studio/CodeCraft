const Arduino = require('./arduino');

class ArdunioMega extends Arduino {
    constructor(contex) {
        super(contex);
        this.deviceType = 'arduino-mega';
    }

    /**
     * 创建设备连接
     * @param {*} comName 
     */
    connect(comName, resolve, reject) {
        super.connect(comName, resolve, reject, () => {
            setTimeout(() => this.onRecognizeDeviceAuth('arduino'), 100);
        });
    }
}

module.exports = ArdunioMega;