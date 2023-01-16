'use strict';

goog.provide('Blockly.Blocks.mpython.wifi');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_mpython_wifi_connect'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_WIFI_CONNECT,
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
          "name": "WIFI",
        },
        {
          "type": "input_value",
          "name": "PASSWORD",
        }
      ],
      "category": Blockly.Categories.broadcast,
      "extensions": ["colours_mpython_wifi", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_wifi_disconnect'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_WIFI_DISCONNECT,
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
      "category": Blockly.Categories.broadcast,
      "extensions": ["colours_mpython_wifi", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_wifi_connected'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_WIFI_CONNECTED,
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
      "category": Blockly.Categories.broadcast,
      "extensions": ["colours_mpython_wifi", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_mpython_wifi_all_conf'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_WIFI_ALL_CONF,
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
      "category": Blockly.Categories.broadcast,
      "extensions": ["colours_mpython_wifi", "output_string"]
    });
  }
};

Blockly.Blocks['motion_mpython_wifi_conf_mes'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_WIFI_CONF_MES,
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
          "name": "KEY",
          "options": [
            ['IP', '0'],
            ['netimask', '1'],
            ['gatewat', '2'],
            ['DNS', '3']
          ]
        }
      ],
      "category": Blockly.Categories.broadcast,
      "extensions": ["colours_mpython_wifi", "output_string"]
    });
  }
};

Blockly.Blocks['motion_mpython_open_ap_mode'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_WIFI_OPEN_AP_MODE,
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
          "name": "NAME",
        },
        {
          "type": "input_value",
          "name": "CHANNEL",
        }
      ],
      "category": Blockly.Categories.broadcast,
      "extensions": ["colours_mpython_wifi", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_close_ap_mode'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_WIFI_CLOSE_AP_MODE,
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
      "category": Blockly.Categories.broadcast,
      "extensions": ["colours_mpython_wifi", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_sync_network_time'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_WIFI_SYNC_NETWORK_TIME,
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
          "name": "ZONE",
          "options": [
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT1, '1'],
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT2, '2'],
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT3, '3'],
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT4, '4'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT5, '5'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT6, '6'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT7, '7'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT8, '8'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT9, '9'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT10, '10'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT11, '11'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT12, '12'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT13, '-1'],
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT14, '-2'],
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT15, '-3'],
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT16, '-4'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT17, '-5'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT18, '-6'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT19, '-7'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT20, '-8'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT21, '-9'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT22, '-10'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT23, '-11'], 
            [Blockly.Msg.MPYTHON_WIFI_ZONE_OPT24, '-12'], 
          ]
        },
        {
          "type": "input_value",
          "name": "SERVER",
        }
      ],
      "category": Blockly.Categories.broadcast,
      "extensions": ["colours_mpython_wifi", "shape_statement"]
    });
  }
};
