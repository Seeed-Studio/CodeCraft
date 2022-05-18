const UPDATE_PHYSICAL_DEVICE_LIST = 'scratch-gui/physical-device/UPDATE_PHYSICAL_DEVICE_LIST';
const UPDATE_PHYSICAL_DEVICE = 'scratch-gui/physical-device/UPDATE_PHYSICAL_DEVICE';

const INIT_PHYSICAL_DEVICES_STATE = 'scratch-gui/physical-device/INIT_PHYSICAL_DEVICES_STATE';

import devices from '../lib/libraries/devices/index.jsx'

const initialState = {
    physicalDevices: devices,
    physicalDevice: {}
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case UPDATE_PHYSICAL_DEVICE_LIST:
            return Object.assign({}, state, {
                physicalDevices: action.devices
            });
        case UPDATE_PHYSICAL_DEVICE:
            return Object.assign({}
                , state
                , {
                    physicalDevices: state.physicalDevices
                        .map(device => {
                            let id = action.id;
                            if (id == device.id){
                                return Object.assign({}, device, {
                                    featured: true
                                });
                            }else{
                                return Object.assign({}, device, {
                                    featured: false
                                });
                            }
                        }),
                    physicalDevice: action.device
                }
            );
        case INIT_PHYSICAL_DEVICES_STATE:
            return Object.assign({}
                , state
                , {
                    physicalDevices: state.physicalDevices
                        .map(device => {
                            return Object.assign({}
                                , device
                                , { featured: device.id === 1001 ? true : false });
                        }),
                }
            );
        default:
            return state;
    }
};

const initPhysicalDevicesState = function () {
    return {
        type: INIT_PHYSICAL_DEVICES_STATE
    };
};

const updatePhysicalDeviceList = function (devices) {
    return {
        type: UPDATE_PHYSICAL_DEVICE_LIST,
        devices: devices
    };
};

const updatePhysicalDeviceFeaturedState = function (id, featured) {
    return {
        type: UPDATE_PHYSICAL_DEVICE,
        id: id,
        featured: featured
    };
};

export {
    reducer as default,
    initialState as physicalDevicesInitialState,
    initPhysicalDevicesState,
    updatePhysicalDeviceFeaturedState,
    updatePhysicalDeviceList,
};



