import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import styles from './blocks.css';

import classNames from 'classnames';

const BlocksComponent = props => {

    const {
        isVisible,
        componentRef,
        ...componentProps
    } = props;

    return (
        <Box
            className={classNames(
                styles.blocks,
                {
                    [styles.blocksInvisible]: !isVisible
                }
            )}
            componentRef={componentRef}
            {...componentProps}
        />
    );
};
BlocksComponent.propTypes = {
    componentRef: PropTypes.func
};
export default BlocksComponent;
