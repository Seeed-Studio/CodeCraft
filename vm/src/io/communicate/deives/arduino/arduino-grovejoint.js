const Arduino = require('./arduino');

class ArdunioGroveJoint extends Arduino {
    constructor(contex) {
        super(contex);
        this.deviceType = 'grove-joint';
    }

    /**
     * 创建设备连接
     * @param {*} comName 
     */
    connect(comName, resolve, reject) {
        super.connect(comName, resolve, reject, () => {
            setTimeout(() => this.onRecognizeDeviceAuth('grove-joint'), 100);
        });
    }
}

module.exports = ArdunioGroveJoint;