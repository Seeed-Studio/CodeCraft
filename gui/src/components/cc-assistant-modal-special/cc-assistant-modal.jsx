import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './cc-assistant-modal.css';

import ModalComponent from '../../containers/modal.jsx';
import IsUsed from './is-used.jsx';
import HasDisconnected from './has-disconnected.jsx';
import ComfirmDisconnect from './comfirm-disconnect.jsx';
import NotOpenAssistant from './not-open-assistant.jsx';

export default class CCAssistantModal extends React.Component {
  render() {
    const {
   
    } = this.props;
    return <ModalComponent
      isOpen={true}
      // className={styles.ccAssistantModal}
      className={styles.ccAssistantModalDown}
      showClose={true}
      onRequestClose={this.props.onRequestClose}
      visiableTitle={true}
      title={'提示'}
      id='ccAssistantModal'
      contentLabel='ccAssistantModal'
    >
      {/* <div className={styles.ccAssistantConstainer}> */}
      <div className={styles.ccAssistantConstainerDown}>
        <IsUsed />
        {/* <HasDisconnected />
        <ComfirmDisconnect /> */}
        {/* <NotOpenAssistant /> */}
      </div>
    </ModalComponent>
  }
}