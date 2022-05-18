import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicImage from './music.png';
import penImage from './pen.png';
import videoImage from './video-sensing.png';
import translateImage from './translate.png';
import machineImage from './machine.png'
import cognitiveImage from './cognitive.png'
import AxisAccelerometerImage from './3AxisAccelerometer.png';
import meteostationImage from './meteostation.png';
import custommodelsImage from './custommodels.png'
import markImage from './mark.png'
import ottoImage from './otto.png'
import shieldbotImage from './shieldbot.png'
import wirelessImage from './wireless.png'
import createSkillImage from './createSkill.png'
import calibrateServosImage from './calibrateServos.png'
// import microbitImage from './microbit.png';
// import ev3Image from './ev3.png';
// import wedoImage from './wedo.png';

// import microbitPeripheralImage from './peripheral-connection/microbit/microbit-illustration.svg';
// import microbitMenuImage from './peripheral-connection/microbit/microbit-small.svg';
// import ev3PeripheralImage from './peripheral-connection/ev3/ev3-hub-illustration.svg';
// import ev3MenuImage from './peripheral-connection/ev3/ev3-small.svg';
// import wedoPeripheralImage from './peripheral-connection/wedo/wedo-illustration.svg';
// import wedoMenuImage from './peripheral-connection/wedo/wedo-small.svg';
// import wedoButtonImage from './peripheral-connection/wedo/wedo-button-illustration.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Biped Robot"
                description="Name for the 'ottoDiyRobot' extension"
                id="gui.extension.ottoDiyRobot.name"
            />
        ),
        id: 1002,
        extensionId: 'ottoDiyRobot',
        iconURL: ottoImage,
        description: (
            <FormattedMessage
                defaultMessage="Blocks for controlling Biped Robot, from Biped Robot Middle School Course."
                description="Description for the 'ottoDiyRobot' extension"
                id="gui.extension.ottoDiyRobot.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Shield Bot"
                description="Name for the 'shieldBot' extension"
                id="gui.extension.shieldBot.name"
            />
        ),
        id: 1002,
        extensionId: 'shieldBot',
        iconURL: shieldbotImage,
        description: (
            <FormattedMessage
                defaultMessage="Blocks for controlling Shield Bot."
                description="Description for the 'shieldBot' extension"
                id="gui.extension.shieldBot.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="M.A.R.K"
                description="Name for the 'mark' extension"
                id="gui.extension.mark.name"
            />
        ),
        id: 1002,
        extensionId: 'mark',
        iconURL: markImage,
        description: (
            <FormattedMessage
                defaultMessage="Blocks for controlling M.A.R.K. Chassis."
                description="Description for the 'mark' extension"
                id="gui.extension.mark.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Wireless Communication"
                description="Name for the 'wireless' extension"
                id="gui.extension.wireless.name"
            />
        ),
        id: 1002,
        extensionId: 'wireless',
        iconURL: wirelessImage,
        description: (
            <FormattedMessage
                defaultMessage="Blocks for Wireless Communication, including WIFi, Bluetooth and Infrared."
                description="Description for the 'wireless' extension"
                id="gui.extension.wireless.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Cognitive Services"
                description="Name for the 'cognitiveServices' extension"
                id="gui.extension.cognitiveservices.name"
            />
        ),
        id: 1000,
        extensionId: 'cognitiveServices',
        iconURL: cognitiveImage,
        description: (
            <FormattedMessage
                defaultMessage="The cognitive services API allows users to add other features, for instance, Video, Speech."
                description="Description for the 'cognitiveServices' extension"
                id="gui.extension.cognitiveservices.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Teachable Machine"
                description="Name for the 'teachableMachine' extension"
                id="gui.extension.teachablemachine.name"
            />
        ),
        id: 1000,
        extensionId: 'teachableMachine',
        iconURL: machineImage,
        description: (
            <FormattedMessage
                defaultMessage="With Machine Learning, you don't have to program but still can train computers to learn things and establish artificial neural networks that resemble human's brains."
                description="Description for the 'teachableMachine' extension"
                id="gui.extension.teachablemachine.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="3-axis Accelorometer Visualization"
                description="Name for the '3AxisAccelerometer' extension"
                id="gui.extension.3AxisAccelerometer.name"
            />
        ),
        id: 1000,
        extensionId: 'threeAxisAccelerometer',
        iconURL: AxisAccelerometerImage,
        description: (
            <FormattedMessage
                defaultMessage="Visualize the position of accelerometer on a virtual cube in 3D space"
                description="Description for the '3AxisAccelerometer' extension"
                id="gui.extension.3AxisAccelerometer.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Meteostation"
                description="Name for the 'meteostation' extension"
                id="gui.extension.meteostation.name"
            />
        ),
        id: 1000,
        extensionId: 'meteostation',
        iconURL: meteostationImage,
        description: (
            <FormattedMessage
                defaultMessage="Display environmental data, such as temperature. humidity and air pressure on a sci-fi web interface"
                description="Description for the 'meteostation' extension"
                id="gui.extension.meteostation.description"
            />
        ),
        featured: true
    },    
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        id: 1000,
        extensionId: 'music',
        iconURL: musicImage,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        id: 1000,
        extensionId: 'pen',
        iconURL: penImage,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        id: 1000,
        extensionId: 'videoSensing',
        iconURL: videoImage,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        id: 1000,
        extensionId: 'translate',
        iconURL: translateImage,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Custom Models"
                description=""
                id="gui.extension.modelExtension.name"
            />
        ),
        id: 1005,
        extensionId: 'modelExtension',
        iconURL: custommodelsImage,
        description: (
            <FormattedMessage
                defaultMessage="Create custom image classification and object detection models blocks for using in Codecraft with MARK"
                description=""
                id="gui.extension.modelExtension.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Create Skill"
                description=""
                id="gui.extension.createSkill.name"
            />
        ),
        id: 1009,
        extensionId: 'createSkill',
        iconURL: createSkillImage,
        description: (
            <FormattedMessage
                defaultMessage="Create new movement sequences for Bittle, so new dog can learn new tricks."
                description=""
                id="gui.extension.createSkill.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Calibrate Servos"
                description=""
                id="gui.extension.calibrateServos.name"
            />
        ),
        id: 1009,
        extensionId: 'calibrateServos',
        iconURL: calibrateServosImage,
        description: (
            <FormattedMessage
                defaultMessage="A user interface for convenient servo initial position calibration"
                description=""
                id="gui.extension.calibrateServos.description"
            />
        ),
        featured: true
    },
    {
        name: '训练机器学习模型',
        id: 1010,
        extensionId: 'edgeimpulse',
        iconURL: machineImage,
        description: '可以训练在设备上运行的机器学习模块',
        featured: true
    },
    // {
    //     name: 'micro:bit',
    //     extensionId: 'microbit',
    //     iconURL: microbitImage,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Connect your projects with the world."
    //             description="Description for the 'micro:bit' extension"
    //             id="gui.extension.microbit.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     peripheralImage: microbitPeripheralImage,
    //     smallPeripheralImage: microbitMenuImage,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their micro:bit."
    //             id="gui.extension.microbit.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/microbit'
    // },
    // {
    //     name: 'LEGO MINDSTORMS EV3',
    //     extensionId: 'ev3',
    //     iconURL: ev3Image,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Build interactive robots and more."
    //             description="Description for the 'LEGO MINDSTORMS EV3' extension"
    //             id="gui.extension.ev3.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     peripheralImage: ev3PeripheralImage,
    //     smallPeripheralImage: ev3MenuImage,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
    //             description="Message to help people connect to their EV3. Must note the PIN should be 1234."
    //             id="gui.extension.ev3.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/ev3'
    // },
    // {
    //     name: 'LEGO WeDo 2.0',
    //     extensionId: 'wedo2',
    //     iconURL: wedoImage,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Build with motors and sensors."
    //             description="Description for the 'LEGO WeDo 2.0' extension"
    //             id="gui.extension.wedo2.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: true,
    //     peripheralImage: wedoPeripheralImage,
    //     smallPeripheralImage: wedoMenuImage,
    //     peripheralButtonImage: wedoButtonImage,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their WeDo."
    //             id="gui.extension.wedo2.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/wedo'

    // }
];
