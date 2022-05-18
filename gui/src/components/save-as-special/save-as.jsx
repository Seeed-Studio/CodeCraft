import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './save-as.css';
import Box from '../box/box.jsx';
import Button from '../button-special/button.jsx';
import Modal from '../../containers/modal.jsx';
import Input from '../input-special/input.jsx';

const SaveAsModal = props => (
  <Modal
        id={'saveAsModal'}
        contentLabel={'saveAsModal'}
        className={styles.modalContent}
        // onRequestClose={props.onClose ? props.onClose : props.onCancel}
    >
        <Box className={styles.body}>
            <Box className={classNames(styles.headerWrapper, styles.label)}>
            <FormattedMessage
              defaultMessage="Save as"
              id="gui.saveAs.saveAs"
            />
            </Box>
            <Box className={styles.documentNameContainer}>
              <Box className={styles.documentName}>
                <FormattedMessage
                  defaultMessage="Project"
                  id="gui.saveAs.documentName"
                />
              </Box>
              <Box>
                <Input 
                  // placeholder={'请输入文件名称'}
                  className={styles.documentNameInput}
                  onBlur={props.onSaveAsInputBlur}
                  onChange={props.onSaveAsInputChange}
                  value={props.saveAsInputValue}
                  maxLength={50}
                />
              </Box>
            </Box>

            <Box className={styles.buttonRow}>
                <Button
                  type={'primary'}
                  size={'small'}
                  className={styles.buttonOk}
                  onClick={props.onConfirmSaveAs}
                >
                  <FormattedMessage
                    defaultMessage="OK"
                    id="gui.prompt.ok"
                  />
                </Button>
                <Button
                  type={'default'}
                  size={'small'}
                  className={styles.buttonCancel}
                  onClick={props.onCancel}
                >
                  <FormattedMessage
                    defaultMessage="Cancel"
                    id="gui.prompt.cancel"
                  />
                </Button>
            </Box>
        </Box>

    </Modal>
)

export default SaveAsModal;