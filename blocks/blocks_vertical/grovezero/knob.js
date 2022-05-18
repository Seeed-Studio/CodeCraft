'use strict';

goog.provide('Blockly.Blocks.grovezero.knob');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_g0_knob_when_change'] = {
    // 当旋钮调节器被 **
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Knob@2x.svg",
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
                        ['1', '0x10'],
                        ['2', '0x18'],
                        ['3', '0x30'],
                        ['4', '0x38'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "CONTROL_OPT",
                    "options": [
                        [Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT0, 'clockwise'],
                        [Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT1, 'anticlockwise'],
                        [Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT2, 'click'],
                    ]
                },
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        })
    }
}