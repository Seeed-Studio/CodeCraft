import env from '../../../../env.js'
import {
    get,
    post
} from '../fetch-utils';
import { getPackageConfig } from '../package-config.js';

let USER_SERVER_HOST = '',          // 用户相关
    MATERIAL_SERVER_HOST = '',      // 素材相关
    COS_SERVER_HOST = '',           // COS
    TEST_COS_SERVER_HOST = '',      //cos测试服务器
    SKU_SERVER_HOST = '',           // SKU课程相关
    FIRMWARE_SERVER_HOST = '';           //  firmware

let zwbcUrl = '';
let ccUrl = ''
switch (env) {
    case 'dev':
        USER_SERVER_HOST = 'http://39.108.225.35:3452';        // 用户相关
        MATERIAL_SERVER_HOST = 'http://39.108.225.35:9004';    // 素材相关
        COS_SERVER_HOST = 'http://39.108.225.35:3455';         // COS
        TEST_COS_SERVER_HOST = 'http://39.108.225.35';         //cos测试服务器
        SKU_SERVER_HOST = 'https://cc.dev.chmakered.com';
        FIRMWARE_SERVER_HOST = 'https://cctest2.chmakered.com';           //  firmware
        zwbcUrl = ['http://localhost:8601', 'http://localhost:8601'];
        ccUrl = 'http://localhost:8601';
        break;
    case 'test':
        USER_SERVER_HOST = 'https://cctest2.chmakered.com';
        MATERIAL_SERVER_HOST = 'https://cctest2.chmakered.com';
        COS_SERVER_HOST = 'https://cctest2.chmakered.com';
        TEST_COS_SERVER_HOST = 'https://cctest2.chmakered.com';
        SKU_SERVER_HOST = 'https://cctest2.chmakered.com';
        FIRMWARE_SERVER_HOST = 'https://cctest2.chmakered.com';   
        zwbcUrl = ['https://m2lctest.chmakered.com', 'https://zwbctest.chmakered.com'];
        ccUrl = 'https://cctest2.chmakered.com';
        break;
    case 'prod':
        USER_SERVER_HOST = 'https://ide.tinkergen.com';
        MATERIAL_SERVER_HOST = 'https://ide.tinkergen.com';
        COS_SERVER_HOST = 'https://ide.tinkergen.com';
        TEST_COS_SERVER_HOST = 'https://ide.tinkergen.com';
        SKU_SERVER_HOST = 'https://ide.tinkergen.com';
        FIRMWARE_SERVER_HOST = 'https://ide.tinkergen.com';   
        zwbcUrl = ['https://zwb.tinkergen.com', 'https://make2learn.tinkergen.com'];
        ccUrl = 'https://ide.tinkergen.com';
        break;
    default:
        break;
}

/*--------------------------定义接口url------------------------------ */
// 2.1.	申请注册短信验证码url
const URL_REGISTER_SMSCODE = `${USER_SERVER_HOST}/UserServiceGroup/User/ApplyRegisterSMSCode`;
// 2.2.	验证短信注册验证码
const URL_CHECK_REGISTER_SMSCODE = `${USER_SERVER_HOST}/UserServiceGroup/User/CheckRegisterSMSCode`;
// 2.3  完成注册
const URL_FINISH_REGISTER = `${USER_SERVER_HOST}/UserServiceGroup/User/FinishRegister`;
// 2.4  用户帐户密码登录
const URL_USER_LOGIN_WITH_PWD = `${USER_SERVER_HOST}/UserServiceGroup/User/UserLoginWithPwd`;
// 2.5  用户获取短信登录验证码
const URL_APPLY_LOGIN_SMSCODE = `${USER_SERVER_HOST}/UserServiceGroup/User/ApplyLoginSMSCode`;
// 2.6  用户短信验证码登录
const URL_USER_LOGIN_WITH_SMSCODE = `${USER_SERVER_HOST}/UserServiceGroup/User/UserLoginWithSMSCode`;
// 2.7  登录后查询个人资料
const URL_QUERY_USER_INFO = `${USER_SERVER_HOST}/UserServiceGroup/User/QueryUserBasicInfo`;
// 2.8  退出登录
const URL_LOGIN_OUT = `${USER_SERVER_HOST}/UserServiceGroup/User/UserLogout`;
// 2.9 申请找回密码所需要的短信验证码
const URL_FIND_PWD_SMSCODE = `${USER_SERVER_HOST}/UserServiceGroup/User/ApplyFindPwdSMSCode`;
// 2.10 验证找回密码所需要的短信验证码
const URL_CHECK_FIND_PWD_SMSCODE = `${USER_SERVER_HOST}/UserServiceGroup/User/CheckFindPwdSMSCode`;
// 2.11 完成找回密码
const URL_FINISH_FIND_PWD = `${USER_SERVER_HOST}/UserServiceGroup/User/FinishFindPwd`;
// 2.12 保存个人资料
const URL_SAVE_USER_INFO = `${USER_SERVER_HOST}/UserServiceGroup/User/SaveUserBasicInfo`;
// 2.13 申请修改密码所需验证码
const URL_APPLY_MODIFY_PWD_SMSCODE = `${USER_SERVER_HOST}/UserServiceGroup/User/ApplyModifyPwdSMSCode`;
// 2.14	验证修改密码所需的短信验证码
const URL_CHECK_MODIFY_PWD_SMSCODE = `${USER_SERVER_HOST}/UserServiceGroup/User/CheckModifyPwdSMSCode`;
// 2.15 完成修改密码
const URL_FINISH_MODIFY_PWD = `${USER_SERVER_HOST}/UserServiceGroup/User/FinishModifyPwd`;
// 2.16 提交C端用户意见反馈
const URL_COMMIT_SUGGESTION = `${USER_SERVER_HOST}/UserServiceGroup/User/CommitSuggestion`;
// 保存用户订阅邮件
const URL_SAVE_USERSUBSCRIPTION = `${USER_SERVER_HOST}/ZwbUserSku/User/SaveUserSubscription`;
// const URL_SAVE_USERSUBSCRIPTION = `http://39.108.225.35:1077/ZwbUserSku/User/SaveUserSubscription`;
// 使用用户邀请码
const URL_USE_INVITE_CODE = `${USER_SERVER_HOST}/UserServiceGroup/User/UseInviteCode`;
// 查询用户邀请码
const URL_QUERY_USER_INVITE_CODE = `${USER_SERVER_HOST}/UserServiceGroup/User/QueryUserInviteCode`;
// 搜索用户邀请的朋友列表
const URL_SEARCH_INVITED_USER_LIST = `${USER_SERVER_HOST}/UserServiceGroup/User/SearchInvitedUserList`;

// 2.17 搜索平台提供的素材分类列表
const URL_SEARCH_CCMATERIAL_CALSSLIST = `${MATERIAL_SERVER_HOST}/UserServiceGroup/material/QueryCCMaterialClassList`;
// 2.17 搜索平台提供的CC示例编程素材列表
const URL_SEARCH_CCSAMPLE_INFO_LIST = `${MATERIAL_SERVER_HOST}/UserServiceGroup/material/SearchCCSampleMaterialInfoList`;
// 2.18 搜索用户自己的CC编程素材列表
const URL_SEARCH_USERSAMPLE_INFO_LIST = `${MATERIAL_SERVER_HOST}/UserServiceGroup/material/SearchCCMaterialInfoList`;

// 2.19 COS临时安全证书和令牌
const URL_APPLY_XCOS_Token = `${COS_SERVER_HOST}/UserServiceGroup/CosVod/ApplyXCosSecurityToken`;
// 2.20 保存用户自己的CC编程素材详细信息
const URL_MATERIAL_INFO = `${MATERIAL_SERVER_HOST}/UserServiceGroup/material/SaveCCMaterialInfo`;
// 2.21 删除用户自己的CC编程素材
const URL_DELET_MATERIAL_INFO = `${MATERIAL_SERVER_HOST}/UserServiceGroup/material/DeleteCCMaterial`;

// 2.22 申请web前端视频防盗链访问签名
const URL_APPLY_VOD_SECURITY_SIGN = `${COS_SERVER_HOST}/UserServiceGroup/CosVod/ApplyVodSecuritySign`;
// const TEST_URL_APPLY_VOD_SECURITY_SIGN = `http://192.168.9.38:8003/VodGW/ApplyVodSecuritySign`;

// 2.23 查询最新版本
// const TEST_URL_QUERY_CCTOOL_PKG_VERSION = `${TEST_COS_SERVER_HOST}/test/vmgrNew/PltServiceGroup/forAdmin/QueryCCToolPkgVersion`;
// const TEST_URL_QUERY_CCTOOL_PKG_VERSION = `${TEST_COS_SERVER_HOST}/UserServiceGroup/cctool/QueryCCToolPkgVersion`;
// const TEST_URL_QUERY_CCTOOL_PKG_VERSION = `${TEST_COS_SERVER_HOST}/PltServiceGroup/forAdmin/cctool/QueryCCToolPkgVersion`;
const TEST_URL_QUERY_CCTOOL_PKG_VERSION = `${TEST_COS_SERVER_HOST}/ResourceServiceCenter/cctool/QueryCCToolPkgVersion`;


// 2.24 保存用户自己的CC工程微课基本信息
const URL_SAVE_PROJECT_COURSE_INFO = `${MATERIAL_SERVER_HOST}/UserServiceGroup/material/SaveCCProjectCourseInfo`;
// 2.25 
const URL_SAVE_PROJECT_COURSE_VIDEO_INFO = `${MATERIAL_SERVER_HOST}/UserServiceGroup/material/SaveCCProjectCourseVideoInfo`;

// GetToken
const URL_GET_TOKEN = `${USER_SERVER_HOST}/AlyVoiceGW/GetToken`;

/*----------------------------定义接口方法-----------------------------*/
/**
 * 2.1.申请注册短信验证码接口
 * @param {*} {phone:"xxxxxx"} 
 */
const applyRegisterSMSCode = (value) => {
    const packageConfig = getPackageConfig();
    const registerChannel = {
        registerChannel: {
            channelType: packageConfig.channelType,
            channelVersion: packageConfig.channelVersion
        }
    }
    return post(URL_REGISTER_SMSCODE, Object.assign(registerChannel, value));
}
/**
 *  2.2. 验证短信注册验证码接口
 * @param {*} {"phone":"xxxxxx", "smsCode": "434412342"} 
 */
const checkRegisterSMSCode = (value) => {
    const packageConfig = getPackageConfig();
    const registerChannel = {
        registerChannel: {
            channelType: packageConfig.channelType,
            channelVersion: packageConfig.channelVersion
        }
    }
    return post(URL_CHECK_REGISTER_SMSCODE, Object.assign(registerChannel, value));
}
/**
 * 2.3. 完成注册接口
 * @param {*}
 * {
 *  “userAccount”:”13823582695”,
 *  “userBasicInfo”:{
 *      “userAccount”:”13823582695”,
 *      “userName”:”廖某某”,
 *      “userNickName”:”笨兔”,
 *      “userSex”:1,
 *      “userBirthday”:”2010-08-19”,
 *      “userHeadPic”:{
 *          “cosKey”:”79b030af-f75e-4d46-be0f-c3bd1fde55ee”,
 *          “cosUrl”:”           https://UserHeadPic-test-1257284480.cos.ap-guangzhou.myqcloud.com/79b030af-f75e-4d46-be0f-c3bd1fde55ee”,
 *          “cosBucketName”:” UserHeadPic”,
 *          “fileName”:”angurybird1.jpg”
 *          “sortNo”:”0”
 *      },
 *      “registerTime”:””
 *  },
 *  “userPwd”:”xyz1123”
 *  }
 */
const finishRegister = (value) => {
    const packageConfig = getPackageConfig();
    const registerChannel = {
        registerChannel: {
            channelType: packageConfig.channelType,
            channelVersion: packageConfig.channelVersion
        }
    }
    return post(URL_FINISH_REGISTER, Object.assign(registerChannel, value));
}

/**
 * 2.4. 用户帐号密码登录
 * @param {*} {"userAccount":"xxxxxx", "userPwd": "434412342"}
 */
const userLoginWithPwd = (value) => {
    return post(URL_USER_LOGIN_WITH_PWD, value);
}

/**
 * 2.5. 用户获取短信登录验证码
 * @param {*} {"userAccount":"xxxxxx"}
 */
const applyLoginSMSCode = (value) => {
    return post(URL_APPLY_LOGIN_SMSCODE, value)
}

/** 
 * 2.6. 用户短信验证码登录
 * @param {*} {"userAccount":"", "smsCode": ""}
 */
const userLoginWithSMSCode = (value) => {
    return post(URL_USER_LOGIN_WITH_SMSCODE, value)
}

/**
 * 2.7 查询用户资料
 * @param {*} “authInfo”:{“userAccount”:”13823582695”,“userUUID”:”c71c88d8-9066-4408-9135-a714c284335d”,“accessToken”: “64位的ACCESS_TOKEN”}}
 */
const queryUserBasicInfo = (value) => {
    return post(URL_QUERY_USER_INFO, value)
}

/**
 * 2.8  用户登出
 * @param {*} {“authInfo”:{“userAccount”:,“userUUID”:””,“accessToken: “”}}
 */
const userLogout = (value) => {
    return post(URL_LOGIN_OUT, value);
}

/**
 * 2.9 找回密码短信接口
 * @param {*} {“userAccount”:”13823582695”}
 */
const applyFindPwdSMSCode = (value) => {
    return post(URL_FIND_PWD_SMSCODE, value);
}

/**
 * 2.10 验证找回密码所需要的短信验证码
 * @param {*} {“userAccount”:"”,“smsCode”:””}

 */
const checkFindPwdSMSCode = (value) => {
    return post(URL_CHECK_FIND_PWD_SMSCODE, value)
}
/**
 * 2.11 完成找回密码
 * @param {*}  {“userAccount”:””,“newPwd”:"”}
 */
const finishFindPwd = (value) => {
    return post(URL_FINISH_FIND_PWD, value);
}
/**
 * 2.12 保存个人资料
 * @param {*}  {“authInfo”:{},“userBasicInfo”:{}}
 */
const saveUserBasicInfo = (value) => {
    return post(URL_SAVE_USER_INFO, value);
}

/**
 * 2.13 申请修改密码短信验证码
 * @param {*} 
 */
const applyModifyPwdSMSCode = (value) => {
    return post(URL_APPLY_MODIFY_PWD_SMSCODE, value);
}

/**
 * 2.14 校验修改密码短信验证码
 * @param {*} {“authInfo”:{},“smsCode”:””}
 */
const checkModifyPwdSMSCode = (value) => {
    return post(URL_CHECK_MODIFY_PWD_SMSCODE, value);
}

/**
 * 2.15 完成修改密码
 * @param {*} {“authInfo”:{},“oldPwd”:”oldoldpwdpwd”,“newPwd”:”newnewpwdpwd”}
 */
const finishModifyPwd = (value) => {
    return post(URL_FINISH_MODIFY_PWD, value);
}

/**
 * 2.16 提交C端用户意见反馈
 * @param {*} {“authInfo”:{},“suggestion”:"”,}
 */
const commitSuggestion = (value) => {
    return post(URL_COMMIT_SUGGESTION, value)
}

/**
 * 保存用户订阅邮件
 * @param {*} 
 */
const saveUserSubscription = (value) => {
    return post(URL_SAVE_USERSUBSCRIPTION, value)
}

/**
 * 使用用户邀请码
 * @param {*} 
 */
const useInviteCode = (value) => {
    return post(URL_USE_INVITE_CODE, value);
}

/**
 * 查询用户邀请码
 * @param {*} 
 */
const queryUserInviteCode = (value) => {
    return post(URL_QUERY_USER_INVITE_CODE, value);
}

/**
 * 搜索用户邀请的朋友列表
 * @param {*} 
 */
const searchInvitedUserList = (value) => {
    return post(URL_SEARCH_INVITED_USER_LIST, value);
}

/**
 * 2.17 搜索平台提供的CC素材分类列表
 *  @param {*} {“authInfo”:{},“materialType”: “R”,“fromResult”:0,“sizeResult”: 10}
 */
const searchCCMaterialClassList = (value) => {
    return post(URL_SEARCH_CCMATERIAL_CALSSLIST, value);
}

/**
 * 2.17 搜索平台提供的CC示例编程素材列表
 *  @param {*} {“authInfo”:{},“materialType”: “R”,“fromResult”:0,“sizeResult”: 10}
 */
const searchCCSampleMaterialInfoList = (value) => {
    return post(URL_SEARCH_CCSAMPLE_INFO_LIST, value);
}
/**
 * 2.18 搜索用户自己的CC编程素材列表
 *  @param {*} {“authInfo”:{},“materialType”: “R”,“fromResult”:0,“sizeResult”: 10}
 */
const searchCCMaterialInfoList = (value) => {
    return post(URL_SEARCH_USERSAMPLE_INFO_LIST, value);
}

/**
 * 2.19 COS临时安全证书和令牌
 * @param {*} {“authInfo”:{},“bucketName”:”CCBackgroundMaterial”,“operaType” : [‘PUT’, ‘GET’]}
 */
const applyXCosSecurityToken = (value) => {
    return post(URL_APPLY_XCOS_Token, value);
}

/**
 * 2.20 保存用户自己的CC编程素材详细信息
 * @param {*}{ “authInfo”:{},“materialType”: “R”,“ccRoleMaterial”: {}}
 */
const saveCCMaterialInfo = (value) => {
    return post(URL_MATERIAL_INFO, value);
}

/**
 * 2.21  删除用户自己的CC编程素材
 * @param {*} { “authInfo”:{},“materialType”: “R”,“materialUUID “:””}
 */
const deleteCCMaterial = (value) => {
    return post(URL_DELET_MATERIAL_INFO, value);
}

/*
 * 2.22 申请web前端视频防盗链访问签名
 * @param {*} {“authInfo”:{“userAccount”:”13823582695”,“userUUID”:”c71c88d8-9066-4408-9135-a714c284335d”,“accessToken”: “64位的ACCESS_TOKEN”}, “fileId”: “14508071098244931831”}
 */
const applyVodSecuritySign = (value) => {
    return post(URL_APPLY_VOD_SECURITY_SIGN, value);
}

const queryCCToolPkgVersion = (value) => {
    return post(TEST_URL_QUERY_CCTOOL_PKG_VERSION, value);
}

/**
 * 2.24 保存用户自己的CC工程微课基本信息
 * @param {*} {“authInfo”:{},“materialUUID”: “”,“courseName”: “”,“courseDescription”: “”}
 */
const saveCCProjectCourseInfo = (value) => {
    return post(URL_SAVE_PROJECT_COURSE_INFO, value);
}

/**
 * 2.25 保存用户自己的CC工程微课视频信息
 * @param {*} {“authInfo”:{},“materialUUID”: “”,“videoFileId”: “”,“fileName”:”}
 */
const saveCCProjectCourseVideoInfo = (value) => {
    return post(URL_SAVE_PROJECT_COURSE_VIDEO_INFO, value);
}



const LOCAL_HOST = 'http://localhost:62377/cc/';
// 保存平台素材报文到本地
const URL_SAVE_LOCAL_PLATFORM_MATERIAL = `${LOCAL_HOST}storePlatformMaterial`;
const saveLocalPlatformMaterial = (value) => {
    return post(URL_SAVE_LOCAL_PLATFORM_MATERIAL, value);
}

// 获取本地保存的平台素材报文
const URL_GET_LOCAL_PLATFORM_MATERIAL = `${LOCAL_HOST}queryPlatformMaterial`;
const getLocalPlatformMaterial = (value) => {
    return post(URL_GET_LOCAL_PLATFORM_MATERIAL, value);
}

// 缓存素材到本地
const URL_SAVE_LOCAL_MATERIAL = `${LOCAL_HOST}storeCacheImage`;
const saveLocalMaterial = (value) => {
    return post(URL_SAVE_LOCAL_MATERIAL, value);
}
// 获取本地保存的素材
const URL_GET_LOCAL_MATERIAL = `${LOCAL_HOST}getCacheImage`;
const getLocalMaterial = (value) => {
    return post(URL_GET_LOCAL_MATERIAL, value);
}

// 保存个人素材到本地
const URL_SAVE_USER_LOCAL_MATERIAL = `${LOCAL_HOST}storeCryptonymUserMaterial`;
const saveUserLocalMaterial = (value) => {
    return post(URL_SAVE_USER_LOCAL_MATERIAL, value);
}
// 获取个人本地素材
const URL_GET_USER_LOCAL_MATERIAL = `${LOCAL_HOST}queryCryptonymUserMaterial`;
const getUserLocalMaterial = (value) => {
    return post(URL_GET_USER_LOCAL_MATERIAL, value);
}
// 删除个人本地素材
const URL_DELETE_USER_LOCAL_MATERIAL = `${LOCAL_HOST}deleteCryptonymUserMaterial`;
const deleteUserLocalMaterial = (value) => {
    return post(URL_DELETE_USER_LOCAL_MATERIAL, value);
}
// 清空图片缓存队列
const URL_CLEAR_CACHEQUEUE = `${LOCAL_HOST}clearCacheQueue`;
const clearCacheQueue = () => {
    return post(URL_CLEAR_CACHEQUEUE);
}

/*----------------------------定义SKU课程接口方法-----------------------------*/

const skuServiceBaseUrl = SKU_SERVER_HOST + '/ZwbUserSku/Sku/';

const courseServiceBaseUrl = SKU_SERVER_HOST + '/ZwbUserSku/Course/';

const statsServiceBaseUrl = SKU_SERVER_HOST + '/ZwbUserSku/Stats/';

const projectServiceBaseUrl = SKU_SERVER_HOST + '/ZwbUserSku/Project/';

const hardwareProductsServiceBaseUrl = SKU_SERVER_HOST + '/ZwbUserSku/HardwareProducts/';

/**
 * 搜索SKU基本信息列表
 * @param {*} {“authInfo”:{},“materialUUID”: “”,“videoFileId”: “”,“fileName”:”}
 */
export async function searchSKUBasicInfoList(params) {
    return post(skuServiceBaseUrl + 'SearchSKUBasicInfoList', params);
}

// 5.1.	查询SKU详细信息
export async function querySKUDetailInfo(params) {
    return post(skuServiceBaseUrl + 'QuerySKUDetailInfo', params);
}

// 5.1.	查询课程基本信息
export async function queryCourseBasicInfo(params) {
    return post(courseServiceBaseUrl + 'QueryCourseBasicInfo', params);
}

// 5.2.	查询课程介绍图片文件信息列表
export async function queryCourseIntroduceFileList(params) {
    return post(courseServiceBaseUrl + 'QueryCourseIntroduceFileList', params);
}

// 5.3.查询课程的相关推荐
export async function queryCourseRelatedRecommend(params) {
    return post(courseServiceBaseUrl + 'QueryCourseRelatedRecommend', params);
}

// 5.4.	查询课程中的单元课列表
export async function queryClassUnitBasicInfoList(params) {
    return post(courseServiceBaseUrl + 'QueryClassUnitBasicInfoList', params);
}

// 5.5.查询单元课的课时列表
export async function queryClassHourInfoList(params) {
    return post(courseServiceBaseUrl + 'QueryClassHourInfoList', params);
}

// 5.6.	查询课程素材详细信息
export async function queryCourseMaterialInfo(params) {
    return post(courseServiceBaseUrl + 'QueryCourseMaterialInfo', params);
}

// 5.7.查询习题详细信息
export async function queryExcerciseInfo(params) {
    return post(courseServiceBaseUrl + 'QueryExerciseInfo', params);
}

// 5.8.	查询课后挑战任务详情
export async function queryPracticeTaskInfo(params) {
    return post(courseServiceBaseUrl + 'QueryPracticeTaskInfo', params);
}

// 4.1. 用户行为数据的上报
export async function statsUserAction(params) {
    return post(statsServiceBaseUrl + 'StatsUserAction', params);
}

// 搜索项目课基本信息列表
export async function searchProjectBasicInfoList(params) {
    return post(projectServiceBaseUrl + 'SearchProjectBasicInfoList', params);
}

// 查询项目课详细信息
export async function queryProjectDetailInfo(params) {
    return post(projectServiceBaseUrl + 'QueryProjectDetailInfo', params);
}

// 查询项目课详细信息
export async function searchHardwareProductsInfoList(params) {
    return post(hardwareProductsServiceBaseUrl + 'SearchHardwareProductsBasicInfoList', params);
}

export {
    URL_GET_TOKEN,
    URL_USER_LOGIN_WITH_PWD,
    zwbcUrl,
    ccUrl,
    FIRMWARE_SERVER_HOST,
    applyRegisterSMSCode,
    checkRegisterSMSCode,
    finishRegister,
    userLoginWithPwd,
    applyLoginSMSCode,
    userLoginWithSMSCode,
    queryUserBasicInfo,
    userLogout,
    applyFindPwdSMSCode,
    checkFindPwdSMSCode,
    finishFindPwd,
    saveUserBasicInfo,
    applyModifyPwdSMSCode,
    checkModifyPwdSMSCode,
    finishModifyPwd,
    commitSuggestion,
    saveUserSubscription,
    searchCCMaterialClassList,
    searchCCSampleMaterialInfoList,
    searchCCMaterialInfoList,
    applyXCosSecurityToken,
    saveCCMaterialInfo,
    deleteCCMaterial,
    applyVodSecuritySign,
    queryCCToolPkgVersion,
    saveCCProjectCourseInfo,
    saveCCProjectCourseVideoInfo,
    useInviteCode,
    queryUserInviteCode,
    searchInvitedUserList,
    saveLocalPlatformMaterial,
    getLocalPlatformMaterial,
    saveLocalMaterial,
    getLocalMaterial,
    saveUserLocalMaterial,
    getUserLocalMaterial,
    deleteUserLocalMaterial,
    clearCacheQueue
}