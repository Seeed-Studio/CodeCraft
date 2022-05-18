import grovezeroIcon from './grove-zero.svg';
import grovearduinoIcon from './grove-arduino.svg';
import elfbotIcon from './elfbot.svg';
import microbitIcon from './microbit.svg';
import maixduino from './maixduino.svg'
import grovejointIcon from './grove-joint.svg';
import mPythonIcon from './icon-mpython.svg';
import opencatIcon from './opencat.svg';
import poweringIcon from './powering.svg';
import wioTerminalIcon from './wio-terminal.svg';

import React from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * 定义设备数据
 * 目前支持两种设备 Grove Zero 、Grove Arduino
 */

export default [
    {

        id: 1001,
        name: (
            <FormattedMessage
                defaultMessage="Grove Zero"
                description="Name for the 'Music' extension"
                id="gui.devices.grovezero.name"
            />
        ),
        objName: 'Grove Zero',
        iconURL: grovezeroIcon,
        featured: true,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: true
    },
    {

        id: 1002,
        name: (
            <FormattedMessage
                defaultMessage="Arduino (Uno/Mega/BeginnerKit)"
                description=""
                id="gui.devices.arduino.name"
            />
        ),
        objName: 'Arduino (Uno/Mega/BeginnerKit)',
        iconURL: grovearduinoIcon,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},   
        enabled: true
    },
    {
        id: 1003,
        name: (
            <FormattedMessage
                defaultMessage="Elfbot"
                description=""
                id="gui.devices.elfbot.name"
            />
        ),
        objName: 'Elfbot',
        iconURL: elfbotIcon,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: false
    },
    {
        id: 1004,
        name: (
            <FormattedMessage
                defaultMessage="micro:bit"
                description=""
                id="gui.devices.microbit.name"
            />
        ),
        objName: 'micro:bit',
        iconURL: microbitIcon,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: true
    },
    {
        id: 1005,
        name: 'M.A.R.K (CyberEye)',
        objName: 'M.A.R.K (CyberEye)',
        iconURL: maixduino,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: true
    },
    {
        id: 1006,
        name: 'Grove Joint',
        objName: 'Grove Joint',
        iconURL: grovejointIcon,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: true
    },
    {
        id: 1007,
        name: 'mPython',
        objName: 'mPython',
        iconURL: mPythonIcon,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: false
    },
    {
        id: 1008,
        name: 'GLINT',
        objName: 'GLINT',
        iconURL: poweringIcon,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: true
    },
    {
        id: 1009,
        name: 'Bittle',
        objName: 'Bittle',
        iconURL: opencatIcon,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: true
    },
    {
        id: 1010,
        name: 'Wio Terminal',
        objName: 'Wio Terminal',
        iconURL: wioTerminalIcon,
        featured: false,
        connectState: 0,
        type: 'device',
        tags: [],
        info: [],
        sounds: [],
        costumes: [],
        currentCostumeIndex: 0,
        scratchX: 0,
        scratchY: 0,
        scale: 1,
        direction: 0,
        rotationStyle: 'normal',
        isDraggable: false,
        visible: true,
        spriteInfo: {},
        enabled: false
    }
];