const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTMgMTMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEzIDEzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LjcsNy45YzAsMC0xLjEsMy43LTMuOSwyLjFjMCwwLTAuOS0wLjQtMS4zLTEuOGwxLjctMS4zTDEsNnY1LjFsMS41LTEuM2MxLDEuMywyLjYsMi4xLDQuMywyCglDOS43LDExLjcsOS45LDkuMSw5LjcsNy45eiBNMy4xLDUuMWMwLDAsMS4xLTMuOCw0LTIuMWMwLDAsMC45LDAuNCwxLjMsMS44TDYuNiw2LjFMMTIsN1YxLjhsLTEuNiwxLjRDOS40LDEuOCw3LjcsMS4xLDYsMS4xCglDMy4xLDEuMSwyLjgsMy44LDMuMSw1LjF6Ii8+Cjwvc3ZnPgo=';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAD50lEQVRIS71WbUxTZxR+TluJUDpvy0ZkMCXGkNLqYJDIYEVWxtoq7svNmAX3b5skzmXxh8k+NJnM/ViWbVlYnLp/m9myOeM+QHrHgEkVMSkh0RbiRsKcCHEpvQ6KDst9l/viLb39wijZ++++5z3nueec533OS1hkWdtMJbTM8CyBuRiDLegKFyguNtE8ToQgA4nsVvTkcOPUpUyhKJ3R2i7U6fRyC6CrjT8TcIX5p100J7jKvfKcbt/wZum3VDGTgIq7i5cvv3X9Ex1jrwJIsqcH4uGZTHTk5rIVb4w6R2/GA2oC2TuKLIymfgaoOl2miwDddmN9xExbAp4rk2qcGFDlTw/m3MiKdAFUlQhSY6mHp+A5bDA78FBOMTf/NTOK82EfvBMncSb0a4r/Yv3Zs8Z6/1NXZxRjDKhUFI4Sw8vxHmuNVuy3fYRKc9oE+XF/uA8HgnvwR2RYA8gIXwy5pFdiQPONR3c88KOWOnxa/hWMhlxIs2F8eflz9Pzdge+r53v9fF8dHn/Ag5dWNUPIMiMSncbrgztwblLDBSbPwakQhGdkE4VeMDjU31EyOVblRa7hPnRda8dbF3dhKipxc2KPTAYBB9e14on8RkxH/0FTv1ubGcEXdEm1VNIhlBkIgwtNI3y9oRPrhQp0XzuF3YNNYGCxkqQiA4F49vX5m3FBGsCL5xs0PlGGcrKJwrtg2K9GcuQ14HDld7xcbt8jmI5e19Q9HetyDSvQ4RiAOcuCnf5t8IU6F/wIB8jmFboAONXdFnsrthY24dDIh2gdOZjEpkz0bl6zF7vXvokTY8ewL/BazJcR66FSr3CVAC4ryvI6BlGUsxrb+pwITsUqmrF0qtFqepiT5crMn3D7yheAgHFijC00IMVtWKqt/w8osXTtj/mx2rjmrkpXairD8eoejN24DFdvmbZ0iWT4YP1RNBa8cE9kaBs/jr0XuCDwxcmQSO+N97txqOIbhGcn4fFV3BW9m/3b0RsS44DQkvHCKqqgyMqSXNillqAd/R78HhmKv6zzEqTs3KmoKpJ0ouY0D7L17EY48zctKqo6GfUXN0k9sTFh95oPM/CpGluKuL5n/4zrXqal6Ns7gV1JY4JARwLu8E7Fd9HBpwimI+9JuFY+jSpLLQqzV3HM0cgIBqRzECd+hC/0i6aPt7mWevDxEnYW5unmpttSTVk1ozsc5f2yPrdxuGEspPolPT6qvy3KDguRj+/lcWL8N3uPOsLTAsUEsl2o0+vxPgNq4vuTLiMCzpKMt5XGp+pn2nederjEm2fVk/wMMeYGWGnAJa1UbHZRmABoiBF555juh0vukPbBkID2H2SF4lgDy0b/AAAAAElFTkSuQmCC';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3EdgeimpulseBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    createEdgeimpulse(){

    }
    
    startReadData(){
        console.log('startReadData')
    }
    stopReadData(){
        console.log('stopReadData')
    }
    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.edgeimpulse';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'edgeimpulse',
            name: formatMessage({
                id: 'edgeimpulse.categoryName',
                default: '边缘学习',
                description: '边缘学习'
            }),
            // extensions: ['colours_cognize'],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'createEdgeimpulse',
                    text: '创建模型',
                    blockType: BlockType.BUTTON
                },
                {
                    opcode: 'startReadData',
                    text: '开始读取传感器[SENSOR]的数据 频率为[FREQUENCY]',
                    arguments: {
                        SENSOR: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        FREQUENCY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 25
                        },
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'stopReadData',
                    blockType: BlockType.COMMAND,
                    text: '停止读取数据',
                },
                
            ],
        };
    }

    
}
module.exports = Scratch3EdgeimpulseBlocks;
