import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './button.css';

const ButtonComponent = ({
    className,
    disabled,
    iconClassName,
    iconSrc,
    onClick,
    children,
    style,
    type,
    size,
    ...props
}) => {
    if (disabled) {
        onClick = function () { };
    }

    const icon = iconSrc && (
        <img
            className={classNames(iconClassName, styles.icon)}
            draggable={false}
            src={iconSrc}
        />
    );

    return (
        <span
            style={style}
            className={classNames(
                styles.outlinedButton,
                (type === '' || type === undefined || type === 'primary') && styles.btnPrimary,
                type === 'default' && styles.btnDefault,
                type === 'warning' && styles.btnWarning,
                ((size === '' || size === undefined || size === 'default') ? styles.defaultSize : styles.smallSize),
                disabled && styles.btnDisabled,
                className
            )}
            role="button"
            onClick={onClick}
            {...props}
        >
            {icon}
            <div className={styles.content}>{children}</div>
        </span>
    );
};

ButtonComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconClassName: PropTypes.string,
    iconSrc: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
};

export default ButtonComponent;
