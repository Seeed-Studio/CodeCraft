'use strict';

goog.provide('Blockly.Blocks.haloboad.radio');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_haloboad_radio_when_revmsg'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_RADIO_WHEN_REVMSG,
      "args0": [
        {
          "type": "input_value",
          "name": "MES"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_powering_radio", "shape_hat"]
    });
  }
};

Blockly.Blocks['motion_haloboad_radio_setchannel'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_RADIO_SET_CHANNEL,
      "args0": [
        {
          "type": "input_value",
          "name": "CHANNEL",
        }
      ],
      "category": Blockly.Categories.radio,
      "extensions": ["colours_powering_radio", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_radio_sendmsg'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_RADIO_SEND_MSG,
      "args0": [
        {
          "type": "input_value",
          "name": "MES",
        }
      ],
      "category": Blockly.Categories.radio,
      "extensions": ["colours_powering_radio", "shape_statement"]
    });
  }
};