import {
    URL_GET_TOKEN,
    URL_USER_LOGIN_WITH_PWD
} from '../../busi-proxy/busi-proxy';

export default (Blockly) => {

    Blockly.Arduino['motion_arduino_network_setwifi'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        var ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_ATOMIC) || "ssid";
        var password = Blockly.Arduino.valueToCode(block, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC) || "password";
        var code = [
            `cep.setParaLogin_url("${URL_USER_LOGIN_WITH_PWD}");`,
            `cep.setParaToken_url("${URL_GET_TOKEN}");`,
            `//==name`,
            `//==password`,
            `cep.Connect(${ssid}, ${password});\n`
        ];
        return code.join('\n');
    };

    Blockly.Arduino['motion_arduino_network_state'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        return ["cep.Connected()", Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['motion_arduino_speechr_rec'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        var language = block.getFieldValue('LANGUAGE');
        var secs = Blockly.Arduino.valueToCode(block, 'SECS', Blockly.Arduino.ORDER_ATOMIC);
        return `cep.Voice2Text(${language}, ${secs});\n`;
    };
    Blockly.Arduino['motion_arduino_speechr_rectext'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        return ["cep.getText()", Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['motion_arduino_speechr_tts'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || "";
        return `cep.Text2Voice(0, ${text});\n`;
    };

    Blockly.Arduino['motion_arduino_audio_record'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        var storage = block.getFieldValue('STORAGE');
        // 目前只支持sd卡录音
        var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || "record0";
        return `cep.SD_RecordStart(${name});\n`;
    };

    Blockly.Arduino['motion_arduino_audio_stop_record'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        return "cep.SD_RecordStop();\n";
    };

    Blockly.Arduino['motion_arduino_audio_play'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        var storage = block.getFieldValue('STORAGE');
        var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || "record0";
        return `cep.sdPlayFile(${name});\n`;
    };

    Blockly.Arduino['motion_arduino_audio_play_someone'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        var index = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_ATOMIC) || "0";
        return `cep.sdPlay(${index});\n`;
    };

    Blockly.Arduino['motion_arduino_audio_play_preornext'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        var playOpt = block.getFieldValue('PLAY_OPT');
        if (playOpt == '1') {
            return 'cep.sdPrev();\n';
        } else {
            return 'cep.sdNext();\n'
        }
    };

    Blockly.Arduino['motion_arduino_audio_play_atmode'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        var PLAY_OPT = block.getFieldValue('PLAY_OPT');
        var code = (opt) => {
            switch (opt) {
                case '1':
                    return 'cep.sdMode(0);\n'
                case '2':
                    return 'cep.sdPause();\n';
                case '3':
                    return 'cep.sdStop();\n'
            }
            return 'cep.sdMode(0);\n'
        }
        return code(PLAY_OPT);
    };

    Blockly.Arduino['motion_arduino_audio_setvol'] = function (block) {
        Blockly.Arduino.definitions_['include_cyberEar'] = '#include <CyberEar_Pro.h>';
        Blockly.Arduino.definitions_['var_cyberEarPro'] = "CyberEarPro cep;";
        Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';
        var vol = Blockly.Arduino.valueToCode(block, 'VOL', Blockly.Arduino.ORDER_ATOMIC);
        return `cep.sdSetVolume(${vol});\n`;
    };

}