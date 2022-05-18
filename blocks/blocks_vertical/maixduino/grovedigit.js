'use strict';

goog.provide('Blockly.Blocks.maixduino.grovedigit');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_maixduino_seeed_btn'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_GROVE_BUTTON_ISPRESSED,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/btn.svg",
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
            ['D2', '2'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8'],
            ['D9', '9'],
            ['D10', '10'],
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_maixduino_seeed_line_finder'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_SEEED_LINE_FINDER,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/line_finder.svg",
          "width": 48,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['D2', '2'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8'],
            ['D9', '9'],
            ['D10', '10'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "COLOR",
          "options": [
            [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT4, '1'],
            [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT5, '0'],
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_maixduino_seeed_ult'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_GROVE_ULT_DISTANCE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/ult.svg",
          "width": 65,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['D2', '2'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8'],
            ['D9', '9'],
            ['D10', '10'],
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "output_number"]
    });
  }
};


{/* <block type="motion_arduino_seeed_rgb_led">    
</block>
<block type="motion_arduino_seeed_rgb_led1">    
</block>
<block type="motion_arduino_seeed_speaker"/>         */}

Blockly.Blocks['motion_maixduino_seeed_rgb_led'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_RGB_LED10,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led.svg",
          "width": 65,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['D2', '2'],
            ['D3', '3'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8']
          ]
        },
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_maixduino_seeed_rgb_led1'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_RGB_LED11,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led.svg",
          "width": 65,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['D2', '2'],
            ['D3', '3'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8']
          ]
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
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_maixduino_seeed_speaker'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_SPEAKER,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/speaker.svg",
          "width": 70,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['D3', '3'],
            ['D2', '2'],
            ['D4', '4'],
            ['D5', '5'],
            ['D7', '7'],
            ['D8', '8']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "NOTE",
          "options": [
            ['C3', '37'], ['D3', '38'], ['E3', '39'], ['F3', '40'], ['G3', '41'], ['A3', '42'], ['B3', '43'],
            ['C4', '44'], ['D4', '45'], ['E4', '46'], ['F4', '47'], ['G4', '48'], ['A4', '49'], ['B4', '50'],
            ['C5', '51'], ['D5', '52'], ['E5', '53'], ['F5', '54'], ['G5', '55'], ['A5', '56'], ['B5', '57'],
            ['结束声音', '0']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "BEAT",
          "options": [
            ['1', '1'],
            ['1/2', '1/2'],
            ['1/4', '1/4'],
            ['1/8', '1/8'],
            ['1/16', '1/16'],
            ['2', '2'],
            ['4', '4'],
            ['8', '8']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_maixduino_led_strip1'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_GROVE_RGBLED_STRIP_DISPALY,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
          "width": 70,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['D2', '2'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8'],
            ['D9', '9'],
            ['D10', '10'],
          ]
        },
        {
          "type": "input_value",
          "name": "NO"
        },
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_maixduino_led_strip2'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_GROVE_RGBLED_STRIP_DISPALY1,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
          "width": 70,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['D2', '2'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8'],
            ['D9', '9'],
            ['D10', '10'],
          ]
        },
        {
          "type": "input_value",
          "name": "NO"
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
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "shape_statement"]
    });
  }
};


Blockly.Blocks['motion_maixduino_led_strip_off'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MAIXDUINO_GROVE_RGBLED_STRIP_CLOSED,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
          "width": 70,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            ['D2', '2'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8'],
            ['D9', '9'],
            ['D10', '10'],
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_maixdunio_grovedigit", "shape_statement"]
    });
  }
};

// Blockly.Blocks['motion_maixduino_led_strip2'] = {
//   init: function () {
//     this.jsonInit({
//       "message0": Blockly.Msg.ARDUINO_LED_STRIP2,
//       "args0": [
//         {
//           "type": "field_image",
//           "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
//           "width": 70,
//           "height": 30
//         },
//         {
//           "type": "field_vertical_separator"
//         },
//         {
//           "type": "field_dropdown",
//           "name": "PIN",
//           "options": [
//             ['D2', '2'],
//             ['D3', '3'],
//             ['D4', '4'],
//             ['D5', '5'],
//             ['D6', '6'],
//             ['D7', '7'],
//             ['D8', '8'],

//             ['D9', '9'],
//             ['D10', '10'],
//             ['D12', '12'],
//             ['D13', '13']
//           ]
//         },
//         {
//           "type": "input_value",
//           "name": "R"
//         },
//         {
//           "type": "input_value",
//           "name": "G"
//         },
//         {
//           "type": "input_value",
//           "name": "B"
//         }
//       ],
//       "category": Blockly.Categories.motion,
//       "extensions": ["colours_maixdunio_grovedigit", "shape_statement"]
//     });
//   }
// };


Blockly.Blocks['motion_maixduino_grove_serial_rgb_led_matrix_on_point'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT,
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
          "extensions": ["colours_maixdunio_grovedigit", "shape_statement"]
      });
  }
};



Blockly.Blocks['motion_maixduino_grove_serial_rgb_led_matrix_show_text'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_TEXT,
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
          "extensions": ["colours_maixdunio_grovedigit", "shape_statement"],
      });
  }
}

Blockly.Blocks['motion_maixduino_grove_serial_rgb_led_matrix_show_emoji'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_EMOJS,
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
          "extensions": ["colours_maixdunio_grovedigit", "shape_statement"],
      });
  }
}

Blockly.Blocks['motion_maixdunio_seeed_4digit_display'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_SEEED_4DIGIT_DISPLAY,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/4digit_display.svg",
                  "width": 65,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "PIN",
                  "options": [
                      ['D4&D2', '2'],
                      ['D6&D5', '5'],
                      ['D8&D7', '7'],
                      ['D10&D9', '9'],
                  ]
              },
              {
                  "type": "input_value",
                  "name": "NUM"
              }
          ],
          "extensions": ["colours_maixdunio_grovedigit", "shape_statement"],
      });
  }
}

Blockly.Blocks['motion_maixdunio_grove_series_lanterns_show'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SERIES_LANTERNS_SHOW,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
                  "width": 65,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "PIN",
                  "options": [
                      ['D4&D2', '2'],
                      ['D6&D5', '5'],
                      ['D8&D7', '7'],
                      ['D10&D9', '9'],
                  ]
              },
              {
                "type": "input_value",
                "name": "NO"
              },
              {
                "type": "input_value",
                "name": "COLOR"
              }
          ],
          "extensions": ["colours_maixdunio_grovedigit", "shape_statement"],
      });
  }
}

Blockly.Blocks['motion_maixdunio_grove_led_lightbar_show'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_LED_LIGHTBAR_SHOW,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
                  "width": 65,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "PIN",
                  "options": [
                      ['D4&D2', '2'],
                      ['D6&D5', '5'],
                      ['D8&D7', '7'],
                      ['D10&D9', '9'],
                  ]
              },
              {
                "type": "field_dropdown",
                "name": "ACTION",
                "options": [
                    [Blockly.Msg.MAIXDUINO_GROVE_LED_LIGHTBAR_OPT0, '1'],
                    [Blockly.Msg.MAIXDUINO_GROVE_LED_LIGHTBAR_OPT1, '2'],
                ]
              },
              {
                "type": "input_value",
                "name": "NO"
              },
          ],
          "extensions": ["colours_maixdunio_grovedigit", "shape_statement"],
      });
  }
}

Blockly.Blocks['motion_maixdunio_grove_serial_3ada16'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SERIAL_3ADA,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/serial_3ada.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "XYZ",
                  "options": [
                      ['X', '0'],
                      ['Y', '1'],
                      ['Z', '2']
                  ]
              }
          ],
          "extensions": ["colours_maixdunio_grovedigit", "output_number"],
      });
  }
}

Blockly.Blocks['motion_maixdunio_grove_temphum'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SENSOR_TEMPANDHUM,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/temperature_humidity.svg",
                  "width": 65,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "PIN",
                  "options": [
                      ['D2', '2'],
                      ['D4', '4'],
                      ['D5', '5'],
                      ['D6', '6'],
                      ['D7', '7'],
                      ['D8', '8'],
                      ['D9', '9'],
                      ['D10', '10'],
                  ]
              },
              {
                  "type": "field_dropdown",
                  "name": "TH",
                  "options": [
                      [Blockly.Msg.MAIXDUINO_GROVE_SENSOR_TEMPANDHUM_OPT0, 'readTemperature'],
                      [Blockly.Msg.MAIXDUINO_GROVE_SENSOR_TEMPANDHUM_OPT1, 'readHumidity']
                  ]
              }

          ],
          "extensions": ["colours_maixdunio_grovedigit", "output_number"]
      });
  }
}

Blockly.Blocks['motion_maixdunio_grove_serial_touch'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_TOUCH,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/touch.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "CH",
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
                      ['9', '9'],
                      ['10', '10'],
                      ['11', '11']
                  ]
              }
          ],
          "extensions": ["colours_maixdunio_grovedigit", "output_boolean"],
      });
  }
}

Blockly.Blocks['motion_maixdunio_grove_speech_recognizer'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SENSOR_SPEECH_RECONGNITE,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/speech_recognizer.svg",
                  "width": 65,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "PIN",
                  "options": [
                      ['D4&D2', '2'],
                      ['D6&D5', '5'],
                      ['D8&D7', '7'],
                      ['D10&D9', '9'],
                  ]
              },
              {
                  "type": "field_dropdown",
                  "name": "OPT",
                  "options": [
                      ['Go', '21'],
                      ['Left', '15'],
                      ['Right', '16'],
                      ['Stop', '17'],
                      ['Start', '18'],
                      ['Turn on the light', '0'],
                      ['Turn off the light', '1'],
                      ['Play music', '2'],
                      ['Pause', '3'],
                      ['Next', '4'],
                      ['Previous', '5'],
                      ['Up', '6'],
                      ['Down', '7'],
                      ['Turn on the TV', '8'],
                      ['Turn off the TV', '9'],
                      ['Increase temperature', '10'],
                      ['Decrease temperature', '11'],
                      ['What’s the time', '12'],
                      ['Open the door', '13'],
                      ['Close the door', '14'],
                      ['Mode 1', '19'],
                      ['Mode 2', '20'],
                  ]
              }
          ],
          "extensions": ["colours_maixdunio_grovedigit", "output_boolean"],
      });
  }
}

Blockly.Blocks['motion_maixdunio_grove_gesture'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SENSOR_GESTURE,
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
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT0, 'GES_LEFT_FLAG'],
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT1, 'GES_RIGHT_FLAG'],
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT2, 'GES_UP_FLAG'],
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT3, 'GES_DOWN_FLAG'],
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT4, 'GES_FORWARD_FLAG'],
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT5, 'GES_BACKWARD_FLAG'],
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT6, 'GES_CLOCKWISE_FLAG'],
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT7, 'GES_COUNT_CLOCKWISE_FLAG'],
                      [Blockly.Msg.MAIXDUINO_GROVE_GESTURE_OPT8, 'GES_WAVE_FLAG']
                  ]
              }

          ],
          "extensions": ["colours_maixdunio_grovedigit", "output_boolean"]
      });
  }
};

Blockly.Blocks['motion_maixdunio_grove_color'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MAIXDUINO_GROVE_SENSOR_COLOR_RECONGNITE,
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
                      [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT1, 'CC_COLOR_RED'],
                      [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT2, 'CC_COLOR_GREEN'],
                      [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT3, 'CC_COLOR_BLUE'],
                      [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT4, 'CC_COLOR_BLACK'],
                      [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT5, 'CC_COLOR_WHITE'],
                      [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT6, 'CC_COLOR_OTHER']

                  ]
              }
          ],
          "extensions": ["colours_maixdunio_grovedigit", "output_boolean"]
      });
  }
};