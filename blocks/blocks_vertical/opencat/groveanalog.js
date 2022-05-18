'use strict';

goog.provide('Blockly.Blocks.opencat.groveanalog');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_opencat_seeed_temperature'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_TEMPERATURE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/temperature.svg",
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
            ['A2', 'A2'],
            // ['A3', 'A3'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_analog", "output_number"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_rotation'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_ROTATION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rotation.svg",
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
            ['A2', 'A2'],
            // ['A3', 'A3'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_analog", "output_number"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_sound'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_SOUND,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/sound.svg",
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
            ['A2', 'A2'],
            // ['A3', 'A3'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_analog", "output_number"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_light'] = {
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
            ['A2', 'A2'],
            // ['A3', 'A3'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_analog", "output_number"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_quality'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_QUALITY,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/quality.svg",
          "width": 65,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['A2', 'A2'],
            // ['A3', 'A3'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_analog", "output_number"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_slide_pot'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_SLIDE_POT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/slide_pot.svg",
          "width": 65,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['A2', 'A2'],
            // ['A3', 'A3'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_analog", "output_number"],
    });
  }
}
