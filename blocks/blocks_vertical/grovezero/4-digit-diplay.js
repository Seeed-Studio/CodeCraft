'use strict';

goog.provide('Blockly.Blocks.grovezero.fourDigitDisplay');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['event_g0_four_digit_display_when_countdown_end'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_FOUR_DIGIT_WHEN_COUNTDOWN_END,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_4_Digit_Display@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_looks", "shape_hat"]
        });
    }
};

Blockly.Blocks['looks_g0_four_digit_display_show_number'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_FOUR_DIGIT_SHOW_NUMBER,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_4_Digit_Display@2x.svg",
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
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};


Blockly.Blocks['looks_g0_four_digit_display_start_countdown'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_FOUR_DIGIT_START_COUNTDOWN,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_4_Digit_Display@2x.svg",
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
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};


Blockly.Blocks['looks_g0_four_digit_display_off'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_FOUR_DIGIT_OFF,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_4_Digit_Display@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};


Blockly.Blocks['looks_g0_four_digit_display_set_brightness'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_FOUR_DIGIT_SET_BRIGHTNESS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_4_Digit_Display@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "BRIGHTNESS"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

