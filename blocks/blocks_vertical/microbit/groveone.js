'use strict';

goog.provide('Blockly.Blocks.microbit.groveone');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['sensing_microbit_grove_one_mini_fan_set_speed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_GROVE_ONE_MINI_FAN_SET_SPEED,
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
                    "name": "PIN",
                    "options": [
                        ['P0', '0'],
                        ['P1', '1'],
                        ['P2', '2'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SPEED",
                },

            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_groveone", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_microbit_grove_one_servo_set_angle'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_GROVE_ONE_SERVO_SET_ANGLE,
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
                    "name": "PIN",
                    "options": [
                        ['P0', '0'],
                        ['P1', '1'],
                        ['P2', '2'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "ANGLE",
                },

            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_groveone", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_microbit_grove_one_ultrasonic_get_distance'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_GROVE_ONE_ULTRASONIC_GET_DISTANCE,
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
                    "name": "PIN",
                    "options": [
                        ['P0', '0'],
                        ['P1', '1'],
                        ['P2', '2'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [Blockly.Msg.MICROBIT_GROVE_ONE_ULTRASONIC_GET_DISTANCE_OPT1, '1'],
                        [Blockly.Msg.MICROBIT_GROVE_ONE_ULTRASONIC_GET_DISTANCE_OPT2, '2'],
                    ]
                },

            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_groveone", "output_number"]
        });
    }
};

