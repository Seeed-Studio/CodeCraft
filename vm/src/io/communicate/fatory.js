let deviceType;
let timer;
const getDeviceType = (socketIo, comName) => {
    return new Promise((resolve, reject) => {
        // 超时返回未知设备
        timer = setTimeout(() => {
            deviceType = 'device';
            socketIo.disconnect();
            console.log('setTimeout');
        }, 1000);
        const handleMessage = async (msg) => {
            const { method, data } = msg;
            let resMsg = '';
            // 连接后发送\r\n
            if (method === 'device-connect') {
                if (data) {
                    socketIo.sendMessage({
                        method: 'write',
                        data: Buffer.from([0x03]) // 0x03 中断micropython线程
                    });
                    // socketIo.sendMessage({
                    //     method: 'write',
                    //     data: '\r\n'
                    // });
                }
            }
            // 断开后返回识别的设备类型
            if (method === 'device-disconnect') {
                socketIo.removeListener('message', handleMessage);
                resolve(deviceType);
            }
            if (method === 'report-resp') {
                let res = JSON.parse(data);
                let result = Buffer.from(res.data).toString('utf-8');
                console.log(result);
                resMsg += result;
                // 若设备回复 >>> 则认为是 micropython 设备
                if (resMsg.indexOf('>>>') > -1) {
                    clearTimeout(timer);
                    deviceType = 'micropython';
                    socketIo.disconnect();
                }
            }
        }

        socketIo.on('message', handleMessage);
        socketIo.sendMessage({
            method: 'connect',
            data: {
                comName,
                setOptions: {
                    brk: false,
                    cts: false,
                    dsr: false,
                    dtr: false,
                    rts: false
                }
            }
        });
    })
}

const specialConfig = {
    rtscts: true,
    xoff: true,
    xon: true
}

const getSpecialDeviceType = (socketIo, comName) => {

    return new Promise((resolve, reject) => {
        // 超时返回未知设备
        timer = setTimeout(() => {
            deviceType = 'device';
            socketIo.disconnect();
            console.log('setTimeout');
        }, 1000);

        const handleMessage = async (msg) => {
            const { method, data } = msg;
            let resMsg = '';

            // 连接后发送\r\n
            if (method === 'device-connect') {
                if (data) {
                    socketIo.sendMessage({
                        method: 'write',
                        data: Buffer.from([0x03]) // 0x03 中断micropython线程
                    });
                    socketIo.sendMessage({
                        method: 'write',
                        data: '\r\n'
                    });
                }
            }

            // 断开后返回识别的设备类型
            if (method === 'device-disconnect') {
                socketIo.removeListener('message', handleMessage);
                resolve(deviceType);
            }

            // 
            if (method === 'report-resp') {
                let res = JSON.parse(data);
                let result = Buffer.from(res.data).toString('utf-8');
                console.log(result);
                resMsg += result;
                // 若设备回复 >>> 则认为是 micropython 设备
                if (resMsg.indexOf('>>>') > -1) {
                    clearTimeout(timer);
                    deviceType = 'micropython';
                    socketIo.disconnect();
                }
            }

        }

        socketIo.on('message', handleMessage);

        socketIo.sendMessage({
            method: 'connect',
            data: {
                comName,
                connectionConfig: specialConfig
            }
        });
    })
}

/**
 * 获取特殊设备名称
 * @param {*} socketIo 
 * @param {*} comName 
 */
const getSpecialDevicecomName = (socketIo, comName) => {
    let dName = "unknow";
    return new Promise((resolve) => {
        // 超时返回未知设备
        timer = setTimeout(() => {
            socketIo.disconnect();
            resolve(dName);
        }, 1000);
        const handleMessage = async (msg) => {
            const { method, data } = msg;
            let resMsg = '';
            if (method === 'device-connect') {
                if (data) {
                    socketIo.sendMessage({
                        method: 'write',
                        data: 'from chproduct import *\r\n'
                    });
                    socketIo.sendMessage({
                        method: 'write',
                        data: 'product_name()\r\n'
                    });
                }
            }
            if (method === 'device-disconnect') {
                socketIo.removeListener('message', handleMessage);
                resolve(dName);
            }
            if (method === 'report-resp') {
                let res = JSON.parse(data);
                let result = Buffer.from(res.data).toString('utf-8');
                resMsg += result;
                if (resMsg.indexOf('mpython-grove') != -1) {
                    dName = 'mpython-grove';
                    clearTimeout(timer);
                    socketIo.disconnect();
                } else if (resMsg.indexOf('elfbot') != -1) {
                    dName = 'elfbot';
                    clearTimeout(timer);
                    socketIo.disconnect();
                } else if (resMsg.indexOf('cyberEye') != -1) {
                    dName = 'cyberEye';
                    clearTimeout(timer);
                    socketIo.disconnect();
                }
            }
        }
        socketIo.on('message', handleMessage);
        socketIo.sendMessage({
            method: 'connect',
            data: { 
                comName,
                setOptions: {
                    brk: false,
                    cts: false,
                    dsr: false,
                    dtr: false,
                    rts: false
                }
             }
        });
    })
}


module.exports = {
    getDeviceType,
    getSpecialDeviceType,
    getSpecialDevicecomName,
}