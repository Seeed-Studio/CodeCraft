import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styles from './styles.css';
import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';

const ariaMessages = defineMessages({
  prompt: {
    id: 'gui.deviceConnect.promptLabel',
    defaultMessage: 'Prompt',
  },
});

class LatestVersionModal extends React.Component {
  render() {
    const { onRequestClose, updateData } = this.props;
    return <ModalComponent
      isOpen={true}
      className={styles.latestVersionModal}
      showClose={true}
      onRequestClose={onRequestClose}
      visiableTitle={true}
      title={this.props.intl.formatMessage(ariaMessages.prompt)}
      id='latestVersionModal'
      contentLabel='latestVersionModal'
    >
      <div className={styles.latestVersionText}>
        <div>
          <FormattedMessage
            defaultMessage="Yayyy! You have the latest version: "
            id="gui.checkUpdate.latestVersion"
          />
          {updateData.version}</div>
        <ButtonComponent
          className={styles.latestVersionBtn}
          onClick={onRequestClose}
          // type={'default'}
          size={'small'}

        >
          <FormattedMessage
            defaultMessage="OK"
            id="gui.checkUpdate.iKnow"
          />
        </ButtonComponent>
      </div>
    </ModalComponent>
  }
}

export default injectIntl(LatestVersionModal);