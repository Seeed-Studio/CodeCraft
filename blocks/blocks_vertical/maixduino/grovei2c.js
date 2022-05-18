'use strict';

goog.provide('Blockly.Blocks.maixduino.grovei2c');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_maixduino_oled1'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_OLED1,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_oledmatrix",
                  "name": "SHAPE"
              }
          ],
          "extensions": ["colours_maixdunio_grovei2c", "shape_statement"]
      });
  }
};

Blockly.Blocks['motion_maixduino_oled2'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.ARDUINO_OLED2,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
                  "width": 48,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "input_value",
                  "name": "TEXT",
              },
              {
                  "type": "input_value",
                  "name": "ROW",
              },
              {
                  "type": "input_value",
                  "name": "COL",
              }
          ],
          "extensions": ["colours_maixdunio_grovei2c", "shape_statement"]
      });
  }
};