'use strict';

goog.provide('Blockly.Blocks.mpython.control');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['control_mpython_each_project_for'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MPYTHON_CONTROL_FOR1,
          "message1": Blockly.Msg.MPYTHON_ENENT_FOR2 ,
          "args0": [
              {
                  "type": "field_variable",
                  "name": "VARIABLE"
              }
          ],
          "args1": [
              {
                  "type": "input_statement",
                  "name": "SUBSTACK"
              }
          ],
          "extensions": ["colours_control", "shape_statement"]
      });
  }
};

Blockly.Blocks['control_mpython_print'] = {
    init: function () {
      this.jsonInit({
        "message0": 'print %1',
        "args0": [{
          "type": "input_value",
          "name": "VALUE",
        }],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_mpython_event", "shape_statement"]
      });
    }
  }