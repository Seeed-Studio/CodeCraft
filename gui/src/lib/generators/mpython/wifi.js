export default Blockly => {

  Blockly.MPython['motion_mpython_wifi_connect'] = function (block) {
    Blockly.MPython.definitions_['import_network'] = 'import network';
    Blockly.MPython.definitions_[`var_wifi`] = `my_wifi = wifi()`;
    var wifi = Blockly.MPython.valueToCode(block, 'WIFI', Blockly.MPython.ORDER_ATOMIC) || '';
    var ps = Blockly.MPython.valueToCode(block, 'PASSWORD', Blockly.MPython.ORDER_ATOMIC) || '';
    return `my_wifi.connectWiFi(${wifi}, ${ps}) \n`;
  }

  Blockly.MPython['motion_mpython_wifi_disconnect'] = function (block) {
    Blockly.MPython.definitions_['import_network'] = 'import network';
    Blockly.MPython.definitions_[`var_wifi`] = `my_wifi = wifi()`;
    return `my_wifi.disconnectWiFi() \n`;
  }

  Blockly.MPython['motion_mpython_wifi_connected'] = function (block) {
    Blockly.MPython.definitions_['import_network'] = 'import network';
    return [`my_wifi.sta.isconnected()`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['motion_mpython_wifi_all_conf'] = function (block) {
    Blockly.MPython.definitions_['import_network'] = 'import network';
    return [`my_wifi.sta.ifconfig()`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['motion_mpython_wifi_conf_mes'] = function (block) {
    Blockly.MPython.definitions_['import_network'] = 'import network';
    var k = block.getFieldValue('KEY');
    return [`my_wifi.sta.ifconfig()[${k}]`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['motion_mpython_open_ap_mode'] = function (block) {
    Blockly.MPython.definitions_['import_network'] = 'import network';
    Blockly.MPython.definitions_[`var_wifi`] = `my_wifi = wifi()`;
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC) || '';
    var channel = Blockly.MPython.valueToCode(block, 'CHANNEL', Blockly.MPython.ORDER_ATOMIC) || '';
    return `my_wifi.enable_APWiFi(${name}, ${channel}) \n`;
  }

  Blockly.MPython['motion_mpython_close_ap_mode'] = function (block) {
    Blockly.MPython.definitions_['import_network'] = 'import network';
    Blockly.MPython.definitions_[`var_wifi`] = `my_wifi = wifi()`;
    return `my_wifi.disable_APWiFi() \n`;
  }

  Blockly.MPython['motion_mpython_sync_network_time'] = function (block) {
    Blockly.MPython.definitions_['import_network'] = 'import network';
    Blockly.MPython.definitions_['import_ntptime'] = 'import ntptime';
    var zone = block.getFieldValue('ZONE');
    var server = Blockly.MPython.valueToCode(block, 'SERVER', Blockly.MPython.ORDER_ATOMIC) || '';
    return `ntptime.settime(${zone}, ${server}) \n`;
  }


}
