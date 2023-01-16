const ACTIVATE_TAB = 'scratch-gui/upload-state/ACTIVATE_TAB';

const STATE_UPLOAD_NONE = -1;
const STATE_UPLOADING_TAB = 0;
const STATE_UPLOAD_SUCC_TAB = 1;
const STATE_UPLOAD_FAIL_TAB = 2;
const STATE_UPLOAD_TIMEOUT_TAB = 3;
const STATE_UPLOAD_ARDUINO_SELECT = 4;

const STATE_UNINSTALLED_ASSISTANT = 5;
const STATE_ASSISTANT_OCCUPIED = 6;

const initialState = {
    activeState: STATE_UPLOAD_NONE
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case ACTIVATE_TAB:
            return Object.assign({}, state, {
                activeState: action.stateTab
            });
        default:
            return state;
    }
};

const activateState = function (tab) {
    return {
        type: ACTIVATE_TAB,
        stateTab: tab
    };
};

export {
    reducer as default,
    initialState as uploadInitialState,
    activateState,
    STATE_UPLOAD_NONE,
    STATE_UPLOADING_TAB,
    STATE_UPLOAD_SUCC_TAB,
    STATE_UPLOAD_FAIL_TAB,
    STATE_UPLOAD_TIMEOUT_TAB,
    STATE_UPLOAD_ARDUINO_SELECT,
    STATE_UNINSTALLED_ASSISTANT,
    STATE_ASSISTANT_OCCUPIED
};
