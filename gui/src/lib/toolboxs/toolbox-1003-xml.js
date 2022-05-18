import ScratchBlocks from '../../../../blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const motion = function (isOnline) {
    return `
    <category name="%{BKY_CATEGORY_ACTION}" id="motion" colour="#46D5D1" secondaryColour="#23AAA6">
        <block type="motion_elfbot_vehiclewheel_run_direction_power">
            <value name="POWER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_vehiclewheel_runforword_power_duartion">
            <value name="POWER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
            <value name="DURATION">
                <shadow type="math_cc_duration_time">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_vehiclewheel_runbackword_power_duartion">
            <value name="POWER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
            <value name="DURATION">
                <shadow type="math_cc_duration_time">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_vehiclewheel_runleft_power_duartion">
            <value name="POWER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
            <value name="DURATION">
                <shadow type="math_cc_duration_time">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_vehiclewheel_runright_power_duartion">
            <value name="POWER">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
            <value name="DURATION">
                <shadow type="math_cc_duration_time">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_vehiclewheel_run_power">
            <value name="LEFTPOWER">
                <shadow type="math_cc_min_-100_max_100_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
            <value name="RIGHTPOWER">
                <shadow type="math_cc_min_-100_max_100_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
        </block>
        ${/** 
        <block type="motion_elfbot_vehiclewheel_runforword_duration">
            <value name="DURATION">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_vehiclewheel_runbackword_duration">
            <value name="DURATION">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        */''}
        
        <block type="motion_elfbot_vehiclewheel_run_stop"/>
        ${blockSeparator}
        <block type="motion_elfbot_headservo_lookleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_headservo_lookright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_headservo_lookup">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_headservo_lookdown">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_elfbot_earservo_turnforword">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_elfbot_earservo_turnbackword">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>        
    </category>
    `;
};

const looks = function () {
    const hello = ScratchBlocks.ScratchMsgs.translate('LOOKS_HELLO', 'Hello!');
    const hmm = ScratchBlocks.ScratchMsgs.translate('LOOKS_HMM', 'Hmm...');
    return `
    <category name="%{BKY_CATEGORY_DISPLAY}" id="looks" colour="#B942F7" secondaryColour="#774DCB">
        <block type="looks_elfbot_ledmatrix_showimage"/>
        <block type="looks_elfbot_ledmatrix_showimage_duration">
            <value name="SECS">
                <shadow type="math_cc_duration_time">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="looks_elfbot_ledmatrix_plot">
            <value name="X">
                <shadow type="math_cc_min_0_max_15_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_elfbot_ledmatrix_unplot">
            <value name="X">
                <shadow type="math_cc_min_0_max_15_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_elfbot_ledmatrix_plotorunplot">
            <value name="X">
                <shadow type="math_cc_min_0_max_15_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_elfbot_ledmatrix_isplot">
            <value name="X">
                <shadow type="math_cc_min_0_max_15_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_cc_min_0_max_7_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_elfbot_ledmatrix_showtext">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        <block type="looks_elfbot_ledmatrix_showtext_untildone">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_elfbot_ledmatrix_showemoticon"/>
        <block type="looks_elfbot_ledmatrix_showemoticon_duration">
            <value name="TIMER">
                <shadow type="math_cc_duration_time">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_elfbot_ledmatrix_crushoutscreen"/>
    </category>
    `;
};

const lighting = function () {
    return `
    <category name="%{BKY_CATEGORY_LIGHTING}" id="lighting" colour="#996633" secondaryColour="#774D22">
        <block type="looks_elfbot_rgbled_show_effectscolor">
            <value name="COLOR">
                <shadow type="colour_picker">
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="looks_elfbot_rgbled_show_positioncolor">
            <value name="COLOR">
                <shadow type="colour_picker">
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        <block type="looks_elfbot_rgbled_show_positioncolor_duration">
            <value name="COLOR">
                <shadow type="colour_picker">
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
            <value name="TIMER">
                <shadow type="math_cc_duration_time">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="looks_elfbot_rgbled_show_color"/>
        <block type="looks_elfbot_ultrasonicled_show_color"/>
        <block type="looks_elfbot_rgbled_crushout"/>
        <block type="looks_elfbot_ultrasonicled_crushout"/>
    </category>
    `;
};

const sound = function () {
    return `
    <category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#6278FF" secondaryColour="#BD42BD">
        <block type="sound_elfbot_sound_play"/>
        
        ${''/**
        <block type="sound_elfbot_sound_play_for_duration">
            <value name="DURATION">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        <block type="sound_elfbot_sound_play_untildone"/>
        */}
        ${''/**<block type="sound_elfbot_sound_stop_play"/>*/}
        ${blockSeparator}
        <block type="sound_elfbot_note_beats"/>
        ${''/**<block type="sound_elfbot_sound_rest"/>*/}
        ${blockSeparator}
        <block type="sound_elfbot_sound_play_frequencyhz">
            <value name="HZ">
                <shadow type="math_cc_min_262_max_1976_number">
                    <field name="NUM">500</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_cc_duration_time">
                    <field name="NUM">1</field>
                </shadow>
            </value>    
        </block>
        ${blockSeparator}
        <block type="sound_elfbot_sound_changevolume">
            <value name="VOLUME">
                <shadow type="math_cc_number">
                    <field name="NUM">-10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_elfbot_sound_setvolume">
            <value name="VOLUME">
                <shadow type="math_cc_min_0_max_100_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="sound_elfbot_sound_volume"/>
        ${categorySeparator}
    </category>
    `;
};

const events_offline = function () {
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#19B5FE" secondaryColour="#155f7c">
        <block type="event_elfbot_whenstartup"/>
        <block type="event_elfbot_whenkeysispressed"/>
        ${blockSeparator}
        ${''/**
        <block type="event_elfbot_whenloudnessgreaterthan">
            <value name="LOUDNESS">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="event_elfbot_whenlightintensitylessthan">
            <value name="INTENSITY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="event_elfbot_whenultrasonicdetectedobjectdistance">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">300</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        */}
    </category>
    `;
};

const events_online = function () {
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#19B5FE" secondaryColour="#155f7c">
        <block type="event_elfbot_whenkeysispressed"/>
        ${blockSeparator}
        ${''/**
        <block type="event_elfbot_whenloudnessgreaterthan">
            <value name="LOUDNESS">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="event_elfbot_whenlightintensitylessthan">
            <value name="INTENSITY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="event_elfbot_whenultrasonicdetectedobjectdistance">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">300</field>
                </shadow>
            </value>
        </block>
        
        ${blockSeparator}
        <block type="event_whenbroadcastreceived">
        </block>
        <block type="event_broadcast">
            <value name="BROADCAST_INPUT">
                <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        <block type="event_broadcastandwait">
            <value name="BROADCAST_INPUT">
                <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        ${categorySeparator}
        */}
        
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
                <shadow type="math_cc_min_1_max_999999999_number">
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

const sensing = function () {
    const name = ScratchBlocks.ScratchMsgs.translate('SENSING_ASK_TEXT', 'What\'s your name?');
    return `
    <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#0EC597" secondaryColour="#2E8EB8">
        <block type="sensing_elfbot_ultrasonic_distance"/>
        <block type="sensing_elfbot_ultrasonic_isdetectedobject"/>
        ${blockSeparator}
        <block type="sensing_elfbot_button_s_ispressed"/>
        ${blockSeparator}
        <block type="sensing_elfbot_sound_loudness"/>
        <block type="sensing_elfbot_light_intensity"/>
        ${blockSeparator}
        
        
        ${''/** 
        <block type="sensing_elfbot_infrared_lightintensity"/>
        <block type="sensing_elfbot_infrared_detected_ishead"/>
        ${blockSeparator}
        <block type="sensing_elfbot_linepatrol_grayscale"/>
        <block type="sensing_elfbot_linepatrol_lightintensity"/>
        <block type="sensing_elfbot_linepatrol_get_value"/>
        <block type="sensing_elfbot_linepatrol_last_line"/>
        */}
        <block type="sensing_elfbot_linepatrol_detect_color"/>
        <block type="sensing_elfbot_linepatrol_line_location"/>
        ${categorySeparator}
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
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_cc_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="math_cc_number">
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_cc_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="math_cc_number">
                    <field name="NUM"></field>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_cc_number">
                    <field name="NUM">50</field>
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
                    <field name="TEXT">${apple}</field>
                </shadow>
            </value>
            <value name="STRING2">
                <shadow type="text">
                    <field name="TEXT">${banana}</field>
                </shadow>
            </value>
        </block>
        <block type="operator_letter_of">
            <value name="LETTER">
                <shadow type="math_cc_min_1_max_999999999_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">${apple}</field>
                </shadow>
            </value>
        </block>
        <block type="operator_length">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">${apple}</field>
                </shadow>
            </value>
        </block>
        <block type="operator_contains" id="operator_contains">
          <value name="STRING1">
            <shadow type="text">
              <field name="TEXT">${apple}</field>
            </shadow>
          </value>
          <value name="STRING2">
            <shadow type="text">
              <field name="TEXT">${letter}</field>
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

const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';

/**
 * @param {string?} categoriesXML - null for default toolbox, or an XML string with <category> elements.
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox.
 */
const makeToolboxXML = function (extension) {
    const {
        isOnline,
        key,
        xml,
    } = extension;

    const gap = [categorySeparator];
    const events = isOnline ? events_online : events_offline;
    const everything = [
        xmlOpen,
        search(), gap,
        motion(), gap,
        lighting(), gap,
        looks(), gap,
        sound(), gap,
        control(), gap,
        events(), gap,
        sensing(), gap,
        operators(), gap,
        variables()
    ];

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXML;
