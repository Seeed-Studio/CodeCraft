import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './input-label.css';

const InputLabel = props => {
    const { small, label, ...componentProps } = props;
    return (
        <div className={classNames(
                styles.inputPane,
                props.inputwrapclassname
            )}>
            <input
                {...componentProps}
                className={classNames(
                    styles.inputForm,
                    props.className,
                    {
                        [styles.inputSmall]: small
                    }
                )}
            />
            <span className={classNames(
                styles.inputLabel,
                props.inputlabelclassname
            )
            }>{label}</span>
        </div>
    );
};

InputLabel.propTypes = {
    className: PropTypes.string,
    small: PropTypes.bool
};

InputLabel.defaultProps = {
    small: false
};

export default InputLabel;
