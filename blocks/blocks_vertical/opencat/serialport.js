'use strict';

goog.provide('Blockly.Blocks.opencat.seralport');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_opencat_serial_baud_rate'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SERIAL_BAUD_RATE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BR",
          "options": [
            ['9600', '9600'],
            ['300', '300'],
            ['1200', '1200'],
            ['4800', '4800'],
            ['14400', '14400'],
            ['19200', '19200'],
            ['28800', '28800'],
            ['38400', '38400'],
            ['57600', '57600'],
            ['115200', '115200']
          ]
        }
      ],
      "extensions": ["colours_bitty_serialport", "shape_statement"],
    });
  }
}


//串口 写入文本
Blockly.Blocks['motion_opencat_serial_print'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SERIAL_PRINT,
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "extensions": ["colours_bitty_serialport", "shape_statement"],
    });
  }
}

// 串口 是否有字符
Blockly.Blocks['motion_opencat_serial_is_readable'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SERIAL_IS_READABLE,
      "extensions": ["colours_bitty_serialport", "output_boolean"]
    });
  }
}

//串口 读取字符串
Blockly.Blocks['motion_opencat_serial_read'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SERIAL_READ,
      "extensions": ["colours_bitty_serialport", "output_number"],
    });
  }
}

//串口 字符串转数值
Blockly.Blocks['motion_opencat_serial_strtonumber'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_SERIAL_STR_TONUMBER,
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "extensions": ["colours_bitty_serialport", "output_number"],
    });
  }
}