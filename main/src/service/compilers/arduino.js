import fs, { promises } from 'fs';
import os from 'os';
import path from 'path';
import { exec, execSync } from 'child_process';
import SerialportCore from '../serialport';
import { getCCLibrariesDir } from '../../common/utils';

const platform = os.platform();
let system = 'win';
if (platform == 'darwin') {
    system = 'mac';
} else if (platform == 'linux') {
    system = 'linux';
} else {
    system = 'win';
}

//arduino compile dir
const ARDUINO_UPLOAD_PATH = path.join($dirname, `../../compilers/${system}/arduino`);
//arduino library
const ARDUINO_LIBRARY_PATH = path.join($dirname, '../../compilers/arduino-libraries');
//arduino script compile&burn file 
const ARDUINO_SCRIPT_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildScript/arduino');
//arduino compile cache file
const ARDUINO_BUILD_CACHE_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildCache/arduino');

let CODE_PATH;
let BUILD_SCRIPT_PATH;
let BUILD_CACHE_PATH;
let BIN_NAME;
let CC_LIBRARY_PATH = getCCLibrariesDir();

class ArduinoCompiler {

    constructor() {
        this.comName = null;
    }

    async compiler({ code, type }) {
        let dir = 'uno'
        BIN_NAME = 'grove_.ino.hex'
        switch (type) {
            case 'arduino-uno':
                dir = 'uno'
                break;
            case 'arduino-mega':
                dir = 'mega'
                break;
            case 'arduino-lotusv':
                dir = 'lotusv'
                break;
            case 'grove-joint':
                dir = 'grovejoint'
                break;
            case 'arduino-opencat':
                dir = 'opencat'
                break;
            case 'wio-terminal':
                dir = 'wioterminal'
                BIN_NAME = 'grove_.ino.bin'
                break;
        }

        CODE_PATH = path.join(ARDUINO_BUILD_CACHE_PATH, `/${dir}/grove_/grove_.ino`);
        BUILD_SCRIPT_PATH = path.join(ARDUINO_SCRIPT_PATH, dir);
        BUILD_CACHE_PATH = path.join(ARDUINO_BUILD_CACHE_PATH, dir);
        try {
            await this._saveCode(code);
            let compileResult = await this._compiler();
            let uploadResult;
            if (type == 'wio-terminal') {
                uploadResult = await this._wioTerminalUpload();
            } else {
                uploadResult = await this._upload();
            }
            let result = compileResult + uploadResult;
            console.log(result)
            return Promise.resolve(result);
        }
        catch (e) {
            console.log(e)
            return Promise.reject(e);
        }

    }

    _compiler() {
        let cmd = platform === 'darwin' || platform === 'linux' ?
            `cd "${BUILD_SCRIPT_PATH}" && chmod +x build.sh && ./build.sh "${ARDUINO_UPLOAD_PATH}" "${BUILD_CACHE_PATH}" "${CC_LIBRARY_PATH}" "${ARDUINO_LIBRARY_PATH}"`
            :
            `cd "${BUILD_SCRIPT_PATH}" && .\\build "${ARDUINO_UPLOAD_PATH}" "${BUILD_CACHE_PATH}" "${CC_LIBRARY_PATH}" "${ARDUINO_LIBRARY_PATH}"`;
        return new Promise((resolve, reject) => {
            let option = {
                // timeout: 1000 * 60 * 5,
                maxBuffer: 1024 * 1024 * 100
            }

            try {
                let result = execSync(cmd, option).toString();
                if (result.indexOf('Temp/arduino_build/grove_.ino.bin') >= 0 ||
                    result.indexOf('Temp\\arduino_build\\grove_.ino.bin') >= 0 ||
                    result.indexOf('Temp/arduino_build/grove_.ino.hex') >= 0 ||
                    result.indexOf('Temp\\arduino_build\\grove_.ino.hex') >= 0) {
                    resolve(result);
                } else {
                    reject(result);
                }
            } catch (error) {
                reject(error);
            }

        });
    }

    async getSerialport(currentPort) {
        let jobFinished = false;
        let vendorId = currentPort.vendorId.toLowerCase();
        let productId = currentPort.productId.toLowerCase();
        let i = 0;//尝试次数，最多5次。5次连不上，设备就有问题了
        while (!jobFinished) {
            if (i == 5) {
                return null;
            }
            let list = await SerialportCore.scan();
            let port = {}
            list.map((item, index) => {
                let ivendorId = item.vendorId;
                let iproductId = item.productId;
                if (ivendorId && iproductId &&
                    ivendorId.toLowerCase() == vendorId &&
                    (productId == '802d' || productId == '002d') &&
                    iproductId.toLowerCase() == '002d') {
                    port = item;
                    jobFinished = true;
                }
            })
            if (jobFinished) {
                return port;
            } else {
                i++;
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }
    }

    _wioTerminalUpload() {
        return new Promise(async (resolve, reject) => {
            try {
                let list = await SerialportCore.scan();
                let startPort = {}
                list.map((item, index) => {
                    if (item.comName == this.comName) {
                        startPort = item;
                    }
                })
                let result;
                let sttyCmd;
                if (platform == 'darwin') {
                    sttyCmd = `stty -f ${this.comName} 1200`;
                } else if (platform == 'linux') {
                    sttyCmd = `stty -F ${this.comName} 1200`;
                } else {
                    sttyCmd = `MODE ${this.comName}:BAUD=1200 PARITY=N DATA=8`;
                }
                //修改串口烧写模式
                result = execSync(sttyCmd).toString();
                await new Promise((resolve) => setTimeout(resolve, 1000));
                //等待重启
                let port = await this.getSerialport(startPort);
                if (port != null) {
                    let binPath = path.join(BUILD_CACHE_PATH, BIN_NAME);
                    let burnCmd = platform === 'darwin' || platform === 'linux' ?
                        `cd "${BUILD_SCRIPT_PATH}" && chmod +x burn.sh && ./burn.sh "${port.comName}" "${ARDUINO_UPLOAD_PATH}" "${binPath}"` :
                        `cd "${BUILD_SCRIPT_PATH}" && .\\burn "${port.comName}" "${ARDUINO_UPLOAD_PATH}" "${binPath}"`;
                    //烧录bin文件
                    result = execSync(burnCmd).toString();
                    if (result.indexOf('Verify successful') >= 0 || result.indexOf('bytes of flash verified') >= 0) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    _upload() {
        return new Promise((resolve, reject) => {
            let binPath = path.join(BUILD_CACHE_PATH, BIN_NAME);
            let cmd = platform === 'darwin' || platform === 'linux' ?
                `cd "${BUILD_SCRIPT_PATH}" && chmod +x burn.sh && ./burn.sh "${this.comName}" "${ARDUINO_UPLOAD_PATH}" "${binPath}"` :
                `cd "${BUILD_SCRIPT_PATH}" && .\\burn ${this.comName} "${ARDUINO_UPLOAD_PATH}" "${binPath}"`;
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    let result = stdout + stderr;
                    if ((result).indexOf('Verify successful') !== -1 || (result).indexOf('bytes of flash verified') !== -1) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                }
            })
        })
    }

    _saveCode(code) {
        const buffer = Buffer.from(code);
        return new Promise((resolve, reject) => {
            fs.writeFile(CODE_PATH, buffer, (error) => {
                error ? reject(error) : resolve();
            });
        });
    }

}

export default ArduinoCompiler;
