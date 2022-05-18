import classNames from 'classnames';
import React from 'react';
import styles from './online-courseware.css';
import bindAll from 'lodash.bindall';
import PropTypes, { func } from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl,  } from 'react-intl';
import CourseMaterialBox from './course-material-box.jsx'
import AnswerPreview from './exercise-material.jsx';
import { sortWithSortNo } from '../../lib/utils';
import { 
    queryCourseMaterialInfo,
    queryExcerciseInfo
} from '../../lib/busi-proxy/busi-proxy.js';


/**
 * 课时预览
 * 
 */

class OnlineCourseWare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseMaterialInfo: {},//素材信息
            currentNum: 1,//当前显示的素材页码,
            paginationList:[],//当前显示的页码数组
        }
        bindAll(this, [
            'onLastClick',
            'onNextClick',
            'handleOnFullscreen'
        ]);
        this.onlineCourseWareList = [];//课件数组
        this.pageNum = 1;//默认一页
    }

    componentDidMount() {
        const { online_courseware_data, onlineCourseWareList} =this.props;
        if (JSON.stringify(online_courseware_data) !== '{}') {
            this.onlineCourseWareList = online_courseware_data.onlineCourseWareList;
            this.pageNum = online_courseware_data.pageNum;
            delete online_courseware_data.onlineCourseWareList;
            delete online_courseware_data.pageNum;
            this.setState({ ...online_courseware_data }, () => {
                this.setPaginationList(this.pageNum);
                this.handleQueryCourseMaterialInfo(this.state.currentNum);
            });
            this.props.onUpdateOnlineCoursewareData({});
        } else {
            this.updateOnlineCourseWareList(onlineCourseWareList);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.onlineCourseWareList) !== JSON.stringify(nextProps.onlineCourseWareList)) {
            this.setState({ currentNum: 1 }, () => {
                this.updateOnlineCourseWareList(nextProps.onlineCourseWareList);
            });
        }
        if (this.props.loginStatus === true && nextProps.loginStatus === false) {
            this.setState({ courseMaterialInfo: this.props.firstClassHourData, currentNum: 1 }, () => {
                this.pageNum = 1;
                this.setPaginationList(this.pageNum);
            });
        }
    }

    componentWillUnmount() {
        this.props.onUpdateOnlineCoursewareData({ ...this.state, onlineCourseWareList: this.onlineCourseWareList, pageNum: this.pageNum });
    }

    updateOnlineCourseWareList(onlineCourseWareList) {
        if (onlineCourseWareList != null) {
            this.onlineCourseWareList = sortWithSortNo(onlineCourseWareList);
        }

        if (this.onlineCourseWareList.length > 0) {
            this.handleQueryCourseMaterialInfo(this.state.currentNum);
        }
        this.pageNum = 1;
        this.setPaginationList(this.pageNum);
    }


    handleQueryCourseMaterialInfo(num) {
        const { authInfo, courseUUID, skuUUID, onUpdateLoadingCourse} = this.props;
        if (this.onlineCourseWareList.length === 0) {
            return
        }
        let onlineCourseWare = this.onlineCourseWareList[num-1];
        let courseWareUUID = onlineCourseWare.courseWareUUID;
        let courseWareType = onlineCourseWare.courseWareType;

        let params = {
            authInfo: authInfo,
            courseMaterialUUID: courseWareUUID,
            exerciseUUID: courseWareUUID,
            courseUUID: courseUUID,
            skuUUID: skuUUID,
            courseMaterialRelType: "onlineCourseWare",
        }

        // 习题素材
        if ('exercise' == courseWareType) {
            onUpdateLoadingCourse(true);
            queryExcerciseInfo(params).then((data) => {
                let mInfo = Object.assign({}, data.exerciseInfo, {
                    mType: courseWareType
                });
                this.setState({
                    courseMaterialInfo: {}
                }, () => {
                    this.setState({
                        courseMaterialInfo: mInfo
                    })
                });
                if (this.props.currentClassHourNum === 0 && num === 1) {
                    this.props.onUpdateFirstClassHourData(mInfo);
                }

                setTimeout(() => {
                    onUpdateLoadingCourse(false);
                }, 500);
                const materialBasicInfo = document.getElementById('materialBasicInfo');
                if(materialBasicInfo) {
                    materialBasicInfo.scrollTop = 0;
                }
            }, (err) => {
                // toasts.error('操作失败');
                if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                }
                this.setState({
                    isLoading: false
                });
                onUpdateLoadingCourse(false);
            });
        }
        // 课程素材
        else {
            onUpdateLoadingCourse(true);
            queryCourseMaterialInfo(params).then((data) => {
                let mInfo = Object.assign({}, data.courseMaterialInfo, {
                    mType: courseWareType
                });
                this.setState({
                    courseMaterialInfo: {}
                }, () => {
                    this.setState({
                        courseMaterialInfo: mInfo
                    })
                });
                if (this.props.currentClassHourNum === 0 && num === 1) {
                    this.props.onUpdateFirstClassHourData(mInfo);
                }
                setTimeout(() => {
                    onUpdateLoadingCourse(false);
                }, 500);
                const materialBasicInfo = document.getElementById('materialBasicInfo');
                if(materialBasicInfo) {
                    materialBasicInfo.scrollTop = 0;
                }
            }, (err) => {
                // toasts.error('操作失败');
                if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                }
                this.setState({
                    isLoading: false
                });
                onUpdateLoadingCourse(false);
            });
        }

        this.setState({
            currentNum: num
        })
    }

    setPaginationList(pageNum){
        let length = this.onlineCourseWareList.length;
        let listCount = 5;//默认一页5个素材
        if (length<=5){//如果小于等于5,那就只有一页
            listCount = length;
        }else if (pageNum*5 > length){//如果该页大于总数，则是最后一页
            listCount = length%5;
        }
        let tempList = [];
        for (let index = 0; index < listCount; index++) {
            tempList[index] = (pageNum-1)*5 + index+1;
        }
        this.setState({
            paginationList:tempList
        });
    }

    handleOnFullscreen() {
        if(this.props.onFullscreen){
            this.props.onFullscreen(!this.props.isFullscreen);
        }
    }
    //上一页
    onLastClick() {
        const { 
            currentNum,
            paginationList
        } = this.state;
        if(currentNum>1){
            this.handleQueryCourseMaterialInfo(currentNum-1);
            if((currentNum)==paginationList[0]){
                this.pageNum -= 1;
                this.setPaginationList(this.pageNum);
            }
        }
    }
    //下一页
    onNextClick() {
        const { 
            currentNum,
            paginationList
        } = this.state;
        if(currentNum<this.onlineCourseWareList.length){
            this.handleQueryCourseMaterialInfo(currentNum+1);
            if((currentNum)==paginationList[4]){
                this.pageNum += 1;
                this.setPaginationList(this.pageNum);
            }
        }
    }
    //页码数字点击
    onNumberClick(number) {
        const { 
            currentNum,
        } = this.state;
        if(currentNum!=number) {
            this.handleQueryCourseMaterialInfo(number);
        }
    }

    render() {
        const {
            className,
            isFullscreen,
            authInfo,
            course_material_data,
            onUpdateCourseMaterialBoxData,
            loginStatus
        } = this.props;

        const {
            courseMaterialInfo,
            paginationList,
            currentNum,
        } = this.state;

        const isCourseFinish = (this.onlineCourseWareList && this.onlineCourseWareList.length === currentNum) ? true : false; // 在线课程是否已预览完成
        let courseMaterialName = '';
        let courseMaterialDescription = '';

        if (courseMaterialInfo) {
            let mType = courseMaterialInfo.mType;
            if ('material' == mType) {
                let basicInfo = courseMaterialInfo.courseMaterialBasicInfo;
                courseMaterialName = basicInfo ? basicInfo.courseMaterialName : '';
                courseMaterialDescription = basicInfo ? basicInfo.courseMaterialDescription : '';
            } else if ('exercise' == mType) {
                courseMaterialName = courseMaterialInfo.exerciseName;
                courseMaterialDescription = courseMaterialInfo.exerciseDescription;
            }
        }

        return (
            this.onlineCourseWareList && this.onlineCourseWareList.length > 0 && <div
                className={classNames(
                    styles.courseWareBox,
                    className
                )}
            >
                {/* 课程素材头部布局 */}
                {
                    courseMaterialInfo && courseMaterialInfo.mType == 'material' && JSON.stringify(authInfo) !== '{}' &&
                    <CourseMaterialBox
                        type={'onlineCourseware'}
                        courseMaterialInfo={courseMaterialInfo}
                        authInfo={authInfo}
                        showisFullscreen={true}
                        isFullscreen={isFullscreen}
                        onFullscreen={this.handleOnFullscreen}
                        course_material_data={course_material_data}
                        onUpdateCourseMaterialBoxData={onUpdateCourseMaterialBoxData}
                        loginStatus={loginStatus}
                    />
                }

                {/* 定义习题布局 */}
                {
                    courseMaterialInfo && courseMaterialInfo.mType == 'exercise' && JSON.stringify(authInfo) !== '{}' &&
                    <AnswerPreview data={courseMaterialInfo} isFullscreen={isFullscreen} onFullscreen={this.handleOnFullscreen} showisFullscreen={true} onNextPage={this.onNextClick} isCourseFinish={isCourseFinish} />
                }

                {/*上下页*/}
                    {
                        (paginationList && (paginationList.length > 1 ||  paginationList[0] !== 1))
                        ? <div className={styles.pagination}>
                            <div className={classNames(
                                styles.lastPage,
                                styles.pageBtn,
                                currentNum == 1 ? styles.pageBtnDisable : null
                            )}
                                onClick={this.onLastClick}
                            >{this.props.intl.formatMessage({id:"gui.coursePage.prePage"})}</div>

                            <div className={styles.numGroup}>
                                {
                                    (paginationList && (paginationList.length > 2 || paginationList[1] !== 2)) ? paginationList.map((item, index) => {
                                        return (
                                            <div
                                                className={classNames(
                                                    styles.num,
                                                    currentNum == item ? styles.blue : styles.grey
                                                )}
                                                key={index}
                                                onClick={this.onNumberClick.bind(this, item)}
                                            >
                                                {item}
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>

                            <div className={classNames(
                                styles.nextPage,
                                styles.pageBtn,
                                currentNum == this.onlineCourseWareList.length ? styles.pageBtnDisable : null
                            )}
                                onClick={this.onNextClick}
                            >{this.props.intl.formatMessage({id:"gui.coursePage.nextPage"})}</div>
                        </div> : (isFullscreen ? <div style={{ height: '1.6rem', marginBottom: '0.8rem' }}></div>:<div></div>)
                    }

                {isFullscreen && <div style={{ width: '100%', borderTop: '1px solid #F2F7FB', margin: '0.8rem 0' }}></div>}

                {/*素材文件名称*/}
                <div 
                    className={classNames(styles.courseMaterialInfo, isFullscreen ? styles.basicInfo : null)}
                    id={'materialBasicInfo'}
                >
                    <div className={styles.name}>{courseMaterialName}</div>
                    <div className={styles.description}>{courseMaterialDescription}</div>
                </div>

            </div>
        )
    }

}

OnlineCourseWare.propTypes = {
    // authInfo: PropTypes.object,
    courseUUID: PropTypes.string,
    skuUUID: PropTypes.string,
    onlineCourseWareList: PropTypes.array
}

export default injectIntl(OnlineCourseWare);

