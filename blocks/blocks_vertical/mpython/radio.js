'use strict';

goog.provide('Blockly.Blocks.mpython.radio');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_mpython_radio_action'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_RADIO_ACTION,
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
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_MUSIC_ACTION_OPT1, 'on'],
            [Blockly.Msg.MPYTHON_MUSIC_ACTION_OPT2, 'off'],
          ]
        }
      ],
      "category": Blockly.Categories.radio,
      "extensions": ["colours_mpython_radio", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_radio_channel'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SET_RADIO_CHANNEL,
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
          "type": "input_value",
          "name": "CHANNEL",
        }
      ],
      "category": Blockly.Categories.radio,
      "extensions": ["colours_mpython_radio", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_radio_send_mes'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SET_RADIO_SEND_MES,
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
          "type": "input_value",
          "name": "MES",
        }
      ],
      "category": Blockly.Categories.radio,
      "extensions": ["colours_mpython_radio", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_get_radio_mes'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_RADIO_GET_MES,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "category": Blockly.Categories.radio,
      "extensions": ["colours_mpython_radio", "output_string"]
    });
  }
};

Blockly.Blocks['motion_mpython_when_get_radio_mes_action'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_RADIO_GET_MES_FOR1,
      // "message1": Blockly.Msg.MPYTHON_ENENT_FOR2,
      "args0": [
        {
          "type": "input_value",
          "name": "MES"
        }
      ],
      // "args1": [
      //   {
      //     "type": "input_statement",
      //     "name": "SUBSTACK"
      //   }
      // ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_radio", "shape_hat"]
    });
  }
};

Blockly.Blocks['motion_mpython_when_get_special_radio_mes_action'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_RADIO_GET_SPECIAL_FOR1,
      // "message1": Blockly.Msg.MPYTHON_ENENT_FOR2,
      "args0": [
        {
          "type": "input_value",
          "name": "MES",
        }
      ],
      // "args1": [
      //   {
      //     "type": "input_statement",
      //     "name": "SUBSTACK"
      //   }
      // ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_radio", "shape_hat"]
    });
  }
};