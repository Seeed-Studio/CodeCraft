const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class Mainboard extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.mainboard;
        this.i2cList = [0x20];
    }

    onResponse(message) {
        let belongThisMsgType = this.getBelongThisMsgType(message);
        switch (belongThisMsgType) {
            case Ability.BELONG_THIS_MSG_TYPE_NOT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_EVENT:
                break;
            case Ability.BELONG_THIS_MSG_TYPE_RAWDATA:
                this.postIOData('mainboard', this.eventParser(message));
                break;
        }
    }

    eventParser(message) {
        let param = '';
        for (let index = 8; index < message.length; index++) {
            let num = message[index];
            //如果是0，则代表没有内容。结束字符串拼接
            if (num==0) {
                break;
            }
            param += String.fromCharCode(num)
        }
        return { TEXT: param };
    }

    broadcast(args) {
        let message = args.BROADCAST_OPTION;
        let charList = [];
        if (message.length>8) {
            message=message.substr(0,8);
        }
        //广播最多只能8位字符
        for (let index = 0; index < 8; index++) {
            if (message.length>index) {
                let char = message.charAt(index);
                charList.push(char.charCodeAt())
            }else {
                charList.push(0x00)
            }
        }
        //还需要补4位0
        charList = charList.concat([0x00,0x00,0x00,0x00])
        this.execPyApi([0x14, 0xA5, 0x21, 0x00, 0x0C, 0xD0, 0x20, 0x00].concat(charList));
    }

    stopBroadcast() {
        this.execPyApi([0x04, 0xA5, 0x20, 0xFF]);
    }

    setBroadcastChannel(args) {
        let channel = parseInt(args.VALUE)-1;
        this.execPyApi([0x04, 0xA5, 0x20, channel]);
    }
    
}

module.exports = Mainboard;