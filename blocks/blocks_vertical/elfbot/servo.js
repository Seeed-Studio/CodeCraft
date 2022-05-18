'use strict';

goog.provide('Blockly.Blocks.elfbot.servo');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

/**
 * 舵机相关积木定义
 */

Blockly.Blocks['motion_elfbot_headservo_lookleft'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SERVO_HEAD_LOOKLEFT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/head-servo.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DEGREES",
                    "options": [
                        ['0', '0'],
                        ['30', '30'],
                        ['60', '60']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_headservo_lookright'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SERVO_HEAD_LOOKRIGHT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/head-servo.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DEGREES",
                    "options": [
                        ['0', '0'],
                        ['30', '30'],
                        ['60', '60']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_headservo_lookup'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SERVO_HEAD_LOOKUP,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/head-servo.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DEGREES",
                    "options": [
                        ['0', '0'],
                        ['25', '25']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_headservo_lookdown'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SERVO_HEAD_LOOKDOWN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/head-servo.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DEGREES",
                    "options": [
                        ['0', '0'],
                        ['10', '10']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_earservo_turnforword'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SERVO_EAR_TURNFORWARD,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/servo.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DEGREES",
                    "options": [
                        ['0', '0'],
                        ['30', '30'],
                        ['60', '60']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_earservo_turnbackword'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_SERVO_EAR_TURNBACKWARD,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/servo.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DEGREES",
                    "options": [
                        ['0', '0'],
                        ['30', '30'],
                        ['60', '60']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};