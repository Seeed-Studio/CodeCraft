import opencat from './opencat/inject.js';

export default Blockly => {
    init(Blockly);
    opencat(Blockly);
}

const init = (Blockly) => {
    /**
     * Arduino code generator.
     * @type !Blockly.Generator
     */
    Blockly.ArduinoOpenCat = new Blockly.Generator('Arduino');

    /**
     * List of illegal variable names.
     * This is not intended to be a security feature.  Blockly is 100% client-side,
     * so bypassing this list is trivial.  This is intended to prevent users from
     * accidentally clobbering a built-in object or function.
     * @private
     */
    Blockly.ArduinoOpenCat.addReservedWords(
        // http://arduino.cc/en/Reference/HomePage
        'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,short,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts,A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15');

    /**
     * Order of operation ENUMs.
     *
     */
    Blockly.ArduinoOpenCat.ORDER_ATOMIC = 0; // 0 "" ...
    Blockly.ArduinoOpenCat.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
    Blockly.ArduinoOpenCat.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
    Blockly.ArduinoOpenCat.ORDER_MULTIPLICATIVE = 3; // * / % ~/
    Blockly.ArduinoOpenCat.ORDER_ADDITIVE = 4; // + -
    Blockly.ArduinoOpenCat.ORDER_SHIFT = 5; // << >>
    Blockly.ArduinoOpenCat.ORDER_RELATIONAL = 6; // is is! >= > <= <
    Blockly.ArduinoOpenCat.ORDER_EQUALITY = 7; // == != === !==
    Blockly.ArduinoOpenCat.ORDER_BITWISE_AND = 8; // &
    Blockly.ArduinoOpenCat.ORDER_BITWISE_XOR = 9; // ^
    Blockly.ArduinoOpenCat.ORDER_BITWISE_OR = 10; // |
    Blockly.ArduinoOpenCat.ORDER_LOGICAL_AND = 11; // &&
    Blockly.ArduinoOpenCat.ORDER_LOGICAL_OR = 12; // ||
    Blockly.ArduinoOpenCat.ORDER_CONDITIONAL = 13; // expr ? expr : expr
    Blockly.ArduinoOpenCat.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
    Blockly.ArduinoOpenCat.ORDER_NONE = 99; // (...)

    /*
     * Arduino Board profiles
     *
     */
    var profile = {
        softserial_select: [["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
        arduino_standard: {
            description: "standard",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
            pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
            interrupt: [["2", "2"], ["3", "3"]],
            serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        arduino_mega: {
            description: "Mega",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
            pwm: [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["44", "44"], ["45", "45"], ["46", "46"]],
            interrupt: [["2", "2"], ["3", "3"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"]],
            serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["Serial2", "Serial2"], ["Serial3", "Serial3"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        arduino_eightanaloginputs: {
            description: "eightanaloginputs",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
            pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
            interrupt: [["2", "2"], ["3", "3"]],
            serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        arduino_ethernet: {
            description: "ethernet",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
            pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
            interrupt: [["2", "2"], ["3", "3"]], //本无
            serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        arduino_gemma: {
            description: "gemma",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
            pwm: [["0", "0"], ["1", "1"]],
            interrupt: [["2", "2"], ["3", "3"]], //本无
            serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        arduino_leonardo: {
            description: "leonardo, micro, yun",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
            pwm: [["3", "3"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
            interrupt: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
            serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        arduino_robot: {
            description: "robot",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
            pwm: [["3", "3"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
            interrupt: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
            serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        arduino_esp8266: { //esp8266只有wifio不符合
            description: "esp8266",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["A0", "A0"]],
            analog: [["A0", "A0"]],
            pwm: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"]],
            interrupt: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"]],
            serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        'Arduino/Genuino 101': {
            description: "",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
            pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"]],
            interrupt: [["2", "2"], ["5", "5"], ["7", "7"], ["8", "8"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
            serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        },
        mixio_xia: {
            description: "mixio",
            digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
            analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
            pwm: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
            interrupt: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
            serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
            serial: 9600
        }
    };
    profile["Arduino Yun"] = profile["Arduino Yun Mini"] = profile["Arduino Leonardo"] = profile["Arduino Leonardo ETH"] = profile["Arduino/Genuino Micro"] = profile["Arduino Esplora"] = profile["LilyPad Arduino USB"] = profile["arduino_leonardo"];
    profile["Arduino Robot Control"] = profile["Arduino Robot Motor"] = profile["arduino_robot"];
    profile["Arduino/Genuino Mega or Mega 2560"] = profile["Arduino/Genuino Mega or Mega 1280"] = profile["Arduino Mega ADK"] = profile["arduino_mega"];
    profile["Arduino Ethernet"] = profile["arduino_ethernet"];
    profile["Arduino Gemma"] = profile["arduino_gemma"];
    profile["Arduino/Genuino Uno"] = profile["Arduino Duemilanove or Diecimila"] = profile["LilyPad Arduino"] = profile["Arduino NG or older"] = profile["arduino_standard"];
    profile["Arduino Nano"] = profile["Arduino Mini"] = profile["Arduino Fio"] = profile["Arduino BT"] = profile["Arduino Pro or Pro Mini"] = profile["arduino_eightanaloginputs"];
    profile["Generic ESP8266 Module"] = profile["Adafruit HUZZAH ESP8266"] = profile["NodeMCU 0.9 (ESP-12 Module)"] = profile["NodeMCU 1.0 (ESP-12E Module)"] = profile["Olimex MOD-WIFI-ESP8266(-DEV)"] = profile["SparkFun ESP8266 Thing"] = profile["SweetPea ESP-210"] = profile["arduino_esp8266"];

    //set default profile to arduino standard-compatible board
    //profile["default"] = profile["arduino_standard"];
    //alert(profile.default.digital[0]);

    /**
     * Initialise the database of variable names.
     * @param {!Blockly.Workspace} workspace Workspace to generate code from.
     */
    Blockly.ArduinoOpenCat.init = function (workspace) {
        // Create a dictionary of definitions to be printed before setups.
        Blockly.ArduinoOpenCat.definitions_ = Object.create(null);
        // Create a dictionary of setups to be printed before the code.
        Blockly.ArduinoOpenCat.setups_ = Object.create(null);
        //Blockly.ArduinoOpenCat.variableTypes_ = Object.create(null);//处理变量类型
        Blockly.ArduinoOpenCat.loops_ = Object.create(null);
        Blockly.ArduinoOpenCat.loopsEnd_ = Object.create(null);

        Blockly.ArduinoOpenCat.define_fun = Object.create(null);

        if (!Blockly.ArduinoOpenCat.variableDB_) {
            Blockly.ArduinoOpenCat.variableDB_ =
                new Blockly.Names(Blockly.ArduinoOpenCat.RESERVED_WORDS_);
        } else {
            Blockly.ArduinoOpenCat.variableDB_.reset();
        }

        Blockly.ArduinoOpenCat.variableDB_.setVariableMap(workspace.getVariableMap());

        Blockly.ArduinoOpenCat.definitions_['include_chp'] = '#include "ch_p.h"';
        Blockly.ArduinoOpenCat.setups_['setup_chp_init'] = 'oc_setup();';

        // Blockly.ArduinoOpenCat.loopsEnd_['chk_voltage'] = 'voltage_chk();';
        Blockly.ArduinoOpenCat.loopsEnd_['chp_release'] = 'oc_loop(); \n';
    };

    Blockly.ArduinoOpenCat.workspaceToCode = function (workspace) {
        if (!workspace) {
            // Backwards compatibility from before there  could be multiple workspaces.
            console.warn('No workspace specified in workspaceToCode call.  Guessing.');
            workspace = Blockly.getMainWorkspace();
        }
        var code = [];
        this.init(workspace);
        var blocks = workspace.getTopBlocks(true);
        for (var x = 0, block; block = blocks[x]; x++) {
            var line = this.blockToCode(block);
            if (this.isArray(line)) {
                // Value blocks return tuples of code and operator order.
                // Top-level blocks don't care about operator order.
                line = line[0];
            }

            if (line) {

                if (block.outputConnection && this.scrubNakedValue) {
                    // This block is a naked value.  Ask the language's code generator if
                    // it wants to append a semicolon, or something.
                    line = this.scrubNakedValue(line);
                }
            }

            if (block.category_ !== 'events' &&
                block.type !== 'procedures_definition') {
                continue;
            }

            // 处理opencat启动事件  Handle opencat startup event
            if (block.type == 'event_opencat_whenstartup') {
                if (line) {
                    line = '\n  ' + line.replace(/\n/g, '\n  ');
                } else {
                    line = '';
                }
                Blockly.ArduinoOpenCat.setups_['setup_whenstart_branch'] = line;
                continue;
            }

            // 兼容自定义积木 Compatible self defined block
            if (block.callbackCodeHead) {
                line = '\n  ' + line.replace(/\n/g, '\n  ') +'\n';
                line = block.callbackCodeHead + line + block.callbackCodeTail;
            }

            if (line) {
                code.push(line);
            }

        }

        code = code.join('\n');  // Blank line between each section.
        code = this.finish(code);


        code = code.replace(/^\s+\n/, '');
        code = code.replace(/\n\s+$/, '\n');
        code = code.replace(/[ \t]+\n/g, '\n');

        return code;
    };

    /**
     * Prepend the generated code with the variable definitions.
     * @param {string} code Generated code.
     * @return {string} Completed code.
     */
    Blockly.ArduinoOpenCat.finish = function (code) {


        // 添加 变量生成 ---------------------- begin
        var workspace = Blockly.getMainWorkspace();
        var defvars = [];
        var variables = workspace.getAllVariables();
        for (var i = 0; i < variables.length; i++) {
            defvars[i] = {
                name: Blockly.ArduinoOpenCat.variableDB_.getName(variables[i].getId(), Blockly.Variables.NAME_TYPE),
                type: variables[i].c_type
            }
        }

        // Add developer variables (not created or named by the user).
        var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
        for (var i = 0; i < devVarList.length; i++) {
            defvars.push({
                name: Blockly.ArduinoOpenCat.variableDB_.getName(devVarList[i], Blockly.Names.DEVELOPER_VARIABLE_TYPE),
                type: 'var'
            });
        }

        // Declare all of the variables.
        if (defvars.length) {
            var var_code = '';
            for (var i = 0; i < defvars.length; i++) {
                var type = defvars[i].type ? defvars[i].type : 'float';
                if (type === 'String') {
                    var_code += 'String ' + defvars[i].name + ' = "";\n';
                } else {
                    var_code += type + ' ' + defvars[i].name + ';\n';
                }
            }
            Blockly.ArduinoOpenCat.definitions_['variables'] = var_code;
        }
        // 添加 变量生成 ---------------------- end

        var loops = [];
        for (var name in Blockly.ArduinoOpenCat.loops_) {
            loops.push(Blockly.ArduinoOpenCat.loops_[name]);
        }

        var loopsEnd = [];
        for (var name in Blockly.ArduinoOpenCat.loopsEnd_) {
            loopsEnd.push(Blockly.ArduinoOpenCat.loopsEnd_[name]);
        }


        // Indent every line.
        // code = '  ' + code.replace(/\n/g, '\n  ');
        code = code.replace(/\n\s+$/, '\n');

        code =
            '\n' +
            code +
            '\n' +
            'void loop(){\n' +
            // '\n' + code + '\n' +
            '  ' +
            loopsEnd.join('\n  ') + 
            loops.join('\n') +
            '\n}';

        // Convert the definitions dictionary into a list.
        var imports = [];
        var definitions_var = []; //变量定义  Definitions of variables

        for (var name in Blockly.ArduinoOpenCat.definitions_) {
            var def = Blockly.ArduinoOpenCat.definitions_[name];
            if (name.match(/^include/)) {
                imports.push(def);
            }
            else if (name.match(/^var/)) {
                definitions_var.push(def);
            }
        }

        var defineFun = []; //函数定义  Definitions of functions
        for (var name in Blockly.ArduinoOpenCat.define_fun) {
            var def = Blockly.ArduinoOpenCat.define_fun[name];
            defineFun.push(def);
        }


        // Convert the setups dictionary into a list.
        var setups = [];

        // setups voltagechk
        // setups.push('voltage_chk();')
        
        for (var name in Blockly.ArduinoOpenCat.setups_) {
            setups.push(Blockly.ArduinoOpenCat.setups_[name]);
        }

        // setups end codes
        // setups.push('BittyStop();')

        var allDefs =
            imports.join('\n') + '\n\n' +
            definitions_var.join('\n') + '\n' +
            defineFun.join('\n') +
            '\n\nvoid setup(){\n' +
            '  ' + 
            setups.join('\n  ') +
            '\n}' +
            '\n\n';

        return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + code;
    };

    /**
     * Naked values are top-level blocks with outputs that aren't plugged into
     * anything.  A trailing semicolon is needed to make this legal.
     * @param {string} line Line of generated code.
     * @return {string} Legal line of code.
     */
    Blockly.ArduinoOpenCat.scrubNakedValue = function (line) {
        return line + ';\n';
    };

    /**
     * Encode a string as a properly escaped Arduino string, complete with quotes.
     * @param {string} string Text to encode.
     * @return {string} Arduino string.
     * @private
     */
    Blockly.ArduinoOpenCat.quote_ = function (string) {
        // TODO: This is a quick hack.  Replace with goog.string.quote
        //return goog.string.quote(string);
        return "\"" + string + "\"";
    };

    /**
     * Common tasks for generating Arduino from blocks.
     * Handles comments for the specified block and any connected value blocks.
     * Calls any statements following this block.
     * @param {!Blockly.Block} block The current block.
     * @param {string} code The Arduino code created for this block.
     * @return {string} Arduino code with comments and subsequent blocks added.
     * @private
     */
    Blockly.ArduinoOpenCat.scrub_ = function (block, code) {
        if (code === null) {
            // Block has handled code generation itself.
            return '';
        }
        var commentCode = '';
        // Only collect comments for blocks that aren't inline.
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            // Collect comment for this block.
            var comment = block.getCommentText();
            if (comment) {
                commentCode += Blockly.ArduinoOpenCat.prefixLines(comment, '// ') + '\n';
            }
            // Collect comments for all value arguments.
            // Don't collect comments for nested statements.
            for (var x = 0; x < block.inputList.length; x++) {
                if (block.inputList[x].type == Blockly.INPUT_VALUE) {
                    var childBlock = block.inputList[x].connection.targetBlock();
                    if (childBlock) {
                        var comment = Blockly.ArduinoOpenCat.allNestedComments(childBlock);
                        if (comment) {
                            commentCode += Blockly.ArduinoOpenCat.prefixLines(comment, '// ');
                        }
                    }
                }
            }
        }
        var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        var nextCode = Blockly.ArduinoOpenCat.blockToCode(nextBlock);
        return commentCode + code + nextCode;
    };


}
