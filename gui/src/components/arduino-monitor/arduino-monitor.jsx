import React from 'react'
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';


import styles from './arduino-monitor.css';
import { setIsScroll, setIsShowTime, setBaudRate, setVisible } from '../../reducers/arduino-monitor';

import dropdown from '../../lib/base/dropdown.js';
import Modal from '../../containers/modal.jsx';
import Sender from './sender.jsx';
import SerialShow from './serial-show.jsx';
import ControlBar from './control-bar.jsx';

const localMessages = defineMessages({
    baudRateText: {
        id: 'gui.arduinoMonitor.baudRateText',
        defaultMessage: 'Baud rate',
        description: ''
    }
});

class Monitor extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'onScroll',
            'onShowTime',
            'onClear',
            'setSerialShow',
            'onChangeBaud',
            'onOpen',
            'onClose',
            'handleResponse',
            'sendMessage'
        ]);
        this.serialShowEl = null;
        this.timeStamp = (new Date).valueOf();
        this.text = '';
    }

    componentDidMount() {
        this.props.vm.on('response', this.handleResponse);
        this.props.vm.deviceEngine.updateBaudRate(this.props.baudRate);
    }

    componentWillUnmount() {
        this.props.vm.removeListener('response', this.handleResponse);
    }

    sendMessage(msg) {
        this.props.vm.deviceEngine.write(msg);
    }

    handleResponse(data) {
        data = data.toString();
        if (this.props.isShowTime) {
            this.text += data.replace(/\n/g, `\n${(new Date).toLocaleTimeString()} : `);
        } else {
            this.text += data;
        }
        

        if ((new Date).valueOf() - this.timeStamp < 50) return;

        let index = data.lastIndexOf('\n');

        if (index < 0) this.text += '\n';;

        // let text = this.text.substr(0, index + 1);
        // this.text = this.text.substr(index + 1);

        // let textNode = document.createTextNode(text);
        // this.serialShowEl.appendChild(textNode);
        this.serialShowEl.innerText = this.text;
        this.timeStamp = (new Date).valueOf();

        if (this.props.isScroll) {
            this.serialShowEl.scrollTop = this.serialShowEl.scrollHeight;
        }
    }

    onOpen() {
        this.props.setVisible(true);
    }

    onClose() {
        this.props.setVisible(false);
    }

    onScroll() {
        this.props.setIsScroll(!this.props.isScroll);
    }

    onShowTime() {
        this.props.setIsShowTime(!this.props.isShowTime);
    }

    setSerialShow(el) {
        this.serialShowEl = el;
    }

    onClear() {
        this.serialShowEl.innerText = '';
    }

    onChangeBaud(e) {
        let baudRateText = this.props.intl.formatMessage(localMessages.baudRateText);

        let list = [
            { value: 9600, label: `9600 ${baudRateText}` },
            { value: 300, label: `300 ${baudRateText}` },
            { value: 1200, label: `1200 ${baudRateText}` },
            { value: 4800, label: `4800 ${baudRateText}` },
            { value: 14400, label: `14400 ${baudRateText}` },
            { value: 19200, label: `19200 ${baudRateText}` },
            { value: 28800, label: `28800 ${baudRateText}` },
            { value: 38400, label: `38400 ${baudRateText}` },
            { value: 57600, label: `57600 ${baudRateText}` },
            { value: 115200, label: `115200 ${baudRateText}` }
        ];

        let boxStyle =
            'color:#717582;' +
            'font-size:0.75rem;' +
            'border-radius: 0.75rem;' +
            'border: 2px solid rgba(222, 227, 232, 1);' +
            'background-color: #fff;';
        let itemStyle =
            'height:1.5rem;' +
            'padding-left:1rem;' +
            'line-height:1.5rem;' +
            'box-sizing:border-box;' +
            'cursor:pointer;';

        let itemHoverStyle =
            'background-color:rgba(23,152,255,0.2);' +
            'color:#4A9CF0;';

        dropdown.setBoxStyle(boxStyle);
        dropdown.setMenuItemStyle(itemStyle);
        dropdown.setMenuItemHoverStyle(itemHoverStyle);

        let bounding = e.target.getBoundingClientRect();

        dropdown.show({
            list: list,
            width: bounding.width - 2 + 'px',
            top: bounding.top + bounding.height + 'px',
            left: bounding.left + 2 + 'px',
            maxHeight: '6rem',

            onSelect: (args) => {
                this.props.setBaudRate(args.value);
                this.props.vm.deviceEngine.updateBaudRate(args.value);
            }
        });
    }


    render() {

        return (
            <Modal
                id={'arduino-monitor'}
                contentLabel={'arduino-monitor'}
                isOpen={true}
                showClose={true}
                onRequestClose={this.onClose}
            >
                <div className={classNames(styles.modal)}>
                    <div className={classNames(styles.title)}>
                        <FormattedMessage
                            defaultMessage='Serial Monitor'
                            description=''
                            id='gui.arduinoMonitor.title'
                        />

                    </div>

                    <Sender
                        {...this.props}
                        sendMessage={this.sendMessage}
                    />
                    <SerialShow
                        {...this.props}
                        setSerialShow={this.setSerialShow}
                    />
                    <ControlBar
                        {...this.props}
                        onScroll={this.onScroll}
                        onShowTime={this.onShowTime}
                        onClear={this.onClear}
                        onChangeBaud={this.onChangeBaud}
                    />
                </div>
            </Modal>
        );
    }

}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    isScroll: state.scratchGui.arduinoMonitor.isScroll,
    isShowTime: state.scratchGui.arduinoMonitor.isShowTime,
    baudRate: state.scratchGui.arduinoMonitor.baudRate
});

const mapDispatchToProps = dispatch => ({
    setIsScroll: isScroll => dispatch(setIsScroll(isScroll)),
    setIsShowTime: isShowTime => dispatch(setIsShowTime(isShowTime)),
    setBaudRate: baudRate => dispatch(setBaudRate(baudRate)),
    setVisible: visible => dispatch(setVisible(visible))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Monitor));