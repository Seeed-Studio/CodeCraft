import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import styles from './connect-meet-trouble.css';

import { queryCCToolPkgVersion } from '../../lib/busi-proxy/busi-proxy.js';
import { getOsType } from '../../lib/os-type.js';

import { post } from '../../lib/fetch-utils.js';

const DRIVE_TYPE_CH = 'DRIVE_TYPE_CH';
const DRIVE_TYPE_DAVINCE_AI = 'DRIVE_TYPE_DAVINCE_AI';

const DRIVE_TYPE_CH_URL = "http://localhost:62377/cc/installGrovezeroDrive";
const DRIVE_TYPE_ARDUINO_URL = "http://localhost:62377/cc/installArduinoDrive";
const DRIVE_TYPE_ARDUINO_FT232_URL = "http://localhost:62377/cc/installArduinoFT232Drive";
const DRIVE_TYPE_GLINT_URL = "http://localhost:62377/cc/installGlintDrive";
const DRIVE_TYPE_CYBEREYE_URL = "http://localhost:62377/cc/installCyberEyeDrive";
const DRIVE_TYPE_BITTLE_URL = "http://localhost:62377/cc/installBittleDrive";

const URL_GET_PLATFORM = 'http://localhost:62377/cc/getPlatform';

const driversInfo = (
  <FormattedMessage
    defaultMessage="Install driver"
    description=""
    id="gui.deviceConnect.driversInfo"
  />
);

const driversFT232Info = (
  <FormattedMessage
    defaultMessage="Install the FT232 driver"
    description=""
    id="gui.deviceConnect.driversFT232Info"
  />
);

const driversGlintInfo = (
  <FormattedMessage
    defaultMessage="Install driver"
    description=""
    id="gui.deviceConnect.driversInfo"
  />
);

class MeetTrouble extends React.Component {

  constructor(props) {
    super(props);
    bindAll(this, [
      'onDown',
      '_downDrive',
      'downloadDriver',
      'handleToDocument'
    ]);
    this.state = {
      platform: "win64"
    }
  }

  componentDidMount() {
    //获取平台数据
    post(URL_GET_PLATFORM).then(response => {
      this.setState({ platform: response.data })
    }).catch(err => {
      this.setState({ platform: 'win64' })
    })
  }

  onDown(driveType) {
    // let driveType = e.target.dataset.type;
    // let driveType = e.target.getAttribute('data-type');
    // console.log(driveType);
    switch (driveType) {
      case DRIVE_TYPE_CH:
        post(DRIVE_TYPE_CH_URL);
        // this._downDrive('G0Driver');
        break;
      case DRIVE_TYPE_DAVINCE_AI:
        this._downDrive('davinciai');
        break;
    }


  }

  _downDrive(toolType) {
    let os = getOsType();
    let osType = '';
    if (os.name === 'Windows') {
      switch (os.version) {

        case 'WIN10_32':
          osType = 'WIN10_32';
          break;

        case 'WIN10_64':
          osType = 'WIN10_64';
          break;

        case 'WIN7_32':
        case 'WIN8_32':
          osType = 'WIN7/8_32';
          break;

        case 'WIN7_64':
        case 'WIN8_64':
          osType = 'WIN7/8_64';
          break;

        case 'WINXP':
        case 'WINXP_32':
        case 'WINXP_64':
          osType = 'WINXP';
          break;

      }
    }
    else if (os.name === 'Mac') {
      osType = 'MAC';
    }
    else if (os.name === 'Linux') {
      osType = 'LINUX';
    }

    queryCCToolPkgVersion({
      toolType: toolType,
      osType: osType,
      version: '0.0.0.0'
    }).then((res) => {

      const { errorCode, ccToolPkgInfo } = res;

      if (errorCode !== 0) return;

      if (!ccToolPkgInfo) return;

      let pkgUrl = ccToolPkgInfo.cosFile.cosUrl;

      if (!pkgUrl) return;

      this.props.updateWindowDownloadFlag(true);
      // window.open(`http://${pkgUrl}`, '_self');
      setTimeout(() => {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href = `http://${pkgUrl}`;
        downloadLink.download = '';
        downloadLink.click();
        window.URL.revokeObjectURL(`http://${pkgUrl}`);
        document.body.removeChild(downloadLink);
      }, 100);
    });
  }

  downloadDriver() {
    this.props.updateWindowDownloadFlag(true);
    setTimeout(() => {
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = DRIVE_TYPE_ARDUINO_URL;
      downloadLink.download = '';
      downloadLink.click();
      window.URL.revokeObjectURL(DRIVE_TYPE_ARDUINO_URL);
      document.body.removeChild(downloadLink);
    }, 100);
  }

  handleToDocument(url) {
    this.props.onToDocument(url);
  }


  render() {

    return (
      <div className={classNames(styles.meetTroubleContainer)}>
        <div className={classNames(styles.meetTroubleText)}><span className={'dots'}></span>
          <FormattedMessage
            defaultMessage="Can't connect the Grove Zero?"
            description=""
            id="gui.deviceConnect.cannotConnectGroveZero"
          />
        </div>
        <div>
          <div className={classNames(styles.downDriveLink)} onClick={() => post(DRIVE_TYPE_CH_URL)}>
            <FormattedMessage
              defaultMessage="Install driver"
              description=""
              id="gui.deviceConnect.driversInfo"
            />
          </div>
        </div>
        {
          this.state.platform != 'darwin' &&
          <div className={classNames(styles.meetTroubleText, styles.arduinoContainer)}><span className={'dots'}></span>
            <FormattedMessage
              defaultMessage="Can't connect the Arduino?"
              description=""
              id="gui.deviceConnect.cannotConnectArduino"
            />
          </div>
        }
        {
          this.state.platform != 'darwin' &&
          <div>
            <div className={classNames(styles.downDriveLink)} onClick={() => { post(DRIVE_TYPE_ARDUINO_URL) }}>
              {driversInfo}
            </div>
            <div className={classNames(styles.downDriveLink)} onClick={() => { post(DRIVE_TYPE_ARDUINO_FT232_URL) }}>
              {driversFT232Info}
            </div>
          </div>
        }
        <div className={classNames(styles.meetTroubleText, styles.arduinoContainer)}><span className={'dots'}></span>
          <FormattedMessage
            defaultMessage="Can't connect the M.A.R.K(cyberEye)?"
            description=""
            id="gui.deviceConnect.cannotConnectCyberEye"
          />
        </div>
        <div style={{ height: "20px" }}>
          <div className={classNames(styles.downDriveLink)} onClick={() => { post(DRIVE_TYPE_CYBEREYE_URL) }}>
            {driversGlintInfo}
          </div>

          <div className={styles.documentLink}>
            <span>
              <FormattedMessage
                defaultMessage="Documentation: "
                description=""
                id="gui.deviceConnect.readDocument"
              /></span>
            <span className={classNames(styles.toDocumentLink)} onClick={() => this.handleToDocument('https://www.yuque.com/tinkergen-help-cn/mark/driver?language=zh-cn')}>中文</span>
            <span className={classNames(styles.toDocumentLink)} onClick={() => this.handleToDocument('https://www.yuque.com/tinkergen-help-en/mark/driver?language=en-us')} style={{ marginLeft: '5px' }}>English</span>
          </div>
        </div>

        <div className={classNames(styles.meetTroubleText, styles.arduinoContainer)}><span className={'dots'}></span>
          <FormattedMessage
            defaultMessage="Can't connect the Glint?"
            description=""
            id="gui.deviceConnect.cannotConnectGlint"
          />
        </div>
        <div>
          <div className={classNames(styles.downDriveLink)} onClick={() => { post(DRIVE_TYPE_GLINT_URL) }}>
            {driversGlintInfo}
          </div>
        </div>

        {
          this.state.platform != 'darwin' &&
          <div className={classNames(styles.meetTroubleText, styles.arduinoContainer)}><span className={'dots'}></span>
            <FormattedMessage
              defaultMessage="Can't connect the Bittle?"
              description=""
              id="gui.deviceConnect.cannotConnectBittle"
            />
          </div>
        }

        {
          this.state.platform != 'darwin' &&
          <div>
            <div className={classNames(styles.downDriveLink)} onClick={() => { post(DRIVE_TYPE_BITTLE_URL) }}>
              {driversGlintInfo}
            </div>
          </div>
        }

      </div>
    )
  }
}

export default injectIntl(MeetTrouble);