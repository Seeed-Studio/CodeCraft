import React from 'react';
import styles from './video-preview.css';
import PropTypes, { func } from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl,  } from 'react-intl';

/**
 * 视频预览
 * 
 */

class VideoPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillUnmount() {
        if(this.props.onClearVod)  {
            this.props.onClearVod();
        }
    }

    render() {
        
        return (
            <video id='player-container-id' preload='auto' playsInline controls className={styles.video}>
            </video>
        )
    }

}

VideoPreview.propTypes = {
    
}

export default injectIntl(VideoPreview);