const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

class LedMatrix extends Ability {
    constructor() {
        super();
        this.instruct = instructs.grovezero.ledMatrix;
        this.shapeData = [0x0, 0x0, 0x0, 0x0, 0x0];
    }

    clean() {
        this.shapeData = [0x0, 0x0, 0x0, 0x0, 0x0];
        this.exec(0x06);
    }

    xyIsOn(args) {
        let x = args.X;
        let y = args.Y;
        let row = this.shapeData[x];
        let point = (row >> y) & 0b00000001;
        return point === 1;
    }

    xySetOn(args) {
        let x = args.X;
        let y = args.Y;
        if (x < 0 || y < 0 || x > 4 || y > 5) {
            return;
        }
        let point = 0x01 << y;
        this.shapeData[x] = point | this.shapeData[x];
        let time = 0;
        time = this._numberoperate(time);
        let params = time.concat(this.shapeData);
        this.exec(0x05, params);
    }

    xySetOff(args) {
        let x = args.X;
        let y = args.Y;
        if (x < 0 || y < 0 || x > 4 || y > 5) {
            return;
        }
        let point = 0b11111110;
        while (y > 0) {
            y--;
            point = (point << 1) + 1;
        }
        this.shapeData[x] = point & this.shapeData[x];
        let time = 0;
        time = this._numberoperate(time);
        let params = time.concat(this.shapeData);
        this.exec(0x05, params);
    }

    showShape(args) {
        let shape = args.SHAPE;
        let time = 0;
        time = this._numberoperate(time);
        let shapeData = [];
        for (let i = 0; i < 5; i++) {
            let value = shape.slice(i * 6, i * 6 + 6);
            let rollback = '';
            for (let j = 0; j < 6; j++) {
                rollback += value[5 - j];
            }
            shapeData[i] = parseInt(rollback, 2);
        }
        this.shapeData = shapeData;
        let params = time.concat(shapeData);
        this.exec(0x05, params);
    }

    showString(args) {
        let str = args.STRING;
        this.shapeData = [0x0, 0x0, 0x0, 0x0, 0x0];
        if (typeof str === 'number') {
            str = str + "";
        }
        if (str.length > 32) {
            str = str.slice(0, 32);
        }
        let strLen = str.length;
        let time = strLen === 1 ? 0 : strLen * 1000;
        time = this._numberoperate(time);

        let repeat = strLen === 1 ? 0x00 : 0x01;
        let orientation = 0x00;

        let params = [repeat, time[0], time[1], orientation, strLen];

        let strArrar = [];
        str.split('').forEach((value, index) => {
            strArrar.push(value.charCodeAt());
        });

        let replenishStrArr = [];
        if (strArrar.length > 7) {
            replenishStrArr = strArrar.slice(7, strArrar.length);
            strArrar = strArrar.slice(0, 7);
        }

        params = params.concat(strArrar);
        this.exec(0x04, params);

        // 分包
        if (replenishStrArr.length > 0) {
            this.execReplenishPackage(0x07, replenishStrArr);
        }

    }




}

module.exports = LedMatrix;