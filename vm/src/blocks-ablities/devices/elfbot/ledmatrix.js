const Ability = require('../../ability.js');
const instructs = require('../../ability-instructs.js');

/**
 * 字符串颠倒顺寻重组
 * @param {*} value 
 */
const reverse = (value) => {
    return value.split('').reverse();
}

/**
 * 字符串转er维matrix数组
 * @param {*} value 
 */
const toMatrix = (value) => {
    // 生命二维数组
    let arr = new Array(16);
    for (let index = 0; index < 16; index++) {
        arr[index] = new Array(8)
    }
    let strArr = value.split('');
    for (let i = 0; i < strArr.length; i++) {
        const element = strArr[i];
        let x = i % 16;
        let y = parseInt(i / 16);
        arr[x][y] = element;
    }
    return arr;
}

// const toPicData = (value) => {
//     let data = '';
//     for (let i = 0; i < 8; i++) {
//         data += `'${value.slice(i * 8, (i + 1) * 8)}'`;;

//     }

// }
/**
 * matrix数组转数组字符串
 * @param {*} matrix 
 */
const toMatrixArray = (matrix) => {
    let arr = new Array(16);
    for (let i = 0; i < 16; i++) {
        let temp = '';
        for (let j = 0; j < 8; j++) {
            let element = matrix[i][j];
            temp += element;
        }
        arr[i] = parseInt(reverse(temp).join(''), 2);
    }
    return arr;
}


class LedMatrix extends Ability {

    constructor() {
        super();

        this.instruct = instructs.elfbot.ledmatrix;

        /**
         * led矩阵
         */
        this.matrix = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }

    /**
     * 显示一幅图案直到结束
     * @param {*} matrixValue 
     * @param {*} duration 
     */
    showImageForDuration(matrixValue, duration) {
        this.showImage(matrixValue, duration);
        return new Promise(resolve => {
            setTimeout(() => {
                this.execPyApi(`elfbot.display_off()\r\n`)
                resolve()
            }, duration * 1000);
        });
    }

    /**
     * 显示一幅图案
     * @param {*} matrixValue 
     * @param {*} duration 
     */
    showImage(matrixValue, duration) {
        let matrix = toMatrix(matrixValue);
        this.execPyApi(`elfbot.display_cus('${matrixValue}', 655)\r\n`)
        this.matrix = matrix;
    }

    /**
     * 显示字符串直到结束
     * @param {*} value 
     */
    showTextUntilDone(value) {
        this.showText(0, value);
        return new Promise(resolve => {
            setTimeout(() => resolve(), value.length * 600);
        });
    }

    /**
     * 显示字符串
     * 最多可显示20个字符 (非字符串默认强转为字符串)
     * @param {*} text 
     */
    showText(repeat, str) {
        this.execPyApi(`elfbot.display_string('${str}',${repeat})\r\n`);
    }

    /**
     * 显示数字
     * @param {*} number 
     * @param {*} duration 
     */
    showNumber(number, duration) {
    }

    /**
     * 显示动画
     * @param {*} interval  间隔时间
     * @param {*} repeat 是否重复
     * @param {*} count 图案数目
     * @param {*} index 图案序号
     */
    showAnima(interval = 0, emoticon) {
        emoticon = emoticon.toString(16);
        emoticon = '00'.slice(0, 2 - emoticon.length) + emoticon;
        this.execPyApi(`elfbot.display_emoji(b"\\x${emoticon}",${interval})\r\n`);
        return new Promise(resolve => {
            setTimeout(resolve, interval * 1000);
        })
    }

    /**
     * 设置点
     * @param {*} x 
     * @param {*} y 
     * @param {*} onoff 
     * @param {*} duration 
     */
    setPosition(x, y, onoff, duration) {
        if (onoff === 1) {
            this.execPyApi(`elfbot.pixel_on(${x},${y})\r\n`);
        } else {
            this.execPyApi(`elfbot.pixel_off(${x},${y})\r\n`);
        }
        this.matrix[x][y] = onoff;
    }

    /**
     * 设置点 自动改变状态
     * @param {*} x 
     * @param {*} y 
     * @param {*} duration 
     */
    setPositionAutoChange(x, y, duration) {
        this.setPosition(x, y, this.matrix[x][y] === 0 ? 1 : 0, duration)
    }

    /**
     * 点 状态
     * @param {*} x 
     * @param {*} y 
     */
    positionState(x, y) {
        this.execPyApi(`elfbot.is_pixel_on(0,0)\r\n`)
        return this.matrix[x][y] === 1;
    }

    /**
     * 设置亮度调整值
     * @param {*} brightness 
     */
    setLedBrightness(brightness) {
    }

    /**
     * 关闭屏幕
     */
    close() {
        this.execPyApi(`elfbot.display_off()\r\n`)
    }

}

module.exports = LedMatrix;