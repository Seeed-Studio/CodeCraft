import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import styles from './connect-meet-trouble.css';

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
      'handleToDocument'
    ]);
    this.state = {
      platform: "win64"
    }
  }

  componentDidMount() {
    // 获取平台数据 Get data from the platform
    post(URL_GET_PLATFORM).then(response => {
      this.setState({ platform: response.data })
    }).catch(err => {
      this.setState({ platform: 'win64' })
    })
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