import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import { FormattedMessage,defineMessages,injectIntl } from 'react-intl';
import classNames from 'classnames';
import styles from './meteostation-modal.css';
import sensing from './image/sensing.png';
import cancel from './image/cancel.png';

import {
    closeMeteostationModal,
} from '../../reducers/modals';


class MeteostationModal extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'meteostationCallback',
            'handleClose'
        ]);

        this.state = {
            temp:0,
            hum:0,
            bp:0
        }
        props.vm.runtime.meteostationMode.setMeteostationCallback(this.meteostationCallback)
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }
    handleClose() {
        this.props.closeMeteostationModalState();
    }

    meteostationCallback(temperature,humidity,pressure) {
        this.setState({
            temp:temperature,
            hum:humidity,
            bp:pressure
        })
    }

    render() {
        const {
            hidden,
        } = this.props;

        const {
            temp,
            hum,
            bp
        } = this.state;

        return (
            <div className={styles.modal} style={{display:hidden?"none":"block"}}>
                <img src={sensing}></img>
                <img className={styles.cancel} src={cancel} onClick={this.handleClose}></img>
                <div className={styles.numericalValue}>
                    <div className={styles.tempList}>
                        <div className={styles.tempName}>TEMP</div>
                        <div className={styles.tempValue}>{temp}</div>
                        <div className={styles.tempDw}>℃</div>

                    </div>
                    <div className={styles.valueList}>
                    <div className={styles.humList}>
                            <div className={styles.humName}>HUM</div>
                            <div className={styles.humValue}>{hum}</div>
                            <div className={styles.humDw}>%</div>

                        </div>
                        <div className={styles.bpList}>
                            <div className={styles.bpName}>BP</div>
                            <div className={styles.bpValue}>{bp}</div>
                            <div className={styles.bpDw}>Pa</div>
                        </div>

                    </div>
                </div>                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    closeMeteostationModalState: () => {
        dispatch(closeMeteostationModal());
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(MeteostationModal));
