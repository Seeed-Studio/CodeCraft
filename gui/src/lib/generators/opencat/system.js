export default Blockly => {
    
    Blockly.ArduinoOpenCat['event_opencat_whenstartup'] = function (block) {
        var branch1 = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK1');
        var branch2 = Blockly.ArduinoOpenCat.statementToCode(block, 'SUBSTACK2');
        Blockly.ArduinoOpenCat.setups_['setup_branch'] = branch1;
        Blockly.ArduinoOpenCat.loops_['loop_branch'] = branch2;
        return '';
    };

    //oc_beep(note, beat); // note = 0...20; beat = 0...7
    Blockly.ArduinoOpenCat['event_opencat_buzzer_play'] = function (block) {
        var note = block.getFieldValue('NOTE');
        var beat = block.getFieldValue('BEAT');
        return `beep(${note}, ${beat});\n`;
    };

    //AcceGet(uint8_t xyz); // xyz = 0,1,2 mean X, Y,Z
    Blockly.ArduinoOpenCat['event_opencat_accelerometer_value'] = function (block) {
        var axis = block.getFieldValue('AXIS');
        var code = `AcceGet(${ axis })`
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    //GyroGet(uint8_t xyz); // xyz = 0,1,2 mean X, Y,Z
    Blockly.ArduinoOpenCat['event_opencat_gyroscope_value'] = function (block) {
        var axis = block.getFieldValue('AXIS');
        var code = `GyroGet(${ axis })`
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['event_opencat_bluetooth_set'] = function (block) {
        return '';
    };

    Blockly.ArduinoOpenCat['event_opencat_ir_remotecontrol_start'] = function (block) {
        // Blockly.ArduinoOpenCat.loops_['loop_getvalue'] = 'long unsigned int getvalue;';
        Blockly.ArduinoOpenCat.definitions_['var_getvalue'] = 'long unsigned int getvalue;';
        var code ='getvalue = get_ir_value()'
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    }

    Blockly.ArduinoOpenCat['event_opencat_ir_remotecontrol'] = function (block) {
        Blockly.ArduinoOpenCat.definitions_['include_IRremote'] = '#include <IRremote.h>';
        Blockly.ArduinoOpenCat.definitions_['var_IRrecv'] = 'IRrecv irrecv(IR_RECIEVER);';
        Blockly.ArduinoOpenCat.definitions_['var_results'] = 'decode_results results;';
        var index = block.getFieldValue('KEY');        
        var val = ''
        switch(index){
            case '0':
                val = 'FFA25D'
                break;
            case '1':
                val = 'FF629D'
                break;
            case '2':
                val = 'FFE21D'
                break;
            case '3':
                val = 'FF22DD'
                break;
            case '4':
                val = 'FF02FD'
                break;
            case '5':
                val = 'FFC23D'
                break;
            case '6':
                val = 'FFE01F'
                break;
            case '7':
                val = 'FFA857'
                break;
            case '8':
                val = 'FF906F'
                break;
            case '9':
                val = 'FF6897'
                break;
            case '10':
                val = 'FF9867'
                break;
            case '11':
                val = 'FFB04F'
                break;
            case '12':
                val = 'FF30CF'
                break;
            case '13':
                val = 'FF18E7'
                break;
            case '14':
                val = 'FF7A85'
                break;
            case '15':
                val = 'FF10EF'
                break;
            case '16':
                val = 'FF38C7'
                break;
            case '17':
                val = 'FF5AA5'
                break;
            case '18':
                val = 'FF42BD'
                break;
            case '19':
                val = 'FF4AB5'
                break;
            case '20':
                val = 'FF52AD'
                break;
        }
        Blockly.ArduinoOpenCat.setups_[`setup_irrecv_enablelRin`] = `irrecv.enableIRIn();`;
        Blockly.ArduinoOpenCat.define_fun['vision_get_ir_value'] = `long unsigned int get_ir_value() {
    if (irrecv.decode(&results))
    {
        irrecv.resume();
        return results.value;
    }
    return 0;
}`
        var code = `getvalue == 0x${val}`
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['event_opencat_ir_receiver_received_value'] = function (block) {
        Blockly.ArduinoOpenCat.definitions_['include_IRremote'] = '#include <IRremote.h>';
        Blockly.ArduinoOpenCat.definitions_['var_IRrecv'] = 'IRrecv irrecv(IR_RECIEVER);';
        Blockly.ArduinoOpenCat.definitions_['var_results'] = 'decode_results results;';
        Blockly.ArduinoOpenCat.setups_[`setup_irrecv_enablelRin`] = `irrecv.enableIRIn();`;
        Blockly.ArduinoOpenCat.define_fun['vision_get_ir_value'] = `long unsigned int get_ir_value() {
        if (irrecv.decode(&results))
        {
            irrecv.resume();
            return results.value;
        }
        return 0;
    }
                `
        var code = 'get_ir_value()'
        return [code, Blockly.ArduinoOpenCat.ORDER_ATOMIC];
    };

    Blockly.ArduinoOpenCat['motion_opencat_led_strip1'] = function (block) {
        // var pin = block.getFieldValue('PIN');
        var r = Blockly.ArduinoOpenCat.valueToCode(block, 'R', Blockly.ArduinoOpenCat.ORDER_NONE);
        var g = Blockly.ArduinoOpenCat.valueToCode(block, 'G', Blockly.ArduinoOpenCat.ORDER_NONE);
        var b = Blockly.ArduinoOpenCat.valueToCode(block, 'B', Blockly.ArduinoOpenCat.ORDER_NONE);
        var no = block.getFieldValue('NO');
        var code = ''
        if(no==-1){
            code = `for (int count = 0; count < 7; count++) {
    pixels_10.setPixelColor(count, pixels_10.Color(${r}, ${g}, ${b}));
}
pixels_10.show();`;
        }else{
            code = `pixels_10.setPixelColor(${no}, pixels_10.Color(${r}, ${g}, ${b}));\npixels_10.show();\n`;
        }
        Blockly.ArduinoOpenCat.definitions_['include_led_strip1'] = '#include <Adafruit_NeoPixel.h>';
        Blockly.ArduinoOpenCat.definitions_[`var_led_strip1_10`] = `Adafruit_NeoPixel pixels_10 = Adafruit_NeoPixel(7, 10, NEO_GRB + NEO_KHZ800);`;
        Blockly.ArduinoOpenCat.setups_[`setup_led_strip1_10`] = `pixels_10.setBrightness(255);\n  pixels_10.begin();`;
        return code;
    };

    Blockly.ArduinoOpenCat['motion_opencat_led_strip2'] = function (block) {

        var color = Blockly.Arduino.valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_NONE);
        var no = block.getFieldValue('NO');
        if (color.length<7) {
            return '';
        }
        var r = '0x'+color.slice(2,4)
        var g = '0x'+color.slice(4,6)
        var b = '0x'+color.slice(6,8)
        var code = ''
        if(no==-1){
            code = `for (int count = 0; count < 7; count++) {
    pixels_10.setPixelColor(count, pixels_10.Color(${r}, ${g}, ${b}));
}            
pixels_10.show();`;
        }else{
            code = `pixels_10.setPixelColor(${no}, pixels_10.Color(${r}, ${g}, ${b}));\npixels_10.show();\n`;
        }
        Blockly.ArduinoOpenCat.definitions_['include_led_strip1'] = '#include <Adafruit_NeoPixel.h>';
        Blockly.ArduinoOpenCat.definitions_[`var_led_strip1_10`] = `Adafruit_NeoPixel pixels_10 = Adafruit_NeoPixel(7, 10, NEO_GRB + NEO_KHZ800);`;
        Blockly.ArduinoOpenCat.setups_[`setup_led_strip1_10`] = `pixels_10.setBrightness(255);\n  pixels_10.begin();`;
        return code;
    }

    Blockly.ArduinoOpenCat['motion_opencat_led_strip3'] = function (block) {
        var no = block.getFieldValue('NO');
        Blockly.ArduinoOpenCat.definitions_['include_led_strip1'] = '#include <Adafruit_NeoPixel.h>';
        Blockly.ArduinoOpenCat.definitions_[`var_led_strip1_10`] = `Adafruit_NeoPixel pixels_10 = Adafruit_NeoPixel(7, 10, NEO_GRB + NEO_KHZ800);`;
        Blockly.ArduinoOpenCat.setups_[`setup_led_strip1_10`] = `pixels_10.setBrightness(255);\n  pixels_10.begin();`;
        var code = ''
        if(no==-1){
            code = `for (int count = 0; count < 7; count++) {
    pixels_10.setPixelColor(count, pixels_10.Color(${0}, ${0}, ${0}));
}
pixels_10.show();`;
        }else{
            code = `pixels_10.setPixelColor(${no}, pixels_10.Color(0, 0, 0));\npixels_10.show();\n`;
        }
        return code;
    }
    Blockly.ArduinoOpenCat['event_opencat_buzzer_beatpermin'] = function (block) {
        Blockly.ArduinoOpenCat.definitions_['var_beatPerMin'] = 'uint16_t beatPerMin = 120;';
        var beat = block.getFieldValue('BEAT');
        var code = ''

        switch(beat){
            case 'jingle bells':
                code = `
    beep(32, 2 * beatPerMin);
    beep(32, 2 * beatPerMin);
    beep(32, 4 * beatPerMin);
    beep(32, 2 * beatPerMin);
    beep(32, 2 * beatPerMin);
    beep(32, 4 * beatPerMin);

    beep(32, 2 * beatPerMin);
    beep(35, 2 * beatPerMin);
    beep(28, 3 * beatPerMin);
    beep(32, 1 * beatPerMin);
    beep(32, 6 * beatPerMin);
    beep(0, 2 * beatPerMin);

    beep(33, 2 * beatPerMin);
    beep(33, 2 * beatPerMin);
    beep(33, 3 * beatPerMin);
    beep(33, 1 * beatPerMin);
    beep(33, 2 * beatPerMin);
    beep(32, 2 * beatPerMin);
    beep(32, 2 * beatPerMin);
    beep(32, 1 * beatPerMin);
    beep(32, 1 * beatPerMin);

    beep(35, 2 * beatPerMin);
    beep(35, 2 * beatPerMin);
    beep(33, 2 * beatPerMin);
    beep(30, 2 * beatPerMin);
    beep(28, 3 * beatPerMin);
    beep(0, 1 * beatPerMin);
                `
                break;
            case 'happy birthday':
                code = `
    beep(23, 1 * beatPerMin);
    beep(23, 1 * beatPerMin);
    beep(25, 2 * beatPerMin);
    beep(23, 2 * beatPerMin);
    beep(28, 2 * beatPerMin);
    beep(27, 4 * beatPerMin);
                
    beep(23, 1 * beatPerMin);
    beep(23, 1 * beatPerMin);
    beep(25, 2 * beatPerMin);
    beep(23, 2 * beatPerMin);
    beep(30, 2 * beatPerMin);
    beep(28, 4 * beatPerMin);
                
    beep(23, 1 * beatPerMin);
    beep(23, 1 * beatPerMin);
    beep(35, 2 * beatPerMin);
    beep(32, 2 * beatPerMin);
    beep(28, 2 * beatPerMin);
    beep(27, 2 * beatPerMin);
    beep(25, 2 * beatPerMin);
                    
    beep(33, 1 * beatPerMin);
    beep(33, 1 * beatPerMin);
    beep(32, 2 * beatPerMin);
    beep(28, 2 * beatPerMin);
    beep(30, 2 * beatPerMin);
    beep(28, 4 * beatPerMin);
                `
                break;
            case 'ba ding':
                code = `
    beep(39, 1 * beatPerMin);
    beep(44, 3 * beatPerMin);
                `;
                break
            case 'wawawawaa':
                code = `
    beep(8, 3 * beatPerMin);
    beep(0, 1 * beatPerMin);
    beep(7, 3 * beatPerMin);
    beep(0, 1 * beatPerMin);
    beep(6, 4 * beatPerMin);
    beep(0, 1 * beatPerMin);
    beep(5, 8 * beatPerMin);
                `
                break;
            case 'jump up':
                code = `
    beep(28, 1 * beatPerMin);
    beep(30, 1 * beatPerMin);
    beep(32, 1 * beatPerMin);
    beep(33, 1 * beatPerMin);
    beep(35, 1 * beatPerMin);
                `
                break;
            case 'jump down':
                code = `
    beep(35, 1 * beatPerMin);
    beep(33, 1 * beatPerMin);
    beep(32, 1 * beatPerMin);
    beep(30, 1 * beatPerMin);
    beep(28, 1 * beatPerMin);
                    `
                break;
            case 'power up':
                code = `
    beep(23, 1 * beatPerMin);
    beep(28, 1 * beatPerMin);
    beep(32, 1 * beatPerMin);
    beep(35, 2 * beatPerMin);
    beep(32, 1 * beatPerMin);
    beep(35, 3 * beatPerMin);
                    `
                break;
            case 'power down':
                code = `
    beep(35, 1 * beatPerMin);
    beep(31, 1 * beatPerMin);
    beep(28, 1 * beatPerMin);
    beep(23, 2 * beatPerMin);
    beep(27, 1 * beatPerMin);
    beep(28, 3 * beatPerMin);
                            `
                break;
            case 'magic wand':
                code = `
    beep(25, 4 * beatPerMin);
    beep(30, 4 * beatPerMin);
    beep(25, 4 * beatPerMin);
    beep(30, 4 * beatPerMin);
    beep(25, 4 * beatPerMin);
    beep(30, 4 * beatPerMin);
                    `
                break;
            case 'siren':
                code = `
    beep(25, 4 * beatPerMin);
    beep(30, 4 * beatPerMin);
    beep(25, 4 * beatPerMin);
    beep(30, 4 * beatPerMin);
    beep(25, 4 * beatPerMin);
    beep(30, 4 * beatPerMin);
                    `
                break;
        }
        return code;
    };
    Blockly.ArduinoOpenCat['motion_opencat_auto_balance'] = function (block) {
        var opts = block.getFieldValue('OPT');
        // var secs = Blockly.ArduinoOpenCat.valueToCode(block, 'SECS', Blockly.ArduinoOpenCat.ORDER_ATOMIC) || 0;
        // return `BittyEggs(${secs});\n`;
        var code = `checkGyro = ${opts};`;
        return code;
    };
}