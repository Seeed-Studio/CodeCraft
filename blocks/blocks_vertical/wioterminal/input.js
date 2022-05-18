'use strict';

goog.provide('Blockly.Blocks.wioterminal.input');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

//光线传感器
Blockly.Blocks['motion_wioterminal_light_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LIGHT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/light.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1']
                    ]
                }
            ],
            "extensions": ["colours_wioterminal_input", "output_number"],
        });
    }
}
