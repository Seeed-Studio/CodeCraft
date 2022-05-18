import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './find-pwd.css';
import Box from '../box/box.jsx';
import ModalComponent from '../../containers/modal.jsx';
import InputComponent from '../input-special/input.jsx';
import ButtonComponent from '../button-special/button.jsx';
import { toasts } from '../toast-special/toast.jsx';
import { regExp, checkEmail } from '../../lib/utils';

import { applyFindPwdSMSCode, checkFindPwdSMSCode, finishFindPwd, userLoginWithPwd, queryUserBasicInfo } from '../../lib/busi-proxy/busi-proxy.js';

const localeMessages = defineMessages({
  title: {
    id: 'gui.loginModal.findPwdTitle',
    defaultMessage: 'RETRIEVE PASSWORD'
  },
  inputVerifiCodePrompt: {
    id: 'gui.loginModal.inputVerifiCodePrompt',
    defaultMessage: 'Please enter your verification code.'
  },
  inputPwdPrompt: {
    id: 'gui.loginModal.inputPwdPrompt',
    defaultMessage: 'Password (6-20 digits of letters and numbers)'
  },
  inputPhonePrompt: {
    id: 'gui.loginModal.inputPhonePrompt',
    defaultMessage: 'Please enter your phone number.'
  },
  inputAcountPrompt: {
    id: 'gui.loginModal.inputAcountPrompt',
    defaultMessage: 'Input account'
  },
  inputLoginPwdPrompt: {
    id: 'gui.loginModal.inputLoginPwdPrompt',
    defaultMessage: 'Input your password'
  },
  inputPwdPlaceholder: {
    id: 'gui.loginModal.inputPwdPlaceholder',
    defaultMessage: '6-20 digits (letters and numbers)'
  },
  operateFail: {
    defaultMessage: 'Failed',
    description: '',
    id: 'gui.connectModal.operateFail'
  },
  messageSendFail: {
    defaultMessage: 'Verification code failed to send',
    description: '',
    id: 'gui.findPasswordModal.messageSendFail'
  },
  pwdModifySucc: {
    defaultMessage: 'Password changed successfully',
    description: '',
    id: 'gui.findPasswordModal.pwdModifySucc'
  },
  pwdModifyFail: {
    defaultMessage: 'Password change failed',
    description: '',
    id: 'gui.findPasswordModal.pwdModifyFail'
  },
  phoneUnregistered: {
    defaultMessage: 'This phone number is not registered.',
    description: '',
    id: 'gui.findPasswordModal.phoneUnregistered'
  },
  emailUnregistered: {
    defaultMessage:`This Email did not exist, pls check it again.`,
    description: '',
    id: 'gui.findPasswordModal.emailUnregistered'
  },
  unableChange: {
    defaultMessage: 'Before you change your password, you must be verified by SMS.',
    description: '',
    id: 'gui.findPasswordModal.unableChange'
  },
  sendMessageFail: {
    defaultMessage: 'Suceed to set the password, but the notification message failed to send',
    description: '',
    id: 'gui.findPasswordModal.sendMessageFail'
  },
  verificationCodeError: {
    defaultMessage: 'Please input a correct verification code',
    description: '',
    id: 'gui.loginModal.verificationCodeError'
  },
  phone: {
    defaultMessage: 'Phone',
    description: '',
    id: 'gui.loginModal.phone'
  },
  enterValidateEmail: {
    defaultMessage: 'Please enter a valid email address',
    id: 'gui.loginModal.enterValidateEmail'
  },
  enterEmail: {
    defaultMessage: 'Please enter your email address.',
    id: 'gui.findPasswordModal.enterEmail'
  },
  enterYourEmail: {
    defaultMessage: 'Please enter your email address.',
    id: 'gui.findPasswordModal.enterYourEmail'
  },
  requiredFiled: {
    defaultMessage: 'This is a required field',
    id: 'gui.loginModal.requiredFiled'
  }
});

class FindPwdModal extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'getCheckNum',
      'handleNewPwdInput',
      'handleNextStep',
      'handleBackStep',
      'handlePhoneNumChange',
      'handleCheckNumChange',
      'handleFinish',
      'handleCountryCodeChange',
      'toggleShowPwd',
      'setSelect',
      // 'setCanvas',
      // 'draw'
    ]);

    this.state = {
      hasGetCheckNum: false,
      seconds: 0,
      isFirstStep: true,
      newPwd: '',
      userAccount: '',
      checkNum: '',
      countryCode: '',
      isShowPwd: false,

      userAccountErrorMsg: '',
      smsCodeErrorMsg: '',
      isRequest: false,
      selectedType: 'email',  // email  phone

      emailSeconds: 0,

      // canvasElement: '',
    }
  }

  // componentDidUpdate() {
  //   this.draw();
  // }

  // // 绘制验证码
  // draw() {
  //   const canvas = this.state.canvasElement
  //   if (canvas && canvas.getContext) {
  //     //获取对应的CanvasRenderingContext2D对象(画笔)
  //     let ctx = canvas.getContext("2d");
  //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //     this.createCode();
  //     //设置字体样式
  //     ctx.font = "22px SourceHanSansCN-Medium";
  //     //设置描边颜色
  //     ctx.strokeStyle = "#FFB3E0";
  //     //设置描边宽度
  //     ctx.lineWidth = 4;
  //     //设置字体颜色
  //     ctx.fillStyle = "#4A69F0";
  //     //从坐标点(50,50)开始绘制文字
  //     ctx.strokeText(this.validateCode, 60, 20);
  //     ctx.fillText(this.validateCode, 60, 20);
  //   }
  // }

  // createCode() {
  //   let code = "";
  //   let codeLength = 4;//验证码的长度  
  //   let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R',
  //     'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'w', 'r',
  //     's', 't', 'u', 'v', 'w', 'x', 'y', 'z');//随机数  
  //   for (let i = 0; i < codeLength; i++) {
  //     let index = Math.floor(Math.random() * 60);
  //     code += ' ' + random[index];
  //   }
  //   this.validateCode = code;
  //   return code;
  // }


  // setCanvas(element) {
  //   this.setState({ canvasElement: element });
  // }

  componentDidMount() {
    const { forgetPasswordType } = this.props;
    if (forgetPasswordType) {
      this.setState({ selectedType: forgetPasswordType });
    }
  }

  // 获取验证码，发出短信
  getCheckNum() {
    if (this.state.isRequest) {
      return
    }
    this.setState({
      userAccountErrorMsg: '',
      smsCodeErrorMsg: ''
    })
    let { countryCode, userAccount, seconds, emailSeconds, selectedType } = this.state;
    if (countryCode === '') {
      countryCode = '86';
    }
    if (!userAccount) {
      this.setState({
        // userAccountErrorMsg: selectedType === 'phone' ? this.props.intl.formatMessage(localeMessages.inputPhonePrompt) : this.props.intl.formatMessage(localeMessages.enterEmail)
        userAccountErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
      });
      return;
    }

    const loginNeterr = (
      <div className={styles.findpwdNeterr}>
        <FormattedMessage
          defaultMessage="Network error, please check your network."
          id="gui.net.errorMessage"
        />
      </div>
    );

    if (selectedType === 'phone') {     // 手机找回密码//////////////////////////////////////////////////////////
      if (userAccount && seconds <= 0) {
        if (!this.props.isOnLine) {
          toasts.showCustom(loginNeterr)
          return;
        }
        this.setState({ isRequest: true });
        const params = { userAccount: countryCode + '-' + userAccount };
        applyFindPwdSMSCode(params).then((data) => {
          this.setState({
            hasGetCheckNum: true,
            seconds: 60,
            isRequest: false
          });
          this.timer = setInterval(() => {
            let time = this.state.seconds - 1;
            this.setState({
              seconds: time,
            }, () => {
              if (time <= 0) {
                clearInterval(this.timer);
                this.setState({
                  hasGetCheckNum: false,
                });
              }
            })
          }, 1000);
        }, (err) => {
          this.setState({ isRequest: false });
          // 获取短信登录码失败
          if (err.errorCode === 5010004 || err.errorCode === 1010003) {
            this.setState({
              userAccountErrorMsg: this.props.intl.formatMessage(selectedType === 'phone' ? localeMessages.phoneUnregistered : localeMessages.emailUnregistered)
            })
          } else if (err.errorCode === 1010009) {
            this.setState({
              userAccountErrorMsg: this.props.intl.formatMessage(localeMessages.messageSendFail)
            })
          } else {
            toasts.error(this.props.intl.formatMessage(localeMessages.messageSendFail));
          }
        })
      }
    } else if (selectedType === 'email') {    // email找回//////////////////////////////////////////////
      if (userAccount && emailSeconds <= 0) {
        if (!this.props.isOnLine) {
          toasts.showCustom(loginNeterr)
          return;
        }
        this.setState({ isRequest: true });
        const params = { userAccount: userAccount };
        applyFindPwdSMSCode(params).then((data) => {
          this.setState({
            emailSeconds: 60,
            isRequest: false
          });
          this.emailTimer = setInterval(() => {
            let time = this.state.emailSeconds - 1;
            this.setState({
              emailSeconds: time,
            }, () => {
              if (time <= 0) {
                clearInterval(this.emailTimer);
              }
            })
          }, 1000);
        }, (err) => {
          this.setState({ isRequest: false });
          // 获取短信登录码失败
          if (err.errorCode === 5010004 || err.errorCode === 1010003) {
            this.setState({
              userAccountErrorMsg: this.props.intl.formatMessage(selectedType === 'phone' ? localeMessages.phoneUnregistered : localeMessages.emailUnregistered)
            })
          } else if (err.errorCode === 1010009) {
            this.setState({
              userAccountErrorMsg: this.props.intl.formatMessage(localeMessages.messageSendFail)
            })
          } else {
            toasts.error(this.props.intl.formatMessage(localeMessages.messageSendFail));
          }
        })
      }
    }
  }

  handleNextStep() {
    if (this.state.isRequest) {
      return
    }
    this.setState({
      userAccountErrorMsg: '',
      smsCodeErrorMsg: ''
    });
    let { countryCode, userAccount, checkNum, selectedType } = this.state;
    if (countryCode === '') {
      countryCode = '86';
    }
    if (!userAccount) {
      this.setState({
        // userAccountErrorMsg: selectedType === 'phone' ? this.props.intl.formatMessage(localeMessages.inputPhonePrompt) : this.props.intl.formatMessage(localeMessages.enterEmail)
        userAccountErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
      })
      return;
    }
    if (userAccount && (selectedType === 'email') && !checkEmail(userAccount)) {
      this.setState({
        userAccountErrorMsg: this.props.intl.formatMessage(localeMessages.enterValidateEmail)
      })
      return;
    }
    if (!checkNum) {
      this.setState({
        // smsCodeErrorMsg: this.props.intl.formatMessage(localeMessages.inputVerifiCodePrompt)
        smsCodeErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
      })
      return;
    }

    if (userAccount && checkNum) {
      const params = {
        smsCode: checkNum
      }
      if (selectedType === 'phone') {
        params.userAccount = countryCode + '-' + userAccount;
      } else if (selectedType === 'email') {
        params.userAccount = userAccount;
      }
      const loginNeterr = (
        <div className={styles.findpwdNeterr}>
          <FormattedMessage
            defaultMessage="Network error, please check your network."
            id="gui.net.errorMessage"
          />
        </div>
      );
      if (!this.props.isOnLine) {
        toasts.showCustom(loginNeterr)
        return;
      }
      this.setState({ isRequest: true });
      checkFindPwdSMSCode(params).then((data) => {
        // 进入下一步
        this.setState({
          isRequest: false,
          isFirstStep: false,
          seconds: 0,
          emailSeconds: 0,
        })
      }, (err) => {
        this.setState({ isRequest: false });
        if (err.errorCode === 5010004 || err.errorCode === 1010003) {
          this.setState({
            smsCodeErrorMsg: this.props.intl.formatMessage(selectedType === 'phone' ? localeMessages.phoneUnregistered : localeMessages.emailUnregistered)
          })
        } else if (err.errorCode === 1010007) {
          this.setState({
            smsCodeErrorMsg: this.props.intl.formatMessage(localeMessages.verificationCodeError)
          })
        } else {
          // 显示提示信息
          toasts.error(this.props.intl.formatMessage(localeMessages.operateFail))
        }
      })
    }
  }
  handleBackStep() {
    this.setState({
      isFirstStep: true,
    })
  }

  handlePhoneNumChange(value) {
    const { selectedType } = this.state;
    if (selectedType === 'phone') {
      value = value.replace(/[^\d]/g, '');
    } else if (selectedType === 'email') {
      value = value.replace(regExp.email, '');
    }
    this.setState({
      userAccount: value,
      userAccountErrorMsg: ''
    })
  }

  handleCheckNumChange(value) {
    value = value.replace(/[^\d]/g, '').substring(0, 6);
    this.setState({
      checkNum: value,
      smsCodeErrorMsg: ''
    })
  }

  handleNewPwdInput(value) {
    value = value.replace(/[^0-9a-zA-Z]/g, '').substring(0, 20);
    this.setState({
      newPwd: value
    })
  }

  // 完成密码更改
  handleFinish() {
    if (this.state.isRequest) {
      return
    }
    let { countryCode, userAccount, newPwd, selectedType } = this.state;
    if (countryCode === '') {
      countryCode = '86'
    }
    if (userAccount && newPwd) {
      this.setState({ isRequest: true });
      const params = { newPwd };
      if (selectedType === 'phone') {
        params.userAccount = countryCode + '-' + userAccount;
      } else if (selectedType === 'email') {
        params.userAccount = userAccount;
      }
      finishFindPwd(params).then((data) => {
        toasts.success(this.props.intl.formatMessage(localeMessages.pwdModifySucc));
        // this.props.toLogin();
        this.handleLogin(params.userAccount, newPwd);
        // 找回密码
      }, (err) => {
        this.setState({ isRequest: false });
        if (err.errorCode === 5010004 || err.errorCode === 1010003) {
          toasts.error(this.props.intl.formatMessage(selectedType === 'phone' ? localeMessages.phoneUnregistered : localeMessages.emailUnregistered));
        } else if (err.errorCode === 1010008 || err.errorCode === 1010010) {
          // 帐户超时
          this.props.onToLoginTimtout()
        } else if (err.errorCode === 5010010) {
          toasts.error(this.props.intl.formatMessage(localeMessages.unableChange));
        } else if (err.errorCode === 1010004) {
          toasts.error(this.props.intl.formatMessage(localeMessages.sendMessageFail));
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.pwdModifyFail));
        }
      })
    }
  }

  // 登录
  handleLogin(userAccount, userPwd) {
    const params = { userAccount, userPwd };

    userLoginWithPwd(params).then((data) => {
      // toasts.success('注册成功，已自动登录');

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
      // toasts.error('操作失败');
    })
  }

  // 查询用户信息
  handleQueryUserInfo(params) {
    // console.log('params-----', params)
    queryUserBasicInfo(params).then((data) => {
      // 本地保存用户名
      const { selectedType } = this.state;
      let userLoginType = '';
      if (selectedType === 'email') {
        userLoginType = 'email';
      } else {
        userLoginType = 'phone';
      }
      const localAuthInfo = Object.assign({}, params.authInfo, {
        userLoginType
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
      // toasts.error('操作失败');
    })
  }


  handleCountryCodeChange(value) {
    value = value.replace(/[^\d]/g, '');
    this.setState({
      countryCode: value,
      userAccountErrorMsg: ''
    })
  }

  toggleShowPwd() {
    this.setState({
      isShowPwd: !this.state.isShowPwd
    })
  }

  handleClearErrMsg() {
    this.setState({
      userAccountErrorMsg: '',
      smsCodeErrorMsg: '',
      userAccount: '',
      checkNum: '',
    })
  }

  setSelect(type) {
    if (this.state.selectedType !== type) {
      this.setState({ selectedType: type });
      this.handleClearErrMsg();
    }
  }

  render() {
    const { userAccount, newPwd, isShowPwd, smsCodeErrorMsg, userAccountErrorMsg, selectedType, isFirstStep, emailSeconds } = this.state;
    const { locale } = this.props.intl;

    return <ModalComponent
      title={this.props.intl.formatMessage(localeMessages.title)}
      isOpen={true}
      className={styles.findPwdModal}   //: styles.modifyPwdModal
      showReturn={true}
      toBack={this.state.isFirstStep ? this.props.toLogin : this.handleBackStep}
      // onRequestClose={this.props.onRequestClose}
      visiableTitle={true}
      id='findPwdModal'
      contentLabel='finPwdModal'
    >
      <div className={styles.registerContainer}>
        {isFirstStep && <div>
          {locale === 'zh-cn' ? <div className={styles.tabSelect}>
            <div className={classNames(styles.tab, selectedType === 'email' && styles.tabSelected)} onClick={() => this.setSelect('email')}>
              {/* <span className={classNames(styles.tabText, selectedType === 'account' && styles.tabTextSelected)} onClick={() => this.setSelect('account')}> */}
              <FormattedMessage
                defaultMessage="Retrieve password by email"
                description=""
                id="gui.findPasswordModal.findWithEmail"
              />
              {/* </span> */}
            </div>
            <div className={classNames(styles.tab, selectedType === 'phone' && styles.tabSelected)} onClick={() => this.setSelect('phone')}>
              {/* <span className={classNames(styles.tabText, selectedType === 'phoneNum' && styles.tabTextSelected)} onClick={() => this.setSelect('phoneNum')}> */}
              <FormattedMessage
                defaultMessage="Retrieve password by phone"
                description=""
                id="gui.findPasswordModal.findWithPhone"
              />
              {/* </span> */}
            </div>
          </div> : <div style={{ height: '1rem' }}></div>}

          {/* {selectedType === 'email' && <div>
            <div className={styles.findPwdRemind}>请输入你注册时使用的Email地址，来收取你的新密码邮件</div>
            <div className={styles.label} style={{ marginTop: '0.5rem' }}>Email</div>
            <InputComponent placeholder={'请输入您的Email地址'} />
            <div className={styles.label} style={{ marginTop: '1rem' }}>图片验证</div>
            <InputComponent placeholder={'请输入下图中的字母或数字'} />
            <div className={styles.validateNumContainer}>
              <div className={styles.getValidatePic} onClick={this.draw}>获取新图</div>
              <div className={styles.validatePic}>
                <Box
                  componentRef={this.setCanvas}
                  element="canvas"
                  height={200}
                  width={200}
                />
              </div>
            </div>

            <div className={styles.btnContainer}>
              <ButtonComponent className={styles.nextStepBtn}>
                下一步
            </ButtonComponent>
            </div>
          </div>} */}
          {this.state.isFirstStep && <div className={styles.findPwdContainer}>
            <div className={styles.findPwdRemind}>
              {selectedType === 'phone' ?
                <span>
                  <FormattedMessage
                    defaultMessage="Please enter your phone number below to receive a new password message."
                    description=""
                    id="gui.findPasswordModal.receiveSMC"
                  />
                  <br />
                  <FormattedMessage
                    defaultMessage="Note: Only support for phone number of mainland China."
                    description=""
                    id="gui.findPasswordModal.remind"
                  />
                </span>
                :
                <span>
                  <FormattedMessage
                    defaultMessage="Please enter your account email address below to receive a new password email."
                    description=""
                    id="gui.findPasswordModal.receiveEmail"
                  />
                </span>
              }
            </div>
            <div className={styles.label} style={{ marginTop: '0.5rem' }}>{selectedType === 'phone' ? this.props.intl.formatMessage(localeMessages.phone) : 'Email'}</div>
            <div className={styles.inputPhoneNum}>
              {/* <InputComponent placeholder={'请输入手机号'} onChange={this.handlePhoneNumChange} /> */}
              {selectedType === 'phone' && <span>
                <span className={styles.countryCodeInputAdd}>+</span>
                <InputComponent className={classNames(styles.countryCodeInput, userAccountErrorMsg !== '' && styles.redBorder)} maxLength={4} placeholder={'86'} onChange={this.handleCountryCodeChange} value={this.state.countryCode} />
                <span className={styles.line}>-</span>
              </span>}

              <InputComponent
                className={classNames(selectedType === 'phone' ? styles.phoneNumInput : styles.emailInput, userAccountErrorMsg !== '' && styles.redBorder)}
                maxLength={selectedType === 'phone' ? 11 : 500}
                placeholder={selectedType === 'phone' ? this.props.intl.formatMessage(localeMessages.inputPhonePrompt) : 'Email'}
                onChange={this.handlePhoneNumChange} value={userAccount} />
              {selectedType !== 'phone' && (emailSeconds > 0 ? <span className={styles.emailCheckNum}>{emailSeconds}s</span> : <span className={styles.emailCheckNum} style={{top: locale === 'zh-cn' ? '0.7rem':'-1.3rem'}} onClick={this.getCheckNum}>
                <FormattedMessage
                  defaultMessage="Send a verification code to the Email"
                  description=""
                  id="gui.findPasswordModal.getVC"
                />
              </span>)}
              <div className={styles.errMsg}>{userAccountErrorMsg}</div>
            </div>
            <div className={styles.checkNum}>
              <div className={styles.label}>
                <FormattedMessage
                  defaultMessage="Verification Code"
                  description=""
                  id="gui.findPasswordModal.VC"
                />
              </div>
              <InputComponent placeholder={this.props.intl.formatMessage(localeMessages.inputVerifiCodePrompt)} className={smsCodeErrorMsg !== '' && styles.redBorder} maxLength={6} onChange={this.handleCheckNumChange} value={this.state.checkNum} />
              {selectedType === 'phone' && (this.state.hasGetCheckNum ? <span className={styles.getCheckNum}>{this.state.seconds}s</span> :
                <span className={styles.getCheckNum} onClick={this.getCheckNum}> <FormattedMessage
                  defaultMessage="Get a verification code"
                  description=""
                  id="gui.loginModal.getSMS"
                /></span>)}
              <div className={styles.errMsg}>{smsCodeErrorMsg}</div>
            </div>
            <div className={styles.nextStep}>
              {/* <div className={styles.errMsg}>{userAccountErrorMsg || smsCodeErrorMsg}</div> */}
              <ButtonComponent className={styles.nextBtn} onClick={this.handleNextStep}>
                <FormattedMessage
                  defaultMessage="Next"
                  description=""
                  id="gui.loginModal.next"
                /></ButtonComponent>
            </div>
          </div>}
        </div>}


        {!this.state.isFirstStep && <div className={styles.modifyPwdContainer}>
          <div className={styles.setNewPwd}>
            <InputComponent placeholder={this.props.intl.formatMessage(localeMessages.inputPwdPlaceholder)} maxLength={20} onChange={this.handleNewPwdInput} value={newPwd} type={isShowPwd ? 'text' : 'password'} />
            <span className={styles.setNewPwdText}>
              <FormattedMessage
                defaultMessage="Please enter your new password."
                description=""
                id="gui.loginModal.inputNewPwd"
              /></span>
            <img src={require(isShowPwd ? './icon_eye_open.png' : './icon_eye_off.png')} alt="" className={styles.showPwd} onClick={this.toggleShowPwd} />

          </div>
          <div className={styles.finish}>
            <ButtonComponent type={newPwd.length < 6 ? 'default' : 'primary'} className={styles.finishBtn} onClick={newPwd.length < 6 ? null : this.handleFinish}>
              <FormattedMessage
                defaultMessage="Complete"
                description=""
                id="gui.loginModal.findPwdCompleted"
              />
            </ButtonComponent>
          </div>
        </div>}

      </div>
    </ModalComponent>
  }
}

export default injectIntl(FindPwdModal);