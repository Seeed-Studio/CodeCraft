const SET_MODAL_INDEX = 'rescue/SET_MODAL_INDEX';
const SET_FIRMWARE_VERSION = 'rescue/SET_FIRMWARE_VERSION'
const SET_RESCUER = 'rescue/SET_RESCUER'

const RESCUE_MODAL_HIDE = 'RESCUE_MODAL_HIDE';
const RESCUE_MODAL_DEVICE_SELECT = 'RESCUE_MODAL_DEVICE_SELECT';

const RESCUE_MODAL_PYTHON_DOWN_BIN_SETP1 = 'RESCUE_MODAL_PYTHON_DOWN_BIN_SETP1';
const RESCUE_MODAL_PYTHON_DOWN_BIN_SETP2 = 'RESCUE_MODAL_PYTHON_DOWN_BIN_SETP2';
const RESCUE_MODAL_PYTHON_DOWN_BIN_SETP3 = 'RESCUE_MODAL_PYTHON_DOWN_BIN_SETP3';

const RESCUE_MODAL_PYTHON_UPGRADE_INIT = 'RESCUE_MODAL_PYTHON_UPGRADE_INIT';
const RESCUE_MODAL_PYTHON_UPGRADING = 'RESCUE_MODAL_PYTHON_UPGRADING';
const RESCUE_MODAL_PYTHON_UPGRADE_SUCC = 'RESCUE_MODAL_PYTHON_UPGRADE_SUCC';
const RESCUE_MODAL_PYTHON_UPGRADE_FAIL = 'RESCUE_MODAL_PYTHON_UPGRADE_FAIL';

const RESCUE_ASSIGN_TYPE_TO = 'RESCUE_ASSIGN_TYPE_TO';
const RESCUE_DEFAULT_TYPE_TO = 'RESCUE_DEFAULT_TYPE_TO';

const initialState = {
    modalIndex: RESCUE_MODAL_HIDE,
    firmwareVersion: '',
    rescuer: null,

    deviceSelectedValue: null,
    deviceSelectorDisable: false,
}

const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case SET_MODAL_INDEX:
            return {
                ...state,
                modalIndex: action.index
            }
        case SET_FIRMWARE_VERSION:
            return {
                ...state,
                firmwareVersion: action.version
            }
        case SET_RESCUER:
            return {
                ...state,
                rescuer: action.rescuer
            }

        case RESCUE_ASSIGN_TYPE_TO:
            return {
                ...state,
                deviceSelectedValue: action.device,
                deviceSelectorDisable: true
            }
        case RESCUE_DEFAULT_TYPE_TO:
            return {
                ...state,
                deviceSelectedValue: null,
                deviceSelectorDisable: false
            }

        default:
            return state;
    }
}

const setModalIndex = (index) => ({
    type: SET_MODAL_INDEX,
    index: index
})

const setFirmwareVersion = (version) => ({
    type: SET_FIRMWARE_VERSION,
    version: version
})

const setRescuer = (rescuer) => ({
    type: SET_RESCUER,
    rescuer: rescuer
})

const assignRescueDeviceTo = (device) => ({
    type: RESCUE_ASSIGN_TYPE_TO,
    device: device
})

const defaultRescueDeviceTo = (device) => ({
    type: RESCUE_DEFAULT_TYPE_TO,
    device: device
})

export {
    reducer as default,
    initialState as rescueInitialState,
    setModalIndex,
    setFirmwareVersion,
    setRescuer,
    assignRescueDeviceTo,
    defaultRescueDeviceTo,
    RESCUE_MODAL_HIDE,
    RESCUE_MODAL_DEVICE_SELECT,
    RESCUE_MODAL_PYTHON_DOWN_BIN_SETP1,
    RESCUE_MODAL_PYTHON_DOWN_BIN_SETP2,
    RESCUE_MODAL_PYTHON_DOWN_BIN_SETP3,
    RESCUE_MODAL_PYTHON_UPGRADE_INIT,
    RESCUE_MODAL_PYTHON_UPGRADING,
    RESCUE_MODAL_PYTHON_UPGRADE_SUCC,
    RESCUE_MODAL_PYTHON_UPGRADE_FAIL,
    RESCUE_ASSIGN_TYPE_TO,
    RESCUE_DEFAULT_TYPE_TO
}