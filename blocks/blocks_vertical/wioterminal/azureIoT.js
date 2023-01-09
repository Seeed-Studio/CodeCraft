'use strict';

goog.provide('Blockly.Blocks.wioterminal.azureIoT');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


//设置wifi
Blockly.Blocks['azure_iot_wioterminal_set_wifi'] = {
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
            "extensions": ["colours_wioterminal_azure_iot", "shape_statement"]
        });
    }
}

//wifi是否已经连接
Blockly.Blocks['azure_iot_wioterminal_connect_wifi'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_CONNECT_WIFI,
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
            ],
            "extensions": ["colours_wioterminal_azure_iot", "output_boolean"],
        });
    }
}

//初始化lot
Blockly.Blocks['azure_iot_wioterminal_azure_init'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_INIT_IOT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/azure.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "SCOPEID"
                },
                {
                    "type": "input_value",
                    "name": "KEY"
                },
                {
                    "type": "input_value",
                    "name": "DEVICE"
                },
            ],
            "extensions": ["colours_wioterminal_azure_iot", "shape_statement"]
        });
    }
}

//启动azure
Blockly.Blocks['azure_iot_wioterminal_azure_start'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_CONNECT_AZURE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/azure.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_wioterminal_azure_iot", "shape_statement"]
        });
    }
}

//azure是否已经连接
Blockly.Blocks['azure_iot_wioterminal_azure_connected'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_AZURE_CONNECTED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/azure.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_wioterminal_azure_iot", "output_boolean"],
        });
    }
}

//发布数据到azure
Blockly.Blocks['azure_iot_wioterminal_azure_publish'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_PUBLISH_NOSE_AZURE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/azure.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_wioterminal_azure_iot", "shape_statement"]
        });
    }
}

//预测一次本杰明的人工鼻模型
Blockly.Blocks['azure_iot_wioterminal_runClassifier_artificial_nose'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_RUN_ARTIFICIAL_NOSE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/azure.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_wioterminal_azure_iot", "shape_statement"]
        });
    }
}
