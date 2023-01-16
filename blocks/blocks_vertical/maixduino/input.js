'use strict';

goog.provide('Blockly.Blocks.maixduino.input');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_maixduino_analog_input'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.MAIXDUINO_ANALOG_INPUT,
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    ['A0', 'A0'],
                    ['A1', 'A1'],
                    ['A2', 'A2'],
                    ['A3', 'A3'],
                    ['A4', 'A4'],
                    ['A5', 'A5']
                ]
            }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_maixdunio_input", "output_number"]
      });
    }
};

Blockly.Blocks['motion_maixduino_input_systemtime'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_INPUT_SYSTEMTIME,
      "args0": [
          {
              "type": "field_dropdown",
              "name": "UNIT",
              "options": [
                  ['ms', '1'],
                  ['us', '2']
              ]
          }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_input", "output_number"]
    });
  }
};

