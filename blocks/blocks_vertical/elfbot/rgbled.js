'use strict';

goog.provide('Blockly.Blocks.elfbot.rgbLed');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['looks_elfbot_rgbled_show_effectscolor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_RGBLED_SHOW_EFFECTS_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/rgb-led.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "EFFECT",
                    "options": [
                        [Blockly.Msg.ELFBOT_RGBLED_EFFECTS_VALUE_OPTION0, 'show'],
                        [Blockly.Msg.ELFBOT_RGBLED_EFFECTS_VALUE_OPTION1, 'blink'],
                        [Blockly.Msg.ELFBOT_RGBLED_EFFECTS_VALUE_OPTION2, 'breath']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_elfbot_light", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_rgbled_show_positioncolor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_RGBLED_SHOW_POSITION_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/rgb-led.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "POSITION",
                    "options": [
                        [Blockly.Msg.ELFBOT_RGBLED_POSITION_VALUE_OPTION0, 'all'],
                        [Blockly.Msg.ELFBOT_RGBLED_POSITION_VALUE_OPTION1, 'left'],
                        [Blockly.Msg.ELFBOT_RGBLED_POSITION_VALUE_OPTION2, 'right']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_elfbot_light", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_rgbled_show_positioncolor_duration'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_RGBLED_SHOW_POSITION_COLOR_DURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/rgb-led.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "POSITION",
                    "options": [
                        [Blockly.Msg.ELFBOT_RGBLED_POSITION_VALUE_OPTION0, 'all'],
                        [Blockly.Msg.ELFBOT_RGBLED_POSITION_VALUE_OPTION1, 'left'],
                        [Blockly.Msg.ELFBOT_RGBLED_POSITION_VALUE_OPTION2, 'right']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
                {
                    "type": "input_value",
                    "name": "TIMER"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_elfbot_light", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_rgbled_show_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_RGBLED_SHOW_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/rgb-led.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION0, 'red'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION1, 'green'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION2, 'blue'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION3, 'yellow'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION4, 'cyan'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION5, 'purple'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION6, 'black'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION7, 'white']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_elfbot_light", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_rgbled_crushout'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_RGBLED_CRUSHOUT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/rgb-led.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_elfbot_light", "shape_statement"]
        });
    }
};