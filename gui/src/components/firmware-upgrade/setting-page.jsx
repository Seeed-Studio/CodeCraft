import React from 'react';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';
import Box from '../box/box.jsx';

import classNames from 'classnames';

import styles from './setting-page.css'
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';

const localeMessages = defineMessages({
    settingTitle: {
        id: 'gui.settingPage.title',
        defaultMessage: 'Device Information'
    },
    deviceName: {
        id: 'gui.settingPage.deviceName',
        defaultMessage: 'Name：'
    },
    firmwareVersion: {
        id: 'gui.settingPage.firmwareVersion',
        defaultMessage: 'Firmware Version：'
    },
    deviceReturn: {
        id: 'gui.settingPage.deviceReturn',
        defaultMessage: 'Confirm'
    },
});


const SettingPage = (props) => {

    const {
        intl,
        deviceInfo,
        versionInfo,
        onCancel,
        onSettingConfrim
    } = props;
    let deviceName = '';
    if (deviceInfo) {
        const comName = deviceInfo.comName;
        const control = deviceInfo.control;
        deviceName = control ? control + " " + comName : comName;
    }
    return (
        <Modal
            id={'ver-setting'}
            showClose={true}
            contentLabel={'ver-setting'}
            title={intl.formatMessage(localeMessages.settingTitle)}
            visiableTitle={true}
            cancelable={false}
            className={styles.settingPage}
            onRequestClose={onCancel}
        >
            <Box className={styles.settingWrapper}>

                <Box className={styles.settingRow}>
                    <Box className={styles.settingRowLabel} >
                        <FormattedMessage {...localeMessages.deviceName} />
                    </Box>
                    <Box className={styles.settingRowValue} >
                        {deviceName}
                    </Box>
                </Box>
                <Box className={classNames(styles.settingRow, styles.settingRowSpace)}>
                    <Box className={styles.settingRowLabel} >
                        <FormattedMessage {...localeMessages.firmwareVersion} />
                    </Box>
                    <Box className={styles.settingRowValue}>
                        {
                            typeof versionInfo === 'object' ?
                                versionInfo ? `${versionInfo.l2}.${versionInfo.l3}.${versionInfo.l4}.${versionInfo.dongle}` : `0000.0000.0000.0000`
                                : versionInfo
                        }
                    </Box>
                </Box>

                <Box className={styles.settingBottom}>
                    <Button
                        type="default"
                        onClick={onSettingConfrim} size={'small'}>
                        <FormattedMessage {...localeMessages.deviceReturn} />
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default injectIntl(SettingPage);