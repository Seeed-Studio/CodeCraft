import {
    edgeimpulseGet,
    edgeimpulsePost,
    edgeimpulseUpload
} from '../fetch-utils';



const EdgeImpulse_Server = 'https://studio.edgeimpulse.com/v1';

const URL_EdgeImpulse_Upload = 'https://ingestion.edgeimpulse.com/api';

/*----------------------------定义接口方法-----------------------------*/

/**
 * 用户帐号密码登录
 * @param {*} {"userAccount":"xxxxxx", "userPwd": "434412342"}
 */
const edgeimpulseLogin = async (params) => {
    return edgeimpulsePost(`${EdgeImpulse_Server}/api-login`, params);
}

//免密注册登录
const edgeimpulseSeeedLogin = async (params) => {
    let header = {
        'x-api-key': 'ei_d7a4b6856de2fd4e4db914d344e537b'
    }
    return edgeimpulsePost(`${EdgeImpulse_Server}/api/third-party-auth/1/login`, params, header);
}

//查询当前用户
const edgeimpulseQueryUser = async () => {
    return edgeimpulseGet(`${EdgeImpulse_Server}/api/user`);
}
//查询当前项目
const edgeimpulseQueryProjects = async (params) => {
    return edgeimpulseGet(`${EdgeImpulse_Server}/api/projects`, params);
}
//查询上传用的hmackeys
const edgeimpulseGetHmackeys = async (projectID) => {
    return edgeimpulseGet(`${EdgeImpulse_Server}/api/${projectID}/hmackeys`);
}

const edgeimpulseTrainingData = async (params) => {
    return edgeimpulseUpload(`${URL_EdgeImpulse_Upload}/training/data`, params);
}

const edgeimpulseTestingData = async (params) => {
    return edgeimpulseUpload(`${URL_EdgeImpulse_Upload}/testing/data`, params);
}

export {
    edgeimpulseLogin,
    edgeimpulseSeeedLogin,
    edgeimpulseQueryUser,
    edgeimpulseQueryProjects,
    edgeimpulseTrainingData,
    edgeimpulseTestingData,
    edgeimpulseGetHmackeys
}