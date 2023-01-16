export default Blockly => {

  Blockly.MPython['motion_mpython_radio_action'] = function (block) {
    Blockly.MPython.definitions_['import_radio'] = 'import radio';
    var action = block.getFieldValue('ACTION');
    return `radio.${action}() \n`;
  }

  Blockly.MPython['motion_mpython_set_radio_channel'] = function (block) {
    Blockly.MPython.definitions_['import_radio'] = 'import radio';
    var channel = Blockly.MPython.valueToCode(block, 'CHANNEL', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `radio.config(channel=${channel}) \n`;
  }

  Blockly.MPython['motion_mpython_set_radio_send_mes'] = function (block) {
    Blockly.MPython.definitions_['import_radio'] = 'import radio';
    var mes = Blockly.MPython.valueToCode(block, 'MES', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `radio.send(${mes}) \n`;
  }

  Blockly.MPython['motion_mpython_get_radio_mes'] = function (block) {
    Blockly.MPython.definitions_['import_radio'] = 'import radio';
    return [`radio.receive()`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['motion_mpython_when_get_radio_mes_action'] = function (block) {
    Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
    Blockly.MPython.definitions_['import_radio'] = 'import radio';
    Blockly.MPython.definitions_['import_ubinascii'] = 'import ubinascii';

    
    // var substack = Blockly.MPython.statementToCode(block, 'SUBSTACK');
    // var v = Blockly.MPython.variableDB_.getName(block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);
    // var code = [
    //     `def radio_recv(_msg):\n` +
    //     `${substack}`
    // ]   
    // Blockly.MPython.definitions_[`var_radio_msg_list`] =
    // "_radio_msg_list = []\n" +
    // "def radio_callback(_msg):\n" +
    // "    global _radio_msg_list\n" +
    // "    radio_recv(_msg)\n" +
    // "    if _msg in _radio_msg_list:\n" +
    // "        eval('radio_recv_' + bytes.decode(ubinascii.hexlify(_msg)) + '()')\n" +
    // "\n" +
    // "tim13 = Timer(13)\n" +
    // "\n" +
    // "def timer13_tick(_):\n" +
    // "    _msg = radio.receive()\n" +
    // "    if not _msg: return\n" +
    // "    radio_callback(_msg)\n" +
    // "\n" +
    // "tim13.init(period=20, mode=Timer.PERIODIC, callback=timer13_tick)\n"
    // return code.join('\n');
    Blockly.MPython.definitions_[`var_radio_msg_list`] =
    "_radio_msg_list = []\n" +
    "def radio_callback(_msg):\n" +
    "    global _radio_msg_list\n" +
    "    if _msg in _radio_msg_list:\n" +
    "        eval('radio_recv_' + bytes.decode(ubinascii.hexlify(_msg)) + '()')\n" +
    "\n" +
    "tim13 = Timer(13)\n" +
    "\n" +
    "def timer13_tick(_):\n" +
    "    _msg = radio.receive()\n" +
    "    if not _msg: return\n" +
    "    radio_callback(_msg)\n" +
    "\n" +
    "tim13.init(period=20, mode=Timer.PERIODIC, callback=timer13_tick)\n"

    var funcName = Blockly.MPython.variableDB_.getDistinctName(`radio_recv(_msg)`, Blockly.Variables.NAME_TYPE);
    Blockly.MPython.initfuncs_[`attach_${funcName}`] = `button_${mode}.irq(trigger=Pin.IRQ_${trigger}, handler=on_button_${mode}_${action})`;
    return `def ${funcName}(_):\n`;

    return '\n';
  }

  Blockly.MPython['motion_mpython_when_get_special_radio_mes_action'] = function (block) {

    var message = Blockly.MPython.valueToCode(block, 'MES', Blockly.MPython.ORDER_ATOMIC);
    var processMessage = message.replace("\"","").replace("\"","")

    // Blockly.MPython.definitions_['import_timer'] = 'from machine import Timer';
    // Blockly.MPython.definitions_['import_radio'] = 'import radio';
    // Blockly.MPython.definitions_['import_ubinascii'] = 'import ubinascii';

    // Blockly.MPython.definitions_['var_radio_recv_ON'] = `def radio_recv_ON():\n    print('我收到消息了')\n`;

    // Blockly.MPython.definitions_['var_radio_msg_list'] = '_radio_msg_list = []';
    // Blockly.MPython.definitions_[`var_append${message}`] = `_radio_msg_list.append(${message})`;

    // Blockly.MPython.definitions_['var_radio_callback'] =
    //     "def radio_callback(_msg):\n" +
    //     "    print(_msg)\n" +
    //     "    global _radio_msg_list\n" +
    //     "    if _msg in _radio_msg_list:\n" +
    //     "        print('radio_recv_' + _msg + '()')\n";
    //     "        eval('radio_recv_' + _msg + '()')\n";

    // Blockly.MPython.definitions_['var_timer13_tick(_)'] =
    //     "def timer13_tick(_):\n" +
    //     "    print('timer13_tick-----')\n" +
    //     "    _msg = radio.receive()\n" +
    //     "    if not _msg: return\n" +
    //     "    radio_callback(_msg)\n";

    // Blockly.MPython.definitions_[`var_inittimer`] = `tim13 = Timer(13)\ntim13.init(period=20, mode=Timer.PERIODIC, callback=timer13_tick)`;

    // // var code = "def radio_recv_Onm" + message + "():\n    pass";
    // // return code;

    Blockly.MPython.functionNames_["get_mes_${mes}"] = {
      condition: `radio.receive() == ${message}`,
      callback: `radio_recv_${processMessage}`
    }

    return `def radio_recv_${processMessage}():\n    pass\n`;


      // Blockly.MPython.definitions_['var_radio_msg_list'] = '_radio_msg_list = []';
      // Blockly.MPython.definitions_['var_radio_callback'] =
      //     "def radio_callback(_msg):\n" +
      //     "    global _radio_msg_list\n" +
      //     "    if _msg in _radio_msg_list\n" +
      //     "        eval('radio_recv_' + _msg + '()')\n";
      // Blockly.MPython.definitions_['var_timer13_tick(_)'] =
      //     "def timer13_tick(_):\n" +
      //     "    _msg = radio.receive()\n" +
      //     "    if not _msg: return\n" +
      //     "    radio_callback(_msg)\n";

      // Blockly.MPython.definitions_[`var_inittimer`] = `tim13 = Timer(13)\ntim13.init(period=20, mode=Timer.PERIODIC, callback=timer13_tick)`;

      // var substack = Blockly.MPython.statementToCode(block, 'SUBSTACK') || "pass";
      // var message = Blockly.MPython.valueToCode(block, 'MES', Blockly.MPython.ORDER_ATOMIC);

      // return `def ${message}():\n${substack}`;


      // Blockly.MPython.definitions_[`var_radio_msg_list`] =
      // "_radio_msg_list = []\n" +
      // "def radio_callback(_msg):\n" +
      // "    global _radio_msg_list\n" +
      // "    radio_recv(_msg)\n" +
      // "    if _msg in _radio_msg_list:\n" +
      // "        eval('radio_recv_' + bytes.decode(ubinascii.hexlify(_msg)) + '()')\n" +
      // "\n" +
      // "tim13 = Timer(13)\n" +
      // "\n" +
      // "def timer13_tick(_):\n" +
      // "    _msg = radio.receive()\n" +
      // "   if not _msg: return\n" +
      // "    radio_callback(_msg)\n" +
      // "\n" +
      // "tim13.init(period=20, mode=Timer.PERIODIC, callback=timer13_tick)\n"
      // Blockly.MPython.definitions_[`var_${mes}`] = `_radio_msg_list.append('${mes}')`;
      // Blockly.MPython.definitions_[`var_ubinascii`] = `aaa = bytes.decode(ubinascii.hexlify(msg))`;
      // var code = [
      //     `def radio_recv_${mes}():\n` +
      //     `${substack}`
      // ]
  }

}
