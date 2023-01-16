import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Box from '../box/box.jsx';
import styles from './upload-pane.css';

const UploadComponent = function (props) {

    const {
        children,
        className,
        onClick,
        fileAccept,
        fileChange,
        fileInput,
        id,
        onMouseEnter,
        onMouseLeave
    } = props;

    const hasFileInput = fileInput;
    
    return (
        <Box
            onClick={hasFileInput ? onClick : null}
            className={classNames(styles.uploadPane, className)}>
            <div
                className={styles.uploadContent}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {children}
            </div>
            {hasFileInput ? (
                <input
                    accept={fileAccept}
                    className={styles.fileInput}
                    ref={fileInput}
                    type="file"
                    onChange={fileChange}
                    id={id}
                />) : null}
        </Box>
    );
}

UploadComponent.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,        // Optional, "coming soon" if no callback provided
    fileAccept: PropTypes.string,   // Optional, only for file upload
    fileChange: PropTypes.func,     // Optional, only for file upload
    fileInput: PropTypes.func       // Optional, only for file upload
};

export default UploadComponent;
