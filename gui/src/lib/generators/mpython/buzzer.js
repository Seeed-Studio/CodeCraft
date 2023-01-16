export default Blockly => {

  Blockly.MPython['motion_mpython_buzzer_init'] = function (block) {
    Blockly.MPython.definitions_['import_audio'] = 'import audio';
    return `audio.player_init() \n`;
  }

  Blockly.MPython['motion_mpython_buzzer_release_cache'] = function (block) {
    Blockly.MPython.definitions_['import_audio'] = 'import audio';
    return `audio.player_deinit() \n`;
  }

  Blockly.MPython['motion_mpython_set_bizzer_volume'] = function (block) {
    Blockly.MPython.definitions_['import_audio'] = 'import audio';
    var volumn = Blockly.MPython.valueToCode(block, 'VOLUMN', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `audio.set_volume(${volumn}) \n`;
  }

  Blockly.MPython['motion_mpython_set_bizzer_action'] = function (block) {
    Blockly.MPython.definitions_['import_audio'] = 'import audio';
    var status = block.getFieldValue('PIN');
    return `audio.${status}() \n`;
  }

  Blockly.MPython['motion_mpython_bizzer_play'] = function (block) {
    Blockly.MPython.definitions_['import_audio'] = 'import audio';
    var url = Blockly.MPython.valueToCode(block, 'URL', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `audio.play(${url}) \n`;
  }

  Blockly.MPython['motion_mpython_tts_voice_conf'] = function (block) {
    Blockly.MPython.definitions_['import_audio'] = 'import audio';
    var appid = Blockly.MPython.valueToCode(block, 'APPID', Blockly.MPython.ORDER_ATOMIC) || 0;
    var key = Blockly.MPython.valueToCode(block, 'APIKEY', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `audio.xunfei_tts_config(${key}, ${appid}) \n`;
  }

  Blockly.MPython['motion_mpython_tts_voice_play'] = function (block) {
    Blockly.MPython.definitions_['import_audio'] = 'import audio';
    var content = Blockly.MPython.valueToCode(block, 'CONTENT', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `audio.xunfei_tts(${content}) \n`;
  }

}
