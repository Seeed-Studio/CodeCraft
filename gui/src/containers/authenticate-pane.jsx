import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import {
    setUserTab,
    setUserInfo,
    setAuthInfo,
    setLoginStatus,
    setWillToDo,
    setForgetPassword,

    NONE_TAB_INDEX,
    LOGIN_TAB_INDEX,
    REGISTER_TAB_INDEX,
    FIND_PWD_TAB_INDEX,
    USER_SETTING_TAB_INDEX,
    MODIFY_PWD_TAB_INDEX,
    USER_TIME_OUT_TAB_INDEX
} from '../reducers/login-register-special';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';


import AuthenticateComponent from '../components/authenticate/authenticate-pane.jsx'
import { toasts } from '../components/toast-special/toast.jsx';
import { userLogout, userLoginWithPwd, queryUserBasicInfo } from '../lib/busi-proxy/busi-proxy.js';

const localeMessages = defineMessages({
    logouted: {
        defaultMessage: 'Logged out',
        description: '',
        id: 'gui.loginModal.logouted'
    },
    logoutFail: {
        defaultMessage: 'Logout failure',
        description: '',
        id: 'gui.loginModal.logoutFail'
    },
    unregistered: {
        defaultMessage: 'Account unregistered',
        description: '',
        id: 'gui.loginModal.unregistered'
    }
});

class AuthenticatePane extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'handleToRegister',
            'handleToFindPassword',
            'handleToLogin',
            'handleRequestClose',
            'handleSetUserInfo',
            'handleSetAuthInfo',
            'handleSetLoginStatus',
            'handleComfirmLoginOut',
            'handleToUserSetting',
            'handleToModifyPwd',
            'handleToLoginTimeout',
            'handleLoignUnName',
            'getModifyCountDown',
            'clearModifyTimer',
            'userPhoneChange',
            'userAccountChange',
            'userEmailChange',
        ]);
        this.state = {
            userPhone: '',
            userAccount: '',
            userEmail: '',

            modifyPwdSeconds: 0,
            isRequest: false,
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }
    // 到注册页
    handleToRegister() {
        this.props.onActiveAuthTab(REGISTER_TAB_INDEX);
    }
    // 到找回密码页
    handleToFindPassword(selectedType) {
        this.props.onActiveAuthTab(FIND_PWD_TAB_INDEX);
        this.props.onSetForgetPassword(selectedType);
    }
    // 到登录页
    handleToLogin() {
        this.props.onActiveAuthTab(LOGIN_TAB_INDEX);
    }
    // 到用户设置页
    handleToUserSetting() {
        this.props.onActiveAuthTab(USER_SETTING_TAB_INDEX);
    }
    // 到找回密码页
    handleToModifyPwd() {
        this.props.onActiveAuthTab(MODIFY_PWD_TAB_INDEX);
    }
    // 到用户登录超时页
    handleToLoginTimeout() {
        this.props.onActiveAuthTab(USER_TIME_OUT_TAB_INDEX);
    }

    handleRequestClose() {
        /**
         *  处理回退关闭事件
         */
        this.props.onActiveAuthTab(NONE_TAB_INDEX);
        // 清空登录成功后将做的动作
        this.props.onSetWillToDo('');
    }

    handleSetUserInfo(info) {
        this.props.onSetUserInfo(info)
    }
    handleSetAuthInfo(info) {
        this.props.onSetAuthInfo(info);
    }
    handleSetLoginStatus(status) {
        this.props.onSetLoginStatus(status);
    }

    // 确认退出
    handleComfirmLoginOut() {
        if (this.state.isRequest) {
            return;
        }
        const params = {
            authInfo: this.props.authInfo,
        };

        this.setState({ isRequest: true });
        // console.log('params---', params)
        userLogout(params).then((data) => {
            toasts.success(this.props.intl.formatMessage(localeMessages.logouted));
            // 登出后关闭弹框，localStorage清空
            localStorage.removeItem('localAuthInfo');
            this.props.onSetUserInfo({});
            this.props.onSetAuthInfo({});
            this.props.onSetLoginStatus(false);

            this.handleRequestClose();
            this.setState({ isRequest: false });
            // 退出登录之后，自动登录匿名用户
            this.handleLoignUnName();
        }, (err) => {
            this.setState({ isRequest: false });
            // console.log('error', error)
            if (err.errorCode === 5010004 || err.errorCode === 1010003) {
                toasts.error(this.props.intl.formatMessage(localeMessages.unregistered))
            } else if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.handleToLoginTimeout();
            } else {
                toasts.error(this.props.intl.formatMessage(localeMessages.logoutFail))
            }
        })
    }


    // 登录匿名用户
    handleLoignUnName() {
        const loginParams = {
            userAccount: 'codecraft.chmakerd.com',
            userPwd: '123456'
        };
        userLoginWithPwd(loginParams).then((data) => {
            const params = {
                authInfo: {
                    userAccount: loginParams.userAccount,
                    userUUID: data.userUUID,
                    accessToken: data.accessToken
                }
            }
            this.handleQueryUserInfo(params);
        }, (er) => {

        });
    }
    // 查询用户信息
    handleQueryUserInfo(params) {
        // console.log('params-----', params)
        queryUserBasicInfo(params).then((data) => {

            const userBasicInfo = data.userBasicInfo;

            this.props.onSetAuthInfo(params.authInfo);
            this.props.onSetUserInfo({
              ...userBasicInfo,
              userUUID: params.authInfo.userUUID
            });

            this.props.onSetLoginStatus(false);
        }, (err) => {
            // 错误处理
        })
    }

    //  输入userphone
    userPhoneChange(value) {
        this.setState({
            userPhone: value
        })
    }
    userAccountChange(value) {
        this.setState({
            userAccount: value
        })
    }
    userEmailChange(value) {
        this.setState({
            userEmail: value
        })
    }

    // 获取修改密码短信验证码倒计时
    getModifyCountDown() {
        this.setState({
            modifyPwdSeconds: 60
        }, () => {
            this.modifyPwdSecondsTimer = setInterval(() => {
                let time = this.state.modifyPwdSeconds - 1;
                this.setState({
                    modifyPwdSeconds: time,
                }, () => {
                    if (time <= 0) {
                        clearInterval(this.modifyPwdSecondsTimer);
                    }
                })
            }, 1000);
        });
    }

    clearModifyTimer() {
        this.setState({ modifyPwdSeconds: 0 });
    }

    render() {
        // console.log('this.props.userInfo', this.props.userInfo)
        const {
            onActiveAuthTab,
            userInfo,
            authInfo,
            isOnLine,
            forgetPasswordType,
            ...componentProps
        } = this.props;

        return (
            <AuthenticateComponent
                {...componentProps}
                onToRegister={this.handleToRegister}
                onToFindPassword={this.handleToFindPassword}
                onToLogin={this.handleToLogin}
                onToModifyPwd={this.handleToModifyPwd}
                onToUserSetting={this.handleToUserSetting}
                onRequestClose={this.handleRequestClose}
                onSetUserInfo={this.handleSetUserInfo}
                onSetAuthInfo={this.handleSetAuthInfo}
                onSetLoginStatus={this.handleSetLoginStatus}
                onCancelLoginOut={this.handleRequestClose}
                onComfirmLoginOut={this.handleComfirmLoginOut}
                onToLoginTimtout={this.handleToLoginTimeout}
                onLoignUnName={this.handleLoignUnName}
                userInfo={userInfo}
                authInfo={authInfo}
                forgetPasswordType={forgetPasswordType}

                getModifyCountDown={this.getModifyCountDown}
                clearModifyTimer={this.clearModifyTimer}
                modifyPwdSeconds={this.state.modifyPwdSeconds}
                userPhoneChange={this.userPhoneChange}
                userEmailChange={this.userEmailChange}
                userPhone={this.state.userPhone}
                userAccountChange={this.userAccountChange}
                userAccount={this.state.userAccount}
                userEmail={this.state.userEmail}
                isOnLine={isOnLine}
            />
        );
    }
}

AuthenticatePane.propTypes = {
    tabIndex: PropTypes.number,
    onActiveAuthTab: PropTypes.func
};

const mapStateToProps = state => ({
    tabIndex: state.scratchGui.loginRegister.tab,
    userInfo: state.scratchGui.loginRegister.userInfo,
    authInfo: state.scratchGui.loginRegister.authInfo,
    forgetPasswordType: state.scratchGui.loginRegister.forgetPasswordType,
    isOnLine: state.scratchGui.netStatus.isOnLine,
});

const mapDispatchToProps = dispatch => ({
    onActiveAuthTab: tab => dispatch(setUserTab(tab)),
    onSetUserInfo: info => dispatch(setUserInfo(info)),
    onSetAuthInfo: info => dispatch(setAuthInfo(info)),
    onSetLoginStatus: status => dispatch(setLoginStatus(status)),
    onSetWillToDo: todo => dispatch(setWillToDo(todo)),
    onSetForgetPassword: selectedType => dispatch(setForgetPassword(selectedType)),
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticatePane));


