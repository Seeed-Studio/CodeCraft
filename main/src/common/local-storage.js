const storage = require('electron-json-storage');

const { getConfigDir } = require('./utils');

/**
 * 初始化本地存储
 */
const injectStorage = () => {
    storage.setDataPath(getConfigDir());
}

/**
 * 设置本地文件json
 * @param {*} key 
 * @param {*} value 
 * @param {*} callback 
 */
const set = (key, value, callback) => {
    storage.set(key, value, callback);
}

/**
 * 获取本地文件json
 * @param {*} key 
 * @param {*} callback 
 */
const get = (key, callback) => {
    storage.get(key, callback);
}

export {
    injectStorage,
    set,
    get
}


