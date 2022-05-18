import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import React from 'react';
import styles from './login-timeout-modal.css';

import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';

export default class LoginOutModal extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleClose',
      'handleToLogin'
    ]);
  }
  handleClose() {
    this.props.onRequestClose();
    this.props.onLoignUnName();
  }
  handleToLogin() {
    this.props.onLoignUnName();
    this.props.toLogin();
  }


  render() {
    return <ModalComponent
      isOpen={true}
      className={styles.loginOutModal}
      onRequestClose={this.handleClose}
      // visiableTitle={true}
      // title={'退出登录'}
      cancelable={false}
      showClose={true}
      id='loginOutModal'
      contentLabel='loginOutModal'
    >
      <div className={styles.loginOutModalContainer}>
        <div className={styles.confirmLoginOut}>
          <FormattedMessage
            defaultMessage="Timeout. Please login again. "
            description=""
            id="gui.menuBar.loginTimeout"
          />
        </div>
        <div className={styles.btnContainer}>
          <ButtonComponent className={styles.loginOutBtn} size={'small'} onClick={this.handleToLogin}>
            <FormattedMessage
              defaultMessage="Please login again."
              description=""
              id="gui.menuBar.relogin"
            />
          </ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  }
}