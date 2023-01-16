import controlNames from './../lib/libraries/devices/control-names.js'

const SET_VISIBLE = 'scratch-gui/device-connect/SET_VISIBLE';
const SET_TAB = 'scratch-gui/device-connect/SET_TAB';

const UPDATE_SOCKET_CONNECT_STATE = 'scratch-gui/device-connect/UPDATE_SOCKET_CONNECT_STATE';
const UPDATE_DEVICE_CONNECT_STATE = 'scratch-gui/device-connect/UPDATE_DEVICE_CONNECT_STATE';

const DEVICE_RECOGNIZE = 'scratch-gui/device-connect/DEVICE_RECOGNIZE';
const UPDATE_CONNECTED_DEVICE = 'scratch-gui/device-connect/UPDATE_CONNECTED_DEVICE';

const UPDATE_UPGRADE_STATUS = 'scratch-gui/device-connect/UPDATE_UPGRADE_STATUS';

const NONE_DEVICE_TAB_INDEX = -1;
const DEVICE_CONNECT_TAB_INDEX = 1;
const CCA_TAB_INDEX = 2;

const initialState = {
  visible: false,
  tab: NONE_DEVICE_TAB_INDEX,

  isUpgrade: false,
  connectedDevice: null,
  isConnected: false,
  isEquipmentConnected: false,
}

const reducer = (state, action) => {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
    case SET_VISIBLE:
      return Object.assign({}, state, {
        visible: action.visible
      });
    case SET_TAB:
      return Object.assign({}, state, {
        tab: action.tab
      })
    case UPDATE_SOCKET_CONNECT_STATE:
      return Object.assign({}, state, {
        isConnected: action.value
      });
    case UPDATE_DEVICE_CONNECT_STATE:
      return Object.assign({}, state, {
        isEquipmentConnected: action.value
      });
    case UPDATE_CONNECTED_DEVICE:
      return Object.assign({}, state, {
        connectedDevice: action.device
      });
    case DEVICE_RECOGNIZE:
      return Object.assign({}, state, {
        connectedDevice: Object.assign({},
          state.connectedDevice,
          { 
            id: action.id,
            control :controlNames[action.id].name
           }
        )
      });
    case UPDATE_UPGRADE_STATUS:
      return Object.assign({}, state, {
        isUpgrade: action.isUpgrade
      });
    default:
      return state;
  }
}

const setDeviceVisible = (visible) => {
  return {
    type: SET_VISIBLE,
    visible: visible
  }
}

const setDeviceTab = (tab) => {
  return {
    type: SET_TAB,
    tab: tab
  }

}

const updateSocketState = (state) => {
  return {
    type: UPDATE_SOCKET_CONNECT_STATE,
    value: state
  }
}

const updateDeviceState = (state) => {
  return {
    type: UPDATE_DEVICE_CONNECT_STATE,
    value: state
  }
}

const updateConnectedDevice = (device) => {
  return {
    type: UPDATE_CONNECTED_DEVICE,
    device: device
  }
}

const recognizeDevice = (id) => {
  return {
    type: DEVICE_RECOGNIZE,
    id: id
  }
}

const updateIsUpgradeState = (isUpgrade)=>{
  return {
    type: UPDATE_UPGRADE_STATUS,
    isUpgrade: isUpgrade
  }
}

export {
  reducer as default,
  initialState as deviceConnectInitialState,
  setDeviceVisible,
  setDeviceTab,
  updateSocketState,
  updateDeviceState,
  updateConnectedDevice,
  updateIsUpgradeState,
  recognizeDevice,
  NONE_DEVICE_TAB_INDEX,
  DEVICE_CONNECT_TAB_INDEX,
  CCA_TAB_INDEX
}