const ACTIVATE_MODE = 'scratch-gui/debug-mode/ACTIVATE_MODE';
const UPDATE_ONLINE_SUPPORT_STATE = 'scratch-gui/debug-mode/UPDATE_ONLINE_SUPPORT_STATE';
const UPDATE_OFFLINE_SUPPORT_STATE = 'scratch-gui/debug-mode/UPDATE_OFFLINE_SUPPORT_STATE';


const MODE_ONLINE = 0;
const MODE_OFFLINE = 1;

const initialState = {
    isSupportOnline: false,
    isSupportOffline: false,
    activeMode: MODE_OFFLINE
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case ACTIVATE_MODE:
            return Object.assign({}, state, {
                activeMode: action.mode
            });
        case UPDATE_ONLINE_SUPPORT_STATE:
            return Object.assign({}, state, {
                isSupportOnline: action.value
            });
        case UPDATE_OFFLINE_SUPPORT_STATE:
            return Object.assign({}, state, {
                isSupportOffline: action.value
            });
        default:
            return state;
    }
};

const activateMode = function (mode) {
    return {
        type: ACTIVATE_MODE,
        mode: mode
    };
};

const updateOnlineSupportState = function (value) {
    return {
        type: UPDATE_ONLINE_SUPPORT_STATE,
        value: value
    };
}

const updateOfflineSupportState = function (value) {
    return {
        type: UPDATE_OFFLINE_SUPPORT_STATE,
        value: value
    };
}



export {
    reducer as default,
    initialState as debugModeInitialState,
    activateMode,
    updateOnlineSupportState,
    updateOfflineSupportState,
    MODE_ONLINE,
    MODE_OFFLINE
};
