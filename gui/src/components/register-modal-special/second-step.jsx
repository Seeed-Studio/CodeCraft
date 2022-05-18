import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './second-step.css';

import { RadioGroup, Radio } from 'react-radio-group';

import InputComponent from '../input-special/input.jsx';
import ButtonComponent from '../button-special/button.jsx';
import DatePicker from '../datepicker-special/datepicker.jsx';
import UploadPane from '../upload-pane/upload-pane.jsx';

import { finishRegister, userLoginWithPwd, queryUserBasicInfo, applyXCosSecurityToken } from '../../lib/busi-proxy/busi-proxy.js';
import COS from 'cos-js-sdk-v5';
import { toasts } from '../toast-special/toast.jsx';
import { cosConfig } from '../../lib/cos-config.js';

const localeMessages = defineMessages({
  inputNickName: {
    id: 'gui.loginModal.inputNickName',
    defaultMessage: 'Please enter your name.'
  },
  uploadAvatarHeadFail: {
    id: 'gui.loginModal.uploadAvatarHeadFail',
    defaultMessage: 'Upload failed'
  },
  loginFail: {
    id: 'gui.loginModal.loginFail',
    defaultMessage: 'Login failed'
  },
  registedToLogin: {
    id: 'gui.loginModal.registedToLogin',
    defaultMessage: 'The mobile phone number has been registered, please login directly'
  },
  registedToLoginEmail: {
    id: 'gui.loginModal.registedToLoginEmail',
    defaultMessage: 'The Email has been registered, please login directly'
  },
  unauthorized: {
    id: 'gui.loginModal.unauthorized',
    defaultMessage: 'Failed to be verified by SMS.'
  },
  registerFail: {
    id: 'gui.loginModal.registerFail',
    defaultMessage: 'Registration failed'
  },
  registerSucc: {
    id: 'gui.loginModal.registerSucc',
    defaultMessage: 'Registration success'
  },
  getUserInfoFail: {
    id: 'gui.loginModal.getUserInfoFail',
    defaultMessage: 'Failed to query user information'
  },
  requiredFiled: {
    defaultMessage: 'This is a required field',
    id: 'gui.loginModal.requiredFiled'
  }
});

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleDateChange',
      'handlePreventEvent',
      'handleGenderChange',
      'handleNickNameChange',
      'handleFinishRegister',
      'handleLogin',
      'handleQueryUserInfo',
      'handleFileUploadClick',
      'handleFileChange',
      'handleFileInput',
      'handleShowDatePick',
    ]);

    this.state = {
      gender: 0,
      year: new Date(),
      borthYear: '2018',
      borthMonth: '01',
      borthDay: '01',
      borthDayValue: '2018-01-01',
      nickname: '',
      userHeadPic: null,
      nickNameErrMsg: '',
      isRequest: false,
    }
  }

  // 生成UUID
  productUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  }

  // 初始化cos
  initCos() {
    const params = {
      authInfo: this.props.authInfo,
      bucketName: cosConfig.userHeadPicBucketName,
      operaType: cosConfig.operaType
    }
    // console.log('authInfo--', this.props.authInfo)
    this.cos = new COS({
      getAuthorization: (options, callback) => {
        applyXCosSecurityToken(params).then((data) => {
          callback({
            TmpSecretId: data.data.tmpSecretId,
            TmpSecretKey: data.data.tmpSecretKey,
            XCosSecurityToken: data.data.xCosSecurityToken,
            ExpiredTime: data.data.expiredTime,
          });
        }, (err) => {
          // toasts.error('操作失败');
        })
      }
    });
  }

  componentWillMount() {
    // 初始化cos
    this.initCos();
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    // cos置空，清理内存
    this.cos = null;
  }


  handleDateChange(type, value) {
    if (type === 'borthYear') {
      this.setState({
        borthYear: value,
        borthDayValue: value + '-' + this.state.borthMonth + '-' + this.state.borthDay,
      })
    } else if (type === 'borthMonth') {
      this.setState({
        borthMonth: value,
        borthDayValue: this.state.borthYear + '-' + value + '-' + this.state.borthDay,
      })
    } else if (type === 'borthDay') {
      this.setState({
        borthDay: value,
        borthDayValue: this.state.borthYear + '-' + this.state.borthMonth + '-' + value,
      })
    }
  }

  handlePreventEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleGenderChange(value) {
    this.setState({
      gender: value
    })
  }

  handleNickNameChange(value) {
    this.setState({
      nickname: value,
      nickNameErrMsg: '',
    })
  }

  // 完成注册
  handleFinishRegister() {
    if (this.state.isRequest) {
      return
    }

    // 处理断网
    if (!this.props.isOnLine) {
      this.props.onErrRemindMsg('isOffLine');
      return;
    }

    const { nickname, borthDayValue, gender, userHeadPic } = this.state;
    let { phoneNum, pwdNum, countryCode, selectedType } = this.props;

    if (!nickname) {
      this.setState({
        // nickNameErrMsg: this.props.intl.formatMessage(localeMessages.inputNickName)
        nickNameErrMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
      });
      return;
    }



    if (nickname && borthDayValue && phoneNum && pwdNum) {
      const params = {
        userBasicInfo: {
          userName: nickname,
          userNickName: nickname,
          userSex: gender,
          userBirthday: borthDayValue,
          userHeadPic: userHeadPic,
          registerTime: '',
        },
        userPwd: pwdNum
      };
      if (selectedType === 'phone') {
        if (countryCode === '') {
          countryCode = '86';
        }
        params.userAccount = countryCode + '-' + phoneNum;
        params.userBasicInfo.userAccount = countryCode + '-' + phoneNum;
      } else if (selectedType === 'email') {
        params.userAccount = phoneNum;
        params.userBasicInfo.userAccount = phoneNum;
      }


      this.setState({ isRequest: true });
      finishRegister(params).then((data) => {
        // 注册成功之后自动登录
        let account = '';
        if (selectedType === 'phone') {
          account = countryCode + '-' + phoneNum;
        } else if (selectedType === 'email') {
          account = phoneNum;
        }
        this.handleLogin(account, pwdNum);
      }, (err) => {
        this.setState({ isRequest: false });
        if (err.errorCode === 5010001) {
          toasts.error(this.props.intl.formatMessage(selectedType === 'phone' ? localeMessages.registedToLogin : localeMessages.registedToLoginEmail));
        } else if (err.errorCode === 5010003) {
          toasts.error(this.props.intl.formatMessage(localeMessages.unauthorized));
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.registerFail));
        }
      })
    }
  }

  // 登录
  handleLogin(userAccount, userPwd) {
    const params = { userAccount, userPwd };

    userLoginWithPwd(params).then((data) => {
      toasts.success(this.props.intl.formatMessage(localeMessages.registerSucc));

      // 登录成功，查询用户信息
      const queryParams = {
        authInfo: {
          userAccount: userAccount,
          userUUID: data.userUUID,
          accessToken: data.accessToken
        }
      }
      this.handleQueryUserInfo(queryParams);

    }, (err) => {
      // 登录失败
      this.setState({ isRequest: false });
      toasts.error(this.props.intl.formatMessage(localeMessages.loginFail));
    })
  }

  // 查询用户信息
  handleQueryUserInfo(params) {
    // console.log('params-----', params)
    queryUserBasicInfo(params).then((data) => {
      // 本地保存用户名
      const { selectedType } = this.props;
      const localAuthInfo = Object.assign({}, params.authInfo, {
        userLoginType: selectedType
      });
      localStorage.setItem('localAuthInfo', JSON.stringify(localAuthInfo));

      const userBasicInfo = data.userBasicInfo;
    
      this.props.onSetUserInfo({
        ...userBasicInfo,
        userUUID: params.authInfo.userUUID
      });

      this.props.onSetAuthInfo(params.authInfo);
      this.props.onSetLoginStatus(true);
      this.props.onRequestClose();
      this.setState({ isRequest: false });
    }, (err) => {
      // 错误处理
      this.setState({ isRequest: false });
      toasts.error(this.props.intl.formatMessage(localeMessages.getUserInfoFail));
    })
  }


  // 用户设置--头像上传
  handleFileUploadClick() {
    this.fileInput.value = null;
    this.fileInput.click();
  }
  handleFileInput(input) {
    this.fileInput = input;
  }
  handleFileChange() {
    const file = document.getElementById('fileSelect').files[0];
    const fileName = file.name;
    const key = this.productUUID();
    if (this.cos) {
      this.cos.putObject({
        Bucket: cosConfig.userHeadPicBucketName + '-' + cosConfig.appId,
        Region: cosConfig.region,
        Key: key,
        Body: file,
        TaskReady: (taskId) => {
          // console.log('taskId---', taskId)
        },
        onProgress: (progressData) => {

        }
      }, (err, data) => {
        // console.log('err || data', err || data);
        if (data) {
          const cosFile = {};
          cosFile.cosKey = key;
          cosFile.cosUrl = data.Location;
          cosFile.cosBucketName = cosConfig.userHeadPicBucketName;
          cosFile.fileName = fileName;
          cosFile.sortNo = 0;
          this.setState({
            userHeadPic: cosFile
          })
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.uploadAvatarHeadFail))
        }
      })
    } else {
      toasts.error(this.props.intl.formatMessage(localeMessages.uploadAvatarHeadFail))
    }
  }
  handleShowDatePick() {
    this.props.handleShowDatePick();
  }

  render() {
    const fileAccept = '.svg, .png, .jpg, .jpeg, .sprite2, .sprite3, .SVG, .PNG, .JPG, .JPEG, .SPRITE2, .SPRITE3';
    const { userHeadPic, nickNameErrMsg, gender } = this.state;
    const { isShowDatePicker } = this.props;

    return <div className={styles.secondStepContainer}>
      <div className={styles.uploadPic}>
        <UploadPane
          onClick={this.handleFileUploadClick}
          fileAccept={fileAccept}
          fileChange={this.handleFileChange}
          fileInput={this.handleFileInput}
          className={styles.libraryLocalUpload}
          id={'fileSelect'}
        >
          {!userHeadPic && <img src={require('./btn_addavatar.png')} alt="" className={styles.uploadPicImg} />}
          {userHeadPic && <span className={styles.picContainer}>
            <img src={'https://' + userHeadPic.cosUrl} alt="" className={styles.uploadPicImg} />
            <div className={styles.picCamera}>
              <img src={require('./icon_camera.png')} alt="" />
            </div>
          </span>}
        </UploadPane>
      </div>
      <div className={styles.uploadPicText}>
        <FormattedMessage
          defaultMessage="Upload/Change your avatar"
          description=""
          id="gui.loginModal.uploadAvatar"
        />
      </div>
      <div className={styles.nickNameContainer}>
        <div className={styles.nickname}>
          <InputComponent placeholder={this.props.intl.formatMessage(localeMessages.inputNickName)} maxLength={20} className={classNames(styles.nicknameInput, nickNameErrMsg !== '' && styles.redBorder)} onChange={this.handleNickNameChange} />
          <span className={styles.nicknameLabel}>
            <FormattedMessage
              defaultMessage="Name"
              description=""
              id="gui.loginModal.setting.nickname"
            />
          </span>
          <div className={styles.errMsg}>{nickNameErrMsg}</div>
        </div>

        <div className={classNames(styles.datapick)} onClick={this.handlePreventEvent}>
          {/* <InputComponent placeholder={'请输入日期'} className={classNames(styles.nicknameInput, this.state.isInputBirth && styles.nicknameIsFocus)} onFocus={this.handleFocus} value={this.state.borthDayValue} />
        <span className={styles.nicknameLabel}>生日</span> */}
          {/* <DatePicker onDateChange={this.handleDateChange} /> */}

          {/* {isInputBirth && <div className={styles.datepicker}>
          <DatePicker onDateChange={this.handleDateChange} />
        </div>} */}
          <DatePicker onDateChange={this.handleDateChange} borthDayValue={this.state.borthDayValue} isShowDatePicker={isShowDatePicker}
            onShowDatePick={this.handleShowDatePick} />
        </div>
      </div>

      <div className={styles.genderChose}>
        {/* <RadioGroup name="gender" selectedValue={this.state.gender} onChange={this.handleGenderChange}>
          <label className={styles.girl}><Radio value={0} />  我是女生</label>
          <label className={styles.boy}><Radio value={1} />  我是男生</label>
        </RadioGroup> */}
        <div className={styles.radioContainer}>
          <span className={styles.radioItem} onClick={() => this.handleGenderChange(0)}>
            <img src={require((gender === 0) ? './btn_radio_circle_s.png' : './btn_radio_circle_n.png')} className={styles.radioIcon} alt="" />
            <span className={styles.radioText}>
              <FormattedMessage
                defaultMessage="female"
                description=""
                id="gui.loginModal.isFemale"
              />
            </span>
          </span>
        </div>
        <div className={styles.radioContainer}>
          <span className={styles.radioItem} onClick={() => this.handleGenderChange(1)}>
            <img src={require((gender === 1) ? './btn_radio_circle_s.png' : './btn_radio_circle_n.png')} className={styles.radioIcon} alt="" />
            <span className={styles.radioText}>
              <FormattedMessage
                defaultMessage="male"
                description=""
                id="gui.loginModal.isMale"
              />
            </span>
          </span>
        </div>
      </div>

      <div className={styles.finishReigsterContainer}>
        {/* <div className={styles.errMsg}>{nickNameErrMsg}</div> */}
        <ButtonComponent className={styles.finishReigsterBtn} onClick={this.handleFinishRegister}>
          <FormattedMessage
            defaultMessage="Hooray! You're all set!"
            description=""
            id="gui.loginModal.registerCompleted"
          />
        </ButtonComponent>
      </div>
    </div >
  }
}
export default injectIntl(SecondStep);