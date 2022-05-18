'use strict';

goog.provide('Blockly.Blocks.opencat.kill');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_opencat_gait_run_craw'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_GAIT_RUN_CRAW,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPTS",
          "options": [
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE3, 'crF'],
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE1, 'crL'],
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE2, 'crR']
          ]
        },
        // {
        //   "type": "input_value",
        //   "name": "SECS"
        // }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_gait_run_back'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_GAIT_RUN_BACK,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPTS",
          "options": [
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE0, 'bk'],
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE1, 'bkL'],
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE2, 'bkR']
          ]
        },
        // {
        //   "type": "input_value",
        //   "name": "SECS"
        // }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_gait_run_trot'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_GAIT_RUN_TROT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPTS",
          "options": [
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE3, 'trF'],
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE1, 'trL'],
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE2, 'trR']
          ]
        },
        // {
        //   "type": "input_value",
        //   "name": "SECS"
        // }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_gait_run_walk'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_GAIT_RUN_WALK,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPTS",
          "options": [
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE3, 'wkF'],
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE1, 'wkL'],
            [Blockly.Msg.OPENCAT_GAIT_OPTION_VALUE2, 'wkR']
          ]
        },
        // {
        //   "type": "input_value",
        //   "name": "SECS"
        // }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_gait_run_eggs'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_GAIT_RUN_EGGS,
      "args0": [
        // {
        //   "type": "input_value",
        //   "name": "SECS"
        // }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_gait_step_in_place'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_GAIT_RUN_STEPPING,
      "args0": [],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_posture_run'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_POSTURE_FORDURATION_RUN,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPTS",
          "options": [
            // [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE3, 'cd1'],
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE4, 'hi'],
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE5, 'pee'],
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE6, 'pu1'],
          ]
        },
        // {
        //   "type": "input_value",
        //   "name": "SECS"
        // }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_posture_fixed_run'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_POSTURE_FIXED_RUN,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPTS",
          "options": [
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE0, 'calib'],
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE1, 'balance'],
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE2, 'buttUp'],
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE7, 'rest'],
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE8, 'sit'],
            // [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE9, 'sleep'],
            [Blockly.Msg.OPENCAT_POSTURE_OPTION_VALUE10, 'str'],
          ]
        }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}


Blockly.Blocks['motion_opencat_pause_action'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_PAUSE_ACTION,
      "args0": [],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_stop_action'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_STOP_ACTION,
      "args0": [],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}


Blockly.Blocks['motion_opencat_legservo_set'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_SKILL_LEG_SERVO_SET,
      "args0": [
        {
          "type": "field_legservo_set",
          "name": "SETVALUE",
          // "options": [
          //   ['8', '8'],
          //   ['9', '9'],
          //   ['10', '10'],
          //   ['11', '11'],
          //   ['12', '12'],
          //   ['13', '13'],
          //   ['14', '14'],
          //   ['15', '15']
          // ]
          "default": '8'
        },
        {
          "type": "input_value",
          "name": "ANGLE"
        }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}

Blockly.Blocks['motion_opencat_headservo_set'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_SKILL_HEAD_SERVO_SET,
      "args0": [
        {
          "type": "input_value",
          "name": "ANGLE"
        }
      ],
      "extensions": ["colours_bitty_kills", "shape_statement"]
    });
  }
}
