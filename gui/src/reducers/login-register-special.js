const SET_TAB = 'scratch-gui/login-register/SET_TAB';
const SET_USER_INFO = 'scratch-gui/login-register/SET_USER_INFO';
const SET_AUTH_INFO = 'scratch-gui/login-register/SET_AUTH_INFO';
const SET_LOGIN_STATUS = 'scratch-gui/login-register/SET_LOGIN_STATUS';
const SET_WILL_TO_DO = 'scratch-gui/login-register/SET_WILL_TO_DO';
const SET_FORGET_PASSWORD_TYPE = 'scratch-gui/login-register/SET_FORGET_PASSWORD_TYPE';

const NONE_TAB_INDEX = -1;
const LOGIN_TAB_INDEX = 1;
const REGISTER_TAB_INDEX = 2;
const FIND_PWD_TAB_INDEX = 3;
const LOGIN_OUT_TAB_INDEX = 4;
const USER_SETTING_TAB_INDEX = 5;
const MODIFY_PWD_TAB_INDEX = 6;
const USER_TIME_OUT_TAB_INDEX = 7;
const USER_INVITATION_TAB_INDEX = 8;

const initialState = {
  tab: NONE_TAB_INDEX,
  userInfo: {},
  authInfo: {},
  loginStatus: false,
  willToDo: '',    // 登录成功之后要自动执行的操作 --- saveProject(保存工程)  commitFeedBack(提交反馈) 
  forgetPasswordType: ''
}

const reducer = (state, action) => {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
    case SET_TAB:
      return Object.assign({}, state, {
        tab: action.tab
      });
    case SET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.info
      });
    case SET_AUTH_INFO:
      return Object.assign({}, state, {
        authInfo: action.info
      });
    case SET_LOGIN_STATUS:
      return Object.assign({}, state, {
        loginStatus: action.status
      });
    case SET_WILL_TO_DO:
      return Object.assign({}, state, {
        willToDo: action.willToDo
      });
    case SET_FORGET_PASSWORD_TYPE:
      return Object.assign({}, state, {
        forgetPasswordType: action.selectedType
      })

    default:
      return state;
  }
}

const setUserTab = (tab) => {
  return {
    type: SET_TAB,
    tab: tab
  }
}

const setUserInfo = (info) => {
  return {
    type: SET_USER_INFO,
    info: info
  }
}

const setAuthInfo = (info) => {
  return {
    type: SET_AUTH_INFO,
    info: info
  }
}

const setLoginStatus = (status) => {
  return {
    type: SET_LOGIN_STATUS,
    status: status
  }
}

const setWillToDo = (todo) => {
  return {
    type: SET_WILL_TO_DO,
    willToDo: todo,
  }
}

const setForgetPassword = (selectedType) => {
  return {
    type: SET_FORGET_PASSWORD_TYPE,
    selectedType
  }
}

export {
  reducer as default,
  initialState as loginRegisterInitialState,
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
  LOGIN_OUT_TAB_INDEX,
  USER_SETTING_TAB_INDEX,
  MODIFY_PWD_TAB_INDEX,
  USER_TIME_OUT_TAB_INDEX,
  USER_INVITATION_TAB_INDEX
};