'use strict';

goog.provide('Blockly.Blocks.grovejoint.output');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_grovejoint_mini_motor_drive'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_MINIMOTOR_RUN, //
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "MOTOR",
          "options": [
            ['M1', '0'],
            ['M2', '1'],
          ]
        },
        {
          "type": "input_value",
          "name": "POWER"
        }
      ],
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};



Blockly.Blocks['motion_grovejoint_four_digit_display_tube'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_FOURDIGIT_TUBE_DISPLAY,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "VALUE",
        }
      ],
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_grovejoint_led_driver_board'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_LEDBOARD_SHOW,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "LEVEL",
          "options": [
            [Blockly.Msg.GROVE_JOINT_INPUT_LEVEL_HIGH, '1'],
            [Blockly.Msg.GROVE_JOINT_INPUT_LEVEL_LOW, '0']
          ]
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_grovejoint_full_color_led'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_RGBLED_SHOW,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "RED"
        },
        {
          "type": "input_value",
          "name": "GREEN"
        },
        {
          "type": "input_value",
          "name": "BLUE"
        }
      ],
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_grovejoint_speaker_note_beat'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_SPEAKER_NOTEBEAT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "ORVR",
          "options": [
            ['stop', '0'],
            ['Do', '1'],
            ['Re', '2'],
            ['Mi', '3'],
            ['Fa', '4'],
            ['Sol', '5'],
            ['La', '6'],
            ['Si', '7'],
            ['Do', '8'],
          ]
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_grovejoint_servo_turn_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_SERVO_TRUNANGLE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "ANGLE"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_grovejoint_buzzer'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_BUZZER_PLAY,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "LEVEL",
          "options": [
            [Blockly.Msg.GROVE_JOINT_INPUT_LEVEL_HIGH, '1'],
            [Blockly.Msg.GROVE_JOINT_INPUT_LEVEL_LOW, '0']
          ]
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_grovejoint_motor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_MOTOR_RUN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "LEVEL",
          "options": [
            [Blockly.Msg.GROVE_JOINT_INPUT_LEVEL_HIGH, '1'],
            [Blockly.Msg.GROVE_JOINT_INPUT_LEVEL_LOW, '0']
          ]
        }
      ],
      "category": Blockly.Categories.sound,
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_grovejoint_dc_motor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.GROVE_JOINT_OUTPUT_DCMOTOR_RUN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "LEVEL",
          "options": [
            [Blockly.Msg.GROVE_JOINT_INPUT_LEVEL_HIGH, '1'],
            [Blockly.Msg.GROVE_JOINT_INPUT_LEVEL_LOW, '0']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_grovejoint_output", "shape_statement"]
    });
  }
};
