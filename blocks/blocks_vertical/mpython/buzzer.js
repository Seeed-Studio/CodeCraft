'use strict';

goog.provide('Blockly.Blocks.mpython.buzzer');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_mpython_buzzer_init'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_BUZZER_INIT,
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
      "category": Blockly.Categories.buzzer,
      "extensions": ["colours_mpython_buzzer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_buzzer_release_cache'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_BUZZER_RELEASE_CACHE,
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
      "category": Blockly.Categories.buzzer,
      "extensions": ["colours_mpython_buzzer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_bizzer_volume'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_BUZZER_SET_VOLUMN,
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
          "name": "VOLUMN",
        }
      ],
      "category": Blockly.Categories.buzzer,
      "extensions": ["colours_mpython_buzzer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_bizzer_action'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_BUZZER_SET_ACTION,
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
            [Blockly.Msg.MPYTHON_MUSIC_ACTION_OPT3, 'pause'],
            [Blockly.Msg.MPYTHON_MUSIC_ACTION_OPT4, 'resume'],
            [Blockly.Msg.MPYTHON_MUSIC_ACTION_OPT5, 'stop']
          ]
        }
      ],
      "category": Blockly.Categories.buzzer,
      "extensions": ["colours_mpython_buzzer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_bizzer_play'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_BUZZER_PLAY,
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
          "name": "URL",
        }
      ],
      "category": Blockly.Categories.buzzer,
      "extensions": ["colours_mpython_buzzer", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_tts_voice_conf'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_BUZZER_VOICE_CONF,
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
          "name": "APPID",
        },
        {
          "type": "input_value",
          "name": "APIKEY",
        }
      ],
      "category": Blockly.Categories.buzzer,
      "extensions": ["colours_mpython_buzzer", "shape_statement"]
    });
  }
};
Blockly.Blocks['motion_mpython_tts_voice_play'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_BUZZER_VOICE_PLAY,
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
          "name": "CONTENT",
        }
      ],
      "category": Blockly.Categories.buzzer,
      "extensions": ["colours_mpython_buzzer", "shape_statement"]
    });
  }
};
