import classNames from 'classnames';
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import styles from './connecting-modal.css';
import Modal from '../../containers/modal.jsx';

const ConnectingModal = (props) => {

    const uploadingMessage = (
        <FormattedMessage
            defaultMessage="Connecting......"
            id="gui.connectModal.connectingMessage"
        />
    )

    return (
        <Modal
            id='state-connecting'
            cancelable={false}
            className={classNames(styles.uploadingBox)}
        >
            <div className={classNames(styles.centerBox)}>
                <div className={classNames(styles.icon)} />
                <div className={classNames(styles.text)}>
                    {uploadingMessage}
                </div>
            </div>
        </Modal>
    );
}


export default injectIntl(ConnectingModal);
