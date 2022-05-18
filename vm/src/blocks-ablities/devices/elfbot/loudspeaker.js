const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

const audioSec = (music) => {
    switch (music) {
        case 0:
            return 2195;
        case 1:
            return 3494;
        case 2:
            return 3589;
        case 3:
            return 4632;
        case 4:
            return 1647;
        case 5:
            return 2222;
        case 6:
            return 1373;
        case 7:
            return 2438;
        case 8:
            return 1521;
        case 9:
            return 1606;
        case 10:
            return 4345;
    }
    return 0;
}

class Loudspeaker extends Ability {

    constructor() {
        super();
        this.instruct = instructs.elfbot.loudspeaker;

        this.volume = 0;
    }

    /**
     * 播放音符、节拍
     * @param {*} note 
     * @param {*} beat 
     */
    playNoteBeat(note, beat) {
        this.execPyApi(`elfbot.notes_play(${note}, ${beat})\r\n`)
        var secs = 500;
        switch (beat) {
            case 0: secs = 500 + 100; break;
            case 1: secs = 250 + 100; break;
            case 2: secs = 125 + 100; break;
            case 3: secs = 63 + 100; break;
            case 4: secs = 1000 + 100; break;
            case 5: secs = 2000 + 100; break;
            case 6: secs = 4000 + 100; break;
            case 7: secs = 8000 + 100; break;
        }
        return new Promise((resolve) => {
            setTimeout(resolve, secs)
        })
    }

    /**
     * 休止节拍
     * @param {*} beat 
     */
    playRestBeat(beat) {
        this.execPyApi(`elfbot.mute(${beat})\r\n`)
    }

    /**
     * 播放频率持续 xx 秒
     * @param {*} rate 
     * @param {*} sec 
     */
    playRate(rate, sec) {
        this.execPyApi(`elfbot.freq_play(${rate},${sec})\r\n`)
        return new Promise(resolve => {
            setTimeout(resolve, sec * 1000 + 500)
        })
    }

    /**
     * 播放声音
     */
    playSounds(index, duration) {
        console.log('duration :' + duration)
        this.execPyApi(`elfbot.wav_play(${index},0)\r\n`);
        return new Promise(resolve => {
            setTimeout(resolve, duration * 1000)
        })
    }

    /**
     * 播放声音播放直到结束
     * @param {*} index 
     */
    playSoundsUntilDone(index) {
        this.execPyApi(`elfbot.wav_play(${index})\r\n`);
        return new Promise(resolve => {
            setTimeout(resolve, audioSec(index))
        })
    }

    /**
     * 关闭所有声音
     */
    close() {
        // this.exec(0xAD);
    }

    /**
     * 设置音量
     * @param {*} volume 
     */
    setVolume(volume) {
        if (volume < 0) volume = 0;
        if (volume > 100) volume = 100;
        this.execPyApi(`elfbot.volume_set(${volume})\r\n`)
        this.volume = volume;
    }

    /**
     * 改变音量
     */
    changeVolume(volume) {
        volume += this.volume;
        if (volume < 0) volume = 0;
        if (volume > 100) volume = 100;
        this.execPyApi(`elfbot.volume_set(${volume})\r\n`)
        this.volume = volume;
    }

    /**
     * 获取音量值
     */
    getVolume() {
        return this.volume;
    }
}

module.exports = Loudspeaker;