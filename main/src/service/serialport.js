import Serialport from 'serialport';

import { EventEmitter } from 'events';
import bindAll from 'lodash.bindall';

// 串口默认打开配置
const SERIALPORT_CONFIG = {
    autoOpen: false,
    baudRate: 115200
}

// 串口配置
const SET_OPTIONS = {
    brk: false,
    cts: false,
    dsr: false,
    dtr: false,
    rts: false
}
class SerialportCore extends EventEmitter {

    constructor() {
        super();
        /**
         * 当前活动的物理设备
         */
        this.activeDevice = null;

        /**
         * 绑定回调函数
         */
        bindAll(this, [
            'handleResponse',
            'handleConnectionClose'
        ]);
    }

    /**
     * 静态scan函数
     */
    static scan() {
        return Serialport.list();
    }

    /**
     * 串口连接
     * @param {*} info 
     */
    connect(info) {
        const {
            comName,
            connectionConfig = {},
            setOptions
        } = info;

        if (!comName) {
            return Promise.resolve(false);
        }
        if (this.isConnected()) {
            return Promise.resolve(true);
        }
        return new Promise(resolve => {
            this.activeDevice = new Serialport(comName, Object.assign({}, SERIALPORT_CONFIG, connectionConfig));
            //链路连接成功后添加 'data' 、 'close'事件
            this.activeDevice.on('data', this.handleResponse);
            this.activeDevice.on('close', this.handleConnectionClose);
            this.activeDevice.open(error => {
                if (!error) {
                    //连接成功后，是否配置通道参数
                    if(setOptions){
                       this.activeDevice.set(Object.assign({}, SET_OPTIONS, setOptions))
                    }
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    /**
     * handleResponse
     * @param {*} data 
     */
    handleResponse(data) {
        console.log('resp', data);
        this.emit('response', data);
    }

    /**
     * handleConnectionClose
     * @param {*} error 
     */
    handleConnectionClose(error) {
        this.emit('close', error);
    }

    /**
     * 判断是否
     * 连接成功
     */
    isConnected() {
        return this.activeDevice ? this.activeDevice.isOpen : false;
    }

    /**
     * 断开连接
     * 无需关注断开连接结果
     */
    disConnect() {
        if (!this.isConnected()) {
            return Promise.resolve(true);
        }
        return new Promise(resolve => {
            this.activeDevice.close((error) => {
                if (!error) {
                    console.log('disConnect succ ...');
                } else {
                    console.log('disConnect fail ...');
                }
                resolve(true);
            });
        });
    }

    /**
     * write
     * @param {*} data 
     */
    write(data) {
        console.log('data :', Buffer.from(data));
        if (this.isConnected()) {
            this.activeDevice.write(Buffer.from(data));
        }
    }

    /**
     * 更新波特率
     * @param {*} baudRate 
     */
    updateBaudRate(baudRate) {
        if (this.isConnected()) {
            this.activeDevice.update({
                baudRate: parseInt(baudRate)
            });
        }
    }




}

export default SerialportCore;