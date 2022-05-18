import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import styles from './zwb-course.css';
import bindAll from 'lodash.bindall';
import PropTypes, { func } from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

import iconExpand from './image/icon_kecheng_zd.svg';
import iconCollapses from './image/icon_kecheng_sq.svg';

import iconArrowleftB from './image/icon_arrowleft_b.svg';
import iconArrowleftG from './image/icon_arrowleft_g.svg';
import iconArrowrightB from './image/icon_arrowright_b.svg';
import iconArrowrightY from './image/icon_arrowright_y.svg';
import iconArrowdown from './image/icon_arrowdown.svg';
import iconArrowdownB from './image/icon_arrowdown_b.svg';
import iconArrowupW from './image/icon_arrowup_w.svg';
import iconDel from './image/icon_del.png';
import iconShare from './image/icon_share.svg';

import OnlineCourseWare from './online-courseware.jsx';
import CourseMaterialPreview from './course-material-preview.jsx';
import { tcCos, getObjectUrl } from '../../lib/txcloud.js';
import ModalComponent from '../../containers/modal.jsx';
import { download, sortWithSortNo } from '../../lib/utils';
import { toasts } from '../toast-special/toast.jsx';
import Ellipsis from '../ellipsis';
import { 
    updateCdcUrl, 
    updateZwbCourseData, 
    updateOnlineCoursewareData, 
    updateCourseMaterialBoxData, 
    updateLoadingCourse, 
    updateCourseSku, 
    updateRequestCdcData, 
    updateFirstClassHourData, 
    updateClassHourInfoLoading 
} from '../../reducers/zwb-course';
import {
    setUserTab,
    LOGIN_TAB_INDEX,
} from '../../reducers/login-register-special.js';
import {
    openTipsLibrary,
} from '../../reducers/modals';
import { setRemindSave, setRemindSaveType } from '../../reducers/material-special';

import {
    updateWindowDownloadFlag
} from '../../reducers/window-event.js';
  

import {
    queryClassUnitBasicInfoList,
    queryClassHourInfoList,
    querySKUDetailInfo,
    queryCourseMaterialInfo,
    statsUserAction
} from '../../lib/busi-proxy/busi-proxy.js';

import { ccUrl } from '../../lib/busi-proxy/busi-proxy';
import { getOsType,getBrowser,getBrowserLanguage } from '../../lib/os-type.js';
import { getPackageConfig } from '../../lib/package-config.js';
const formatLesson = (value = "", index) => {
    return value.replace("#", index)
}

const NetErrorToast = (text) => {
    return (
        <Box className={styles.netErrorStyle}>
            <span>{text}</span>
        </Box>
    );
}

const messages = defineMessages({
    netErrorMessage: {
        id: 'gui.net.errorMessage',
        defaultMessage: 'Network error, please check your network.',
    },
    shareLink: {
        id: 'gui.projectPage.shareLink',
        defaultMessage: 'Share',
        description: '分享链接'
    },
    url: {
        id: 'gui.projectPage.url',
        defaultMessage: 'URL',
        description: 'URL'
    },
    cancel: {
        id: 'gui.projectPage.cancel',
        defaultMessage: 'Cancel',
        description: '取消'
    },
    copyUrl: {
        id: 'gui.projectPage.copyUrl',
        defaultMessage: 'Copy URL',
        description: '复制链接'
    },
    copyUrlSuccessfully: {
        id: 'gui.projectPage.copyUrlSuccessfully',
        defaultMessage: 'Copied successfully',
        description: '复制成功'
    },
    download: {
        id: 'gui.coursePage.download',
        defaultMessage: 'Download',
        description: '下载'
    },
    courseNotExist: {
        id: 'gui.coursePage.courseNotExist',
        defaultMessage: 'This course does not exist',
        description: '课程已失效'
    },
    preLesson: {
        id: 'gui.coursePage.preLesson',
        defaultMessage: 'Previous',
        description: '上一课'
    },
    classUnit: {
        id: 'gui.coursePage.classUnit',
        defaultMessage: '#',
        description: '第#课'
    },
    moreLesson: {
        id: 'gui.coursePage.moreLesson',
        defaultMessage: 'More',
        description: '更多'
    },
    nextLesson: {
        id: 'gui.coursePage.nextLesson',
        defaultMessage: 'Next',
        description: '下一课'
    },
    lessonOutline: {
        id: 'gui.coursePage.lessonOutline',
        defaultMessage: 'Lesson Outline',
        description: '课程大纲'
    },
    examples: {
        id: 'gui.coursePage.examples',
        defaultMessage: 'Examples',
        description: '示例程序'
    },
    btnView: {
        id: 'gui.lessonOutline.btnView',
        defaultMessage: 'View',
        description: '查看'
    },
    teacherSupport: {
        id: 'gui.coursePage.teacherSupport',
        defaultMessage: 'Teacher Support',
        description: '老师用资料'
    },
    studentSupport: {
        id: 'gui.coursePage.studentSupport',
        defaultMessage: 'Student Material',
        description: '学员用资料'
    },
    relatedGoods: {
        id: 'gui.coursePage.relatedGoods',
        defaultMessage: 'Related Products',
        description: '相关产品'
    },
})

class ZwbCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidepaneShow: false,                  //侧边栏是否展开
            isFullscreen: false,                    //是否全屏
            skuDetailInfo: null,                    //sku详细信息
            teachingPlanList: new Array(),          //教案资料列表，非cdc
            studyAidList: new Array(),              //学员资料列表，非cdc
            sampleCdcList: new Array(),             //cdc示例列表
            classHourInfo: null,                    //当前课时信息
            classHourInfoList: [],                   //课时列表，所有单元课累计的课时
            classHourCount: 0,                       //可以看到的课时总数，需要遍历单元课列表计算
            currentClassHourNum: 0,                  //当前课时的序号
            previewCourseMaterialInfo: {},          //预览的素材信息
            showPreviewCourseMaterial: false,       //显示预览素材弹窗
            showClassHourCatalogue: false,            //显示课时目录大纲
            hasOpenCdc: false,
            showShareModal: false,                  //分享弹窗
            copyStatus: 0                           //1复制成功，0正常
        }
        bindAll(this, [
            'onExpandBtnClick',
            'onShareBtnClick',
            'onLastClassHour',
            'onNextClassHour',
            'onShowClassHourCatalogue',
            'handleOnFullscreen',
            'onPreviewModalClose',
            'onFullscreenModalClose',
            'onShareBtnCancel',
            'onShareBtnCopy'
        ]);

        this.courseUUID = '';
        this.skuUUID = '';
        this.skuNumber = ''
        this.ccUrl = ccUrl;
        
        let { name } = getOsType();
        let { browserName,browserVersion } = getBrowser();
        this.browserName = browserName;
        this.browserVersion = browserVersion;
        this.browserOS = name;
        this.browserLanguage = getBrowserLanguage();
    }

    componentWillReceiveProps(nextProps) {
        if (((this.props.selectedCourseUUID !== nextProps.selectedCourseUUID) && nextProps.selectedCourseUUID !== '-') || 
        ((this.props.selectedSkuUUID !== nextProps.selectedSkuUUID) && nextProps.selectedSkuUUID !== '-')) {
            this.courseUUID = nextProps.selectedCourseUUID;
            this.skuUUID = nextProps.selectedSkuUUID;
            this.skuNumber = nextProps.selectedSkuNumber;
            this.handleQuerySKUDetailInfo();
            this.setState({
                currentClassHourNum: 0,
                hasOpenCdc: false,
                showClassHourCatalogue: false,
            })
        }

        // 用户从登录状态切换到未登录状态，回到第一课
        if (this.props.loginStatus === true && nextProps.loginStatus === false) {
            const { classHourInfoList, currentClassHourNum } = this.state;
            if (currentClassHourNum !== 0) {
                const classHourInfo = classHourInfoList[0];
                this.setCurrentClassHourInfo(classHourInfo);
                this.setState({ currentClassHourNum: 0 });
            }
        }

        if (JSON.stringify(nextProps.zwb_course_data) !== '{}') {
            this.courseUUID = nextProps.zwb_course_data.courseUUID;
            this.skuUUID = nextProps.zwb_course_data.skuUUID;
            this.skuNumber = nextProps.zwb_course_data.selectedSkuNumber;
            delete nextProps.zwb_course_data.courseUUID;
            delete nextProps.zwb_course_data.skuUUID;
            delete nextProps.zwb_course_data.skuNumber;
            this.setState({ ...nextProps.zwb_course_data });
            this.props.onUpdateZwbCourseData({});
        }
    }

    componentWillUnmount() {
        this.props.onUpdateZwbCourseData({ 
            ...this.state, 
            courseUUID: this.courseUUID, 
            skuUUID: this.skuUUID,
            skuNumber: this.skuNumber
        });
    }

    handleQuerySKUDetailInfo() {
        if (!this.skuUUID) {
            return
        }
        const { loginStatus } = this.props;
        let params = {
            authInfo: this.props.authInfo,
            skuUUID: this.skuUUID,
            behaviorType: loginStatus ? 'pv for courseDetail' : 'pv for sample'
        }

        querySKUDetailInfo(params).then((data) => {
            this.handleQueryClassUnitBasicInfoList();
            this.setState({ isSidepaneShow: true });
            let skuDetailInfo = data.skuDetailInfo;
            if (skuDetailInfo) {
                this.setState({
                    skuDetailInfo: skuDetailInfo
                })
            }

        }, (err) => {
            if (err.errorCode === 9050086 || err.errorCode === 6010003 || err.errorCode === 9040085) {
                toasts.error(this.props.intl.formatMessage(messages.courseNotExist));
            }
            this.props.onUpdateCourseSku('', '', '');
            this.props.onUpdateCdcUrl('', '');
        });
    }

    handleQueryClassUnitBasicInfoList() {
        if (!this.courseUUID || !this.skuUUID) {
            return
        }
        let params = {
            authInfo: this.props.authInfo,
            courseUUID: this.courseUUID,
            skuUUID: this.skuUUID,
            // isActivated: false,
        }
        //单元课列表只会拿一次
        this.props.onUpdateClassHourInfoLoading(true);
        queryClassUnitBasicInfoList(params).then(async (data) => {
            let classUnitBasicInfoList = sortWithSortNo(data.classUnitBasicInfoList);
            let classHourInfoList = [];
            let classHourCount = 0;
            for (let i = 0; i < classUnitBasicInfoList.length; i++) {
                let classUnitBasicInfo = classUnitBasicInfoList[i];
                //判断该单元课有没有课时
                if (classUnitBasicInfo.classHourCount > 0) {
                    let classUnitUUID = classUnitBasicInfo.classUnitUUID;
                    if (classUnitUUID) {
                        let data = await this.handleQueryClassHourInfoList(classUnitUUID, 0)
                        let respClassHourInfoList = sortWithSortNo(data.classHourInfoList);
                        if (data.errorCode == 0 && respClassHourInfoList && respClassHourInfoList.length > 0) {
                            //以实际数组长度为准，未激活的sku，只返回一个课时
                            classHourCount += respClassHourInfoList.length;
                            classHourInfoList = classHourInfoList.concat(respClassHourInfoList);
                        }
                    }
                }
            }

            if (classHourInfoList.length > 0) {
                let classHourInfo = classHourInfoList[0];
                this.setCurrentClassHourInfo(classHourInfo);
            }

            this.setState({
                classHourCount,
                currentClassHourNum: 0,
                classHourInfoList,

            })
            this.props.onUpdateClassHourInfoLoading(false);
        }, (err) => {
            // toasts.error('操作失败');
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
            }
        });
    }

    handleQueryClassHourInfoList(classUnitUUID) {
        let params = {
            authInfo: this.props.authInfo,
            classUnitUUID: classUnitUUID,
            courseUUID: this.courseUUID,
            skuUUID: this.skuUUID,
        }
        return queryClassHourInfoList(params);
    }

    setCurrentClassHourInfo(classHourInfo) {
        if (classHourInfo) {
            let sampleCdcList = new Array();
            let teachingPlanList = new Array();
            let studyAidList = new Array();

            if (classHourInfo) {
                let teachingPlanUUIDRefList = classHourInfo.teachingPlanUUIDRefList;
                if (teachingPlanUUIDRefList && teachingPlanUUIDRefList.length > 0) {
                    teachingPlanUUIDRefList = sortWithSortNo(teachingPlanUUIDRefList);
                    teachingPlanUUIDRefList.map((item, index) => {
                        item.type = 'teachingPlan';
                        if (item.courseMaterialType == "CDC") {
                            item.isCdc = true;
                            sampleCdcList.push(item);
                        } else {
                            teachingPlanList.push(item);
                        }
                    })
                }
                let studyAidUUIDRefList = classHourInfo.studyAidUUIDRefList;
                if (studyAidUUIDRefList && studyAidUUIDRefList.length > 0) {
                    studyAidUUIDRefList = sortWithSortNo(studyAidUUIDRefList);
                    studyAidUUIDRefList.map((item, index) => {
                        item.type = 'studyAid';
                        if (item.courseMaterialType == "CDC") {
                            item.isCdc = true;
                            sampleCdcList.push(item);
                        } else {
                            studyAidList.push(item);
                        }
                    })
                }
            }

            this.setState({
                classHourInfo,
                sampleCdcList,
                teachingPlanList,
                studyAidList
            }, () => {
                const { sampleCdcList, currentClassHourNum } = this.state;
                if (!this.state.hasOpenCdc && currentClassHourNum === 0) {
                    this.setState({ hasOpenCdc: true });
                    if (sampleCdcList.length > 0) {
                        this.onDownloadClick(sampleCdcList[0], true);
                    } else {
                        if (this.props.cdcUrl) {
                            this.props.onUpdateCdcUrl('', '');
                        } else {
                            this.props.onUpdateCdcUrl('-', '-');
                            setTimeout(() => {
                                this.props.onUpdateCdcUrl('', '');
                            }, 100);
                        }
                    }
                }
            });
            const zwbCourseContentSidepane  = document.getElementById('zwbCourseContentSidepane');
            if (zwbCourseContentSidepane) {
                zwbCourseContentSidepane.scrollTop = 0;
            }
        }
    }

    //上一课时
    onLastClassHour() {
        const {
            currentClassHourNum,
            classHourInfoList,
        } = this.state;

        if (currentClassHourNum > 0) {
            let classHourInfo = classHourInfoList[currentClassHourNum - 1];
            this.setCurrentClassHourInfo(classHourInfo);
            this.setState({
                currentClassHourNum: currentClassHourNum - 1,
            });
        }

    }

    //下一课时
    onNextClassHour() {
        const { loginStatus } = this.props;
        // 已登录，正常预览  未登录，打开登录弹框
        if (loginStatus) {
            const {
                currentClassHourNum,
                classHourInfoList,
                classHourCount
            } = this.state;

            //不是最后一课
            if (classHourCount > currentClassHourNum + 1) {

                let classHourInfo = classHourInfoList[currentClassHourNum + 1];
                this.setCurrentClassHourInfo(classHourInfo);
                this.setState({
                    currentClassHourNum: currentClassHourNum + 1,
                });
            } else if (classHourCount == currentClassHourNum + 1) {//更多课程
                if (this.props.onOpenCourseModal) {
                    this.props.onOpenCourseModal()
                }
                // this.handleToCCLesson();
            }
        } else {
            if (!navigator.onLine) {
                toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(messages.netErrorMessage)));
                return;
            }
            this.props.onSetTab(LOGIN_TAB_INDEX);
        }
    }

    // //跳转CC编程课
    // handleToCCLesson() {
    //     if (this.props.isProjectSaved) {
    //         this.props.onOpenTipLibrary();
    //     } else {
    //         this.props.onSetRemindSave(true);
    //         this.props.onSetRemindSaveType('openReturnableZwbCourse');
    //     }
    // }

    //显示课时大纲
    onShowClassHourCatalogue() {
        const {
            showClassHourCatalogue
        } = this.state;
        this.setState({
            showClassHourCatalogue: !showClassHourCatalogue
        }, () => {
            const { showClassHourCatalogue, currentClassHourNum } = this.state;
            if(showClassHourCatalogue) {
                setTimeout(() => {  // 此处需要回调
                    const currentClassHourDiv =  document.getElementById('classHourItem_' + currentClassHourNum);
                    const currentClassHourDivOffsetTop = currentClassHourDiv.offsetTop;
                    const catalogueContentDiv = document.getElementById('catalogueContent');
                    const catalogueContentDivOffsetDiv = catalogueContentDiv.offsetHeight;
                    catalogueContentDiv.scrollTop = currentClassHourDivOffsetTop - catalogueContentDivOffsetDiv + 300;
                },0)
            }
        });
    }

    onSelectClassHour(classHourInfo, index) {
        if (!this.props.loginStatus && index !== 0) {
            if (!navigator.onLine) {
                toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(messages.netErrorMessage)));
                return;
            }
            this.props.onSetTab(LOGIN_TAB_INDEX);
            return;
        }

        if (classHourInfo) {
            this.setCurrentClassHourInfo(classHourInfo);
        }

        this.setState({
            currentClassHourNum: index,
            showClassHourCatalogue: false
        })
    }

    handleOnFullscreen(isFullscreen) {
        this.setState({
            isFullscreen
        });
    }

    onFullscreenModalClose() {
        this.setState({
            isFullscreen: false
        });
    }

    //预览素材
    onReviewMaterialClick(courseMaterial) {
        const { authInfo } = this.props;
        const params = {
            authInfo,
            courseMaterialUUID: courseMaterial.courseMaterialUUID,
            courseUUID: this.courseUUID,
            skuUUID: this.skuUUID,
            courseMaterialRelType: courseMaterial.type,
        }
        queryCourseMaterialInfo(params).then((data) => {
            const courseMaterialInfo = data.courseMaterialInfo;
            this.setState({
                previewCourseMaterialInfo: courseMaterialInfo,
                showPreviewCourseMaterial: true
            });
        })
    }

    //下载素材 或者载入CDC --------通过courseMaterial.isCdc判断
    onDownloadClick(courseMaterial, withoutSave) {
        const { authInfo } = this.props;
        const params = {
            authInfo,
            courseMaterialUUID: courseMaterial.courseMaterialUUID,
            courseUUID: this.courseUUID,
            skuUUID: this.skuUUID,
            courseMaterialRelType: courseMaterial.type,
        }

        // 如果点击打开cdc文件，则需判断当前打开的工程文件是否已经保存
        if (courseMaterial.isCdc && !this.props.isProjectSaved && !withoutSave) {
            this.props.onSetRemindSave(true);
            this.props.onSetRemindSaveType('openSelectedCDC');
            this.props.onUpdateRequestCdcData(params);
            return
        }

        queryCourseMaterialInfo(params).then((data) => {
            const courseMaterialInfo = data.courseMaterialInfo;
            this.cos = tcCos(authInfo, courseMaterialInfo.courseMaterialCosFile.cosBucketName);
            getObjectUrl(this.cos, courseMaterialInfo.courseMaterialCosFile.cosBucketName, courseMaterialInfo.courseMaterialCosFile.cosKey).then((url) => {
                // 是cdc文件，则载入
                if (courseMaterial.isCdc) {
                    const fileName = courseMaterialInfo.courseMaterialBasicInfo.courseMaterialName;
                    const fileNameIndex = fileName.lastIndexOf('.');
                    let cdcName = '';
                    if (fileNameIndex !== -1) {
                        const suffix = fileName.substring(fileNameIndex);
                        if (suffix === '.cdc') {
                            cdcName = fileName.lastIndexOf('.') !== -1 ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
                        } else {
                            cdcName = fileName;
                        }
                    } else {
                        cdcName = fileName;
                    }
                    this.props.onUpdateCdcUrl(url, cdcName);
                }
                // 不是cdc文件，则触发下载
                else {
                    this.props.updateWindowDownloadFlag(true);
                    setTimeout(()=>{
                        download(url);
                    }, 100)
                }
            })
        })
    }

    //侧边栏展开折叠
    onExpandBtnClick(e) {
        const {
            isSidepaneShow
        } = this.state;

        this.setState({
            isSidepaneShow: !isSidepaneShow
        });
    }

    //分享
    onShareBtnClick() {
        this.setState({ showShareModal: true })
    }
    //取消复制
    onShareBtnCancel() {
        this.setState({ showShareModal: false })
    }

    openNewWindow(url) {
        let vm = this.props.vm
        if (vm) {
            vm.deviceEngine.sendWindowMessage({
                action: 'open-document',
                args: {
                    url
                }
            });
        }
    }

    onShareBtnCopy() {
        var clipBoardContent= `${this.ccUrl}?sku=${this.props.selectedSkuNumber}`;
        const oInput = document.createElement('input');
        oInput.value = clipBoardContent;
        document.body.appendChild(oInput);
        oInput.select();
        const copyResult = document.execCommand('copy');
        document.body.removeChild(oInput);
        if (copyResult) {
            this.reqStatsUserAction(clipBoardContent);
            this.setState({ copyStatus: 1 }, () => {
                setTimeout(() => {
                    this.setState({ copyStatus: 0 })
                }, 3000);
            })
        }
    }

    //请求sku复制统计接口 
    reqStatsUserAction(skuUrl) {
        const { skuDetailInfo } = this.state;
        // 获取用户信息
        let userInfo = this.props.userInfo || {};
        let {
            userAccount = 'codecraft.chmakerd.com',
            userUUID = '',
            userIdentity = "T",
        } = userInfo;
        const packageConfig = getPackageConfig();

        let skuBasicInfo = skuDetailInfo.skuBasicInfo || {};
        let VSkuParams = {
            ownerID: skuBasicInfo.ownerId || '999999999', 
            skuUUID: skuBasicInfo.skuUUID,
            skuNumber: skuBasicInfo.skuNumber,
            language: skuBasicInfo.language,
            skuUrl,
        }

        // 定义请求参数
        const params = {
            authInfo: this.props.authInfo,
            userBasicInfo: {
                userAccount,
                userUUID,
                userIdentity,
            },
            srcChannel: {
                channelType: packageConfig.channelType,
                channelVersion: packageConfig.channelVersion
            },
            dstChannel: {
                channelType: packageConfig.channelType,
                channelVersion: packageConfig.channelVersion
            },
            browserInfo: {
                ip: '',
                visitTime: '',
                browserName: this.browserName,
                browserVersion: this.browserVersion,
                browserLanguage: this.browserLanguage,
                browserOS: this.browserOS
            },
            visitedObjectType: 'VSkuURLCopy',
            visitedObjectInfo: VSkuParams,
        }

        // 触发课程访问统计接口
        statsUserAction(params);
    }

    onPreviewModalClose() {
        this.setState({ showPreviewCourseMaterial: false })
    }

    render() {
        const {
            className,
            authInfo,
            selectedSkuUUID,
            selectedCourseUUID,
            selectedSkuNumber,
            intl,
            onUpdateOnlineCoursewareData,
            online_courseware_data,
            course_material_data,
            onUpdateCourseMaterialBoxData,
            onUpdateLoadingCourse,
            loginStatus,
            firstClassHourData,
            onUpdateFirstClassHourData
        } = this.props;

        const {
            isSidepaneShow,
            isFullscreen,
            classHourInfo,
            classHourInfoList,
            currentClassHourNum,
            skuDetailInfo,
            sampleCdcList,
            teachingPlanList,
            studyAidList,
            classHourCount,
            showPreviewCourseMaterial,
            showClassHourCatalogue,
            previewCourseMaterialInfo,
            showShareModal,
            copyStatus
        } = this.state;

        let skuRelatedGoodsList = [];
        if (skuDetailInfo && skuDetailInfo.skuRelatedGoodsList) {
            skuRelatedGoodsList = sortWithSortNo(skuDetailInfo.skuRelatedGoodsList);
        }

        let classHourName = classHourInfo ? classHourInfo.classHourName : '';

        let isShowTeachingPlanDownload = false, isShowStudyAidDownload = false;
        if (teachingPlanList.length > 0) {
            for (let i = 0; i < teachingPlanList.length; i++) {
                let courseMaterialType = teachingPlanList[i].courseMaterialType.toLowerCase();
                if (courseMaterialType === 'zip' || courseMaterialType === 'rar') {
                    isShowTeachingPlanDownload = true;
                    break;
                }
            }
        }
        if (studyAidList.length > 0) {
            for (let i = 0; i < studyAidList.length; i++) {
                let courseMaterialType = studyAidList[i].courseMaterialType.toLowerCase();
                if (courseMaterialType === 'zip' || courseMaterialType === 'rar') {
                    isShowStudyAidDownload = true;
                    break;
                }
            }
        }

        const topBar = (
            <div className={classNames(styles.topBar,
                {
                    [styles.topBarIsfixed]: !isFullscreen
                }
            )}>
                {
                    classHourCount > 1 && <div className={classNames(
                        styles.topBarItem,
                        styles.lastClassHour,
                        currentClassHourNum == 0 ? styles.topBarItemDisable : null
                    )}
                        onClick={this.onLastClassHour}
                    >
                        <img className={styles.arrowIcon} src={currentClassHourNum == 0 ? iconArrowleftG : iconArrowleftB} />
                        <span className={classNames(
                            styles.aroundTitle,
                            styles.titleMargin,
                            currentClassHourNum == 0 ? styles.titleColorGrey : styles.titleColorBlue
                        )}>{this.props.intl.formatMessage(messages.preLesson)}</span>
                    </div>
                }
                <div className={classNames(
                    styles.topBarItem,
                    isFullscreen ? styles.topBarItemMiddle : null,
                )}
                    onClick={(isFullscreen || (classHourInfoList && classHourInfoList.length === 1)) ? null : this.onShowClassHourCatalogue}
                >
                    {
                        isFullscreen ?
                            <div className={classNames(
                                styles.middleTitleFullscreen,
                                styles.titleMargin,
                            )}>
                                <Ellipsis tooltip={true} lines={1} parentId={"class-name"}>
                                    {formatLesson(this.props.intl.formatMessage(messages.classUnit), currentClassHourNum + 1) + " " + classHourName}
                                </Ellipsis>
                            </div> :
                            <div className={classNames(
                                styles.middleTitle,
                                styles.titleMargin,
                            )}>
                                {formatLesson(this.props.intl.formatMessage(messages.classUnit), currentClassHourNum + 1)}
                                {classHourInfoList && classHourInfoList.length > 1 && <img className={styles.arrowIconMiddle} src={iconArrowdown} />}
                            </div>
                    }
                </div>
                {
                    <div className={classNames(
                        styles.topBarItem,
                        styles.nextClassHour,
                    )}
                        onClick={this.onNextClassHour}
                    >
                        <span className={classNames(
                            styles.aroundTitle,
                            styles.titleMargin,
                            currentClassHourNum + 1 == classHourCount ? styles.titleColorYellow : styles.titleColorBlue
                        )}>{currentClassHourNum + 1 == classHourCount ? this.props.intl.formatMessage(messages.moreLesson) : this.props.intl.formatMessage(messages.nextLesson)}</span>
                        <img className={styles.arrowIcon} src={currentClassHourNum + 1 == classHourCount ? iconArrowrightY : iconArrowrightB}></img>
                    </div>
                }
            </div>
        );

        const expandBtnIcon = isSidepaneShow ? iconExpand : iconCollapses;
        
        return (
            selectedSkuUUID && selectedCourseUUID && <div
                className={classNames(
                    isFullscreen ? styles.zwbCourseBoxFullscreen : styles.zwbCourseBoxSidepane,
                    className,
                    {
                        [styles.zwbCourseBoxSidepaneShow]: !isFullscreen && isSidepaneShow
                    },
                    {
                        [styles.zwbCourseBoxSidepaneDisable]: !isFullscreen && !isSidepaneShow
                    }
                )}
                onClick={isFullscreen ? () => {
                    if (showClassHourCatalogue) return;
                    this.onFullscreenModalClose();
                } : null}
            >
                {/*收起打开按钮*/}
                <div className={isFullscreen ? styles.expandBtnHidden : styles.expandBtn}
                    onClick={this.onExpandBtnClick}
                >
                    <img className={styles.expandIcon} src={expandBtnIcon} alt="" />
                </div>

                <div className={isSidepaneShow ? styles.shareBtn : styles.shareBtnHidden}
                    onClick={this.onShareBtnClick}
                >
                    <img className={styles.shareIcon} src={iconShare} alt="" />
                </div>

                {/*素材预览弹窗*/}
                {
                    showPreviewCourseMaterial && <ModalComponent
                        isOpen={true}
                        showClose={true}
                        onRequestClose={this.onPreviewModalClose}
                        visiableTitle={false}
                        id='previewModal'
                        contentLabel='previewModal'
                    >
                        <CourseMaterialPreview
                            className={styles.courseMaterialPreview}
                            courseMaterialInfo={previewCourseMaterialInfo}
                            authInfo={authInfo}
                            loginStatus={loginStatus}
                        >
                        </CourseMaterialPreview>
                    </ModalComponent>
                }

                {/*课程课时大纲*/}
                {
                    isSidepaneShow && showClassHourCatalogue && <div
                        className={styles.classHourCatalogueBox}
                    >
                        <div className={isFullscreen ? styles.classHourCatalogueFullscreen : styles.classHourCatalogue}
                            onClick={isFullscreen ? e => {
                                e.preventDefault();
                                e.stopPropagation();
                            } : null}>
                            <div className={isFullscreen ? styles.classHourCatalogueContentFullscreen : styles.classHourCatalogueContent}>
                                <div className={styles.catalogueTopBar}>
                                    <div className={styles.catalogueTopBarItem}
                                        onClick={this.onShowClassHourCatalogue}
                                    >
                                        <img className={styles.catalogueTopBarIcon} src={iconArrowupW}></img>
                                        <div className={styles.catalogueTopBarTitle}>{this.props.intl.formatMessage(messages.lessonOutline)}</div>
                                    </div>
                                </div>

                                <div className={styles.catalogueDivider}></div>

                                <div className={styles.catalogueContent} id={'catalogueContent'}>
                                    <div className={styles.catalogueContentTitle} >
                                        <Ellipsis tooltip lines={2} parentId={"course-name"}>{skuDetailInfo && skuDetailInfo.skuBasicInfo && skuDetailInfo.skuBasicInfo.courseName}</Ellipsis>
                                    </div>
                                    {
                                        classHourInfoList.map((item, index) => {
                                            return (
                                                <div
                                                    className={classNames(
                                                        styles.classHourItem,
                                                    )}
                                                    key={item.classHourUUID}
                                                    onClick={this.onSelectClassHour.bind(this, item, index)}
                                                    id={'classHourItem_' + index}
                                                >
                                                    <div
                                                        className={classNames(
                                                            styles.classHourName,
                                                            index == currentClassHourNum ? styles.classHourNameBlue : null,
                                                        )}>
                                                        <Ellipsis tooltip lines={1} parentId={"classhour-name" + index}>
                                                            {`${index + 1}. ${item.classHourName}`}
                                                        </Ellipsis>
                                                    </div>


                                                    <div className={styles.classHourCheckBtn}>{this.props.intl.formatMessage(messages.btnView)}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/*课时顶部控制栏*/}
                {(!isFullscreen && isSidepaneShow) && topBar}

                <div className={classNames(isFullscreen ? styles.zwbCourseContentFullscreen :
                    styles.zwbCourseContentSidepane, isSidepaneShow && styles.zwbCourseContentSidepaneShow)}
                    id={'zwbCourseContentSidepane'}
                    >
                    {/*素材预览相关*/}
                    <div className={classNames(
                        styles.classHourBox,
                        isFullscreen ? styles.classHourBoxFullscreen : null
                    )}
                        onClick={isFullscreen ? (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        } : null}
                    >
                        {/*全屏窗口状态下窗口控制栏*/}
                        {
                            isSidepaneShow && isFullscreen && <div className={styles.modalBar}>
                                <div className={styles.modalBarLeftItem}
                                    onClick={this.onShowClassHourCatalogue}
                                >
                                    <img className={styles.arrowDwonIcon} src={iconArrowdownB}></img>
                                    <span className={styles.modalBarLeftItemTitle}>{this.props.intl.formatMessage(messages.lessonOutline)}</span>
                                </div>
                                <div className={styles.modalBarRightItem}
                                    onClick={this.onFullscreenModalClose}
                                >
                                    <img src={iconDel} alt="" />
                                </div>
                            </div>
                        }

                        {/*课时顶部控制栏*/}
                        {isSidepaneShow && isFullscreen && topBar}

                        {/*课时名称*/}
                        {
                            isSidepaneShow && !isFullscreen && <div className={styles.nameBox}
                            >
                                <span className={styles.name}>{classHourInfo ? classHourInfo.classHourName : ''}</span>
                            </div>
                        }
                        {/*素材预览*/}
                        {
                            classHourInfo && <OnlineCourseWare
                                // className={isFullscreen?styles.onlineCourseWareFullscreen:styles.onlineCourseWare}
                                authInfo={authInfo}
                                isFullscreen={isFullscreen}
                                courseUUID={this.courseUUID}
                                skuUUID={this.skuUUID}
                                onlineCourseWareList={classHourInfo.onlineCourseWareUUIDRefList}
                                onFullscreen={this.handleOnFullscreen}
                                onUpdateOnlineCoursewareData={onUpdateOnlineCoursewareData}
                                online_courseware_data={online_courseware_data}
                                course_material_data={course_material_data}
                                onUpdateCourseMaterialBoxData={onUpdateCourseMaterialBoxData}
                                onUpdateLoadingCourse={onUpdateLoadingCourse}
                                loginStatus={loginStatus}
                                currentClassHourNum={currentClassHourNum}
                                firstClassHourData={firstClassHourData}
                                onUpdateFirstClassHourData={onUpdateFirstClassHourData}
                            >
                            </OnlineCourseWare>
                        }
                    </div>

                    {/*课时相关教案，相关产品*/}
                    <div className={isFullscreen ? styles.hidden : styles.courseOtherBox}>
                        {/*分隔线*/}
                        {
                            (sampleCdcList.length > 0 || teachingPlanList.length > 0
                                || studyAidList.length > 0)
                            && <div className={styles.divider}></div>
                        }
                        {/*示例程序*/}
                        {
                            isSidepaneShow && sampleCdcList.length > 0 && <div className={styles.materialGroup}>
                                <div className={styles.materialTitle}>{this.props.intl.formatMessage(messages.examples)}</div>
                                {
                                    sampleCdcList.map((item, index) => {
                                        return (
                                            <div className={styles.materialItem} key={item.courseMaterialUUID + '-e-' + index} id={item.courseMaterialUUID + '-e-' + index}>
                                                <div
                                                    className={styles.materialName}
                                                    onClick={this.onDownloadClick.bind(this, item, false)}
                                                    style={{ width: '100%' }}
                                                >
                                                    <Ellipsis tooltip={true} lines={1} parentId={item.courseMaterialUUID + '-e-' + index}>{item.courseMaterialName}</Ellipsis>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }

                        {/*老师用资料*/}
                        {
                            isSidepaneShow && teachingPlanList.length > 0 && <div className={styles.materialGroup}>
                                <div className={styles.materialTitle}>{this.props.intl.formatMessage(messages.teacherSupport)}</div>
                                {
                                    teachingPlanList.map((item, index) => {
                                        let courseMaterialType = item.courseMaterialType.toLowerCase();
                                        let canDownload = courseMaterialType === 'zip' || courseMaterialType === 'rar';
                                        return (
                                            <div className={styles.materialItem} key={item.courseMaterialUUID + '-t-' + index} id={item.courseMaterialUUID + '-t-' + index}>
                                                <div
                                                    className={classNames(
                                                        styles.materialName,
                                                        canDownload ? styles.black : null,
                                                    )}
                                                    style={{ width: isShowTeachingPlanDownload ? 'calc(100% - 5rem - 12px)' : '100%' }}
                                                    onClick={canDownload ? null : this.onReviewMaterialClick.bind(this, item)}
                                                >
                                                    <Ellipsis tooltip lines={1} parentId={item.courseMaterialUUID + '-t-' + index}>{item.courseMaterialName}</Ellipsis>
                                                </div>
                                                {
                                                    canDownload && <div
                                                        className={styles.materialDownload}
                                                        onClick={this.onDownloadClick.bind(this, item, false)}>
                                                        {this.props.intl.formatMessage(messages.download)}
                                                    </div>
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }

                        {/*学员用资料*/}
                        {
                            isSidepaneShow && studyAidList.length > 0 && <div className={styles.materialGroup}>
                                <div className={styles.materialTitle}>{this.props.intl.formatMessage(messages.studentSupport)}</div>
                                {
                                    studyAidList.map((item, index) => {
                                        let courseMaterialType = item.courseMaterialType.toLowerCase();
                                        let canDownload = courseMaterialType === 'zip' || courseMaterialType === 'rar';
                                        return (
                                            <div className={styles.materialItem} key={item.courseMaterialUUID + '-s-' + index} id={item.courseMaterialUUID + '-s-' + index}>
                                                <div
                                                    className={classNames(
                                                        styles.materialName,
                                                        canDownload ? styles.black : null,
                                                    )}
                                                    style={{ width: isShowStudyAidDownload ? 'calc(100% - 5rem - 12px)' : '100%' }}
                                                    onClick={canDownload ? null : this.onReviewMaterialClick.bind(this, item)}
                                                >
                                                    <Ellipsis tooltip lines={1} parentId={item.courseMaterialUUID + '-s-' + index}>{item.courseMaterialName}</Ellipsis>
                                                </div>
                                                {
                                                    canDownload && <div
                                                        className={styles.materialDownload}
                                                        onClick={this.onDownloadClick.bind(this, item, false)}>
                                                        {this.props.intl.formatMessage(messages.download)}
                                                    </div>
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }

                        {/*相关产品*/}
                        {
                            isSidepaneShow && skuRelatedGoodsList && skuRelatedGoodsList.length > 0 &&
                            <div>
                                {/*分隔线*/}
                                <div className={styles.divider}></div>
                                <div className={styles.materialGroup}>
                                    <div className={styles.materialTitle}>{this.props.intl.formatMessage(messages.relatedGoods)}</div>
                                    {
                                        skuRelatedGoodsList.map((item, index) => {
                                            return (
                                                <div
                                                    key={item.skuRelatedGoodsUUID + '-' + index} id={item.skuRelatedGoodsUUID + '-' + index}
                                                    className={styles.materialItem}
                                                >
                                                    <div
                                                        className={styles.materialName}
                                                        key={item.skuRelatedGoodsUUID}
                                                        id={item.skuRelatedGoodsUUID}
                                                        style={{ width: '100%' }}
                                                        onClick={() => this.openNewWindow(item.skuRelatedGoodsUrl)}
                                                    >
                                                        <Ellipsis tooltip lines={1} parentId={item.skuRelatedGoodsUUID + '-' + index}>{item.skuRelatedGoodsName}</Ellipsis>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>

                </div>

                {/*分享弹窗*/}
                {
                    showShareModal && <ModalComponent
                        isOpen={true}
                        showClose={true}
                        onRequestClose={this.onShareBtnCancel}
                        visiableTitle={false}
                        id='shareModal'
                        contentLabel='shareModal'
                    >
                        <div className={styles.shareModal}>
                            <div className={styles.shareTitle}>
                                {intl.formatMessage(messages.shareLink)}
                            </div>
                            <div className={styles.shareContent}>
                                <span className={styles.shareLink}>
                                    {intl.formatMessage(messages.url)}
                                </span>
                                <span className={styles.shareLinkText}>
                                    {`${this.ccUrl}?sku=${selectedSkuNumber}`}
                                </span>
                            </div>
                            <div className={styles.bottomBar}>
                                <div className={classNames(
                                    styles.bottomBtn,
                                    styles.cancelBtn
                                )}
                                    onClick={this.onShareBtnCancel}
                                >
                                    {intl.formatMessage(messages.cancel)}
                                </div>
                                <div className={classNames(
                                    styles.bottomBtn,
                                    styles.copyBtn,
                                    copyStatus == 1 && styles.copySuccess
                                )}
                                    onClick={this.onShareBtnCopy}
                                >
                                    {intl.formatMessage(copyStatus == 1 ? messages.copyUrlSuccessfully : messages.copyUrl)}
                                </div>
                            </div>
                        </div>
                    </ModalComponent>
                }

            </div>
        )
    }

}

ZwbCourseComponent.propTypes = {
    // value: PropTypes.string,
    // list: PropTypes.array
}

const mapStateToProps = state => {
    // const user = state.session && state.session.session && state.session.session.user;
    return {
        vm: state.scratchGui.vm,
        authInfo: state.scratchGui.loginRegister.authInfo,
        userInfo: state.scratchGui.loginRegister.userInfo,
        loginStatus: state.scratchGui.loginRegister.loginStatus,
        selectedSkuUUID: state.scratchGui.zwbCourse.selectedSkuUUID,
        selectedCourseUUID: state.scratchGui.zwbCourse.selectedCourseUUID,
        selectedSkuNumber: state.scratchGui.zwbCourse.selectedSkuNumber,
        zwb_course_data: state.scratchGui.zwbCourse.zwb_course_data,
        online_courseware_data: state.scratchGui.zwbCourse.online_courseware_data,
        course_material_data: state.scratchGui.zwbCourse.course_material_data,
        isProjectSaved: state.scratchGui.material.isProjectSaved,
        cdcUrl: state.scratchGui.zwbCourse.cdcUrl,
        firstClassHourData: state.scratchGui.zwbCourse.firstClassHourData,
    }
};

const mapDispatchToProps = dispatch => ({
    onUpdateCdcUrl: (cdcUrl, cdcName) => dispatch(updateCdcUrl(cdcUrl, cdcName || '')),
    onSetTab: tab => dispatch(setUserTab(tab)),
    onUpdateZwbCourseData: data => dispatch(updateZwbCourseData(data)),
    onUpdateOnlineCoursewareData: data => dispatch(updateOnlineCoursewareData(data)),
    onUpdateCourseMaterialBoxData: data => dispatch(updateCourseMaterialBoxData(data)),
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onSetRemindSave: bool => dispatch(setRemindSave(bool)),
    onSetRemindSaveType: type => dispatch(setRemindSaveType(type)),
    onUpdateLoadingCourse: (tag) => dispatch(updateLoadingCourse(tag)),
    onUpdateCourseSku: (skuUUID, courseUUID, skuNumber) => dispatch(updateCourseSku(skuUUID, courseUUID, skuNumber)),
    onUpdateRequestCdcData: (params) => dispatch(updateRequestCdcData(params)),
    onUpdateFirstClassHourData: (params) => dispatch(updateFirstClassHourData(params)),
    updateWindowDownloadFlag: (flag) => dispatch(updateWindowDownloadFlag(flag)),
    onUpdateClassHourInfoLoading: (flag) => dispatch(updateClassHourInfoLoading(flag)),
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ZwbCourseComponent));
