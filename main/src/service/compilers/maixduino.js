import fs from 'fs';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';
import netDownload from '../../common/net-download.js';

const platform = os.platform();
let system = 'win';
if (platform == 'darwin') {
    system = 'mac';
} else if (platform == 'linux') {
    system = 'linux';
} else {
    system = 'win';
}

const MAIXDUINO_PATH = path.join($dirname, `../../compilers/${system}/maixduino/`);
const MAIXDUINO_BIN_PATH = path.join($dirname, '../../buildTemp/maixduino/');

let binName = null;
const ESP32BIN = 'maixduino_esp32_firmware_v1.4.1_0x0.bin'

class MaixduinoCompiler {
    constructor() {
        this.path = null;
    }

    compiler(args) {
        switch (args.type) {
            case 'save-bin': return this.saveBin(args.data);
            case 'upgrade': return this.upgrade();
            case 'is-down-firmware': return this.isDownFirmware(args.data);
        }
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
        port = port.toString().padStart(num.length, '0');
        let re = new RegExp(num+'$');
        let replacestr = str.replace(re, port);
        return replacestr;
    }

    upgrade() {
        let esp32comName = this.getLastNumber(this.path)
        let platform = os.platform();
        let binPath = path.join(MAIXDUINO_BIN_PATH, binName);
        let cmd = (platform === 'darwin' || platform === 'linux') ?
            `cd ${MAIXDUINO_PATH} && chmod +x esptool && ./esptool --chip esp32 --port ${esp32comName} erase_flash && ./esptool --chip esp32 --port ${esp32comName} --baud 115200 write_flash -z 0x0000 ${ESP32BIN} && chmod +x kflash && ./kflash -p ${this.path} -b 1500000 -B maixduino -n -S SLOW ${binPath}`
            : `cd ${MAIXDUINO_PATH} && .\\esptool.exe --chip esp32 --port ${esp32comName} erase_flash && .\\esptool.exe --chip esp32 --port ${esp32comName} --baud 115200 write_flash -z 0x0000 ${ESP32BIN} && .\\kflash.exe -p ${this.path} -b 1500000 -B maixduino -n -S SLOW ${binPath}`;

        console.log(cmd);
        // let cmd = os.platform() === 'darwin' ?
        //     `cd ${MAIXDUINO_PATH} && chmod +x kflash && ./kflash -p ${this.path} -b 1500000 -B maixduino -n -S SLOW ${binName}`
        //     : `cd ${MAIXDUINO_PATH} && .\\kflash.exe -p ${this.path} -b 1500000 -B maixduino -n -S SLOW ${binName}`;

        // console.log(cmd);

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

    uploadBin(data) {

    }
}

export default MaixduinoCompiler;
