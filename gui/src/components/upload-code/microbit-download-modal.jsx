import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import React from 'react';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';

import styles from './microbit-download-modal.css';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';

import microbit13x from './microbit13x.png';
import microbit23x from './microbit23x.png';


const MicrobitDownloadModal = (props) => {

    let messages = defineMessages({
        tipsTitle: {
            id: 'gui.microbit.microbitDownloadTipsTitle',
            defaultMessage: 'Some tips',
        }
    });

    const microbitModalLabel = (
        <FormattedMessage
            defaultMessage="After downloading, follow these steps to run your programs!"
            id="gui.microbit.microbitModalLabel"
        />
    );

    const microbitModalStep1 = (
        <FormattedMessage
            defaultMessage="Connect micro:bit to your laptop with a USB cable"
            id="gui.microbit.microbitModalStep1"
        />
    );

    const microbitModalStep2 = (
        <FormattedMessage
            defaultMessage="Move the .hex file to your micro:bit driver"
            id="gui.microbit.microbitModalStep2"
        />
    );

    const microbitDownloadConfirm = (
        <FormattedMessage
            defaultMessage="Roger"
            id="gui.microbit.microbitDownloadConfirm"
        />
    );

    const {
        onRequestClose
    } = props;

    return (
        <Modal
            id='microbit-download'
            showClose
            visiableTitle
            cancelable
            title={props.intl.formatMessage(messages.tipsTitle)}
            onRequestClose={onRequestClose}
            className={classNames(styles.uploadFailBox)}
        >
            <div className={classNames(styles.centerBox)}>
                <div className={styles.title} >{microbitModalLabel}</div>
                <div className={styles.docImages} >
                    <div className={classNames(styles.docImageItem, styles.docImageItemSpace)}>
                        <img src={microbit13x} />
                        <div className={styles.docText}><span className={styles.step}>1</span>{microbitModalStep1}</div>
                    </div>
                    <div className={styles.docImageItem}>
                        <img src={microbit23x} />
                        <div className={styles.docText}><span className={styles.step}>2</span>{microbitModalStep2}</div>
                    </div>
                </div>
                <Button
                    type={'default'}
                    size={'small'}
                    className={classNames(styles.bt)}
                    onClick={onRequestClose}>
                    {microbitDownloadConfirm}
                </Button>
            </div>
        </Modal>
    );

}

export default injectIntl(MicrobitDownloadModal);

