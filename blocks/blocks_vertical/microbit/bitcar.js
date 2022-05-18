'use strict';

goog.provide('Blockly.Blocks.microbit.bitcar');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['sensing_microbit_bitcar_move'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITCAR_MOVE,
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
                    "name": "LEFT",
                },
                {
                    "type": "input_value",
                    "name": "RIGHT",
                },
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_microbit_bitcar_stop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITCAR_STOP,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_microbit_bitcar_standup_still'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITCAR_STANDUP_STILL,
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
                    "name": "SPEED",
                },
                {
                    "type": "input_value",
                    "name": "CHARGE",
                },
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_microbit_bitcar_line_under_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITCAR_LINE_UNDER_SENSOR,
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
                        [Blockly.Msg.MICROBIT_BITCAR_LINE_UNDER_SENSOR_OPT1, '1'],
                        [Blockly.Msg.MICROBIT_BITCAR_LINE_UNDER_SENSOR_OPT2, '2']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_microbit_bitcar_line_follow_at_speed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITCAR_LINE_FOLLOW_AT_SPEED,
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
                    "name": "SPEED",
                },
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "shape_statement"]
        });
    }
};

