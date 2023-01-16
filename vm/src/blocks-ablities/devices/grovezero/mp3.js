const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Mp3 extends Ability {

    constructor() {
        super();
        this.instruct = instructs.grovezero.mp3;
        this.volume = 100;
    }

    startPlay(num) {
        let musicNum = num;
        let musicNumHigh = (musicNum & 0xFF00) >> 8;
        let musicNumLow = musicNum & 0x00FF;;
        let data = [musicNumLow, musicNumHigh];
        this.exec(0x03, data);
    }

    palyOrPause(key) {
        if (key === 'pause') {
            this.exec(0x0E);
        } else {
            this.exec(0x0D);
        }
    }


    switch(key) {
        if (key === 'next') {
            this.exec(0x01);
        } else {
            this.exec(0x02);
        }
    }


    setVolume(ratio) {
        this.volume = Math.floor(parseInt(ratio));
        if (parseInt(ratio) && parseInt(ratio) > 100) {
            this.volume = 100;
        }
        this.exec(0x06, [this.volume]);
    }


    addVolume(ratio) {
        this.volume = parseInt(ratio) + this.volume;
        if (this.volume > 100) {
            this.volume = 100;
        }
        if (this.volume < 0) {
            this.volume = 0;
        }
        this.exec(0x06, [this.volume]);
    }


    stopPlay() {
        this.exec(0x16);
    }


    setPlayMode(key) {
        switch (key) {
            case 'sequential':
                this.exec(0x11);
                break;
            case 'random':
                this.exec(0x18);

                break;
            case 'single':
                this.exec(0x19, [0x00]);
                break;
            default:
                this.exec(0x11);
        }
    }

    getVolume() {
        return this.volume;
    }



}

module.exports = Mp3;