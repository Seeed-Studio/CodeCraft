import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import ModalComponent from '../../containers/modal.jsx';
import ButtonComponent from '../button-special/button.jsx';

import styles from './webgl-modal.css';

const WebGlModal = ({ intl, ...props }) => (
    <ModalComponent
        // isOpen
        // className={styles.modalContent}
        // contentLabel={intl.formatMessage({...messages.label})}
        // overlayClassName={styles.modalOverlay}
        // onRequestClose={props.onBack}
        isOpen={true}
        className={styles.webGlModal}
        onRequestClose={props.onBack}
        id='webglModal'
        contentLabel='webglModal'
    >
        <div dir={props.isRtl ? 'rtl' : 'ltr'}>
            <div className={styles.wrongPicContainer}>
                <img src={require('./pic_wrong.png')} className={styles.wrongPic} alt=""/>
            </div>

            <Box className={styles.body}>
                <div className={styles.label}>
                    <FormattedMessage
                        defaultMessage="Your Browser Does Not Support WebGL"
                        description="WebGL missing title"
                        id="gui.webglModal.label"
                    />
                </div>
                <p className={styles.message}>
                    { /* eslint-disable max-len */}
                    <FormattedMessage
                        defaultMessage="We are so sorry, but it looks like Scratch has crashed. This bug has been automatically reported to the Scratch Team. Please refresh your page to try again."
                        description="WebGL missing message"
                        id="gui.webglModal.description"
                    />
                    { /* eslint-enable max-len */}
                </p>

                <Box className={styles.buttonRow}>
                    <ButtonComponent
                        className={styles.backButton}
                        onClick={props.onBack}
                    >
                        <FormattedMessage
                            defaultMessage="back"
                            description="Label for button go back when browser is unsupported"
                            id="gui.webglModal.back"
                        />
                    </ButtonComponent>

                </Box>
                <div className={styles.faqLinkText}>
                    <FormattedMessage
                        defaultMessage="To learn more, go to the {previewFaqLink}."
                        description="Scratch 3.0 FAQ description"
                        id="gui.webglModal.previewfaq"
                        values={{
                            previewFaqLink: (
                                <a
                                    className={styles.faqLink}
                                    href="//scratch.mit.edu/3faq"
                                >
                                    <FormattedMessage
                                        defaultMessage="FAQ"
                                        description="link to Scratch 3.0 FAQ page"
                                        id="gui.webglModal.previewfaqlinktext"
                                    />
                                </a>
                            )
                        }}
                    />
                </div>
            </Box>
        </div>
    </ModalComponent>
);

WebGlModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onBack: PropTypes.func.isRequired
};

export default injectIntl(WebGlModal);
