import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './modify-pwd.css';

import ModalComponent from '../../containers/modal.jsx';
import InputComponent from '../input-special/input.jsx';
import ButtonComponent from '../button-special/button.jsx';
import { toasts } from '../toast-special/toast.jsx';

import { applyModifyPwdSMSCode, checkModifyPwdSMSCode, finishModifyPwd } from '../../lib/busi-proxy/busi-proxy.js';

const localeMessages = defineMessages({
  title: {
    id: 'gui.loginModal.modifyPwdTitle',
    defaultMessage: 'Change password'
  },
  inputVerifiCodePrompt: {
    id: 'gui.loginModal.inputVerifiCodePrompt',
    defaultMessage: 'Please enter your verification code.'
  },
  inputPwdPlaceholder: {
    id: 'gui.loginModal.inputPwdPlaceholder',
    defaultMessage: ' 6-20 digits (letters and numbers)'
  },
  operateFail: {
    defaultMessage: 'Failed',
    description: '',
    id: 'gui.connectModal.operateFail'
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
  verificationCodeError: {
    defaultMessage: 'Please input a correct verification code',
    description: '',
    id: 'gui.loginModal.verificationCodeError'
  }
});

class ModifyPwdModal extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleCheckNumChange',
      'getCheckNum',
      'handleNextStep',
      'handleFinish',
      'handleBackStep',
      'toggleShowPwd'
    ]);
    this.state = {
      isFirstStep: true,
      hasGetCheckNum: false,
      isInputCheckNum: false,
      checkNum: '',
      isShowPwd: false,
      checkNumErrorMsg: '',
      isRequest: false,
      isSent: false
    }
  }
  componentDidMount() {
    const localAuthInfoStr = localStorage.getItem('localAuthInfo');
    const localAuthInfo = localAuthInfoStr ? JSON.parse(localAuthInfoStr) : {};
    this.userLoginType = localAuthInfo.userLoginType;
    // this.getCheckNum();
  }

  handleCheckNumChange(value) {
    if (this.state.isFirstStep) {
      value = value.replace(/[^\d]/g, '').substring(0, 6);
    } else {
      value = value.replace(/[^0-9a-zA-Z]/g, '').substring(0, 20);
    }
    this.setState({
      checkNum: value,
      checkNumErrorMsg: ''
    })
  }
  // 回上一步
  handleBackStep() {
    this.setState({
      isFirstStep: true
    })
  }

  // 获取验证码
  getCheckNum() {
    this.setState({ isSent: true });
    if (this.state.isRequest) {
      return
    }
    this.setState({
      checkNumErrorMsg: ''
    })
    const { modifyPwdSeconds } = this.props;
    if (modifyPwdSeconds <= 0) {
      const params = {
        authInfo: this.props.authInfo,
      }
      params.authInfo.userAccount = this.props.userInfo.userAccount;
      this.setState({ isRequest: true });
      applyModifyPwdSMSCode(params).then((data) => {

        this.props.getModifyCountDown();
        this.setState({ isRequest: false });

      }, (err) => {
        this.setState({ isRequest: false });
        if (err.errorCode === 1010008 || err.errorCode === 1010010) {
          this.props.onToLoginTimtout();
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.operateFail));
        }
      });
    }
  }

  // 点击下一步，验证短信
  handleNextStep() {
    if (this.state.isRequest) {
      return
    }
    const params = {
      authInfo: this.props.authInfo,
      smsCode: this.state.checkNum
    }
    this.setState({ isRequest: true });
    checkModifyPwdSMSCode(params).then((data) => {
      this.setState({
        isFirstStep: false,
        checkNum: '',
        isRequest: false
      });
      this.props.clearModifyTimer();
    }, (err) => {
      this.setState({ isRequest: false });
      if (err.errorCode === 1010007) {
        this.setState({
          checkNumErrorMsg: this.props.intl.formatMessage(localeMessages.verificationCodeError)

        })
      } else {
        if (err.errorCode === 1010008 || err.errorCode === 1010010) {
          this.props.onToLoginTimtout();
        } else {
          toasts.error(this.props.intl.formatMessage(localeMessages.operateFail));
        }
      }
    })
  }

  // 完成密码修改
  handleFinish() {
    if (this.state.isRequest) {
      return
    }
    const params = {
      authInfo: this.props.authInfo,
      oldPwd: '',
      newPwd: this.state.checkNum
    }
    this.setState({ isRequest: true });
    finishModifyPwd(params).then((data) => {
      toasts.success(this.props.intl.formatMessage(localeMessages.pwdModifySucc));
      this.props.onRequestClose();
      this.setState({ isRequest: false });
    }, (err) => {
      this.setState({ isRequest: false });
      if (err.errorCode === 1010008 || err.errorCode === 1010010) {
        this.props.onToLoginTimtout();
      } else {
        toasts.error(this.props.intl.formatMessage(localeMessages.operateFail));
      }
    })
  }

  toggleShowPwd() {
    this.setState({
      isShowPwd: !this.state.isShowPwd
    })
  }

  render() {
    const { hasGetCheckNum, isInputCheckNum, checkNumErrorMsg, checkNum, isFirstStep, isShowPwd, isSent } = this.state;
    const { modifyPwdSeconds } = this.props;

    return <ModalComponent
      isOpen={true}
      className={styles.modifyPwdModal}   //: styles.modifyPwdModal
      showReturn={true}
      toBack={this.state.isFirstStep ? this.props.onToUserSetting : this.handleBackStep}
      // onRequestClose={this.props.onRequestClose}
      visiableTitle={true}
      title={this.props.intl.formatMessage(localeMessages.title)}
      id='modifyPwdModal'
      contentLabel='modifyPwdModal'
    >
      {isFirstStep ?
        <div className={styles.modifyPwdContainer}>
          <div className={styles.checkNum}>

            {!isSent ? 
              <div className={styles.willSend}>
                {this.userLoginType === 'phone' ? 
                  <FormattedMessage
                    defaultMessage="We will send verification code to your registered phone."
                    description=""
                    id="gui.loginModal.willSendPhone"
                  />
                  :
                  <FormattedMessage
                    defaultMessage="We will send verification code to your registered Email."
                    description=""
                    id="gui.loginModal.willSendEmail"
                  />
                }
              </div>
              :
              <div className={styles.phoneNum}>
                <div>
                  {this.userLoginType === 'phone' ?
                    <FormattedMessage
                      defaultMessage="Already sent verification code to phone:"
                      description=""
                      id="gui.loginModal.alreadySentPhone"
                    />
                    :
                    <FormattedMessage
                      defaultMessage="Already sent verification code to Email:"
                      description=""
                      id="gui.loginModal.alreadySentEmail"
                    />
                  }
                </div>
                {this.userLoginType === 'phone' ? <div className={styles.phone}>{this.props.userInfo.userAccount ? this.props.userInfo.userAccount : ''}</div> : <div className={styles.phone}>{this.props.userInfo.userAccount || ''}</div>}
              </div>
            }

            <div style={{ position: 'relative', marginTop: '0.5rem' }}>
              <InputComponent placeholder={this.props.intl.formatMessage(localeMessages.inputVerifiCodePrompt)} maxLength={6} className={classNames(styles.modifyInput, checkNumErrorMsg !== '' && styles.redBorder)} onChange={this.handleCheckNumChange} value={checkNum} />
              {modifyPwdSeconds > 0 ? <span className={styles.getCheckNum}>{modifyPwdSeconds}s</span> :
                <span className={styles.getCheckNum} onClick={this.getCheckNum}>
                  <FormattedMessage
                    defaultMessage="Get a verification code"
                    description=""
                    id="gui.loginModal.getSMS"
                  />
                </span>}
            </div>

            <div className={styles.errMsg}>{checkNumErrorMsg}</div>
          </div>
          <div className={styles.nextStep}>
            {/* <div className={styles.errMsg}>{checkNumErrorMsg}</div> */}
            <ButtonComponent disabled={checkNum.length < 4 ? true : false} className={styles.nextBtn} onClick={this.handleNextStep}>
              <FormattedMessage
                defaultMessage="next"
                description=""
                id="gui.loginModal.next"
              />
            </ButtonComponent>
          </div>
        </div>
        :
        <div className={styles.modifyPwdContainer}>
          <div className={styles.checkNum}>

            <span className={styles.phoneNum}>
              <span className={styles.phone}>
                <FormattedMessage
                  defaultMessage="Please enter your new password."
                  description=""
                  id="gui.loginModal.inputNewPwd"
                />
              </span>
            </span>
            
            <div style={{ position: 'relative', marginTop: '0.5rem' }}>
              <InputComponent placeholder={this.props.intl.formatMessage(localeMessages.inputPwdPlaceholder)} maxLength={20} className={styles.modifyInput} onChange={this.handleCheckNumChange} value={checkNum} type={isShowPwd ? 'text' : 'password'} />
              <div className={styles.errMsg}></div> {/* 占位 */}
              <img src={require(isShowPwd ? './icon_eye_open.png' : './icon_eye_off.png')} alt="" className={styles.showPwd} onClick={this.toggleShowPwd} />
            </div>
          </div>
          <div className={styles.nextStep}>
            <ButtonComponent disabled={checkNum.length < 6 ? true : false} className={styles.nextBtn} onClick={this.handleFinish}>
              <FormattedMessage
                defaultMessage="Complete"
                description=""
                id="gui.loginModal.modifyPwdCompleted"
              /></ButtonComponent>
          </div>
        </div>
      }
    </ModalComponent>
  }
}

export default injectIntl(ModifyPwdModal);