'use strict';

goog.provide('Blockly.Blocks.maixduino.sensing');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sensing_maixduino_home_animal_detection_string'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SENSING_HOME_ANIMAL_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_home_animal_detection_boolean'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SENSING_HOME_ANIMAL_SEL_DETECTION,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "ANIMAL",
        "options": [
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT1, 'cat'],
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT2, 'dog'],
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT3, 'bird'],
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT4, 'hedgehog'],
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT5, 'mouse'],
        ]
      },
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_boolean"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_zoo_animal_detection_string'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SENSING_ZOO_ANIMAL_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_zoo_animal_detection_boolean'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SENSING_ZOO_ANIMAL_SEL_DETECTION,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "ANIMAL",
        "options": [
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT10, 'tiger'],
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT8, 'elephant'],
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT6, 'alligator'],
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT7, 'bear'],
          [Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT9, 'giraffe'],
        ]
      },
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_boolean"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_ordinary_object_detection_string'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SENSING_ORDINARY_OBJECT_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_ordinary_object_detection_boolean'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SENSING_ORDINARY_OBJECT_SEL_DETECTION,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "OBJECTS",
        "options": [
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT9, 'person'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT1, 'chair'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT2, 'book'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT3, 'cup_mug'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT4, 'pen'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT8, 'computer'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT6, 'smartphone'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT10, 'backpack'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT5, 'pizza'],
          [Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT7, 'bomb'],
        ]
      },
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_boolean"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_num_detection_number'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SENSING_NUM_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_num_detection_boolean'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_NUM_SEL_DETECTION,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "NUM_CARD",
        "options": [
          ['0', '0'],
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9']
        ]
      },
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_boolean"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_num_detection_property'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_NUM_CERTRE_DETECTION,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "NUM_CARD",
        "options": [
          ['0', '0'],
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9']
        ]
      },
      {
        "type": "field_dropdown",
        "name": "COORD",
        "options": [
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_X, '1'],
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_Y, '2'],
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_A, '3']
        ]
      },
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_traffic_signs_detection_string'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SENSING_TRAFFIC_SIGNS_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_traffic_signs_detection_boolean'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_SEL_DETECTION,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "TRAFFIC",
        "options": [
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT0, 'left'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT1, 'right'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT2, 'forward'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT3, 'u_turn'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT4, 'stop'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT5, 'limit_5'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT6, 'limit_80'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT7, 'no_forward'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT8, 'yield'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT9, 'zebra']
        ]
      },
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_boolean"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_traffic_signs_detection_property'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_CERTRE_DETECTION,
      "args0": [
      {
        "type": "field_dropdown",
        "name": "TRAFFIC",
        "options": [
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT0, 'left'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT1, 'right'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT2, 'forward'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT3, 'u_turn'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT4, 'stop'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT5, 'limit_5'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT6, 'limit_80'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT7, 'no_forward'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT8, 'yield'],
          [Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT9, 'zebra']
        ]
      },
      {
        "type": "field_dropdown",
        "name": "COORD",
        "options": [
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_X, '1'],
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_Y, '2'],
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_A, '3']
        ]
      },
      {
        "type": "input_value",
        "name": "NUMBER"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_maixduino_face_detection_register_face'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_FACE_DETECTION_REGISTER_FACE_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "NAME"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_maixduino_face_detection_is_id'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_FACE_DETECTION_IS_ID_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "ID"
      }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_maixduino_face_detection_get_recognition_property'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_FACE_DETECTION_GET_RECOGNITION_PROPRRTY_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "ID"
      },
      {
        "type": "input_value",
        "name": "NUMBER"
      },
      {
        "type": "field_dropdown",
        "name": "COORD",
        "options": [
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_X, '1'],
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_Y, '2'],
          [Blockly.Msg.MAIXDUINO_SENSING_COORD_A, '3']
        ]
      }
      
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};
Blockly.Blocks['sensing_maixduino_face_detection_get_recognition_results'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_FACE_DETECTION_GET_RECOGNITION_RESULTS_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_maixduino_face_detection_clear_db'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_FACE_DETECTION_CLESR_DB_DETECTION,
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_maixduino_face_detection_get_detection_status'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_FACE_DETECTION_GET_RECOGNITION_STATUS_DETECTION,
      "args0": [
      {
        "type": "input_value",
        "name": "NUMBER"
      },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_maixduino_face_detection_get_detection_property'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_FACE_DETECTION_GET_RECOGNITION_PROPERTY_DETECTION,
      "args0": [
        {
          "type": "input_value",
          "name": "NUMBER"
        },
        {
          "type": "field_dropdown",
          "name": "XY",
          "options": [
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_X, '1'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_Y, '2'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_A, '3']
          ]
        },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
}

Blockly.Blocks['sensing_maixduino_face_detection_get_object_property'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_FACE_DETECTION_GET_OBJECT_PROPERTY_DETECTION,
      "args0": [
        {
          "type": "input_value",
          "name": "NUMBER"
        },
        {
          "type": "field_dropdown",
          "name": "ARGS",
          "options": [
            [Blockly.Msg.MAIXDUINO_FACE_VALUE_LEFT_EYE, '0'],
            [Blockly.Msg.MAIXDUINO_FACE_VALUE_RIGHT_EYE, '1'],
            [Blockly.Msg.MAIXDUINO_FACE_VALUE_NOSE, '2'],
            [Blockly.Msg.MAIXDUINO_FACE_VALUE_MOUTH_LEFT_CORNER, '3'],
            [Blockly.Msg.MAIXDUINO_FACE_VALUE_MOUTH_RIGHT_CORNER, '4']

          ]
        },
        {
          "type": "field_dropdown",
          "name": "XY",
          "options": [
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_X, '0'],
            [Blockly.Msg.MAIXDUINO_CAMERA_COORDP_Y, '1'],
          ]
        },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_maixdunio_sensing", "output_number"]
    });
  }
}