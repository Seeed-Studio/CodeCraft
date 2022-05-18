const Ability = require('../../ability.js');

const NODE_REFLECT_BLACK = 64; // 反射光强度为黑
const NODE_REFLECT_WHITE = 180;// 反射光强度为白
class Linepatrol extends Ability {

    constructor() {
        super();
    }


    detectLinerColor(args) {
        this.execPyApi(`elfbot.liner_read()\r\n`)
        let leftColor = this.getRawData('leftcval');
        let rightColor = this.getRawData('rightcval');
        return args.COLOR == leftColor || args.COLOR == rightColor;
    }

    get_liner() {
        return this.getRawData('linerval');
    }
    get_right2_liner() {
        if (this.getRawData('refr2val') < NODE_REFLECT_BLACK)
            return 1;
        else if (this.getRawData('refr2val') > NODE_REFLECT_WHITE)
            return 3;
        else
            return 2;
    }
    get_left2_liner() {
        if (this.getRawData('refl2val') < NODE_REFLECT_BLACK)
            return 1;
        else if (this.getRawData('refl2val') > NODE_REFLECT_WHITE)
            return 3;
        else
            return 2;
    }
    isLineLocation(args) {
        this.execPyApi(`elfbot.liner_read()\r\n`)
        let opt = args.OPT;
        let liner = args.LINER;
        let value = 0;
        switch (opt) {
            case 'middle': value = 1; break;
            case 'right': value = 5; break;
            case 'right-most': value = 6; break;
            case 'left': value = 3; break;
            case 'left-most': value = 4; break;
            case 'lost': value = 2; break;
        }
        if (this.get_left2_liner() != liner && this.get_right2_liner() != liner && this.get_liner() == 1) {
            return value == 4;
        }
        else if (this.get_left2_liner() != liner && this.get_right2_liner() != liner && this.get_liner() == 2) {
            return value == 6;
        }
        else if (this.get_left2_liner() != liner && this.get_right2_liner() != liner && this.get_liner() == 0) {
            return value == 2;
        }
        else if (this.get_left2_liner() == liner && this.get_right2_liner() == liner) {
            return value == 1;
        }
        else if (this.get_left2_liner() == liner && this.get_right2_liner() != liner) {
            return value == 3;
        }

        else if (this.get_left2_liner() != liner && this.get_right2_liner() == liner) {
            return value == 5;
        }

        return false;
    }

    lastLinerLocation(args) {
        return this.lastLocation == args.OPT;
    }

    getValue() {
        this.execPyApi(`elfbot.liner_read()\r\n`)
    }
}

module.exports = Linepatrol;