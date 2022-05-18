'use strict';

goog.provide('Blockly.Blocks.elfbot.soundSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_elfbot_whenloudnessgreaterthan'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_WHENGREATERTHAN_LOUDNESS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/noise.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        ['小于', '<'],
                        ['大于', '>'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "LOUDNESS"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_sound_loudness'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SOUND_LOUDNESS_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/noise.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};



