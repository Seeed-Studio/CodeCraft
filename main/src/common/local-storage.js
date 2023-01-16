const path = require("path");
const storage = require('electron-json-storage');

const fs = require("fs");

const LOCAL_CONFIG_PATH = path.join($dirname, '../../__config');

/**
 * 初始化本地存储
 */
const injectStorage = (callback) => {
    //检测并创建Storage目录
    fs.mkdir(LOCAL_CONFIG_PATH, { recursive: true }, err => {
        //设置本地存储路径
        storage.setDataPath(LOCAL_CONFIG_PATH);
        callback();
    });
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


