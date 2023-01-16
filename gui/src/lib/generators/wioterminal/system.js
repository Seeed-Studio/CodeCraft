export default (Blockly) => {

    const listmelody = [0,
        131, 147, 165, 175, 196, 220, 247,  //#3, 1 - 7
        262, 294, 330, 349, 392, 440, 494,  //#4, 8 - 14
        523, 587, 659, 698, 784, 880, 988,  //#5, 15 - 21
        
        139, //# C#3, 22
        156, //# Eb3, 23
        185, //# F#3, 24
        208, //# G#3, 25
        233, //# Bb3, 26
        
        277, //# C#4, 27
        311, //# Eb4, 28
        370, //# F#4, 29
        415, //# G#4, 30
        466, //# Bb4, 31
        
        555, //# C#5, 32
        622, //# Eb5, 33
        740, //# F#5, 34
        831, //# G#5, 35
        932, //# Bb5, 36
    ];

    Blockly.Arduino['system_wioterminal_setup_loop'] = Blockly.Arduino['motion_arduino_setup_loop'];

    Blockly.Arduino['math_cc_min_0_max_240_number'] = Blockly.Arduino['math_number'];
    Blockly.Arduino['math_cc_min_0_max_320_number'] = Blockly.Arduino['math_number'];
    Blockly.Arduino['math_cc_number'] = Blockly.Arduino['math_number'];

    Blockly.Arduino['system_wioterminal_speaker_playnote'] = function (block) {
        Blockly.Arduino.setups_['setup_analog_buzzer'] = '  pinMode(WIO_BUZZER, OUTPUT);';

        let note = block.getFieldValue('NOTE');
        let beat = block.getFieldValue('BEAT');
        let time = 1000 * parseFloat(beat);
        let tone = listmelody[note];
        
        var code = `tone(WIO_BUZZER,${tone});\n`;
        code += `delay(${time});\n`;
        code += 'noTone(WIO_BUZZER);\n';
        return code;
    };

    Blockly.Arduino['system_wioterminal_3_axis_accelerometer'] = function (block) {
        Blockly.Arduino.definitions_['include_lis'] = '#include"LIS3DHTR.h"';
        Blockly.Arduino.definitions_['var_lis'] = `LIS3DHTR<TwoWire> lis;`;
        Blockly.Arduino.setups_['setup_lis_begin'] = 
`  lis.begin(Wire1);
  lis.setOutputDataRate(LIS3DHTR_DATARATE_100HZ);
  lis.setFullScaleRange(LIS3DHTR_RANGE_4G);
`;
        let xyz = block.getFieldValue('XYZ');
        let code;
        if (xyz=='0') {
            code = 'lis.getAccelerationX()';
        }else if (xyz=='1') {
            code = 'lis.getAccelerationY()';
        }else if (xyz=='2') {
            code = 'lis.getAccelerationZ()';
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['system_wioterminal_light_sensor'] = function (block) {
        Blockly.Arduino.setups_['setup_analog_light'] = '  pinMode(WIO_LIGHT, INPUT);';
        var code = 'analogRead(WIO_LIGHT)';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['system_wioterminal_button_pressed'] = function (block) {
        let key = block.getFieldValue('KEY');
        let value = '';
        if (key == 'A') {
            value = 'WIO_KEY_A';
        }else if (key == 'B') {
            value = 'WIO_KEY_B';
        }else if (key == 'C') {
            value = 'WIO_KEY_C';
        }
        Blockly.Arduino.setups_['setup_button_' + key] = '  pinMode(' + value + ', INPUT_PULLUP);';
        var code = `digitalRead(${value}) == LOW`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['system_wioterminal_5way_switch_pressed'] = function (block) {
        let direct = block.getFieldValue('DIRECT');
        let value = '';
        if (direct == 'up') {
            value = 'WIO_5S_UP';
        }else if (direct == 'down') {
            value = 'WIO_5S_DOWN';
        }else if (direct == 'left') {
            value = 'WIO_5S_LEFT';
        }else if (direct == 'right') {
            value = 'WIO_5S_RIGHT';
        }else if (direct == 'pressed') {
            value = 'WIO_5S_PRESS';
        }
        Blockly.Arduino.setups_['setup_5way_' + direct] = '  pinMode(' + value + ', INPUT_PULLUP);';
        var code = `digitalRead(${value}) == LOW`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['system_wioterminal_infrared_send'] = function (block) {
        Blockly.Arduino.definitions_['include_ir_SendBase'] = '#include <IRLibSendBase.h>';
        Blockly.Arduino.definitions_['include_ir_P01_NEC'] = '#include <IRLib_P01_NEC.h>';
        Blockly.Arduino.definitions_['include_ir_P02_Sony'] = '#include <IRLib_P02_Sony.h>';
        Blockly.Arduino.definitions_['include_ir_P07_NECx'] = '#include <IRLib_P07_NECx.h>';
        Blockly.Arduino.definitions_['include_ir_P05_Panasonic'] = '#include <IRLib_P05_Panasonic_Old.h>';
        Blockly.Arduino.definitions_['include_ir_Combo'] = '#include <IRLibCombo.h>';

        Blockly.Arduino.definitions_[`var_ir_send`] = `IRsend mySender;`;
        let control = block.getFieldValue('CONTROL');
        let address = Blockly.Arduino.valueToCode(block, 'ADDRESS', Blockly.Arduino.ORDER_NONE) || '';
        address = address.replace(/"/g, '');
        let bit = Blockly.Arduino.valueToCode(block, 'BIT', Blockly.Arduino.ORDER_NONE) || '';

        let code = `mySender.send(${control},${address},${bit});`;
        return code;
    };

    Blockly.Arduino['system_wioterminal_sound_sensor'] = function (block) {
        Blockly.Arduino.setups_['setup_analog_mic'] = '  pinMode(WIO_MIC, INPUT);';
        var code = 'analogRead(WIO_MIC)';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    
}