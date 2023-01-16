'use strict';

goog.provide('Blockly.Blocks.microbit.music');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_microbit_music_play'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_MUSIC_PLAY,
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
                    ["0", '0'],
                    ["1", '1'],
                    ["2", '2']
                ]
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
            }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_microbit_music", "shape_statement"]
      });
    }
};

Blockly.Blocks['motion_microbit_music_playuntildone'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_MUSIC_PLAY_UNTILDONE,
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
                    ["0", '0'],
                    ["1", '1'],
                    ["2", '2']
                ]
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
            }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_microbit_music", "shape_statement"]
      });
    }
};

Blockly.Blocks['motion_microbit_music_playnote'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_MUSIC_PLAY_NOTE,
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
                    ["0", '0'],
                    ["1", '1'],
                    ["2", '2']
                ]
            },
            {
                "type": "field_dropdown",
                "name": "NOTE",
                "options": [
                    ["C2", 'C2'],
                    ["D2", 'D2'],
                    ["E2", 'E2'],
                    ["F2", 'F2'],
                    ["G2", 'G2'],
                    ["A2", 'A2'],
                    ["B2", 'B2'],
                    ["C3", 'C3'],
                    ["D3", 'D3'],
                    ["E3", 'E3'],
                    ["F3", 'F3'],
                    ["G3", 'G3'],
                    ["A3", 'A3'],
                    ["B3", 'B3'],
                    ["C4", 'C4'],
                    ["D4", 'D4'],
                    ["E4", 'E4'],
                    ["F4", 'F4'],
                    ["G4", 'G4'],
                    ["A4", 'A4'],
                    ["B4", 'B4'],
                    ["C5", 'C5'],
                    ["D5", 'D5'],
                    ["E5", 'E5'],
                    ["F5", 'F5'],
                    ["G5", 'G5'],
                    ["A5", 'A5'],
                    ["B5", 'B5'],
                    ["C6", 'C6'],
                    ["D6", 'D6'],
                    ["E6", 'E6'],
                    ["F6", 'F6'],
                    ["G6", 'G6'],
                    ["A6", 'A6'],
                    ["B6", 'B6'],
                    ["C7", 'C7'],
                    ["D7", 'D7'],
                    ["E7", 'E7'],
                    ["F7", 'F7'],
                    ["G7", 'G7'],
                    ["A7", 'A7'],
                    ["B7", 'B7'],
                    ["C8", 'C8'],
                    ["D8", 'D8']
                ]
            },
            {
                "name":"BEAT",
                "type":"input_value"
            }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_microbit_music", "shape_statement"]
      });
    }
};

Blockly.Blocks['motion_microbit_music_changetempo'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_MUSIC_CHANGETEMPO,
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
                "name":"TEMPO",
                "type":"input_value"
            }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_microbit_music", "shape_statement"]
      });
    }
};

Blockly.Blocks['motion_microbit_music_settempo'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_MUSIC_SETTEMPO,
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
                "name":"TEMPO",
                "type":"input_value"
            }
        ],
        "category": Blockly.Categories.motion,
        "extensions": ["colours_microbit_music", "shape_statement"]
      });
    }
};

Blockly.Blocks['motion_microbit_music_tempo'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_MUSIC_TEMPO,
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
        "category": Blockly.Categories.motion,
        "extensions": ["colours_microbit_music", "output_number"]
      });
    }
};