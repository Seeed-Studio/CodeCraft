'use strict';

goog.provide('Blockly.Blocks.haloboad.timer');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_haloboad_timer_resetall'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_RESET_ALL,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["colours_powering_timer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_timer_resetA'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_RESET_A,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["colours_powering_timer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_timer_resetB'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_RESET_B,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["colours_powering_timer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_timer_getvalueA'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_GETVALUVE_A,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["colours_powering_timer", "output_string"]
    });
  }
};

Blockly.Blocks['motion_haloboad_timer_getvalueB'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_GETVALUVE_B,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["colours_powering_timer", "output_string"]
    });
  }
};

Blockly.Blocks['event_haloboad_timerA_when_greaterthan'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_WHEN_TIMERA_GREATERTHAN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "SEC",
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_powering_timer", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_haloboad_timerB_when_greaterthan'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_WHEN_TIMERB_GREATERTHAN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "SEC",
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_powering_timer", "shape_hat"]
    });
  }
};

Blockly.Blocks['motion_haloboad_timer_reset'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_RESET,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["colours_powering_timer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_timer_getvalue'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_GETVALUVE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["colours_powering_timer", "output_string"]
    });
  }
};

Blockly.Blocks['event_haloboad_timer_when_greaterthan'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_TIMER_WHEN_TIMER_GREATERTHAN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_jsq.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "SEC",
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_powering_timer", "shape_hat"]
    });
  }
};
