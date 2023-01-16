const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6bm9uZTt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxyZWN0IHg9IjAuNyIgeT0iMCIgY2xhc3M9InN0MCIgd2lkdGg9IjEyLjYiIGhlaWdodD0iMTQiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTEyLjksMy42Yy0wLjMtMS4xLTEtMS45LTEuOS0yLjVjLTEtMC43LTIuMi0xLTMuOC0xQzQuNCwwLDMsMS42LDIuMywzQzEuNyw0LjIsMS42LDUuNSwxLjUsNS44TDAuNyw3LjQKCWMtMC4xLDAuMS0wLjEsMC4yLDAsMC4zYzAsMC4xLDAuMSwwLjIsMC4yLDAuMmwxLjUsMC44djIuNmMwLDAuMiwwLjIsMC40LDAuNCwwLjRoMS44djEuOEM0LjUsMTMuOCw0LjcsMTQsNSwxNEgxMAoJYzAuMiwwLDAuNC0wLjIsMC40LTAuNGwwLjEtMi41QzEyLjcsOS40LDEzLjcsNi4yLDEyLjksMy42eiBNMTEuNiw2LjljLTAuNCwwLjktMiwwLjktMi41LTAuNmMwLTAuMS0wLjEtMC4yLTAuMS0wLjIKCWMtMC4xLDAtMS4yLDAuMi0xLjUtMC42QzcuNSw1LjMsNy41LDUuMSw3LjUsNC45YzAtMC4xLDAtMC4yLDAtMC4zQzcuMiw0LjUsNiw1LjIsNS4yLDRDNC42LDMsNS4xLDIuMiw1LjUsMkM3LjQsMC42LDEwLDEuMSwxMS4zLDMKCUMxMiw0LjIsMTIuMSw1LjYsMTEuNiw2Ljl6Ii8+Cjwvc3ZnPgo=';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6bm9uZTt9Cgkuc3Qxe2ZpbGw6I0Y5NjI4Mjt9Cjwvc3R5bGU+CjxyZWN0IHg9IjAuNyIgeT0iMCIgY2xhc3M9InN0MCIgd2lkdGg9IjEyLjYiIGhlaWdodD0iMTQiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTEyLjksMy42Yy0wLjMtMS4xLTEtMS45LTEuOS0yLjVjLTEtMC43LTIuMi0xLTMuOC0xQzQuNCwwLDMsMS42LDIuMywzQzEuNyw0LjIsMS42LDUuNSwxLjUsNS44TDAuNyw3LjQKCWMtMC4xLDAuMS0wLjEsMC4yLDAsMC4zYzAsMC4xLDAuMSwwLjIsMC4yLDAuMmwxLjUsMC44djIuNmMwLDAuMiwwLjIsMC40LDAuNCwwLjRoMS44djEuOEM0LjUsMTMuOCw0LjcsMTQsNSwxNEgxMAoJYzAuMiwwLDAuNC0wLjIsMC40LTAuNGwwLjEtMi41QzEyLjcsOS40LDEzLjcsNi4yLDEyLjksMy42eiBNMTEuNiw2LjljLTAuNCwwLjktMiwwLjktMi41LTAuNmMwLTAuMS0wLjEtMC4yLTAuMS0wLjIKCWMtMC4xLDAtMS4yLDAuMi0xLjUtMC42QzcuNSw1LjMsNy41LDUuMSw3LjUsNC45YzAtMC4xLDAtMC4yLDAtMC4zQzcuMiw0LjUsNiw1LjIsNS4yLDRDNC42LDMsNS4xLDIuMiw1LjUsMkM3LjQsMC42LDEwLDEuMSwxMS4zLDMKCUMxMiw0LjIsMTIuMSw1LjYsMTEuNiw2Ljl6Ii8+Cjwvc3ZnPgo=';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3CognitiveServicesBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.faceFeatures = [];
        this.position = [];
        this.emotion = [];
        this.rateX = 464/260.0;
        this.rateY = 348/226.0;
    }

    getSpeechRecognitionResult() {
        let blockOnclick = this.runtime.recognizeMode.blockOnclick;
        if(blockOnclick){
            blockOnclick();
        }
        let word = this.runtime.recognizeMode.word;
        if(word == null) {
            return ''
        }
        return word;
    }

    getFaceFeaturesPosition(args) {
        let blockOnclick = this.runtime.recognizeMode.blockOnclick;
        if(blockOnclick){
            blockOnclick();
        }
        let faceFeatures = args.FaceFeatures;
        let position = args.Position;
        let feature;
        let parts = this.runtime.recognizeMode.parts;
        if(parts == null) {
            return 0
        }
        switch (faceFeatures) {
            case '0'://鼻子
                feature = parts.nose[0]
                break;
            case '1'://左眼
                feature = parts.leftEye[0]
                break;
            case '2'://右眼
                feature = parts.rightEye[0]
                break;
            default:
                break;
        }
        
        //舞台宽高464,348,识别窗口260,226
        //需要转换成舞台宽高
        let x = feature._x;
        x = x*this.rateX - 232;
        let y = feature._y;
        y = 174 - y*this.rateY;
        return position=="x"?Math.floor(x):Math.floor(y);
    }
    
    getAgeRecognitionResult() {
        let blockOnclick = this.runtime.recognizeMode.blockOnclick;
        if(blockOnclick){
            blockOnclick();
        }
        let age = this.runtime.recognizeMode.age;
        if(age == null) {
            return 0
        }
        return age;
    }

    getEmotionRecognitionResult(args) {
        let blockOnclick = this.runtime.recognizeMode.blockOnclick;
        if(blockOnclick){
            blockOnclick();
        }
        let emotion = args.Emotion;
        let expression = this.runtime.recognizeMode.expression;
        if(expression == null) {
            return ''
        }
        let ret = false;
        switch (emotion) {
            case '0':
                ret = expression == 'happy'
                break;
            case '1':
                ret = expression == 'neutral'
                break;
            case '2':
                ret = expression == 'surprised'
                break;
            case '3':
                ret = expression == 'sad'
                break;
            case '4':
                ret = expression == 'angry'
                break;
            case '5':
                ret = expression == 'disgusted'
                break;
            case '6':
                ret = expression == 'fearful'
                break;  
            default:
                break;
        }
        return ret;
    }

    recognizeVideoOnclick() {

    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.cognitiveServices';
    }

    _faceFeatures () {
        return [
            {
                text: formatMessage({
                    id: 'cognitiveServices.nose',
                    default: 'nose',
                    description: '鼻子'
                }),
                value: '0'
            },
            {
                text: formatMessage({
                    id: 'cognitiveServices.leftEye',
                    default: 'left eye',
                    description: '左眼'
                }),
                value: '1'
            },
            {
                text: formatMessage({
                    id: 'cognitiveServices.rightEye',
                    default: 'right eye',
                    description: '右眼'
                }),
                value: '2'
            }
        ];
    }

    _position () {
        return [
            {
                text: 'x',
                value: 'x'
            },
            {
                text: 'y',
                value: 'y'
            },
        ];
    }

    _emotion () {
        return [
            {
                text: formatMessage({
                    id: 'cognitiveServices.happy',
                    default: 'happy',
                    description: '高兴'
                }),
                value: '0'
            },
            {
                text: formatMessage({
                    id: 'cognitiveServices.neutral',
                    default: 'neutral',
                    description: '平静'
                }),
                value: '1'
            },
            {
                text: formatMessage({
                    id: 'cognitiveServices.surprised',
                    default: 'surprised',
                    description: '惊讶'
                }),
                value: '2'
            },
            {
                text: formatMessage({
                    id: 'cognitiveServices.sad',
                    default: 'sad',
                    description: '悲伤'
                }),
                value: '3'
            },
            {
                text: formatMessage({
                    id: 'cognitiveServices.angry',
                    default: 'angry',
                    description: '生气'
                }),
                value: '4'
            },
            {
                text: formatMessage({
                    id: 'cognitiveServices.disgusted',
                    default: 'disgusted',
                    description: '厌恶'
                }),
                value: '5'
            },
            {
                text: formatMessage({
                    id: 'cognitiveServices.fearful',
                    default: 'fearful',
                    description: '恐惧'
                }),
                value: '6'
            },
        ];
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        this.faceFeatures = this._faceFeatures();
        this.position = this._position();
        this.emotion = this._emotion();
        return {
            id: 'cognitiveServices',
            name: formatMessage({
                id: 'cognitiveServices.categoryName',
                default: 'Cognitive Services',
                description: '认知服务'
            }),
            // extensions: ['colours_cognize'],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'recognizeVideoOnclick',
                    text: formatMessage({
                        id: 'cognitiveServices.openRecognizeModal',
                        default: 'Open recognition window',
                        description: '打开识别窗口'
                    }),
                    blockType: BlockType.BUTTON
                },
                {
                    opcode: 'getSpeechRecognitionResult',
                    text: formatMessage({
                        id: 'cognitiveServices.getSpeechRecognitionResult',
                        default: 'Speech recognition result',
                        description: '语音识别结果'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getFaceFeaturesPosition',
                    text: formatMessage({
                        id: 'cognitiveServices.getFaceFeaturesPosition',
                        default: '[Position] position of [FaceFeatures]',
                        description: '获取脸部特征的坐标'
                    }),
                    arguments: {
                        FaceFeatures: {
                            type: ArgumentType.STRING,
                            menu: 'faceFeatures',
                            defaultValue: '0'
                        },
                        Position: {
                            type: ArgumentType.STRING,
                            menu: 'position',
                            defaultValue: 'x'
                        },
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getAgeRecognitionResult',
                    text: formatMessage({
                        id: 'cognitiveServices.getAgeRecognitionResult',
                        default: 'Age recognition result',
                        description: '年龄识别结果'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getEmotionRecognitionResult',
                    text: formatMessage({
                        id: 'cognitiveServices.getEmotionRecognitionResult',
                        default: 'Emotion recognition result is [Emotion] ?',
                        description: '表情识别结果'
                    }),
                    arguments: {
                        Emotion: {
                            type: ArgumentType.STRING,
                            menu: 'emotion',
                            defaultValue: '0'
                        },
                    },
                    blockType: BlockType.BOOLEAN
                }
            ],
            menus: {
                faceFeatures: this.faceFeatures,
                position: this.position,
                emotion: this.emotion
            }
        };
    }

    
}
module.exports = Scratch3CognitiveServicesBlocks;
