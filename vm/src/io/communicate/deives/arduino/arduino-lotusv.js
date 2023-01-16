const Arduino = require('./arduino');

class ArdunioLotusv extends Arduino {

    constructor(contex) {
        super(contex);
        this.deviceType = 'arduino-lotusv';
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

module.exports = ArdunioLotusv;