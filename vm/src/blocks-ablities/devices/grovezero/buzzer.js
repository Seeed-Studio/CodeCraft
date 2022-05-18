const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');


class Buzzer extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.buzzer;
        this.bpm = 120;
        this.playNoteInstruct = null;
    }

    playMelody(args) {
        let melody = this.melodyToKey(args.MELODY);
        let data = [melody, 0];
        this.exec(0x92, data);
    }


    playNoteForBeat(args) {
        let note = args.NOTE;
        let beat = args.BEAT;
        return new Promise(async (resolve, reject) => {
            beat = this.beatToKey(beat);
            let data = [note, beat];
            this.exec(0x90, data);
            let time = this.noteTime(beat);
            setTimeout(() => {
                resolve();
            }, time);
        });
    };


    playNote(args) {
        let note = args.NOTE;
        let time = 0x00;
        let data = [note, time];
        this.exec(0x91, data);
        this.playNoteInstruct = [0x91, data];
    }


    playStop() {
        this.exec(0x93);
        this.playNoteInstruct = null;
    }


    muteForBeat(args) {
        let beat = args.BEAT;
        this.exec(0x93);
        return new Promise((resolve, reject) => {
            beat = this.beatToKey(beat);
            beat = this.beatSignToBeat(beat);
            let time = beat / this.bpm * 60 * 1000;
            setTimeout(() => {
                if (this.playNoteInstruct !== null) {
                    this.exec(...this.playNoteInstruct);
                }
                resolve();
            }, time);
        });
    };

    setBpm(args) {
        let newBpm = parseInt(args.VALUE);
        if (newBpm < 60) {
            newBpm = 60;
        } else if (newBpm > 960) {
            newBpm = 960;
        }
        let bpmHigh = (newBpm & 0xFF00) >> 8;
        let bpmLow = newBpm & 0x00FF;
        let save2Flash = 0x00;
        let data = [bpmLow, bpmHigh, save2Flash];
        this.bpm = newBpm;
        this.exec(0x94, data);
    }


    addBpm(args) {
        let addBpm = parseInt(args.VALUE);
        this.bpm = this.bpm + addBpm;
        this.setBpm({ VALUE: this.bpm });
    }

    getBpm() {
        return this.bpm;
    }

    noteTime(beatSign) {
        let time = 0;
        time = this.beatSignToBeat(beatSign) * 500;
        time = time * 120 / this.bpm;
        return time;
    }

    beatToKey(beat) {
        let key = 0;
        switch (beat) {
            case 'Buzzer_Beat_Whole':
                key = 0;
                break;
            case 'Buzzer_Beat_Half':
                key = 4;
                break;
            case 'Buzzer_Beat_Quarter':
                key = 5;
                break;
            case 'Buzzer_Beat_Eighth':
                key = 6;
                break;
            case 'Buzzer_Beat_Sixteenth':
                key = 7;
                break;
            case 'Buzzer_Beat_Double':
                key = 1;
                break;
            case 'Buzzer_Beat_Quadruple':
                key = 2;
                break;
            case 'Buzzer_Beat_Octuple':
                key = 3;
                break;
        }
        return key;
    }


    beatSignToBeat(beatSign) {
        let beat = 1;
        switch (beatSign) {
            case 0: beat = 1; break;
            case 1: beat = 2; break;
            case 2: beat = 4; break;
            case 3: beat = 8; break;
            case 4: beat = 1 / 2; break;
            case 5: beat = 1 / 4; break;
            case 6: beat = 1 / 8; break;
            case 7: beat = 1 / 16; break;
        }
        return beat;
    }


    melodyTime(melodySign) {
        let time = 0;
        switch (melodySign) {
            case 0: time = 6 * 125; break;
            case 1: time = 23 * 125; break;
            case 2: time = 7 * 125; break;
            case 3: time = 7 * 125; break;
            case 4: time = 11 * 125; break;
            case 5: time = 11 * 125; break;
            case 6: time = 17 * 125; break;
            case 7: time = 26 * 125; break;
            default: break;
        }
        time = time * 120 / this.bpm;
        return time;
    }


    melodyToKey(melody) {
        let key = 0;
        switch (melody) {
            case 'Buzzer_Melody_BaDing':
                key = 0;
                break;
            case 'Buzzer_Melody_Wawawawaa':
                key = 1;
                break;
            case 'Buzzer_Melody_JumpUp':
                key = 2;
                break;
            case 'Buzzer_Melody_JumpDown':
                key = 3;
                break;
            case 'Buzzer_Melody_PowerUp':
                key = 4;
                break;
            case 'Buzzer_Melody_PowerDown':
                key = 5;
                break;
            case 'Buzzer_Melody_MagicWand':
                key = 6;
                break;
            case 'Buzzer_Melody_Siren':
                key = 7;
                break;
        }
        return key;
    };

}

module.exports = Buzzer;