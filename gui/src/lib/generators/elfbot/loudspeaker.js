
const audioSec = (music) => {
    switch (music) {
        case '0':
            return 2.195;
        case '1':
            return 3.494;
        case '2':
            return 3.589;
        case '3':
            return 4.632;
        case '4':
            return 1.647;
        case '5':
            return 2.222;
        case '6':
            return 1.373;
        case '7':
            return 2.438;
        case '8':
            return 1.521;
        case '9':
            return 1.606;
        case '10':
            return 4.345;
    }
    return 0;
}

export default Blockly => {

    Blockly.Elfbot['sound_elfbot_sound_play'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var sound = block.getFieldValue('SOUND');
        var secs = audioSec(sound);
        return `elfbot.wav_play(${sound})\ntime.sleep(${secs})\n`;
    }

    Blockly.Elfbot['sound_elfbot_sound_play_for_duration'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var sound = block.getFieldValue('SOUND');
        var duration = Blockly.Elfbot.valueToCode(block, 'DURATION', Blockly.Elfbot.ORDER_NONE);
        var secs = audioSec(sound);
        return `elfbot.wav_play(${sound})\ntime.sleep(${secs})\n`;
    }

    Blockly.Elfbot['sound_elfbot_sound_play_untildone'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var sound = block.getFieldValue('SOUND');
        var secs = audioSec(sound);
        return `elfbot.wav_play(${sound})\ntime.sleep(${secs})\n`;
    }

    Blockly.Elfbot['sound_elfbot_sound_stop_play'] = function (block) {
        return `elfbot.mute()\n`;
    }

    Blockly.Elfbot['sound_elfbot_sound_rest'] = function (block) {
        var beat = Blockly.Elfbot.valueToCode(block, 'BEAT', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.note_pause(${beat})\n`;
    }

    Blockly.Elfbot['sound_elfbot_sound_play_frequencyhz'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var hz = Blockly.Elfbot.valueToCode(block, 'HZ', Blockly.Elfbot.ORDER_NONE);
        var secs = Blockly.Elfbot.valueToCode(block, 'SECS', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.freq_play(${hz},${secs})\ntime.sleep(${secs} + 0.5)\n`;
    }

    Blockly.Elfbot['sound_elfbot_note_beats'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var note = block.getFieldValue('NOTE');
        var beat = block.getFieldValue('BEAT');
        var secs = 500;
        switch (beat) {
            case '0': secs = 500 + 100; break;
            case '1': secs = 250 + 100; break;
            case '2': secs = 125 + 100; break;
            case '3': secs = 63 + 100; break;
            case '4': secs = 1000 + 100; break;
            case '5': secs = 2000 + 100; break;
            case '6': secs = 4000 + 100; break;
            case '7': secs = 8000 + 100; break;
        }
        return `elfbot.notes_play(${note}, ${beat})\ntime.sleep(${secs/1000})\n`;
    }

    Blockly.Elfbot['sound_elfbot_sound_changevolume'] = function (block) {
        var volume = Blockly.Elfbot.valueToCode(block, 'VOLUME', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.volume_change(${volume})\n`;
    }

    Blockly.Elfbot['sound_elfbot_sound_setvolume'] = function (block) {
        var volume = Blockly.Elfbot.valueToCode(block, 'VOLUME', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.volume_set(${volume})\n`;
    }

    Blockly.Elfbot['sound_elfbot_sound_volume'] = function (block) {
        var code = `enabler._audio_task.volume`;
        return [code, Blockly.Elfbot.ORDER_ATOMIC];
    }

}