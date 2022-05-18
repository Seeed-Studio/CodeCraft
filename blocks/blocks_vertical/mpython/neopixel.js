'use strict';

goog.provide('Blockly.Blocks.mpython.neopixel');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_mpython_neopixel_init'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_NEOPIXEL_INIT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['P7', '7'],
            ['P8', '8'],
            ['P9', '9'],
            ['P13', '13'],
            ['P14', '14'],
            ['P15', '15'],
            ['P16', '16']
          ]
        },
        {
          "type": "input_value",
          "name": "NUM",
        }
      ],
      "extensions": ["colours_mpython_neopixel", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_mpython_neopixel_channel_color'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_NEOPIXEL_CHANNEL_COLOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "input_value",
          "name": "NUM",
        },
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "extensions": ["colours_mpython_neopixel", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_mpython_neopixel_channel_rgb'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_NEOPIXEL_CHANNEL_RGB,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "input_value",
          "name": "NUM",
        },
        {
          "type": "input_value",
          "name": "R",
        },
        {
          "type": "input_value",
          "name": "G",
        },
        {
          "type": "input_value",
          "name": "B"
        }
      ],
      "extensions": ["colours_mpython_neopixel", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_neopixel_full_light_color'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_NEOPIXEL_FULL_LIGHT_COLOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "extensions": ["colours_mpython_neopixel", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_mpython_neopixel_full_light_rgb'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_NEOPIXEL_FULL_LIGHT_RGB,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "input_value",
          "name": "R",
        },
        {
          "type": "input_value",
          "name": "G",
        },
        {
          "type": "input_value",
          "name": "B"
        }
      ],
      "extensions": ["colours_mpython_neopixel", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_mpython_neopixel_close'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_NEOPIXEL_CLOSE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
      ],
      "extensions": ["colours_mpython_neopixel", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_neopixel_rainbow_light_effect'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_NEOPIXEL_RAINBOW_LIGHT_EFFECT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "input_value",
          "name": "NUM",
        },
        {
          "type": "input_value",
          "name": "LIGHT",
        },
        {
          "type": "input_value",
          "name": "OFFSET",
        }
      ],
      "extensions": ["colours_mpython_neopixel", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_neopixel_set_write'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_NEOPIXEL_SET_WRITE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        }
      ],
      "extensions": ["colours_mpython_neopixel", "shape_statement"]
    });
  }
};
