const { EventEmitter } = require("events")

class ChBaseDevice extends EventEmitter {

    constructor() {
        super();

        this.productName = '';

        this.version = '9999.9999.9999.9999';
        this.firmwareVersion = '9999.9999.9999.9999';
    }

    connect(comName, resolve, reject) { }

    write(command) { }

    getProductName() { }

    setLocal(lang) {}

    getProductVersion() { }

    upload(code, resolve, reject) { }

    upgrade(resolve, reject) { }

    getRawData(key) { }

    getVersion() {
        return this.version;
    }

    getFirmwareVersion() {
        return this.firmwareVersion;
    }

    // 对比 version、firmwareVersion
    isUpgrade() {
        return false;
    }

    // 释放资源
    release() {
        this.removeAllListeners();
    }

}

module.exports = ChBaseDevice;