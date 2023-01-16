/**
 * 延时等待
 * @param {*} mills 
 */
const sleep = (mills) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, mills);
    })
}

export {
    sleep
}