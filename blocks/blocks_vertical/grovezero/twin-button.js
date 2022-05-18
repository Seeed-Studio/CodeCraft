'use strict';

goog.provide('Blockly.Blocks.grovezero.twinButton');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_g0_twin_button_when_click'] = {

    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Twin_Button@2x.svg",
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
                        ['1', '0x1A'],
                        ['2', '0x0A'],
                        ['3', '0x12'],
                        ['4', '0x02']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "KEY",
                    "options": [
                        ['A', 'A'],
                        ['B', 'B'],
                        ['A+B', 'AB']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK_OPT3, 'click'],
                        [Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK_OPT5, 'hold']
                    ]
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};


Blockly.Blocks['sensing_g0_twin_button_is_pressed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TWIN_BUTTON_IS_PRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Twin_Button@2x.svg",
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
                        ['1', '0x1A'],
                        ['2', '0x0A'],
                        ['3', '0x12'],
                        ['4', '0x02']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "KEY",
                    "options": [
                        ['A', 'A'],
                        ['B', 'B'],
                        ['A+B', 'AB']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};