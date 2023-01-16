import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import VM from '../../../vm/';
import {connect} from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { 
    spriteEmUpload, 
} from '../lib/file-uploader.js';

import {
    activateStageTab
} from '../reducers/stage-tab';

import {
    activateTab,
    BLOCKS_TAB_INDEX,
    COSTUMES_TAB_INDEX,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';
import {setReceivedBlocks} from '../reducers/hovered-target';
import {setRestore} from '../reducers/restore-deletion';
import DragConstants from '../lib/drag-constants';
import TargetPaneComponent from '../components/target-pane/target-pane.jsx';
import spriteLibraryContent from '../lib/libraries/sprites.json';
import sharedMessages from '../lib/shared-messages';
import {emptySprite} from '../lib/empty-assets';
import { STAGE_DISPLAY_SIZES } from '../lib/layout-constants';


class TargetPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlockDragEnd',
            'handleChangeSpriteRotationStyle',
            'handleChangeSpriteDirection',
            'handleChangeSpriteName',
            'handleChangeSpriteSize',
            'handleChangeSpriteVisibility',
            'handleChangeSpriteX',
            'handleChangeSpriteY',
            'handAddSprite',
            'handleDeleteSprite',
            'handleDrop',
            'handleDuplicateSprite',
            'handleExportSprite',
            'handleNewSprite',
            'handleSelectSprite',
            'handleSurpriseSpriteClick',
            'handlePaintSpriteClick',
            'handleFileUploadClick',
            'handClickCustom',
            'handClickSound',
            'handlePromptCanel',
            'handlePromptOk',
            'setFileInput'
        ]);
        this.state = {
            deletedInfo: null,
            isOpenDelConfirm: false
        };
    }
    componentDidMount () {
        this.props.vm.addListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
    }
    handleChangeSpriteDirection (direction) {
        this.props.vm.postSpriteInfo({direction});
    }
    handleChangeSpriteRotationStyle (rotationStyle) {
        this.props.vm.postSpriteInfo({rotationStyle});
    }
    handleChangeSpriteName (name) {
        this.props.vm.renameSprite(this.props.editingTarget, name);
    }
    handleChangeSpriteSize (size) {
        this.props.vm.postSpriteInfo({size});
    }
    handleChangeSpriteVisibility (visible) {
        this.props.vm.postSpriteInfo({visible});
    }
    handleChangeSpriteX (x) {
        this.props.vm.postSpriteInfo({x});
    }
    handleChangeSpriteY (y) {
        this.props.vm.postSpriteInfo({y});
    }
    handAddSprite(){
        this.props.onActivateTab(COSTUMES_TAB_INDEX);
        const storage = this.props.vm.runtime.storage;
        const spriteName = this.props.intl.formatMessage(sharedMessages.sprite, { index: 1 });
        spriteEmUpload(spriteName, storage, this.handleNewSprite);
    }
    handleNewSprite (spriteJSONString) {
        this.props.vm.addSprite(spriteJSONString).then(() => {
            const editingTarget = this.props.vm.editingTarget;
            this.props.vm.setEditingTargetForStage(editingTarget.id);
        });
    }
    handleDeleteSprite (id) {
        this.setState({
            deletedInfo: id,
            isOpenDelConfirm: true
        })
    }
    handleDuplicateSprite(id) {
        this.props.vm.duplicateSprite(id).then(() => {
            const editingTarget = this.props.vm.editingTarget;
            this.props.vm.setEditingTargetForStage(editingTarget.id);
        });
    }
    handleExportSprite (id) {
        const spriteName = this.props.vm.runtime.getTargetById(id).getName();
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        this.props.vm.exportSprite(id).then(content => {
            const filename = `${spriteName}.sprite3`;

            // Use special ms version if available to get it working on Edge.
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(content, filename);
                return;
            }

            const url = window.URL.createObjectURL(content);
            saveLink.href = url;
            saveLink.download = filename;
            saveLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(saveLink);
        });
    }
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
        this.props.vm.setEditingTargetForStage(id);
    }
    handleSurpriseSpriteClick () {
        const item = spriteLibraryContent[Math.floor(Math.random() * spriteLibraryContent.length)];
        this.props.vm.addSprite(JSON.stringify(item.json));
    }
    handlePaintSpriteClick () {
        const formatMessage = this.props.intl.formatMessage;
        const emptyItem = emptySprite(
            formatMessage(sharedMessages.sprite, {index: 1}),
            formatMessage(sharedMessages.pop),
            formatMessage(sharedMessages.costume, {index: 1})
        );
        this.props.vm.addSprite(JSON.stringify(emptyItem)).then(() => {
            setTimeout(() => { // Wait for targets update to propagate before tab switching
                this.props.onActivateTab(COSTUMES_TAB_INDEX);
            });
        });
    }
    handleFileUploadClick () {
        this.fileInput.value = null;
        this.fileInput.click(); 
    }
    setFileInput (input) {
        this.fileInput = input;
    }
    handleBlockDragEnd (blocks) {
        if(this.props.vm.editingTarget){
            if('device' === this.props.vm.editingTarget.getType()) return;
        }
        if (this.props.hoveredTarget.sprite
            && this.props.hoveredTarget.sprite !== this.props.editingTarget) {
            const editingTarget = this.props.vm.editingTarget;
            const spriteTarget = this.props.vm.runtime.getTargetById(this.props.hoveredTarget.sprite);
            if (!editingTarget.isStage
                && !spriteTarget.isStage) {
                this.props.vm.shareBlocksToTarget(blocks, this.props.hoveredTarget.sprite, this.props.editingTarget);
                this.props.onReceivedBlocks(true);
            }
        }
    }
    handleDrop (dragInfo) {
        const {sprite: targetId} = this.props.hoveredTarget;
        if (dragInfo.dragType === DragConstants.SPRITE) {
            const sprites = Object.keys(this.props.sprites)
                .map(id => this.props.sprites[id])
                .filter((sprite) => sprite.type === 'sprite')
            const sprite = sprites[dragInfo.index];
            const newSprite = sprites[dragInfo.newIndex];
            this.props.vm.reorderTarget(sprite.order + 1, newSprite.order + 1);
        } else if (dragInfo.dragType === DragConstants.BACKPACK_SPRITE) {
            // TODO storage does not have a way of loading zips right now, and may never need it.
            // So for now just grab the zip manually.
            fetch(dragInfo.payload.bodyUrl)
                .then(response => response.arrayBuffer())
                .then(sprite3Zip => this.props.vm.addSprite(sprite3Zip));
        } else if (targetId) {
            // Something is being dragged over one of the sprite tiles or the backdrop.
            // Dropping assets like sounds and costumes duplicate the asset on the
            // hovered target. Shared costumes also become the current costume on that target.
            // However, dropping does not switch the editing target or activate that editor tab.
            // This is based on 2.0 behavior, but seems like it keeps confusing switching to a minimum.
            // it allows the user to share multiple things without switching back and forth.
            if (dragInfo.dragType === DragConstants.COSTUME) {
                this.props.vm.shareCostumeToTarget(dragInfo.index, targetId);
            } else if (targetId && dragInfo.dragType === DragConstants.SOUND) {
                this.props.vm.shareSoundToTarget(dragInfo.index, targetId);
            } else if (dragInfo.dragType === DragConstants.BACKPACK_COSTUME) {
                // In scratch 2, this only creates a new sprite from the costume.
                // We may be able to handle both kinds of drops, depending on where
                // the drop happens. For now, just add the costume.
                this.props.vm.addCostume(dragInfo.payload.body, {
                    name: dragInfo.payload.name
                }, targetId);
            } else if (dragInfo.dragType === DragConstants.BACKPACK_SOUND) {
                this.props.vm.addSound({
                    md5: dragInfo.payload.body,
                    name: dragInfo.payload.name
                }, targetId);
            }
        }
    }

    /**
     * 切换至造型
     */
    handClickCustom() {
        this.props.onActivateTab(this.props.costumesTabVisible ? BLOCKS_TAB_INDEX : COSTUMES_TAB_INDEX);
    }
    /**
     * 切换至声音
     */
    handClickSound() {
        this.props.onActivateTab(this.props.soundsTabVisible ? BLOCKS_TAB_INDEX : SOUNDS_TAB_INDEX);
    }

    handlePromptOk(){
        const {
            deletedInfo: id
        } = this.state;
        const restoreFun = this.props.vm.deleteSprite(id);
        this.props.dispatchUpdateRestore({
            restoreFun: restoreFun,
            deletedItem: 'Sprite'
        });
        this.setState({
            deletedInfo: null,
            isOpenDelConfirm :false
        })
    }
    handlePromptCanel(){
        this.setState({
            deletedInfo: null,
            isOpenDelConfirm :false
        })
    }

    render() {
        const {
            onActivateTab, // eslint-disable-line no-unused-vars
            onReceivedBlocks, // eslint-disable-line no-unused-vars
            dispatchUpdateRestore, // eslint-disable-line no-unused-vars
            ...componentProps
        } = this.props;
        
        return (
            <TargetPaneComponent
                {...componentProps}
                fileInputRef={this.setFileInput}
                onChangeSpriteDirection={this.handleChangeSpriteDirection}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteRotationStyle={this.handleChangeSpriteRotationStyle}
                onChangeSpriteSize={this.handleChangeSpriteSize}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onAddSprite = {this.handAddSprite}
                onDeleteSprite={this.handleDeleteSprite}
                onDrop={this.handleDrop}
                onDuplicateSprite={this.handleDuplicateSprite}
                onExportSprite={this.handleExportSprite}
                onFileUploadClick={this.handleFileUploadClick}
                onPaintSpriteClick={this.handlePaintSpriteClick}
                onSelectSprite={this.handleSelectSprite}
                onSurpriseSpriteClick={this.handleSurpriseSpriteClick}
                onClickCustom={this.handClickCustom}
                onClickSound={this.handClickSound}
                onPromptCanel={this.handlePromptCanel}
                onPromptOk={this.handlePromptOk}
                isOpenDelConfirm={this.state.isOpenDelConfirm}
                isBackdrop={this.props.vm.editingTarget}
                vm={this.props.vm}
            />
        );
    }
}

const spriteShape = PropTypes.shape({
    costume: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        // The following are optional because costumes uploaded from disk
        // will not have these properties available
        bitmapResolution: PropTypes.number,
        rotationCenterX: PropTypes.number,
        rotationCenterY: PropTypes.number
    }),
    direction: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    size: PropTypes.number,
    visibility: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
});

TargetPane.propTypes = {
    intl: intlShape.isRequired,
    editingTarget: PropTypes.string,
    extensionLibraryVisible: PropTypes.bool,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    onRequestCloseExtensionLibrary: PropTypes.func,
    raiseSprites: PropTypes.bool,
    sprites: PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    hoveredTarget: state.scratchGui.hoveredTarget,
    sprites: Object.keys(state.scratchGui.targets.sprites).reduce((sprites, k) => {
        let { direction, size, x, y, ...sprite } = state.scratchGui.targets.sprites[k];
        if (typeof direction !== 'undefined') direction = Math.round(direction);
        if (typeof x !== 'undefined') x = Math.round(x);
        if (typeof y !== 'undefined') y = Math.round(y);
        if (typeof size !== 'undefined') size = Math.round(size);
        sprites[k] = { ...sprite, direction, size, x, y };
        return sprites;
    }, {}),
    stage: state.scratchGui.targets.stage,
    raiseSprites: state.scratchGui.blockDrag,
    costumesTabVisible: state.scratchGui.editorTab.activeTabIndex === COSTUMES_TAB_INDEX,
    soundsTabVisible: state.scratchGui.editorTab.activeTabIndex === SOUNDS_TAB_INDEX,
    activeStageTab: state.scratchGui.stageTab.activeStageTab
});
const mapDispatchToProps = dispatch => ({
    onActivateTab: tabIndex => {
        dispatch(activateTab(tabIndex));
    },
    onReceivedBlocks: receivedBlocks => {
        dispatch(setReceivedBlocks(receivedBlocks));
    },
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    },
    onActivateStageTab: tabIndex => {
        dispatch(activateStageTab(tabIndex));
    }
    
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetPane));
