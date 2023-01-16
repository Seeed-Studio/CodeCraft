const ChDevice = require('./chDevice');
const { baseUrl } = require('../../../../config/serv-config');

const STATUS_IDLE = 0;
const STATUS_UPLOAD = 1;
const STATUS_UPGRADE = 2;
const STATUS_SAVEBIN = 3;
const STATUS_IS_DOWN_FIRMWARE = 4;
const DATATASK_TIME_INTERVAL = 100;

class MPython extends ChDevice {

    constructor(context) {
        super(context);

        this.productName = 'mpython';

        this._resolve = null;
        this._reject = null;

        this._status = STATUS_IDLE;

        //写入分步迭代器对象
        this.writeFileGenerator = null;

        this.writeFileTimer = null;

        this.firmwareVersion = null;

        //配置串口通道参数
        this.serialParams = {
            brk: false,
            cts: false,
            dsr: false,
            dtr: false,
            rts: false
        }
        
    }
    // 串口丢失数据处理
    // if (key === '...') {
    //     this.micropython.write(')\r\n');
    //     if (this._status === STATUS_UPLOAD) {
    //         this.writeFileCallback(false);
    //         this.writeFileGenerator = null;
    //     }
    // }
    handleMessage(message) {
        const { key, value } = message;
        // 写入文件
        if (key.indexOf('begin_write_file') > -1 ||
            key.indexOf('append_write_file') > -1 ||
            key.indexOf('machine.reset()') > -1) {
            if (this._status === STATUS_UPLOAD) {
                if (!this.writeFileGenerator) return;
                this.writeFileGenerator.next();
            }
        }
    }

    handleCompileResp(data) {
        if (this._status === STATUS_SAVEBIN ||
            this._status === STATUS_UPGRADE ||
            this._status === STATUS_IS_DOWN_FIRMWARE) {
            const { compileSucc, compileType, content } = data;
            if (compileSucc) {
                this._resolve && this._resolve(content)
            } else {
                this._reject && this._reject(content);
            }
            this._status === STATUS_IDLE;
        }
    }

    /**
     * 设备断开
     */
    handleDeviceConnecteError() {
        if (this._status === STATUS_IDLE) return;
        // 烧录时设备断开，烧录失败
        if (this._status === STATUS_UPLOAD) {
            this.writeFileCallback(false);
            this.writeFileGenerator = null;
        }
    }


    /**
     * 处理写文件回调
     */
    writeFileCallback(isSucc) {
        clearTimeout(this.writeFileTimer);
        switch (this._status) {
            case STATUS_IDLE: return;
            case STATUS_UPLOAD: // 上传
                isSucc ? this.__writeSucc() : this.__writeFail('timeout...');
                break;
        }
        this._status = STATUS_IDLE;
    }


    /**
     * 上传
     */
    async upload(code, resolve, reject) {
        // 停止rowdata获取
        this.stopRawDataTask();
        // 切换write状态为：上传
        this._status = STATUS_UPLOAD;
        this._resolve = resolve;
        this._reject = reject;

        let codeList = this.unpack(code);

        // 分步迭代器
        this.writeFileGenerator = this.createWriteFileGenerator([
            { name: 'user.py', codeList }
        ]);

        this.writeFileGenerator.next();
    }

    isDownFirmwareFile() {
        return new Promise((resolve, reject) => {
            this._status = STATUS_IS_DOWN_FIRMWARE;
            this._resolve = resolve;
            this._reject = reject;
            this.compile({
                compiler: 'mpython',
                data: {
                    type: 'is-down-firmware',
                    data: {
                        version: this.firmwareVersion
                    }
                }
            });
        })
    }

    downFirmwareFile() {
        return new Promise((resolve, reject) => {
            this._status = STATUS_SAVEBIN;
            this._resolve = resolve;
            this._reject = reject;
            this.compile({
                compiler: 'mpython',
                data: {
                    type: 'save-bin',
                    data: {
                        url: `${baseUrl}/static/firmware/mpython/mpython.bin`,
                        version: this.firmwareVersion
                    }
                }
            });
        })
    }

    /**
    * 固件升级
    */
    async upgrade(resolve, reject) {
        // 切换write状态为：更新
        this._status = STATUS_UPGRADE;
        this._resolve = resolve;
        this._reject = reject;

        this.compile({
            compiler: 'mpython',
            comName: this.micropython.comName,
            data: {
                type: 'upgrade',
                upgradeMode: this.upgradeMode
            }
        });
    }

    compile(data) {
        this.micropython.compile(data);
    }

    /**
     * 拆包
     */
    unpack(code) {
        code = code
            .replace(/\\/g, '\\\\')// '\'字符串 替换为'\\'字符串
            .replace(/\n/g, '\\n');// 换行符 替换为'\n'字符串

        let packageSize = 128;
        let codeList = [];


        while (code.length > 0) {
            let codeItem = code.substr(0, packageSize);

            // 若最后一个字符为特殊符号，往上截取
            while (codeItem[packageSize - 1] === '\\' ||
                codeItem[packageSize - 1] === `'`) {
                packageSize--;
                codeItem = code.substr(0, packageSize);
            }

            codeList.push(codeItem);
            code = code.substr(packageSize);
        }
        return codeList;
    }

    /**
     * 创建写入分步迭代器
     */
    *createWriteFileGenerator(fileList) {
        this.micropython.write(Buffer.from([0x02, 0x03]));
        this.micropython.write('from chproduct import *\r\n');

        for (let file of fileList) {
            yield this.micropython.write(`begin_write_file('${file.name}')\r\n`)
            // 烧录分包数据
            for (let codeItem of file.codeList) {
                yield this.micropython.write(`append_write_file('${file.name}','''${codeItem}''')\r\n`, true)
            }
        }
        this.reset();
        yield this.writeFileCallback(true);
    }

    /**
     * 重启
     */
    reset() {
        this.micropython.write('machine.reset()\r\n');
    }

    /**
     * 写入成功回调
     */
    __writeSucc(args) {
        if (!this._resolve) return;
        this._resolve(args);
        this._resolve = null;
        this._reject = null;
        this.writeFileGenerator = null;
    }

    /**
     * 写入失败回调
     */
    __writeFail(args) {
        if (!this._reject) return;
        this._reject(args);
        this._resolve = null;
        this._reject = null;
        this.writeFileGenerator = null;
    }
    offlineMode() { }

}

module.exports = MPython;