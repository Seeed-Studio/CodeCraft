import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import { FormattedMessage,defineMessages,injectIntl } from 'react-intl';
import classNames from 'classnames';
import styles from './cailbrate-modal.css';
import {
    closeCailbrateModal,
} from '../../reducers/modals';
import CailbrateItem from '../cailbrate-item/cailbrate-item.jsx'
class CailbrateModal extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
            'cailbrateCallback',
            'handleClose'
        ]);

        this.state = {
            checkFromData:{
                LeftForelegUpperNum:75,     // 右前腿上关节
                LeftForelegLowerNum:-20,    // 右前腿下关节
    
                RightForelegUpperNum:60,    // 左前腿上关节
                RightForelegLowerNum:-30,   // 左前腿下关节
                
                LeftHindlegUpperNum:75,     // 右后腿上关节
                LeftHindlegLowerNum:-15,    // 右后腿下关节
    
                RightHindlegUpperNum:60,    // 左后腿上关节
                RightHindlegLowerNum:-30,   // 左后腿下关节
            },
        }

        props.vm.runtime.accelerometerMode.setAccelerometerCallback(this.cailbrateCallback)
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }
    handleClose() {
        this.props.closeCailbrateModalState();
    }

    cailbrateCallback(x,y,z) {

    }
    render() {
        const {
            hidden,
            vm,
            intl
        } = this.props;

        const {
            checkFromData
        } = this.state;

        return (
            <div className={styles.modal} style={{display:hidden?"none":"block"}}>
                    <div className={styles.top}>
                    <div className={styles.topItem}></div>
                    <div className={styles.topItem}>
                        <div className={styles.title}>
                        <FormattedMessage
                            defaultMessage="Cailbrate Servos"
                            description=""
                            id="gui.modelExtension.cailbrateServos"
                        />                           
                        </div>
                    </div>
                    <div className={classNames(styles.topItem,styles.topRight)}>
                        <div className={styles.closeBtn} >
                            {/* <img className={styles.closeIcon} src={cancel}></img> */}
                        </div>
                    </div>
                </div>
                <CailbrateItem
                    vm={vm}
                    intl={intl}
                    checkFromData={checkFromData}
                ></CailbrateItem>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    closeCailbrateModalState: () => {
        dispatch(closeCailbrateModal());
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CailbrateModal));
