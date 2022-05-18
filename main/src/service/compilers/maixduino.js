import fs from 'fs';
import os from 'os';
import path from 'path';
import netDownload from '../../common/net-download.js';
import { exec } from 'child_process';

const platform = os.platform();
let system = 'win';
if (platform == 'darwin') {
    system = 'mac';
} else if (platform == 'linux') {
    system = 'linux';
} else {
    system = 'win';
}

const { get, set } = require('../../common/local-storage')
const MAIXDUINO_FIRMWARE_CONFIG_FILE = 'maixduino_firmware_config';

const MAIXDUINO_PATH = path.join($dirname, `../../compilers/${system}/maixduino/`);
const MAIXDUINO_BIN_PATH = path.join($dirname, '../../buildCache/maixduino/');

const SRC_BIN_FILEPATH = path.join($dirname, '../../static/firmware/maixduino/maixduino.kfpkg');
const DST_BIN_FILEPATH = path.join($dirname, '../../buildCache/maixduino/maixduino.kfpkg');

let binName = null;
const ESP32BIN = 'maixduino_esp32_firmware_v1.4.1_0x0.bin'

/**
 * 判断文件是否存在
 * @param {*} fpath 
 */
const exists = (fpath) => {
    return new Promise(resolve => {
        fs.exists(fpath, (exists) => {
            resolve(exists);
        });
    });
}

/**
 * 判断文件是否存在
 * @param {*} fpath 
 */
const unlink = (fpath) => {
    return new Promise(resolve => {
        fs.unlink(fpath, resolve);
    });
}

/**
 * 深度复制文件
 * @param {*} respath 
 */
const copyFile = (srcpath, dstpath) => {
    try {
        //声明文件目录、文件路径
        // 创建读取流
        let readable = fs.createReadStream(srcpath);
        // 创建写入流
        let writable = fs.createWriteStream(dstpath);
        // 通过管道来传输流
        readable.pipe(writable);
        return dstpath;
    } catch (error) {
        console.log('file deep copy fail ... ');
        return null;
    }
}



class MaixduinoCompiler {
    constructor() {
        this.comName = null;
    }

    compiler(args) {

        const {
            type,
            data,
            upgradeMode = 1  // 0 离线烧录 1 在线烧录
        } = args;

        // 离线烧录
        if (upgradeMode == 0) {
            return this.upgrade_local();
        }
        // 在线烧录
        else {
            switch (type) {
                case 'save-bin': return this.saveBin(data);
                case 'upgrade': return this.upgrade();
                case 'is-down-firmware': return this.isDownFirmware(data);
            }
        }
        // 其他操作返回失败
        return Promise.reject();
    }

    isDownFirmware(data) {
        return new Promise((resolve, reject) => {
            let version = data.version;
            fs.readdir(MAIXDUINO_BIN_PATH, (err, files) => {
                if (err) reject();
                for (let file of files) {
                    if (file.indexOf(version) > -1) {
                        binName = file;
                        resolve();
                    }
                }
                reject()
            })
        })
    }

    saveBin(data) {
        return new Promise((resolve, reject) => {
            let filename = `maixduino_${data.version}.kfpkg`
            netDownload.download(data.url, filename, MAIXDUINO_BIN_PATH, {
                onSucc(localpath) {
                    binName = localpath.substring(localpath.lastIndexOf('maixduino'));
                    resolve()
                    set(MAIXDUINO_FIRMWARE_CONFIG_FILE, Object.assign({}, data, { binName }))
                },
                onProgress(percent) {
                    console.log(percent);
                },
                onFail() {
                    console.log('onFail');
                    reject();
                },
            });
        })
    }

    getLastNumber(str) {
        let strs = str.replace(/[^\d]/g, '&');
        let strsArr = strs.split('&');
        let num = strsArr[strsArr.length - 1];
        //esp32固件烧录端口，最后一位数字要加1
        let port = parseInt(num)+1;
        let re = new RegExp(num+'$');
        let replacestr = str.replace(re, port);
        return replacestr;
    }

    upgrade() {
        let esp32comName = this.getLastNumber(this.comName)
        let binPath = path.join(MAIXDUINO_BIN_PATH, binName);
        let cmd = (platform === 'darwin' || platform === 'linux') ?
            `cd ${MAIXDUINO_PATH} && chmod +x esptool && ./esptool --chip esp32 --port ${esp32comName} erase_flash && ./esptool --chip esp32 --port ${esp32comName} --baud 115200 write_flash -z 0x0000 ${ESP32BIN} && chmod +x kflash && ./kflash -p ${this.comName} -b 1500000 -B maixduino -n -S SLOW ${binPath}`
            : `cd ${MAIXDUINO_PATH} && .\\esptool.exe --chip esp32 --port ${esp32comName} erase_flash && .\\esptool.exe --chip esp32 --port ${esp32comName} --baud 115200 write_flash -z 0x0000 ${ESP32BIN} && .\\kflash.exe -p ${this.comName} -b 1500000 -B maixduino -n -S SLOW ${binPath}`;

        console.log(cmd);

        return new Promise((resolve, reject) => {
            exec(cmd, (error, stdout, stderr) => {
                console.log('error-----\n\n\n', error)
                console.log('stdout-----\n\n\n', stdout)
                console.log('stderr-----\n\n\n', stderr)
                if (error) return reject();
                if (stderr) return reject();
                if (stdout.indexOf('Rebooting...') != -1) {
                    return resolve();
                }
                return reject()
            })
        })
    }

    async upgrade_local() {
        // 定义获取最新固件版本方法
        let getlatestfirmware = () => {
            return new Promise(resolve => {
                get(MAIXDUINO_FIRMWARE_CONFIG_FILE, (err, data) => {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(data)
                    }
                })
            })
        }
        let latestfirmware = await getlatestfirmware();
        if (latestfirmware &&
            latestfirmware.version) {
            binName = latestfirmware.binName;
            return this.upgrade();
        } else {
            let esp32comName = this.getLastNumber(this.comName)
            let cmd = (platform === 'darwin' || platform === 'linux') ?
            `cd ${MAIXDUINO_PATH} && chmod +x esptool && ./esptool --chip esp32 --port ${esp32comName} erase_flash && ./esptool --chip esp32 --port ${esp32comName} --baud 115200 write_flash -z 0x0000 ${ESP32BIN} && chmod +x kflash && ./kflash -p ${this.comName} -b 1500000 -B maixduino -n -S SLOW ${DST_BIN_FILEPATH}`
            : `cd ${MAIXDUINO_PATH} && .\\esptool.exe --chip esp32 --port ${esp32comName} erase_flash && .\\esptool.exe --chip esp32 --port ${esp32comName} --baud 115200 write_flash -z 0x0000 ${ESP32BIN} && .\\kflash.exe -p ${this.comName} -b 1500000 -B maixduino -n -S SLOW ${DST_BIN_FILEPATH}`;

            console.log(cmd);

            return new Promise(async (resolve, reject) => {
                // 存在删除
                if (await exists(DST_BIN_FILEPATH)) {
                    await unlink(DST_BIN_FILEPATH);
                }
                // 复制文件
                copyFile(SRC_BIN_FILEPATH, DST_BIN_FILEPATH)

                exec(cmd, (error, stdout, stderr) => {

                    console.log('error-----\n\n\n', error)
                    console.log('stdout-----\n\n\n', stdout)
                    console.log('stderr-----\n\n\n', stderr)

                    if (error) return reject();
                    if (stderr) return reject();
                    if (stdout.indexOf('Rebooting...') != -1) {
                        return resolve();
                    }

                    return reject()

                })
            })

        }
    }
}

export default MaixduinoCompiler;
