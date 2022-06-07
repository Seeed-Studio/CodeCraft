import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import UploadCodePane from '../components/upload-code/upload-code-pane.jsx'
import ScratchBlocks from '../../../blocks';
import toCode from '../lib/to-code.js';
import { produceHex } from '../lib/microbit-util.js';
import { setVisible as setArduinoMonitorVisible } from '../reducers/arduino-monitor'

import {
    activateState,
    STATE_UPLOAD_NONE,
    STATE_UPLOADING_TAB,
    STATE_UPLOAD_SUCC_TAB,
    STATE_UPLOAD_FAIL_TAB,
    STATE_UPLOAD_ARDUINO_SELECT,
    STATE_UNINSTALLED_ASSISTANT,
    STATE_ASSISTANT_OCCUPIED
} from '../reducers/upload-state';

import {
    updateWindowDownloadFlag
} from '../reducers/window-event.js';

import {
    MODE_ONLINE,
    MODE_OFFLINE,
    activateMode,
} from '../reducers/debug-mode';

import {
    openSerialChartModal,
    closeSerialChartModal,
} from '../reducers/modals';


class UploadCode extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'handleCodeUpload',
            'handleStateModalClose',
            'chCodeUpload',
            'arduinoCodeUpload',
            'microbitUpload',
            'onOpenMonitor',
            'handleSocketDisconnect',
            'handleChangeWindowDownloadFlag',
            'handleCloseMicrobitPrompt',
            'handleOpenSerialChatView',
        ]);

        this.state = {
            isShowMicrobitPrompt: false
        }
    }

    componentDidMount() {
        this.props.vm.on('socket-disconnect', this.handleSocketDisconnect);
    }

    componentWillUnmount() {
        this.props.vm.removeListener('socket-disconnect', this.handleSocketDisconnect);
    }

    handleSocketDisconnect() {
        if (this.props.activeState != STATE_UPLOAD_NONE) this.props.activateState(STATE_UPLOAD_NONE);
    }

    onOpenMonitor() {
        this.props.setArduinoMonitorVisible(true);
    }

    handleCodeUpload() {
        let deviceId = this.props.vm.editingTarget.getDeviceId();
        switch (deviceId) {
            case 1001:
            case 1005:
            case 1007:
            case 1008:
                this.chCodeUpload();
                break;
            case 1002:
            case 1006:
            case 1009:
            case 1010://wio Terminal
                this.arduinoCodeUpload();
                break;
            case 1004:
                this.microbitUpload();
                break;
        }
        // 关闭在线运行的程序
        this.props.vm.stopAll();
        // 关闭串口图表窗口
        this.props.closeSerialChartModalState();
    }

    chCodeUpload() {
        // 条件满足进行烧录
        if (this.props.isConnected
            && this.props.isEquipmentConnected) {
            // 更新烧录状态
            this.props.vm.setDebugMode(0);
            this.props.activateState(STATE_UPLOADING_TAB);
            this.props.activateDebugMode(MODE_OFFLINE);
            let deviceId = this.props.vm.editingTarget.getDeviceId();
            let workspace = ScratchBlocks.getMainWorkspace();
            let code = toCode(ScratchBlocks, workspace, deviceId);
            this.props.vm.deviceEngine.upload(code).then(() => {
                console.log('烧录成功');
                this.props.activateState(STATE_UPLOAD_SUCC_TAB);
            }, () => {
                console.log('烧录失败');
                this.props.activateState(STATE_UPLOAD_FAIL_TAB);
            });
        }
    }

    arduinoCodeUpload() {
        this.props.vm.deviceEngine.open().then(
            () => {
                this.props.activateState(STATE_UPLOAD_ARDUINO_SELECT);
            },
            errorCode => {
                //console.log(errorCode);
                //错误判断 (超时、被占)
                if (-1 === errorCode) {
                    this.props.activateState(STATE_ASSISTANT_OCCUPIED);
                } else {
                    this.props.activateState(STATE_UNINSTALLED_ASSISTANT);
                }
            }
        );
    }

    async microbitUpload() {
        let deviceId = this.props.vm.editingTarget.getDeviceId();
        let code = toCode(ScratchBlocks, ScratchBlocks.getMainWorkspace(), deviceId);

        let hex = await produceHex(code);
        let blob = new Blob([hex], { type: "application/octet-stream" });
        let downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        let url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "microbit.hex";
        downloadLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);

        this.setState({ isShowMicrobitPrompt: true });
    }

    handleStateModalClose() {
        this.props.activateState(STATE_UPLOAD_NONE);
    }

    handleChangeWindowDownloadFlag(flag) {
        this.props.updateWindowDownloadFlag(flag);
    }

    handleCloseMicrobitPrompt() {
        this.setState({ isShowMicrobitPrompt: false });
    }

    handleOpenSerialChatView() {
        //重置设备
        this.props.vm.deviceEngine.resetAtOpenSerial();
        //打开串口图表
        this.props.openSerialChartModalState();
    }

    render() {
        const {
            vm,
            upload,
            activateState,
            isConnected,
            updateWindowDownloadFlag,
            openSerialChartModalState,
            closeSerialChartModalState,
            ...componentProps
        } = this.props;

        return (
            <UploadCodePane
                onCodeUpload={this.handleCodeUpload}
                onStateModalClose={this.handleStateModalClose}
                onChangeWindowDownloadFlag={this.handleChangeWindowDownloadFlag}
                onOpenMonitor={this.onOpenMonitor}
                onOpenSerialChatView={this.handleOpenSerialChatView}
                isShowMicrobitPrompt={this.state.isShowMicrobitPrompt}
                onCloseMicrobitPrompt={this.handleCloseMicrobitPrompt}
                {...componentProps}
            />
        );
    }

}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    activeState: state.scratchGui.uploadState.activeState,
    editingTarget: state.scratchGui.vm.editingTarget,
    isConnected: state.scratchGui.deviceConnect.isConnected,
    isEquipmentConnected: state.scratchGui.deviceConnect.isEquipmentConnected,
    connectedDevice: state.scratchGui.deviceConnect.connectedDevice,
    arduinoMonitorVisible: state.scratchGui.arduinoMonitor.visible
});

const mapDispatchToProps = dispatch => ({
    activateState: state => {
        dispatch(activateState(state));
    },
    setArduinoMonitorVisible: visible => dispatch(setArduinoMonitorVisible(visible)),
    updateWindowDownloadFlag: (flag) => {
        dispatch(updateWindowDownloadFlag(flag))
    },
    activateDebugMode: (mode) => {
        dispatch(activateMode(mode));
    },
    openSerialChartModalState: () => {
        dispatch(openSerialChartModal());
    },
    closeSerialChartModalState: () => {
        dispatch(closeSerialChartModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadCode);
