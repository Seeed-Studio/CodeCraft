const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+Cjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNi41LDE0IDAuOCwxMC45IDAuOCw0LjQgNi41LDcuNSAiLz4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI3LjUsMTQgMTMuMiwxMC45IDEzLjIsNC40IDcuNSw3LjUgIi8+Cjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTMuMiwzLjIgMTMuMiwzLjIgMTMuMiwzLjIgNywwIDAuOCwzLjIgMC44LDMuMiAwLjgsMy4yIDAuOCwzLjIgMC44LDMuMiA3LDYuNSAxMy4yLDMuMiAxMy4yLDMuMiAiLz4KPC9zdmc+Cg==';

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
class Scratch3ThreeAxisAccelerometerBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    showThreeAxisAccelerometer(args) {
        // let blockOnclick = this.runtime.accelerometerMode.blockOnclick;
        // if(blockOnclick){
        //     blockOnclick();
        // }
        let x = args.X;
        let y = args.Y;
        let z = args.Z;
        let accelerometerCallback = this.runtime.accelerometerMode.accelerometerCallback;
        if(accelerometerCallback){
            accelerometerCallback(x,y,z);
        }
        return `${x},${y},${z}`;
    }

    accelerometerOnclick() {
        console.log('accelerometerOnclick')
    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.threeAxisAccelerometer';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'threeAxisAccelerometer',
            name: formatMessage({
                id: 'threeAxisAccelerometer.categoryName',
                default: '3-axis Accelorometer Visualization',
                description: '三轴加速度计可视化'
            }),
            // extensions: ['colours_cognize'],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'accelerometerOnclick',
                    text: formatMessage({
                        id: 'threeAxisAccelerometer.openAxisModal',
                        default: 'Open 3-Axis Accelerometer Window',
                        description: '打开三轴显示窗口'
                    }),
                    blockType: BlockType.BUTTON
                },
                {
                    opcode: 'showThreeAxisAccelerometer',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'threeAxisAccelerometer.showThreeAxisAccelerometer',
                        default: 'Accelerometer axis X [X] Y [Y] Z [Z]',
                        description: '显示三轴加速感应'
                    }),
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
            ],
        };
    }

    
}
module.exports = Scratch3ThreeAxisAccelerometerBlocks;
