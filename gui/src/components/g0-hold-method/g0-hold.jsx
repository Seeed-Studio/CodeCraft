import React from 'react';
import classNames from 'classnames';
import styles from './g0-hold.css';

import Box from '../box/box.jsx';
import { defineMessages, intlShape, injectIntl } from 'react-intl';

import tipimage01 from './wrongway.png';
import tipimage02 from './rightway.png';

const messages = defineMessages({
    tipTitle: {
        defaultMessage: 'The right way to hold the Main Board. ',
        description: '',
        id: 'gui.device.g0hold.tipTitle'
    },
    tipTitleLabel: {
        defaultMessage: 'Note：',
        description: '',
        id: 'gui.device.g0hold.tipTitleLabel'
    },
    tipMessage: {
        defaultMessage: 'Using an incorrect handling method may cause the Main Board to be damaged by static electricity.',
        description: '',
        id: 'gui.device.g0hold.tipMessage'
    }
});


const G0HoldMethodComponent = (props) => {

    const { intl } = props;

    return (
        <Box className={styles.holdpageWrap}>
            <Box className={styles.tipWrapper}>
                <Box>
                    <span className={styles.tipTitleLabel}>{intl.formatMessage(messages.tipTitleLabel)}</span>
                </Box>
                <div className={styles.tipTitle}> {intl.formatMessage(messages.tipTitle)}</div>
                <div className={styles.tipMessage}> {intl.formatMessage(messages.tipMessage)}</div>
            </Box>
            <Box className={styles.tipImagePane}>
                <div><img src={tipimage01} /></div>
                <span style={{ width: "1rem" }} />
                <div><img src={tipimage02} /></div>
            </Box>
        </Box>
    );

};

G0HoldMethodComponent.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(G0HoldMethodComponent);