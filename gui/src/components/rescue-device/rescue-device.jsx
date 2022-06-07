import React from 'react'
import classNames from 'classnames'
import bindAll from 'lodash.bindall'
import { connect } from 'react-redux';
import styles from './rescue-device.css'
import Modal from '../../containers/modal.jsx'
import Button from '../button-special/button.jsx'
import Select from '../select/select.jsx';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import deviceList from './device.jsx'

import {
    setModalIndex,
    setFirmwareVersion,
    setRescuer,
    RESCUE_MODAL_PYTHON_DOWN_BIN_SETP1,
    RESCUE_MODAL_PYTHON_UPGRADE_INIT,
    RESCUE_MODAL_PYTHON_UPGRADING,
    RESCUE_MODAL_PYTHON_UPGRADE_SUCC,
    RESCUE_MODAL_PYTHON_UPGRADE_FAIL
} from '../../reducers/rescue'

const localeMessages = defineMessages({
    confirm: {
        id: 'gui.rescueDevice.confirm',
        defaultMessage: 'Force uploading'
    },
    title: {
        id: 'gui.rescueDevice.title',
        defaultMessage: 'Rescue device'
    },
    noSerialsPrompt: {
        id: 'gui.rescueDevice.noSerialsPrompt',
        defaultMessage: 'No connected devices'
    },
    noSelectSerialsPrompt: {
        id: 'gui.rescueDevice.noSelectSerialsPrompt',
        defaultMessage: 'Please select a serial port'
    },
    selectSerialport: {
        id: "gui.rescueDevice.selectSerialport",
        defaultMessage: 'Select serial port'
    },
    selectDevice: {
        id: "gui.rescueDevice.selectDevice",
        defaultMessage: 'Select a device'
    },
    notice: {
        id: "gui.rescueDevice.notice",
        defaultMessage: 'Note: The following operation will restore the selected device to the latest version of this firmwire, in this way device will be in available status.'
    }

});

class RescueDevice extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, [
            'scan',
            'close',
            'onChange',
            'onListOpen',
            'handleScanSucc',
            'isSelected',
            'onRescue',
            'onDeviceChange',
        ])

        this.state = {
            selectSerialport: null,
            serialportList: [],
            selectDevice: deviceList[0]
        }

    }

    componentDidMount() {
        this.scan();

        const {
            deviceSelectedValue,
            deviceSelectorDisable
        } = this.props;

        if (deviceSelectorDisable) {
            this.setState({ selectDevice: deviceSelectedValue })
        }

    }

    // 判断是否已选择
    isSelected(serialportList) {
        if (!this.state.selectSerialport) return false;
        for (let x = 0, item; item = serialportList[x]; x++) {
            if (item.comName === this.state.selectSerialport.comName) {
                return true;
            }
        }
        return false;
    }

    // 处理扫描成功结果
    handleScanSucc(serialportList) {
        // 判断是否扫描出来设备
        const hasDevices = serialportList && serialportList.length > 0;
        if (!hasDevices) {

            this.setState({
                serialportList: [],
                selectSerialport: null,
            })
        }

        this.setState({
            serialportList: serialportList
        });


        if (!this.isSelected(serialportList)) {
            this.setState({
                selectSerialport: serialportList[0]
            });
        }
    }

    scan() {
        this.props.vm.deviceEngine.scan().then(
            serialportList => this.handleScanSucc(serialportList),
            () => console.log('扫描失败')
        );
    }

    close() {
        this.props.onCancel();
    }

    onChange(item) {
        for (let x = 0, serialport; serialport = this.state.serialportList[x]; x++) {
            if (serialport.comName === item.value) {
                this.setState({
                    selectSerialport: serialport
                });
                break;
            }
        }
    }

    onDeviceChange(item) {
        this.setState({
            selectDevice: item
        })
    }

    onListOpen() {
        this.scan();
    }

    onRescue() {
        switch (this.state.selectDevice.type) {
            case 'mpython':
            case 'powering':
                this.mpythonRescue();
                break;
            case 'maixduino':
                this.maixduinoRescue();
                break;
        }
    }

    mpythonRescue() {
        const { selectDevice, selectSerialport } = this.state;

        let upgradeMode = !navigator.onLine ? 0 : 1;
        let rescuer = this.props.vm.deviceEngine.createRescuer(selectDevice.type, selectSerialport.comName);
        if (rescuer) {
            rescuer.setUpgradeMode(upgradeMode)
        }
        this.props.setRescuer(rescuer);

        const upgrade = () => {
            this.props.setModalIndex(RESCUE_MODAL_PYTHON_UPGRADING);
            const upgradeSucc = () => this.props.setModalIndex(RESCUE_MODAL_PYTHON_UPGRADE_SUCC);
            const upgradeFail = () => this.props.setModalIndex(RESCUE_MODAL_PYTHON_UPGRADE_FAIL);
            this.props.vm.deviceEngine.disconnect().then(() => {
                rescuer.upgrade().then(upgradeSucc).catch(upgradeFail)
            });
        }

        if (upgradeMode == 0) {
            upgrade();
        } else{
            rescuer.isDownFirmwareFile().then(() => {
                upgrade();
            }).catch((version) => {
                this.props.setFirmwareVersion(version)
                this.props.setModalIndex(RESCUE_MODAL_PYTHON_DOWN_BIN_SETP1)
            }) 
        }
        
    }

    maixduinoRescue() {
        const { selectDevice, selectSerialport } = this.state;
        let upgradeMode = !navigator.onLine ? 0 : 1;
        let rescuer = this.props.vm.deviceEngine.createRescuer(selectDevice.type, selectSerialport.comName);
        if (rescuer) {
            rescuer.setUpgradeMode(upgradeMode)
        }
        this.props.setRescuer(rescuer);

        const upgrade = () => {
            this.props.setModalIndex(RESCUE_MODAL_PYTHON_UPGRADING);
            const upgradeSucc = () => this.props.setModalIndex(RESCUE_MODAL_PYTHON_UPGRADE_SUCC);
            const upgradeFail = () => this.props.setModalIndex(RESCUE_MODAL_PYTHON_UPGRADE_FAIL);
            this.props.vm.deviceEngine.disconnect().then(() => {
                rescuer.upgrade().then(upgradeSucc).catch(upgradeFail)
            });
        }
        
        if (upgradeMode == 0) {
            upgrade();
        } else{
            rescuer.isDownFirmwareFile().then(() => { 
                upgrade();
            }).catch((version) => {
                this.props.setFirmwareVersion(version)
                this.props.setModalIndex(RESCUE_MODAL_PYTHON_DOWN_BIN_SETP1)
            }) 
        }
    }

    render() {

        const {
            intl,
            deviceSelectorDisable
        } = this.props;

        let selectSerialportlabel = this.state.selectSerialport ? this.state.selectSerialport.comName : intl.formatMessage(localeMessages.noSelectSerialsPrompt);
        let notListLabel = intl.formatMessage(localeMessages.noSerialsPrompt);

        let selectDeviceLabel = this.state.selectDevice ? this.state.selectDevice.label : '';

        // 构建select组件需要的列表数组
        let serialportList = [];
        for (let x = 0, item; item = this.state.serialportList[x]; x++) {
            serialportList.push({
                value: item.comName, label: item.comName
            });
        }

        return (
            <Modal
                className={classNames(styles.modal)}
                id='rescue-device'
                contentLabel='rescue-device'
                isOpen={true}
                showClose={true}
                onRequestClose={this.close}
                visiableTitle={true}
                title={intl.formatMessage(localeMessages.title)}
            >
                <div className={classNames(styles.text)}>{intl.formatMessage(localeMessages.notice)}</div>
                <div className={classNames(styles.selectBox)}>

                    <div className={styles.label}>{intl.formatMessage(localeMessages.selectDevice)}</div>
                    <div className={classNames(styles.select)}>
                        <Select
                            onChange={this.onDeviceChange}
                            label={selectDeviceLabel}
                            list={deviceList}
                            notListLabel={notListLabel}
                            disabled={deviceSelectorDisable}
                        />
                    </div>

                </div>

                <div className={classNames(styles.selectBox)}>
                    <div className={styles.label}>{intl.formatMessage(localeMessages.selectSerialport)}</div>
                    <div className={classNames(styles.select)}>
                        <Select
                            onChange={this.onChange}
                            onListOpen={this.onListOpen}
                            label={selectSerialportlabel}
                            notListLabel={notListLabel}
                            list={serialportList}
                        />
                    </div>
                </div>


                <div className={classNames(styles.btCenter)}>
                    <Button
                        disabled={!this.state.selectSerialport}
                        className={classNames(styles.bt)}
                        onClick={this.onRescue}
                        size={'small'}
                    >
                        {intl.formatMessage(localeMessages.confirm)}
                    </Button>
                </div>
            </Modal>
        )

    }
}

const mapStateToProps = state => ({
    deviceSelectedValue: state.scratchGui.rescue.deviceSelectedValue,
    deviceSelectorDisable: state.scratchGui.rescue.deviceSelectorDisable,
    vm: state.scratchGui.vm
})

const mapDispatchToProps = dispatch => ({
    setModalIndex: index => dispatch(setModalIndex(index)),
    setFirmwareVersion: version => dispatch(setFirmwareVersion(version)),
    setRescuer: rescuer => dispatch(setRescuer(rescuer)),
})

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(RescueDevice));