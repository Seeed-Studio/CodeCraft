import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import styles from './zwb-project.css';
import bindAll from 'lodash.bindall';
import PropTypes, { func } from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

import iconExpand from './image/icon_kecheng_zd.svg';
import iconCollapses from './image/icon_kecheng_sq.svg';
import iconShare from './image/icon_share.svg';
import iconDrag from './image/icon_drag.svg';

import { tcCos, getObjectUrl } from '../../lib/txcloud.js';
import ModalComponent from '../../containers/modal.jsx';
import { toasts } from '../toast-special/toast.jsx';
import Selector from '../selector/selector.jsx';
import {
    updateZwbProjectData,
    updateProjectUUID,
    updateLoadingProject
} from '../../reducers/zwb-project';
import {
    updateCdcUrl,
    updateRequestCdcData
} from '../../reducers/zwb-course';

import {
    openTipsLibrary,
} from '../../reducers/modals';
import { setRemindSave, setRemindSaveType } from '../../reducers/material-special';

import mouse from '../../lib/mouse.js'

import {
    queryProjectDetailInfo,
    queryCourseMaterialInfo,
    statsUserAction
} from '../../lib/busi-proxy/busi-proxy.js';
import { getOsType,getBrowser,getBrowserLanguage } from '../../lib/os-type.js';
import { getPackageConfig } from '../../lib/package-config.js';
import { ccUrl } from '../../lib/busi-proxy/busi-proxy';
import { sortByNoReverse } from '../../lib/utils';
const messages = defineMessages({
    sampleCdc: {
        id: 'gui.projectPage.sampleCdc',
        defaultMessage: 'Examples',
        description: '示例程序'
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
    projectNotExist: {
        id: 'gui.projectPage.projectNotExist',
        defaultMessage: 'This project does not exist',
        description: '项目课已失效'
    },
})

class ZwbProjectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidepaneShow: false,                  //侧边栏是否展开
            showShareModal: false,                  //分享弹窗
            sampleCdcList: new Array(),             //cdc示例列表
            sampleCdcIndex: 0,                      //加载的cdc
            projectBasicInfo: {},                   //项目课基本信息
            hasOpenCdc: false,
            htmlStr: '',                            //html文本
            copyStatus: 0,                          //1复制成功，0正常
            selectorOpen: false,
        }
        bindAll(this, [
            'onExpandBtnClick',
            'handleSelectorChange',
            'handleSelectorClose',
            'handleSelectorOpen',
            'onShareBtnClick',
            'setProjectBox',
            'onMouseDown',
            'onMouseUp',
            'onShareBtnCancel',
            'onShareBtnCopy',
            'handleQueryProjectDetailInfo',
        ]);

        this.projectUUID = '';
        this.container = null;
        this.lastX = 0;
        this.containerOriginWidth = null;
        this.ccUrl = ccUrl;

        let { name } = getOsType();
        let { browserName,browserVersion } = getBrowser();
        this.browserName = browserName;
        this.browserVersion = browserVersion;
        this.browserOS = name;
        this.browserLanguage = getBrowserLanguage();
        this.isRequest = false;
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.selectedProjectUUID !== nextProps.selectedProjectUUID) && (nextProps.selectedProjectUUID !== '-')) {
            this.projectUUID = nextProps.selectedProjectUUID;
            this.setState({
                hasOpenCdc: false,
                selectorOpen: false,
                htmlStr: '',
                sampleCdcIndex: 0
            })
            this.handleQueryProjectDetailInfo(nextProps.authInfo);
            //重置侧边栏宽度
            if (this.containerOriginWidth) {
                this.container.style.width = `${this.containerOriginWidth}px`;
            }
            let detailHtml = document.getElementById('detailHtml');
            if (detailHtml) {
                detailHtml.scrollTop = 0;
            }
        }

        if (JSON.stringify(nextProps.zwb_project_data) !== '{}') {
            this.projectUUID = nextProps.zwb_project_data.projectUUID;
            delete nextProps.zwb_project_data.projectUUID;
            this.setState({ ...nextProps.zwb_project_data,isSidepaneShow:true });
            this.props.onUpdateZwbProjectData({});
        }
    }

    componentWillUnmount() {
        this.props.onUpdateZwbProjectData({ 
            ...this.state, 
            projectUUID: this.projectUUID, 
        });
    }

    handleQueryProjectDetailInfo(authInfo) {
        if (!this.projectUUID || this.isRequest) {
            return
        }
        const { onUpdateLoadingProject } = this.props;
        let params = {
            authInfo: authInfo,
            projectUUID: this.projectUUID,
        }
        this.isRequest = true;
        onUpdateLoadingProject(true);
        queryProjectDetailInfo(params).then((data) => {
            onUpdateLoadingProject(false);
            let projectDetailInfo = data.projectDetailInfo;
            if (projectDetailInfo) {
                this.loadProjectDetailInfo(projectDetailInfo)
                this.reqStatsProjectDetail(projectDetailInfo.projectBasicInfo);
            }
            this.isRequest = false;
        }, (err) => {
            this.isRequest = false;
            onUpdateLoadingProject(false);
            let errorCode = err.errorCode;
            if (errorCode === 9070085) {
                toasts.error(this.props.intl.formatMessage(messages.projectNotExist));
                this.props.onUpdateProjectUUID('');
                this.props.onUpdateCdcUrl('', '');
            } else if (errorCode === 1010008 || errorCode === 1010010) {
                let projectDetailInfo = err.projectDetailInfo;
                if (projectDetailInfo) {
                    this.loadProjectDetailInfo(projectDetailInfo)
                }
            }
        });
    }

    loadProjectDetailInfo(projectDetailInfo) {
        this.setState({ isSidepaneShow: true });
        if (projectDetailInfo) {
            let projectReferenceMaterialUUIDRefList = [];
            if (projectDetailInfo && projectDetailInfo.projectReferenceMaterialUUIDRefList) {
                projectReferenceMaterialUUIDRefList = sortByNoReverse(projectDetailInfo.projectReferenceMaterialUUIDRefList)
            }

            let sampleCdcList = new Array();
            projectReferenceMaterialUUIDRefList.map((item, index) => {
                let courseMaterialType = item.courseMaterialType.toLowerCase();
                if (courseMaterialType == "cdc") {
                    item.label = item.courseMaterialName;
                    sampleCdcList.push(item);
                }
            })
            if (sampleCdcList.length > 0) {
                let sampleCdcIndex = this.state.sampleCdcIndex;
                if (sampleCdcIndex > sampleCdcList.length-1) {
                    sampleCdcIndex = 0;
                }
                this.onDownloadCDC(sampleCdcList[sampleCdcIndex], true);
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
            this.setState({
                sampleCdcList,
                projectBasicInfo: projectDetailInfo.projectBasicInfo
            })
            let projectRichTextInfo = projectDetailInfo.projectRichTextInfo
            if (projectRichTextInfo && JSON.stringify(projectRichTextInfo) !== '{}') {
                const { htmlFile } = projectRichTextInfo;
                this.handleRequstHTML(htmlFile);
            }
        }
    }

    // 请求富文本html
    handleRequstHTML(htmlFile) {
        if (htmlFile && JSON.stringify(htmlFile) !== '{}') {
            const { authInfo, onUpdateLoadingProject } = this.props;
            onUpdateLoadingProject(true);
            this.cos = tcCos(authInfo, htmlFile.cosBucketName);
            getObjectUrl(this.cos, htmlFile.cosBucketName, htmlFile.cosKey).then((url) => {
                const csdnUrl = url.replace('ap-guangzhou.myqcloud.com', 'accelerate.myqcloud.com');
                fetch(csdnUrl, {
                    method: 'GET',
                }).then(res => res.text())
                    .catch(error => {
                        console.error('Error:', error)
                        onUpdateLoadingProject(false);
                    })
                    .then(response => {
                        let htmlStr = response;
                        if (response) {
                            htmlStr = response.replace('https://public-1257284480.cos.accelerate.myqcloud.com/css/content-styles.css',
                                'https://public-1257284480.cos.accelerate.myqcloud.com/css/content-cc-styles.css')
                        }
                        this.setState({ htmlStr: htmlStr }, () => { this.rewriteRichTextTagAOnClick() })
                        onUpdateLoadingProject(false);
                    });
            }, (err) => {
                onUpdateLoadingProject(false);
            });
        }
    }

    /**
     * 重写富文本a标签
     * onclick事件
     */
    rewriteRichTextTagAOnClick() {
        let aTags = [];
        let detailHtml = document.getElementById('detailHtml');
        if (detailHtml) {
            aTags = detailHtml.getElementsByTagName('a');
        }
        for (let i = 0; i < aTags.length; i++) {
            let el = aTags[i];
            let href = el.getAttribute("href");
            el.onclick = null;
            el.onclick = (e) => {
                e.preventDefault();
                this.openNewWindow(href);
            }
        }
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

    handleSelectorChange(item,index) {
        this.setState({
            sampleCdcIndex: index
        });
        this.onDownloadCDC(item, false)
    }

    handleSelectorClose() {
        this.setState({
            selectorOpen: false
        });
    }

    handleSelectorOpen() {
        this.setState({
            selectorOpen: true
        });
    }

    //载入CDC
    onDownloadCDC(courseMaterial, withoutSave) {
        const { authInfo } = this.props;
        const params = {
            authInfo,
            skuType: 'sku_project',
            courseMaterialUUID: courseMaterial.courseMaterialUUID,
            skuProjectUUID: this.projectUUID,
        }
        // 如果点击打开cdc文件，则需判断当前打开的工程文件是否已经保存
        if (!this.props.isProjectSaved && !withoutSave) {
            this.props.onSetRemindSave(true);
            this.props.onSetRemindSaveType('openSelectedCDC');
            this.props.onUpdateRequestCdcData(params);
            return
        }
        queryCourseMaterialInfo(params).then((data) => {
            const courseMaterialInfo = data.courseMaterialInfo;
            this.cos = tcCos(authInfo, courseMaterialInfo.courseMaterialCosFile.cosBucketName);
            getObjectUrl(this.cos, 
                courseMaterialInfo.courseMaterialCosFile.cosBucketName, 
                courseMaterialInfo.courseMaterialCosFile.cosKey).then((url) => {
                // 是cdc文件，则载入
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
            }, (err) => {
                
            })
        }, (err) => {
            this.props.onUpdateCdcUrl('', '');
        })
    }

    //侧边栏展开折叠
    onExpandBtnClick(e) {
        this.container.removeAttribute('style');
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

    onShareBtnCopy() {
        var clipBoardContent= `${this.ccUrl}?project=${this.props.selectedProjectUUID}`;
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

    //请求项目课复制统计接口 
    reqStatsUserAction(projectUrl) {
        const { projectBasicInfo } = this.state;
        // 获取用户信息
        let userInfo = this.props.userInfo || {};
        let {
            userAccount = 'codecraft.chmakerd.com',
            userUUID = '',
            userIdentity = "T",
        } = userInfo;
        const packageConfig = getPackageConfig();

        let VProjectParams = {
            ownerID: projectBasicInfo.ownerId, 
            projectUUID: projectBasicInfo.projectUUID,
            language: projectBasicInfo.language,
            projectUrl,
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
            visitedObjectType: 'VProjectURLCopy',
            visitedObjectInfo: VProjectParams,
        }

        // 触发项目课访问统计接口
        statsUserAction(params);
    }

    //请求项目课访问统计接口 
    reqStatsProjectDetail(projectBasicInfo) {
        // 获取用户信息
        let userInfo = this.props.userInfo || {};
        let {
            userAccount = 'codecraft.chmakerd.com',
            userUUID = '',
            userIdentity = "T",
        } = userInfo;
        const packageConfig = getPackageConfig();

        let VProjectParams = {
            ownerID: projectBasicInfo.ownerId, 
            projectUUID: projectBasicInfo.projectUUID,
            language: projectBasicInfo.language,
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
            visitedObjectType: 'VProjectDetailInfo',
            visitedObjectInfo: VProjectParams,
        }

        // 触发项目课访问统计接口
        statsUserAction(params);
    }

    setProjectBox(instance){
        this.container = instance;
    }

    onMouseDown(e) {
        mouse.setEvent(e);
        mouse.start();
        this.lastX = mouse.getDisplacementX();
        let supWidth = parseInt(window.getComputedStyle(this.container).width);
        if(this.containerOriginWidth==null){
            this.containerOriginWidth = supWidth;
        }
        let workspaceWidth = parseInt(window.getComputedStyle(document.getElementById("workspace")).width);
        document.onmousemove = (e) => {
            mouse.setEvent(e);
            let displacementX = mouse.getDisplacementX();
            let offsetX = this.lastX - displacementX;
            let containerWidth = supWidth + offsetX;
            //最大值为工作区宽度
            // let maxContainerWidth = workspaceWidth * 0.7;
            let maxContainerWidth = 850;
            if (containerWidth > maxContainerWidth) {
                containerWidth = maxContainerWidth;
            }
            //最小值为初始宽度
            if (containerWidth < this.containerOriginWidth) {
                containerWidth = this.containerOriginWidth;
            }
            this.container.style.width = `${containerWidth}px`;
        };

        document.onmouseup = () => {
            mouse.stop();
            document.onmousemove = null;
            this.lastX = mouse.getDisplacementX();
        }

        document.ondragstart = function(e) {
            e.preventDefault();
        };

        document.ondragend = function(e) {
            e.preventDefault();
        };
    }

    onMouseUp(e) {
        mouse.stop();
        document.onmousemove = null;
        document.onmouseup = null;
    }

    render() {
        const {
            className,
            selectedProjectUUID,
            intl,
        } = this.props;

        const {
            isSidepaneShow,
            showShareModal,
            sampleCdcList,
            sampleCdcIndex,
            htmlStr,
            copyStatus,
            selectorOpen
        } = this.state;

        const expandBtnIcon = isSidepaneShow ? iconExpand : iconCollapses;

        return (
            selectedProjectUUID && <div
                className={classNames(
                    styles.zwbProjectBoxSidepane,
                    className,
                    isSidepaneShow?styles.zwbProjectBoxSidepaneShow:styles.zwbProjectBoxSidepaneHidden
                )}
                ref={this.setProjectBox}
                >
                {/*收起打开按钮*/}
                <div className={styles.expandBtn}
                    onClick={this.onExpandBtnClick}
                >
                    <img className={styles.expandIcon} src={expandBtnIcon} alt="" />
                </div>

                <div className={isSidepaneShow ? styles.containerShow : styles.containerHidden}>
                    <div
                        className={styles.dragBt}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                    >
                        <img className={styles.dragIcon} src={iconDrag} alt="" />
                    </div>
                    
                    <div className={styles.sampleCdcGroup}>
                        <div className={styles.sampleTitle}>
                            {intl.formatMessage(messages.sampleCdc)}
                        </div>
                        <Selector
                            className={styles.sampleSelect}
                            selectListStyles={styles.sampleSelectList}
                            height='1.875rem'
                            onChange={this.handleSelectorChange}
                            onListClose={this.handleSelectorClose}
                            onListOpen={this.handleSelectorOpen}
                            list={sampleCdcList}    //item必须有label属性 
                            defaultItemIndex={sampleCdcIndex}
                            open={selectorOpen}     //控制列表开关状态
                        >
                        </Selector>
                        <div className={styles.shareBtn}
                            onClick={this.onShareBtnClick}
                        >
                            <img className={styles.shareIcon} src={iconShare} alt="" />
                        </div>
                    </div>
                    
                    <div id='detailHtml' className={styles.detailHtml} dangerouslySetInnerHTML={{ __html: htmlStr }}></div>
                </div>

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
                                    {`${this.ccUrl}?project=${selectedProjectUUID}`}
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
                                    copyStatus==1&&styles.copySuccess
                                )}
                                    onClick={this.onShareBtnCopy}
                                >
                                    {intl.formatMessage(copyStatus==1?messages.copyUrlSuccessfully:messages.copyUrl)}
                                </div>
                            </div>
                        </div>
                    </ModalComponent>
                }

            </div>
        )
    }

}

ZwbProjectComponent.propTypes = {
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
        selectedProjectUUID: state.scratchGui.zwbProject.selectedProjectUUID,
        zwb_project_data: state.scratchGui.zwbProject.zwb_project_data,
        isProjectSaved: state.scratchGui.material.isProjectSaved,
        cdcUrl: state.scratchGui.zwbCourse.cdcUrl,
    }
};

const mapDispatchToProps = dispatch => ({
    onUpdateCdcUrl: (cdcUrl, cdcName) => dispatch(updateCdcUrl(cdcUrl, cdcName || '')),
    onUpdateZwbProjectData: data => dispatch(updateZwbProjectData(data)),
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onSetRemindSave: bool => dispatch(setRemindSave(bool)),
    onSetRemindSaveType: type => dispatch(setRemindSaveType(type)),
    onUpdateProjectUUID: (projectUUID) => dispatch(updateProjectUUID(projectUUID)),
    onUpdateLoadingProject: (isLoading) => dispatch(updateLoadingProject(isLoading)),
    onUpdateRequestCdcData: (params) => dispatch(updateRequestCdcData(params)),
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ZwbProjectComponent));
