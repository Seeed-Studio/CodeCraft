
/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.haloboad.message');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_haloboad_whenbroadcastreceived'] = {
    /**
     * Block for when broadcast received.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "id": "event_whenbroadcastreceived",
            "message0": Blockly.Msg.EVENT_WHENBROADCASTRECEIVED,
            "args0": [
                {
                    "type": "field_variable",
                    "name": "BROADCAST_OPTION",
                    "variableTypes": [Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE],
                    "variable": Blockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME
                }
            ],
            "colour": "#8e66e9",
            "colourSecondary": "#683dc9",
            "colourTertiary": "#683dc9",
            "category": Blockly.Categories.event,
            "extensions": ["shape_hat"]
        });
    }
};

Blockly.Blocks['event_haloboad_broadcast'] = {
    /**
     * Block to send a broadcast.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "id": "event_broadcast",
            "message0": Blockly.Msg.EVENT_BROADCAST,
            "args0": [
                {
                    "type": "input_value",
                    "name": "BROADCAST_INPUT"
                }
            ],
            "colour": "#8e66e9",
            "colourSecondary": "#683dc9",
            "colourTertiary": "#683dc9",
            "category": Blockly.Categories.event,
            "extensions": ["shape_statement"]
        });
    }
};

Blockly.Blocks['event_haloboad_broadcastandwait'] = {
    /**
     * Block to send a broadcast.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.EVENT_BROADCASTANDWAIT,
            "args0": [
                {
                    "type": "input_value",
                    "name": "BROADCAST_INPUT"
                }
            ],
            "colour": "#8e66e9",
            "colourSecondary": "#683dc9",
            "colourTertiary": "#683dc9",
            "category": Blockly.Categories.event,
            "extensions": ["shape_statement"]
        });
    }
};

Blockly.Blocks['event_haloboad_broadcast_menu'] = {
    /**
     * Broadcast drop-down menu.
     * @this Blockly.Block
     */
    init: function() {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          {
            "type": "field_variable",
            "name": "BROADCAST_OPTION",
            "variableTypes":[Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE],
            "variable": Blockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME
          }
        ],
        "colour": "#8e66e9",
        "colourSecondary": "#683dc9",
        "colourTertiary": "#683dc9",
        "extensions": ["output_string"]
      });
    }
  };