// import ScratchBlocks from '../../../../blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const system = function () {
    return `
    <category name="%{BKY_CATEGORY_WIO_TERMINAL_SYSTEM}" colour="#5B96FF" secondaryColour="#4B7DD7" id="system">
        <block type="system_wioterminal_setup_loop"/>
        <block type="system_wioterminal_speaker_playnote"/>
        <block type="system_wioterminal_3_axis_accelerometer"/>    
        <block type="system_wioterminal_light_sensor"/>   
        <block type="system_wioterminal_button_pressed"/>
        <block type="system_wioterminal_5way_switch_pressed"/>
        <block type="system_wioterminal_infrared_send">
            <value name="ADDRESS">
                <shadow type="text">
                    <field name="TEXT">0x89ABCDEF</field>
                </shadow>
            </value>
            <value name="BIT">
                <shadow type="math_cc_number">
                    <field name="NUM">32</field>
                </shadow>
            </value>
        </block>
        <block type="system_wioterminal_sound_sensor"/>
    </category>
    `;
}

const display = function () {
    return `
    <category name="%{BKY_CATEGORY_WIO_TERMINAL_DISPLAY}" colour="#D85BFF" secondaryColour="#B44CD4" id="display">
        <block type="display_wioterminal_screen_towards"/>
        <block type="display_wioterminal_set_screen_background_color">  
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="display_wioterminal_set_text_size"/>
        <block type="display_wioterminal_set_text_color">  
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#000000</field>
                </shadow>
            </value>
        </block>
        <block type="display_wioterminal_println_string">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        <block type="display_wioterminal_print_string_at_point">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
            <value name="X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>       
        <block type="display_wioterminal_screen_clear_reset">  
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#000000</field>
                </shadow>
            </value>
        </block>        
        <block type="display_wioterminal_show_image">
            <value name="IMG_PATH">
                <shadow type="text">
                    <field name="TEXT">image.bmp</field>
                </shadow>
            </value>
            <value name="X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>            
        </block>
        <block type="display_wioterminal_draw_pixel">
            <value name="X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>                      
        </block>
        <block type="display_wioterminal_draw_line">
            <value name="P1X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="P1Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="P2X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="P2Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>            
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="display_wioterminal_draw_rect">
            <value name="X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="WIDTH">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="HEIGHT">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>            
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="display_wioterminal_draw_circle">
            <value name="X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="R">
                <shadow type="math_cc_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>           
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="display_wioterminal_draw_triangles">
            <value name="P1X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="P1Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="P2X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="P2Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="P3X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="P3Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>                          
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>   
        <block type="display_wioterminal_draw_round_rect">
            <value name="X">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="WIDTH">
                <shadow type="math_cc_min_0_max_320_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="HEIGHT">
                <shadow type="math_cc_min_0_max_240_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
            <value name="R">
                <shadow type="math_cc_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>                    
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
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
        <block type="motion_arduino_serial_read">        
        </block>
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
        secondaryColour="#DB6E00"
        custom="VARIABLE">
    </category>
    `;
};

const grove = function () {
    return `
    <category name="%{BKY_CATEGORY_WIO_TERMINAL_GROVE}" colour="#6D7AB6" secondaryColour="#6D7AB6" id="grove">
        <block type="grove_wioterminal_seeed_servo_move">
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
        <block type="grove_wioterminal_seeed_rgb_led">
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
        <block type="grove_wioterminal_seeed_mini_fan">
        </block>
        <block type="grove_wioterminal_seeed_line_finder">        
        </block>
        <block type="grove_wioterminal_seeed_ult">
        
                    <value name="PIN">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>

        </block>
        <block type="grove_wioterminal_seeed_pir_motion">        
        </block>
        <block type="grove_wioterminal_seeed_temperature_humidity">        
        </block>

        ${blockSeparator}
        <block type="grove_wioterminal_seeed_water_analog">        
        </block>

        ${blockSeparator}
        <block type="grove_wioterminal_seeed_temperature_humidity_dht20">        
        </block>
        <block type="grove_wioterminal_rtc_setdatetime">
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
        <block type="grove_wioterminal_rtc_getdate"/>
        <block type="grove_wioterminal_rtc_gettime"/>
    </category>
    `;
};

const azureIoT = function () {
    return `
    <category name="%{BKY_CATEGORY_WIO_TERMINAL_AZURE_IOT}" colour="#0E65A5" secondaryColour="#0E65A5" id="azureIoT">
        <block type="azure_iot_wioterminal_set_wifi">
            <value name="SSID">
                <shadow type="text">
                    <field name="TEXT">ssid</field>
                </shadow>
            </value>
            <value name="PWD">
                <shadow type="text">
                    <field name="TEXT">password</field>
                </shadow>
            </value>
        </block>
        <block type="azure_iot_wioterminal_connect_wifi"></block>
        ${blockSeparator}
        <block type="azure_iot_wioterminal_azure_init">
            <value name="SCOPEID">
                <shadow type="text">
                    <field name="TEXT">scope id</field>
                </shadow>
            </value>
            <value name="KEY">
                <shadow type="text">
                    <field name="TEXT">primary key</field>
                </shadow>
            </value>
            <value name="DEVICE">
                <shadow type="text">
                    <field name="TEXT">device id</field>
                </shadow>
            </value>
        </block>
        <block type="azure_iot_wioterminal_azure_start"></block>
        <block type="azure_iot_wioterminal_azure_connected"></block>
        <block type="azure_iot_wioterminal_azure_publish"></block>
        ${blockSeparator}
        <block type="azure_iot_wioterminal_runClassifier_artificial_nose"></block>
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

const mqtt = function () {
    return `
    <category name="%{BKY_CATEGORY_WIO_TERMINAL_MQTT}" colour="#ab57e6" secondaryColour="#ab57e6" id="mqtt">
        <block type="mqtt_wioterminal_set_wifi">
            <value name="SSID">
                <shadow type="text">
                    <field name="TEXT">ssid</field>
                </shadow>
            </value>
            <value name="PWD">
                <shadow type="text">
                    <field name="TEXT">password</field>
                </shadow>
            </value>
        </block>
        <block type="mqtt_wioterminal_set_mqtt">
            <value name="BROKER">
                <shadow type="text">
                    <field name="TEXT">broker.hivemq.com</field>
                </shadow>
            </value>
            <value name="DEVICE">
                <shadow type="text">
                    <field name="TEXT">device</field>
                </shadow>
            </value>
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">username</field>
                </shadow>
            </value>
            <value name="PASSWORD">
                <shadow type="text">
                    <field name="TEXT">password</field>
                </shadow>
            </value>
        </block>
        <block type="mqtt_wioterminal_connect_mqtt"></block>
        <block type="mqtt_wioterminal_connected"></block>
        ${blockSeparator}
        <block type="mqtt_wioterminal_received">
            <value name="BROADCAST_OPTION">
                <shadow type="mqtt_wioterminal_channel_menu"></shadow>
            </value>
        </block>
        <block type="mqtt_wioterminal_subscribe">
            <value name="BROADCAST_OPTION">
                <shadow type="mqtt_wioterminal_channel_menu"></shadow>
            </value>
        </block>
        <block type="mqtt_wioterminal_publish">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">data</field>
                </shadow>   
            </value>
            <value name="BROADCAST_OPTION">
                <shadow type="mqtt_wioterminal_channel_menu"></shadow>
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
        system(), gap,
        display(), gap,
        serial(), gap,

        control(), gap,
        
        operators(), gap,
        variables(), gap,
        grove(), gap,
        azureIoT(), gap,
        json(), gap,
        mqtt()
    ];

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXML;
