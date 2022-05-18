'use strict';

goog.provide('Blockly.Blocks.maixduino.event');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_maixduino_whenstartup'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ENENT_WHENSTARTUP,
            "args0": [
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_maixduino_delay'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ENENT_DELAY,
            "args0": [
                {
                    "type": "input_value",
                    "name": "DELAY_TIME"
                },
                {
                    "type": "field_dropdown",
                    "name": "UNIT",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ENENT_DELAY_UNIT_MS, 'm'],
                        [Blockly.Msg.MAIXDUINO_ENENT_DELAY_UNIT_US, 'u']
                    ]
                }
            ],
            "extensions": ["colours_event", "shape_statement"]
        });
    }
};

Blockly.Blocks['event_maixduino_runtime'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ENENT_RUNTIME,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "UNIT",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ENENT_DELAY_UNIT_MS, 'm'],
                        [Blockly.Msg.MAIXDUINO_ENENT_DELAY_UNIT_US, 'u']
                    ]
                }
            ],
            "extensions": ["colours_event", "output_number"]
        });
    }
};


Blockly.Blocks['event_maixduino_figure_input'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_FIGURE_INPUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D4', '4'],
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13']
                    ]
                }
            ],
            "extensions": ["colours_event", "output_number"]
        });
    }
};

Blockly.Blocks['event_maixduino_figure_output'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_FIGURE_OUTPUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D4', '4'],
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "STAT",
                    "options": [
                        ['0', '0'],
                        ['1', '1']
                    ]
                }
            ],
            "extensions": ["colours_event", "shape_statement"]
        });
    }
};


Blockly.Blocks['event_maixduino_analog_input'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ANALOG_INPUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A1', '1'],
                        ['A0', '0'],
                        ['A2', '2'],
                        ['A3', '3'],
                    ]
                }
            ],
            "extensions": ["colours_event", "output_number"]
        });
    }
};

Blockly.Blocks['event_maixduino_analog_output'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ANALOG_OUTPUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', '0'],
                        ['A1', '1'],
                        ['A2', '2'],
                        ['A3', '3'],
                        ['A4', '4'],
                        ['A5', '5']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NUM"
                }
            ],
            "extensions": ["colours_event", "shape_statement"]
        });
    }
};




Blockly.Blocks['motion_maixduino_camera_take_a_picture'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.MAIXDUINO_CAMERA_TAKE_PICTURE,
        "args0": [
        {
          "type": "input_value",
          "name": "PHOTOFILE",
        }
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_event", "shape_statement"]
      });
    }
  }
  
  
  Blockly.Blocks['motion_maixduino_camera_video'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.MAIXDUINO_CAMERA_TAKE_VIDEO,
        "args0": [
        {
          "type": "input_value",
          "name": "TIME",
        },
        {
          "type": "input_value",
          "name": "VIDEOFILE",
        }
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_event", "shape_statement"]
      });
    }
  }

  Blockly.Blocks['motion_maixduino_print'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.FIGURE_PLOTTER_PRINT,
        "args0": [
          {
            "type": "input_value",
            "name": "ARGS_0"
          },
          {
            "type": "input_value",
            "name": "ARGS_1"
          },
          {
            "type": "input_value",
            "name": "ARGS_2"
          },
          {
            "type": "input_value",
            "name": "ARGS_3"
          },
          {
            "type": "input_value",
            "name": "ARGS_4"
          }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_event", "shape_statement"]
      });
    }
  };