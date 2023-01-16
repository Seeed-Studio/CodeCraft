const buzzerMelodyToKey = (melody) => {
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
}
const beatToKey = (beat) => {
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

export default (Blockly) => {

    Blockly.C['sound_g0_buzzer_play_melody'] = function (block) {
        Blockly.C.definitions_['define_buzzer'] = '#define USE_BUZZER 1';
        var melody = block.getFieldValue('MELODY');
        var melodyKey = buzzerMelodyToKey(melody);
        var repeat = 0;
        var code = `grovezero->buzzer->playMelody(${melodyKey},${repeat});\n`;
        return code;
    };

    Blockly.C['sound_g0_buzzer_play_note'] = function (block) {
        Blockly.C.definitions_['define_buzzer'] = '#define USE_BUZZER 1';
        var note = block.getFieldValue('NOTE');
        var code = `grovezero->buzzer->RingNote( ${note} );\n`;
        return code;
    };

    Blockly.C['sound_g0_buzzer_play_note_for_beat'] = function (block) {
        Blockly.C.definitions_['define_buzzer'] = '#define USE_BUZZER 1';
        var note = block.getFieldValue('NOTE');
        var beat = block.getFieldValue('BEAT');
        var beatKey = beatToKey(beat);
        var code = `grovezero->buzzer->playNoteForBeat(${note},${beatKey});\n`;
        return code;
    };

    Blockly.C['sound_g0_buzzer_mute_for_beat'] = function (block) {
        Blockly.C.definitions_['define_buzzer'] = '#define USE_BUZZER 1';
        var beat = block.getFieldValue('BEAT');
        var beatKey = beatToKey(beat);
        var code = `grovezero->buzzer->muteForBeat(${beatKey});\n`;
        return code;
    };
    Blockly.C['sound_g0_buzzer_set_bpm'] = function (block) {
        Blockly.C.definitions_['define_buzzer'] = '#define USE_BUZZER 1';
        var value = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        var code = `grovezero->buzzer->setBPM(${value});\n`;
        return code;
    };
    Blockly.C['sound_g0_buzzer_add_bpm'] = function (block) {
        Blockly.C.definitions_['define_buzzer'] = '#define USE_BUZZER 1';
        var value = Blockly.C.valueToCode(block, 'VALUE', Blockly.C.ORDER_NONE);
        var code = `grovezero->buzzer->addBPM(${value});\n`;
        return code;
    };
    Blockly.C['sensing_g0_buzzer_get_bpm'] = function (block) {
        Blockly.C.definitions_['define_buzzer'] = '#define USE_BUZZER 1';
        var code = 'grovezero->buzzer->getBPM()';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    };
    Blockly.C['sound_g0_buzzer_stop'] = function (block) {
        Blockly.C.definitions_['define_buzzer'] = '#define USE_BUZZER 1';
        var code = 'grovezero->buzzer->stop();\n';
        return code;
    };
}
