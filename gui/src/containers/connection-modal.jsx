import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ConnectionModalComponent, {PHASES} from '../components/connection-modal/connection-modal.jsx';
import VM from '../../../vm/';
import analytics from '../lib/analytics';

class ConnectionModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleScanning',
            'handleConnected',
            'handleConnecting',
            'handleDisconnect',
            'handleError',
            'handleHelp'
        ]);
        this.state = {
            phase: props.vm.getPeripheralIsConnected(props.extensionId) ?
                PHASES.connected : PHASES.scanning
        };
    }
    componentDidMount () {
        this.props.vm.on('PERIPHERAL_CONNECTED', this.handleConnected);
        this.props.vm.on('PERIPHERAL_ERROR', this.handleError);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('PERIPHERAL_CONNECTED', this.handleConnected);
        this.props.vm.removeListener('PERIPHERAL_ERROR', this.handleError);
    }
    handleScanning () {
        this.setState({
            phase: PHASES.scanning
        });
    }
    handleConnecting (peripheralId) {
        this.props.vm.connectPeripheral(this.props.extensionId, peripheralId);
        this.setState({
            phase: PHASES.connecting
        });
        analytics.event({
            category: 'extensions',
            action: 'connecting',
            label: this.props.extensionId
        });
    }
    handleDisconnect () {
        this.props.onStatusButtonUpdate(this.props.extensionId, 'not ready');
        this.props.vm.disconnectPeripheral(this.props.extensionId);
        this.props.onCancel();
    }
    handleCancel () {
        // If we're not connected to a peripheral, close the websocket so we stop scanning.
        if (!this.props.vm.getPeripheralIsConnected(this.props.extensionId)) {
            this.props.vm.disconnectPeripheral(this.props.extensionId);
        }
        this.props.onCancel();
    }
    handleError () {
        this.props.onStatusButtonUpdate();
        // Assume errors that come in during scanning phase are the result of not
        // having scratch-link installed.
        if (this.state.phase === PHASES.scanning || this.state.phase === PHASES.unavailable) {
            this.setState({
                phase: PHASES.unavailable
            });
        } else {
            this.setState({
                phase: PHASES.error
            });
            analytics.event({
                category: 'extensions',
                action: 'connecting error',
                label: this.props.extensionId
            });
        }
    }
    handleConnected () {
        this.props.onStatusButtonUpdate();
        this.setState({
            phase: PHASES.connected
        });
        analytics.event({
            category: 'extensions',
            action: 'connected',
            label: this.props.extensionId
        });
    }
    handleHelp () {
        let vm = this.props.vm
        if (vm) {
            vm.deviceEngine.sendWindowMessage({
                action: 'open-document',
                args: {
                    url: this.props.helpLink
                }
            });
        }
        analytics.event({
            category: 'extensions',
            action: 'help',
            label: this.props.extensionId
        });
    }
    render () {
        return (
            <ConnectionModalComponent
                connectingMessage={this.props.connectingMessage}
                extensionId={this.props.extensionId}
                name={this.props.name}
                peripheralButtonImage={this.props.peripheralButtonImage}
                peripheralImage={this.props.peripheralImage}
                phase={this.state.phase}
                smallPeripheralImage={this.props.smallPeripheralImage}
                title={this.props.extensionId}
                useAutoScan={this.props.useAutoScan}
                vm={this.props.vm}
                onCancel={this.props.onCancel}
                onConnected={this.handleConnected}
                onConnecting={this.handleConnecting}
                onDisconnect={this.handleDisconnect}
                onHelp={this.handleHelp}
                onScanning={this.handleScanning}
            />
        );
    }
}

ConnectionModal.propTypes = {
    connectingMessage: PropTypes.node.isRequired,
    extensionId: PropTypes.string.isRequired,
    helpLink: PropTypes.string.isRequired,
    name: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
    onStatusButtonUpdate: PropTypes.func.isRequired,
    peripheralButtonImage: PropTypes.string,
    peripheralImage: PropTypes.string.isRequired,
    smallPeripheralImage: PropTypes.string.isRequired,
    useAutoScan: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ConnectionModal;
