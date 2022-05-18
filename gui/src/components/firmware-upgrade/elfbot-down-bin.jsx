import React from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import Modal from '../../containers/modal.jsx';
import Button from '../button-special/button.jsx';
import styles from './elfbot-down-bin.css'
import { connect } from 'react-redux';
import {
    setModalIndex,
    RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP1,
    RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP2,
    RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP3,
    RESCUE_MODAL_ELFBOT_UPGRADE_INIT,
    RESCUE_MODAL_ELFBOT_UPGRADING,
    RESCUE_MODAL_ELFBOT_UPGRADE_SUCC,
    RESCUE_MODAL_ELFBOT_UPGRADE_FAIL

} from '../../reducers/rescue'
const localeMessages = defineMessages({
    title: {
        id: 'gui.elfbotDownBinStep.title',
        defaultMessage: 'Update firmware'
    },
    step1Text: {
        id: 'gui.elfbotDownBinStep.step1Text',
        defaultMessage: 'The latest firmware：'
    },

    step2Text1: {
        id: 'gui.elfbotDownBinStep.step2Text1',
        defaultMessage: 'Downloading...'
    },
    step2Text2: {
        id: 'gui.elfbotDownBinStep.step2Text2',
        defaultMessage: 'Do not close Codecraft, or make any other operations.'
    },

    step3Text1: {
        id: 'gui.elfbotDownBinStep.step3Text1',
        defaultMessage: 'Download successfully'
    },
    step3Text2: {
        id: 'gui.elfbotDownBinStep.step3Text2',
        defaultMessage: 'Do not close Codecraft, or make any other operations.'
    },
    btText1: {
        id: 'gui.elfbotDownBinStep.btText1',
        defaultMessage: 'Download now'
    },
    btText2: {
        id: 'gui.elfbotDownBinStep.btText2',
        defaultMessage: 'Next'
    },

})

const ElfbotDownBin = (props) => {
    const { intl, onCancel, versionInfo, onClick, step } = props;

    const downBin = () => {
        props.setModalIndex(RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP2);
        props.rescuer.downBin().then(() => {
            console.log('aaaa');
            props.setModalIndex(RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP3);
        }).catch(() => {
            console.log('bbbb');
            props.setModalIndex(RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP1);
        })
    }

    const next = () => {
        const{
            vm,
            rescuer,
            setModalIndex
        } = props;
        if (rescuer.type == 'elfbot') {
            setModalIndex(RESCUE_MODAL_ELFBOT_UPGRADE_INIT);
        }
        else if (rescuer.type == 'mpython' ||
                 rescuer.type == 'maixduino' ||
                 rescuer.type == 'powering') {
            const upgrade = () => {
                setModalIndex(RESCUE_MODAL_ELFBOT_UPGRADING);
                const upgradeSucc = () => setModalIndex(RESCUE_MODAL_ELFBOT_UPGRADE_SUCC);
                const upgradeFail = () => setModalIndex(RESCUE_MODAL_ELFBOT_UPGRADE_FAIL);
                vm.deviceEngine.disconnect().then(() => {
                    rescuer.upgrade().then(upgradeSucc).catch(upgradeFail)
                });
            }
            upgrade();
        } else {
            setModalIndex(RESCUE_MODAL_ELFBOT_UPGRADE_INIT);
        }
    }

    const step1Componenet = () => (
        <Modal
            id='elfbot-down-bin-step1'
            contentLabel='elfbot-down-bin-step1'
            title={intl.formatMessage(localeMessages.title)}
            visiableTitle={true}
            cancelable={true}
            showClose={true}
            onRequestClose={onCancel}
            className={styles.modal}
        >
            <div className={styles.contentBox}>
                <div className={styles.content} >
                    {intl.formatMessage(localeMessages.step1Text)}{versionInfo}
                </div>
            </div>
            <div className={styles.buttonBox}>
                <Button
                    className={styles.button}
                    size={'small'}
                    onClick={onClick || downBin}
                >
                    {intl.formatMessage(localeMessages.btText1)}
                </Button>
            </div>

        </Modal>
    )

    const step2Componenet = () => (
        <Modal
            id='elfbot-down-bin-step2'
            contentLabel='elfbot-down-bin-step2'
            title={intl.formatMessage(localeMessages.title)}
            visiableTitle={true}
            cancelable={true}
            onRequestClose={onCancel}
            className={styles.modal}
        >
            <div className={styles.contentBox}>
                <div className={styles.content} >
                    <div>{intl.formatMessage(localeMessages.step2Text1)}</div>
                    {intl.formatMessage(localeMessages.step2Text2)}
                </div>
            </div>

        </Modal>
    )

    const step3Componenet = () => (
        <Modal
            id='elfbot-down-bin-step3'
            contentLabel='elfbot-down-bin-step3'
            title={intl.formatMessage(localeMessages.title)}
            visiableTitle={true}
            cancelable={true}
            showClose={true}
            onRequestClose={onCancel}
            className={styles.modal}
        >
            <div className={styles.contentBox}>
                <div className={styles.content} >
                    <div>{intl.formatMessage(localeMessages.step3Text1)}</div>
                    {intl.formatMessage(localeMessages.step3Text2)}
                </div>
            </div>
            <div className={styles.buttonBox}>
                <Button
                    className={styles.button}
                    size={'small'}
                    onClick={onClick || next}
                >
                    {intl.formatMessage(localeMessages.btText2)}
                </Button>
            </div>

        </Modal>
    )

    switch (step) {
        case 1: return step1Componenet();
        case 2: return step2Componenet();
        case 3: return step3Componenet();
    }
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
)(ElfbotDownBin));