import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import bindAll from 'lodash.bindall';

import Box from '../components/box/box.jsx';
import GraphTrainingModalComponent from '../components/graph-training-modal/graph-training-modal.jsx';

class GraphTrainingModal extends React.Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        
        const {
            /* eslint-disable no-unused-vars */
            // assetHost,
            // errorMessage,
            // hideIntro,
            // loadingError,
            // onUpdateReduxProjectTitle,
            // projectHost,
            // projectTitle,
            // /* eslint-enable no-unused-vars */
            // children,
            // fetchingProject,
            // isLoading,
            // loadingStateVisible,
            // updateDownloadFlag,
            // windowDownloadFlag,
            ...components
        } = this.props;
        return (
            <GraphTrainingModalComponent
                // loading={fetchingProject || isLoading || loadingStateVisible}
                {...components}
            >
                
            </GraphTrainingModalComponent>
        );
    }
}

GraphTrainingModal.propTypes = {
    // assetHost: PropTypes.string,
    // children: PropTypes.node,
    // errorMessage: PropTypes.string,
    // fetchingProject: PropTypes.bool,
    // hideIntro: PropTypes.bool,
    // importInfoVisible: PropTypes.bool,
    // isLoading: PropTypes.bool,
    // loadingError: PropTypes.bool,
    // loadingStateVisible: PropTypes.bool,
    // onChangeProjectInfo: PropTypes.func,
    // onSeeCommunity: PropTypes.func,
    // onTabIndexUpdate: PropTypes.func,
    // onUpdateProjectTitle: PropTypes.func,
    // onUpdateReduxProjectTitle: PropTypes.func,
    // previewInfoVisible: PropTypes.bool,
    // projectHost: PropTypes.string,
    // projectTitle: PropTypes.string,
    // vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = (state, ownProps) => ({
    // activeTabIndex: state.scratchGui.editorTab.activeTabIndex,
    // activeMainTabIndex: state.scratchGui.mainTab.activeMainTabIndex,
    // alertsVisible: state.scratchGui.alerts.visible,
    // backdropLibraryVisible: state.scratchGui.modals.backdropLibrary,
    // blocksTabVisible: state.scratchGui.editorTab.activeTabIndex === BLOCKS_TAB_INDEX,
    // cardsVisible: state.scratchGui.cards.visible,
    // costumeLibraryVisible: state.scratchGui.modals.costumeLibrary,
    // costumesTabVisible: state.scratchGui.editorTab.activeTabIndex === COSTUMES_TAB_INDEX,
    // importInfoVisible: state.scratchGui.modals.importInfo,
    // isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    // isRtl: state.locales.isRtl,
    // loadingStateVisible: state.scratchGui.modals.loadingProject,
    // previewInfoVisible: state.scratchGui.modals.previewInfo && !ownProps.hideIntro,
    // targetIsStage: (
    //     state.scratchGui.targets.stage &&
    //     state.scratchGui.targets.stage.id === state.scratchGui.targets.editingTarget
    // ),
    // soundsTabVisible: state.scratchGui.editorTab.activeTabIndex === SOUNDS_TAB_INDEX,
    // tipsLibraryVisible: state.scratchGui.modals.tipsLibrary,
    // epcsLibraryVisible: state.scratchGui.modals.epcsLibrary,
    // vm: state.scratchGui.vm,
    // windowDownloadFlag: state.scratchGui.window.downloadFlag,
    // arduinoMonitorVisible: state.scratchGui.arduinoMonitor.visible,
});

const mapDispatchToProps = dispatch => ({
    // onExtensionButtonClick: () => dispatch(openExtensionLibrary()),
    // onActivateTab: tab => dispatch(activateTab(tab)),
    // onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    // onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX)),
    // onRequestCloseBackdropLibrary: () => dispatch(closeBackdropLibrary()),
    // onRequestCloseCostumeLibrary: () => dispatch(closeCostumeLibrary()),
    // onUpdateReduxProjectTitle: title => dispatch(setProjectTitle(title)),
    // updateDownloadFlag: flag => dispatch(updateWindowDownloadFlag(flag))

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GraphTrainingModal);


