import React from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import Modal from '../../containers/modal.jsx';
import styles from './python-upgrading.css'
const localeMessages = defineMessages({
    title: {
        id: 'gui.pythonUpgrade.title',
        defaultMessage: 'Update firmware'
    },
    text1: {
        id: 'gui.pythonUpgrade.text1',
        defaultMessage: 'Uploading...'
    },
    text2: {
        id: 'gui.pythonUpgrade.text2',
        defaultMessage: 'Do not close Codecraft, or make any other operations.'
    },
})
const PythonUpgrading = (props) => {
    const { onCancel, intl, type } = props;
    return (
        <Modal
            id='python-upgrading'
            contentLabel='python-upgrading'
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
        </Modal>
    )
}

export default injectIntl(PythonUpgrading);