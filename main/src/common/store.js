
import path from 'path';
import ElectronStore from 'electron-store';

// const STORE_DIR = path.join($dirname, '../../config/');

class AppConfig {

    constructor() {
        this._store = new ElectronStore();
    }

    /**
     * 设置value
     * @param {*} key 
     * @param {*} arg 
     */
    setValue(key, value) {
        this._store.set(key, value);
    }

    /**
     * 获取value
     * @param {*} key 
     * @param {*} defvalue 
     */
    getValue(key, defvalue) {
        let value = this._store.get(key);
        if(undefined === value){
            return defvalue;
        }else{
            return value;
        }
    }
    
}

export default new AppConfig();
