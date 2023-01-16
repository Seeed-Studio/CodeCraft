const MainControl = require('./mcontrol')
const l2 = require('../../hex/grovezero/l2')
const l3 = require('../../hex/grovezero/l3')
const l4 = require('../../hex/grovezero/l4')



/**
 * 主控固件
 */
const firmwareHex = {
    l2: l2,
    l3: l3,
    l4: l4
}

const GROVEZERO_UPGRADE_STATUS_IDLE = 0;
const GROVEZERO_UPGRADE_STATUS_L2 = 1;
const GROVEZERO_UPGRADE_STATUS_L3 = 2;
const GROVEZERO_UPGRADE_STATUS_L4 = 3;

class Grovezero extends MainControl {

    constructor(contex) {
        super(contex);

        this.name = 'grovezero';
        
        this.resetFlag = 'B';
        /**
         * _reslove
         * 成功结果
         */
        this._reslove = null;

        /**
         * 失败结果
         */
        this._reject = null;

        /**
         * 主控固件版本
         */
        this.firmwareVer = {
            l2: '2110',
            l3: '3107',
            l4: '4117'
        }
        /**
         * 固件升级状态
         */
        this.firmwareUpgradeStatus = GROVEZERO_UPGRADE_STATUS_IDLE;
    }

    /**
     * 上传代码
     * @param {*} code 
     */
    upload(code, reslove, reject) {
        this._reject = reject;
        this._reslove = reslove;
        // 更新执行状态
        this.execStatus = MainControl.EXEC_STATUS_CODE;
        // 执行编译、上传
        this._context.compile(code,
            (result) => {
                const {
                    data,
                    compileType
                } = result;
                console.log('compileType : ' + compileType);
                this._upgradeHex(data);
            }, () => {
                this._reject('compile fail');
            });
    }

    /**
     * 升级
     */
    async upgrade(reslove, reject) {
        // 设置回调
        this._reject = reject;
        this._reslove = reslove;
        // 重置主控
        await this._context.resetControl();
        // 更新执行状态
        this.execStatus = MainControl.EXEC_STATUS_UPGRADE;
        // 检测升级
        this._checkAndUpgrade();
    }

    _checkAndUpgrade() {
        // 获取当前固件版本号
        const {
            l2 = '0000',
            l3 = '0000',
            l4 = '0000'
        } = this.version;
        // 升级l2固件
        if (l2 < this.firmwareVer.l2) {
            console.log('upgrade l2 ....');
            setTimeout(() => {
                this.firmwareUpgradeStatus = GROVEZERO_UPGRADE_STATUS_L2;
                this._upgradeHex(firmwareHex.l2);
            }, 500);
        }
        // 升级l3固件
        else if (l3 < this.firmwareVer.l3) {
            console.log('upgrade l3 ....');
            setTimeout(() => {
                this.firmwareUpgradeStatus = GROVEZERO_UPGRADE_STATUS_L3;
                this._upgradeHex(firmwareHex.l3);
            }, 500);
        }
        // 升级l4固件
        else if (l4 < this.firmwareVer.l4) {
            console.log('upgrade l4 ....');
            setTimeout(() => {
                this.firmwareUpgradeStatus = GROVEZERO_UPGRADE_STATUS_L4;
                this._upgradeHex(firmwareHex.l4);
            }, 500);
        }
    }

    /**
     * 升级主控固件
     * @param {*} hexstr 
     */
    _upgradeHex(hexstr) {
        this._sendToLowerComputer(this._packageToBuffer(hexstr));
    }

    /**
     * 判断是否需要
     * 固件升级
     */
    isUpgrade() {
        const {
            l2,
            l3,
            l4
        } = this.version;
        return l2 < this.firmwareVer.l2 || l3 < this.firmwareVer.l3 || l4 < this.firmwareVer.l4;
    }

    /**
     * 上传、升级结果回调
     */
    onResult(result) {
        super.onResult(result);
        // EXEC_STATUS_IDLE状态不处理
        if (this.execStatus === MainControl.EXEC_STATUS_IDLE) {
            return;
        }
        // 失败
        if (!result) {
            if (this._reject) {
                this._reject();
            }
            this.execStatus = MainControl.EXEC_STATUS_IDLE;
            this.firmwareUpgradeStatus = GROVEZERO_UPGRADE_STATUS_IDLE;
            this._reject = null;
            this._reslove = null;
            return;
        }
        //上传，返回上传结果
        if (this.execStatus === MainControl.EXEC_STATUS_CODE) {
            if (this._reslove) {
                this._reslove('upload succc');
            }
            this.execStatus = MainControl.EXEC_STATUS_IDLE;
            this._reject = null;
            this._reslove = null;
        }
        //升级
        else if (this.execStatus === MainControl.EXEC_STATUS_UPGRADE) {
            if (this.firmwareUpgradeStatus
                === GROVEZERO_UPGRADE_STATUS_L2) {
                this.version.l2 = this.firmwareVer.l2;
            }
            if (this.firmwareUpgradeStatus
                === GROVEZERO_UPGRADE_STATUS_L3) {
                this.version.l3 = this.firmwareVer.l3;
            }
            if (this.firmwareUpgradeStatus
                === GROVEZERO_UPGRADE_STATUS_L4) {
                this.version.l4 = this.firmwareVer.l4;
            }
            // 判断是否还需要升级
            if (!this.isUpgrade()) {
                if (this._reslove) {
                    this._reslove('upgrade succc');
                }
                this.execStatus = MainControl.EXEC_STATUS_IDLE;
                this.firmwareUpgradeStatus = GROVEZERO_UPGRADE_STATUS_IDLE;
                this._reject = null;
                this._reslove = null;
            } else {
                // 继续升级
                this._checkAndUpgrade();
            }
        }
    }

    /**
     * 设备断开事件
     */
    onDeviceDisconnect() {
        // 非 EXEC_STATUS_IDLE状态处理
        if (this.execStatus !== MainControl.EXEC_STATUS_IDLE) {
            if (this._reject) {
                this._reject();
            }
            this.execStatus = MainControl.EXEC_STATUS_IDLE;
            this.firmwareUpgradeStatus = GROVEZERO_UPGRADE_STATUS_IDLE;
            this._reject = null;
            this._reslove = null;
        }
    }

    /**
     * package
     * @param {*} hex 读取的hex字符串
     * @param {*} isCrc 是否计算crc
     */
    _packageToBuffer(hex, isCrc = true) {
        let addrList = [];
        let hexList = [];
        let baseAddrList = [];
        hex = hex.split(':');
        let hexLen = hex.length;
        for (let i = 1, type, len, addr; i < hexLen; i++) {
            type = hex[i].slice(6, 8);
            if (type === '00') {
                len = parseInt(`0x${hex[i].slice(0, 2)}`);
                addr = parseInt(`0x${hex[i].slice(2, 6)}`);
                addrList.push(addr + baseAddrList[baseAddrList.length - 1]);
                hexList.push([]);

                for (let j = 0, a, b; j < len; j++) {
                    a = j * 2 + 8;
                    b = a + 2;
                    hexList[hexList.length - 1].push(parseInt(`0x${hex[i].slice(a, b)}`));
                }
            } else if (type === '02') {
                baseAddrList.push(parseInt(`0x${hex[i].slice(8, 12)}`) << 4);
            }
        }

        let addrListLen = addrList.length;
        let buf = Buffer.alloc(addrListLen * 16, 0xFF);
        for (let i = 0; i < addrListLen; i++) {
            Buffer.from(hexList[i]).copy(buf, addrList[i] - addrList[0]);
        }
        buf.writeUInt16LE(buf.length >> 2, 4); //长度 4byte为一个单位
        // buf.writeUInt16LE(0x0001, 6); //版本号
        if (isCrc) {
            let crc = 0x00000000;
            for (let i = 0, bufLen = buf.length; i < bufLen; i = i + 4) {
                crc = crc + buf.readUInt32LE(i);
            }
            crc = ~crc + 1;
            console.log('crc:', crc);
            buf.writeUInt32LE(crc >>> 0, 12);
        }
        return {
            buf: buf,
            addrList: addrList
        };
    }


}

module.exports = Grovezero;