import { defineMessages, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button-special/button.jsx';
import Modal from '../../containers/modal.jsx';

import styles from './prompt.css';

const PromptComponent = props => (

    <Modal
        id={props.id}
        showClose={props.showClose === false ? props.showClose : true}
        contentLabel={props.contentLabel}
        className={styles.modalContent}
        onRequestClose={props.onClose ? props.onClose : props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={classNames(styles.headerWrapper, styles.label)}>
                {props.label}
            </Box>
            <Box className={styles.message}>
                {props.message}
            </Box>

            <Box className={styles.buttonRow}>
                <Button
                    type={props.isDefaultLeft?'default':'primary'}
                    size={'small'}
                    className={styles.buttonCancel}
                    onClick={props.onCancel}
                >
                    {props.cancelLabel}
                </Button>
                <Button
                    type={props.isDefaultLeft?'primary':'default'}
                    size={'small'}
                    className={styles.buttonOk}
                    onClick={props.onOk}
                >
                    {props.okLabel}
                </Button>
            </Box>
        </Box>
    </Modal>
);

PromptComponent.propTypes = {
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
};

export default PromptComponent;