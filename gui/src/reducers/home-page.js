const ACTIVATE_RESET_HOMEDATA = 'scratch-gui/home-page/ACTIVATE_RESET_HOMEDATA';
const ACTIVATE_UPDATE_CRUUTAG_INDEX = 'scratch-gui/home-page/ACTIVATE_UPDATE_CRUUTAG_INDEX';

const initialState = {
    tagIndex: 0,
    homeTabsIndex: 1 //首页页签，1、课程，2、项目
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case ACTIVATE_RESET_HOMEDATA:
            return {
                tagIndex: 0
            };
        case ACTIVATE_UPDATE_CRUUTAG_INDEX:
            return Object.assign({}, state, {
                tagIndex: action.tagIndex
            });
        default:
            return state;
    }
};

const updateHomeTagIndex = function (tagIndex) {
    return {
        type: ACTIVATE_UPDATE_CRUUTAG_INDEX,
        tagIndex: tagIndex
    };
};

const resetHomeState = function () {
    return {
        type: ACTIVATE_RESET_HOMEDATA
    };
};

export {
    reducer as default,
    initialState as homePageInitialState,
    updateHomeTagIndex,
    resetHomeState,
};
