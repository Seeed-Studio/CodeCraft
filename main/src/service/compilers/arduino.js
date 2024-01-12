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

let CODE_PATH;
//脚本目录
let CD_PATH;
//编译生成的缓存文件目录
let BUILD_TEMP_PATH;

let BIN_NAME;

let ccLibrariesDir = getCCLibrariesDir();

class ArduinoCompiler {

    constructor() {
        this.path = null;
    }

    async compiler({ code, type }) {
        switch (type) {
            case 'arduino-uno':
                CODE_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/uno/grove_/grove_.ino');
                CD_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../script/arduino/uno');
                BUILD_TEMP_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/uno');
                BIN_NAME = 'grove_.ino.hex'
                break;
            case 'arduino-mega':
                CODE_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/mega/grove_/grove_.ino');
                CD_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../script/arduino/mega');
                BUILD_TEMP_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/mega');
                BIN_NAME = 'grove_.ino.hex'
                break;
            case 'arduino-lotusv':
                CODE_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/lotusv/grove_/grove_.ino');
                CD_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../script/arduino/lotusv');
                BUILD_TEMP_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/lotusv');
                BIN_NAME = 'grove_.ino.hex'
                break;
            case 'grove-joint':
                CODE_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/grovejoint/grove_/grove_.ino');
                CD_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../script/arduino/grovejoint');
                BUILD_TEMP_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/grovejoint');
                BIN_NAME = 'grove_.ino.hex'
                break;
            case 'arduino-opencat':
                CODE_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/opencat/grove_/grove_.ino');
                CD_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../script/arduino/opencat');
                BUILD_TEMP_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/opencat');
                BIN_NAME = 'grove_.ino.hex'
                break;
            case 'wio-terminal':
                CODE_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/wioterminal/grove_/grove_.ino');
                CD_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../script/arduino/wioterminal');
                BUILD_TEMP_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../../buildTemp/arduino/wioterminal');
                BIN_NAME = 'grove_.ino.bin'
                break;
        }

        try {
            await this._saveCode(code);
            let compilerResult = await this._compiler();
            let uploadResult;
            if (type == 'wio-terminal') {
                uploadResult = await this._wioTerminalUpload();
            } else {
                uploadResult = await this._upload();
            }
            let result = compilerResult + uploadResult;
            return Promise.resolve(result);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }

    _compiler() {
        let platform = os.platform();
        let cmd = platform === 'darwin' || platform === 'linux' ?
            `cd "${CD_PATH}" && chmod +x build.sh && ./build.sh "${ARDUINO_UPLOAD_PATH}" "${BUILD_TEMP_PATH}" "${ccLibrariesDir}" "${ARDUINO_LIBRARY_PATH}"`
            :
            `cd "${CD_PATH}" && .\\build "${ARDUINO_UPLOAD_PATH}" "${BUILD_TEMP_PATH}" "${ccLibrariesDir}" "${ARDUINO_LIBRARY_PATH}"`;
        return new Promise((resolve, reject) => {
            let option = {
                // timeout: 1000 * 60 * 5,
                maxBuffer: 1024 * 1024 * 100
            }

            try {
                exec(cmd, option, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    } else {
                        let result = stdout + stderr
                        if (result.indexOf('Temp/arduino_build/grove_.ino.bin') >= 0 ||
                            result.indexOf('Temp\\arduino_build\\grove_.ino.bin') >= 0 ||
                            result.indexOf('Temp/arduino_build/grove_.ino.hex') >= 0 ||
                            result.indexOf('Temp\\arduino_build\\grove_.ino.hex') >= 0) {
                            resolve(result);
                        } else {
                            reject(result);
                        }
                    }
                });
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
            let platform = os.platform();
            try {
                let list = await SerialportCore.scan();
                let startPort = {}
                list.map((item, index) => {
                    if (item.path == this.path) {
                        startPort = item;
                    }
                })
                let result;
                let sttyCmd;
                if (platform == 'darwin') {
                    sttyCmd = `stty -f ${this.path} 1200`;
                } else if (platform == 'linux') {
                    sttyCmd = `stty -F ${this.path} 1200`;
                } else {
                    sttyCmd = `MODE ${this.path}:BAUD=1200 PARITY=N DATA=8`;
                }
                //修改串口烧写模式
                result = execSync(sttyCmd).toString();
                await new Promise((resolve) => setTimeout(resolve, 1000));
                //等待重启
                let port = await this.getSerialport(startPort);
                if (port != null) {
                    let binPath = path.join(BUILD_TEMP_PATH, BIN_NAME);
                    let burnCmd = platform === 'darwin' || platform === 'linux' ?
                        `cd "${CD_PATH}" && chmod +x burn.sh && ./burn.sh "${port.path}" "${ARDUINO_UPLOAD_PATH}" "${binPath}"` :
                        `cd "${CD_PATH}" && .\\burn "${port.path}" "${ARDUINO_UPLOAD_PATH}" "${binPath}"`;
                    //烧录bin文件
                    exec(burnCmd, (error, stdout, stderr) => {
                        if (error) {
                            reject(error);
                        } else {
                            let result = stdout + stderr;
                            if (result.indexOf('Verify successful') >= 0 || result.indexOf('bytes of flash verified') >= 0) {
                                resolve(result);
                            } else {
                                reject(result);
                            }
                        }
                    })
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
            let platform = os.platform();
            let binPath = path.join(BUILD_TEMP_PATH, BIN_NAME);
            let cmd = platform === 'darwin' || platform === 'linux' ?
                `cd "${CD_PATH}" && chmod +x burn.sh && ./burn.sh "${this.path}" "${ARDUINO_UPLOAD_PATH}" "${binPath}"` :
                `cd "${CD_PATH}" && .\\burn ${this.path} "${ARDUINO_UPLOAD_PATH}" "${binPath}"`;
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    let result = stdout + stderr;
                    if (result.indexOf('Verify successful') !== -1 || result.indexOf('bytes of flash verified') !== -1) {
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

    async download(url, name, dir) {
        try {
            let filePath = await new Promise((resolve, reject) => {
                netDownload.download(url, name, dir, {
                    onSucc(localpath) {
                        resolve(localpath)
                    },
                    onProgress(percent) {
                        console.log(percent);
                    },
                    onFail() {
                        console.log('onFail');
                        reject();
                    },
                });
            });
            return filePath;
        } catch (error) {
            return null;
        }
    }

    async uploadBin(data) {
        if (data.type == 'wio-terminal') {
            CODE_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../buildTemp/arduino/wioterminal/grove_/grove_.ino');
            CD_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../script/arduino/wioterminal/');
            BUILD_TEMP_PATH = path.join(ARDUINO_UPLOAD_PATH, '../../buildTemp/arduino/wioterminal/');
        }
        return new Promise(async (resolve, reject) => {
            let filename = `temp.bin`
            let localpath = await this.download(data.bin, filename, BUILD_TEMP_PATH);
            let binName = localpath.substring(localpath.lastIndexOf('temp'));
            let binPath = path.join(BUILD_TEMP_PATH, binName);
            let platform = os.platform();
            try {
                let list = await SerialportCore.scan();
                let startPort = {}
                list.map((item, index) => {
                    if (item.path == this.path) {
                        startPort = item;
                    }
                })
                let result;
                let sttyCmd;
                if (platform == 'darwin') {
                    sttyCmd = `stty -f ${this.path} 1200`;
                } else if (platform == 'linux') {
                    sttyCmd = `stty -F ${this.path} 1200`;
                } else {
                    sttyCmd = `MODE ${this.path}:BAUD=1200 PARITY=N DATA=8`;
                }
                //修改串口烧写模式
                result = execSync(sttyCmd).toString();
                await new Promise((resolve) => setTimeout(resolve, 3000));
                //等待重启
                let port = await this.getSerialport(startPort);
                if (port != null) {
                    let burnCmd = platform === 'darwin' || platform === 'linux' ?
                        `cd "${CD_PATH}" && chmod +x burn.sh && ./burn.sh "${port.path}" "${ARDUINO_UPLOAD_PATH}" "${binPath}"` :
                        `cd "${CD_PATH}" && .\\burn "${port.path}" "${ARDUINO_UPLOAD_PATH}" "${binPath}"`;
                    //烧录bin文件
                    exec(burnCmd, (error, stdout, stderr) => {
                        if (error) {
                            reject(error);
                        } else {
                            let result = stdout + stderr;
                            if (result.indexOf('Verify successful') >= 0 || result.indexOf('bytes of flash verified') >= 0) {
                                resolve(result);
                            } else {
                                reject(result);
                            }
                        }
                    })
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
        })
    }

}

export default ArduinoCompiler;
