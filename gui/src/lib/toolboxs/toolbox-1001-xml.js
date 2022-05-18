import ScratchBlocks from '../../../../blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const motion = function () {
    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#46D5D1" secondaryColour="#23AAA6">
        <block type="motion_g0_miniwheel_run_velocity_azimuth">
        </block>
        <block type="motion_g0_miniwheel_stop"></block>
        <block type="motion_g0_miniwheel_set_power">
            <value name="LEFT_POWER">
                <shadow type="math_cc_min_-100_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="RIGHT_POWER">
                <shadow type="math_cc_min_-100_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="motion_g0_servo_turn_angle">
            <value name="ANGLE">
                <shadow type="math_cc_min_0_max_180_number">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="motion_g0_dc_motor_trun_power">
            <value name="POWER">
                <shadow type="math_cc_min_-100_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="motion_g0_dc_motor_stop"></block>
        ${categorySeparator}
    </category>
    `;
};

const looks = function () {
    return `
    <category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#B942F7" secondaryColour="#774DCB">
        <block type="looks_g0_ledmatrix_show_shape">
        </block>
        <block type="looks_g0_ledmatrix_show_string">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_ledmatrix_xy_set_on">
            <value name="X">
                <shadow type="math_cc_min_0_max_4_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_5_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_ledmatrix_xy_set_off">
            <value name="X">
                <shadow type="math_cc_min_0_max_4_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_5_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_ledmatrix_clean"></block>
        ${categorySeparator}
        <block type="looks_g0_rgb_led_show_style_color">
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_rgb_led_show_style"></block>
        <block type="looks_g0_rgb_led_fade_from_color1_to_color2">
            <value name="COLOR1">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
            <value name="COLOR2">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#1AD01A</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_rgb_led_set_brightness">
            <value name="BRIGHTNESS">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_rgb_led_light_off"></block>
        ${categorySeparator}
        <block type="sensing_g0_rgb_to_color">
            <value name="RED">
                <shadow type="math_cc_min_0_max_255_number">
                    <field name="NUM">255</field>
                </shadow>
            </value>
            <value name="GREEN">
                <shadow type="math_cc_min_0_max_255_number">
                    <field name="NUM">255</field>
                </shadow>
            </value>
            <value name="BLUE">
                <shadow type="math_cc_min_0_max_255_number">
                    <field name="NUM">255</field>
                </shadow>
            </value>  
        </block>
        <block type="sensing_g0_hsl_to_color">
            <value name="COLOR">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="STATURATION">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="BRIGHTNESS">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>  
        </block>
        ${categorySeparator}
        <block type="looks_g0_rgb_matrix_show_shape"></block>
        <block type="looks_g0_rgb_matrix_show_string">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_rgb_matrix_show_anima">
        </block>
        <block type="looks_g0_rgb_matrix_show_histogram">
            <value name="VALUE">
                <shadow type="math_cc_min_0_max_32_number">
                    <field name="NUM">32</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_rgb_matrix_xy_set_on">
            <value name="X">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_rgb_matrix_xy_set_off">
            <value name="X">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_rgb_matrix_xy_set_on_off">
            <value name="X">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_g0_rgb_matrix_xy_is_on">
            <value name="X">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_g0_rgb_matrix_clean"></block>
        <block type="sensing_g0_rgb_matrix_xy_get_color">
            <value name="X">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="looks_g0_four_digit_display_show_number">
            <value name="VALUE">
                <shadow type="math_cc_min_-999_max_9999_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_g0_four_digit_display_start_countdown">
            <value name="VALUE">
                <shadow type="math_cc_min_0_max_9999_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="event_g0_four_digit_display_when_countdown_end">
        </block>
        <block type="looks_g0_four_digit_display_off"></block>
        <block type="looks_g0_four_digit_display_set_brightness">
            <value name="BRIGHTNESS">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="sensing_g0_mech_key_set_rgb">
            <value name="COLOR">
                <shadow type="colour_picker">
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_g0_mech_key_close">
        </block>
        
    </category>
    `;
};

const sound = function () {
    return `
    <category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#6278FF" secondaryColour="#BD42BD">
        <block type="sound_g0_buzzer_play_melody"></block>
        <block type="sound_g0_buzzer_play_note"></block>
        <block type="sound_g0_buzzer_play_note_for_beat"></block>
        <block type="sound_g0_buzzer_mute_for_beat"></block>
        <block type="sound_g0_buzzer_stop"></block>
        <block type="sound_g0_buzzer_set_bpm">
            <value name="VALUE">
                <shadow type="math_cc_min_60_max_960_number">
                    <field name="NUM">120</field>
                </shadow>
            </value>
        </block>
        <block type="sound_g0_buzzer_add_bpm">
            <value name="VALUE">
                <shadow type="math_cc_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_g0_buzzer_get_bpm"></block>
        ${categorySeparator}
        <block type="sound_g0_mp3_start_play">
            <value name="VALUE">
                <shadow type="math_cc_positive_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="sound_g0_mp3_pause_or_play"></block>
        <block type="sound_g0_mp3_switch"></block>
        
        <block type="sound_g0_mp3_play_mode"></block>

        <block type="sound_g0_mp3_stop_play"></block>

        <block type="sound_g0_mp3_add_volume">
            <value name="VALUE">
                <shadow type="math_cc_number">
                    <field name="NUM">-10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_g0_mp3_set_volume">
            <value name="VALUE">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
    </category>
    `;
};

const events = function () {
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#19B5FE" secondaryColour="#155f7c">
        <block type="event_whenbroadcastreceived">
        </block>
        <block type="event_broadcast">
            <value name="BROADCAST_INPUT">
                <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        ${categorySeparator}

        <block type="event_g0_mainboard_start"></block>
        <block type="event_g0_mainboard_when_arrival_time">
            <value name="TIME">
                <shadow type="math_cc_time_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="event_g0_mainboard_when_radio_receive">
            <value name="RECEIVE">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        <block type="event_g0_mainboard_broadcast">
            <value name="BROADCAST_OPTION">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        <block type="event_g0_mainboard_stop_broadcast"></block>
        <block type="event_g0_mainboard_set_broadcast_channel">
            <value name="VALUE">
                <shadow type="math_cc_min_1_max_64_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="event_g0_twin_button_when_click">
        </block>
        <block type="event_g0_imu9_dof_status_when_change"></block>
        <block type="event_g0_pir_motion_sensor_detect_someone"></block>
        <block type="event_g0_mech_key_when_click"></block>
        <block type="event_g0_knob_when_change"></block>
        <block type="event_g0_gesture_sensor_when_change"></block>
        <block type="event_g0_touchpad_when_click"></block>
    </category>
    `;
};

const control = function () {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#7684A2" secondaryColour="#CF8B17">
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_cc_time_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_cc_positive_whole_number">
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
        ${blockSeparator}
    </category>
    `;
};

const sensing = function () {
    return `
    <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#0EC597" secondaryColour="#2E8EB8">
        <block type="sensing_g0_twin_button_is_pressed"></block>
        <block type="sensing_g0_mech_key_is_pressed"></block>
        <block type="sensing_g0_touchpad_is_pressed"></block>
        <block type="sensing_g0_joystick_is_pushed_to"></block>

        ${categorySeparator}
        <block type="sensing_g0_joystick_get_position"></block>
        <block type="sensing_g0_light_sensor_get_value"></block>
        <block type="sensing_g0_sound_sensor_get_value"></block>
        <block type="sensing_g0_temperature_sensor_get_value"></block>
        <block type="sensing_g0_imu9_dof_get_value"></block>
        <block type="sensing_g0_imu9_magnetic_get_value"></block>
        <block type="sensing_g0_imu9_angular_rate_get_value"></block>
        <block type="sensing_g0_imu9_rotation_get_value"></block>
        <block type="sensing_g0_slider_get_value"></block>
        <block type="sensing_g0_ultrasonic_sensor_get_value"></block>
        <block type="sensing_g0_temhum_sensor_get_tem_value"></block>
        <block type="sensing_g0_temhum_sensor_get_hum_value"></block>
        ${categorySeparator}
        <block type="sensing_g0_color_line_follower_is_position"></block>
        <block type="sensing_g0_color_line_follower_is_color"></block>
        <block type="sensing_g0_color_line_follower_get_color"></block>
        ${categorySeparator}
        <block type="sensing_g0_mainboard_timer">
        </block>
        <block type="sensing_g0_mainboard_resettimer">
        </block>
    </category>
    `;
};

const operators = function () {
    const apple = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_APPLE', 'apple');
    const banana = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_BANANA', 'banana');
    const letter = ScratchBlocks.ScratchMsgs.translate('OPERATORS_LETTEROF_APPLE', 'a');
    return `
    <category name="%{BKY_CATEGORY_OPERATORS}" id="operators" colour="#6DCF68" secondaryColour="#389438">
        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_multiply">
            <value name="NUM1">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_divide">
            <value name="NUM1">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_cc_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_cc_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_cc_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_cc_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_cc_number">
                    <field name="NUM">100</field>
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
        <block type="operator_mod">
            <value name="NUM1">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_round">
            <value name="NUM">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_mathop">
            <value name="NUM">
                <shadow type="math_cc_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="operator_g0_itoa">
            <value name="VALUE">
                <shadow type="math_cc_number">
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
        motion(), gap,
        looks(), gap,
        sound(), gap,
        events(), gap,
        control(), gap,
        sensing(), gap,
        operators(), gap,
        variables(), gap,
        myBlocks()
    ];

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXML;
