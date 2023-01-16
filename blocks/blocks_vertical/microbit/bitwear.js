'use strict';

goog.provide('Blockly.Blocks.microbit.bitwear');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['sensing_microbit_bitwear_vibration'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITWEAR_VIBRATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        [Blockly.Msg.MICROBIT_BITPLAYER_VIBRATION_OPT1, 'True'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_VIBRATION_OPT2, 'False'],
                    ]
                }

            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_microbit_bitwear_set_led_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITWEAR_SET_LED_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "COLOR",
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "shape_statement"]
        });
    }
};

