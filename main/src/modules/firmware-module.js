const fs = require("fs");
const path = require("path");

const { get } = require('../common/local-storage')

// 固件根目录
const FIRMWARE_DIR = path.join($dirname, '../../static/firmware');
// 固件类型 --- 目录
const firmwareTypes = {
    'microbit': path.join(FIRMWARE_DIR, './microbit'),
    'maixduino': path.join(FIRMWARE_DIR, './maixduino'),
    'mpython': path.join(FIRMWARE_DIR, './mpython'),
    'powering': path.join(FIRMWARE_DIR, './powering')
}

/**
 * 获取服务器版本信息
 * @param {*} key 
 */
const getServerFirmwareInfo = (key) => {
    return new Promise((resolve, reject) => {
        get(key, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 获取指定固件类型的固件信息
 * @param {*} param0 
 * @param {*} callback 
 */
const getFirmwareInfo = ({ type }, callback) => {
    fs.readFile(path.join(firmwareTypes[type], `./${type}.json`), async (error, data) => {
        if (!!error) {
            callback(error);
        } else {
            try {
                let buffer = Buffer.from(data);
                if (buffer) {
                    let firmwareInfo;
                    try {
                        firmwareInfo = await getServerFirmwareInfo(`${type}_firmware_config`);
                    } catch (error) {}
                    let localInfo =  JSON.parse(buffer.toString('utf-8'));
                    if (firmwareInfo &&
                        firmwareInfo.version) {
                        localInfo.version = firmwareInfo.version;
                    }
                    callback(error, localInfo);
                } else {
                    callback(error);
                }
            } catch (error) {
                callback(error);
            }
        }
    })
}

/**
 * 获取指定固件类型的固件文件
 * @param {*} param0 
 * @param {*} callback 
 */
const getFirmwareFile = ({ type, fileName }, callback) => {
    fs.readFile(path.join(firmwareTypes[type], `./${fileName}`), (error, data) => {
        if (!!error) {
            callback(error);
        } else {
            try {
                let buffer = Buffer.from(data);
                if (buffer) {
                    callback(error, buffer.toString('utf-8'));
                } else {
                    callback(error);
                }
            } catch (error) {
                callback(error);
            }
        }
    })
}

export {
    getFirmwareInfo,
    getFirmwareFile
}