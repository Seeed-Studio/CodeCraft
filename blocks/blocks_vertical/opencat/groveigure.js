'use strict';

goog.provide('Blockly.Blocks.opencat.groveigure');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_opencat_seeed_led'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_LED,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/LED.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "STAT",
          "options": [
            ['ON', 'HIGH'],
            ['OFF', 'LOW']
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "shape_statement"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_btn'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_BTN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/btn.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_tilt'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_TILT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/tilt.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_touch'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_TOUCH,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/seeed_touch.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_vibration'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_VIBRATION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vibration.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}


Blockly.Blocks['motion_opencat_seeed_water'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_WATER,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/water.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_line_finder'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_LINE_FINDER,
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}


Blockly.Blocks['motion_opencat_seeed_ult'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_ULT,
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_number"],
    });
  }
}


Blockly.Blocks['motion_opencat_seeed_magnetic_switch'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_MAGNETIC_SWITCH,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/magnetic_switch.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_pir_motion'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_PIR_MOTION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/pir_motion.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}


Blockly.Blocks['motion_opencat_seeed_collision'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_COLLISION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/collision.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_hall'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_HALL,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/hall.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_temperature_humidity'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY,
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "TH",
          "options": [
            [Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY_OPT1, '0'],
            [Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY_OPT2, '1']
          ]
        }

      ],
      "extensions": ["colours_arduino_grove_igure", "output_number"]
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_flame'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_FLAME,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/flame.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "output_boolean"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_4digit_display'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_4DIGIT_DISPLAY,
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        },
        {
          "type": "input_value",
          "name": "NUM"
        }
      ],
      "extensions": ["colours_arduino_grove_igure", "shape_statement"],
    });
  }
}

Blockly.Blocks['motion_opencat_seeed_led_bar'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SEEED_LED_BAR,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/led_bar.svg",
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
            ['D6', '6'],
            // ['D7', '7'],
            ['D8', '8'],
            // ['D9', '9'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "OPT",
          "options": [
            [Blockly.Msg.ARDUINO_SEEED_LED_BAR_OPT1, '1'],
            [Blockly.Msg.ARDUINO_SEEED_LED_BAR_OPT2, '0']
          ]

        },
        {
          "type": "field_dropdown",
          "name": "STAT",
          "options": function () {
            var a = [];
            for (var i = 0; i < 10; i++) {
              a.push([i.toString(), i.toString()]);
            }
            return a;
          }
        }

      ],
      "extensions": ["colours_arduino_grove_igure", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_opencat_seeed_speech_recognizer'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_SEEED_SPEECH_RECOGNIZER,
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
                      ['D6', '6'],
                      ['D8', '8'],
                  ]
              },
              {
                  "type": "field_dropdown",
                  "name": "OPT",
                  "options": [
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
                      ['Left', '15'],
                      ['Right', '16'],
                      ['Stop', '17'],
                      ['Start', '18'],
                      ['Mode 1', '19'],
                      ['Mode 2', '20'],
                      ['Go', '21']
                  ]
              }
          ],
          "extensions": ["colours_arduino_grove_igure", "output_boolean"],
      });
  }
}

Blockly.Blocks['motion_opencat_seeed_speech_recognizer_getvalue'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_SEEED_SPEECH_RECOGNIZER_GETVALUE,
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
                      ['D6', '6'],
                      ['D8', '8'],
                  ]
              }
          ],
          "extensions": ["colours_arduino_grove_igure", "output_number"],
      });
  }
}