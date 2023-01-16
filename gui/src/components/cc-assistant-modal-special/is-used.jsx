import React from 'react';
import styles from './cc-assistant-modal.css';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';

const localeMessages = defineMessages({
  title: {
      id: 'gui.socketIsUsed.title',
      defaultMessage: 'Prompt'
  }
});

const IsUsedModal = (props) => {

  const {
    intl,
    onRequestClose
  } = props;

  return (
    <ModalComponent
      isOpen={true}
      className={styles.isUsedModal}
      showClose={true}
      onRequestClose={onRequestClose}
      visiableTitle={true}
      title={intl.formatMessage(localeMessages.title)}
      id='ccAssistantModal'
      contentLabel='ccAssistantModal'
    >
      <div className={styles.isUsedContainer}>
        <div className={styles.isUsed}>
          <FormattedMessage
            defaultMessage="The Codecraft device assistant is occupied. Please shut down its connected software and try again."
            description=""
            id="gui.socketIsUsed.message"
          />
        </div>
        <ButtonComponent
          size={'small'}
          onClick={onRequestClose}
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

export default injectIntl(IsUsedModal);


