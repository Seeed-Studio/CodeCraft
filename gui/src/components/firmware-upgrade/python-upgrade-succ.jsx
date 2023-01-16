import React from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import Modal from '../../containers/modal.jsx';
import styles from './python-upgrading.css'
import Button from '../button-special/button.jsx';
const localeMessages = defineMessages({
    title: {
        id: 'gui.pythonUpgradeSucc.title',
        defaultMessage: 'Update firmware'
    },
    succ: {
        id: 'gui.pythonUpgradeSucc.succ',
        defaultMessage: 'Upload successfully!'
    },
    btText: {
        id: 'gui.pythonUpgradeSucc.btText',
        defaultMessage: 'Roger'
    },
})

const PythonUpgradeSucc = (props) => {
    const { onCancel, intl, type } = props;
    return (
        <Modal
            id='python-upgrade-succ'
            contentLabel='python-upgrade-succ'
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

export default injectIntl(PythonUpgradeSucc);