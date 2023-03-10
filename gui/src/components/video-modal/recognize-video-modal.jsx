import React from 'react';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './recognize-video-modal.css';
import iconClose from './image/icon_close.png'
import iconMinimize from './image/icon_minimize.png'
import iconMaximize from './image/icon_maximize.png'
import AudioCanvas from './audio-canvas'
import { getUserMedia } from './media'
import { defineMessages,injectIntl } from 'react-intl';
import {
    closeRecognizeVideoModal,
} from '../../reducers/modals';

const detection_options = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minConfidence: 0.5,
    Mobilenetv1Model: 'https://ide.tinkergen.com/ai_library/face-api/ssd_mobilenetv1_model-weights_manifest.json',
    FaceLandmarkModel: 'https://ide.tinkergen.com/ai_library/face-api/face_landmark_68_model-weights_manifest.json',
    FaceLandmark68TinyNet: 'https://ide.tinkergen.com/ai_library/face-api/face_landmark_68_tiny_model-weights_manifest.json',
    FaceRecognitionModel: 'https://ide.tinkergen.com/ai_library/face-api/face_recognition_model-weights_manifest.json',
    FaceExpressionModel: 'https://ide.tinkergen.com/ai_library/face-api/face_expression_model-weights_manifest.json',
    AgeAndGenderModel: 'https://ide.tinkergen.com/ai_library/face-api/age_gender_model-weights_manifest.json',


    // Mobilenetv1Model: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json',
    // FaceLandmarkModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_model-weights_manifest.json',
    // FaceLandmark68TinyNet: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json',
    // FaceRecognitionModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_recognition_model-weights_manifest.json',
    // FaceExpressionModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_expression_model-weights_manifest.json',
    // AgeAndGenderModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/age_gender_model-weights_manifest.json',
      
}

const options = { probabilityThreshold: 0 };

const modelJson = 'https://ide.tinkergen.com/ai_library/speech-commands/model.json';

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
    modelLoadingPrompt: {
        defaultMessage: 'Model loading......',
        description: 'modelLoading',
        id: 'gui.trainModal.modelLoading'
    },
});

class RecognizeVideoModal extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
            'handleClose',
            'handleMinimize',
            'recognizeResult',
            'gotSoundResult',
            'handleMouseDown',
            'handleMouseUp',
        ]);

        this.video;
        this.videoStreamTrack;
        this.audioStreamTrack;
        this.state = {
            minimizeState:false,    //?????????  Minimize
            modelLoading: true,
            soundModelLoading: false
        }

        this.faceapi;       //????????????  Face model
        this.classifier;    //????????????  Voice model
        this.ctx;           //???????????????  Canvas context

        this.modelDiv;
        this.moving = false;        //????????????  If moving
        this.isDestroy = false;     //?????????????????????  If the page been destroied

        //x??????left  Max left for x
        this.maxLeft;
        //x??????left  Min left for x
        this.minLeft=0;
        //y??????top  Max top for y
        this.maxTop;
        //y??????top  Min top for y
        this.minTop=45.5;

        this.recognitionWindow = props.intl.formatMessage(localMessages.recognitionWindow);
        this.notSupportMediaDevices = props.intl.formatMessage(localMessages.notSupportMediaDevices);
        this.modelLoadingPrompt = props.intl.formatMessage(localMessages.modelLoadingPrompt);
    }

    componentDidMount() {
        //??????????????????GPU?????????GPU  Ban GPU if the current machine does not have one
        ml5.tf.ENV.set('WEBGL_PACK', false);
        this.modelDiv = document.getElementById('recognize-modal');
    }

    componentWillUnmount() {
        this.isDestroy = true;
        this.handleClose();
    }

    componentDidUpdate(prevProps) {
        //?????????????????????????????????????????????  State changed means the hidden state will change
        if (this.props.hidden != prevProps.hidden) {
            if (!this.props.hidden) {
                //???????????????????????????  Check if media is supported
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    this.setState({
                        modelLoading: false,
                        soundModelLoading: false
                    })
                    // alert(this.notSupportMediaDevices);
                    return;
                }
                //???????????????  Number of camera
                let videoNum = 0;
                //???????????????  Number of microphone
                let microphoneNum = 0;
                navigator.mediaDevices.enumerateDevices().then(devices => {
                    //??????????????????  Iterate device list
                    devices.forEach(device => {
                        if (device.kind === "videoinput") videoNum++;
                        if (device.kind === "audioinput") microphoneNum++;
                    });
                    console.log("?????????[" + videoNum + "]???")
                    console.log("?????????[" + microphoneNum + "]???")
                    this.initMedia(videoNum>0,microphoneNum>0);
                    
                }).catch(function (err) {
                    this.setState({
                        modelLoading: false,
                        soundModelLoading: false
                    })
                    // alert(this.notSupportMediaDevices);
                });
            }
        }
    }

    async initMedia(hasWebcam,hasMicrophone) {
        if(!hasWebcam && !hasMicrophone){
            this.setState({
                modelLoading: false,
                soundModelLoading: false
            })
            // alert(this.notSupportMediaDevices);
            return;     
        }

        this.video = document.getElementById('recognizeVideo');
        let constraints = { };
        //?????????  Has webcam
        if(hasWebcam){
            if (hasMicrophone) {
                //???????????????????????????????????????  Add audio if there is a microphone
                constraints = {
                    audio: true,
                    video: { width: 260, height: 226 },
                };
            }else {
                constraints = {
                    video: { width: 260, height: 226 },
                };
            }
        }else {//?????????????????????????????????  No webcam means there will be audio
            constraints = {
                audio: true,
            };
        }

        const stream = await getUserMedia(constraints)
        if (stream) {
            if(hasWebcam){
                this.videoStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
                this.video.srcObject = stream;
                this.video.play();
                await this.loadFaceModel();
            }
            //????????????  Has microphone
            if(hasMicrophone){
                let index = 1;
                if(!hasWebcam){
                    index = 0;
                }
                this.audioStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[index];
                setTimeout(() => {
                    this.refs.audioCanvas.startAudioAnalyser(stream)
                }, 4000);
                
                await this.loadSoundModel();
            }
            
        }
        this.setState({
            modelLoading: false,
            soundModelLoading: false
        })
    }

    async loadFaceModel(){
        //?????????faceapi  Initialize faceapi
        if (this.faceapi == null) {
            try {
                this.faceapi = await ml5.faceApi(this.video, detection_options)
                console.log('??????????????????????????????!')
            } catch (error) {
                console.log('??????????????????????????????')
            }
             
        } 
        if(this.videoStreamTrack){
            if(this.faceapi) {
                this.faceapi.detectSingle(this.recognizeResult)
            }
        }
    }

    //????????????????????????????????????
    modelReady() {
        
    }

    async loadSoundModel(){
        if (this.classifier == null) {
            try {
                this.classifier = await ml5.soundClassifier(modelJson, options, this.modelReady);
                console.log('??????????????????????????????!')
            } catch (error) {
                console.log('??????????????????????????????')
            }
            
        }
        if(this.audioStreamTrack){
            if(this.classifier){
                this.classifier.classify(1,this.gotSoundResult); 
            }
        }
    }

    drawBox(detection) {
        const alignedRect = detection.alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight = alignedRect._box._height

        this.ctx.beginPath();
        this.ctx.rect(x, y, boxWidth, boxHeight);
        this.ctx.strokeStyle = "#a15ffb";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawLandmarks(detection) {
        let parts = detection.parts;
        const mouth = parts.mouth;
        const nose = parts.nose;
        const leftEye = parts.leftEye;
        const rightEye = parts.rightEye;
        const rightEyeBrow = parts.rightEyeBrow;
        const leftEyeBrow = parts.leftEyeBrow;

        this.drawPart(mouth, true);
        this.drawPart(nose, false);
        this.drawPart(leftEye, true);
        this.drawPart(leftEyeBrow, false);
        this.drawPart(rightEye, true);
        this.drawPart(rightEyeBrow, false);
    }

    drawPart(feature, closed) {
        this.ctx.beginPath();
        for (let i = 0; i < feature.length; i++) {
            const x = feature[i]._x;
            const y = feature[i]._y;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        if (closed === true) {
            this.ctx.closePath();
        }
        this.ctx.stroke();
    }

    gotSoundResult(error, result) {
        if (error) {
            console.log(error);
            return;
        }
        // log the result
        if (result) {
            let label = result[0].label;
            let confidence = result[0].confidence;
            console.log('gotSoundResult:',label,confidence)
            if(label=='_unknown_'){
                label='unknown'
            }
            if(label=='_background_noise_'){
                label='background_noise'
            }
            if(confidence<0.9){
                label='unknown'
            }
            
            if (!this.props.hidden && !this.isDestroy) {
                this.props.vm.runtime.recognizeMode.setWord(label);
            }
        }
    }
      
    recognizeResult(err, result) {
        if (err) {
            console.log(err)
            setTimeout(() => {
                if (!this.props.hidden && !this.isDestroy && this.videoStreamTrack) {
                    if(this.faceapi) {
                        this.faceapi.detectSingle(this.recognizeResult)
                    }
                }
            }, 1000)
            return
        }
        console.log('recognizeResult',result)
        if (result) {
            const { age, parts, expressions } = result
            let max = 0, expressionsName = '';
            Object.keys(expressions).map(item => {
                if (expressions[item] > max) {
                    max = expressions[item]
                    expressionsName = item;
                }
            })

            this.props.vm.runtime.recognizeMode.setAge(Math.floor(age));
            this.props.vm.runtime.recognizeMode.setExpression(expressionsName);
            this.props.vm.runtime.recognizeMode.setParts(parts);
        }

        setTimeout(() => {
            if (!this.props.hidden && !this.isDestroy && this.videoStreamTrack) {
                if(this.faceapi) {
                    this.faceapi.detectSingle(this.recognizeResult)
                }
            }
        }, 1000)
        
    }

    handleClose() {
        this.videoStreamTrack && this.videoStreamTrack.stop();
        this.audioStreamTrack && this.audioStreamTrack.stop();
        this.refs.audioCanvas.stopAudioAnalyser();
        this.props.closeRecognizeVideoModalState();
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
        //???????????????  Size of the browser
        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        //???model?????????????????????  The size and offset of model
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

    render() {
        const {
            hidden,
        } = this.props;

        const {
            minimizeState,
            modelLoading,
            soundModelLoading
        } = this.state;

        return (
            <div id={'recognize-modal'} className={styles.modal} 
                style={{display:hidden?"none":"block",height:minimizeState?'56px':'350px'
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
                        <video id="recognizeVideo" 
                            className={styles.camera} 
                            width='260' 
                            height='226'
                            muted="true"
                        >
                        </video>
                        {/* <canvas id="overlay" className={styles.overlay}/> */}
                    </div>
                    <AudioCanvas
                        id={'recognizeVideoCanvas'}
                        className={styles.audioContainer}
                        backgroundColor="#2D3D55"
                        strokeColor="#51DDD4"
                        width={260}
                        height={48}
                        ref='audioCanvas'
                    >
                    </AudioCanvas>
                </div>
                {
                    (modelLoading||soundModelLoading) ? (
                        <div className = {styles.loading}>
                            <div className = {styles.tip}>
                                {this.modelLoadingPrompt}
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    closeRecognizeVideoModalState: () => {
        dispatch(closeRecognizeVideoModal());
    },

});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(RecognizeVideoModal));
