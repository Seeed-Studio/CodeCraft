import ScratchBlocks from '../../../../blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const events = function () {
    return `
    <category name="%{BKY_CATEGORY_MAXIDUINO_SYSTEM}" id="events" colour="#19B5FE" secondaryColour="#0A93BF">
        <block type="event_maixduino_whenstartup"/>
        <block type="event_maixduino_delay">  
            <value name="DELAY_TIME">
                <shadow type="math_number">
                    <field name="NUM">1000</field>
                </shadow>   
            </value>      
        </block>
        <block type="event_maixduino_runtime"/> 
        ${blockSeparator}
        <block type="event_maixduino_analog_input"/>  
        ${blockSeparator}
        <block type="event_maixduino_figure_input"/>  
        <block type="event_maixduino_figure_output"/>  
        ${blockSeparator}
        <block type="motion_maixduino_camera_take_a_picture">
            <value name="PHOTOFILE">
                <shadow type="text">
                    <field name="TEXT">image_1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_maixduino_camera_video">
            <value name="TIME">
                <shadow type="math_number">
                    <field name="NUM">3</field>
                </shadow>
            </value>
            <value name="VIDEOFILE">
                <shadow type="text">
                    <field name="TEXT">video_1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_maixduino_print">
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
    </category>
    `;
};

{/* <block type="sensing_maixduino_print">
<value name="VALUE">
    <shadow type="text">
        <field name="TEXT">1</field>
    </shadow>
</value>
</block> */}

{/* <block type="looks_maixduino_camera_set_screen"/> */}

const looks = function () {
    return `
    <category name="%{BKY_CATEGORY_DISPLAY1}" id="looks" colour="#797FFE" secondaryColour="#5F64DA">
        <block type="looks_maixduino_dispalystr_atrow">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">hello world</field>
                </shadow>
            </value>
        </block>
        <block type="looks_maixduino_dispalystr_atposition">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">hello world</field>
                </shadow>
            </value>
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
        <block type="looks_maixduino_display_img">
            <value name="IMG_PATH">
                <shadow type="text">
                    <field name="TEXT">/sd/img.jpg</field>
                </shadow>
            </value>
        </block>
        <block type="looks_maixduino_draw_circle">
            <value name="XCOORD">
                <shadow type="math_number">
                    <field name="NUM">120</field>
                </shadow>
            </value>
            <value name="YCOORD">
                <shadow type="math_number">
                    <field name="NUM">160</field>
                </shadow>
            </value>
            <value name="RVALUE">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="looks_maixduino_draw_rectangle_wh">
            <value name="W">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="H">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">120</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">160</field>
                </shadow>
            </value>
        </block>
        <block type="looks_maixduino_draw_rectangle">
            <value name="XMIN">
                <shadow type="math_number">
                    <field name="NUM">70</field>
                </shadow>
            </value>
            <value name="YMIN">
                <shadow type="math_number">
                    <field name="NUM">135</field>
                </shadow>
            </value>
            <value name="XMAX">
                <shadow type="math_number">
                    <field name="NUM">170</field>
                </shadow>
            </value>
            <value name="YMAX">
                <shadow type="math_number">
                    <field name="NUM">185</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
}
const camera = function () {
    return `
    <category name="%{BKY_CATEGORY_MACHINE_VISION}" id="camera" colour="#18CDC9" secondaryColour="#14B2AF">
        <block type="sensing_maixduino_camera_set_threshold">
            <value name="THRESHOLD">
                <shadow type="math_number">
                    <field name="NUM">4000</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sensing_maixduino_camera_is_ball"/>
        <block type="sensing_maixduino_camera_is_ball_atsizecolor"/>

        <block type="sensing_maixduino_camera_circle_detected_rgb"/>
        <block type="sensing_maixduino_camera_circle_detected_obj"/>        
        <block type="sensing_maixduino_camera_circle_detected_xyr"/>     
        ${blockSeparator}
        <block type="sensing_maixduino_camera_is_rectangle"/>
        <block type="sensing_maixduino_camera_is_rectangle_atsizecolor"/>

        <block type="sensing_maixduino_camera_rectangle_detected_rgb"/>
        <block type="sensing_maixduino_camera_rectangle_detected_obj"/>
        <block type="sensing_maixduino_camera_rectangle_detected_xywh"/>
        ${blockSeparator}
        <block type="sensing_maixduino_camera_colorline_setcolor"/>
        <block type="sensing_maixduino_camera_colorline_setweight">
            <value name="A">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">70</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="C">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_camera_colorline_turnangle"/>
        ${blockSeparator}
        <block type="sensing_maixduino_camera_detectedface"/>
        <block type="sensing_maixduino_camera_detectedface_position"/>
        ${blockSeparator}
        <block type="sensing_maixduino_camera_detected_apriltag">
            <value name="Tag_ID">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="Tag ID">0</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_camera_detected_apriltag_position">
            <value name="Tag_ID">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="Tag ID">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}        
        <block type="sensing_maixduino_camera_init_trackingtarget"/>
        <block type="sensing_maixduino_camera_target_position"/>
    </category>
    `;
}
const sensing = function () {
    return `
    <category name="%{BKY_CATEGORY_CNN_MODELS}" id="animalDetection" colour="#fb8f46" secondaryColour="#e0803e">
        <block type="sensing_maixduino_traffic_signs_detection_boolean">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_traffic_signs_detection_property">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_traffic_signs_detection_string">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sensing_maixduino_num_detection_boolean">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_num_detection_property">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_num_detection_number">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sensing_maixduino_home_animal_detection_boolean">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_home_animal_detection_string">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sensing_maixduino_zoo_animal_detection_boolean">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_zoo_animal_detection_string">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sensing_maixduino_ordinary_object_detection_boolean">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_ordinary_object_detection_string">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sensing_maixduino_face_detection_register_face">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">John</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_face_detection_is_id">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="ID">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">80</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_face_detection_get_recognition_property">
            <value name="ID">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">80</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_face_detection_get_recognition_results">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">80</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_face_detection_clear_db"></block>
        <block type="sensing_maixduino_face_detection_get_detection_status">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">40</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_face_detection_get_detection_property">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">40</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_maixduino_face_detection_get_object_property">
            <value name="NUMBER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">40</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
    </category>
    `;
}

const input = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_INPUT}" colour="#dd66ff" secondaryColour="#bc56d9" id="input">
        <block type="motion_maixduino_input_systemtime"/>        
    </category>
    `;
}

{/* <block type="motion_maixduino_analog_input"/>         */ }

const output = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_OUTPUT}" colour="#FF6A66" secondaryColour="#dc5855" id="output">
        <block type="motion_maixduino_figure_output"/>        
        <block type="motion_maixduino_analog_output">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>    
        </block>
    </category>
    `;
}

const serialport = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_SERIAL}" colour="#10A68F" secondaryColour="#0E9681" id="serial">
        <block type="motion_arduino_serial_baud_rate"/>        
        <block type="motion_arduino_serial_print">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>   
            </value>       
        </block>
        <block type="motion_arduino_serial_is_readable"/>        
        <block type="motion_arduino_serial_read"/>        
    </category>
    `;
}

const control = function () {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#7684A2" secondaryColour="#CF8B17">
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
        ${blockSeparator}
        <block type="motion_arduino_break"/>
        <block type="motion_arduino_keep_wait"/>
        ${blockSeparator}
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
        ${categorySeparator}
    </category>
    `;
};

// const sensing = function () {
//     return `
//     <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
//     </category>
//     `;
// };

const operators = function () {
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
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM"></field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM"></field>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM"></field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_and"/>
        <block type="operator_or"/>
        <block type="operator_not"/>
        ${blockSeparator}
        <block type="operator_join">
            <value name="STRING1">
                <shadow type="text">
                    <field name="TEXT">smart</field>
                </shadow>
            </value>
            <value name="STRING2">
                <shadow type="text">
                    <field name="TEXT">robot</field>
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
                    <field name="TEXT">smart</field>
                </shadow>
            </value>
        </block>
        <block type="operator_length">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">smart</field>
                </shadow>
            </value>
        </block>
        <block type="operator_contains" id="operator_contains">
            <value name="STRING1">
                <shadow type="text">
                <field name="TEXT">smart</field>
                </shadow>
            </value>
            <value name="STRING2">
                <shadow type="text">
                <field name="TEXT">a</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_mod">
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
        <block type="operator_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_mathop">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
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

// const grovedigit = function () {
//     return `
//     <category name="%{BKY_CATEGORY_MAIXDUINO_GROVE}" colour="#A177EE" secondaryColour="#8A64CE" id="groveIgure">
//         <block type="motion_maixduino_seeed_btn"/>         
//         <block type="motion_maixduino_seeed_line_finder"/>  
//         ${blockSeparator}
//         <block type="motion_maixdunio_grove_temphum"/>  
//         <block type="motion_maixduino_seeed_ult"/>  
//         <block type="motion_maixdunio_grove_serial_3ada16"/>  
//         ${blockSeparator}
//         <block type="motion_maixduino_led_strip1">
//             <value name="NO">
//                 <shadow type="math_number">
//                     <field name="NUM">1</field>
//                 </shadow>
//             </value>        
//             <value name="COLOR">
//                 <shadow type="colour_picker" >
//                     <field name="COLOUR">#FF0000</field>
//                 </shadow>
//             </value>
//         </block>
//         <block type="motion_maixduino_led_strip2">  
//             <value name="NO">
//                 <shadow type="math_number">
//                     <field name="NUM">1</field>
//                 </shadow>
//             </value>        
//             <value name="R">
//                 <shadow type="math_cc_min_0_max_255_number">
//                     <field name="NUM">0</field>
//                 </shadow>
//             </value>
//             <value name="G">
//                 <shadow type="math_cc_min_0_max_255_number">
//                     <field name="NUM">0</field>
//                 </shadow>
//             </value>
//             <value name="B">
//                 <shadow type="math_cc_min_0_max_255_number">
//                     <field name="NUM">0</field>
//                 </shadow>
//             </value>       
//         </block>    
//         <block type="motion_maixduino_led_strip_off"/>   
//     </category>
//     `;
// }

// <block type="motion_maixdunio_grove_speech_recognizer"/>  

const grovedigit = function () {
    return `
    <category name="%{BKY_CATEGORY_MAIXDUINO_GROVE}" colour="#A177EE" secondaryColour="#8A64CE" id="groveIgure">
        <block type="motion_maixduino_seeed_btn"/>        
        <block type="motion_maixdunio_grove_color"/>  
        <block type="motion_maixdunio_grove_gesture"/>  
        <block type="motion_maixdunio_grove_serial_touch"/>  
        <block type="motion_maixduino_seeed_line_finder"/>  
        ${blockSeparator}
        <block type="motion_maixdunio_grove_temphum"/>  
        <block type="motion_maixduino_seeed_ult"/>  
        <block type="motion_maixdunio_grove_serial_3ada16"/>  
        ${blockSeparator}
        <block type="motion_maixdunio_grove_series_lanterns_show">
            <value name="NO">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value> 
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#00FFFF</field>
                </shadow>
            </value>
        </block>
        <block type="motion_maixdunio_grove_led_lightbar_show">
            <value name="NO">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value> 
        </block>
        ${blockSeparator}
        <block type="motion_maixduino_led_strip1">
            <value name="NO">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>        
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="motion_maixduino_led_strip2">  
            <value name="NO">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>        
            <value name="R">
                <shadow type="math_cc_min_0_max_255_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="G">
                <shadow type="math_cc_min_0_max_255_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_cc_min_0_max_255_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>       
        </block>    
        <block type="motion_maixduino_led_strip_off"/>   
        ${blockSeparator}
        <block type="motion_maixduino_grove_serial_rgb_led_matrix_on_point">
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
        <block type="motion_maixduino_grove_serial_rgb_led_matrix_show_text">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value> 
        </block>
        <block type="motion_maixduino_grove_serial_rgb_led_matrix_show_emoji"/>
        ${blockSeparator}
        <block type="motion_maixdunio_seeed_4digit_display">    
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>  
        </block>
    </category>
    `;
}

// const grovei2c = function () {
//     return `
//     <category name="%{BKY_CATEGORY_ARDUINO_GROVE_I2C}" colour="#FF5FA6" secondaryColour="#D7508C" id="groveI2C">
//         <block type="motion_maixduino_oled1"/>
//         <block type="motion_maixduino_oled2">
//             <value name="TEXT">
//                 <shadow type="text">
//                     <field name="TEXT">hello</field>
//                 </shadow>
//             </value>
//             <value name="ROW">
//                 <shadow type="math_number">
//                     <field name="NUM">1</field>
//                 </shadow>
//             </value>
//             <value name="COL">
//                 <shadow type="math_number">
//                     <field name="NUM">1</field>
//                 </shadow>
//             </value>
//         </block>
//     </category>
//     `;
// }

const robotkit = function () {
    return `
    <category name="%{BKY_CATEGORY_MAIXDUINO_MARK}" colour="#CBA272" secondaryColour="#A6855E" id="robotKit">
        <block type="motion_maixduino_mark_headlights_show">  
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#00FFFF</field>
                </shadow>
            </value>
        </block>       
        <block type="motion_maixduino_mark_lights_crushout"/> 
        ${blockSeparator}
        <block type="motion_maixduino_mark_run"/>
        <block type="motion_maixduino_mark_stop"/>
        <block type="motion_maixduino_mark_motorrun">
            <value name="SPEED">
                <shadow type="math_cc_min_-100_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_maixduino_mark_stepper_servo_turn">
            <value name="ANGLE">
                <shadow type="math_integer">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="SPEED">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="SENSITIVITY">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">70</field>
                </shadow>
            </value>
        </block>  
        ${blockSeparator}
        <block type="motion_maixduino_mark_servorun">
            <value name="ANGLE">
                <shadow type="math_number">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>      
        ${blockSeparator}
        <block type="motion_maixduino_mark_speaker_playnote"/>
        <block type="motion_maixduino_mark_speaker_pause"/>   
        ${blockSeparator}
        <block type="motion_maixduino_mark_stepper_servo_setangle"/>
        <block type="motion_maixduino_mark_stepper_servo_setrotatespeed">
            <value name="ROTATESPEED">
                <shadow type="math_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
        </block>
        <block type="motion_maixduino_mark_stepper_servo_run">
            <value name="STEP">
                <shadow type="math_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
}

const myBlocks = function () {
    return `
    <category
        name="%{BKY_CATEGORY_MYBLOCKS}"
        id="myBlocks"
        colour="#FB8F46"
        secondaryColour="#fc683a"
        custom="PROCEDURE">
    </category>
    `;
};

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
        events(), gap,
        looks(), gap,
        camera(), gap,
        sensing(), gap,
        robotkit(), gap,
        // input(), gap,
        // output(), gap,
        // serialport(), gap,
        control(), gap,
        operators(), gap,
        variables(), gap,
        grovedigit(), gap,
        // grovei2c(), gap,
        myBlocks(), gap
    ];

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXML;
