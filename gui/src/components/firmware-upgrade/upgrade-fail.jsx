import React from 'react';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from './upgrade-fail.css';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';

const localeMessages = defineMessages({
  updateCancel: {
    id: 'gui.upgradeModal.updateCancel',
    defaultMessage: 'Cancel'
  },
  updateRetry: {
    id: 'gui.upgradeModal.updateRetry',
    defaultMessage: 'Retry'
  },
  updateOk: {
    id: 'gui.upgradeModal.updateFailOk',
    defaultMessage: 'OK'
  },
  updateFailTitle: {
    id: 'gui.connectModal.updateFailTitle',
    defaultMessage: 'Upgrade failed'
  },
  stageFailTitle: {
    id: 'gui.upgradeModal.stageFailTitle',
    defaultMessage: 'Upload failed'
  },
  restoreFailTitle: {
    id: 'gui.upgradeModal.restoreFailTitle',
    defaultMessage: 'Restore failed'
  },
  updateFail: {
    id: 'gui.upgradeModal.updateFail',
    defaultMessage: 'Firmware upgrade failed, please try again'
  },
  stageFail: {
    id: 'gui.upgradeModal.stageFail',
    defaultMessage: 'Firmware upgrade failed, please try again'
  },
  restoreFail: {
    id: 'gui.upgradeModal.restoreFail',
    defaultMessage: 'Failed to restore firmware, please try again'
  },
});

const UpgradeFail = (props) => {

  const {
    intl,
    onCancel,
    onUpgradeFailComfirm,
    upgradeInfo = 0
  } = props;

  return (
    <Modal
      id={'upgrade-fail'}
      contentLabel={'upgrade-fail'}
      title={intl.formatMessage(localeMessages.updateFailTitle)}
      visiableTitle={true}
      cancelable = {false}
      className={styles.upgradeFailPage}
      onRequestClose={onCancel}
    >
      <div className={styles.upgradeFailContentWrap}>
        <h3 className={styles.upgradeFailLabel}>
          {upgradeInfo === 0 && <FormattedMessage  {...localeMessages.updateFail} />}
          {upgradeInfo === 1 && <FormattedMessage  {...localeMessages.stageFail} />}
          {upgradeInfo === 2 && <FormattedMessage  {...localeMessages.restoreFail} />}
        </h3>
        <div className={styles.upgradeFailBottomWrap}>
          <Button onClick={onUpgradeFailComfirm} size={'small'}>
            {intl.formatMessage(localeMessages.updateOk)}
          </Button>
        </div>
      </div>
    </Modal>

  );
}

export default injectIntl(UpgradeFail);
