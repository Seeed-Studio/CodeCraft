import bindAll from 'lodash.bindall';
// import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

// import decksLibraryContent from '../lib/libraries/decks/index.jsx';

// import analytics from '../lib/analytics';

import ZwbCourseComponent from '../components/zwb-course/zwb-course.jsx';


import { connect } from 'react-redux';

// import { setProjectTitle } from '../reducers/project-title';
// import { LoadingStates, onLoadedProject, onProjectUploadStarted } from '../reducers/project-state';
// import {
//     closeTipsLibrary,
//     openLoadingProject,
//     closeLoadingProject,
//     closeEpcsLibrary
// } from '../reducers/modals';
// import { setUserTab, USER_TIME_OUT_TAB_INDEX } from '../reducers/login-register-special.js';

// import {
//     activateDeck
// } from '../reducers/cards';
// import { setFileInfo } from '../reducers/micro-course.js';
// import { setProjectItem, setRemindSave, setRemindSaveType, setShowLoadingProject } from '../reducers/material-special';

// const messages = defineMessages({
//     tipsLibraryTitle: {
//         defaultMessage: 'Sample program',
//         description: 'Heading for the help/tutorials library',
//         id: 'gui.tipsLibrary.tutorials'
//     }
// });

class ZwbCourseSidePane extends React.PureComponent {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'handleToLoginTimeout',
        ]);
    }
    handleItemSelect(item) {
        // this.props.onActivateDeck(item.id);
        // analytics.event({
        //     category: 'library',
        //     action: 'Select How-to',
        //     label: item.id
        // });
    }
    // 到超时页
    handleToLoginTimeout() {
        // this.props.onRequestClose();
        // this.props.onSetUserTab(USER_TIME_OUT_TAB_INDEX);
    }

    render() {

        // const {
        //     isStartUpForHomePage
        // } = this.props;
        // const decksLibraryThumbnailData = Object.keys(decksLibraryContent).map(id => ({
        //     rawURL: decksLibraryContent[id].img,
        //     id: id,
        //     name: decksLibraryContent[id].name,
        //     featured: true
        // }));

        const homeTipsLibrary = (
            <ZwbCourseComponent
                onOpenCourseModal={this.props.onOpenCourseModal}
                // data={decksLibraryThumbnailData}
                // filterable={false}
                // id="tipsLibrary"
                // title={this.props.intl.formatMessage(messages.tipsLibraryTitle)}
                // visible={this.props.visible}
                // onItemSelected={this.handleItemSelect}
                // onRequestClose={this.props.onRequestClose}
                // vm={this.props.vm}
                // authInfo={this.props.authInfo}
                // onLoadingFinished={this.props.onLoadingFinished}
                // onSetProjectTitle={this.props.onSetProjectTitle}
                // onLoadingStarted={this.props.onLoadingStarted}
                // onSetFileInfo={this.props.onSetFileInfo}
                // onSetProjectItem={this.props.onSetProjectItem}
                // onSetRemindSave={this.props.onSetRemindSave}
                // onSetRemindSaveType={this.props.onSetRemindSaveType}
                // isRemindSave={this.props.isRemindSave}
                // isStartUpForHomePage={this.props.isStartUpForHomePage}
                // onToLoginTimeout={this.handleToLoginTimeout}
                // isProjectSaved={this.props.isProjectSaved}
                // onSetShowLoadingProject={this.props.onSetShowLoadingProject}
                // loadingState={this.props.loadingState}
                // onOpenSelectedProject={this.props.onOpenSelectedProject}
            />
        )

        
        
        return homeTipsLibrary;
    }
    
}

ZwbCourseSidePane.propTypes = {
    // intl: intlShape.isRequired,
    // onActivateDeck: PropTypes.func.isRequired,
    // onRequestClose: PropTypes.func,
    // visible: PropTypes.bool
};

const mapStateToProps = state => ({
    // visible: state.scratchGui.modals.tipsLibrary,
    // authInfo: state.scratchGui.loginRegister.authInfo,
    // loginStatus: state.scratchGui.loginRegister.loginStatus,
    // loadingState: state.scratchGui.projectState.loadingState,
    // vm: state.scratchGui.vm,
    // isRemindSave: state.scratchGui.material.isRemindSave,
    // isProjectSaved: state.scratchGui.material.isProjectSaved,
});

const mapDispatchToProps = dispatch => ({
    // onActivateDeck: id => dispatch(activateDeck(id)),
    // onRequestClose: () => dispatch(closeTipsLibrary()),
    // onLoadingFinished: loadingState => {
    //     dispatch(onLoadedProject(loadingState));
    //     dispatch(closeEpcsLibrary());
    //     dispatch(closeLoadingProject());
    // },
    // onSetProjectTitle: title => dispatch(setProjectTitle(title)),
    // onLoadingStarted: () => {
    //     dispatch(openLoadingProject());
    //     dispatch(onProjectUploadStarted());
    // },
    // onSetFileInfo: file => dispatch(setFileInfo(file)),
    // onSetProjectItem: item => dispatch(setProjectItem(item)),
    // onSetRemindSave: bool => dispatch(setRemindSave(bool)),
    // onSetRemindSaveType: type => dispatch(setRemindSaveType(type)),
    // onSetUserTab: tab => dispatch(setUserTab(tab)),
    // onSetShowLoadingProject: bool => dispatch(setShowLoadingProject(bool)),

});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ZwbCourseSidePane));
