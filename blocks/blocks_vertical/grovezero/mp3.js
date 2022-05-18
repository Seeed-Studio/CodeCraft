'use strict';

goog.provide('Blockly.Blocks.grovezero.mp3');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sound_g0_mp3_start_play'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MP3_START_PLAY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_mp3@2x.svg",
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

Blockly.Blocks['sound_g0_mp3_pause_or_play'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MP3_PAUSE_OR_PLAY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_mp3@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPTIONS",
                    "options": [
                        [Blockly.Msg.GROVEZERO_MP3_PAUSE_OR_PLAY_OPT0, 'pause'],
                        [Blockly.Msg.GROVEZERO_MP3_PAUSE_OR_PLAY_OPT1, 'play']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};


Blockly.Blocks['sound_g0_mp3_switch'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MP3_SWITCH,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_mp3@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPTIONS",
                    "options": [
                        [Blockly.Msg.GROVEZERO_MP3_SWITCH_OPT0, 'next'],
                        [Blockly.Msg.GROVEZERO_MP3_SWITCH_OPT1, 'last']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};


Blockly.Blocks['sound_g0_mp3_add_volume'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MP3_ADD_VOLUME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_mp3@2x.svg",
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


Blockly.Blocks['sound_g0_mp3_set_volume'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MP3_SET_VOLUME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_mp3@2x.svg",
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


Blockly.Blocks['sound_g0_mp3_stop_play'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MP3_STOP_PLAY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_mp3@2x.svg",
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


Blockly.Blocks['sound_g0_mp3_play_mode'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MP3_PLAY_MODE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_mp3@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "MODE",
                    "options": [
                        [Blockly.Msg.GROVEZERO_MP3_PLAY_MODE_OPT0, 'sequential'],
                        [Blockly.Msg.GROVEZERO_MP3_PLAY_MODE_OPT1, 'random'],
                        [Blockly.Msg.GROVEZERO_MP3_PLAY_MODE_OPT2, 'single']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};