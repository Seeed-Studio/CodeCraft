import fs from 'fs';
import os from 'os';
import path from 'path';
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
//user code file
const CODE_FILE_NAME = 'codecraft_usr.c';
const CODE_HEX_FILE_NAME = 'code.hex';
//build command file
const CODE_SCRIPT_DIR = path.join($dirname, '../../buildScript/grovezero/');
//build cache dir
const CODE_BUILD_DIR = path.join($dirname, '../../buildCache/grovezero/');
//compile file dir
const CODE_COMPILER_DIR = path.join($dirname, `../../compilers/${system}/c/bin/`);

class CppCompiler {

    constructor() {

    }

    /**
     * 文件生成、编译
     * @param {*} code 
     */
    compiler(code) {
        return new Promise((resolve, reject) => {
            // 保存代码到本地
            this._saveCode(code).then(reslut => {
                //保存成功
                if (reslut) {
                    //开始编译文件
                    let command = `cd ${CODE_SCRIPT_DIR} && `;
                    if ('darwin' === platform || 'linux' === platform) {
                        command = command + `export GNU_INSTALL_ROOT=${CODE_COMPILER_DIR} && make clean && make all`;
                    } else {
                        command = command + `set PATH=${CODE_COMPILER_DIR};%PATH% && .\\clean && .\\gen_burnl3`;
                    }
                    exec(command, (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            try {
                                let hex = fs.readFileSync(path.join(CODE_BUILD_DIR, CODE_HEX_FILE_NAME));
                                resolve(hex);
                            }
                            catch (e) {
                                reject(e);
                            }
                        }
                    });
                }
                //保存失败
                else {
                    reject();
                }
            });
        });
    }

    /**
     * 保存代码
     * @param {*} code 
     */
    _saveCode(code) {
        // 生成文件目录
        const filepath = path.join(CODE_BUILD_DIR, CODE_FILE_NAME);
        const buffer = Buffer.from(code);
        // 写入文件
        return new Promise(resolve => {
            fs.writeFile(filepath, buffer, (error) => {
                if (!error) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            });
        });
    }
}


export default CppCompiler;