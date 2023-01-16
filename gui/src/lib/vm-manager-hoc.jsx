import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import VM from '../../../vm/';
import AudioEngine from 'scratch-audio';

import {
    LoadingStates,
    onLoadedProject,
    getIsLoadingWithId,
    setIsNeedNewProject
} from '../reducers/project-state';

import {
    activateTab,
    BLOCKS_TAB_INDEX,
} from '../reducers/editor-tab';

import {
    initPhysicalDevicesState,
} from '../reducers/physical-device';

import {
    MODE_ONLINE,
    MODE_OFFLINE,
    activateMode,
} from '../reducers/debug-mode';

import {
    openTrainVideoModal,
    openRecognizeVideoModal,
} from '../reducers/modals';

import ModelsControl from './models-control/models-control'

import TrainMode from './train-mode/train-mode'
import RecognizeMode from './recognize-mode/recognize-mode'
import AccelerometerMode from './accelerometer-mode/accelerometer-mode'
import MeteostationMode from './meteostation-mode/meteostation-mode'
import CreateSkillMode from './createSkill-mode/createSkill-mode'
import CailbrateMode from './cailbrate-mode/cailbrate-mode'


/*
 * Higher Order Component to manage events emitted by the VM
 * @param {React.Component} WrappedComponent component to manage VM events for
 * @returns {React.Component} connected component with vm events bound to redux
 */
const vmManagerHOC = function (WrappedComponent) {
    class VMManager extends React.Component {
        constructor(props) {
            super(props);
            bindAll(this, [
                'loadProject'
            ]);
            this.state = {
                loadingError: false,
                errorMessage: ''
            };
        }
        componentDidMount() {
            if (this.props.vm.initialized) return;
            this.audioEngine = new AudioEngine();
            this.props.vm.attachAudioEngine(this.audioEngine);
            this.trainMode = new TrainMode();
            this.trainMode.blockOnclick = ()=>{
                this.props.openTrainVideoModalState();
            }
            this.props.vm.attachTrainMode(this.trainMode);
            this.recognizeMode = new RecognizeMode();
            this.recognizeMode.blockOnclick = ()=>{
                this.props.openRecognizeVideoModalState();
            }
            this.props.vm.attachRecognizeMode(this.recognizeMode);

            this.accelerometerMode = new AccelerometerMode();
            this.props.vm.attachAccelerometerMode(this.accelerometerMode);
            this.meteostationMode = new MeteostationMode();
            this.props.vm.attachMeteostationMode(this.meteostationMode);
            this.createSkillMode = new CreateSkillMode();
            this.props.vm.attachCreateSkillMode(this.createSkillMode);
            this.cailbrateMode = new CailbrateMode();
            this.props.vm.attachCalibrateServosMode(this.cailbrateMode);

            this.props.vm.setCompatibilityMode(true);
            this.modelsCtrl = new ModelsControl();
            this.props.vm.attachModelsControl(this.modelsCtrl);
            if (!this.props.isStarted) {
                this.props.vm.start();
            }
            this.props.vm.initialized = true;
        }
        componentDidUpdate(prevProps) {
            if ((this.props.isLoadingWithId && !prevProps.isLoadingWithId) || this.props.isNeedNewProject) {
                // if(!this.props.isFirstStart){
                //     this.props.onSetIsNeedNewProject(false);
                //     this.loadProject(this.props.projectData, this.props.loadingState);    
                // }
                this.loadProject(this.props.projectData, this.props.loadingState);
                this.props.initDevicesState();
                this.props.activateMode(MODE_OFFLINE);
            }
            // Start the VM if entering editor mode with an unstarted vm
            if (!this.props.isStarted) {
                this.props.vm.start();
            }
        }
        loadProject(projectData, loadingState) {
            return this.props.vm.loadProject(projectData)
                .then(() => {
                    setTimeout(() => {
                        this.props.onLoadedProject(loadingState);
                        this.props.onActivateTab(BLOCKS_TAB_INDEX);
                        // this.props.vm.addDevice(devices[0]);
                        // If the vm is not running, call draw on the renderer manually
                        // This draws the state of the loaded project with no blocks running
                        // which closely matches the 2.0 behavior, except for monitors�C
                        // 2.0 runs monitors and shows updates (e.g. timer monitor)
                        // before the VM starts running other hat blocks.
                        if (!this.props.isStarted) {
                            this.props.vm.renderer.draw();
                        }
                    }, 800);
                })
                .catch(e => {
                    // Need to catch this error and update component state so that
                    // error page gets rendered if project failed to load
                    this.setState({ loadingError: true, errorMessage: e });
                });
        }
        render() {
            const {
                /* eslint-disable no-unused-vars */
                isStarted,
                onLoadedProject: onLoadedProjectProp,
                projectData,
                projectId,
                loadingState,
                activateMode,
                initDevicesState,
                onActivateTab,
                // isFirstStart,
                isNeedNewProject,
                onSetIsNeedNewProject,
                /* eslint-enable no-unused-vars */
                isLoadingWithId: isLoadingWithIdProp,
                openTrainVideoModalState,
                openRecognizeVideoModalState,
                vm,
                ...componentProps
            } = this.props;
            // don't display anything until we have data loaded
            if (!this.props.projectData) {
                return null;
            }
            return (
                <WrappedComponent
                    errorMessage={this.state.errorMessage}
                    isLoading={isLoadingWithIdProp}
                    loadingError={this.state.loadingError}
                    vm={vm}
                    {...componentProps}
                />
            );
        }
    }

    VMManager.propTypes = {
        isLoadingWithId: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onLoadedProject: PropTypes.func,
        projectData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        vm: PropTypes.instanceOf(VM).isRequired
    };

    const mapStateToProps = state => {
        const loadingState = state.scratchGui.projectState.loadingState;
        return {
            isLoadingWithId: getIsLoadingWithId(loadingState),
            projectData: state.scratchGui.projectState.projectData,
            projectId: state.scratchGui.projectState.projectId,
            loadingState: loadingState,
            isStarted: state.scratchGui.vmStatus.started,
            isAiModelLoading: state.scratchGui.projectState.isAiModelLoading,
            // isFirstStart: state.scratchGui.projectState.isFirstStart,
            isNeedNewProject: state.scratchGui.projectState.isNeedNewProject,
        };
    };

    const mapDispatchToProps = dispatch => ({
        activateMode: (mode) => dispatch(activateMode(mode)),
        onLoadedProject: loadingState => dispatch(onLoadedProject(loadingState)),
        initDevicesState: () => dispatch(initPhysicalDevicesState()),
        onActivateTab: (index) =>{
            dispatch(activateTab(index));
        },
        onSetIsNeedNewProject: (isNeedNewProject) => {
            dispatch(setIsNeedNewProject(isNeedNewProject));
        },
        openTrainVideoModalState: () => {
            dispatch(openTrainVideoModal());
        },
        openRecognizeVideoModalState: () => {
            dispatch(openRecognizeVideoModal());
        },
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(VMManager);
};

export default vmManagerHOC;
