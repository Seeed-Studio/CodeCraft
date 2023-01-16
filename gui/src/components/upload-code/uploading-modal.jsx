import classNames from 'classnames';
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import styles from './uploading-modal.css';
import Modal from '../../containers/modal.jsx';

const UploadingModal = (props) => {

    const uploadingMessage = (
        <FormattedMessage
            defaultMessage="Just chill while it's uploading"
            id="gui.uploadCode.uploadingMessage"
        />
    )

    return (
        <Modal
            id='state-uploading'
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


export default injectIntl(UploadingModal);
