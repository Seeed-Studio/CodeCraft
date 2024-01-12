class TrainMode {
    constructor () {
        this.classificationList = [];//预测的每样类别的样本
        this.predictionID = 0;//概率最高的类别ID
        this.blockOnclick;
        this.isTrain = false;//是否训练过
        this.options = {};//机器学习类别参数
        this.restoreWorkspaceRetrainCallback;//工程还原重新训练回调函数
        this.restoreWorkspaceRepredictCallback;//工程还原重新开始预测回调函数
    }

    setClassificationList (classificationList) {
        this.classificationList = classificationList;
    }

    setOptions (options) {
        this.options = Object.assign({}, options);
    }

    setPredictionID (predictionID) {
        this.predictionID = predictionID;
    }

    setIsTrain (isTrain) {
        this.isTrain = isTrain;
    }

    clear() {
        this.classificationList = [];
        this.predictionID = 0;
        this.isTrain = false;
    }

    setRestoreWorkspaceRetrainCallback (restoreWorkspaceRetrainCallback) {
        this.restoreWorkspaceRetrainCallback = restoreWorkspaceRetrainCallback;
    }

    setRestoreWorkspaceRepredictCallback (restoreWorkspaceRepredictCallback) {
        this.restoreWorkspaceRepredictCallback = restoreWorkspaceRepredictCallback;
    }

    saveWorkspace(onLine) {
        let modelStr=''
        if(this.isTrain){
            const modelObj = {
                classificationList:this.classificationList,
                options:this.options
            }
            modelStr = JSON.stringify(modelObj)
        }
        return modelStr;
    }

    repredict() {
        if(this.restoreWorkspaceRepredictCallback){
            this.restoreWorkspaceRepredictCallback()
        }
    }

    async restoreWorkspace(params,onLine,onFinish) {
        let isFinish = false;
        if(typeof params == 'string') {
            if(params!=null&&params!='') {
                const jsonObj = JSON.parse(params)
                if(typeof jsonObj == 'object'){
                    if(this.restoreWorkspaceRetrainCallback){
                        //同步训练结束才能预测
                        isFinish = true;
                        await this.restoreWorkspaceRetrainCallback(jsonObj,onLine,onFinish)
                    }
                }
            }
        }
        if(!isFinish&&onFinish){
            onFinish();
        }
    }
}

export default TrainMode;
