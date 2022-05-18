import COS from 'cos-js-sdk-v5';
import TcVod from 'vod-js-sdk-v6'
import { cosConfig } from './cos-config.js'

import {
  applyXCosSecurityToken,
  applyVodSecuritySign
} from './busi-proxy/busi-proxy.js';

// 获取cos上传的签名
const tcCos = (authInfo, bucketName, onFail, onStart, file, fileKey) => {
  const params = {
    authInfo: authInfo,
    bucketName: bucketName,
    operaType: cosConfig.operaType
  }
  const cos = new COS({
    // 必选参数
    getAuthorization: function (options, callback) {
      applyXCosSecurityToken(params).then(response => {
        if (response && response.errorCode == 0) {
          // console.log('获取cos签名成功:', response);
          callback({
            TmpSecretId: response.data.tmpSecretId,
            TmpSecretKey: response.data.tmpSecretKey,
            XCosSecurityToken: response.data.xCosSecurityToken,
            ExpiredTime: response.data.expiredTime,
          });
          if (onStart) {
            onStart(file, fileKey);
          }
        } else {
          if (onFail) {
            onFail(101, '获取签名失败', fileKey);
          }
          // console.log('获取cos签名失败:', response);
        }
      });
    },
  });
  return cos;
};

const uploadCosFile = (cos, file, key, bucketName, onProgress, onResult) => {
  cos.putObject({
    Bucket: bucketName + '-' + cosConfig.appId, /* 必须 */
    Region: cosConfig.region,    /* 必须 */
    Key: key,              /* 必须 */
    Body: file, // 上传文件对象
    onProgress: onProgress
  }, function (err, data) {
    onResult(data, err);
  });
}

// 获取防盗链
const getObjectUrl = (cos, bucketName, key) => {
  return new Promise((resolve, reject) => {
    cos.getObjectUrl({
      Bucket: bucketName + '-' + cosConfig.appId, /* 必须 */
      Region: cosConfig.region,    /* 必须 */
      Key: key,
      Sign: true
    }, function (err, data) {
      // console.log('getObjectUrl:',data);
      if (data) {
        resolve(data.Url);
      } else {
        reject(err);
      }
    })
  })
}

//申请视频防盗链访问签名
const getVodSignature = ({ authInfo, fileId, callBack }) => {
  return applyVodSecuritySign({ authInfo, fileId }).then(response => {
    callBack(response);
  });
};

const tcVod = new TcVod({
  getSignature: getVodSignature, // 前文中所述的获取上传签名的函数
  // getVodSign: getVodSecuritySign
});

// 播放器初始化
const initvideo = ({ fileID, appID, sign, t, us }) => {
  try {
    return TCPlayer('player-container-id', { // player-container-id 为播放器容器ID，必须与html中一致
      fileID, // 请传入需要播放的视频filID 必须
      appID, // 请传入点播账号的appID 必须
      // 其他参数请在开发文档中查看
      sign, // 参考 Key 防盗链说明
      t, // 参考 Key 防盗链说明
      us, // 参考 Key 防盗链说明
      autoplay: true,
      controls: true,
      bigPlayButton: false,
      controlBar: {
        // 是否显示播放、暂停切换按钮
        playToggle: true,
        // 是否显示播放进度条  
        progressControl: true,
        // 是否显示音量控制
        volumePanel: false,
        // 是否显示视频当前时间
        currentTimeDisplay: false,
        // 是否显示视频时长
        durationDisplay: false,
        // 是否显示时间分割符
        timeDivider: false,
        // 是否显示播放速率选择按钮
        playbackRateMenuButton: false,
        // 是否显示全屏按钮
        fullscreenToggle: false,
        // 是否显示清晰度切换菜单
        QualitySwitcherMenuButton: false
      }
    });
  } catch (err) {
    console.log('TCPlayer--', err);
    return;
  }
}

export {
  tcCos,
  tcVod,
  uploadCosFile,
  getObjectUrl,
  initvideo
}