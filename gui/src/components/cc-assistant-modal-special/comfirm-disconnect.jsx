import React from 'react';
import styles from './cc-assistant-modal.css';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

import ButtonComponent from '../button-special/button.jsx';

export default class ComfirmDisconnect extends React.Component {
  render() {
    return <div className={styles.isUsedContainer}>
      <div className={styles.isUsed}>
        确定要断开与micro:bit的连接吗？
      </div>
      <ButtonComponent className={styles.assistantOkBtn} size={'small'}   style={{ marginRight: '10px' }}>取消</ButtonComponent>
      <ButtonComponent type={'default'} size={'small'} className={styles.assistantOkBtn}>确定</ButtonComponent>
    </div>
  }
}