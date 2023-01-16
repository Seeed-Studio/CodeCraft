import { defineMessages, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button-special/button.jsx';
import Modal from '../../containers/modal.jsx';
import iconFail  from './icon-fail.png';
import styles from './error.css';

const ErrorComponent = props => (

    <Modal
        id={props.id}
        contentLabel={props.title}
        className={styles.modalContent}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={ classNames(styles.headerWrapper, styles.label)}>
                {props.label}
            </Box>
            <Box className={styles.imageWrapper}>
                <img src={iconFail} />
            </Box>
            <Box className={classNames(styles.promptMessageWrapper, styles.message)}>
                {props.prompt}
            </Box>
            <Box className={styles.buttonRow}>
                <Button
                    type='default'
                    size={'small'}
                    onClick={props.onConfirm}
                >
                    {props.confirmLabel}
                </Button>
            </Box>
        </Box>
    </Modal>
);

ErrorComponent.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string,
    okLabel: PropTypes.string
};

export default ErrorComponent;
