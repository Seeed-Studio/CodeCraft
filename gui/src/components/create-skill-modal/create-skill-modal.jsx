import React from 'react';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import { FormattedMessage,defineMessages,injectIntl } from 'react-intl';
import classNames from 'classnames';
import styles from './create-skill-modal.css';
import {
    closeCreateSkillModal,
} from '../../reducers/modals';
import CreateSkillItem from '../create-skill-item/create-skill-item.jsx'
class CreateSkillModal extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
            'createSkillCallback',
            'handleClose',
            'handleClickAngle',

        ]);

        this.state = {
            xAxis:1,
            yAxis:1,
            zAxis:1
        }

        props.vm.runtime.accelerometerMode.setAccelerometerCallback(this.createSkillCallback)
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }
    handleClose() {
        
        this.props.closeCreateSkillModalState();
    }

    createSkillCallback(x,y,z) {
        console.log('createSkillCallback',x,y,z)
        this.setState({
            xAxis:x,
            yAxis:y,
            zAxis:z
        })
    }
    // 点击确认 Click handler
    handleClickAngle(){
        let createSkillInfo = {
            createSkillName:'测试',
            createSkillValue:[1,2,3,4,5,6,7,8,9]
        }
        this.props.vm.runtime.createSkillMode.setCreateSkillInfo(createSkillInfo)
        this.props.vm.runtime.createSkillMode.setIsCreateSkill(true)
        this.props.vm.refreshExtensionBlocks().then(() => {
            this.props.vm.refreshWorkspace();
        });
        this.props.closeCreateSkillModalState();
    }
    render() {
        const {
            hidden,
            vm,
            intl
        } = this.props;

        const {

        } = this.state;

        return (
            <div className={styles.modal} style={{display:hidden?"none":"block"}}>
                {/* <img className={styles.cancel} src={cancel} onClick={this.handleClose}></img> */}
                <div className={styles.top}>
                    <div className={styles.topItem}></div>
                    <div className={styles.topItem}>
                        <div className={styles.title}>
                        <FormattedMessage
                            defaultMessage="Create Skill"
                            description=""
                            id="gui.modelExtension.createSkill"
                        />   
                    </div>
                    </div>
                    <div className={classNames(styles.topItem,styles.topRight)}>
                        <div className={styles.closeBtn}>
                            {/* <img className={styles.closeIcon} src={cancel}></img> */}
                        </div>
                    </div>
                </div>
                <CreateSkillItem intl={intl} vm={vm}></CreateSkillItem>
                {/* <div className={styles.createSkillBottom}>
                        <button className={styles.cancel} onClick={this.handleClose}>取消</button>
                        <button className={styles.sumbit} onClick={this.handleClickAngle.bind()}>确定</button>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    textstate:state
});

const mapDispatchToProps = dispatch => ({
    closeCreateSkillModalState: () => {
        dispatch(closeCreateSkillModal());
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSkillModal));
