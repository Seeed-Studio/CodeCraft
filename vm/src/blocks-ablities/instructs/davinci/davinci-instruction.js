/**
 * Davinci AI
 * Davinci AI 旧版本指令构建
 */
class DavinciInstruction {

    constructor() {

    }

    /**
     * 构建指令
     * @param {*} command 
     * @param {*} parameters 
     */
    createInstruction(command, parameters = []) {
        let _length = 6 + parameters.length;
        let _bit01 = command & 0xff00 >> 8;
        let _bit02 = command & 0x00ff;
        let _data = [_length, 0xC3, 0xFF, 0xFF, _bit01, _bit02].concat(parameters);
        return _data;
    }

}

module.exports = DavinciInstruction;
