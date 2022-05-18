'use strict';

goog.provide('Blockly.Blocks.mpython.event');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_mpython_whenstartup'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_WHENSTARTUP,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['sensing_maixduino_print'] = {
  init: function () {
    this.jsonInit({
      "message0": 'print %1',
      "args0": [{
        "type": "input_value",
        "name": "VALUE",
      }],
      // "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_statement"]
    });
  }
};

Blockly.Blocks['event_mpython_whenaction'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_WHENACTION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "MODE",
          "options": [
            ['A', 'a'],
            ['B', 'b']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_EVENT_ACTION_OPT1, 'down'],
            [Blockly.Msg.MPYTHON_EVENT_ACTION_OPT2, 'up']
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_mpython_whenpinvoltage'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_WHENPINVOLTAGE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['P0', '0'],
            ['P1', '1'],
            ['P2', '2'],
            ['P3', '3'],
            ['P4', '4'],
            ['P6', '6'],
            ['P7', '7'],
            ['P8', '8'],
            ['P9', '9'],
            ['P10', '10'],
            ['P13', '13'],
            ['P14', '14'],
            ['P15', '15'],
            ['P16', '16'],
            ['P19', '19'],
            ['P20', '20'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "VOLTAGE",
          "options": [
            [Blockly.Msg.MPYTHON_EVENT_VOLTAGE_OPT1, 'high'],
            [Blockly.Msg.MPYTHON_EVENT_VOLTAGE_OPT2, 'low']
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_mpython_whenshark'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_WHENSHARK,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_mpython_whentilt'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_TILT_DIRECTION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "TILT",
          "options": [
            [Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_OPT1, 'forward'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_OPT2, 'back'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_OPT3, 'left'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_OPT4, 'right']
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_mpython_whentouchkey'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_WHENTOUCHKEY,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "TOUCHUKEY",
          "options": [
            ['P', 'P'],
            ['Y', 'Y'],
            ['T', 'T'],
            ['H', 'H'],
            ['O', 'O'],
            ['N', 'N']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_EVENT_ACTION_OPT3, 'pressed'],
            [Blockly.Msg.MPYTHON_EVENT_ACTION_OPT4, 'unpressed']
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_mpython_set_timer'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_FOR1,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "TIMES",
          "options": [
            ['1', '1'],
            ['2', '2'],
            ['4', '4'],
            ['7', '7'],
            ['8', '8'],
            ['9', '9'],
            ['10', '10']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_EVENT_ACTION_OPT5, 'PERIODIC'],
            [Blockly.Msg.MPYTHON_EVENT_ACTION_OPT6, 'ONE_SHOT']
          ]
        },
        {
          "type": "input_value",
          "name": "PERIOD",
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_mpython_cleartimer'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_CLEAR_TIMER,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
        "width": 40,
        "height": 30
      },
      {
        "type": "field_vertical_separator"
      },
      {
        "type": "field_dropdown",
        "name": "TIMES",
        "options": [
          ['1', '1'],
          ['2', '2'],
          ['4', '4'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['10', '10']
        ]
      }
      ],
      // "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_statement"]
    });
  }
};

Blockly.Blocks['event_mpython_timer_count'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_ENENT_TIMER_COUNT,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
        "width": 40,
        "height": 30
      },
      {
        "type": "field_vertical_separator"
      },
      {
        "type": "field_dropdown",
        "name": "TIMES",
        "options": [
          ['1', '1'],
          ['2', '2'],
          ['4', '4'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['10', '10']
        ]
      }
      ],
      // "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "output_number"]
    });
  }
};

Blockly.Blocks['event_mpython_set_event'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_EVENT_WHEN_ACTION,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
        "width": 40,
        "height": 30
      },
      {
        "type": "field_vertical_separator"
      },
      {
        "type": "field_dropdown",
        "name": "THREAD",
        "options": [
          ['10', '10'],
          ['9', '9'],
          ['8', '8'],
          ['7', '7'],
          ['4', '4'],
          ['2', '2'],
          ['1', '1']
        ]
      },
      {
        "type": "input_value",
        "name": "EVENT",
      }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_mpython_child_thread'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_EVENT_CHILD_THREAD,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
        "width": 40,
        "height": 30
      },
      {
        "type": "field_vertical_separator"
      },
      {
        "type": "field_dropdown",
        "name": "THREAD",
        "options": [
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4']
        ]
      }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_mpython_event", "shape_hat"]
    });
  }
};


Blockly.Blocks['motion_mpython_print'] = {
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
      "extensions": ["colours_mpython_event", "shape_statement"]
    });
  }
};