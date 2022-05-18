import React from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';
import styles from './elfbot-upgrade.css'
import classNames from 'classnames'
import { connect } from 'react-redux';

import {
    setModalIndex,
    RESCUE_MODAL_ELFBOT_UPGRADING,
    RESCUE_MODAL_ELFBOT_UPGRADE_SUCC,
    RESCUE_MODAL_ELFBOT_UPGRADE_FAIL
} from '../../reducers/rescue'

const localeMessages = defineMessages({
    title: {
        id: 'gui.elfbotUpgrade.title',
        defaultMessage: 'Please update your firmware as follows'
    },
    failText: {
        id: 'gui.elfbotUpgrade.failText',
        defaultMessage: 'Upload failed'
    },
    failMessage: {
        id: 'gui.elfbotUpgrade.failMessage',
        defaultMessage: ' Make sure you choose the same device as the one you are actually connected to.'
    },
    text: {
        id: 'gui.elfbotUpgrade.text',
        defaultMessage: 'Please update your firmware as follows'
    },
    step1Text: {
        id: 'gui.elfbotUpgrade.step1Text',
        defaultMessage: 'Please shut down your Elfbot'
    },
    step2Text: {
        id: 'gui.elfbotUpgrade.step2Text',
        defaultMessage: 'Hold S button on Elfbot, meanwhile power on Elfbot, then your Elfbot will enter BOOT mode.'
    },
    btText: {
        id: 'gui.elfbotUpgrade.btText',
        defaultMessage: 'Upload Now'
    },
    notice1: {
        id: 'gui.elfbotUpgrade.notice1',
        defaultMessage: 'Notes：'
    },
    notice2: {
        id: 'gui.elfbotUpgrade.notice2',
        defaultMessage: '• Make sure Elfbot is connected to Codecraft in this process.'
    },
    notice3: {
        id: 'gui.elfbotUpgrade.notice3',
        defaultMessage: '• Make sure device is connected to Codecraft in this process.'
    }
})

const ElfbotUpgrade = (props) => {
    const { intl, onCancel, onClick, type, dtype, setModalIndex, rescuer, vm } = props;

    const upgrade = () => {
        setModalIndex(RESCUE_MODAL_ELFBOT_UPGRADING);
        const upgradeSucc = () => setModalIndex(RESCUE_MODAL_ELFBOT_UPGRADE_SUCC);
        const upgradeFail = () => setModalIndex(RESCUE_MODAL_ELFBOT_UPGRADE_FAIL);
        if (vm.deviceEngine.isEquipmentConnected()) {
            vm.deviceEngine.disconnect().then(() => {
                rescuer.upgrade().then(upgradeSucc).catch(upgradeFail)
            });
        } else {
            rescuer.upgrade().then(upgradeSucc).catch(upgradeFail)
        }
    }

    const elfbotUpgradeView = (
        <div className={styles.box}>
            {
                type === 'fail'
                &&
                <div className={styles.failText}>
                    {intl.formatMessage(localeMessages.failText)}
                </div>
            }
            <div className={styles.text}>
                {intl.formatMessage(localeMessages.text)}
            </div>

            <div className={styles.stepBox}>
                <div className={styles.stepNO}>1</div>
                <div className={styles.stepText}>
                    {intl.formatMessage(localeMessages.step1Text)}
                </div>
                <div className={styles.step1img}></div>
            </div>

            <div className={styles.stepBox}>
                <div className={styles.stepNO}>2</div>
                <div className={styles.stepText}>
                    {intl.formatMessage(localeMessages.step2Text)}
                </div>
                <div className={styles.step2img}></div>
            </div>

            <div className={classNames(styles.stepBox, styles.step3Box)}>
                <div className={styles.stepNO}>3</div>
                <Button
                    className={styles.button}
                    size={'small'}
                    onClick={onClick || upgrade}
                >
                    {intl.formatMessage(localeMessages.btText)}
                </Button>
            </div>

        </div>
    )

    const normalUpgradeView = (
        <div className={styles.box2}>
            {
                type === 'fail'
                &&
                <div className={styles.failText2}>
                    <div className={styles.failText2Color} >{intl.formatMessage(localeMessages.failText)}</div>
                    {intl.formatMessage(localeMessages.failMessage)}
                </div>
            }
            <div className={styles.bottomBox}>
                <Button
                    className={styles.button}
                    size={'small'}
                    onClick={onClick || upgrade}
                >
                    {intl.formatMessage(localeMessages.btText)}
                </Button>
            </div>
        </div>
    )

    return (
        <Modal
            id='elfbot-upgrade-init'
            contentLabel='elfbot-upgrade-init'
            title={intl.formatMessage(localeMessages.title)}
            visiableTitle={true}
            cancelable={true}
            showClose={true}
            onRequestClose={onCancel}
            className={styles.modal}
        >
            {dtype == 'elfbot' && elfbotUpgradeView}
            {(dtype == 'mpython' || dtype == 'maixduino' || dtype == 'powering') && normalUpgradeView}

            <div className={styles.notice}>
                <div>
                    {intl.formatMessage(localeMessages.notice1)}
                </div>
                <div>
                    {dtype == 'elfbot' && intl.formatMessage(localeMessages.notice2)}
                    {(dtype == 'mpython' || dtype == 'maixduino' || dtype == 'powering') && intl.formatMessage(localeMessages.notice3)}
                </div>
            </div>
        </Modal>
    )

}
const mapStateToProps = state => ({
    rescuer: state.scratchGui.rescue.rescuer,
    vm: state.scratchGui.vm
})

const mapDispatchToProps = dispatch => ({
    setModalIndex: index => dispatch(setModalIndex(index))

})
export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ElfbotUpgrade));