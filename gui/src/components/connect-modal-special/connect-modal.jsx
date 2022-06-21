import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './connect-modal.less';

import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';
import MeetTrouble from './connect-meet-trouble.jsx';
// import Select from 'react-select';
import Select from '../select/select.jsx';
import { connect } from 'react-redux';
import { toasts } from '../../components/toast-special/toast.jsx';
import Prompt from '../prompt-special/prompt.jsx';
import { getOsType } from '../../lib/os-type.js';

import {
  MODE_OFFLINE,
} from '../../reducers/debug-mode';

import devicenames from '../../lib/libraries/devices/device-names';
import controlnames from '../../lib/libraries/devices/control-names';
import maixduinoUpgradeInfo from '../../../static/firmware/maixduino/maixduino_upgrade_info.json';
import { post } from '../../lib/fetch-utils';

import iconVersion from './icon-vision.png'

let messages = defineMessages({
  selectDevices: {
    defaultMessage: 'Select device',
    description: '',
    id: 'gui.deviceConnect.selectDevices'
  },
  noDevices: {
    defaultMessage: 'No devices found',
    description: '',
    id: 'gui.deviceConnect.noDevices'
  },
  connectSucc: {
    defaultMessage: 'Connected Successfully',
    description: '',
    id: 'gui.connectModal.connectSucc'
  },
  connectFail: {
    defaultMessage: 'Connect failed, Make sure the device you are actually connecting to is the same device you are switching to.',
    description: '',
    id: 'gui.connectModal.connectFail'
  },
  operateSucc: {
    defaultMessage: 'Success',
    description: '',
    id: 'gui.connectModal.operateSucc'
  },
  operateFail: {
    defaultMessage: 'Failed',
    description: '',
    id: 'gui.connectModal.operateFail'
  }
});

const defaultOption = {
  value: '请选择设备',
  label: '请选择设备'
}

const modalLabel = (
  <FormattedMessage
    defaultMessage="Connect device"
    description=""
    id="gui.deviceConnect.modalLabel"
  />
);

const connectBtn = (
  <FormattedMessage
    defaultMessage="Connect"
    description=""
    id="gui.deviceConnect.connectBtn"
  />
);

const disconnectBtn = (
  <FormattedMessage
    defaultMessage="Disconnect"
    description=""
    id="gui.deviceConnect.disconnectBtn"
  />
);

const promptTitle = (
  <FormattedMessage
    defaultMessage="Prompt"
    description=""
    id="gui.deviceConnect.promptLabel"
  />
);

const promptTextPrefix = (
  <FormattedMessage
    defaultMessage="Would you like to disconnect from"
    description=""
    id="gui.deviceConnect.promptTextPrefix"
  />
);

const promptTextSuffix = (
  <FormattedMessage
    defaultMessage="?"
    description=""
    id="gui.deviceConnect.promptTextSuffix"
  />
);

const promptCancelText = (
  <FormattedMessage
    defaultMessage="cancel"
    description=""
    id="gui.deviceConnect.cancel"
  />
);

const promptOkText = (
  <FormattedMessage
    defaultMessage="Yes"
    description=""
    id="gui.deviceConnect.ok"
  />
);

const upgradePromptForNormal = (
  <FormattedMessage
    defaultMessage="Firmware update available. "
    description=""
    id="gui.deviceConnect.upgradePromptForNormal"
  />
);

const upgradePromptForDavinci = (
  <FormattedMessage
    defaultMessage="If the device is not working, please update the firmware."
    description=""
    id="gui.deviceConnect.upgradePromptForDavinci"
  />
);

const upgradeBtn = (
  <FormattedMessage
    defaultMessage="Update now"
    description=""
    id="gui.deviceConnect.upgradeBtn"
  />
);

const moreInformationBtn = (
  <FormattedMessage
    defaultMessage="More information"
    description=""
    id="gui.deviceConnect.moreInformationBtn"
  />
);

const connectionProblemsText = (
  <FormattedMessage
    defaultMessage="Having trouble in connecting?"
    description=""
    id="gui.deviceConnect.connectionProblems"
  />
);

const showVerison = (
  <FormattedMessage
    defaultMessage="Check my firmware version"
    id="gui.deviceConnect.showVerison"
  />
);


const DRIVE_TYPE_CH = 'DRIVE_TYPE_CH';
const DRIVE_TYPE_DAVINCE_AI = 'DRIVE_TYPE_DAVINCE_AI';
const DRIVE_TYPE_CH_URL = "http://localhost:62377/cc/installGrovezeroDrive";

const DEFAULT_DEVICE_TYPE = 'unknown';
/**
 * 匹配对应的串口设备
 * 设备类型
 * Match the type of the device
 * @param {*} serial 串口 Serial
 * @param {*} id 当前选中设备id The id of current device
 */
const matchDeviceType = (typeSerial, id) => {
  let {
    name,
    types = []
  } = devicenames[id];
  // types 未配置数据
  // No available type
  if (types.length == 0) {
    return name;
  }
  
  // arduino-lotusv 特殊处理
  // arduino-lotusv special handling
  if (typeSerial == 'unknown' &&
      id == 1002) {
    return types[2];
  }

  // types 配置了数据
  // Type available
  if (types.indexOf(typeSerial) != -1) {
    return typeSerial;
  } else {
    return DEFAULT_DEVICE_TYPE;
  }
}

class ConnectModalComponent extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleChange',
      'handleShowTrouble',
      'handleConnect',
      'handleDisConnect',
      'handleScan',
      'handleSelectMenuOpen',
      'handleSelectMenuClose',
      'handlePromptOk',
      'handlePromptCancel',
      'handleUpgrade',
      'onDown'
      // 'handleSelectClose',
      // 'onRef'
    ])
    this.state = {
      devices: [],
      selectedDevice: {
        value: props.intl.formatMessage(messages.selectDevices),
        label: props.intl.formatMessage(messages.selectDevices)
      },
      isMeetTrouble: false,

      isOpenDisconnectConfirm: false,
      isConnectting: false     // 是否正在连接中
    }
  }

  componentDidMount() {
    // 如果设备连接已连接
    // If the device/equipment is connected
    if (this.props.isEquipmentConnected
      && this.props.connectedDevice) {
      this.setState({
        selectedDevice: this.props.connectedDevice
      });
    }
    // 组件加载时，搜索设备列表
    // While component is loading, scan for devices
    this.handleScan();
  }

  // 设备选择
  // Device selection
  handleChange(item) {
    this.setState({
      selectedDevice: item
    })
  }
  // 打开遇到问题
  // Open ShowTrouble component
  handleShowTrouble() {
    this.setState({
      isMeetTrouble: !this.state.isMeetTrouble,
    })
  }

  // 设备连接
  // Device connection
  handleConnect() {

    const {
      comName,
      deviceType
    } = this.state.selectedDevice;
    if (!comName ||
      this.state.isConnectting) {
      return;
    }
    const editingTarget = this.props.vm.editingTarget;
    const deviceId = editingTarget.getDeviceId();
    const matchDType = matchDeviceType(deviceType, deviceId);
    const needConnDevice = Object.assign(
      {},
      this.state.selectedDevice,
      {
        deviceType: matchDType
      }
    );
    // 设备连接
    // Connecting
    this.setState({ isConnectting: true });
    this.props.connect(needConnDevice).then(() => {
      // 提示连接成功
      // Notify connection success
      toasts.success(this.props.intl.formatMessage(messages.connectSucc));
      this.handleSelectMenuClose();

      // 特殊设备临时变量
      // Variables for certain devices
      let extraObj = {};
      let selDeviceObj = this.state.selectedDevice;
      // 如果是grovezero
      // If grovezero
      // 如果是microPython
      // If microPython
      if (1003 == deviceId ||
          1005 == deviceId ||
          1007 == deviceId || 
          1008 == deviceId) {
        extraObj.id = deviceId;
        extraObj.control = controlnames[deviceId].name;
      }
      // 连接成功后的设备
      // The object for the connected device
      let connectedObj = Object.assign(
        {},
        selDeviceObj,
        extraObj
      )

      // 设备连接成功 Device connected
      // console.log('device  connect succ');
      // 连接成功更新当前连接的设备
      // Update current device after connection succeed
      this.props.updateConnectedDevice(connectedObj);
      // 连接成功后默认重置调试模式
      // Reset debug mode after connection succeed
      this.props.resetDebugMode();
      this.props.activateDebugMode(MODE_OFFLINE)

      // arduino连接成功后，更新波特率
      // Update baud rate after arduino connected
      if (1002 == deviceId) {
        this.props.vm.deviceEngine.updateBaudRate(this.props.baudRate);
      }
      // 关闭连接问题弹窗
      // Close the MeetTrouble window
      this.setState({
        isMeetTrouble: false,
        isConnectting: false
      });
    }, (error) => {
      // 提示连接失败
      // Notify connection failed
      toasts.error(this.props.intl.formatMessage(messages.connectFail));
      // 设备连接失败 Connection failed
      // console.error('errordevice  connect fail:',error);
      // console.warn('warndevice  connect fail:',error);

      this.setState({
        isConnectting: false
      });
    })
  }

  // 断开设备连接
  // Disconnect the device
  handleDisConnect() {
    this.setState({
      isOpenDisconnectConfirm: true
    });
  }

  /**
   * 扫描设备
   * Scan for device
   */
  handleScan() {
    this.props.scan().then((data) => {
      // 判断是否扫描出来设备
      // Determine if detect device
      const hasDevices = data && data.length > 0;
      // 未扫描到设备
      // No device detected
      if (!hasDevices) {
        this.setState({ devices: [] });
        this.setState({
          selectedDevice: {
            value: this.props.intl.formatMessage(messages.selectDevices),
            label: this.props.intl.formatMessage(messages.selectDevices)
          }
        });
      } else {
        // 判断当前是否有选中设备
        // Determine if there is a selected device
        const hasCurr = this.state.selectedDevice.hasOwnProperty('comName');
        // 判断当前选中的设备，是否断开了；
        // Determine if the selected device disconnected
        const hasCurrDis = () => {
          return !!data.find((item) => { return item.comName === this.state.selectedDevice.comName });
        }
        // 判断设备是否选择过
        // Determine if the device has been selected before
        if (!hasCurr || !hasCurrDis()) {
          // 设备未选择过
          // No selected before
          this.setState({
            selectedDevice: data[0]
          });
        }
        // 保存扫描结果
        // Save the scan result
        this.setState({ devices: data });
      }
    }, () => {
      // 扫描失败，设备默认值
      // Scan failed, set default values
      this.setState({ devices: [] });
      this.setState({
        selectedDevice: {
          value: this.props.intl.formatMessage(messages.selectDevices),
          label: this.props.intl.formatMessage(messages.selectDevices)
        }
      });
    });
  }

  handleSelectMenuOpen() {
    // console.log('handleSelectMenuOpen ---- ')
    this.handleScan(); // 扫描设备 Scan for device
  }

  handleSelectMenuClose() {
    // console.log('handleSelectMenuClose ---- ')
  }

  handlePromptOk() {
    this.props.disconnect()
      .then(
        () => {
          toasts.success(this.props.intl.formatMessage(messages.operateSucc));
          // 重置被选中的串口的id 、control
          // Reset id and control of the selected device
          this.setState({
            selectedDevice: Object.assign(
              {}, this.state.selectedDevice,
              {
                id: 1000,
                control: '',
              }
            )
          });
          // 重置 DebugMode
          // Reset debug mode
          this.props.resetDebugMode();
        },
        () => toasts.error(this.props.intl.formatMessage(messages.operateFail))
      );
    this.setState({
      isOpenDisconnectConfirm: false
    });
  }

  handlePromptCancel() {
    this.setState({
      isOpenDisconnectConfirm: false
    });
  }

  handleUpgrade() {
    console.log('handleUpgrade ---- ');
    this.props.upgrade().then(() => {
      // 升级成功 
      // Upgrade success
      console.log('handleUpgrade ---- 升级成功 ');
    }, () => {
      // 升级失败 
      // Upgrade failed
      console.log('handleUpgrade ---- 升级失败 ');
    })
  }

  // 更多升级日志信息
  // More log information
  handleMoreInformation(loglink) {
    if (loglink) {
      // window.open(loglink, '_blank')
      let vm = this.props.vm
      if (vm) {
        vm.deviceEngine.sendWindowMessage({
          action: 'open-document',
          args: {
            url: loglink
          }
        });
      }
    }
  }

  onDown(driveType) {
    switch (driveType) {
      case DRIVE_TYPE_CH:
        post(DRIVE_TYPE_CH_URL);
        break;
      case DRIVE_TYPE_DAVINCE_AI:
        break;
    }
  }

  render() {
    const {
      isUpgrade,
      isEquipmentConnected,
      scan,
      connect,
      disconnect,
      upgrade,
      connectedDevice,
      updateConnectedDevice,
      updateWindowDownloadFlag,
      onFirmwareUpgrade,
      onOpenVersionModal,
      activateDebugMode,
      ...componentProps
    } = this.props;

    const isDeviceConnected = connectedDevice && Object.keys(connectedDevice).length > 0;

    const isMeetTrouble = this.state.isMeetTrouble;
    const hasDevices = this.state.devices && this.state.devices.length > 0;

    let connectedOption = null;
    let selectedDeviceName = '';

    if (connectedDevice) {

      let {
        comName,
        control
      } = connectedDevice;

      let controlString = control;
      if (control&&control.length>0&&control.indexOf('Arduino')>=0) {
        controlString = 'Arduino'
      }

      selectedDeviceName = controlString ? controlString + " " + comName : comName;

      connectedOption = Object.assign(
        {},
        connectedDevice,
        {
          value: selectedDeviceName,
          label: selectedDeviceName
        })
    }
    // 获取selector选中的设备
    // Get the device from selector
    let selecterValue = connectedOption ? connectedOption : this.state.selectedDevice;
    // 固件版本号
    // Version of firmware
    let versionAble = false;
    // 升级字符提示
    // Message for upgrade
    let upgradePrompt = upgradePromptForNormal;
    let loginfo = null;
    let loglink = null;
    const locale = localStorage.getItem('locale');

    if (connectedDevice) {
      const id = connectedDevice.id;
      if (1001 === id) {
        versionAble = true;
        upgradePrompt = upgradePromptForNormal;
      }
      // 暂时不处理升级
      // Don't handle upgrade for now
      else if (1002 === id) {
        versionAble = false;
        upgradePrompt = '';
      }

      else if (1003 === id) {
        versionAble = true;
        upgradePrompt = upgradePromptForNormal;
      }
      else if (1005 === id) {
        versionAble = true;
        upgradePrompt = upgradePromptForNormal;
        if (locale === 'zh-cn') {
          loginfo = maixduinoUpgradeInfo.zh.log
          loglink = maixduinoUpgradeInfo.zh.link
        }else {
          loginfo = maixduinoUpgradeInfo.en.log
          loglink = maixduinoUpgradeInfo.en.link
        }
        
      }
      else if (1006 === id) {
        versionAble = false;
        upgradePrompt = '';
      }
      else if (1008 === id) {
        versionAble = true;
        upgradePrompt = upgradePromptForNormal;
      }
      // unknown deviceType
      // 如果设备识别类型时dongle
      else if ('unknown' === connectedDevice.deviceType) {
        versionAble = true;
      }
    }

    /**
     * prompt提示语
     * prompt text
     */
    const promptText = (
      <span>
        {promptTextPrefix}  {selectedDeviceName} {promptTextSuffix}
      </span>
    );

    /**
     * 更新界面视图
     * View for upgrading
     */
    const upgradeView = (
      <div className={loginfo?'upgradeLogWrapper':'upgradeWrapper'}>
        {upgradePrompt}
        {loginfo&&<span className={'upgradelog'}>{loginfo}</span>}
        <div>
          <span className={'upgradeBtn'}
            onClick={onFirmwareUpgrade} >
            {upgradeBtn}
          </span>
          {
            loglink && <span className={'moreBtn'}
              onClick={this.handleMoreInformation.bind(this,loglink)} >
              {moreInformationBtn}
            </span>
          }
        </div>
      </div>
    );

    const notListLabel = this.props.intl.formatMessage(messages.noDevices);
    // 构建select组件需要的列表数组
    // The list used to create <Select /> component
    const list = this.state.devices.map((item, index) => {
      return Object.assign(
        item, {
          value: item.comName,
          label: item.comName
        }
      );
    });

    return <ModalComponent
      isOpen={true}
      className={'connectModal'}
      showClose={true}
      onRequestClose={this.props.onRequestClose}
      visiableTitle={true}
      title={modalLabel}
      id='connectModal'
      contentLabel='connectModal'
    // onClick={this.handleSelectClose}
    >
      <div className={'connectModalContainer'}>
        <div className={'deviceContainer'} style={{ opacity: isMeetTrouble ? 0 : 1, zIndex: isMeetTrouble ? -1 : 0 }}>
          <div className={'connectImg'}><img src={require('./icon_connect.png')} alt="" /></div>
          <div className={'deviceListContainer'}>
            <Select
              // onRef={this.onRef}
              onChange={this.handleChange}
              onListOpen={this.handleSelectMenuOpen}
              onListClose={this.handleSelectMenuClose}
              label={selecterValue.label}
              notListLabel={notListLabel}
              list={list}
              disabled={isEquipmentConnected ? true : false}
            />
            {/* <Select
              className={'selectWrapper'}
              value={selecterValue}
              onChange={this.handleChange}
              isDisabled={isEquipmentConnected}
              onMenuOpen={this.handleSelectMenuOpen}
              onMenuClose={this.handleSelectMenuClose}
              options={
                this.state.devices.map((item, index) => {
                  return Object.assign(
                    item, {
                      value: item.comName,
                      label: item.comName
                    }
                  );
                })
              }
              className={'deviceSelect'}
              placeholder={''}
            /> */}
            <div className={'noFindContainer'}/>
          </div>
        </div>
        {/* 固件升级，固件版本信息查询入口  Entry for firmware upgrade/information */}
        {(versionAble || isUpgrade) &&
          <div className={"bottomWrapper"}>
            {/* 固件升级视图 、遇到问题  View for firmware upgrade*/}
            {isUpgrade && upgradeView}
            {/* {versionAble && <img
              className={"verisonIcon"}
              src={iconVersion}
              onClick={onOpenVersionModal} />} */}
            {versionAble && <span
              className={"verisonIcon"}
              src={iconVersion}
              onClick={onOpenVersionModal} >{showVerison}</span>}
          </div>}
        {/* 遇到问题  Encounter problems */}
        {!isEquipmentConnected &&
          <div
            className={'meetTrouble'}
            style={{ marginTop: isMeetTrouble ? '-13rem' : '0.5rem' }}>
            <div
              style={{ fontSize: '0.88rem' }}
              onClick={this.handleShowTrouble}>
              <img
                className={'troubleImg'}
                src={require(isMeetTrouble ? './icon_connect_arrowup.png' : './icon_connect_arrowdown.png')}
                alt="" />
              {connectionProblemsText}
            </div>
            {isMeetTrouble &&
              <MeetTrouble updateWindowDownloadFlag={updateWindowDownloadFlag} onToDocument={this.props.onToDocument} />}
          </div>
        }
        <div className={classNames('connectBtnContaienr', { ['isUpgrade']: isUpgrade })}>
          {/* 根据设备状态显示不同按钮  Show different button according to the device status */}
          {
            isDeviceConnected ?
              (
                <ButtonComponent
                  type={'default'}
                  size={'small'}
                  className={classNames('connectBtn')}
                  onClick={this.handleDisConnect}>
                  {disconnectBtn}
                </ButtonComponent>)
              : (
                <ButtonComponent
                  size={'small'}
                  disabled={!hasDevices}
                  className={classNames('connectBtn')}
                  onClick={this.handleConnect}>
                  {connectBtn}
                </ButtonComponent>
              )
          }
        </div>
        {
          this.state.isOpenDisconnectConfirm &&
          <Prompt
            id='disconnect'
            contentLabel='disconnect'
            label={promptTitle}
            message={promptText}
            cancelLabel={promptCancelText}
            okLabel={promptOkText}
            onOk={this.handlePromptOk}
            onCancel={this.handlePromptCancel}
          />
        }
      </div>

    </ModalComponent>
  }
}

const mapStateToProps = state => ({
  vm: state.scratchGui.vm,
  baudRate: state.scratchGui.arduinoMonitor.baudRate
})

export default injectIntl(connect(
  mapStateToProps,
)(ConnectModalComponent));

// export default injectIntl(ConnectModalComponent);