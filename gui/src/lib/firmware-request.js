import { post } from './fetch-utils';

const URL_GET_FIRMWARE_FILE = "http://localhost:62377/cc/getFirmwareFile"
const URL_GET_FIRMWARE_INFO = "http://localhost:62377/cc/getFirmwareInfo"

const URL_GET_FIRMWARE_ONLINE_ROOT_DIR = "https://ide.tinkergen.com/static/firmware/"

const request = (url, args) => {
    return new Promise((resolve, reject) => {
        post(url, args).then(response => {
            let errorCode = response.errorCode;
            if (errorCode == 0) {
                resolve(response.data);
            } else {
                reject(response.errorMessage);
            }
        }).catch(error => {
            reject(error);
        })
    })
}

const request_online = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

const request_file_online = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}
/**
 * 获取当前设备固件信息
 * @param {*} args 
 */
const getFirmwareInfo = (args) => {
    if (!navigator.onLine) {
        return request(URL_GET_FIRMWARE_INFO, args);
    } else {
        return request_online(URL_GET_FIRMWARE_ONLINE_ROOT_DIR + `${args.type}/${args.type}.json`);
    }
}

/**
 * 获取当前设备固件文件，此方法失效
 * @param {*} args 
 */
const getFirmwareFile = (args) => {
    if (!navigator.onLine) {
        return request(URL_GET_FIRMWARE_FILE, args);
    } else {
        return request_file_online(URL_GET_FIRMWARE_ONLINE_ROOT_DIR + `${args.type}/${args.fileName}`)
    }
}

export{
    getFirmwareFile,
    getFirmwareInfo
}