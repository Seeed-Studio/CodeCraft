/**
 * 反编码microbit hex 
 * 查找字符所在hex的行
 * hex每行有效数据为16byte，字符串长度尽量 < 16
 */


const fs = require('fs');
fs.readFile('./microbit.hex', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    let text = decompile(data.toString());
    // 保存反编码文本
    fs.writeFile('./decompile.txt', text, () => { });
})


function decompile(hex) {
    let hexobj = hex.split('\n:');
    let decompileText = '';
    for (let i in hexobj) {
        if (hexobj[i].slice(6, 8) !== '00') continue;
        let data = hexobj[i].slice(8, -2);

        let mystr = '';
        while (data.length > 0) {
            let char = '0x' + data.slice(0, 2);
            mystr += String.fromCharCode(char)
            decompileText += String.fromCharCode(char)
            data = data.slice(2);
        }
        
        if (mystr.indexOf('zfqjzfqj') > -1) {
            console.log('查找到字符串：', mystr);
            console.log('字符串所在hex行为：', hexobj[i]);
        }
    }
    return decompileText;
}






