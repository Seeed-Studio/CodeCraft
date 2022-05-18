'use strict';

goog.provide('Blockly.Blocks.mpython.looks');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['looks_mpython_oled'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_OLED,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "DISPLAY",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_OLED_OPT1, 'clear'],
            [Blockly.Msg.MPYTHON_LOOKS_OLED_OPT2, 'full_bright'],
            [Blockly.Msg.MPYTHON_LOOKS_OLED_OPT3, 'black_background'],
            [Blockly.Msg.MPYTHON_LOOKS_OLED_OPT4, 'white_background']
          ]
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_oled_line_text'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_OLED_LINE_TEXT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "LINE",
          "options": [
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
          ]
        },
        {
          "type": "input_value",
          "name": "TEXT",
        },
        {
          "type": "field_dropdown",
          "name": "MODE",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_MODE_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_MODE_OPT2, '2'],
            [Blockly.Msg.MPYTHON_LOOKS_MODE_OPT3, '3'],
            [Blockly.Msg.MPYTHON_LOOKS_MODE_OPT4, '4'],
          ]
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_oled_clear_line'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_OLED_CLEAR_LINE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "LINE",
          "options": [
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
          ]
        },
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_display_text'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DISPLAY_TEXT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "TEXT",
        },
        {
          "type": "field_dropdown",
          "name": "MODE",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_MODE_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_MODE_OPT2, '2'],
            [Blockly.Msg.MPYTHON_LOOKS_MODE_OPT3, '3'],
            [Blockly.Msg.MPYTHON_LOOKS_MODE_OPT4, '4'],
          ]
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_trace_point'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_TRACE_POINT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "field_dropdown",
          "name": "MODE",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_LIGHT_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_LIGHT_OPT2, '0']
          ]
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_progress'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_PROGRESS,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "W",
        },
        {
          "type": "input_value",
          "name": "H",
        },
        {
          "type": "input_value",
          "name": "PROGRESS",
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_column_strip'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_COLUMN_STRIP,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_DIRECTION_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_DIRECTION_OPT2, '0']
          ]
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "W",
        },
        {
          "type": "input_value",
          "name": "H",
        },
        {
          "type": "input_value",
          "name": "PROGRESS",
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_draw_line'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DRAW_LINE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT2, '0']
          ]
        },
        {
          "type": "input_value",
          "name": "X1",
        },
        {
          "type": "input_value",
          "name": "Y1",
        },
        {
          "type": "input_value",
          "name": "X2",
        },
        {
          "type": "input_value",
          "name": "Y2",
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_draw_frame'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DRAW_FRAME,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT2, '0']
          ]
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "W",
        },
        {
          "type": "input_value",
          "name": "H",
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_draw_arc_border'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DRAW_ARC_BORDER,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT2, '0']
          ]
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "W",
        },
        {
          "type": "input_value",
          "name": "H",
        },
        {
          "type": "input_value",
          "name": "R",
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_draw_rect'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DRAW_RECT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT2, '0']
          ]
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "W",
        },
        {
          "type": "input_value",
          "name": "H",
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_draw_circle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DRAW_CIRCLE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT2, '0']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "SHAPE",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_CIRCLE_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_CIRCLE_OPT2, '2']
          ]
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "R",
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_draw_triangle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DRAW_TRIANGLE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_DRAW_OPT2, '0']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "SHAPE",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_CIRCLE_OPT1, '1'],
            [Blockly.Msg.MPYTHON_LOOKS_CIRCLE_OPT2, '2']
          ]
        },
        {
          "type": "input_value",
          "name": "X1",
        },
        {
          "type": "input_value",
          "name": "Y1",
        },
        {
          "type": "input_value",
          "name": "X2",
        },
        {
          "type": "input_value",
          "name": "Y2",
        },
        {
          "type": "input_value",
          "name": "X3",
        },
        {
          "type": "input_value",
          "name": "Y3",
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_draw_display_picture'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DRAW_DISPLAY_PICTURE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "field_dropdown",
          "name": "SHAPE",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT1, '1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT2, '2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT3, '3.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT4, '4.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT5, '5.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT6, '6.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT7, '7.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT8, '8.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT9, '9.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT10, '10.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT11, '11.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT12, '12.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT13, 'rock.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT14, 'rock_s.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT15, 'paper.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT16, 'paper_s.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT17, 'scissors.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT18, 'scissors_s.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT19, 'Expressions/Big smile.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT20, 'Expressions/Heart large.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT21, 'Expressions/Heart small.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT22, 'Expressions/Mouth 1 open.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT23, 'Expressions/Mouth 1 shut.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT24, 'Expressions/Mouth 2 open.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT25, 'Expressions/Mouth 2 shut.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT26, 'Expressions/Sad.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT27, 'Expressions/Sick.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT28, 'Expressions/Smile.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT29, 'Expressions/Swearing.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT30, 'Expressions/Talking.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT31, 'Expressions/Wink.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT32, 'Expressions/ZZZ.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT33, 'Eyes/Angry.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT34, 'Eyes/Awake.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT35, 'Eyes/Black eye.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT36, 'Eyes/Bottom left.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT37, 'Eyes/Bottom right.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT38, 'Eyes/Crazy 1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT39, 'Eyes/Crazy 2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT40, 'Eyes/Disappointed.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT41, 'Eyes/Dizzy.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT42, 'Eyes/Down.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT43, 'Eyes/Evil.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT44, 'Eyes/Hurt.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT45, 'Eyes/Knocked out.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT46, 'Eyes/Love.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT47, 'Eyes/Middle left.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT48, 'Eyes/Middle right.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT49, 'Eyes/Neutral.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT50, 'Eyes/Nuclear.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT51, 'Eyes/Pinch left.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT52, 'Eyes/Pinch middle.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT53, 'Eyes/Pinch right.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT54, 'Eyes/Tear.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT55, 'Eyes/Tired left.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT56, 'Eyes/Tired middle.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT57, 'Eyes/Tired right.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT58, 'Eyes/Toxic.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT59, 'Eyes/Up.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT60, 'Eyes/Winking.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT61, 'Information/Accept.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT62, 'Information/Backward.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT63, 'Information/Decline.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT64, 'Information/Forward.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT65, 'Information/Left.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT66, 'Information/No go.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT67, 'Information/Question mark.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT68, 'Information/Right.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT69, 'Information/Stop 1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT70, 'Information/Stop 2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT71, 'Information/Thumbs down.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT72, 'Information/Thumbs up.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT73, 'Information/Warning.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT74, 'Objects/Bomb.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT75, 'Objects/Boom.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT76, 'Objects/Fire.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT77, 'Objects/Flowers.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT78, 'Objects/Forest.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT79, 'Objects/Light off.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT80, 'Objects/Light on.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT81, 'Objects/Lightning.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT82, 'Objects/Night.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT83, 'Objects/Pirate.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT84, 'Objects/Snow.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT85, 'Objects/Target.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT86, 'Progress/Bar 0.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT87, 'Progress/Bar 1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT88, 'Progress/Bar 2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT89, 'Progress/Bar 3.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT90, 'Progress/Bar 4.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT91, 'Progress/Dial 0.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT92, 'Progress/Dial 1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT93, 'Progress/Dial 2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT94, 'Progress/Dial 3.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT95, 'Progress/Dial 4.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT96, 'Progress/Dots 0.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT97, 'Progress/Dots 1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT98, 'Progress/Dots 2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT99, 'Progress/Dots 3.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT100, 'Progress/Hourglass 0.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT101, 'Progress/Hourglass 1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT102, 'Progress/Hourglass 2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT103, 'Progress/Timer 0.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT104, 'Progress/Timer 1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT105, 'Progress/Timer 2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT106, 'Progress/Timer 3.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT107, 'Progress/Timer 4.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT108, 'Progress/Water level 0.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT109, 'Progress/Water level 1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT110, 'Progress/Water level 2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT111, 'Progress/Water level 3.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT112, 'System/Accept_1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT113, 'System/Accept_2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT114, 'System/Alert.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT115, 'System/Box.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT116, 'System/Busy_0.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT117, 'System/Busy_1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT118, 'System/Decline_1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT119, 'System/Decline_2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT120, 'System/Dot_empty.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT121, 'System/Dot_full.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT122, 'System/Play.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT123, 'System/Slider_0.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT124, 'System/Slider_1.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT125, 'System/Slider_2.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT126, 'System/Slider_3.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT127, 'System/Slider_4.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT128, 'System/Slider_5.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT129, 'System/Slider_6.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT130, 'System/Slider_7.pbm'],
            [Blockly.Msg.MPYTHON_LOOKS_EXPRESSION_OPT131, 'System/Slider_8.pbm']
          ]
        },
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_mpython_draw_display'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_LOOKS_DRAW_DISPLAY,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "DISPLAY"
        },
        {
          "type": "field_dropdown",
          "name": "TUBE",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT1, 'digiface_11'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT2, 'digiface_16'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT3, 'digiface_21'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT4, 'digiface_30'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT5, 'digiface_44'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT6, 'digiface_it_30'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT7, 'digiface_it_42'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT8, 'dvsm_12'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT9, 'dvsm_16'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT10, 'dvsm_21'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT11, 'dvsmb_12'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT12, 'dvsmb_16'],
            [Blockly.Msg.MPYTHON_LOOKS_TUBE_OPT13, 'dvsmb_21']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "ACTION",
          "options": [
            [Blockly.Msg.MPYTHON_LOOKS_FONT_OPT1, 'False'],
            [Blockly.Msg.MPYTHON_LOOKS_FONT_OPT2, 'True']
          ]
        }
      ],
      "extensions": ["colours_mpython_looks", "shape_statement"]
    });
  }
};

