'use strict';

goog.provide('Blockly.Blocks.haloboad.event');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_haloboad_when_startup'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_WHEN_STARTUP,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_haloboad_when_button_pressed'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_WHEN_BUTTON_PRESSED,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_haloboad_when_button_pressed_greaterthan_3_sec'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_WHEN_BUTTON_PRESSED_GREATERTAHN_3_SEC,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_haloboad_when_shaking'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_WHEN_SHAKING,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_haloboad_when_punching'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_WHEN_PUNCHING,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_haloboad_waituntil_end'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_WAIT_UNTIL_END,
      "extensions": ["colours_event", "shape_end"]
    });
  }
};