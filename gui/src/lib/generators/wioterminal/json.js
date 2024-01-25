export default (Blockly) => {

    Blockly.Arduino['json_wioterminal_json_menu'] = function (block) {
        var jsonField = block.getField('BROADCAST_OPTION');
        var obj = {
            value: jsonField.value_,
            text: jsonField.text_,
        }
        return [JSON.stringify(obj), Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['json_wioterminal_json_setvalue'] = function (block) {
        Blockly.Arduino.definitions_['include_json'] = '#include <Arduino_JSON.h>';
        let name = Blockly.Arduino.valueToCode(block, 'BROADCAST_OPTION', Blockly.Arduino.ORDER_NONE);
        if (!name) {
            return ''
        }
        let obj = JSON.parse(name);
        let json = obj.text;
        Blockly.Arduino.definitions_[`var_custom_${obj.value}`] = `JSONVar ${json};`;
        let key = Blockly.Arduino.valueToCode(block, 'KEY', Blockly.Arduino.ORDER_NONE);
        let value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);
        let code = `${json}[${key}] = (String)${value};\n`;
        return code;
    }

    Blockly.Arduino['json_wioterminal_json_getvalue'] = function (block) {
        Blockly.Arduino.definitions_['include_json'] = '#include <Arduino_JSON.h>';
        let name = Blockly.Arduino.valueToCode(block, 'BROADCAST_OPTION', Blockly.Arduino.ORDER_NONE);
        if (!name) {
            return ''
        }
        let obj = JSON.parse(name);
        let json = obj.text;
        Blockly.Arduino.definitions_[`var_custom_${obj.value}`] = `JSONVar ${json};`;
        let key = Blockly.Arduino.valueToCode(block, 'KEY', Blockly.Arduino.ORDER_NONE);
        let code = `(const String&)${json}[${key}]`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['json_wioterminal_json_object'] = function (block) {
        Blockly.Arduino.definitions_['include_json'] = '#include <Arduino_JSON.h>';
        let name = Blockly.Arduino.valueToCode(block, 'BROADCAST_OPTION', Blockly.Arduino.ORDER_NONE);
        if (!name) {
            return ''
        }
        let obj = JSON.parse(name);
        let json = obj.text;
        Blockly.Arduino.definitions_[`var_custom_${obj.value}`] = `JSONVar ${json};`;
        let code = `JSON.stringify(${json})`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

}