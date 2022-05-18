import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import Box from '../box/box.jsx';

import styles from './micro-course.css';



const MicroCourseComponent = props => {
    const {
        setVideoContainer,
        onHide,
        onShow,
        onFullscreen,
        visible,
        fullscreen,
        fileName,
        description,
        fileId,
        isShow,
        onPlay,
        paused,
        isBlockTab
    } = props;

    return (

        <div
            className={classNames(
                fullscreen ? styles.locatingBoxFull : styles.locatingBox,
                (fileId && isShow) ? styles.show : styles.hide
            )}
            style={{zIndex: !isBlockTab ? 0 : null}}
        >

            <Box className={classNames(styles.microCourseBox, visible ? styles.show : styles.hide)} >

                <div className={classNames(styles.videoBox)} ref={setVideoContainer}>
                </div>

                <div className={classNames(styles.playBt, paused ? null : styles.playBtHide)} onClick={onPlay}></div>

                <div className={classNames(styles.fullscreenBt)} onClick={onFullscreen}>
                </div>

                <div className={classNames(styles.courseNameBox)}>
                    <p className={classNames(styles.title)}>{fileName}</p>
                    <p className={classNames(styles.des)}>{description}</p>
                </div>

                <div className={classNames(styles.hideBt)} onClick={onHide}>
                </div>

            </Box>

            {
                !visible &&
                <div className={classNames(styles.showBt)} onClick={onShow}>
                    <FormattedMessage
                        defaultMessage="Micro-Course"
                        description=""
                        id="gui.microCourse.microCourse"
                    />
                </div>
            }

        </div>
    );
}


export default MicroCourseComponent;