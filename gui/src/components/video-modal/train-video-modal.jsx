import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';

import classNames from 'classnames';
import styles from './train-video-modal.css';
import iconClose from './image/icon_close.png'
import iconMinimize from './image/icon_minimize.png'
import iconMaximize from './image/icon_maximize.png'
import AudioCanvas from './audio-canvas'
import { getUserMedia } from './media'
import { defineMessages,injectIntl } from 'react-intl';

import {
    closeTrainVideoModal,
} from '../../reducers/modals';

import {
    setClassificationList
} from '../../reducers/train-mode';

const localMessages = defineMessages({
    recognitionWindow: {
        defaultMessage: 'Recognition Window',
        description: 'recognitionWindow',
        id: 'gui.trainModal.recognitionWindow'
    },
    notSupportMediaDevices: {
        defaultMessage: 'Your browser does not support access to your media devices',
        description: 'notSupportMediaDevices',
        id: 'gui.trainModal.notSupportMediaDevices'
    },
});


class TrainVideoModal extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
            'handleClose',
            'handleMinimize',
            'predictResult',
            'handleMouseDown',
            'handleMouseUp',
            'restoreWorkspaceRepredictCallback',
        ]);

        this.video;
        this.videoStreamTrack;
        this.audioStreamTrack;

        let classificationList = props.classificationList.map(obj => Object.assign({}, obj));

        this.state = {
            classificationList,
            predictionID: 0,
            minimizeState:false,    //最小化  Minimize
        }

        this.modelDiv;
        this.moving = false;    //拖动状态  If moving
        this.isDestroy = false; //页面是否被销毁  If the page is destroied
        //x最大left  Max left for x
        this.maxLeft;
        //x最小left  Min left for x
        this.minLeft=0;
        //y最大top  Max top for y
        this.maxTop;
        //y最小top  Min top for y
        this.minTop=45.5;

        this.recognitionWindow = props.intl.formatMessage(localMessages.recognitionWindow);
        this.notSupportMediaDevices = props.intl.formatMessage(localMessages.notSupportMediaDevices);

        //作品打开的时候，可能会有保存的模型数据，需要重新训练
        // Retrain if there is saved model data while opening the workspace
        props.vm.runtime.trainMode.setRestoreWorkspaceRepredictCallback(this.restoreWorkspaceRepredictCallback)

    }

    componentDidMount() {
        this.modelDiv = document.getElementById('train-modal');
    }

    componentWillUnmount() {
        this.isDestroy = true;
        this.handleClose();
    }

    componentWillReceiveProps(nextProps) {
        this.setClassificationListFromProps(nextProps);
    }

    restoreWorkspaceRepredictCallback() {
        this.setClassificationListFromProps(this.props);
        this.classifyVideo();
    }

    setClassificationListFromProps(props) {
        let classificationList = props.classificationList.map(obj => Object.assign({}, obj));
        this.setState({
            classificationList
        })
    }

    componentDidUpdate(prevProps) {
        //状态变了说明页面关闭状态变化了  State changed means the hidden state will change
        if(this.props.hidden!=prevProps.hidden){
            if(!this.props.hidden) {
                //判断是否支持多媒体  Check if media is supported
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    // alert(this.notSupportMediaDevices);
                    return;
                }
                //摄像头数量  Number of camera
                let videoNum = 0;
                //麦克风数量  Number of microphone
                let microphoneNum = 0;
                navigator.mediaDevices.enumerateDevices().then(devices => {
                    //遍历设备列表  Iterate device list
                    devices.forEach(device => {
                        if (device.kind === "videoinput") videoNum++;
                        if (device.kind === "audioinput") microphoneNum++;
                    });
                    console.log("摄像头[" + videoNum + "]个")
                    console.log("麦克风[" + microphoneNum + "]个")
                    this.initMedia(videoNum>0,microphoneNum>0);
                    
                }).catch(function (err) {
                    // alert(this.notSupportMediaDevices);
                });
            }
        }
    }

    async initMedia(hasWebcam,hasMicrophone) {
        if(!hasWebcam && !hasMicrophone){
            // alert(this.notSupportMediaDevices);
            return;     
        }

        this.video = document.getElementById('trainVideo');
        let constraints = { };
        //有视频  Has webcam
        if(hasWebcam){
            if (hasMicrophone) {
                //如果有麦克风，那就加上音频  Add audio if there is a microphone
                constraints = {
                    audio: true,
                    video: { width: 260, height: 226 },
                };
            }else {
                constraints = {
                    video: { width: 260, height: 226 },
                };
            }
        }else {//没有视频，那肯定有音频  No webcam means there will be audio
            constraints = {
                audio: true,
            };
        }
        
        const stream = await getUserMedia(constraints)
        if(stream){
            if(hasWebcam){
                this.videoStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
                this.video.srcObject = stream;
                this.video.play();
                this.classifyVideo();
            }
            //有麦克风  Has microphone
            if(hasMicrophone){
                let index = 1;
                if(!hasWebcam){
                    index = 0;
                }
                this.audioStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[index];
                setTimeout(() => {
                    this.refs.audioCanvas.startAudioAnalyser(stream)
                }, 4000);
            }
        }
    }

    handleClose() {
        this.videoStreamTrack && this.videoStreamTrack.stop();
        this.audioStreamTrack && this.audioStreamTrack.stop();
        this.refs.audioCanvas.stopAudioAnalyser();
        this.props.closeTrainVideoModalState();
        const {
            classificationList
        } = this.state;
        //预测结果更新到redux  Update the classified result to redux
        this.props.setClassificationList(classificationList);
    }

    handleMinimize() {
        const {
            minimizeState,
        } = this.state;
        this.setState({
            minimizeState: !minimizeState
        })
    }

    handleMouseDown(e) {
        // e.stopPropagation();
        this.moving = true;
        //浏览器尺寸  Size of the browser
        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        //本model尺寸与初始位置  The size and offset of model
        let width = this.modelDiv.offsetWidth;
        let height = this.modelDiv.offsetHeight;

        this.maxLeft = clientWidth-width;
        this.maxTop = clientHeight-height;

        this.addx = e.clientX - this.modelDiv.offsetLeft;
        this.addy = e.clientY - this.modelDiv.offsetTop;

        this.modelDiv.style.cursor = "move";

        document.onmousemove = (e) => {
            if (this.moving) {
                let left = e.clientX - this.addx;
                let top = e.clientY - this.addy;
                if(left<this.minLeft){
                    left=this.minLeft
                }
                if(left>this.maxLeft){
                    left=this.maxLeft;
                }
                if(top<this.minTop){
                    top=this.minTop
                }
                if(top>this.maxTop){
                    top=this.maxTop;
                }
    
                this.modelDiv.style.left = left + "px";
                this.modelDiv.style.top = top + "px";
            }
        };

        document.onmouseup = () => {
            this.stopMove();
        }
    }

    handleMouseUp(e) {
        this.stopMove();
    }

    stopMove(){
        this.moving = false;
        this.modelDiv.style.cursor = "default";
        document.onmousemove = null;
    }

    // Get a prediction for the current video frame
    classifyVideo() {
        if(this.props.hidden || this.isDestroy)
            return;
        if(this.props.classifier&&this.videoStreamTrack) {
            this.props.classifier.classify(this.video, this.predictResult);
        }
    }

    // When we get a result
    predictResult(err, results) {
        // The results are in an array ordered by confidence.
        console.log('predictResult:',results)
        if (results) {
            let v = results[0].label;

            const {
                classificationList,
            } = this.state;

            results.map((item, i) => {
                let label = item.label;
                let confidence = item.confidence;
                let classification = classificationList[label];
                classification.confidence = Number(confidence.toFixed(4));
                //如果没有图片则为可信度设为0  Confidence is 0 if no image
                if(classification.imageList.length==0){
                    classification.confidence=0;
                }
            })

            this.setState({
                predictionID: v,
                classificationList
            })
            //预测结果更新到vm  Update the classified result to vm
            this.props.vm.runtime.trainMode.setClassificationList(classificationList);
            this.props.vm.runtime.trainMode.setPredictionID(v);

            setTimeout(() => {
                if(!this.props.hidden && !this.isDestroy) {
                    this.classifyVideo();
                }
            }, 1000);
        }
    }

    render() {
        const {
            hidden,
        } = this.props;

        const {
            predictionID,
            minimizeState,
            classificationList
        } = this.state;

        let classification = classificationList[predictionID];
        //如果在预测的过程中，重新训练模型，可能predictionID越界，那就默认第一个，预测正常后会刷回来
        // PredictionID may go out of bound if retrain model during predicting, set it to 0 and restore after predict succeed.
        if(classification==null){
            classification = classificationList[0];
        }

        let confidence = classification.confidence;
        if(classification==null){
            confidence=0;
        }
        let hundredConfidence = (confidence*100).toFixed(2);

        return (
            <div id={'train-modal'} className={styles.modal} 
                style={{display:hidden?"none":"block",height:minimizeState?'56px':'388px'
            }}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            >   
                <div className={styles.top} style={{borderRadius:minimizeState?'10px':'10px 10px 0 0'}}>
                    <div className={styles.title}>{this.recognitionWindow}</div>
                    <div className={styles.topRight}>
                        <div className={styles.itemBtn} onClick={this.handleMinimize}>
                            <img className={styles.minimizeIcon} src={minimizeState?iconMaximize:iconMinimize}></img>
                        </div>
                        <div className={styles.itemBtn} onClick={this.handleClose}>
                            <img className={styles.closeIcon} src={iconClose}></img>
                        </div>
                    </div>
                </div>
                <div className={styles.body} style={{display:minimizeState?"none":"block"}}>
                    <div className={styles.cameraContainer}>
                        <video id="trainVideo" 
                            className={styles.camera} 
                            width='260' 
                            height='226' 
                            muted="true"
                        >    
                        </video>
                    </div>
                    <AudioCanvas
                        id={'trainVideoCanvas'}
                        className={styles.audioContainer}
                        backgroundColor="#2D3D55"
                        strokeColor="#51DDD4"
                        width={260}
                        height={48}
                        ref='audioCanvas'
                    >
                    </AudioCanvas>
                    <div className={styles.progress}>
                        <div className={classNames(styles.blue, confidence == 1 && styles.allBorderRadius)} style={{ width: confidence * 100 + '%' }}></div>
                        <div className={classNames(styles.gray, confidence == 0 && styles.allBorderRadius)} style={{ width: (1 - confidence) * 100 + '%' }}></div>
                        <span className={styles.confidence}> {classification.name}（{hundredConfidence}%）</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classifier: state.scratchGui.trainMode.classifier,
    classificationList: state.scratchGui.trainMode.classificationList,
});

const mapDispatchToProps = dispatch => ({
    closeTrainVideoModalState: () => {
        dispatch(closeTrainVideoModal());
    },
    setClassificationList: (classificationList) => {
        dispatch(setClassificationList(classificationList));
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(TrainVideoModal));
