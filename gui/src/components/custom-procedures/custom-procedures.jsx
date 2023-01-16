import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';

import booleanInputIcon from './icon--boolean-input.svg';
import textInputIcon from './icon--text-input.svg';
import labelIcon from './icon--label.svg';

import styles from './custom-procedures.css';
import ButtonComponent from '../button-special/button.jsx';

const messages = defineMessages({
    myblockModalTitle: {
        defaultMessage: 'Make a Block',
        description: 'Title for the modal where you create a custom block.',
        id: 'gui.customProcedures.myblockModalTitle'
    }
});

const CustomProcedures = props => {
    return (
        <Modal
            className={styles.modalContent}
            contentLabel={props.intl.formatMessage(messages.myblockModalTitle)}
            onRequestClose={props.onCancel}
            overlayClassName={styles.overlayClassName}
            id={'myblockModal'}
            visiableTitle={true}
            showClose={true}
            title={props.intl.formatMessage(messages.myblockModalTitle)}
        >
            <Box
                className={styles.workspace}
                componentRef={props.componentRef}
            />
            <Box className={styles.body}>
                <div className={styles.optionsRow}>
                    <div
                        className={styles.optionCard}
                        role="button"
                        tabIndex="0"
                        onClick={props.onAddTextNumber}
                    >
                        <img
                            className={styles.optionIcon}
                            src={textInputIcon}
                        />
                        <div className={styles.optionTitle}>
                            <FormattedMessage
                                defaultMessage="Add an input"
                                description="Label for button to add a number/text input"
                                id="gui.customProcedures.addAnInputNumberText"
                            />
                        </div>
                        <div className={styles.optionDescription}>
                            <FormattedMessage
                                defaultMessage="number or text"
                                description="Description of the number/text input type"
                                id="gui.customProcedures.numberTextType"
                            />
                        </div>
                    </div>
                    <div
                        className={styles.optionCard}
                        role="button"
                        tabIndex="0"
                        onClick={props.onAddBoolean}
                    >
                        <img
                            className={styles.optionIcon}
                            src={booleanInputIcon}
                        />
                        <div className={styles.optionTitle}>
                            <FormattedMessage
                                defaultMessage="Add an input"
                                description="Label for button to add a boolean input"
                                id="gui.customProcedures.addAnInputBoolean"
                            />
                        </div>
                        <div className={styles.optionDescription}>
                            <FormattedMessage
                                defaultMessage="boolean"
                                description="Description of the boolean input type"
                                id="gui.customProcedures.booleanType"
                            />
                        </div>
                    </div>
                    <div
                        className={styles.optionCard}
                        role="button"
                        tabIndex="0"
                        onClick={props.onAddLabel}
                    >
                        <img
                            className={styles.optionIcon}
                            src={labelIcon}
                        />
                        <div className={styles.optionTitle}>
                            <FormattedMessage
                                defaultMessage="Add a label"
                                description="Label for button to add a label"
                                id="gui.customProcedures.addALabel"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.checkboxRow}>
                    <label>
                        <input
                            checked={props.warp}
                            type="checkbox"
                            onChange={props.onToggleWarp}
                        />
                        <FormattedMessage
                            defaultMessage="Run without screen refresh"
                            description="Label for checkbox to run without screen refresh"
                            id="gui.customProcedures.runWithoutScreenRefresh"
                        />
                    </label>
                </div>
                <Box className={styles.buttonRow}>
                    <ButtonComponent
                        className={styles.cpButton}
                        onClick={props.onCancel}
                        type={"default"}
                        size={'small'}
                        style={{marginRight: '1rem'}}
                    >
                        <FormattedMessage
                            defaultMessage="Cancel"
                            description="Label for button to cancel custom procedure edits"
                            id="gui.customProcedures.cancel"
                        />
                    </ButtonComponent>
                    <ButtonComponent
                        className={styles.cpButton}
                        onClick={props.onOk}
                        size={'small'}
                    >
                        <FormattedMessage
                            defaultMessage="OK"
                            description="Label for button to save new custom procedure"
                            id="gui.customProcedures.ok"
                        />
                    </ButtonComponent>
                </Box>
            </Box>
        </Modal>
    )
};

CustomProcedures.propTypes = {
    componentRef: PropTypes.func.isRequired,
    intl: intlShape,
    onAddBoolean: PropTypes.func.isRequired,
    onAddLabel: PropTypes.func.isRequired,
    onAddTextNumber: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onToggleWarp: PropTypes.func.isRequired,
    warp: PropTypes.bool.isRequired
};

export default injectIntl(CustomProcedures);
