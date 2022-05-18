const JSONRPCWebSocket = require('../util/jsonrpc-web-socket');
const ScratchLinkWebSocket = 'wss://device-manager.scratch.mit.edu:20110/scratch/bt';
// const log = require('../util/log');

class BT extends JSONRPCWebSocket {

    /**
     * A BT peripheral socket object.  It handles connecting, over web sockets, to
     * BT peripherals, and reading and writing data to them.
     * @param {Runtime} runtime - the Runtime for sending/receiving GUI update events.
     * @param {string} extensionId - the id of the extension using this socket.
     * @param {object} peripheralOptions - the list of options for peripheral discovery.
     * @param {object} connectCallback - a callback for connection.
     * @param {object} messageCallback - a callback for message sending.
     */
    constructor (runtime, extensionId, peripheralOptions, connectCallback, messageCallback) {
        const ws = new WebSocket(ScratchLinkWebSocket);
        super(ws);

        this._ws = ws;
        this._ws.onopen = this.requestPeripheral.bind(this); // only call request peripheral after socket opens
        this._ws.onerror = this._sendError.bind(this, 'ws onerror');
        this._ws.onclose = this._sendError.bind(this, 'ws onclose');

        this._availablePeripherals = {};
        this._connectCallback = connectCallback;
        this._connected = false;
        this._characteristicDidChangeCallback = null;
        this._extensionId = extensionId;
        this._peripheralOptions = peripheralOptions;
        this._discoverTimeoutID = null;
        this._messageCallback = messageCallback;
        this._runtime = runtime;
    }

    /**
     * Request connection to the peripheral.
     * If the web socket is not yet open, request when the socket promise resolves.
     */
    requestPeripheral () {
        if (this._ws.readyState === 1) { // is this needed since it's only called on ws.onopen?
            this._availablePeripherals = {};
            this._discoverTimeoutID = window.setTimeout(this._sendDiscoverTimeout.bind(this), 15000);
            this.sendRemoteRequest('discover', this._peripheralOptions)
                .catch(e => this._sendError(e)); // never reached?
        }
        // TODO: else?
    }

    /**
     * Try connecting to the input peripheral id, and then call the connect
     * callback if connection is successful.
     * @param {number} id - the id of the peripheral to connect to
     */
    connectPeripheral (id) {
        this.sendRemoteRequest('connect', {peripheralId: id})
            .then(() => {
                this._connected = true;
                this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
                this._connectCallback();
            })
            .catch(e => {
                this._sendError(e);
            });
    }

    /**
     * Close the websocket.
     */
    disconnect () {
        this._ws.close();
        this._connected = false;
    }

    /**
     * @return {bool} whether the peripheral is connected.
     */
    isConnected () {
        return this._connected;
    }

    sendMessage (options) {
        return this.sendRemoteRequest('send', options)
            .catch(e => {
                this._sendError(e);
            });
    }

    /**
     * Handle a received call from the socket.
     * @param {string} method - a received method label.
     * @param {object} params - a received list of parameters.
     * @return {object} - optional return value.
     */
    didReceiveCall (method, params) {
        // TODO: Add peripheral 'undiscover' handling
        switch (method) {
        case 'didDiscoverPeripheral':
            this._availablePeripherals[params.peripheralId] = params;
            this._runtime.emit(
                this._runtime.constructor.PERIPHERAL_LIST_UPDATE,
                this._availablePeripherals
            );
            if (this._discoverTimeoutID) {
                // TODO: window?
                window.clearTimeout(this._discoverTimeoutID);
            }
            break;
        case 'didReceiveMessage':
            this._messageCallback(params); // TODO: refine?
            break;
        default:
            return 'nah';
        }
    }

    _sendError (/* e */) {
        if (this._connected) this.disconnect();
        // log.error(`BT error: ${JSON.stringify(e)}`);
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_ERROR, {
            message: `Scratch lost connection to`,
            extensionId: this._extensionId
        });
    }

    _sendDiscoverTimeout () {
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
    }
}

module.exports = BT;
