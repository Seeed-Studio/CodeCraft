import React from 'react';
import styles from './invite-code-modal.css';
import classNames from 'classnames';
import ModalComponent from '../../containers/modal.jsx';
import { queryUserInviteCode, searchInvitedUserList } from '../../lib/busi-proxy/busi-proxy.js';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

const localeMessages = defineMessages({
  myInvitationCode: {
      id: 'gui.loginModal.myInvitationCode',
      defaultMessage: 'My Invitation Code'
  },
  invitationText: {
      id: 'gui.loginModal.invitationText',
      defaultMessage: 'After copying the invitation code, send it to your friends, and ask your friend to fill in your invitation code when registering, to help you get more rights and interests of the creators, and the right of interpretation belongs to the creators platform.'
  },
  successInvited: {
      id: 'gui.loginModal.successInvited',
      defaultMessage: 'Successfully invited friends'
  },
  registerTime: {
      id: 'gui.loginModal.registerTime',
      defaultMessage: 'Registration Time'
  },
  userAccount: {
      id: 'gui.loginModal.userAccount',
      defaultMessage: 'User Account'
  }
})

class InviteCodeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inviteUserCode: '',
      invitedUserList: []
    }
  }

  componentDidMount() {
    const { authInfo } = this.props;
    const params = { authInfo, userUUID: authInfo.userUUID, userAccount: authInfo.userAccount };
    queryUserInviteCode(params).then((res) => {
      if(res.errorCode === 0) {
        const inviteUserCode = res.inviteCode || '';
        this.setState({ inviteUserCode });
        const searchInvitedUserListParams  = { authInfo, userUUID: authInfo.userUUID, fromResult: 0, sizeResult: 9999 };
        searchInvitedUserList(searchInvitedUserListParams).then((listRes) => {
          if(listRes.errorCode === 0) {
            const invitedUserList = listRes.invitedUserList || [];
            this.setState({ invitedUserList });
          }
        })
      }
    })
  }

  render() {
    const { intl } = this.props;
    const { inviteUserCode, invitedUserList } = this.state;

    return  <ModalComponent
      isOpen={true}
      className={styles.inviteModal}
      showClose={true}
      onRequestClose={this.props.onRequestClose}
      id='inviteCodeModal'
      contentLabel='inviteCodeModal'
    >
      <div className={styles.inviteCodeContainer}>
        <div className={ styles.inviteCodeText1 }>{intl.formatMessage(localeMessages.myInvitationCode)}: <span>{ inviteUserCode }</span></div>
        <div>{intl.formatMessage(localeMessages.invitationText)}</div>
        <div className={styles.lines}></div>
        <div className={ styles.hasInvited }>{intl.locale === 'zh-cn' ? `成功邀请的朋友（${invitedUserList.length}名）` : `Successfully invited friends(${invitedUserList.length})`}</div>

        { invitedUserList.length > 0 && <div className={ styles.userTable }>
          <div className={ styles.tableLineHeader }>
            <div className={ classNames(styles.tableCell, styles.tableCellLeft) }>{ intl.formatMessage(localeMessages.userAccount) }</div>
            <div className={ styles.tableCell }>{ intl.formatMessage(localeMessages.registerTime) }</div>
          </div>
          { invitedUserList.map((item, index) => {
            return <div key={ index } className={ styles.tableLine }>
              <div className={ classNames(styles.tableCell, styles.tableCellLeft) }>{ item.invitedUserAccount }</div>
              <div className={ styles.tableCell }>{ item.invitedUserRegisterTime }</div>
            </div>
          }) }
        </div> }
      </div>
    </ModalComponent>
  }
}

export default injectIntl(InviteCodeModal);