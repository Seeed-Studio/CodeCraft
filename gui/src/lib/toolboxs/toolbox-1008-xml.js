import ScratchBlocks from '../../../../blocks/dist/vertical';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const search = function() {
    return `<category name="%{BKY_CATEGORY_SEARCH}" id="search"></category>`;
}

const events = function () {
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#19B5FE" secondaryColour="#0A93BF">
        <block type="event_haloboad_when_startup"/>
        <block type="event_haloboad_when_button_pressed"/>
        <block type="event_haloboad_when_shaking"/>
        <block type="event_haloboad_when_punching"/>
        <block type="event_haloboad_waituntil_end"/>
    </category>
    `;
};

const radio = function () {
    return `
    <category name="%{BKY_CATEGORY_HALOBOAD_RADIO}" colour="#5fc25a" secondaryColour="#5fc25a" id="radio">
        <block type="motion_haloboad_radio_when_revmsg">
            <value name="MES">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
        <block type="motion_haloboad_radio_setchannel">
            <value name="CHANNEL">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_haloboad_radio_sendmsg">
            <value name="MES">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

const timer = function () {
    return `
    <category name="%{BKY_CATEGORY_HALOBOAD_TIMBER}" colour="#415b9c" secondaryColour="#415b9c" id="timer"> 
        <block type="motion_haloboad_timer_resetall"/>
        ${blockSeparator}
        <block type="motion_haloboad_timer_resetA"/>
        <block type="motion_haloboad_timer_getvalueA"/>

        <block type="event_haloboad_timerA_when_greaterthan">
            <value name="SEC">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_haloboad_timer_resetB"/>
        <block type="motion_haloboad_timer_getvalueB"/>

        <block type="event_haloboad_timerB_when_greaterthan">
            <value name="SEC">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <label text="%{BKY_HALOBOAD_TIMER_LABEL}"/>
        <block type="motion_haloboad_timer_reset"/>
        <block type="motion_haloboad_timer_getvalue"/>
        <block type="event_haloboad_timer_when_greaterthan">
            <value name="SEC">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

const pose = function () {
    return `
    <category name="%{BKY_CATEGORY_HALOBOAD_POSE}" colour="#49aabc" secondaryColour="#49aabc" id="pose"> 
        <block type="sensing_haloboad_facing_up"/>
        <block type="sensing_haloboad_facing_down"/>
        <block type="sensing_haloboad_facing_left"/>
        <block type="sensing_haloboad_facing_right"/>
        <block type="sensing_haloboad_facing_forward"/>
        <block type="sensing_haloboad_facing_backward"/>
        ${blockSeparator}
        <block type="sensing_haloboad_acceleration"/>
    </category>
    `;
};


const lights = function () {
    return `
    <category name="%{BKY_CATEGORY_HALOBOAD_LIGHTS}" colour="#edbe00" secondaryColour="#edbe00" id="lights">
        <block type="motion_haloboad_light_blink" />
        <block type="motion_haloboad_light_shootstart" />
        ${blockSeparator}
        <block type="motion_haloboad_light_pattern_flip_lr" />
        <block type="motion_haloboad_light_pattern_flip_ud" />
        ${blockSeparator}
        <block type="motion_haloboad_light_pattern_ringset" />
        <block type="motion_haloboad_light_pattern_ringset_forduration" >
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_haloboad_light_show" />
        <block type="motion_haloboad_light_show_forduration" >
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_haloboad_light_closed_all" />
        ${blockSeparator}
        <block type="motion_haloboad_light_rgbled_set" >
            <value name="NO">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="motion_haloboad_light_rgbled_closed" >
            <value name="NO">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};

const message = function () {
    return `
    <category name="%{BKY_CATEGORY_HALOBOAD_MESSAGE}" id="message" colour="#19B5FE" secondaryColour="#0097C2">
        <block type="event_whenbroadcastreceived"/>
        <block type="event_broadcast">
            <value name="BROADCAST_INPUT">
                <shadow type="event_broadcast_menu"/>
            </value>
        </block>
        <block type="event_broadcastandwait">
            <value name="BROADCAST_INPUT">
                <shadow type="event_broadcast_menu"/>
            </value>
        </block>
    </category>
    `;
}

const control = function (isOnline) {
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
        ${blockSeparator}
        ${isOnline ? '' : `<block type="motion_arduino_for">
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
        ${blockSeparator}`}
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
        <block type="operator_and"/>
        <block type="operator_or"/>
        <block type="operator_not"/>
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
        isOnline
    } = extension;

    const gap = [categorySeparator];

    const everything = [
        xmlOpen,
        search(), gap,
        lights(), gap,
        pose(), gap,
        events(), gap,
        timer(), gap,
        control(isOnline), gap,
        operators(), gap,
        variables(), gap,
        myBlocks()
    ];

    if(isOnline){
        everything.splice(11, 0, message(), gap)
    }

    if (xml) {
        everything.push(gap, xml);
    }

    everything.push(xmlClose);

    return everything.join('\n');
};

export default makeToolboxXML;
