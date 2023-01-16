const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyAKIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgIGZpbGw9InJnYigyNTMsIDEyNSwgMTEyKSIKIGQ9Ik0wLjAwMCwwLjAwMCBMNDAuMDAwLDAuMDAwIEw0MC4wMDAsNDAuMDAwIEwwLjAwMCw0MC4wMDAgTDAuMDAwLDAuMDAwIFoiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiAgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIgogZD0iTTIwLjAwMCwzMy4wMDAgQzEyLjgyMCwzMy4wMDAgNy4wMDAsMjcuMTgwIDcuMDAwLDIwLjAwMCBDNy4wMDAsMTIuODIwIDEyLjgyMCw3LjAwMCAyMC4wMDAsNy4wMDAgQzI3LjE4MCw3LjAwMCAzMy4wMDAsMTIuODIwIDMzLjAwMCwyMC4wMDAgQzMzLjAwMCwyNy4xODAgMjcuMTgwLDMzLjAwMCAyMC4wMDAsMzMuMDAwIFpNMjcuMDAwLDE5LjAwMCBMMjEuMDAwLDE5LjAwMCBMMjEuMDAwLDEzLjAwMCBDMjEuMDAwLDEyLjQ0OCAyMC41NTIsMTIuMDAwIDIwLjAwMCwxMi4wMDAgQzE5LjQ0OCwxMi4wMDAgMTkuMDAwLDEyLjQ0OCAxOS4wMDAsMTMuMDAwIEwxOS4wMDAsMTkuMDAwIEwxMy4wMDAsMTkuMDAwIEMxMi40NDgsMTkuMDAwIDEyLjAwMCwxOS40NDggMTIuMDAwLDIwLjAwMCBDMTIuMDAwLDIwLjU1MiAxMi40NDgsMjEuMDAwIDEzLjAwMCwyMS4wMDAgTDE5LjAwMCwyMS4wMDAgTDE5LjAwMCwyNy4wMDAgQzE5LjAwMCwyNy41NTIgMTkuNDQ4LDI4LjAwMCAyMC4wMDAsMjguMDAwIEMyMC41NTIsMjguMDAwIDIxLjAwMCwyNy41NTIgMjEuMDAwLDI3LjAwMCBMMjEuMDAwLDIxLjAwMCBMMjcuMDAwLDIxLjAwMCBDMjcuNTUyLDIxLjAwMCAyOC4wMDAsMjAuNTUyIDI4LjAwMCwyMC4wMDAgQzI4LjAwMCwxOS40NDggMjcuNTUyLDE5LjAwMCAyNy4wMDAsMTkuMDAwIFoiLz4KPC9zdmc+';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAB7UlEQVRIS72Wu08UURSHv3MNZKGUyppIgAY7opEQKLDABBo69pHAzhY2amGjksASEm2gIZFZSJblH8BECy0UA8HQWanxVWqlnQYhzCF3ltngsssOsju3nPP4zsz5zT1HqHESae1QYVRgCOgG2o5CfgLvFV6Ksl7IyafTUkk1Yzyt/caQVaWvVjHWLsKm5/FwLSdvKvmfAKVSGvOaWQAcGx8GcsxHAdfscTufl93jsf8kmpjQi/sXeAZcPSOg3P1t0wE3V1bkV2AogRxHW3fhFdB7TkgQvhODQdeVP/6nDZ4mHM0Bk3WCBGmWC66kSyDbeBFeh+nJg3vFHLOPQ5WkqgxYgfhvlHB0E7geJnR1qeiVzITx9n22Cq70yXhGe4zyLmzYf4DwhCuSzOi0KlONBIkwIwlHrdIGGglSZcOCvgOXGgkCfljQX6C5HGTVdbk9LL7o9/lrVTXu1RX05RtkH1UszgdF9umiEUMU8gay0f2wkV1BFnTWS1WkqrrKJafGMJh/IhulMRF3dEmKU7VuR8Fdc8W/fqMffH6vbmkb+zyvw5TdoYnhwqLYTck/J5aPsTva0vKb+fMsJzG4G4zwqqDAcCSQOeBayKZtG8N92/hK/jXXqZSjnZ4wgnID6CpbID8gvDDK07wrH08r6BC00cVSGzKiJAAAAABJRU5ErkJggg==';

/**
 * Class for the translate block in Scratch 3.0.
 * @constructor
 */
class Scratch3CreateSkillBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    createSkillOnclick() {
        console.log('createSkillOnclick')
    }
    showCreateSkillValue(args){
        console.log('args',args)
    }
    /**
     * The key to load & store a target's translate state.
     * @return {string} The key.
     */
    static get STATE_KEY () {
        return 'Scratch.createSkill';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        let isCreateSkill = this.runtime.modelsControl.createSkillModels.isCreateSkill
        let createSkillInfo = this.runtime.modelsControl.createSkillModels;
        let blocks = [{
            opcode: 'createSkillOnclick',
            text: formatMessage({
                id: 'createSkill.categoryName',
                default: 'Create Skill',
                description: '创建技能'
            }),
            blockType: BlockType.BUTTON
        }]
        if (isCreateSkill) {
            let createSkillBlock = [{
                opcode: 'showCreateSkillValue',
                blockType: BlockType.COMMAND,
                text: formatMessage({
                    id: 'createSkill.showCreateSkillName',
                    default: 'Skill',
                    description: '技能'
                })+`  ${createSkillInfo.createSkillName} `
            }]
            blocks = blocks.concat(createSkillBlock);
        }

        return {
            id: 'createSkill',
            name: formatMessage({
                id: 'createSkill.categoryName',
                default: 'Create Skill',
                description: '创建技能'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: blocks,
        };
    }

}
module.exports = Scratch3CreateSkillBlocks;
