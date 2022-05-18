import React from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import Modal from '../../containers/modal.jsx';
import styles from './elfbot-upgrading.css'
import Button from '../button-special/button.jsx';
const localeMessages = defineMessages({
    title: {
        id: 'gui.elfbotUpgradeSucc.title',
        defaultMessage: 'Update firmware'
    },
    succ: {
        id: 'gui.elfbotUpgradeSucc.succ',
        defaultMessage: 'Upload successfully!'
    },
    notice1: {
        id: 'gui.elfbotUpgradeSucc.notice1',
        defaultMessage: 'Notes：'
    },
    notice2: {
        id: 'gui.elfbotUpgradeSucc.notice2',
        defaultMessage: '• Congratulation! Please reboot your Elfbot. Have fun!'
    },
    btText: {
        id: 'gui.elfbotUpgradeSucc.btText',
        defaultMessage: 'Roger'
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
            showClose={true}
            onRequestClose={onCancel}
            className={styles.modal}
        >
            <div className={styles.contentBox}>
                <div className={styles.content} >
                    {intl.formatMessage(localeMessages.succ)}
                </div>
            </div>
            {type == 'elfbot' && <div className={styles.notice}>
                <div>{intl.formatMessage(localeMessages.notice1)}</div>
                <div>{intl.formatMessage(localeMessages.notice2)}</div>
            </div>}
            <div className={styles.buttonBox}>
                <Button
                    className={styles.button}
                    size={'small'}
                    onClick={onCancel}
                >
                    {intl.formatMessage(localeMessages.btText)}
                </Button>
            </div>
        </Modal>
    )
}

export default injectIntl(ElfbotUpgrading);