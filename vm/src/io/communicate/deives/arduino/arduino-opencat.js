const Arduino = require('./arduino');

class ArdunioOpenCat extends Arduino {

    constructor(contex) {
        super(contex);
        this.deviceType = 'arduino-opencat';
    }


    /**
     * 创建设备连接
     * @param {*} comName 
     */
    connect(comName, resolve, reject) {
        super.connect(comName, resolve, reject, () => {
            setTimeout(() => this.onRecognizeDeviceAuth('opencat'), 100);
        });
    }

}

module.exports = ArdunioOpenCat;