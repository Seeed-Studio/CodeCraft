import React from 'react';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Modal from '../../containers/modal.jsx';
import styles from './upgrading-page.css';

const localeMessages = defineMessages({
    updateDownloading: {
        id: 'gui.updateDownload.updateDownloading',
        defaultMessage: 'Updating firmware'
    },
    dontClose: {
        id: 'gui.updateDownload.dontClose',
        defaultMessage: 'Updating…, do not close the program.'
    },
    updatingStageFirmware: {
        id: 'gui.updateDownload.updatingStageFirmware',
        defaultMessage: 'Updating firmware for stage mode'
    },
    restoringFirmware: {
        id: 'gui.updateDownload.restoringFirmware',
        defaultMessage: 'Restoring firmware'
    },
    upgradingTitle: {
        id: 'gui.connectModal.upgradingTitle',
        defaultMessage: 'Firmware upgrade'
    },
    updatingStageTitle: {
        id: 'gui.updateDownload.updatingStageTitle',
        defaultMessage: 'Upload stage firmware'
    },
    restoringTitle: {
        id: 'gui.updateDownload.restoringTitle',
        defaultMessage: 'Restore firmware'
    }
});

const UpgradingPage = (props) => {
    const {
        intl,
        upgradeInfo = 0,
    } = props;

    return (
        <Modal
            id={'upgrading'}
            contentLabel={'upgrading'}
            title={intl.formatMessage(localeMessages.upgradingTitle)}
            visiableTitle={true}
            className={styles.upgradingPage}
            cancelable = {false}
        >
            <div className={styles.upgradingContentWrap}>
                <p className={styles.upgradingLabel}>
                    {upgradeInfo === 0 && <FormattedMessage  {...localeMessages.updateDownloading} />}
                    {upgradeInfo === 1 && <FormattedMessage  {...localeMessages.updatingStageFirmware} />}
                    {upgradeInfo === 2 && <FormattedMessage  {...localeMessages.restoringFirmware} />}
                    ...
                </p>
                <p className={styles.upgradingWarn}>
                    &nbsp;
                        <FormattedMessage  {...localeMessages.dontClose} />
                </p>
            </div>
        </Modal>
    );
}

export default injectIntl(UpgradingPage);