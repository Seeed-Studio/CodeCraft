'use strict';

goog.provide('Blockly.Blocks.wioterminal.mqtt');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['mqtt_wioterminal_set_wifi'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SET_WIFI,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/wifi.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "SSID"
                },
                {
                    "type": "input_value",
                    "name": "PWD"
                },
            ],
            "extensions": ["colours_wioterminal_mqtt", "shape_statement"]
        });
    }
}

Blockly.Blocks['mqtt_wioterminal_set_mqtt'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_MQTT_SET_MQTT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/mqtt.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "BROKER"
                },
                {
                    "type": "input_value",
                    "name": "DEVICE"
                },
                {
                    "type": "input_value",
                    "name": "NAME"
                },
                {
                    "type": "input_value",
                    "name": "PASSWORD"
                },
            ],
            "extensions": ["colours_wioterminal_mqtt", "shape_statement"]
        });
    }
}

Blockly.Blocks['mqtt_wioterminal_connect_mqtt'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_MQTT_CONNECT_MQTT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/mqtt.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_wioterminal_mqtt", "output_boolean"],
        });
    }
}

Blockly.Blocks['mqtt_wioterminal_connected'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_MQTT_CONNECTED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/mqtt.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_wioterminal_mqtt", "output_boolean"],
        });
    }
}

Blockly.Blocks['mqtt_wioterminal_channel_menu'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "BROADCAST_OPTION",
                    "variableTypes": [Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE],
                    "variable": "channel"
                }
            ],
            "extensions": ["colours_wioterminal_mqtt", "output_string"]
        });
    }
};

Blockly.Blocks['mqtt_wioterminal_received'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_MQTT_RECEIVED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/mqtt.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "BROADCAST_OPTION"
                },
            ],
            "extensions": ["colours_wioterminal_mqtt", "output_string"]
        });
    }
};

Blockly.Blocks['mqtt_wioterminal_subscribe'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_MQTT_SUB,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/mqtt.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "BROADCAST_OPTION"
                },
            ],
            "extensions": ["colours_wioterminal_mqtt", "shape_statement"]
        });
    }
};

Blockly.Blocks['mqtt_wioterminal_publish'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_MQTT_PUB,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/mqtt.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                },
                {
                    "type": "input_value",
                    "name": "BROADCAST_OPTION"
                },
            ],
            "extensions": ["colours_wioterminal_mqtt", "shape_statement"]
        });
    }
};
