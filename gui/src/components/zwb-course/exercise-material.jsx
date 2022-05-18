import React from 'react';
import styles from './exercise-material.css';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import ButtonComponent from '../button-special/button.jsx';
import ModalComponent from '../../containers/modal.jsx';
import { sortWithSortNo, startWithHttp } from '../../lib/utils';
import { RadioGroup, Radio } from 'react-radio-group';
import { injectIntl } from 'react-intl';
import picRight from './image/pic_right.png';
import picWrong from './image/pic_wrong.png';
import iconFd from './image/icon_fd.png';
import iconZoom from './image/icon_zoom.png';
import iconZoomBig from './image/icon_zoom_big.svg';
import iconSelected from './image/icon_selected.svg';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  singleChoice: {
      id: 'gui.coursePage.singleChoice',
      defaultMessage: 'Single choice',
  },
  multipleChoice: {
      id: 'gui.coursePage.multipleChoice',
      defaultMessage: 'Multiple choice',
  },
  commitAnswer: {
      id: 'gui.coursePage.commitAnswer',
      defaultMessage: 'Submit answer',
  },
  correct: {
      id: 'gui.coursePage.correct',
      defaultMessage: 'Correct',
  },
  doMore: {
      id: 'gui.coursePage.doMore',
      defaultMessage: 'Try again',
  },
  continueStudy: {
      id: 'gui.coursePage.continueStudy',
      defaultMessage: 'Continue',
  },
  error: {
      id: 'gui.coursePage.error',
      defaultMessage: 'Wrong answer',
  },

  continueAnswer: {
      id: 'gui.coursePage.continueAnswer',
      defaultMessage: 'Continue answering questions',
  },
})

class AnswerPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.data.exerciseType === 1 ? "" : [],

      visible: false,
      answer: [],
      result: false,

      isAnswerHasPic: false,   // 判断选项中是否有图片
      isAnswerHasText: false,   // 判断选项中是否有描述
      isRender: true
    }

    bindAll(this, [
      'radioOnChange',
      'checkboxOnChange',
      'handleOk',
      'handleCancel',
      'handleReDo',
      'handleGoOn',
      'submitAnswers',
      'renderRadioGroup',
      'renderCheckboxGroup',
      'handleOnFullscreen',
    ]);
  };

  componentDidMount() {
    // 存储题目答案
    const { data } = this.props;
    const { answer } = this.state;
    const exerciseOptionList = data.exerciseOptionList;
    exerciseOptionList.map((item) => {
      if (item.isAnswer === 1) {
        answer.push(item.exerciseOptionUUID);
      }
      if (item.exerciseOptionFile && item.exerciseOptionFile.cosUrl) {
        this.setState({ isAnswerHasPic: true });
      }
      if (item.exerciseOptionText) {
        this.setState({ isAnswerHasText: true });
      }
    });
    this.setState({
      answer
    })
  }

  // 单选按钮点击回调
  radioOnChange(value) {
    this.setState({
      value,
    });
  }

  // 多选按钮点击回调
  checkboxOnChange(checkedValues) {
    const checkVavlue = checkedValues;
    const { value } = this.state;
    const i = value.indexOf(checkVavlue);
    if (i === -1) {
      value.push(checkVavlue);
    } else {
      value.splice(i, 1);
    }
    this.setState({
      value
    });
  }

  // 提交答案窗口确定回调 
  handleOk() {
    this.setState({
      visible: false,
    });
  }

  // 提交答案窗口关闭回调 
  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  // 再做一次
  handleReDo() {
    this.setState({
      visible: false,
      value: this.props.data.exerciseType === 1 ? '' : [],
      isRender: false
    }, () => {
      this.setState({
        isRender: true
      })
    });
  }

  // 继续学习
  handleGoOn() {
    this.setState({
      visible: false,
      value: this.props.data.exerciseType === 1 ? '' : [],
    });
    this.props.onNextPage();
  }

  // 提交答案
  submitAnswers() {
    const { value, answer } = this.state;
    let result = true;
    const exerciseType = this.props.data.exerciseType;   // 习题类型 1:单选 2:多选 0:不区分
    if (exerciseType === 1) {
      if (value !== answer[0]) {
        result = false;
      }
    } else if (exerciseType === 2) {
      if (value.length !== answer.length) {
        result = false;
      } else {
        value.map((item) => {
          if (answer.indexOf(item) === -1) {
            result = false;
          }
        })
      }
    }

    this.setState({
      visible: true,
      result,
    });
  }

  handleOnFullscreen() {
    if (this.props.onFullscreen) {
      this.props.onFullscreen(!this.props.isFullscreen);
    }
  }

  renderRadioGroup(item, isAnswerHasPic, isAnswerHasText) {
    return <div className={styles.option_des_container} onClick={() => this.radioOnChange(item.exerciseOptionUUID)}>
      <div className={classNames(styles.radio)}>
        {this.state.value === item.exerciseOptionUUID && <span className={styles.radioCircle}></span>}
      </div>
      <div className={styles.option_des}>
        {isAnswerHasText && <div className={styles.optionText}>{item.exerciseOptionText}</div>}
        {item.exerciseOptionFile && item.exerciseOptionFile.cosUrl ? <div className={styles.optionImgContainer}>
          <div className={styles.optionImg}><img src={startWithHttp(item.exerciseOptionFile.cosUrl)} className={styles.option_img} alt="" /></div>
        </div>
          :
          isAnswerHasPic && <div className={styles.noPic}></div>
        }
      </div>
    </div>
  }

  renderCheckboxGroup(item, isAnswerHasPic, isAnswerHasText) {
    return <div className={styles.option_des_container} onClick={() => this.checkboxOnChange(item.exerciseOptionUUID)}>
      <div className={styles.checkbox} style={{ border: this.state.value.indexOf(item.exerciseOptionUUID) !== -1 ? 'none' : '1px solid #E5E5ED' }} >
        {this.state.value.indexOf(item.exerciseOptionUUID) !== -1 && <img src={iconSelected} className={styles.checkSelected} alt="" />}
      </div>
      <div className={styles.option_des}>
        {isAnswerHasText && <div className={styles.optionText}>{item.exerciseOptionText}</div>}
        {item.exerciseOptionFile && item.exerciseOptionFile.cosUrl ? <div className={styles.optionImgContainer}>
          <div className={styles.optionImg}><img src={startWithHttp(item.exerciseOptionFile.cosUrl)} className={styles.option_img} alt="" /></div>
        </div>
          :
          isAnswerHasPic && <div className={styles.noPic}></div>
        }
      </div>
    </div>
  }


  render() {
    const { data, isFullscreen, onFullscreen, showisFullscreen, isCourseFinish } = this.props;
    const { visible, result, isAnswerHasPic, isAnswerHasText, isRender } = this.state;
    // const courseWareName = data.onlineCourseWareUUIDRef.courseWareName;// 课件名称
    const exercisesName = data.exerciseName;// 习题名称
    const exercisesDes = data.exerciseDescription;// 习题简介
    const exerciseType = data.exerciseType; // 习题类型 1:单选 2:多选 0:不区分
    const urlexerciseDescriptionImg = data.exerciseDescriptionFile.cosUrl;// 习题简介图片地址

    return (
      <div className={styles.mainContentPic}>
        <div className={classNames(styles.answer_content_container, isFullscreen && styles.boxHeightFullscreen)}>
          {isFullscreen && <div className={styles.answer_content}>
            <div className={styles.answer_title}>
                {exerciseType === 1 ? <FormattedMessage
                  defaultMessage="Single choice"
                  id="gui.coursePage.singleChoice"
                /> : <FormattedMessage
                    defaultMessage="Multiple choice"
                    id="gui.coursePage.multipleChoice"
                />}
                <ButtonComponent className={styles.answer_btn} onClick={this.submitAnswers}>
                  <FormattedMessage
                    defaultMessage="Submit answer"
                    id="gui.coursePage.commitAnswer"
                  />
                </ButtonComponent>
            </div>

            {/* <div > */}
              <div className={styles.mainContentContainer}>
                <div className={styles.answer_tips}>{data.exerciseDescription}</div>
                {urlexerciseDescriptionImg && <div className={styles.answer_descriptionimg_container}>
                  <img src={startWithHttp(urlexerciseDescriptionImg)} className={styles.answer_descriptionimg} alt="" />
                </div>}
                <div style={{ margin: '2rem 1rem 1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  {sortWithSortNo(data.exerciseOptionList).map((item) => {
                    return isRender && (exerciseType === 1 ? this.renderRadioGroup(item, isAnswerHasPic, isAnswerHasText) : this.renderCheckboxGroup(item, isAnswerHasPic, isAnswerHasText))
                  })}
                </div>
              </div>
            {/* </div> */}
          </div>}
          {!isFullscreen && <div className={styles.answerBigger} onClick={onFullscreen} >
          {
            urlexerciseDescriptionImg &&
            <div className={styles.answerBiggerDesImg}>
              <img src={startWithHttp(urlexerciseDescriptionImg)} className={styles.answer_descriptionimg} alt="" />
            </div>
          }
          <div className={styles.answerBiggerContent}>
              <img style={{ width: "2.38rem", height: "2.38rem" }} src={iconFd} alt="" />
              <div style={{ fontSize: "0.96rem", color: "rgba(255,255,255,1)", marginTop: "1.2rem" }}>{this.props.intl.formatMessage({id:"gui.coursePage.zoomInLook"})}</div>
            </div>
          </div>}

          {/* 放大缩小工具栏 */}
          {
            showisFullscreen && isFullscreen && <div className={styles.toolBar}>
              <div className={styles.fullscreenBtn} onClick={this.handleOnFullscreen}>
                <img className={classNames(styles.fullscreenIcon)} src={isFullscreen ? iconZoomBig : iconZoom} />
              </div>
            </div>
          }
        </div>

        {/* 答案结果弹框 */}
        {visible && <ModalComponent
          isOpen={true}
          className={styles.loginModal}
          showClose={true}
          onCancel={this.handleCancel}
          onRequestClose={this.handleCancel}
          className={styles.resultModal}>
          {result ?
            <div className={styles.answerResult}>
              <img src={picRight} alt="" />
              <div className={styles.text1}>  
                <FormattedMessage
                  defaultMessage="Correct"
                  id="gui.coursePage.correct"
                />
              </div>
              <div className={styles.text2}>
                <FormattedMessage
                  defaultMessage="Congratulations！You have chosen the correct answer."
                  id="gui.coursePage.congratulation"
                />
              </div>
              <div>
                <ButtonComponent type={'white'} className={styles.answerBtnWhite} onClick={this.handleReDo}>
                  <FormattedMessage
                    defaultMessage="Try again"
                    id="gui.coursePage.doMore"
                  />
                </ButtonComponent>
                {!isCourseFinish && <ButtonComponent className={classNames(styles.answerBtn, isCourseFinish && styles.answerBtnDisabled)} style={{ marginLeft: '20px' }} onClick={isCourseFinish ? null : this.handleGoOn}>
                  <FormattedMessage
                    defaultMessage="Continue"
                    id="gui.coursePage.continueStudy"
                  />
                </ButtonComponent>}
              </div>
            </div>
            :
            <div className={styles.answerResult}>
              <img src={picWrong} alt="" />
              <div className={styles.text1}>
                <FormattedMessage
                  defaultMessage="Wrong answer"
                  id="gui.coursePage.error"
                />
              </div>
              <div className={styles.text2}>
                <FormattedMessage
                  defaultMessage="Let's think about it again, you're almost there!"
                  id="gui.coursePage.considerMore"
                />
              </div>
              <div>
                <ButtonComponent className={styles.answerBtn} onClick={this.handleCancel}>
                  <FormattedMessage
                    defaultMessage="Continue answering questions"
                    id="gui.coursePage.continueAnswer"
                  />
                </ButtonComponent>
              </div>
            </div>
          }
        </ModalComponent>}
      </div>
    )
  }
}

export default injectIntl(AnswerPreview);