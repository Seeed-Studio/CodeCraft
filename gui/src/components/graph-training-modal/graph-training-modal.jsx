import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import Prompt from '../prompt-special/prompt.jsx'
import { connect } from 'react-redux';
import { FormattedMessage,defineMessages,injectIntl } from 'react-intl';

// import ReactART from 'react-art';
import 'art/modes/svg';
import SVGPath from 'art/modes/svg/path';
// const {Shape, Transform, Surface, Text,Group,Path} = ReactART;

import classNames from 'classnames';

import styles from './graph-training-modal.css';
import iconClose from './image/icon_modal_close.png'
import ImageClassification from './image-classification.jsx'
import SelectPrompt from './select-prompt.jsx'
import { getUserMedia } from '../video-modal/media'

import {
    closeTrainModal,
} from '../../reducers/modals';

import {
    setClassifier,
    setFeatureExtractor,
    setOptions,
    setClassificationList,
    setIsPredicting
} from '../../reducers/train-mode';

const localMessages = defineMessages({
    category: {
        defaultMessage: 'category',
        description: 'category',
        id: 'gui.trainModal.category'
    },
    cancel: {
        defaultMessage: 'Cancel',
        description: 'Cancel',
        id: 'gui.trainModal.cancel'
    },
    confirm: {
        defaultMessage: 'Confirm',
        description: 'Confirm',
        id: 'gui.trainModal.confirm'
    },
    title: {
        defaultMessage: 'Model Training',
        description: 'Model Training',
        id: 'gui.trainModal.title'
    },
    result: {
        defaultMessage: 'result',
        description: 'result',
        id: 'gui.trainModal.result'
    },
    newModel: {
        defaultMessage: 'New model',
        description: 'newModel',
        id: 'gui.trainModal.newModel'
    },
    usingModel: {
        defaultMessage: 'Using the model',
        description: 'usingModel',
        id: 'gui.trainModal.usingModel'
    },
    modelResourceLoading: {
        defaultMessage: 'Model resource loading......',
        description: 'loading',
        id: 'gui.trainModal.modelResourceLoading'
    },
    clearPrompt: {
        defaultMessage: 'Are you sure you want to clear the current classification of samples?',
        description: 'clearPrompt',
        id: 'gui.trainModal.clearPrompt'
    },
    newModelPrompt: {
        defaultMessage: 'New model will clear the current training data, determine new?',
        description: 'newModelPrompt',
        id: 'gui.trainModal.newModelPrompt'
    },
    modelCategoryNumber: {
        defaultMessage: 'Number of model classifications',
        description: 'modelCategoryNumber',
        id: 'gui.trainModal.modelCategoryNumber'
    },
    notSupportMediaDevices: {
        defaultMessage: 'Your browser does not support access to your media devices',
        description: 'notSupportMediaDevices',
        id: 'gui.trainModal.notSupportMediaDevices'
    },
});


// const modelJson = 'https://cctest2.chmakered.com/gd-ai/mobilenet_feature/model.json';
const modelJson = 'https://ide.tinkergen.com/ai_library/mobilenet_feature/model.json';

class GraphTrainingModal extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
            'handleClose',
            'handleTrain',
            'handleReset',
            'handleNameChange',
            'trainResult',
            'predictResult',
            'changeState',
            'handleScroll',
            'handleCreateModel',
            'handleUseModel',
            'handleClearCancel',
            'handleClearOK',
            'handleConfirmCancel',
            'handleConfirmOK',
            'handleCreateCancel',
            'handleCreateOK',
            'restoreWorkspaceRetrainCallback',
        ]);

        //语言国际化变量
        this.category = props.intl.formatMessage(localMessages.category);
        this.cancel = props.intl.formatMessage(localMessages.cancel);
        this.confirm = props.intl.formatMessage(localMessages.confirm);
        this.title = props.intl.formatMessage(localMessages.title);
        this.result = props.intl.formatMessage(localMessages.result);
        this.newModel = props.intl.formatMessage(localMessages.newModel);
        this.modelResourceLoading = props.intl.formatMessage(localMessages.modelResourceLoading);
        this.usingModel = props.intl.formatMessage(localMessages.usingModel);
        this.clearPrompt = props.intl.formatMessage(localMessages.clearPrompt);
        this.newModelPrompt = props.intl.formatMessage(localMessages.newModelPrompt);
        this.modelCategoryNumber = props.intl.formatMessage(localMessages.modelCategoryNumber);
        this.notSupportMediaDevices = props.intl.formatMessage(localMessages.notSupportMediaDevices);

        //视频dom
        this.video;
        //媒体流
        this.mediaStreamTrack;
        //摄像头画布
        this.canvas;
        //重置状态
        this.resetting = false;

        //分类模型对象
        this.featureExtractor = props.featureExtractor;
        this.classifier = props.classifier;

        //模型参数
        this.options = props.options;

        //退出去保存的状态，切换语言会清空状态，从reduce里面取
        this.isPredicting = props.isPredicting;//是否正在预测
        //如果还没保存过模型，则不需要开始预测
        if(this.classifier == null || this.featureExtractor == null){
            this.isPredicting = false;
        }
        //redux数据
        let propsClassificationList = props.classificationList;

        let classificationList = [];
        //训练过的类别数量
        this.trainedClassificationCount = 0;
        //总共的图片数量
        let imageCount = 0;
        //类别被训练过标记
        let trainedClassification = {}

        //深拷贝一份，以免state操作的数据引用会影响redux
        for(let i=0;i<propsClassificationList.length;i++) {
            let classification = {};
            let propsclassification = propsClassificationList[i];
            if(propsclassification.name==null){
                classification.name = this.category + (i + 1);
            }else {
                classification.name = propsclassification.name;
            }
            
            classification.confidence = propsclassification.confidence;
            classification.imageList = [].concat(propsclassification.imageList);
            if(propsclassification.imageList.length>0){
                trainedClassification[i]=true;
                this.trainedClassificationCount++;
            }
            imageCount += classification.imageList.length;
            classification.isNameEdited = propsclassification.isNameEdited;
            classificationList.push(classification);
        }

        this.addedImageCount = imageCount;//已经被添加的图片数量
        this.showImageCount = imageCount;//显示的图片数量
        this.resetIndex =  -1;//重置的类别ID
        this.trainedClassification = trainedClassification;//训练过的类别标记

        this.restoreOnFinish;

        this.state = {
            classificationList,
            predictionID: 0,
            trainedClassificationCount:this.trainedClassificationCount,//训练过的类别数量
            clearVisible:false,//重置分类弹框
            confirmVisible:false,//新建模型确认弹框
            createVisible:false,//新建模型弹框
            startPointList:[],//起始坐标
            endPoint:{},//结束坐标
            modelLoading:true,//模型加载中。初始化默认加载
            restore:false,//是否从文件还原数据
            hasWebcam:false//是否有媒体流默认没有
        }
        let bakclassificationList = classificationList.map(obj => Object.assign({}, obj,{imageList:[].concat(obj.imageList)}));
        props.vm.runtime.trainMode.setClassificationList(bakclassificationList);
        //作品打开的时候，可能会有保存的模型数据，需要重新训练
        props.vm.runtime.trainMode.setRestoreWorkspaceRetrainCallback(this.restoreWorkspaceRetrainCallback)
    }

    componentDidMount() {
        //有些电脑没有GPU，禁掉GPU
        this.canvas = document.createElement("canvas");
        this.canvas.width = 220;
        this.canvas.height = 220;
        ml5.tf.ENV.set('WEBGL_PACK', false);
    }

    componentDidUpdate(prevProps) {
        //状态变了说明页面关闭状态变化了
        if(this.props.hidden!=prevProps.hidden){
            if(!this.props.hidden) {
                //判断是否支持多媒体
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    // alert(this.notSupportMediaDevices);
                    this.setState({
                        hasWebcam:false,
                        modelLoading: false,
                    })
                    return;
                }
                //摄像头数量
                let videoNum = 0;
                //麦克风数量
                let microphoneNum = 0;
                navigator.mediaDevices.enumerateDevices().then(devices => {
                    //遍历设备列表
                    devices.forEach(device => {
                        // deviceList.push(device.kind);
                        if (device.kind === "videoinput") videoNum++;
                        if (device.kind === "audioinput") microphoneNum++;
                    });
                    console.log("摄像头[" + videoNum + "]个")
                    console.log("麦克风[" + microphoneNum + "]个")
                    if(videoNum>0){
                        this.initMedia()
                    }else {
                        // alert(this.notSupportMediaDevices);
                        this.setState({
                            hasWebcam:false,
                            modelLoading: false,
                        })
                    }
                    
                }).catch(function (err) {
                    // alert(this.notSupportMediaDevices);
                    this.setState({
                        hasWebcam:false,
                        modelLoading: false,
                    })
                });
            }
        }
    }

    async initMedia() {
        this.video = document.getElementById('graphTrainVideo');
        let size = this.video.offsetWidth;
        let constraints = {
            video: { width: size, height: size },
        };
        //更新画布大小
        this.canvas.width = size * 1;
        this.canvas.height = size * 1;

        const stream = await getUserMedia(constraints)
        this.setState({
            hasWebcam:stream!=null,
        })
        if(stream){
            this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
            this.video.srcObject = stream;
            this.video.play();
            this.loadClassifier(this.video);
        }
        this.setState({
            modelLoading: false,
        })
    }

    //同步初始化classifier
    async initClassifier(video) {
        this.featureExtractor = await ml5.featureExtractor(modelJson);
        if(this.featureExtractor){
            this.classifier = await this.featureExtractor.classification(video, this.options);
        }
    }
    //加载模型
    async loadClassifier(video) {
        //为空需要初始化
        if (this.classifier == null || this.featureExtractor == null) {
            await this.initClassifier(video);
        }
        if (this.isPredicting) {
            this.classifyVideo();
        }
        this.setState({
            modelLoading: false,
        })
        this.refreshLine();
        console.log('模型加载完成!')
    }

    //添加一张图片，并且判断是最后一张添加完就开始重新训练
    async addImageForTrain(image,numberID){
        try {
            await this.classifier.addImage(image, numberID);
            //添加的是最后一张图片则开始训练
            if (this.addedImageCount + 1 == this.showImageCount) {
                //训练模型
                this.classifier.train(this.trainResult);
                this.resetting = false;
            }
            this.addedImageCount++;
        } catch (error) {
            console.log(error)
            if(this.restoreOnFinish){
                this.restoreOnFinish()
            }
        }    
    }

    //重新加载所有的图片
    async addImageList(classificationList){
        let keys = Object.keys(classificationList);
        for(let i=0;i<keys.length;i++){
            let numberID = Number(keys[i]);
            let classification = classificationList[numberID];
            let imageList = classification.imageList;
            for(let j=0;j<imageList.length;j++){
                var img = document.createElement("img");
                img.src = imageList[j];
                img.width = this.canvas.width;
                img.height = this.canvas.height;
                await this.addImageForTrain(img, numberID);
            }
        }
    }

    //重置某个类别，并重新加载其他所有的图片
    async reloadImage(id) {
        const {
            classificationList,
        } = this.state;

        let classification = classificationList[id];

        classification.imageList = [];
        classification.confidence = 0;

        //重新遍历加载图片
        let keys = Object.keys(classificationList);
        let imageCount=0;
        keys.map((id, i) => {
            let numberID = Number(id);
            let classification = classificationList[numberID];
            let imageList = classification.imageList;
            let length = imageList.length;
            if(length>0){
                if(!this.trainedClassification[numberID]){
                    this.trainedClassification[numberID]=true;
                    this.trainedClassificationCount++
                }
            }
            imageCount += imageList.length;
        })
        this.showImageCount = imageCount;
        this.addedImageCount = 0;

        await this.addImageList(classificationList);
        //更新界面
        this.setState({
            classificationList,
            trainedClassificationCount:this.trainedClassificationCount,
        })
    }

    //从作品中取出训练数据，重新加载
    async restoreWorkspaceRetrainCallback(params,onLine,onFinish){
        let options = params.options;
        let classificationList = params.classificationList;
        //空判断
        if(options!=null&&classificationList!=null){
            this.restoreOnFinish = onFinish;
            this.resetting = true;
            this.isPredicting = false;
            this.options = options;

            //更新界面
            this.setState({
                restore:true,
            })

            //先更新到vm。以免训练失败
            let bakclassificationList = classificationList.map(obj => Object.assign({}, obj, { imageList: [].concat(obj.imageList) }));
            this.props.vm.runtime.trainMode.setClassificationList(bakclassificationList);
            this.props.vm.runtime.trainMode.setOptions(options);
            this.props.vm.runtime.trainMode.setIsTrain(true);
            
            await this.initClassifier();

            this.trainedClassification = {}
            this.trainedClassificationCount = 0;
            let imageCount=0;
            //重新遍历加载图片
            let keys = Object.keys(classificationList);
            
            keys.map((id, i) => {
                let numberID = Number(id);
                let classification = classificationList[numberID];
                let imageList = classification.imageList;
                let length = imageList.length;
                if(length>0){
                    if(!this.trainedClassification[numberID]){
                        this.trainedClassification[numberID]=true;
                        this.trainedClassificationCount++
                    }
                }
                imageCount += imageList.length;
            })
            this.showImageCount = imageCount;
            this.addedImageCount = 0

            if(this.showImageCount>0){
                await this.addImageList(classificationList);
            }else{
                //没有图片直接回调结果
                if(this.restoreOnFinish){
                    this.restoreOnFinish()
                }
            }

            this.resetIndex = -1;
    
            //更新界面
            this.setState({
                classificationList,
                predictionID: 0,
                trainedClassificationCount:this.trainedClassificationCount,
                clearVisible:false,//重置分类弹框
                confirmVisible:false,//新建模型确认弹框
                createVisible:false,//新建模型弹框
                startPointList:[],//起始坐标
                endPoint:{},//结束坐标
            }, () => {
                this.refreshLine();
            })
        }
    }

    //滚动事件
    handleScroll(e) {
        this.refreshLine();
    }

    //刷新连线
    refreshLine() {
        var leftBessel=document.getElementById('leftBessel');
        var leftBesselRect = leftBessel.getBoundingClientRect();

        var rightBessel=document.getElementById('rightBessel');
        var rightBesselRect = rightBessel.getBoundingClientRect();

        var centerBody=document.getElementById('centerBody');
        var centerBodyRect = centerBody.getBoundingClientRect();
        
        const {
            classificationList,
        } = this.state;

        let startPointList =[];
        let endPoint ={};

        var endLeftX = 0;
        var endLeftY = centerBodyRect.height / 2.0 - leftBesselRect.top + 64;

        var endRightX = rightBesselRect.width;
        var endRightY = centerBodyRect.height / 2.0 - rightBesselRect.top;

        endPoint.leftX = endLeftX;
        endPoint.leftY = endLeftY;
        endPoint.rightX = endRightX;
        endPoint.rightY = endRightY;

        classificationList.map((item, i) => {
            var classification = document.getElementById('classification'+i);
            var classificationRect = classification.getBoundingClientRect();

            var startXRight = rightBesselRect.left-classificationRect.left-classificationRect.width;
            var startY = (classificationRect.height+16)*(i+0.5);
            
            var startXLeft = classificationRect.left-centerBodyRect.left;

            let start ={};
            start.leftX = startXLeft;
            start.leftY = startY;
            start.rightX = startXRight;
            start.rightY = startY;

            startPointList.push(start);
        })

        this.setState({
            startPointList:startPointList,
            endPoint:endPoint,
        })
    }

    //关闭按钮事件
    handleClose() {
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        this.props.closeTrainModalState();
    }

    //新建模型
    handleCreateModel() {
        if (!this.state.hasWebcam) {
            return;
        }
        this.setState({
            confirmVisible: true
        })
    }

    //使用模型
    handleUseModel() {
        if (!this.state.hasWebcam) {
            return;
        }
        const {
            classificationList,
            trainedClassificationCount
        } = this.state;
        if(trainedClassificationCount!=classificationList.length)
            return;

        //更新到redux
        this.props.setOptions(this.options);
        this.props.setFeatureExtractor(this.featureExtractor);
        this.props.setClassifier(this.classifier);
        this.props.setClassificationList(classificationList);
        this.props.setIsPredicting(this.isPredicting);

        //更新到vm
        let bakclassificationList = classificationList.map(obj => Object.assign({}, obj,{imageList:[].concat(obj.imageList)}));
        this.props.vm.runtime.trainMode.setClassificationList(bakclassificationList);
        this.props.vm.runtime.trainMode.setOptions(this.options);
        this.props.vm.runtime.trainMode.setIsTrain(true);
        this.props.vm.refreshExtensionBlocks().then(() => {
            this.props.vm.refreshWorkspace();
        });

        //关闭窗口
        this.handleClose()
    }

    //新建取消弹窗
    handleConfirmCancel() {
        this.setState({
            confirmVisible: false
        })
    }

    //新建确认弹窗
    handleConfirmOK() {
        this.setState({
            confirmVisible: false,
            createVisible: true
        })
    }

    //创建弹窗取消
    handleCreateCancel() {
        this.setState({
            createVisible: false
        })
    }

    //创建弹窗确认
    handleCreateOK(item) {
        this.setState({
            createVisible: false
        })
        this.resetModel(item.value);
    }

    //新建模型，重置所有类别
    async resetModel(number) {
        this.resetting = true;
        this.isPredicting = false;

        this.options = { alpha: 1, numLabels: number, hiddenUnits: 10, batchSize: 0.2 };
        await this.initClassifier(this.video);
        let classificationList = [];

        for(let i=0;i<number;i++){
            let classification = {
                name: this.category + (i+1),
                confidence: 0,
                imageList:[],
                isNameEdited:false
            }
            classificationList.push(classification)
        }

        this.addedImageCount = 0;
        this.showImageCount = 0;
        this.resetIndex = -1;
        this.trainedClassification = {};
        this.trainedClassificationCount = 0;
        this.setState({
            classificationList:classificationList,
            predictionID: 0,
            trainedClassificationCount: 0,
        }, () => {
            this.refreshLine();
        })
    }

    handleClearCancel() {
        this.setState({
            clearVisible: false
        })
    }

    //重置某个类别
    async handleClearOK() {
        if (!this.state.hasWebcam) {
            return;
        }

        this.resetting = true;
        this.isPredicting = false;

        await this.initClassifier(this.video);

        await this.reloadImage(this.resetIndex);
        this.trainedClassification[this.resetIndex]=false;
        this.trainedClassificationCount--;
        this.resetIndex = -1;
        this.setState({
            clearVisible: false,
            trainedClassificationCount: this.trainedClassificationCount,
        })
    }

    //修改类别名称
    handleNameChange(index,name) {
        const {
            classificationList,
        } = this.state;

        let classification = classificationList[index];
        classification.name = name;
        classification.isNameEdited = true;
        //更新界面
        this.setState({
            classificationList,
        })
    }

    //训练某个类别
    async handleTrain(index) {
        if (!this.state.hasWebcam) {
            return;
        }
        const {
            classificationList,
        } = this.state;

        let classification = classificationList[index];
        let imageList = classification.imageList;
        //截取视频
        this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        let src = this.canvas.toDataURL("image/png");
        imageList.push(src);
        //显示数量+1
        this.showImageCount++;
        //更新界面
        this.setState({
            classificationList
        })
        var img = document.createElement("img");
        img.src = src;
        img.width = this.canvas.width;
        img.height = this.canvas.height;
        if(!this.trainedClassification[index]){
            this.trainedClassification[index]=true;
            this.trainedClassificationCount++
        }

        await this.addImageForTrain(img, index);

        this.setState({
            trainedClassificationCount:this.trainedClassificationCount,
        })
    }

    handleReset(index) {
        if (!this.state.hasWebcam) {
            return;
        }
        this.setState({
            clearVisible: true,
        })
        this.resetIndex = index;
    }

    //训练结果
    trainResult(lossValue) {
        if (!lossValue) {
            console.log('训练完成!')
            //预测
            if(!this.isPredicting) {
                this.classifyVideo();
                this.isPredicting = true;
            }

            const {
                restore,
                classificationList,
            } = this.state;

            if (restore) {
                //更新到redux
                this.props.setOptions(this.options);
                this.props.setFeatureExtractor(this.featureExtractor);
                this.props.setClassifier(this.classifier);
                this.props.setClassificationList(classificationList);
                this.props.setIsPredicting(this.isPredicting);

                //更新到vm

                let bakclassificationList = classificationList.map(obj => Object.assign({}, obj,{imageList:[].concat(obj.imageList)}));
                this.props.vm.runtime.trainMode.setClassificationList(bakclassificationList);
                this.props.vm.runtime.trainMode.setOptions(this.options);
                this.props.vm.runtime.trainMode.setIsTrain(true);
                //通知识别窗口重新预测
                this.props.vm.runtime.trainMode.repredict();
                this.props.vm.refreshExtensionBlocks().then(() => {
                    this.props.vm.refreshWorkspace();
                });

                if(this.restoreOnFinish){
                    this.restoreOnFinish()
                }
                this.setState({
                    restore: false,
                })
            }
        }
    }

    // Get a prediction for the current video frame
    classifyVideo() {
        if(this.resetting||this.props.hidden)
            return;
        if (this.state.hasWebcam) {
            try {
                this.classifier.classify(this.video, this.predictResult);
            } catch (error) {
                
            }
        }
    }

    // 预测结果回调
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
                //如果没有图片则为可信度设为0
                if(classification.imageList.length==0){
                    classification.confidence=0;
                }
            })

            this.setState({
                predictionID: v,
                classificationList
            })
        }
        setTimeout(() => {
            if(!this.resetting||this.props.hidden) {
                this.classifyVideo();
            }
        }, 1000);
    }

    changeState (e) {
        const stateToChange = e.target.id;
        this.setState({
          [stateToChange]:e.target.value,
        })
      }

    render() {
        const {
            hidden,
        } = this.props;

        const {
            classificationList,
            predictionID,
            trainedClassificationCount,
            startPointList,
            endPoint,
            clearVisible,
            confirmVisible,
            createVisible,
            modelLoading,
            restore,
            hasWebcam
        } = this.state;

        let classification = classificationList[predictionID];

        let curveLeft = {};
        let curveRight = {};

        startPointList.map((startPoint, i) => {
            let left = new SVGPath()
                .moveTo(startPoint.leftX, startPoint.leftY)
                .lineTo(endPoint.leftX, endPoint.leftY);
            curveLeft[i] = left;

            let right = new SVGPath()
                .moveTo(startPoint.rightX, startPoint.rightY)
                .lineTo(endPoint.rightX, endPoint.rightY + 64);
            curveRight[i] = right;
        })

        return (
            <div className={styles.modal} style={{display:hidden?"none":"block"}}>
                <div className={styles.top}>
                    <div className={styles.topItem}></div>
                    <div className={styles.topItem}>
                        <div className={styles.title}>{this.title}</div>
                    </div>
                    <div className={classNames(styles.topItem,styles.topRight)}>
                        <div className={styles.closeBtn} onClick={this.handleClose}>
                            <img className={styles.closeIcon} src={iconClose}></img>
                        </div>
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.centerLeft}>
                        <div className={styles.cameraContainer}>
                            <video id="graphTrainVideo"
                                className={styles.camera}
                                width='100%'
                                height='100%'>
                            </video>
                        </div>
                    </div>
                    <div id='centerBody' className={styles.centerBody} onScroll={this.handleScroll}>
                        <div id='leftBessel' className={styles.leftBessel} style={{height:classificationList.length*216+16+'px'}}>
                            <svg style={{ width: "100%", height: "100%" }}>
                                {
                                    classificationList
                                        .map((item, i) => (
                                            <path key={i} d={curveLeft[i]} stroke={"#cfd1d2"} strokeWidth={2} fill={"transparent"}>
                                            </path>
                                        ))
                                }
                            </svg>
                        </div>
                        <div className={styles.classificationGroup}>
                            {
                                classificationList
                                    .map((item, i) => (
                                        <ImageClassification 
                                            key={i}
                                            restore={restore}
                                            item={item}
                                            index={i}
                                            trainDisable={item.imageList.length>=9&&hasWebcam}
                                            onNameChange={this.handleNameChange}
                                            onTrain={this.handleTrain}
                                            onReset={this.handleReset}
                                        />
                                        
                                    ))
                            }                
                        </div>
                        <div id='rightBessel' className={styles.rightBessel} style={{height:classificationList.length*216+16+'px'}}>
                            <svg style={{ width: "100%", height: "100%" }}>
                                {
                                    classificationList
                                        .map((item, i) => (
                                            <path key={i} d={curveRight[i]} stroke={i==predictionID?"#95de64":"#cfd1d2"} strokeWidth={2} fill={"transparent"}>
                                            </path>
                                        ))
                                }
                            </svg>
                        </div>
                    </div>
                    <div className={styles.centerRight}>
                        <div className={styles.resultContainer}>
                            <div className={styles.resultLabel}>{this.result}</div>
                            <div className={styles.resultValue}>{classification.name}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={classNames(styles.previous, styles.button, hasWebcam? styles.buttonEnable : styles.buttonDisable)} 
                        onClick={this.handleCreateModel}>
                        {this.newModel}
                    </div>
                    <div className={classNames(styles.button, trainedClassificationCount == classificationList.length&&hasWebcam? styles.buttonEnable : styles.buttonDisable)} 
                        onClick={this.handleUseModel}>
                        {this.usingModel}
                    </div>
                </div>
                {
                    clearVisible ? (
                        <Prompt
                            id={'clearPrompt'}
                            showClose={false}
                            isDefaultLeft={true}
                            message={this.clearPrompt}
                            contentLabel={''}
                            cancelLabel={this.cancel}
                            okLabel={this.confirm}
                            onCancel={this.handleClearCancel}
                            onOk={this.handleClearOK}
                        >
                        </Prompt>
                    ) : null
                }
                {
                    confirmVisible ? (
                        <Prompt
                            id={'confirmPrompt'}
                            showClose={false}
                            isDefaultLeft={true}
                            message={this.newModelPrompt}
                            contentLabel={''}
                            cancelLabel={this.cancel}
                            okLabel={this.confirm}
                            onCancel={this.handleConfirmCancel}
                            onOk={this.handleConfirmOK}
                        >
                        </Prompt>
                    ) : null
                }
                {
                    createVisible ? (
                        <SelectPrompt
                            id={'createPrompt'}
                            showClose={false}
                            label={this.newModel}
                            message={this.modelCategoryNumber}
                            cancelLabel={this.cancel}
                            okLabel={this.confirm}
                            onCancel={this.handleCreateCancel}
                            onOk={this.handleCreateOK}
                        >
                        </SelectPrompt>
                    ) : null
                }
                {
                    modelLoading ? (
                        <div className = {styles.loading}>
                            <div className = {styles.tip}>{this.modelResourceLoading}</div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classifier: state.scratchGui.trainMode.classifier,
    featureExtractor: state.scratchGui.trainMode.featureExtractor,
    options: state.scratchGui.trainMode.options,
    classificationList: state.scratchGui.trainMode.classificationList,
    isPredicting: state.scratchGui.trainMode.isPredicting,
});

const mapDispatchToProps = dispatch => ({
    closeTrainModalState: () => {
        dispatch(closeTrainModal());
    },
    setClassifier: (classifier) => {
        dispatch(setClassifier(classifier));
    },
    setFeatureExtractor: (featureExtractor) => {
        dispatch(setFeatureExtractor(featureExtractor));
    },
    setOptions: (options) => {
        dispatch(setOptions(options));
    },
    setClassificationList: (classificationList) => {
        dispatch(setClassificationList(classificationList));
    },
    setIsPredicting: (isPredicting) => {
        dispatch(setIsPredicting(isPredicting));
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphTrainingModal));
