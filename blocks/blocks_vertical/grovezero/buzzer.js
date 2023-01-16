'use strict';

goog.provide('Blockly.Blocks.grovezero.buzzer');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sound_g0_buzzer_play_melody'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Buzzer@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "MELODY",
                    "options": [
                        [Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT0, 'Buzzer_Melody_BaDing'],
                        [Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT1, 'Buzzer_Melody_Wawawawaa'],
                        [Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT2, 'Buzzer_Melody_JumpUp'],
                        [Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT3, 'Buzzer_Melody_JumpDown'],
                        [Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT4, 'Buzzer_Melody_PowerUp'],
                        [Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT5, 'Buzzer_Melody_PowerDown'],
                        [Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT6, 'Buzzer_Melody_MagicWand'],
                        [Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT7, 'Buzzer_Melody_Siren']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};


Blockly.Blocks['sound_g0_buzzer_play_note'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_BUZZER_PLAY_NOTE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Buzzer@2x.svg",
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
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};


Blockly.Blocks['sound_g0_buzzer_play_note_for_beat'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_BUZZER_PLAY_NOTE_FOR_BEAT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Buzzer@2x.svg",
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
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "BEAT",
                    "options": [
                        ['1', 'Buzzer_Beat_Whole'],
                        ['1/2', 'Buzzer_Beat_Half'],
                        ['1/4', 'Buzzer_Beat_Quarter'],
                        ['1/8', 'Buzzer_Beat_Eighth'],
                        ['1/16', 'Buzzer_Beat_Sixteenth'],
                        ['2', 'Buzzer_Beat_Double'],
                        ['4', 'Buzzer_Beat_Quadruple'],
                        ['8', 'Buzzer_Beat_Octuple']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_g0_buzzer_mute_for_beat'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_BUZZER_MUTE_FOR_BEAT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Buzzer@2x.svg",
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
                        ['1', 'Buzzer_Beat_Whole'],
                        ['1/2', 'Buzzer_Beat_Half'],
                        ['1/4', 'Buzzer_Beat_Quarter'],
                        ['1/8', 'Buzzer_Beat_Eighth'],
                        ['1/16', 'Buzzer_Beat_Sixteenth'],
                        ['2', 'Buzzer_Beat_Double'],
                        ['4', 'Buzzer_Beat_Quadruple'],
                        ['8', 'Buzzer_Beat_Octuple']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_g0_buzzer_set_bpm'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_BUZZER_SET_BPM,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Buzzer@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};


Blockly.Blocks['sound_g0_buzzer_add_bpm'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_BUZZER_ADD_BPM,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Buzzer@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_g0_buzzer_get_bpm'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_BUZZER_GET_BPM,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Buzzer@2x.svg",
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

Blockly.Blocks['sound_g0_buzzer_stop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_BUZZER_STOP,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Buzzer@2x.svg",
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