'use strict';

goog.provide('Blockly.Blocks.elfbot.vehicleWheel');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_elfbot_vehiclewheel_run_direction_power'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUN_DIRECTION_POWER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECTION",
                    "options": [
                        [Blockly.Msg.ELFBOT_VEHICLEWHEEL_DIRECTION_VALUE_OPTION0, 'forward'], // 前进
                        [Blockly.Msg.ELFBOT_VEHICLEWHEEL_DIRECTION_VALUE_OPTION1, 'back'], // 后退
                        [Blockly.Msg.ELFBOT_VEHICLEWHEEL_DIRECTION_VALUE_OPTION2, 'left'],// 向左
                        [Blockly.Msg.ELFBOT_VEHICLEWHEEL_DIRECTION_VALUE_OPTION3, 'right'] // 向右
                    ]
                },
                {
                    "type": "input_value",
                    "name": "POWER"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_vehiclewheel_runforword_power_duartion'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUNFORWORD_POWER_DURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "POWER"
                },
                {
                    "type": "input_value",
                    "name": "DURATION"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_vehiclewheel_runbackword_power_duartion'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUNBACKWORD_POWER_DURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "POWER"
                },
                {
                    "type": "input_value",
                    "name": "DURATION"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_vehiclewheel_runleft_power_duartion'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUNLEFT_POWER_DURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "POWER"
                },
                {
                    "type": "input_value",
                    "name": "DURATION"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_vehiclewheel_runright_power_duartion'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUNRIGHT_POWER_DURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "POWER"
                },
                {
                    "type": "input_value",
                    "name": "DURATION"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_vehiclewheel_run_power'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUN_POWER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "LEFTPOWER"
                },
                {
                    "type": "input_value",
                    "name": "RIGHTPOWER"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_vehiclewheel_runforword_duration'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUNFORWORD_DURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "DURATION"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_vehiclewheel_runbackword_duration'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUNBACKWORD_DURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "DURATION"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_elfbot_vehiclewheel_run_stop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_VEHICLEWHEEL_RUN_STOP,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/wheel.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};