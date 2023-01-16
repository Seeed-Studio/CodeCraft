const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzLjQsMy44Yy0wLjMsMC0wLjUsMC4yLTAuNSwwLjVjMCwwLjIsMC4xLDAuNCwwLjMsMC41djEuNEMxMyw2LDEyLjgsNS44LDEyLjUsNS44YzAsMCwwLDAsMCwwCgkJYzAuMiwwLjUsMC4zLDEsMC4zLDEuNmMwLDAuNi0wLjIsMS4yLTAuNCwxLjhjMCwwLDAuMSwwLDAuMSwwYzAuNiwwLDEuMS0wLjgsMS4xLTEuN2MwLDAsMC0wLjEsMC0wLjFoMFY0LjgKCQljMC4yLTAuMSwwLjMtMC4zLDAuMy0wLjVDMTMuOSw0LDEzLjcsMy44LDEzLjQsMy44eiIvPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEuMiw3LjRjMC0wLjYsMC4xLTEuMSwwLjMtMS42YzAsMCwwLDAsMCwwYy0wLjYsMC0xLjEsMC44LTEuMSwxLjdzMC41LDEuNywxLjEsMS43YzAsMCwwLjEsMCwwLjEsMAoJCQlDMS40LDguNiwxLjIsOCwxLjIsNy40eiIvPgoJCTxyZWN0IHg9IjAuNCIgeT0iNC41IiBjbGFzcz0ic3QwIiB3aWR0aD0iMC40IiBoZWlnaHQ9IjMiLz4KCQk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIwLjYiIGN5PSI0LjMiIHI9IjAuNSIvPgoJCTxnPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMSw2LjRDOS45LDYuMiw5LjUsNiw5LjEsNmMtMC43LDAtMSwwLjItMS4zLDAuM0M3LjUsNi4zLDcuMyw2LjUsNyw2LjVjLTAuMywwLTAuNS0wLjEtMC43LTAuMgoJCQkJQzYuMSw2LjEsNiw2LDUuNCw2Yy0xLjEsMC0xLjgsMC44LTIsMi4zYy0wLjEsMSwwLjEsMiwwLjMsMi42YzAuOSwwLjYsMiwwLjksMy4yLDAuOWMxLjMsMCwyLjUtMC40LDMuNC0xCgkJCQljMC4xLTAuNiwwLjMtMS41LDAuMy0yLjJDMTAuOCw3LjcsMTAuNSw2LjksMTAuMSw2LjR6IE01LjksOS41QzUuOCw5LjcsNS43LDkuOCw1LjYsOS44SDUuNGMtMC4xLDAtMC4zLTAuMS0wLjMtMC4zVjcuOAoJCQkJYzAtMC4xLDAuMS0wLjMsMC4zLTAuM2gwLjJjMC4xLDAsMC4zLDAuMSwwLjMsMC4zVjkuNXogTTguOSw5LjVDOC44LDkuNyw4LjcsOS44LDguNiw5LjhIOC40Yy0wLjEsMC0wLjMtMC4xLTAuMy0wLjNWNy44CgkJCQljMC0wLjEsMC4xLTAuMywwLjMtMC4zaDAuMmMwLjEsMCwwLjMsMC4xLDAuMywwLjNWOS41eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNywzLjFDNC4xLDMuMSwxLjcsNSwxLjcsNy40YzAsMS4xLDAuNiwyLjIsMS40LDIuOUMzLDkuNywyLjksOSwzLDguMmMwLjItMS43LDEuMS0yLjcsMi40LTIuNwoJCQkJYzAuNywwLDEsMC4yLDEuMiwwLjRDNi43LDUuOSw2LjgsNiw3LDZjMC4yLDAsMC40LTAuMSwwLjYtMC4yYzAuMy0wLjEsMC44LTAuMywxLjUtMC4zYzAuNSwwLDEsMC4yLDEuMywwLjYKCQkJCWMwLjYsMC42LDAuOSwxLjYsMC44LDIuNGMwLDAuNS0wLjEsMS4xLTAuMiwxLjdjMC44LTAuOCwxLjMtMS43LDEuMy0yLjhDMTIuMyw1LDkuOSwzLjEsNywzLjF6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzRENjI4Nzt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzLjQsMy44Yy0wLjMsMC0wLjUsMC4yLTAuNSwwLjVjMCwwLjIsMC4xLDAuNCwwLjMsMC41djEuNEMxMyw2LDEyLjgsNS44LDEyLjUsNS44YzAsMCwwLDAsMCwwCgkJYzAuMiwwLjUsMC4zLDEsMC4zLDEuNmMwLDAuNi0wLjIsMS4yLTAuNCwxLjhjMCwwLDAuMSwwLDAuMSwwYzAuNiwwLDEuMS0wLjgsMS4xLTEuN2MwLDAsMC0wLjEsMC0wLjFoMFY0LjgKCQljMC4yLTAuMSwwLjMtMC4zLDAuMy0wLjVDMTMuOSw0LDEzLjcsMy44LDEzLjQsMy44eiIvPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEuMiw3LjRjMC0wLjYsMC4xLTEuMSwwLjMtMS42YzAsMCwwLDAsMCwwYy0wLjYsMC0xLjEsMC44LTEuMSwxLjdzMC41LDEuNywxLjEsMS43YzAsMCwwLjEsMCwwLjEsMAoJCQlDMS40LDguNiwxLjIsOCwxLjIsNy40eiIvPgoJCTxyZWN0IHg9IjAuNCIgeT0iNC41IiBjbGFzcz0ic3QwIiB3aWR0aD0iMC40IiBoZWlnaHQ9IjMiLz4KCQk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIwLjYiIGN5PSI0LjMiIHI9IjAuNSIvPgoJCTxnPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMSw2LjRDOS45LDYuMiw5LjUsNiw5LjEsNmMtMC43LDAtMSwwLjItMS4zLDAuM0M3LjUsNi4zLDcuMyw2LjUsNyw2LjVjLTAuMywwLTAuNS0wLjEtMC43LTAuMgoJCQkJQzYuMSw2LjEsNiw2LDUuNCw2Yy0xLjEsMC0xLjgsMC44LTIsMi4zYy0wLjEsMSwwLjEsMiwwLjMsMi42YzAuOSwwLjYsMiwwLjksMy4yLDAuOWMxLjMsMCwyLjUtMC40LDMuNC0xCgkJCQljMC4xLTAuNiwwLjMtMS41LDAuMy0yLjJDMTAuOCw3LjcsMTAuNSw2LjksMTAuMSw2LjR6IE01LjksOS41QzUuOCw5LjcsNS43LDkuOCw1LjYsOS44SDUuNGMtMC4xLDAtMC4zLTAuMS0wLjMtMC4zVjcuOAoJCQkJYzAtMC4xLDAuMS0wLjMsMC4zLTAuM2gwLjJjMC4xLDAsMC4zLDAuMSwwLjMsMC4zVjkuNXogTTguOSw5LjVDOC44LDkuNyw4LjcsOS44LDguNiw5LjhIOC40Yy0wLjEsMC0wLjMtMC4xLTAuMy0wLjNWNy44CgkJCQljMC0wLjEsMC4xLTAuMywwLjMtMC4zaDAuMmMwLjEsMCwwLjMsMC4xLDAuMywwLjNWOS41eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNywzLjFDNC4xLDMuMSwxLjcsNSwxLjcsNy40YzAsMS4xLDAuNiwyLjIsMS40LDIuOUMzLDkuNywyLjksOSwzLDguMmMwLjItMS43LDEuMS0yLjcsMi40LTIuNwoJCQkJYzAuNywwLDEsMC4yLDEuMiwwLjRDNi43LDUuOSw2LjgsNiw3LDZjMC4yLDAsMC40LTAuMSwwLjYtMC4yYzAuMy0wLjEsMC44LTAuMywxLjUtMC4zYzAuNSwwLDEsMC4yLDEuMywwLjYKCQkJCWMwLjYsMC42LDAuOSwxLjYsMC44LDIuNGMwLDAuNS0wLjEsMS4xLTAuMiwxLjdjMC44LTAuOCwxLjMtMS43LDEuMy0yLjhDMTIuMyw1LDkuOSwzLjEsNywzLjF6Ii8+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3TeachableMachineBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.getCategoryParam = [];
    }

    getRecognitionResult() {
        let blockOnclick = this.runtime.trainMode.blockOnclick;
        if(blockOnclick){
            blockOnclick();
        }
        let classificationList = this.runtime.trainMode.classificationList;
        if(classificationList == null) {
            return ''
        }
        let classification = classificationList[this.runtime.trainMode.predictionID];
        if(classification == null) {
            return ''
        }
        return classification.name;
    }

    getConfidenceValue(args) {
        let blockOnclick = this.runtime.trainMode.blockOnclick;
        if(blockOnclick){
            blockOnclick();
        }
        let id = Cast.toNumber(args.CATEGORY_PARAM);
        let classificationList = this.runtime.trainMode.classificationList;
        if(classificationList == null) {
            return ''
        }
        let classification = classificationList[id];
        if(classification == null) {
            return ''
        }
        return classification.confidence;
    }

    whichLabel(args) {
        let blockOnclick = this.runtime.trainMode.blockOnclick;
        if(blockOnclick){
            blockOnclick();
        }
        let id = Cast.toNumber(args.CATEGORY_PARAM);
        let predictionID = this.runtime.trainMode.predictionID;
        if(predictionID == null) {
            return false;
        }
        return predictionID==id;
    }

    trainOnclick() {

    }

    trainVideoOnclick() {

    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.teachableMachine';
    }

    _getCategoryParam () {
        let categoryParams = [];
        let classificationList = this.runtime.trainMode.classificationList;
        for(let i=0;i<classificationList.length;i++) {
            let param = {};
            let classification = classificationList[i];
            param.text = classification.name;
            param.value = i+'';
            categoryParams.push(param);
        }
        return categoryParams;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        //是否训练过
        let isTrain = this.runtime.trainMode.isTrain;
        this.getCategoryParam = this._getCategoryParam();
        
        let blocks = [{
            opcode: 'trainOnclick',
            text: formatMessage({
                id: 'teachableMachine.trainMode',
                default: 'Training model',
                description: '训练模型'
            }),
            blockType: BlockType.BUTTON
        }]
        //训练过才出现的积木
        if (isTrain) {
            let trainBlock = [{
                opcode: 'trainVideoOnclick',
                text: formatMessage({
                    id: 'teachableMachine.openRecognizeModal',
                    default: 'Open recognition window',
                    description: '打开识别窗口'
                }),
                blockType: BlockType.BUTTON
            },
            {
                opcode: 'getRecognitionResult',
                text: formatMessage({
                    id: 'teachableMachine.getRecognitionResult',
                    default: 'Recognition result',
                    description: '识别结果'
                }),
                disableMonitor: true,
                blockType: BlockType.REPORTER
            },
            {
                opcode: 'getConfidenceValue',
                text: formatMessage({
                    id: 'teachableMachine.getConfidenceValue',
                    default: 'Confidence of [CATEGORY_PARAM]',
                    description: '获取信心值'
                }),
                arguments: {
                    CATEGORY_PARAM: {
                        type: ArgumentType.STRING,
                        menu: 'categoryParam',
                        defaultValue: '0'
                    },
                },
                blockType: BlockType.REPORTER
            },
            {
                opcode: 'whichLabel',
                text: formatMessage({
                    id: 'teachableMachine.whichLabel',
                    default: 'Recognition result is [CATEGORY_PARAM] ?',
                    description: '识别结果'
                }),
                arguments: {
                    CATEGORY_PARAM: {
                        type: ArgumentType.STRING,
                        menu: 'categoryParam',
                        defaultValue: '0'
                    },
                },
                blockType: BlockType.BOOLEAN
            }]
            blocks = blocks.concat(trainBlock);
        }
        return {
            id: 'teachableMachine',
            name: formatMessage({
                id: 'teachableMachine.categoryName',
                default: 'Teachable Machine',
                description: '机器学习'
            }),
            // extensions: ['colours_machine'],
            menuIconURI: menuIconURI,
            blockIconURI:blockIconURI,
            blocks: blocks,
            menus: {
                categoryParam: this.getCategoryParam
            }
        };
    }
}
module.exports = Scratch3TeachableMachineBlocks;
