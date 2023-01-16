const Ability = require('./ability');
const dispatcher = require('./ability-message-dispatch');
const grovezero = require('./devices/grovezero/grovezero');
const powering = require('./devices/powering/powering');

const davinci = {}
const ardunio = {}

/**
 * 
 * 能力层 入口类
 * 
 * AbilityEngine
 * 
 */
class AbilityEngine {

    /**
     * AbilityEngine
     * 构造函数
     */
    constructor(vm) {
        /**
         * 所有能力
         */
        this.abilities = {
            ardunio: ardunio,
            powering: powering,
            davinci: davinci,
            grovezero: grovezero
        }
        /**
         * vm 实例
         */
        this.vm = vm;
        this.vm.on('response', (data) => this.onResponse(data));
        this.vm.deviceEngine.on('rawdata-event', (data) => this.onRawDataEvent(data));
    }

    /**
     * 初始化
     */
    inject() {
        Object.keys(this.abilities).forEach(id => {
            Object.keys(this.abilities[id]).forEach(key => {
                this.abilities[id][key].on(Ability.EVENT_WRITE, (data) => {
                    this.write(data);
                });
                this.abilities[id][key].on(Ability.EVENT_POST_IODATA, (result) => {
                    this.postIOData(result.io, result.data);
                });
                this.abilities[id][key].getRawData = (key) => this.getRawData(key);
            });
        });
    }

    /**
     * 数据上报
     * @param {*} data 
     */
    onResponse(data) {
        if (this.vm.debugMode === 0) return;
        dispatcher.emit('response', data);
    }

    /**
     * RawDataEvent事件上报
     * @param {*} data 
     */
    onRawDataEvent(data){
        if (this.vm.debugMode === 0) return;
        dispatcher.emit('rawdata-event', data);
    }

    /**
     * write data
     * @param {*} data 
     */
    write(data) {
        if (this.vm.debugMode === 0) return;
        this.vm.deviceEngine.write(data);
        this.vm.runtime.requestRedraw();
    }

    /**
     * Post I/O data to the virtual devices.
     * @param {?string} device Name of virtual I/O device.
     * @param {object} data Any data object to post to the I/O device.
     */
    postIOData(device, data) {
        if (this.debugMode === 0) return;
        this.vm.postIOData(device, data);
    }

    /**
     * 获取raw data
     * @param {*} key 
     */
    getRawData(key) {
        return this.vm.deviceEngine.getRawData(key);
    }

}

module.exports = AbilityEngine;