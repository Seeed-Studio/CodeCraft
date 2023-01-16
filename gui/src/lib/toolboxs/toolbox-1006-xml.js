import ScratchBlocks from '../../../../blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const init = function () {
    return `
    <category name="%{BKY_CATEGORY_START}" colour="#5B96FF" secondaryColour="#4B7DD7" id="init">
        <block type="motion_grovejoint_setup_loop"></block>
    </category>
    `;
}

const input = function () {
    return `
    <category name="%{BKY_CATEGORY_GROVE_INPUT}" colour="#D85BFF" secondaryColour="#B44CD4" id="input">
        <block type="motion_grovejoint_tem_hum_get_value" />
        <block type="motion_grovejoint_ult_dis_sensor" />
        <block type="motion_grovejoint_light_sensor" />
        <block type="motion_grovejoint_noise_sensor" />
        <block type="motion_grovejoint_soil_moi_sensor" />
        <block type="motion_grovejoint_imu3_dof_get_value" />
        <block type="motion_grovejoint_sli_pot_switch" />
        ${blockSeparator}
        <block type="motion_grovejoint_inf_prox_sensor" />
        <block type="motion_grovejoint_magnetic_switch" />
        <block type="motion_grovejoint_tilt_sensor" />
        <block type="motion_grovejoint_touch_sensor" />
        <block type="motion_grovejoint_mul_channel_touch_sensor" />
    </category>
    `;
}

const output = function () {
    return `
    <category name="%{BKY_CATEGORY_GROVE_OUTPUT}" colour="#FF5F5B" secondaryColour="#D74D4B" id="output">
        <block type="motion_grovejoint_mini_motor_drive">
            <value name="POWER">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>

        <block type="motion_grovejoint_four_digit_display_tube">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>

        <block type="motion_grovejoint_led_driver_board" />
        <block type="motion_grovejoint_full_color_led">
            <value name="RED">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="GREEN">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="BLUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_grovejoint_speaker_note_beat" />
        <block type="motion_grovejoint_servo_turn_angle">
            <value name="ANGLE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_grovejoint_buzzer" />
        <block type="motion_grovejoint_motor" />
        <block type="motion_grovejoint_dc_motor" />


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

        // myBlocks()
    ];

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);
    return everything.join('\n');
};

export default makeToolboxXML;
