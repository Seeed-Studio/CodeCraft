import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import styles from './image-classification.css';
import iconClose from './image/icon_image_close.png'
import { FormattedMessage,defineMessages,injectIntl } from 'react-intl';

const localMessages = defineMessages({
    category: {
        defaultMessage: 'category',
        description: 'category',
        id: 'gui.trainModal.category'
    },
    sample: {
        defaultMessage: 'sample',
        description: 'sample',
        id: 'gui.trainModal.sample'
    },
    reset: {
        defaultMessage: 'Reset',
        description: 'Reset',
        id: 'gui.trainModal.reset'
    },
    learn: {
        defaultMessage: 'Learn',
        description: 'Learn',
        id: 'gui.trainModal.learn'
    },
});


class ImageClassification extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'handleTrain',
            'handleChange',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleReset',
            'checkLength'
        ]);

        let category = props.intl.formatMessage(localMessages.category)
        this.sample = props.intl.formatMessage(localMessages.sample);
        this.reset = props.intl.formatMessage(localMessages.reset);
        this.learn = props.intl.formatMessage(localMessages.learn);

        this.placeholder = category + (this.props.index + 1);

        let showValue='';
        if(this.props.item.isNameEdited){
            showValue = this.props.item.name;
        }

        this.state = {
            isFocus: false,
            maxLength:20,
            showValue,
            subindex:0
        }
    }

    componentDidMount() {
        

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.item.isNameEdited !== nextProps.item.isNameEdited) {
            if(!nextProps.item.isNameEdited){
                this.setState({
                    showValue: ''
                })
            }
        }
        //还原数据  Restore data
        if(nextProps.restore){
            let showValue='';
            if(nextProps.item.isNameEdited){
                showValue = nextProps.item.name;
            }
            this.setState({
                showValue
            })
        }
    }
    
    handleTrain() {
        if (this.props.onTrain&&!this.props.trainDisable) {
            this.props.onTrain(this.props.index);
        }
    }

    handleChange(e) {
        if (this.props.onNameChange) {
            const {
                subindex,
            } = this.state;
            let value = e.target.value;
            //如果有超过的就截掉    Truncate string
            if(subindex>0){
                value = value.substr(0,subindex);
            }
            this.setState({
                showValue: value
            })
            if(value==null||value==''){
                value=this.placeholder;
            }
            this.props.onNameChange(this.props.index, value);
        }
    }

    checkLength(e) {
        let value = e.target.value;
        var l = 0;
        var hanzicount =0;  //汉字数量  Amount of chinese character
        var subindex=0;     //超过的字符下标  The index of the character that exceed the max length
        for(var i=0; i<value.length; i++) {
            if (/[\u4e00-\u9fa5]/.test(value[i])) {
                hanzicount++
                l+=2;
            } else {
                l++;
            }
            if(l>20){
                subindex=i;
                break;
            }
        }
        this.setState({
            maxLength: 20-hanzicount,
            subindex: subindex
        })
    }

    handleReset() {
        if (this.props.onReset) {
            this.props.onReset(this.props.index);
        }
    }

    handleMouseEnter(e) {
        this.setState({
            isFocus: true
        })
    }

    handleMouseLeave(e) {
        this.setState({
            isFocus: false
        })
    }

    render() {
        const {
            item,
            index,
            trainDisable,
        } = this.props;

        const {name, confidence, imageList} = item;

        const {
            isFocus,
            maxLength,
            showValue
        } = this.state;

        let hundredConfidence = (confidence*100).toFixed(2);

        let showImageList;
        let length = imageList.length;
        if(length>9){
            showImageList = imageList.slice(length-9);
        }else {
            showImageList = imageList;
        }

        const imageClass = function (i) {
            return classNames(
                styles.image,
                i==0&&styles.radiusTopLeft,
                i==2&&styles.radiusTopRight,
                i==6&&styles.radiusBottomLeft,
                i==8&&styles.radiusBottomRight,
              );
        }

        return (
            <div id={'classification'+index} className={styles.classification}>
                <div className={styles.title}>{length+' '+this.sample}
                </div>
                <div className={styles.body}>
                    <div className={styles.imageGroup} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        {
                            showImageList
                                .map((image, i) => (
                                    <img key={i} className={imageClass(i)} src={image}></img>
                                ))
                        }   
                        {
                            imageList.length > 0 
                                ? (isFocus ? 
                                    <a className={styles.mask}>
                                        <div className={styles.reset} onClick={this.handleReset}>
                                            {this.reset}
                                        </div>
                                    </a>
                                    : <img className={styles.close} src={iconClose}></img>)
                                : null
                        }
                    </div>
                    <div className={styles.rightContent}>
                        <input className={styles.name} 
                            type="text"
                            onKeyUp={this.checkLength}
                            maxLength={maxLength}
                            value={showValue}
                            placeholder={this.placeholder} 
                            onChange={this.handleChange}>
                        </input>
                        <div className={styles.progress}>
                            <div className={classNames(styles.blue,confidence==1&&styles.allBorderRadius)} style={{width:confidence*100+'%'}}></div>
                            <div className={classNames(styles.gray,confidence==0&&styles.allBorderRadius)} style={{width:(1-confidence)*100+'%'}}></div>
                            <span className={styles.confidence}>{hundredConfidence}%</span> 
                        </div>
                        <div className={classNames(styles.train,trainDisable&&styles.trainDisable)} onClick={this.handleTrain}>
                            {this.learn}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(ImageClassification);
