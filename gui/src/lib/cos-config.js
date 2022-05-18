import env from '../../../env.js'

export const cosConfig = {
  appId: '1257284480',
  region: 'ap-guangzhou',
  operaType: ['PUT', 'GET']
}

switch (env) {
  case 'dev':
  case 'test':
    cosConfig.userHeadPicBucketName = 'user-head-pic-test';  // 用户头像
    cosConfig.materialBucketName = 'ccmaterial-test';  // 素材相关
    cosConfig.projectBucketName = 'ccprojects-test';  // 工程文件
    cosConfig.projectHeadPicsBucketName = 'ccproject-head-pics-test';  // 工程头图
    cosConfig.courseHeadPicBucketName = 'course-head-pic-test';  
    cosConfig.feedbackBucketName = 'ccfeedback-test' //意见反馈
    break;
  case 'prod':
    cosConfig.userHeadPicBucketName = 'user-head-pic';
    cosConfig.materialBucketName = 'ccmaterial';
    cosConfig.projectBucketName = 'ccprojects';
    cosConfig.projectHeadPicsBucketName = 'ccproject-head-pics';
    cosConfig.courseHeadPicBucketName = 'course-head-pic';  
    cosConfig.feedbackBucketName = 'ccfeedback' //意见反馈
    break;
  default:
    break;
}

export const grovezeroicon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/grove-zero.svg'
// export const arduinoicon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/grove-arduino.svg'
export const arduinoicon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/grove-arduino-new.svg'
export const microbiticon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/microbit.svg'
export const markicon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/maixduino.svg'
export const grovejointicon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/grove-joint.svg'
export const poweringicon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/powering.svg'
export const opencaticon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/opencat.svg'
export const elfboticon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/elfbot.svg'
export const mpythonicon = 'https://public-1257284480.cos.ap-guangzhou.myqcloud.com/logo/cc-device/mpython.svg'

