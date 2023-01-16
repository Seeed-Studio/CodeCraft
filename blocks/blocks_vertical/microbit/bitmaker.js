'use strict';

goog.provide('Blockly.Blocks.microbit.bitmaker');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['sensing_microbit_bitmaker_set_led_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_BITMAKER_SET_LED_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "NO",
                    "options": [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "COLOR",
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_microbit_extension", "shape_statement"]
        });
    }
};

