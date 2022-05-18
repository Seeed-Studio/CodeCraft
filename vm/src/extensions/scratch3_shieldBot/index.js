const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjEsOS40YzAtMS40LDEuMS0yLjYsMi41LTIuN1Y1LjljMC0yLjktMi40LTUuMy01LjMtNS4zUzAsMywwLDUuOXY3LjVoMTAuNnYtMS4zQzkuMiwxMS45LDguMSwxMC44LDguMSw5LjR6CgkgTTcsNC40YzAuNSwwLDAuOSwwLjQsMC45LDAuOWMwLDAuNS0wLjQsMC45LTAuOSwwLjljLTAuNSwwLTAuOS0wLjQtMC45LTAuOUM2LjIsNC44LDYuNiw0LjQsNyw0LjR6IE0xLjMsNS4xCgljMC4xLTAuNSwwLjYtMC43LDEuMS0wLjZjMC41LDAuMSwwLjcsMC42LDAuNiwxLjFDMi44LDYsMi4zLDYuMywxLjksNi4xQzEuNCw2LDEuMiw1LjUsMS4zLDUuMXogTTEuMiw3LjFDMS4yLDcuMSwxLjEsNywxLjIsNi45CgljMC0wLjEsMC4xLTAuMSwwLjItMC4xYzAsMCwzLjIsMS42LDYuOCwwYzAuMSwwLDAuMiwwLDAuMiwwLjFjMCwwLjEsMCwwLjItMC4xLDAuMkM3LDcuNyw1LjgsNy45LDQuOCw3LjlDMi43LDcuOSwxLjMsNy4xLDEuMiw3LjF6CgkiLz4KPGc+Cgk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIxMi4zIiBjeT0iNi43IiByPSIxLjUiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zLDguNGMtMC45LDAtMS43LTAuOC0xLjctMS43YzAtMC45LDAuOC0xLjcsMS43LTEuN0MxMy4yLDUsMTQsNS44LDE0LDYuN0MxNCw3LjcsMTMuMiw4LjQsMTIuMyw4LjR6CgkJIE0xMi4zLDUuNGMtMC43LDAtMS40LDAuNi0xLjQsMS40czAuNiwxLjQsMS40LDEuNHMxLjQtMC42LDEuNC0xLjRTMTMsNS40LDEyLjMsNS40eiIvPgo8L2c+CjxnPgoJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMTEuNSIgY3k9IjQuNyIgcj0iMC45Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNSw1LjdjLTAuNiwwLTEtMC41LTEtMWMwLTAuNiwwLjUtMSwxLTFjMC42LDAsMSwwLjUsMSwxQzEyLjUsNS4yLDEyLjEsNS43LDExLjUsNS43eiBNMTEuNSwzLjkKCQljLTAuNCwwLTAuOCwwLjQtMC44LDAuOGMwLDAuNCwwLjQsMC44LDAuOCwwLjhjMC40LDAsMC44LTAuNCwwLjgtMC44QzEyLjMsNC4yLDEyLDMuOSwxMS41LDMuOXoiLz4KPC9nPgo8Zz4KCTxlbGxpcHNlIGNsYXNzPSJzdDAiIGN4PSIxMC44IiBjeT0iOS40IiByeD0iMC42IiByeT0iMC44Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuOCw3QzkuNSw3LDguNCw4LjEsOC40LDkuNHMxLjEsMi40LDIuNCwyLjRzMi40LTEuMSwyLjQtMi40UzEyLjEsNywxMC44LDd6IE0xMC44LDEwLjQKCQljLTAuNSwwLTAuOS0wLjUtMC45LTFjMC0wLjYsMC40LTEsMC45LTFzMC45LDAuNSwwLjksMUMxMS43LDkuOSwxMS4zLDEwLjQsMTAuOCwxMC40eiIvPgo8L2c+Cjwvc3ZnPgo=';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzYzOEQ4NTt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjEsOS40YzAtMS40LDEuMS0yLjYsMi41LTIuN1Y1LjljMC0yLjktMi40LTUuMy01LjMtNS4zUzAsMywwLDUuOXY3LjVoMTAuNnYtMS4zQzkuMiwxMS45LDguMSwxMC44LDguMSw5LjR6CgkgTTcsNC40YzAuNSwwLDAuOSwwLjQsMC45LDAuOWMwLDAuNS0wLjQsMC45LTAuOSwwLjljLTAuNSwwLTAuOS0wLjQtMC45LTAuOUM2LjIsNC44LDYuNiw0LjQsNyw0LjR6IE0xLjMsNS4xCgljMC4xLTAuNSwwLjYtMC43LDEuMS0wLjZjMC41LDAuMSwwLjcsMC42LDAuNiwxLjFDMi44LDYsMi4zLDYuMywxLjksNi4xQzEuNCw2LDEuMiw1LjUsMS4zLDUuMXogTTEuMiw3LjFDMS4yLDcuMSwxLjEsNywxLjIsNi45CgljMC0wLjEsMC4xLTAuMSwwLjItMC4xYzAsMCwzLjIsMS42LDYuOCwwYzAuMSwwLDAuMiwwLDAuMiwwLjFjMCwwLjEsMCwwLjItMC4xLDAuMkM3LDcuNyw1LjgsNy45LDQuOCw3LjlDMi43LDcuOSwxLjMsNy4xLDEuMiw3LjF6CgkiLz4KPGc+Cgk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIxMi4zIiBjeT0iNi43IiByPSIxLjUiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zLDguNGMtMC45LDAtMS43LTAuOC0xLjctMS43YzAtMC45LDAuOC0xLjcsMS43LTEuN0MxMy4yLDUsMTQsNS44LDE0LDYuN0MxNCw3LjcsMTMuMiw4LjQsMTIuMyw4LjR6CgkJIE0xMi4zLDUuNGMtMC43LDAtMS40LDAuNi0xLjQsMS40czAuNiwxLjQsMS40LDEuNHMxLjQtMC42LDEuNC0xLjRTMTMsNS40LDEyLjMsNS40eiIvPgo8L2c+CjxnPgoJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMTEuNSIgY3k9IjQuNyIgcj0iMC45Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNSw1LjdjLTAuNiwwLTEtMC41LTEtMWMwLTAuNiwwLjUtMSwxLTFjMC42LDAsMSwwLjUsMSwxQzEyLjUsNS4yLDEyLjEsNS43LDExLjUsNS43eiBNMTEuNSwzLjkKCQljLTAuNCwwLTAuOCwwLjQtMC44LDAuOGMwLDAuNCwwLjQsMC44LDAuOCwwLjhjMC40LDAsMC44LTAuNCwwLjgtMC44QzEyLjMsNC4yLDEyLDMuOSwxMS41LDMuOXoiLz4KPC9nPgo8Zz4KCTxlbGxpcHNlIGNsYXNzPSJzdDAiIGN4PSIxMC44IiBjeT0iOS40IiByeD0iMC42IiByeT0iMC44Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuOCw3QzkuNSw3LDguNCw4LjEsOC40LDkuNHMxLjEsMi40LDIuNCwyLjRzMi40LTEuMSwyLjQtMi40UzEyLjEsNywxMC44LDd6IE0xMC44LDEwLjQKCQljLTAuNSwwLTAuOS0wLjUtMC45LTFjMC0wLjYsMC40LTEsMC45LTFzMC45LDAuNSwwLjksMUMxMS43LDkuOSwxMS4zLDEwLjQsMTAuOCwxMC40eiIvPgo8L2c+Cjwvc3ZnPgo=';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3ShieldBotBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    shieldBot1() {

    }

    shieldBot2() {

    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.shieldBot';
    }

    getDirect() {
        return [{
            text: formatMessage({
                id: 'shieldBot.bot1.opt1',
                default: 'Forward',
                description: '前进'
            }),
            value: 'forward',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot1.opt2',
                default: 'Backward',
                description: '后退'
            }),
            value: 'back',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot1.opt3',
                default: 'Left',
                description: '往左'
            }),
            value: 'left',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot1.opt4',
                default: 'Right',
                description: '往右'
            }),
            value: 'right',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot1.opt5',
                default: 'Stop',
                description: '停止'
            }),
            value: 'stop',
        }];
    }

    getSpeed() {
        return [{
            text: formatMessage({
                id: 'shieldBot.bot1.opt6',
                default: 'Slow',
                description: '低速'
            }),
            value: 'low',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot1.opt7',
                default: 'Medium',
                description: '中速'
            }),
            value: 'middle',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot1.opt8',
                default: 'Fast',
                description: '高速'
            }),
            value: 'high',
        }];
    }

    getPosition() {
        return [{
            text: formatMessage({
                id: 'shieldBot.bot2.opt1',
                default: 'Middle',
                description: '中'
            }),
            value: 'middle',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot2.opt2',
                default: 'Left',
                description: '左'
            }),
            value: 'left',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot2.opt3',
                default: 'Edge Left',
                description: '最左'
            }),
            value: 'most-left',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot2.opt4',
                default: 'Right',
                description: '右'
            }),
            value: 'right',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot2.opt5',
                default: 'Edge Right',
                description: '最右'
            }),
            value: 'most-right',
        },
        {
            text: formatMessage({
                id: 'shieldBot.bot2.opt6',
                default: 'Lost',
                description: '丢失'
            }),
            value: 'lose',
        }];
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        let blocks = [{
            opcode: 'shieldBot1',
            text: formatMessage({
                id: 'shieldBot.bot1',
                default: 'Shield Bot Motors go [DIRECT] at [SPEED] speed',
                description: 'bot1'
            }),
            arguments: {
                DIRECT: {
                    type: ArgumentType.STRING,
                    menu: 'direct',
                    defaultValue: 'forward'
                },
                SPEED: {
                    type: ArgumentType.STRING,
                    menu: 'speed',
                    defaultValue: 'low'
                },
            },
            blockType: BlockType.COMMAND,
        },
        {
            opcode: 'shieldBot2',
            text: formatMessage({
                id: 'shieldBot.bot2',
                default: 'Shield Bot Motors position [POSITION]',
                description: 'bot2'
            }),
            arguments: {
                POSITION: {
                    type: ArgumentType.STRING,
                    menu: 'position',
                    defaultValue: 'middle'
                },
            },
            blockType: BlockType.BOOLEAN,
        }]

        return {
            id: 'shieldBot',
            name: formatMessage({
                id: 'shieldBot.categoryName',
                default: 'Shield Bot',
                description: 'shieldBot'
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
                position: this.getPosition()
            }
        };
    }
}
module.exports = Scratch3ShieldBotBlocks;
