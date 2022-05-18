import ScratchBlocks from '../../../../blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const common = function () {
    return `
    <category name="%{BKY_CATEGORY_COMMON}" id="common" colour="#0ED5ED" secondaryColour="#0DB8CD">
        <block type="event_mpython_whenstartup"/>
        <block type="control_mpython_print">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="control_if"/>
        <block type="control_if_else"/>
        <block id="forever" type="control_forever"/>
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_cc_time_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_mpython_print">
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

const events = function () {
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#19B5FE" secondaryColour="#0A93BF">
        <block type="event_mpython_whenstartup"/>
        <block type="event_mpython_whenaction"/>
        <block type="event_mpython_whenpinvoltage"/>
        ${blockSeparator}
        <block type="event_mpython_whenshark"/>
        <block type="event_mpython_whentilt"/>
        <block type="event_mpython_whentouchkey"/>
        ${blockSeparator}
        <block type="event_mpython_set_timer">
            <value name="PERIOD">
                <shadow type="math_number">
                    <field name="NUM">2000</field>
                </shadow>
            </value>
        </block>
        <block type="event_mpython_cleartimer"/>
        <block type="event_mpython_timer_count"/>
        ${blockSeparator}
        <block type="event_mpython_set_event">
            <value name="EVENT">
                <shadow type="math_number">
                    <field name="NUM"></field>
                </shadow>
            </value>
        </block>
        <block type="event_mpython_child_thread"/>
    </category>
    `;
};

const sysresoures = function () {
    return `
    <category name="%{BKY_CATEGORY_SYSTEM}" id="sysresoures" colour="#FF7BC0" secondaryColour="#E761A7">
        <block type="motion_mpython_sysresoures_buttonpressed"></block>
        <block type="motion_mpython_sysresoures_buttontouched"></block>
        ${blockSeparator}
        <block type="motion_mpython_sysresoures_touchvalue"></block>
        <block type="motion_mpython_sysresoures_volume"></block>
        <block type="motion_mpython_sysresoures_light"></block>
        ${blockSeparator}
        <block type="motion_mpython_sysresoures_acceleration"></block>
        <block type="motion_mpython_sysresoures_slope"></block>
        ${blockSeparator}
        <block type="motion_mpython_sysresoures_sharked"></block>
        <block type="motion_mpython_sysresoures_slope_angle"></block>
        ${blockSeparator}
        <block type="motion_mpython_sysresoures_set_single_color">
            <value name="LED">
                <shadow type="math_number" >
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_sysresoures_set_single_rgb">
            <value name="LED">
                <shadow type="math_number" >
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="R">
                <shadow type="math_cc_min_0_max_255_number">
                    <field name="NUM">255</field>
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
        <block type="motion_mpython_sysresoures_set_all_color">
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_sysresoures_set_all_rgb">
            <value name="R">
                <shadow type="math_cc_min_0_max_255_number">
                    <field name="NUM">255</field>
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
        <block type="motion_mpython_sysresoures_close_rgb"></block>
        ${blockSeparator}
        <block type="motion_mpython_sysresoures_set_bme280"></block>
        <block type="motion_mpython_sysresoures_draw_clock">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">64</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">32</field>
                </shadow>
            </value>
            <value name="R">
                <shadow type="math_cc_min_0_max_30_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>  
        </block>
        <block type="motion_mpython_sysresoures_clock_operate"></block>
        <block type="motion_mpython_sysresoures_set_run_time"></block>
        <block type="motion_mpython_sysresoures_set_local_time"></block>
        <block type="motion_mpython_sysresoures_reset"></block>
        <block type="motion_mpython_sysresoures_mac_address"></block>
    </category>
    `;
}

const looks = function () {
    return `
    <category name="%{BKY_CATEGORY_SHOW}" id="looks" colour="#ADD652" secondaryColour="#89AE36">
        <block type="looks_mpython_oled"></block>
        ${blockSeparator}
        <block type="looks_mpython_oled_line_text">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">Hello,World!</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_oled_clear_line"></block>
        ${blockSeparator}
        <block type="looks_mpython_display_text">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">Hello,World!</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_trace_point">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_progress">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
            <value name="W">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">70</field>
                </shadow>
            </value>
            <value name="H">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">8</field>
                </shadow>
            </value>
            <value name="PROGRESS">
                <shadow type="math_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_column_strip">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">64</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="W">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">6</field>
                </shadow>
            </value>
            <value name="H">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
            <value name="PROGRESS">
                <shadow type="math_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_mpython_draw_line">
            <value name="X1">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">64</field>
                </shadow>
            </value>
            <value name="Y1">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="X2">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y2">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_draw_frame">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="W">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="H">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_draw_arc_border">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">40</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="W">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="H">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">30</field>
                </shadow>
            </value>
            <value name="R">
                <shadow type="math_cc_min_0_max_30_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_draw_rect">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="W">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="H">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_mpython_draw_circle">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">64</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">32</field>
                </shadow>
            </value>
            <value name="R">
                <shadow type="math_cc_min_0_max_30_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_draw_triangle">
            <value name="X1">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">60</field>
                </shadow>
            </value>
            <value name="Y1">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="X2">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="Y2">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
            <value name="X3">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">40</field>
                </shadow>
            </value>
            <value name="Y3">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">40</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_draw_display_picture">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">32</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_draw_display">
            <value name="X">
                <shadow type="math_cc_min_0_max_127_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_63_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="DISPLAY">
                <shadow type="text">
                    <field name="TEXT">12:34</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
}

const music = function () {
    return `
    <category name="%{BKY_CATEGORY_MUSIC}" id="music" colour="#6179E0" secondaryColour="#3F57BA">
        <block type="sound_mpython_music_stop_play"/>
        <block type="sound_mpython_restore_music_set"/>
        ${blockSeparator}
        <block type="sound_mpython_note_beat"/>
        <block type="sound_mpython_note_beat_pin"/>
        ${blockSeparator}
        <block type="sound_mpython_music_tone"/>
        <block type="sound_mpython_play_tone_pin">
            <value name="DELAY">
                <shadow type="math_number">
                    <field name="NUM">500</field>
                </shadow>
            </value>
        </block>
        <block type="sound_mpython_play_tone_pin_para">
            <value name="START">
                <shadow type="math_number">
                    <field name="NUM">880</field>
                </shadow>
            </value>
            <value name="END">
                <shadow type="math_number">
                    <field name="NUM">1760</field>
                </shadow>
            </value>
            <value name="STEP">
                <shadow type="math_number">
                    <field name="NUM">16</field>
                </shadow>
            </value>
            <value name="DURATION">
                <shadow type="math_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sound_mpython_play_music_pin"/>
        <block type="sound_mpython_set_play_speed">
            <value name="SPEED">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="sound_mpython_music_set_beat">
            <value name="NOTE">
                <shadow type="math_number">
                    <field name="NUM">4</field>
                </shadow>
            </value>
            <value name="BEAT">
                <shadow type="math_number">
                    <field name="NUM">120</field>
                </shadow>
            </value>
        </block>
        <block type="sound_mpython_set_current_beat"/>
    </category>
    `;
};

const buzzer = function () {
    return `
    <category name="%{BKY_CATEGORY_AUDIO}" id="buzzer" colour="#0EC597" secondaryColour="#50D9D5">
        <block type="motion_mpython_buzzer_init"/>
        <block type="motion_mpython_buzzer_release_cache"/>
        ${blockSeparator}
        <block type="motion_mpython_set_bizzer_volume">
            <value name="VOLUMN">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_set_bizzer_action"/>
        <block type="motion_mpython_bizzer_play">
            <value name="URL">
                <shadow type="text">
                    <field name="TEXT">http://wiki.labplus.cn/images/4/4e/Music_test.mp3</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_mpython_tts_voice_conf">
            <value name="APPID">
                <shadow type="text">
                    <field name="TEXT"> </field>
                </shadow>
            </value>
            <value name="APIKEY">
                <shadow type="text">
                    <field name="TEXT"> </field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_tts_voice_play">
            <value name="CONTENT">
                <shadow type="text">
                    <field name="TEXT">白日依山尽，黄河入海流。欲穷千里目，更上一层楼</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

const pin = function () {
    return `
    <category name="%{BKY_CATEGORY_PIN}" id="pin" colour="#9300D5" secondaryColour="#6C5BAC">
        <block type="motion_mpython_get_pin_value"/>
        <block type="motion_mpython_set_pin_value"/>
        ${blockSeparator}
        <block type="motion_mpython_get_pin_analog_value"/>
        <block type="motion_mpython_set_pin_analog_value">
            <value name="PWM">
                <shadow type="math_number">
                    <field name="NUM">1023</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_mpython_set_servo_angle">
            <value name="ANGLE">
                <shadow type="math_number">
                    <field name="NUM">60</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_set_servo_pwm_maxangle">
            <value name="ANGLE">
                <shadow type="math_number">
                    <field name="NUM">60</field>
                </shadow>
            </value>
            <value name="PWMSTART">
                <shadow type="math_number">
                    <field name="NUM">750</field>
                </shadow>
            </value>
            <value name="PWMEND">
                <shadow type="math_number">
                    <field name="NUM">2250</field>
                </shadow>
            </value>
            <value name="MAXANGLE">
                <shadow type="math_number">
                    <field name="NUM">180</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_mpython_set_pin_mode"/>
        <block type="motion_mpython_external_level_duration"/>
        ${blockSeparator}
        <block type="motion_mpython_dht11_value"/>
        <block type="motion_mpython_dht22_value"/>
        ${blockSeparator}
        <block type="motion_mpython_init_i2c_baud_rate"/>
        <block type="motion_mpython_init_i2c_scl_sda_baud"/>
        <block type="motion_mpython_i2c_address_write">
            <value name="ADDRESS">
                <shadow type="math_number">
                    <field name="NUM">38</field>
                </shadow>
            </value>
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_i2c_address_get_bytes_num">
            <value name="ADDRESS">
                <shadow type="math_number">
                    <field name="NUM">38</field>
                </shadow>
            </value>
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_mpython_hcsr04_ultrasonic_init">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">hcsr04</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_hcsr04_ultrasonic_distance_unit">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">hcsr04</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

const radio = function () {
    return `
    <category name="%{BKY_CATEGORY_RADIO}" id="radio" colour="#AC8C00" secondaryColour="#8A6A5F">
        <block type="motion_mpython_radio_action"/>
        <block type="motion_mpython_set_radio_channel">
            <value name="CHANNEL">
                <shadow type="math_number">
                    <field name="NUM">13</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_set_radio_send_mes">
            <value name="MES">
                <shadow type="text">
                    <field name="TEXT">msg</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_get_radio_mes"/>
        ${blockSeparator}

        <block type="motion_mpython_when_get_special_radio_mes_action">
            <value name="MES">
                <shadow type="text">
                    <field name="TEXT">ON</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

{/* <block type="motion_mpython_when_get_radio_mes_action">
        
</block> */}

const wifi = function () {
    return `
    <category name="Wi-Fi" colour="#A6627B" id="wifi" secondaryColour="#8E4E66">
        <block type="motion_mpython_wifi_connect">
            <value name="WIFI">
                <shadow type="text">
                    <field name="TEXT">my_wifi</field>
                </shadow>
            </value>
            <value name="PASSWORD">
                <shadow type="text">
                    <field name="TEXT">1234</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_wifi_disconnect"/>
        <block type="motion_mpython_wifi_connected"/>
        ${blockSeparator}
        <block type="motion_mpython_wifi_all_conf"/>
        <block type="motion_mpython_wifi_conf_mes"/>
        ${blockSeparator}
        <block type="motion_mpython_open_ap_mode">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">mPython</field>
                </shadow>
            </value>
            <value name="CHANNEL">
                <shadow type="math_number">
                    <field name="NUM">11</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_close_ap_mode"/>
        <block type="motion_mpython_sync_network_time">
            <value name="SERVER">
                <shadow type="text">
                    <field name="TEXT">ntp.ntsc.ac.cn</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

const neopixel = function () {
    return `
    <category name="Neopixel" colour="#979078"  id="neopixel" secondaryColour="#979078">
        <block type="motion_mpython_neopixel_init">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">my_rgb</field>
                </shadow>
            </value>
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_neopixel_channel_color">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">my_rgb</field>
                </shadow>
            </value>
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_neopixel_channel_rgb">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">my_rgb</field>
                </shadow>
            </value>
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
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
        ${blockSeparator}
        <block type="motion_mpython_neopixel_full_light_color">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">my_rgb</field>
                </shadow>
            </value>
            <value name="COLOR">
                <shadow type="colour_picker">
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_neopixel_full_light_rgb">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">my_rgb</field>
                </shadow>
            </value>
            <value name="R">
                <shadow type="math_number">
                    <field name="NUM">255</field>
                </shadow>
            </value>
            <value name="G">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_mpython_neopixel_close">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">my_rgb</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_mpython_neopixel_rainbow_light_effect">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">my_rgb</field>
                </shadow>
            </value>
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">3</field>
                </shadow>
            </value>
            <value name="LIGHT">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="OFFSET">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_mpython_neopixel_set_write">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">my_rgb</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

const control = function () {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#7684A2" secondaryColour="#5C6C8E">
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
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block id="forever" type="control_forever"/>
        <block id="repeat_until" type="control_repeat_until"/>
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
        <block type="control_mpython_each_project_for"/>
        <block type="motion_arduino_break"/>
        ${blockSeparator}
        <block type="control_if"/>
        <block type="control_if_else"/>
        <block id="wait_until" type="control_wait_until"/>  
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
        <block type="operators_mpython_get_type_">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
        </block>
        <block type="operators_mpython_judge_type">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM"/>
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
        <block type="operators_mpython_mod_int">
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
        <block type="operators_mpython_get_const"/>
        <block type="operators_mpython_judge_result">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="operators_mpython_keep_two_decimals">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">3.1415926</field>
                </shadow>
            </value>
            <value name="RESULT">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="operators_mpython_limit_range">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="START">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="END">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="operators_mpython_mapping_range">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="START1">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="START2">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="END1">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="END2">
                <shadow type="math_number">
                    <field name="NUM">200</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="operators_mpython_conversion_type"/>
        ${categorySeparator}
        <block type="operator_arduino_itoa">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM"/>
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

const grovezero = function () {
    return `
    <category name="GroveZero" colour="#1E8ADF" id="grovezero" secondaryColour="#1779C6">
        <block type="motion_mpython_g0_miniwheel_run_velocity_azimuth">
        </block>
        <block type="motion_mpython_g0_miniwheel_stop"></block>
        <block type="motion_mpython_g0_miniwheel_set_power">
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
        <block type="motion_mpython_g0_color_line_follower_position"/>
        <block type="motion_mpython_g0_color_line_follower_seeing"/>
        <block type="motion_mpython_g0_color_line_follower_color"/>
        ${categorySeparator}
        <block type="motion_mpython_g0_servo_turn_angle">
            <value name="ANGLE">
                <shadow type="math_cc_min_0_max_180_number">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
        <block type="motion_mpython_g0_dc_motor_trun_power">
            <value name="POWER">
                <shadow type="math_cc_min_-100_max_100_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="motion_mpython_g0_dc_motor_stop"></block>
        ${categorySeparator}
        <block type="sensing_mpython_g0_twin_button_is_pressed" />
        <block type="sensing_mpython_g0_mech_key_is_pressed" />
        <block type="sensing_mpython_g0_mech_key_set_rgb">
            <value name="COLOR">
                <shadow type="colour_picker">
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="sensing_mpython_g0_mech_key_close" />
        <block type="sensing_mpython_g0_touchpad_is_pressed" />
        ${categorySeparator}
        <block type="sensing_mpython_g0_light_sensor_get_value" />
        <block type="sensing_mpython_g0_sound_sensor_get_value" />
        <block type="sensing_mpython_g0_temperature_sensor_get_value" />
        <block type="sensing_mpython_g0_imu9_dof_get_value" />
        <block type="sensing_mpython_g0_slider_get_value" />
        <block type="sensing_mpython_g0_ultrasonic_sensor_get_value" />
        <block type="sensing_mpython_g0_temhum_sensor_get_tem_value" />
        <block type="sensing_mpython_g0_temhum_sensor_get_hum_value" />
        ${categorySeparator}
        <block type="looks_mpython_g0_rgb_matrix_show_shape" />
        <block type="looks_mpython_g0_rgb_matrix_show_string">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_g0_rgb_matrix_show_anima">
        </block>
        <block type="looks_mpython_g0_rgb_matrix_show_histogram">
            <value name="VALUE">
                <shadow type="math_cc_min_0_max_32_number">
                    <field name="NUM">32</field>
                </shadow>
            </value>
        </block>
        <block type="looks_mpython_g0_rgb_matrix_xy_set_on">
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
        <block type="looks_mpython_g0_rgb_matrix_xy_set_off">
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
        <block type="looks_mpython_g0_rgb_matrix_xy_set_on_off">
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
        <block type="sensing_mpython_g0_rgb_matrix_clean" />
        ${categorySeparator}
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
        common(), gap,
        sysresoures(), gap,
        events(), gap,
        looks(), gap,
        music(), gap,
        buzzer(), gap,
        pin(), gap,
        radio(), gap,
        wifi(), gap,
        neopixel(), gap,
        control(), gap,
        operators(), gap,
        grovezero(), gap,
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
