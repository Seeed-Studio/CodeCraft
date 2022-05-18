'use strict';

goog.provide('Blockly.Blocks.elfbot.lightSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_elfbot_whenlightintensitylessthan'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_WHEN_LIGHTINTENSITY_LESSTHAN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/light-sensor.svg",
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
                    "name": "INTENSITY"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_light_intensity'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LIGHT_INTENSITY_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/light-sensor.svg",
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