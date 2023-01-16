'use strict';

goog.provide('Blockly.Blocks.grovezero.slider');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');



Blockly.Blocks['sensing_g0_slider_get_value'] = {
    // 滑动变阻器【数字输入选择控件】读数
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_SLIDER_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Slide@2x.svg",
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
                        ['1', '0x21'],
                        ['2', '0x2A'],
                        ['3', '0x2B'],
                        ['4', '0x2C'],
                    ]
                }
            ],
            // "checkboxInFlyout": true,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};