const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
// const blockIconURI = '';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0VBODU3NTt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03LjgsMC41bDEuNSwzLjFjMC4xLDAuMywwLjQsMC41LDAuNywwLjVsMy4zLDAuNWMwLjcsMC4xLDEsMSwwLjUsMS42bC0yLjQsMi40Yy0wLjIsMC4yLTAuMywwLjUtMC4zLDAuOAoJbDAuNiwzLjRjMC4xLDAuOC0wLjYsMS4zLTEuMywxbC0zLTEuNmMtMC4zLTAuMS0wLjYtMC4xLTAuOCwwbC0zLDEuNmMtMC42LDAuNC0xLjQtMC4yLTEuMy0xbDAuNi0zLjRjMC0wLjMsMC0wLjYtMC4zLTAuOEwwLjMsNi4yCglDLTAuMyw1LjcsMCw0LjgsMC44LDQuNmwzLjMtMC41YzAuMywwLDAuNS0wLjIsMC43LTAuNWwxLjUtMy4xQzYuNS0wLjIsNy41LTAuMiw3LjgsMC41eiIvPgo8L3N2Zz4K';

const blockText = (name, buyPoint) => {
    return buyPoint.replace('#', name);
}

//获取积木定义
const getBlocks = (models = []) => {

    const imageReporter = formatMessage({
        id: 'modelExtension.block.imageReporter',
        default: 'recognized # result probability > [PROBABILITY] %',
        description: ''
    });

    const imageBoolean = formatMessage({
        id: 'modelExtension.block.imageBoolean',
        default: 'recognized # is [RESULT] probability > [PROBABILITY] %',
        description: ''
    });

    const objectReporter = formatMessage({
        id: 'modelExtension.block.objectReporter',
        default: 'detected # result probability > [PROBABILITY] %',
        description: ''
    });

    const objectReporterWithCoordinate = formatMessage({
        id: 'modelExtension.block.objectReporterWithCoordinate',
        default: 'detected #  [RESULT] [XY] coordinate probability > [PROBABILITY] %',
        description: ''
    });

    const objectBoolean = formatMessage({
        id: 'modelExtension.block.objectBoolean',
        default: 'detected # is [RESULT] probability > [PROBABILITY] %',
        description: ''
    });

    const trainRecordSeedSample = formatMessage({
        id: 'modelExtension.block.trainRecordSeedSample',
        default: 'record # seed sample for [RESULT]',
        description: ''
    });

    const trainRecordSample = formatMessage({
        id: 'modelExtension.block.trainRecordSample',
        default: 'record a # sample',
        description: ''
    });

    const trainRecognized = formatMessage({
        id: 'modelExtension.block.trainRecognized',
        default: 'recognized # is [RESULT] probability > [PROBABILITY] %',
        description: ''
    });

    const trainRecognizedResult = formatMessage({
        id: 'modelExtension.block.trainRecognizedResult',
        default: 'recognized # result probability > [PROBABILITY] %',
        description: ''
    });

    const trainModelSave = formatMessage({
        id: 'modelExtension.block.trainModelSave',
        default: 'save # model as [NAME]',
        description: ''
    });

    const trainModelLoad = formatMessage({
        id: 'modelExtension.block.trainModelLoad',
        default: 'load # model from [NAME]',
        description: ''
    });


    //定义图像模型 block
    const defineImageBlocks = (m) => {
        return [
            {
                opcode: `blockOne${m.id}`,
                text: blockText(m.modelName, imageBoolean),
                blockType: BlockType.BOOLEAN,
                arguments: {
                    RESULT: {
                        type: ArgumentType.NUMBER,
                        menu: `blockMenu${m.id}`,
                        defaultValue: (m.modelData || [])[0].value
                    },
                    PROBABILITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            },
            {
                opcode: `blockTwo${m.id}`,
                text: blockText(m.modelName, imageReporter),
                blockType: BlockType.REPORTER,
                arguments: {
                    PROBABILITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            }
        ];
    }

    //定义物体模型 block
    const defineObjectBlocks = (m) => {
        return [
            {
                opcode: `blockOne${m.id}`,
                text: blockText(m.modelName, objectBoolean),
                blockType: BlockType.BOOLEAN,
                arguments: {
                    RESULT: {
                        type: ArgumentType.NUMBER,
                        menu: `blockMenu${m.id}`,
                        defaultValue: (m.modelData || [])[0].value
                    },
                    PROBABILITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            },
            {
                opcode: `blockTwo${m.id}`,
                text: blockText(m.modelName, objectReporter),
                blockType: BlockType.REPORTER,
                arguments: {
                    PROBABILITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            },
            {
                opcode: `blockThree${m.id}`,
                text: blockText(m.modelName, objectReporterWithCoordinate),
                blockType: BlockType.REPORTER,
                arguments: {
                    RESULT: {
                        type: ArgumentType.NUMBER,
                        menu: `blockMenu${m.id}`,
                        defaultValue: (m.modelData || [])[0].value
                    },
                    XY: {
                        type: ArgumentType.NUMBER,
                        menu: 'XY',
                        defaultValue: '1'
                    },
                    PROBABILITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            }
        ];
    }

    //定义训练模型 block
    const defineTrainBlocks = (m) => {
        return [
            {
                opcode: `recordSeedSample${m.id}`,
                text: blockText(m.modelName, trainRecordSeedSample),
                blockType: BlockType.COMMAND,
                arguments: {
                    RESULT: {
                        type: ArgumentType.NUMBER,
                        menu: `blockMenu${m.id}`,
                        defaultValue: (m.modelData || [])[0].value
                    }
                }
            },
            {
                opcode: `recordSample${m.id}`,
                text: blockText(m.modelName, trainRecordSample),
                blockType: BlockType.COMMAND
            },
            {
                opcode: `recognized${m.id}`,
                text: blockText(m.modelName, trainRecognized),
                blockType: BlockType.BOOLEAN,
                arguments: {
                    RESULT: {
                        type: ArgumentType.NUMBER,
                        menu: `blockMenu${m.id}`,
                        defaultValue: (m.modelData || [])[0].value
                    },
                    PROBABILITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            },
            {
                opcode: `recognizedResult${m.id}`,
                text: blockText(m.modelName, trainRecognizedResult),
                blockType: BlockType.REPORTER,
                arguments: {
                    PROBABILITY: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 50
                    }
                }
            },
            {
                opcode: `modelSave${m.id}`,
                text: blockText(m.modelName, trainModelSave),
                blockType: BlockType.COMMAND,
                arguments: {
                    NAME: {
                        type: ArgumentType.STRING,
                        defaultValue: m.modelFilePath || ''
                    }
                }
            },
            {
                opcode: `modelLoad${m.id}`,
                text: blockText(m.modelName, trainModelLoad),
                blockType: BlockType.COMMAND,
                arguments: {
                    NAME: {
                        type: ArgumentType.STRING,
                        defaultValue: m.modelFilePath || ''
                    }
                }
            },
        ];
    }

    var blocks = [];

    for (let index = 0; index < models.length; index++) {
        const m = models[index];
        const type = m.modelType;
        // 定义图像模型积木
        if (type == 'image') {
            blocks = blocks.concat(defineImageBlocks(m));
        }
        // 定义物体模型积木
        else if (type == 'object') {
            blocks = blocks.concat(defineObjectBlocks(m));
        }
        // 定义物体模型积木
        else if (type == 'train') {
            blocks = blocks.concat(defineTrainBlocks(m));
        }
    }

    return blocks;

}

//获取积木菜单
const getMenus = (models = []) => {
    const menus = {};
    for (let index = 0; index < models.length; index++) {

        const m = models[index];
        const datas = m.modelData || [];
        menus[`blockMenu${m.id}`] = datas.map((data, i) => {
            return {
                text: data.value,
                value: data.value
            }
        })
    }
    return menus;
}

/**
 * 获取坐标菜单
 */
const getCoordinateMenu = () => {
    return {
        XY: [{
    text: formatMessage({
        id: 'mark.detection.property.x',
        default: 'X-center',
        description: ''
    }),
    value: '0',
},
{
    text: formatMessage({
        id: 'mark.detection.property.y',
        default: 'Y-center',
        description: ''
    }),
    value: '1',
},
{
    text: formatMessage({
        id: 'mark.detection.property.a',
        default: 'Area',
        description: ''
    }),
    value: '2',
},]
}
}


/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3ModelExtensionBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        this.modelsCtrl = runtime.modelsControl;
    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY() {
        return 'Scratch.modelExtension';
    }

    /**
     * objModelButton
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     */
    imgModelButton(args, util) {

    }

    /**
     * objModelButton
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     */
    objModelButton(args, util) {

    }
    /**
     * objModelButton
     * @param {object} args - the block arguments.
     * @param {object} util - utility object provided by the runtime.
     */
    deviceTrainButton(args, util) {

    }

    /**
     * handleDynamicBlockClick
     * @param {*} args 
     * @param {*} util 
     * @param {*} block 
     */
    handleDynamicBlockClick(args, util, block) {

    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {

        const buttons = [
            {
                opcode: 'imgModelButton',
                text: formatMessage({
                    id: 'modelExtension.imgModelButton',
                    default: 'Image Classification Model',
                    description: ''
                }),
                blockType: BlockType.BUTTON
            },
            {
                opcode: 'objModelButton',
                text: formatMessage({
                    id: 'modelExtension.objModelButton',
                    default: 'Object Detection Model',
                    description: ''
                }),
                blockType: BlockType.BUTTON
            },
            {
                opcode: 'deviceTrainButton',
                text: formatMessage({
                    id: 'modelExtension.deviceTrainButton',
                    default: 'On-device training',
                    description: ''
                }),
                blockType: BlockType.BUTTON
            },
        ]


        //图像数据模型
        const imageModels = this.modelsCtrl.imageModels;
        //物体模型数据
        const objectModels = this.modelsCtrl.objectModels;
        //训练模型数据
        const trainModels = this.modelsCtrl.trainModels;

        const imageModelsTemp = imageModels.map(i => Object.assign({}, i, { modelType: 'image' }));
        const objectModelsTemp = objectModels.map(i => Object.assign({}, i, { modelType: 'object' }));
        const trainModelsTemp = trainModels.map(i => Object.assign({}, i, { modelType: 'train' }));

        const models = [].concat(imageModelsTemp).concat(objectModelsTemp).concat(trainModelsTemp);

        const blocksTemp = getBlocks(models);

        const blocks = [].concat(buttons).concat(blocksTemp);

        //定义积木函数
        for (let index = 0; index < blocks.length; index++) {
            let b = blocks[index];
            this[`${b.opcode}`] = (args, util) => {
                this.handleDynamicBlockClick(args, util, b);
            }
        }
        //获取积木菜单
        const blocksMenu = getMenus(models);
        //获取坐标菜单
        const coordinateMenu = getCoordinateMenu();
        //获取所有的菜单
        const menus = Object.assign({}, blocksMenu, coordinateMenu);

        return {
            id: 'modelExtension',
            name: formatMessage({
                id: 'modelExtension.categoryName',
                default: 'Custom Models',
                description: ''
            }),
            menuIconURI: menuIconURI,
            blocks: blocks,
            menus: menus
            // blockIconURI: blockIconURI,
            // menus: {
            //     // categoryParam: this.getCategoryParam
            // }
        };
    }
}

module.exports = Scratch3ModelExtensionBlocks;
