import bindAll from 'lodash.bindall';
import React from 'react';
import { connect } from 'react-redux';

import { defineMessages, injectIntl } from 'react-intl';

import ModelsCustomView from '../components/models-control/models-ctrl.jsx';

import {
    updateImageModels,
    updateImageModelsState,
    updateObjectModels,
    updateObjectModelsState,
    updateTrainModels,
    updateTrainModelsState
} from '../reducers/models-ctl';

import { toasts } from '../components/toast-special/toast.jsx';

/**
 * 创建模型id
 * Create model id
 */
const createModelId = () => {
    var timestamp = new Date().getTime();
    return timestamp;
}

/**
 * 空判断
 * Check empty
 * @param {*} v 
 */
const isEmpty = (v) => {
    return !(v && v != "");
}

/**
 * 判断当前模型是否被使用
 * Check if the current model has been used
 * @param {*} target 
 * @param {*} id 
 */
const isCurrModelUsed = (target, id) => {
    if (target.blocks &&
        target.blocks._blocks) {
        let defBlocks = Object.values(target.blocks._blocks) || [];
        for (let index = 0; index < defBlocks.length; index++) {
            let item = defBlocks[index];
            if (item.opcode.indexOf(id) != -1) {
                return true;
            }
        }
    }
    return false;
}

class ModelControl extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'handleAddModel',
            'handleDeleteModel',
            'handleEditModel',
            'handleSaveModel',
            'handleCancelSaveModel'
        ]);

        this.state = {
            models: [],                 // 模型数据  Models data
            modelType: props.type || 0, // 模型类型 0 图像模型 1物体模型  Model type: 0 for image model, 1 for object model
        }
    }

    /**
     * 初始化
     * Initialization
     */
    componentDidMount() {
        const {
            imageModels,
            objectModels,
            trainModels
        } = this.props;

        const {
            modelType
        } = this.state;

        //初始化默认model  Initialize default model
        const model = {
            id: createModelId(),
            modelData: [{ value: null }],
        }
        //初始化图像模型数据  Initialize image model data
        if (modelType == 0) {
            if (imageModels.length > 0) {
                this.setState({
                    models: imageModels.map(i => Object.assign({}, i))
                });
            } else {
                this.setState({
                    models: [model]
                });
            }
        }
        //初始化物体模型数据  Initialize object model data
        if (modelType == 1) {
            if (objectModels.length > 0) {
                this.setState({
                    models: objectModels.map(i => Object.assign({}, i))
                });
            } else {
                this.setState({
                    models: [model]
                });
            }
        }
        //初始化物体模型数据  Initialize trainning model data
        if (modelType == 2) {
            if (trainModels.length > 0) {
                this.setState({
                    models: trainModels.map(i => Object.assign({}, i))
                });
            } else {
                this.setState({
                    models: [model]
                });
            }
        }
    }

    /**
     * 处理新增模型
     * Handle adding model
     */
    handleAddModel() {
        const id = createModelId();
        const model = {
            id,
            modelName: null,                        //模型名称  Model name
            modelFilePath: null,                    //模型文件路径  Model file path
            modelData: [{ id: id, value: null }],   //模型数据  Model data
            modelAnchors: null,                     //模型anchors  Model anchors
        }
        //新增模型  Adding new models
        const modelsTemp = [].concat(this.state.models).concat(model);
        //更新模型列表  Update models list
        this.setState({
            models: modelsTemp
        })
    }

    /**
     * 处理删除模型
     * Handle model deletion
     */
    handleDeleteModel(id) {
        let target = this.props.vm.runtime._editingTarget;
        let isUsed = isCurrModelUsed(target, id);
        if (isUsed) {
            toasts.showDfToast(this.props.intl.formatMessage({
                id: "gui.modelExtension.modelDelete.prompt",
                defaultMessage: "The Model is being used and cannot be removed for the time being.除"
            }));
            return;
        }
        //过滤模型  Filter model
        const modelsTemp = [].concat(this.state.models).filter(i => i.id != id);
        //更新模型列表  Update model list
        this.setState({
            models: modelsTemp
        });
    }

    /**
      * 处理修改模型
      * Handle model editing
      */
    handleEditModel(modelInfo, id) {
        //遍历赋值模型  Assign value by iterating
        const modelsTemp = [].concat(this.state.models).map(i => {
            if (i.id == id) {
                return Object.assign({}, i, modelInfo);
            } else {
                return i;
            }
        });
        //更新模型列表  Update model list
        this.setState({
            models: modelsTemp
        })
    }

    /**
     * 处理模型保存逻辑
     * Handle saving model
     */
    handleSaveModel() {

        const {
            models,
            modelType
        } = this.state;

        const {
            intl
        } = this.props;

        let isCorrect = models.reduce((initValue, curr) => {
            let {
                modelName,      //模型名称
                modelFilePath,  //模型文件路径
                modelData,      //模型数据
                // modelAnchors//模型anchors
            } = curr;
            let checkOne = !isEmpty(modelName) && !isEmpty(modelFilePath);
            let checkTwo = true;
            for (let index = 0; index < modelData.length; index++) {
                let data = modelData[index];
                checkTwo = checkTwo && !isEmpty(data.value)
            }
            return initValue && checkOne && checkTwo;
        }, true);

        if (!isCorrect) {
            toasts.showDfToast(intl.formatMessage({
                id: "gui.modelExtension.modelsSave.prompt",
                defaultMessage: "There is an input box that is not filled in, please enter the content in the input box, or delete unnecessary models and input boxes"
            }));
            return;
        }

        //更新图像模型数据  Update image model data
        if (modelType == 0) {
            this.props.updateImageModels(models);
            this.props.vm.runtime.modelsControl.updateImageModels(models);
        }
        //更新物体模型数据  Update object model data
        else if (modelType == 1) {
            this.props.updateObjectModels(models);
            this.props.vm.runtime.modelsControl.updateObjectModels(models);
        }

        //更新物体模型数据  Update train model data
        else if (modelType == 2) {
            this.props.updateTrainModels(models);
            this.props.vm.runtime.modelsControl.updateTrainModels(models);
        }

        //关闭模型视图  Close models view
        this.props.hideModelsView();
        //更新扩展积木  Update extension blocks
        this.props.vm.refreshExtensionBlocks().then(() => {
            this.props.vm.refreshWorkspace();
        });

        //添加保存成功提示  Notify saving completed
        toasts.success(intl.formatMessage({
            id: "gui.modelExtension.modelsSave.succPrompt",
            defaultMessage: "Saved"
        }));
    }

    /**
     * 处理取消保存逻辑
     * Handle cancel save model
     */
    handleCancelSaveModel() {
        this.props.hideModelsView();
    }


    render() {

        const {
            models = [],
            modelType
        } = this.state;

        return (
            <ModelsCustomView
                vm={this.props.vm}
                type={modelType}
                dataSource={models}
                onAddModel={this.handleAddModel}
                onDeleteModel={this.handleDeleteModel}
                onEditModel={this.handleEditModel}
                onSave={this.handleSaveModel}
                onCancelSave={this.handleCancelSaveModel}
            />
        );
    }
}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    imageModels: state.scratchGui.modelsCtr.imageModels,
    objectModels: state.scratchGui.modelsCtr.objectModels,
    trainModels: state.scratchGui.modelsCtr.trainModels
});


const mapDispatchToProps = dispatch => ({
    updateImageModels: data => dispatch(updateImageModels(data)),
    updateObjectModels: data => dispatch(updateObjectModels(data)),
    updateTrainModels: data => dispatch(updateTrainModels(data)),
    hideModelsView: () => {
        dispatch(updateImageModelsState(false));
        dispatch(updateObjectModelsState(false));
        dispatch(updateTrainModelsState(false));
    }
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelControl));
