import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './loginout-modal.css';

import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';

const localeMessages = defineMessages({
  title: {
    id: 'gui.loginModal.logoutTitle',
    defaultMessage: 'Log out'
  },
  logoutPrompt: {
    id: 'gui.loginModal.logoutPrompt',
    defaultMessage: 'Confirm log out?'
  },
  logoutOk: {
    id: 'gui.loginModal.logoutOk',
    defaultMessage: 'Confirm'
  },
  logoutCancel: {
    id: 'gui.loginModal.logoutCancel',
    defaultMessage: 'Cancel'
  }
});

class LoginOutModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <ModalComponent
      isOpen={true}
      className={styles.loginOutModal}
      onRequestClose={this.props.onRequestClose}
      visiableTitle={true}
      title={this.props.intl.formatMessage(localeMessages.title)}
      id='loginOutModal'
      contentLabel='loginOutModal'
    >
      <div className={styles.loginOutModalContainer}>
        <div className={styles.confirmLoginOut}>{this.props.intl.formatMessage(localeMessages.logoutPrompt)}</div>
        <div className={styles.btnContainer}>
          <ButtonComponent className={classNames(styles.loginOutBtn, styles.loginOutBtnMarginRight)} size={'small'} onClick={this.props.onCancelLoginOut}>{this.props.intl.formatMessage(localeMessages.logoutCancel)}</ButtonComponent>
          <ButtonComponent className={styles.loginOutBtn} type={'default'} size={'small'} onClick={this.props.onComfirmLoginOut}>{this.props.intl.formatMessage(localeMessages.logoutOk)}</ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  }
}

export default injectIntl(LoginOutModal);