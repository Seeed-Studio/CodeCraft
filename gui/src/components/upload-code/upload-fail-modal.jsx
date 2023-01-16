import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import styles from './upload-fail-modal.css';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';

const UploadFailModal = (props) => {

    const uploadFailMessage = (
        <FormattedMessage
            defaultMessage="Upload failure"
            id="gui.uploadCode.uploadFailMessage"
        />
    );

    const uploadFailConfirm = (
        <FormattedMessage
            defaultMessage="OK"
            id="gui.uploadCode.uploadFailConfirm"
        />
    );

    const {
        onStateModalClose
    } = props;

    return (
        <Modal
            id='state-uploa-fail'
            cancelable={true}
            onRequestClose={onStateModalClose}
            className={classNames(styles.uploadFailBox)}
        >
            <div className={classNames(styles.centerBox)}>
                <div className={classNames(styles.icon, styles.iconFail)}></div>
                <div className={classNames(styles.text)}>
                    {uploadFailMessage}
                </div>
                <Button
                    type={'default'}
                    size={'small'}
                    className={classNames(styles.bt)}
                    onClick={onStateModalClose}>
                    {uploadFailConfirm}
                </Button>
            </div>
        </Modal>
    );

}

export default UploadFailModal;

