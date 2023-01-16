export default Blockly => {
    Blockly.Python['text'] = function (block) {
        var code = block.getFieldValue('TEXT');
        return [`"${code}"`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['math_number'] = function (block) {
        var code = parseFloat(block.getFieldValue('NUM') || '0');
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['math_whole_number'] = Blockly.Python['math_number'];
    Blockly.Python['math_positive_number'] = Blockly.Python['math_number'];
    Blockly.Python['math_angle'] = Blockly.Python['math_number'];
    Blockly.Python['math_integer'] = Blockly.Python['math_number'];

    Blockly.Python['colour_picker'] = function (block) {
        var color = block.getFieldValue('COLOUR');
        return [`"${color}"`, Blockly.Python.ORDER_ATOMIC];
    }


    /**
     * motion
     */
    Blockly.Python['motion_movesteps'] = function (block) {
        var steps = Blockly.Python.valueToCode(block, 'STEPS', Blockly.Python.ORDER_NONE);
        return `sprite.forward(${steps})\n`;
    }

    Blockly.Python['motion_turnright'] = function (block) {
        var degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.Python.ORDER_NONE);
        return `sprite.right(${degrees})\n`;
    }

    Blockly.Python['motion_turnleft'] = function (block) {
        var degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.Python.ORDER_NONE);
        return `sprite.left(${degrees})\n`;
    }

    Blockly.Python['motion_goto'] = function (block) {
        var towards = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE);
        return `sprite.goto(${towards})\n`;
    }

    Blockly.Python['motion_goto_menu'] = function (block) {
        var towards = block.getFieldValue('TO');
        return [`"${towards}"`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['motion_gotoxy'] = function (block) {
        var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE);
        var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE);
        return `sprite.x = ${x}\nsprite.y = ${y}\n`;
    }

    Blockly.Python['motion_glideto'] = function (block) {
        var secs = Blockly.Python.valueToCode(block, 'SECS', Blockly.Python.ORDER_NONE);
        var towards = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE);
        return `sprite.glide(${towards}, ${secs})\n`;
    }

    Blockly.Python['motion_glideto_menu'] = Blockly.Python['motion_goto_menu'];

    Blockly.Python['motion_glidesecstoxy'] = function (block) {
        var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE);
        var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE);
        var secs = Blockly.Python.valueToCode(block, 'SECS', Blockly.Python.ORDER_NONE);
        return `sprite.glide(${x}, ${y}, ${secs})\n`;
    }

    Blockly.Python['motion_glidesecstoxy'] = function (block) {
        var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_NONE);
        var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_NONE);
        var secs = Blockly.Python.valueToCode(block, 'SECS', Blockly.Python.ORDER_NONE);
        return `sprite.glide(${x}, ${y}, ${secs})\n`;
    }

    Blockly.Python['motion_pointindirection'] = function (block) {
        var direction = Blockly.Python.valueToCode(block, 'DIRECTION', Blockly.Python.ORDER_NONE);
        return `sprite.direction = ${direction}\n`;
    }

    Blockly.Python['motion_pointtowards'] = function (block) {
        var towards = Blockly.Python.valueToCode(block, 'TOWARDS', Blockly.Python.ORDER_NONE);
        return `sprite.towards(${towards})\n`;
    }

    Blockly.Python['motion_pointtowards_menu'] = function (block) {
        var towards = block.getFieldValue('TOWARDS');
        return [`"${towards}"`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['motion_changexby'] = function (block) {
        var dx = Blockly.Python.valueToCode(block, 'DX', Blockly.Python.ORDER_NONE);
        return `sprite.x = sprite.x + ${dx}\n`;
    }

    Blockly.Python['motion_setx'] = function (block) {
        var dx = Blockly.Python.valueToCode(block, 'DX', Blockly.Python.ORDER_NONE);
        return `sprite.x = ${dx}\n`;
    }

    Blockly.Python['motion_changeyby'] = function (block) {
        var dx = Blockly.Python.valueToCode(block, 'DX', Blockly.Python.ORDER_NONE);
        return `sprite.y = sprite.y + ${dx}\n`;
    }

    Blockly.Python['motion_sety'] = function (block) {
        var dx = Blockly.Python.valueToCode(block, 'DX', Blockly.Python.ORDER_NONE);
        return `sprite.y = ${dx}\n`;
    }

    Blockly.Python['motion_ifonedgebounce'] = function (block) {
        return `sprite.bounce()\n`;
    }

    Blockly.Python['motion_setrotationstyle'] = function (block) {
        var style = block.getFieldValue('STYLE');
        return `sprite.rotationMode("${style}")\n`;
    }

    Blockly.Python['motion_xposition'] = function (block) {
        return [`sprite.x`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['motion_yposition'] = function (block) {
        return [`sprite.y`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['motion_direction'] = function (block) {
        return [`sprite.direction`, Blockly.Python.ORDER_ATOMIC];
    }


    /**
     * looks
     */
    Blockly.Python['looks_sayforsecs'] = function (block) {
        var secs = Blockly.Python.valueToCode(block, 'SECS', Blockly.Python.ORDER_NONE);
        var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_NONE);
        return `sprite.say(${message}, ${secs})\n`;
    }

    Blockly.Python['looks_say'] = function (block) {
        var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_NONE);
        return `sprite.say(${message})\n`;
    }

    Blockly.Python['looks_thinkforsecs'] = function (block) {
        var secs = Blockly.Python.valueToCode(block, 'SECS', Blockly.Python.ORDER_NONE);
        var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_NONE);
        return `sprite.think(${message}, ${secs})\n`;
    }

    Blockly.Python['looks_think'] = function (block) {
        var message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_NONE);
        return `sprite.think(${message})\n`;
    }

    Blockly.Python['looks_costume'] = function (block) {
        var costume = block.getFieldValue('COSTUME');
        return [costume, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['looks_switchcostumeto'] = function (block) {
        var costume = Blockly.Python.valueToCode(block, 'COSTUME', Blockly.Python.ORDER_NONE);
        return `sprite.setCostume(${costume})\n`;
    }

    Blockly.Python['looks_nextcostume'] = function (block) {
        return `sprite.nextCostume()\n`;
    }

    Blockly.Python['looks_backdrops'] = function (block) {
        var backdrop = block.getFieldValue('BACKDROP');
        return [backdrop, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['looks_switchbackdropto'] = function (block) {
        var backdrop = Blockly.Python.valueToCode(block, 'BACKDROP', Blockly.Python.ORDER_NONE);
        return `sprite.setBackdrop(${backdrop})\n`;
    }

    Blockly.Python['looks_nextbackdrop'] = function (block) {
        return `sprite.nextBackdrop()\n`;
    }

    Blockly.Python['looks_switchbackdroptoandwait'] = function (block) {
        var backdrop = Blockly.Python.valueToCode(block, 'BACKDROP', Blockly.Python.ORDER_NONE);
        return `sprite.setBackdropAndWait(${backdrop})\n`;
    }

    Blockly.Python['looks_changesizeby'] = function (block) {
        var change = Blockly.Python.valueToCode(block, 'CHANGE', Blockly.Python.ORDER_NONE);
        return `sprite.size = sprite.size + ${change}\n`;
    }

    Blockly.Python['looks_setsizeto'] = function (block) {
        var size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_NONE);
        return `sprite.size = ${size}\n`;
    }

    Blockly.Python['looks_changeeffectby'] = function (block) {
        var effect = block.getFieldValue('EFFECT');
        var change = Blockly.Python.valueToCode(block, 'CHANGE', Blockly.Python.ORDER_NONE);
        return `sprite.changeEffectBy("${effect}", ${change})\n`;
    }

    Blockly.Python['looks_seteffectto'] = function (block) {
        var effect = block.getFieldValue('EFFECT');
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
        return `sprite.setEffectBy("${effect}", ${value})\n`;
    }

    Blockly.Python['looks_cleargraphiceffects'] = function (block) {
        return `sprite.clearEffect()\n`;
    }

    Blockly.Python['looks_show'] = function (block) {
        return `sprite.show()\n`;
    }

    Blockly.Python['looks_hide'] = function (block) {
        return `sprite.hide()\n`;
    }

    Blockly.Python['looks_gotofrontback'] = function (block) {
        var opt = block.getFieldValue('FRONT_BACK');
        var zIndex = opt === 'front' ? 256 : 0
        return `sprite.zIndex = ${zIndex}\n`;
    }

    Blockly.Python['looks_goforwardbackwardlayers'] = function (block) {
        var opt = block.getFieldValue('FORWARD_BACKWARD');
        var num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_NONE);
        return `sprite.zIndex = sprite.zIndex ${opt === 'forward' ? '+' : '-'} ${num}\n`;
    }

    Blockly.Python['looks_costumenumbername'] = function (block) {
        var opt = block.getFieldValue('NUMBER_NAME');
        return [`sprite.costumeIndex("${opt}")`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['looks_backdropnumbername'] = function (block) {
        var opt = block.getFieldValue('NUMBER_NAME');
        return [`sprite.backdropIndex("${opt}")`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['looks_size'] = function (block) {
        return [`sprite.size`, Blockly.Python.ORDER_ATOMIC];
    }

    /**
     * sound
     */

    Blockly.Python['sound_playuntildone'] = function (block) {
        var sound = Blockly.Python.valueToCode(block, 'SOUND_MENU', Blockly.Python.ORDER_NONE);
        return `sprite.playUntilDone("${sound}")\n`;
    }

    Blockly.Python['sound_play'] = function (block) {
        var sound = Blockly.Python.valueToCode(block, 'SOUND_MENU', Blockly.Python.ORDER_NONE);
        return `sprite.play("${sound}")\n`;
    }

    Blockly.Python['sound_sounds_menu'] = function (block) {
        var soundMenu = block.getFieldValue('SOUND_MENU');
        return [soundMenu, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sound_stopallsounds'] = function (block) {
        return `sprite.stopSound()\n`;
    }

    Blockly.Python['sound_changeeffectby'] = function (block) {
        var effect = block.getFieldValue('EFFECT');
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
        return `sprite.changeSfxBy("${effect}", ${value})\n`;
    }

    Blockly.Python['sound_seteffectto'] = function (block) {
        var effect = block.getFieldValue('EFFECT');
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
        return `sprite.setSfx("${effect}", ${value})\n`;
    }

    Blockly.Python['sound_cleareffects'] = function (block) {
        return `sprite.clear_sfx()\n`;
    }

    Blockly.Python['sound_changevolumeby'] = function (block) {
        var volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_NONE);
        return `sprite.volume = sprite.volume + ${volume}\n`;
    }

    Blockly.Python['sound_setvolumeto'] = function (block) {
        var volume = Blockly.Python.valueToCode(block, 'VOLUME', Blockly.Python.ORDER_NONE);
        return `sprite.volume = ${volume}\n`;
    }

    Blockly.Python['sound_volume'] = function (block) {
        return [`sprite.volume`, Blockly.Python.ORDER_ATOMIC];
    }

    /**
     * event
     */
    Blockly.Python['event_whenflagclicked'] = function (block) {
        Blockly.Python.definitions_['import_event'] = 'import event';
        return `@event.greenflag\ndef onGreenflag():\n`;
    }
    Blockly.Python['event_whenstageclicked'] = function (block) {
        Blockly.Python.definitions_['import_event'] = 'import event';
        return `@event.stage\ndef onStageClicked():\n`;
    }
    Blockly.Python['event_whenkeypressed'] = function (block) {
        var opt = block.getFieldValue('KEY_OPTION');
        Blockly.Python.definitions_['import_event'] = 'import event';
        return `@event.keypressed\ndef onKeypressed("${opt}"):\n`;
    }

    Blockly.Python['event_whenthisspriteclicked'] = function (block) {
        Blockly.Python.definitions_['import_event'] = 'import event';
        return `@event.clicked\ndef onClicked():\n`;
    }

    Blockly.Python['event_whenbackdropswitchesto'] = function (block) {
        var backdrop = block.getFieldValue('BACKDROP');
        Blockly.Python.definitions_['import_event'] = 'import event';
        return `@event.backdropEnter\ndef onBackdropEnter("${backdrop}"):\n`;
    }

    Blockly.Python['event_whengreaterthan'] = function (block) {
        var opt = block.getFieldValue('WHENGREATERTHANMENU');
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
        Blockly.Python.definitions_['import_event'] = 'import event';
        return `@event.whenGreaterThan\ndef onWhenGreaterThan("${opt}", ${value}):\n`;
    }

    Blockly.Python['event_whenbroadcastreceived'] = function (block) {
        var opt = block.getFieldValue('BROADCAST_OPTION');
        Blockly.Python.definitions_['import_event'] = 'import event';
        return `@event.received\ndef onReceived("${opt}"):\n`;
    }

    Blockly.Python['event_broadcast'] = function (block) {
        var opt = Blockly.Python.valueToCode(block, 'BROADCAST_INPUT', Blockly.Python.ORDER_NONE);
        return `sprite.broadcast("${opt}")\n`;
    }

    Blockly.Python['event_broadcastandwait'] = function (block) {
        var opt = Blockly.Python.valueToCode(block, 'BROADCAST_INPUT', Blockly.Python.ORDER_NONE);
        return `sprite.broadcastAndWait("${opt}")\n`;
    }

    Blockly.Python['event_broadcast_menu'] = function (block) {
        var opt = block.getFieldValue('BROADCAST_OPTION');
        return [opt, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_arduino_get_value'] = function (block) {
        return '';
    }


    /**
     * control
     */
    Blockly.Python['control_wait'] = function (block) {
        var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_NONE);
        Blockly.Python.definitions_['import_time'] = 'import time';
        return `time.sleep(${duration})\n`;
    }

    Blockly.Python['control_repeat'] = function (block) {
        var times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.Python.ORDER_NONE);
        var substack = Blockly.Python.statementToCode(block, 'SUBSTACK') || Blockly.Python.PASS;
        var code = `for count in range(${times}):\n${substack}`;
        return code;
    }

    Blockly.Python['control_forever'] = function (block) {
        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK') || Blockly.Python.PASS;
        var code = `while True:\n${branch}`;
        return code;
    }

    Blockly.Python['control_if'] = function (block) {
        var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'False';
        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK') || Blockly.Python.PASS;
        var code = `if ${condition}:\n${branch}`;
        return code;
    }

    Blockly.Python['control_if_else'] = function (block) {
        var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'False';
        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK') || Blockly.Python.PASS;
        var branch2 = Blockly.Python.statementToCode(block, 'SUBSTACK2') || Blockly.Python.PASS;
        var code = `if ${condition}:\n${branch}\nelse:${branch2}`;
        return code;
    }

    Blockly.Python['control_wait_until'] = function (block) {
        var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'False';
        var code = `while not ${condition}:\n${Blockly.Python.PASS}`;
        return code;
    }

    Blockly.Python['control_repeat_until'] = function (block) {
        var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'False';
        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK') || Blockly.Python.PASS;
        var code = `while not ${condition}:\n${branch}`;
        return code;
    }

    Blockly.Python['control_stop'] = function (block) {
        var opt = block.getFieldValue('STOP_OPTION');
        switch (opt) {
            case 'all':
                return `sprite.stopAll()\n`;
            case 'this script':
                return `sprite.stopThis()\n`;
            case 'other scripts in sprite':
                return `sprite.stopOther()\n`;
        }
    }

    Blockly.Python['control_start_as_clone'] = function (block) {
        return '';
    }
    Blockly.Python['control_create_clone_of'] = function (block) {
        return '';
    }
    Blockly.Python['control_delete_this_clone'] = function (block) {
        return '';
    }

    /**
     * sensing
     */
    Blockly.Python['sensing_touchingobject'] = function (block) {
        var value = Blockly.Python.valueToCode(block, 'TOUCHINGOBJECTMENU', Blockly.Python.ORDER_NONE);
        var code = `sprite.touching("${value}")`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_touchingobjectmenu'] = function (block) {
        var opt = block.getFieldValue('TOUCHINGOBJECTMENU');
        return [opt, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_touchingcolor'] = function (block) {
        var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_NONE);
        var code = `sprite.touchingColor(${color})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_coloristouchingcolor'] = function (block) {
        var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_NONE);
        var color2 = Blockly.Python.valueToCode(block, 'COLOR2', Blockly.Python.ORDER_NONE);
        var code = `sprite.touchingColor(${color}, ${color2})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_distanceto'] = function (block) {
        var distance = Blockly.Python.valueToCode(block, 'DISTANCETOMENU', Blockly.Python.ORDER_NONE);
        var code = `sprite.distanceTo("${distance}")`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_distancetomenu'] = function (block) {
        var opt = block.getFieldValue('DISTANCETOMENU');
        return [opt, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_askandwait'] = function (block) {
        var quesiton = Blockly.Python.valueToCode(block, 'QUESTION', Blockly.Python.ORDER_NONE);
        return `sprite.input("${quesiton}")\n`;
    }

    Blockly.Python['sensing_answer'] = function (block) {
        var code = `sprite.answer`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_keypressed'] = function (block) {
        var opt = Blockly.Python.valueToCode(block, 'KEY_OPTION', Blockly.Python.ORDER_NONE);
        var code = `sprite.isKeypressed("${opt}")`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_keyoptions'] = function (block) {
        var opt = block.getFieldValue('KEY_OPTION');
        return [opt, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_mousedown'] = function (block) {
        return [`sprite.isMousedown()`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_mousex'] = function (block) {
        return [`sprite.mousex`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_mousey'] = function (block) {
        return [`sprite.mousey`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_setdragmode'] = function (block) {
        var mode = block.getFieldValue('DRAG_MODE');
        return [`sprite.setDraggable("${mode}")`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_loudness'] = function (block) {
        return [`sprite.loudness`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_timer'] = function (block) {
        return [`sprite.timer`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_resettimer'] = function (block) {
        return `sprite.resetTimer()\n`;
    }

    Blockly.Python['sensing_of'] = function (block) {
        var obj = Blockly.Python.valueToCode(block, 'OBJECT', Blockly.Python.ORDER_NONE);
        var property = block.getFieldValue('PROPERTY');
        return `sprite.getProperty("${obj}", "${property}")\n`;
    }

    Blockly.Python['sensing_of_object_menu'] = function (block) {
        var obj = block.getFieldValue('OBJECT');
        return [obj, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_current'] = function (block) {
        var current = block.getFieldValue('CURRENTMENU');
        return [`sprite.datetime("${current}")`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_dayssince2000'] = function (block) {
        return [`sprite.daysSince2000()`, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['sensing_username'] = function (block) {
        return [`sprite.username()`, Blockly.Python.ORDER_ATOMIC];
    }


    /**
     * operators
     */
    Blockly.Python['operator_add'] = function (block) {
        var num1 = Blockly.Python.valueToCode(block, 'NUM1', Blockly.Python.ORDER_NONE) || 0;
        var num2 = Blockly.Python.valueToCode(block, 'NUM2', Blockly.Python.ORDER_NONE) || 0;
        var code = `${num1} + ${num2}`;
        return [code, Blockly.Python.ORDER_UNARY_SIGN];
    }

    Blockly.Python['operator_subtract'] = function (block) {
        var num1 = Blockly.Python.valueToCode(block, 'NUM1', Blockly.Python.ORDER_NONE) || 0;
        var num2 = Blockly.Python.valueToCode(block, 'NUM2', Blockly.Python.ORDER_NONE) || 0;
        var code = `${num1} - ${num2}`;
        return [code, Blockly.Python.ORDER_UNARY_SIGN];
    }

    Blockly.Python['operator_multiply'] = function (block) {
        var num1 = Blockly.Python.valueToCode(block, 'NUM1', Blockly.Python.ORDER_NONE) || 0;
        var num2 = Blockly.Python.valueToCode(block, 'NUM2', Blockly.Python.ORDER_NONE) || 0;
        var code = `${num1} * ${num2}`;
        return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
    }

    Blockly.Python['operator_divide'] = function (block) {
        var num1 = Blockly.Python.valueToCode(block, 'NUM1', Blockly.Python.ORDER_NONE) || 0;
        var num2 = Blockly.Python.valueToCode(block, 'NUM2', Blockly.Python.ORDER_NONE) || 0;
        var code = `${num1} / ${num2}`;
        return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
    }

    Blockly.Python['operator_random'] = function (block) {
        var from = Blockly.Python.valueToCode(block, 'FROM', Blockly.Python.ORDER_NONE) || 0;
        var to = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE) || 0;
        var code = `random.randint(${from}, ${to})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['operator_gt'] = function (block) {
        var operator1 = Blockly.Python.valueToCode(block, 'OPERAND1', Blockly.Python.ORDER_NONE) || 0;
        var operator2 = Blockly.Python.valueToCode(block, 'OPERAND2', Blockly.Python.ORDER_NONE) || 0;
        var code = `${operator1} > ${operator2}`;
        return [code, Blockly.Python.ORDER_RELATIONAL];
    }

    Blockly.Python['operator_lt'] = function (block) {
        var operator1 = Blockly.Python.valueToCode(block, 'OPERAND1', Blockly.Python.ORDER_NONE) || 0;
        var operator2 = Blockly.Python.valueToCode(block, 'OPERAND2', Blockly.Python.ORDER_NONE) || 0;
        var code = `${operator1} < ${operator2}`;
        return [code, Blockly.Python.ORDER_RELATIONAL];
    }

    Blockly.Python['operator_equals'] = function (block) {
        var operator1 = Blockly.Python.valueToCode(block, 'OPERAND1', Blockly.Python.ORDER_NONE) || 0;
        var operator2 = Blockly.Python.valueToCode(block, 'OPERAND2', Blockly.Python.ORDER_NONE) || 0;
        var code = `${operator1} == ${operator2}`;
        return [code, Blockly.Python.ORDER_RELATIONAL];
    }

    Blockly.Python['operator_and'] = function (block) {
        var operator1 = Blockly.Python.valueToCode(block, 'OPERAND1', Blockly.Python.ORDER_NONE) || 'False';
        var operator2 = Blockly.Python.valueToCode(block, 'OPERAND2', Blockly.Python.ORDER_NONE) || 'False';
        var code = `${operator1} and ${operator2}`;
        return [code, Blockly.Python.ORDER_RELATIONAL];
    }

    Blockly.Python['operator_or'] = function (block) {
        var operator1 = Blockly.Python.valueToCode(block, 'OPERAND1', Blockly.Python.ORDER_NONE) || 'False';
        var operator2 = Blockly.Python.valueToCode(block, 'OPERAND2', Blockly.Python.ORDER_NONE) || 'False';
        var code = `${operator1} or ${operator2}`;
        return [code, Blockly.Python.ORDER_RELATIONAL];
    }

    Blockly.Python['operator_not'] = function (block) {
        var operator = Blockly.Python.valueToCode(block, 'OPERAND', Blockly.Python.ORDER_NONE) || 'True';
        var code = `not ${operator}`;
        return [code, Blockly.Python.ORDER_RELATIONAL];
    }

    Blockly.Python['operator_join'] = function (block) {
        var str1 = Blockly.Python.valueToCode(block, 'STRING1', Blockly.Python.ORDER_NONE) || '';
        var str2 = Blockly.Python.valueToCode(block, 'STRING2', Blockly.Python.ORDER_NONE) || '';
        var code = `str(${str1}) + str(${str2})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['operator_letter_of'] = function (block) {
        var letter = Blockly.Python.valueToCode(block, 'LETTER', Blockly.Python.ORDER_NONE) || 0;
        var str = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_NONE) || '';
        var code = `str(${str})[${letter}]`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['operator_length'] = function (block) {
        var str = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_NONE) || '';
        var code = `len(${str})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['operator_contains'] = function (block) {
        var str1 = Blockly.Python.valueToCode(block, 'STRING1', Blockly.Python.ORDER_NONE) || '';
        var str2 = Blockly.Python.valueToCode(block, 'STRING2', Blockly.Python.ORDER_NONE) || '';
        var code = `str(${str1}).find(str(${str2})) > -1`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['operator_mod'] = function (block) {
        var num1 = Blockly.Python.valueToCode(block, 'NUM1', Blockly.Python.ORDER_NONE) || 0;
        var num2 = Blockly.Python.valueToCode(block, 'NUM2', Blockly.Python.ORDER_NONE) || 0;
        var code = `${num1} % ${num2}`;
        return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
    }

    Blockly.Python['operator_round'] = function (block) {
        var num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_NONE) || 0;
        var code = `round(${num})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    Blockly.Python['operator_mathop'] = function (block) {
        var opeerator = block.getFieldValue('OPERATOR');
        var num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_NONE) || 0;
        Blockly.Python.definitions_['import_math'] = 'import math';
        var code = `math.${opeerator}(${num})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    /**
     * variables
     */

    Blockly.Python['data_variable'] = function (block) {
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Python.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return [varName, Blockly.Python.ORDER_ATOMIC];
    };


    Blockly.Python['data_setvariableto'] = function (block) {
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Python.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `${varName} = ${value}\n`;
    };

    Blockly.Python['data_changevariableby'] = function (block) {
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ASSIGNMENT);
        let variable = block.getFieldValue('VARIABLE') || '';

        var varName = Blockly.Python.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `${varName} += ${value}\n`;
    };

    Blockly.Python['data_showvariable'] = function (block) {
        let variable = block.getFieldValue('VARIABLE') || '';

        var varName = Blockly.Python.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `showvariable('${varName}')\n`;
    };

    Blockly.Python['data_hidevariable'] = function (block) {
        let variable = block.getFieldValue('VARIABLE') || '';
        var varName = Blockly.Python.variableDB_.getName(variable, Blockly.Variables.NAME_TYPE);
        return `hidevariable('${varName}')\n`;
    };


    /**
     * data list
     */
    Blockly.Python['data_listcontents'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `listcontents('${varName}')`;
    };
    Blockly.Python['data_listindexall'] = function (block) {
        let index = block.getFieldValue('INDEX') || '';
        var varName = Blockly.Python.variableDB_.getName(index, Blockly.Variables.NAME_TYPE);
        return `listindexall(${varName})`;
    };
    Blockly.Python['data_listindexrandom'] = function (block) {
        let index = block.getFieldValue('INDEX') || '';
        var varName = Blockly.Python.variableDB_.getName(index, Blockly.Variables.NAME_TYPE);
        return `listindexrandom(${varName})`;
    };
    Blockly.Python['data_addtolist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ASSIGNMENT);
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `addtolist(${item},'${varName}')\n`;
    };
    Blockly.Python['data_deleteoflist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_ASSIGNMENT);
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `deleteoflist(${index},'${varName}')\n`;
    };
    Blockly.Python['data_deletealloflist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `deletealloflist('${varName}')\n`;
    };
    Blockly.Python['data_insertatlist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ASSIGNMENT);
        var index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_ASSIGNMENT);
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `insertatlist('${item}', ${index}, '${varName}')\n`;
    };
    Blockly.Python['data_replaceitemoflist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ASSIGNMENT);
        var index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_ASSIGNMENT);
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `replaceitemoflist(${index}, '${varName}', '${item}')\n`;
    };
    Blockly.Python['data_itemoflist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var index = Blockly.Python.valueToCode(block, 'INDEX', Blockly.Python.ORDER_ASSIGNMENT);
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `itemoflist(${index}, '${varName}')`;
    };
    Blockly.Python['data_itemnumoflist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';

        var item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ASSIGNMENT);
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `itemnumoflist(${item}, '${varName}')`;
    };
    Blockly.Python['data_lengthoflist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `lengthoflist('${varName}')`;
    };
    Blockly.Python['data_listcontainsitem'] = function (block) {
        let list = block.getFieldValue('LIST') || '';

        var item = Blockly.Python.valueToCode(block, 'ITEM', Blockly.Python.ORDER_ASSIGNMENT);
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `listcontainsitem('${varName}', '${item}')`;
    };
    Blockly.Python['data_showlist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `showlist('${varName}')\n`;
    };
    Blockly.Python['data_hidelist'] = function (block) {
        let list = block.getFieldValue('LIST') || '';
        var varName = Blockly.Python.variableDB_.getName(list, Blockly.Variables.NAME_TYPE);
        return `hidelist('${varName}')\n`;
    };

    Blockly.Python['procedures_call'] = function (block) {
        return ``;
    };

    Blockly.Python['procedures_definition'] = function (block) {
        var custom_block = block.getFieldValue('custom_block');
        return [custom_block, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['argument_reporter_string_number'] = function (block) {
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ASSIGNMENT);
        return [value, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['argument_reporter_boolean'] = function (block) {
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ASSIGNMENT);
        return [value, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['procedures_prototype'] = function (block) {
        return ``;
    };

    /**
     * extensions
     * pen
     */
    Blockly.Python['pen_clear'] = function (block) {
        return `sprite.clear()\n`;
    };
    Blockly.Python['pen_stamp'] = function (block) {
        return `sprite.stamp()\n`;
    };
    Blockly.Python['pen_penDown'] = function (block) {
        return `sprite.pendown()\n`;
    };
    Blockly.Python['pen_penUp'] = function (block) {
        return `sprite.penup()\n`;
    };
    Blockly.Python['pen_setPenColorToColor'] = function (block) {
        var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_NONE);
        return `sprite.pencolor(${color})\n`;
    };
    Blockly.Python['pen_menu_colorParam'] = function (block) {
        var branch = block.getFieldValue('colorParam');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['pen_changePenColorParamBy'] = function (block) {
        var color_param = Blockly.Python.valueToCode(block, 'COLOR_PARAM', Blockly.Python.ORDER_NONE);
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
        return `sprite.change_pencolor_effect_by('${color_param}', ${value})\n`;
    };
    Blockly.Python['pen_setPenColorParamTo'] = function (block) {
        var color_param = Blockly.Python.valueToCode(block, 'COLOR_PARAM', Blockly.Python.ORDER_NONE);
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
        return `sprite.pencolor_effect('${color_param}', ${value})\n`;
    };
    Blockly.Python['pen_changePenSizeBy'] = function (block) {
        var size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_NONE);
        return `sprite.change_pensize_by(${size})\n`;
    };
    Blockly.Python['pen_setPenSizeTo'] = function (block) {
        var size = Blockly.Python.valueToCode(block, 'SIZE', Blockly.Python.ORDER_NONE);
        return `sprite.pensize(${size})\n`;
    };
    Blockly.Python['pen_setPenShadeToNumber'] = function (block) {
        return ``;
    };
    Blockly.Python['pen_changePenShadeBy'] = function (block) {
        return ``;
    };
    Blockly.Python['pen_setPenHueToNumber'] = function (block) {
        return ``;
    };
    Blockly.Python['pen_changePenHueBy'] = function (block) {
        return ``;
    };

    /**
     * extensions
     * music
     */
    Blockly.Python['music_menu_DRUM'] = function (block) {
        var branch = block.getFieldValue('DRUM');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['music_menu_INSTRUMENT'] = function (block) {
        var branch = block.getFieldValue('INSTRUMENT');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['music_playDrumForBeats'] = function (block) {
        var drum = Blockly.Python.valueToCode(block, 'DRUM', Blockly.Python.ORDER_NONE);
        var beats = Blockly.Python.valueToCode(block, 'BEATS', Blockly.Python.ORDER_NONE);
        return `sprite.play_drum(${drum}, ${beats})\n`;
    };
    Blockly.Python['music_restForBeats'] = function (block) {
        var beats = Blockly.Python.valueToCode(block, 'BEATS', Blockly.Python.ORDER_NONE);
        return `sprite.rest(${beats})\n`;
    };
    Blockly.Python['music_playNoteForBeats'] = function (block) {
        var note = Blockly.Python.valueToCode(block, 'NOTE', Blockly.Python.ORDER_NONE);
        var beats = Blockly.Python.valueToCode(block, 'BEATS', Blockly.Python.ORDER_NONE);
        return `sprite.play_note(${note}, ${beats})\n`;
    };
    Blockly.Python['music_setInstrument'] = function (block) {
        var instrument = Blockly.Python.valueToCode(block, 'INSTRUMENT', Blockly.Python.ORDER_NONE);
        return `sprite.set_inst(${instrument})\n`;
    };
    Blockly.Python['music_midiSetInstrument'] = function (block) {
        return ``;
    };
    Blockly.Python['music_setTempo'] = function (block) {
        var tempo = Blockly.Python.valueToCode(block, 'TEMPO', Blockly.Python.ORDER_NONE);
        return `sprite.set_tempo(${tempo})\n`;
    };
    Blockly.Python['music_changeTempo'] = function (block) {
        var tempo = Blockly.Python.valueToCode(block, 'TEMPO', Blockly.Python.ORDER_NONE);
        return `sprite.change_tempo_by(${tempo})\n`;
    };
    Blockly.Python['music_getTempo'] = function (block) {
        return `sprite.get_tempo()\n`;
    };

    /**
     * extensions
     * videoSensing
     */
    Blockly.Python['videoSensing_menu_SUBJECT'] = function (block) {
        var branch = block.getFieldValue('SUBJECT');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['videoSensing_menu_ATTRIBUTE'] = function (block) {
        var branch = block.getFieldValue('ATTRIBUTE');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['videoSensing_menu_VIDEO_STATE'] = function (block) {
        var branch = block.getFieldValue('VIDEO_STATE');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['videoSensing_whenMotionGreaterThan'] = function (block) {
        var reference = Blockly.Python.valueToCode(block, 'REFERENCE', Blockly.Python.ORDER_NONE);
        Blockly.Python.definitions_['import_event'] = 'import event';
        return `@event.when_motion_greater_than\ndef when_motion_greater_than("${reference}"):\n`;
    };
    Blockly.Python['videoSensing_videoOn'] = function (block) {
        var attribute = Blockly.Python.valueToCode(block, 'ATTRIBUTE', Blockly.Python.ORDER_NONE);
        var subject = Blockly.Python.valueToCode(block, 'SUBJECT', Blockly.Python.ORDER_NONE);
        return `sprite.get_video_state(${attribute},${subject})`;
    };

    Blockly.Python['videoSensing_videoToggle'] = function (block) {
        var video_state = Blockly.Python.valueToCode(block, 'VIDEO_STATE', Blockly.Python.ORDER_NONE);
        return `sprite.video_toggle(${video_state})`;
    };
    Blockly.Python['videoSensing_setVideoTransparency'] = function (block) {
        var transparency = Blockly.Python.valueToCode(block, 'TRANSPARENCY', Blockly.Python.ORDER_NONE);
        return `sprite.set_video_transparency(${transparency})`;
    };
    /**
     * extensions
     * videoSensing
     */
    Blockly.Python['translate_menu_languages'] = function (block) {
        var branch = block.getFieldValue('languages');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['translate_getTranslate'] = function (block) {
        var words = Blockly.Python.valueToCode(block, 'WORDS', Blockly.Python.ORDER_NONE);
        var language = Blockly.Python.valueToCode(block, 'LANGUAGE', Blockly.Python.ORDER_NONE);
        return `sprite.get_translate(${words},${language})\n`;
    };
    Blockly.Python['translate_getViewerLanguage'] = function (block) {
        return `sprite.get_viewer_language()\n`;
    };

    /**
     * teachableMachine
     */
    Blockly.Python['teachableMachine_menu_categoryParam'] = function (block) {
        var branch = block.getFieldValue('CATEGORY_PARAM');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['teachableMachine_getConfidenceValue'] = function (block) {
        return "";
    };
    Blockly.Python['teachableMachine_getRecognitionResult'] = function (block) {
        return "";
    };
    Blockly.Python['teachableMachine_whichLabel'] = function (block) {
        return "";
    };
    /**
     * cognitiveServices
     */
    Blockly.Python['cognitiveServices_menu_faceFeatures'] = function (block) {
        var branch = block.getFieldValue('FaceFeatures');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['cognitiveServices_menu_position'] = function (block) {
        var branch = block.getFieldValue('Position');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['cognitiveServices_menu_emotion'] = function (block) {
        var branch = block.getFieldValue('Emotion');
        return [branch, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['cognitiveServices_getSpeechRecognitionResult'] = function (block) {
        return "";
    };
    Blockly.Python['cognitiveServices_getFaceFeaturesPosition'] = function (block) {
        return "";
    };
    Blockly.Python['cognitiveServices_getAgeRecognitionResult'] = function (block) {
        return "";
    };
    Blockly.Python['cognitiveServices_getEmotionRecognitionResult'] = function (block) {
        return "";
    };

    /**
    * threeAxisAccelerometer
    */
    Blockly.Python['threeAxisAccelerometer_showThreeAxisAccelerometer'] = function (block) {
        return "";
    };
    /**
    * meteostation
    */
    Blockly.Python['meteostation_showMeteostation'] = function (block) {
        return "";
    };
}