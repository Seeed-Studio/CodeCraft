'use strict';

goog.provide('Blockly.Blocks.haloboad.light');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_haloboad_light_blink'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_BLINK,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_color_bar",
          "name": "COLOR_V",
          "default": "{\"id\":0, \"brightness\":2, \"color\":\"#F50000\"}"
        },
        {
          "type": "field_dropdown",
          "name": "SPEED",
          "options": [
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT0, 'slow'],
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT1, 'normal'],
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT2, 'fast']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_shootstart'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_SHOOTSTART,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_color_bar",
          "name": "COLOR_V",
          "default": "{\"id\":0, \"brightness\":2, \"color\":\"#F50000\"}"
        },
        {
          "type": "field_dropdown",
          "name": "MODE",
          "options": [
            [Blockly.Msg.HALOBOAD_LIGHT_MODE_OPT0, 'west'],
            [Blockly.Msg.HALOBOAD_LIGHT_MODE_OPT1, 'east']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_pattern_flip_lr'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_PATTERN_FLIP_LR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_superenergy_ring",
          "name": "RING_VALUE",
          "default": "[{\"id\":0,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":1,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":2,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":3,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":4,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":5,\"brightness\":2,\"color\":\"#FFFFFF\",\"colorId\":12},{\"id\":6,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":7,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":8,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":9,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":10,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":11,\"brightness\":2,\"color\":\"#FFFFFF\",\"colorId\":12}]"
        },
        {
          "type": "field_dropdown",
          "name": "SPEED",
          "options": [
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT0, 'slow'],
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT1, 'normal'],
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT2, 'fast']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_pattern_flip_ud'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_PATTERN_FLIP_UD,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_superenergy_ring",
          "name": "RING_VALUE",
          "default": "[{\"id\":0,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":1,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":2,\"brightness\":2,\"color\":\"#FFFFFF\",\"colorId\":12},{\"id\":3,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":4,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":5,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":6,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":7,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":8,\"brightness\":2,\"color\":\"#FFFFFF\",\"colorId\":12},{\"id\":9,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":10,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0},{\"id\":11,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0}]"
        },
        {
          "type": "field_dropdown",
          "name": "SPEED",
          "options": [
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT0, 'slow'],
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT1, 'normal'],
            [Blockly.Msg.HALOBOAD_LIGHT_SPEED_OPT2, 'fast']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_pattern_ringset'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_PATTERN_RINGSET,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_superenergy_ring",
          "name": "RING_VALUE",
          "default": "[{\"id\":0,\"brightness\":2,\"color\":\"#FBA700\",\"colorId\":1},{\"id\":1,\"brightness\":2,\"color\":\"#FFF000\",\"colorId\":2},{\"id\":2,\"brightness\":2,\"color\":\"#C2FF00\",\"colorId\":3},{\"id\":3,\"brightness\":2,\"color\":\"#3DFF00\",\"colorId\":4},{\"id\":4,\"brightness\":2,\"color\":\"#7BFFA9\",\"colorId\":5},{\"id\":5,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":6,\"brightness\":2,\"color\":\"#0051FF\",\"colorId\":7},{\"id\":7,\"brightness\":2,\"color\":\"#0000FF\",\"colorId\":8},{\"id\":8,\"brightness\":2,\"color\":\"#6E00FF\",\"colorId\":9},{\"id\":9,\"brightness\":2,\"color\":\"#F400CF\",\"colorId\":10},{\"id\":10,\"brightness\":2,\"color\":\"#F50087\",\"colorId\":11},{\"id\":11,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0}]"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_pattern_ringset_forduration'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_PATTERN_RINGSET_FORDURATION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_superenergy_ring",
          "name": "RING_VALUE",
          "default": "[{\"id\":0,\"brightness\":2,\"color\":\"#FBA700\",\"colorId\":1},{\"id\":1,\"brightness\":2,\"color\":\"#FFF000\",\"colorId\":2},{\"id\":2,\"brightness\":2,\"color\":\"#C2FF00\",\"colorId\":3},{\"id\":3,\"brightness\":2,\"color\":\"#3DFF00\",\"colorId\":4},{\"id\":4,\"brightness\":2,\"color\":\"#7BFFA9\",\"colorId\":5},{\"id\":5,\"brightness\":2,\"color\":\"#38FFFF\",\"colorId\":6},{\"id\":6,\"brightness\":2,\"color\":\"#0051FF\",\"colorId\":7},{\"id\":7,\"brightness\":2,\"color\":\"#0000FF\",\"colorId\":8},{\"id\":8,\"brightness\":2,\"color\":\"#6E00FF\",\"colorId\":9},{\"id\":9,\"brightness\":2,\"color\":\"#F400CF\",\"colorId\":10},{\"id\":10,\"brightness\":2,\"color\":\"#F50087\",\"colorId\":11},{\"id\":11,\"brightness\":2,\"color\":\"#F50000\",\"colorId\":0}]"
        },
        {
          "type": "input_value",
          "name": "SECS",
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_closed_all'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_PATTERN_CLOSED_ALL,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_rgbled_set'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_REBLED_SET,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NO",
        },
        {
          "type": "field_color_bar",
          "name": "COLOR_V",
          "default": "{\"id\":0, \"brightness\":2, \"color\":\"#F50000\"}"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_rgbled_closed'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_REBLED_CLOSED,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NO",
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_show'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_SHOW,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_color_bar",
          "name": "COLOR_V",
          "default": "{\"id\":0, \"brightness\":2, \"color\":\"#F50000\"}"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_show_forduration'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.HALOBOAD_LIGHT_SHOW_FORDURATION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_color_bar",
          "name": "COLOR_V",
          "default": "{\"id\":0, \"brightness\":2, \"color\":\"#F50000\"}"
        },
        {
          "type": "input_value",
          "name": "SECS",
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_haloboad_light_set_test'] = {
  init: function () {
    this.jsonInit({
      "message0": "%1 %2 测试灯环 %3 R %4 G %5 B %6",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/haloboad/icon_cnh.svg",
          "width": 30,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NO",
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
          "name": "B",
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_powering_light", "shape_statement"]
    });
  }
};