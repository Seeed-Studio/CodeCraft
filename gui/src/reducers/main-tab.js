const ACTIVATE_TAB = 'scratch-gui/main-mode/ACTIVATE_TAB';

const DEVICE_TAB_INDEX = 0;
const STAGE_TAB_INDEX = 1;

const initialState = {
    activeMainTabIndex: DEVICE_TAB_INDEX
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ACTIVATE_TAB:
        return Object.assign({}, state, {
            activeMainTabIndex: action.activeTabIndex
        });
    default:
        return state;
    }
};

const activateTab = function (tab) {
    return {
        type: ACTIVATE_TAB,
        activeTabIndex: tab
    };
};

export {
    reducer as default,
    initialState as mainTabInitialState,
    activateTab,
    DEVICE_TAB_INDEX,
    STAGE_TAB_INDEX
};
