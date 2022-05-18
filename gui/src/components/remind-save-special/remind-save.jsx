import React from 'react';
import styles from './remind-save.css';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';

const localeMessages = defineMessages({
  title: {
    id: 'gui.remindSave.title',
    defaultMessage: '提示'
  }
});

class RemindSaveModal extends React.Component {
  render() {
    const { onQuitWithSave, onQuitWithoutSave, onQuitCancel } = this.props;
    return <ModalComponent
      isOpen={true}
      className={styles.remindSaveModal}
      onRequestClose={this.props.onRequestClose}
      visiableTitle={true}
      showClose={false}
      title={this.props.intl.formatMessage(localeMessages.title)}
      id='remindSaveModal'
      contentLabel='remindSaveModal'
    >
      <div className={styles.remindText}>
        <FormattedMessage
          defaultMessage="当前文件已修改，是否保存？"
          id="gui.remindSave.remindText"
        />
      </div>
      <div>
        <ButtonComponent className={styles.remindBtn} size={'small'} onClick={onQuitWithSave}>
          <FormattedMessage
            defaultMessage="保存"
            id="gui.remindSave.save"
          />
        </ButtonComponent>
      </div>
      <div>
        <ButtonComponent className={styles.remindBtn} type={'default'} size={'small'} style={{ margin: '0 20px' }} onClick={onQuitWithoutSave}>
          <FormattedMessage
            defaultMessage="不保存"
            id="gui.remindSave.dontSave"
          />
        </ButtonComponent>
      </div>
      <div>
        <ButtonComponent className={styles.remindBtn} type={'default'} size={'small'} onClick={onQuitCancel}>
          <FormattedMessage
            defaultMessage="取消"
            id="gui.remindSave.cancelSave"
          />
        </ButtonComponent>
      </div>
    </ModalComponent>
  }
}

export default injectIntl(RemindSaveModal);