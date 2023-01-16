const CHANGE_ONLINE_STATUS = 'netStatus/CHANGE_ONLINE_STATUS';
const CHANGE_ONLINE_TIME = 'netStatus/CHANGE_ONLINE_TIME';

const initialState = {
  isOnLine: true,
  changeTime: 1,
}

const reducer = (state, action) => {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
    case CHANGE_ONLINE_STATUS:
      return Object.assign({}, state, {
        isOnLine: action.value
      });
    case CHANGE_ONLINE_TIME:
      return Object.assign({}, state, {
        changeTime: action.time
      });
    default:
      return state;
  }
}

// 改变网络状态
const changeOnlineStatus = (value) => {
  return {
    type: CHANGE_ONLINE_STATUS,
    value
  }
}

// 网路改变次数 ---- 检查更新用
const setChangeTime = (time) => {
  return {
    type: CHANGE_ONLINE_TIME,
    time
  }
}

export {
  reducer as default,
  initialState as netStatusInitialState,
  changeOnlineStatus,
  setChangeTime
}