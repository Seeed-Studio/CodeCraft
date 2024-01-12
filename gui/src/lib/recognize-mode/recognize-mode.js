class RecognizeMode {
    constructor () {
        this.age = 0;//年龄
        this.expression = 'neutral';//表情对象 angry，disgusted，fearful，happy，neutral，sad，surprised
        this.parts = null;//脸部特征 mouth，nose，leftEye，rightEye，rightEyeBrow，leftEyeBrow
        this.word = 'unknown word';//预测结果的取值有：'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'up', 'down', 'left', 'right', 'go', 'stop', 'yes', 'no'，
                                   //只能对上述简单的英文单词进行识别。对于无法识别的语音，可能返回  'background_noise' ,'unknown'
        this.blockOnclick;                           
    }

    setAge (age) {
        this.age = age;
    }

    setExpression (expression) {
        this.expression = expression;
    }

    setParts (parts) {
        this.parts = parts;
    }

    setWord (word) {
        this.word = word;
    }
    
}

export default RecognizeMode;
