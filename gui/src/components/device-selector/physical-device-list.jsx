import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import styles from './physical-device-list.css';
import { FormattedMessage,defineMessages, intlShape, injectIntl } from 'react-intl';



let messages = defineMessages({
    featuredText: {
        defaultMessage: 'Added',
        description: '',
        id: 'gui.device.featuredText'
    }
});

const PhysicalDeviceListComponent = (props) => {

    const {
        intl,
        devices,
        onSelect,
    } = props;

    return (
        <Box className={styles.physicalDeviceListWrapper}>
            {devices.map((device, index) => {
                return (
                    <Box key={index}
                        className={classNames(styles.physicalDeviceItem)}
                        onClick={() => onSelect(device, index)}
                    >
                        {device.featured && <div className={styles.hasSelected}>
                        { intl.formatMessage(messages.featuredText)}
                        </div>}
                        <div className={styles.imgContainer}>
                            <img className={styles.physicalDeviceIcon} src={device.iconURL} />
                        </div>
                        <div className={styles.deviceName}>
                            <span className={styles.deviceNameText}>
                                {device.name}
                            </span>
                        </div>
                    </Box>
                );
            })}
        </Box>
    )
}

PhysicalDeviceListComponent.propTypes = {
    onSelect: PropTypes.func,
    devices: PropTypes.array,
};

export default   injectIntl(PhysicalDeviceListComponent);
