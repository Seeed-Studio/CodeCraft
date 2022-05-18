const hexToRgb = (hex) => {
  hex = hex.replace(/\"/g, '');
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

export default Blockly => {

  Blockly.MPython['motion_mpython_neopixel_init'] = function (block) {
    Blockly.MPython.definitions_['import_neopixel'] = 'import neopixel';
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
    var n = Blockly.MPython.valueToCode(block, 'NUM', Blockly.MPython.ORDER_ATOMIC) || '';
    var pin = block.getFieldValue('PIN');
    return `${name} = neopixel.NeoPixel(Pin(Pin.P${pin}), n=${n}, bpp=3, timing=1) \n`;
  }

  Blockly.MPython['motion_mpython_neopixel_channel_color'] = function (block) {
    Blockly.MPython.definitions_['import_neopixel'] = 'import neopixel';
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
    var n = Blockly.MPython.valueToCode(block, 'NUM', Blockly.MPython.ORDER_ATOMIC);
    var rgbHex = Blockly.MPython.valueToCode(block, 'COLOR', Blockly.MPython.ORDER_NONE) || 0;
    var rgb = rgbHex!=0 && hexToRgb(rgbHex);
    return `${name}[${n}] = (${rgb.r}, ${rgb.g}, ${rgb.b}) \n`;
  }

  Blockly.MPython['motion_mpython_neopixel_channel_rgb'] = function (block) {
    Blockly.MPython.definitions_['import_neopixel'] = 'import neopixel';
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
    var n = Blockly.MPython.valueToCode(block, 'NUM', Blockly.MPython.ORDER_ATOMIC);
    var r = Blockly.MPython.valueToCode(block, 'R', Blockly.MPython.ORDER_ATOMIC);
    var g = Blockly.MPython.valueToCode(block, 'G', Blockly.MPython.ORDER_ATOMIC);
    var b = Blockly.MPython.valueToCode(block, 'B', Blockly.MPython.ORDER_ATOMIC);
    return `${name}[${n}] = (${r}, ${g}, ${b}) \n`;
  }

  Blockly.MPython['motion_mpython_neopixel_full_light_color'] = function (block) {
    Blockly.MPython.definitions_['import_neopixel'] = 'import neopixel';
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
    var rgbHex = Blockly.MPython.valueToCode(block, 'COLOR', Blockly.MPython.ORDER_NONE) || 0;
    var rgb = rgbHex!=0 && hexToRgb(rgbHex);
    return `${name}.fill( (${rgb.r}, ${rgb.g}, ${rgb.b}) ) \n`;
  }

  Blockly.MPython['motion_mpython_neopixel_full_light_rgb'] = function (block) {
    Blockly.MPython.definitions_['import_neopixel'] = 'import neopixel';
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
    var r = Blockly.MPython.valueToCode(block, 'R', Blockly.MPython.ORDER_ATOMIC);
    var g = Blockly.MPython.valueToCode(block, 'G', Blockly.MPython.ORDER_ATOMIC);
    var b = Blockly.MPython.valueToCode(block, 'B', Blockly.MPython.ORDER_ATOMIC);
    return `${name}.fill( (${r}, ${g}, ${b}) ) \n`;
  }

  Blockly.MPython['motion_mpython_neopixel_close'] = function (block) {
    Blockly.MPython.definitions_['import_neopixel'] = 'import neopixel';
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
    return `${name}.fill( (0, 0, 0) ) \n`;
  }

  Blockly.MPython['motion_mpython_neopixel_rainbow_light_effect'] = function (block) {
    Blockly.MPython.definitions_['import_neopixel'] = 'import neopixel';
    Blockly.MPython.definitions_['var_displayfontfunc'] =
    "def make_rainbow(_neopixel, _num, _bright, _offset):\n" +
    "    _rgb = ((255,0,0), (255,127,0), (255,255,0), (0,255,0), (0,255,255), (0,0,255), (136,0,255), (255,0,0))\n" +
    "    for i in range(_num):\n" +
    "        t = 7 * i / _num\n" +
    "        t0 = int(t)\n" +
    "        r = round((_rgb[t0][0] + (t-t0)*(_rgb[t0+1][0]-_rgb[t0][0]))*_bright)>>8\n" +
    "        g = round((_rgb[t0][1] + (t-t0)*(_rgb[t0+1][1]-_rgb[t0][1]))*_bright)>>8\n" +
    "        b = round((_rgb[t0][2] + (t-t0)*(_rgb[t0+1][2]-_rgb[t0][2]))*_bright)>>8\n" +
    "        _neopixel[(i + _offset) % _num] = (r, g, b)\n"
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
    var n = Blockly.MPython.valueToCode(block, 'NUM', Blockly.MPython.ORDER_ATOMIC);
    var light = Blockly.MPython.valueToCode(block, 'LIGHT', Blockly.MPython.ORDER_ATOMIC);
    var offset = Blockly.MPython.valueToCode(block, 'OFFSET', Blockly.MPython.ORDER_ATOMIC);
    return `make_rainbow(${name}, ${n}, ${light}, ${offset}) \n`;
  }

  Blockly.MPython['motion_mpython_set_write'] = function (block) {
    Blockly.MPython.definitions_['import_neopixel'] = 'import neopixel';
    var name = Blockly.MPython.valueToCode(block, 'NAME', Blockly.MPython.ORDER_ATOMIC).replace("\"","").replace("\"","");
    return `${name}.write() \n`;
  }
}
