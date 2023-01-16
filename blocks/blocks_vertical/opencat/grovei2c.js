'use strict';

goog.provide('Blockly.Blocks.opencat.grovei2c');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_opencat_seeed_read_gesture'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_READ_GESTURE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/gesture.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_opencat_seeed_gesture'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_GESTURE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/gesture.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "OPT",
          "options": [
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT0, 'GES_UP_FLAG'],
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT1, 'GES_DOWN_FLAG'],
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT2, 'GES_LEFT_FLAG'],
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT3, 'GES_RIGHT_FLAG'],
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT4, 'GES_FORWARD_FLAG'],
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT5, 'GES_BACKWARD_FLAG'],
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT6, 'GES_CLOCKWISE_FLAG'],
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT7, 'GES_COUNT_CLOCKWISE_FLAG'],
            [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT8, 'GES_WAVE_FLAG']
          ]
        }

      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_opencat_grove_serial_rgb_led_matrix_on_point'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led_matrix.svg",
          "width": 48,
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
          "type": "field_dropdown",
          "name": "COLOR",
          "options": [
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT0, 'red'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT1, 'orange'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT2, 'yellow'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT3, 'green'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT4, 'cyan'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT5, 'blue'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT6, 'purple'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT7, 'pink'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT8, 'white'],
            [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT9, 'black']
          ]
        }

      ],
      "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
    });
  }
};



Blockly.Blocks['motion_opencat_grove_serial_rgb_led_matrix_show_text'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_TEXT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led_matrix.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
    });
  }
}


Blockly.Blocks['motion_opencat_grove_serial_rgb_led_matrix_show_emoji'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_EMOJS,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led_matrix.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_rgbmatrix",
          "name": "SHAPE",
          "default": ""
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
    });
  }
}


Blockly.Blocks['motion_opencat_color_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_COLOR_READ_SENSOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/color_sensor.svg",
          "width": 65,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_opencat_color_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_COLOR_SENSOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/color_sensor.svg",
          "width": 65,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "COLOR",
          "options": [
            [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT1, 'red'],
            [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT2, 'green'],
            [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT3, 'blue'],
            [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT4, 'black'],
            [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT5, 'white'],
            [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT6, 'other']
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

//图像交通标示卡片手势检测
Blockly.Blocks['motion_opencat_traffic_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_READ_TRAFFIC_SENSOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

//图像数字卡片手势检测
Blockly.Blocks['motion_opencat_number_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_READ_NUMBER_SENSOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

//图像图形卡片手势检测
Blockly.Blocks['motion_opencat_symbol_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_READ_SYMBOL_SENSOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

//图像运动手势开启
Blockly.Blocks['motion_opencat_gesture_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_READ_GESTURE_SENSOR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },

      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_opencat_vision_sensor1'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_SENSOR1,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "OPT",
          "options": [
            [Blockly.Msg.ARDUINO_VISION_SENSOR1_OPT1, 'BALL_TYPE_PING_PONG'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR1_OPT2, 'BALL_TYPE_TENNIS'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_opencat_vision_sensor1_ext'] = {
  init: function () {
    this.jsonInit({
        "message0": Blockly.Msg.ARDUINO_VISION_SENSOR1_EXT,
        "args0": [
            {
                "type": "field_image",
                "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                "width": 48,
                "height": 30
            },
            {
                "type": "field_vertical_separator"
            },
            {
                "type": "field_dropdown",
                "name": "XY",
                "options": [
                    [Blockly.Msg.ARDUINO_VISION_SENSOR1_EXT_OPT1, '1'],
                    [Blockly.Msg.ARDUINO_VISION_SENSOR1_EXT_OPT2, '2'],
                ]
            }
        ],
        "extensions": ["colours_arduino_grove_i2c", "output_number"]
    });
}
};

Blockly.Blocks['motion_opencat_vision_sensor2'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_SENSOR2,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "OPT",
          "options": [
            [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT1, 'CARD_TRAFFIC_FORWARD'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT2, 'CARD_TRAFFIC_LEFT'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT3, 'CARD_TRAFFIC_RIGHT'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT4, 'CARD_TRAFFIC_TRUN_AROUND'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT5, 'CARD_TRAFFIC_PARK']
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_opencat_vision_sensor3'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_SENSOR3,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "OPT",
          "options": [
            ['0', 'CARD_NUMBER_0'],
            ['1', 'CARD_NUMBER_1'],
            ['2', 'CARD_NUMBER_2'],
            ['3', 'CARD_NUMBER_3'],
            ['4', 'CARD_NUMBER_4'],
            ['5', 'CARD_NUMBER_5'],
            ['6', 'CARD_NUMBER_6'],
            ['7', 'CARD_NUMBER_7'],
            ['8', 'CARD_NUMBER_8'],
            ['9', 'CARD_NUMBER_9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};


Blockly.Blocks['motion_opencat_vision_sensor4'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_SENSOR4,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "OPT",
          "options": [
            [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT1, 'CARD_SHAPE_TICK'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT2, 'CARD_SHAPE_CROSS'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT3, 'CARD_SHAPE_CIRCLE'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT4, 'CARD_SHAPE_SQUARE'],
            [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT5, 'CARD_SHAPE_TRIANGLE'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};


Blockly.Blocks['motion_opencat_vision_sensor5'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_SENSOR5,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

//运动手势
Blockly.Blocks['motion_opencat_vision_sensor10'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_VISION_SENSOR10,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "OPT",
                  "options": [
                      [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT1, 'CARD_UPWARD'],
                      [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT2, 'CARD_DOWNWARD'],
                      [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT3, 'CARD_LEFTWARD'],
                      [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT4, 'CARD_RIGHTWARD'],
                      [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT5, 'CARD_PUSH_DOWN'],
                      [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT6, 'CARD_LIFT_UP']
                  ]
              }
          ],
          "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
      });
  }
};
Blockly.Blocks['motion_opencat_vision_sensor11'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_VISION_SENSOR11,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              }
          ],
          "extensions": ["colours_arduino_grove_i2c", "output_number"]
      });
  }
};

Blockly.Blocks['motion_opencat_vision_sensor12'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_VISION_SENSOR12,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              }
          ],
          "extensions": ["colours_arduino_grove_i2c", "output_number"]
      });
  }
};

Blockly.Blocks['motion_opencat_oled11'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_OLED11,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_oled0.96.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_oled_096matrix",
                  "name": "SHAPE"
              }
          ],
          "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
      });
  }
};

Blockly.Blocks['motion_opencat_oled22'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_OLED22,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_oled0.96.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "input_value",
                  "name": "TEXT",
              },
              {
                  "type": "input_value",
                  "name": "ROW",
              },
              {
                  "type": "input_value",
                  "name": "COL",
              }
          ],
          "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
      });
  }
};

Blockly.Blocks['motion_opencat_oled33'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_OLED33,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_oled0.96.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              }
          ],
          "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
      });
  }
};