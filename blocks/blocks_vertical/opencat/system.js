'use strict';

goog.provide('Blockly.Blocks.opencat.event');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_opencat_whenstartup'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SETUP_LOOP0,
      "message1": "%1",
      "message2": Blockly.Msg.ARDUINO_SETUP_LOOP2,
      "message3": "%1",
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK1"
        }
      ],
      "args3": [
        {
          "type": "input_statement",
          "name": "SUBSTACK2"
        }
      ],
      "extensions": ["colours_event", "shape_hat"],
      // "inputsInline": true,
      // "previousStatement": null,
      // "category": Blockly.Categories.control,
      // "colour": Blockly.Colours.control.primary,
      // "colourSecondary": Blockly.Colours.control.secondary,
      // "colourTertiary": Blockly.Colours.control.tertiary
      // , "shape_end"
    });
  }
};

// C3,D3,E3,F3,G3,A3,B3,C4,D4,E4,F4,G4,A4,B4,C5,D5,E5,F5,G5,A5,B5

Blockly.Blocks['event_opencat_buzzer_play'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_BUZZER_PALY,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "NOTE",
          "options": [
            ['C3', '4'],
            ['D3', '6'],
            ['E3', '8'],
            ['F3', '9'],
            ['G3', '11'],
            ['A3', '13'],
            ['B3', '15'],
            ['C4', '16'],
            ['D4', '18'],
            ['E4', '20'],
            ['F4', '21'],
            ['G4', '23'],
            ['A4', '25'],
            ['B4', '27'],
            ['C5', '28'],
            ['D5', '30'],
            ['E5', '32'],
            ['F5', '33'],
            ['G5', '35'],
            ['A5', '37'],
            ['B5', '39']
          ],
        },
        {
          "type": "field_dropdown",
          "name": "BEAT",
          "options": [
            ['1', '500'],
            ['1/2', '250'],
            ['1/4', '125'],
            ['1/8', '63'],
            ['1/16', '33'],
            ['2', '1000'],
            ['4', '2000'],
            ['8', '4000']
          ]
        }
      ],
      "extensions": ["colours_event", "shape_statement"]
    });
  }
};

Blockly.Blocks['event_opencat_buzzer_beatpermin'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_BUZZER_BEATPERMIN,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BEAT",
          "options": [
            ['jingle bells', 'jingle bells'],
            ['happy birthday', 'happy birthday'],
            ['ba ding', 'ba ding'],
            ['wawawawaa', 'wawawawaa'],
            ['jump up', 'jump up'],
            ['jump down', 'jump down'],
            ['power up', 'power up'],
            ['power down', 'power down'],
            ['magic wand', 'magic wand'],
          ],
        },
      ],
      "extensions": ["colours_event", "shape_statement"]
    });
  }
};

Blockly.Blocks['event_opencat_accelerometer_value'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_ACCELEROMETER_VALUE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "AXIS",
          "options": [
            ['X', '0'],
            ['Y', '1'],
            ['Z', '2']
          ]
        }
      ],
      "extensions": ["colours_event", "output_number"]
    });
  }
};

Blockly.Blocks['event_opencat_gyroscope_value'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_GYROSCOPE_VALUE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "AXIS",
          "options": [
            ['X', '0'],
            ['Y', '1'],
            ['Z', '2']
          ]
        }
      ],
      "extensions": ["colours_event", "output_number"]
    });
  }
};

Blockly.Blocks['event_opencat_bluetooth_set'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_BLUETOOTH_SET,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BAUDRATE",
          "options": [
            ['300', '300'],
            ['1200', '1200'],
            ['2400', '2400'],
            ['4800', '4800'],
            ['9600', '9600'],
            ['14400', '14400'],
            ['19200', '19200'],
            ['28800', '28800'],
            ['38400', '38400'],
            ['57600', '57600'],
            ['115200', '115200']
          ]
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "input_value",
          "name": "PWD",
        }
      ],
      "extensions": ["colours_event", "shape_statement"]
    });
  }
};
//红外遥控器启动
Blockly.Blocks['event_opencat_ir_remotecontrol_start'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_IR_REMOTECONTROL_START,
      "args0": [

      ],
      "extensions": ["colours_event", "output_boolean"]
    });
  }
};
//红外遥控器
Blockly.Blocks['event_opencat_ir_remotecontrol'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_IR_REMOTECONTROL,
      "args0": [
        {
          "type": "field_ir_remotecontrol",
          "name": "KEY",
          "default": '12'
        }
      ],
      "extensions": ["colours_event", "output_boolean"]
    });
  }
};
//红外接收器接收值IR Receiver received value
Blockly.Blocks['event_opencat_ir_receiver_received_value'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_IRRECEIVERRECEIVEDVALUE,
      "args0": [],
      "extensions": ["colours_event", "output_number"]
    });
  }
};
Blockly.Blocks['motion_opencat_led_strip1'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.OPENCAT_LED_STRIP1,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
                  "width": 65,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "NO",
                  "options": [
                      [Blockly.Msg.OPENCAT_POSTURE_ALL, '-1'],
                      ['0', '0'],
                      ['1', '1'],
                      ['2', '2'],
                      ['3', '3'],
                      ['4', '4'],
                      ['5', '5'],
                      ['6', '6'],
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
          "extensions": ["colours_event", "shape_statement"],
      });
  }
}
Blockly.Blocks['motion_opencat_led_strip2'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.OPENCAT_LED_STRIP2,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
                  "width": 65,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                "type": "field_dropdown",
                "name": "NO",
                "options": [
                    [Blockly.Msg.OPENCAT_POSTURE_ALL, '-1'],
                    ['0', '0'],
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                ]
            },
              {
                "type": "input_value",
                "name": "COLOR"
              },
          ],
          "extensions": ["colours_event", "shape_statement"],
      });
  }
}

Blockly.Blocks['motion_opencat_led_strip3'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.OPENCAT_LED_STRIP3,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
                  "width": 65,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                "type": "field_dropdown",
                "name": "NO",
                "options": [
                    [Blockly.Msg.OPENCAT_POSTURE_ALL, '-1'],
                    ['0', '0'],
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                ]
              },
          ],
          "extensions": ["colours_event", "shape_statement"],
      });
  }
}

//自动平衡开关
Blockly.Blocks['motion_opencat_auto_balance'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.OPENCAT_AUTO_BALANCE,
      "args0": [
        // {
        //   "type": "field_dropdown",
        //   "name": "OPT",
        //   "options": [
        //     ['开', 1],
        //     ['关', 0],
        //   ]
        // } 
        {
          "type": "field_dropdown",
          "name": "OPT",
          "options": [
              [Blockly.Msg.OPENCAT_AUTO_BALANCE_ON, '1'],
              [Blockly.Msg.OPENCAT_AUTO_BALANCE_OFF, '0'],
          ]
        },
      ],
      "extensions": ["colours_event", "shape_statement"],
    });
  }
};