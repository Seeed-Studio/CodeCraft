import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './upload-timeout-modal.css';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';

const UploadTimeoutModal = (props) => {

    // const uploadTimeoutMessage = (
    //     <FormattedMessage
    //         defaultMessage="上传超时"
    //         description=""
    //         id="gui.uploadCode.uploadTimeoutMessage"
    //     />
    // );

    // const uploadTimeoutConfirm = (
    //     <FormattedMessage
    //         defaultMessage="我知道了"
    //         description=""
    //         id="gui.uploadCode.uploadTimeoutConfirm"
    //     />
    // );

    const prompt1 = (
        <div className={styles.promptWrapper}>
            <p className={styles.uploadTimeoutPrompt}>
                <FormattedMessage
                    defaultMessage="Upload timed out, please try again, If the error remains, try the followings:"
                    description=""
                    id="gui.uploadCode.uploadTimeoutPrompt"
                />
            </p>
            <h4 className={styles.uploadTimeoutPropmtLabel}>
                <FormattedMessage
                    defaultMessage="Step 1. Enter boot mode"
                    description=""
                    id="gui.uploadCode.timeoutHandleMethodSubLabel1"
                />
            </h4>
            <p className={styles.uploadTimeoutPropmtText}>
                <FormattedMessage
                    defaultMessage="1. If the main board is not connected to power supply, please press and hold the reset button on the main board."
                    description=""
                    id="gui.uploadCode.timeoutHandleMethodSub1Info1"
                />
            </p>
            <p className={styles.uploadTimeoutPropmtText}>
                <FormattedMessage
                    defaultMessage="2. Connect the main board to the USB port of the computer."
                    description=""
                    id="gui.uploadCode.timeoutHandleMethodSub1Info2"
                />
            </p>
            <p className={styles.uploadTimeoutPropmtText}>
                <FormattedMessage
                    defaultMessage="3. Wait for 8 seconds, the status light will flash slowly, indicating that it has entered the boot mode."
                    description=""
                    id="gui.uploadCode.timeoutHandleMethodSub1Info3"
                />
            </p>
            <h4 className={styles.uploadTimeoutPropmtLabel}>
                <FormattedMessage
                    defaultMessage="Step 2. Update firmware"
                    description=""
                    id="gui.uploadCode.timeoutHandleMethodSubLabel2"
                />
            </h4>
            <p className={styles.uploadTimeoutPropmtText}>
                <FormattedMessage
                    defaultMessage="1. Enter boot mode as step 1."
                    description=""
                    id="gui.uploadCode.timeoutHandleMethodSub2Info1"
                />
            </p>
            <p className={styles.uploadTimeoutPropmtText}>
                <FormattedMessage
                    defaultMessage="2. Connect the main board to Codecraft."
                    description=""
                    id="gui.uploadCode.timeoutHandleMethodSub2Info2"
                />
            </p>
            <p className={styles.uploadTimeoutPropmtText}>
                <FormattedMessage
                    defaultMessage="3. After it's connected successfully, you will be prompted to upgrade the firmware."
                    description=""
                    id="gui.uploadCode.timeoutHandleMethodSub2Info3"
                />
            </p>
        </div>
    );

    const prompt2 = (
        <div className={styles.promptWrapper}>
            <h4 className={styles.uploadTimeoutPropmtText}>
                <FormattedMessage
                    defaultMessage="Please check whether the device is connected to the right serial port. Make sure it's the correct serial port before uploading again. "
                    id="gui.uploadCode.timeoutHandleMethod2Label"
                />
            </h4>
            <p className={styles.uploadTimeoutPropmtText}>
                <FormattedMessage
                    defaultMessage="退出Codecraft，再重新启动Codecraft"
                    description=""
                    id="gui.uploadCode.timeoutHandleMethod2Message"
                />
            </p>
        </div>
    );

    const {
        isShowGroveZero = false,
        onStateModalClose
    } = props;


    return (
        <Modal
            id='state-uploa-timeout'
            showClose={true}
            cancelable={true}
            onRequestClose={onStateModalClose}
            className={classNames(styles.uploadTimeoutBox)}
        >
            <div className={classNames(styles.centerBox)}>
                <div className={classNames(styles.icon, styles.iconTimeout)}></div>
                <div className={classNames(styles.title)}>
                    <FormattedMessage
                        defaultMessage="Ooops, Timeout…"
                        id="gui.uploadCode.uploadTimeoutMessage"
                    />
                </div>
                <Button
                    type={'default'}
                    size={'small'}
                    className={classNames(styles.bt)}
                    onClick={onStateModalClose}>
                    <FormattedMessage
                        defaultMessage="OK"
                        id="gui.uploadCode.uploadTimeoutConfirm"
                    />
                </Button>
                {isShowGroveZero ? prompt1 : prompt2}
            </div>
        </Modal>
    );

}

export default UploadTimeoutModal;