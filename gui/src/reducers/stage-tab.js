const ACTIVATE_STAGE_TAB = 'scratch-gui/stage-tabs/ACTIVATE_STAGE_TAB';

const TAB_SPRITE = 0;
const TAB_BACKDROP = 1;

const initialState = {
    activeStageTab: TAB_SPRITE
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ACTIVATE_STAGE_TAB:
        return Object.assign({}, state, {
            activeStageTab: action.activeStageTab
        });
    default:
        return state;
    }
};

const activateStageTab = function (tab) {
    return {
        type: ACTIVATE_STAGE_TAB,
        activeStageTab: tab
    };
};

export {
    reducer as default,
    initialState as stageTabInitialState,
    activateStageTab,
    TAB_SPRITE,
    TAB_BACKDROP
};
