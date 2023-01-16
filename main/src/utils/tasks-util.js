import { exec } from 'child_process';
import os from 'os';

//定义当前服务端口号字符
const SOCKETSERVER_PORT = '62377';

/**
 * 解析查询出来的进程列表
 * @param {*} stdout 
 */
const parseWindowTaskString = (stdout = "") => {
    let str1 = stdout.split('\r\n');
    if (str1 && str1.length > 0) {
        str1 = str1.map(item => item.split(' ').filter(s => s != ''))
        str1 = str1.filter(item => item.length != 0);
        str1 = str1.map(item => item[4]);
        str1 = str1.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []).filter(s => s != '0');
    }
    return str1;
}

/**
 * 杀掉进程
 * @param {*} pid 
 * @param {*} callback 
 */
const killWindowTask = (pid, callback) => {
    exec(`taskkill /f /t /im ${pid}`, (error) => {
        callback(error)
    });
}

/**
 * 检测并杀掉进程
 * @param {*} serialPort 
 */
const checkAndKillWindowTask = (serialPort = '62377') => {
    return new Promise((resolve, reject) => {
        exec(`netstat -ano|findstr ${serialPort}`, (error, stdout) => {
            let taskData = parseWindowTaskString(stdout);
            if (taskData && taskData.length > 0) {
                killWindowTask(taskData[0], err => {
                    if (err) {
                        reject(err);
                    } else {
                        setTimeout(resolve, 200);
                    }
                });
            } else {
                resolve('no task')
            }
        })
    });
}

/**
 * 解析查询出来的进程列表
 * @param {*} stdout 
 */
const parseMacTaskString = (stdout = "") => {
    let str1 = stdout.split('\n');
    if (str1 && str1.length > 1) {
        str1.shift();
        str1 = str1.map(item => item.split(' ').filter(s => s != ''))
        str1 = str1.filter(item => item.length != 0);
        str1 = str1.map(item => item[1]);
        str1 = str1.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
    }else{
        str1 = [];
    }
    return str1;
}

/**
 * 杀掉进程
 * @param {*} pid 
 * @param {*} callback 
 */
const killMacTask = (pid, callback) => {
    exec(`kill -9 ${pid}`, (error) => {
        callback(error);
    });
}

/**
 * 检测并杀掉进程
 * @param {*} serialPort 
 */
const checkAndKillMacTask = (serialPort = '62377') => {
    return new Promise((resolve, reject) => {
        exec(`lsof -i tcp:${serialPort}`, (error, stdout) => {
            let taskData = parseMacTaskString(stdout);
            if (taskData && taskData.length > 0) {
                killMacTask(taskData[0], err => {
                    if (err) {
                        reject(err);
                    } else {
                        setTimeout(resolve, 200);
                    }
                });
            } else {
                resolve('no task')
            }
        })
    });
}


/**
 * 检测并杀掉任务
 */
const checkAndKillTask = () => {
    let osType = os.platform();
    if (osType == 'darwin') {
        return checkAndKillMacTask(SOCKETSERVER_PORT);
    } else {
        return checkAndKillWindowTask(SOCKETSERVER_PORT);
    }
}


export {
    checkAndKillTask
}