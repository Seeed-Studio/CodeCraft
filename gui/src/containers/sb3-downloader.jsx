import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';

/**
 * Project saver component passes a downloadProject function to its child.
 * It expects this child to be a function with the signature
 *     function (downloadProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <SB3Downloader>{(downloadProject, props) => (
 *     <MyCoolComponent
 *         onClick={downloadProject}
 *         {...props}
 *     />
 * )}</SB3Downloader>
 */
class SB3Downloader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'downloadProject'
        ]);
    }
    downloadProject() {
        const { localProjectPath } = this.props;
        let projectNameSuffix = '';
        if (localProjectPath) {
            let fullProjectName = localProjectPath.slice(localProjectPath.lastIndexOf('/') + 1);
            fullProjectName = fullProjectName.slice(fullProjectName.lastIndexOf('\\') + 1);
            projectNameSuffix = fullProjectName.substring(fullProjectName.lastIndexOf('.'));
        }


        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            // Use special ms version if available to get it working on Edge.
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(content, this.props.projectFilename + (projectNameSuffix === '.sb3' ? '.sb3' : '.cdc'));
                return;
            }

            const url = window.URL.createObjectURL(content);
            downloadLink.href = url;
            downloadLink.download = this.props.projectFilename + (projectNameSuffix === '.sb3' ? '.sb3' : '.cdc');
            downloadLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(downloadLink);
        });
    }
    render() {
        const {
            children
        } = this.props;
        return children(
            this.downloadProject
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}`;
};

SB3Downloader.propTypes = {
    children: PropTypes.func,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SB3Downloader);
