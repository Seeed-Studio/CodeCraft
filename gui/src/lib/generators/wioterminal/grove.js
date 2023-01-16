export default (Blockly) => {

    Blockly.Arduino['grove_wioterminal_seeed_servo_move'] = function (block) {
        var value_degree = Blockly.Arduino.valueToCode(block, 'DEGREES', Blockly.Arduino.ORDER_NONE);
        var delay_time = Blockly.Arduino.valueToCode(block, 'DELAY_TIME', Blockly.Arduino.ORDER_NONE) || '0';
        Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
        Blockly.Arduino.definitions_['var_servo'] = 'Servo servo;';
        Blockly.Arduino.setups_['setup_servo'] = '  servo.attach(0);';
        var code = 'servo.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
        return code;
    }

    Blockly.Arduino['grove_wioterminal_seeed_rgb_led'] = function (block) {
        var num = block.getFieldValue('NUM');
        var color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
        var r = `0x${color[2]}${color[3]}`;
        var g = `0x${color[4]}${color[5]}`;
        var b = `0x${color[6]}${color[7]}`;
        
        Blockly.Arduino.definitions_['include_chainable_led'] = '#include <ChainableLED.h>';
        Blockly.Arduino.definitions_[`var_led`] = `ChainableLED led(0, 1, 10);`;
        var code = `led.setColorRGB(${num},${r},${g},${b});\n`;
        return code;
    }

    Blockly.Arduino['grove_wioterminal_seeed_mini_fan'] = function (block) {
        var dropdownStat = block.getFieldValue('STAT');
        Blockly.Arduino.setups_['setup_output_fan'] = '  pinMode(0, OUTPUT);';
        var code = 'digitalWrite(0,' + dropdownStat + ');\n'
        return code;
    }

    Blockly.Arduino['grove_wioterminal_seeed_line_finder'] = function (block) {
        Blockly.Arduino.setups_['setup_input_line'] = '  pinMode(0, INPUT);';
        var code = '!digitalRead(0)';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    //超声波
    Blockly.Arduino['grove_wioterminal_seeed_ult'] = function (block) {
        Blockly.Arduino.definitions_['include_ultrasonic'] = '#include <Ultrasonic.h>';
        Blockly.Arduino.definitions_[`var_ult`] = `Ultrasonic ult(0);`;
        var code = `(long)ult.MeasureInCentimeters()`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['grove_wioterminal_seeed_pir_motion'] = function (block) {
        Blockly.Arduino.setups_['setup_input_pir'] = '  pinMode(0, INPUT);';
        var code = 'digitalRead(0)';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    //温湿度dht11
    Blockly.Arduino['grove_wioterminal_seeed_temperature_humidity'] = function (block) {
        var th = block.getFieldValue('TH');
        Blockly.Arduino.definitions_['include_DHT'] = '#include "DHT.h"';
        Blockly.Arduino.definitions_['var_DHTTYPE_11'] = '#define DHTTYPE11 DHT11';
        Blockly.Arduino.definitions_['var_DHTPIN'] = '#define DHTPIN 0';
        Blockly.Arduino.definitions_[`var_DHT_11`] = `DHT dht11(DHTPIN, DHTTYPE11);`;
        Blockly.Arduino.setups_['setup_dht_11_begin'] = '  dht11.begin();';
        var code = "";
        if (th == '0') {
            code = `dht11.readTemperature()`;
        } else {
            code = `dht11.readHumidity()`;
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    //温湿度dht20
    Blockly.Arduino['grove_wioterminal_seeed_temperature_humidity_dht20'] = function (block) {
        var th = block.getFieldValue('TH');
        Blockly.Arduino.definitions_['include_DHT'] = '#include "DHT.h"';
        Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['var_DHTTYPE_20'] = '#define DHTTYPE20 DHT20';
        Blockly.Arduino.definitions_[`var_DHT_20`] = `DHT dht20(DHTTYPE20);`;
        Blockly.Arduino.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.Arduino.setups_['setup_dht_20_begin'] = '  dht20.begin();';
        var code = "";
        if (th == '0') {
            code = `dht20.readTemperature()`;
        } else {
            code = `dht20.readHumidity()`;
        }
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['grove_wioterminal_seeed_water_analog'] = function (block) {
        Blockly.Arduino.setups_['setup_analog'] = '  pinMode(A0, 2);';
        var code = 'analogRead(A0)';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['grove_wioterminal_rtc_setdatetime'] = function (block) {
        Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_DS1307'] = '#include <DS1307.h>';
        Blockly.Arduino.definitions_['var_DS1307'] = 'DS1307 clock;';
        var year = Blockly.Arduino.valueToCode(block, 'YEAR', Blockly.Arduino.ORDER_ATOMIC) || '2020';
        var month = Blockly.Arduino.valueToCode(block, 'MONTH', Blockly.Arduino.ORDER_ATOMIC) || '00';
        var day = Blockly.Arduino.valueToCode(block, 'DAY', Blockly.Arduino.ORDER_ATOMIC) || '00';
        var hour = Blockly.Arduino.valueToCode(block, 'HOUR', Blockly.Arduino.ORDER_ATOMIC) || '12';
        var minute = Blockly.Arduino.valueToCode(block, 'MINUTE', Blockly.Arduino.ORDER_ATOMIC) || '00';
        var second = Blockly.Arduino.valueToCode(block, 'SECOND', Blockly.Arduino.ORDER_ATOMIC) || '00';
        var code = [
            'clock.begin();',
            `clock.fillByYMD(${year}, ${month}, ${day});`,
            `clock.fillByHMS(${hour}, ${minute}, ${second});`,
            'clock.setTime();'
        ]
        return code.join('\n') + '\n';
    }

    Blockly.Arduino['grove_wioterminal_rtc_getdate'] = function (block) {
        Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_DS1307'] = '#include <DS1307.h>';
        Blockly.Arduino.definitions_['var_DS1307'] = 'DS1307 clock;';
        Blockly.Arduino.definitions_['var_getDate'] =
            'String getYMDTime()\n' +
            '{\n' +
            '  String year, month, day, ymd;\n' +
            '  clock.getTime();\n' +
            '  year = String(clock.year+2000);\n' +
            '  month = String(clock.month);\n' +
            '  day = String(clock.dayOfMonth);\n' +
            '  ymd = year + "/" + month  + "/" + day;\n' +
            '  return ymd;\n' +
            '}\n';
        return ['getYMDTime()', Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['grove_wioterminal_rtc_gettime'] = function (block) {
        Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
        Blockly.Arduino.definitions_['include_DS1307'] = '#include <DS1307.h>';
        Blockly.Arduino.definitions_['var_DS1307'] = 'DS1307 clock;';
        Blockly.Arduino.definitions_['var_getTime'] =
            'String getHMMTime()\n' +
            '{\n' +
            '  clock.getTime();\n' +
            '  String hour, minute, second, hmm;\n' +
            '  clock.getTime();\n' +
            '  hour = String(clock.hour);\n' +
            '  minute = String(clock.minute);\n' +
            '  second = String(clock.second);\n' +
            '  hmm = hour + ":" + minute  + ":" + second;\n' +
            '  return hmm;\n' +
            '}\n';
        return ['getHMMTime()', Blockly.Arduino.ORDER_ATOMIC];
    }
}