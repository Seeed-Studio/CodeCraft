import ScratchBlocks from '../../../../blocks/dist/vertical';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const control = function () {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#7684A2" secondaryColour="#5C6C8E">
        <block type="motion_arduino_delay_ms">  
            <value name="TIME">
                <shadow type="math_number">
                    <field name="NUM">1000</field>
                </shadow>   
            </value>      
        </block>
        <block type="motion_arduino_delay_us">   
            <value name="TIME">
                <shadow type="math_number">
                    <field name="NUM">1000</field>
                </shadow>   
            </value>     
        </block>
        ${blockSeparator}
        <block type="motion_arduino_for">
            <value name="A">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="C">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_arduino_break"/>
        ${blockSeparator}
        <block type="motion_arduino_keep_wait"/>
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block id="forever" type="control_forever"/>
        ${blockSeparator}
        <block id="if" type="control_if"/>
        <block id="if_else" type="control_if_else"/>
        <block id="wait_until" type="control_wait_until"/>
        <block id="repeat_until" type="control_repeat_until"/>
        <block id="arduino_repeat" type="motion_arduino_repeat"/>
    </category>
    `;
};

const operators = function () {
    // const apple = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_APPLE', 'apple');
    // const letter = ScratchBlocks.ScratchMsgs.translate('OPERATORS_LETTEROF_APPLE', 'a');
    return `
    <category name="%{BKY_CATEGORY_OPERATORS}" id="operators" colour="#6DCF68" secondaryColour="#389438">
        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_multiply">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_divide">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_gt_equals">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt_equals">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="operator_not_equals">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_join">
            <value name="STRING1">
                <shadow type="text">
                    <field name="TEXT">apple</field>
                </shadow>
            </value>
            <value name="STRING2">
                <shadow type="text">
                    <field name="TEXT">banana</field>
                </shadow>
            </value>
        </block>
        <block type="operator_letter_of">
            <value name="LETTER">
                <shadow type="math_cc_positive_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">apple</field>
                </shadow>
            </value>
        </block>
        <block type="operator_length">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">apple</field>
                </shadow>
            </value>
        </block>
        <block type="operator_contains" id="operator_contains">
          <value name="STRING1">
            <shadow type="text">
              <field name="TEXT">apple</field>
            </shadow>
          </value>
          <value name="STRING2">
            <shadow type="text">
              <field name="TEXT">a</field>
            </shadow>
          </value>
        </block>
        ${blockSeparator}
        <block type="operator_and"/>
        <block type="operator_or"/>
        <block type="operator_not"/>
        ${blockSeparator}
        <block type="operator_mathop">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="operator_arduino_itoa">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

const variables = function () {
    return `
    <category
        name="%{BKY_CATEGORY_VARIABLES}"
        id="variables"
        colour="#FFC033"
        secondaryColour="#DCA019"
        custom="VARIABLE">
    </category>
    `;
};

const myBlocks = function () {
    return `
    <category
        name="%{BKY_CATEGORY_MYBLOCKS}"
        id="myBlocks"
        colour="#FD7D70"
        secondaryColour="#50D9D5"
        custom="PROCEDURE">
    </category>
    `;
};

const system = function () {
    return `
    <category name="%{BKY_CATEGORY_OPENCAT_SYSTEM}" colour="#19B5FE" secondaryColour="#155f7c" id="system">
        <block type="event_opencat_whenstartup"/>
        ${blockSeparator}
        <block type="event_opencat_buzzer_beatpermin" />
        <block type="event_opencat_buzzer_play"/>
        <block type="event_opencat_accelerometer_value"/>
        <block type="event_opencat_gyroscope_value"/>
        ${blockSeparator}
        <block type="event_opencat_ir_remotecontrol_start">
        </block>
        <block type="event_opencat_ir_remotecontrol">
        </block>
        <block type="event_opencat_ir_receiver_received_value" />

        <block type="motion_opencat_auto_balance" />

        ${blockSeparator}
        <block type="motion_opencat_led_strip1">
            <value name="R">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="G">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>     
        </block>        
        <block type="motion_opencat_led_strip2">  
            <value name="COLOR">
                <shadow type="colour_picker">
                    <field name="COLOUR">#ff0000</field>
                </shadow>
            </value>
    
        </block>
        <block type="motion_opencat_led_strip3">   
        </block>
    </category>
    `;
}

{/* <block type="event_opencat_bluetooth_set">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">Bittle</field>
                </shadow>   
            </value>       
            <value name="PWD">
                <shadow type="text">
                    <field name="TEXT">1234</field>
                </shadow>   
            </value>       
        </block> */}

const serialport = function () {
    return `
    <category name="%{BKY_CATEGORY_OPENCAT_SERIALPORT}" colour="#57d4c7" secondaryColour="#57d4c7" id="serialport">
        <block type="motion_opencat_serial_baud_rate"/>        
        <block type="motion_opencat_serial_print">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>   
            </value>       
        </block>
        <block type="motion_opencat_serial_is_readable"/>        
        <block type="motion_opencat_serial_read"/>        
        <block type="motion_opencat_serial_strtonumber"> 
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>   
            </value>       
        </block>
    </category>
    `;
}

const skill = function () {
    return `
    <category name="%{BKY_CATEGORY_OPENCAT_POSTURESKILL}" colour="#ab57e6" secondaryColour="#ab57e6" id="skill">
        <block type="motion_opencat_gait_run_craw"> 
        </block>
        <block type="motion_opencat_gait_run_back"> 
        </block>
        <block type="motion_opencat_gait_run_trot"> 
        </block>
        <block type="motion_opencat_gait_run_walk"> 
        </block>
        <block type="motion_opencat_gait_step_in_place" />
        <block type="motion_opencat_gait_run_eggs"> </block>
        <block type="motion_opencat_pause_action"/>       
        <block type="motion_opencat_stop_action"/>  
        ${blockSeparator}
        <block type="motion_opencat_posture_fixed_run"/> 
        <block type="motion_opencat_posture_run"> </block>
        <block type="motion_opencat_legservo_set">
            <value name="ANGLE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
        </block>
        <block type="motion_opencat_headservo_set">
            <value name="ANGLE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
        </block> 
    </category>
    `;
}

const groveIgure = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_GROVE_IGURE}" colour="#E16BB0" secondaryColour="#CA569A" id="groveIgure">
        <block type="motion_opencat_seeed_led"/>
        <block type="motion_opencat_seeed_rgb_led_mini">
            <value name="R">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="G">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_opencat_seeed_btn"/> 
        <block type="motion_opencat_seeed_tilt"/> 
        <block type="motion_opencat_seeed_touch"/> 
        <block type="motion_opencat_seeed_vibration"/>
        <block type="motion_opencat_seeed_water"/>
        <block type="motion_opencat_seeed_line_finder"/>
        <block type="motion_opencat_seeed_ult"/>
        <block type="motion_opencat_seeed_magnetic_switch"/>
        <block type="motion_opencat_seeed_pir_motion"/>
        <block type="motion_opencat_seeed_collision"/>
        <block type="motion_opencat_seeed_hall"/>
        <block type="motion_opencat_seeed_temperature_humidity"/>
        <block type="motion_opencat_seeed_flame"/>
        <block type="motion_opencat_seeed_4digit_display">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>  
        </block>
        <block type="motion_opencat_seeed_led_bar"/>
        ${blockSeparator}
        <block type="motion_opencat_seeed_speech_recognizer"/>        
        <block type="motion_opencat_seeed_speech_recognizer_getvalue"/>  
    </category>
    `;
}
const groveAnalog = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_GROVE_ANALOG}" colour="#6D7AB6" secondaryColour="#525E95" id="groveAnalog">
        <block type="motion_opencat_seeed_temperature"/>        
        <block type="motion_opencat_seeed_rotation"/>        
        <block type="motion_opencat_seeed_sound"/>        
        <block type="motion_opencat_seeed_light"/>        
        <block type="motion_opencat_seeed_quality"/>        
        <block type="motion_opencat_seeed_slide_pot"/>        
    </category>
    `;
}
const groveI2C = function (isStage, targetId, name) {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_GROVE_I2C}" colour="#8F5D5A" secondaryColour="#804F4C" id="groveI2C">
        <block type="motion_opencat_seeed_read_gesture"/>  
        <block type="motion_opencat_seeed_gesture"/>     
        ${blockSeparator}
        <block type="motion_opencat_grove_serial_rgb_led_matrix_on_point">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
        </block>
        <block type="motion_opencat_grove_serial_rgb_led_matrix_show_text">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value> 
        </block>
        <block type="motion_opencat_grove_serial_rgb_led_matrix_show_emoji"/>
        ${blockSeparator}
        <block type="motion_opencat_color_read_sensor"/>
        <block type="motion_opencat_color_sensor"/>
        ${blockSeparator}
        <block type="motion_opencat_vision_sensor1"/>
        <block type="motion_opencat_vision_sensor1_ext"/>
        <block type="motion_opencat_traffic_read_sensor"/>
        <block type="motion_opencat_vision_sensor2"/>
        <block type="motion_opencat_number_read_sensor"/>
        <block type="motion_opencat_vision_sensor3"/>
        <block type="motion_opencat_symbol_read_sensor"/>
        <block type="motion_opencat_vision_sensor4"/>
        <block type="motion_opencat_vision_sensor5"/>
        <block type="motion_opencat_gesture_read_sensor"/>
        <block type="motion_opencat_vision_sensor10"/>
        <block type="motion_opencat_vision_sensor11"/>
        <block type="motion_opencat_vision_sensor12"/>
        <block type="motion_opencat_seeed_temperature_humidity_dht20"/>
        ${blockSeparator}
        <block type="motion_opencat_oled11"/>
        <block type="motion_opencat_oled22">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
            <value name="ROW">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="COL">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_opencat_oled33"/>
    </category>
    `;
}

const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';

/**
 * @param {string?} categoriesXML - null for default toolbox, or an XML string with <category> elements.
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox.
 */
const makeToolboxXML = function (extension) {
    const {
        key,
        xml,
    } = extension;

    const gap = [categorySeparator];

    const everything = [
        xmlOpen,
        search(), gap,
        system(), gap,
        serialport(), gap,
        skill(), gap,
        control(), gap,
        operators(), gap,
        variables(), gap,
        myBlocks(), gap,
        groveIgure(), gap,
        groveAnalog(), gap,
        groveI2C()
    ];

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);

    return everything.join('\n');
};

export default makeToolboxXML;
