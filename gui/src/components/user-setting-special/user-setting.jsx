import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import './user-setting.less';

import UploadPane from '../upload-pane/upload-pane.jsx';
import ModalComponent from '../../containers/modal.jsx';
import InputComponent from '../input-special/input.jsx';
import DatePicker from '../datepicker-special/datepicker.jsx';
import GenderPicker from '../genderpicker-special/genderpicker.jsx';

import IdentityPicker from '../identity-picker/indentity-picker.jsx';

import { toasts } from '../toast-special/toast.jsx';
import Select from 'react-select';
import COS from 'cos-js-sdk-v5';
import { queryUserBasicInfo, saveUserBasicInfo, applyXCosSecurityToken } from '../../lib/busi-proxy/busi-proxy.js';
import { cosConfig } from '../../lib/cos-config.js';

const localeMessages = defineMessages({
  title: {
    id: 'gui.loginModal.setting.title',
    defaultMessage: 'Setting'
  },
  operateSucc: {
    defaultMessage: 'Success',
    description: '',
    id: 'gui.connectModal.operateSucc'
  },
  operateFail: {
    defaultMessage: 'Failed',
    description: '',
    id: 'gui.connectModal.operateFail'
  },
  uploadAvatarHeadFail: {
    defaultMessage: 'Upload failed',
    id: "gui.loginModal.uploadAvatarHeadFail"
  },
  imageUpalod:{
    defaultMessage: 'Upload',
    id:"gui.Setting.ImageUpload"
  }
});

class UserSettingModal extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleNickNameChange',
      'handleGenderChange',
      'handleModifyPwd',
      'handleFileUploadClick',
      'handleFileChange',
      'handleFileInput',
      'handleNickNameBlur',
      'handleDateChange',
      'handleShowDatePick',
      'handleUserSettingClick',
      'handlePreventEvent',
      'handleShowGenderPick',
      'handleShowIdentityPick',
      'handleIdentityChange'
    ])
    this.state = {
      authInfo: {},
      userInfo: {},
      userName: '',

      isShowDatePicker: false,
      isShowGenderPicker: false,
      isShowIdentityPicker: false,

      borthYear: '',
      borthMonth: '',
      borthDay: '',
      borthDayValue: '',
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
          if (err.errorCode === 1010008 || err.errorCode === 1010010) {
            this.props.onToLoginTimtout();
          } else {
            toasts.error(this.props.intl.formatMessage(localeMessages.operateFail));
          }
        })
      }
    });
  }

  componentDidMount() {
    // 初始化cos
    this.initCos();

    const params = {
      authInfo: this.props.authInfo
    };
    this.setState({
      authInfo: params.authInfo,
    })

    if (Object.keys(this.props.userInfo).length === 0) {
      // console.log(params)
      queryUserBasicInfo(params).then((data) => {
        // console.log('userBasicInfo---', data.userBasicInfo)
        const userBasicInfo = data.userBasicInfo;
    
        this.props.onSetUserInfo({
          ...userBasicInfo,
          userUUID: params.authInfo.userUUID
        });

        const birthArr = data.userBasicInfo.userBirthday.split('-');

        this.setState({
          userInfo: data.userBasicInfo,
          userName: data.userBasicInfo.userNickName,
          borthYear: birthArr[0],
          borthMonth: birthArr[1],
          borthDay: birthArr[2]
        })
      }, (err) => {
        if (err.errorCode === 1010008 || err.errorCode === 1010010) {
          this.props.onToLoginTimtout();
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.operateFail));
        }
      })
    } else {
      const birthArr = this.props.userInfo.userBirthday.split('-');
      this.setState({
        userInfo: this.props.userInfo,
        userName: this.props.userInfo.userNickName,
        borthYear: birthArr[0],
        borthMonth: birthArr[1],
        borthDay: birthArr[2]
      })
    }

    const localAuthInfoStr = localStorage.getItem('localAuthInfo');
    const localAuthInfo = localAuthInfoStr ? JSON.parse(localAuthInfoStr) : {};
    this.userLoginType = localAuthInfo.userLoginType;
  }

  handleNickNameChange(value) {
    this.setState({
      userInfo: Object.assign({}, this.state.userInfo, {
        userNickName: value
      })
    })
  }
  handleNickNameBlur() {
    if (this.state.userInfo.userNickName === '') {
      this.setState({
        userInfo: Object.assign({}, this.state.userInfo, {
          userNickName: this.state.userName
        })
      })
    }
  }

  handleGenderChange(value) {
    this.setState({
      userInfo: Object.assign({}, this.state.userInfo, {
        userSex: value
      })
    })
  }

  handleIdentityChange(value) {
    console.log("value : ", value)
    this.setState({
      userInfo: Object.assign({}, this.state.userInfo, {
        userIdentity: value
      })
    })
  }

  componentWillUnmount() {
    // 组件销毁时，存储数据
    const { authInfo, userInfo } = this.state;
    // console.log('authInfo---', authInfo);
    const params = {
      authInfo, userBasicInfo: userInfo
    }
    saveUserBasicInfo(params).then((data) => {
      console.log('修改信息成功');

      const userBasicInfo = params.userBasicInfo;
    
      this.props.onSetUserInfo({
        ...userBasicInfo,
        userUUID: params.authInfo.userUUID
      });

    }, (err) => {
      // console.log('修改信息失败');
      if ((err.errorCode === 1010008) || (err.errorCode === 1010010)) {
        this.props.onToLoginTimtout();
      }
    });

    // cos置空，清理内存
    this.cos = null;
  }

  handleModifyPwd(e) {
    e.stopPropagation();
    this.props.onToModifyPwd();
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
            userInfo: Object.assign({}, this.state.userInfo, {
              userHeadPic: cosFile
            })
          })
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.uploadAvatarHeadFail))
        }
      })
    } else {
      toasts.error(this.props.intl.formatMessage(localeMessages.uploadAvatarHeadFail))
    }
  }


  handleDateChange(type, value) {
    if (type === 'borthYear') {
      this.setState({
        borthYear: value,
        borthDayValue: value + '-' + this.state.borthMonth + '-' + this.state.borthDay,
      }, () => {
        this.setState({
          userInfo: Object.assign({}, this.state.userInfo, {
            userBirthday: this.state.borthDayValue
          })
        })
      })
    } else if (type === 'borthMonth') {
      this.setState({
        borthMonth: value,
        borthDayValue: this.state.borthYear + '-' + value + '-' + this.state.borthDay,
      }, () => {
        this.setState({
          userInfo: Object.assign({}, this.state.userInfo, {
            userBirthday: this.state.borthDayValue
          })
        })
      })
    } else if (type === 'borthDay') {
      this.setState({
        borthDay: value,
        borthDayValue: this.state.borthYear + '-' + this.state.borthMonth + '-' + value,
      }, () => {
        this.setState({
          userInfo: Object.assign({}, this.state.userInfo, {
            userBirthday: this.state.borthDayValue
          })
        })
      })
    }
  }
  handleShowDatePick() {
    this.setState({
      isShowDatePicker: !this.state.isShowDatePicker,
      isShowGenderPicker: false,
      isShowIdentityPicker: false
    })
  }
  handleShowGenderPick() {
    this.setState({
      isShowGenderPicker: !this.state.isShowGenderPicker,
      isShowDatePicker: false,
      isShowIdentityPicker: false
    })
  }

  handleShowIdentityPick(){
    this.setState({
      isShowIdentityPicker: !this.state.isShowIdentityPicker,
      isShowGenderPicker: false,
      isShowDatePicker: false
    })
  }

  handleUserSettingClick(e) {
    this.setState({
      isShowDatePicker: false,
      isShowGenderPicker: false,
      isShowIdentityPicker: false
    })
    if (e.target.classList[0] === 'ReactModal__Overlay') {
      this.props.onRequestClose();
    }
  }

  handlePreventEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { isShowDatePicker, isShowGenderPicker, isShowIdentityPicker, borthYear, borthMonth, borthDay, imageHover = false} = this.state;
    const { userNickName, userSex, userIdentity, userBirthday, userAccount, userHeadPic } = this.state.userInfo;
    const fileAccept = '.svg, .png, .jpg, .jpeg, .sprite2, .sprite3，.SVG, .PNG, .JPG, .JPEG, .SPRITE2, .SPRITE3';

    return <ModalComponent
      isOpen={true}
      className={'userSettingModal'}
      showClose={true}
      onRequestClose={this.props.onRequestClose}
      visiableTitle={true}
      title={this.props.intl.formatMessage(localeMessages.title)}
      id='userSettingModal'
      contentLabel='userSettingModal'
      onClick={this.handleUserSettingClick}
    >
      <div className={'userSettingModalContainer'}>
        <div className={'userImg'}>
          <UploadPane
            id={'fileSelect'}
            onClick={this.handleFileUploadClick}
            fileAccept={fileAccept}
            fileChange={this.handleFileChange}
            fileInput={this.handleFileInput}
            className={'libraryLocalUpload'}
            onMouseEnter={() => { this.setState({ imageHover: true }) }}
            onMouseLeave={() => { this.setState({ imageHover: false }) }}
          >
            {/* 已登录，有头像 */}
            {userHeadPic && <img src={'https://' + userHeadPic.cosUrl} alt="" />}
            
            {/* 已登录，无头像，未知 */}
            {!userHeadPic && userSex === 2 && <img src={require('./icon_default_male.png')} alt="" />}
            {/* 已登录，无头像，男 */}
            {!userHeadPic && userSex === 1 && <img src={require('./icon_default_male.png')} alt="" />}
            {/* 已登录，无头像，女 */}
            {!userHeadPic && userSex === 0 && <img src={require('./icon_default_female.png')} alt="" />}
            {/* 更换照片按钮 */}
            {
              imageHover &&
              <div className={'userImgChange'}>
                  {this.props.intl.formatMessage(localeMessages.imageUpalod)}
              </div>
            }
          </UploadPane>
        
        </div>
        <div className={'nickname'}>
          <InputComponent className={'nicknameInput'} value={userNickName} maxLength={20} onChange={this.handleNickNameChange} onBlur={this.handleNickNameBlur} />
          <span className={'nicknameLabel'}>
            <FormattedMessage
              defaultMessage="Name"
              description=""
              id="gui.loginModal.setting.nickname"
            />
          </span>
        </div>

        <div className={'nickname'} onClick={this.handlePreventEvent}>
          {/* <InputComponent className={classNames('nicknameInput')} value={userSex === 0 ? '女' : '男'} onChange={this.handleGenderChange} />
          <span className={'nicknameLabel'}>性别</span> */}
          <GenderPicker className={'genderpick'} genderValue={userSex} onShowGenderPick={this.handleShowGenderPick} isShowGenderPicker={isShowGenderPicker} onGenderChange={this.handleGenderChange} />
        </div>

        {/* 身份 */}
        <div className={'nickname'} onClick={this.handlePreventEvent}>
          <IdentityPicker
            className={'genderpick'}
            identityValue={userIdentity}
            onShowIdentityPick={this.handleShowIdentityPick}
            isShowIdentityPicker={isShowIdentityPicker}
            onIdentityChange={this.handleIdentityChange} />
        </div>

        <div className={classNames('nickname')} onClick={this.handlePreventEvent}>
          {/* <InputComponent className={classNames('nicknameInput')} value={userBirthday} onChange={this.handleBirthdayChange} /> */}
          {/* <span className={'nicknameLabel'}>生日</span> */}
          <DatePicker className={'datepick'} onDateChange={this.handleDateChange} borthDayValue={userBirthday} isShowDatePicker={isShowDatePicker}
            onShowDatePick={this.handleShowDatePick} borthYear={borthYear} borthMonth={borthMonth} borthDay={borthDay} />
        </div>
        <div className={'nickname'}>
          {this.userLoginType === 'phone' ?
            <InputComponent className={classNames('nicknameInput', 'inputDisable')} value={userAccount ? ('+' + userAccount.split('-').join(' ')) : ''} disabled={true} />
            :
            <InputComponent className={classNames('nicknameInput', 'inputDisable')} value={userAccount || ''} disabled={true} />
          }
          <span className={'nicknameLabel'}>
            {this.userLoginType === 'phone' ?
              <FormattedMessage
                defaultMessage="Mobile"
                description=""
                id="gui.loginModal.setting.phone"
              /> : 'Email'}
          </span>
        </div>
        <div className={'nickname'}>
          <InputComponent className={classNames('nicknameInput', 'inputDisable')} disabled={true} />
          <span className={'nicknameLabel'}>
            <FormattedMessage
              defaultMessage="Password"
              description=""
              id="gui.loginModal.setting.password"
            />
          </span>
          <span className={'modifyPwd'} onClick={this.handleModifyPwd}>
            <FormattedMessage
              defaultMessage="Change password"
              description=""
              id="gui.loginModal.setting.pwdModify"
            />
          </span>
        </div>
      </div>
    </ModalComponent>
  }
}

export default injectIntl(UserSettingModal)