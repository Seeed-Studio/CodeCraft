import React, { Component } from "react";
import BittleEstablish from './bittleEstablish.jsx'
import bindAll from 'lodash.bindall';
import styles from './create-skill-item.css';
import { connect } from 'react-redux';
import {
    closeCreateSkillModal,
} from '../../reducers/modals';
import {
    updateCreateSkillModels
} from '../../reducers/models-ctl'
import delImg from './img/icon_del.png'
import addImg from './img/icon_add.png'
import { FormattedMessage,defineMessages,injectIntl } from 'react-intl';
import { toasts } from '../../components/toast-special/toast.jsx';

import { toByteArray } from "scratch-paint";
const maxLength = 3
const messages = defineMessages({
    fail: {
        id: 'gui.modelExtension.saveFail',
        defaultMessage: '请填写技能名称'
    },
})
class CreateSkillItem extends React.Component {
    constructor(props) {
        super(props);

        bindAll(this, [
            'handleClickAngle',
            'handleUpdateLeftForeleg',
            'handleUpdateRightForeleg',
            'handleUpdateLeftHindleg',
            'handleUpdateRightHindleg',
            'handleClickAddItem',
            'handleClickDeleteItem',
            'handleChangeInput',
            'handleClose',
            'handleChangeName',
            'handlePreview',
            'handle16ToString',
            'handleEchoCreateSkillValue',
        ]);

        this.state = {
            jointIdFrom:{
                newHead:'newHead',
                rightForeleg:"rightForeleg",
                newRightForeleg:'newRightForeleg',
                newLeftForele:'newLeftForele',
                newLeftHindleg:'newLeftHindleg',
                newRightHindleg:'newRightHindleg',
                rightForelegUpperNum:'rightForelegUpperNum',
                rightForelegLowerNum:'rightForelegLowerNum',
                leftForelegUpperNum:'leftForelegUpperNum',
                leftForelegLowerNum:'leftForelegLowerNum',
                leftHindlegUpperNum:'leftHindlegUpperNum',
                leftHindlegLowerNum:'leftHindlegLowerNum',
                rightHindlegUpperNum:'rightHindlegUpperNum',
                rightHindlegLowerNum:'rightHindlegLowerNum'
            },
            index:1,
            createSkillName:'',
            isStateLeftForeleg:true,
            // ------- 分界线 Divider ------- \\
            newCreateAngleList:[{
                // ------- 分界线 Divider ------- \\
                newHeaderNum:0,

                newLeftForelegUpperNum:0,       // 右前腿上关节
                newLeftForelegLowerNum:0,       // 右前腿下关节

                newRightForelegUpperNum:0,      // 左前腿上关节
                newRightForelegLowerNum:0,      // 左前腿下关节

                newLeftHindlegUpperNum:0,       // 右后腿上关节
                newLeftHindlegLowerNum:0,       // 右后腿下关节

                newRightHindlegUpperNum:0,      // 左后腿上关节
                newRightHindlegLowerNum:0,      // 左后腿下关节
                // ------- 分界线 Divider ------- \\
                newHeaderInput:0,

                newLeftForelegLowerInput:0,     // 右前腿上关节
                newLeftForelegUpperInput:0,     // 右前腿下关节

                newRightForelegUpperInput:0,    // 左前腿上关节
                newRightForelegLowerInput:0,    // 左前腿下关节

                newLeftHindlegUpperInput:0,     // 右后腿上关节
                newLeftHindlegLowerInput:0,     // 右后腿下关节

                newRightHindlegUpperInput:0,    // 左后腿上关节
                newRightHindlegLowerInput:0,    // 左后腿下关节
            }],
            recordCreateAngleList:[{
                newHeaderNum:0,
                newLeftForelegUpperNum:0,       // 右前腿上关节
                newLeftForelegLowerNum:0,       // 右前腿下关节

                newRightForelegUpperNum:0,      // 左前腿上关节
                newRightForelegLowerNum:0,      // 左前腿下关节

                newLeftHindlegUpperNum:0,       // 右后腿上关节
                newLeftHindlegLowerNum:0,       // 右后腿下关节

                newRightHindlegUpperNum:0,      // 左后腿上关节
                newRightHindlegLowerNum:0,      // 左后腿下关节
            }],
            angleItem:{
                newHeaderInput:0,
                // ------- 分界线 Divider ------- \\
                newLeftForelegUpperNum:0,       // 右前腿上关节
                newLeftForelegLowerNum:0,       // 右前腿下关节

                newRightForelegUpperNum:0,      // 左前腿上关节
                newRightForelegLowerNum:0,      // 左前腿下关节

                newLeftHindlegUpperNum:0,       // 右后腿上关节
                newLeftHindlegLowerNum:0,       // 右后腿下关节

                newRightHindlegUpperNum:0,      // 左后腿上关节
                newRightHindlegLowerNum:0,      // 左后腿下关节
                // ------- 分界线 Divider ------- \\
                newLeftForelegLowerInput:0,     // 右前腿上关节
                newLeftForelegUpperInput:0,     // 右前腿下关节

                newRightForelegUpperInput:0,    // 左前腿上关节
                newRightForelegLowerInput:0,    // 左前腿下关节

                newLeftHindlegUpperInput:0,     // 右后腿上关节
                newLeftHindlegLowerInput:0,     // 右后腿下关节

                newRightHindlegUpperInput:0,    // 左后腿上关节
                newRightHindlegLowerInput:0,    // 左后腿下关节
            }
        };
    }
    componentDidMount() {
       console.log('1',this)
       this.handleEchoCreateSkillValue()
       this.forceUpdate();

       console.log('4',this)
    }
    // 回显 Echo
    handleEchoCreateSkillValue(){
        if(this.props.vm.runtime.modelsControl.createSkillModels.createSkillValue){
            
            console.log('2',this)

            let newCreateAngleValued = this.props.vm.runtime.modelsControl.createSkillModels.newCreateAngleList[0]
            let newHeaderInput = newCreateAngleValued.newHeaderInput
            let newRightForelegUpperInput = newCreateAngleValued.newRightForelegUpperInput
            let newLeftForelegUpperInput = newCreateAngleValued.newLeftForelegUpperInput
            let newLeftHindlegUpperInput = newCreateAngleValued.newLeftHindlegUpperInput
            let newRightHindlegUpperInput = newCreateAngleValued.newRightHindlegUpperInput
            let newRightForelegLowerInput = newCreateAngleValued.newRightForelegLowerInput
            let newLeftForelegLowerInput = newCreateAngleValued.newLeftForelegLowerInput
            let newLeftHindlegLowerInput = newCreateAngleValued.newLeftHindlegLowerInput
            let newRightHindlegLowerInput = newCreateAngleValued.newRightHindlegLowerInput
            
            newRightForelegLowerInput = 90 - Number(newRightForelegLowerInput)
            newLeftForelegLowerInput = 90 - Number(newLeftForelegLowerInput)
            newLeftHindlegLowerInput = 90 - Number(newLeftHindlegLowerInput)
            newRightHindlegLowerInput = 90 - Number(newRightHindlegLowerInput)

            document.getElementById('newHead').style.transform = `rotate(${newHeaderInput}deg)`
            document.getElementById('newRightForeleg').style.transform = `rotate(-${newRightForelegUpperInput}deg)`
            document.getElementById('newLeftForele').style.transform = `rotate(-${newLeftForelegUpperInput}deg)`
            document.getElementById('newLeftHindleg').style.transform = `rotate(-${newLeftHindlegUpperInput}deg)`
            document.getElementById('newRightHindleg').style.transform = `rotate(-${newRightHindlegUpperInput}deg)`
            document.getElementById('rightForelegUpperNum').style.transform = `rotate(${newRightForelegLowerInput}deg)`
            document.getElementById('leftForelegUpperNum').style.transform = `rotate(${newLeftForelegLowerInput}deg)`
            document.getElementById('leftHindlegUpperNum').style.transform = `rotate(${newLeftHindlegLowerInput}deg)`
            document.getElementById('rightHindlegUpperNum').style.transform = `rotate(${newRightHindlegLowerInput}deg)`
            this.setState({
                newCreateAngleList:JSON.parse(JSON.stringify(this.props.vm.runtime.modelsControl.createSkillModels.newCreateAngleList)) ,
                createSkillName:this.props.vm.runtime.modelsControl.createSkillModels.createSkillName,
                recordCreateAngleList:this.props.vm.runtime.modelsControl.createSkillModels.recordCreateAngleList
            })
            
        }
    }
    // 旋转 Rotation
    handleChangeAnimation(elementById,angle,originX,originY){
        let elementByIdStyle = document.getElementById(elementById).style
        let styleSheets = document.styleSheets[0]
        let elementByIdName = elementById + 'delayed'
        elementByIdStyle.animationName = elementByIdName
        elementByIdStyle.animationDuration = "0.3s"
        elementByIdStyle.animationFillMode = "forwards"
        elementByIdStyle.animationDelay = "0.3s"
        styleSheets.insertRule(`
            @keyframes ${elementByIdName} {
                100% {
                    transform-origin: ${originX} ${originY};
                    transform: rotate(${angle}deg);
                }
            }`)
        setTimeout(() => {
            // 清除旋转动画效果
            // Clear rotation animation
            // document.getElementById(elementById).style.transform = `rotate(${angle}deg)`
            document.getElementById(elementById).style.animation = "";
            styleSheets.deleteRule(0)
        }, 500);
        setTimeout(() => {
            // 记录旋转最后位置
            // Record last position after rotation
            document.getElementById(elementById).style.transform = `rotate(${angle}deg)`
            // document.getElementById(elementById).style.animation = "";
        }, 501);
    }
    // 获取input的角度值
    // Get angle value from input
    handleChangeInputs(type,event){
        this.handleChangeInput(type,event)
    }


    // 判断关节前后角度是否变化，从而使关节转动
    // Check if angle changed, rotate joint if so
    handleCompareAngle(newLowerVal,oldLowerVal,newUpperVal,oldUpperVal,newId,lowerId,upperId,rVal,nVal){
        let upperVal = -Number(newLowerVal)
        let newLowerValue = newLowerVal
        let oldLowerValue = oldLowerVal
        let newUpperValue = newUpperVal
        let oldUpperValue = oldUpperVal
        newLowerValue = -Number(newLowerValue) + Number(rVal)
        oldLowerValue = -Number(oldLowerValue) + Number(rVal)
        newUpperValue = -Number(newUpperValue) + Number(nVal)
        oldUpperValue = -Number(oldUpperValue) + Number(nVal)
        console.log('新输入值',newLowerVal,'旧输入值',oldLowerVal)
        // console.log('新输入值',newLowerValue,oldLowerValue,newUpperValue,oldUpperValue)
        if(this.handleCompareValue(newLowerValue,oldLowerValue)){       // 判断上关节不动 Upper joint not moving
            if(!this.handleCompareValue(newUpperValue,oldUpperValue)){  // 判断下关节动 Lower joint moving
                this.handleChangeAnimation(upperId,newUpperValue,'center','10%')
            }
        }else{ // 判断上关节动 Upper joint moving
            if(this.handleCompareValue(newUpperValue,oldUpperValue)){ // 判断下关节不动 Lower joint not moving
                this.handleChangeAnimation(newId,upperVal,'52%','0')
            }else{ // 判断下关节动 Lower joint moving
                this.handleChangeAnimation(newId,upperVal,'52%','0')
                // this.handleChangeAnimation(lowerId,newLowerValue,'center','10%')
                this.handleChangeAnimation(upperId,newUpperValue,'center','10%')
            }
        }
    }
    // 对比关节前后角度是否变化
    // Check if angle changed
    handleCompareValue(newValue,oldValue){ // true为不动，false为动  true means unmoved, false means moved
        return Number(newValue)==Number(oldValue) ? true : false
    }

    // 动态更新--左前腿  Update left fore leg
    handleUpdateLeftForeleg(eventValue,type){
        const {
            newCreateAngleList,
            jointIdFrom,
            recordCreateAngleList
        } = this.state
        const newCreateAngleInfo = newCreateAngleList[0]
        const recordCreateAngleInfo = recordCreateAngleList[0]

        setTimeout(() => {
            if(type=='upper'){
                this.handleCompareAngle(
                    eventValue,
                    recordCreateAngleInfo.newLeftForelegUpperNum,
                    newCreateAngleInfo.newLeftForelegLowerInput,
                    recordCreateAngleInfo.newLeftForelegLowerNum,
                    jointIdFrom.newLeftForele,
                    jointIdFrom.leftForelegLowerNum,
                    jointIdFrom.leftForelegUpperNum,
                    -25,90
                    )
            }else{
                this.handleCompareAngle(
                    newCreateAngleInfo.newLeftForelegUpperInput,
                    recordCreateAngleInfo.newLeftForelegUpperNum,
                    eventValue,
                    recordCreateAngleInfo.newLeftForelegLowerNum,
                    jointIdFrom.newLeftForele,
                    jointIdFrom.leftForelegLowerNum,
                    jointIdFrom.leftForelegUpperNum,
                    -25,90
                    )
            }
        }, 500);
    }

    // 动态更新--右前腿  Update right fore leg
    handleUpdateRightForeleg(eventValue,type){
        const {
            newCreateAngleList,
            jointIdFrom,
            recordCreateAngleList
        } = this.state
        const newCreateAngleInfo = newCreateAngleList[0]
        const recordCreateAngleInfo = recordCreateAngleList[0]

        setTimeout(() => {
            if(type=='upper'){
                this.handleCompareAngle(
                    eventValue,
                    recordCreateAngleInfo.newRightForelegUpperNum,
                    newCreateAngleInfo.newRightForelegLowerInput,
                    recordCreateAngleInfo.newRightForelegLowerNum,
                    jointIdFrom.newRightForeleg,
                    jointIdFrom.rightForelegLowerNum,
                    jointIdFrom.rightForelegUpperNum,
                    -30,90
                )
            }else{
                this.handleCompareAngle(
                    newCreateAngleInfo.newRightForelegUpperInput,
                    recordCreateAngleInfo.newRightForelegUpperNum,
                    eventValue,
                    recordCreateAngleInfo.newRightForelegLowerNum,
                    jointIdFrom.newRightForeleg,
                    jointIdFrom.rightForelegLowerNum,
                    jointIdFrom.rightForelegUpperNum,
                    -30,90
                )
            }

        }, 500);
    }

    // 动态更新--左后腿  Update left hind leg
    handleUpdateLeftHindleg(eventValue,type){
        const {
            newCreateAngleList,
            jointIdFrom,
            recordCreateAngleList
        } = this.state
        const newCreateAngleInfo = newCreateAngleList[0]
        const recordCreateAngleInfo = recordCreateAngleList[0]

        setTimeout(() => {
            if(type=='upper'){
                this.handleCompareAngle(
                    eventValue,
                    recordCreateAngleInfo.newLeftHindlegUpperNum,
                    newCreateAngleInfo.newLeftHindlegLowerInput,
                    recordCreateAngleInfo.newLeftHindlegLowerNum,
                    jointIdFrom.newLeftHindleg,
                    jointIdFrom.leftHindlegLowerNum,
                    jointIdFrom.leftHindlegUpperNum,
                    -18,90
                )
            }else{
                this.handleCompareAngle(
                    newCreateAngleInfo.newLeftHindlegUpperInput,
                    recordCreateAngleInfo.newLeftHindlegUpperNum,
                    eventValue,
                    recordCreateAngleInfo.newLeftHindlegLowerNum,
                    jointIdFrom.newLeftHindleg,
                    jointIdFrom.leftHindlegLowerNum,
                    jointIdFrom.leftHindlegUpperNum,
                    -18,90
                )
            }
        }, 500);
    }

    // 动态更新--右后腿  Update right hind leg
    handleUpdateRightHindleg(eventValue,type){
        const {
            newCreateAngleList,
            jointIdFrom,
            recordCreateAngleList,
        } = this.state
        const newCreateAngleInfo = newCreateAngleList[0]
        const recordCreateAngleInfo = recordCreateAngleList[0]

        setTimeout(() => {
            if(type=='upper'){
                this.handleCompareAngle(
                    eventValue,
                    recordCreateAngleInfo.newRightHindlegUpperNum,
                    newCreateAngleInfo.newRightHindlegLowerInput,
                    recordCreateAngleInfo.newRightHindlegLowerNum,
                    jointIdFrom.newRightHindleg,
                    jointIdFrom.rightHindlegLowerNum,
                    jointIdFrom.rightHindlegUpperNum,
                    -28,90
                )
            }else{
                this.handleCompareAngle(
                    newCreateAngleInfo.newRightHindlegUpperInput,
                    recordCreateAngleInfo.newRightHindlegUpperNum,
                    eventValue,
                    recordCreateAngleInfo.newRightHindlegLowerNum,
                    jointIdFrom.newRightHindleg,
                    jointIdFrom.rightHindlegLowerNum,
                    jointIdFrom.rightHindlegUpperNum,
                    -28,90
                )
            }
        }, 500);
    }

    handleClickAddItem(index){
        const { newCreateAngleList,angleItem } = this.state

        if(newCreateAngleList.length<30){
            newCreateAngleList.splice(index+1, 0, angleItem);  
            this.setState({
                newCreateAngleList:newCreateAngleList
            })
        }
        
    }
    handleClickDeleteItem(index){
        const { newCreateAngleList,angleItem } = this.state
            newCreateAngleList.splice(index,1)
            this.setState({
                newCreateAngleList:newCreateAngleList
            })
    }
    handleUpdateHead(eventValue){
        const {jointIdFrom} = this.state
        this.handleChangeAnimation(jointIdFrom.newHead,eventValue,'right','bottom')
    }
    handleChangeInput(type,index,event){
        const {newCreateAngleList,recordCreateAngleList} = this.state
        let changeAngleList = JSON.parse(JSON.stringify(newCreateAngleList))
        let eventValue = event.target.value
        if(eventValue<= -60){
            eventValue = -60
        }
        if(type=='newHeader'){
            if(eventValue >= 60){
                eventValue = 60
            }
        }else{
            if(eventValue >= 30){
                eventValue = 30
            }
        }
        switch(type){
            case 'newHeader' :
                changeAngleList[index].newHeaderInput = eventValue
                if(index==0){
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                    this.handleUpdateHead(eventValue)
                    
                    console.log(this.state.newCreateAngleList[0].newHeaderInput)
                }
                break;
            case 'newRightForelegUpper':
                changeAngleList[index].newRightForelegUpperInput = eventValue
                if(index==0){
                    this.handleUpdateRightForeleg(eventValue,'upper')
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                }
                break;
            case 'newRightForelegLower':
                changeAngleList[index].newRightForelegLowerInput = eventValue
                if(index==0){
                    this.handleUpdateRightForeleg(eventValue,'lower')
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                }
                break;
            case 'newLeftForelegUpper':
                changeAngleList[index].newLeftForelegUpperInput = eventValue
                if(index==0){
                    this.handleUpdateLeftForeleg(eventValue,'upper')
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                }
                break;
            case 'newLeftForelegLower':
                changeAngleList[index].newLeftForelegLowerInput = eventValue
                if(index==0){
                    this.handleUpdateLeftForeleg(eventValue,'lower')
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                }
                break;
            case 'newLeftHindlegUpper':
                changeAngleList[index].newLeftHindlegUpperInput = eventValue
                if(index==0){
                    this.handleUpdateLeftHindleg(eventValue,'upper')
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                }
                break;
            case 'newLeftHindlegLower':
                changeAngleList[index].newLeftHindlegLowerInput = eventValue
                if(index==0){
                    this.handleUpdateLeftHindleg(eventValue,'lower')
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                }
                break;
            case 'newRightHindlegUpper':
                changeAngleList[index].newRightHindlegUpperInput = eventValue
                if(index==0){
                    this.handleUpdateRightHindleg(eventValue,'upper')
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                }
                break;
            case 'newRightHindlegLower':
                changeAngleList[index].newRightHindlegLowerInput = eventValue
                if(index==0){
                    this.handleUpdateRightHindleg(eventValue,'lower')
                    this.setState({
                        newCreateAngleList:changeAngleList
                    })
                }
                break;
        }
        if(index==0){
            setTimeout(() => {
                recordCreateAngleList[index].newHeaderNum = changeAngleList[index].newHeaderInput
                recordCreateAngleList[index].newRightForelegUpperNum = changeAngleList[index].newRightForelegUpperInput
                recordCreateAngleList[index].newRightForelegLowerNum = changeAngleList[index].newRightForelegLowerInput
                recordCreateAngleList[index].newLeftForelegUpperNum = changeAngleList[index].newLeftForelegUpperInput
                recordCreateAngleList[index].newLeftForelegLowerNum = changeAngleList[index].newLeftForelegLowerInput
                recordCreateAngleList[index].newLeftHindlegUpperNum = changeAngleList[index].newLeftHindlegUpperInput
                recordCreateAngleList[index].newLeftHindlegLowerNum = changeAngleList[index].newLeftHindlegLowerInput
                recordCreateAngleList[index].newRightHindlegUpperNum = changeAngleList[index].newRightHindlegUpperInput
                recordCreateAngleList[index].newRightHindlegLowerNum = changeAngleList[index].newRightHindlegLowerInput
                this.setState({
                    recordCreateAngleList:recordCreateAngleList
                })
                console.log(this.state.recordCreateAngleList)
            }, 1080);
        }else{
            this.setState({
                newCreateAngleList:changeAngleList
            })
        }
    }
    handleChangeName(type,event){
        let createSkillName = event.target.value
        this.setState({
            createSkillName:createSkillName
        })
    }
    handleCreateSkillValue(){
        const {newCreateAngleList} = this.state
        let createSkillValueList = []
        let leng = newCreateAngleList.length
        for(let i=1;i<=leng;i++){
            createSkillValueList.push([])
        }
        newCreateAngleList.forEach((item,index) =>{
            createSkillValueList[index].push(Number(item.newHeaderInput))
            createSkillValueList[index].push(Number(item.newRightForelegUpperInput))
            createSkillValueList[index].push(Number(item.newLeftForelegUpperInput))
            createSkillValueList[index].push(Number(item.newLeftHindlegUpperInput))
            createSkillValueList[index].push(Number(item.newRightHindlegUpperInput))
            createSkillValueList[index].push(Number(item.newRightForelegLowerInput))
            createSkillValueList[index].push(Number(item.newLeftForelegLowerInput))
            createSkillValueList[index].push(Number(item.newLeftHindlegLowerInput))
            createSkillValueList[index].push(Number(item.newRightHindlegLowerInput))
        })
        return createSkillValueList
    }
    // 点击确认 Click handler
    handleClickAngle(){
        const { createSkillName,newCreateAngleList,recordCreateAngleList } = this.state
        if(!createSkillName){
            toasts.error(this.props.intl.formatMessage(messages.fail));
            return
        }
        let createSkillValue =  this.handleCreateSkillValue()
        let createSkillInfo = {
            createSkillName:createSkillName,
            createSkillValue:createSkillValue,
            createSkillItem:[],
            createSkillFir:0,
            newCreateAngleList:newCreateAngleList,
            recordCreateAngleList:recordCreateAngleList,
            isCreateSkill:true
        }
        if(createSkillValue.length==1){
            createSkillInfo.createSkillItem.push(1,0,0,1,createSkillValue[0][0],0,0,0,0,0,0,0)
            let fir = createSkillValue[0].filter((value,index,a) =>{ return index>0 })
            createSkillInfo.createSkillItem = createSkillInfo.createSkillItem.concat(fir)
        }else{
            let len = createSkillValue.length
            createSkillInfo.createSkillItem.push(len,0,0,1)
            createSkillValue.forEach(item =>{
                item.forEach((value,index) =>{
                    if(index>0){
                        createSkillInfo.createSkillItem.push(value)
                    }
                })
            })
            createSkillInfo.createSkillFir=createSkillValue[0][0]
        }
        console.log(createSkillInfo)
        this.props.updateCreateSkillModels(createSkillInfo);
        this.props.vm.runtime.modelsControl.updateCreateSkillModels(createSkillInfo);
        this.props.vm.runtime.createSkillMode.setCreateSkillInfo(createSkillInfo)
        // 添加保存成功提示
        // Notify saved succeed
        toasts.success(this.props.intl.formatMessage({
            id: "gui.modelExtension.modelsSave.succPrompt",
            defaultMessage: "Saved"
        }));
        this.props.vm.refreshExtensionBlocks().then(() => {
            this.props.vm.refreshWorkspace();
        });

        this.props.closeCreateSkillModalState();

    }
    handleClose() {
        console.log(this)
        this.forceUpdate();
        this.props.closeCreateSkillModalState();
    }
    // 预览 Preview
    handlePreview(){
        let createSkillValue =  this.handleCreateSkillValue()
        let val = createSkillValue[0]
        let t1 = `m8 ${val[1]}`
        let t2 = `m9 ${val[2]}`
        let t3 = `m10 ${val[3]}`
        let t4 = `m11 ${val[4]}`
        let t5 = `m12 ${val[5]}`
        let t6 = `m13 ${val[6]}`
        let t7 = `m14 ${val[7]}`
        let t8 = `m15 ${val[8]}`
        let t0 = `m0 ${val[0]}`
        // let text = `l${t0}0000000${t1}${t2}${t3}${t4}${t5}${t6}${t7}${t8}~`
        this.props.vm.deviceEngine.write(t1);
        this.props.vm.deviceEngine.write(t2);
        this.props.vm.deviceEngine.write(t3);
        this.props.vm.deviceEngine.write(t4);
        this.props.vm.deviceEngine.write(t5);
        this.props.vm.deviceEngine.write(t6);
        this.props.vm.deviceEngine.write(t7);
        this.props.vm.deviceEngine.write(t8);
        this.props.vm.deviceEngine.write(t0);
    }
    handle16ToString(num){
        let num2 = num.toString(16)
        return num2
    }
    render() {
        const {
                jointIdFrom,
                newCreateAngleList,
                createSkillName
                } = this.state;
                console.log(newCreateAngleList)
        return (
            <div className={styles.createSkillItem}>
                <div className={styles.skillItem}> 
                <div>
                    <BittleEstablish
                        jointIdFrom={jointIdFrom}
                    ></BittleEstablish>
                </div>
                {/* -----------------------------分割线 Divider ------------------------- */}
                <div style={{display:'flex'}}>
                    <div className={styles.createSkillInfoInput}>

                        <div className={styles.skillNameInfo}>
                            <div className={styles.skillNameTitle}>
                            <FormattedMessage
                                defaultMessage="Skill Name:"
                                description=""
                                id="gui.modelExtension.skillName"
                            />
                            </div>
                            <input
                                value={createSkillName}
                                className={styles.skillNameInput}
                                onChange={this.handleChangeName.bind(this, 'createSkillName')}

                            />
                        </div>
                        <div className={styles.skillAngleInfo}>
                            <div className={styles.skillAngleName}>
                            <FormattedMessage
                                defaultMessage="Joint angle:"
                                description=""
                                id="gui.modelExtension.setMachineAngle"
                            />
                            </div>
                            <div>
                                {
                                    newCreateAngleList.map((item, index) => {
                                        return <div className={styles.createSkillInfo}>
                                            {
                                                index == 0 && <div className={styles.createSkillItemInput}>
                                                    <div className={styles.itemTitle}>0</div>
                                                    <input
                                                        className={styles.itemInput}
                                                        type="number"
                                                        value={item.newHeaderInput}
                                                        maxLength={maxLength}
                                                        onChange={this.handleChangeInput.bind(this, 'newHeader', index)}
                                                    />
                                                </div>
                                            }
                                            {
                                                index != 0 && <div className={styles.createSkillItemInput}>
                                                    <div className={styles.itemTitle}>
                                                    </div>
                                                    <input
                                                        className={styles.itemInput}
                                                        type="number"
                                                        value={item.newHeaderInput}
                                                        style={{ opacity: 0 }}
                                                        disabled={true}
                                                        maxLength={maxLength}
                                                        onChange={this.handleChangeInput.bind(this, 'newHeader', index)}
                                                    />
                                                </div>
                                            }
                                            {/* 分割线 Divider */}
                                            <div className={styles.createSkillItemInput}>
                                                <div className={styles.itemTitle}>8</div>
                                                <input
                                                    className={styles.itemInput}
                                                    type="number"
                                                    value={item.newRightForelegUpperInput}
                                                    maxLength={maxLength}
                                                    onChange={this.handleChangeInput.bind(this, 'newRightForelegUpper', index)} />
                                            </div>
                                            <div className={styles.createSkillItemInput} >
                                                <div className={styles.itemTitle}>9</div>
                                                <input
                                                    className={styles.itemInput}
                                                    type="number"
                                                    value={item.newLeftForelegUpperInput}
                                                    maxLength={maxLength}
                                                    onChange={this.handleChangeInput.bind(this, 'newLeftForelegUpper', index)}
                                                />
                                            </div>

                                            <div className={styles.createSkillItemInput}>
                                                <div className={styles.itemTitle}>10</div>
                                                <input
                                                    className={styles.itemInput}
                                                    type="number"
                                                    value={item.newLeftHindlegUpperInput}
                                                    maxLength={maxLength}
                                                    onChange={this.handleChangeInput.bind(this, 'newLeftHindlegUpper', index)}
                                                />
                                            </div>
                                            <div className={styles.createSkillItemInput}>
                                                <div className={styles.itemTitle}>11</div>
                                                <input
                                                    className={styles.itemInput}
                                                    type="number"
                                                    value={item.newRightHindlegUpperInput}
                                                    maxLength={maxLength}
                                                    onChange={this.handleChangeInput.bind(this, 'newRightHindlegUpper', index)}
                                                />
                                            </div>

                                            <div className={styles.createSkillItemInput}>
                                                <div className={styles.itemTitle}>12</div>
                                                <input
                                                    className={styles.itemInput}
                                                    type="number"
                                                    value={item.newRightForelegLowerInput}
                                                    maxLength={maxLength}
                                                    onChange={this.handleChangeInput.bind(this, 'newRightForelegLower', index)}
                                                />
                                            </div>
                                            <div className={styles.createSkillItemInput}>
                                                <div className={styles.itemTitle}>13</div>
                                                <input
                                                    className={styles.itemInput}
                                                    type="number"
                                                    value={item.newLeftForelegLowerInput}
                                                    maxLength={maxLength}
                                                    onChange={this.handleChangeInput.bind(this, 'newLeftForelegLower', index)}
                                                />
                                            </div>
                                            <div className={styles.createSkillItemInput}>
                                                <div className={styles.itemTitle}>14</div>
                                                <input
                                                    className={styles.itemInput}
                                                    type="number"
                                                    value={item.newLeftHindlegLowerInput}
                                                    maxLength={maxLength}
                                                    onChange={this.handleChangeInput.bind(this, 'newLeftHindlegLower', index)}
                                                />
                                            </div>
                                            <div className={styles.createSkillItemInput}>
                                                <div className={styles.itemTitle}>15</div>
                                                <input
                                                    className={styles.itemInput}
                                                    type="number"
                                                    value={item.newRightHindlegLowerInput}
                                                    maxLength={maxLength}
                                                    onChange={this.handleChangeInput.bind(this, 'newRightHindlegLower', index)}
                                                />
                                            </div>
                                            {
                                                index != 0 && <img className={styles.del} onClick={this.handleClickDeleteItem.bind(this,index)} src={delImg} />
                                            }
                                            <img className={styles.add} onClick={this.handleClickAddItem.bind(this,index)} src={addImg} />


                                            {/* <button onClick={this.handleClickAngle.bind()}>确定</button> */}
                                        </div>
                                    })
                                }
                            </div>

                        </div>


                    </div>
                </div>
                </div>
                <div className={styles.createSkillBottom}>
                    <button className={styles.cancel} onClick={this.handleClose}>
                        <FormattedMessage
                            defaultMessage="Cancel"
                            description="cancel"
                            id="gui.modelExtension.modelDelete.cancelText"
                        />
                    </button>
                    <button className={styles.sumbit} onClick={this.handleClickAngle.bind()}>
                        <FormattedMessage
                            defaultMessage="Save"
                            description="cancel"
                            id="gui.modelExtension.saveText"
                        />
                    </button>
                    <button className={styles.preview} onClick={this.handlePreview.bind()}>
                        <FormattedMessage
                            defaultMessage="Preview"
                            description="preview"
                            id="gui.modelExtension.preview"
                        />
                    </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    createSkillModels: state.scratchGui.modelsCtr.createSkillModels,

});
const mapDispatchToProps = dispatch => ({
    updateCreateSkillModels: data => dispatch(updateCreateSkillModels(data)),
    closeCreateSkillModalState: () => {
        dispatch(closeCreateSkillModal());
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSkillItem));
