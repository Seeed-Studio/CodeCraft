'use strict';

goog.provide('Blockly.Blocks.microbit.bitplayer');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['sensing_microbit_bitplayer_key_is_pressed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITPLAYER_KEY_IS_PRESSED,
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
                    "name": "KEY",
                    "options": [
                        ['A', '5'],
                        ['B', '11'],
                        ['C', '13'],
                        ['D', '14'],
                        ['L', '15'],
                        ['R', '16'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "output_boolean"]
        });
    }
};


Blockly.Blocks['sensing_microbit_bitplayer_joystick'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK,
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
                    "name": "KEY",
                    "options": [
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT1, '1'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT2, '2'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT3, '3'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT4, '4'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT5, '5'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT6, '6'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT7, '7'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT8, '8'],
                        [Blockly.Msg.MICROBIT_BITPLAYER_JOYSTICK_OPT9, '9']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_microbit_bitplayer_vibration'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITPLAYER_VIBRATION,
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
                    "name": "KEY",
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