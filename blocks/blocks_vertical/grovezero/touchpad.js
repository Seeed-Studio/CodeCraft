'use strict';

goog.provide('Blockly.Blocks.grovezero.touchpad');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_g0_touchpad_when_click'] = {
    // 当touchpad按下
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TOUCHPAD_WHEN_CLICK,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Touchpad_pin@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x34'],
                        ['2', '0x35'],
                        ['3', '0x36'],
                        ['4', '0x37'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "NUM_OPT",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                    ]
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};


Blockly.Blocks['sensing_g0_touchpad_is_pressed'] = {
    // 多触摸开关【数字输入选择控件】的【数字输入选择控件】被按下？
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TOUCHPAD_IS_PRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Touchpad_pin@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x34'],
                        ['2', '0x35'],
                        ['3', '0x36'],
                        ['4', '0x37'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "NUM_OPT",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};