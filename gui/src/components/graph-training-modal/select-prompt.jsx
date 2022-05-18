import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';
import Button from '../button-special/button.jsx';
import Modal from '../../containers/modal.jsx';
import Select from '../select/select.jsx'

import styles from './select-prompt.css';

class SelectPrompt extends React.Component {
    constructor(props) {
        super(props);

        bindAll(this, [
            'handleChange',
        ]);

        this.list = [
            {
                value:3,
                label:'3'
            },
            {
                value:4,
                label:'4'
            },
            {
                value:5,
                label:'5'
            },
            {
                value:6,
                label:'6'
            },
            {
                value:7,
                label:'7'
            },
            {
                value:8,
                label:'8'
            },
            {
                value:9,
                label:'9'
            },
            {
                value:10,
                label:'10'
            },
        ]

        this.state = {
            showlabel:{
                value:3,
                label:'3'
            }
        }
    }

    handleChange(item) {
        this.setState({
            showlabel: item
        })
    }

    render() {
        
        const {
            id,
            showClose,
            onClose,
            onCancel,
            onOk,
            label,
            message,
            okLabel,
            cancelLabel
        } = this.props;

        const {showlabel} = this.state;

        return (
            <Modal
                id={id}
                showClose={showClose === false ? showClose : true}
                contentLabel={''}
                className={styles.modalContent}
                onRequestClose={onClose ? onClose : onCancel}
            >
                <Box className={styles.body}>
                    <Box className={classNames(styles.headerWrapper, styles.label)}>
                        {label}
                    </Box>
                    <Box className={styles.message}>
                        {message}
                    </Box>
                    <Select
                        className={styles.select}
                        selectListStyles={styles.selectList}
                        onChange={this.handleChange}
                        label={showlabel.label}
                        list={this.list}
                        disabled={false}
                    />
                    <Box className={styles.buttonRow}>
                        <Button
                            type={'default'}
                            size={'small'}
                            className={styles.buttonCancel}
                            onClick={onCancel}
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            type={'primary'}
                            size={'small'}
                            className={styles.buttonOk}
                            onClick={()=>{onOk(showlabel)} }
                        >
                            {okLabel}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

SelectPrompt.propTypes = {
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
};

export default SelectPrompt;



