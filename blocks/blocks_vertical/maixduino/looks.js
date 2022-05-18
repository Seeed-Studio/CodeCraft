'use strict';

goog.provide('Blockly.Blocks.maixduino.looks');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['looks_maixduino_camera_set_screen'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_DISPLAY_ORIENTATION,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "SCREEN_DIRECTION",
        "options": [
          [Blockly.Msg.MAIXDUINO_DISPLAY_ORIENTATION_NORMAL, '2'],
          [Blockly.Msg.MAIXDUINO_DISPLAY_ORIENTATION_ROTATE, '0']
        ]
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_looks", "shape_statement"]
    });
  }
}

Blockly.Blocks['looks_maixduino_dispalystr_atrow'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_DISPLAY_STRING,
      "args0": [
      {
        "type": "input_value",
        "name": "STRING"
      },
      {
        "type": "field_dropdown",
        "name": "ROW",
        "options": [
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['10', '10'],
          ['11', '11'],
          ['12', '12'],
          ['13', '13'],
          ['14', '14'],
          ['15', '15'],
          ['16', '16'],
          ['17', '17'],
          ['18', '18'],
          ['19', '19'],
          ['20', '20'],
          ['21', '21'],
          ['22', '22'],
          ['23', '23'],
          ['24', '24'],
          ['25', '25'],
          ['26', '26'],
          ['27', '27'],
          ['28', '28'],
          ['29', '29'],
          ['30', '30'],
          ['31', '31'],
        ]
      }],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_maixdunio_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_maixduino_dispalystr_atposition'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_DISPLAY_STRING_AT_POSITION,
      "args0": [
      {
        "type": "input_value",
        "name": "STRING"
      },
      {
        "type": "input_value",
        "name": "X"
      },
      {
        "type": "input_value",
        "name": "Y"
      }],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_maixdunio_looks", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_maixduino_display_img'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_DISPLAY_IMG,
      "args0": [
      {
        "type": "input_value",
        "name": "IMG_PATH"
      }],
      "category": Blockly.Categories.looks,
      "extensions": ["colours_maixdunio_looks", "shape_statement"]
    });
  }
};


Blockly.Blocks['looks_maixduino_draw_circle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_DISPLAY_SET_CIRCLE,
      "args0": [
      {
        "type": "input_value",
        "name": "XCOORD",
      },
      {
        "type": "input_value",
        "name": "YCOORD",
      },
      {
        "type": "input_value",
        "name": "RVALUE",
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_looks", "shape_statement"]
    });
  }
}

// Blockly.Blocks['looks_maixduino_draw_circle'] = {
//   init: function () {
//     this.jsonInit({
//       "message0": Blockly.Msg.MAIXDUINO_DISPLAY_DRAW_CIRCLE,
//       "args0": [{
//         "type": "field_image",
//         "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/maixduino/icon_Maixduino.svg",
//         "width": 40,
//         "height": 30
//       },
//       {
//         "type": "field_vertical_separator"
//       },
//       {
//         "type": "input_value",
//         "name": "VALUE",
//       }],
//       "category": Blockly.Categories.sensing,
//       "extensions": ["colours_maixdunio_looks", "shape_statement"]
//     });
//   }
// }

Blockly.Blocks['looks_maixduino_draw_rectangle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_DISPLAY_SET_RECTANGLE,
      "args0": [
      {
        "type": "input_value",
        "name": "XMIN",
      },
      {
        "type": "input_value",
        "name": "YMIN",
      },
      {
        "type": "input_value",
        "name": "XMAX",
      },
      {
        "type": "input_value",
        "name": "YMAX",
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_looks", "shape_statement"]
    });
  }
}

Blockly.Blocks['looks_maixduino_draw_rectangle_wh'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_DISPLAY_DRAW_RECTANGLE_WH,
      "args0": [
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
        "name": "X",
      },
      {
        "type": "input_value",
        "name": "Y",
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_looks", "shape_statement"]
    });
  }
}