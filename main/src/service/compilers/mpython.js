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

const ESPTOOL_PATH = path.join($dirname, `../../compilers/${system}/esptool/`);
const BIN_PATH = path.join($dirname, '../../buildTemp/mpython/');

let binName = null;

class MPythonCompiler {
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
            let filename = `mpython_${data.version}.bin`
            netDownload.download(data.url, filename, BIN_PATH, {
                onSucc(localpath) {
                    binName = localpath.substring(localpath.lastIndexOf('mpython'));
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

    upgrade() {
        // let cmd = os.platform() === 'darwin' ?
        //     `cd ${MPYTHON_PATH} && chmod +x esptool && ./esptool --chip esp32 --port ${this.path} -b 115200 --before default_reset write_flash -z 0x0 ${binName}`
        //     : `cd ${MPYTHON_PATH} && .\\esptool.exe --chip esp32 --port ${this.path} -b 115200 --before default_reset write_flash -z 0x0 ${binName}`;
        let platform = os.platform();
        let cmd = (platform === 'darwin' || platform === 'linux') ?
            `cd ${ESPTOOL_PATH} && chmod +x esptool && ./esptool --chip esp32 --port ${this.path} -b 115200 --before default_reset write_flash -z 0x0 ${BIN_PATH}${binName}`
            : `cd ${ESPTOOL_PATH} && .\\esptool.exe --chip esp32 --port ${this.path} -b 115200 --before default_reset write_flash -z 0x0 ${BIN_PATH}${binName}`;    
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

    uploadBin(data) {

    }
}

export default MPythonCompiler;
