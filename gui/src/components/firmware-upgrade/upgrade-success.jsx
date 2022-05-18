import React from 'react';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';

import styles from './upgrade-success.css';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';

const localeMessages = defineMessages({
    successContent: {
        id: 'gui.upgradeModal.successContent',
        defaultMessage: 'Firmware has been upgraded to the latest version!'
    },
    know: {
        id: 'gui.upgradeModal.know',
        defaultMessage: 'OK'
    },
    successContentStage: {
        id: 'gui.upgradeModal.successContentStage',
        defaultMessage: 'Firmware updated'
    },
    successContentRestore: {
        id: 'gui.upgradeModal.successContentRestore',
        defaultMessage: 'Firmware restored'
    },
    updateSuc: {
        id: 'gui.connectModal.updateSuc',
        defaultMessage: 'Update Success'
    },
    stageSucTitle: {
        id: 'gui.upgradeModal.stageSucTitle',
        defaultMessage: 'Update Success'
    },
    restoreSucTitle: {
        id: 'gui.upgradeModal.restoreSucTitle',
        defaultMessage: 'Restore success'
    }
});

const UpgradeSuccess = (props) => {

    const {
        intl,
        setTab,
        onCancel,
        onUpgradeSuccComfirm,
        SERIAL_TAB_INDEX,
        upgradeInfo = 0
    } = props;

    return (
        <Modal
            id={'upgrade-succ'}
            showClose={true}
            contentLabel={'upgrade-succ'}
            title={intl.formatMessage(localeMessages.updateSuc)}
            visiableTitle={true}
            className={styles.upgradeSuccPage}
            onRequestClose={onCancel}
        >
            <div className={styles.upgradeSuccContentWrap}>
                <h3 className={styles.upgradeSuccLabel}>
                    {upgradeInfo === 0 && <FormattedMessage  {...localeMessages.successContent} />}
                    {upgradeInfo === 1 && <FormattedMessage  {...localeMessages.successContentStage} />}
                    {upgradeInfo === 2 && <FormattedMessage  {...localeMessages.successContentRestore} />}
                </h3>
                <div>
                    <Button onClick={onUpgradeSuccComfirm} size={'small'}>
                        {intl.formatMessage(localeMessages.know)}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default  injectIntl(UpgradeSuccess);

