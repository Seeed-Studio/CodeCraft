import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';

import LoginModal from '../login-modal-special/login-modal.jsx';
import RegisterModal from '../register-modal-special/register-modal.jsx';
import FindPwdModal from '../find-pwd-special/find-pwd.jsx';
import LoginOutModal from '../loginout-modal-special/loginout-modal.jsx';
import UserSettingModal from '../user-setting-special/user-setting.jsx';
import ModifyPwdModal from '../modify-pwd-special/modify-pwd.jsx';
import LoginTimeoutModal from '../login-timeout-modal-special/login-timeout-modal.jsx';
import InviteCodeModal from '../invite-code-modal/invite-code-modal.jsx';

import {
    LOGIN_TAB_INDEX,
    REGISTER_TAB_INDEX,
    FIND_PWD_TAB_INDEX,
    LOGIN_OUT_TAB_INDEX,
    USER_SETTING_TAB_INDEX,
    MODIFY_PWD_TAB_INDEX,
    USER_TIME_OUT_TAB_INDEX,
    USER_INVITATION_TAB_INDEX
} from '../../reducers/login-register-special';

import styles from './authenticate-pane.css';

const AuthenticatePane = (props) => {
    const {
        onToRegister,
        onToFindPassword,
        onToLogin,
        onRequestClose,
        onSetUserInfo,
        onSetAuthInfo,
        onToModifyPwd,
        onToUserSetting,
        tabIndex,
        onCancelLoginOut,
        onComfirmLoginOut,
        authInfo,
        userInfo,
        onSetLoginStatus,
        onToLoginTimtout,
        onLoignUnName,

        getModifyCountDown,
        clearModifyTimer,
        modifyPwdSeconds,
        getLoginCountDown,
        loginSeconds,
        userPhoneChange,
        userPhone,
        userAccountChange,
        userEmailChange,
        userEmail,
        userAccount,
        forgetPasswordType,
        isOnLine
    } = props;

    return (
        <Box
            className={styles.authContainer}
        >
            {tabIndex === LOGIN_TAB_INDEX &&
                <LoginModal
                    onRequestClose={onRequestClose}
                    toRegister={onToRegister}
                    toFindPwd={onToFindPassword}
                    onSetUserInfo={onSetUserInfo}
                    onSetAuthInfo={onSetAuthInfo}
                    onSetLoginStatus={onSetLoginStatus}
                    getLoginCountDown={getLoginCountDown}
                    loginSeconds={loginSeconds}
                    userPhoneChange={userPhoneChange}
                    userPhone={userPhone}
                    userEmail={userEmail}
                    userAccountChange={userAccountChange}
                    userEmailChange={userEmailChange}
                    userAccount={userAccount}
                    isOnLine={isOnLine}
                />}
            {tabIndex === REGISTER_TAB_INDEX &&
                <RegisterModal
                    onRequestClose={onRequestClose}
                    toLogin={onToLogin}
                    onSetUserInfo={onSetUserInfo}
                    onSetAuthInfo={onSetAuthInfo}
                    onSetLoginStatus={onSetLoginStatus}
                    authInfo={authInfo}
                    isOnLine={isOnLine}
                />
            }
            {tabIndex === FIND_PWD_TAB_INDEX &&
                <FindPwdModal
                    onRequestClose={onRequestClose}
                    toLogin={onToLogin}
                    onSetUserInfo={onSetUserInfo}
                    onSetAuthInfo={onSetAuthInfo}
                    onSetLoginStatus={onSetLoginStatus}
                    onToLoginTimtout={onToLoginTimtout}
                    isOnLine={isOnLine}
                    forgetPasswordType={forgetPasswordType}
                />
            }

            {tabIndex === LOGIN_OUT_TAB_INDEX &&
                <LoginOutModal
                    onRequestClose={onRequestClose}
                    onCancelLoginOut={onCancelLoginOut}
                    onComfirmLoginOut={onComfirmLoginOut}
                />}

            {tabIndex === USER_SETTING_TAB_INDEX && <UserSettingModal
                onRequestClose={onRequestClose}
                onSetUserInfo={onSetUserInfo}
                authInfo={authInfo}
                userInfo={userInfo}
                onToModifyPwd={onToModifyPwd}
                onToLoginTimtout={onToLoginTimtout}
            />}

            {tabIndex === MODIFY_PWD_TAB_INDEX && <ModifyPwdModal
                onRequestClose={onRequestClose}
                authInfo={authInfo}
                userInfo={userInfo}
                onToUserSetting={onToUserSetting}
                onToLoginTimtout={onToLoginTimtout}
                getModifyCountDown={getModifyCountDown}
                clearModifyTimer={clearModifyTimer}
                modifyPwdSeconds={modifyPwdSeconds}
            />}
            {tabIndex === USER_TIME_OUT_TAB_INDEX && <LoginTimeoutModal
                toLogin={onToLogin}
                onLoignUnName={onLoignUnName}
                onRequestClose={onRequestClose}
            />}
            {tabIndex === USER_INVITATION_TAB_INDEX && <InviteCodeModal
                onRequestClose={onRequestClose}
                authInfo={authInfo}
            />}
        </Box>

    )
}

AuthenticatePane.propTypes = {
    onToRegister: PropTypes.func,
    onToFindPassword: PropTypes.func,
    onToLogin: PropTypes.func,
    onRequestClose: PropTypes.func,
    tabIndex: PropTypes.number
};

export default AuthenticatePane;

