import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './about.css';
import iconLogo from './icon-logo.png';

import { getPackageConfig } from '../../lib/package-config.js';

const id = "8934447313241";
const label = "about";

const AboutComponent = (props) => {

    const aboutLabel = (
        <FormattedMessage
            defaultMessage="About"
            description=""
            id="gui.about.label"
        />
    );

    const verprefix = (
        <FormattedMessage
            defaultMessage="Version：v"
            description=""
            id="gui.about.verprefix"
        />
    );

    const aboutDescription = (
        <FormattedMessage
            defaultMessage="©2020 TinkerGen.com"
            description=""
            id="gui.about.description"
        />
    );

    return (
        <Modal
            id={id}
            title={aboutLabel}
            visiableTitle={true}
            showClose={true}
            contentLabel={label}
            className={styles.modalContent}
            onRequestClose={props.onCancel}
        >
            <Box className={styles.body}>
                <Box className={styles.imageWrapper}>
                    <img src={iconLogo} />
                </Box>
                <Box className={styles.softInfoWrapper}>
                    <h5>{verprefix}{getPackageConfig().channelVersion}</h5>
                    <div>{aboutDescription}</div>
                </Box>
            </Box>
        </Modal>
    );
}

AboutComponent.propTypes = {
    onCancel: PropTypes.func,
};

export default injectIntl(AboutComponent);
