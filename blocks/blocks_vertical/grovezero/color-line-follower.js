'use strict';

goog.provide('Blockly.Blocks.grovezero.colorLineFollower');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sensing_g0_color_line_follower_is_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Color_Line_Follower@2x.svg",
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
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT0, 'red'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT1, 'green'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT2, 'blue'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT3, 'black'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT4, 'white']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_g0_color_line_follower_is_position'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Color_Line_Follower@2x.svg",
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
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT0, 'middle'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT1, 'right'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT2, 'right-most'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT3, 'left'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT4, 'left-most'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT5, 'lost'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};


Blockly.Blocks['sensing_g0_color_line_follower_get_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_GET_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Color_Line_Follower@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            // "checkboxInFlyout": true,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};