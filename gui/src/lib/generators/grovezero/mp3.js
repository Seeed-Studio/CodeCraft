export default (Blockly) => {
    Blockly.C['sound_g0_mp3_start_play'] = function (block) {
        Blockly.C.definitions_['define_mp3'] = '#define USE_MP3 1';
        let nums = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        let code = `grovezero->mp3->playSong(${nums});\n`;
        return code;
    }
    Blockly.C['sound_g0_mp3_pause_or_play'] = function (block) {
        Blockly.C.definitions_['define_mp3'] = '#define USE_MP3 1';
        let opt = block.getFieldValue('OPTIONS');
        let code;
        if (opt === 'pause') {
            code = `grovezero->mp3->pause();\n`;
        } else if (opt === 'play') {
            code = `grovezero->mp3->resume();\n`;
        }
        return code;
    }
    Blockly.C['sound_g0_mp3_switch'] = function (block) {
        Blockly.C.definitions_['define_mp3'] = '#define USE_MP3 1';
        let opt = block.getFieldValue('OPTIONS');
        let code;
        if (opt === 'next') {
            code = `grovezero->mp3->nextSong();\n`;
        } else if (opt === 'last') {
            code = `grovezero->mp3->prevSong();\n`;
        }
        return code;
    }
    Blockly.C['sound_g0_mp3_add_volume'] = function (block) {
        Blockly.C.definitions_['define_mp3'] = '#define USE_MP3 1';
        let val = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        let code = `grovezero->mp3->volChg(${val});\n`;
        return code;
    }
    Blockly.C['sound_g0_mp3_set_volume'] = function (block) {
        Blockly.C.definitions_['define_mp3'] = '#define USE_MP3 1';
        let val = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        let code = `grovezero->mp3->volSet(${val});\n`;
        return code;
    }
    Blockly.C['sound_g0_mp3_stop_play'] = function (block) {
        Blockly.C.definitions_['define_mp3'] = '#define USE_MP3 1';
        let code = `grovezero->mp3->playStop();\n`;
        return code;
    }

    Blockly.C['sound_g0_mp3_play_mode'] = function (block) {
        Blockly.C.definitions_['define_mp3'] = '#define USE_MP3 1';
        let mode = block.getFieldValue('MODE');
        let code;
        if (mode === 'sequential') {
            code = `grovezero->mp3->playLoopAll();\n`;
        } else if (mode === 'random') {
            code = `grovezero->mp3->playRandom();\n`;
        } else if (mode === 'single') {
            code = `grovezero->mp3->loopCurrent(00);\n`;
        }
        return code;
    }
}

