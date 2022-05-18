goog.provide('Blockly.Blocks.elfbot.sound');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sound_elfbot_sound_play_for_duration'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2 精灵 播放声音 %3 持续 %4 秒",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "SOUND",
                    "options": [
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION0, '0'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION1, '1'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION2, '2'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION3, '3'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION4, '4'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION5, '5'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION6, '6'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION7, '7'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION8, '8'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION9, '9'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION10, '10'],
                    ]
                },
                {
                    "type":"input_value",
                    "name":"DURATION"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_elfbot_sound_play'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_PLAY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "SOUND",
                    "options": [
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION0, '0'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION1, '1'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION2, '2'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION3, '3'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION4, '4'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION5, '5'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION6, '6'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION7, '7'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION8, '8'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION9, '9'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION10, '10'],
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};



Blockly.Blocks['sound_elfbot_sound_play_untildone'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_PLAY_UNTILDONE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "SOUND",
                    "options": [
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION0, '0'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION1, '1'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION2, '2'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION3, '3'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION4, '4'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION5, '5'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION6, '6'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION7, '7'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION8, '8'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION9, '9'],
                        [Blockly.Msg.ELFBOT_SOUND_VALUE_OPTION10, '10'],
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_elfbot_sound_stop_play'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_STOP_PLAY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_elfbot_sound_rest'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_REST_BEATS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "BEAT",
                    "options": [
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION1, '0'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION2, '1'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION3, '2'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION4, '3'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION0, '4'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION5, '5'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION6, '6'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION7, '7']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_elfbot_sound_play_frequencyhz'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_PLAY_FREQUENCYHZ,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "HZ"
                },
                {
                    "type": "input_value",
                    "name": "SECS"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_elfbot_sound_changevolume'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_CHANGE_VOLUME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "VOLUME"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_elfbot_sound_setvolume'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_SET_VOLUME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "VOLUME"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_elfbot_sound_volume'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_VOLUME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sounds", "output_number"]
        });
    }
};

Blockly.Blocks['sound_elfbot_note_beats'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_NOTE_BEATS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/sound-sensor.svg",
                    "width": 40,
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
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION1, '0'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION2, '1'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION3, '2'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION4, '3'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION0, '4'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION5, '5'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION6, '6'],
                        [Blockly.Msg.ELFBOT_SOUND_BEAT_VALUE_OPTION7, '7']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};
