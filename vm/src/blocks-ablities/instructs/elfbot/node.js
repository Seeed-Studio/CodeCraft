/**
 * NodeInstruction
 * elfbot 指令基类
 */
class NodeInstruction {

    constructor() {
        this.len = null;
        this.type = 0xc3;
        this.cmd = 0x40;
        this.opt = 0X00;

        this.length = 0x00;
        this.instruction = null;
        this.address = null;
        this.option = 0X00;

        this._params = [];
    }

    /**
     * 设置 option
     * @param {*} option 
     */
    setOption(option){
        this.option = option;
    }

    /**
     * 设置地址
     * @param {*} address 
     */
    setAddress(address){
        this.address = address;
    }

    /**
     * 构建指令
     * @param {*} instruction 
     * @param {*} parameters 
     */
    createInstruction(instruction, parameters = []) {
        this.instruction = instruction;
        this._params = parameters;
        this.length = 4 + this._params.length;
        this.len = this._params.length + 8;
        return this._toArray();
    }

    /**
     * ledmatrix 拼包
     * @param {*} index 
     * @param {*} params 
     */
    spellInstruction(instruction, pos, parameters = []) {
        this.instruction = instruction;
        this._params = parameters;
        this.length = 4 + this._params.length;
        this.len = this._params.length + 8;
        return [this.len, this.type, this.cmd, this.opt, this.length, this.instruction, this.address, pos].concat(this._params);
    }

    /**
     * 转化数组对象
     */
    _toArray() {
        return [this.len, this.type, this.cmd, this.opt, this.length, this.instruction, this.address, this.option].concat(this._params);
    }

}

module.exports = NodeInstruction;

