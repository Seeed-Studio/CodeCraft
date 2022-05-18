import ScratchBlocks from '../../../../blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function () {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const sensor = function () {
    return `
    <category name="%{BKY_CATEGORY_SENSOR}" id="sensor" colour="#4cbbd6" secondaryColour="#2f96ae">
        <block type="sensing_microbit_sensor_buttonpressed"/>
        ${blockSeparator}
        <block type="sensing_microbit_sensor_gestureis"/>
        <block type="sensing_microbit_sensor_acceleration"/>
        ${blockSeparator}
        <block type="sensing_microbit_sensor_compassangle"/>
        <block type="sensing_microbit_sensor_compassmagneticdensity"/>
        <block type="sensing_microbit_sensor_calibratecompass"/>
        ${blockSeparator}
        <block type="sensing_microbit_sensor_temperature"/>
        ${blockSeparator}
        <block type="sensing_microbit_sensor_runningtime"/>
        ${categorySeparator}
    </category>
    `;
};

const show = function () {
    return `
    <category name="%{BKY_CATEGORY_SHOW}" id="show" colour="#add652" secondaryColour="#89ae36">
        <block type="looks_microbit_showimage"/>
        <block type="looks_microbit_showimage_for">
            <value name="SECS">
                <shadow type="math_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_microbit_showmirroringimage"/>
        <block type="looks_microbit_setimage">
            <value name="VALUE">
                <shadow type="math_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_microbit_showtext">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">Hello</field>
                </shadow>
            </value>
        </block>
        <block type="looks_microbit_showtext_until">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">Hello</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="looks_microbit_close_matrix"/>
        ${blockSeparator}
        <block type="looks_microbit_lightuporoff">
            <value name="X">
                <shadow type="math_whole_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_whole_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_microbit_lightonbrightness">
            <value name="X">
                <shadow type="math_whole_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_whole_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_microbit_lightbrightness">
            <value name="X">
                <shadow type="math_whole_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_whole_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
    </category>
    `;
};

const music = function () {
    return `
    <category name="%{BKY_CATEGORY_MUSIC}" id="music" colour="#6179e0" secondaryColour="#3f57ba">
        <block type="motion_microbit_music_play"/>
        <block type="motion_microbit_music_playuntildone"/>
        ${blockSeparator}
        <block type="motion_microbit_music_playnote">
            <value name="BEAT">
                <shadow type="math_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_microbit_music_changetempo">
            <value name="TEMPO">
                <shadow type="math_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_microbit_music_settempo">
            <value name="TEMPO">
                <shadow type="math_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_microbit_music_tempo"/>
        ${categorySeparator}
    </category>
    `;
};


const pin = function () {
    return `
    <category name="%{BKY_CATEGORY_PIN}" id="pin" colour="#9381d5" secondaryColour="#6c5bac">
        <block type="sensing_microbit_pin_analog_read"/>

        <block type="sensing_microbit_pin_analog_map_to">
            <value name="LOW">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="HIGH">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>

        <block type="sensing_microbit_pin_analog_write">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>

        <block type="sensing_microbit_pin_analog_set_period">
            <value name="US">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}

        <block type="sensing_microbit_pin_digital_read"/>
        <block type="sensing_microbit_pin_digital_is"/>
        <block type="sensing_microbit_pin_digital_set_to"/>
        ${blockSeparator}
        <block type="sensing_microbit_pin_i2c_read">
            <value name="I2C">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>

        <block type="sensing_microbit_pin_i2c_write">
            <value name="I2C">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>

        
        ${''/**
        <block type="sensing_microbit_pin_connected"/>
        ${blockSeparator}
        <block type="sensing_microbit_pin_analogquantity"/>
        <block type="sensing_microbit_pin_set_analogquantity">
            <value name="ANALOGQUANTITY">
                <shadow type="math_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sensing_microbit_pin_number_input"/>
        */}
        
        ${categorySeparator}
    </category>
    `;
};

const wireless = function () {
    return `
    <category name="%{BKY_CATEGORY_WIRELESS}" id="wireless" colour="#d36db7" secondaryColour="#ac4a91">
        <block type="motion_microbit_wireless_open"/>
        <block type="motion_microbit_wireless_closed"/>
        <block type="motion_microbit_wireless_reset"/>
        ${blockSeparator}
        <block type="motion_microbit_wireless_send">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hello</field>
                </shadow>
            </value>
        </block>
        <block type="motion_microbit_wireless_receive"/>
        ${blockSeparator}
        <block type="motion_microbit_wireless_setchannel"/>
        ${categorySeparator}
    </category>
    `;
};

const events = function () {
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#eb7164" secondaryColour="#c65144">
        <block type="event_microbit_whenstartup"/>
        <block type="event_microbit_whenbuttonpressed"/>
        <block type="event_microbit_whenpinsconnected"/>
        <block type="event_microbit_whengesture"/>
        ${categorySeparator}
    </category>
    `;
};

// "CATEGORY_SENSOR": "Sensor",
// "CATEGORY_PIN": "Pin",
// "CATEGORY_WIRELESS": "Wireless",

const control = function () {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#7684A2" secondaryColour="#CF8B17">
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_positive_number">
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
        ${blockSeparator}
        <block type="control_if"/>
        <block type="control_if_else"/>
        <block id="wait_until" type="control_wait_until"/>
        <block id="repeat_until" type="control_repeat_until"/>
        ${categorySeparator}
    </category>
    `;
};

const operators = function () {
    const apple = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_APPLE', 'apple');
    const banana = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_BANANA', 'banana');
    const letter = ScratchBlocks.ScratchMsgs.translate('OPERATORS_LETTEROF_APPLE', 'a');
    return `
    <category name="%{BKY_CATEGORY_OPERATORS}" id="operators"  colour="#6DCF68" secondaryColour="#389438">
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
                <shadow type="math_whole_number">
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
        <block type="operator_arduino_itoa">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT"></field>
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

const addOns = function () {
    return `
    <category name="%{BKY_CATEGORY_ADDONS}" id="bitPlayer"  colour="#c37ae9" secondaryColour="#9542c0">
    
        <block type="sensing_microbit_bitwear_vibration"/>
        <block type="sensing_microbit_bitwear_set_led_color">
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="sensing_microbit_bitmaker_set_led_color">
            <value name="COLOR">
                <shadow type="colour_picker" >
                    <field name="COLOUR">#FF0000</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}

        <block type="sensing_microbit_bitplayer_key_is_pressed"/>
        <block type="sensing_microbit_bitplayer_joystick"/>
        <block type="sensing_microbit_bitplayer_vibration"/>
        ${blockSeparator}
        <block type="sensing_microbit_bitcar_move">
            <value name="LEFT">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="RIGHT">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>

        <block type="sensing_microbit_bitcar_stop"/>

        <block type="sensing_microbit_bitcar_standup_still">
            <value name="SPEED">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="CHARGE">
                <shadow type="math_number">
                    <field name="NUM">250</field>
                </shadow>
            </value>
        </block>

        <block type="sensing_microbit_bitcar_line_under_sensor"/>

        <block type="sensing_microbit_bitcar_line_follow_at_speed">
            <value name="SPEED">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
}


const groveOne = function () {
    return `
    <category name="%{BKY_CATEGORY_GROVE_ONE}" id="groveOne"  colour="#e0a061" secondaryColour="#b5712d">
        <block type="sensing_microbit_grove_one_mini_fan_set_speed">
            <value name="SPEED">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>

        <block type="sensing_microbit_grove_one_servo_set_angle">
            <value name="ANGLE">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
        </block>

        <block type="sensing_microbit_grove_one_ultrasonic_get_distance">
        </block>
    </category>
    `;
}

const groveI2C = function () {
    return `
    <category name="%{BKY_CATEGORY_ARDUINO_GROVE_I2C}" colour="#8F5D5A" secondaryColour="#804F4C" id="groveI2C">
        <block type="motion_microbit_vision_sensor1"/>
        <block type="motion_microbit_vision_sensor2"/>
        <block type="motion_microbit_vision_sensor3"/>
        <block type="motion_microbit_vision_sensor4"/>
        <block type="motion_microbit_vision_sensor5"/>
        <block type="motion_microbit_vision_sensor8"/>
    </category>
    `;
}

//<block type="motion_microbit_vision_sensor6"/>
//<block type="motion_microbit_vision_sensor7"/>

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
        show(), gap,
        music(), gap,
        sensor(), gap,
        pin(), gap,
        wireless(), gap,
        events(), gap,
        control(), gap,
        operators(), gap,
        variables(), gap,
        myBlocks(), gap,
        addOns(), gap,
        groveOne(), gap,
        groveI2C()
    ];

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXML;
