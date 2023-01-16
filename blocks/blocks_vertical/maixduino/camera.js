'use strict';

goog.provide('Blockly.Blocks.maixduino.camera');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sensing_maixduino_print'] = {
  init: function () {
    this.jsonInit({
      "message0": 'print %1',
      "args0": [{
        "type": "input_value",
        "name": "VALUE",
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "shape_statement"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_set_threshold'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_SET_THRESHOLD,
      "args0": [
      {
        "type": "input_value",
        "name": "THRESHOLD",
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "shape_statement"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_is_ball'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_BALL,
      "args0": [
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_boolean"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_is_ball_atsizecolor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_BALL_AT_SIZE_COLOR,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "COLOR",
        "options": [
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT1, '5'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT2, '6'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT3, '7'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT4, '8'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT5, '9'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT6, '10'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT7, '11'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT8, '12'],
        ]
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_boolean"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_circle_detected_rgb'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_BALL_RGB,
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_circle_detected_xyr'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_BALL_COORD,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "XY",
        "options": [
          [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_X, '1'],
          [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_Y, '2'],
          [Blockly.Msg.MAIXDUINO_CAMERA_R_VALUE, '3'],
          [Blockly.Msg.MAIXDUINO_CAMERA_A_VALUE, '4']
        ]
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_circle_detected_obj'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_BALL_VALUE,
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_is_rectangle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_RECTANGLE,
      "args0": [
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_boolean"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_is_rectangle_atsizecolor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_RECTANGLE_AT_SIZE_COLOR,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "COLOR",
        "options": [
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT1, '5'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT2, '6'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT3, '7'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT4, '8'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT5, '9'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT6, '10'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT7, '11'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT8, '12'],
        ]
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_boolean"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_rectangle_detected_rgb'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_RECTANGLE_RGB,
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_rectangle_detected_xywh'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_RECTANGLE_COORD,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "XY",
        "options": [
          [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_X, '1'],
          [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_Y, '2'],
          [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_W, '3'],
          [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_H, '4'],
          [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_A, '5']
        ]
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}


Blockly.Blocks['sensing_maixduino_camera_rectangle_detected_obj'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_RECTANGLE_VALUE,
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_colorline_setcolor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_COLORLINE_SETCOLOR,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "COlOR",
        "options": [
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT7, '1'],
          [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT8, '2']
        ]
      },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "shape_statement"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_colorline_setweight'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_COLORLINE_SETWEIGHT,
      "args0": [
      {
        "type": "input_value",
        "name": "A",
      },
      {
        "type": "input_value",
        "name": "B",
      },
      {
        "type": "input_value",
        "name": "C",
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "shape_statement"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_colorline_turnangle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_COLORLINE_TURNANGLE,
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

// Blockly.Blocks['sensing_maixduino_camera_get_ball_color'] = {
//   init: function () {
//     this.jsonInit({
//       "message0": Blockly.Msg.MAIXDUINO_CAMERA_GET_BALL_AVERAGE_COLOR,
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
//         "name": "X",
//       },
//       {
//         "type": "input_value",
//         "name": "Y",
//       },
//       {
//         "type": "input_value",
//         "name": "R",
//       }
//       ],
//       "category": Blockly.Categories.sensing,
//       "extensions": ["colours_maixdunio_camera", "output_number"]
//     });
//   }
// }

// Blockly.Blocks['sensing_maixduino_camera_get_rectangle_color'] = {
//   init: function () {
//     this.jsonInit({
//       "message0": Blockly.Msg.MAIXDUINO_CAMERA_GET_RECTANGLE_AVERAGE_COLOR,
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
//         "name": "XMIN",
//       },
//       {
//         "type": "input_value",
//         "name": "XMAX",
//       },
//       {
//         "type": "input_value",
//         "name": "YMIN",
//       },
//       {
//         "type": "input_value",
//         "name": "YMAX",
//       }
//       ],
//       "category": Blockly.Categories.sensing,
//       "extensions": ["colours_maixdunio_camera", "output_number"]
//     });
//   }
// }

// Blockly.Blocks['sensing_maixduino_camera_get_aera_color'] = {
//   init: function () {
//     this.jsonInit({
//       "message0": Blockly.Msg.MAIXDUINO_CAMERA_INTEREST_AREA_COLOR,
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
//         "name": "INTERESTOBJECT",
//       },
//       {
//         "type": "field_dropdown",
//         "name": "COLOR",
//         "options": [
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT1, '5'],
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT2, '6'],
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT3, '7'],
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT4, '8'],
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT5, '9'],
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT6, '10'],
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT7, '11'],
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT8, '12'],
//         ]
//       }
//       ],
//       "category": Blockly.Categories.sensing,
//       "extensions": ["colours_maixdunio_camera", "output_boolean"]
//     });
//   }
// }
// Blockly.Blocks['sensing_maixduino_camera_get_average_color'] = {
//   init: function () {
//     this.jsonInit({
//       "message0": Blockly.Msg.MAIXDUINO_CAMERA_INTEREST_AREA_AVERAGE_COLOR,
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
//         "name": "INTERESTOBJECT",
//       },
//       ],
//       "category": Blockly.Categories.sensing,
//       "extensions": ["colours_maixdunio_camera", "output_number"]
//     });
//   }
// }

// Blockly.Blocks['sensing_maixduino_linepatrol_angle'] = {
//   init: function () {
//     this.jsonInit({
//       "message0": Blockly.Msg.MAIXDUINO_LINEPAROL_ANGLE,
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
//         "type": "field_dropdown",
//         "name": "COLOR",
//         "options": [
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT7, '1'],
//           [Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT8, '2'],
//         ]
//       },
//       {
//         "type": "input_value",
//         "name": "R",
//       },
//       {
//         "type": "input_value",
//         "name": 'B',
//       },
//       {
//         "type": "input_value",
//         "name": "G",
//       }
//       ],
//       "category": Blockly.Categories.sensing,
//       "extensions": ["colours_maixdunio_camera", "output_number"]
//     });
//   }
// }

Blockly.Blocks['sensing_maixduino_camera_detectedface'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_FACE,
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_boolean"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_detectedface_position'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_FACE_POSITION,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "XY",
          "options": [
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_X, '1'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_Y, '2'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_W, '3'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_H, '4'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_A, '5']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_detected_apriltag'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_APRILTAG,
      "args0": [
       {
         "type": "input_value",
         "name": "Tag_ID",
       },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_boolean"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_detected_apriltag_position'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_APRILTAG_POSITION,
      "args0": [
        {
          "type": "input_value",
          "name": "Tag_ID",
        },
        {
          "type": "field_dropdown",
          "name": "XY",
          "options": [
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_X, '1'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_Y, '2'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_W, '3'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_H, '4'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_A, '5']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_init_trackingtarget'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_INIT_TRACKINGTARGET,
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "shape_statement"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_camera_target_position'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_CAMERA_POSTION_TARGET,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "XY",
          "options": [
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_X, '1'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_Y, '2'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_W, '3'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_H, '4'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_A, '5']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_camera", "output_number"]
    });
  }
}

