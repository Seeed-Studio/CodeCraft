const ChBaseDevice = require("./chBaseDevice")
const { getFirmwareInfo } = require('../../../../util/firmware-request')

// rawdata task time interval
// const DATATASK_TIME_INTERVAL = 50;

class ChDevice extends ChBaseDevice {

    constructor(micropython) {
        super();

        this.handleMessage = this.handleMessage.bind(this);
        this.handleDeviceConnecteError = this.handleDeviceConnecteError.bind(this);

        /**
         * micropython 实例对象
         */
        this.micropython = micropython;
        this.micropython.on('handle-message', this.handleMessage)
        this.micropython.on('device-disconnect', this.handleDeviceConnecteError)

        /**
         * rawData 数据词典
         */
        this.rawDataDictionary = {};

        this.firmwareFileNames = [];

        /**
         * 串口通道参数
         */
        this.serialParams = null;

        this.upgradeMode = 1;

        //连接成功后延时
        this.afterConnDelay = 0;
    }

    setUpgradeMode(upgradeMode) {
        this.upgradeMode = upgradeMode;
    }

    isUpgrade() {
        return new Promise((resolve, reject) => {
            // resolve(false);
            getFirmwareInfo({
                type: this.productName
            }).then(res => {
                console.log('getFirmwareInfo', res);
                this.firmwareVersion = res.version;
                this.firmwareFileNames = res.fileNames;
                // resolve(true);
                resolve(this.firmwareVersion !== this.version);
            }).catch(error => {
                resolve(false);
            })
        });
    }

    startRawDataTask() { }

    stopRawDataTask() {
        if (this.rawDataTask) {
            clearInterval(this.rawDataTask);
            this.rawDataTask = null;
            this.rawDataDictionary = {};
        }
    }

    write(command) {
        this.micropython.write(command);
    }

    upload(code, resolve, reject) { }

    upgrade(resolve, reject) { }

    getRawData(key) {
        return this.rawDataDictionary[key];
    }

    /**
     * 异步获取版本信息
     */
    getVer() {
        return this.micropython.getProductVersion().then(version => this.version = version);
    }



    handleDeviceConnecteError() {
        console.log('123321');
    }

    handleWriteFileResponse(message) { }

    handleMessage() { }



    /**
     * 释放资源
     */
    release() {
        this.micropython.removeListener('handle-message', this.handleMessage);
        this.micropython.removeListener('device-disconnect', this.handleDeviceConnecteError);
        this.micropython = null;
        this.removeAllListeners();
        this.stopRawDataTask();
    }

}

module.exports = ChDevice;