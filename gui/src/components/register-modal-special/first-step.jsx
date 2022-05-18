import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './first-step.css';

import InputComponent from '../input-special/input.jsx';
import ButtonComponent from '../button-special/button.jsx';
// import { Toast } from '../toast-special/toast.jsx';
import { regExp, checkEmail } from '../../lib/utils';

import { applyRegisterSMSCode, checkRegisterSMSCode } from '../../lib/busi-proxy/busi-proxy.js';
import { toasts } from '../toast-special/toast.jsx';

import Radio from '../radio/radio.jsx'
import RadioGroup from '../radio/radio-group.jsx';

const localeMessages = defineMessages({
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
  verificationCodeError: {
    defaultMessage: 'Please input a correct verification code',
    description: '',
    id: 'gui.loginModal.verificationCodeError'
  },
  registedToLogin: {
    defaultMessage: 'The mobile phone number has been registered, please login directly',
    description: '',
    id: 'gui.loginModal.registedToLogin'
  },
  registedToLoginEmail: {
    defaultMessage: 'The Email has been registered, please login directly',
    description: '',
    id: 'gui.loginModal.registedToLoginEmail'
  },
  inputPwdPrompt2: {
    defaultMessage: 'Please enter your password.',
    description: '',
    id: 'gui.loginModal.inputPwdPrompt2'
  },
  abusiveRegister: {
    defaultMessage: 'User account maliciously apply for registration SMS verification code',
    description: '',
    id: 'gui.loginModal.abusiveRegister'
  },
  pwdLimit: {
    defaultMessage: '6-20 digits of letters and numbers',
    description: '',
    id: 'gui.loginModal.pwdLimit'
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
  requiredFiled: {
    defaultMessage: 'This is a required field',
    id: 'gui.loginModal.requiredFiled'
  },
  indentityLabel: {
    defaultMessage: 'Status',
    id: 'gui.loginModal.registerStatus'
  },
  registerIsTeacher: {
    defaultMessage: "I'm a teacher",
    id: 'gui.loginModal.registerIsTeacher'
  },
  registerIsStudent: {
    defaultMessage: "I'm a student",
    id: 'gui.loginModal.registerIsStudent'
  },
  registerEmailAgreement: {
    defaultMessage: "Yes, I want to receive a newsletter with educational ideas.",
    id: 'gui.loginModal.registerEmailAgreement'
  },
  registerUnSelIndentity: {
    defaultMessage: "Please choose your status",
    id: 'gui.loginModal.registerUnSelIndentity'
  },
  invitationCode: {
    defaultMessage: "Invitation Code",
    id: 'gui.loginModal.invitationCode'
  },
  invitationCodeOptional: {
    defaultMessage: "Optional",
    id: 'gui.loginModal.invitationCodeOptional'
  },
});

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleNextStep',
      'getCheckNum',
      'toggleShowPwd',
      'handlePhoneChange',
      'handleSMSCodeChange',
      'handlePwdChange',
      'handleCountryCodeChange',
      'handleRadioGroupChange',
      'handleMailProtocolStateChange'
    ]);

    this.state = {
      hasGetCheckNum: false,
      seconds: 0,
      isShowPwd: false,

      accountErrorMsg: '',
      smsCodeErrorMsg: '',
      pwdErrorMsg: '',
      isRequest: false,
      emailSeconds: 0,

      activeRadio: 0,

      mailProtocolChecked: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedType !== nextProps.selectedType) {
      this.clearErrMsg();
    }
  }

  clearErrMsg() {
    this.setState({
      accountErrorMsg: '',
      smsCodeErrorMsg: '',
      pwdErrorMsg: '',
    })
  }

  // 获取短信验证码
  getCheckNum() {
    if (this.state.isRequest) {
      return
    }
    this.clearErrMsg();
    let { countryCode, phoneNum, selectedType, intl } = this.props;

    const loginNeterr = (
      <div className={styles.firstStepNeterr}>
        <FormattedMessage
          defaultMessage="Network error, please check your network."
          id="gui.net.errorMessage"
        />
      </div>
    );

    if (selectedType === 'phone') {     // 手机获取验证码//////////////////////////////////////////////////////////////////
      if (countryCode === '') {
        countryCode = '86';
      }
      if (this.state.seconds <= 0) {
        if (!phoneNum) {
          this.setState({
            // accountErrorMsg: intl.formatMessage(localeMessages.inputPhonePrompt)
            accountErrorMsg: intl.formatMessage(localeMessages.requiredFiled)
          })
          return;
        }
        if (!this.props.isOnLine) {
          toasts.showCustom(loginNeterr)
          return;
        }
        this.setState({ isRequest: true })
        const params = {
          userAccount: countryCode + '-' + phoneNum,
        }
        applyRegisterSMSCode(params).then((data) => {
          if (data.errorCode === 0) {
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
          }
        }, (err) => {
          this.setState({ isRequest: false });
          if (err.errorCode === 5010001) {
            this.setState({
              accountErrorMsg: intl.formatMessage(selectedType === 'phone' ? localeMessages.registedToLogin : localeMessages.registedToLoginEmail)
            })
          } else if (err.errorCode === 5010002) {
            this.setState({
              accountErrorMsg: intl.formatMessage(localeMessages.abusiveRegister)
            })
          } else {
            toasts.error(intl.formatMessage(localeMessages.operateFail));
          }
        });
      }

    } else if (selectedType === 'email') {   // Email获取验证码//////////////////////////////////////////////////////////////////
      if (this.state.emailSeconds <= 0) {
        if (!phoneNum) {
          this.setState({
            // accountErrorMsg: intl.formatMessage(localeMessages.enterEmail)
            accountErrorMsg: intl.formatMessage(localeMessages.requiredFiled)
          })
          return;
        }
        if (phoneNum && !checkEmail(phoneNum)) {
          this.setState({
            accountErrorMsg: intl.formatMessage(localeMessages.enterValidateEmail)
          })
          return;
        }
        if (!this.props.isOnLine) {
          toasts.showCustom(loginNeterr)
          return;
        }
        this.setState({ isRequest: true })
        const params = {
          userAccount: phoneNum,
        }
        applyRegisterSMSCode(params).then((data) => {
          if (data.errorCode === 0) {
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
          }
        }, (err) => {
          this.setState({ isRequest: false });
          if (err.errorCode === 5010001) {
            this.setState({
              accountErrorMsg: intl.formatMessage(selectedType === 'phone' ? localeMessages.registedToLogin : localeMessages.registedToLoginEmail)
            })
          } else if (err.errorCode === 5010002) {
            this.setState({
              accountErrorMsg: intl.formatMessage(localeMessages.abusiveRegister)
            })
          } else {
            toasts.error(intl.formatMessage(localeMessages.operateFail));
          }
        });
      }
    }
  }

  // 点击下一步，进行短信验证码验证
  handleNextStep() {
    if (this.state.isRequest) {
      return
    }
    this.clearErrMsg();

    let { activeRadio } = this.state;
    let { countryCode, phoneNum, checkNum, pwdNum, selectedType, intl } = this.props;
    if (!phoneNum) {
      if (selectedType === 'phone') {
        this.setState({
          // accountErrorMsg: intl.formatMessage(localeMessages.inputPhonePrompt)
          accountErrorMsg: intl.formatMessage(localeMessages.requiredFiled)
        });
      } else {
        this.setState({
          // accountErrorMsg: intl.formatMessage(localeMessages.enterEmail)
          accountErrorMsg: intl.formatMessage(localeMessages.requiredFiled)
        });
      }
      return;
    }
    if (phoneNum && (selectedType === 'email') && !checkEmail(phoneNum)) {
      this.setState({
        accountErrorMsg: intl.formatMessage(localeMessages.enterValidateEmail)
      });
      return;
    }

    if (!checkNum) {
      this.setState({
        // smsCodeErrorMsg: intl.formatMessage(localeMessages.inputVerifiCodePrompt)
        smsCodeErrorMsg: intl.formatMessage(localeMessages.requiredFiled)
      });
      return;
    }
    if (!pwdNum) {
      this.setState({
        // pwdErrorMsg: intl.formatMessage(localeMessages.inputPwdPrompt2)
        pwdErrorMsg: intl.formatMessage(localeMessages.requiredFiled)
      });
      return;
    }
    if (pwdNum.length < 6) {
      this.setState({
        pwdErrorMsg: intl.formatMessage(localeMessages.pwdLimit)
      });
      return;
    }

    //判断身份是否选中
    if (activeRadio == 0) {
      this.props.onShowRemindErrMsg(intl.formatMessage(localeMessages.registerUnSelIndentity));
      return;
    }

    if (phoneNum && checkNum) {
      const params = {
        smsCode: checkNum
      };

      if (selectedType === 'phone') {
        if (countryCode === '') {
          countryCode = '86';
        }
        params.userAccount = countryCode + '-' + phoneNum;
      } else if (selectedType === 'email') {
        params.userAccount = phoneNum;
      }
      const loginNeterr = (
        <div className={styles.firstStepNeterr}>
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
      this.setState({ isRequest: true })
      checkRegisterSMSCode(params).then((data) => {
        // 进入下一步
        this.props.onNextStep();
        this.setState({ isRequest: false, seconds: 0, emailSeconds: 0 })
      }, (err) => {
        this.setState({ isRequest: false })
        if (err.errorCode === 5010001) {
          this.setState({
            accountErrorMsg: intl.formatMessage(selectedType === 'phone' ? localeMessages.registedToLogin : localeMessages.registedToLoginEmail)
          });
        } else if (err.errorCode === 1010007) {
          this.setState({
            smsCodeErrorMsg: intl.formatMessage(localeMessages.verificationCodeError)
          });
        } else {
          toasts.error(intl.formatMessage(localeMessages.operateFail));
        }
      });
    }
  }
  toggleShowPwd() {
    this.setState({
      isShowPwd: !this.state.isShowPwd
    })
  }

  handleCountryCodeChange(value) {
    this.props.onCountryCodeChange(value);
    this.setState({
      accountErrorMsg: ''
    })
  }

  handlePhoneChange(value) {
    this.props.onPhoneInput(value);
    this.setState({
      accountErrorMsg: ''
    })
  }
  handleSMSCodeChange(value) {
    this.props.onCheckNumInput(value);
    this.setState({
      smsCodeErrorMsg: '',
    })
  }
  handlePwdChange(value) {
    this.props.onPwdInput(value);
    this.setState({
      pwdErrorMsg: '',
    })
  }
  handleRadioGroupChange(v) {
    this.setState({ activeRadio: v });
    this.props.onIndentitySel(v);
  }
  handleMailProtocolStateChange(e) {
    let checked = e && e.target.checked;
    this.setState({ mailProtocolChecked: checked });
    this.props.onMailProtocolStateChange(checked);
  }

  render() {
    const { hasGetCheckNum, seconds, emailSeconds, isShowPwd, accountErrorMsg, smsCodeErrorMsg, pwdErrorMsg, activeRadio, mailProtocolChecked } = this.state;
    const { phoneNum, selectedType, inviteCode, onInivteChange, intl } = this.props;
    const { locale } = this.props.intl;

    return <div className={styles.firstStepContainer}>
      <div className={styles.label}>{selectedType === 'phone' ? intl.formatMessage(localeMessages.phone) : 'Email'}</div>
      <div className={styles.inputPhoneNum}>
        {selectedType === 'phone' && <span>
          <span className={styles.countryCodeInputAdd}>+</span>
          <InputComponent className={classNames(styles.countryCodeInput, accountErrorMsg !== '' && styles.redBorder)} maxLength={4} placeholder={'86'} onChange={this.handleCountryCodeChange} value={this.props.countryCode} />
          <span className={styles.line}>-</span>
        </span>}

        <InputComponent className={classNames(selectedType === 'phone' ? styles.phoneNumInput : styles.emailInput, accountErrorMsg !== '' && styles.redBorder)} maxLength={selectedType === 'phone' ? 11 : 500}
          placeholder={selectedType === 'phone' ? intl.formatMessage(localeMessages.inputPhonePrompt) : 'Email'} onChange={this.handlePhoneChange} value={this.props.phoneNum} />
        {/* <InputComponent placeholder={'请输入手机号'} onChange={this.props.onPhoneInput} /> */}
        {selectedType !== 'phone' && (emailSeconds > 0 ? <span className={styles.emailCheckNum}>{emailSeconds}s</span> : <span className={styles.emailCheckNum} style={{ top: locale === 'zh-cn' ? '0.7rem' : '-1.3rem' }} onClick={this.getCheckNum}>
          <FormattedMessage
            defaultMessage="Send a verification code to the Email"
            description=""
            id="gui.findPasswordModal.getVC"
          />
        </span>)}
        <div className={styles.errMsg}>{accountErrorMsg}</div>
      </div>

      <div className={styles.checkNum}>
        <div className={styles.label}>
          <FormattedMessage
            defaultMessage="Verification Code"
            description=""
            id="gui.findPasswordModal.VC"
          />
        </div>
        <InputComponent className={smsCodeErrorMsg !== '' && styles.redBorder} placeholder={intl.formatMessage(localeMessages.inputVerifiCodePrompt)} maxLength={6} value={this.props.checkNum} onChange={this.handleSMSCodeChange} />
        {selectedType === 'phone' && (hasGetCheckNum ? <span className={styles.getCheckNum}>{seconds}s</span> :
          <span className={styles.getCheckNum} onClick={this.getCheckNum}>
            <FormattedMessage
              defaultMessage="Get a verification code"
              description=""
              id="gui.loginModal.getSMS"
            />
          </span>)}
        <div className={styles.errMsg}>{smsCodeErrorMsg}</div>
      </div>

      <div className={styles.setPwd}>
        <div className={styles.label}>
          <FormattedMessage
            defaultMessage="password"
            description=""
            id="gui.loginModal.password"
          />
        </div>
        <InputComponent className={pwdErrorMsg !== '' && styles.redBorder} placeholder={intl.formatMessage(localeMessages.inputPwdPrompt)} maxLength={20} value={this.props.pwdNum} onChange={this.handlePwdChange} type={isShowPwd ? 'text' : 'password'} />
        <div className={styles.errMsg}>{pwdErrorMsg}</div>
        <img src={require(isShowPwd ? './icon_eye_open.png' : './icon_eye_off.png')} alt="" className={styles.showPwd} onClick={this.toggleShowPwd} />
      </div>

      <div className={styles.setIndentity}>
        <span className={styles.label} style={{ marginRight: "20px", marginTop: "-2px" }}>
          {intl.formatMessage(localeMessages.indentityLabel)}
        </span>
        <RadioGroup onChange={this.handleRadioGroupChange} active={activeRadio}>
          <Radio value={1}>{intl.formatMessage(localeMessages.registerIsTeacher)}</Radio>
          <Radio value={2}>{intl.formatMessage(localeMessages.registerIsStudent)}</Radio>
        </RadioGroup>
      </div>


      <div className={ styles.inviteCode }>
        <span className={ styles.inviteText }>{intl.formatMessage(localeMessages.invitationCode)}</span>
        <InputComponent
          value={ inviteCode }
          placeholder = { intl.formatMessage(localeMessages.invitationCodeOptional) }
          onChange={onInivteChange}
          maxLength={ 5 }
        />
      </div>

      {
        selectedType === 'email' &&
        <div className={styles.mailProtocol}>
          <p>
            <input type="checkbox" checked={mailProtocolChecked} onChange={this.handleMailProtocolStateChange} />
            <span>{intl.formatMessage(localeMessages.registerEmailAgreement)}</span>
          </p>
        </div>
      }
      <div className={styles.nextStep}>
        {/* <div className={styles.errMsg}>{accountErrorMsg || smsCodeErrorMsg || pwdErrorMsg}</div> */}
        <ButtonComponent className={styles.nextBtn} onClick={this.handleNextStep}>
          {/* <FormattedMessage
            defaultMessage="next"
            description=""
            id="gui.loginModal.next"
          /> */}
          <FormattedMessage
            defaultMessage="Hooray! You're all set!"
            description=""
            id="gui.loginModal.registerCompleted"
          />
        </ButtonComponent>
      </div>
    </div>
  }
}

export default injectIntl(FirstStep);