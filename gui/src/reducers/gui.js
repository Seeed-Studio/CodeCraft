import { applyMiddleware, compose, combineReducers } from 'redux';
import alertsReducer, { alertsInitialState } from './alerts';
import assetDragReducer, { assetDragInitialState } from './asset-drag';
import cardsReducer, { cardsInitialState } from './cards';
import colorPickerReducer, { colorPickerInitialState } from './color-picker';
import customProceduresReducer, { customProceduresInitialState } from './custom-procedures';
import blockDragReducer, { blockDragInitialState } from './block-drag';
import editorTabReducer, { editorTabInitialState } from './editor-tab';
import mainTabReducer, { mainTabInitialState } from './main-tab';
import stageTabReducer, { stageTabInitialState } from './stage-tab';
import homePageReducer, { homePageInitialState } from './home-page';
import hoveredTargetReducer, { hoveredTargetInitialState } from './hovered-target';
import menuReducer, { menuInitialState } from './menus';
import micIndicatorReducer, { micIndicatorInitialState } from './mic-indicator';
import modalReducer, { modalsInitialState } from './modals';
import trainModeReducer, { trainModeInitialState } from './train-mode';
import modeReducer, { modeInitialState } from './mode';
import monitorReducer, { monitorsInitialState } from './monitors';
import monitorLayoutReducer, { monitorLayoutInitialState } from './monitor-layout';
import projectStateReducer, { projectStateInitialState } from './project-state';
import projectTitleReducer, { projectTitleInitialState } from './project-title';
import restoreDeletionReducer, { restoreDeletionInitialState } from './restore-deletion';
import stageSizeReducer, { stageSizeInitialState } from './stage-size';
import targetReducer, { targetsInitialState } from './targets';
import physicalDeviceReducer, { physicalDevicesInitialState } from './physical-device';
import toolboxReducer, { toolboxInitialState } from './toolbox';
import vmReducer, { vmInitialState } from './vm';
import vmStatusReducer, { vmStatusInitialState } from './vm-status';
import throttle from 'redux-throttle';
import loginRegisterReducer, { loginRegisterInitialState } from './login-register-special';
import deviceConnectReducer, { deviceConnectInitialState } from './device-connect-special';
import materialReducer, { materialInitialState } from './material-special';
import codeViewReducer from './code-view';
import uploadStateReducer, { uploadInitialState } from './upload-state';
import debugModeStateReducer, { debugModeInitialState } from './debug-mode';
import windowReducer, { windowInitialState } from './window-event';
import netStatusReducer, { netStatusInitialState } from './net-status';
import arduinoMonitorReducer, { arduinoMonitorInitialState } from './arduino-monitor';
import rescueReducer, { rescueInitialState } from './rescue'
import modelsCtrlReducer, { modelsCtrlInitialState } from './models-ctl';
import decks from '../lib/libraries/decks/index.jsx';

const guiMiddleware = compose(applyMiddleware(throttle(300, { leading: true, trailing: true })));

const guiInitialState = {
    alerts: alertsInitialState,
    assetDrag: assetDragInitialState,
    blockDrag: blockDragInitialState,
    cards: cardsInitialState,
    colorPicker: colorPickerInitialState,
    customProcedures: customProceduresInitialState,
    editorTab: editorTabInitialState,
    mainTab: mainTabInitialState,
    stageTab: stageTabInitialState,
    homePage: homePageInitialState,
    mode: modeInitialState,
    hoveredTarget: hoveredTargetInitialState,
    stageSize: stageSizeInitialState,
    menus: menuInitialState,
    micIndicator: micIndicatorInitialState,
    modals: modalsInitialState,
    trainMode: trainModeInitialState,
    monitors: monitorsInitialState,
    monitorLayout: monitorLayoutInitialState,
    projectState: projectStateInitialState,
    projectTitle: projectTitleInitialState,
    restoreDeletion: restoreDeletionInitialState,
    targets: targetsInitialState,
    physicalDevice: physicalDevicesInitialState,
    toolbox: toolboxInitialState,
    vm: vmInitialState,
    vmStatus: vmStatusInitialState,
    loginRegister: loginRegisterInitialState,
    deviceConnect: deviceConnectInitialState,
    material: materialInitialState,
    uploadState: uploadInitialState,
    debugMode: debugModeInitialState,
    window: windowInitialState,
    arduinoMonitor: arduinoMonitorInitialState,
    rescue: rescueInitialState,
    netStatus: netStatusInitialState,
    modelsCtrl: modelsCtrlInitialState
};

const initPlayer = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {
            mode: {
                isFullScreen: currentState.mode.isFullScreen,
                isPlayerOnly: true
            }
        }
    );
};
const initFullScreen = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {
            mode: {
                isFullScreen: true,
                isPlayerOnly: currentState.mode.isPlayerOnly
            }
        }
    );
};

const initTutorialCard = function (currentState, deckId) {
    return Object.assign(
        {},
        currentState,
        {
            modals: {
                previewInfo: false
            },
            cards: {
                visible: true,
                content: decks,
                activeDeckId: deckId,
                step: 0,
                x: 0,
                y: 0,
                dragging: false
            }
        }
    );
};

const guiReducer = combineReducers({
    alerts: alertsReducer,
    assetDrag: assetDragReducer,
    blockDrag: blockDragReducer,
    cards: cardsReducer,
    colorPicker: colorPickerReducer,
    customProcedures: customProceduresReducer,
    editorTab: editorTabReducer,
    mainTab: mainTabReducer,
    stageTab: stageTabReducer,
    homePage: homePageReducer,
    mode: modeReducer,
    hoveredTarget: hoveredTargetReducer,
    stageSize: stageSizeReducer,
    menus: menuReducer,
    micIndicator: micIndicatorReducer,
    modals: modalReducer,
    trainMode: trainModeReducer,
    monitors: monitorReducer,
    monitorLayout: monitorLayoutReducer,
    projectState: projectStateReducer,
    projectTitle: projectTitleReducer,
    restoreDeletion: restoreDeletionReducer,
    targets: targetReducer,
    physicalDevice: physicalDeviceReducer,
    toolbox: toolboxReducer,
    vm: vmReducer,
    vmStatus: vmStatusReducer,
    loginRegister: loginRegisterReducer,
    deviceConnect: deviceConnectReducer,
    material: materialReducer,
    codeView: codeViewReducer,
    uploadState: uploadStateReducer,
    debugMode: debugModeStateReducer,
    window: windowReducer,
    arduinoMonitor: arduinoMonitorReducer,
    rescue: rescueReducer,
    netStatus: netStatusReducer,
    modelsCtr: modelsCtrlReducer
});

export {
    guiReducer as default,
    guiInitialState,
    guiMiddleware,
    initFullScreen,
    initPlayer,
    initTutorialCard
};
