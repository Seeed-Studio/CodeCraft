const ChDevice = require('./chDevice');

const { baseUrl } = require('../../../../config/serv-config');

const STATUS_IDLE = 0;
const STATUS_UPLOAD = 1;
const STATUS_UPGRADE = 2;
const STATUS_SAVEBIN = 3;
const STATUS_IS_DOWN_FIRMWARE = 4;
const DATATASK_TIME_INTERVAL = 250;

class Elfbot extends ChDevice {

    constructor(context) {
        super(context);

        this.productName = 'elfbot';

        this._resolve = null;
        this._reject = null;

        this._status = STATUS_IDLE;

        // 写入分步迭代器对象
        this.writeFileGenerator = null;

        this.writeFileTimer = null;

        this.firmwareVersion = null;
    }

    handleMessage(message) {
        const { key, value } = message;
        // 串口丢失数据处理
        if (key === '...') {
            this.micropython.write(')\r\n');
            if (this._status === STATUS_UPLOAD) {
                this.writeFileCallback(false);
                this.writeFileGenerator = null;
            }
        }

        // 写入文件
        // enabler.stop  stop_user_tasks 需要延时 其他不需要
        if (key.indexOf('enabler.stop') > -1 || key.indexOf('stop_user_tasks') > -1) {
            if (this._status === STATUS_UPLOAD) {
                if (!this.writeFileGenerator) return;
                setTimeout(() => {
                    this.writeFileGenerator.next();
                }, 1000)
            }
        } else if (key.indexOf('begin_write_file') > -1 ||
            key.indexOf('append_write_file') > -1 ||
            key.indexOf('reset_machine') > -1) {
            if (this._status === STATUS_UPLOAD) {
                if (!this.writeFileGenerator) return;
                this.writeFileGenerator.next();
            }
        }

        // 原始数据，将原始数据保存到字典
        if (key.indexOf('enabler._rawdata_task._event_dispatcher._rawdata_dict') > -1 || key.indexOf('enabler.get_rawdata') > -1) {
            if (this._status !== STATUS_IDLE) return;
            try {
                let rawdata = JSON.parse(value.replace(/'/g, '"')) || {};
                for (let key in rawdata) {
                    this.rawDataDictionary[key] = rawdata[key]
                    this.emit('rawdata-event', {
                        key: key,
                        value: rawdata[key]
                    });
                }
            }
            catch (e) { console.log(e); }
        }

        if(key.indexOf('elfbot.is_button_pressed') > -1){
            this.rawDataDictionary['keyevent'] = parseInt(value);
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
     * 发送获取 rawDatas 
     */
    async handleGetRawDatas() {
        this.micropython.write(`enabler._rawdata_task._event_dispatcher._rawdata_dict\r\n`);
        this.micropython.write(`elfbot.is_button_pressed()\r\n`);
    }

    /**
     * 设备断开
     */
    handleDeviceConnecteError() {
        if (this._status === STATUS_IDLE) return;
        this.writeFileCallback(false, 'device disconnect...');
        this.writeFileGenerator = null;
    }


    /**
     * 处理写文件回调
     */
    writeFileCallback(isSucc, errMsg = 'timeout...') {
        clearTimeout(this.writeFileTimer);
        switch (this._status) {
            case STATUS_IDLE: return;
            case STATUS_UPLOAD: // 上传
                isSucc ? this.__writeSucc() : this.__writeFail(errMsg);
                break;
        }
        this._status = STATUS_IDLE;
    }


    /**
     * 启动rowdata定时请求
     */
    startRawDataTask() {
        this.rawDataTask = setInterval(() => this.handleGetRawDatas(), DATATASK_TIME_INTERVAL);
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


    compile(data) {
        this.micropython.compile(data);
    }

    isDownFirmwareFile() {
        return new Promise((resolve, reject) => {
            this._status = STATUS_IS_DOWN_FIRMWARE;
            this._resolve = resolve;
            this._reject = reject;
            this.compile({
                compiler: 'elfbot',
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
                compiler: 'elfbot',
                data: {
                    type: 'save-bin',
                    data: {
                        url: `${baseUrl}/static/firmware/elfbot/elfbot.bin`,
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
            compiler: 'elfbot',
            comName: this.micropython.comName,
            data: {
                type: 'upgrade',
                upgradeMode: this.upgradeMode
            }
        });

    }

    /**
     * 拆包
     */
    unpack(code) {
        code = code
            .replace(/\\/g, '\\\\')// '\'字符串 替换为'\\'字符串
            .replace(/\n/g, '\\n');// 换行符 替换为'\n'字符串

        let packageSize = 512;
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
    *createWriteFileGenerator(fileList, isBurnEmpty = true) {
        for (let file of fileList) {
            if (isBurnEmpty) {
                // 烧空程序
                yield this.micropython.write('stop_user_tasks()\r\n');
                yield this.micropython.write(`enabler.stop()\r\n`);
                yield this.micropython.write(`begin_write_file('${file.name}')\r\n`)
                yield this.micropython.write(`append_write_file('${file.name}','''user_event_task_0 = 1''')\r\n`)
                yield this.reset();
            }

            // 烧真实程序
            yield this.micropython.write('stop_user_tasks()\r\n');
            yield this.micropython.write(`enabler.stop()\r\n`);
            yield this.micropython.write(`begin_write_file('${file.name}')\r\n`)
            // 烧录分包数据
            for (let codeItem of file.codeList) {
                yield this.micropython.write(`append_write_file('${file.name}','''${codeItem}''')\r\n`)
            }
        }

        yield this.reset();
        yield this.writeFileCallback(true);
    }

    /**
     * 重启
     */
    reset() {
        this.micropython.write('reset_machine()\r\n');
    }

    /**
     * 离线模式
     */
    offlineMode() {
        this.reset();
    }

    /**
     * 在线模式
     */
    onlineMode() {
        this.micropython.write('enabler.stop_event_dispatch()\r\n'); // 停止离线事件分发
        this.micropython.write('stop_user_tasks()\r\n'); // 停止离线用户任务队列
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


}

module.exports = Elfbot;