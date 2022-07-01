import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import ConnectModalComponent from '../components/connect-modal-special/connect-modal.jsx';

import SettingPage from '../components/firmware-upgrade/setting-page.jsx';
import UpgradeConfirm from '../components/firmware-upgrade/upgrade-confirm-page.jsx';
import UpgradingPage from '../components/firmware-upgrade/upgrading-page.jsx';
import UpgradeSuccess from '../components/firmware-upgrade/upgrade-success.jsx';
import UpgradeFail from '../components/firmware-upgrade/upgrade-fail.jsx';
import PythonDownBin from '../components/firmware-upgrade/python-down-bin.jsx'
import PythonUpgrade from '../components/firmware-upgrade/python-upgrade.jsx'
import PythonUpgrading from '../components/firmware-upgrade/python-upgrading.jsx'
import PythonUpgradeSucc from '../components/firmware-upgrade/python-upgrade-succ.jsx'
import {
  openConnectView,
  closeConnectView,
} from '../reducers/modals';

import Box from '../components/box/box.jsx'
import {
  recognizeDevice,
  updateConnectedDevice,
  updateIsUpgradeState,
} from '../reducers/device-connect-special.js';


import {
  updateWindowDownloadFlag
} from '../reducers/window-event.js';

import {
  MODE_ONLINE,
  MODE_OFFLINE,
  activateMode,
} from '../reducers/debug-mode';

const STATUS_CONNECT_MODAL_IDLE = 0;
const STATUS_CONNECT_MODAL_SETTING = 1;         // 设置  Settings
const STATUS_CONNECT_MODAL_UPGRADE_CONFIRM = 2; // 升级确认  Confirm upgrade
const STATUS_CONNECT_MODAL_UPGRADING = 3;       // 升级中  Upgrading
const STATUS_CONNECT_MODAL_UPGRADE_SUCC = 4;    // 升级成功  Upgrade succeed
const STATUS_CONNECT_MODAL_UPGRADE_FAIL = 5;    // 升级失败  Upgrade failed

const STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP1 = 6;
const STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP2 = 7;
const STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP3 = 8;
const STATUS_CONNECT_MODAL_PYTHON_UPGRADE_INIT = 9;
const STATUS_CONNECT_MODAL_PYTHON_UPGRADING = 10;
const STATUS_CONNECT_MODAL_PYTHON_UPGRADE_SUCC = 11;
const STATUS_CONNECT_MODAL_PYTHON_UPGRADE_FAIL = 12;

const deviceTypes = (deviceId) => {
  if (deviceId == 1005) return 'maixduino';
  if (deviceId == 1007) return 'mpython';
  if (deviceId == 1008) return 'powering';
  return "";
}

class ConnectModal extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleConnectClose',
      'handleUpgrade',
      'handleUpgradePrompt',
      'handleFirmwareUpgrade',
      'handleOpenVersionModal',
      'handleUpgradeStateModalCancel',
      'handleResetUpgradeStatus',
      'handleDeviceRecognize',
      'handleResponse',
      'handleDownBin',
      'g0Upgrade',
      'handlePythonUpgradeInit',
      'handlePythonUpgrade',
      'handleToDocument'
    ]);

    this.state = {
      // isUpgrade: false,// 是否需要更新  If upgrade is needed
      activeIndex: STATUS_CONNECT_MODAL_IDLE,
      version: null,
      firmwareVersion: null,
      deviceId: -1
    }
  }

  componentDidMount() {
    this.props.vm.on('isUpgrade', this.handleUpgradePrompt);
    this.props.vm.on('response', this.handleResponse);
    this.props.vm.on('device-recognize', this.handleDeviceRecognize);
    this.props.vm.on('socket-disconnect', this.handleResetUpgradeStatus);
    this.props.vm.on('device-disconnect', this.handleResetUpgradeStatus);
  }

  componentWillUnmount() {
    this.props.vm.removeListener('isUpgrade', this.handleUpgradePrompt);
    this.props.vm.removeListener('socket-disconnect', this.handleResetUpgradeStatus);
    this.props.vm.removeListener('device-disconnect', this.handleResetUpgradeStatus);
  }


  // 打开帮助文档  Open help document
  handleToDocument(url) {
    const args = {
      url
    }
    this.props.vm.deviceEngine.sendWindowMessage({ action: 'open-document', args });
  }

  handleResetUpgradeStatus() {
    this.props.updateIsUpgradeState(false);
  }

  /**
   * 关闭设备连接弹框
   * Close device connect window
   */
  handleConnectClose() {
    this.props.onRequestCloseConnectView();
  }

  /**
   * 设备中控识别回调
   * Device recognize callback
   * @param {*} id 
   */
  handleDeviceRecognize(id) {
    this.props.onRecognizeDevice(id);
  }

  /**
   * 处理固件更新事件
   * Handle firmware upgrade event
   */
  handleUpgradePrompt(isUpgrade) {
    this.props.updateIsUpgradeState(isUpgrade);
  }

  /**
   * 固件升级
   * Firmware upgrade
   */
  handleFirmwareUpgrade() {
    let deviceId = this.props.connectedDevice.id;
    switch (deviceId) {
      case 1001:
        this.g0Upgrade();
        break;
      case 1005:
        this.maixduinoUpgrade();
        break;
      case 1007:
      case 1008:
        this.mpythonUpgrade();
        break;
    }
    this.setState({ deviceId: deviceId });
  }

  g0Upgrade() {
    this.setState({
      firmwareVersion: this.props.getFirmwareVersion(),
      activeIndex: STATUS_CONNECT_MODAL_UPGRADE_CONFIRM
    });
  }

  mpythonUpgrade() {
    let upgradeMode = !navigator.onLine ? 0 : 1;
    let deviceEg = this.props.vm.deviceEngine;
    if (deviceEg) {
        deviceEg.setUpgradeMode(upgradeMode)
    }
    if (upgradeMode == 0) {
      this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADING })
      this.props.disconnect().then(() => {
        deviceEg.upgrade(true).then(() => {
          this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_SUCC });
        }, () => {
          this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_FAIL });
        })
      })
    }else{
      deviceEg.isDownFirmwareFile().then(() => {
        this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADING })
        this.props.disconnect().then(() => {
          deviceEg.upgrade(true).then(() => {
            this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_SUCC });
          }, () => {
            this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_FAIL });
          })
        })
      }).catch(() => {
        this.setState({
          firmwareVersion: this.props.getFirmwareVersion(),
          activeIndex: STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP1
        });
      })
    }
  }

  maixduinoUpgrade() {
    let upgradeMode = !navigator.onLine ? 0 : 1;
    let deviceEg = this.props.vm.deviceEngine;
    if (deviceEg) {
      deviceEg.setUpgradeMode(upgradeMode)
    }
    if (upgradeMode == 0) {
      this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADING })
      this.props.disconnect().then(() => {
        deviceEg.upgrade(true).then(() => {
          this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_SUCC });
        }, () => {
          this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_FAIL });
        })
      })
    }else{
      deviceEg.isDownFirmwareFile().then(() => {
        this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADING })
        this.props.disconnect().then(() => {
          deviceEg.upgrade(true).then(() => {
            this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_SUCC });
          }, () => {
            this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_FAIL });
          })
        })
      }).catch(() => {
        this.setState({
          firmwareVersion: this.props.getFirmwareVersion(),
          activeIndex: STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP1
        });
      })
    }
  }

  handleDownBin() {
    this.setState({
      activeIndex: STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP2
    })
    this.props.vm.deviceEngine.downFirmwareFile().then(() => {
      this.props.disconnect();
      this.setState({
        activeIndex: STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP3
      })
    }).catch(() => {
      this.setState({
        activeIndex: STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP1
      })
    })

  }


  handlePythonUpgradeInit() {
    this.props.disconnect();
    this.setState({
      activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_INIT
    })
  }

  handlePythonUpgrade() {
    this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADING })
    // this.props.disconnect().then(() => {
    // })
    // console.log('disconnect--succ');
    this.props.vm.deviceEngine.upgrade(true).then(() => {
      console.log('upgrade--succ');
      this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_SUCC });
    }, () => {
      console.log('upgrade--fail');
      this.setState({ activeIndex: STATUS_CONNECT_MODAL_PYTHON_UPGRADE_FAIL });
    })
  }

  /**
   * 打开设置界面
   * Open settings modal
   */
  handleOpenVersionModal() {
    this.setState({
      version: this.props.getVersion(),
      activeIndex: STATUS_CONNECT_MODAL_SETTING
    });
  }

  handleUpgrade() {
    this.setState({ activeIndex: STATUS_CONNECT_MODAL_UPGRADING });
    this.props.upgrade().then(() => {
      //  升级成功  Upgrade succeed
      console.log('handleUpgrade ---- 升级成功 ');
      this.setState({ activeIndex: STATUS_CONNECT_MODAL_UPGRADE_SUCC });
    }, () => {
      //  升级失败  Upgrade failed
      console.log('handleUpgrade ---- 升级失败 ');
      this.setState({ activeIndex: STATUS_CONNECT_MODAL_UPGRADE_FAIL });
    })
  }


  handleResponse(data) {
    // console.log(data);
  }
  /**
   * 处理返回事件
   * Handle upgrade modal cancel event
   */
  handleUpgradeStateModalCancel() {
    switch (this.state.activeIndex) {
      case STATUS_CONNECT_MODAL_SETTING:
      case STATUS_CONNECT_MODAL_UPGRADE_CONFIRM:
      case STATUS_CONNECT_MODAL_UPGRADE_SUCC:
      case STATUS_CONNECT_MODAL_UPGRADE_FAIL:
      case STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP1:
      case STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP2:
      case STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP3:
      case STATUS_CONNECT_MODAL_PYTHON_UPGRADE_INIT:
      case STATUS_CONNECT_MODAL_PYTHON_UPGRADING:
      case STATUS_CONNECT_MODAL_PYTHON_UPGRADE_SUCC:
      case STATUS_CONNECT_MODAL_PYTHON_UPGRADE_FAIL:
        this.setState({ activeIndex: STATUS_CONNECT_MODAL_IDLE });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      openConnectView,
      onRecognizeDevice,
      updateIsUpgradeState,
      onRequestCloseConnectView,
      ...components
    } = this.props;

    return (
      <Box>
        {/* 设备连接主界面  Device connecting window */}
        {this.state.activeIndex === STATUS_CONNECT_MODAL_IDLE
          && <ConnectModalComponent
            isUpgrade={this.props.isUpgrade}
            onRequestClose={this.handleConnectClose}
            onFirmwareUpgrade={this.handleFirmwareUpgrade}
            onOpenVersionModal={this.handleOpenVersionModal}
            onToDocument={this.handleToDocument}
            {...components} />}
        {/* 设置  Settings */}
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_SETTING
          &&
          <SettingPage
            deviceInfo={this.props.connectedDevice}
            versionInfo={this.state.version}
            onCancel={this.handleUpgradeStateModalCancel}
            onSettingConfrim={this.handleUpgradeStateModalCancel} />
        }

        {/* 升级确认  Upgrade confirm */}
        {this.state.activeIndex === STATUS_CONNECT_MODAL_UPGRADE_CONFIRM
          &&
          <UpgradeConfirm
            deviceInfo={this.props.connectedDevice}
            versionInfo={this.state.firmwareVersion}
            onCancel={this.handleUpgradeStateModalCancel}
            onUpgradeCancel={this.handleUpgradeStateModalCancel}
            onUpgrade={this.handleUpgrade} />
        }
        {/* 升级中  Upgrading */}
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_UPGRADING
          && <UpgradingPage />
        }
        {/* 升级成功  Upgrade succeed */}
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_UPGRADE_SUCC
          &&
          <UpgradeSuccess
            onCancel={this.handleUpgradeStateModalCancel}
            onUpgradeSuccComfirm={this.handleUpgradeStateModalCancel} />
        }
        {/* 升级失败  Upgrade failed*/}
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_UPGRADE_FAIL
          &&
          <UpgradeFail
            onCancel={this.handleUpgradeStateModalCancel}
            onUpgradeFailComfirm={this.handleUpgradeStateModalCancel} />
        }

        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP1
          &&
          <PythonDownBin
            onCancel={this.handleUpgradeStateModalCancel}
            versionInfo={this.state.firmwareVersion}
            onClick={this.handleDownBin}
            step={1}
          />
        }
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP2
          &&
          <PythonDownBin
            step={2}
          />
        }
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_PYTHON_DOWN_BIN_SETP3
          &&
          <PythonDownBin
            onCancel={this.handleUpgradeStateModalCancel}
            step={3}
            onClick={() => {
              if (this.state.deviceId == 1003) {
                this.handlePythonUpgradeInit();
              } else if (this.state.deviceId == 1007) {
                this.handlePythonUpgrade();
              } else if (this.state.deviceId == 1005) {
                this.handlePythonUpgrade();
              } else if (this.state.deviceId == 1008) {
                this.handlePythonUpgrade();
              }
            }}
          />
        }
        
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_PYTHON_UPGRADE_INIT
          &&
          <PythonUpgrade
            dtype={deviceTypes(this.state.deviceId)}
            onClick={this.handlePythonUpgrade}
            onCancel={this.handleUpgradeStateModalCancel}
          />
        }
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_PYTHON_UPGRADING
          &&
          <PythonUpgrading
            type={deviceTypes(this.state.deviceId)}
          />
        }
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_PYTHON_UPGRADE_SUCC
          &&
          <PythonUpgradeSucc
            type={deviceTypes(this.state.deviceId)}
            onCancel={this.handleUpgradeStateModalCancel}
          />
        }
        {
          this.state.activeIndex === STATUS_CONNECT_MODAL_PYTHON_UPGRADE_FAIL
          &&
          <PythonUpgrade
            dtype={deviceTypes(this.state.deviceId)}
            onClick={this.handlePythonUpgrade}
            onCancel={this.handleUpgradeStateModalCancel}
            type='fail'
          />
        }

      </Box>
    );
  }

}
const mapStateToProps = state => ({
  vm: state.scratchGui.vm,
  isUpgrade: state.scratchGui.deviceConnect.isUpgrade,
  connectedDevice: state.scratchGui.deviceConnect.connectedDevice,
  connTabIndex: state.scratchGui.deviceConnect.tab,
  isConnected: state.scratchGui.deviceConnect.isConnected,                            // socket 是否连接  If socket is connected
  isEquipmentConnected: state.scratchGui.deviceConnect.isEquipmentConnected,          // 设备是否连接  If device is connected
  scan: () => { return state.scratchGui.vm.deviceEngine.scan() },                     // 扫描设备列表  Scan device list
  connect: (device) => { return state.scratchGui.vm.deviceEngine.connect(device) },   // 连接设备  Connect device
  disconnect: () => { return state.scratchGui.vm.deviceEngine.disconnect() },         // 断开连接  Disconnect
  upgrade: () => { return state.scratchGui.vm.deviceEngine.upgrade() },
  getVersion: () => { return state.scratchGui.vm.deviceEngine.getVersion() },
  getFirmwareVersion: () => { return state.scratchGui.vm.deviceEngine.getFirmwareVersion() },
  resetDebugMode: () => { state.scratchGui.vm.setDebugMode(0) }
});

const mapDispatchToProps = dispatch => ({
  openConnectView: () => {
    dispatch(openConnectView())
  },
  onRequestCloseConnectView: () => {
    dispatch(closeConnectView())
  },
  updateConnectedDevice: (value) => {
    dispatch(updateConnectedDevice(value))
  },
  onRecognizeDevice: (id) => {
    dispatch(recognizeDevice(id))
  },
  updateIsUpgradeState: (isUpgrade) => {
    dispatch(updateIsUpgradeState(isUpgrade))
  },
  updateWindowDownloadFlag: (flag) => {
    dispatch(updateWindowDownloadFlag(flag))
  },
  activateDebugMode: (mode) => {
    dispatch(activateMode(mode));
  }
});

ConnectModal.propTypes = {
  connectedDevice: PropTypes.object,
  connTabIndex: PropTypes.number,
  isConnected: PropTypes.bool,
  isEquipmentConnected: PropTypes.bool,
  scan: PropTypes.func,
  connect: PropTypes.func,
  disconnect: PropTypes.func,
  onSetDeviceTab: PropTypes.func,
  openConnectView: PropTypes.func,
  onRequestCloseConnectView: PropTypes.func,
  updateConnectedDevice: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectModal);