const ChMicroPython = require('./chMicroPython')
const { recognize, createChDevice } = require('./chDeviceFatory')
const formatMessage = require('format-message');

const GET_PRODUCTNAME_TIMEOUT_MS = 1200;


class MicroPython extends ChMicroPython {

    constructor(context, type) {
        super(context);

        //当前设备类型
        this.deviceType = type;
        //代理设备
        this.proxyDevice = createChDevice(this, type);

        this.__recognize = this.__recognize.bind(this);
        this.__checkVersion = this.__checkVersion.bind(this);

        //打开串口图表时，是否需要reset
        this.needResetAtOpenSerialP = false;

        this._connectResolve = null;
        this._connectReject = null;

    }

    /**
     * 连接设备
     */
    connect(comName, resolve, reject) {
        if (!this.proxyDevice) {
            reject('unkonw device ...')
            return;
        }
        let connParams = this.proxyDevice.serialParams;
        let afterConnDelay = this.proxyDevice.afterConnDelay || 0;
        super.connect(comName, connParams, () => {
            this._connectResolve = resolve;
            this._connectReject = reject;
            //连接成功后延时
            setTimeout(() => {
                // micropython连接时、发送 [0x02, 0x03]
                this.__write(Buffer.from([0x02, 0x03]));
                this.__checkChDevice();
                this.needResetAtOpenSerialP = true;
            }, afterConnDelay);
        }, () => {
            reject();
        });
    }

    setUpgradeMode(upgradeMode) {
        if (this.proxyDevice) {
            this.proxyDevice.setUpgradeMode(upgradeMode);
        }
    }

    /**
     * 上传
     */
    upload(code, resolve, reject) {
        if (this.proxyDevice) {
            this.proxyDevice.upload(code, data => {
                resolve(data);
                this.needResetAtOpenSerialP = false;
            }, reject);
        }
    }

    /**
     * 固件升级
     */
    upgrade(resolve, reject) {
        if (this.proxyDevice) {
            this.proxyDevice.upgrade(data => {
                resolve(data);
                this.needResetAtOpenSerialP = false;
            }, reject);
        }
    }

    /**
     * 判断当前版本是否需要更新
     */
    async isUpgrade() {
        if (this.proxyDevice) {
            return await this.proxyDevice.isUpgrade();
        } else {
            return false;
        }
    }

    /**
     * 获取版本号
     */
    getVersion() {
        if (this.proxyDevice) {
            return this.proxyDevice.getVersion();
        }
    }

    /**
     * 获取固件版本号
     */
    getFirmwareVersion() {
        if (this.proxyDevice) {
            return this.proxyDevice.getFirmwareVersion();
        } else {
            return firmwareVersion;
        }
    }

    /**
     * getRawData
     * @param {*} key 
     */
    getRawData(key) {
        if (this.proxyDevice) {
            return this.proxyDevice.getRawData(key);
        } else {
            return undefined;
        }
    }

    /**
     * 中断MicroPython系统
     */
    interruptMicroPython() {

        console.log("needResetAtOpenSerialP : ", this.needResetAtOpenSerialP);
        console.log("interruptMicroPython ------------ ");

        if (!this.needResetAtOpenSerialP) {
            this.write(Buffer.from([0x02, 0x03]));
            this.needResetAtOpenSerialP = true;
        }

    }

    /**
     * reset device
     */
    resetAtOpenSerial() {
        if (this.needResetAtOpenSerialP) {
            this.write('machine.reset()\r\n');
            this.needResetAtOpenSerialP = false;
        }
    }

    handleCompileResp(data) {
        if (this.proxyDevice) {
            this.proxyDevice.handleCompileResp(data)
        }
    }

    /**
     * 在线切离线；离线切在线
     * @param {*} mode 
     */
    onCodeModeChanged(mode) {
        if (!this.proxyDevice) return;
        // 离线切在线
        if (mode === 1) {
            this.__onlineMode();
            this.proxyDevice.startRawDataTask();
        }
        // 在线切离线
        if (mode === 0) {
            this.__offlineMode();
            this.proxyDevice.stopRawDataTask();
        }
    }

    /**
     * 检测设备
     */
    async __checkChDevice() {
        //定义获取productName
        //如果超时返回'';
        const getName = () => {
            return new Promise(resolve => {
                let getNameTimer = setTimeout(() => {
                    resolve('');
                }, GET_PRODUCTNAME_TIMEOUT_MS);
                this.getProductName().then(name => {
                    clearTimeout(getNameTimer);
                    resolve(name);
                });
            })
        };
        // 获取设备名称
        let productName = await getName();
        // 如果是mark设备，则需要给他设置当前语言
        if (productName == 'cyberEye') {
            let locale = formatMessage.setup().locale;
            this.setLocal(locale);
        }
        // 打印当前识别出来的设备
        console.log('productName ：', productName);
        // 当前设备和识别出的设备类型匹配
        if (productName == this.deviceType) {
            //监听rawdata-event
            this.proxyDevice.on('rawdata-event', (data) => {
                this.emit('rawdata-event', data)
            });
            // //设备识别
            // this.__recognize(productName);
            //触发产品获取版本,检测版本
            await this.proxyDevice.getVer(); this.__checkVersion();
            //连接成功
            if (this._connectResolve) {
                this._connectResolve();
                this._connectResolve = null;
            }
        } else {
            //连接失败
            if (this._connectReject) {
                this._connectReject();
                this._connectReject = null;
            }
        }
    }

    isDownFirmwareFile() {
        return this.proxyDevice.isDownFirmwareFile();
    }

    downFirmwareFile() {
        return this.proxyDevice.downFirmwareFile();
    }

    /**
     * 设备识别
     */
    __recognize(productName) {
        this.emit('device-recognize', recognize(productName));
    }

    /**
     * 检测版本
     */
    async __checkVersion() {
        this.emit('isUpgrade', await this.isUpgrade());
    }

    /**
     * 重启设备
     */
    __reset() {
        if (!this.proxyDevice) return;
        this.proxyDevice.reset();
    }

    /**
     * 在线模式
     */
    __onlineMode() {
        if (!this.proxyDevice) return;
        this.proxyDevice.onlineMode();
    }

    /**
     * 离线模式
     */
    __offlineMode() {
        if (!this.proxyDevice) return;
        this.proxyDevice.offlineMode();
    }

    /**
     * 资源释放
     */
    release() {
        super.release();
        if (this.proxyDevice) {
            this.proxyDevice.release();
            this.proxyDevice = null;
        }
    }

}

module.exports = MicroPython;