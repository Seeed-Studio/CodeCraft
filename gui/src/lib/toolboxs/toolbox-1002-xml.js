import ScratchBlocks from '../../../../blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}
const init = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_INIT}" colour="#19B5FE" secondaryColour="#155f7c" id="init">
        <block type="motion_arduino_setup_loop"></block>
    </category>
    `;
}

const input = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_INPUT}" colour="#5B6BC8" secondaryColour="#4354B8" id="input">
        <block type="motion_arduino_figure_input">        
        </block>
        <block type="motion_arduino_analog_input">        
        </block>
        ${blockSeparator}        
        <block type="motion_arduino_sys_time">        
        </block>
        <block type="motion_arduino_pulse_len">
        </block>
        <block type="motion_arduino_pulse_len_us">
            <value name="TIME">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>   
            </value>
        </block>
    </category>
    `;
}

const output = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_OUTPUT}" colour="#5C916C" secondaryColour="#63AB68" id="output">
        <block type="motion_arduino_figure_output">        
        </block>
        <block type="motion_arduino_analog_output">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>    
        </block>
    </category>
    `;
}
const serial = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_SERIAL}" colour="#10A68F" secondaryColour="#0E9681" id="serial">
        <block type="motion_arduino_serial_baud_rate">        
        </block>
        <block type="motion_arduino_serial_print">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>   
            </value>       
        </block>
        <block type="motion_arduino_serial_is_readable">        
        </block>
        <block type="motion_arduino_serial_read"/>        
        <block type="motion_arduino_serial_strtonumber"> 
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>   
            </value>       
        </block>
        <block type="motion_arduino_serial_chart_print">
            <value name="ARGS_0">
                <shadow type="math_number_for_plotter_print">
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="ARGS_1">
                <shadow type="math_number_for_plotter_print">
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="ARGS_2">
                <shadow type="math_number_for_plotter_print">
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="ARGS_3">
                <shadow type="math_number_for_plotter_print">
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="ARGS_4">
                <shadow type="math_number_for_plotter_print">
                    <field name="NUM"></field>
                </shadow>
            </value>
        </block>
        <block type="motion_arduino_broadcast">
            <value name="BROADCAST_INPUT">
                <shadow type="motion_arduino_broadcast_menu"></shadow>
            </value>
            <value name="VALUE">
                <shadow type="math_number_for_plotter_print">
                    <field name="NUM"></field>
                </shadow>   
            </value>
        </block>
    </category>
    `;
}
const groveIgure = function (isStage, targetId, name) {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_GROVE_IGURE}" colour="#E16BB0" secondaryColour="#CA569A" id="groveIgure">
        ${/** grove数字输出 */''}
        <block type="motion_arduino_seeed_servo_move">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="DELAY_TIME">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>            
        </block>
        <block type="motion_arduino_seeed_4digit_display">    
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>  
        </block>
        <block type="motion_arduino_seeed_rgb_led">    
            <value name="COLOR">
                <shadow type="colour_picker">
                    <field name="COLOUR">#ff0000</field>
                </shadow>
            </value>

            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_arduino_seeed_rgb_led1">    
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
        <block type="motion_arduino_seeed_rgb_led_mini">
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
        <block type="motion_arduino_seeed_recorder">        
        </block>
        
        <block type="motion_arduino_seeed_el_driver">        
        </block>
        <block type="motion_arduino_seeed_vibration_motor">        
        </block>
        <block type="motion_arduino_seeed_electromagnet">        
        </block>
        <block type="motion_arduino_seeed_mini_fan">        
        </block>
        <block type="motion_arduino_seeed_relay">        
        </block>
        <block type="motion_arduino_seeed_led">        
        </block>
        <block type="motion_arduino_seeed_buzzer">        
        </block>
        <block type="motion_arduino_seeed_led_bar">        
        </block>
        <block type="motion_arduino_seeed_circular_led">        
        </block>


        <block type="motion_arduino_seeed_humidifier">        
        </block>

        <block type="motion_arduino_led_strip1">
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
            <value name="NO">
                <shadow type="math_cc_min_0_max_200_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>        
        </block>
        
        <block type="motion_arduino_led_strip2">  
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

        
        ${/** 数字输入 */blockSeparator}
        
        <block type="motion_arduino_seeed_vibration">        
        </block>
        <block type="motion_arduino_seeed_btn">        
        </block>
        <block type="motion_arduino_seeed_water">        
        </block>
        <block type="motion_arduino_seeed_line_finder">        
        </block>
        <block type="motion_arduino_seeed_line_finder_rcolor">        
        </block>
        <block type="motion_arduino_seeed_ult">        
        </block>
        <block type="motion_arduino_seeed_magnetic_switch">        
        </block>
        <block type="motion_arduino_seeed_pir_motion">        
        </block>
        <block type="motion_arduino_seeed_flame">        
        </block>
        <block type="motion_arduino_seeed_collision">        
        </block>
        <block type="motion_arduino_seeed_hall">        
        </block>
        <block type="motion_arduino_seeed_tilt">        
        </block>
        <block type="motion_arduino_seeed_touch">        
        </block>
        <block type="motion_arduino_seeed_temperature_humidity">        
        </block>
        ${blockSeparator}
        <block type="motion_arduino_infrared_send">
            <value name="ADDRESS">
                <shadow type="math_number">
                    <field name="TEXT">123</field>
                </shadow>
            </value>
        </block>  
        <block type="motion_arduino_infrared_receive"/>
        ${blockSeparator}
        <block type="motion_arduino_seeed_speech_recognizer"/>        
        <block type="motion_arduino_seeed_speech_recognizer_getvalue"/>
    </category>
    `;
}
// ${blockSeparator}
// <block type="motion_arduino_lotusv_setble"> 
//     <value name="ID">
//         <shadow type="text">
//             <field name="TEXT">SeeedBTSlave</field>
//         </shadow>   
//     </value>
//     <value name="PWD">
//         <shadow type="text">
//             <field name="TEXT">1234</field>
//         </shadow>   
//     </value>      
// </block>       
// <block type="motion_arduino_lotusv_getblevalue"/>  

const groveAnalog = function (isStage, targetId, name) {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_GROVE_ANALOG}" colour="#6D7AB6" secondaryColour="#525E95" id="groveAnalog">
        <block type="motion_arduino_seeed_temperature">        
        </block>
        <block type="motion_arduino_seeed_thumb_joystick">        
        </block>
        <block type="motion_arduino_seeed_rotation">        
        </block>
        <block type="motion_arduino_seeed_sound">        
        </block>
        <block type="motion_arduino_seeed_light">        
        </block>
        <block type="motion_arduino_seeed_moisture">        
        </block>
        <block type="motion_arduino_seeed_slide_pot">        
        </block>

        <block type="motion_arduino_seeed_voltage">        
        </block>
        <block type="motion_arduino_seeed_quality">        
        </block>
        <block type="motion_arduino_seeed_water_analog">        
        </block>

        <block type="motion_arduino_seeed_led_analog">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>         
        </block>
        ${blockSeparator}
        <block type="motion_arduino_seeed_speaker"/>     
        <block type="motion_arduino_buzzer_speaker"/>     
    </category>
    `;
}
const groveI2C = function (isStage, targetId, name) {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_GROVE_I2C}" colour="#8F5D5A" secondaryColour="#804F4C" id="groveI2C">
        <block type="motion_arduino_seeed_read_gesture"/>   
        <block type="motion_arduino_seeed_gesture">        
        </block>

        <block type="motion_arduino_grove_serial_lcd_print">
            <value name="TEXT1">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
            <value name="TEXT2">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>          
        </block>

        <block type="motion_arduino_grove_serial_lcd_print2">
            <value name="ROW">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
            <value name="COLUMN">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>

        <block type="motion_arduino_grove_serial_lcd_power">        
        </block>

        <block type="motion_arduino_grove_serial_lcd_setrgb">    
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

        <block type="motion_arduino_grove_serial_3ada16"/>    
        <block type="motion_arduino_grove_serial_3ada15"/>    
        <block type="motion_arduino_grove_serial_3ada_m"/>    

        <block type="motion_arduino_grove_serial_touch">    
        </block>

        <block type="motion_arduino_grove_serial_mini_motor_driver">    
            <value name="SPEED">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
        </block>

        <block type="motion_arduino_grove_serial_mini_motor_driver_stop">    
        </block>

        <block type="motion_arduino_grove_serial_rgb_led_matrix_on_point">
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

 
        <block type="motion_arduino_grove_serial_rgb_led_matrix_show_text">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value> 
        </block>

        <block type="motion_arduino_grove_serial_rgb_led_matrix_show_emoji">
        </block>
        <block type="motion_arduino_grove_serial_red_led_matrix_on_point">
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

 
        <block type="motion_arduino_grove_serial_red_led_matrix_show_text">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value> 
        </block>

        <block type="motion_arduino_grove_serial_red_led_matrix_show_emoji">
        </block>
        
        <block type="motion_arduino_color_read_sensor">
        </block>
        
        <block type="motion_arduino_color_sensor">
        </block>
        
        <block type="motion_arduino_vision_sensor1">
        </block>

        <block type="motion_arduino_vision_sensor1_ext">
        </block>
        
        <block type="motion_arduino_traffic_read_sensor">
        </block>

        <block type="motion_arduino_vision_sensor2">
        </block>

        <block type="motion_arduino_number_read_sensor">
        </block>

        <block type="motion_arduino_vision_sensor3">
        </block>

        <block type="motion_arduino_symbol_read_sensor">
        </block>

        <block type="motion_arduino_vision_sensor4">
        </block>

        <block type="motion_arduino_vision_sensor5">
        </block>

        <block type="motion_arduino_gesture_read_sensor">
        </block>

        <block type="motion_arduino_vision_sensor10">
        </block>

        <block type="motion_arduino_vision_sensor11">
        </block>

        <block type="motion_arduino_vision_sensor12">
        </block>

        ${blockSeparator}
        <block type="motion_arduino_pressure_sensor">
        </block>
        <block type="motion_arduino_seeed_temperature_humidity_dht20">        
        </block>
        ${blockSeparator}
        <block type="motion_arduino_oled1"/>
        <block type="motion_arduino_oled2">
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
        <block type="motion_arduino_oled3"/>
        ${blockSeparator}
        <block type="motion_arduino_oled11"/>
        <block type="motion_arduino_oled22">
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
        <block type="motion_arduino_oled33"/>
        ${blockSeparator} 
        <block type="motion_arduino_rtc_setdatetime">
            <value name="YEAR">
                <shadow type="math_number">
                    <field name="NUM">2020</field>
                </shadow>
            </value>
            <value name="MONTH">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="DAY">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="HOUR">
                <shadow type="math_number">
                    <field name="NUM">12</field>
                </shadow>
            </value>
            <value name="MINUTE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="SECOND">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_arduino_rtc_getdate"/>
        <block type="motion_arduino_rtc_gettime"/>
    </category>
    `;
}

const control = function () {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#7684A2" secondaryColour="#CF8B17">
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

        <block type="motion_arduino_break">
        </block>

        ${blockSeparator}

        <block type="motion_arduino_keep_wait">
        </block>
        
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block id="forever" type="control_forever"/>
        ${blockSeparator}
        <block type="control_if"/>
        <block type="control_if_else"/>
        <block id="wait_until" type="control_wait_until"/>
        <block id="repeat_until" type="control_repeat_until"/>
        <block type="motion_arduino_repeat"></block>
        ${categorySeparator}
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
        ${categorySeparator}
        <block type="operator_arduino_map">
            <value name="PARAMETER1">
                <shadow type="math_number">
                    <field name="NUM">1023</field>
                </shadow>
            </value>
            <value name="PARAMETER2">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="PARAMETER3">
                <shadow type="math_number">
                    <field name="NUM">1023</field>
                </shadow>
            </value>
            <value name="PARAMETER4">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
            <value name="PARAMETER5">
                <shadow type="math_number">
                    <field name="NUM">255</field>
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
        secondaryColour="#DB6E00"
        custom="VARIABLE">
    </category>
    `;
};

const myBlocks = function () {
    return `
    <category
        name="%{BKY_CATEGORY_MYBLOCKS}"
        id="myBlocks"
        colour="#FB8F46"
        secondaryColour="#FF4D6A"
        custom="PROCEDURE">
    </category>
    `;
};

const json = function () {
    return `
    <category name="%{BKY_CATEGORY_WIO_TERMINAL_JSON}" colour="#57d4c7" secondaryColour="#57d4c7" id="json">
        <block type="json_wioterminal_json_setvalue">
            <value name="KEY">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>   
            </value> 
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>   
            </value>
            <value name="BROADCAST_OPTION">
                <shadow type="json_wioterminal_json_menu"></shadow>
            </value>
        </block>
        <block type="json_wioterminal_json_getvalue">
            <value name="BROADCAST_OPTION">
                <shadow type="json_wioterminal_json_menu"></shadow>
            </value>
            <value name="KEY">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>   
            </value> 
        </block>
        <block type="json_wioterminal_json_object">
            <value name="BROADCAST_OPTION">
                <shadow type="json_wioterminal_json_menu"></shadow>
            </value>
        </block>
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
        init(), gap,
        input(), gap,
        output(), gap,
        serial(), gap,

        control(), gap,
        // sensing(), gap,
        operators(), gap,
        variables(), gap,

        myBlocks(), gap,

        groveIgure(), gap,
        groveAnalog(), gap,
        groveI2C(), gap,
        json(), gap,
        // robotKit(), gap,
        // ottodiy(), gap,
        // shieldbot(), gap,

        // test(), gap,


        // myBlocks()
    ];

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXML;
