import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import stopAllIcon from './icon--stop-all.svg';
import styles from './stop-all.css';

const StopAllComponent = function (props) {
    const {
        active,
        className,
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <span className={styles.flagContainer} onClick={onClick}>
            <img
                className={classNames(
                    className,
                    styles.stopAll,
                    {
                        [styles.isActive]: active
                    }
                )}
                draggable={false}
                src={stopAllIcon}
                {...componentProps}
            />
            <span style={{ marginTop: '0.1rem' }}>{title}</span>
        </span>
    );
};

StopAllComponent.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};

StopAllComponent.defaultProps = {
    active: false,
    title: 'Stop'
};

export default StopAllComponent;
