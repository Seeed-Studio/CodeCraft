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
const POWERING_FIRMWARE_CONFIG_FILE = 'powering_firmware_config';

const ESPTOOL_PATH = path.join($dirname, `../../compilers/${system}/esptool/`);
const BIN_PATH = path.join($dirname, '../../buildCache/powering/');

const SRC_BIN_FILEPATH = path.join($dirname, '../../static/firmware/powering/powering.bin');
const DST_BIN_FILEPATH = path.join($dirname, '../../buildCache/powering/powering.bin');


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

let binName = null;

class PoweRingCompiler {
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
            fs.readdir(BIN_PATH, (err, files) => {
                if (err) reject();
                for (let file of files) {
                    if (file.indexOf(version) > -1) {
                        binName = file;
                        resolve(file);
                    }
                }
                reject()
            })
        })
    }

    saveBin(data) {
        return new Promise((resolve, reject) => {
            let filename = `powering_${data.version}.bin`
            netDownload.download(data.url, filename, BIN_PATH, {
                onSucc(localpath) {
                    binName = localpath.substring(localpath.lastIndexOf('powering'));
                    resolve()
                    set(POWERING_FIRMWARE_CONFIG_FILE, Object.assign({}, data, { binName }))
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

    upgrade() {
        let binPath = path.join(BIN_PATH, binName);
        let cmd = (platform === 'darwin' || platform === 'linux') ?
            `cd ${ESPTOOL_PATH} && chmod +x esptool && ./esptool --chip esp32 --port ${this.comName} -b 115200 erase_flash && ./esptool --chip esp32 --port ${this.comName} -b 115200 --before default_reset write_flash -z 0x1000 ${binPath}`
            : `cd ${ESPTOOL_PATH} && .\\esptool.exe --chip esp32 --port ${this.comName} --baud 1500000 erase_flash && .\\esptool.exe --chip esp32 --port ${this.comName} --baud 1500000 write_flash -z 0x1000 ${binPath}`;
        console.log(cmd);

        return new Promise((resolve, reject) => {

            exec(cmd, (error, stdout, stderr) => {

                console.log('error-----\n\n\n', error)
                console.log('stdout-----\n\n\n', stdout)
                console.log('stderr-----\n\n\n', stderr)

                if (error) return reject();
                if (stderr) return reject();
                if (stdout.indexOf('Hard resetting via RTS pin') > -1) return resolve();
                return reject()
            })
        })
    }


   async upgrade_local() {
        // 定义获取最新固件版本方法
        let getlatestfirmware = () => {
            return new Promise(resolve => {
                get(POWERING_FIRMWARE_CONFIG_FILE, (err, data) => {
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
            let cmd = (platform === 'darwin' || platform === 'linux') ?
                `cd ${ESPTOOL_PATH} && chmod +x esptool && ./esptool --chip esp32 --port ${this.comName} -b 115200 erase_flash && ./esptool --chip esp32 --port ${this.comName} -b 115200 --before default_reset write_flash -z 0x1000 ${DST_BIN_FILEPATH}`
                : `cd ${ESPTOOL_PATH} && .\\esptool.exe --chip esp32 --port ${this.comName} --baud 1500000 erase_flash && .\\esptool.exe --chip esp32 --port ${this.comName} --baud 1500000 write_flash -z 0x1000 ${DST_BIN_FILEPATH}`;
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
                    if (stdout.indexOf('Hard resetting via RTS pin') > -1) return resolve();
                    return reject()
                })
            })
        }
    }
}

export default PoweRingCompiler;
