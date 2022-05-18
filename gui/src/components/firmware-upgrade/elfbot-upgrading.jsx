import React from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import Modal from '../../containers/modal.jsx';
import styles from './elfbot-upgrading.css'
const localeMessages = defineMessages({
    title: {
        id: 'gui.elfbotUpgrade.title',
        defaultMessage: 'Update firmware'
    },
    text1: {
        id: 'gui.elfbotUpgrade.text1',
        defaultMessage: 'Uploading...'
    },
    text2: {
        id: 'gui.elfbotUpgrade.text2',
        defaultMessage: 'Do not close Codecraft, or make any other operations.'
    },
    text3: {
        id: 'gui.elfbotUpgrade.text3',
        defaultMessage: 'Notes：'
    },
    text4: {
        id: 'gui.elfbotUpgrade.text4',
        defaultMessage: '• Make sure Elfbot is connected to Codecraft in this process.'
    },
})
const ElfbotUpgrading = (props) => {
    const { onCancel, intl, type } = props;
    return (
        <Modal
            id='elfbot-upgrading'
            contentLabel='elfbot-upgrading'
            title={intl.formatMessage(localeMessages.title)}
            visiableTitle={true}
            cancelable={true}
            showClose={false}
            className={styles.modal}
        >
            <div className={styles.contentBox}>
                <div className={styles.content} >
                    <div>{intl.formatMessage(localeMessages.text1)}</div>
                    {intl.formatMessage(localeMessages.text2)}
                </div>
            </div>
            {
                type == 'elfbot' && <div className={styles.notice}>
                    <div>{intl.formatMessage(localeMessages.text3)}</div>
                    <div>{intl.formatMessage(localeMessages.text4)}</div>
                </div>
            }
        </Modal>
    )
}

export default injectIntl(ElfbotUpgrading);