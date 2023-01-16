const UPDATE_WINDOW_DOWNLOAD_FLAG = 'scratch-gui/window/UPDATE_WINDOW_DOWNLOAD_FLAG';

const initialState = {
    downloadFlag: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case UPDATE_WINDOW_DOWNLOAD_FLAG:
            return Object.assign({}, state, {
                downloadFlag: action.flag
            })
        default:
            return state;
    }
};

const updateWindowDownloadFlag = function (flag) {
    return {
        type: UPDATE_WINDOW_DOWNLOAD_FLAG,
        flag: flag
    };
};
export {
    reducer as default,
    initialState as windowInitialState,
    updateWindowDownloadFlag
};
