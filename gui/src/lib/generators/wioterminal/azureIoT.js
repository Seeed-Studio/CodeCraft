export default (Blockly) => {

    Blockly.Arduino['azure_iot_wioterminal_set_wifi'] = function (block) {
        let ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_NONE);
        let pwd = Blockly.Arduino.valueToCode(block, 'PWD', Blockly.Arduino.ORDER_NONE);

        Blockly.Arduino.definitions_['include_ssid'] = `#define IOT_CONFIG_WIFI_SSID        ${ssid}`;
        Blockly.Arduino.definitions_['include_password'] = `#define IOT_CONFIG_WIFI_PASSWORD      ${pwd}`;
        return '';
    };

    Blockly.Arduino['azure_iot_wioterminal_connect_wifi'] = function (block) {
        Blockly.Arduino.definitions_['include_WiFiClientSecure'] = '#include <rpcWiFiClientSecure.h>';
        Blockly.Arduino.define_fun['wifi_connected'] =
        'uint8_t wifiConnecting()\n' +
        '{\n' +
        '  while (WiFi.status() != WL_CONNECTED){\n' +
        '    WiFi.begin(IOT_CONFIG_WIFI_SSID, IOT_CONFIG_WIFI_PASSWORD);\n' +
        '  }\n' +
        '  return 1;\n' +
        '}\n' +
        '';
        let code = `wifiConnecting()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    
    Blockly.Arduino['azure_iot_wioterminal_azure_init'] = function (block) {
        let scopeid = Blockly.Arduino.valueToCode(block, 'SCOPEID', Blockly.Arduino.ORDER_NONE);
        let key = Blockly.Arduino.valueToCode(block, 'KEY', Blockly.Arduino.ORDER_NONE);
        let devicename = Blockly.Arduino.valueToCode(block, 'DEVICE', Blockly.Arduino.ORDER_NONE);
        
        Blockly.Arduino.definitions_['include_WiFiClientSecure'] = '#include <rpcWiFiClientSecure.h>';
        Blockly.Arduino.definitions_['include_PubSubClient'] = '#include <PubSubClient.h>';
        Blockly.Arduino.definitions_['include_WiFiUdp'] = '#include <WiFiUdp.h>';
        Blockly.Arduino.definitions_['include_NTP'] = '#include <NTP.h>';
        Blockly.Arduino.definitions_['include_Signature'] = '#include <Signature.h>';
        Blockly.Arduino.definitions_['include_Certificates'] = '#include <Certificates.h>';
        Blockly.Arduino.definitions_['include_AzureDpsClient'] = '#include <AzureDpsClient.h>';
        Blockly.Arduino.definitions_['include_az_core'] = '#include <az_core.h>';
        Blockly.Arduino.definitions_['include_az_iot'] = '#include <az_iot.h>';

        Blockly.Arduino.definitions_['include_endpoint'] = '#define IOT_CONFIG_GLOBAL_DEVICE_ENDPOINT "global.azure-devices-provisioning.net"';
        Blockly.Arduino.definitions_['include_TOKEN_LIFESPAN'] = '#define TOKEN_LIFESPAN                      3600';

        Blockly.Arduino.definitions_['var_HubClient'] = 'static az_iot_hub_client HubClient;';
        Blockly.Arduino.definitions_['var_scopeid'] = `char IOT__ID_scope[20] = ${scopeid};`;
        Blockly.Arduino.definitions_['var_key'] = `char IOT__primary_key[100] = ${key};`;
        Blockly.Arduino.definitions_['var_devicename'] = `char IOT__device_name[50] = ${devicename};`;
        Blockly.Arduino.definitions_['var_SymmetricKey'] = 'std::string SymmetricKey;';
        Blockly.Arduino.definitions_['var_HubHost'] = 'std::string HubHost;';
        Blockly.Arduino.definitions_['var_DeviceId'] = 'std::string DeviceId;';

        Blockly.Arduino.definitions_['var_wifi_client'] = 'WiFiClientSecure wifi_client;';
        Blockly.Arduino.definitions_['var_mqtt_client'] = 'PubSubClient mqtt_client(wifi_client);';
        Blockly.Arduino.definitions_['var_wifi_udp'] = 'WiFiUDP wifi_udp;';
        Blockly.Arduino.definitions_['var_ntp'] = 'NTP ntp(wifi_udp);';
        
        Blockly.Arduino.definitions_['var_AZ_RETURN'] = `
#define AZ_RETURN_IF_FAILED(exp) \\
do \\
{ \\
    az_result const _result = (exp); \\
    if (az_result_failed(_result)) \\
    { \\
    return _result; \\
    } \\
} while (0)`;
        Blockly.Arduino.definitions_['var_DpsClient'] = 'static AzureDpsClient DpsClient;';
        Blockly.Arduino.definitions_['var_DpsPublishTime'] = 'static unsigned long DpsPublishTimeOfQueryStatus = 0;';
        Blockly.Arduino.definitions_['var_CallbackDPS'] = 'static void mqttSubscribeCallbackDPS(char* topic, byte* payload, unsigned int length);';

        Blockly.Arduino.define_fun['func_mqttSubscribeCallbackDPS'] = `
static void mqttSubscribeCallbackDPS(char* topic, byte* payload, unsigned int length)
{
  if (DpsClient.RegisterSubscribeWork(topic, std::vector<uint8_t>(payload, payload + length)) != 0)
  {
    return;
  }
  if (!DpsClient.IsRegisterOperationCompleted())
  {
    const int waitSeconds = DpsClient.GetWaitBeforeQueryStatusSeconds();
    DpsPublishTimeOfQueryStatus = millis() + waitSeconds * 1000;
  }
}
        `;

        Blockly.Arduino.define_fun['func_registerDeviceToDPS'] = `
static int registerDeviceToDPS(const std::string& endpoint, const std::string& idScope, const std::string& registrationId, const std::string& symmetricKey, const uint64_t& expirationEpochTime, std::string* hubHost, std::string* deviceId)
{
  std::string endpointAndPort{ endpoint };
  endpointAndPort += ":";
  endpointAndPort += std::to_string(8883);
  if (DpsClient.Init(endpointAndPort, idScope, registrationId) != 0) return -1;
  const std::string mqttClientId = DpsClient.GetMqttClientId();
  const std::string mqttUsername = DpsClient.GetMqttUsername();
  const std::vector<uint8_t> signature = DpsClient.GetSignature(expirationEpochTime);
  const std::string encryptedSignature = GenerateEncryptedSignature(symmetricKey, signature);
  const std::string mqttPassword = DpsClient.GetMqttPassword(encryptedSignature, expirationEpochTime);
  const std::string registerPublishTopic = DpsClient.GetRegisterPublishTopic();
  const std::string registerSubscribeTopic = DpsClient.GetRegisterSubscribeTopic();

  wifi_client.setCACert(CERT_BALTIMORE_CYBERTRUST_ROOT_CA);
  mqtt_client.setBufferSize(1024);
  mqtt_client.setServer(endpoint.c_str(), 8883);
  mqtt_client.setCallback(mqttSubscribeCallbackDPS);

  if (!mqtt_client.connect(mqttClientId.c_str(), mqttUsername.c_str(), mqttPassword.c_str())) return -2;

  mqtt_client.subscribe(registerSubscribeTopic.c_str());
  mqtt_client.publish(registerPublishTopic.c_str(), "{payload:{\\"modelId\\":\\"" IOT_CONFIG_MODEL_ID "\\"}}");
  while (!DpsClient.IsRegisterOperationCompleted())
  {
    mqtt_client.loop();
    if (DpsPublishTimeOfQueryStatus > 0 && millis() >= DpsPublishTimeOfQueryStatus)
    {
      mqtt_client.publish(DpsClient.GetQueryStatusPublishTopic().c_str(), "");
      DpsPublishTimeOfQueryStatus = 0;
    }
  }
  if (!DpsClient.IsAssigned()) return -3;
  mqtt_client.disconnect();
  *hubHost = DpsClient.GetHubHost();
  *deviceId = DpsClient.GetDeviceId();
  return 0;
}`;

        Blockly.Arduino.setups_['setup_SymmetricKey'] = '  SymmetricKey = ComputeDerivedSymmetricKey(IOT__primary_key, IOT__device_name);';
        Blockly.Arduino.setups_['setup_registerDeviceToDPS'] = `
  while (WiFi.status() != WL_CONNECTED)
  {
    WiFi.begin(IOT_CONFIG_WIFI_SSID, IOT_CONFIG_WIFI_PASSWORD);
  }
  ntp.begin();
  int result= -1;
  while (result != 0)
  {
    result = registerDeviceToDPS(IOT_CONFIG_GLOBAL_DEVICE_ENDPOINT, IOT__ID_scope, IOT__device_name, SymmetricKey, ntp.epoch() + TOKEN_LIFESPAN, &HubHost, &DeviceId);
    ei_printf("registerDeviceToDPS result: %d\\n", result);
    if (result != 0)
    {
      ei_printf("Try again in 1 seconds\\n");
      delay(1000);
    }
  }`;
        let code = ``;
        return code;
    };

    Blockly.Arduino['azure_iot_wioterminal_azure_start'] = function (block) {
        Blockly.Arduino.definitions_['var_connectResult'] = 'int connectResult;';
        Blockly.Arduino.define_fun['func_connectToHub'] = `
static int connectToHub(az_iot_hub_client* iot_hub_client, const std::string& host, const std::string& deviceId, const std::string& symmetricKey, const uint64_t& expirationEpochTime)
{
  static std::string deviceIdCache;
  deviceIdCache = deviceId;
  const az_span hostSpan{ az_span_create((uint8_t*)&host[0], host.size()) };
  const az_span deviceIdSpan{ az_span_create((uint8_t*)&deviceIdCache[0], deviceIdCache.size()) };
  az_iot_hub_client_options options = az_iot_hub_client_options_default();
  options.model_id = AZ_SPAN_LITERAL_FROM_STR(IOT_CONFIG_MODEL_ID);
  if (az_result_failed(az_iot_hub_client_init(iot_hub_client, hostSpan, deviceIdSpan, &options))) return -1;
  char mqttClientId[128];
  size_t client_id_length;

  if (az_result_failed(az_iot_hub_client_get_client_id(iot_hub_client, mqttClientId, sizeof(mqttClientId), &client_id_length))) return -4;

  char mqttUsername[256];
  if (az_result_failed(az_iot_hub_client_get_user_name(iot_hub_client, mqttUsername, sizeof(mqttUsername), NULL))) return -5;

  char mqttPassword[300];
  uint8_t signatureBuf[256];
  az_span signatureSpan = az_span_create(signatureBuf, sizeof(signatureBuf));
  az_span signatureValidSpan;
  if (az_result_failed(az_iot_hub_client_sas_get_signature(iot_hub_client, expirationEpochTime, signatureSpan, &signatureValidSpan))) return -2;
  const std::vector<uint8_t> signature(az_span_ptr(signatureValidSpan), az_span_ptr(signatureValidSpan) + az_span_size(signatureValidSpan));
  const std::string encryptedSignature = GenerateEncryptedSignature(symmetricKey, signature);
  az_span encryptedSignatureSpan = az_span_create((uint8_t*)&encryptedSignature[0], encryptedSignature.size());
  if (az_result_failed(az_iot_hub_client_sas_get_password(iot_hub_client, expirationEpochTime, encryptedSignatureSpan, AZ_SPAN_EMPTY, mqttPassword, sizeof(mqttPassword), NULL))) return -3;

  mqtt_client.setServer(host.c_str(), 8883);

  if (!mqtt_client.connect(mqttClientId, mqttUsername, mqttPassword)) return -6;

  mqtt_client.subscribe(AZ_IOT_HUB_CLIENT_METHODS_SUBSCRIBE_TOPIC);
  mqtt_client.subscribe(AZ_IOT_HUB_CLIENT_C2D_SUBSCRIBE_TOPIC);
  return 0;
}`
        let code = 
`connectResult = connectToHub(&HubClient, HubHost, DeviceId, SymmetricKey, ntp.epoch() + TOKEN_LIFESPAN);\n
ei_printf("connectToHub result: %d\\n", connectResult);
`;
        return code;
    };

    Blockly.Arduino['azure_iot_wioterminal_azure_connected'] = function (block) {
        let code = `mqtt_client.connected()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino['azure_iot_wioterminal_azure_publish'] = function (block) {
        let model = block.getFieldValue('MODEL');
        Blockly.Arduino.define_fun['func_getLabelConfidence'] =       
`float getLabelConfidence(char *label)
{
  float value = 0;
  for (size_t ix = 0; ix < EI_CLASSIFIER_LABEL_COUNT; ix++) {
    ei_impulse_result_classification_t classification = currentClassification[ix];
    if (label == classification.label) {
      value = classification.value;
    }
  }
  return value;
}`              
        if (model == '0') {//人工鼻或者气味
          Blockly.Arduino.definitions_['include_MODEL_ID'] = '#define IOT_CONFIG_MODEL_ID         "dtmi:seeedkk:wioterminal:gas_model;1"';
          Blockly.Arduino.define_fun['func_sendTelemetry'] = `
static az_result sendTelemetry()
{
  int32_t VO2 = gas.getGM102B();
  int32_t NO2 = gas.getGM302B();
  int32_t C2H2OH = gas.getGM502B();
  int32_t CO2 = gas.getGM702B();

  char telemetry_topic[128];
  if (az_result_failed(az_iot_hub_client_telemetry_get_publish_topic(&HubClient, NULL, telemetry_topic, sizeof(telemetry_topic), NULL)))
  {
    return AZ_ERROR_NOT_SUPPORTED;
  }
  az_json_writer json_builder;
  char telemetry_payload[200];
  AZ_RETURN_IF_FAILED(az_json_writer_init(&json_builder, AZ_SPAN_FROM_BUFFER(telemetry_payload), NULL));
  AZ_RETURN_IF_FAILED(az_json_writer_append_begin_object(&json_builder));
  AZ_RETURN_IF_FAILED(az_json_writer_append_property_name(&json_builder, AZ_SPAN_LITERAL_FROM_STR("VO2")));
  AZ_RETURN_IF_FAILED(az_json_writer_append_double(&json_builder, VO2, 3));
  AZ_RETURN_IF_FAILED(az_json_writer_append_property_name(&json_builder, AZ_SPAN_LITERAL_FROM_STR("NO2")));
  AZ_RETURN_IF_FAILED(az_json_writer_append_double(&json_builder, NO2, 3));
  AZ_RETURN_IF_FAILED(az_json_writer_append_property_name(&json_builder, AZ_SPAN_LITERAL_FROM_STR("C2H2OH")));
  AZ_RETURN_IF_FAILED(az_json_writer_append_double(&json_builder, C2H2OH, 3));
  AZ_RETURN_IF_FAILED(az_json_writer_append_property_name(&json_builder, AZ_SPAN_LITERAL_FROM_STR("CO2")));
  AZ_RETURN_IF_FAILED(az_json_writer_append_double(&json_builder, CO2, 3));
  AZ_RETURN_IF_FAILED(az_json_writer_append_end_object(&json_builder));
  const az_span out_payload{ az_json_writer_get_bytes_used_in_destination(&json_builder) };

  mqtt_client.publish(telemetry_topic, az_span_ptr(out_payload), az_span_size(out_payload), false);
  return AZ_OK;
}`;
        } else if (model == '1') {//加速度计
          Blockly.Arduino.definitions_['include_MODEL_ID'] = '#define IOT_CONFIG_MODEL_ID         "dtmi:seeedkk:wioterminal:accelerometer_model;1"';
          Blockly.Arduino.define_fun['func_sendTelemetry'] = `
static az_result sendTelemetry()
{
  float accelX;
  float accelY;
  float accelZ;
  lis.getAcceleration(&accelX, &accelY, &accelZ);
  char telemetry_topic[128];
  if (az_result_failed(az_iot_hub_client_telemetry_get_publish_topic(&HubClient, NULL, telemetry_topic, sizeof(telemetry_topic), NULL)))
  {
    return AZ_ERROR_NOT_SUPPORTED;
  }
  az_json_writer json_builder;
  char telemetry_payload[200];
  AZ_RETURN_IF_FAILED(az_json_writer_init(&json_builder, AZ_SPAN_FROM_BUFFER(telemetry_payload), NULL));
  AZ_RETURN_IF_FAILED(az_json_writer_append_begin_object(&json_builder));
  AZ_RETURN_IF_FAILED(az_json_writer_append_property_name(&json_builder, AZ_SPAN_LITERAL_FROM_STR("accelX")));
  AZ_RETURN_IF_FAILED(az_json_writer_append_double(&json_builder, accelX, 3));
  AZ_RETURN_IF_FAILED(az_json_writer_append_property_name(&json_builder, AZ_SPAN_LITERAL_FROM_STR("accelY")));
  AZ_RETURN_IF_FAILED(az_json_writer_append_double(&json_builder, accelY, 3));
  AZ_RETURN_IF_FAILED(az_json_writer_append_property_name(&json_builder, AZ_SPAN_LITERAL_FROM_STR("accelZ")));
  AZ_RETURN_IF_FAILED(az_json_writer_append_double(&json_builder, accelZ, 3));
  AZ_RETURN_IF_FAILED(az_json_writer_append_end_object(&json_builder));
  const az_span out_payload{ az_json_writer_get_bytes_used_in_destination(&json_builder) };

  mqtt_client.publish(telemetry_topic, az_span_ptr(out_payload), az_span_size(out_payload), false);
  return AZ_OK;
}`;
        } 
        Blockly.Arduino.define_fun['func_sendProperty'] = `
static az_result sendProperty()
{
  char title_text[20] = "";
  float confidence = getLabelConfidence((char *)maxConfidenceLabel);
  sprintf(title_text,
              "%s (%d%%)",
              maxConfidenceLabel,
              (int)(confidence * 100));
  char telemetry_topic[128];
  if (az_result_failed(az_iot_hub_client_telemetry_get_publish_topic(&HubClient, NULL, telemetry_topic, sizeof(telemetry_topic), NULL)))
  {
    return AZ_ERROR_NOT_SUPPORTED;
  }
  if (az_result_failed(az_iot_hub_client_twin_patch_get_publish_topic(&HubClient, az_span_create_from_str("445"), telemetry_topic, sizeof(telemetry_topic), NULL)))
  {
    return AZ_ERROR_NOT_SUPPORTED;
  }
  az_json_writer json_builder;
  char telemetry_payload[200];
  AZ_RETURN_IF_FAILED(az_json_writer_init(&json_builder, AZ_SPAN_FROM_BUFFER(telemetry_payload), NULL));
  AZ_RETURN_IF_FAILED(az_json_writer_append_begin_object(&json_builder));
  AZ_RETURN_IF_FAILED(az_json_writer_append_property_name(&json_builder, AZ_SPAN_LITERAL_FROM_STR("Result")));
  AZ_RETURN_IF_FAILED(az_json_writer_append_string(&json_builder, az_span_create_from_str(title_text)));
  AZ_RETURN_IF_FAILED(az_json_writer_append_end_object(&json_builder));
  const az_span out_payload{ az_json_writer_get_bytes_used_in_destination(&json_builder) };

  mqtt_client.publish(telemetry_topic, az_span_ptr(out_payload), az_span_size(out_payload), false);
  return AZ_OK;
}`;        
        Blockly.Arduino.define_fun['func_azurePublish'] = `
void azurePublish()
{
  sendTelemetry();
  sendProperty();
}`
        let code = `azurePublish();\n`;
        return code;
    };

    Blockly.Arduino['azure_iot_wioterminal_runClassifier_artificial_nose'] = function (block) {
        Blockly.Arduino.definitions_['include_ei_inferencing'] = `#include <artificial_nose_inferencing.h>`;
        Blockly.Arduino.definitions_['include_gas'] = '#include <Multichannel_Gas_GMXXX.h>';
        Blockly.Arduino.definitions_['include_wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['var_gas'] = 'GAS_GMXXX<TwoWire> gas;';
        Blockly.Arduino.setups_['setup_gas'] = '  gas.begin(Wire, 0x08);';

        Blockly.Arduino.definitions_['var_result_classification'] = 'ei_impulse_result_classification_t currentClassification[EI_CLASSIFIER_LABEL_COUNT];';
        Blockly.Arduino.definitions_['var_max_confidence_label'] = 'const char* maxConfidenceLabel;';

        Blockly.Arduino.define_fun['func_runClassifier'] = `
void runClassifier()
{
  float buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE] = { 0 };
  for (size_t ix = 0; ix < EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE; ix += 4) {
    uint64_t next_tick = micros() + (EI_CLASSIFIER_INTERVAL_MS * 1000);
    buffer[ix + 0] = gas.getGM102B();
    buffer[ix + 1] = gas.getGM302B();
    buffer[ix + 2] = gas.getGM502B();
    buffer[ix + 3] = gas.getGM702B();

    delayMicroseconds(next_tick - micros());
  }
  signal_t signal;
  int err = numpy:: signal_from_buffer(buffer, EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE, &signal);
  ei_impulse_result_t result = { 0 };

  err = run_classifier(&signal, &result, false);
  float maxValue = 0;
  for (size_t ix = 0; ix < EI_CLASSIFIER_LABEL_COUNT; ix++) {
    ei_impulse_result_classification_t classification_t = result.classification[ix];
    ei_printf("    %s: %.5f\\n", classification_t.label, classification_t.value);
    float value = classification_t.value;
    if (value > maxValue) {
      maxValue = value;
      maxConfidenceLabel = classification_t.label;
    }
    currentClassification[ix] = classification_t;
  }
}`
        var code = `runClassifier();\n`;
        return code;
    };
    
}