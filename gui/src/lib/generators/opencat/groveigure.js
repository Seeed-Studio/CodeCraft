export default Blockly => {
    
    Blockly.ArduinoOpenCat['motion_opencat_seeed_led'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var dropdownStat = block.getFieldValue('STAT');
        Blockly.ArduinoOpenCat.setups_['setup_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
        var code = 'digitalWrite(' + pin + ',' + dropdownStat + ');\n'
        return code;
    };

    //WS2813 Mini 彩灯/灯条
    Blockly.ArduinoOpenCat['motion_opencat_seeed_rgb_led_mini'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var num = block.getFieldValue('NUM');

        var r = Blockly.ArduinoOpenCat.valueToCode(block, 'R', Blockly.ArduinoOpenCat.ORDER_NONE);
        var g = Blockly.ArduinoOpenCat.valueToCode(block, 'G', Blockly.ArduinoOpenCat.ORDER_NONE);
        var b = Blockly.ArduinoOpenCat.valueToCode(block, 'B', Blockly.ArduinoOpenCat.ORDER_NONE);

        Blockly.ArduinoOpenCat.definitions_['include_NeoPixel'] = '#include "Adafruit_NeoPixel.h"';
        Blockly.ArduinoOpenCat.definitions_[`var_NUM_LEDS`] = `#define NUM_LEDS 10`;
        Blockly.ArduinoOpenCat.definitions_[`var_PIN_${pin}`] = `#define PIN_${pin} ${pin}`;
        Blockly.ArduinoOpenCat.definitions_[`var_pixels_${pin}`] = `Adafruit_NeoPixel pixels_${pin} = Adafruit_NeoPixel(NUM_LEDS, PIN_${pin}, NEO_GRB + NEO_KHZ800);`;

        Blockly.ArduinoOpenCat.setups_[`setup_neopixel_setBrightness_${pin}`] = `  pixels_${pin}.setBrightness(255);`;
        Blockly.ArduinoOpenCat.setups_[`setup_neopixel_${pin}`] = `  pixels_${pin}.begin();`;
        var code = `pixels_${pin}.setPixelColor(${num-1}, pixels_${pin}.Color(${r},${g},${b}));\n`;
        code += `pixels_${pin}.show();\n`;
        return code;
    }

    Blockly.ArduinoOpenCat['motion_opencat_seeed_btn'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = 'digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_tilt'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = 'digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_touch'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = 'digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_vibration'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = '!digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_water'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = '!digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_line_finder'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = '!digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_ult'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.definitions_['include_ultrasonic'] = '#include <Ultrasonic.h>';
        Blockly.ArduinoOpenCat.definitions_[`var_ult${pin}`] = `Ultrasonic ult${pin}(${pin});`;
        var code = `(long)ult${pin}.MeasureInCentimeters()`;
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_magnetic_switch'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = 'digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_pir_motion'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = 'digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_collision'] = function (block) {
        Blockly.ArduinoOpenCat.definitions_['include_collision'] = '#include <Seeed_Collision.h>';
        var pin = block.getFieldValue('PIN');
        return ['isTriggered(' + pin + ')', Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_hall'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = 'digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    //温湿度dht11
    Blockly.ArduinoOpenCat['motion_opencat_seeed_temperature_humidity'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var th = block.getFieldValue('TH');
        Blockly.ArduinoOpenCat.definitions_['include_DHT'] = '#include "DHT.h"';
        Blockly.ArduinoOpenCat.definitions_['var_DHTTYPE_11'] = '#define DHTTYPE11 DHT11';
        Blockly.ArduinoOpenCat.definitions_[`var_DHTPIN`] = `#define DHTPIN ${pin}`;
        Blockly.ArduinoOpenCat.definitions_[`var_DHT_11`] = `DHT dht11(DHTPIN, DHTTYPE11);`;
        Blockly.ArduinoOpenCat.setups_['setup_dht_11_begin'] = '  dht11.begin();';
        var code = "";
        if (th == '0') {
            code = `dht11.readTemperature()`;
        } else {
            code = `dht11.readHumidity()`;
        }
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };
    //温湿度dht20
    Blockly.ArduinoOpenCat['motion_opencat_seeed_temperature_humidity_dht20'] = function (block) {
        var th = block.getFieldValue('TH');
        Blockly.ArduinoOpenCat.definitions_['include_DHT'] = '#include "DHT.h"';
        Blockly.ArduinoOpenCat.definitions_['include_Wire'] = '#include "Wire.h"';
        Blockly.ArduinoOpenCat.definitions_['var_DHTTYPE_20'] = '#define DHTTYPE20 DHT20';
        Blockly.ArduinoOpenCat.definitions_[`var_DHT_20`] = `DHT dht20(DHTTYPE20);`;
        Blockly.ArduinoOpenCat.setups_['setup_i2c'] = '  Wire.begin();';
        Blockly.ArduinoOpenCat.setups_['setup_dht_20_begin'] = '  dht20.begin();';
        var code = "";
        if (th == '0') {
            code = `dht20.readTemperature()`;
        } else {
            code = `dht20.readHumidity()`;
        }
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_flame'] = function (block) {
        var pin = block.getFieldValue('PIN');
        Blockly.ArduinoOpenCat.setups_['setup_input_' + pin] = 'pinMode(' + pin + ', INPUT);';
        var code = '!digitalRead(' + pin + ')';
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_4digit_display'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var num = Blockly.ArduinoOpenCat.valueToCode(block, 'NUM', Blockly.ArduinoOpenCat.ORDER_NONE);
        var pins = ['2', '3'];
        switch (pin) {
            case '2': pins = ['2', '3']; break;
            case '3': pins = ['3', '4']; break;
            case '4': pins = ['4', '5']; break;
            case '5': pins = ['5', '6']; break;
            case '6': pins = ['6', '7']; break;
            case '7': pins = ['7', '8']; break;
            case '8': pins = ['8', '9']; break;
        }

        Blockly.ArduinoOpenCat.definitions_['include_4digit_display'] = '#include <TM1637.h>';
        Blockly.ArduinoOpenCat.definitions_['var_4digit_display'] = `TM1637 tm1637(${pins[0]}, ${pins[1]});`;
        Blockly.ArduinoOpenCat.setups_['setup_4digit_display_init'] = 'tm1637.init();';
        Blockly.ArduinoOpenCat.setups_['setup_4digit_display_set'] = 'tm1637.set(BRIGHT_TYPICAL);';

        // Blockly.ArduinoOpenCat.define_fun['4digit_display']
        //     = 'void showNumber(uint16_t num)\n'
        //     + '{\n'
        //     + `if (num > 9999)num=0;\n`
        //     + `tm1637.display(3,num%10);\n`
        //     + `num = num / 10;\n`
        //     + `tm1637.display(2,num%10);\n`
        //     + `num = num / 10;\n`
        //     + `tm1637.display(1,num%10);\n`
        //     + `num = num / 10;\n`
        //     + `tm1637.display(0,num%10);\n`
        //     + '}\n';
        // var code = `showNumber(${num});\n`;

        return `tm1637.DigitDisplayWrite(${pins[0]}, ${pins[1]}, ${num});\n`;

    };

    Blockly.ArduinoOpenCat['motion_opencat_seeed_led_bar'] = function (block) {

        try {

            var pin = block.getFieldValue('PIN');
            var stat = block.getFieldValue('STAT');
            var opt = block.getFieldValue('OPT');
            var pins = ['2', '3'];
            switch (pin) {
                case '2': pins = ['2', '3']; break;
                case '3': pins = ['3', '4']; break;
                case '4': pins = ['4', '5']; break;
                case '5': pins = ['5', '6']; break;
                case '6': pins = ['6', '7']; break;
                case '7': pins = ['7', '8']; break;
                case '8': pins = ['8', '9']; break;
            }
            Blockly.ArduinoOpenCat.definitions_['include_grove_led_bar'] = '#include <Grove_LED_Bar.h>';
            Blockly.ArduinoOpenCat.definitions_['var_grove_led_bar'] = `Grove_LED_Bar groveLedBar(${pins[1]}, ${pins[0]},0);`;
            Blockly.ArduinoOpenCat.setups_['setup_grove_led_bar'] = 'groveLedBar.begin();';
            stat = stat.split('|');
            var code = '';
            for (var x = 0, s; s = stat[x]; x++) {
                code += `groveLedBar.setLed(${parseInt(s) + 1},${opt});\n`;
            }
            return code;

        } catch (e) {
            return '';
        }

    };
    
    // 语音识别
    // `uint8_t softSerialRead()\n{\nwhile(1)\n{\nuint8_t is = softSerial.available();\nif(is) return softSerial.read();\n}\n}`;
    Blockly.ArduinoOpenCat['motion_opencat_seeed_speech_recognizer'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var opt = block.getFieldValue('OPT');
        var pins = ['2', '3'];
        switch (pin) {
            case '2': pins = ['2', '3']; break;
            case '3': pins = ['3', '4']; break;
            case '4': pins = ['4', '5']; break;
            case '5': pins = ['5', '6']; break;
            case '6': pins = ['6', '7']; break;
            case '7': pins = ['7', '8']; break;
            case '8': pins = ['8', '9']; break;
        }
        Blockly.ArduinoOpenCat.definitions_['include_softwareserial'] = '#include <SoftwareSerial.h>';
        Blockly.ArduinoOpenCat.definitions_[`var_softSerial_${pin}`] = `SoftwareSerial softSerial_${pin}(${pins[0]},${pins[1]});`;
        Blockly.ArduinoOpenCat.definitions_[`var_func_softSerial_${pin}`] =
            `uint8_t softSerialRead_${pin}()\n` +
            '{\n' +
            `    if (softSerial_${pin}.available())\n` +
            `        return softSerial_${pin}.read();\n` +
            '    else\n' +
            '        return -1;\n' +
            '}\n';
        Blockly.ArduinoOpenCat.setups_[`setup_softserial_begin_${pin}`] = `softSerial_${pin}.begin(9600);`;
        Blockly.ArduinoOpenCat.setups_[`setup_softserial_listen_${pin}`] = `softSerial_${pin}.listen();`;
        return [`softSerialRead_${pin}() == ${parseInt(opt) + 1}`, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    }

    Blockly.ArduinoOpenCat['motion_opencat_seeed_speech_recognizer_getvalue'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var opt = block.getFieldValue('OPT');
        var pins = ['2', '3'];
        switch (pin) {
            case '2': pins = ['2', '3']; break;
            case '3': pins = ['3', '4']; break;
            case '4': pins = ['4', '5']; break;
            case '5': pins = ['5', '6']; break;
            case '6': pins = ['6', '7']; break;
            case '7': pins = ['7', '8']; break;
            case '8': pins = ['8', '9']; break;
        }
        Blockly.ArduinoOpenCat.definitions_['include_softwareserial'] = '#include <SoftwareSerial.h>';
        Blockly.ArduinoOpenCat.definitions_[`var_softSerial_${pin}`] = `SoftwareSerial softSerial_${pin}(${pins[0]},${pins[1]});`;
        Blockly.ArduinoOpenCat.definitions_[`var_func_softSerial_${pin}`] =
            `uint8_t softSerialRead_${pin}()\n` +
            '{\n' +
            `    if (softSerial_${pin}.available())\n` +
            `        return softSerial_${pin}.read();\n` +
            '    else\n' +
            '        return -1;\n' +
            '}\n';
        Blockly.ArduinoOpenCat.setups_[`setup_softserial_begin_${pin}`] = `softSerial_${pin}.begin(9600);`;
        Blockly.ArduinoOpenCat.setups_[`setup_softserial_listen_${pin}`] = `softSerial_${pin}.listen();`;
        return [`softSerialRead_${pin}()`, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    }




}