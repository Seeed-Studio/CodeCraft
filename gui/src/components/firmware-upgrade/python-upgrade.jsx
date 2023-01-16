import React from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';
import styles from './python-upgrade.css'
import classNames from 'classnames'
import { connect } from 'react-redux';

import {
    setModalIndex,
    RESCUE_MODAL_PYTHON_UPGRADING,
    RESCUE_MODAL_PYTHON_UPGRADE_SUCC,
    RESCUE_MODAL_PYTHON_UPGRADE_FAIL
} from '../../reducers/rescue'

const localeMessages = defineMessages({
    title: {
        id: 'gui.pythonUpgrade.title',
        defaultMessage: 'Please update your firmware as follows'
    },
    failText: {
        id: 'gui.pythonUpgrade.failText',
        defaultMessage: 'Upload failed'
    },
    failMessage: {
        id: 'gui.pythonUpgrade.failMessage',
        defaultMessage: ' Make sure you choose the same device as the one you are actually connected to.'
    },
    text: {
        id: 'gui.pythonUpgrade.text',
        defaultMessage: 'Please update your firmware as follows'
    },
    btText: {
        id: 'gui.pythonUpgrade.btText',
        defaultMessage: 'Upload Now'
    },
    notice1: {
        id: 'gui.pythonUpgrade.notice1',
        defaultMessage: 'Notes：'
    },
    notice3: {
        id: 'gui.pythonUpgrade.notice3',
        defaultMessage: '• Make sure device is connected to Codecraft in this process.'
    }
})

const PythonUpgrade = (props) => {
    const { intl, onCancel, onClick, type, dtype, setModalIndex, rescuer, vm } = props;

    const upgrade = () => {
        setModalIndex(RESCUE_MODAL_PYTHON_UPGRADING);
        const upgradeSucc = () => setModalIndex(RESCUE_MODAL_PYTHON_UPGRADE_SUCC);
        const upgradeFail = () => setModalIndex(RESCUE_MODAL_PYTHON_UPGRADE_FAIL);
        if (vm.deviceEngine.isEquipmentConnected()) {
            vm.deviceEngine.disconnect().then(() => {
                rescuer.upgrade().then(upgradeSucc).catch(upgradeFail)
            });
        } else {
            rescuer.upgrade().then(upgradeSucc).catch(upgradeFail)
        }
    }

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
            id='python-upgrade-init'
            contentLabel='python-upgrade-init'
            title={intl.formatMessage(localeMessages.title)}
            visiableTitle={true}
            cancelable={true}
            showClose={true}
            onRequestClose={onCancel}
            className={styles.modal}
        >
            {(dtype == 'mpython' || dtype == 'maixduino' || dtype == 'powering') && normalUpgradeView}

            <div className={styles.notice}>
                <div>
                    {intl.formatMessage(localeMessages.notice1)}
                </div>
                <div>
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
)(PythonUpgrade));