export default Blockly => {

    Blockly.Microbit['motion_microbit_music_play'] = function (block) {
        Blockly.Microbit.definitions_['music_import'] = 'import music';
        var pin = block.getFieldValue('PIN');
        var music = block.getFieldValue('MUSIC');
        return `music.play(music.${music}, pin=pin${pin}, wait=False)\n`;
    }

    Blockly.Microbit['motion_microbit_music_playuntildone'] = function (block) {
        Blockly.Microbit.definitions_['music_import'] = 'import music';
        var pin = block.getFieldValue('PIN');
        var music = block.getFieldValue('MUSIC');
        return `music.play(music.${music}, pin=pin${pin}, wait=True)\n`;
    }

    Blockly.Microbit['motion_microbit_music_playnote'] = function (block) {
        Blockly.Microbit.definitions_['music_import'] = 'import music';
        var pin = block.getFieldValue('PIN');
        var note = block.getFieldValue('NOTE');
        var beat = Blockly.Microbit.valueToCode(block, 'BEAT', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `music.play("${note}:${beat}", pin=pin${pin}, wait=True)\n`;
    }

    Blockly.Microbit['motion_microbit_music_changetempo'] = function (block) {
        Blockly.Microbit.definitions_['music_import'] = 'import music';
        var tempo = Blockly.Microbit.valueToCode(block, 'TEMPO', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var tempochanged = `music.get_tempo()[0] + ${tempo}`;
        return `music.set_tempo(bpm=(${tempochanged}))\n`;
    }

    Blockly.Microbit['motion_microbit_music_settempo'] = function (block) {
        Blockly.Microbit.definitions_['music_import'] = 'import music';
        var tempo = Blockly.Microbit.valueToCode(block, 'TEMPO', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `music.set_tempo(bpm=${tempo})\n`;
    }

    Blockly.Microbit['motion_microbit_music_tempo'] = function (block) {
        Blockly.Microbit.definitions_['music_import'] = 'import music';
        return [`music.get_tempo()[0]`, Blockly.Microbit.ORDER_ATOMIC];

    }


}