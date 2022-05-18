import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styles from './styles.css';
import classNames from 'classnames';
import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';
import CommonTitle from './common-title/common-title.jsx';
import Progress from './progress/progress.jsx';
import { startWithHttp } from '../../lib/utils';
import bindAll from 'lodash.bindall';

const ariaMessages = defineMessages({
  downloadPkg: {
    id: 'gui.checkUpdate.downloadPkg',
    defaultMessage: '下载安装包',
  },
});


class DownloadVersionModal extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this, [
      'handleDownload',
      'handlePause',
      'handleCancel',
      'handleResume',
    ]);


    this.state = {
      status: 'download',  // 下载状态：下载中 download  暂停中 pause  失败 fail
    }
  }

  componentDidMount() {
    this.handleDownload();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDownloadFailed === false && nextProps.isDownloadFailed === true) {
      this.setState({ status: 'fail' });
    }
  }

  handleDownload() {
    this.setState({ status: 'download' });
    this.props.onResetDownloadFailed();
    const { cosUrl, fileName } = this.props.updateData.ccToolPkgInfo.cosFile;
    const args = {
      url: startWithHttp(cosUrl),
      fileName: fileName
    }
    this.props.vm.deviceEngine.sendVersionUpgradeMessage({ action: 'pkg-download', args });
  }

  handlePause() {
    this.setState({ status: 'pause' });
    // this.props.vm.deviceEngine.sendVersionUpgradeMessage({ action: 'pkg-pause' });
  }

  handleResume() {
    this.setState({ status: 'download' });
    // this.props.vm.deviceEngine.sendVersionUpgradeMessage({ action: 'pkg-resume' });
  }

  handleCancel() {
    // this.setState({ status: 'pause' });
    this.props.onToUpgrade();
    this.props.vm.deviceEngine.sendVersionUpgradeMessage({ action: 'pkg-cancel' });
  }

  render() {
    const { onRequestClose, updateData, percent } = this.props;
    const { status } = this.state;
    return <ModalComponent
      isOpen={true}
      className={classNames(styles.upgradeVersionModal, status === 'download' ? styles.onDownloadWidth : styles.unDownloadWidth)}
      showClose={false}
      onRequestClose={onRequestClose}
      isBackdrop={false}
      visiableTitle={false}
      id='upgradeVersionModal'
      contentLabel='upgradeVersionModal'
    >
      <div className={styles.updateContainer}>
        <CommonTitle title={this.props.intl.formatMessage(ariaMessages.downloadPkg)} />

        {/* 下载中 */}
        {status === 'download' && <div>
          <div className={styles.downloadText}>
            <FormattedMessage
              defaultMessage="Codecraft安装包正在下载，请稍候。"
              id="gui.checkUpdate.downloading"
            />
          </div>
          <Progress percent={percent} />
          <div style={{ textAlign: 'right' }}>
            <ButtonComponent
              className={styles.latestVersionBtn}
              size={'small'}
              type={'default'}
              onClick={this.handlePause}
            >
              <FormattedMessage
                defaultMessage="取消 (C)"
                id="gui.checkUpdate.downloadCancel"
              />
            </ButtonComponent>
          </div>
        </div>}

        {/* 暂停 */}
        {status === 'pause' && <div>
          <div style={{ marginTop: '20px' }}>
            <FormattedMessage
              defaultMessage="确认要取消下载吗？"
              id="gui.checkUpdate.downloadCancelConfirm"
            />
          </div>
          <div>
            <ButtonComponent
              className={styles.latestVersionBtn}
              style={{ marginRight: '20px' }}
              size={'small'}
              type={'default'}
              onClick={this.handleCancel}
            >
              <FormattedMessage
                defaultMessage="取消下载"
                id="gui.checkUpdate.cancelDownload"
              />
            </ButtonComponent>
            <ButtonComponent
              className={styles.latestVersionBtn}
              size={'small'}
              onClick={this.handleResume}
            >
              <FormattedMessage
                defaultMessage="继续下载"
                id="gui.checkUpdate.downloadContinue"
              />
            </ButtonComponent>
          </div>
        </div>}

        {/* 失败 */}
        {status === 'fail' && <div>
          <img src={require('../toast-special/icon_fail.png')} alt="" style={{ marginTop: '20px' }} />
          <div style={{ fontSize: '14px', marginTop: '5px' }}>
            <FormattedMessage
              defaultMessage="下载失败"
              id="gui.checkUpdate.downloadFail"
            />
          </div>
          <div>
            <ButtonComponent
              className={styles.latestVersionBtn}
              style={{ marginRight: '20px' }}
              size={'small'}
              type={'warning'}
              onClick={this.handleDownload}
            >
              <FormattedMessage
                defaultMessage="重试"
                id="gui.checkUpdate.retry"
              />
            </ButtonComponent>
            <ButtonComponent
              className={styles.latestVersionBtn}
              size={'small'}
              type={'default'}
              onClick={this.handleCancel}
            >
              <FormattedMessage
                defaultMessage="取消"
                id="gui.checkUpdate.cancel"
              />
            </ButtonComponent>
          </div>
        </div>}
      </div>
    </ModalComponent>
  }
}

export default injectIntl(DownloadVersionModal);