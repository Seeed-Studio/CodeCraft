import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from '../../../vm/';

import {connect} from 'react-redux';

import {updateTargets} from '../reducers/targets';
import {updateBlockDrag} from '../reducers/block-drag';
import {updateMonitors} from '../reducers/monitors';
import {setRunningState, setTurboState, setStartedState} from '../reducers/vm-status';
import {showAlert} from '../reducers/alerts';
import {updateMicIndicator} from '../reducers/mic-indicator';

import {
    activateTab,
} from '../reducers/main-tab';

import {
    MODE_ONLINE,
    MODE_OFFLINE,
    activateMode,
} from '../reducers/debug-mode';

import {
    initPhysicalDevicesState,
    updatePhysicalDeviceFeaturedState,
} from '../reducers/physical-device';

import {
    updateAiModelLoadingState
} from '../reducers/project-state';

/*
 * Higher Order Component to manage events emitted by the VM
 * @param {React.Component} WrappedComponent component to manage VM events for
 * @returns {React.Component} connected component with vm events bound to redux
 */
const vmListenerHOC = function (WrappedComponent) {
    class VMListener extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleKeyDown',
                'handleKeyUp',
                'handleDevicesUpdate'
            ]);
            // We have to start listening to the vm here rather than in
            // componentDidMount because the HOC mounts the wrapped component,
            // so the HOC componentDidMount triggers after the wrapped component
            // mounts.
            // If the wrapped component uses the vm in componentDidMount, then
            // we need to start listening before mounting the wrapped component.
            this.props.vm.on('deviceIdsUpdate', this.handleDevicesUpdate)
            this.props.vm.on('targetsUpdate', this.props.onTargetsUpdate);
            this.props.vm.on('tabIndexUpdate', this.props.onTabIndexUpdate)
            this.props.vm.on('MONITORS_UPDATE', this.props.onMonitorsUpdate);
            this.props.vm.on('BLOCK_DRAG_UPDATE', this.props.onBlockDragUpdate);
            this.props.vm.on('TURBO_MODE_ON', this.props.onTurboModeOn);
            this.props.vm.on('TURBO_MODE_OFF', this.props.onTurboModeOff);
            this.props.vm.on('PROJECT_RUN_START', this.props.onProjectRunStart);
            this.props.vm.on('PROJECT_RUN_STOP', this.props.onProjectRunStop);
            this.props.vm.on('RUNTIME_STARTED', this.props.onRuntimeStarted);
            this.props.vm.on('PERIPHERAL_ERROR', this.props.onShowAlert);
            this.props.vm.on('MIC_LISTENING', this.props.onMicListeningUpdate);
            this.props.vm.on('EVENT_AI_MODELS_LOADINGSTAE_CHANGED', this.props.updateAiModelLoadingState)
        }
        componentDidMount () {
            if (this.props.attachKeyboardEvents) {
                document.addEventListener('keydown', this.handleKeyDown);
                document.addEventListener('keyup', this.handleKeyUp);
            }
            this.props.vm.postIOData('userData', {username: this.props.username});
        }
        componentWillReceiveProps (newProps) {
            if (newProps.username !== this.props.username) {
                this.props.vm.postIOData('userData', {username: newProps.username});
            }
        }
        componentWillUnmount () {
            if (this.props.attachKeyboardEvents) {
                document.removeEventListener('keydown', this.handleKeyDown);
                document.removeEventListener('keyup', this.handleKeyUp);
            }
        }
        handleKeyDown (e) {
            // Don't capture keys intended for Blockly inputs.
            if (e.target !== document && e.target !== document.body) return;

            this.props.vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                key: e.key,
                isDown: true
            });
        }
        handleKeyUp (e) {
            // Always capture up events,
            // even those that have switched to other targets.
            this.props.vm.postIOData('keyboard', {
                keyCode: e.keyCode,
                key: e.key,
                isDown: false
            });

            // E.g., prevent scroll.
            if (e.target !== document && e.target !== document.body) {
                e.preventDefault();
            }
        }

        handleDevicesUpdate(ids) {
            this.props.activateMode(MODE_OFFLINE);
            this.props.initDevicesState();
            if (!ids || ids.length === 0) return;
            ids.forEach(element => {
                this.props.onUpdateDeviceState(element, true);
            });
        }

        render () {
            const {
                /* eslint-disable no-unused-vars */
                attachKeyboardEvents,
                username,
                onBlockDragUpdate,
                onKeyDown,
                onKeyUp,
                onMicListeningUpdate,
                onMonitorsUpdate,
                onTargetsUpdate,
                onProjectRunStart,
                onProjectRunStop,
                onRuntimeStarted,
                onTurboModeOff,
                onTurboModeOn,
                onShowAlert,
                initDevicesState,
                onUpdateDeviceState,
                activateMode,
                updateAiModelLoadingState,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return <WrappedComponent {...props} />;
        }
    }
    VMListener.propTypes = {
        attachKeyboardEvents: PropTypes.bool,
        onBlockDragUpdate: PropTypes.func.isRequired,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        onMicListeningUpdate: PropTypes.func.isRequired,
        onMonitorsUpdate: PropTypes.func.isRequired,
        onProjectRunStart: PropTypes.func.isRequired,
        onProjectRunStop: PropTypes.func.isRequired,
        onRuntimeStarted: PropTypes.func.isRequired,
        onTargetsUpdate: PropTypes.func.isRequired,
        onTurboModeOff: PropTypes.func.isRequired,
        onTurboModeOn: PropTypes.func.isRequired,
        username: PropTypes.string,
        vm: PropTypes.instanceOf(VM).isRequired
    };
    VMListener.defaultProps = {
        attachKeyboardEvents: true
    };
    const mapStateToProps = state => ({
        vm: state.scratchGui.vm,
        username: state.session && state.session.session && state.session.session.user ?
            state.session.session.user.username : ''
    });
    const mapDispatchToProps = dispatch => ({
        onTargetsUpdate: data => {
            dispatch(updateTargets(data.targetList, data.editingTarget));
        },
        onMonitorsUpdate: monitorList => {
            dispatch(updateMonitors(monitorList));
        },
        onBlockDragUpdate: areBlocksOverGui => {
            dispatch(updateBlockDrag(areBlocksOverGui));
        },
        onProjectRunStart: () => dispatch(setRunningState(true)),
        onProjectRunStop: () => dispatch(setRunningState(false)),
        onRuntimeStarted: () => dispatch(setStartedState(true)),
        onTurboModeOn: () => dispatch(setTurboState(true)),
        onTurboModeOff: () => dispatch(setTurboState(false)),
        onShowAlert: data => {
            dispatch(showAlert(data));
        },
        onMicListeningUpdate: listening => {
            dispatch(updateMicIndicator(listening));
        },
        onTabIndexUpdate: (index) =>{
            dispatch(activateTab(index));
        },
        onUpdateDeviceState: (id, featured) => {
            dispatch(updatePhysicalDeviceFeaturedState(id, featured));
        },
        initDevicesState: () =>{ 
            dispatch(initPhysicalDevicesState())
        },
        activateMode: (mode) => dispatch(activateMode(mode)),
        updateAiModelLoadingState: (state) => dispatch(updateAiModelLoadingState(state)),
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(VMListener);
};

export default vmListenerHOC;
