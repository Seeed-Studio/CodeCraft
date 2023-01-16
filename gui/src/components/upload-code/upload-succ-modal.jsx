import classNames from 'classnames';
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import styles from './upload-succ-modal.css';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';

const UploadSuccModal = (props) => {

    const uploadSuccMessage = (
        <FormattedMessage
            defaultMessage="Upload successfully"
            id="gui.uploadCode.uploadSuccMessage"
        />
    );

    const uploadSuccComfirm = (
        <FormattedMessage
            defaultMessage="Roger"
            id="gui.uploadCode.uploadSuccComfirm"
        />
    );

    const uploadSuccResetPrompt = (
        <FormattedMessage
            defaultMessage="Wanna run your program? Press the reset button on the Main board."
            id="gui.uploadCode.uploadSuccResetPrompt"
        />
    );

    const {
        isShowGroveZero = false,
        onStateModalClose
    } = props;

    const defaultSuccModal = (
        <div className={classNames(styles.centerBoxDefault)}>
            <div className={classNames(styles.icon, styles.iconSucc)}></div>
            <div className={classNames(styles.text)}>
                {uploadSuccMessage}
            </div>
            <Button
                type={'primary'}
                size={'small'}
                className={classNames(styles.bt)}
                onClick={onStateModalClose}>
                {uploadSuccComfirm}
            </Button>
        </div>
    );

    const grovezeroSuccModal = (
        <div className={classNames(styles.centerBoxGrove)}>
            <div className={classNames(styles.grovezeroTitle)}>
                {uploadSuccMessage}
            </div>
            <div className={classNames(styles.grovezeroPrompt)}>
                {uploadSuccResetPrompt}
            </div>
            <div className={classNames(styles.grovezeroIcon)}></div>
            <Button
                type={'primary'}
                size={'small'}
                className={classNames(styles.bt, styles.grovezeroBt)}
                onClick={onStateModalClose}>
                {uploadSuccComfirm}
            </Button>
        </div>
    );

    return (
        <Modal
            id='state-uploa-succ'
            showClose={false}
            cancelable={true}
            onRequestClose={onStateModalClose}
            className={classNames(styles.uploadSuccBox)}
        >
            {isShowGroveZero ? grovezeroSuccModal : defaultSuccModal}
        </Modal>
    );

}

export default injectIntl(UploadSuccModal);
