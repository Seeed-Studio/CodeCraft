const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMy41LDEyLjJjLTAuMywwLTAuMywwLjEtMC41LDBWNC44YzAtMC4yLTAuMi0wLjQtMC40LTAuNUw5LjEsMy40QzguOCwzLjMsOC41LDMuNiw4LjUsMy45VjExCgljLTAuMi0wLjEtMC40LTAuMi0wLjYtMC4yYy0wLjIsMC0wLjMsMC0wLjUsMC4xVjAuN2MwLTAuMy0wLjMtMC42LTAuNi0wLjVsLTUsMS4yQzEuNiwxLjUsMS41LDEuNywxLjUsMnYxMC4zSDAuNgoJYy0wLjMsMC0wLjUsMC4yLTAuNSwwLjV2MC42YzAsMC4zLDAuMiwwLjUsMC41LDAuNWgxMi45YzAuMywwLDAuNS0wLjIsMC41LTAuNXYtMC42QzE0LDEyLjUsMTMuOCwxMi4zLDEzLjUsMTIuMkwxMy41LDEyLjJ6CgkgTTUuNSw5LjljMCwwLjEtMC4xLDAuMi0wLjIsMC4ySDMuN2MtMC4xLDAtMC4yLTAuMS0wLjItMC4ydi0xYzAtMC4xLDAuMS0wLjIsMC4yLTAuMmgxLjVjMC4xLDAsMC4yLDAuMSwwLjIsMC4yVjkuOXogTTUuNSw3LjMKCWMwLDAuMS0wLjEsMC4yLTAuMiwwLjJIMy43Yy0wLjEsMC0wLjItMC4xLTAuMi0wLjJ2LTFjMC0wLjEsMC4xLTAuMiwwLjItMC4yaDEuNWMwLjEsMCwwLjIsMC4xLDAuMiwwLjJWNy4zeiBNNS41LDQuOAoJQzUuNSw0LjksNS40LDUsNS4yLDVIMy43QzMuNiw1LDMuNSw0LjksMy41LDQuOHYtMWMwLTAuMSwwLjEtMC4yLDAuMi0wLjJoMS41YzAuMSwwLDAuMiwwLjEsMC4yLDAuMkM1LjUsMy44LDUuNSw0LjgsNS41LDQuOHoKCSBNMTAsNi4zYzAtMC4xLDAuMS0wLjIsMC4yLTAuMmgxLjFjMC4xLDAsMC4yLDAuMSwwLjIsMC4ydjEuMWMwLDAuMS0wLjEsMC4yLTAuMiwwLjJoLTEuMWMtMC4xLDAtMC4yLTAuMS0wLjItMC4yTDEwLDYuM0wxMCw2LjN6CgkgTTEwLDguOGMwLTAuMSwwLjEtMC4yLDAuMi0wLjJoMS4xYzAuMSwwLDAuMiwwLjEsMC4yLDAuMnYxLjFjMCwwLjEtMC4xLDAuMi0wLjIsMC4yaC0xLjFjLTAuMSwwLTAuMi0wLjEtMC4yLTAuMkwxMCw4LjhMMTAsOC44eiIKCS8+Cjwvc3ZnPgo=';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzMxQzNEQjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMy41LDEyLjJjLTAuMywwLTAuMywwLjEtMC41LDBWNC44YzAtMC4yLTAuMi0wLjQtMC40LTAuNUw5LjEsMy40QzguOCwzLjMsOC41LDMuNiw4LjUsMy45VjExCgljLTAuMi0wLjEtMC40LTAuMi0wLjYtMC4yYy0wLjIsMC0wLjMsMC0wLjUsMC4xVjAuN2MwLTAuMy0wLjMtMC42LTAuNi0wLjVsLTUsMS4yQzEuNiwxLjUsMS41LDEuNywxLjUsMnYxMC4zSDAuNgoJYy0wLjMsMC0wLjUsMC4yLTAuNSwwLjV2MC42YzAsMC4zLDAuMiwwLjUsMC41LDAuNWgxMi45YzAuMywwLDAuNS0wLjIsMC41LTAuNXYtMC42QzE0LDEyLjUsMTMuOCwxMi4zLDEzLjUsMTIuMkwxMy41LDEyLjJ6CgkgTTUuNSw5LjljMCwwLjEtMC4xLDAuMi0wLjIsMC4ySDMuN2MtMC4xLDAtMC4yLTAuMS0wLjItMC4ydi0xYzAtMC4xLDAuMS0wLjIsMC4yLTAuMmgxLjVjMC4xLDAsMC4yLDAuMSwwLjIsMC4yVjkuOXogTTUuNSw3LjMKCWMwLDAuMS0wLjEsMC4yLTAuMiwwLjJIMy43Yy0wLjEsMC0wLjItMC4xLTAuMi0wLjJ2LTFjMC0wLjEsMC4xLTAuMiwwLjItMC4yaDEuNWMwLjEsMCwwLjIsMC4xLDAuMiwwLjJWNy4zeiBNNS41LDQuOAoJQzUuNSw0LjksNS40LDUsNS4yLDVIMy43QzMuNiw1LDMuNSw0LjksMy41LDQuOHYtMWMwLTAuMSwwLjEtMC4yLDAuMi0wLjJoMS41YzAuMSwwLDAuMiwwLjEsMC4yLDAuMkM1LjUsMy44LDUuNSw0LjgsNS41LDQuOHoKCSBNMTAsNi4zYzAtMC4xLDAuMS0wLjIsMC4yLTAuMmgxLjFjMC4xLDAsMC4yLDAuMSwwLjIsMC4ydjEuMWMwLDAuMS0wLjEsMC4yLTAuMiwwLjJoLTEuMWMtMC4xLDAtMC4yLTAuMS0wLjItMC4yTDEwLDYuM0wxMCw2LjN6CgkgTTEwLDguOGMwLTAuMSwwLjEtMC4yLDAuMi0wLjJoMS4xYzAuMSwwLDAuMiwwLjEsMC4yLDAuMnYxLjFjMCwwLjEtMC4xLDAuMi0wLjIsMC4yaC0xLjFjLTAuMSwwLTAuMi0wLjEtMC4yLTAuMkwxMCw4LjhMMTAsOC44eiIKCS8+Cjwvc3ZnPgo=';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3WirelessBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    webserverInit() {

    }

    webserverShow() {

    }

    lotusvsetble() {

    }

    lotusvgetblevalue() {

    }

    infraredSend() {

    }

    infraredReceive() {

    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.wireless';
    }

    getNumber() {
        return [{
            text: '1',
            value: '1',
        },
        {
            text: '2',
            value: '2',
        },
        {
            text: '3',
            value: '3',
        },
        {
            text: '4',
            value: '4',
        },
        {
            text: '5',
            value: '5',
        },
        {
            text: '6',
            value: '6',
        },
        {
            text: '7',
            value: '7',
        },
        {
            text: '8',
            value: '8',
        },
        {
            text: '9',
            value: '9',
        }];
    }

    getSensor() {
        return [{
            text: formatMessage({
                id: 'wireless.webserverShow.opt1',
                default: 'Water',
                description: '水分子检测传感器'
            }),
            value: 'img-water',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt2',
                default: 'Ultrasonic Ranger',
                description: '超声波测距传感器'
            }),
            value: 'img-ult',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt3',
                default: 'PIR Motion',
                description: '人体红外传感器'
            }),
            value: 'img-Infrared',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt4',
                default: 'Temperature&Humidity',
                description: '温湿度传感器'
            }),
            value: 'img-temhum',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt5',
                default: 'LED',
                description: 'LED灯'
            }),
            value: 'img-led',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt6',
                default: 'Vibration',
                description: '振动传感器'
            }),
            value: 'img-vibration',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt7',
                default: 'Voltage',
                description: '电压分压器'
            }),
            value: 'img-voltage',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt8',
                default: 'Air',
                description: '空气质量传感器'
            }),
            value: 'img-air',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt9',
                default: 'Flame',
                description: '火焰传感器'
            }),
            value: 'img-flame',
        },
        {
            text: formatMessage({
                id: 'wireless.webserverShow.opt10',
                default: 'Vision Sensor',
                description: '图像识别传感器'
            }),
            value: 'img-image',
        }];
    }

    getPin1() {
        return [{
            text: 'D2',
            value: '2#3',
        },
        {
            text: 'D3',
            value: '3#4',
        },
        {
            text: 'D4',
            value: '4#5',
        },
        {
            text: 'D5',
            value: '5#6',
        },
        {
            text: 'D6',
            value: '6#7',
        },
        {
            text: 'D7',
            value: '7#8',
        }];
    }

    getPin2() {
        return [{
            text: 'D2',
            value: '2',
        },
        {
            text: 'D3',
            value: '3',
        },
        {
            text: 'D4',
            value: '4',
        },
        {
            text: 'D5',
            value: '5',
        },
        {
            text: 'D6',
            value: '6',
        },
        {
            text: 'D7',
            value: '7',
        },
        {
            text: 'D8',
            value: '8',
        },
        {
            text: 'D9',
            value: '9',
        },
        {
            text: 'D10',
            value: '10',
        },
        {
            text: 'D11',
            value: '11',
        },
        {
            text: 'D12',
            value: '12',
        },
        {
            text: 'D13',
            value: '13',
        }];
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        let blocks = [{
            opcode: 'webserverInit',
            text: formatMessage({
                id: 'wireless.webserverInit',
                default: 'Web Server Initialize Wisdom city SSID [SSID] PWD [PWD]',
                description: 'webserverInit'
            }),
            arguments: {
                SSID: {
                    type: ArgumentType.STRING,
                    defaultValue: 'ArduinoWebServer'
                },
                PWD: {
                    type: ArgumentType.STRING,
                    defaultValue: '12345678'
                },
            },
            blockType: BlockType.COMMAND,
        },
        {
            opcode: 'webserverShow',
            text: formatMessage({
                id: 'wireless.webserverShow',
                default: 'Web Server Location [NUMBER] [SENSOR] Display text: [NAME] Value: [VALUE]',
                description: 'webserverShow'
            }),
            arguments: {
                NUMBER: {
                    type: ArgumentType.STRING,
                    menu: 'number',
                    defaultValue: '1'
                },
                SENSOR: {
                    type: ArgumentType.STRING,
                    menu: 'sensor',
                    defaultValue: 'img-water'
                },
                NAME: {
                    type: ArgumentType.STRING,
                    defaultValue: 'name'
                },
                VALUE: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 0
                },
            },
            blockType: BlockType.COMMAND,
        },
        {
            opcode: 'lotusvsetble',
            text: formatMessage({
                id: 'wireless.lotusvsetble',
                default: 'CSR-BC417 Bluetooth pin [PIN1] ID [ID] PWD [PWD]',
                description: 'lotusvsetble'
            }),
            arguments: {
                PIN1: {
                    type: ArgumentType.STRING,
                    menu: 'pin1',
                    defaultValue: '2#3'
                },
                ID: {
                    type: ArgumentType.STRING,
                    defaultValue: 'SeeedBTSlave'
                },
                PWD: {
                    type: ArgumentType.STRING,
                    defaultValue: '1234'
                },
            },
            blockType: BlockType.COMMAND,
        },
        {
            opcode: 'lotusvgetblevalue',
            text: formatMessage({
                id: 'wireless.lotusvgetblevalue',
                default: 'CSR-BC417 Bluetooth pin [PIN1] readString',
                description: 'lotusvgetblevalue'
            }),
            arguments: {
                PIN1: {
                    type: ArgumentType.STRING,
                    menu: 'pin1',
                    defaultValue: '2#3'
                },
            },
            blockType: BlockType.REPORTER,
        },
        {
            opcode: 'infraredSend',
            text: formatMessage({
                id: 'wireless.infraredSend',
                default: 'Infrared Emitter pin (D3) send [MESSAGE]',
                description: 'infraredSend'
            }),
            arguments: {
                MESSAGE: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 0
                },
            },
            blockType: BlockType.COMMAND,
        },
        {
            opcode: 'infraredReceive',
            text: formatMessage({
                id: 'wireless.infraredReceive',
                default: 'Infrared Receiver pin [PIN2] received value',
                description: 'infraredReceive'
            }),
            arguments: {
                PIN2: {
                    type: ArgumentType.STRING,
                    menu: 'pin2',
                    defaultValue: '2'
                },
            },
            blockType: BlockType.REPORTER,
        }]

        return {
            id: 'wireless',
            name: formatMessage({
                id: 'wireless.categoryName',
                default: 'Wireless Communication',
                description: 'wireless'
            }),
            // extensions: ['colours_machine'],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: blocks,
            colour: "#8F5D5A",
            colourSecondary: "#804F4C",
            menus: {
                number: this.getNumber(),
                sensor: this.getSensor(),
                pin1: this.getPin1(),
                pin2: this.getPin2(),
            }
        };
    }
}
module.exports = Scratch3WirelessBlocks;
