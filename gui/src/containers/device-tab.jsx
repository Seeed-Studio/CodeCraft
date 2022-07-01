import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import VM from '../../../vm/';
import { setRestore } from '../reducers/restore-deletion';
import DragConstants from '../lib/drag-constants';
import { FormattedMessage } from 'react-intl';

import { closeDeviceViewMoreModal } from '../reducers/modals';
import {
    updatePhysicalDeviceFeaturedState,
} from '../reducers/physical-device';

import {
    openConnectView,
    closeConnectView,
    openDevicesLibrary,
    closeDevicesLibrary
} from '../reducers/modals';

import {
    MODE_ONLINE,
    MODE_OFFLINE,
    activateMode,
} from '../reducers/debug-mode';

import {
    updateSocketState,
    updateDeviceState,
    updateConnectedDevice,
    updateIsUpgradeState,
} from '../reducers/device-connect-special.js';

import {
    dispatch01
} from '../lib/event-dispatch.js';

import {
    setModalIndex as setRescueModalIndex,
    RESCUE_MODAL_HIDE,
    RESCUE_MODAL_DEVICE_SELECT,
    assignRescueDeviceTo
} from '../reducers/rescue';

import {
    closeSerialChartModal,
} from '../reducers/modals';

import {
    updateWindowDownloadFlag
} from '../reducers/window-event.js';

import { setVisible as setCodeViewVisible } from '../reducers/code-view';

// import devices from '../lib/libraries/devices/index.jsx'

import DeviceSelectorComponent from '../components/device-selector/device-selector.jsx'

const CONNECT_MODAL_NONE = -1;
const CONNECT_MODAL_IS_BEOCCUPIED = 0;
const CONNECT_MODAL_IS_SHOWDISCONNECTPROMPT = 1;
const CONNECT_MODAL_IS_UNOPENEDASSISTANT = 2;

class DeviceTab extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'handleBlockDragEnd',
            'handleDeleteDevice',
            'handleDuplicateDevice',
            'handleSelectDevice',
            'handleDeviceUpload',
            'handleFileUploadClick',
            'handleSelectPhysicalDevice',
            'handleDrop',
            'handAddDevice',
            'handLinkDevice',
            'handleClickDebugMode',
            'handlePromptCancel',
            'handlePromptClose',
            'handlePromptOk',
            'handleSocketDisconnect',
            'handleDeviceDisconnect',
            'handleSocketConnect',
            'handleDeviceConnect',
            'handleConnectModalClose',
            'handleOpenLinkView',
            'setFileInput',
            'getIconUrl',
            'onMessageResp',
            'handleRescueProcess',
            'handleOpenUrl'
        ]);
        this.state = {
            deletedInfo: null,
            isShowConnecting: false,
            isOpenDelConfirm: false,
            switchingConfirm: false,
            activeConnectModalTab: CONNECT_MODAL_NONE,
        };
    }

    componentDidMount() {

        dispatch01.on('message01-resp', this.onMessageResp);

        this.props.vm.on('socket-connect', this.handleSocketConnect);
        this.props.vm.on('socket-disconnect', this.handleSocketDisconnect);
        this.props.vm.on('device-connect', this.handleDeviceConnect);
        this.props.vm.on('device-disconnect', this.handleDeviceDisconnect);

        this.props.vm.addListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }

    componentWillUnmount() {

        dispatch01.removeListener('message01-resp', this.onMessageResp);

        this.props.vm.removeListener('socket-connect', this.handleSocketConnect);
        this.props.vm.removeListener('socket-disconnect', this.handleSocketDisconnect);
        this.props.vm.removeListener('device-connect', this.handleDeviceConnect);
        this.props.vm.removeListener('device-disconnect', this.handleDeviceDisconnect);

        this.props.vm.removeListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }

    handleBlockDragEnd(blocks) {
        // if (this.props.hoveredTarget.sprite
        //     && this.props.hoveredTarget.sprite !== this.props.editingTarget) {
        //     this.props.vm.shareBlocksToTarget(blocks, this.props.hoveredTarget.sprite, this.props.editingTarget);
        //     this.props.onReceivedBlocks(true);
        // }
    }

    /**
     * 删除设备角色
     * Delete device
     * @param {*} id 
     */
    handleDeleteDevice(object) {
        this.setState({
            deletedInfo: object,
            isOpenDelConfirm: true
        });
    }

    handleDuplicateDevice(id) {

    }

    handleSelectDevice(id) {
        if (id && id === this.props.editingTarget) return;
        this.props.vm.setEditingTarget(id);
        this.props.vm.setEditingTargetForDevice(id);
        // this.props.activateDebugMode(MODE_OFFLINE);
    }

    handleDeviceUpload(e) {

    }

    handleFileUploadClick() {

    }

    handleSocketDisconnect() {
        if (!this.props.isEquipmentConnected) {
            this.props.updateSocketState(false);
            this.props.updateIsUpgradeState(false);
            return;
        } else {
            this.props.onRequestCloseConnectView();
            this.props.updateDeviceState(false);
            this.props.updateSocketState(false);
            this.props.updateIsUpgradeState(false);
            this.setState({ activeConnectModalTab: CONNECT_MODAL_IS_SHOWDISCONNECTPROMPT });
            this.props.vm.setDebugMode(0);
            this.props.vm.stopAll();

        }
        this.props.activateDebugMode(MODE_OFFLINE);
    }

    handleSocketConnect() {
        this.props.updateSocketState(true);
    }

    handleDeviceDisconnect(args) {
        if (args && args.disType === 1) {
            this.props.updateDeviceState(false);
            this.props.updateIsUpgradeState(false);
            this.props.updateConnectedDevice(null);
        } else {
            this.props.updateDeviceState(false);
            this.props.updateIsUpgradeState(false);
            this.props.onRequestCloseConnectView();
            this.setState({ activeConnectModalTab: CONNECT_MODAL_IS_SHOWDISCONNECTPROMPT });
            this.props.vm.setDebugMode(0);
        }
        this.props.activateDebugMode(MODE_OFFLINE);
    }

    handleDeviceConnect() {
        this.props.updateDeviceState(true);
    }

    handleDrop(dragInfo) {
        let index = dragInfo.index;
        let newIndex = dragInfo.newIndex;

        const sprites = Object.keys(this.props.sprites)
            .map(id => this.props.sprites[id])
            .filter((sprite) => sprite.type === 'device')
        const sprite = sprites[index];
        const newSprite = sprites[newIndex];

        // Add one to both new and target index because we are not counting/moving the stage
        if (dragInfo.dragType === DragConstants.SPRITE) {
            this.props.vm.reorderTarget(sprite.order + 1, newSprite.order + 1);
        }
    }

    handlePromptClose() {
        this.setState({
            onSwitchDevie: undefined,
            switchingConfirm: false
        });
    }

    handlePromptCancel() {
        if (this.state.onSwitchDevie) {
            this.state.onSwitchDevie();
            this.setState({
                onSwitchDevie: undefined,
                switchingConfirm: false
            });
            dispatch01.emit('message01', { action: "newProject" });
        }
    }

    handlePromptOk() {
        this.setState({
            switchingConfirm: false
        }, () => {
            dispatch01.emit('message01', {
                action: "saveProject",
                projectType: "switchEquipment"
            });
        });
        this.props.onRequestCloseDevicesLibrary();
    }

    onMessageResp(args) {
        let {
            action
        } = args;
        if (action == 'switchEquipment' &&
            this.state.onSwitchDevie) {
            this.state.onSwitchDevie();
            dispatch01.emit('message01', { action: "newProject" });
        }
    }

    // const {
    //     id,
    //     deviceId
    // } = this.state.deletedInfo;
    // //备份数据，用于数据恢复
    // const restoreFun = this.props.vm.deleteSprite(id);
    // this.props.dispatchUpdateRestore({
    //     restoreFun: restoreFun,
    //     deletedItem: 'Sprite'
    // });
    // //更新设备选择状态
    // this.props.onUpdatePhysicalDeviceState(deviceId, false);
    // //重置临时状态
    // this.setState({
    //     deletedInfo: null,
    //     isOpenDelConfirm: false
    // })
    // // this.props.activateDebugMode(MODE_OFFLINE);
    // console.log("handlePromptOk ------------- ")

    handleSelectPhysicalDevice(device, index) {
        //如果已选择不处理  If selected, return
        //关闭物理设备列表窗口  Close devices list window
        if (device.featured) {
            this.props.onRequestCloseDevicesLibrary();
            return;
        }
        //切换设备  Switch device
        const switchDevice = () => {
            //添加设备角色  Add a device
            this.props.vm.loadDeviceProject(device,device.id).then(() => {
                //更新物理设备列表显示状态  Update device list display state
                this.props.onRequestCloseDevicesLibrary();
                //关闭串口图表界面  Close serial chart modal
                this.props.onCloseSerialChartModal();
                //更新设备选择状态  Update device selection state
                this.props.onUpdatePhysicalDeviceState(device.id, true);
                //重置code view  Reset code view
                this.props.setCodeViewVisible(false);
                //断开串口设备  Disconnect serial device
                this.props.disconnect().then(() => { this.props.resetDebugMode() });
            }).catch((err) => {
                console.log("handleSelectPhysicalDevice loadDeviceProject ... ", err);
            });
        }
        //获取工程是否提示保存  Get if project is saved
        let isProjectSaved = this.props.isProjectSaved;
        if (isProjectSaved) {
            switchDevice();
            dispatch01.emit('message01', { action: "newProject" });
        } else {
            this.setState({
                onSwitchDevie: switchDevice,
                switchingConfirm: true
            });
        }
    }

    handAddDevice() {
        this.props.openDevicesLibrary();
    }

    handLinkDevice() {
        this.setState({ isShowConnecting: true });
        this.props.open().then(() => {
            this.props.openConnectView();
            this.setState({ isShowConnecting: false });
        }, (errorCode) => {
            //关闭加载view弹窗  Close connecting modal
            this.setState({ isShowConnecting: false });
            //错误判断 (超时、被占)  Error handler
            if (-1 === errorCode) {
                this.setState({
                    activeConnectModalTab: CONNECT_MODAL_IS_BEOCCUPIED
                })
            } else {
                this.setState({
                    activeConnectModalTab: CONNECT_MODAL_IS_UNOPENEDASSISTANT
                })
            }
        });
    }

    /**
     *  • 在线调试：
     *  在线调试功根据当前选中的设备，展示不同的状态；
     *  a 支持在线调试的设备：
     *  默认关闭，点击可进行打开或关闭的切换；
     *  在线调试关闭时，点击编辑区积木块，不对设备进行在线运行；（当设备正在在线运行时，关闭在线调试，会马上关闭在线运行）
     *  在线调试开启时，点击编辑区积木块，可对设备进行在线运行；
     *  b 不支持在线调试的设备：
     *  默认关闭，且不可开启
     *
     */
    handleClickDebugMode() {
        // 切离线
        if (this.props.debugMode === MODE_ONLINE) {
            this.props.vm.setDebugMode(0);
            this.props.vm.stopAll();
            this.props.activateDebugMode(MODE_OFFLINE);
        }
        // 切在线
        else {
            this.props.vm.setDebugMode(1);
            this.props.activateDebugMode(MODE_ONLINE);
        }
        // 切换调试模式
    }

    handleConnectModalClose() {
        if (this.state.activeConnectModalTab
            === CONNECT_MODAL_IS_SHOWDISCONNECTPROMPT) {
            this.props.updateConnectedDevice(null);
        }
        this.setState({ activeConnectModalTab: CONNECT_MODAL_NONE })
    }

    setFileInput(input) {

    }

    /**
     * 根据设备id
     * 获取对应icon
     * @param {*} id 
     */
    getIconUrl(id) {
        const device = this.props.physicalDevices.find(
            (device) => {
                return device.id === id;
            }
        );
        return device ? device.iconURL : "##";
    }

    /**
     * 打开设备连接界面
     */
    handleOpenLinkView() {
        this.props.openConnectView();
    }

    handleRescueProcess(device) {
        if (device.deviceId == 1007) {
            this.props.assignRescueDeviceTo({
                type: 'mpython', label: (
                    <FormattedMessage
                        defaultMessage="mPython"
                        description=""
                        id="gui.devices.mpython.name"
                    />
                )
            })
        } else if (device.deviceId == 1005) {
            this.props.assignRescueDeviceTo({
                type: 'maixduino', label: (
                    <FormattedMessage
                        defaultMessage="M.A.R.K(cyberEye)"
                        description=""
                        id="gui.devices.maixduino.name"
                    />
                )
            })
        } else if (device.deviceId == 1008) {
            this.props.assignRescueDeviceTo({
                type: 'powering', label: (
                    <FormattedMessage
                        defaultMessage="Glint"
                        description=""
                        id="gui.devices.powering.name"
                    />
                )
            })
        } 
        //关闭串口图表界面
        this.props.onCloseSerialChartModal();
        this.props.vm.deviceEngine.open().then(
            () => {
                this.props.vm.deviceEngine.interruptMicroPython();
                this.props.setRescueModalIndex(RESCUE_MODAL_DEVICE_SELECT);
            }, errorCode => {
                if (-1 == errorCode) {
                    this.setState({
                        activeConnectModalTab: CONNECT_MODAL_IS_BEOCCUPIED
                    })
                } else {
                    this.setState({
                        activeConnectModalTab: CONNECT_MODAL_IS_UNOPENEDASSISTANT
                    })
                }
            });
    }

    handleOpenUrl(url) {
        const message = {
            action: 'open-document',
            args: {
                url
            }
        }
        this.props.vm.deviceEngine.sendWindowMessage(message);
    }

    render() {

        const {
            vm, // eslint-disable-line no-unused-vars
            disconnect,
            resetDebugMode,
            // onReceivedBlocks, // eslint-disable-line no-unused-vars
            dispatchUpdateRestore, // eslint-disable-line no-unused-vars
            sprites,
            isConnected,
            isEquipmentConnected,
            raiseSprites,
            physicalDevices,
            updateIsUpgradeState,
            onUpdatePhysicalDeviceState,
            openDevicesLibrary,
            onRequestCloseDevicesLibrary,
            openConnectView,
            onRequestCloseConnectView,
            activateDebugMode,
            assignRescueDeviceTo,
            onCloseSerialChartModal,
            ...componentProps
        } = this.props;
        const spritesData = Object.keys(sprites)
            .map(id => sprites[id])
            .filter((sprite) => sprite.type === 'device');
        const devices = physicalDevices.filter(i => i.enabled);

        return (
            <DeviceSelectorComponent
                {...componentProps}
                devices={devices}
                sprites={spritesData}
                raised={raiseSprites}
                getIconUrl={this.getIconUrl}
                onPromptCanel={this.handlePromptCancel}
                onPromptClose={this.handlePromptClose}
                onPromptOk={this.handlePromptOk}
                connectingVisible={this.state.isShowConnecting}
                isOpenDelConfirm={this.state.isOpenDelConfirm}
                switchingConfirm={this.state.switchingConfirm}
                activeConnectModalTab={this.state.activeConnectModalTab}
                onDeleteDevice={this.handleDeleteDevice}
                onDrop={this.handleDrop}
                onDuplicateDevice={this.handleDuplicateDevice}
                onSelectDevice={this.handleSelectDevice}
                onLinkDevice={this.handLinkDevice}
                onAddDevice={this.handAddDevice}
                onClickDebugMode={this.handleClickDebugMode}
                onSelectPhysicalDevice={this.handleSelectPhysicalDevice}
                onClose={onRequestCloseDevicesLibrary}
                onConnectModalClose={this.handleConnectModalClose}
                onOpenLinkView={this.handleOpenLinkView}
                onRescueProcess={this.handleRescueProcess}
                onOpenUrl={this.handleOpenUrl}
            />
        );

    }
}

DeviceTab.propTypes = {
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    raiseSprites: PropTypes.bool,
    selectedId: PropTypes.string,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            order: PropTypes.number.isRequired
        })
    }),
    vm: PropTypes.instanceOf(VM),
    connectModalVisible: PropTypes.bool,
    devicesLibraryVisible: PropTypes.bool,
    physicalDevice: PropTypes.object,
    physicalDevices: PropTypes.array,
    onUpdatePhysicalDeviceState: PropTypes.func,
    openDevicesLibrary: PropTypes.func,
    onRequestCloseDevicesLibrary: PropTypes.func,
    openConnectView: PropTypes.func,
    onRequestCloseConnectView: PropTypes.func,
    onSetDeviceVisible: PropTypes.func,
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    hoveredTarget: state.scratchGui.hoveredTarget,
    physicalDevice: state.scratchGui.physicalDevice.physicalDevice,
    physicalDevices: state.scratchGui.physicalDevice.physicalDevices,
    sprites: Object.keys(state.scratchGui.targets.sprites).reduce((sprites, k) => {
        let { direction, size, x, y, ...sprite } = state.scratchGui.targets.sprites[k];
        if (typeof direction !== 'undefined') direction = Math.round(direction);
        if (typeof x !== 'undefined') x = Math.round(x);
        if (typeof y !== 'undefined') y = Math.round(y);
        if (typeof size !== 'undefined') size = Math.round(size);
        sprites[k] = { ...sprite, direction, size, x, y };
        return sprites;
    }, {}),
    isProjectSaved: state.scratchGui.material.isProjectSaved,
    isProjectSaving: state.scratchGui.projectState.isProjectSaving,
    devicesLibraryVisible: state.scratchGui.modals.devicesLibrary,
    connectModalVisible: state.scratchGui.modals.connect,
    viewMoreModalVisible: state.scratchGui.modals.deviceViewMore,
    stage: state.scratchGui.targets.stage,
    raiseSprites: state.scratchGui.blockDrag,
    open: () => state.scratchGui.vm.deviceEngine.open(),
    disconnect: () => { return state.scratchGui.vm.deviceEngine.disconnect() },
    resetDebugMode: () => { state.scratchGui.vm.setDebugMode(0) },
    debugMode: state.scratchGui.debugMode.activeMode,
    isConnected: state.scratchGui.deviceConnect.isConnected,
    isEquipmentConnected: state.scratchGui.deviceConnect.isEquipmentConnected,
    connectedDevice: state.scratchGui.deviceConnect.connectedDevice,
});

const mapDispatchToProps = dispatch => ({
    onUpdatePhysicalDeviceState: (id, featured) => {
        dispatch(updatePhysicalDeviceFeaturedState(id, featured));
    },
    // onReceivedBlocks: receivedBlocks => {
    //     dispatch(setReceivedBlocks(receivedBlocks));
    // },
    setCodeViewVisible: v => dispatch(setCodeViewVisible(v)),
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    },
    openDevicesLibrary: () => {
        dispatch(openDevicesLibrary())
    },
    onRequestCloseDevicesLibrary: () => {
        dispatch(closeDevicesLibrary())
    },
    openConnectView: () => {
        dispatch(openConnectView())
    },
    onRequestCloseConnectView: () => {
        dispatch(closeConnectView())
    },

    updateSocketState: (value) => {
        dispatch(updateSocketState(value));
    },
    updateDeviceState: (value) => {
        dispatch(updateDeviceState(value));
    },

    updateConnectedDevice: (value) => {
        dispatch(updateConnectedDevice(value));
    },
    activateDebugMode: (mode) => {
        dispatch(activateMode(mode));
    },
    updateIsUpgradeState: (isUpgrade) => {
        dispatch(updateIsUpgradeState(isUpgrade))
    },
    updateWindowDownloadFlag: (flag) => {
        dispatch(updateWindowDownloadFlag(flag))
    },
    assignRescueDeviceTo: (device) => {
        dispatch(assignRescueDeviceTo(device))
    },
    setRescueModalIndex: index => dispatch(setRescueModalIndex(index)),
    onCloseViewMoreModal: () => dispatch(closeDeviceViewMoreModal()),
    onCloseSerialChartModal: () => dispatch(closeSerialChartModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceTab);


