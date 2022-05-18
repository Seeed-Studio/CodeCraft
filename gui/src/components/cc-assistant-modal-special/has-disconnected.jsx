import React from 'react';
import styles from './cc-assistant-modal.css';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';

const localeMessages = defineMessages({
  title: {
      id: 'gui.disConnected.title',
      defaultMessage: 'Prompt'
  }
});

const HasDisconnectedModal = (props) => {

  const {
    intl,
    deviceName,
    onRequestClose
  } = props;

  return (
    <ModalComponent
      isOpen={true}
      className={styles.hasDisconnectedModal}
      showClose={true}
      onRequestClose={onRequestClose}
      visiableTitle={true}
      title={intl.formatMessage(localeMessages.title)}
      id='ccAssistantModal'
      contentLabel='ccAssistantModal'
    >
      <div className={styles.isUsedContainer}>
        <div className={styles.isUsed}>
          {deviceName}
          <FormattedMessage
            defaultMessage=" is disconnected"
            description=""
            id="gui.disConnected.suffix"
          />
        </div>
        <ButtonComponent
          onClick={onRequestClose}
          size={'small'}
          className={styles.assistantOkBtn}>
          <FormattedMessage
            defaultMessage="OK"
            description=""
            id="gui.socketIsUsed.comfirm"
          />
        </ButtonComponent>
      </div>

    </ModalComponent>
  );

}

export default injectIntl(HasDisconnectedModal);
