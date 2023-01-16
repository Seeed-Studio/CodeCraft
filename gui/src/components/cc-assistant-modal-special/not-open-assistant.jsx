import React from 'react';
import styles from './cc-assistant-modal.css';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';

import { getOsType } from '../../lib/os-type.js';

import classNames from 'classnames';

const localeMessages = defineMessages({
  title: {
    id: 'gui.notOpenAssi.title',
    defaultMessage: 'Prompt'
  },
  message: {
    id: 'gui.notOpenAssi.message',
    defaultMessage: 'The device assistant is not running~'
  },
  descrition: {
    id: 'gui.notOpenAssi.descrition',
    defaultMessage: 'To connect the device, you need to launch the Device Assistant.'
  },
  linuxmessage: {
    id: 'gui.notOpenAssi.linuxmessage',
    defaultMessage: 'The device assistant is not running，please do the following steps'
  },
  linuxdescrition: {
    id: 'gui.notOpenAssi.linuxdescrition',
    defaultMessage: '1、install deb package.\n2、open terminal，cd /opt/CodecraftAssistant\n3、sudo ./cc-assistant'
  },
});

const { name } = getOsType();

const NotOpenAssistantModal = (props) => {

  const {
    intl,
    onRequestClose,
    updateWindowDownloadFlag
  } = props;

  const onDown = (props) => {

    let { name, version } = getOsType();

    let osType = '';
    if (version.indexOf("_32") > -1) {
      osType = 'WIN32';
    }
    else if (version.indexOf("_64") > -1) {
      osType = 'WIN64';
    }
    else if (name.indexOf("Mac") > -1) {
      osType = 'MAC';
    }
    else if (name.indexOf("Linux") > -1) {
      osType = 'LINUX';
    }
  }

  return (
    <ModalComponent
      isOpen={true}
      className={styles.notOpenAssistantModal}
      showClose={true}
      onRequestClose={onRequestClose}
      visiableTitle={true}
      title={intl.formatMessage(localeMessages.title)}
      id='notOpenAssistantModal'
      contentLabel='notOpenAssistantModal'>
      <div className={styles.notOpenContainer}>
        <div className={styles.notOpenTitle}>
          {
            intl.formatMessage(name == 'Linux'?localeMessages.linuxmessage:localeMessages.message)
          }
        </div>
        <div className={styles.notOpenText}>
          {
            intl.formatMessage(name == 'Linux'?localeMessages.linuxdescrition:localeMessages.descrition)
          }
        </div>
        {
          name != 'Linux' && <div className={styles.picContainer}>
            <span className={styles.iconAssistant}><img src={require('./icon_assistant.png')} alt="" /></span>
            <span className={styles.iconToolbar}><img src={require('./icon_toolbar.png')} alt="" /></span>
          </div>
        }
        <div className={styles.btnContainer}>
          <ButtonComponent className={classNames(styles.assistantOkBtn, styles.okBtnPadding)} size={'small'} onClick={onDown}>
            <FormattedMessage
              defaultMessage="Download Device Assistant"
              description=""
              id="gui.notOpenAssi.goDownload"
            />
          </ButtonComponent>
          <ButtonComponent
            size={'small'}
            type={'default'}
            onClick={onRequestClose}
            className={classNames(styles.assistantOkBtn, styles.okBtnPadding)}>
            <FormattedMessage
              defaultMessage="OK"
              description=""
              id="gui.notOpenAssi.getIt"
            />
          </ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  );

}

export default injectIntl(NotOpenAssistantModal);