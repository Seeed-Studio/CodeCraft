import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import styles from './upgrade-confirm-page.css';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';
import Box from '../box/box.jsx';

/**
 * 定义多语言句柄
 * Define multilingual handles
 */
const localeMessages = defineMessages({

    title: {
        id: 'gui.upgradeConfirm.title',
        defaultMessage: 'Update firmware'
    },
    /**
     * 取消按钮 text
     */
    txCancel: {
        id: 'gui.upgradeConfirm.txcancel',
        defaultMessage: 'Cancel'
    },

    /**
     * 更新按钮 text
     */
    txUpgrade: {
        id: 'gui.upgradeConfirm.txupgrade',
        defaultMessage: 'Upgrade firmware'
    },

    /**
     * 设备名字
     */
    deviceName: {
        id: 'gui.settingPage.deviceName',
        defaultMessage: 'Name：'
    },

    /**
     * 固件版本号
     */
    firmwareVersion: {
        id: 'gui.settingPage.firmwareVersion',
        defaultMessage: 'Firmware Version：'
    },

});

/**
 * 定义更新确认组件
 * Define upgrade confirm component
 */
const UpgradeConfirm = props => {

    const {
        intl,
        deviceInfo,
        versionInfo,
        onUpgradeCancel,
        onUpgrade,
        onCancel,
        title,
    } = props;
    let deviceName = '';
    if (deviceInfo) {
        const comName = deviceInfo.comName;
        const control = deviceInfo.control;
        deviceName = control ? control + " " + comName : comName;
    }
    return (
        <Modal
            id={'upgrade-confirm'}
            showClose={true}
            contentLabel={'upgrade-confirm'}
            title={intl.formatMessage(localeMessages.title)}
            visiableTitle={true}
            cancelable={false}
            className={styles.upgradeComfirmPage}
            onRequestClose={onCancel}
        >
            <Box className={styles.upgradeComfirmWrapper}>
                <Box className={styles.upgradeComfirmRow}>
                    <Box className={styles.upgradeComfirmRowLabel} >
                        <FormattedMessage {...localeMessages.deviceName} />
                    </Box>
                    <Box className={styles.upgradeComfirmRowValue} >
                        {deviceName}
                    </Box>
                </Box>
                <Box className={classNames(styles.upgradeComfirmRow, styles.upgradeComfirmRowSpace)}>
                    <Box className={styles.upgradeComfirmRowLabel} >
                        <FormattedMessage {...localeMessages.firmwareVersion} />
                    </Box>
                    <Box className={styles.upgradeComfirmRowValue}>
                        {
                            typeof versionInfo === 'object' ?
                                versionInfo ? `${versionInfo.l2}.${versionInfo.l3}.${versionInfo.l4}.${versionInfo.dongle}` : `0000.0000.0000.0000`
                                : versionInfo
                        }
                    </Box>
                </Box>
                <Box className={styles.upgradeComfirmBottom}>
                    <Button
                        type="default"
                        size={'small'}
                        onClick={onUpgradeCancel}>
                        <FormattedMessage {...localeMessages.txCancel} />
                    </Button>
                    <Box className={styles.upgradeComfirmBottomSpace} />
                    <Button
                        size={'small'}
                        onClick={onUpgrade} >
                        <FormattedMessage {...localeMessages.txUpgrade} />
                    </Button>
                </Box>
            </Box>
        </Modal>
    );

}

UpgradeConfirm.propTypes = {
    deviceName: PropTypes.string,
    firmwareVer: PropTypes.string,
    onCancel: PropTypes.func,
    onUpgrade: PropTypes.func,
    onBack: PropTypes.func
};

export default injectIntl(UpgradeConfirm);




