import classNames from 'classnames';
import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import Box from '../box/box.jsx'
import styles from './upload-code-pane.css'
import Button from '../button-special/button.jsx'
import UploadingModal from './uploading-modal.jsx'
import UploadSuccModal from './upload-succ-modal.jsx'
import UploadFailModal from './upload-fail-modal.jsx'
import UploadTimeoutModal from './upload-timeout-modal.jsx'
import UploadArduinoSelect from './upload-arduino-select.jsx'
import MicrobitDownloadModal from './microbit-download-modal.jsx'
import NotOpenAssistantModal from '../cc-assistant-modal-special/not-open-assistant.jsx';
import IsUsedModal from '../cc-assistant-modal-special/is-used.jsx';
import icon_tishi from './icon-tishi.png';
import {
    STATE_UPLOADING_TAB,
    STATE_UPLOAD_SUCC_TAB,
    STATE_UPLOAD_FAIL_TAB,
    STATE_UPLOAD_TIMEOUT_TAB,
    STATE_UPLOAD_ARDUINO_SELECT,
    STATE_UNINSTALLED_ASSISTANT,
    STATE_ASSISTANT_OCCUPIED
} from '../../reducers/upload-state';

const UploadCodePane = (props) => {

    let localMessages = defineMessages({
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

    const uploadBtn = (
        <FormattedMessage
            defaultMessage="Upload"
            description=""
            id="gui.uploadCode.uploadBtn"
        />
    );

    const serialBtn = (
        <FormattedMessage
            defaultMessage="Serial Plotter"
            description=""
            id="gui.serialChart.serialChart"
        />
    );

    const downloadBtn = (
        <FormattedMessage
            defaultMessage="Download"
            description=""
            id="gui.uploadCode.downloadBtn"
        />
    );

    const openMonitorBtn = (
        <FormattedMessage
            defaultMessage="Serial monitor"
            description=""
            id="gui.uploadCode.openMonitorBtn"
        />
    );

    const disPromptForArdunio = (
        <FormattedMessage
            defaultMessage="Forgot sth.? Please connect the device before uploading"
            description=""
            id="gui.uploadCode.disPromptForArdunio"
        />
    );

    const disPromptForNormal = (
        <FormattedMessage
            defaultMessage="Please connect the device before uploading"
            description=""
            id="gui.uploadCode.disPromptForNormal"
        />
    );

    const {
        activeState,
        editingTarget,
        onCodeUpload,
        onOpenMonitor,
        onStateModalClose,
        isEquipmentConnected,
        isShowMicrobitPrompt,
        onCloseMicrobitPrompt,
        connectedDevice,
        onChangeWindowDownloadFlag,
        onOpenSerialChatView,
        onRapidUpgrade
    } = props;

    //  deviceid === 1002 GroveZero 设备
    const isShowGroveZero = editingTarget && editingTarget.getDeviceId() === 1001;
    // deviceid === 1002 arduino 设备
    const isShowMonitorBtns = editingTarget && editingTarget.getDeviceId() === 1002;
    // deviceid === 1004 mocrobit 设备
    const isShowMocribitBtns = editingTarget && editingTarget.getDeviceId() === 1004;
    // 
    const isShowElfbotBtns = editingTarget && editingTarget.getDeviceId() === 1003;

    const isShowMaixduino = editingTarget && editingTarget.getDeviceId() === 1005;

    const isShowGroveJoint = editingTarget && editingTarget.getDeviceId() === 1006;

    const isShowMPython = editingTarget && editingTarget.getDeviceId() === 1007;

    const isShowHaloboad = editingTarget && editingTarget.getDeviceId() === 1008;

    const isShowOpenCat = editingTarget && editingTarget.getDeviceId() === 1009;

    const isShowWioTerminal = editingTarget && editingTarget.getDeviceId() === 1010;

    // 未连接提示
    // const disPromptStr = isShowMonitorBtns ? disPromptForArdunio : disPromptForNormal;
    // 设备真正连接
    const precondition = connectedDevice && editingTarget;
    const isEquipmentRealConnected = isEquipmentConnected && (precondition && connectedDevice.id === editingTarget.getDeviceId());

    // microbit固件生成按钮
    const microbitBtns = (
        <div className={styles.buttonsView}>
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {downloadBtn}
            </Button>
            <div style={{ height: "0.625rem" }} />
        </div>
    );

    /**
     * G0 上传按钮view
     */
    const groveZeroView = (
        <div className={styles.buttonsView}>
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                disabled={!isEquipmentRealConnected}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>
            <div className={styles.uploadDisPrompt}>
                <img className={styles.iconTishi} src={icon_tishi} />
                {disPromptForNormal}
            </div>
        </div>
    )

    const arduinoView = (
        <div className={styles.buttonsView}>
            <Button
                disabled={!isEquipmentRealConnected}
                className={classNames(styles.uploadBtn)}
                type='default'
                size={'small'}
                iconClassName={styles.iconClassName}
                onClick={onOpenMonitor}>
                {openMonitorBtn}

            </Button>
            <div style={{ height: "0.63rem" }} />
            <Button
                size={'small'}
                disabled={!isEquipmentRealConnected}
                iconClassName={styles.iconClassName}
                className={styles.uploadBtn}
                onClick={onOpenSerialChatView}>
                {serialBtn}
            </Button>
            <div style={{ height: "0.63rem" }} />
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>

            <div className={styles.uploadDisPrompt}>
                <img className={styles.iconTishi} src={icon_tishi} />
                {disPromptForArdunio}
            </div>
        </div>
    )

    const groveJointView = (
        <div className={styles.buttonsView}>
            <Button
                disabled={!isEquipmentRealConnected}
                className={classNames(styles.uploadBtn)}
                type='default'
                size={'small'}
                iconClassName={styles.iconClassName}
                onClick={onOpenMonitor}>
                {openMonitorBtn}

            </Button>
            <div style={{ height: "0.63rem" }} />
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>
            <div style={{ height: "0.625rem" }} />
        </div>
    )

    const wioTerminalView = (
        <div className={styles.buttonsView}>
            <Button
                disabled={!isEquipmentRealConnected}
                className={classNames(styles.uploadBtn)}
                type='default'
                size={'small'}
                iconClassName={styles.iconClassName}
                onClick={onOpenMonitor}>
                {openMonitorBtn}

            </Button>
            <div style={{ height: "0.63rem" }} />
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>
            <div style={{ height: "0.625rem" }} />
        </div>
    )

    const elfbotView = (
        <div className={styles.buttonsView}>
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                disabled={!isEquipmentRealConnected}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>
            <div className={styles.btnTgWrapper2}>
                <div className={styles.burnWrap2}>
                    {props.intl.formatMessage(localMessages.unableConnectPrompt)}
                    &nbsp;
                    <a className={styles.burnWrap2Text} onClick={()=>{onRapidUpgrade()}}>
                        {props.intl.formatMessage(localMessages.upgradeText)}
                    </a>
                </div>
            </div>
        </div>
    );

    const mPythonView = (
        <div className={styles.buttonsView}>
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                disabled={!isEquipmentRealConnected}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>
            <div style={{ height: "0.63rem" }} />
            <Button
                size={'small'}
                disabled={!isEquipmentRealConnected}
                iconClassName={styles.iconClassName}
                className={styles.uploadBtn}
                onClick={onOpenSerialChatView}>
                {serialBtn}
            </Button>
            <div className={styles.btnTgWrapper2}>
                <div className={styles.burnWrap2}>
                    {props.intl.formatMessage(localMessages.unableConnectPrompt)}
                    &nbsp;
                    <a className={styles.burnWrap2Text} onClick={()=>{onRapidUpgrade()}}>
                        {props.intl.formatMessage(localMessages.upgradeText)}
                    </a>
                </div>
            </div>
        </div>
    );


    const cyberEyeView = (
        <div className={styles.buttonsView}>
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                disabled={!isEquipmentRealConnected}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>
            <div style={{ height: "0.63rem" }} />
            <Button
                size={'small'}
                disabled={!isEquipmentRealConnected}
                iconClassName={styles.iconClassName}
                className={styles.uploadBtn}
                onClick={onOpenSerialChatView}>
                {serialBtn}
            </Button>
            <div className={styles.btnTgWrapper2}>
                <div className={styles.burnWrap2}>
                    {props.intl.formatMessage(localMessages.unableConnectPrompt)}
                    &nbsp;
                    <a className={styles.burnWrap2Text} onClick={()=>{onRapidUpgrade()}}>
                        {props.intl.formatMessage(localMessages.upgradeText)}
                    </a>
                </div>
            </div>
        </div>
    );

    const haloboadView = (
        <div className={styles.buttonsView}>
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                disabled={!isEquipmentRealConnected}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>
            <div className={styles.btnTgWrapper2}>
                <div className={styles.burnWrap2}>
                    {props.intl.formatMessage(localMessages.unableConnectPrompt)}
                    &nbsp;
                    <a className={styles.burnWrap2Text} onClick={()=>{onRapidUpgrade()}}>
                        {props.intl.formatMessage(localMessages.upgradeText)}
                    </a>
                </div>
            </div>
        </div>
    );

    const openCatView = (
        <div className={styles.buttonsView}>
            <Button
                disabled={!isEquipmentRealConnected}
                className={classNames(styles.uploadBtn)}
                type='default'
                size={'small'}
                iconClassName={styles.iconClassName}
                onClick={onOpenMonitor}>
                {openMonitorBtn}

            </Button>
            <div style={{ height: "0.63rem" }} />
            <Button
                size={'small'}
                iconClassName={styles.iconClassName}
                className={styles.uploadBtn}
                onClick={onCodeUpload}>
                {uploadBtn}
            </Button>
            <div style={{ height: "0.625rem" }} />
        </div>
    )

    return (
        <Box className={styles.uploadCodePane}>

            {isShowGroveZero && groveZeroView}
            {isShowMonitorBtns && arduinoView}
            {isShowGroveJoint && groveJointView}
            {isShowWioTerminal && wioTerminalView}
            {isShowMocribitBtns && microbitBtns}
            {isShowElfbotBtns && elfbotView}
            {isShowMaixduino && cyberEyeView}
            {isShowMPython && mPythonView}
            {isShowOpenCat && openCatView} {/* 机器狗 */}
            {isShowHaloboad && haloboadView} {/* 超能环 */}

            {/* 上传中 */}
            {
                activeState === STATE_UPLOADING_TAB
                && <UploadingModal />
            }
            {/* 上传成功 */}
            {
                activeState === STATE_UPLOAD_SUCC_TAB
                && <UploadSuccModal
                    isShowGroveZero={isShowGroveZero}
                    onStateModalClose={onStateModalClose} />
            }
            {/* 上传失败 */}
            {
                activeState === STATE_UPLOAD_FAIL_TAB
                && <UploadFailModal onStateModalClose={onStateModalClose} />
            }
            {/* 上传超时 */}
            {
                activeState === STATE_UPLOAD_TIMEOUT_TAB
                && <UploadTimeoutModal
                    isShowGroveZero={isShowGroveZero}
                    onStateModalClose={onStateModalClose} />
            }
            {/* arduino 设备选择 */}
            {
                activeState === STATE_UPLOAD_ARDUINO_SELECT &&
                <UploadArduinoSelect />
            }
            {/* 设备助手没打开提示 */}
            {
                activeState === STATE_UNINSTALLED_ASSISTANT &&
                <NotOpenAssistantModal
                    updateWindowDownloadFlag={onChangeWindowDownloadFlag}
                    onRequestClose={onStateModalClose}
                />
            }
            {/* 在不同浏览器内、或者同一浏览器的不同窗口内，已连接了设备，弹出提示框： */}
            {
                activeState === STATE_ASSISTANT_OCCUPIED &&
                <IsUsedModal
                    onRequestClose={onStateModalClose}
                />
            }
            {/* microbit 下载提示 */}
            {
                isShowMicrobitPrompt &&
                <MicrobitDownloadModal
                    onRequestClose={onCloseMicrobitPrompt}
                />
            }
        </Box >
    );
}

export default injectIntl(UploadCodePane);
