import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './login-modal.css';

import ModalComponent from '../../containers/modal.jsx';
import InputComponent from '../input-special/input.jsx';
import ButtonComponent from '../button-special/button.jsx';
import ErrRemindComponent from '../err-remind-specail/index.jsx';

import { userLoginWithPwd, applyLoginSMSCode, userLoginWithSMSCode, queryUserBasicInfo } from '../../lib/busi-proxy/busi-proxy.js';
import { regExp, checkEmail } from '../../lib/utils';
import { toasts } from '../toast-special/toast.jsx';

const localeMessages = defineMessages({
  inputVerifiCodePrompt: {
    id: 'gui.loginModal.inputVerifiCodePrompt',
    defaultMessage: 'Please enter your verification code.'
  },
  inputPwdPrompt: {
    id: 'gui.loginModal.inputPwdPrompt2',
    defaultMessage: 'Please enter your password.'
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
  messageSendFail: {
    defaultMessage: 'Verification code failed to send',
    description: '',
    id: 'gui.findPasswordModal.messageSendFail'
  },
  loginSucc: {
    defaultMessage: 'Login successful',
    description: '',
    id: 'gui.loginModal.loginSucc'
  },
  loginFail: {
    defaultMessage: 'Login failed',
    description: '',
    id: 'gui.loginModal.loginFail'
  },
  unregistered: {
    defaultMessage: 'Account unregistered',
    description: '',
    id: 'gui.loginModal.unregistered'
  },
  accountPwdError: {
    defaultMessage: 'Incorrect account or password, please try again.',
    description: '',
    id: 'gui.loginModal.accountPwdError'
  },
  emailPwdError: {
    defaultMessage: 'The username and password you entered did not match. Please double-check and try again.',
    id: 'gui.loginModal.emailPwdError'
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
  requiredFiled: {
    defaultMessage: 'This is a required field',
    id: 'gui.loginModal.requiredFiled'
  }
});

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'getCheckNum',
      'handleToRegister',
      'handleForgetPwd',
      'handleAccountChange',
      'handlePwdChange',
      'handleLogin',
      'handleQueryUserInfo',
      'handleCountryCodeChange',
      'toggleShowPwd',
      'handleKeyDown',
      'handleModalClick',
      'handleSelectClick',
      'handleSetAccountSelectedType'
    ]);

    this.state = {
      selectedType: 'account',      // account phoneNum
      accountSelectedType: 'phone', // phone email
      hasGetCheckNum: false,
      seconds: 0,

      userAccount: '',
      userPwd: '',

      accessToken: '',          // 用户登录信息 
      userUUID: '',             // 用户登录信息 
      countryCode: '',
      phoneNum: '',
      isShowPwd: false,

      accountErrorMsg: '',    //手机号相关错误提示
      pwdErrorMsg: '',        // 密码相关错误提示 
      isRequest: false,
      showSelect: false,

      errComponentMsg: ''
    }
  }

  componentDidMount() {
    if (this.props.intl.locale === 'zh-cn') {
      this.setState({ accountSelectedType: 'phone' });
    } else {
      this.setState({ accountSelectedType: 'email' });
    }
  }

  // 保存当前选择的登录方式，短信登录还是帐号密码登录
  setSelect(type) {
    if (this.state.selectedType !== type) {
      this.setState({
        selectedType: type,
        userAccount: '',
        userPwd: '',
        accountErrorMsg: '',
        pwdErrorMsg: ''
      })
    }

  }

  // 获取验证码，发出短信
  getCheckNum() {
    if (this.state.isRequest) {
      return;
    }
    this.setState({
      accountErrorMsg: '',
      pwdErrorMsg: '',
    })
    const { userPhone } = this.props;

    let { userAccount, countryCode, seconds } = this.state;
    if (countryCode === '') {
      countryCode = '86'
    }

    if ((seconds <= 0)) {
      if (!userPhone) {
        this.setState({
          // accountErrorMsg: this.props.intl.formatMessage(localeMessages.inputAcountPrompt)
          accountErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
        });
        return;
      }
      const params = { userAccount: countryCode + '-' + userPhone };
      this.setState({ isRequest: true })
      applyLoginSMSCode(params).then((data) => {
        this.setState({
          isRequest: false,
          hasGetCheckNum: true,
          seconds: 60,
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
        // 获取短信登录码失败
        this.setState({ isRequest: false });
        if (err.errorCode === 5010004) {
          this.setState({
            accountErrorMsg: this.props.intl.formatMessage(localeMessages.unregistered),
          })
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.messageSendFail));
        }
      })
    }
  }

  // 跳转到注册
  handleToRegister() {
    this.props.toRegister();
  }

  // 忘记密码
  handleForgetPwd() {
    const { selectedType, accountSelectedType } = this.state;
    let type = '';
    if (selectedType === 'account' && accountSelectedType === 'email') {
      type = 'email';
    } else {
      type = 'phone';
    }
    this.props.toFindPwd(type);
  }

  handleAccountChange(value) {
    const { selectedType, accountSelectedType } = this.state;
    if (selectedType === 'account' && accountSelectedType === 'email') {
      value = value.replace(regExp.email, '');
    } else {
      value = value.replace(/[^\d]/g, '');
    }
    this.setState({
      userAccount: value,
      accountErrorMsg: ''
    })
    if (selectedType === 'phoneNum') {
      this.props.userPhoneChange(value);
    } else if (selectedType === 'account') {
      if (accountSelectedType === 'phone') {
        this.props.userAccountChange(value);
      } else if (accountSelectedType === 'email') {
        this.props.userEmailChange(value);
      }
    }
  }

  handlePwdChange(value) {
    if (this.state.selectedType === 'phoneNum') {
      value = value.replace(/[^\d]/g, '').substring(0, 6);
    } else if (this.state.selectedType === 'account') {
      value = value.replace(/[^0-9a-zA-Z]/g, '').substring(0, 20);
    }

    this.setState({
      userPwd: value,
      pwdErrorMsg: ''
    })
  }

  handleCountryCodeChange(value) {
    value = value.replace(/[^\d]/g, '');
    this.setState({
      countryCode: value,
      accountErrorMsg: ''
    })
  }

  // 登录
  handleLogin() {
    if (this.state.isRequest) {
      return;
    }
    this.setState({
      accountErrorMsg: '',
      pwdErrorMsg: ''
    })
    let { countryCode, userPwd, selectedType, accountSelectedType } = this.state;
    const { userPhone, userAccount, userEmail } = this.props;

    if (countryCode === '') {
      countryCode = '86';
    }

    const loginNeterr = (
      <div className={styles.loginNeterr}>
        <FormattedMessage
          defaultMessage="Network error, please check your network."
          id="gui.net.errorMessage"
        />
      </div>
    );

    // 用户名密码登录
    if (selectedType === 'account') {
      let account = '';
      let flag = false;
      if (accountSelectedType === 'phone') {
        if (!userAccount) {
          this.setState({
            // accountErrorMsg: this.props.intl.formatMessage(localeMessages.inputAcountPrompt)
            accountErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
          });
          flag = true;
        }
        if (!userPwd) {
          this.setState({
            // pwdErrorMsg: this.props.intl.formatMessage(localeMessages.inputLoginPwdPrompt)
            pwdErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
          });
          flag = true;
        }
        account = countryCode + '-' + userAccount;
      } else if (accountSelectedType === 'email') {
        if (!userEmail) {
          this.setState({
            // accountErrorMsg: this.props.intl.formatMessage(localeMessages.inputAcountPrompt)
            accountErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
          });
          flag = true;
        }
        if (userEmail && !checkEmail(userEmail)) {
          this.setState({
            accountErrorMsg: this.props.intl.formatMessage(localeMessages.enterValidateEmail)
          });
          flag = true;
        }
        if (!userPwd) {
          this.setState({
            // pwdErrorMsg: this.props.intl.formatMessage(localeMessages.inputLoginPwdPrompt)
            pwdErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
          });
          flag = true;
        }
        account = userEmail;
      }

      if (flag) {
        return
      }

      if (!this.props.isOnLine) {
        toasts.showCustom(loginNeterr)
        return;
      }

      this.setState({ isRequest: true });
      const params = { userAccount: account, userPwd };

      userLoginWithPwd(params).then((data) => {
        toasts.success(this.props.intl.formatMessage(localeMessages.loginSucc));
        // 登录成功，查询用户信息
        const params = {
          authInfo: {
            userAccount: account,
            userPwd: userPwd,
            userUUID: data.userUUID,
            accessToken: data.accessToken
          }
        }
        this.handleQueryUserInfo(params);

      }, (err) => {
        this.setState({ isRequest: false });
        // 登录失败
        if (err.errorCode === 5010004) {
          this.setState({
            accountErrorMsg: this.props.intl.formatMessage(localeMessages.unregistered)
          })
        } else if (err.errorCode === 1010006) {
          this.setState({
            errComponentMsg: this.props.intl.formatMessage(accountSelectedType === 'phone' ? localeMessages.accountPwdError : localeMessages.emailPwdError)
          });
          this.handleErrRemindMsg();
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.loginFail));
        }
      })
    } else if (selectedType === 'phoneNum') {
      if (!userPhone) {
        this.setState({
          // accountErrorMsg: this.props.intl.formatMessage(localeMessages.inputPhonePrompt)
          accountErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
        });
        return;
      }
      if (!userPwd) {
        this.setState({
          // pwdErrorMsg: this.props.intl.formatMessage(localeMessages.inputVerifiCodePrompt)
          pwdErrorMsg: this.props.intl.formatMessage(localeMessages.requiredFiled)
        });
        return;
      }
      if (!this.props.isOnLine) {
        toasts.showCustom(loginNeterr)
        return;
      }
      const params = { userAccount: countryCode + '-' + userPhone, smsCode: userPwd };
      // 短信验证码登录
      userLoginWithSMSCode(params).then((data) => {
        toasts.success(this.props.intl.formatMessage(localeMessages.loginSucc));
        // 登录成功，查询用户信息
        const params = {
          authInfo: {
            userAccount: countryCode + '-' + userPhone,
            userUUID: data.userUUID,
            accessToken: data.accessToken
          }
        }
        this.handleQueryUserInfo(params);
      }, (err) => {
        this.setState({ isRequest: false });
        if (err.errorCode === 1010007) {
          this.setState({
            pwdErrorMsg: this.props.intl.formatMessage(localeMessages.verificationCodeError)
          })
        } else if (err.errorCode === 5010004) {
          this.setState({
            accountErrorMsg: this.props.intl.formatMessage(localeMessages.unregistered)
          })
        } else {
          // 错误处理
          toasts.error(this.props.intl.formatMessage(localeMessages.loginFail));
        }
      })
    }
    // }
  }

  // 查询用户信息
  handleQueryUserInfo(params) {
    // console.log('params-----', params)
    queryUserBasicInfo(params).then((data) => {
      // 本地保存用户名
      const { selectedType, accountSelectedType } = this.state;
      let userLoginType = '';
      if (selectedType === 'account' && accountSelectedType === 'email') {
        userLoginType = 'email';
      } else {
        userLoginType = 'phone';
      }
      const localAuthInfo = Object.assign({}, params.authInfo, {
        userLoginType
      });
      localStorage.setItem('localAuthInfo', JSON.stringify(localAuthInfo));

      const userBasicInfo = data.userBasicInfo;

      this.props.onSetAuthInfo(params.authInfo);
      this.props.onSetUserInfo({
        ...userBasicInfo,
        userUUID: params.authInfo.userUUID
      });

      this.props.onSetLoginStatus(true);
      this.props.onRequestClose();
      this.setState({ isRequest: false });
    }, (err) => {
      this.setState({ isRequest: false });
      // 错误处理
      // toasts.error('操作失败');
    })
  }

  // 切换密码明文显示
  toggleShowPwd() {
    this.setState({
      isShowPwd: !this.state.isShowPwd
    })
  }

  handleKeyDown(e) {
    if (e.keyCode == '13') {
      this.handleLogin();
    }
  }

  handleModalClick() {
    this.setState({ showSelect: false })
  }
  handleSelectClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showSelect: !this.state.showSelect });
  }
  handleSetAccountSelectedType(e, type) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.accountSelectedType !== type) {
      this.setState({
        accountSelectedType: type,
        showSelect: false,
        userAccount: '',
        userPwd: '',
        accountErrorMsg: '',
        pwdErrorMsg: ''
      })

    }
  }

  handleErrRemindMsg() {
    clearTimeout(this.errRemindTimer);
    this.errRemindTimer = setTimeout(() => {
      this.setState({ errComponentMsg: '' });
    }, 3000);
  }

  render() {
    const { selectedType, seconds, isShowPwd, accountErrorMsg, pwdErrorMsg, showSelect, accountSelectedType, errComponentMsg } = this.state;
    const { loginSeconds, userPhone, userAccount, userEmail } = this.props;
    const accountInput = (selectedType === 'phoneNum') ? userPhone : (accountSelectedType === 'phone' ? userAccount : userEmail);
    const isEmail = (selectedType === 'account') && (accountSelectedType === 'email') ? true : false
    const { locale } = this.props.intl;

    return <ModalComponent
      isOpen={true}
      className={styles.loginModal}
      showClose={true}
      onRequestClose={this.props.onRequestClose}
      visiableTitle={true}
      id='loginModal'
      contentLabel='loginModal'
      onKeyDown={this.handleKeyDown}
      onClick={this.handleModalClick}
    >
      <div className={styles.loginModalContainer}>
        <ErrRemindComponent errComponentMsg={errComponentMsg} />
        <div className={styles.loginTitle}>
          <FormattedMessage
            defaultMessage="SIGN IN"
            description=""
            id="gui.loginModal.loginTitle"
          />
        </div>

        { locale === 'zh-cn' && <div className={styles.tabSelect}>
          <div className={classNames(styles.tab, selectedType === 'account' && styles.tabSelected)} onClick={() => this.setSelect('account')}>
            {/* <span className={classNames(styles.tabText, selectedType === 'account' && styles.tabTextSelected)} onClick={() => this.setSelect('account')}> */}
            <FormattedMessage
              defaultMessage="Password login"
              description=""
              id="gui.loginModal.pwdLogin"
            />
            {/* </span> */}
          </div>
          <div className={classNames(styles.tab, selectedType === 'phoneNum' && styles.tabSelected)} onClick={() => this.setSelect('phoneNum')}>
            {/* <span className={classNames(styles.tabText, selectedType === 'phoneNum' && styles.tabTextSelected)} onClick={() => this.setSelect('phoneNum')}> */}
            <FormattedMessage
              defaultMessage="Log in with verification code"
              description=""
              id="gui.loginModal.SMSLogin"
            />
            {/* </span> */}
          </div>
        </div> }

        {selectedType === 'phoneNum' && <div className={styles.loginRemind}>
          <FormattedMessage
            defaultMessage="Note: Only support for phone number of mainland China."
            description=""
            id="gui.loginModal.loginAttention"
          />
        </div>}

        <div className={styles.formContainer}>
          { locale === 'zh-cn' ?
            <div className={styles.loginTypeSelect}>
              {selectedType === 'phoneNum' ? <div>{this.props.intl.formatMessage(localeMessages.phone)}</div> : <div>
                <div onClick={this.handleSelectClick}>
                  <span style={{ marginRight: '5px' }}>{accountSelectedType === 'phone' ? this.props.intl.formatMessage(localeMessages.phone) : 'Email'}</span>

                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    <img src={require('./ico-arrow.png')} alt="" className={classNames(styles.arrow)} />
                    <div className={styles.typeSelect} style={{ display: showSelect ? 'block' : 'none' }}>
                      <div className={styles.loginTriangle}></div>
                      <div onClick={(e) => this.handleSetAccountSelectedType(e, 'phone')}>{this.props.intl.formatMessage(localeMessages.phone)} {accountSelectedType === 'phone' && <img src={require('./icon-active.png')} alt="" className={styles.iconActive} />}</div>
                      <div onClick={(e) => this.handleSetAccountSelectedType(e, 'email')}>Email {accountSelectedType === 'email' && <img src={require('./icon-active.png')} alt="" className={styles.iconActive} />}</div>
                    </div>
                  </span>

                </div>
              </div>}
            </div>
            :
            <div className={styles.emailLoginRemind}>
              <FormattedMessage
                defaultMessage="If you have an account, sign in with your email address."
                description=""
                id="gui.loginModal.loginAttentionTips"
              />
            </div>
          }

          <div className={styles.userAccount}>
            {isEmail ?
              <InputComponent className={classNames(styles.emailInput, accountErrorMsg !== '' && styles.redBorder)} maxLength={500} placeholder={'Email'} onChange={this.handleAccountChange} value={accountInput} />
              :
              <div>
                <span className={styles.countryCodeInputAdd}>+</span>
                <InputComponent className={classNames(styles.countryCodeInput, accountErrorMsg !== '' && styles.redBorder)} maxLength={4} placeholder={'86'} onChange={this.handleCountryCodeChange} value={this.state.countryCode} />
                <span className={styles.line}>-</span>
                <InputComponent className={classNames(styles.phoneNumInput, accountErrorMsg !== '' && styles.redBorder)} maxLength={11} placeholder={this.props.intl.formatMessage(localeMessages.inputPhonePrompt)} onChange={this.handleAccountChange} value={accountInput} />
              </div>}
            <div className={styles.errMsg}>{accountErrorMsg}</div>
          </div>
          {locale === 'zh-cn' && <div className={styles.loginTypeSelect}>
            {selectedType === 'phoneNum' ?
              <FormattedMessage
                defaultMessage="Verification Code"
                description=""
                id="gui.loginModal.checkNum"
              /> :
              <FormattedMessage
                defaultMessage="Password"
                description=""
                id="gui.loginModal.password"
              />}
          </div>}
          <div className={styles.checkNum}>
            <InputComponent
              className={pwdErrorMsg !== '' && styles.redBorder}
              placeholder={selectedType === 'phoneNum' ? this.props.intl.formatMessage(localeMessages.inputVerifiCodePrompt) : this.props.intl.formatMessage(localeMessages.inputPwdPrompt)}
              maxLength={selectedType === 'phoneNum' ? 6 : 20}
              onChange={this.handlePwdChange}
              value={this.state.userPwd}
              type={selectedType === 'phoneNum' ? 'text' : isShowPwd ? 'text' : 'password'}
            />
            {selectedType === 'phoneNum' ?
              (seconds > 0 ? <span className={styles.getCheckNum}>{seconds}s</span> :
                <span className={styles.getCheckNum} onClick={this.getCheckNum}>
                  <FormattedMessage
                    defaultMessage="Get a verification code"
                    description=""
                    id="gui.loginModal.getSMS"
                  />
                </span>) :
              (<span className={styles.forgetPwd} onClick={this.handleForgetPwd}>
                <FormattedMessage
                  defaultMessage="Forgot your password?"
                  description=""
                  id="gui.loginModal.forgetPwd"
                />
              </span>)}
            <div className={styles.errMsg}>{pwdErrorMsg}</div>

            {selectedType === 'account' && <img src={require(isShowPwd ? './icon_eye_open.png' : './icon_eye_off.png')} alt="" className={styles.showPwd} onClick={this.toggleShowPwd} />}
          </div>

          <div className={styles.loginBtnContainer}>
            {/* <div className={styles.errMsg}>{accountErrorMsg || pwdErrorMsg}</div> */}
            <ButtonComponent className={styles.loginBtn} onClick={this.handleLogin}>
              <FormattedMessage
                defaultMessage="Login"
                description=""
                id="gui.loginModal.login"
              />
            </ButtonComponent>
          </div>

          <div className={styles.toRegister}>
            <span className={styles.toRegisterText} onClick={this.handleToRegister}>
              <FormattedMessage
                defaultMessage="Sign up"
                description=""
                id="gui.loginModal.toLogin"
              />&gt;
            </span>
          </div>

        </div>
      </div>
    </ModalComponent >
  }
}

export default injectIntl(LoginModal);