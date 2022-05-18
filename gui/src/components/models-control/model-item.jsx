import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from 'react-intl';

import { toasts } from '../toast-special/toast.jsx';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './model-item.css';

import Box from '../box/box.jsx';

import addModelImage from './icon_jia@2x.png';
import reduceModelImage from './icon_jian@2x.png';

import arrowImage from './arrowr@2x.png';
import modelImage from './image_p@2x.png';

import modelScImage from './icon_sc@2x.png';

import Prompt from '../prompt-special/prompt.jsx';

import { connect } from 'react-redux';

const createCategoryId = () => {
    var timestamp = new Date().getTime();
    return timestamp;
}

const messages = defineMessages({

    modelFilePath: {
        id: 'gui.modelExtension.modelFilePath',
        defaultMessage: 'File'
    },
    modelFilePathPlaceholder: {
        id: 'gui.modelExtension.modelFilePath.placeholder',
        defaultMessage: 'Path to model file on SD card or model address'
    },
    modelFilePathPlaceholder2: {
        id: 'gui.modelExtension.modelFilePath.placeholder2',
        defaultMessage: 'Path to model file on SD card'
    },
    modelName: {
        id: 'gui.modelExtension.modelName',
        defaultMessage: 'Model Name'
    },
    modelAnchor: {
        id: 'gui.modelExtension.modelAnchor',
        defaultMessage: 'Anchors'
    },
    modelAnchorPlaceholder: {
        id: 'gui.modelExtension.modelAnchor.placeholder',
        defaultMessage: 'Path to model file on SD card or model address'
    },
    modelSamplesNum: {
        id: 'gui.modelExtension.modelSamplesNum',
        defaultMessage: 'Number of samples'
    },
    categoryName: {
        id: 'gui.modelExtension.model.categoryName',
        defaultMessage: 'Category Name'
    },
    tipLabel: {
        id: 'gui.modelExtension.modelDelete.tipLabel',
        defaultMessage: 'Prompt'
    },
    tipMessage: {
        id: 'gui.modelExtension.modelDelete.message',
        defaultMessage: 'Would you like to delete this model?'
    },
    okText: {
        id: 'gui.modelExtension.modelDelete.okText',
        defaultMessage: 'Delete'
    },
    cancelText: {
        id: 'gui.modelExtension.modelDelete.cancelText',
        defaultMessage: 'Cancel'
    }
});

/**
 * 判断当前模型是否被使用
 * @param {*} target 
 * @param {*} id 
 */

class ModelItemView extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'handleModelNameChanged',
            'handleModelFilePathChanged',
            'handleModelAnchorsChanged',
            'handlePromptOk',
            'handlePromptClosed'
        ]);

        this.state = {
            isShowComfirm: false
        }
    }

    /**
     * 处理确认
     */
    handlePromptOk() {
        const {
            model: {
                id
            },
            onDeleteModel
        } = this.props;
        onDeleteModel(id);
        this.setState({ isShowComfirm: false });
    }

    /**
     * 处理取消
     */
    handlePromptClosed() {
        this.setState({ isShowComfirm: false });
    }

    /**
     * 处理模型名称变化
     * @param {*} e 
     * @param {*} model 
     */
    handleModelNameChanged(e, model, id) {
        const modelTemp = Object.assign({}, model, {
            modelName: e.target.value
        })
        this.props.onEditModel(modelTemp, id)
    }

    /**
     * 处理模型文件路径变化
     * @param {*} e 
     * @param {*} model 
     */
    handleModelFilePathChanged(e, model, id) {
        const modelTemp = Object.assign({}, model, {
            modelFilePath: e.target.value
        })
        this.props.onEditModel(modelTemp, id)
    }

    /**
     * 处理模型锚点设置变化
     * @param {*} e 
     * @param {*} model 
     */
    handleModelAnchorsChanged(e, model, id) {
        const modelTemp = Object.assign({}, model, {
            modelAnchors: e.target.value
        })
        this.props.onEditModel(modelTemp, id)
    }

    /**
     * 处理样本数量设置变化
     * @param {*} e 
     * @param {*} model 
     * @param {*} id 
     */
    handleModelSamplesNumChanged(e, model, id) {
        const modelTemp = Object.assign({}, model, {
            modelSamplesNum: e.target.value
        })
        this.props.onEditModel(modelTemp, id)
    }

    /**
     * 新增CategoryItem
     * @param {*} index 
     */
    handleAddCategoryItem(index, arrs, model, id) {
        const insertIndex = index + 1;
        const categoryId = createCategoryId();
        const datasTemp = arrs.map(i => Object.assign({}, i));
        if (datasTemp) {
            datasTemp.splice(insertIndex, 0, {
                id: categoryId,
                value: null
            });
        }
        const modelTemp = Object.assign({}, model, {
            modelData: datasTemp
        })
        this.props.onEditModel(modelTemp, id);
    }

    /**
     * 判断当前模型积木是否被使用
     * @param {*} target 
     * @param {*} id 
     */
    isCurrModelBlockUsed(target, id) {
        if (target.blocks &&
            target.blocks._blocks) {
            let defBlocks = Object.values(target.blocks._blocks) || [];
            for (let index = 0; index < defBlocks.length; index++) {
                let item = defBlocks[index];

                console.log('item : ', item)
                console.log('opcode : ', item.opcode , item.opcode.indexOf(`recordSeedSample${id}`) != -1)

                if (item.opcode.indexOf(`blockOne${id}`) != -1 ||
                    item.opcode.indexOf(`blockThree${id}`) != -1 ||
                    item.opcode.indexOf(`recordSeedSample${id}`) != -1 ||
                    item.opcode.indexOf(`recognized${id}`) != -1 ) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 判断当前菜单是否被使用
     * @param {*} menu 
     */
    isCurrModelMenuUsed(menu) {
        const {
            imageModels = [],
            objectModels = [],
            trainModels = []
        } = this.props;
        const models = [].concat(imageModels).concat(objectModels).concat(trainModels);
        for (let index = 0; index < models.length; index++) {
            let { modelData = [] } = models[index];
            let isMenuUsed = modelData.reduce((init, i) => init || i.id == menu.id, false);
            if (isMenuUsed) {
                return isMenuUsed;
            }
        }
        return false;
    }

    /**
     * 删除CategoryItem
     * @param {*} index 
     */
    handleDeleteCategoryItem(index, arrs, model, id) {
        let target = this.props.vm.runtime._editingTarget;
        let isBlockUsed = this.isCurrModelBlockUsed(target, id);
        let isMenuUsed = this.isCurrModelMenuUsed(arrs[index]);
        if (isBlockUsed && isMenuUsed) {
            toasts.showDfToast(this.props.intl.formatMessage({
                id: "gui.modelExtension.modelCategoryDelete.prompt",
                defaultMessage: "The Category Name is being used and cannot be removed for the time being."
            }));
            return;
        }
        const datasTemp = arrs.map(i => Object.assign({}, i));
        if (datasTemp) {
            datasTemp.splice(index, 1);
        }
        const modelTemp = Object.assign({}, model, {
            modelData: datasTemp
        })
        this.props.onEditModel(modelTemp, id);
    }

    /**
     * 编辑CategoryItem
     * @param {*} index 
     */
    // handleEditCategoryItem(index, arrs, model, id) {
    //     const datasTemp = arrs.map(i => Object.assign({}, i));
    //     if (datasTemp) {
    //         datasTemp.splice(index, 1);
    //     }
    //     const modelTemp = Object.assign({}, model, {
    //         modelData: datasTemp
    //     })
    //     this.props.onEditModel(modelTemp, id);
    // }

    /**
     * 处理分类名称变化
     * @param {*} e 
     * @param {*} index 
     * @param {*} arrs 
     * @param {*} model 
     * @param {*} id 
     */
    handleCategoryItemNameChanged(e, index, arrs, model, id) {
        const datasTemp = arrs.map((i, idx) => {
            if (idx == index) {
                return Object.assign({}, i, { value: e.target.value });
            } else {
                return Object.assign({}, i);
            }
        });
        const modelTemp = Object.assign({}, model, {
            modelData: datasTemp
        })
        this.props.onEditModel(modelTemp, id);
    }


    render() {

        const {
            index,
            model: {
                id,
                modelName, //模型名称
                modelFilePath, //模型文件路径
                modelData = [], //模型数据
                modelAnchors, //模型anchors
                modelSamplesNum //样本数量
            },
            modelType = 0
        } = this.props;

        const {
            intl,
            model
        } = this.props;

        const filePathPlaceholder = modelType == 2 ? messages.modelFilePathPlaceholder2 : messages.modelFilePathPlaceholder;

        const datasView = (
            <Box className={styles.modelDataList}>
                {modelData.map((item, index, arrs) => {
                    return (
                        <Box className={styles.modelDataItem}>
                            <div className={styles.markWrap} >

                                <div className={styles.markLine} ></div>

                            </div>
                            <div className={styles.categoryName}>{intl.formatMessage(messages.categoryName)}</div>
                            <input
                                type="text"
                                className={styles.categoryInput}
                                value={item.value || ""}
                                onChange={(e) => { this.handleCategoryItemNameChanged(e, index, arrs, model, id) }}
                            />
                            <div className={classNames(styles.categoryOperate, styles.sigleAdd)}>
                                {
                                    index > 0 &&
                                    <img src={reduceModelImage} onClick={() => this.handleDeleteCategoryItem(index, arrs, model, id)} />
                                }
                                <img src={addModelImage} onClick={() => this.handleAddCategoryItem(index, arrs, model, id)} />
                            </div>
                        </Box>
                    );
                })}
                <div className={styles.datasMarkLine} />
            </Box>
        );

        return (
            <Box className={styles.modelItemWrapper}>
                <Box className={styles.modelImageWrapper}>
                    <img className={styles.modelBigImg} src={modelImage} />
                    <img className={styles.modelSmallImg} src={arrowImage} />
                </Box>
                <Box className={styles.modelItem}>
                    <Box className={styles.modelInfoRow}>
                        <div className={styles.label}>{intl.formatMessage(messages.modelFilePath)}</div>
                        <input
                            type="text"
                            value={modelFilePath || ""}
                            className={styles.content}
                            placeholder={intl.formatMessage(filePathPlaceholder)}
                            onChange={(e) => this.handleModelFilePathChanged(e, model, id)}
                        />
                    </Box>
                    <Box className={styles.modelInfoRow}>
                        <div className={styles.label}>{intl.formatMessage(messages.modelName)}</div>
                        <input
                            type="text"
                            value={modelName || ""}
                            className={classNames(styles.content, styles.nameInput)}
                            onChange={(e) => this.handleModelNameChanged(e, model, id)}
                        />
                    </Box>
                    <Box className={classNames(styles.modelInfoRow, styles.modelDatasHeight)}>
                        {datasView}
                    </Box>
                    {
                        modelType == 1 &&
                        <Box className={styles.modelInfoRow}>
                            <div className={styles.label}>{intl.formatMessage(messages.modelAnchor)}</div>
                            <input
                                type="text"
                                value={modelAnchors}
                                className={styles.content}
                                placeholder={intl.formatMessage(messages.modelAnchorPlaceholder)}
                                onChange={(e) => this.handleModelAnchorsChanged(e, model, id)}
                            />
                        </Box>
                    }
                    {
                        modelType == 2 &&
                        <Box className={styles.modelInfoRow}>
                            <div className={styles.label}>{intl.formatMessage(messages.modelSamplesNum)}</div>
                            <input
                                type="text"
                                value={modelSamplesNum}
                                className={styles.content}
                                placeholder={'15 -25'}
                                onChange={(e) => this.handleModelSamplesNumChanged(e, model, id)}
                            />
                        </Box>
                    }
                </Box>
                {
                    index != 0 &&
                    <Box className={styles.modelDelWrapper}>
                        <img src={modelScImage} onClick={() => {
                            this.setState({ isShowComfirm: true })
                        }} />
                    </Box>
                }

                {
                    this.state.isShowComfirm &&
                    <Prompt
                        id={"model-delete"}
                        contentLabel={"Confirm the second time of delete model"}
                        showClose={true}
                        label={intl.formatMessage(messages.tipLabel)}
                        message={intl.formatMessage(messages.tipMessage)}
                        cancelLabel={intl.formatMessage(messages.cancelText)}
                        okLabel={intl.formatMessage(messages.okText)}
                        onOk={this.handlePromptOk}
                        onCancel={this.handlePromptClosed}
                        onClose={this.handlePromptClosed}
                    />
                }

            </Box>
        )

    }

}

const mapStateToProps = state => ({
    imageModels: state.scratchGui.modelsCtr.imageModels,
    objectModels: state.scratchGui.modelsCtr.objectModels,
    trainModels: state.scratchGui.modelsCtr.trainModels

});


const mapDispatchToProps = dispatch => ({
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelItemView));
