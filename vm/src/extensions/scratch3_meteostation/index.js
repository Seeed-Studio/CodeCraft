const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjQsMS45djFDOSwyLjksOS42LDMuMiwxMCwzLjZjMC40LDAuNSwwLjcsMS4xLDAuNywxLjhoMUMxMS43LDMuNCwxMC4yLDEuOSw4LjQsMS45eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC43LDZMOC43LDZMOC42LDYuM2MwLjksMS40LDEuMywyLjcsMC43LDMuMkM4LjYsMTAuMyw2LjcsOS4zLDUsNy40QzMuMyw1LjYsMi42LDMuNiwzLjMsMi45CgljMC42LTAuNiwyLDAsMy4zLDEuMmMwLjEsMC4xLDAuMiwwLjEsMC4zLDBMNy4xLDRsMC4yLTFjMC0wLjEsMC0wLjItMC4xLTAuMkM1LjQsMS41LDMuNCwxLDIuNCwyYy0xLjMsMS40LTIuMSw1LjUsMC40LDguMQoJYzAuNSwwLjUsMSwwLjksMS42LDEuMnYxLjRIMy4xYy0wLjMsMC0wLjYsMC4zLTAuNiwwLjZsMCwwYzAsMC4zLDAuMywwLjYsMC42LDAuNmg0LjdjMC4zLDAsMC42LTAuMywwLjYtMC42bDAsMAoJYzAtMC4zLTAuMy0wLjYtMC42LTAuNmwwLDBINS43di0xYzEuOSwwLjQsMy43LTAuNCw0LjYtMS4zYzEtMSwwLjYtMy0wLjUtNC44TDguNyw2eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNS41LDYuN0M1LjUsNi44LDUuNSw2LjgsNS41LDYuN2wwLjEsMC4yYzAuMiwwLjMsMC42LDAuNCwwLjgsMC4yYzAsMCwwLjEsMCwwLjEtMC4xbDEuNC0xLjIKCUM4LjEsNS42LDguMiw1LjMsOC4yLDVjMC4xLDAuMSwwLjIsMC4yLDAuNCwwLjJDOSw1LjMsOS4zLDUsOS40LDQuNmMwLTAuMy0wLjItMC42LTAuNi0wLjdDOC41LDMuOCw4LjEsNC4xLDgsNC41CglDOCw0LjcsOCw0LjgsOC4xLDVDNy45LDQuOSw3LjYsNC44LDcuMyw1TDUuNyw1LjhDNS40LDYsNS4zLDYuNCw1LjUsNi43eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC40LDB2MWMyLjIsMCw0LDEuOSw0LDQuM2gxQzEzLjQsMi40LDExLjIsMCw4LjQsMHoiLz4KPC9zdmc+Cg==';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0IDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzIwOTNCMjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjQsMS45djFDOSwyLjksOS42LDMuMiwxMCwzLjZjMC40LDAuNSwwLjcsMS4xLDAuNywxLjhoMUMxMS43LDMuNCwxMC4yLDEuOSw4LjQsMS45eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC43LDZMOC43LDZMOC42LDYuM2MwLjksMS40LDEuMywyLjcsMC43LDMuMkM4LjYsMTAuMyw2LjcsOS4zLDUsNy40QzMuMyw1LjYsMi42LDMuNiwzLjMsMi45CgljMC42LTAuNiwyLDAsMy4zLDEuMmMwLjEsMC4xLDAuMiwwLjEsMC4zLDBMNy4xLDRsMC4yLTFjMC0wLjEsMC0wLjItMC4xLTAuMkM1LjQsMS41LDMuNCwxLDIuNCwyYy0xLjMsMS40LTIuMSw1LjUsMC40LDguMQoJYzAuNSwwLjUsMSwwLjksMS42LDEuMnYxLjRIMy4xYy0wLjMsMC0wLjYsMC4zLTAuNiwwLjZsMCwwYzAsMC4zLDAuMywwLjYsMC42LDAuNmg0LjdjMC4zLDAsMC42LTAuMywwLjYtMC42bDAsMAoJYzAtMC4zLTAuMy0wLjYtMC42LTAuNmwwLDBINS43di0xYzEuOSwwLjQsMy43LTAuNCw0LjYtMS4zYzEtMSwwLjYtMy0wLjUtNC44TDguNyw2eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNS41LDYuN0M1LjUsNi44LDUuNSw2LjgsNS41LDYuN2wwLjEsMC4yYzAuMiwwLjMsMC42LDAuNCwwLjgsMC4yYzAsMCwwLjEsMCwwLjEtMC4xbDEuNC0xLjIKCUM4LjEsNS42LDguMiw1LjMsOC4yLDVjMC4xLDAuMSwwLjIsMC4yLDAuNCwwLjJDOSw1LjMsOS4zLDUsOS40LDQuNmMwLTAuMy0wLjItMC42LTAuNi0wLjdDOC41LDMuOCw4LjEsNC4xLDgsNC41CglDOCw0LjcsOCw0LjgsOC4xLDVDNy45LDQuOSw3LjYsNC44LDcuMyw1TDUuNyw1LjhDNS40LDYsNS4zLDYuNCw1LjUsNi43eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC40LDB2MWMyLjIsMCw0LDEuOSw0LDQuM2gxQzEzLjQsMi40LDExLjIsMCw4LjQsMHoiLz4KPC9zdmc+Cg==';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3MeteostationBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    showMeteostation(args) {
        // let blockOnclick = this.runtime.accelerometerMode.blockOnclick;
        // if(blockOnclick){
        //     blockOnclick();
        // }
        let temperature = args.TEMP;
        let humidity = args.HUM;
        let pressure = args.PRE;
        let meteostationCallback = this.runtime.meteostationMode.meteostationCallback;
        if(meteostationCallback){
            meteostationCallback(temperature,humidity,pressure);
        }
        return `${temperature},${humidity},${pressure}`;
    }

    meteostationOnclick() {
        console.log('meteostationOnclick')
    }

    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.meteostation';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'meteostation',
            name: formatMessage({
                id: 'meteostation.categoryName',
                default: 'Meteostation',
                description: '气象站'
            }),
            // extensions: ['colours_cognize'],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'meteostationOnclick',
                    text: formatMessage({
                        id: 'meteostation.openMeteostationModal',
                        default: 'Open meteostation window',
                        description: '打开气象站窗口'
                    }),
                    blockType: BlockType.BUTTON
                },
                {
                    opcode: 'showMeteostation',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'meteostation.showMeteostation',
                        default: 'Meteostation Temperature [TEMP] Humidity [HUM] Air Pressure [PRE]',
                        description: '气象站'
                    }),
                    arguments: {
                        TEMP: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        HUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        PRE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
            ],
        };
    }

    
}
module.exports = Scratch3MeteostationBlocks;
