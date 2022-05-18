import React from 'react'
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import { setIsScroll, setIsShowTime, setBaudRate } from '../reducers/arduino-monitor';

class Monitor extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'onScroll',
            'onShowTime',
            'onClear',
            'setSerialShow',
            'onChangeBaud'
        ]);
        this.serialShowEl = null;
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
        // ipcRenderer.send('update-baud-rate', { baudRate: parseInt(e.target.value) });
        setBaudRate(e.target.value);
    }

    render() {
        return (
            <MonitorComponent
                onScroll={this.onScroll}
                onShowTime={this.onShowTime}
                onClear={this.onClear}
                setSerialShow={this.setSerialShow}
                onChangeBaud={this.onChangeBaud}
                {...this.props}
            />);
    }

}

const mapStateToProps = state => ({
    isScroll: state.monitor.isScroll,
    isShowTime: state.monitor.isShowTime,
    baudRate: state.monitor.baudRate
});

const mapDispatchToProps = dispatch => ({
    setIsScroll: isScroll => dispatch(setIsScroll(isScroll)),
    setIsShowTime: isShowTime => dispatch(setIsShowTime(isShowTime)),
    setBaudRate: baudRate => dispatch(setBaudRate(baudRate))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Monitor);