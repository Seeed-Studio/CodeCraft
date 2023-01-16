const Ability = require('../../ability.js');

const getDelayForSpeed = (speed) => {
    switch (speed) {
        case 'slow':
            return 2000;
        case 'normal':
            return 666;
        case 'fast':
            return 400;
    }
}

class Lights extends Ability {

    constructor() {
        super();
    }

    blink(rgb, speed) {
        let secs = getDelayForSpeed(speed);
        this.execPyApi(`ring.blink(${rgb.r}, ${rgb.g}, ${rgb.b}, "${speed}")\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, secs)
        });
    }

    star(id, mode) {
        this.execPyApi(`ring.star(${id}, "${mode}")\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000)
        });
    }

    horizontalFlip(ringDatas = [], speed) {
        let secs = getDelayForSpeed(speed);
        this.execPyApi(`ring.horizontal_flip([${ringDatas.join(",")}], "${speed}")\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, secs + 100)
        });
    }

    verticalFlip(ringDatas = [], speed) {
        let secs = getDelayForSpeed(speed);
        this.execPyApi(`ring.vertical_flip([${ringDatas.join(",")}], "${speed}")\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, secs + 100)
        });
    }

    show(ringDatas = []) {
        this.execPyApi(`ring.show([${ringDatas.join(",")}])\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 800)
        });
    }

    showFor(ringDatas = [], secs) {
        this.execPyApi(`ring.show([${ringDatas.join(",")}])\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                this.execPyApi(`ring.off()\r\n`);
                resolve();
            }, secs)
        });
    }

    lightShow(rgb) {
        this.execPyApi(`ring.turn_on('all', ${rgb.r}, ${rgb.g}, ${rgb.b})\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 400)
        });
    }

    lightShowFor(rgb, secs) {
        this.execPyApi(`ring.turn_on('all', ${rgb.r}, ${rgb.g}, ${rgb.b})\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                this.execPyApi(`ring.off()\r\n`);
                resolve();
            }, secs)
        });
    }

    turnOnOne(rgb, no) {
        this.execPyApi(`ring.turn_on(${no}, ${rgb.r}, ${rgb.g}, ${rgb.b})\r\n`);
    }

    turnOffOne(no) {
        this.execPyApi(`ring.turn_off(${no})\r\n`);
    }

    turnOff() {
        this.execPyApi(`ring.off()\r\n`);
    }

    lightTest(rgb, no){
        this.execPyApi(`ring.turn_on(${no}, ${rgb.r}, ${rgb.g}, ${rgb.b})\r\n`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 400)
        });
    }

}

module.exports = Lights;