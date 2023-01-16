const UPDATE_IMAGE_MODELS = 'scratch-gui/models-ctl/UPDATE_IMAGE_MODELS';
const UPDATE_OBJECT_MODELS = 'scratch-gui/models-ctl/UPDATE_OBJECT_MODELS';
const UPDATE_TRAIN_MODELS = 'scratch-gui/models-ctl/UPDATE_TRAIN_MODELS';
const UPDATE_CREATESKILL_MODELS = 'scratch-gui/models-ctl/UPDATE_CREATESKILL_MODELS';

const UPDATE_IMAGE_MODELS_STATE = 'scratch-gui/models-ctl/UPDATE_IMAGE_MODELS_STATE';
const UPDATE_OBJECT_MODELS_STATE = 'scratch-gui/models-ctl/UPDATE_OBJECT_MODELS_STATE';
const UPDATE_TRAIN_MODELS_STATE = 'scratch-gui/models-ctl/UPDATE_TRAIN_MODELS_STATE';
const UPDATE_CREATESKILL_MODELS_STATE = 'scratch-gui/models-ctl/UPDATE_CREATESKILL_MODELS_STATE';

const initialState = {
    imageModelsVisiabel: false,
    imageModels: [],
    objectModelsVisiabel: false,
    objectModels: [],
    trainModelsVisiabel: false,
    trainModels: [],
    createSkillModelsVisiabel: false,
    createSkillModels: [],
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case UPDATE_IMAGE_MODELS:
            return Object.assign({}, state, {
                imageModels: action.imageModels
            })
        case UPDATE_IMAGE_MODELS_STATE:
            return Object.assign({}, state, {
                imageModelsVisiabel: action.visiable
            })
        case UPDATE_OBJECT_MODELS:
            return Object.assign({}, state, {
                objectModels: action.objectModels
            })
        case UPDATE_OBJECT_MODELS_STATE:
            return Object.assign({}, state, {
                objectModelsVisiabel: action.visiable
            })
        case UPDATE_TRAIN_MODELS:
            return Object.assign({}, state, {
                trainModels: action.trainModels
            })
        case UPDATE_TRAIN_MODELS_STATE:
            return Object.assign({}, state, {
                trainModelsVisiabel: action.visiable
            })
        case UPDATE_CREATESKILL_MODELS:
            return Object.assign({}, state, {
                createSkillModels: action.createSkillModels
            })
        case UPDATE_CREATESKILL_MODELS_STATE:
            return Object.assign({}, state, {
                createSkillModelsVisiabel: action.visiable
            })
        default:
            return state;
    }
};

const updateImageModels = function (data) {
    return {
        type: UPDATE_IMAGE_MODELS,
        imageModels: data
    };
};
const updateObjectModels = function (data) {
    return {
        type: UPDATE_OBJECT_MODELS,
        objectModels: data
    };
};
const updateTrainModels = function (data) {
    return {
        type: UPDATE_TRAIN_MODELS,
        trainModels: data
    };
};
const updateCreateSkillModels = function (data) {
    return {
        type: UPDATE_CREATESKILL_MODELS,
        createSkillModels: data
    };
};

const updateImageModelsState = function (stat) {
    return {
        type: UPDATE_IMAGE_MODELS_STATE,
        visiable: stat
    };
};
const updateObjectModelsState = function (stat) {
    return {
        type: UPDATE_OBJECT_MODELS_STATE,
        visiable: stat
    };
};
const updateTrainModelsState = function (stat) {
    return {
        type: UPDATE_TRAIN_MODELS_STATE,
        visiable: stat
    };
};
const updateCreateSkillModelsState = function (stat) {
    return {
        type: UPDATE_CREATESKILL_MODELS_STATE,
        visiable: stat
    };
};

export {
    reducer as default,
    initialState as modelsCtrlInitialState,
    updateImageModels,
    updateImageModelsState,
    updateObjectModels,
    updateObjectModelsState,
    updateTrainModels,
    updateTrainModelsState,
    updateCreateSkillModels,
    updateCreateSkillModelsState
};




