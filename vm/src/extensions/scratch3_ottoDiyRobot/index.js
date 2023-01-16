const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUuNywxNGgtMWMtMC4yLDAtMC40LTAuMi0wLjQtMC40VjEwYzAtMC4yLDAuMi0wLjQsMC40LTAuNGgxYzAuMiwwLDAuNCwwLjIsMC40LDAuNHYzLjYKCQlDNi4xLDEzLjksNS45LDE0LDUuNywxNHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01LjcsMTRIMi44Yy0wLjIsMC0wLjQtMC4yLTAuNC0wLjR2LTAuN2MwLTAuMiwwLjItMC40LDAuNC0wLjRoMi45YzAuMiwwLDAuNCwwLjIsMC40LDAuNHYwLjcKCQlDNi4xLDEzLjksNS45LDE0LDUuNywxNHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDE0aDFjMC4yLDAsMC40LTAuMiwwLjQtMC40VjEwYzAtMC4yLTAuMi0wLjQtMC40LTAuNEg4Yy0wLjIsMC0wLjQsMC4yLTAuNCwwLjR2My42QzcuNywxMy45LDcuOCwxNCw4LDE0eiIKCQkvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTgsMTRIMTFjMC4yLDAsMC4zLTAuMSwwLjMtMC4zdi0wLjhjMC0wLjItMC4xLTAuMy0wLjMtMC4zSDhjLTAuMiwwLTAuMywwLjEtMC4zLDAuM3YwLjgKCQlDNy43LDEzLjksNy44LDE0LDgsMTR6Ii8+CjwvZz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTkuOSwwSDRDMy43LDAsMy40LDAuMiwzLjQsMC41djMuNGg3VjAuNUMxMC40LDAuMiwxMC4yLDAsOS45LDB6IE01LjcsMi4zQzUuMywyLjMsNSwyLDUsMS43UzUuMywxLDUuNywxCglzMC42LDAuMywwLjYsMC42UzYsMi4zLDUuNywyLjN6IE04LjIsMi4zQzcuOCwyLjMsNy41LDIsNy41LDEuN1M3LjgsMSw4LjIsMWMwLjQsMCwwLjYsMC4zLDAuNiwwLjZTOC41LDIuMyw4LjIsMi4zeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMyw3LjRMMyw3LjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuN1Y1YzAtMC40LDAuMy0wLjcsMC43LTAuN2gwYzAuNCwwLDAuNywwLjMsMC43LDAuN3YxLjcKCUMzLjgsNy4xLDMuNCw3LjQsMyw3LjR6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMC44LDcuNEwxMC44LDcuNGMtMC40LDAtMC44LTAuMy0wLjgtMC43VjVjMC0wLjQsMC4zLTAuNywwLjctMC43aDBjMC40LDAsMC44LDAuMywwLjgsMC43djEuNwoJQzExLjUsNy4xLDExLjIsNy40LDEwLjgsNy40eiIvPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjIsNC4zSDUuNmMtMC4yLDAtMC40LDAuMi0wLjQsMC40djIuN2MwLDAuMiwwLjIsMC40LDAuNCwwLjRoMi43YzAuMiwwLDAuNC0wLjIsMC40LTAuNFY0LjcKCQlDOC43LDQuNSw4LjUsNC4zLDguMiw0LjN6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMywzLjJIMy41QzMuMiwzLjIsMywzLjQsMywzLjd2NC44QzMsOC44LDMuMiw5LDMuNSw5aDYuOWMwLjMsMCwwLjUtMC4yLDAuNS0wLjVWMy43CgkJQzEwLjksMy40LDEwLjYsMy4yLDEwLjMsMy4yeiBNOC45LDcuN2MwLDAuMi0wLjIsMC40LTAuNCwwLjRINS4zYy0wLjIsMC0wLjQtMC4yLTAuNC0wLjRWNC41QzQuOSw0LjIsNS4xLDQsNS4zLDRoMy4yCgkJYzAuMiwwLDAuNCwwLjIsMC40LDAuNFY3Ljd6Ii8+CjwvZz4KPC9zdmc+Cg==';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0MxOUE2Qzt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUuNywxNGgtMWMtMC4yLDAtMC40LTAuMi0wLjQtMC40VjEwYzAtMC4yLDAuMi0wLjQsMC40LTAuNGgxYzAuMiwwLDAuNCwwLjIsMC40LDAuNHYzLjYKCQlDNi4xLDEzLjksNS45LDE0LDUuNywxNHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01LjcsMTRIMi44Yy0wLjIsMC0wLjQtMC4yLTAuNC0wLjR2LTAuN2MwLTAuMiwwLjItMC40LDAuNC0wLjRoMi45YzAuMiwwLDAuNCwwLjIsMC40LDAuNHYwLjcKCQlDNi4xLDEzLjksNS45LDE0LDUuNywxNHoiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDE0aDFjMC4yLDAsMC40LTAuMiwwLjQtMC40VjEwYzAtMC4yLTAuMi0wLjQtMC40LTAuNEg4Yy0wLjIsMC0wLjQsMC4yLTAuNCwwLjR2My42QzcuNywxMy45LDcuOCwxNCw4LDE0eiIKCQkvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTgsMTRIMTFjMC4yLDAsMC4zLTAuMSwwLjMtMC4zdi0wLjhjMC0wLjItMC4xLTAuMy0wLjMtMC4zSDhjLTAuMiwwLTAuMywwLjEtMC4zLDAuM3YwLjgKCQlDNy43LDEzLjksNy44LDE0LDgsMTR6Ii8+CjwvZz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTkuOSwwSDRDMy43LDAsMy40LDAuMiwzLjQsMC41djMuNGg3VjAuNUMxMC40LDAuMiwxMC4yLDAsOS45LDB6IE01LjcsMi4zQzUuMywyLjMsNSwyLDUsMS43UzUuMywxLDUuNywxCglzMC42LDAuMywwLjYsMC42UzYsMi4zLDUuNywyLjN6IE04LjIsMi4zQzcuOCwyLjMsNy41LDIsNy41LDEuN1M3LjgsMSw4LjIsMWMwLjQsMCwwLjYsMC4zLDAuNiwwLjZTOC41LDIuMyw4LjIsMi4zeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMyw3LjRMMyw3LjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuN1Y1YzAtMC40LDAuMy0wLjcsMC43LTAuN2gwYzAuNCwwLDAuNywwLjMsMC43LDAuN3YxLjcKCUMzLjgsNy4xLDMuNCw3LjQsMyw3LjR6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMC44LDcuNEwxMC44LDcuNGMtMC40LDAtMC44LTAuMy0wLjgtMC43VjVjMC0wLjQsMC4zLTAuNywwLjctMC43aDBjMC40LDAsMC44LDAuMywwLjgsMC43djEuNwoJQzExLjUsNy4xLDExLjIsNy40LDEwLjgsNy40eiIvPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjIsNC4zSDUuNmMtMC4yLDAtMC40LDAuMi0wLjQsMC40djIuN2MwLDAuMiwwLjIsMC40LDAuNCwwLjRoMi43YzAuMiwwLDAuNC0wLjIsMC40LTAuNFY0LjcKCQlDOC43LDQuNSw4LjUsNC4zLDguMiw0LjN6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMywzLjJIMy41QzMuMiwzLjIsMywzLjQsMywzLjd2NC44QzMsOC44LDMuMiw5LDMuNSw5aDYuOWMwLjMsMCwwLjUtMC4yLDAuNS0wLjVWMy43CgkJQzEwLjksMy40LDEwLjYsMy4yLDEwLjMsMy4yeiBNOC45LDcuN2MwLDAuMi0wLjIsMC40LTAuNCwwLjRINS4zYy0wLjIsMC0wLjQtMC4yLTAuNC0wLjRWNC41QzQuOSw0LjIsNS4xLDQsNS4zLDRoMy4yCgkJYzAuMiwwLDAuNCwwLjIsMC40LDAuNFY3Ljd6Ii8+CjwvZz4KPC9zdmc+Cg==';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3OttoDiyRobotBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    ottoDiyRobot1() {

    }

    ottoDiyRobot2() {

    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.ottoDiyRobot';
    }

    getDirect() {
        return [{
            text: formatMessage({
                id: 'ottoDiyRobot.robot1.opt0',
                default: 'forward',
                description: '前进'
            }),
            value: '0',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot1.opt1',
                default: 'back',
                description: '后退'
            }),
            value: '1',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot1.opt2',
                default: 'left',
                description: '往左'
            }),
            value: '2',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot1.opt3',
                default: 'right',
                description: '往右'
            }),
            value: '3',
        }];
    }

    getAction() {
        return [{
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt0',
                default: 'Rest',
                description: '停止'
            }),
            value: 'Rest',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt1',
                default: 'Jump',
                description: '跳动'
            }),
            value: 'Jump',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt2',
                default: 'Bend',
                description: '侧踢'
            }),
            value: 'Bend',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt3',
                default: 'ShakeLeg',
                description: '摇摇腿'
            }),
            value: 'ShakeLeg',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt4',
                default: 'UpDown',
                description: '上下摇摆'
            }),
            value: 'UpDown',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt5',
                default: 'Swing',
                description: '左右摇摆'
            }),
            value: 'Swing',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt6',
                default: 'TipToeSwing',
                description: '舞动脚尖'
            }),
            value: 'TipToeSwing',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt7',
                default: 'Jitter',
                description: '抖动'
            }),
            value: 'Jitter',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt8',
                default: 'AscendingTurn',
                description: '上下抖动'
            }),
            value: 'AscendingTurn',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt9',
                default: 'Moonwalker',
                description: '太空步'
            }),
            value: 'Moonwalker',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt10',
                default: 'Crusaito',
                description: '月球漫步'
            }),
            value: 'Crusaito',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt11',
                default: 'Flapping',
                description: '摇摆'
            }),
            value: 'Flapping',
        }];
    }

    getDirects() {
        return [{
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt12',
                default: 'RIGHT/FOREWARD',
                description: '向右/向前'
            }),
            value: '0',
        },
        {
            text: formatMessage({
                id: 'ottoDiyRobot.robot2.opt13',
                default: 'LEFT/BACKWARD',
                description: '向左/向后'
            }),
            value: '1',
        }];
    }


    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        let blocks = [{
            opcode: 'ottoDiyRobot1',
            text: formatMessage({
                id: 'ottoDiyRobot.robot1',
                default: 'Otto DIY Robot [DIRECT] Steps:[STEPS] Time:[TIMES]',
                description: 'robot1'
            }),
            arguments: {
                DIRECT: {
                    type: ArgumentType.STRING,
                    menu: 'direct',
                    defaultValue: '0'
                },
                STEPS: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 1
                },
                TIMES: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 800
                }
            },
            blockType: BlockType.COMMAND,
        },
        {
            opcode: 'ottoDiyRobot2',
            text: formatMessage({
                id: 'ottoDiyRobot.robot2',
                default: 'Otto DIY Robot [ACTION] Steps:[STEPS] Time:[TIMES] Direction:[DIRECTS]',
                description: 'robot2'
            }),
            arguments: {
                ACTION: {
                    type: ArgumentType.STRING,
                    menu: 'action',
                    defaultValue: 'Rest'
                },
                STEPS: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 1
                },
                TIMES: {
                    type: ArgumentType.NUMBER,
                    defaultValue: 800
                },
                DIRECTS: {
                    type: ArgumentType.STRING,
                    menu: 'directs',
                    defaultValue: '0'
                },
            },
            blockType: BlockType.COMMAND,
        }]

        return {
            id: 'ottoDiyRobot',
            name: formatMessage({
                id: 'ottoDiyRobot.categoryName',
                default: 'Biped Robot',
                description: 'ottoDiyRobot'
            }),
            // extensions: ['colours_machine'],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: blocks,
            colour: "#FD7D82",
            colourSecondary: "#EE6368",
            menus: {
                direct: this.getDirect(),
                action: this.getAction(),
                directs: this.getDirects()
            }
        };
    }
}
module.exports = Scratch3OttoDiyRobotBlocks;
