'use strict';

goog.provide('Blockly.Blocks.grovezero.miniWheel');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_g0_miniwheel_run_velocity_azimuth'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MINIWHEEL_RUN_VELOCITY_AZIMUTH,//
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Chassis@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "VELOCITY",
                    "options": [
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT1, 'low'],
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT2, 'medium'],
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT3, 'high']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "AZIMUTH",
                    "options": [
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT4, 'forward'],
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT5, 'backward'],
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT6, 'left'],
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT7, 'right'],
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT8, 'clockwise'],
                        [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT9, 'counterclockwise']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_g0_miniwheel_stop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MINIWHEEL_STOP,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Chassis@2x.svg",
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

Blockly.Blocks['motion_g0_miniwheel_set_power'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MINIWHEEL_SET_POWER,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Chassis@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "LEFT_POWER"
                },
                {
                    "type": "input_value",
                    "name": "RIGHT_POWER"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};