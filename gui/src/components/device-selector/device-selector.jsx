import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import G0HoldMethodComponent from '../g0-hold-method/g0-hold.jsx';

import React from 'react';
import { defineMessages, FormattedMessage, intlShape, injectIntl } from 'react-intl';
import Divider from '../divider/divider.jsx';
import DeviceListComponent from './device-list.jsx'

import UploadCode from '../../containers/upload-code.jsx';

import Modal from '../../containers/modal.jsx'
import Prompt from '../prompt-special/prompt.jsx';
import PhysicalDeviceListComponent from './physical-device-list.jsx'
import ConnectModal from '../../containers/connect-modal.jsx';

import NotOpenAssistantModal from '../cc-assistant-modal-special/not-open-assistant.jsx';
import IsUsedModal from '../cc-assistant-modal-special/is-used.jsx';
import HasDisconnectedModal from '../cc-assistant-modal-special/has-disconnected.jsx';

import ConnectingModal from './connecting-modal.jsx';

import DeviceViewMoreModal from '../device-view-more/device-view-more.jsx';

import styles from './device-selector.css';

import btnTrggleOff from './btn-trggle-off.png';
import btnTrggleOn from './btn-trggle-on.png';
import btnTrggleDisOff from './btn-trggle-off-d.png';
import btnTrggleDisOn from './btn-trggle-on-d.png';

import iconExtend from './icon-extend.svg';
import iconLink from './icon-link.svg';

import modes from '../../lib/libraries/devices/program-modes';

const promptid = "789348734673";
const contentLabel = "Device deletion confirmation"

import {
    MODE_ONLINE,
    MODE_OFFLINE
} from '../../reducers/debug-mode';

let localMessages = defineMessages({
    onlySupportOfflinePrompt: {
        defaultMessage: 'only supports upload mode',
        description: '',
        id: 'gui.device.onlyOfflinePrompt'
    },
    onlySupportOnlinePrompt: {
        defaultMessage: 'only supports online mode',
        description: '',
        id: 'gui.device.onlyOnlinePrompt'
    },
    onlySupportDownloadPrompt: {
        defaultMessage: 'only supports download mode',
        description: '',
        id: 'gui.device.onlyDownloadPrompt'
    },
    unableConnectPrompt: {
        defaultMessage: 'Failed connection?',
        description: '',
        id: 'gui.device.unableConnectPrompt'
    },
    upgradeText: {
        defaultMessage: 'Update the firmware immediately',
        description: '',
        id: 'gui.device.upgradeText'
    }
});

const DeviceSelectorComponent = (props) => {

    const {
        editingTarget,
        hoveredTarget,
        intl,
        onDeleteDevice,
        onDuplicateDevice,
        onSelectDevice,
        onDrop,
        onAddDevice,
        onLinkDevice,
        onClickDebugMode,
        onOpenLinkView,
        onSelectPhysicalDevice,
        onClose,
        getIconUrl,
        devicesLibraryVisible,
        viewMoreModalVisible,
        raised,
        sprites,
        devices,
        onPromptCanel,
        onPromptClose,
        onPromptOk,
        // isOpenDelConfirm,
        switchingConfirm,
        activeConnectModalTab,
        connectModalVisible,
        connectingVisible,
        connectedDevice,
        onOpenUrl,
        onConnectModalClose,
        onRescueProcess,
        onCloseViewMoreModal,
        updateWindowDownloadFlag,
        debugMode,
        stageSize,
        isProjectSaving
    } = props;

    const isStageLarge = stageSize == 'large';

    const addDevice = (
        <FormattedMessage
            defaultMessage="Switch Device"
            description=""
            id="gui.device.selector.adddevice"
        />
    );
    const linkDevice = (
        <FormattedMessage
            defaultMessage="Connect"
            description=""
            id="gui.device.selector.linkdevice"
        />
    );

    const promptTitle = (
        <FormattedMessage
            defaultMessage="Promt"
            description=""
            id="gui.device.delete.promptLabel"
        />
    );

    const promptMessage = (
        <FormattedMessage
            defaultMessage="Switching device will create a new project,  whether  to save current project?"
            description=""
            id="gui.device.switching.promptMessage"
        />
    );

    const promptCancelText = (
        <FormattedMessage
            defaultMessage="Do not save"
            description=""
            id="gui.device.switching.notSave"
        />
    );

    const promptOkText = (
        <FormattedMessage
            defaultMessage="Save"
            description=""
            id="gui.device.switching.save"
        />
    );

    // const promptText = (
    //     <FormattedMessage
    //         defaultMessage="是否删除该设备？"
    //         description=""
    //         id="gui.device.delete.prompt"
    //     />
    // );

    // const promptCancelText = (
    //     <FormattedMessage
    //         defaultMessage="不删除"
    //         description=""
    //         id="gui.device.delete.cancel"
    //     />
    // );

    // const promptOkText = (
    //     <FormattedMessage
    //         defaultMessage="删除"
    //         description=""
    //         id="gui.device.delete.ok"
    //     />
    // );

    const funcDebugModeLabel = (
        <FormattedMessage
            defaultMessage="Online debug"
            description=""
            id="gui.device.debugModeLabel"
        />
    );


    const editingDevice = sprites.find((sprite) => editingTarget === sprite.id);
    const {
        isSupportOnline,
        isSupportOffline,
        isSupportDownload,
    } = modes[editingDevice ? editingDevice.deviceId : 1000];

    // const {
    //     name
    // } = names[editingDevice ? editingDevice.deviceId : 1000];

    // const isOnlySupportOnline = isSupportOnline && !isSupportOffline && !isSupportDownload;
    // const isOnlySupportOffline = !isSupportOnline && isSupportOffline && !isSupportDownload;
    // const isOnlySupporDownload = !isSupportOnline && !isSupportOffline && isSupportDownload;
    // const isShowBurnEntrance = editingDevice && (editingDevice.deviceId == 1007 || editingDevice.deviceId == 1005);

    const alltSupport = isSupportOnline && isSupportOffline;

    const isGroveZero = editingDevice && editingDevice.deviceId == 1001;

    const deviceType = editingDevice ? editingDevice.deviceId : 1000;

    // const isOnlySupportOnlineView = (
    //     <img src={btnTrggleDisOn} />
    // );
    // const isOnlySupportOfflineView = (
    //     <img src={btnTrggleDisOff} />
    // );

    const alltSupportView = (
        <img onClick={onClickDebugMode} src={debugMode === MODE_ONLINE ? btnTrggleOn : btnTrggleOff} className={styles.allSupportView} />
    );

    let deviceName = null;
    if (connectedDevice) {
        let comName = connectedDevice.comName;
        let control = connectedDevice.control;
        deviceName = control ? control + " " + comName : comName;
    } else {
        deviceName = '';
    }

    return (
        <Box className={classNames(
            styles.deviceSelectorWrapper,
            {
                [styles.isLarge]: isStageLarge
            }
        )}>
            <div>
                <DeviceListComponent
                    editingTarget={editingTarget}
                    hoveredTarget={hoveredTarget}
                    items={sprites}
                    raised={raised}
                    selectedId={editingTarget}
                    onDrop={onDrop}
                    getIconUrl={getIconUrl}
                    onDeleteDevice={onDeleteDevice}
                    onDuplicateDevice={onDuplicateDevice}
                    onSelectDevice={onSelectDevice}
                    onOpenLinkView={onOpenLinkView}
                />
                <Box className={styles.btnsWrapper}>
                    <Box className={styles.deviceSelectorFuncWrapper}>
                        <Box
                            className={styles.deviceSelectorActionBtn}
                            onClick={isProjectSaving ? null : onAddDevice}>
                            <img src={iconExtend} className={styles.iconDeviceAdd} />
                            <Box>{addDevice}</Box>
                        </Box>
                        <Box className={styles.dividerVertical} />
                        <Box
                            className={styles.deviceSelectorActionBtn}
                            onClick={onLinkDevice}>
                            <img src={iconLink} className={styles.iconDeviceLink} />
                            <Box>{linkDevice}</Box>
                        </Box>
                    </Box>
                    {/* 横向分割线 Horizontal Divider */}
                    <Box className={styles.dividerHorizontal} />
                    {/* 支持在线、离线模式  Support online/offline mode */}
                    {alltSupport &&
                        (<Box className={styles.btnTrggleWrapper}>
                            <div className={styles.btnTrggleFlow}>
                                {funcDebugModeLabel}
                            </div>
                            <div className={styles.btnTrggleFlow}>
                                {alltSupportView}
                            </div>
                        </Box>)
                    }
                    {/* 横向分割线 Horizontal Divider */}
                    {alltSupport && <Box className={styles.dividerHorizontal} />}
                    {/* 上传按钮区域  Update button area */}
                    <div style={{ marginTop: "0.63rem" }}>
                        <UploadCode onRapidUpgrade={() => { onRescueProcess(editingDevice) }} />
                    </div>
                    {/* 只支持离线模式 */}
                    {/* {
                    (isOnlySupportOffline && !isShowBurnEntrance) &&
                    (
                        <Box className={styles.btnTrggleWrapper2}>
                            <div className={styles.burnTextWrap1}>{name}&nbsp;&nbsp;{intl.formatMessage(localMessages.onlySupportOfflinePrompt)}</div>
                        </Box>
                    )
                } */}
                    {/* 只支持离线模式 */}
                    {/* {
                    (isOnlySupportOffline && isShowBurnEntrance) &&
                    (
                        <Box className={styles.btnTrggleWrapper2}>
                            <div className={styles.burnTextWrap1}>{name}&nbsp;&nbsp;{intl.formatMessage(localMessages.onlySupportOfflinePrompt)}</div>
                            <div className={styles.burnTextWrap2}>{intl.formatMessage(localMessages.unableConnectPrompt)}&nbsp;<a className={styles.burnText} onClick={() => onRescueProcess(editingDevice)}>{intl.formatMessage(localMessages.upgradeText)}</a></div>
                        </Box>
                    )
                } */}
                    {/* 只支持在线模式 */}
                    {/* {
                    isOnlySupportOnline &&
                    (
                        <Box className={styles.btnTrggleWrapper2}>
                            <div className={styles.burnTextWrap1}>{name}&nbsp;&nbsp;{intl.formatMessage(localMessages.onlySupportOnlinePrompt)}</div>
                        </Box>
                    )
                } */}
                    {/* 仅支持下载模式 */}
                    {/* {
                    isOnlySupporDownload &&
                    (
                        <Box className={styles.btnTrggleWrapper2}>
                            <div className={styles.burnTextWrap1}>{name}&nbsp;&nbsp;{intl.formatMessage(localMessages.onlySupportDownloadPrompt)}</div>
                        </Box>
                    )
                } */}
                </Box>
            </div>
            {/* 显示G0正确手持方法  Show how to hold G0 correctly */}
            <div style={{ flexGrow: 1, flexBasis: 0, overflow: 'auto' }}>
                {
                    isGroveZero &&
                    <G0HoldMethodComponent />
                }
            </div>

            {/* 物理设备列表  List for physical devices */}
            {devicesLibraryVisible &&
                <Modal
                    id={`43143242424e`}
                    contentLabel={contentLabel}
                    showClose={true}
                    cancelable={true}
                    onRequestClose={onClose}
                    className={styles.deviceModalContent}>

                    <Box className={styles.deviceModalHeader}>
                        {addDevice}
                    </Box>
                    <Box className={styles.devicesScrollWrapper}>
                        <PhysicalDeviceListComponent
                            devices={devices}
                            onSelect={onSelectPhysicalDevice} />
                    </Box>
                </Modal>
            }
            {/* 确认删除 */}
            {/* {
                isOpenDelConfirm &&
                <Prompt
                    id={promptid}
                    showClose={false}
                    contentLabel={contentLabel}
                    label={promptTitle}
                    message={promptText}
                    cancelLabel={promptCancelText}
                    okLabel={promptOkText}
                    onOk={onPromptOk}
                    onCancel={onPromptCanel}
                />
            } */}
            {/* 设备详情布局  Detail view for a device */}
            {viewMoreModalVisible &&
                <DeviceViewMoreModal
                    deviceType={deviceType}
                    onOpenUrl={onOpenUrl}
                    onRequestClose={onCloseViewMoreModal}
                />}

            {/* 未下载或者已下载但未打开设备助手软件  Assistant not open*/}
            {
                activeConnectModalTab === 2 &&
                <NotOpenAssistantModal
                    updateWindowDownloadFlag={updateWindowDownloadFlag}
                    onRequestClose={() => { onConnectModalClose() }}
                />
            }
            {/* 在不同浏览器内、或者同一浏览器的不同窗口内，已连接了设备，弹出提示框： Already connected the device on other browser tab/window */}
            {
                activeConnectModalTab === 0 &&
                <IsUsedModal
                    onRequestClose={() => { onConnectModalClose() }}
                />
            }
            {/* 设备连接成功后，使用期间发生异常而自动断开连接时（如设备助手被关闭或卸载、驱动被卸载等）弹出提示框： */}
            {/* Disconnect to the device due to exception (device assistant closed, driver uninstalled, etc.) occur during connection */}
            {
                activeConnectModalTab === 1 &&
                <HasDisconnectedModal
                    deviceName={deviceName}
                    onRequestClose={() => { onConnectModalClose() }}
                />
            }
            {/* 设备连接相关弹框  Modal for connection */}
            {
                connectModalVisible &&
                <ConnectModal />
            }

            {/* 连接中状态 Modal during connection */}
            {
                connectingVisible && <ConnectingModal />
            }

            {/* 切换设备二次确认 Double confirmation for switching device */}

            {
                switchingConfirm &&
                <Prompt
                    id={"switching-confirm"}
                    contentLabel={"Confirm the second time of switching equipment"}
                    showClose={true}
                    label={promptTitle}
                    message={promptMessage}
                    cancelLabel={promptCancelText}
                    okLabel={promptOkText}
                    onOk={onPromptOk}
                    onCancel={onPromptCanel}
                    onClose={onPromptClose}
                />
            }
        </Box>
    )
}

DeviceSelectorComponent.propTypes = {
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    intl: intlShape.isRequired,
    onDrop: PropTypes.func,
    onDeleteDevice: PropTypes.func,
    onDuplicateDevice: PropTypes.func,
    onSelectDevice: PropTypes.func,
    onAddDevice: PropTypes.func,
    onLinkDevice: PropTypes.func,
    onClose: PropTypes.func,
    onSelectPhysicalDevice: PropTypes.func,
    getIconUrl: PropTypes.func,
    raised: PropTypes.bool,
    openPhysicalDeviceLibrarie: PropTypes.bool,
    activeConnectModalTab: PropTypes.number,
    connectingVisible: PropTypes.bool,
    connectModalVisible: PropTypes.bool,
    onConnectModalClose: PropTypes.func,
    onOpenLinkView: PropTypes.func,
    selectedId: PropTypes.string,
    devices: PropTypes.array,
    sprites: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
    })),
};

export default injectIntl(DeviceSelectorComponent);
