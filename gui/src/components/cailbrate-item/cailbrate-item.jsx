import React, { Component } from "react";
import BittleCheck from './bittleCheck.jsx'
import bindAll from 'lodash.bindall';
import styles from './cailbrate-item.css';
import { connect } from 'react-redux';
import preview from './img/preview.png'
import {
    closeCailbrateModal,
} from '../../reducers/modals';
import { FormattedMessage,defineMessages,injectIntl } from 'react-intl';
import ModifyInput from '../modify-Input/modify-input.jsx';
import { toasts } from '../../components/toast-special/toast.jsx';

class CailbrateItem extends React.Component {
    constructor(props) {
        super(props);

        bindAll(this, [
            'handleClickAngle',
            'handleChangeInput',
            'handleClose',
            'initAngle',
            'handleReduceValue',
            'handleAddValue',
            'handleChangeValue',
            'handleCailbrateServos',
            'handleSignout',
            'handleResponse'
        ]);

        this.state = {
            jointIdFrom:{
                checkHead:'checkHead',
                rightForeleg:"rightForeleg",
                checkRightForeleg:'checkRightForeleg',
                checkLeftForeleg:'checkLeftForeleg',
                checkLeftHindleg:'checkLeftHindleg',
                checkRightHindleg:'checkRightHindleg',
                rightForelegUpperNum:'rightForelegUpperNum',
                rightForelegLowerNum:'rightForelegLowerNum',
                leftForelegUpperNum:'leftForelegUpperNum',
                leftForelegLowerNum:'leftForelegLowerNum',
                leftHindlegUpperNum:'leftHindlegUpperNum',
                leftHindlegLowerNum:'leftHindlegLowerNum',
                rightHindlegUpperNum:'rightHindlegUpperNum',
                rightHindlegLowerNum:'rightHindlegLowerNum',
            },
            checkHeaderInput:0,
            checkLeftForelegLowerInput:0,// 右前腿上关节
            checkLeftForelegUpperInput:0,// 右前腿下关节

            checkRightForelegUpperInput:0, // 左前腿上关节
            checkRightForelegLowerInput:0,// 左前腿下关节

            checkLeftHindlegUpperInput:0,// 右后腿上关节
            checkLeftHindlegLowerInput:0,// 右后腿下关节

            checkRightHindlegUpperInput:0, // 左后腿上关节
            checkRightHindlegLowerInput:0,// 左后腿下关节
            stateVisable:false,
            recordValue:{}
        };
        this.value = '';
    }
    componentDidMount() {
        this.initAngle()
        if(!this.props.isConnected || !this.props.isEquipmentConnected){
            toasts.error(this.props.intl.formatMessage({
                id: "gui.modelExtension.modelsSave.isConnect",
                defaultMessage: "Device not connected"
            }));
            return
        }
        this.props.vm.on('response', this.handleResponse);
    }
    componentWillUnmount() {
        this.props.vm.removeListener('response', this.handleResponse);
    }
    handleResponse(data) {
        const {checkHeaderInput,checkRightHindlegUpperInput,checkRightHindlegLowerInput,checkLeftForelegLowerInput,checkLeftForelegUpperInput,checkRightForelegUpperInput,checkRightForelegLowerInput,checkLeftHindlegUpperInput,checkLeftHindlegLowerInput} = this.state
        data = data.toString();
        this.value  +=  data
        let list = this.value.split('\n')
        // let isCailbrate  =this.props.vm.runtime.modelsControl.isCailbrate
        // console.log(isCailbrate)
        let recordValue = []
        let isR = /\s+/g;
        let a = []
        list.forEach((item,index) =>{
            a.unshift(item.replace(isR, ' ').split(' '))
        })
        // console.log('list',list)
        const findIndex = a.findIndex(item => item.length > 15) // 返回子项的下标
        let index = findIndex
        // console.log(index)
        // let len = 7
        // if(isCailbrate){
        //     len = 6
        // }
        // console.log(len)
        if (list.length >= 2) {
            if(a[index].length>16){
                a[index].pop()
            }
            let b =[]
            a[index].forEach((item,inde) =>{
                console.log(item)
                b.push(item.replace(',',''))
            })
            recordValue =  b.map(Number)
            if (Number(recordValue[15]) !== 15) {
                if (checkHeaderInput != Number(recordValue[0])) {
                    this.setState({
                        checkHeaderInput: Number(recordValue[0]),
                    })
                }
                if (checkLeftForelegLowerInput != Number(recordValue[13])) {
                    this.setState({
                        checkLeftForelegLowerInput: Number(recordValue[13]),
                    })
                }
                if (checkLeftForelegUpperInput != Number(recordValue[9])) {
                    this.setState({
                        checkLeftForelegUpperInput: Number(recordValue[9]),
                    })
                }
                if (checkRightForelegUpperInput != Number(recordValue[8])) {
                    this.setState({
                        checkRightForelegUpperInput: Number(recordValue[8]),
                    })
                }
                if (checkRightForelegLowerInput != Number(recordValue[12])) {
                    this.setState({
                        checkRightForelegLowerInput: Number(recordValue[12]),
                    })
                }
                if (checkLeftHindlegUpperInput != Number(recordValue[10])) {
                    this.setState({
                        checkLeftHindlegUpperInput: Number(recordValue[10]),
                    })
                }
                if (checkLeftHindlegLowerInput != Number(recordValue[14])) {
                    this.setState({
                        checkLeftHindlegLowerInput: Number(recordValue[14]),
                    })
                }
                if (checkRightHindlegUpperInput != Number(recordValue[11])) {
                    this.setState({
                        checkRightHindlegUpperInput: Number(recordValue[11]),
                    })
                }
                if (checkRightHindlegLowerInput != Number(recordValue[15])) {
                    this.setState({
                        checkRightHindlegLowerInput: Number(recordValue[15]),
                    })
                }
            }
        }
    }
    //获取input的角度值
    handleChangeInputs(type,event){
        this.handleChangeInput(type,event)
    }
    //点击确认
    handleClickAngle(){
        if(!this.props.isConnected || !this.props.isEquipmentConnected){
            toasts.error(this.props.intl.formatMessage({
                id: "gui.modelExtension.modelsSave.isConnect",
                defaultMessage: "Device not connected"
            }));
            return
        }
        this.props.vm.deviceEngine.write('s');
        // sessionStorage.setItem('cailbrateLocal',JSON.stringify(cailbrateLocal))
        //保存成功提示
        toasts.success(this.props.intl.formatMessage({
            id: "gui.modelExtension.modelsSave.succPrompt",
            defaultMessage: "Saved"
        }));
    }
    handleSignout(){
        //保存成功提示
        this.props.closeCailbrateModalState();
    }
    handleChangeInput(type,event,mold){
        if(!this.props.isConnected || !this.props.isEquipmentConnected){
            toasts.error(this.props.intl.formatMessage({
                id: "gui.modelExtension.modelsSave.isConnect",
                defaultMessage: "Device not connected"
            }));
            return
        }
        let eventValue
        let evenValue
        if(mold==1){
            eventValue = event
            evenValue = event
        }else{
            eventValue = event.target.value
            evenValue = event.target.value
        }
        if(eventValue>=10){
            eventValue = 10
        }
        if(eventValue <= -10){
            eventValue = -10
        }
        if(evenValue>=10){
            evenValue = 10
        }
        if(evenValue <= -10){
            evenValue = -10
        }
        switch(type){
            case 'checkHeadInput':
                this.setState({
                    checkHeaderInput:evenValue
                })
                this.handleCailbrateServos(0,evenValue)
                break;
            case 'checkRightForelegUpper':
                this.setState({
                    checkRightForelegUpperInput:eventValue
                })
                this.handleCailbrateServos(8,evenValue)
                break;
            case 'checkRightForelegLower':
                this.setState({
                    checkRightForelegLowerInput:eventValue
                })
                this.handleCailbrateServos(12,evenValue)
                break;
            case 'checkLeftForelegUpper':
                this.setState({
                    checkLeftForelegUpperInput:eventValue
                })
                this.handleCailbrateServos(9,evenValue)
                break;
            case 'checkLeftForelegLower':
                this.setState({
                    checkLeftForelegLowerInput:eventValue
                })
                this.handleCailbrateServos(13,evenValue)
                break;
            case 'checkLeftHindlegUpper':
                this.setState({
                    checkLeftHindlegUpperInput:eventValue
                })
                this.handleCailbrateServos(10,evenValue)
                break;
            case 'checkLeftHindlegLower':
                this.setState({
                    checkLeftHindlegLowerInput:eventValue
                })
                this.handleCailbrateServos(14,evenValue)
                break;
            case 'checkRightHindlegUpper':
                this.setState({
                    checkRightHindlegUpperInput:eventValue
                })
                this.handleCailbrateServos(11,evenValue)
                break;
            case 'checkRightHindlegLower':
                this.setState({
                    checkRightHindlegLowerInput:eventValue
                })
                this.handleCailbrateServos(15,evenValue)
                break;
        }
    }
    handleClose() {
        this.props.closeCailbrateModalState();
    }
    initAngle(){
        const { checkFromData,vm } = this.props
        document.getElementById('leftForelegUpperNum').style.transform = `rotate(${checkFromData.LeftForelegUpperNum}deg)`
        document.getElementById('checkLeftForeleg').style.transform = `rotate(${checkFromData.LeftForelegLowerNum}deg)`
        document.getElementById('rightForelegUpperNum').style.transform = `rotate(${checkFromData.RightForelegUpperNum}deg)`
        document.getElementById('checkRightForeleg').style.transform = `rotate(${checkFromData.RightForelegLowerNum}deg)`
        document.getElementById('leftHindlegUpperNum').style.transform = `rotate(${checkFromData.LeftHindlegUpperNum}deg)`
        document.getElementById('checkLeftHindleg').style.transform = `rotate(${checkFromData.LeftHindlegLowerNum}deg)`
        document.getElementById('rightHindlegUpperNum').style.transform = `rotate(${checkFromData.RightHindlegUpperNum}deg)`
        document.getElementById('checkRightHindleg').style.transform = `rotate(${checkFromData.RightHindlegLowerNum}deg)`
        this.props.vm.deviceEngine.write('c');
    }
    handleCailbrateServos(type,value){

        let cailbrateServos = 'c'+type+' '+value
        this.props.vm.deviceEngine.write(cailbrateServos);
        this.props.vm.deviceEngine.write('s');
    }
    handleReduceValue(type){
        this.handleChangeValue(type,-1)
    }
    handleAddValue(type){
        this.handleChangeValue(type,1)
    }
    handleChangeValue(type,value){
        const {
            checkHeaderInput,
            checkRightForelegUpperInput,
            checkRightForelegLowerInput,
            checkLeftForelegUpperInput,
            checkLeftForelegLowerInput,
            checkLeftHindlegUpperInput,
            checkLeftHindlegLowerInput,
            checkRightHindlegUpperInput,
            checkRightHindlegLowerInput
        } = this.state
        let eventValue
            switch(type){
                case 'checkHeadInput':
                    eventValue = checkHeaderInput+value
                    this.setState({
                        checkHeaderInput:eventValue
                    })
                    this.handleChangeInput(type,eventValue,1)
                    break;
                case 'checkRightForelegUpper':
                    eventValue = checkRightForelegUpperInput+value
                    this.setState({
                        checkRightForelegUpperInput:eventValue
                    })
                    this.handleChangeInput(type,eventValue,1)
                    break;
                case 'checkRightForelegLower':
                    eventValue = checkRightForelegLowerInput+value
                    this.setState({
                        checkRightForelegLowerInput:eventValue
                    })
                    this.handleChangeInput(type,eventValue,1)
                    break;
                case 'checkLeftForelegUpper':
                    eventValue = checkLeftForelegUpperInput + value
                    this.setState({
                        checkLeftForelegUpperInput: eventValue
                    })
                    this.handleChangeInput(type, eventValue, 1)
                    break;
                case 'checkLeftForelegLower':
                    eventValue = checkLeftForelegLowerInput + value
                    this.setState({
                        checkLeftForelegLowerInput: eventValue
                    })
                    this.handleChangeInput(type, eventValue, 1)
                    break;
                case 'checkLeftHindlegUpper':
                    eventValue = checkLeftHindlegUpperInput + value
                    this.setState({
                        checkLeftHindlegUpperInput: eventValue
                    })
                    this.handleChangeInput(type, eventValue, 1)
                    break;
                case 'checkLeftHindlegLower':
                    eventValue = checkLeftHindlegLowerInput + value
                    this.setState({
                        checkLeftHindlegLowerInput: eventValue
                    })
                    this.handleChangeInput(type, eventValue, 1)
                    break;
                case 'checkRightHindlegUpper':
                    eventValue = checkRightHindlegUpperInput + value
                    this.setState({
                        checkRightHindlegUpperInput: eventValue
                    })
                    this.handleChangeInput(type, eventValue, 1)
                    break;
                case 'checkRightHindlegLower':
                    eventValue = checkRightHindlegLowerInput + value
                    this.setState({
                        checkRightHindlegLowerInput: eventValue
                    })
                    this.handleChangeInput(type, eventValue, 1)
                    break;
            }
            console.log(this.state.checkLeftForelegLowerInput)
    }
    render() {
        const {
                jointIdFrom,
                } = this.state;
        return (
            <div >
                <div className={styles.content}>
                    <BittleCheck
                        jointIdFrom={jointIdFrom}
                    ></BittleCheck>
                    <div className={styles.inputContent}>
                        <ModifyInput
                            locationLeft={28}
                            locationTop={10.5}
                            value={this.state.checkHeaderInput}
                            onChange={this.handleChangeInputs.bind(this,'checkHeadInput')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkHeadInput')}
                            handleAddValue={this.handleAddValue.bind(this,'checkHeadInput')}
                        ></ModifyInput>
                        <ModifyInput
                            locationLeft={20}
                            locationTop={13.4}
                            value={this.state.checkLeftForelegUpperInput}
                            onChange={this.handleChangeInputs.bind(this,'checkLeftForelegUpper')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkLeftForelegUpper')}
                            handleAddValue={this.handleAddValue.bind(this,'checkLeftForelegUpper')}
                        ></ModifyInput>
                        <ModifyInput
                            locationLeft={21}
                            locationTop={16.4}
                            value={this.state.checkLeftForelegLowerInput}
                            onChange={this.handleChangeInputs.bind(this,'checkLeftForelegLower')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkLeftForelegLower')}
                            handleAddValue={this.handleAddValue.bind(this,'checkLeftForelegLower')}
                        ></ModifyInput>
                        <ModifyInput
                            locationLeft={28}
                            locationTop={12.6}
                            value={this.state.checkRightForelegUpperInput}
                            onChange={this.handleChangeInputs.bind(this,'checkRightForelegUpper')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkRightForelegUpper')}
                            handleAddValue={this.handleAddValue.bind(this,'checkRightForelegUpper')}
                    ></ModifyInput>
                        <ModifyInput
                            locationLeft={24}
                            locationTop={18.3}
                            value={this.state.checkRightForelegLowerInput}
                            onChange={this.handleChangeInputs.bind(this,'checkRightForelegLower')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkRightForelegLower')}
                            handleAddValue={this.handleAddValue.bind(this,'checkRightForelegLower')}
                        ></ModifyInput>
                        <ModifyInput
                            locationLeft={32}
                            locationTop={11.9}
                            value={this.state.checkLeftHindlegUpperInput}
                            onChange={this.handleChangeInputs.bind(this,'checkLeftHindlegUpper')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkLeftHindlegUpper')}
                            handleAddValue={this.handleAddValue.bind(this,'checkLeftHindlegUpper')}
                        ></ModifyInput>
                        <ModifyInput
                            locationLeft={32}
                            locationTop={16.7}
                            value={this.state.checkLeftHindlegLowerInput}
                            onChange={this.handleChangeInputs.bind(this,'checkLeftHindlegLower')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkLeftHindlegLower')}
                            handleAddValue={this.handleAddValue.bind(this,'checkLeftHindlegLower')}
                        ></ModifyInput>
                        <ModifyInput
                            locationLeft={39}
                            locationTop={12.7}
                            value={this.state.checkRightHindlegUpperInput}
                            onChange={this.handleChangeInputs.bind(this,'checkRightHindlegUpper')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkRightHindlegUpper')}
                            handleAddValue={this.handleAddValue.bind(this,'checkRightHindlegUpper')}
                        ></ModifyInput>
                        <ModifyInput
                            locationLeft={42}
                            locationTop={18.2}
                            value={this.state.checkRightHindlegLowerInput}
                            onChange={this.handleChangeInputs.bind(this,'checkRightHindlegLower')}
                            handleReduceValue={this.handleReduceValue.bind(this,'checkRightHindlegLower')}
                            handleAddValue={this.handleAddValue.bind(this,'checkRightHindlegLower')}
                        ></ModifyInput>
                    </div>

                </div>


            {/* -----------------------------分割线------------------------- */}
                <div className={styles.createSkillBottom}>
                        <button className={styles.cancel} onClick={this.handleClose}>
                        <FormattedMessage
                                defaultMessage="Exit"
                                description="Exit"
                                id="gui.modelExtension.signout"
                            />
                        </button>
                        <button className={styles.sumbit} onClick={this.handleClickAngle.bind()}>
                            <FormattedMessage
                                defaultMessage="Save"
                                description="cancel"
                                id="gui.modelExtension.saveText"
                            />
                        </button>
                        {/* <button className={styles.preview} onClick={this.handleSignout.bind()}>
                            <FormattedMessage
                                defaultMessage="Sign out"
                                description="Sign out"
                                id="gui.modelExtension.signout"
                            />
                        </button> */}

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isConnected: state.scratchGui.deviceConnect.isConnected, // socket 是否连接
    createSkillModels: state.scratchGui.modelsCtr.createSkillModels,
    isEquipmentConnected: state.scratchGui.deviceConnect.isEquipmentConnected, // 设备是否连接
});
const mapDispatchToProps = dispatch => ({
    updateCreateSkillModels: data => dispatch(updateCreateSkillModels(data)),
    closeCailbrateModalState: () => {
        dispatch(closeCailbrateModal());
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CailbrateItem));
