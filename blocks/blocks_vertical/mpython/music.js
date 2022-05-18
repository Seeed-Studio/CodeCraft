'use strict';

goog.provide('Blockly.Blocks.mpython.music');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sound_mpython_music_stop_play'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_STOP_PLAY,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
            [Blockly.Msg.MPYTHON_PIN_OPT, '-1'],
            ["P0", '0'],
            ["P1", '1'],
            ["P8", '8'],
            ["P9", '9'],
            ["P13", '13'],
            ["P14", '14'],
            ["P15", '15'],
            ["P16", '16'],
            ["P19", '19'],
            ["P20", '20']
          ]
        }
      ],
      "extensions": ["colours_mpython_music", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_mpython_restore_music_set'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_RESTORE_MUSIC_SET,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["colours_mpython_music", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_mpython_note_beat'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_NOTE_BEAT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "NOTE",
          "options": [
            ["C3", 'C3'],
            ["C#3", 'C#3'],
            ["D3", 'D3'],
            ["D#3", 'D#3'],
            ["E3", 'E3'],
            ["F3", 'F3'],
            ["F#3", 'F#3'],
            ["G3", 'G3'],
            ["G#3", 'G#3'],
            ["A3", 'A3'],
            ["A#3", 'A#3'],
            ["B3", 'B3'],
            ["C4", 'C4'],
            ["C#4", 'C#4'],
            ["D4", 'D4'],
            ["D#4", 'D#4'],
            ["E4", 'E4'],
            ["F4", 'F4'],
            ["F#4", 'F#4'],
            ["G4", 'G4'],
            ["G#4", 'G#4'],
            ["A4", 'A4'],
            ["A#4", 'A#4'],
            ["B4", 'B4'],
            ["C5", 'C5'],
            ["C#5", 'C#5'],
            ["D5", 'D5'],
            ["D#5", 'D#5'],
            ["E5", 'E5'],
            ["F5", 'F5'],
            ["F#5", 'F#5'],
            ["G5", 'G5'],
            ["G#5", 'G#5'],
            ["A5", 'A5'],
            ["A#5", 'A#5'],
            ["B5", 'B5']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "BEAT",
          "options": [
            ['1/4', '1'],
            ['1/2', '2'],
            ['1', '4'],
            ['2', '8']
          ]
        }
      ],
      "extensions": ["colours_mpython_music", "output_string"]
    });
  }
};

Blockly.Blocks['sound_mpython_note_beat_pin'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_NOTE_BEAT_PIN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "NOTE",
          "options": [
            ["C3", 'C3'],
            ["C#3", 'C#3'],
            ["D3", 'D3'],
            ["D#3", 'D#3'],
            ["E3", 'E3'],
            ["F3", 'F3'],
            ["F#3", 'F#3'],
            ["G3", 'G3'],
            ["G#3", 'G#3'],
            ["A3", 'A3'],
            ["A#3", 'A#3'],
            ["B3", 'B3'],
            ["C4", 'C4'],
            ["C#4", 'C#4'],
            ["D4", 'D4'],
            ["D#4", 'D#4'],
            ["E4", 'E4'],
            ["F4", 'F4'],
            ["F#4", 'F#4'],
            ["G4", 'G4'],
            ["G#4", 'G#4'],
            ["A4", 'A4'],
            ["A#4", 'A#4'],
            ["B4", 'B4'],
            ["C5", 'C5'],
            ["C#5", 'C#5'],
            ["D5", 'D5'],
            ["D#5", 'D#5'],
            ["E5", 'E5'],
            ["F5", 'F5'],
            ["F#5", 'F#5'],
            ["G5", 'G5'],
            ["G#5", 'G#5'],
            ["A5", 'A5'],
            ["A#5", 'A#5'],
            ["B5", 'B5']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "BEAT",
          "options": [
            ['1/4', '1'],
            ['1/2', '2'],
            ['1', '3'],
            ['2', '4']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT, '-1'],
            ["P0", '0'],
            ["P1", '1'],
            ["P8", '8'],
            ["P9", '9'],
            ["P13", '13'],
            ["P14", '14'],
            ["P15", '15'],
            ["P16", '16'],
            ["P19", '19'],
            ["P20", '20']
          ]
        }
      ],
      "extensions": ["colours_mpython_music", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_mpython_music_tone'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_TONE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "NOTE",
          "options": [
            ["C3", '131'],
            ["C#3", '139'],
            ["D3", '147'],
            ["D#3", '156'],
            ["E3", '165'],
            ["F3", '175'],
            ["F#3", '185'],
            ["G3", '196'],
            ["G#3", '208'],
            ["A3", '220'],
            ["A#3", '233'],
            ["B3", '247'],
            ["C4", '262'],
            ["C#4", '277'],
            ["D4", '294'],
            ["D#4", '311'],
            ["E4", '330'],
            ["F4", '349'],
            ["F#4", '370'],
            ["G4", '392'],
            ["G#4", '415'],
            ["A4", '440'],
            ["A#4", '466'],
            ["B4", '494'],
            ["C5", '523'],
            ["C#5", '554'],
            ["D5", '587'],
            ["D#5", '622'],
            ["E5", '659'],
            ["F5", '698'],
            ["F#5", '740'],
            ["G5", '784'],
            ["G#5", '831'],
            ["A5", '880'],
            ["A#5", '932'],
            ["B5", '988']
          ]
        }
      ],
      "extensions": ["colours_mpython_music", "output_number"]
    });
  }
};

Blockly.Blocks['sound_mpython_play_tone_pin'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_PLAY_TONE_PIN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "NOTE",
          "options": [
            ["C3", '131'],
            ["C#3", '139'],
            ["D3", '147'],
            ["D#3", '156'],
            ["E3", '165'],
            ["F3", '175'],
            ["F#3", '185'],
            ["G3", '196'],
            ["G#3", '208'],
            ["A3", '220'],
            ["A#3", '233'],
            ["B3", '247'],
            ["C4", '262'],
            ["C#4", '277'],
            ["D4", '294'],
            ["D#4", '311'],
            ["E4", '330'],
            ["F4", '349'],
            ["F#4", '370'],
            ["G4", '392'],
            ["G#4", '415'],
            ["A4", '440'],
            ["A#4", '466'],
            ["B4", '494'],
            ["C5", '523'],
            ["C#5", '554'],
            ["D5", '587'],
            ["D#5", '622'],
            ["E5", '659'],
            ["F5", '698'],
            ["F#5", '740'],
            ["G5", '784'],
            ["G#5", '831'],
            ["A5", '880'],
            ["A#5", '932'],
            ["B5", '988']
          ]
        },
        {
          "type": "input_value",
          "name": "DELAY",
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT, '-1'],
            ["P0", '0'],
            ["P1", '1'],
            ["P8", '8'],
            ["P9", '9'],
            ["P13", '13'],
            ["P14", '14'],
            ["P15", '15'],
            ["P16", '16'],
            ["P19", '19'],
            ["P20", '20']
          ]
        }
      ],
      "extensions": ["colours_mpython_music", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_mpython_play_tone_pin_para'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_PLAY_TONE_PIN_PARA,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "START",
        },
        {
          "type": "input_value",
          "name": "END",
        },
        {
          "type": "input_value",
          "name": "STEP",
        },
        {
          "type": "input_value",
          "name": "DURATION",
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT, '-1'],
            ["P0", '0'],
            ["P1", '1'],
            ["P8", '8'],
            ["P9", '9'],
            ["P13", '13'],
            ["P14", '14'],
            ["P15", '15'],
            ["P16", '16'],
            ["P19", '19'],
            ["P20", '20']
          ]
        }
      ],
      "extensions": ["colours_mpython_music", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_mpython_play_music_pin'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_PLAY_MUSIC_PIN,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "MUSIC",
          "options": [
              ["DADADADUM", 'DADADADUM'],
              ["ENTERTAINER", 'ENTERTAINER'],
              ["PRELUDE", 'PRELUDE'],
              ["ODE", 'ODE'],
              ["NYAN", 'NYAN'],
              ["RINGTONE", 'RINGTONE'],
              ["FUNK", 'FUNK'],
              ["BLUES", 'BLUES'],
              ["BIRTHDAY", 'BIRTHDAY'],
              ["WEDDING", 'WEDDING'],
              ["FUNERAL", 'FUNERAL'],
              ["PUNCHLINE", 'PUNCHLINE'],
              ["PYTHON", 'PYTHON'],
              ["BADDY", 'BADDY'],
              ["CHASE", 'CHASE'],
              ["BA_DING", 'BA_DING'],
              ["WAWAWAWAA", 'WAWAWAWAA'],
              ["JUMP_UP", 'JUMP_UP'],
              ["JUMP_DOWN", 'JUMP_DOWN'],
              ["POWER_UP", 'POWER_UP'],
              ["POWER_DOWN", 'POWER_DOWN']
          ]
        },
        {
          "type": "field_checkbox",
          "name": "WAIT",
          "checked": true    
        },
        {
          "type": "field_checkbox",
          "name": "LOOP",
          "checked": false
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT, '-1'],
            ["P0", '0'],
            ["P1", '1'],
            ["P8", '8'],
            ["P9", '9'],
            ["P13", '13'],
            ["P14", '14'],
            ["P15", '15'],
            ["P16", '16'],
            ["P19", '19'],
            ["P20", '20']
          ]
        }
      ],
      "extensions": ["colours_mpython_music", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_mpython_set_play_speed'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_SET_PLAY_SPEED,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "SPEED",
        }
      ],
      "extensions": ["colours_mpython_music", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_mpython_music_set_beat'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_SET_BEAT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NOTE",
        },
        {
          "type": "input_value",
          "name": "BEAT",
        }
      ],
      "extensions": ["colours_mpython_music", "shape_statement"]
    });
  }
};

Blockly.Blocks['sound_mpython_set_current_beat'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_MUSIC_SET_CURRENT_BEAT,
      "args0": [
          {
              "type": "field_image",
              "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
              "width": 40,
              "height": 30
          },
          {
              "type": "field_vertical_separator"
          }
      ],
      "extensions": ["colours_mpython_music", "output_number"]
    });
  }
};
