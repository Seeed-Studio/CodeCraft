const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAuNywxLjdjLTAuMSwwLTAuMiwwLjEtMC4yLDAuMnY0LjJjMCwwLjEsMC4xLDAuMiwwLjIsMC4yaDAuMUwwLjcsMS43TDAuNywxLjd6Ii8+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMuMyw4LjRjMCwwLDAtMC45LDAtMi4xYzAtMiwwLTQuNiwwLTQuOWMwLTAuNS0wLjItMC40LTAuMy0wLjRjLTAuMiwwLTAuNS0wLjEtMC41LTAuMWwtMS0wLjkKCQkJYzAsMC0xLDAtMS40LDBDOS43LDAsOS42LDAuNCw5LjQsMC42QzkuMywwLjcsOS4xLDAuNyw5LjEsMC43SDguOXYwLjRIN0g3SDUuMVYwLjdINC45YzAsMC0wLjEsMC0wLjMtMC4xQzQuNCwwLjQsNC4zLDAsMy45LDAKCQkJQzMuNiwwLDIuNSwwLDIuNSwwbC0xLDAuOWMwLDAtMC4zLDAuMS0wLjUsMC4xYy0wLjIsMC0wLjMsMC0wLjMsMC40YzAsMC4zLDAsMi45LDAsNC45YzAsMS4yLDAsMi4xLDAsMi4xUzAuNyw5LjEsMS4xLDkuNQoJCQljMC41LDAuNSwwLjYsMC42LDAuOCwxLjhDMiwxMi42LDIuMSwxNCwyLjYsMTRzMS40LDAsMS40LDBzMC4zLTAuMSwwLjMtMC40YzAtMC4zLDAuMy0yLjksMC4zLTIuOUw1LjQsMTNjMCwwLDAuMiwwLjUsMC44LDAuNQoJCQljMC40LDAsMC42LDAsMC43LDBjMC4xLDAsMC4xLDAsMC4xLDBjMC4xLDAsMC4zLDAsMC43LDBjMC42LDAsMC44LTAuNSwwLjgtMC41bDAuOS0yLjNjMCwwLDAuMiwyLjUsMC4zLDIuOQoJCQljMCwwLjMsMC4zLDAuNCwwLjMsMC40czAuOSwwLDEuNCwwczAuNS0xLjQsMC43LTIuNmMwLjEtMS4yLDAuMy0xLjMsMC44LTEuOEMxMy40LDkuMSwxMy4zLDguNCwxMy4zLDguNHogTTguMSwxMC43SDZsLTAuNi0xCgkJCUw2LDEwLjFIOGwwLjYtMC40TDguMSwxMC43eiBNOC41LDkuMUg1LjZMNC43LDcuN2wwLjgsMC41aDIuOWwwLjgtMC42TDguNSw5LjF6IE03LDdDNS43LDcsNC42LDUuOSw0LjYsNC42UzUuNywyLjMsNywyLjMKCQkJczIuNCwxLjEsMi40LDIuNFM4LjMsNyw3LDd6Ii8+CgkJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iNyIgY3k9IjQuNiIgcj0iMS42Ii8+Cgk8L2c+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMuNCwxLjdMMTMuNCwxLjdsLTAuMSw0LjZoMC4xYzAuMSwwLDAuMi0wLjEsMC4yLTAuMlYxLjlDMTMuNSwxLjgsMTMuNCwxLjcsMTMuNCwxLjd6Ii8+CjwvZz4KPC9zdmc+Cg==';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzU4NkU5NTt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAuNywxLjdjLTAuMSwwLTAuMiwwLjEtMC4yLDAuMnY0LjJjMCwwLjEsMC4xLDAuMiwwLjIsMC4yaDAuMUwwLjcsMS43TDAuNywxLjd6Ii8+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMuMyw4LjRjMCwwLDAtMC45LDAtMi4xYzAtMiwwLTQuNiwwLTQuOWMwLTAuNS0wLjItMC40LTAuMy0wLjRjLTAuMiwwLTAuNS0wLjEtMC41LTAuMWwtMS0wLjkKCQkJYzAsMC0xLDAtMS40LDBDOS43LDAsOS42LDAuNCw5LjQsMC42QzkuMywwLjcsOS4xLDAuNyw5LjEsMC43SDguOXYwLjRIN0g3SDUuMVYwLjdINC45YzAsMC0wLjEsMC0wLjMtMC4xQzQuNCwwLjQsNC4zLDAsMy45LDAKCQkJQzMuNiwwLDIuNSwwLDIuNSwwbC0xLDAuOWMwLDAtMC4zLDAuMS0wLjUsMC4xYy0wLjIsMC0wLjMsMC0wLjMsMC40YzAsMC4zLDAsMi45LDAsNC45YzAsMS4yLDAsMi4xLDAsMi4xUzAuNyw5LjEsMS4xLDkuNQoJCQljMC41LDAuNSwwLjYsMC42LDAuOCwxLjhDMiwxMi42LDIuMSwxNCwyLjYsMTRzMS40LDAsMS40LDBzMC4zLTAuMSwwLjMtMC40YzAtMC4zLDAuMy0yLjksMC4zLTIuOUw1LjQsMTNjMCwwLDAuMiwwLjUsMC44LDAuNQoJCQljMC40LDAsMC42LDAsMC43LDBjMC4xLDAsMC4xLDAsMC4xLDBjMC4xLDAsMC4zLDAsMC43LDBjMC42LDAsMC44LTAuNSwwLjgtMC41bDAuOS0yLjNjMCwwLDAuMiwyLjUsMC4zLDIuOQoJCQljMCwwLjMsMC4zLDAuNCwwLjMsMC40czAuOSwwLDEuNCwwczAuNS0xLjQsMC43LTIuNmMwLjEtMS4yLDAuMy0xLjMsMC44LTEuOEMxMy40LDkuMSwxMy4zLDguNCwxMy4zLDguNHogTTguMSwxMC43SDZsLTAuNi0xCgkJCUw2LDEwLjFIOGwwLjYtMC40TDguMSwxMC43eiBNOC41LDkuMUg1LjZMNC43LDcuN2wwLjgsMC41aDIuOWwwLjgtMC42TDguNSw5LjF6IE03LDdDNS43LDcsNC42LDUuOSw0LjYsNC42UzUuNywyLjMsNywyLjMKCQkJczIuNCwxLjEsMi40LDIuNFM4LjMsNyw3LDd6Ii8+CgkJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iNyIgY3k9IjQuNiIgcj0iMS42Ii8+Cgk8L2c+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMuNCwxLjdMMTMuNCwxLjdsLTAuMSw0LjZoMC4xYzAuMSwwLDAuMi0wLjEsMC4yLTAuMlYxLjlDMTMuNSwxLjgsMTMuNCwxLjcsMTMuNCwxLjd6Ii8+CjwvZz4KPC9zdmc+Cg==';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3MarkBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    run() {

    }

    motorrun() {

    }

    servorun() {

    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.mark';
    }

    getDirect() {
        return [{
            text: '前进',
            text: formatMessage({
                id: 'shieldBot.bot1.opt1',
                default: 'Forward',
                description: '前进'
            }),
            value: '1',
        },
        {
            text: '后退',
            text: formatMessage({
                id: 'shieldBot.bot1.opt2',
                default: 'Backward',
                description: '后退'
            }),
            value: '2',
        },
        {
            text: '往左',
            text: formatMessage({
                id: 'shieldBot.bot1.opt3',
                default: 'Left',
                description: '往左'
            }),
            value: '3',
        },
        {
            text: '往右',
            text: formatMessage({
                id: 'shieldBot.bot1.opt4',
                default: 'Right',
                description: '往右'
            }),
            value: '4',
        },
        {
            text: '停止',
            text: formatMessage({
                id: 'shieldBot.bot1.opt5',
                default: 'Stop',
                description: '停止'
            }),
            value: '0',
        }];
    }

    getSpeed() {
        return [{
            text: '低速',
            text: formatMessage({
                id: 'shieldBot.bot1.opt6',
                default: 'Slow',
                description: '低速'
            }),
            value: '1',
        },
        {
            text: '中速',
            text: formatMessage({
                id: 'shieldBot.bot1.opt7',
                default: 'Medium',
                description: '中速'
            }),
            value: '2',
        },
        {
            text: '高速',
            text: formatMessage({
                id: 'shieldBot.bot1.opt8',
                default: 'Fast',
                description: '高速'
            }),
            value: '3',
        }];
    }

    getMotorrunType() {
        return [{
            text: '1',
            value: '1',
        },
        {
            text: '2',
            value: '2',
        }];
    }

    getServorunType() {
        return [{
            text: '1',
            value: '0',
        },
        {
            text: '2',
            value: '1',
        },
        {
            text: '3',
            value: '2',
        },
        {
            text: '4',
            value: '3',
        }];
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        let blocks = [{
            opcode: 'run',
            text: formatMessage({
                id: 'mark.run',
                default: 'M.A.R.K go [DIRECT] at [SPEED] speed',
                description: 'run'
            }),
            arguments: {
                DIRECT: {
                    type: ArgumentType.STRING,
                    menu: 'direct',
                    defaultValue: '1'
                },
                SPEED: {
                    type: ArgumentType.STRING,
                    menu: 'speed',
                    defaultValue: '1'
                },
            },
            blockType: BlockType.COMMAND,
        },
        {
            opcode: 'motorrun',
            text: formatMessage({
                id: 'mark.motorrun',
                default: 'M.A.R.K run motor [MOTOR] at [SPEED]',
                description: 'motorrun'
            }),
            arguments: {
                MOTOR: {
                    type: ArgumentType.STRING,
                    menu: 'motorrunType',
                    defaultValue: '1'
                },
                SPEED: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 1
                },
            },
            blockType: BlockType.COMMAND,
        },
        {
            opcode: 'servorun',
            text: formatMessage({
                id: 'mark.servorun',
                default: 'M.A.R.K Servo [MOTOR] move to [SPEED] degree',
                description: 'servorun'
            }),
            arguments: {
                MOTOR: {
                    type: ArgumentType.STRING,
                    menu: 'servorunType',
                    defaultValue: '0'
                },
                SPEED: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 0
                },
            },
            blockType: BlockType.COMMAND,
        }]

        return {
            id: 'mark',
            name: formatMessage({
                id: 'mark.categoryName',
                default: 'M.A.R.K',
                description: 'mark'
            }),
            // extensions: ['colours_machine'],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: blocks,
            colour: "#FD7D82",
            colourSecondary: "#EE6368",
            menus: {
                direct: this.getDirect(),
                speed: this.getSpeed(),
                motorrunType: this.getMotorrunType(),
                servorunType: this.getServorunType()
            }
        };
    }
}
module.exports = Scratch3MarkBlocks;
