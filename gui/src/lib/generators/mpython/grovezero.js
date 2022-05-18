const miniwheelVelocityToKey = (velocity) => {
  let key = 0;
  switch (velocity) {
    case 'low': key = 120; break;
    case 'medium': key = 200; break;
    case 'high': key = 255; break;
  }
  return key;
}

const miniwheelAzimuthToKey = (azimuth) => {
  let key = 0;
  switch (azimuth) {
    case 'forward': key = 1; break;
    case 'backward': key = 2; break;
    case 'left': key = 3; break;
    case 'right': key = 4; break;
    case 'clockwise': key = 5; break;
    case 'counterclockwise': key = 6; break;
  }
  return key;
}

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
  Blockly.MPython['motion_mpython_g0_miniwheel_run_velocity_azimuth'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';    
    var velocity = block.getFieldValue('VELOCITY');
    var azimuth = block.getFieldValue('AZIMUTH');
    velocity = miniwheelVelocityToKey(velocity);
    azimuth = miniwheelAzimuthToKey(azimuth);
    return `setMotormoduleAction(${azimuth}, ${velocity}) \n`;
  }

  Blockly.MPython['motion_mpython_g0_miniwheel_stop'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';    
    return `stopMotormodule() \n`;
  }

  Blockly.MPython['motion_mpython_g0_miniwheel_set_power'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';    
    let left = Math.round(Blockly.MPython.valueToCode(block, 'LEFT_POWER', Blockly.MPython.ORDER_NONE) * 2.25);
    let right = Math.round(Blockly.MPython.valueToCode(block, 'RIGHT_POWER', Blockly.MPython.ORDER_NONE) * 2.25);
    return `setMotormoduleSpeed(${left},${right}) \n`;
  }

  Blockly.MPython['motion_mpython_g0_color_line_follower_position'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    var position = block.getFieldValue('POSITION');
    return [`wasLinePositionTriggered(${position})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['motion_mpython_g0_color_line_follower_seeing'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    var color = block.getFieldValue('COLOR');
    return [`wasColorTriggered(${color})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['motion_mpython_g0_color_line_follower_color'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    return [`getColor()`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['motion_mpython_g0_servo_turn_angle'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    var angle = Blockly.MPython.valueToCode(block, 'ANGLE', Blockly.MPython.ORDER_ATOMIC) || 0;
    return `set_servo_module_degree(${angle}) \n`;
  }

  Blockly.MPython['motion_mpython_g0_dc_motor_trun_power'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    var power = Blockly.MPython.valueToCode(block, 'POWER', Blockly.MPython.ORDER_ATOMIC) || 0;
    var motor = block.getFieldValue('MOTOR_NO');
    return `set_DC_Moter_power(${motor}, ${power}) \n`;
  }

  Blockly.MPython['motion_mpython_g0_dc_motor_stop'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    var motor = block.getFieldValue('MOTOR_NO');
    return `set_DC_Moter_power(${motor}, 0) \n`;
  }

  Blockly.MPython['sensing_mpython_g0_twin_button_is_pressed'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = block.getFieldValue('I2C');
    let key = block.getFieldValue('KEY');
    return [`get_twin_button(${i2c},${key})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_mech_key_is_pressed'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = block.getFieldValue('I2C');
    return [`Mech_Key_pressed(${i2c})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_mech_key_set_rgb'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = block.getFieldValue('I2C');
    var rgbHex = Blockly.MPython.valueToCode(block, 'COLOR', Blockly.MPython.ORDER_ATOMIC) || 0;
    var rgb = hexToRgb(rgbHex);
    return `MechKey_ColorSet(${i2c}, ${rgb.r}, ${rgb.g}, ${rgb.b}) \n`;
  }

  Blockly.MPython['sensing_mpython_g0_mech_key_close'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = block.getFieldValue('I2C');
    return `MechKey_ColorSetoff(${i2c}) \n`;
  }

  Blockly.MPython['sensing_mpython_g0_touchpad_is_pressed'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = block.getFieldValue('I2C');
    let opt = block.getFieldValue('NUM_OPT');
    return [`Touchpad_pressed(${i2c},${opt})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_light_sensor_get_value'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    return [`Light_Sensor_light_level()`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_sound_sensor_get_value'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    return [`Sound_Sensor_sound_level()`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_temperature_sensor_get_value'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let unit = block.getFieldValue('UNIT');
    return [`get_temperture_value(${unit})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_imu9_dof_get_value'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let direct = block.getFieldValue('DIRECT');
    return [`axis_motion_Sensor(${direct})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_slider_get_value'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = block.getFieldValue('I2C');
    return [`get_slider_value(${i2c})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_ultrasonic_sensor_get_value'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    return [`get_Ultrasonic_distance()`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_temhum_sensor_get_tem_value'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let unit = block.getFieldValue('UNIT');
    return [`Temperature_Humidity_Sensor_value(${unit})`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['sensing_mpython_g0_temhum_sensor_get_hum_value'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    return [`Humidity_Sensor_percent()`, Blockly.MPython.ORDER_ATOMIC];
  }

  Blockly.MPython['looks_mpython_g0_rgb_matrix_show_shape'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = parseInt(block.getFieldValue('I2C')) - 1;
    let shape = block.getFieldValue('SHAPE');
    let matrix = JSON.parse(shape);
    // 获取默认图案编号
    let emoji_number = matrix.emoji_number;
    return `RGBLedMatrix_DisplayEmoji(${i2c},${emoji_number}) \n`;
  }

  Blockly.MPython['looks_mpython_g0_rgb_matrix_show_string'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = parseInt(block.getFieldValue('I2C')) - 1;
    let textColor = block.getFieldValue('COLOR');
    let text = Blockly.MPython.valueToCode(block, 'STRING', Blockly.MPython.ORDER_ATOMIC);
    let color = parseInt(textColor);
    return `RGBLedMatrix_DisplayStr(${i2c}, ${text},${color}) \n`;
  }

  Blockly.MPython['looks_mpython_g0_rgb_matrix_show_anima'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = parseInt(block.getFieldValue('I2C')) - 1;
    let arg = block.getFieldValue('ANIMA');
    return `RGBLedMatrix_DisplayGif(${i2c}, ${arg}) \n`;
  }

  Blockly.MPython['looks_mpython_g0_rgb_matrix_show_histogram'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = parseInt(block.getFieldValue('I2C')) - 1;
    let value = Blockly.MPython.valueToCode(block, 'VALUE', Blockly.MPython.ORDER_ATOMIC);
    return `RGBLedMatrix_DisplayColorBar(${i2c}, ${value}) \n`;
  }

  Blockly.MPython['looks_mpython_g0_rgb_matrix_xy_set_on'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = parseInt(block.getFieldValue('I2C')) - 1;
    let x = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC);
    let y = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC);
    let color = block.getFieldValue('COLOR');
    return `RGBLedMatrix_DisplaySet(${i2c}, ${x}, ${y}, ${color}) \n`;    
  }

  Blockly.MPython['looks_mpython_g0_rgb_matrix_xy_set_off'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = parseInt(block.getFieldValue('I2C')) - 1;
    let x = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC);
    let y = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC);
    return `RGBLedMatrix_Displaysetoff(${i2c}, ${x}, ${y}) \n`;    
  }

  Blockly.MPython['looks_mpython_g0_rgb_matrix_xy_set_on_off'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = parseInt(block.getFieldValue('I2C')) - 1;
    let x = Blockly.MPython.valueToCode(block, 'Y', Blockly.MPython.ORDER_ATOMIC);
    let y = Blockly.MPython.valueToCode(block, 'X', Blockly.MPython.ORDER_ATOMIC);
    let color = block.getFieldValue('COLOR');
    return `RGBLedMatrix_Displayswitch(${i2c}, ${x}, ${y}, ${color}) \n`;    
  }

  Blockly.MPython['sensing_mpython_g0_rgb_matrix_clean'] = function (block) {
    Blockly.MPython.definitions_['import_grovezero'] = 'from grovezero import * ';
    let i2c = parseInt(block.getFieldValue('I2C')) - 1;
    return `RGBLedMatrix_DisplayOff(${i2c}) \n`;    
  }

}

