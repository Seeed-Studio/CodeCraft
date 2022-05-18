const SET_CLASSIFIER = 'scratch-gui/trainMode/SET_CLASSIFIER';
const SET_FEATUREEXTRACTOR = 'scratch-gui/trainMode/SET_FEATUREEXTRACTOR';
const SET_OPTIONS = 'scratch-gui/trainMode/SET_OPTIONS';
const SET_CLASSIFICATIONLIST = 'scratch-gui/trainMode/SET_CLASSIFICATIONLIST';
const SET_ISPREDICTING = 'scratch-gui/trainMode/SET_ISPREDICTING';

const initialState = {
    classifier: null,
    featureExtractor: null,
    options: { alpha: 1, numLabels: 3, hiddenUnits: 10, batchSize: 0.2 },
    classificationList: [{
        name: null,
        confidence: 0,
        imageList: [],
        isNameEdited: false
    }, {
        name: null,
        confidence: 0,
        imageList: [],
        isNameEdited: false
    }, {
        name: null,
        confidence: 0,
        imageList: [],
        isNameEdited: false
    }],
    isPredicting: false //模型训练界面是否正在预测，记录切换语言前的状态
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case SET_CLASSIFIER:
            return Object.assign({}, state, {
                classifier: action.classifier,
            });
        case SET_FEATUREEXTRACTOR:
            return Object.assign({}, state, {
                featureExtractor: action.featureExtractor,
            });
        case SET_OPTIONS:
            return Object.assign({}, state, {
                options: action.options,
            });
        case SET_CLASSIFICATIONLIST:
            return Object.assign({}, state, {
                classificationList: action.classificationList.map(obj => Object.assign({}, obj))
            });
        case SET_ISPREDICTING:
            return Object.assign({}, state, {
                isPredicting: action.isPredicting,
            });
        default:
            return state;
    }
};

const setClassifier = function (classifier) {
    return {
        type: SET_CLASSIFIER,
        classifier: classifier
    };
};
const setFeatureExtractor = function (featureExtractor) {
    return {
        type: SET_FEATUREEXTRACTOR,
        featureExtractor: featureExtractor
    };
};
const setOptions = function (options) {
    return {
        type: SET_OPTIONS,
        options: options
    };
};
const setClassificationList = function (classificationList) {
    return {
        type: SET_CLASSIFICATIONLIST,
        classificationList: classificationList
    };
};
const setIsPredicting = function (isPredicting) {
    return {
        type: SET_ISPREDICTING,
        isPredicting: isPredicting
    };
};

export {
    reducer as default,
    initialState as trainModeInitialState,
    setClassifier,
    setFeatureExtractor,
    setOptions,
    setClassificationList,
    setIsPredicting
};
