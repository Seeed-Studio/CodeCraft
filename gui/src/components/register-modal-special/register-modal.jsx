import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
// import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './register-modal.css';

import ModalComponent from '../../containers/modal.jsx';
// import InputComponent from '../input-special/input.jsx';
// import ButtonComponent from '../button-special/button.jsx';
import { toasts } from '../toast-special/toast.jsx';

import FirstStep from './first-step.jsx';
// import SecondStep from './second-step.jsx';
import { regExp, currentTime } from '../../lib/utils';

import ErrRemindComponent from '../err-remind-specail/index.jsx';

import {
    finishRegister,
    userLoginWithPwd,
    queryUserBasicInfo,
    saveUserSubscription,
    useInviteCode
} from '../../lib/busi-proxy/busi-proxy.js';

const localeMessages = defineMessages({
    registerTemp1: {
        id: 'gui.loginModal.registerTemp1',
        defaultMessage: 'SIGN UP'
    },
    registerTemp2: {
        id: 'gui.loginModal.registerTemp2',
        defaultMessage: 'Profile'
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
});

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleNextStep',
            'handleBackStep',
            'handleRegister',
            'handleClick',
            'onRef',
            'handleLogin',
            'hanldlePhoneInput',
            'handleInivteChange',
            'handleCheckNumInput',
            'handlePwdInput',
            'handleCountryCodeChange',
            'handleMailProtocolStateChange',
            'handleShowDatePick',
            'handleIndentitySel',
            'handleShowRemindErrMsg',
            'setSelect',
        ]);

        this.state = {
            isFirstStep: true,

            phoneNum: '',
            checkNum: '',
            pwdNum: '',
            countryCode: '',
            isShowDatePicker: false,

            selectedType: 'phone',  // email  phone

            indentity: 1,
            mailProtocolChecked: true,
            registering: false, //正在注册中
            inviteCode: '',
            topErrorMsg: "",
        }
    }

    componentDidMount() {
        const { locale } = this.props.intl;
        if (locale !== 'zh-cn') {
            this.setState({ selectedType: 'email' });
        }
    }

    handleNextStep() {
        this.setState({
            isFirstStep: false,
        })
    }

    handleBackStep() {
        this.setState({
            isFirstStep: true,
        })
    }

    onRef(ref) {
        this.child = ref;
    }
    handleClick(e) {
        if (this.child) {
            // this.child.handleHideBirthDayInput(e);
        }

        this.setState({
            isShowDatePicker: false
        })
    }
    handleShowDatePick() {
        this.setState({
            isShowDatePicker: !this.state.isShowDatePicker
        })
    }
    handleIndentitySel(v) {
        this.setState({ indentity: v });
    }

    // 手机号输入
    hanldlePhoneInput(value) {
        const { selectedType } = this.state;
        if (selectedType === 'phone') {
            value = value.replace(/[^\d]/g, '');
        } else if (selectedType === 'email') {
            value = value.replace(regExp.email, '');
        }
        this.setState({
            phoneNum: value
        })
    }
    // 验证码输入
    handleCheckNumInput(value) {
        value = value.replace(/[^\d]/g, '').substring(0, 6);

        this.setState({
            checkNum: value
        })
    }
    // 密码输入
    handlePwdInput(value) {
        value = value.replace(/[^0-9a-zA-Z]/g, '').substring(0, 20);

        this.setState({
            pwdNum: value
        })
    }
    handleCountryCodeChange(value) {
        value = value.replace(/[^\d]/g, '');

        this.setState({
            countryCode: value
        })
    }
    // 邀请码输入
    handleInivteChange(value) {
        value = value.replace(/[^0-9a-zA-Z]/g, '');
        this.setState({
            inviteCode: value
        })
    }

    handleMailProtocolStateChange(state) {
        this.setState({ mailProtocolChecked: state });
    }

    setSelect(type) {
        this.setState({ selectedType: type, phoneNum: '', checkNum: '', inviteCode: '' });
    }

    handleInputChange(value, type) {
        switch (type) {
            case 'email':
                this.setState({ emailAddress: value });
                break;
            case 'pwd':
                this.setState({ pwd: value });
                break;
            case 'repeatPwd':
                this.setState({ repeatPwd: value });
                break;
            default:
                break;
        }
    }

    /**
     * 处理注册逻辑
     */
    handleRegister() {
        //判断是否正在请求注册
        if (this.state.isRequest) {
            return
        }
        const {
            phoneNum,
            pwdNum,
            countryCode = '86',
            selectedType,
            indentity,
            mailProtocolChecked: isSigned
        } = this.state;

        const currTime = currentTime();
        const params = {
            userBasicInfo: {
                userName: 'Tinkergen',
                userNickName: 'Tinkergen',
                userBirthday: '2019-09-05',
                userSex: 1,
                registerTime: currTime,
                userIdentity: indentity == 2 ? 'S' : 'T',
                isSignedMail: isSigned
            },
            userPwd: pwdNum
        };
        if (selectedType === 'phone') {
            params.userAccount = `${countryCode == '' ? '86' : countryCode}-${phoneNum}`;
            params.userBasicInfo.userAccount = `${countryCode == '' ? '86' : countryCode}-${phoneNum}`;
        } else if (selectedType === 'email') {
            params.userAccount = phoneNum;
            params.userBasicInfo.userAccount = phoneNum;
        }
        //注册
        this.setState({ isRequest: true });
        finishRegister(params).then((data) => {
            // 注册成功之后自动登录
            let account = '';
            if (selectedType === 'phone') {
                account = `${countryCode == '' ? '86' : countryCode}-${phoneNum}`;
            } else if (selectedType === 'email') {
                account = phoneNum;
            }
            //自动登录
            //获取用户信息
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
        });
    }

    //登录
    handleLogin(userAccount, userPwd) {

        const {
            selectedType,
            indentity = 1,
            mailProtocolChecked: isSigned,
            inviteCode
        } = this.state;

        const userType = selectedType == 'email' ? 'EC' : 'C';
        const userIdentity = indentity == 2 ? 'S' : 'T';

        userLoginWithPwd({ userAccount: userAccount, userPwd: userPwd }).then((data) => {
            // 提示注册成功
            toasts.success(this.props.intl.formatMessage(localeMessages.registerSucc));
            // 登录成功，签订邮件订阅协议
            let reqParams = {
                authInfo: {
                    userUUID: data.userUUID,
                    userAccount: userAccount,
                    userType,
                    userIdentity,
                    accessToken: data.accessToken
                }
            }
            // 查询用户信息
            this.handleQueryUserInfo(reqParams);
            // 判断是否需要签订协议
            // 签订用户订阅邮件协议
            if (isSigned &&
                userType == 'EC') {
                saveUserSubscription(reqParams);
            }
            // 是否有邀请码
            if(inviteCode) {
                useInviteCode({ authInfo: reqParams.authInfo, userUUID: data.userUUID, inviteCode})
            }
        }, () => {
            toasts.error(this.props.intl.formatMessage(localeMessages.loginFail));
            this.setState({ isRequest: false });
        })
    }

    //查询用户信息
    handleQueryUserInfo(params) {
        queryUserBasicInfo(params).then((data) => {
            let { selectedType } = this.props;
            let localAuthInfo = Object.assign({}, params.authInfo, {
                userLoginType: selectedType
            });
            localStorage.setItem('localAuthInfo', JSON.stringify(localAuthInfo));
            let userBasicInfo = data.userBasicInfo;
            this.props.onSetUserInfo({
                ...userBasicInfo,
                userUUID: params.authInfo.userUUID
            });
            this.props.onSetAuthInfo(params.authInfo);
            this.props.onSetLoginStatus(true);
            this.props.onRequestClose();
            this.setState({ isRequest: false });
        }, () => {
            toasts.error(this.props.intl.formatMessage(localeMessages.getUserInfoFail));
            this.setState({ isRequest: false });
        })
    }

    handleShowRemindErrMsg(content) {
        if (this.remindTimer) {
            clearTimeout(this.remindTimer);
        }
        this.setState({ topErrorMsg: content });
        this.remindTimer = setTimeout(() => {
            this.setState({ topErrorMsg: '' });
        }, 2500);
    }

    render() {
        const { selectedType, isFirstStep, emailErrMsg, pwdErrMsg, repeatPwdErrMsg, emailAddress, pwd, repeatPwd, topErrorMsg, inviteCode} = this.state;
        const { locale } = this.props.intl;

        return <ModalComponent
            // title={isFirstStep ? this.props.intl.formatMessage(localeMessages.registerTemp1) : this.props.intl.formatMessage(localeMessages.registerTemp2)}
            title={this.props.intl.formatMessage(localeMessages.registerTemp1)}
            isOpen={true}
            className={styles.registerModal}
            // showClose={isFirstStep ? true : false}
            // showReturn={isFirstStep ? false : true}
            showClose={true}
            showReturn={false}
            toBack={this.handleBackStep}
            onRequestClose={this.props.onRequestClose}
            isBackdrop={false}
            visiableTitle={true}
            id='registerModal'
            contentLabel='registerModal'

            onClick={this.handleClick}
        >
            <div className={styles.registerContainer}>
                <ErrRemindComponent errComponentMsg={topErrorMsg} />
                {/* {isFirstStep && ##} */}
                <div>
                    {locale === 'zh-cn' ? <div className={styles.tabSelect}>
                        <div className={classNames(styles.tab, selectedType === 'phone' && styles.tabSelected)} onClick={() => this.setSelect('phone')}>
                            {/* <span className={classNames(styles.tabText, selectedType === 'phoneNum' && styles.tabTextSelected)} onClick={() => this.setSelect('phoneNum')}> */}
                            <FormattedMessage
                                defaultMessage="Sign up with Phone Number"
                                description=""
                                id="gui.registerModal.phone"
                            />
                            {/* </span> */}
                        </div>
                        <div className={classNames(styles.tab, selectedType === 'email' && styles.tabSelected)} onClick={() => this.setSelect('email')}>
                            {/* <span className={classNames(styles.tabText, selectedType === 'account' && styles.tabTextSelected)} onClick={() => this.setSelect('account')}> */}
                            <FormattedMessage
                                defaultMessage="Sign up with Phone email"
                                description=""
                                id="gui.registerModal.email"
                            />
                            {/* </span> */}
                        </div>
                    </div> : <div style={{ height: '1rem' }}></div>}
                    <FirstStep
                        onNextStep={this.handleRegister}
                        toLogin={this.props.toLogin}
                        onPhoneInput={this.hanldlePhoneInput}
                        onCheckNumInput={this.handleCheckNumInput}
                        onPwdInput={this.handlePwdInput}
                        onCountryCodeChange={this.handleCountryCodeChange}
                        onMailProtocolStateChange={this.handleMailProtocolStateChange}
                        onIndentitySel={this.handleIndentitySel}
                        phoneNum={this.state.phoneNum}
                        checkNum={this.state.checkNum}
                        pwdNum={this.state.pwdNum}
                        countryCode={this.state.countryCode}
                        selectedType={selectedType}
                        onShowRemindErrMsg = {this.handleShowRemindErrMsg}
                        onInivteChange={this.handleInivteChange}
                        inviteCode={inviteCode}
                        isOnLine = {this.props.isOnLine}
                    />
                </div>

                {/* {!isFirstStep && <SecondStep onRef={this.onRef}
                    phoneNum={this.state.phoneNum}
                    pwdNum={this.state.pwdNum}
                    toLogin={this.props.toLogin}
                    onRequestClose={this.props.onRequestClose}
                    onSetUserInfo={this.props.onSetUserInfo}
                    onSetAuthInfo={this.props.onSetAuthInfo}
                    onSetLoginStatus={this.props.onSetLoginStatus}
                    authInfo={this.props.authInfo}
                    countryCode={this.state.countryCode}
                    handleShowDatePick={this.handleShowDatePick}
                    isShowDatePicker={this.state.isShowDatePicker}
                    selectedType={selectedType}
                />} */}

                <div className={styles.toLogin}>
                    <FormattedMessage
                        defaultMessage="Already have an account? "
                        description=""
                        id="gui.registerModal.registered"
                    />
                    <span onClick={this.props.toLogin} className={styles.toLoginText}>
                        <FormattedMessage
                            defaultMessage="Login"
                            description=""
                            id="gui.registerModal.toLogin"
                        />&gt;
                    </span>
                </div>
            </div>

        </ModalComponent>
    }
}

export default injectIntl(RegisterModal);