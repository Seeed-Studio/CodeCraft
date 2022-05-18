export default Blockly => {

  Blockly.MPython['sound_mpython_music_stop_play'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music';
    var p = block.getFieldValue('PIN');
    var pin = p == -1 ? `` : `Pin.P${p}`
    return `music.stop(${pin}) \n`
  }

  Blockly.MPython['sound_mpython_restore_music_set'] = function (block) {
    return `music.reset() \n`;
  }

  Blockly.MPython['sound_mpython_note_beat'] = function (block) {
    var note = block.getFieldValue('NOTE');
    var beat = block.getFieldValue('BEAT');
    return [`'${note}:${beat}'`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sound_mpython_note_beat_pin'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music';
    var note = block.getFieldValue('NOTE');
    var beat = block.getFieldValue('BEAT');
    var p = block.getFieldValue('PIN');
    var pin = p == -1 ? `` : `, Pin.P${p}`
    return `music.play('${note}:${beat}'${pin}) \n`
  }

  Blockly.MPython['sound_mpython_music_tone'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music';
    var note = block.getFieldValue('NOTE');
    return [`${note}`, Blockly.MPython.ORDER_ATOMIC];;
  }

  Blockly.MPython['sound_mpython_play_tone_pin'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music';
    var note = block.getFieldValue('NOTE');
    var delay = Blockly.MPython.valueToCode(block, 'DELAY', Blockly.MPython.ORDER_ATOMIC) || 0;
    var p = block.getFieldValue('PIN');
    var pin = p == -1 ? `` : `, pin=Pin.P${p}`
    return `music.pitch(${note},${delay}${pin}) \n`
  }

  Blockly.MPython['sound_mpython_play_tone_pin_para'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music';
    var start = Blockly.MPython.valueToCode(block, 'START', Blockly.MPython.ORDER_ATOMIC) || 0;
    var end = Blockly.MPython.valueToCode(block, 'END', Blockly.MPython.ORDER_ATOMIC) || 0;
    var step = Blockly.MPython.valueToCode(block, 'STEP', Blockly.MPython.ORDER_ATOMIC) || 0;
    var duration = Blockly.MPython.valueToCode(block, 'DURATION', Blockly.MPython.ORDER_ATOMIC) || 0;
    var p = block.getFieldValue('PIN');
    var pin = p == -1 ? `` : `, pin=Pin.P${p}`
    var code = 
    `for freq in range(${start}, ${end}, ${step}):\n`+
    `    music.pitch(freq, ${duration}${pin})\n`
    return code
  }

  Blockly.MPython['sound_mpython_play_music_pin'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music'
    var music = block.getFieldValue('MUSIC');
    var wait = block.getFieldValue('WAIT').toLowerCase().replace(/\b[a-z]/g,function(s){return s.toUpperCase();});
    var loop = block.getFieldValue('LOOP').toLowerCase().replace(/\b[a-z]/g,function(s){return s.toUpperCase();});
    var p = block.getFieldValue('PIN');
    var pin = p == -1 ? `` : `, pin=Pin.P${p}`
    return `music.play(music.${music}${pin}, wait=${wait}, loop=${loop}) \n`
  }

  Blockly.MPython['sound_mpython_set_play_speed'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music'
    var speed = Blockly.MPython.valueToCode(block, 'SPEED', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `music.set_tempo(ticks= 4, bpm=${speed * 120}) \n`
  }

  Blockly.MPython['sound_mpython_music_set_beat'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music'
    var note = Blockly.MPython.valueToCode(block, 'NOTE', Blockly.MPython.ORDER_ATOMIC) || 0;
    var beat = Blockly.MPython.valueToCode(block, 'BEAT', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `music.set_tempo(ticks=${note}, bpm=${beat}) \n`
  }

  Blockly.MPython['sound_mpython_set_current_beat'] = function (block) {
    Blockly.MPython.definitions_['import_music'] = 'import music'
    return [`music.get_tempo()`, Blockly.MPython.ORDER_ATOMIC];
  }

}
