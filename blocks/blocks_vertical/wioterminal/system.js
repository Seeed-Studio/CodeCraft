'use strict';

goog.provide('Blockly.Blocks.wioterminal.system');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['system_wioterminal_setup_loop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SETUP_LOOP0,
            "message1": "%1",
            "message2": Blockly.Msg.ARDUINO_SETUP_LOOP2,
            "message3": "%1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK1"
                }
            ],
            "args3": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK2"
                }
            ],
            "extensions": ["colours_wioterminal_system", "shape_hat"]
        });
    }
}

Blockly.Blocks['system_wioterminal_speaker_playnote'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SPEAKER_PLAYNOTE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/speaker.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_buzzer_note",
                    "name": "NOTE",
                    "options": [
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT0, value: '1' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT1, value: '2' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT2, value: '3' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT3, value: '4' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT4, value: '5' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT5, value: '6' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT6, value: '7' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT7, value: '8' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT8, value: '9' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT9, value: '10' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT10, value: '11' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT11, value: '12' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT12, value: '13' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT13, value: '14' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT14, value: '15' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT15, value: '16' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT16, value: '17' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT17, value: '18' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT18, value: '19' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT19, value: '20' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT20, value: '21' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT21, value: '22' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT22, value: '23' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT23, value: '24' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT24, value: '25' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT25, value: '26' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT26, value: '27' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT27, value: '28' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT28, value: '29' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT29, value: '30' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT30, value: '31' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT31, value: '32' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT32, value: '33' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT33, value: '34' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT34, value: '35' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT35, value: '36' }
                    ],
                },
                {
                    "type": "field_dropdown",
                    "name": "BEAT",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_SPEAKER_BEAT_OPT0, '1'],
                        [Blockly.Msg.WIO_TERMINAL_SPEAKER_BEAT_OPT1, '0.5'],
                        [Blockly.Msg.WIO_TERMINAL_SPEAKER_BEAT_OPT2, '0.25'],
                        [Blockly.Msg.WIO_TERMINAL_SPEAKER_BEAT_OPT3, '0.125'],
                        [Blockly.Msg.WIO_TERMINAL_SPEAKER_BEAT_OPT4, '0.0625'],
                        [Blockly.Msg.WIO_TERMINAL_SPEAKER_BEAT_OPT5, '2'],
                        [Blockly.Msg.WIO_TERMINAL_SPEAKER_BEAT_OPT6, '4'],
                        [Blockly.Msg.WIO_TERMINAL_SPEAKER_BEAT_OPT7, '8']
                    ]
                }
            ],
            "extensions": ["colours_wioterminal_system", "shape_statement"]
        });
    }
}

Blockly.Blocks['system_wioterminal_3_axis_accelerometer'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_3AXIS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/accelerometer.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "XYZ",
                    "options": [
                        ['X', '0'],
                        ['Y', '1'],
                        ['Z', '2']
                    ]
                }
            ],
            "extensions": ["colours_wioterminal_system", "output_number"],
        });
    }
}

//光线传感器
Blockly.Blocks['system_wioterminal_light_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_LIGHT_SENSOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/light.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_wioterminal_system", "output_number"],
        });
    }
}

//系统按钮
Blockly.Blocks['system_wioterminal_button_pressed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_BUTTON_PRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/button.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "KEY",
                    "options": [
                        ['A', 'A'],
                        ['B', 'B'],
                        ['C', 'C'],
                    ]
                }
            ],
            "extensions": ["colours_wioterminal_system", "output_boolean"],
        });
    }
}

//方向键按钮
Blockly.Blocks['system_wioterminal_5way_switch_pressed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_5WAY_SWITCH_PRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/direction.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECT",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_5WAY_SWITCH_PRESSED_OPT0, 'up'],
                        [Blockly.Msg.WIO_TERMINAL_5WAY_SWITCH_PRESSED_OPT1, 'down'],
                        [Blockly.Msg.WIO_TERMINAL_5WAY_SWITCH_PRESSED_OPT2, 'left'],
                        [Blockly.Msg.WIO_TERMINAL_5WAY_SWITCH_PRESSED_OPT3, 'right'],
                        [Blockly.Msg.WIO_TERMINAL_5WAY_SWITCH_PRESSED_OPT4, 'pressed'],
                    ]
                }
            ],
            "extensions": ["colours_wioterminal_system", "output_boolean"],
        });
    }
}

//红外发射模块
Blockly.Blocks['system_wioterminal_infrared_send'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_INFRARED_SEND,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/infrared.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "CONTROL",
                    "options": [
                        ['NEC', 'NEC'],
                        ['Sony', 'SONY'],
                        ['RC5', 'RC5'],
                        ['RC6', 'RC6'],
                        ['Panasonic', 'PANASONIC_OLD'],
                        ['JVC', 'JVC'],
                        ['NECx', 'NECX'],
                        ['Samsung', 'SAMSUNG36'],
                        ['GIcable', 'GICABLE'],
                        ['DirecTV', 'DIRECTV'],
                        ['RCMM', 'RCMM'],
                        ['CYKM', 'CYKM'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "ADDRESS"
                },
                {
                    "type": "input_value",
                    "name": "BIT"
                }
            ],
            "extensions": ["colours_wioterminal_system", "shape_statement"]
        });
    }
}

//声音传感器
Blockly.Blocks['system_wioterminal_sound_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SOUND_SENSOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/volume.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_wioterminal_system", "output_number"],
        });
    }
}