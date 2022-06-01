import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';
import VM from '../../../../vm/dist/node/scratch-vm';

import Renderer from 'scratch-render';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import TargetPane from '../../containers/target-pane.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import StageWrapper from '../../containers/stage-wrapper.jsx';
import Loader from '../loader/loader.jsx';
import Box from '../box/box.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';
import CostumeLibrary from '../../containers/costume-library.jsx';
import BackdropLibrary from '../../containers/backdrop-library.jsx';
import DeviceTab from '../../containers/device-tab.jsx';

// import Backpack from '../../containers/backpack.jsx';
import PreviewModal from '../../containers/preview-modal.jsx';
import ImportModal from '../../containers/import-modal.jsx';
import WebGlModal from '../../containers/webgl-modal.jsx';

import {
    closeSerialChartModal,
} from '../../reducers/modals';


// import UploadCode from '../../containers/upload-code.jsx';
import ArduinoMonitor from '../arduino-monitor/arduino-monitor.jsx';

import Cards from '../../containers/cards.jsx';
import Alerts from '../../containers/alerts.jsx';
import DragLayer from '../../containers/drag-layer.jsx';
import ToastComponent, { toasts } from '../toast-special/toast.jsx';
import GraphTrainingModal from '../../containers/graph-training-modal.jsx';
import TrainVideoModal from '../video-modal/train-video-modal.jsx';
import RecognizeVideoModal from '../video-modal/recognize-video-modal.jsx';
import ThreeAxisAccelerometerModal from '../three-axis-accelerometer-modal/three-axis-accelerometer-modal.jsx';
import MeteostationModal from '../meteostation-modal/meteostation-modal.jsx';
import CreateSkillModal from '../create-skill-modal/create-skill-modal.jsx'
import CailbrateModal from '../cailbrate-modal/cailbrate-modal.jsx'
import SerialChartModal from '../serial-chart-modal/serial-chart-modal.jsx';

import ModelControl from '../../containers/models-ctrl.jsx';

import layout, { STAGE_SIZE_MODES } from '../../lib/layout-constants';
import { resolveStageSize } from '../../lib/screen-utils';

import {
    BLOCKS_TAB_INDEX,
    COSTUMES_TAB_INDEX,
    SOUNDS_TAB_INDEX,
    CODE_TAB_INDEX
} from '../../reducers/editor-tab';

import {
    DEVICE_TAB_INDEX,
    STAGE_TAB_INDEX
} from '../../reducers/main-tab';


import styles from './gui.css';
import addExtensionIcon from './kuozhan.svg';

// import codeIcon from './icon--code.svg';
// import costumesIcon from './icon--costumes.svg';
// import soundsIcon from './icon--sounds.svg';

/**
 * 定义tab index
 */
const TabIndexs = {
    INDEX_DEVICE: 0,
    INDEX_STAGE: 1
}

const messages = defineMessages({
    addExtension: {
        id: 'gui.gui.addExtension',
        description: 'Button to add an extension in the target pane',
        defaultMessage: 'Add Extension'
    }
});

// Cache this value to only retrieve it once the first time.
// Assume that it doesn't change for a session.
let isRendererSupported = null;

const GUIComponent = props => {
    const {
        accountNavOpen,
        activeTabIndex,
        activeMainTabIndex,
        alertsVisible,
        basePath,
        backdropLibraryVisible,
        backpackOptions,
        blocksTabVisible,
        cardsVisible,
        children,
        costumeLibraryVisible,
        costumesTabVisible,
        enableCommunity,
        importInfoVisible,
        intl,
        isPlayerOnly,
        isRtl,
        loading,
        renderLogin,
        onClickAccountNav,
        onCloseAccountNav,
        onLogOut,
        onOpenRegistration,
        onToggleLoginOpen,
        onUpdateProjectTitle,
        onActivateCostumesTab,
        onActivateSoundsTab,
        onActivateTab,
        onTabIndexUpdate,
        onExtensionButtonClick,
        onRequestCloseBackdropLibrary,
        onRequestCloseCostumeLibrary,
        onSeeCommunity,
        onShare,
        previewInfoVisible,
        targetIsStage,
        soundsTabVisible,
        stageSizeMode,
        arduinoMonitorVisible,
        vm,
        isLoadingProject,
        isShowCodeView,
        trainModalVisible,
        trainVideoModalVisible,
        recognizeVideoModalVisible,
        serialChartModalVisible,
        onCloseSerialChartModal,
        threeAxisAccelerometerModalVisible,
        meteostationModalVisible,
        createSkillModalVisible,
        cailbrateModalVisible,

        imageModelsVisiabel,
        objectModelsVisiabel,
        trainModelsVisiabel,

        ...componentProps
    } = omit(props, 'dispatch');
    if (children) {
        return <Box {...componentProps}>{children}</Box>;
    }
    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };

    if (isRendererSupported === null) {
        isRendererSupported = Renderer.isSupported();
    }

    return (<MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => {
        const stageSize = resolveStageSize(stageSizeMode, isFullSize);

        return isPlayerOnly ? (
            <StageWrapper
                isRendererSupported={isRendererSupported}
                stageSize={stageSize}
                vm={vm}
            >
                {alertsVisible ? (
                    <Alerts className={styles.alertsContainer} />
                ) : null}
            </StageWrapper>
        ) : (
                <Box
                    className={styles.pageWrapper}
                    dir={isRtl ? 'rtl' : 'ltr'}
                    {...componentProps}
                >
                    {previewInfoVisible ? (
                        <PreviewModal />
                    ) : null}
                    {(!isLoadingProject && loading) ? (
                        <Loader />
                    ) : null}
                    {importInfoVisible ? (
                        <ImportModal />
                    ) : null}
                    {isRendererSupported ? null : (
                        <WebGlModal isRtl={isRtl} />
                    )}
                    {cardsVisible ? (
                        <Cards />
                    ) : null}
                    {alertsVisible ? (
                        <Alerts className={styles.alertsContainer} />
                    ) : null}
                    {costumeLibraryVisible ? (
                        <CostumeLibrary
                            vm={vm}
                            onRequestClose={onRequestCloseCostumeLibrary}
                        />
                    ) : null}
                    {backdropLibraryVisible ? (
                        <BackdropLibrary
                            vm={vm}
                            onRequestClose={onRequestCloseBackdropLibrary}
                        />
                    ) : null}
                    {
                        arduinoMonitorVisible &&
                        <ArduinoMonitor />
                    }
                    <MenuBar
                        accountNavOpen={accountNavOpen}
                        className={styles.menuBarPosition}
                        enableCommunity={enableCommunity}
                        renderLogin={renderLogin}
                        onClickAccountNav={onClickAccountNav}
                        onCloseAccountNav={onCloseAccountNav}
                        onLogOut={onLogOut}
                        onOpenRegistration={onOpenRegistration}
                        onSeeCommunity={onSeeCommunity}
                        onShare={onShare}
                        onToggleLoginOpen={onToggleLoginOpen}
                        onUpdateProjectTitle={onUpdateProjectTitle}
                        loading={loading}
                    />
                    <Box className={styles.bodyWrapper}>
                        <Box className={styles.flexWrapper}>
                            <Box className={classNames(styles.deviceAndStageWrapper, styles[stageSize])} id='deviceAndStageWrapper'>
                                <Tabs
                                    forceRenderTabPanel
                                    className={tabClassNames.tabs}
                                    selectedIndex={activeMainTabIndex}
                                    selectedTabClassName={tabClassNames.tabSelected}
                                    selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                                    onSelect={(index) => {
                                        switch (index) {
                                            case STAGE_TAB_INDEX:
                                                if (activeTabIndex === CODE_TAB_INDEX) {
                                                    onActivateTab(BLOCKS_TAB_INDEX);
                                                }
                                                //Switch to stage mode
                                                vm.onActiveStage();
                                                onCloseSerialChartModal();
                                                break;
                                            case DEVICE_TAB_INDEX:
                                                if (activeTabIndex === COSTUMES_TAB_INDEX
                                                    || activeTabIndex === SOUNDS_TAB_INDEX) {
                                                    onActivateTab(BLOCKS_TAB_INDEX);
                                                }
                                                //Switch to device mode
                                                vm.onActiveDevice();
                                                break;
                                        }
                                        //Switch mode
                                        onTabIndexUpdate(index);
                                    }}
                                >
                                    <TabList className={tabClassNames.tabList}>
                                        <Tab className={tabClassNames.tab}>
                                            <FormattedMessage
                                                defaultMessage="Device"
                                                description=""
                                                id="gui.mainTab.deviceLabel"
                                            />
                                        </Tab>
                                        <Tab className={tabClassNames.tab}>
                                            <FormattedMessage
                                                defaultMessage="Stage"
                                                description=""
                                                id="gui.mainTab.stageLabel"
                                            />
                                        </Tab>
                                    </TabList>
                                    <TabPanel className={tabClassNames.tabPanel}>
                                        <DeviceTab
                                            vm={vm}
                                            stageSize={stageSize}
                                        />
                                    </TabPanel>
                                    <TabPanel className={tabClassNames.tabPanel}>
                                        <Box className={classNames(styles.stageAndTargetWrapper)}>
                                            <StageWrapper
                                                isRendererSupported={isRendererSupported}
                                                stageSize={stageSize}
                                                vm={vm}
                                            />
                                            <Box className={styles.targetWrapper}>
                                                <TargetPane
                                                    stageSize={stageSize}
                                                    vm={vm}
                                                />
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                </Tabs>
                                {(activeTabIndex === COSTUMES_TAB_INDEX
                                    || activeTabIndex === SOUNDS_TAB_INDEX) &&
                                    <Box className={styles.functionalZoneObscuration} />}
                            </Box>
                            <Box id={"workspace"} className={styles.workspaceWrapper}>
                                {/* blocks */}
                                <Blocks
                                    grow={1}
                                    isVisible={blocksTabVisible}
                                    options={{
                                        media: `${basePath}static/blocks-media/`
                                    }}
                                    stageSize={stageSize}
                                    vm={vm}
                                />

                                {/* {
                                    activeMainTabIndex == STAGE_TAB_INDEX &&
                                    activeTabIndex === BLOCKS_TAB_INDEX &&
                                    <Box
                                        className={styles.extensionButtonContainer}
                                        onClick={onExtensionButtonClick}
                                    >
                                        <Box className={styles.extensionShadow} />
                                        <Box className={styles.extensionWriteWrap}>
                                            <img src={addExtensionIcon} />
                                            {intl.formatMessage(messages.addExtension)}
                                        </Box>
                                    </Box>
                                } */}

                                {/* costumes 、sound  layout */}
                                {(costumesTabVisible || soundsTabVisible) &&
                                    <div className={styles.customsAndSoundWrapper}>
                                        {costumesTabVisible ? <CostumeTab vm={vm} /> : null}
                                        {soundsTabVisible ? <SoundTab vm={vm} /> : null}
                                    </div>}
                                {/* {
                                    (activeMainTabIndex === DEVICE_TAB_INDEX && !isShowCodeView) &&
                                    <Box className={styles.guiUploadWrapper}>
                                        <UploadCode />
                                    </Box>
                                } */}
                                {
                                    serialChartModalVisible && <SerialChartModal vm={vm} />
                                }
                            </Box>
                        </Box>
                    </Box>
                    <DragLayer />
                    <ToastComponent />
                    {
                        <GraphTrainingModal hidden={!trainModalVisible} vm={vm}></GraphTrainingModal>
                    }
                    {
                        <TrainVideoModal hidden={!trainVideoModalVisible} vm={vm}></TrainVideoModal>
                    }
                    {
                        <RecognizeVideoModal hidden={!recognizeVideoModalVisible} vm={vm}></RecognizeVideoModal>
                    }
                    {
                        threeAxisAccelerometerModalVisible&&<ThreeAxisAccelerometerModal hidden={!threeAxisAccelerometerModalVisible} vm={vm}></ThreeAxisAccelerometerModal>
                    }
                    {
                        meteostationModalVisible&&<MeteostationModal hidden={!meteostationModalVisible} vm={vm}></MeteostationModal>
                    }
                    {
                        createSkillModalVisible&&<CreateSkillModal hidden={!createSkillModalVisible} vm={vm}></CreateSkillModal>
                    }
                    {
                        cailbrateModalVisible&&<CailbrateModal hidden={!cailbrateModalVisible} vm={vm}></CailbrateModal>
                    }
                    {/* 模型扩展界面 */}
                    {imageModelsVisiabel && <ModelControl type={0} />}
                    {objectModelsVisiabel && <ModelControl type={1} />}
                    {trainModelsVisiabel && <ModelControl type={2} />}
                </Box>
            );
    }}</MediaQuery >);
};

GUIComponent.propTypes = {
    accountNavOpen: PropTypes.bool,
    activeTabIndex: PropTypes.number,
    activeMainTabIndex: PropTypes.number,
    backdropLibraryVisible: PropTypes.bool,
    backpackOptions: PropTypes.shape({
        host: PropTypes.string,
        visible: PropTypes.bool
    }),
    basePath: PropTypes.string,
    blocksTabVisible: PropTypes.bool,
    cardsVisible: PropTypes.bool,
    children: PropTypes.node,
    costumeLibraryVisible: PropTypes.bool,
    costumesTabVisible: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    importInfoVisible: PropTypes.bool,
    intl: intlShape.isRequired,
    isPlayerOnly: PropTypes.bool,
    isRtl: PropTypes.bool,
    loading: PropTypes.bool,
    onActivateCostumesTab: PropTypes.func,
    onActivateSoundsTab: PropTypes.func,
    onActivateTab: PropTypes.func,
    onClickAccountNav: PropTypes.func,
    onCloseAccountNav: PropTypes.func,
    onExtensionButtonClick: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenRegistration: PropTypes.func,
    onRequestCloseBackdropLibrary: PropTypes.func,
    onRequestCloseCostumeLibrary: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onShare: PropTypes.func,
    onTabSelect: PropTypes.func,
    onTabIndexUpdate: PropTypes.func,
    onToggleLoginOpen: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    previewInfoVisible: PropTypes.bool,
    renderLogin: PropTypes.func,
    soundsTabVisible: PropTypes.bool,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    targetIsStage: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
    backpackOptions: {
        host: null,
        visible: false
    },
    basePath: './',
    stageSizeMode: STAGE_SIZE_MODES.large
};

const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    isLoadingProject: state.scratchGui.material.isLoadingProject,
    isShowCodeView: state.scratchGui.codeView.visible,
    trainModalVisible: state.scratchGui.modals.trainModal,
    trainVideoModalVisible: state.scratchGui.modals.trainVideoModal,
    recognizeVideoModalVisible: state.scratchGui.modals.recognizeVideoModal,
    serialChartModalVisible: state.scratchGui.modals.serialChartModal,
    threeAxisAccelerometerModalVisible: state.scratchGui.modals.threeAxisAccelerometerModal,
    meteostationModalVisible: state.scratchGui.modals.meteostationModal,
    createSkillModalVisible: state.scratchGui.modals.createSkillModal,
    cailbrateModalVisible: state.scratchGui.modals.cailbrateModal,

    imageModelsVisiabel: state.scratchGui.modelsCtr.imageModelsVisiabel,
    objectModelsVisiabel: state.scratchGui.modelsCtr.objectModelsVisiabel,
    trainModelsVisiabel: state.scratchGui.modelsCtr.trainModelsVisiabel

});

const mapDispatchToProps = dispatch => ({
    onCloseSerialChartModal: () => dispatch(closeSerialChartModal())
});


export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(GUIComponent));
