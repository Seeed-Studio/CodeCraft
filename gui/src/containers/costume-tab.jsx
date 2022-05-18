import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import VM from '../../../vm/';

import AssetPanel from '../components/asset-panel-special/asset-panel.jsx';
import PaintEditorWrapper from './paint-editor-wrapper.jsx';
import CameraModal from './camera-modal.jsx';
import { connect } from 'react-redux';
import { handleFileUpload, costumeUpload, costumeEmUpload} from '../lib/file-uploader.js';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import DragConstants from '../lib/drag-constants';
import { emptyCostume } from '../lib/empty-assets';
import sharedMessages from '../lib/shared-messages';

import {
    closeCameraCapture,
    openCameraCapture,
    openCostumeLibrary,
    openBackdropLibrary
} from '../reducers/modals';

import {
    activateTab,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';

import { setRestore } from '../reducers/restore-deletion';

import addLibraryBackdropIcon from '../components/asset-panel/icon--add-backdrop-lib.svg';
import addLibraryCostumeIcon from '../components/asset-panel/icon--add-costume-lib.svg';

import costumeLibraryContent from '../lib/libraries/costumes.json';
import backdropLibraryContent from '../lib/libraries/backdrops.json';

import styles from '../components/asset-panel-special/asset-panel.css'

let messages = defineMessages({
    addLibraryBackdropMsg: {
        defaultMessage: 'Backdrop Library',
        description: 'Button to add a backdrop in the editor tab',
        id: 'gui.costumeTab.addBackdropFromLibrary'
    },
    addLibraryCostumeMsg: {
        defaultMessage: 'Costume Library',
        description: 'Button to add a costume in the editor tab',
        id: 'gui.costumeTab.addCostumeFromLibrary'
    },
    addSpriteFromPaint: {
        defaultMessage: 'Paint',
        description: '',
        id: 'gui.spriteSelector.addSpriteFromPaint'
    },

    addBlankCostume: {
        defaultMessage: 'Paint',
        description: '',
        id: 'gui.costumeTab.addBlankCostume'
    },
    addBackdropFromPaint: {
        defaultMessage: 'Paint',
        description: '',
        id: 'gui.stageSelector.addBackdropFromPaint'
    },

    addSurpriseCostumeMsg: {
        defaultMessage: 'Surprise',
        description: 'Button to add a surprise costume in the editor tab',
        id: 'gui.costumeTab.addSurpriseCostume'
    },
    addFileBackdropMsg: {
        defaultMessage: 'Upload Backdrop',
        description: 'Button to add a backdrop by uploading a file in the editor tab',
        id: 'gui.costumeTab.addFileBackdrop'
    },
    addFileCostumeMsg: {
        defaultMessage: 'Upload Costume',
        description: 'Button to add a costume by uploading a file in the editor tab',
        id: 'gui.costumeTab.addFileCostume'
    },
    addCameraCostumeMsg: {
        defaultMessage: 'Camera',
        description: 'Button to use the camera to create a costume costume in the editor tab',
        id: 'gui.costumeTab.addCameraCostume'
    }
});

messages = { ...messages, ...sharedMessages };

class CostumeTab extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleSelectCostume',
            'handleDeleteCostume',
            'handleDuplicateCostume',
            'handleNewCostume',
            'handleNewBlankCostume',
            'handleSurpriseCostume',
            'handleSurpriseBackdrop',
            'handleFileUploadClick',
            'handleCostumeUpload',
            'handleCameraBuffer',
            'handleDrop',
            'setFileInput'
        ]);
        const {
            editingTarget,
            sprites,
            stage
        } = props;
        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
        if (target && target.currentCostume) {
            this.state = { selectedCostumeIndex: target.currentCostume };
        } else {
            this.state = { selectedCostumeIndex: 0 };
        }
    }
    componentWillReceiveProps(nextProps) {
        const {
            editingTarget,
            sprites,
            stage
        } = nextProps;

        const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
        if (!target || !target.costumes) {
            return;
        }

        if (this.props.editingTarget === editingTarget) {
            // If costumes have been added or removed, change costumes to the editing target's
            // current costume.
            const oldTarget = this.props.sprites[editingTarget] ?
                this.props.sprites[editingTarget] : this.props.stage;
            // @todo: Find and switch to the index of the costume that is new. This is blocked by
            // https://github.com/LLK/scratch-vm/issues/967
            // Right now, you can land on the wrong costume if a costume changing script is running.
            if (oldTarget.costumeCount !== target.costumeCount) {
                this.setState({ selectedCostumeIndex: target.currentCostume });
            }
        } else {
            // If switching editing targets, update the costume index
            this.setState({ selectedCostumeIndex: target.currentCostume });
        }
    }
    handleSelectCostume(costumeIndex) {
        this.props.vm.editingTarget.setCostume(costumeIndex);
        this.setState({ selectedCostumeIndex: costumeIndex });
    }
    handleDeleteCostume(costumeIndex) {
        const restoreCostumeFun = this.props.vm.deleteCostume(costumeIndex);
        this.props.dispatchUpdateRestore({
            restoreFun: restoreCostumeFun,
            deletedItem: 'Costume'
        });
    }
    handleDuplicateCostume(costumeIndex) {
        this.props.vm.duplicateCostume(costumeIndex);
    }
    handleNewCostume(costume) {
        this.props.vm.addCostume(costume.md5, costume);
    }
    handleNewBlankCostume() {
        const storage = this.props.vm.runtime.storage;
        const name = this.props.vm.editingTarget.isStage ?
            this.props.intl.formatMessage(messages.backdrop, { index: 1 }) :
            this.props.intl.formatMessage(messages.costume, { index: 1 });
        costumeEmUpload(name, storage, this.handleNewCostume);
    }
    handleSurpriseCostume() {
        const item = costumeLibraryContent[Math.floor(Math.random() * costumeLibraryContent.length)];
        const split = item.md5.split('.');
        const type = split.length > 1 ? split[1] : null;
        const rotationCenterX = type === 'svg' ? item.info[0] : item.info[0] / 2;
        const rotationCenterY = type === 'svg' ? item.info[1] : item.info[1] / 2;
        const vmCostume = {
            name: item.name,
            md5: item.md5,
            rotationCenterX,
            rotationCenterY,
            bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
            skinId: null
        };
        this.handleNewCostume(vmCostume);
    }
    handleSurpriseBackdrop() {
        const item = backdropLibraryContent[Math.floor(Math.random() * backdropLibraryContent.length)];
        const vmCostume = {
            name: item.name,
            md5: item.md5,
            rotationCenterX: item.info[0] && item.info[0] / 2,
            rotationCenterY: item.info[1] && item.info[1] / 2,
            bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
            skinId: null
        };
        this.handleNewCostume(vmCostume);
    }
    handleCostumeUpload(e) {
        const storage = this.props.vm.runtime.storage;
        handleFileUpload(e.target, (buffer, fileType, fileName) => {
            costumeUpload(buffer, fileType, fileName, storage, this.handleNewCostume);
        });
    }
    handleCameraBuffer(buffer) {
        const storage = this.props.vm.runtime.storage;
        const name = this.props.intl.formatMessage(messages.costume, { index: 1 });
        costumeUpload(buffer, 'image/png', name, storage, this.handleNewCostume);
    }
    handleFileUploadClick() {
        this.fileInput.value = null;
        this.fileInput.click();
    }
    handleDrop(dropInfo) {
        if (dropInfo.dragType === DragConstants.COSTUME) {
            const sprite = this.props.vm.editingTarget.sprite;
            const activeCostume = sprite.costumes[this.state.selectedCostumeIndex];
            this.props.vm.reorderCostume(this.props.vm.editingTarget.id,
                dropInfo.index, dropInfo.newIndex);
            this.setState({ selectedCostumeIndex: sprite.costumes.indexOf(activeCostume) });
        } else if (dropInfo.dragType === DragConstants.BACKPACK_COSTUME) {
            this.props.vm.addCostume(dropInfo.payload.body, {
                name: dropInfo.payload.name
            });
        } else if (dropInfo.dragType === DragConstants.BACKPACK_SOUND) {
            this.props.onActivateSoundsTab();
            this.props.vm.addSound({
                md5: dropInfo.payload.body,
                name: dropInfo.payload.name
            });
        }
    }
    setFileInput(input) {
        this.fileInput = input;
    }
    formatCostumeDetails(size, optResolution) {
        // If no resolution is given, assume that the costume is an SVG
        const resolution = optResolution ? optResolution : 1;
        // Convert size to stage units by dividing by resolution
        // Round up width and height for scratch-flash compatibility
        // https://github.com/LLK/scratch-flash/blob/9fbac92ef3d09ceca0c0782f8a08deaa79e4df69/src/ui/media/MediaInfo.as#L224-L237
        return `${Math.ceil(size[0] / resolution)} x ${Math.ceil(size[1] / resolution)}`;
    }
    render() {
        const {
            dispatchUpdateRestore, // eslint-disable-line no-unused-vars
            intl,
            onNewCostumeFromCameraClick,
            onNewLibraryBackdropClick,
            onNewLibraryCostumeClick,
            cameraModalVisible,
            onRequestCloseCameraModal,
            vm
        } = this.props;

        if (!vm.editingTarget) {
            return null;
        }

        const isStage = vm.editingTarget.isStage;
        const target = vm.editingTarget.sprite;

        // const addLibraryMessage = isStage ? messages.addLibraryBackdropMsg : messages.addLibraryCostumeMsg;
        const addFileMessage = isStage ? messages.addFileBackdropMsg : messages.addFileCostumeMsg;
        const addSurpriseFunc = isStage ? this.handleSurpriseBackdrop : this.handleSurpriseCostume;
        const addLibraryFunc = isStage ? onNewLibraryBackdropClick : onNewLibraryCostumeClick;
        const addLibraryIcon = isStage ? addLibraryBackdropIcon : addLibraryCostumeIcon;

        const addLibraryMessage =  isStage ? messages.addLibraryBackdropMsg : messages.addLibraryCostumeMsg;

        const paintText =  isStage ? messages.addBackdropFromPaint : messages.addBlankCostume;

        const costumeData = target.costumes ? target.costumes.map(costume => ({
            name: costume.name,
            asset: costume.asset,
            details: costume.size ? this.formatCostumeDetails(costume.size, costume.bitmapResolution) : null,
            dragPayload: costume
        })) : [];

        const choseshapeIcon = (
            <div className={styles.iconChoseshape} />
        )
        const drawshapeIcon = (
            <div className={styles.iconDrawshape} />
        )

        return (
            <AssetPanel

                buttons={[
                    {
                        title: intl.formatMessage(paintText),
                        img: drawshapeIcon,
                        onClick: this.handleNewBlankCostume
                    },
                    {
                        title: intl.formatMessage(addLibraryMessage),
                        img: choseshapeIcon,
                        onClick: addLibraryFunc
                    }
                ]}

                // buttons={[
                //     {
                //         title: intl.formatMessage(addLibraryMessage),
                //         img: addLibraryIcon,
                //         onClick: addLibraryFunc
                //     },
                //     {
                //         title: intl.formatMessage(messages.addCameraCostumeMsg),
                //         img: cameraIcon,
                //         onClick: onNewCostumeFromCameraClick
                //     },
                //     {
                //         title: intl.formatMessage(addFileMessage),
                //         img: fileUploadIcon,
                //         onClick: this.handleFileUploadClick,
                //         fileAccept: '.svg, .png, .jpg, .jpeg',
                //         fileChange: this.handleCostumeUpload,
                //         fileInput: this.setFileInput
                //     },
                //     {
                //         title: intl.formatMessage(messages.addSurpriseCostumeMsg),
                //         img: surpriseIcon,
                //         onClick: addSurpriseFunc
                //     },
                //     {
                //         title: intl.formatMessage(messages.addBlankCostumeMsg),
                //         img: paintIcon,
                //         onClick: this.handleNewBlankCostume
                //     },
                //     {
                //         title: intl.formatMessage(addLibraryMessage),
                //         img: searchIcon,
                //         onClick: addLibraryFunc
                //     }
                // ]}
                dragType={DragConstants.COSTUME}
                items={costumeData}
                selectedItemIndex={this.state.selectedCostumeIndex}
                onDeleteClick={target && target.costumes && target.costumes.length > 1 ?
                    this.handleDeleteCostume : null}
                onDrop={this.handleDrop}
                onDuplicateClick={this.handleDuplicateCostume}
                onItemClick={this.handleSelectCostume}
            >
                {target.costumes ?
                    <PaintEditorWrapper
                        selectedCostumeIndex={this.state.selectedCostumeIndex}
                    /> :
                    null
                }
                {cameraModalVisible ? (
                    <CameraModal
                        onClose={onRequestCloseCameraModal}
                        onNewCostume={this.handleCameraBuffer}
                    />
                ) : null}
            </AssetPanel>
        );
    }
}

CostumeTab.propTypes = {
    cameraModalVisible: PropTypes.bool,
    dispatchUpdateRestore: PropTypes.func,
    editingTarget: PropTypes.string,
    intl: intlShape,
    onActivateSoundsTab: PropTypes.func.isRequired,
    onNewCostumeFromCameraClick: PropTypes.func.isRequired,
    onNewLibraryBackdropClick: PropTypes.func.isRequired,
    onNewLibraryCostumeClick: PropTypes.func.isRequired,
    onRequestCloseCameraModal: PropTypes.func.isRequired,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            costumes: PropTypes.arrayOf(PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string.isRequired,
                skinId: PropTypes.number
            }))
        })
    }),
    stage: PropTypes.shape({
        sounds: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    }),
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    sprites: state.scratchGui.targets.sprites,
    stage: state.scratchGui.targets.stage,
    dragging: state.scratchGui.assetDrag.dragging,
    cameraModalVisible: state.scratchGui.modals.cameraCapture
});

const mapDispatchToProps = dispatch => ({
    onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX)),
    onNewLibraryBackdropClick: e => {
        e.preventDefault();
        dispatch(openBackdropLibrary());
    },
    onNewLibraryCostumeClick: e => {
        e.preventDefault();
        dispatch(openCostumeLibrary());
    },
    onNewCostumeFromCameraClick: () => {
        dispatch(openCameraCapture());
    },
    onRequestCloseCameraModal: () => {
        dispatch(closeCameraCapture());
    },
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    }
});

export default errorBoundaryHOC('Costume Tab')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(CostumeTab))
);
