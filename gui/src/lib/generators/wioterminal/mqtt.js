export default (Blockly) => {

    Blockly.Arduino['mqtt_wioterminal_set_wifi'] = function (block) {
        Blockly.Arduino.definitions_['include_wifi'] = '#include <rpcWiFi.h>';
        let ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_NONE);
        let pwd = Blockly.Arduino.valueToCode(block, 'PWD', Blockly.Arduino.ORDER_NONE);

        Blockly.Arduino.definitions_['var_ssid'] = `const char ssid[] = ${ssid};`;
        Blockly.Arduino.definitions_['var_password'] = `const char pass[] = ${pwd};`;
        Blockly.Arduino.definitions_['var_wifi_client'] = 'WiFiClient net;';
        Blockly.Arduino.setups_['setup_wifi'] = `  WiFi.begin(${ssid}, ${pwd});`;
        return '';
    }

    Blockly.Arduino['mqtt_wioterminal_set_mqtt'] = function (block) {
        Blockly.Arduino.definitions_['include_mqtt'] = '#include <MQTT.h>';
        let broker = Blockly.Arduino.valueToCode(block, 'BROKER', Blockly.Arduino.ORDER_NONE);
        let device = Blockly.Arduino.valueToCode(block, 'DEVICE', Blockly.Arduino.ORDER_NONE);
        let name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_NONE);
        let password = Blockly.Arduino.valueToCode(block, 'PASSWORD', Blockly.Arduino.ORDER_NONE);

        Blockly.Arduino.definitions_['var_mqtt_broker'] = `#define BROKER       ${broker}`;
        Blockly.Arduino.definitions_['var_mqtt_device'] = `#define DEV_NAME     ${device}`;
        Blockly.Arduino.definitions_['var_mqtt_name'] = `#define MQTT_USER    ${name}`;
        Blockly.Arduino.definitions_['var_mqtt_password'] = `#define MQTT_PW      ${password}`;
        Blockly.Arduino.definitions_['var_mqtt_client'] = 'MQTTClient client;';
        Blockly.Arduino.definitions_['var_mqtt_topic'] = 'String rev_topic;';
        Blockly.Arduino.definitions_['var_mqtt_payload'] = 'String rev_payload;';
        Blockly.Arduino.setups_['setup_mqtt'] = `  client.begin(BROKER, net);`;
        Blockly.Arduino.setups_['setup_mqtt_onmessage'] = `  client.onMessage(messageReceived);`;
        Blockly.Arduino.define_fun['func_mqtt_received'] = `
void messageReceived(String &topic, String &payload) {
    rev_topic = topic;
    rev_payload = payload;
}`
        return ''
    }

    Blockly.Arduino['mqtt_wioterminal_connect_mqtt'] = function (block) {
        Blockly.Arduino.define_fun['func_mqtt_connect'] = `
bool connect() {
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(1000);
    }
    while (!client.connect(DEV_NAME, MQTT_USER, MQTT_PW)) {
        Serial.print(".");
        delay(1000);
    }
    return true;
}`
        let code = `connect()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['mqtt_wioterminal_connected'] = function (block) {
        let code = `client.connected()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['mqtt_wioterminal_channel_menu'] = function (block) {
        var channelField = block.getField('BROADCAST_OPTION');
        var obj = {
            value: channelField.value_,
            text: channelField.text_,
        }
        return [JSON.stringify(obj), Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['mqtt_wioterminal_received'] = function (block) {
        Blockly.Arduino.definitions_['include_mqtt'] = '#include <MQTT.h>';
        Blockly.Arduino.definitions_['var_mqtt_payload'] = 'String rev_payload;';

        let channel = Blockly.Arduino.valueToCode(block, 'BROADCAST_OPTION', Blockly.Arduino.ORDER_NONE);
        if (!channel) {
            return ''
        }
        let channelObj = JSON.parse(channel);
        let subChannel = channelObj.text;

        // Blockly.Arduino.definitions_[`var_custom_${channelObj.value}`] = `String ${subChannel};`;
        Blockly.Arduino.define_fun['func_mqtt_read_payload'] = `
String readPayload(String topic) {
    if (topic == rev_topic) {
        return rev_payload;
    }
    return "";
}`
        let code = `readPayload("${subChannel}")`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['mqtt_wioterminal_subscribe'] = function (block) {
        let channel = Blockly.Arduino.valueToCode(block, 'BROADCAST_OPTION', Blockly.Arduino.ORDER_NONE);
        if (!channel) {
            return ''
        }
        let channelObj = JSON.parse(channel);
        let subChannel = channelObj.text;
        let code = `client.subscribe("${subChannel}");\n`;
        return code;
    }

    Blockly.Arduino['mqtt_wioterminal_publish'] = function (block) {
        let value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE);
        let channel = Blockly.Arduino.valueToCode(block, 'BROADCAST_OPTION', Blockly.Arduino.ORDER_NONE);
        if (!channel) {
            return ''
        }
        let channelObj = JSON.parse(channel);
        let pubChannel = channelObj.text;
        let code = `client.publish("${pubChannel}", (String)${value});\n`;
        return code;
    }

}