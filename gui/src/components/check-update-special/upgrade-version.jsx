import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styles from './styles.css';
import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';
import CommonTitle from './common-title/common-title.jsx';
import { textToArr } from '../../lib/utils'

const ariaMessages = defineMessages({
  checkUpdate: {
    id: 'gui.checkUpdate.checkVerTitle',
    defaultMessage: '检查更新',
  },
});

class UpgradeVersionModal extends React.Component {
  render() {
    const { onRequestClose, onToDownload, updateData } = this.props;
    return <ModalComponent
      isOpen={true}
      className={styles.upgradeVersionModal}
      showClose={updateData.ccToolPkgInfo.isForceUpdate === 1 ? false : true}
      onRequestClose={onRequestClose}
      isBackdrop={updateData.ccToolPkgInfo.isForceUpdate === 1 ? false : true}
      visiableTitle={false}
      id='upgradeVersionModal'
      contentLabel='upgradeVersionModal'
    >
      <div className={styles.updateContainer}>
        <CommonTitle title={this.props.intl.formatMessage(ariaMessages.checkUpdate)} />
        <div style={{ fontSize: '18px', fontWeight: 400, margin: '5px 0px 20px' }}>
          <FormattedMessage
            defaultMessage="发现新版本"
            id="gui.checkUpdate.newVersion"
          />
          {updateData.ccToolPkgInfo.version}</div>
        <div className={styles.updateTextContainer}>
          {textToArr(updateData.ccToolPkgInfo.description).map((item, index) => {
            return <div key={index}>{item}</div>
          })}
        </div>
        <ButtonComponent
          className={styles.latestVersionBtn}
          size={'small'}
          onClick={onToDownload}
        >
           <FormattedMessage
            defaultMessage="立即升级"
            id="gui.checkUpdate.updateNow"
          />
          </ButtonComponent>
      </div>
    </ModalComponent>
  }
}

export default injectIntl(UpgradeVersionModal);