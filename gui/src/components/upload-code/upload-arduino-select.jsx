import React from 'react'
import classNames from 'classnames'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux';

import styles from './upload-arduino-select.css'

import Modal from '../../containers/modal.jsx'
import Button from '../button-special/button.jsx'
import Select from '../select/select.jsx';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';

import devicenames from '../../lib/libraries/devices/device-names';

import {
    STATE_UPLOAD_NONE,
    STATE_UPLOADING_TAB,
    STATE_UPLOAD_SUCC_TAB,
    STATE_UPLOAD_FAIL_TAB,
    activateState
} from '../../reducers/upload-state'
import codeEditor from '../../lib/code-editor/code-editor'

const title = (
    <FormattedMessage
        defaultMessage="Upload"
        id="gui.uploadCode.arduinoSelect.title"
    />
);

const select = (
    <FormattedMessage
        defaultMessage="Select a serial port"
        id="gui.uploadCode.arduinoSelect.select"
    />
);

const confirm = (
    <FormattedMessage
        defaultMessage="OK"
        id="gui.uploadCode.arduinoSelect.confirm"
    />
);

const localeMessages = defineMessages({
    title: {
        id: 'gui.uploadCode.arduinoSelect.title',
        defaultMessage: 'Upload'
    },
    noSerialsPrompt: {
        id: 'gui.uploadCode.arduinoSelect.noSerialsPrompt',
        defaultMessage: 'No connected devices'
    },
    noSelectSerialsPrompt: {
        id: 'gui.uploadCode.arduinoSelect.noSelectSerialsPrompt',
        defaultMessage: 'Please select a serial port'
    },
});

const DEFAULT_DEVICE_TYPE = 'unknown';

/**
 * 匹配对应的串口设备
 * 设备类型
 * Match the device type of current serial device
 * @param {*} serial 串口
 * @param {*} id 当前选中设备id
 */
const matchDeviceType = (typeSerial, id) => {

    let {
        name,
        types = []
    } = devicenames[id];

    // types 未配置数据  No types available
    if (types.length == 0) {
        return name;
    }

    // arduino-lotusv 特殊处理  Special handling for arduino-lotusv
    if (typeSerial == 'unknown' &&
        id == 1002) {
        return types[2];
    }

    // types 配置了数据  Types available
    if (types.indexOf(typeSerial) != -1) {
        return typeSerial;
    } else {
        return DEFAULT_DEVICE_TYPE;
    }

}

class UploadArduinoSelect extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, [
            'scan',
            'close',
            'onChange',
            'onListOpen',
            'onListClose',
            'handleScanSucc',
            'isSelected',
            'onUpload',
            'filtration',
            '_upload'
        ])

        this.state = {
            selectDevice: null,
            deviceList: [],
        }

    }

    componentDidMount() {
        this.scan();
    }

    // 判断是否已选择  Determine if selected
    isSelected(deviceList) {
        if (!this.state.selectDevice) return false;
        for (let x = 0, item; item = deviceList[x]; x++) {
            if (item.comName === this.state.selectDevice.comName) {
                return true;
            }
        }
        return false;
    }

    // 过滤除Arduino、grove joint以外的设备
    // Filter out device other than Arduinon, grove joint
    filtration(deviceList) {
        let newList = [];
        for (let x = 0, item; item = deviceList[x]; x++) {
            switch (item.deviceType) {
                case 'arduino':
                case 'arduino-mega':
                case 'grove-joint':
                case 'opencat':
                case 'wio-terminal':
                case 'unknown':
                    newList.push(item);
                    break;
                default: break;
            }
        }
        return newList;
    }

    // 处理扫描成功结果
    // Handle scan success result
    handleScanSucc(deviceList) {

        deviceList = this.filtration(deviceList);

        // 判断是否扫描出来设备
        // Determine if there is any device been scanned
        const hasDevices = deviceList && deviceList.length > 0;
        if (!hasDevices) {

            this.setState({
                deviceList: [],
                selectDevice: null,
            })
        }

        this.setState({
            deviceList: deviceList
        });


        if (!this.isSelected(deviceList)) {
            this.setState({
                selectDevice: deviceList[0]
            });
        }
    }

    //扫描  Scan
    scan() {
        this.props.vm.deviceEngine.scan().then(
            deviceList => this.handleScanSucc(deviceList),
            () => console.log('扫描失败')
        );
    }

    close() {
        this.props.activateState(STATE_UPLOAD_NONE);
    }

    onChange(device) {
        for (let x = 0, item; item = this.state.deviceList[x]; x++) {
            if (item.comName === device.value) {
                this.setState({
                    selectDevice: item
                });
                break;
            }
        }
    }

    onListOpen() {
        this.scan();
    }

    onListClose() {

    }

    _upload() {
        this.props.activateState(STATE_UPLOADING_TAB);
        let code = codeEditor.getValue();

        let localAuthInfoStr = localStorage.getItem('localAuthInfo');
        let localAuthInfo = localAuthInfoStr ? JSON.parse(localAuthInfoStr) : {};
        let { userAccount, userPwd } = localAuthInfo;
        if (!userAccount || !userPwd) {
            userAccount = "codecraft.chmakerd.com";
            userPwd = "123456"
        }

        code = code.replace("\/\/==name", `cep.setParaUser_name(\"${userAccount}\");`);
        code = code.replace("\/\/==password", `cep.setParaUser_pswd(\"${userPwd}\");`);

        let editingTarget = this.props.vm.editingTarget;
        let id = editingTarget.getDeviceId();
        let selected = this.state.selectDevice;
        let device = Object.assign(
            {},
            selected,
            {
                needOpenDevice: false,
                deviceType: matchDeviceType(selected.deviceType, id)
            }
        );

        // arg2 = false 假连接 ，必须调用连接 才能拿到设备对象
        // Have to call connect to get the device object
        this.props.vm.deviceEngine.connect(device).then(
            // 连接成功回调  Callback for connect succeed
            () => {
                this.props.vm.deviceEngine.upload(code).then(
                    // 烧录成功回调  Callback for upload succeed
                    () => {
                        this.props.vm.deviceEngine.updateBaudRate(this.props.baudRate);
                        this.props.activateState(STATE_UPLOAD_SUCC_TAB);
                    },
                    // 烧录失败回调  Callback for upload failed
                    () => {
                        this.props.activateState(STATE_UPLOAD_FAIL_TAB);
                    }
                );
            }
        );
    }

    onUpload() {
        if (this.props.vm.deviceEngine.isEquipmentConnected()) {
            this.props.vm.deviceEngine.disconnect().then(() => {
                this._upload();
            });
        } else {
            this._upload();
        }

    }

    render() {

        const {
            intl
        } = this.props;

        let selectDevicelabel = this.state.selectDevice ? this.state.selectDevice.comName : intl.formatMessage(localeMessages.noSelectSerialsPrompt);
        let notListLabel = intl.formatMessage(localeMessages.noSerialsPrompt);

        // 构建select组件需要的列表数组
        // List used for create Select component
        let list = [];
        for (let x = 0, item; item = this.state.deviceList[x]; x++) {
            list.push({
                value: item.comName, label: item.comName
            });
        }

        return (
            <Modal
                className={classNames(styles.modal)}
                id='upload-arduino-select'
                contentLabel='upload-arduino-select'
                isOpen={true}
                showClose={true}
                onRequestClose={this.close}
                visiableTitle={true}
                title={intl.formatMessage(localeMessages.title)}
            >
                <div className={classNames(styles.selectBox)}>
                    <div>{select}</div>
                    <div className={classNames(styles.select)}>
                        <Select
                            onChange={this.onChange}
                            onListOpen={this.onListOpen}
                            onListClose={this.onListClose}
                            label={selectDevicelabel}
                            notListLabel={notListLabel}
                            list={list}
                        />
                    </div>
                </div>


                <div className={classNames(styles.btCenter)}>
                    <Button
                        disabled={!this.state.selectDevice}
                        className={classNames(styles.bt)}
                        onClick={this.onUpload}
                        size={'small'}
                    >
                        {confirm}
                    </Button>
                </div>
            </Modal>
        )

    }
}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    baudRate: state.scratchGui.arduinoMonitor.baudRate
})

const mapDispatchToProps = dispatch => ({
    activateState: state => {
        dispatch(activateState(state));
    }
})

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadArduinoSelect));