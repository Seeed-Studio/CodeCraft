import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import VM from '../../../vm/';

import bindAll from 'lodash.bindall';

import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import { openExtensionLibrary } from '../reducers/modals';
import { setProjectTitle } from '../reducers/project-title';
import {
    activateTab,
    BLOCKS_TAB_INDEX,
    COSTUMES_TAB_INDEX,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';

import {
    updateWindowDownloadFlag
} from '../reducers/window-event';

import {
    closeCostumeLibrary,
    closeBackdropLibrary
} from '../reducers/modals';

import ProjectFetcherHOC from '../lib/project-fetcher-hoc.jsx';
import ProjectSaverHOC from '../lib/project-saver-hoc.jsx';
import vmListenerHOC from '../lib/vm-listener-hoc.jsx';
import vmManagerHOC from '../lib/vm-manager-hoc.jsx';
import NetStatusHOC from '../lib/net-status-hoc.jsx';

import GUIComponent from '../components/gui-special/gui.jsx';

class GUI extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'onBeforeunload'
        ]);
    }

    componentDidMount() {
        if (this.props.projectTitle) {
            this.props.onUpdateReduxProjectTitle(this.props.projectTitle);
        }
        setTimeout(() => {
            document.getElementById('initImg').style.display = 'none';
        }, 1000);
        window.addEventListener("beforeunload", this.onBeforeunload);
    }

    componentWillUnmount(){
        window.removeEventListener("beforeunload", this.onBeforeunload);
    }

    /**
     * 监听窗口关闭时事件
     * @param {*} event 
     */
    onBeforeunload(event) {
        if (process.env.NODE_ENV === 'production' &&
            typeof window === 'object' && !this.props.windowDownloadFlag) {
            event.preventDefault();
            event.returnValue = '';
        } else {
            // 无弹框提示
            this.props.updateDownloadFlag(false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.projectTitle !== nextProps.projectTitle) {
            this.props.onUpdateReduxProjectTitle(nextProps.projectTitle);
        }
    }
    render() {
        if (this.props.loadingError) {
            throw new Error(
                `Failed to load project from server [id=${window.location.hash}]: ${this.props.errorMessage}`);
        }
        const {
            /* eslint-disable no-unused-vars */
            assetHost,
            errorMessage,
            hideIntro,
            loadingError,
            onUpdateReduxProjectTitle,
            projectHost,
            projectTitle,
            /* eslint-enable no-unused-vars */
            children,
            fetchingProject,
            isLoading,
            loadingStateVisible,
            isLoadingCourse,
            isLoadingProject,
            isAiModelLoading,
            isLoadingClassHourInfo,
            updateDownloadFlag,
            windowDownloadFlag,
            tipsLibraryVisible,
            epcsLibraryVisible,
            ...componentProps
        } = this.props;

        return (
            <GUIComponent
                loading={
                    fetchingProject || 
                    isLoading || 
                    loadingStateVisible || 
                    isLoadingCourse ||
                    isLoadingProject|| 
                    isAiModelLoading||
                    isLoadingClassHourInfo
                }
                {...componentProps}
            >
                {children}
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    assetHost: PropTypes.string,
    children: PropTypes.node,
    errorMessage: PropTypes.string,
    fetchingProject: PropTypes.bool,
    hideIntro: PropTypes.bool,
    importInfoVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    loadingError: PropTypes.bool,
    loadingStateVisible: PropTypes.bool,
    onChangeProjectInfo: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onTabIndexUpdate: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    onUpdateReduxProjectTitle: PropTypes.func,
    previewInfoVisible: PropTypes.bool,
    projectHost: PropTypes.string,
    projectTitle: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = (state, ownProps) => ({
    activeTabIndex: state.scratchGui.editorTab.activeTabIndex,
    activeMainTabIndex: state.scratchGui.mainTab.activeMainTabIndex,
    alertsVisible: state.scratchGui.alerts.visible,
    backdropLibraryVisible: state.scratchGui.modals.backdropLibrary,
    blocksTabVisible: state.scratchGui.editorTab.activeTabIndex === BLOCKS_TAB_INDEX,
    cardsVisible: state.scratchGui.cards.visible,
    costumeLibraryVisible: state.scratchGui.modals.costumeLibrary,
    costumesTabVisible: state.scratchGui.editorTab.activeTabIndex === COSTUMES_TAB_INDEX,
    importInfoVisible: state.scratchGui.modals.importInfo,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    loadingStateVisible: state.scratchGui.modals.loadingProject,
    isLoadingCourse: state.scratchGui.zwbCourse.isLoadingCourse,
    isLoadingProject: state.scratchGui.zwbProject.isLoadingProject,
    isLoadingClassHourInfo: state.scratchGui.zwbCourse.isLoadingClassHourInfo,
    previewInfoVisible: state.scratchGui.modals.previewInfo && !ownProps.hideIntro,
    targetIsStage: (
        state.scratchGui.targets.stage &&
        state.scratchGui.targets.stage.id === state.scratchGui.targets.editingTarget
    ),
    soundsTabVisible: state.scratchGui.editorTab.activeTabIndex === SOUNDS_TAB_INDEX,
    tipsLibraryVisible: state.scratchGui.modals.tipsLibrary,
    epcsLibraryVisible: state.scratchGui.modals.epcsLibrary,
    vm: state.scratchGui.vm,
    windowDownloadFlag: state.scratchGui.window.downloadFlag,
    arduinoMonitorVisible: state.scratchGui.arduinoMonitor.visible,
});

const mapDispatchToProps = dispatch => ({
    onExtensionButtonClick: () => dispatch(openExtensionLibrary()),
    onActivateTab: tab => dispatch(activateTab(tab)),
    onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX)),
    onRequestCloseBackdropLibrary: () => dispatch(closeBackdropLibrary()),
    onRequestCloseCostumeLibrary: () => dispatch(closeCostumeLibrary()),
    onUpdateReduxProjectTitle: title => dispatch(setProjectTitle(title)),
    updateDownloadFlag: flag => dispatch(updateWindowDownloadFlag(flag))

});

const ConnectedGUI = connect(
    mapStateToProps,
    mapDispatchToProps,
)(GUI);

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedGui = compose(
    ErrorBoundaryHOC('Top Level App'),
    ProjectFetcherHOC,
    ProjectSaverHOC,
    vmListenerHOC,
    vmManagerHOC,
    NetStatusHOC,
)(ConnectedGUI);

WrappedGui.setAppElement = ReactModal.setAppElement;
export default WrappedGui;