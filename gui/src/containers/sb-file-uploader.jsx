import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { toasts } from '../components/toast-special/toast.jsx';

import analytics from '../lib/analytics';
import log from '../lib/log';
import { setProjectTitle } from '../reducers/project-title';
import { LoadingStates, onLoadedProject, onProjectUploadStarted } from '../reducers/project-state';
import { setProjectItem, setRemindSave, setRemindSaveType, setShowLoadingProject } from '../reducers/material-special';

import {
    openLoadingProject,
    closeLoadingProject,
    closeEpcsLibrary
} from '../reducers/modals';

/**
 * SBFileUploader component passes a file input, load handler and props to its child.
 * It expects this child to be a function with the signature
 *     function (renderFileInput, loadProject) {}
 * The component can then be used to attach project loading functionality
 * to any other component:
 *
 * <SBFileUploader>{(renderFileInput, loadProject) => (
 *     <MyCoolComponent
 *         onClick={loadProject}
 *     >
 *         {renderFileInput()}
 *     </MyCoolComponent>
 * )}</SBFileUploader>
 */

const localeMessages = defineMessages({
    loadError: {
        id: 'gui.projectLoader.loadError',
        defaultMessage: 'The project file that was selected failed to load.',
        description: 'An error that displays when a local project file fails to load.'
    },
    projectFileSupport: {
        id: 'gui.toasts.projectFileSupport',
        defaultMessage: 'Can only open .cdc, sb3 files',
    }
});

class SBFileUploader extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'renderFileInput',
            'setFileInput',
            'handleChange',
            'handleClick'
        ]);
        this.state = {
            abc: '000-'
        }
    }
    // called when user has finished selecting a file to upload
    handleChange(e) {
        history.replaceState({}, document.title, '.');
        if (e.currentTarget
            && e.currentTarget.files[0]) {
            const fileName = e.currentTarget.files[0].name;
            if (!(fileName.indexOf('.cdc') !== -1 ||
                fileName.indexOf('.sb3') !== -1)) {
                toasts.error(this.props.intl.formatMessage(localeMessages.projectFileSupport));
                return;
            }
        }
        // 判断当前项目是否保存，true--已保存，直接打开选择的文件
        // Determine if the current project has been saved. If saved, open the selected file directly
        if (this.props.isProjectSaved) {
            this.props.onSetProjectItem(e.target);
            this.props.onOpenLocalSelectedProject(e.target);
            if (this.props.onRequestClose) {
                this.props.onRequestClose();
            }
        } else {
            // false--未保存，打开保存提示弹框  Not saved, open save reminder modal
            this.props.onSetProjectItem(e.target);
            this.props.onSetRemindSave(true);
            this.props.onSetRemindSaveType('openLocalProject');
        }
    }
    handleClick() {
        // open filesystem browsing window
        this.fileInput.value = null;
        this.fileInput.click();
    }
    setFileInput(input) {
        this.fileInput = input;
    }
    renderFileInput() {
        return (
            <input
                accept=".cdc,.sb3"
                ref={this.setFileInput}
                style={{ display: 'none' }}
                type="file"
                onChange={this.handleChange}
            />
        );
    }
    render() {
        return this.props.children(this.renderFileInput, this.handleClick);
    }
}

SBFileUploader.propTypes = {
    children: PropTypes.func,
    intl: intlShape.isRequired,
    loadingState: PropTypes.oneOf(LoadingStates),
    onLoadingFinished: PropTypes.func,
    onLoadingStarted: PropTypes.func,
    onSetProjectTitle: PropTypes.func,
    vm: PropTypes.shape({
        loadProject: PropTypes.func
    })
};
const mapStateToProps = state => ({
    loadingState: state.scratchGui.projectState.loadingState,
    vm: state.scratchGui.vm,
    isProjectSaved: state.scratchGui.material.isProjectSaved,
});

const mapDispatchToProps = dispatch => ({
    onLoadingFinished: loadingState => {
        // dispatch(onLoadedProject(loadingState));
        dispatch(closeEpcsLibrary());
        dispatch(closeLoadingProject());
    },
    onSetProjectTitle: title => dispatch(setProjectTitle(title)),
    onLoadingStarted: () => {
        dispatch(openLoadingProject());
        dispatch(onProjectUploadStarted());
    },
    onSetRemindSave: bool => dispatch(setRemindSave(bool)),
    onSetRemindSaveType: type => dispatch(setRemindSaveType(type)),
    onSetProjectItem: item => dispatch(setProjectItem(item)),
    onSetShowLoadingProject: bool => dispatch(setShowLoadingProject(bool)),


});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(SBFileUploader));
