import analytics from '../lib/analytics';

const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const MODAL_BACKDROP_LIBRARY = 'backdropLibrary';
const MODAL_CAMERA_CAPTURE = 'cameraCapture';
const MODAL_COSTUME_LIBRARY = 'costumeLibrary';
const MODAL_EXTENSION_LIBRARY = 'extensionLibrary';
const MODAL_IMPORT_INFO = 'importInfo';
const MODAL_LOADING_PROJECT = 'loadingProject';
const MODAL_PREVIEW_INFO = 'previewInfo';
const MODAL_SOUND_LIBRARY = 'soundLibrary';
const MODAL_SPRITE_LIBRARY = 'spriteLibrary';
const MODAL_SOUND_RECORDER = 'soundRecorder';

const MODAL_PHYSICALDEVICE_LIBRARY = 'devicesLibrary';

const MODAL_EPCS_LIBRARY = 'epcsLibrary';

const MODAL_TIPS_LIBRARY = 'tipsLibrary';

const MODAL_CONNECT = 'connect';

//训练模型界面
const MODAL_TRAIN = 'trainModal';

//训练模型视频识别界面
const MODAL_TRAIN_VIDEO = 'trainVideoModal';

//视频认知能力界面
const MODAL_RECOGNIZE_VIDEO = 'recognizeVideoModal';

//串口图表界面
const MODAL_SERIAL_CHART = 'serialChartModal';

//edgeImpulse界面
const MODAL_EDGEIMPULSE = 'edgeImpulseModal';

//三轴加速界面
const MODAL_THREEAXIS_ACCELEROMETER = 'threeAxisAccelerometerModal';

//气象站
const MODAL_METEOSTATION = 'meteostationModal';    

// //创建技能
const MODAL_CREATE_SKILL = 'createSkillModal';

// //校准舵机
const MODAL_CAILBRATE_SERVOS = 'cailbrateModal';

//设备详情页
const MODAL_DEVICE_VIEW_MORE = 'deviceViewMore';

//意见反馈
const MODAL_FEEDBACK = 'feedback';


const initialState = {
    [MODAL_BACKDROP_LIBRARY]: false,
    [MODAL_CAMERA_CAPTURE]: false,
    [MODAL_COSTUME_LIBRARY]: false,
    [MODAL_EXTENSION_LIBRARY]: false,
    [MODAL_IMPORT_INFO]: false,
    [MODAL_LOADING_PROJECT]: false,
    [MODAL_PREVIEW_INFO]: true,
    [MODAL_SOUND_LIBRARY]: false,
    [MODAL_SPRITE_LIBRARY]: false,
    [MODAL_SOUND_RECORDER]: false,
    [MODAL_TIPS_LIBRARY]: true,
    [MODAL_PHYSICALDEVICE_LIBRARY]: false,
    [MODAL_EPCS_LIBRARY]: false,
    [MODAL_CONNECT]: false,
    [MODAL_TRAIN]: false,
    [MODAL_TRAIN_VIDEO]: false,
    [MODAL_RECOGNIZE_VIDEO]: false,
    [MODAL_SERIAL_CHART]: false,
    [MODAL_EDGEIMPULSE]: false,
    [MODAL_THREEAXIS_ACCELEROMETER]: false,
    [MODAL_METEOSTATION]: false,
    [MODAL_CREATE_SKILL]: false,
    [MODAL_CAILBRATE_SERVOS]: false,
    [MODAL_DEVICE_VIEW_MORE]: false,
    [MODAL_FEEDBACK]: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case OPEN_MODAL:
            return Object.assign({}, state, {
                [action.modal]: true
            });
        case CLOSE_MODAL:
            return Object.assign({}, state, {
                [action.modal]: false
            });
        default:
            return state;
    }
};
const openModal = function (modal) {
    return {
        type: OPEN_MODAL,
        modal: modal
    };
};
const closeModal = function (modal) {
    return {
        type: CLOSE_MODAL,
        modal: modal
    };
};
const openBackdropLibrary = function () {
    analytics.pageview('/libraries/backdrops');
    return openModal(MODAL_BACKDROP_LIBRARY);
};
const openCameraCapture = function () {
    analytics.pageview('/modals/camera');
    return openModal(MODAL_CAMERA_CAPTURE);
};
const openCostumeLibrary = function () {
    analytics.pageview('/libraries/costumes');
    return openModal(MODAL_COSTUME_LIBRARY);
};
const openExtensionLibrary = function () {
    analytics.pageview('/libraries/extensions');
    return openModal(MODAL_EXTENSION_LIBRARY);
};
const openImportInfo = function () {
    analytics.pageview('modals/import');
    return openModal(MODAL_IMPORT_INFO);
};
const openLoadingProject = function () {
    analytics.pageview('modals/loading');
    return openModal(MODAL_LOADING_PROJECT);
};
const openPreviewInfo = function () {
    analytics.pageview('/modals/preview');
    return openModal(MODAL_PREVIEW_INFO);
};
const openSoundLibrary = function () {
    analytics.pageview('/libraries/sounds');
    return openModal(MODAL_SOUND_LIBRARY);
};
const openSpriteLibrary = function () {
    analytics.pageview('/libraries/sprites');
    return openModal(MODAL_SPRITE_LIBRARY);
};
const openSoundRecorder = function () {
    analytics.pageview('/modals/microphone');
    return openModal(MODAL_SOUND_RECORDER);
};
const openTipsLibrary = function () {
    analytics.pageview('/modals/tips');
    return openModal(MODAL_TIPS_LIBRARY);
};
const openEpcsLibrary = function () {
    analytics.pageview('/modals/epcs');
    return openModal(MODAL_EPCS_LIBRARY);
};
const openDevicesLibrary = function () {
    analytics.pageview('/modals/devices');
    return openModal(MODAL_PHYSICALDEVICE_LIBRARY);
};
const openConnectView = function () {
    analytics.pageview('/modals/connect');
    return openModal(MODAL_CONNECT);
};
const openTrainModal = function () {
    analytics.pageview('/modals/trainModal');
    return openModal(MODAL_TRAIN);
};
const openTrainVideoModal = function () {
    analytics.pageview('/modals/trainVideoModal');
    return openModal(MODAL_TRAIN_VIDEO);
};
const openRecognizeVideoModal = function () {
    analytics.pageview('/modals/recognizeVideoModal');
    return openModal(MODAL_RECOGNIZE_VIDEO);
};
const openSerialChartModal = function () {
    analytics.pageview('/modals/serialChartModal');
    return openModal(MODAL_SERIAL_CHART);
};
const openEdgeImpulseModal = function () {
    analytics.pageview('/modals/edgeImpulseModal');
    return openModal(MODAL_EDGEIMPULSE);
};
const openThreeAxisAccelerometerModal = function () {
    analytics.pageview('/modals/threeAxisAccelerometerModal');
    return openModal(MODAL_THREEAXIS_ACCELEROMETER);
};
const openMeteostationModal = function () {
    analytics.pageview('/modals/meteostationModal');
    return openModal(MODAL_METEOSTATION);
};
const openCreateSkillModal = function () {
    analytics.pageview('/modals/createSkillModal');
    return openModal(MODAL_CREATE_SKILL);
};
const openCailbrateModal = function () {
    analytics.pageview('/modals/cailbrateModal');
    return openModal(MODAL_CAILBRATE_SERVOS);
};
const openDeviceViewMoreModal = function () {
    analytics.pageview('/modals/deviceViewMore');
    return openModal(MODAL_DEVICE_VIEW_MORE);
};
const openFeedbackModal = function () {
    analytics.pageview('/modals/feedback');
    return openModal(MODAL_FEEDBACK);
};
const closeBackdropLibrary = function () {
    return closeModal(MODAL_BACKDROP_LIBRARY);
};
const closeCameraCapture = function () {
    return closeModal(MODAL_CAMERA_CAPTURE);
};
const closeCostumeLibrary = function () {
    return closeModal(MODAL_COSTUME_LIBRARY);
};
const closeExtensionLibrary = function () {
    return closeModal(MODAL_EXTENSION_LIBRARY);
};
const closeImportInfo = function () {
    return closeModal(MODAL_IMPORT_INFO);
};
const closeLoadingProject = function () {
    return closeModal(MODAL_LOADING_PROJECT);
};
const closePreviewInfo = function () {
    return closeModal(MODAL_PREVIEW_INFO);
};
const closeSpriteLibrary = function () {
    return closeModal(MODAL_SPRITE_LIBRARY);
};
const closeSoundLibrary = function () {
    return closeModal(MODAL_SOUND_LIBRARY);
};
const closeSoundRecorder = function () {
    return closeModal(MODAL_SOUND_RECORDER);
};
const closeTipsLibrary = function () {
    return closeModal(MODAL_TIPS_LIBRARY);
};
const closeEpcsLibrary = function () {
    return closeModal(MODAL_EPCS_LIBRARY);
};
const closeDevicesLibrary = function () {
    return closeModal(MODAL_PHYSICALDEVICE_LIBRARY);
};
const closeConnectView = function () {
    return closeModal(MODAL_CONNECT);
};
const closeTrainModal = function () {
    return closeModal(MODAL_TRAIN);
};
const closeTrainVideoModal = function () {
    return closeModal(MODAL_TRAIN_VIDEO);
};
const closeRecognizeVideoModal = function () {
    return closeModal(MODAL_RECOGNIZE_VIDEO);
};
const closeSerialChartModal = function () {
    return closeModal(MODAL_SERIAL_CHART);
};
const closeEdgeImpulseModal = function () {
    return closeModal(MODAL_EDGEIMPULSE);
};
const closeThreeAxisAccelerometerModal = function () {
    return closeModal(MODAL_THREEAXIS_ACCELEROMETER);
};
const closeMeteostationModal = function () {
    return closeModal(MODAL_METEOSTATION);
};
const closeCreateSkillModal = function () {
    return closeModal(MODAL_CREATE_SKILL);
};
const closeCailbrateModal = function () {
    return closeModal(MODAL_CAILBRATE_SERVOS);
};
const closeDeviceViewMoreModal = function () {
    return closeModal(MODAL_DEVICE_VIEW_MORE);
};
const closeFeedbackModal = function () {
    return closeModal(MODAL_FEEDBACK);
};

export {
    reducer as default,
    initialState as modalsInitialState,
    openBackdropLibrary,
    openCameraCapture,
    openCostumeLibrary,
    openExtensionLibrary,
    openImportInfo,
    openLoadingProject,
    openPreviewInfo,
    openSoundLibrary,
    openSpriteLibrary,
    openSoundRecorder,
    openTipsLibrary,
    openEpcsLibrary,
    openDevicesLibrary,
    openConnectView,
    openTrainModal,
    openTrainVideoModal,
    openRecognizeVideoModal,
    openSerialChartModal,
    openEdgeImpulseModal,
    openThreeAxisAccelerometerModal,
    openMeteostationModal,
    openCreateSkillModal,
    openCailbrateModal,
    openDeviceViewMoreModal,
    openFeedbackModal,
    closeBackdropLibrary,
    closeCameraCapture,
    closeCostumeLibrary,
    closeExtensionLibrary,
    closeImportInfo,
    closeLoadingProject,
    closePreviewInfo,
    closeSpriteLibrary,
    closeSoundLibrary,
    closeSoundRecorder,
    closeTipsLibrary,
    closeEpcsLibrary,
    closeDevicesLibrary,
    closeConnectView,
    closeTrainModal,
    closeTrainVideoModal,
    closeRecognizeVideoModal,
    closeSerialChartModal,
    closeEdgeImpulseModal,
    closeThreeAxisAccelerometerModal,
    closeMeteostationModal,
    closeCreateSkillModal,
    closeCailbrateModal,
    closeDeviceViewMoreModal,
    closeFeedbackModal
};
