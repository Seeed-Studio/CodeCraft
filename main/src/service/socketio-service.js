import SocketCore from './socketio-lib';
import SerialportCore from './serialport';
import path from 'path';
import { exec } from 'child_process';
import os from 'os';
import { createCompiler } from './compilers/compiler-factory';

import {
    getFirmwareInfo,
    getFirmwareFile
} from '../modules/firmware-module';

import {
    saveMaterialImage,
    getMaterialImage,
    savePlatformMaterials,
    getPlatformMaterials,
    deleteUserMaterial,
    saveUserMaterials,
    getUserMaterials,
    clearCacheDownloadQueue
} from '../modules/material-module';


import bindAll from 'lodash.bindall';

const URL_MAIN = '/';

const URL_STORE_CACHEIMAGE = '/cc/storeCacheImage';
const URL_GET_CACHEIMAGE = '/cc/getCacheImage';

const URL_CLEAR_CACHEQUEUE = '/cc/clearCacheQueue';

const URL_GET_FIRMWARE_INFO = '/cc/getFirmwareInfo';
const URL_GET_FIRMWARE_FILE = '/cc/getFirmwareFile';

const URL_INSTALL_GROVEZERO_DRIVE = '/cc/installGrovezeroDrive';
const URL_INSTALL_ARDUINO_DRIVE = '/cc/installArduinoDrive';
const URL_INSTALL_FT232_DRIVE = '/cc/installArduinoFT232Drive';
const URL_INSTALL_GLINT_DRIVE = '/cc/installGlintDrive';
const URL_INSTALL_CYBEREYE_DRIVE = "/cc/installCyberEyeDrive";
const URL_INSTALL_BITTLE_DRIVE = "/cc/installBittleDrive";

const URL_GET_LOCAL_PATH = '/cc/getLocalPath';

const URL_GET_PLATFORM = '/cc/getPlatform';

const DRIVERS_DIR = path.join($dirname, '../../drivers/');

const HTTP_RESP_HEADERS = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

/**
 * 安装驱动
 * @param {*} callback 
 */
const installGroveZeroDriver = (callback) => {
    // g0驱动路径
    const g0DriverPath = path.join(DRIVERS_DIR, './main-board-ble/');
    let cmd = '';
    if (os.platform() === 'darwin') {
        cmd = `cd ${g0DriverPath}/mac && open Driver.pkg`;
    } else {
        cmd = `cd ${g0DriverPath} && install.bat`;
    }
    // 触发安装g0驱动， 暂不关注成功失败
    exec(cmd, callback);
}

/**
 * 安装驱动
 * @param {*} callback 
 */
const installArduinoDriver = (callback) => {
    console.log('installDrive Arduino ................ ')
    // g0驱动路径
    const driverPath = path.join(DRIVERS_DIR, './arduino/');
    console.log('driverPath ................ ' + driverPath);
    // 触发安装g0驱动， 暂不关注成功失败
    exec('cd ' + driverPath + ' && install.bat', callback);
}

/**
 * 安装驱动
 * @param {*} callback 
 */
const installFT232Driver = (callback) => {
    console.log('installDrive Arduino FT232 ................ ')
    // g0驱动路径
    const driverPath = path.join(DRIVERS_DIR, './ft232/');
    console.log('driverPath ................ ' + driverPath);
    // 触发安装g0驱动， 暂不关注成功失败
    exec('cd ' + driverPath + ' && setup.exe', callback);
}

/**
 * 安装驱动
 * @param {*} callback 
 */
const installGlintDriver = (callback) => {
    console.log('installDrive Glint FT232 ................ ')
    // g0驱动路径
    const driverPath = path.join(DRIVERS_DIR, './glint/');
    console.log('driverPath ................ ' + driverPath);
    let cmd = '';
    if (os.platform() === 'darwin') {
        cmd = `cd ${driverPath} && open CH341SER_MAC.pkg`;
    } else {
        cmd = `cd ${driverPath} && CH341SER_WIN.exe`;
    }
    // 触发安装g0驱动， 暂不关注成功失败
    exec(cmd, callback);
}

/**
 * 安装驱动
 * @param {*} callback 
 */
const installCyberEyeDriver = (callback) => {
    console.log('installDrive Glint FT232 ................ ')
    // g0驱动路径
    const driverPath = path.join(DRIVERS_DIR, './cyberEye/');
    console.log('driverPath ................ ' + driverPath);
    let cmd = '';
    if (os.platform() === 'darwin') {
        cmd = `cd ${driverPath} && open CyberEyeMARK_MAC.dmg`;
    } else {
        cmd = `cd ${driverPath} && CyberEyeMARK_WIN.exe`;
    }
    // 触发安装mark驱动， 暂不关注成功失败
    exec(cmd, callback);
}

/**
 * 安装Bittle驱动
 * @param {*} callback 
 */
const installBittleDriver = (callback) => {
    console.log('installDrive Bittle ................ ')
    // g0驱动路径
    const driverPath = path.join(DRIVERS_DIR, './bittle/');
    console.log('driverPath ................ ' + driverPath);
    // 触发安装g0驱动， 暂不关注成功失败
    exec('cd ' + driverPath + ' && CH34x_Install_Windows.exe', callback);
}

class SocketIOService {

    /**
   * SocketEngine
   * 构造函数
   */
    constructor() {
        /**
         * 绑定回调函数
         */
        bindAll(this, [
            'onError',
            'onDisconnect',
            'onDisconnecting',
            'onReceiveMessage',
            'handleResponse',
            'handleConnectionClose',
            'handleUpdateBaudRate',
            'onRequest'
        ]);

        /**
         * socket 通讯对象
         * 注册socket通讯监听
         * ['error','disconnect','disconnecting',disconnecting','message']
         */
        this.socketCore = new SocketCore();
        this.socketCore.on('error', this.onError);
        this.socketCore.on('disconnect', this.onDisconnect);
        this.socketCore.on('disconnecting', this.onDisconnecting);
        this.socketCore.on('message', this.onReceiveMessage);
        this.socketCore.on('request', this.onRequest);

        /**
         * 初始化通讯对象
         */
        this.physicalConn = new SerialportCore();
        this.physicalConn.on('response', this.handleResponse);
        this.physicalConn.on('close', this.handleConnectionClose);

        /**
         * 版本更新管理
         */
        this.versionUpgradeMgr = null;
        /**
         * 文件保存
         */
        this.projectSaveMgr = null;
    }

    /**
     * 初始化
     */
    startServer() {
        //开启socket服务
        this.socketCore.startServer();
    }


    /**
     * 停止服务
     */
    stopServer() {
        //停止当前socket
        this.socketCore.stopService();
        this.socketCore.removeAllListeners();
        this.socketCore = null;
        //断开物理设备连接
        this.physicalConn.disConnect();
        this.physicalConn.removeAllListeners();
        this.physicalConn = null;
    }


    /**
     * 设置版本更新管理对象
     * @param {*} _versionUpgradeMgr 
     */
    attachVersionUpgradeMgr(_versionUpgradeMgr) {
        this.versionUpgradeMgr = _versionUpgradeMgr;
    }

    /**
     * 设置文件保存
     */
    attachProjectSaveMgr(_projectSaveMgr) {
        this.projectSaveMgr = _projectSaveMgr;
    }
    attachWindowMgr(_windowMgr) {
        this.windowMgr = _windowMgr;
    }


    /**
     *  {  
     *    method: '',
     *    data:''
     *  }
     * 消息接受
     * 匹配对应模块发送消息
     * @param {*} message 
     */
    onReceiveMessage(message) {
        const {
            method,
            data
        } = message;

        console.log('method ----  ' + method);

        //扫描
        if ('scan' === method) {
            this.handleScan();
        }
        //连接设备
        else if ('connect' === method) {
            this.handleConnect(data);
        }
        //断开设备连接
        else if ('disconnect' === method) {
            this.handleDisconnect();
        }
        //写数据
        else if ('write' === method) {
            this.handleWrite(data);
        }
        //编译
        else if ('compile' === method) {
            this.handleCompile(data);
        }
        //更新波特率
        else if ('update-baudrate' === method) {
            this.handleUpdateBaudRate(data);
        }
        // 检查更新
        else if ('versionupgrade' === method) {
            if (this.versionUpgradeMgr) {
                this.versionUpgradeMgr.onVersionUpgrade(data);
            }
        }
        // 保存文件
        else if ('projectSave' === method) {
            if (this.projectSaveMgr) {
                this.projectSaveMgr.onProjectSave(data);
            }
        }
        // 窗口
        else if ('window' === method) {
            if (this.windowMgr) {
                this.windowMgr.onWindow(data);
            }
        }
    }

    onRequest({ url, params }, res) {
        // 主工程url
        if (URL_MAIN == url) {
            res.writeHead(200, HTTP_RESP_HEADERS);
            res.end(JSON.stringify({ errorCode: 0, errorMessage: "succ" }));
        }
        // 图片缓存
        else if (URL_STORE_CACHEIMAGE == url) {
            saveMaterialImage(params);
            res.writeHead(200, HTTP_RESP_HEADERS);
            res.end(JSON.stringify({ errorCode: 0, errorMessage: "succ" }));
        }

        // 获取图片缓存
        else if (URL_GET_CACHEIMAGE == url) {
            getMaterialImage(params, (error, data) => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0, data }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            });
        }
        //清空图片缓存队列
        else if (URL_CLEAR_CACHEQUEUE == url) {
            // 清空缓存下载队列
            clearCacheDownloadQueue();
            res.writeHead(200, HTTP_RESP_HEADERS);
            res.end(JSON.stringify({ errorCode: 0 }));
        }
        //获取固件信息
        else if (URL_GET_FIRMWARE_INFO == url) {
            getFirmwareInfo(params, (error, data) => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0, data }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            });
        }
        //获取固件文件
        else if (URL_GET_FIRMWARE_FILE == url) {
            getFirmwareFile(params, (error, data) => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0, data }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            });
        }
        //安装驱动
        else if (URL_INSTALL_GROVEZERO_DRIVE == url) {
            installGroveZeroDriver(error => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0 }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            })
        }
        //安装驱动
        else if (URL_INSTALL_ARDUINO_DRIVE == url) {
            installArduinoDriver(error => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0 }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            })
        }
        //安装驱动
        else if (URL_INSTALL_FT232_DRIVE == url) {
            installFT232Driver(error => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0 }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            })
        }
        //安装驱动
        else if (URL_INSTALL_GLINT_DRIVE == url) {
            installGlintDriver(error => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0 }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            })
        }

        //安装驱动
        else if (URL_INSTALL_CYBEREYE_DRIVE == url) {
            installCyberEyeDriver(error => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0 }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            })
        }

        //安装bittle驱动
        else if (URL_INSTALL_BITTLE_DRIVE == url) {
            installBittleDriver(error => {
                if (!!!error) {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: 0 }));
                } else {
                    res.writeHead(200, HTTP_RESP_HEADERS);
                    res.end(JSON.stringify({ errorCode: -1, errorMessage: error }));
                }
            })
        }

        // 获取根路径
        else if (URL_GET_LOCAL_PATH == url) {
            let localpath = path.join($dirname, '../../');
            res.writeHead(200, HTTP_RESP_HEADERS);
            res.end(JSON.stringify({ errorCode: 0, data: localpath }));
        }

        // 获取根路径
        else if (URL_GET_PLATFORM == url) {
            let platform = os.platform();
            res.writeHead(200, HTTP_RESP_HEADERS);
            res.end(JSON.stringify({ errorCode: 0, data: platform }));
        }
        
    }

    /**
     * 发送消息
     * @param {*} message 
     */
    sendMessage(message) {
        this.socketCore.send(message);
    }

    /**
     * 触发扫描
     * 返回扫描结果
     */
    handleScan() {
        SerialportCore.scan().then(data => {
            const response = {
                method: 'device-scan',
                data: data
            }
            this.sendMessage(response);
        });
    }

    /**
     * 触发连接操作
     * 返回成功失败结果
     * @param {*} data 
     */
    handleConnect(data) {
        this.physicalConn.connect(data).then(
            result => {
                const response = {
                    method: 'device-connect',
                    data: result
                }
                this.sendMessage(response);
            });
    }

    /**
     * 触发断开设备连接操作
     * 返回结果
     */
    handleDisconnect() {
        this.physicalConn.disConnect();
    }

    /**
     * 往下位机写入
     * 数据
     * @param {*} data 
     */
    handleWrite(data) {
        this.physicalConn.write(data);
    }

    /**
     * 更新串口波特率
     * @param {*} data 
     */
    handleUpdateBaudRate(data) {
        this.physicalConn.updateBaudRate(data);
    }

    /**
     * 编译代码
     *    {
     *        content: result,
     *        compileSucc: true,
     *        compileType: compiler
     *    }
     * @param {*} wdata 
     */
    handleCompile(wdata) {
        const {
            compiler,
            data,
            comName
        } = wdata;
        //获取对应的编译器
        let compilerObj = createCompiler(compiler);
        if (comName) compilerObj.comName = comName;
        if (compilerObj) {
            compilerObj.compiler(data).then(
                (result) => {
                    this.sendMessage({
                        method: 'compile-resp',
                        data: {
                            compileSucc: true,
                            compileType: compiler,
                            content: result ? result.toString() : ""
                        }
                    });
                },
                () => {
                    this.sendMessage({
                        method: 'compile-resp',
                        data: {
                            compileSucc: false,
                            compileType: compiler
                        }
                    });
                }
            );
        } else {
            this.sendMessage({
                method: 'compile-resp',
                data: {
                    compileSucc: false,
                    compileType: 'empty'
                }
            });
        }
    }

    /**
     * 处理下午机上报
     * 的数据
     * @param {*} data 
     */
    handleResponse(data) {
        const response = {
            method: 'report-resp',
            data: JSON.stringify(data)
        }
        this.sendMessage(response);
    }

    /**
     * 处理设备异常断开
     * @param {*} error 
     */
    handleConnectionClose(error) {
        console.log('handleConnectionError error : ' + error);
        this.sendMessage({ method: 'device-disconnect' });
    }


    /**
     * onError
     * @param {*} error 
     */
    onError() {

    }

    /**
     * onDisconnect
     * @param {*} reason 
     */
    onDisconnect(socket, reason) {
        // 检测到当前socket断开
        // 此时关闭设备连接
        let activeSocket = this.socketCore.socket;
        if (activeSocket
            && activeSocket.id === socket.id) {
            this.handleDisconnect();
        }
    }

    /**
     * onDisconnecting
     * @param {*} reason 
     */
    onDisconnecting() {

    }

}

export default SocketIOService;