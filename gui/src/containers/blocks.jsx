import bindAll from 'lodash.bindall';
import debounce from 'lodash.debounce';
import defaultsDeep from 'lodash.defaultsdeep';
// import makeToolboxXML from '../lib/make-toolbox-xml';
import makeToolboxXML from '../lib/toolboxs/toolbox-index';
import PropTypes, { node } from 'prop-types';
import React from 'react';
import VMScratchBlocks from '../lib/blocks';
import VM from '../../../vm/';

import analytics from '../lib/analytics';
import { saveSvgAsPng } from '../lib/svgtopng-utils';

import log from '../lib/log.js';
import Prompt from './prompt.jsx';
import ConnectionModal from './connection-modal.jsx';
import BlocksComponent from '../components/blocks/blocks.jsx';
import ExtensionLibrary from './extension-library.jsx';
import extensionData from '../lib/libraries/extensions/index.jsx';
import CustomProcedures from './custom-procedures.jsx';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import { STAGE_DISPLAY_SIZES } from '../lib/layout-constants';

import codeEditor from '../lib/code-editor/code-editor.js';
import toCode from '../lib/to-code.js';
import extensionTags from '../lib/libraries/devices/extension-tags';

import { connect } from 'react-redux';
import { updateToolbox } from '../reducers/toolbox';
import { activateColorPicker } from '../reducers/color-picker';
import { closeExtensionLibrary, openSoundRecorder, openExtensionLibrary, openDevicesLibrary } from '../reducers/modals';
import { activateCustomProcedures, deactivateCustomProcedures } from '../reducers/custom-procedures';
import { setProjectSaved } from '../reducers/material-special';
import { _getSettingCode } from '../lib/setting-code.js'
import {
    updateImageModels,
    updateImageModelsState,
    updateObjectModels,
    updateObjectModelsState,
    updateTrainModels,
    updateTrainModelsState,
    updateCreateSkillModels
} from '../reducers/models-ctl';
import {
    STATE_UPLOAD_NONE,
    STATE_UPLOADING_TAB,
    STATE_UPLOAD_SUCC_TAB,
    STATE_UPLOAD_FAIL_TAB,
    activateState
} from '../reducers/upload-state'
import {
    activateTab,
    SOUNDS_TAB_INDEX,
} from '../reducers/editor-tab';

import {
    openTrainModal,
    openTrainVideoModal,
    openRecognizeVideoModal,
    openThreeAxisAccelerometerModal,
    openMeteostationModal,
    openCreateSkillModal,
    openCailbrateModal,
} from '../reducers/modals';

const addFunctionListener = (object, property, callback) => {
    const oldFn = object[property];
    object[property] = function () {
        const result = oldFn.apply(this, arguments);
        callback.apply(this, result);
        return result;
    };
};

/**
 * 解析translate数据
 * @param {*} translate 
 */
const parseTransalte = (translate = "") => {
    translate = translate.split(' ')[0];
    translate = translate.replace("translate", "");
    translate = translate.replace("(", "");
    translate = translate.replace(")", "");
    let split = translate.split(',');
    return {
        translateX: Number(split[0]),
        translateY: Number(split[1])
    }
}

const getSvgWidth = (el) => {
    let widthAttri = el.getAttribute('width');
    return widthAttri.replace("px", "");
}

const getSvgHeight = (el) => {
    let heightAttri = el.getAttribute('height');
    return heightAttri.replace("px", "");
}

/**
 * 获取当前日期
 * @param {*} inputTime 
 */
const snapshootName = () => {
    let date = new Date();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let currdate = (m < 10 ? ('0' + m) : m) + '' + (d < 10 ? ('0' + d) : d);
    let randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
    return `codecraft_${currdate}_${randomNum}.png`;
};

//获取积木定义
const getBlocks = (models = []) => {
    const blocks = [];
    for (let index = 0; index < models.length; index++) {
        const m = models[index];
        const temp = {
            value: m,
            oneBlock: `modelExtension_blockOne${m.id}`,
            twoBlock: `modelExtension_blockTwo${m.id}`,
            threeBlock: `modelExtension_blockThree${m.id}`,
        }
        blocks.push(temp);
    }
    return blocks;
}

//获取积木菜单
const getMenus = (models = []) => {
    return models.map(m => {
        return {
            ipcode: `modelExtension_menu_blockMenu${m.id}`,
            menu: `blockMenu${m.id}`
        }
    })
}

/**
 * 获取坐标菜单
 */
const getCoordinateMenu = () => {
    return {
        ipcode: 'modelExtension_menu_XY',
        menu: 'XY'
    }
}

class Blocks extends React.Component {
    constructor(props) {
        super(props);
        this.ScratchBlocks = VMScratchBlocks(props.vm);
        bindAll(this, [
            'attachVM',
            'detachVM',
            'handleCategorySelected',
            'handleConnectionModalStart',
            'handleConnectionModalClose',
            'handleStatusButtonUpdate',
            'handleOpenSoundRecorder',
            'handlePromptStart',
            'handlePromptCallback',
            'handlePromptClose',
            'handleCustomProceduresClose',
            'handleProjectChanged',
            'handleProjectLoaded',
            'onScriptGlowOn',
            'onScriptGlowOff',
            'onBlockGlowOn',
            'onBlockGlowOff',
            'handleExtensionAdded',
            'handleBlocksInfoUpdate',
            'onTargetsUpdate',
            'onVisualReport',
            'onWorkspaceUpdate',
            'onWorkspaceMetricsChange',
            'setBlocks',
            'setLocale',
            'setCode',
            'extensionButtonShow',
            'setCodeEditorLanguage',
            'listShow',
            'showColorPicker',
            'handleRuntimeDisposed',
            'handleSnapshoot',
            'onOpenDevicesLibrary',
            'onWorkspaceUpdateWithDeviceModeChanged',

            'handleTrainOnclick',
            'handleTrainVideoOnclick',
            'handleRecognizeVideoOnclick',
            'handleAccelerometerOnclick',
            'handleMeteostationOnclick',
            'handleCreateSkillOnclick',
            'handleCailbrateOnclick',
            'handleRestoreFactorySettingsOnclick',

            'handleImgModelButtonOnclick',
            'handleObjModelButtonOnclick',
            'handleDeviceTrainButtonOnclick',

            'handleLoadCdcModels',
            'handleLoadBittleCdcModels',
            'handleRestoreFactorySettings'
        ]);
        this.ScratchBlocks.prompt = this.handlePromptStart;
        this.ScratchBlocks.statusButtonCallback = this.handleConnectionModalStart;
        this.ScratchBlocks.recordSoundCallback = this.handleOpenSoundRecorder;

        this.state = {
            workspaceMetrics: {},
            prompt: null,
            connectionModal: null
        };
        this.onTargetsUpdate = debounce(this.onTargetsUpdate, 100);
        this.toolboxUpdateQueue = [];
    }
    componentDidMount() {

        this.ScratchBlocks.FieldColourSlider.activateEyedropper_ = this.props.onActivateColorPicker;
        this.ScratchBlocks.Procedures.externalProcedureDefCallback = this.props.onActivateCustomProcedures;
        this.ScratchBlocks.Toolbox.extensionButtonClick = this.props.onExtensionDivClick;
        this.ScratchBlocks.Toolbox.extensionButtonShow = this.extensionButtonShow;
        this.ScratchBlocks.Toolbox.openDevicesLibrary = this.onOpenDevicesLibrary;
        this.ScratchBlocks.DataCategory.listShow = this.listShow;
        this.ScratchBlocks.FieldColourSlider.showColorPicker = this.showColorPicker;

        const workspaceConfig = defaultsDeep({},
            Blocks.defaultOptions,
            this.props.options,
            { rtl: this.props.isRtl, toolbox: this.props.toolboxXML }
        );

        this.workspace = this.ScratchBlocks.inject(this.blocks, workspaceConfig);
        this.workspace.registerButtonCallback('trainOnclick', this.handleTrainOnclick);
        this.workspace.registerButtonCallback('trainVideoOnclick', this.handleTrainVideoOnclick);
        this.workspace.registerButtonCallback('recognizeVideoOnclick', this.handleRecognizeVideoOnclick);
        this.workspace.registerButtonCallback('accelerometerOnclick', this.handleAccelerometerOnclick);
        this.workspace.registerButtonCallback('meteostationOnclick', this.handleMeteostationOnclick);
        this.workspace.registerButtonCallback('createSkillOnclick', this.handleCreateSkillOnclick);
        this.workspace.registerButtonCallback('cailbrateOnclick', this.handleCailbrateOnclick);
        this.workspace.registerButtonCallback('restoreFactorySettingsOnclick', this.handleRestoreFactorySettingsOnclick);

        
        this.workspace.registerButtonCallback('imgModelButton', this.handleImgModelButtonOnclick);
        this.workspace.registerButtonCallback('objModelButton', this.handleObjModelButtonOnclick);
        this.workspace.registerButtonCallback('deviceTrainButton', this.handleDeviceTrainButtonOnclick);

        // we actually never want the workspace to enable "refresh toolbox" - this basically re-renders the
        // entire toolbox every time we reset the workspace.  We call updateToolbox as a part of
        // componentDidUpdate so the toolbox will still correctly be updated
        this.setToolboxRefreshEnabled = this.workspace.setToolboxRefreshEnabled.bind(this.workspace);
        this.workspace.snapshoot = this.handleSnapshoot;
        this.workspace.setToolboxRefreshEnabled = () => {
            this.setToolboxRefreshEnabled(false);
        };

        // @todo change this when blockly supports UI events
        addFunctionListener(this.workspace, 'translate', this.onWorkspaceMetricsChange);
        addFunctionListener(this.workspace, 'zoom', this.onWorkspaceMetricsChange);

        this.attachVM();
        // Only update blocks/vm locale when visible to avoid sizing issues
        // If locale changes while not visible it will get handled in didUpdate
        if (this.props.isVisible) {
            this.setLocale();
        }

        analytics.pageview('/editors/blocks');

        // 把垃圾桶放在积木块上层
        const transhcan = document.getElementsByClassName('blocklyTrash')[0];
        const workspace = document.getElementsByClassName('blocklyWorkspace')[0];
        transhcan.remove();
        workspace.appendChild(transhcan);
    }

    handleTrainOnclick() {
        this.props.openTrainModalState();
    }
    handleTrainVideoOnclick() {
        this.props.openTrainVideoModalState();
    }
    handleRecognizeVideoOnclick() {
        this.props.openRecognizeVideoModalState();
    }
    handleAccelerometerOnclick() {
        this.props.openThreeAxisAccelerometerModalState();
    }
    handleMeteostationOnclick() {
        this.props.openMeteostationModalState();
    }
    handleCreateSkillOnclick() {
        this.props.openCreateSkillModalState();
    }
    handleCailbrateOnclick() {
        this.props.openCailbrateModalState();
    }
    handleRestoreFactorySettingsOnclick() {
        this.handleRestoreFactorySettings()
    }
    handleImgModelButtonOnclick() {
        this.props.showImageModelsView();
    }

    handleObjModelButtonOnclick() {
        this.props.showObjectModelsView();
    }

    handleDeviceTrainButtonOnclick() {
        this.props.showTrainModelsView();
    }

    /**
     * 处理cdc模型加载回调
     * @param {*} imageModels 
     * @param {*} objectModels 
     */
    handleLoadCdcModels(imageModels, objectModels, trainModels,createSkillModels) {
        this.props.updateImageModels(imageModels);
        this.props.updateObjectModels(objectModels);
        this.props.updateTrainModels(trainModels);
        this.props.updateCreateSkillModels(createSkillModels);
        // this.handleDefineCreateSkillBlocks({
        //     createSkillModels: createSkillModels
        // });
        this.handleDefineExtensionBlocks({
            imageModels: imageModels,
            objectModels: objectModels,
            trainModels: trainModels,
            createSkillModels: createSkillModels
        });
        
        //更新扩展积木
        this.props.vm.refreshExtensionBlocks().then(() => {
            this.props.vm.refreshWorkspace();
        });
    }
    /**
     * 处理bittle模型加载回调
     * @param {*} createSkillModels 
     */
    handleLoadBittleCdcModels(createSkillModels){
        this.props.updateCreateSkillModels(createSkillModels);
        this.handleDefineCreateSkillBlocks({
            createSkillModels: createSkillModels
        });
        //更新扩展积木
        this.props.vm.refreshExtensionBlocks().then(() => {
            this.props.vm.refreshWorkspace();
        });
    }
    /**
     * clear mark models
     */
    clearModels() {
        this.props.updateImageModels([]);
        this.props.updateObjectModels([]);
        this.props.updateCreateSkillModels([])
    }

    extensionButtonShow() {
        if (this.props.vm.editingTarget) {
            let deviceId = this.props.vm.editingTarget.getDeviceId();
            if (deviceId === -1) deviceId = 1000;
            if (extensionTags[deviceId]) {
                if (extensionTags[deviceId].tags.length > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    onOpenDevicesLibrary() {
        if (this.props.isProjectSaving) {
            return;
        }
        this.props.openDevicesLibrary();
    }

    listShow() {
        if (this.props.vm.editingTarget) {
            let deviceId = this.props.vm.editingTarget.getDeviceId();
            if (deviceId === -1) deviceId = 1000;
            if (extensionTags[deviceId]) {
                if (extensionTags[deviceId].type === 'device') {
                    return true;
                }
            }
        }
        return false;
    }

    showColorPicker() {
        if (this.props.vm.editingTarget) {
            let deviceId = this.props.vm.editingTarget.getDeviceId();
            if (deviceId === -1) deviceId = 1000;
            if (extensionTags[deviceId]) {
                if (extensionTags[deviceId].type === 'sprite') {
                    return true;
                }
            }
        }
        return false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.prompt !== nextState.prompt ||
            this.state.connectionModal !== nextState.connectionModal ||
            this.props.isVisible !== nextProps.isVisible ||
            this.props.toolboxXML !== nextProps.toolboxXML ||
            this.props.extensionLibraryVisible !== nextProps.extensionLibraryVisible ||
            this.props.customProceduresVisible !== nextProps.customProceduresVisible ||
            this.props.locale !== nextProps.locale ||
            this.props.anyModalVisible !== nextProps.anyModalVisible ||
            this.props.stageSize !== nextProps.stageSize ||
            this.props.debugMode !== nextProps.debugMode
        );
    }
    componentDidUpdate(prevProps) {
        // If any modals are open, call hideChaff to close z-indexed field editors
        if (this.props.anyModalVisible && !prevProps.anyModalVisible) {
            this.ScratchBlocks.hideChaff();
        }

        if (prevProps.toolboxXML !== this.props.toolboxXML) {
            // rather than update the toolbox "sync" -- update it in the next frame
            clearTimeout(this.toolboxUpdateTimeout);
            this.toolboxUpdateTimeout = setTimeout(() => {
                this.updateToolbox();
            }, 0);
        }

        if (prevProps.debugMode !== this.props.debugMode) {
            this.onWorkspaceUpdateWithDeviceModeChanged();
        }

        if (this.props.isVisible === prevProps.isVisible) {
            if (this.props.stageSize !== prevProps.stageSize) {
                // force workspace to redraw for the new stage size
                window.dispatchEvent(new Event('resize'));
            }
            return;
        }
        // @todo hack to resize blockly manually in case resize happened while hidden
        // @todo hack to reload the workspace due to gui bug #413
        if (this.props.isVisible) { // Scripts tab
            this.workspace.setVisible(true);
            if (prevProps.locale !== this.props.locale || this.props.locale !== this.props.vm.getLocale()) {
                // call setLocale if the locale has changed, or changed while the blocks were hidden.
                // vm.getLocale() will be out of sync if locale was changed while not visible
                this.setLocale();
            } else {
                this.props.vm.refreshWorkspace();
                this.updateToolbox();
            }

            window.dispatchEvent(new Event('resize'));
        } else {
            this.workspace.setVisible(false);
        }
    }
    componentWillUnmount() {
        this.detachVM();
        //移除workspace button事件监听
        this.workspace.removeButtonCallback('trainOnclick');
        this.workspace.removeButtonCallback('trainVideoOnclick');
        this.workspace.removeButtonCallback('recognizeVideoOnclick');
        this.workspace.removeButtonCallback('accelerometerOnclick');
        this.workspace.removeButtonCallback('meteostationOnclick');
        this.workspace.removeButtonCallback('createSkillOnclick');
        this.workspace.removeButtonCallback('cailbrateOnclick');
        this.workspace.removeButtonCallback('restoreFactorySettingsOnclick');


        this.workspace.removeButtonCallback('imgModelButton');
        this.workspace.removeButtonCallback('objModelButton');
        //释放workspace资源对象
        this.workspace.dispose();
        clearTimeout(this.toolboxUpdateTimeout);
    }

    setLocale() {
        this.workspace.getFlyout().setRecyclingEnabled(false);
        this.ScratchBlocks.ScratchMsgs.setLocale(this.props.locale);
        this.props.vm.setLocale(this.props.locale, this.props.messages)
            .then(() => {
                this.props.vm.refreshWorkspace();
                this.updateToolbox();
                this.workspace.getFlyout().setRecyclingEnabled(true);
            });
    }

    updateToolbox() {
        this.toolboxUpdateTimeout = false;

        // const categoryId = this.workspace.toolbox_.getSelectedCategoryId();
        // const offset = this.workspace.toolbox_.getCategoryScrollOffset();
        this.workspace.updateToolbox(this.props.toolboxXML);
        // In order to catch any changes that mutate the toolbox during "normal runtime"
        // (variable changes/etc), re-enable toolbox refresh.
        // Using the setter function will rerender the entire toolbox which we just rendered.
        this.workspace.toolboxRefreshEnabled_ = true;

        // const currentCategoryPos = this.workspace.toolbox_.getCategoryPositionById(categoryId);
        // const currentCategoryLen = this.workspace.toolbox_.getCategoryLengthById(categoryId);
        // if (offset < currentCategoryLen) {
        //     this.workspace.toolbox_.setFlyoutScrollPos(currentCategoryPos + offset);
        // } else {
        //     this.workspace.toolbox_.setFlyoutScrollPos(currentCategoryPos);
        // }

        const queue = this.toolboxUpdateQueue;
        this.toolboxUpdateQueue = [];
        queue.forEach(fn => fn());
    }

    withToolboxUpdates(fn) {
        // if there is a queued toolbox update, we need to wait
        if (this.toolboxUpdateTimeout) {
            this.toolboxUpdateQueue.push(fn);
        } else {
            fn();
        }
    }

    /**
     * 设置语言代码生成
     */
    setCode(args) {
        if (!args) return;
        if (!this.props.vm.editingTarget) return;
        let deviceId = this.props.vm.editingTarget.getDeviceId();
        let code = toCode(this.ScratchBlocks, this.workspace, deviceId);
        codeEditor.setValue(code);
        // let recordUndo = args.recordUndo;
        // let element = args.element;
        // let hasOldCoordinate = args.hasOwnProperty("oldCoordinate");
        // let hasNewCoordinate = args.hasOwnProperty("newCoordinate");
        // let hasElementChanged = args.hasOwnProperty("element");
        // recordUndo && hasOldCoordinate && hasOldCoordinate ==> action down
        // hasElementChanged ==> element Changed
        // if ((recordUndo && hasOldCoordinate && hasNewCoordinate)
        //     || (recordUndo && hasElementChanged)
        //     || (element && element === 'selected' && !recordUndo)) {
        // }
    }

    setCodeEditorLanguage() {
        if (!this.props.vm.editingTarget) return;
        let deviceId = this.props.vm.editingTarget.getDeviceId();
        switch (deviceId) {
            default:
            case -1:
                codeEditor.setLanguage('python');
                break;
            case 1001:
            case 1002:
            case 1006:
            case 1010:
                codeEditor.setLanguage('cpp');
                break;
        }
        //device变化时 生成code代码
        codeEditor.setValue(toCode(this.ScratchBlocks, this.workspace, deviceId));
    }

    attachVM() {
        // 代码生成相关
        this.workspace.addChangeListener(this.setCode);
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.flyoutWorkspace = this.workspace
            .getFlyout()
            .getWorkspace();
        this.flyoutWorkspace.addChangeListener(this.props.vm.flyoutBlockListener);
        this.flyoutWorkspace.addChangeListener(this.props.vm.monitorBlockListener);
        this.props.vm.addListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.addListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.addListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.addListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.addListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.addListener('workspaceUpdate', this.onWorkspaceUpdate);
        this.props.vm.addListener('workspaceUpdate', this.setCodeEditorLanguage);
        this.props.vm.addListener('targetsUpdate', this.onTargetsUpdate);
        this.props.vm.addListener('EXTENSION_ADDED', this.handleExtensionAdded);
        this.props.vm.addListener('BLOCKSINFO_UPDATE', this.handleBlocksInfoUpdate);
        this.props.vm.addListener('PERIPHERAL_CONNECTED', this.handleStatusButtonUpdate);
        this.props.vm.addListener('PERIPHERAL_ERROR', this.handleStatusButtonUpdate);
        this.props.vm.addListener('PROJECT_CHANGED', this.handleProjectChanged);
        this.props.vm.addListener('PROJECT_LOADED', this.handleProjectLoaded);
        this.props.vm.addListener('RUNTIME_DISPOSED', this.handleRuntimeDisposed);
        this.props.vm.runtime.modelsControl.loadCdcModelsCallback = this.handleLoadCdcModels;
        this.props.vm.runtime.modelsControl.loadBittleCdcModelsCallback = this.handleLoadBittleCdcModels;

    }
    detachVM() {
        this.props.vm.removeListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.removeListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.removeListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.removeListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.removeListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.removeListener('workspaceUpdate', this.onWorkspaceUpdate);
        this.props.vm.removeListener('workspaceUpdate', this.setCodeEditorLanguage);
        this.props.vm.removeListener('targetsUpdate', this.onTargetsUpdate);
        this.props.vm.removeListener('EXTENSION_ADDED', this.handleExtensionAdded);
        this.props.vm.removeListener('BLOCKSINFO_UPDATE', this.handleBlocksInfoUpdate);
        this.props.vm.removeListener('PERIPHERAL_CONNECTED', this.handleStatusButtonUpdate);
        this.props.vm.removeListener('PERIPHERAL_ERROR', this.handleStatusButtonUpdate);
        this.props.vm.removeListener('PROJECT_CHANGED', this.handleProjectChanged);
        this.props.vm.removeListener('PROJECT_LOADED', this.handleProjectLoaded);
        this.props.vm.removeListener('RUNTIME_DISPOSED', this.handleRuntimeDisposed);
        this.props.vm.runtime.modelsControl.loadCdcModelsCallback = null;
        this.props.vm.runtime.modelsControl.loadBittleCdcModelsCallback = null;

    }

    updateToolboxBlockValue(id, value) {
        this.withToolboxUpdates(() => {
            const block = this.workspace
                .getFlyout()
                .getWorkspace()
                .getBlockById(id);
            if (block) {
                block.inputList[0].fieldRow[0].setValue(value);
            }
        });
    }

    onTargetsUpdate() {
        if (this.props.vm.editingTarget) {
            ['glide', 'move', 'set'].forEach(prefix => {
                this.updateToolboxBlockValue(`${prefix}x`, Math.round(this.props.vm.editingTarget.x).toString());
                this.updateToolboxBlockValue(`${prefix}y`, Math.round(this.props.vm.editingTarget.y).toString());
            });
        }
    }
    onWorkspaceMetricsChange() {
        const target = this.props.vm.editingTarget;
        if (target && target.id) {
            const workspaceMetrics = Object.assign({}, this.state.workspaceMetrics, {
                [target.id]: {
                    scrollX: this.workspace.scrollX,
                    scrollY: this.workspace.scrollY,
                    scale: this.workspace.scale
                }
            });
            this.setState({ workspaceMetrics });
        }
    }
    onScriptGlowOn(data) {
        this.workspace.glowStack(data.id, true);
    }
    onScriptGlowOff(data) {
        this.workspace.glowStack(data.id, false);
    }
    onBlockGlowOn(data) {
        this.workspace.glowBlock(data.id, true);
    }
    onBlockGlowOff(data) {
        this.workspace.glowBlock(data.id, false);
    }
    onVisualReport(data) {
        this.workspace.reportValue(data.id, data.value);
    }
    onWorkspaceUpdate(data) {
        // When we change sprites, update the toolbox to have the new sprite's blocks
        if (this.props.vm.editingTarget) {
            const target = this.props.vm.editingTarget;
            const isOnline = this.props.vm.debugMode === 1;
            const tagsObject = target.getType() === 'sprite' ?
                extensionTags[1000] : extensionTags[target.getDeviceId()];
            const dynamicBlocksXML = this.props.vm.runtime.getBlocksXML(tagsObject.tags);

            const toolboxXML = makeToolboxXML(
                {
                    type: target.getType(),
                    targetId: target.id,
                    deviceId: target.getDeviceId(),
                    isStage: target.isStage,
                    extension: {
                        isOnline: isOnline,
                        key: target.getDeviceId(),
                        xml: dynamicBlocksXML
                    },
                }
            );
            // const toolboxXML = makeToolboxXML(target.isStage, target.id, dynamicBlocksXML);
            this.props.updateToolboxState(toolboxXML);
        }

        if (this.props.vm.editingTarget && !this.state.workspaceMetrics[this.props.vm.editingTarget.id]) {
            this.onWorkspaceMetricsChange();
        }

        // Remove and reattach the workspace listener (but allow flyout events)
        this.workspace.removeChangeListener(this.props.vm.blockListener);
        const dom = this.ScratchBlocks.Xml.textToDom(data.xml);
        try {
            this.ScratchBlocks.Xml.clearWorkspaceAndLoadFromXml(dom, this.workspace);
        } catch (error) {
            // The workspace is likely incomplete. What did update should be
            // functional.
            //
            // Instead of throwing the error, by logging it and continuing as
            // normal lets the other workspace update processes complete in the
            // gui and vm, which lets the vm run even if the workspace is
            // incomplete. Throwing the error would keep things like setting the
            // correct editing target from happening which can interfere with
            // some blocks and processes in the vm.
            error.message = `Workspace Update Error: ${error.message}`;
            log.error(error);
        }
        this.workspace.addChangeListener(this.props.vm.blockListener);
        if (this.props.vm.editingTarget && this.state.workspaceMetrics[this.props.vm.editingTarget.id]) {
            const { scrollX, scrollY, scale } = this.state.workspaceMetrics[this.props.vm.editingTarget.id];
            this.workspace.scrollX = scrollX;
            this.workspace.scrollY = scrollY;
            this.workspace.scale = scale;
            this.workspace.resize();
        }

        // Clear the undo state of the workspace since this is a
        // fresh workspace and we don't want any changes made to another sprites
        // workspace to be 'undone' here.
        this.workspace.clearUndo();
    }

    /**
     * device mode changed
     */
    onWorkspaceUpdateWithDeviceModeChanged() {
        const runtime = this.props.vm.runtime;
        const target = runtime.getEditingTarget() || runtime.getTargetForStage();
        if (target) {
            const isOnline = this.props.debugMode === 1;
            const tagsObject = target.getType() === 'sprite' ?
                extensionTags[1000] : extensionTags[target.getDeviceId()];
            const dynamicBlocksXML = this.props.vm.runtime.getBlocksXML(tagsObject.tags);
            const toolboxXML = makeToolboxXML(
                {
                    type: target.getType(),
                    targetId: target.id,
                    deviceId: target.getDeviceId(),
                    isStage: target.isStage,
                    extension: {
                        isOnline: isOnline,
                        key: target.getDeviceId(),
                        xml: dynamicBlocksXML
                    },
                }
            );
            this.props.updateToolboxState(toolboxXML);
        }
    }

    handleExtensionAdded(blocksInfo) {

        // select JSON from each block info object then reject the pseudo-blocks which don't have JSON, like separators
        // this actually defines blocks and MUST run regardless of the UI state
        this.ScratchBlocks.defineBlocksWithJsonArray(blocksInfo.map(blockInfo => blockInfo.json).filter(x => x));
        // update the toolbox view: this can be skipped if we're not looking at a target, etc.
        const runtime = this.props.vm.runtime;
        const target = runtime.getEditingTarget() || runtime.getTargetForStage();
        if (target) {
            const tagsObject = target.getType() === 'sprite' ?
                extensionTags[1000] : extensionTags[target.getDeviceId()];
            const dynamicBlocksXML = this.props.vm.runtime.getBlocksXML(tagsObject.tags);
            const toolboxXML = makeToolboxXML(
                {
                    type: target.getType(),
                    targetId: target.id,
                    deviceId: target.getDeviceId(),
                    isStage: target.isStage,
                    extension: {
                        key: target.getDeviceId(),
                        xml: dynamicBlocksXML
                    },
                }
            );
            // const toolboxXML = makeToolboxXML(target.isStage, target.id, dynamicBlocksXML);
            this.props.updateToolboxState(toolboxXML);
        }
    }

    /**
     * 处理定义扩展积木
     */
    handleDefineExtensionBlocks(data) {
        const {
            imageModels,
            objectModels,
            trainModels,
        } = data || this.props;

        const imageModelsTemp = imageModels.map(i => Object.assign({}, i, { modelType: 'image' }))
        const objectModelsTemp = objectModels.map(i => Object.assign({}, i, { modelType: 'object' }))
        const trainModelsTemp = trainModels.map(i => Object.assign({}, i, { modelType: 'train' }))

        const Blockly = this.ScratchBlocks;

        const models = [].concat(imageModelsTemp).concat(objectModelsTemp).concat(trainModelsTemp);

        const blocks = getBlocks(models);

        const blocksMenus = getMenus(models);
        const coordinatMenu = getCoordinateMenu();

        const menus = [].concat(blocksMenus).concat(coordinatMenu);

        //定义积木
        for (let index = 0; index < blocks.length; index++) {

            let {
                value: {
                    id,
                    modelName, //模型名称
                    modelFilePath: fpath, //模型文件路径
                    modelData: mlable, //模型数据
                    modelAnchors: manchors, //模型anchors
                    modelType = '', //模型类型
                    modelSamplesNum: samplesNum = 15
                },
                oneBlock,
                twoBlock,
                threeBlock
            } = blocks[index];
            //生成模型文件名称
            let fname = fpath.indexOf('0x') != -1 ? fpath : `"${fpath}"`;
            //生成模型lable数据
            let lable = `[${mlable.map(i => `'${i.value}'`).join(",")}]`;
            //生成模型anchors数据
            let anchors = `(${manchors || '0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778, 9.77052, 9.16828'})`;

            //图像模型积木代码定义
            if (modelType == 'image') {
                Blockly.Maixduino[`${oneBlock}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_imageModel'] = 'from image_classification import *';
                    var imageInitCode = [
                        `image${id}_filename = ${fname}`,
                        `image${id}_labels = ${lable}`,
                        `image${id} = ImageClassification(image${id}_filename, image${id}_labels, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_image${id}_init`] = `${imageInitCode.join('\n')}`;
                    let result = Blockly.Maixduino.valueToCode(block, 'RESULT', Blockly.Maixduino.ORDER_ATOMIC) || '';
                    let probability = Blockly.Maixduino.valueToCode(block, 'PROBABILITY', Blockly.Maixduino.ORDER_ATOMIC) || 50;
                    return [`image${id}.is_class('${result}', ${probability})`, Blockly.Maixduino.ORDER_ATOMIC];
                }
                Blockly.Maixduino[`${twoBlock}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_imageModel'] = 'from image_classification import *';
                    var imageInitCode = [
                        `image${id}_filename = ${fname}`,
                        `image${id}_labels = ${lable}`,
                        `image${id} = ImageClassification(image${id}_filename, image${id}_labels, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_image${id}_init`] = `${imageInitCode.join('\n')}`;
                    let probability = Blockly.Maixduino.valueToCode(block, 'PROBABILITY', Blockly.Maixduino.ORDER_ATOMIC) || 50;
                    return [`image${id}.get_classification_result(${probability})`, Blockly.Maixduino.ORDER_ATOMIC];
                }
            }
            //物体模型积木代码定义
            else if (modelType == 'object') {
                Blockly.Maixduino[`${oneBlock}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
                    var objectInitCode = [
                        `object${id}_filename = ${fname}`,
                        `object${id}_classes = ${lable}`,
                        `object${id}_anchor = ${anchors}`,
                        `object${id} = ObjectDetection(object${id}_filename, object${id}_classes, object${id}_anchor, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_object${id}_init`] = `${objectInitCode.join('\n')}`;
                    let result = Blockly.Maixduino.valueToCode(block, 'RESULT', Blockly.Maixduino.ORDER_ATOMIC) || '';
                    let probability = Blockly.Maixduino.valueToCode(block, 'PROBABILITY', Blockly.Maixduino.ORDER_ATOMIC) || 50;
                    return [`object${id}.is_object('${result}', ${probability})`, Blockly.Maixduino.ORDER_ATOMIC];
                }
                Blockly.Maixduino[`${twoBlock}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
                    var objectInitCode = [
                        `object${id}_filename = ${fname}`,
                        `object${id}_classes = ${lable}`,
                        `object${id}_anchor = ${anchors}`,
                        `object${id} = ObjectDetection(object${id}_filename, object${id}_classes, object${id}_anchor, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_object${id}_init`] = `${objectInitCode.join('\n')}`;
                    let probability = Blockly.Maixduino.valueToCode(block, 'PROBABILITY', Blockly.Maixduino.ORDER_ATOMIC) || 50;
                    return [`object${id}.get_detection_results(${probability})`, Blockly.Maixduino.ORDER_ATOMIC];
                }
                Blockly.Maixduino[`${threeBlock}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
                    var objectInitCode = [
                        `object${id}_filename = ${fname}`,
                        `object${id}_classes = ${lable}`,
                        `object${id}_anchor = ${anchors}`,
                        `object${id} = ObjectDetection(object${id}_filename, object${id}_classes, object${id}_anchor, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_object${id}_init`] = `${objectInitCode.join('\n')}`;
                    let xy = Blockly.Maixduino.valueToCode(block, 'XY', Blockly.Maixduino.ORDER_ATOMIC) || '1';
                    let result = Blockly.Maixduino.valueToCode(block, 'RESULT', Blockly.Maixduino.ORDER_ATOMIC) || '';
                    let probability = Blockly.Maixduino.valueToCode(block, 'PROBABILITY', Blockly.Maixduino.ORDER_ATOMIC) || 50;
                    return [`object${id}.get_object_property('${result}', ${probability}, ${xy})`, Blockly.Maixduino.ORDER_ATOMIC];
                }
            }
            //物体模型积木代码定义
            else if (modelType == 'train') {
                Blockly.Maixduino[`modelExtension_recordSeedSample${id}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_localtrain'] = 'from local_training import *';
                    var objectInitCode = [
                        `modeltrain${id}_classes = ${lable}`,
                        `modeltrain${id}_samplesnumber = ${samplesNum}`,
                        `modeltrain${id} = OnDeviceTraining(modeltrain${id}_classes, modeltrain${id}_samplesnumber, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_localtrain${id}_init`] = `${objectInitCode.join('\n')}`;
                    let result = Blockly.Maixduino.valueToCode(block, 'RESULT', Blockly.Maixduino.ORDER_ATOMIC) || '';
                    return `modeltrain${id}.record_seed_sample('${result}')\n`;
                }

                Blockly.Maixduino[`modelExtension_recordSample${id}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_localtrain'] = 'from local_training import *';
                    var objectInitCode = [
                        `modeltrain${id}_classes = ${lable}`,
                        `modeltrain${id}_samplesnumber = ${samplesNum}`,
                        `modeltrain${id} = OnDeviceTraining(modeltrain${id}_classes, modeltrain${id}_samplesnumber, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_localtrain${id}_init`] = `${objectInitCode.join('\n')}`;
                    return `modeltrain${id}.record_samples_training()\n`;
                }

                Blockly.Maixduino[`modelExtension_recognized${id}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_localtrain'] = 'from local_training import *';
                    var objectInitCode = [
                        `modeltrain${id}_classes = ${lable}`,
                        `modeltrain${id}_samplesnumber = ${samplesNum}`,
                        `modeltrain${id} = OnDeviceTraining(modeltrain${id}_classes, modeltrain${id}_samplesnumber, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_localtrain${id}_init`] = `${objectInitCode.join('\n')}`;
                    let result = Blockly.Maixduino.valueToCode(block, 'RESULT', Blockly.Maixduino.ORDER_ATOMIC) || '';
                    let probability = Blockly.Maixduino.valueToCode(block, 'PROBABILITY', Blockly.Maixduino.ORDER_ATOMIC) || 50;
                    return [`modeltrain${id}.is_class('${result}', ${probability})`, Blockly.Maixduino.ORDER_ATOMIC];
                }

                Blockly.Maixduino[`modelExtension_recognizedResult${id}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_localtrain'] = 'from local_training import *';
                    var objectInitCode = [
                        `modeltrain${id}_classes = ${lable}`,
                        `modeltrain${id}_samplesnumber = ${samplesNum}`,
                        `modeltrain${id} = OnDeviceTraining(modeltrain${id}_classes, modeltrain${id}_samplesnumber, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_localtrain${id}_init`] = `${objectInitCode.join('\n')}`;
                    let probability = Blockly.Maixduino.valueToCode(block, 'PROBABILITY', Blockly.Maixduino.ORDER_ATOMIC) || 50;
                    return [`modeltrain${id}.get_classification_result(${probability})`, Blockly.Maixduino.ORDER_ATOMIC];
                }

                Blockly.Maixduino[`modelExtension_modelSave${id}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_localtrain'] = 'from local_training import *';
                    var objectInitCode = [
                        `modeltrain${id}_classes = ${lable}`,
                        `modeltrain${id}_samplesnumber = ${samplesNum}`,
                        `modeltrain${id} = OnDeviceTraining(modeltrain${id}_classes, modeltrain${id}_samplesnumber, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_localtrain${id}_init`] = `${objectInitCode.join('\n')}`;
                    let filename = Blockly.Maixduino.valueToCode(block, 'NAME', Blockly.Maixduino.ORDER_ATOMIC) || '';
                    return `modeltrain${id}.save_model_file(${filename})\n`;
                }

                Blockly.Maixduino[`modelExtension_modelLoad${id}`] = function (block) {
                    Blockly.Maixduino.definitions_['import_localtrain'] = 'from local_training import *';
                    var objectInitCode = [
                        `modeltrain${id}_classes = ${lable}`,
                        `modeltrain${id}_samplesnumber = ${samplesNum}`,
                        `modeltrain${id} = OnDeviceTraining(modeltrain${id}_classes, modeltrain${id}_samplesnumber, 1)`
                    ]
                    Blockly.Maixduino.definitions_[`var_localtrain${id}_init`] = `${objectInitCode.join('\n')}`;
                    let filename = Blockly.Maixduino.valueToCode(block, 'NAME', Blockly.Maixduino.ORDER_ATOMIC) || '';
                    return `modeltrain${id}.load_model_file(${filename})\n`;
                }
            }
        }

        //定义菜单
        for (let index = 0; index < menus.length; index++) {
            let { ipcode, menu } = menus[index];
            Blockly.Maixduino[`${ipcode}`] = function (block) {
                let branch = block.getFieldValue(`${menu}`);
                return [branch, Blockly.Maixduino.ORDER_ATOMIC];
            }
        }

    }

    //bittle创建技能
    handleDefineCreateSkillBlocks(data){
        const {
            createSkillModels
        } = data || this.props;
        const Blockly = this.ScratchBlocks;
        //createSkill
        Blockly.ArduinoOpenCat['createSkill_showCreateSkillValue'] = function (block) {
            let ABC = createSkillModels.createSkillItem
            let fir = createSkillModels.createSkillFir
            Blockly.ArduinoOpenCat.definitions_['var_const_char_abc'] = `const char createSkillValueList[] = {${ABC}};`;
            // Blockly.ArduinoOpenCat.loops_['loop_bitty_set_diy'] = `bitty_set_diy(abc,${fir}); \n  bitty_move();`;
            var code = '';
            return  `bitty_set_diy(createSkillValueList,${fir});`;    
        }
    }
    //恢复出厂设置
    handleRestoreFactorySettings(){
        let code = _getSettingCode()
    }

    handleBlocksInfoUpdate(blocksInfo) {
        // @todo Later we should replace this to avoid all the warnings from redefining blocks.
        this.handleExtensionAdded(blocksInfo);
        this.handleDefineExtensionBlocks();
        this.handleDefineCreateSkillBlocks();
    }
    handleCategorySelected(categoryId) {
        const extension = extensionData.find(ext => ext.extensionId === categoryId);
        if (extension && extension.launchPeripheralConnectionFlow) {
            this.handleConnectionModalStart(categoryId);
        }
        // Adding an extension is not selected by default
        // this.withToolboxUpdates(() => {
        //     this.workspace.toolbox_.setSelectedCategoryById(categoryId);
        // });
    }
    setBlocks(blocks) {
        this.blocks = blocks;
    }
    handlePromptStart(message, defaultValue, callback, optTitle, optVarType) {
        const p = { prompt: { callback, message, defaultValue } };
        p.prompt.title = optTitle ? optTitle :
            this.ScratchBlocks.Msg.VARIABLE_MODAL_TITLE;
        p.prompt.varType = typeof optVarType === 'string' ?
            optVarType : this.ScratchBlocks.SCALAR_VARIABLE_TYPE;
        p.prompt.showMoreOptions =
            optVarType !== this.ScratchBlocks.BROADCAST_MESSAGE_VARIABLE_TYPE &&
            p.prompt.title !== this.ScratchBlocks.Msg.RENAME_VARIABLE_MODAL_TITLE &&
            p.prompt.title !== this.ScratchBlocks.Msg.RENAME_LIST_MODAL_TITLE;
        this.setState(p);
    }
    handleConnectionModalStart(extensionId) {
        const extension = extensionData.find(ext => ext.extensionId === extensionId);
        if (extension) {
            this.setState({
                connectionModal: {
                    extensionId: extensionId,
                    useAutoScan: extension.useAutoScan,
                    peripheralImage: extension.peripheralImage,
                    smallPeripheralImage: extension.smallPeripheralImage,
                    peripheralButtonImage: extension.peripheralButtonImage,
                    name: extension.name,
                    connectingMessage: extension.connectingMessage,
                    helpLink: extension.helpLink
                }
            });
        }
    }
    handleConnectionModalClose() {
        this.setState({ connectionModal: null });
    }
    handleStatusButtonUpdate() {
        this.ScratchBlocks.refreshStatusButtons(this.workspace);
    }
    handleOpenSoundRecorder() {
        this.props.onOpenSoundRecorder();
    }
    handlePromptCallback(input, optionSelection) {
        this.state.prompt.callback(
            input,
            this.props.vm.runtime.getAllVarNamesOfType(this.state.prompt.varType),
            optionSelection);
        this.handlePromptClose();
    }
    handlePromptClose() {
        this.setState({ prompt: null });
    }
    handleCustomProceduresClose(data) {
        this.props.onRequestCloseCustomProcedures(data);
        const ws = this.workspace;
        ws.refreshToolboxSelection_();
        ws.toolbox_.scrollToCategoryById('myBlocks');
    }

    handleProjectChanged() {
        this.props.onSetProjectSaved(false);
    }

    handleProjectLoaded() {
        this.props.onSetProjectSaved(true);
    }

    handleRuntimeDisposed() {
        this.updateToolbox();
        this.clearModels();
    }

    handleSnapshoot(workspaceNode) {

        let blocklyWorkspaceChildren = workspaceNode.childNodes;
        let blockCanvas = blocklyWorkspaceChildren[1];
        let blocks = blockCanvas.childNodes || [];
        //定义blocks元素的属性列表
        let nodesAttrs = [];
        let transformXs = [];
        let transformYs = [];
        blocks.forEach(node => {
            let transform = node.getAttribute("transform");
            let nodeClientRect = node.getBoundingClientRect();
            nodesAttrs.push({
                x: nodeClientRect.x,
                y: nodeClientRect.y,
                width: nodeClientRect.width,
                height: nodeClientRect.height,
                left: nodeClientRect.left,
                right: nodeClientRect.right,
                top: nodeClientRect.top,
                bottom: nodeClientRect.bottom
            });
            let transformXY = parseTransalte(transform);
            transformXs.push(transformXY.translateX);
            transformYs.push(transformXY.translateY);
        })

        // let minmaxnodesAtX = [].concat(nodesAttrs).sort((a, b) => a.x - b.x);
        // let minmaxnodes2AtX = [].concat(nodesAttrs).sort((a, b) => {
        //     let aV = a.x + a.width;
        //     let bV = b.x + b.width;
        //     return aV - bV;
        // })

        let minXNode, maxXNode, minYNode, maxYNode;
        for (let index = 0; index < nodesAttrs.length; index++) {
            let node = nodesAttrs[index];
            // 获取X最小值
            if (minXNode) {
                if (node.x < minXNode.x) {
                    minXNode = node;
                }
            } else {
                minXNode = node;
            }
            // 获取X最大值
            if (maxXNode) {
                let aV = maxXNode.x + maxXNode.width;
                let bV = node.x + node.width;
                if (bV > aV) {
                    maxXNode = node;
                }
            } else {
                maxXNode = node;
            }
            // 获取Y最小值
            if (minYNode) {
                if (node.y < minYNode.y) {
                    minYNode = node;
                }
            } else {
                minYNode = node;
            }
            // 获取Y最大值
            if (maxYNode) {
                let aV = maxYNode.y + maxYNode.height;
                let bV = node.y + node.height;
                if (bV > aV) {
                    maxYNode = node;
                }
            } else {
                maxYNode = node;
            }
        }

        // let minYNode, maxYNode;
        // for (let index = 0; index < nodesAttrs.length; index++) {
        //     let node = nodesAttrs[index];
        //     // 获取最小值
        //     if (minXNode) {
        //         if (node.x < minXNode.x) {
        //             minXNode = node;
        //         }
        //     } else {
        //         minXNode = node;
        //     }
        //     // 获取最大值
        //     if (maxXNode) {
        //         let aV = maxXNode.x + maxXNode.width;
        //         let bV = node.x + node.width;
        //         if (bV < aV) {
        //             maxXNode = node;
        //         }
        //     } else {
        //         maxXNode = node;
        //     }
        // }
        // console.log("minXNode : ", minXNode)
        // console.log("maxXNode : ", maxXNode)
        // console.log("minYNode : ", minYNode)
        // console.log("maxYNode : ", maxYNode)
        // let minmaxnodesAtY = [].concat(nodesAttrs).sort((a, b) => a.y - b.y);
        // let minXNode = minmaxnodesAtX[0];
        // let maxXNode = minmaxnodes2AtX[minmaxnodes2AtX.length - 1];
        // console.log("minXNode : ", minXNode)
        // console.log("maxXNode : ", maxXNode)
        // let minYNode = minmaxnodesAtY[0];
        // let maxYNode = minmaxnodesAtY[minmaxnodesAtY.length - 1];

        let svgPadding = 14;
        let svgTopGap = 18;

        let svgElement = workspaceNode.parentNode;

        // let svgElementClientRect = svgElement.getBoundingClientRect();
        // let {
        //     width: svgWidth,
        //     height: svgHeight
        // } = svgElementClientRect;
        // let {
        //     translateX,
        //     translateY
        // } = parseTransalte(blockCanvas.getAttribute('transform'));

        let calculateSvgW = maxXNode.x - minXNode.x + maxXNode.width + svgPadding * 2;
        let calculateSvgH = maxYNode.y - minYNode.y + maxYNode.height + svgPadding * 2;

        let minTransformX = Math.min.apply(null, transformXs);
        let minTransformY = Math.min.apply(null, transformYs);

        let transformXOffset = minTransformX - svgPadding;
        let transformYOffset = minTransformY - svgPadding - svgTopGap;

        // let svgElementWidth = Math.max(svgWidth, calculateSvgW);
        // let svgElementHeight = Math.max(svgHeight, calculateSvgH);
        // let svgElementWidth = calculateSvgW;
        // let svgElementHeight = calculateSvgH;
        // if (calculateSvgW > svgWidth) {
        //     translateX = translateX - minXNode.x + Math.max(minXNode.width, 360);
        //     svgElementWidth = svgElementWidth + 160;
        // }
        // if (calculateSvgH > svgHeight) {
        //     translateY = translateY - minYNode.y + 100;
        //     svgElementHeight = svgElementHeight + 160;
        // }

        let svgElementNew = svgElement.cloneNode(true);
        let newWorkspace = svgElementNew.childNodes[1];
        let newBlocklyWorkspaceChildren = newWorkspace.childNodes;
        try {
            if (newWorkspace) {
                newWorkspace.removeChild(newBlocklyWorkspaceChildren[0]);
                newWorkspace.removeChild(newBlocklyWorkspaceChildren[1]);
                newWorkspace.removeChild(newBlocklyWorkspaceChildren[1]);
                newWorkspace.removeChild(newBlocklyWorkspaceChildren[1]);
                newWorkspace.removeChild(newBlocklyWorkspaceChildren[1]);
            }
        } catch (error) { console.log(error) }

        let newBlockCanvas = newWorkspace.firstChild;
        if (newBlockCanvas) {
            newBlockCanvas.setAttribute("transform", `translate(0,0) scale(0.75)`);
            newBlockCanvas.childNodes
                && newBlockCanvas.childNodes.forEach(node => {
                    let {
                        translateX,
                        translateY
                    } = parseTransalte(node.getAttribute("transform"));

                    translateX -= transformXOffset;
                    translateY -= transformYOffset;

                    node.setAttribute("transform", `translate(${translateX},${translateY})`);
                })
        }

        svgElementNew.removeAttribute("class");
        svgElementNew.setAttribute("width", `${calculateSvgW}px`)
        svgElementNew.setAttribute("height", `${calculateSvgH}px`)

        saveSvgAsPng(svgElementNew, snapshootName());
    }

    render() {
        /* eslint-disable no-unused-vars */
        const {
            anyModalVisible,
            customProceduresVisible,
            extensionLibraryVisible,
            options,
            stageSize,
            vm,
            isRtl,
            isVisible,
            isProjectSaving,
            onActivateColorPicker,
            onOpenSoundRecorder,
            updateToolboxState,
            onExtensionDivClick,
            onSetProjectSaved,
            activeMainTabIndex,
            onActivateCustomProcedures,
            onRequestCloseExtensionLibrary,
            onRequestCloseCustomProcedures,
            toolboxXML,
            debugMode,
            openDevicesLibrary,
            openTrainModalState,
            openTrainVideoModalState,
            openRecognizeVideoModalState,
            openThreeAxisAccelerometerModalState,
            openMeteostationModalState,
            openCreateSkillModalState,
            openCailbrateModalState,
            showImageModelsView,
            showObjectModelsView,
            showTrainModelsView,
            updateImageModels,
            updateObjectModels,
            updateCreateSkillModels,
            updateTrainModels,
            trainModels,
            imageModels,
            objectModels,
            createSkillModels,
            ...props
        } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <div>
                <BlocksComponent
                    isVisible={isVisible}
                    componentRef={this.setBlocks}
                    {...props}
                />
                {this.state.prompt ? (
                    <Prompt
                        isStage={vm.runtime.getEditingTarget().isStage}
                        label={this.state.prompt.message}
                        placeholder={this.state.prompt.defaultValue}
                        showMoreOptions={this.state.prompt.showMoreOptions}
                        title={this.state.prompt.title}
                        onCancel={this.handlePromptClose}
                        onOk={this.handlePromptCallback}
                    />
                ) : null}
                {this.state.connectionModal ? (
                    <ConnectionModal
                        {...this.state.connectionModal}
                        vm={vm}
                        onCancel={this.handleConnectionModalClose}
                        onStatusButtonUpdate={this.handleStatusButtonUpdate}
                    />
                ) : null}
                {extensionLibraryVisible ? (
                    <ExtensionLibrary
                        vm={vm}
                        onCategorySelected={this.handleCategorySelected}
                        onRequestClose={onRequestCloseExtensionLibrary}
                    />
                ) : null}
                {customProceduresVisible ? (
                    <CustomProcedures
                        options={{
                            media: options.media
                        }}
                        onRequestClose={this.handleCustomProceduresClose}
                    />
                ) : null}
            </div>
        );
    }
}

Blocks.propTypes = {
    anyModalVisible: PropTypes.bool,
    customProceduresVisible: PropTypes.bool,
    extensionLibraryVisible: PropTypes.bool,
    isRtl: PropTypes.bool,
    isVisible: PropTypes.bool,
    locale: PropTypes.string,
    messages: PropTypes.objectOf(PropTypes.string),
    onActivateColorPicker: PropTypes.func,
    onActivateCustomProcedures: PropTypes.func,
    onOpenSoundRecorder: PropTypes.func,
    onRequestCloseCustomProcedures: PropTypes.func,
    onRequestCloseExtensionLibrary: PropTypes.func,
    options: PropTypes.shape({
        media: PropTypes.string,
        zoom: PropTypes.shape({
            controls: PropTypes.bool,
            wheel: PropTypes.bool,
            startScale: PropTypes.number
        }),
        colours: PropTypes.shape({
            workspace: PropTypes.string,
            flyout: PropTypes.string,
            toolbox: PropTypes.string,
            toolboxSelected: PropTypes.string,
            scrollbar: PropTypes.string,
            scrollbarHover: PropTypes.string,
            insertionMarker: PropTypes.string,
            insertionMarkerOpacity: PropTypes.number,
            fieldShadow: PropTypes.string,
            dragShadowOpacity: PropTypes.number
        }),
        comments: PropTypes.bool,
        collapse: PropTypes.bool
    }),
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    toolboxXML: PropTypes.string,
    updateToolboxState: PropTypes.func,
    onExtensionDivClick: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired,
    openDevicesLibrary: PropTypes.func,
};

Blocks.defaultOptions = {
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.75
    },
    grid: {
        spacing: 80,
        length: 16,
        colour: '#E5E5ED'
    },
    colours: {
        workspace: '#F2F7FB',
        flyout: '#E4F4FF',
        toolbox: '#FFFFFF',
        toolboxSelected: '#E4F4FF',
        scrollbar: '#CECDCE',
        scrollbarHover: '#CECDCE',
        insertionMarker: '#000000',
        insertionMarkerOpacity: 0.2,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    trashcan: true,
    comments: true,
    collapse: false,
    sounds: true
};

Blocks.defaultProps = {
    isVisible: true,
    options: Blocks.defaultOptions
};

const mapStateToProps = state => ({
    isProjectSaving: state.scratchGui.projectState.isProjectSaving,
    anyModalVisible: (
        Object.keys(state.scratchGui.modals).some(key => state.scratchGui.modals[key]) ||
        state.scratchGui.mode.isFullScreen
    ),
    extensionLibraryVisible: state.scratchGui.modals.extensionLibrary,
    isRtl: state.locales.isRtl,
    locale: state.locales.locale,
    messages: state.locales.messages,
    debugMode: state.scratchGui.vm.debugMode,
    toolboxXML: state.scratchGui.toolbox.toolboxXML,
    customProceduresVisible: state.scratchGui.customProcedures.active,
    activeMainTabIndex: state.scratchGui.mainTab.activeMainTabIndex,
    //模型数据（图片模型、物体模型）
    imageModels: state.scratchGui.modelsCtr.imageModels,
    objectModels: state.scratchGui.modelsCtr.objectModels,
    trainModels: state.scratchGui.modelsCtr.trainModels,
    createSkillModels: state.scratchGui.modelsCtr.createSkillModels,
    text:state
});
const mapDispatchToProps = dispatch => ({
    onActivateColorPicker: callback => dispatch(activateColorPicker(callback)),
    onActivateCustomProcedures: (data, callback) => dispatch(activateCustomProcedures(data, callback)),
    onOpenSoundRecorder: () => {
        dispatch(activateTab(SOUNDS_TAB_INDEX));
        dispatch(openSoundRecorder());
    },
    onExtensionDivClick: () => {
        dispatch(openExtensionLibrary());
    },
    onRequestCloseExtensionLibrary: () => {
        dispatch(closeExtensionLibrary());
    },
    onRequestCloseCustomProcedures: data => {
        dispatch(deactivateCustomProcedures(data));
    },
    updateToolboxState: toolboxXML => {
        dispatch(updateToolbox(toolboxXML));
    },
    onSetProjectSaved: bool => {
        dispatch(setProjectSaved(bool));
    },
    openTrainModalState: () => {
        dispatch(openTrainModal());
    },
    openTrainVideoModalState: () => {
        dispatch(openTrainVideoModal());
    },
    openRecognizeVideoModalState: () => {
        dispatch(openRecognizeVideoModal());
    },
    openThreeAxisAccelerometerModalState: () => {
        dispatch(openThreeAxisAccelerometerModal());
    },
    openMeteostationModalState: () => {
        dispatch(openMeteostationModal());
    },
    openCreateSkillModalState: () => {
        dispatch(openCreateSkillModal());
    },
    openCailbrateModalState: () => {
        dispatch(openCailbrateModal());
    },
    openDevicesLibrary: () => {
        dispatch(openDevicesLibrary());
    },
    showImageModelsView: () => {
        dispatch(updateImageModelsState(true));
    },
    showObjectModelsView: () => {
        dispatch(updateObjectModelsState(true));
    },
    showTrainModelsView: () => {
        dispatch(updateTrainModelsState(true));
    },
    updateImageModels: data => dispatch(updateImageModels(data)),
    updateObjectModels: data => dispatch(updateObjectModels(data)),
    updateTrainModels: data => dispatch(updateTrainModels(data)),
    updateCreateSkillModels: data => dispatch(updateCreateSkillModels(data)),
});

export default errorBoundaryHOC('Blocks')(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Blocks)
);
