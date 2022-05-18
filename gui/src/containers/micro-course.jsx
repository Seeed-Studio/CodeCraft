import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import MicroCourseComponent from '../components/micro-course/micro-course.jsx';

import { applyVodSecuritySign } from '../lib/busi-proxy/busi-proxy.js';
import player from '../lib/player/player.js';

import { setVisible, setFullscreen } from '../reducers/micro-course.js';

import { BLOCKS_TAB_INDEX } from '../reducers/editor-tab';

class MicroCourse extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'setVideoContainer',
            'onHide',
            'onShow',
            'onFullscreen',
            'handleVodSecuritySignError',
            'handleVodSecuritySignSucc',
            'onPlay',
            'onlisterners',
            'onPlayPause'
        ]);
        this.videoContainer = null;
        this.state = {
            isShow: false,
            paused: true
        }
    }

    componentDidMount() {
        if (this.props.fileId) this._loading();
    }

    componentDidUpdate(prevProps) {
        if (this.props.fileId !== prevProps.fileId) {
            this._loading();
        }
    }

    onPlayPause() {
        this.state.paused ? player.play() : player.pause();
    }

    onPlay() {
        if (!this.state.paused) return;
        player.play();
    }

    onPause() {
        if (this.state.paused) return;
        player.pause();
    }

    setVideoContainer(e) {
        this.videoContainer = e;
    }

    onHide() {
        this.props.setVisible(false);
    }

    onShow() {
        this.props.setVisible(true);
    }

    onFullscreen() {
        this.props.setFullscreen(!this.props.fullscreen);
    }

    _loading() {
        player.dispose();
        if (!this.props.fileId) return;

        applyVodSecuritySign({
            fileId: this.props.fileId,
            authInfo: this.props.authInfo
        }).then(res => {
            let { errorCode, data } = res;
            if (errorCode === 0) {
                this.handleVodSecuritySignSucc(data);
            } else {
                this.handleVodSecuritySignError(errorCode);
                player.dispose();
            }

        }).catch(
            res => {
                this.handleVodSecuritySignError();
            }
        );
    }

    handleVodSecuritySignError(errorCode) {
        player.dispose();
        this.setState({
            isShow: false
        });
    }

    handleVodSecuritySignSucc(data) {
        this.setState({
            isShow: true
        });
        this.props.setVisible(true);

        const videoElm = document.createElement('video');
        videoElm.id = 'micro-course-video';
        videoElm.style.width = '100%';
        videoElm.style.height = '100%';
        this.videoContainer.appendChild(videoElm);

        let opt = {
            fileID: this.props.fileId,
            appID: data.appID,
            t: data.t,
            us: data.us,
            sign: data.sign,
        }
        player.init(videoElm.id, opt);
        this.onlisterners();
    }

    onlisterners() {
        player.on('loadedmetadata', args => {
            this.setState({ paused: true });
            player.poster(`https://${this.props.coverUrl}`);
        });
        player.on('play', args => {
            this.setState({ paused: false });
        });
        player.on('pause', args => {
            // this.setState({ paused: true });
        });
        player.on('ended', args => {
            // this.setState({ paused: true });
        });
        player.on('error', args => {
            console.log(args);
        });

    }

    render() {
        const isBlockTab = (this.props.activeTabIndex === BLOCKS_TAB_INDEX);
        return (
            <MicroCourseComponent
                {...this.props}
                isShow={this.state.isShow}
                isBlockTab={isBlockTab}
                paused={this.state.paused}
                setVideoContainer={this.setVideoContainer}
                onHide={this.onHide}
                onShow={this.onShow}
                onFullscreen={this.onFullscreen}
                onPlay={this.onPlay}
            />
        );

    }
}

const mapStateToProps = state => ({
    authInfo: state.scratchGui.loginRegister.authInfo,
    vodSecuritySign: state.scratchGui.microCourse.vodSecuritySign,
    visible: state.scratchGui.microCourse.visible,
    fullscreen: state.scratchGui.microCourse.fullscreen,
    fileId: state.scratchGui.microCourse.fileId,
    fileName: state.scratchGui.microCourse.fileName,
    description: state.scratchGui.microCourse.description,
    coverUrl: state.scratchGui.microCourse.coverUrl,
    activeTabIndex: state.scratchGui.editorTab.activeTabIndex,
});

const mapDispatchToProps = dispatch => ({
    setVisible: v => dispatch(setVisible(v)),
    setFullscreen: v => dispatch(setFullscreen(v))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MicroCourse);


