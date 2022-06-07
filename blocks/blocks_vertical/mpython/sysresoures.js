'use strict';

goog.provide('Blockly.Blocks.mpython.sysresoures');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_mpython_sysresoures_buttonpressed'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_BUTTON_PRESSED,
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
        "name": "BUTTON",
        "options": [
          ['A', 'a'],
          ['B', 'b'],
          ['A+B', 'a+b']
        ]
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_mpython_sysresoures", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_buttontouched'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_BUTTON_TOUCH,
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
        "name": "KEY",
        "options": [
          ['P', 'touchPad_P'],
          ['Y', 'touchPad_Y'],
          ['T', 'touchPad_T'],
          ['H', 'touchPad_H'],
          ['O', 'touchPad_O'],
          ['N', 'touchPad_N']
        ]
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_mpython_sysresoures", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_touchvalue'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_TOUCH_VALUE,
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
        "name": "KEY",
        "options": [
          ['P', 'touchPad_P'],
          ['Y', 'touchPad_Y'],
          ['T', 'touchPad_T'],
          ['H', 'touchPad_H'],
          ['O', 'touchPad_O'],
          ['N', 'touchPad_N']
        ]
      }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_volume'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_VOLUME,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/rgb-led.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_light'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_LIGHT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/rgb-led.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_acceleration'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_ACCELERATION,
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
        "name": "KEY",
        "options": [
          ['X', 'x'],
          ['Y', 'y'],
          ['Z', 'z']
        ]
      }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_slope'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE,
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
        "name": "KEY",
        "options": [
          ['X', 'X'],
          ['Y', 'Y'],
          ['Z', 'Z']
        ]
      }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_sharked'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SHARKED,
      "args0": [{
        "type": "field_image",
        "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
        "width": 40,
        "height": 30
      },
      {
        "type": "field_vertical_separator"
      }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_slope_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_ANGLE,
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
        "name": "KEY",
        "options": [
          [Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_OPT1, 'forward'],
          [Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_OPT2, 'back'],
          [Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_OPT3, 'left'],
          [Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_OPT4, 'right'],
        ]
      }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_set_single_color'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SET_SINGLE_COLOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/rgb-led.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "LED"
        },
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_mpython_sysresoures", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_set_single_rgb'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SET_SINGLE_RGB,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/rgb-led.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "LED"
        },
        {
          "type": "input_value",
          "name": "R"
        },
        {
          "type": "input_value",
          "name": "G"
        },
        {
          "type": "input_value",
          "name": "B"
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_set_all_color'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SET_ALL_COLOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/rgb-led.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_mpython_sysresoures", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_set_all_rgb'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SET_ALL_RGB,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/rgb-led.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "R"
        },
        {
          "type": "input_value",
          "name": "G"
        },
        {
          "type": "input_value",
          "name": "B"
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_close_rgb'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_CLOSE_RGB,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/rgb-led.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_set_bme280'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SET_BME280,
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
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_SYSRESOURES_BME280_OPT1, 'temperature'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_BME280_OPT1, 'humidity'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_BME280_OPT1, 'air_pressure']
          ]
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_draw_clock'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_DRAW_CLOCK,
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
          "type": "input_value",
          "name": "X"
        },
        {
          "type": "input_value",
          "name": "Y"
        },
        {
          "type": "input_value",
          "name": "R"
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_clock_operate'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_CLOCK_OPERATE,
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
        "name": "KEY",
        "options": [
          [Blockly.Msg.MPYTHON_SYSRESOURES_OPERATE_OPT1, '1'],
          [Blockly.Msg.MPYTHON_SYSRESOURES_OPERATE_OPT2, '2']
        ]
      }
      ],
      "extensions": ["colours_mpython_sysresoures", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_set_run_time'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SET_RUN_TIME,
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
          "name": "TIME",
          "options": [
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT6, 'second'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT9, 'millisecond'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT10, 'microsecond']
          ]
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_set_local_time'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_SET_LOCAL_TIME,
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
          "name": "TIME",
          "options": [
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT1, '0'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT2, '1'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT3, '2'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT4, '3'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT5, '4'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT6, '5'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT7, '6'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_TIME_OPT8, '7']
          ]
        }
      ],
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_reset'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_RESET,
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
      "extensions": ["colours_mpython_sysresoures", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sysresoures_mac_address'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_SYSRESOURES_MAC_ADDRESS,
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
      "extensions": ["colours_mpython_sysresoures", "output_number"]
    });
  }
};