'use strict';

goog.provide('Blockly.Blocks.haloboad.pose');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['sensing_haloboad_facing_up'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_POSE_IS_FACING_UP,
      "extensions": ["colours_powering_pose", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_haloboad_facing_down'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_POSE_IS_FACING_DOWN,
      "extensions": ["colours_powering_pose", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_haloboad_facing_left'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_POSE_IS_FACING_LEFT,
      "extensions": ["colours_powering_pose", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_haloboad_facing_right'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_POSE_IS_FACING_RIGHT,
      "extensions": ["colours_powering_pose", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_haloboad_facing_forward'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_POSE_IS_FACING_FORWARD,
      "extensions": ["colours_powering_pose", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_haloboad_facing_backward'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_POSE_IS_FACING_BACKWARD,
      "extensions": ["colours_powering_pose", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_haloboad_acceleration'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_POSE_GET_ACCELERATION,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "XYZ",
          "options": [
            ['X', '0'],
            ['Y', '1'],
            ['Z', '2']
          ]
        }
      ],
      "extensions": ["colours_powering_pose", "output_number"]
    });
  }
};


