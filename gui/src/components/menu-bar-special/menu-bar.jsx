import classNames from 'classnames';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import { ComingSoonTooltip } from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import SBFileUploader from '../../containers/sb-file-uploader.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import { MenuItem, MenuSection } from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import AccountNav from '../../containers/account-nav.jsx';
import LoginDropdown from './login-dropdown.jsx';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';

import RescueDevice from '../rescue-device/rescue-device.jsx'
import ElfbotDownBin from '../firmware-upgrade/elfbot-down-bin.jsx'
import ElfbotUpgrade from '../firmware-upgrade/elfbot-upgrade.jsx'
import ElfbotUpgrading from '../firmware-upgrade/elfbot-upgrading.jsx'
import ElfbotUpgradeSucc from '../firmware-upgrade/elfbot-upgrade-succ.jsx'

import LatestVersionModal from '../check-update-special/latest-version.jsx';
import UpgradeVersionModal from '../check-update-special/upgrade-version.jsx';
import DownloadVersionModal from '../check-update-special/download-version.jsx';
import RemindSaveModal from '../remind-save-special/remind-save.jsx';

import SaveAsModal from '../save-as-special/save-as.jsx';
import ZwbCourseSidePane from '../../containers/zwb-course-sidepane.jsx';
import ZwbProjectSidePane from '../../containers/zwb-project-sidepane.jsx';

import {
    closeSerialChartModal,
} from '../../reducers/modals';

import { getPackageConfig } from '../../lib/package-config.js';
import { productUUID } from '../../lib/utils';
import { statsUserAction, queryCourseMaterialInfo } from '../../lib/busi-proxy/busi-proxy.js';
import { tcCos, getObjectUrl,uploadCosFile } from '../../lib/txcloud.js';

import LoaderSave from '../loader-save/loader.jsx';

import {
    closeRecognizeVideoModal,
} from '../../reducers/modals';

import {
    setModalIndex as setRescueModalIndex,
    defaultRescueDeviceTo,
    RESCUE_MODAL_HIDE,
    RESCUE_MODAL_DEVICE_SELECT,
    RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP1,
    RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP2,
    RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP3,
    RESCUE_MODAL_ELFBOT_UPGRADE_INIT,
    RESCUE_MODAL_ELFBOT_UPGRADING,
    RESCUE_MODAL_ELFBOT_UPGRADE_SUCC,
    RESCUE_MODAL_ELFBOT_UPGRADE_FAIL
} from '../../reducers/rescue'

import CodeView from '../../containers/code-view.jsx';
import PromptComponent from '../prompt-special/prompt-2.jsx';
import Error from '../prompt-special/error.jsx';
import Feedback from '../prompt-special/feedback.jsx';
import About from '../prompt-special/about.jsx';
import CourseModal from '../home-modal/course-modal.jsx';
import ProjectModal from '../home-modal/project-modal.jsx';
import TipsLibrary from '../../containers/tips-library.jsx';
import EpcsLibrary from '../../containers/epcs-library.jsx';

import AuthenticatePane from '../../containers/authenticate-pane.jsx';
import { projectTitleInitialState, setProjectTitle } from '../../reducers/project-title';
import spinner from './spinner.gif';
import { LoadingStates, onLoadedProject, onProjectUploadStarted, setIsFirstStart, setIsNeedNewProject, setLocalProjectPath } from '../../reducers/project-state';
import {
    openLoadingProject,
    openFeedbackModal,
    closeLoadingProject,
    closeEpcsLibrary,
    closeTipsLibrary,
    closeFeedbackModal
} from '../../reducers/modals';
import { setChangeTime } from '../../reducers/net-status'
import { setFileInfo } from '../../reducers/micro-course.js';
import analytics from '../../lib/analytics';
import Loader from '../loader/loader.jsx';
import locales from '../../../../l10n';
import { selectLocale } from '../../reducers/locales';

import { setVisible as setCodeViewVisible } from '../../reducers/code-view';
import {
    setUserTab,
    setAuthInfo,
    setUserInfo,
    setLoginStatus,
    setWillToDo,

    LOGIN_TAB_INDEX,
    LOGIN_OUT_TAB_INDEX,
    USER_SETTING_TAB_INDEX,
    USER_TIME_OUT_TAB_INDEX,
    USER_INVITATION_TAB_INDEX
} from '../../reducers/login-register-special';

import {
    activateTab,
    BLOCKS_TAB_INDEX,
} from '../../reducers/editor-tab';

import {
    openTipsLibrary,
    openEpcsLibrary
} from '../../reducers/modals';

import { setPlayer } from '../../reducers/mode';
import {
    getIsUpdating,
    getIsShowingProject,
    requestNewProject,
    saveProject,
    updateProjectSaveState
} from '../../reducers/project-state';

import {
    dispatch01
} from '../../lib/event-dispatch.js';

import {
    openAccountMenu,
    closeAccountMenu,
    accountMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openHelpMenu,
    closeHelpMenu,
    helpMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openLoginMenu,
    closeLoginMenu,
    loginMenuOpen,
    openLessonsMenu,
    closeLessonsMenu,
    lessonsMenuOpen,
    openProjectsMenu,
    closeProjectsMenu,
    projectsMenuOpen,
} from '../../reducers/menus';
import { updateCourseSku, updateCdcUrl } from '../../reducers/zwb-course';
import { updateProjectUUID } from '../../reducers/zwb-project';
import { setProjectItem, setRemindSave, setRemindSaveType, setShowLoadingProject, setProjectSaved, setLocalProjectItem } from '../../reducers/material-special';
import {
    activateState,
    STATE_UNINSTALLED_ASSISTANT,
    STATE_ASSISTANT_OCCUPIED
} from '../../reducers/upload-state';

import {
    queryUserBasicInfo, 
    commitSuggestion, 
    userLoginWithPwd, 
    saveCCMaterialInfo, 
    saveCCProjectCourseInfo, 
    saveCCProjectCourseVideoInfo, 
    searchSKUBasicInfoList
} from '../../lib/busi-proxy/busi-proxy.js';

import styles from './menu-bar.css';

import languageIcon from '../language-selector/language-icon.svg';
import iconFile from './icon-file.svg';
import scratchLogo from './codecraft-logo.svg';
import iconSave from './icon-save.svg';
import iconHelp from './icon-help.svg';
import iconLesson from './icon_lesson.svg';
import iconSwitchJm from './switch_jm.svg';
import iconSwitchDm from './switch_dm.svg';
import { toasts } from '../toast-special/toast.jsx';
import { 
    cosConfig,
    grovezeroicon,
    arduinoicon,
    microbiticon,
    markicon,
    grovejointicon,
    poweringicon,
    opencaticon,
    elfboticon,
    mpythonicon
} from '../../lib/cos-config.js';
import { getOsType,getBrowser,getBrowserLanguage } from '../../lib/os-type.js';
import { zwbcUrl } from '../../lib/busi-proxy/busi-proxy';


const ignore = [];
const ariaMessages = defineMessages({
    language: {
        id: 'gui.menuBar.LanguageSelector',
        defaultMessage: 'language selector',
        description: 'accessibility text for the language selection menu'
    },
    tutorials: {
        id: 'gui.menuBar.tutorialsLibrary',
        defaultMessage: 'Sample program',
        description: 'accessibility text for the tutorials button'
    },
    course: {
        id: 'gui.library.course',
        defaultMessage: 'Courses'
    },
    saveSucc: {
        id: 'gui.menuBar.saveSucc',
        defaultMessage: 'Save success',
    },
    saveFail: {
        id: 'gui.menuBar.saveFail',
        defaultMessage: 'Save failed',
    },
    commitSucc: {
        id: 'gui.menuBar.commitSucc',
        defaultMessage: 'Submit success',
    },
    commitFail: {
        id: 'gui.menuBar.commitFail',
        defaultMessage: 'Submit failed',
    },
    openProjectFail: {
        id: 'gui.menuBar.openProjectFail',
        defaultMessage: 'Failed to open project',
        description: '打开工程失败'
    },
    netErrorMessage: {
        id: 'gui.net.errorMessage',
        defaultMessage: 'Network error, please check your network.',
        description: '网络异常，请检查您的网络'
    },
    saveErrorWithNoNet: {
        id: 'gui.menuBar.saveErrorWithNoNet',
        defaultMessage: 'Save failed, You can download the project to your computer.',
        description: '保存失败，你可以将文件保存到本地'
    },

    offlineRemind: {
        id: 'gui.menuBar.offlineRemind',
        defaultMessage: '网络未连接，已为你退出登录',
    },
    savePromptLabel: {
        defaultMessage: 'Prompt',
        description: '提示',
        id: 'gui.prompt.projectSaveLabel'
    },
    projectSave: {
        defaultMessage: 'Save',
        description: '保存',
        id: 'gui.prompt.projectSave'
    },
    projectNoSave: {
        defaultMessage: 'Do not save',
        description: '不保存',
        id: 'gui.prompt.projectNoSave'
    },
    projectSaveMessage: {
        defaultMessage: 'Would you like to save the current project?',
        description: '是否保存当前文件至我的作品？',
        id: 'gui.prompt.projectSaveMessage'
    }

});

const NetErrorToast = (text) => {
    return (
        <Box className={styles.netErrorStyle}>
            <span>{text}</span>
        </Box>
    );
}


const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = 'bottom'
}) => {
    if (enable) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};


MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({ id, isRtl, children, className }) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        isRtl={isRtl}
        place={isRtl ? 'left' : 'right'}
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    isRtl: PropTypes.bool
};

class MenuBar extends React.Component {


    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClickNew',
            'handleClickSave',
            'handleCloseFileMenuAndThen',
            'handleRestoreOption',
            'restoreOptionMessage',
            'handClickFeedback',
            'handClickAbout',
            'handleCloseFeedback',
            'handleCloseAbout',
            'handleOpenCourseModal',
            'handleCloseCourseModal',
            'handleOpenProjectModal',
            'handleCloseProjectModal',
            'handleCommitFeedback',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleUploadCurrentProgram',
            'handleUploadFilesProgress',
            'speedOfProgress',
            'handleCancelTask',
            'handlefileChange',
            'handleFileInput',
            'setFileInput',
            'handlefileDelete',
            'handleOpenLogin',
            'handleToLoginOut',
            'handleToUserSetting',
            'handleToMyInvitation',
            'handleFeedbackChange',
            'onCodeViewShow',
            'handleCancelSaveProject',
            'handleSaveProject',
            'handleCloseSave',
            'handleOpenSelectedProject',
            'handleOpenLocalSelectedProject',
            'clearLocalProjectItem',
            'handleLanguageChange',
            'handleLoadLocalProjectCourse',
            'handleToDocument',
            'handleToCCLesson',
            'handleToCCProject',
            'handleClickRescueDevice',
            'handleCloseRescueDevice',
            'handleCheckUpdate',
            'handleUpgrade',
            'handleProjectSave',
            'handleCloseUpdateModal',
            'handleToDownload',
            'handleToUpgrade',
            'handleResetDownloadFailed',
            'saveLocalProject',
            'handleBeforeQuit',
            'handleQuitApp',
            'handleQuitWithSave',
            'handleQuitCancel',
            'handleOnLineSave',
            'handleClickAccount',	    
            'handleSaveAs',
            'handleCancelSaveAs',
            'handleSaveAsInputBlur',
            'handleSaveAsInputChange',
            'getUserAgent',
            'handleConfirmSaveAs',
            'onMessage01',
            'handleLogin',	    
            'handleCdcUrl',
            'handleMoreLesson',
            'handleMoreProject',
	        'handleLogoClick'
        ]);

        this.state = {
            isOpen: false,
            isOpenAbout: false,
            isOpenCourse: false, //课程窗口开关
            isOpenProject: false, //项目示例开关
            isOpenFeedback: false,
            feedbackText: '',
            codeViewInit: false,
            isSaving: false,
            localProjectItem: {},
            projectType: '',
            isRequest: false,
            isOpenLocal: false,

            checkUpdateType: 'auto',  // 检查更新的触发方式： 自动auto  手动handle
            updateModalType: '',      // 检查更新相关弹框  已是最新版本 latestVersion  可更新 upgradeVersion  下载 downloadVersion
            updateData: {},           // 检查更新的数据
            percent: 0,               // 下载进度
            isDownloadFailed: false,  // 判断下载是否失败
            isRemidSaveBeforeClose: false,      // 是否提示保存
            isQuitApp: false,
            isStartUpForHomePage: true, //首页启动标记
            isShowSaveAs: false,
            saveAsInputValue: '',
            requestCdcData: {},
            isViewSuggestedExamples:false,
            isUploadCurrentProgram:true,
            feedBackfilesName:'',
            cdc:{},
            userAgentlVersion:'',
            attachment:{},
            isLoadingUploadFiles:0, 
            isFailsUploadFiles:false,
            iwidth:0,
            taskId:'',
            fileList:[],
            accept : '.cdc,.zip,.rar,.jpeg,.jpg,.png,.pdf,.doc,.docx,.CDC,.ZIP,.RAR,.JPEG,.JPG,.PNG,.PDF,.DOC,.DOCX.avi,.wmv,.mpg,.mpeg,.mov,.rm,.ram,.swf,.flv,.mp4,.mp3,.wma,.avi,.rm,.rmvb,.flv,.mpg,.mkv',
        }

        this.loginUnNameTime = 0; // 匿名用户登录次数
        this.microlesson = null;  // 本地工程文件中的微课信息

        let { name } = getOsType();
        let { browserName,browserVersion } = getBrowser();
        this.browserName = browserName;
        this.browserVersion = browserVersion;
        this.browserOS = name;
        this.browserLanguage = getBrowserLanguage();
    }

    handleLogin(localAuthInfo) {
        const { userAccount, accessToken, userUUID } = localAuthInfo;
        if (userAccount && userAccount !== 'codecraft.chmakerd.com') {
            const params = {
                authInfo: {
                    userAccount, accessToken, userUUID
                }
            };
            this.handleQueryUserInfo(params,false);
            // 初始化cos对象
            this.initProjectCos(params);
            this.initProjectHeadPicCos(params);
            this.initFeedbaceCos(params)
        } else {
            // 登录匿名
            this.handleLoginUnName();
        }
    }

    componentWillMount() {
        localStorage.setItem('locale', this.props.intl.locale);
        this.getUserAgent()
    }

    componentDidMount() {
        //注册message01事件
        dispatch01.on("message01", this.onMessage01);
        if (this.props.localProjectItem) {
            this.setState({
                localProjectItem: this.props.localProjectItem
            });
        }
        // 监听打开的本地项目中是否有微课信息
        this.props.vm.on('micro-lesson-loaded', this.handleLoadLocalProjectCourse);

        const localAuthInfoStr = localStorage.getItem('localAuthInfo');
        const localAuthInfo = localAuthInfoStr ? JSON.parse(localAuthInfoStr) : {};
        this.handleLogin(localAuthInfo);

        const os = getOsType();
        if (os.name === 'Mac') {
            this.osType = 'Mac';
        } else {
            this.osType = 'Windows';
        }

        this.props.vm.on('versionupgrade', this.handleUpgrade);
        this.props.vm.on('projectSave', this.handleProjectSave);
        this.props.vm.on('before-quit', this.handleBeforeQuit);
    }
    
    //从url加载项目课或者课程
    // loadProjectSkuFromLocation() {
    //     // window.location.search ?project=781a3243-7ec5-4008-a8c3-50b5592832b4
    //     // ?sku=11111
    //     let searchParam = window.location.search
    //     if (searchParam.indexOf('?') !== -1) {
    //         searchParam = searchParam.slice(1)
    //         //存在project
    //         if (searchParam.indexOf('project') !== -1) {
    //             let param = searchParam.split('=')
    //             if (param.length>1) {
    //                 let projectUUID = param[1];
    //                 setTimeout(() => {
    //                     this.props.onUpdateProjectUUID(projectUUID);
    //                     this.props.onCloseTipsLibrary();
    //                 }, 1000);
    //             }
    //         } else if (searchParam.indexOf('sku') !== -1) {
    //             let param = searchParam.split('=')
    //             if (param.length>1) {
    //                 let skuNumber = param[1];
    //                 //通过sku编号查询sku信息
    //                 let payload = {
    //                     skuNumber: skuNumber,
    //                     // publishStatus: 3,
    //                     // paymentAttrib: 3,
    //                     // queryPurpose: 'RT-ACCESS',
    //                 }
                    
    //                 searchSKUBasicInfoList(payload).then((data) => {
    //                     let skuBasicInfoList = data.skuBasicInfoList || [];
    //                     if (skuBasicInfoList.length > 0) {
    //                         let skuBasicInfo = skuBasicInfoList[0];
    //                         this.props.onUpdateCourseSku(skuBasicInfo.skuUUID, skuBasicInfo.courseUUID, skuBasicInfo.skuNumber);
    //                         this.props.onCloseTipsLibrary();
    //                     }else {
    //                         //直接进编程页
    //                         this.props.onUpdateCourseSku('', '', '');
    //                         this.props.onUpdateProjectUUID('');
    //                         this.props.onCloseTipsLibrary();
    //                     }
            
    //                 }, (err) => {
    //                         this.props.onUpdateCourseSku('', '', '');
    //                         this.props.onUpdateProjectUUID('');
    //                         this.props.onCloseTipsLibrary();
    //                 })
                    
    //             }
    //         }
    //         //重置url参数
    //         // window.history.pushState({status: 0} ,'' ,'/')
    //         window.history.replaceState(null, '', '/');
    //     }
    // }

    /**
     * 记载cdc文件
     */
    handleCdcUrl(cdcUrl, cdcName) {
        fetch(cdcUrl).then(response => {
            if (!response) return;
            this.props.onLoadingStarted();
            response.arrayBuffer().then(buffer => {
                this.props.vm.loadProject(buffer)
                    .then(() => {
                        analytics.event({
                            category: 'project',
                            action: 'Import Project File',
                            nonInteraction: true
                        });

                        setTimeout(() => {
                            this.props.onActivateTab(BLOCKS_TAB_INDEX);
                            this.props.onSetProjectTitle(cdcName);
                            this.props.onLoadingFinished(this.props.loadingState);
                            this.props.onSetShowLoadingProject(false);
                            this.setState({ localProjectItem: {} });
                            this.props.onSetLocalProjectItem(null);
                            this.resetForNewOrOpen();
                        }, 1200);
                    })
                    .catch(error => {
                        console.log('err-', error);
                        this.props.onSetShowLoadingProject(false);
                        toasts.error(this.props.intl.formatMessage(ariaMessages.openProjectFail));
                        this.props.onLoadingFinished(this.props.loadingState);
                    });
            }).catch(error => {
                console.log('err--', error);
                this.props.onSetShowLoadingProject(false);
                toasts.error(this.props.intl.formatMessage(ariaMessages.openProjectFail));
            })
        }).catch(error => {
            console.log('err---', error);
            this.props.onSetShowLoadingProject(false);
            toasts.error(this.props.intl.formatMessage(ariaMessages.openProjectFail));
            this.props.onLoadingFinished(this.props.loadingState);
        });
    }

    componentWillUnmount() {
        dispatch01.removeListener("message01", this.onMessage01);
        this.props.vm.removeListener('versionupgrade', this.handleUpgrade);
        this.props.vm.removeListener('projectSave', this.handleProjectSave);
        this.props.vm.removeListener('before-quit', this.handleBeforeQuit);
        this.props.vm.removeListener('micro-lesson-loaded', this.handleLoadLocalProjectCourse);
    }

    handleBeforeQuit() {
        // before quit
        const { isProjectSaved } = this.props;
        if (isProjectSaved) {
            // 文件已保存，直接退出
            this.handleQuitApp();
        } else {
            // 文件未保存
            this.setState({ isRemidSaveBeforeClose: true });
        }
    }

    clearUserInfo() {
        localStorage.removeItem('localAuthInfo');
        this.props.onSetUserInfo({});
        this.props.onSetAuthInfo({});
        this.props.onSetLoginStatus(false);
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.loginStatus === false) && (nextProps.loginStatus === true)) {   // 由未登录转为登录
            // saveProject commitFeedBack
            if (nextProps.willToDo === 'commitFeedBack') {    // 提交反馈
                this.commitRequest();
            } else if (nextProps.willToDo === 'saveProject') {   // 保存文件
                this.saveRequest(this.projectType);
            }
        } else if ((this.props.loginStatus === true) && (nextProps.loginStatus === false)) {
            const { localProjectItem } = this.state;
            localProjectItem.materialId = '';
            localProjectItem.materialUUID = '';
            this.setState({ localProjectItem });
        }

        // 恢复网络之后自动登录匿名用户
        if (this.props.isOnLine === false && nextProps.isOnLine === true) {
            this.handleLoginUnName();
        }
        // 断网状态下，登录状态自动设置为未登录状态
        if (this.props.isOnLine === true && nextProps.isOnLine === false) {

            // 如果正在下载更新，断网则停止
            if (this.state.updateModalType === 'downloadVersion') {
                this.props.vm.deviceEngine.sendVersionUpgradeMessage({ action: 'pkg-cancel' });
                this.setState({ isDownloadFailed: true });
            }

            if (this.props.loginStatus === true) {
                this.clearUserInfo();
                toasts.warning(this.props.intl.formatMessage(ariaMessages.offlineRemind));
            }
 
            // 断网之后清空课程相关信息
            this.props.onUpdateCourseSku('', '', '');
            this.props.onUpdateProjectUUID('');
            this.props.onUpdateCdcUrl('', '');
            this.props.onSetProjectSaved(true);
        }

        // 网络正常情况下，加载cdc文件触发
        if (nextProps.isOnLine &&
            this.props.isOnLine &&
            this.props.cdcUrl !== nextProps.cdcUrl) {
            if (nextProps.cdcUrl !== '') {
                if(nextProps.cdcUrl !== '-') {

                    /*----关闭代码编辑器、模型训练、微课----*/
                    this.resetCodeView();
                    this.handleCdcUrl(nextProps.cdcUrl, nextProps.cdcName);
                }
            } else {
                this.newProject();
            }
        }

        if (JSON.stringify(nextProps.requestCdcData) !== '{}') {
            this.setState({ requestCdcData: nextProps.requestCdcData });
        }

        // 判断是否检查更新
        let checkTime = this.props.changeTime;
        if (checkTime === 1) {
            if (this.props.isOnLine === true && nextProps.isOnLine === false) {
                // 无网络，不检查更新
            } else {
                setTimeout(() => {
                    // 有网络，检查更新
                    this.handleCheckUpdate('auto');
                }, 2000);
            }
            checkTime++;
            this.props.onSetChageTime(checkTime);
        }
    }

    // 检查更新
    handleUpgrade(data) {
        console.log('data--', data)
        // 如果已是最新版本
        if (data.action === 'latest-version') {
            if (data.actionData.checkUpdateType === 'handle') {
                this.setState({ updateModalType: 'latestVersion', updateData: data.actionData });
            }
        }
        // 有可更新的版本
        if (data.action === 'upgrade-version') {
            this.setState({ updateModalType: 'upgradeVersion', updateData: data.actionData });
        }
        // 下载进度
        if (data.action === 'download-progress') {
            this.setState({ percent: data.actionData });
        }
        // 下载失败
        if (data.action === 'download-fail') {
            // 延时是为了防止弹框切换时的抖动
            clearTimeout(this.downloadTimer);
            this.downloadTimer = setTimeout(() => {
                this.setState({ isDownloadFailed: true });
            }, 500);
        }
        // 下载成功
        if (data.action === 'download-succ') {
            // 自动安装
            const args = {
                localpath: data.actionData
            }
            this.props.vm.deviceEngine.sendVersionUpgradeMessage({ action: 'pkg-install', args });
        }
    }


    handleCheckUpdate(type) {
        if ('handle' == type && !this.props.isOnLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(ariaMessages.netErrorMessage)));
            return
        }
        const args = { checkUpdateType: type }
        this.props.vm.deviceEngine.sendVersionUpgradeMessage({ action: 'check-upgrade', args });
    }


    // 登录匿名用户
    handleLoginUnName() {
        // 登录匿名用户
        const loginParams = {
            userAccount: 'codecraft.chmakerd.com',
            userPwd: '123456'
        };
        userLoginWithPwd(loginParams).then((data) => {
            const params = {
                authInfo: {
                    userAccount: loginParams.userAccount,
                    userUUID: data.userUUID,
                    accessToken: data.accessToken
                }
            }
            this.handleQueryUserInfo(params,true);
            this.initProjectCos(params);
            this.initProjectHeadPicCos(params);
            this.initFeedbaceCos(params)
        }, (err) => {
            if (this.loginUnNameTime < 3) {
                this.handleLoginUnName();
                this.loginUnNameTime += 1;
            } else {
                // if (this.props.isFirstStart) {
                //     this.props.onSetIsNeedNewProject(true);
                // }
            }
        });
    }

    initProjectCos(params) {
        // 初始化工程上传的cos
        // const projectParams = {
        //     authInfo: params.authInfo,
        //     bucketName: cosConfig.projectBucketName,
        //     operaType: cosConfig.operaType
        // }
        this.projectCos = tcCos(params.authInfo, cosConfig.projectBucketName,
            (err) => {
                this.setState({ isSaving: false })
                this.props.onSetSavingState(false);
                if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                    this.handleToLoginTimeout();
                } else {
                    // toasts.error(this.props.intl.formatMessage(ariaMessages.saveFail));
                }
            })
    }

    initProjectHeadPicCos(params) {
        // 初始化工程头文件的cos
        // const projectHeadPicParams = {
        //     authInfo: params.authInfo,
        //     bucketName: cosConfig.projectHeadPicsBucketName,
        //     operaType: cosConfig.operaType
        // }
        this.projectHeadPicCos = tcCos(params.authInfo, cosConfig.projectHeadPicsBucketName,
            (err) => {
                this.setState({ isSaving: false })
                this.props.onSetSavingState(false);
                if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                    this.handleToLoginTimeout();
                } else {
                    // toasts.error(this.props.intl.formatMessage(ariaMessages.saveFail));
                }
            })
    }
    //初始化
    initFeedbaceCos(params){
        const feedBackPicParams = {
            authInfo: params.authInfo,
            bucketName: cosConfig.projectHeadPicsBucketName,
            operaType: cosConfig.operaType
        }
        this.feedBackFiles = tcCos(feedBackPicParams.authInfo,cosConfig.feedbackBucketName)
    }

    // 查询用户信息
    handleQueryUserInfo(params,isAnonymous) {
        queryUserBasicInfo(params).then((data) => {

            const userBasicInfo = data.userBasicInfo;

            this.props.onSetAuthInfo(params.authInfo);
            this.props.onSetUserInfo(
                {
                    ...userBasicInfo,
                    userUUID: params.authInfo.userUUID
                }
            );
            //匿名登录状态为false
            this.props.onSetLoginStatus(!isAnonymous);
            // this.loadProjectSkuFromLocation();

        }, (err) => {
            //不是匿名失败需要处理
            if (!isAnonymous) {
                // console.log('err', err)
                if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                    // 帐户超时
                    this.handleToLoginTimeout();
                    // if (this.props.isFirstStart) {
                    //     this.props.onSetIsNeedNewProject(true);
                    // }
                } else {
                    this.handleLoginUnName();
                }
            }
        })
    }


    componentDidUpdate(prevProps) {
        // if we're no longer showing the project (loading, or whatever), close menus
        if (this.props.isShowingProject && !prevProps.isShowingProject) {
            this.props.onRequestCloseFile();
            this.props.onRequestCloseEdit();
        }
    }
    handleClickNew() {
        if (this.props.isProjectSaved) {
            this.newProject();
        } else {
            this.props.onSetRemindSave(true);
            this.props.onSetRemindSaveType('newProject');
        }
        // const canSave = this.props.canUpdateProject; // logged in
        // // if canSave===true, it's safe to replace current project, since we will auto-save first
        // const readyToReplaceProject =
        //     canSave || confirm('Replace contents of the current project?'); // eslint-disable-line no-alert
        // if (readyToReplaceProject) {
        //     this.props.onClickNew(canSave);
        // }
    }
    readBlobAsDataURL(blob, callback) {
        var a = new FileReader();
        a.onload = function (e) { callback(e.target.result); };
        a.readAsDataURL(blob);
    }

    // 获取舞台工程头图
    getStageImg(deviceid) {
        let baseImg = '';
        return new Promise((resolve, reject) => {
            let i = 0;
            const timer = setInterval(() => {
                let base64 = document.getElementById('stageImg').toDataURL("image/png");
                if (base64.length >= baseImg.length) {
                    baseImg = base64;
                };
                if (i >= 20) {
                    clearInterval(timer);
                    resolve(baseImg);
                }
                i++;
            }, 1);
        });
    }

    
    handleClickSave(projectType, saveType) {
        // 判断当前是否有网络，无网情况下保存到本地
        if (this.props.isOnLine) {
            this.handleOnLineSave(projectType);
        } else {
            // 保存文件到本地
            this.saveLocalProject(saveType)
        }
    }
    handleOnLineSave(projectType) {
        // 判断当前用户是否登录，未登录，打开登录弹框
        if (this.props.loginStatus) {
            this.saveRequest(projectType);
        } else {
            this.handleOpenLogin();
            this.props.onSetWillToDo('saveProject');
        }
    }

    // 处理文件断网保存
    handleProjectSave(data) {
        console.log('data-=-', data)
        if (data.action === 'project-path') {
            this.setState({ isSaving: false });
            this.props.onSetSavingState(false);
            if (data.actionData) {
                this.props.onSetLocalProjectPath(data.actionData)
                if (this.state.isQuitApp) {
                    this.handleSaveQuit();
                } else {
                    toasts.success(this.props.intl.formatMessage(ariaMessages.saveSucc));
                    // 保存成功后，打开新项目
                    if (this.projectType === 'openSelectedProject') {
                        this.openSelectedProject();
                    }
                    if (this.projectType === 'openLocalProject') {
                        this.openSelectedLocalProject();
                    }
                    if (this.projectType === 'newProject') {
                        this.newProject();
                    }
                    if (this.projectType == 'switchEquipment') {
                        this.switchEquipment();
                    }
                    if (this.projectType == 'openZwbCourse') {
                        this.props.onOpenCourseHome();
                        this.resetCodeViewAndProject();
                    } 
                    // 设为已保存状态
                    this.props.onSetProjectSaved(true);
                    this.projectType = '';
                }
            }
        }
    }

    handleSaveQuit() {
        toasts.success(this.props.intl.formatMessage(ariaMessages.saveSucc));
        // 保存成功后退出APP
        setTimeout(() => {
            this.handleQuitApp();
        }, 1800);
    }


    // 保存，退出App
    handleQuitWithSave() {
        this.setState({
            isQuitApp: true,
            isRemidSaveBeforeClose: false
        }, () => {
            this.handleClickSave();
        })
    }
    // 退出App
    handleQuitApp() {
        this.clearUserInfo();
        this.props.vm.deviceEngine.sendWindowMessage({ action: 'close' });
    }
    // 取消
    handleQuitCancel() {
        this.setState({ isRemidSaveBeforeClose: false });
    }
    // 保存文件到本地，处理覆盖操作 
    async saveLocalProject(saveType) {
        this.setState({ isSaving: true });
        this.props.onSetSavingState(true);
        const readData = (blob) => {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    let data = Array.from(new Uint8Array(reader.result));
                    resolve(data);
                };
                reader.readAsArrayBuffer(blob);
            });
        };
        let blob = await this.props.saveProjectSb3();
        let data = await readData(blob);
        const { localProjectPath } = this.props;
        let realPath = '', projectNameSuffix = '';
        if (localProjectPath) {
            let fullProjectName = localProjectPath.slice(localProjectPath.lastIndexOf('/') + 1);
            fullProjectName = fullProjectName.slice(fullProjectName.lastIndexOf('\\') + 1);
            const projectName = fullProjectName.substring(0, fullProjectName.lastIndexOf('.'));
            projectNameSuffix = fullProjectName.substring(fullProjectName.lastIndexOf('.'));
            if (projectName === this.props.projectFilename) {
                realPath = localProjectPath;
            } else {
                realPath = '';
            }
        }
        // 保存到本地时，不做覆盖操作
        if (saveType === 'saveAs') {
            realPath = '';
        }
        const args = {
            data,
            projectName: this.props.projectFilename + (projectNameSuffix === '.sb3' ? '.sb3' : '.cdc'),
            localProjectPath: realPath,
        }
        this.props.vm.deviceEngine.sendProjectSaveMessage({ action: 'save-project', args });
    }

    async saveRequest(projectType) {
        const { localProjectItem } = this.state;

        this.setState({ isSaving: true });
        this.props.onSetSavingState(true);
        // 上传工程文件，获取cdc文件
        let content = await this.props.saveProjectSb3();
        let errorCode = -1;
        if (content && this.projectCos) {
            const projectKey = localProjectItem.materialId ? localProjectItem.cosFileProject.cosKey : productUUID();
            let data = await this.uploadCosFilePromise(this.projectCos,content,projectKey,cosConfig.projectBucketName);
            if (data) {
                //工程文件对象
                const cosProjectFile = {};
                cosProjectFile.cosKey = projectKey;
                cosProjectFile.cosUrl = data.Location;
                cosProjectFile.cosBucketName = cosConfig.projectBucketName;
                cosProjectFile.fileName = this.props.projectFilename;
                cosProjectFile.sortNo = 0;

                //上传工程头图
                const projectHeadPicKey = localProjectItem.materialId ? localProjectItem.cosFileCover.cosKey : productUUID();
                let editingTarget = this.props.vm.editingTarget;
                let deviceid = editingTarget.getDeviceId();
                //舞台模式的封面需要上传腾讯云
                let cosUrl;
                if (deviceid==-1) {
                    let base64 = await this.getStageImg();
                    let arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    let projectHeadPic = new File([u8arr], 'projectHeadPic.png', { type: mime });
                    if (this.projectHeadPicCos) {
                        let stageImgCosData = await this.uploadCosFilePromise(this.projectHeadPicCos,projectHeadPic,projectHeadPicKey,cosConfig.projectHeadPicsBucketName);
                        cosUrl = stageImgCosData.Location;
                    }
                
                }else {
                    if (deviceid==1001) {//grovezero
                        cosUrl = grovezeroicon;
                    }else if (deviceid==1002) {//arduino
                        cosUrl = arduinoicon;
                    }else if (deviceid==1003) {//elfbot
                        cosUrl = elfboticon;
                    }else if (deviceid=== 1004) { //micro:bit
                        cosUrl = microbiticon;
                    }else if (deviceid=== 1005) { //cyberEye mark
                        cosUrl = markicon;
                    }else if (deviceid=== 1006) { //Grove Joint
                        cosUrl = grovejointicon;
                    }else if (deviceid=== 1007) { //mPython
                        cosUrl = mpythonicon;
                    }else if (deviceid=== 1008) { //Glint
                        cosUrl = poweringicon;
                    }else if (deviceid=== 1009) { //Bittle
                        cosUrl = opencaticon;
                    }
                }

                const cosProjectHeadPicFile = {};
                cosProjectHeadPicFile.cosKey = projectHeadPicKey;
                cosProjectHeadPicFile.cosUrl = cosUrl;
                cosProjectHeadPicFile.cosBucketName = cosConfig.projectHeadPicsBucketName;
                cosProjectHeadPicFile.fileName = 'projectHeadPic.png';
                cosProjectHeadPicFile.sortNo = 0;

                const ccProjectMaterial = {
                    materialUUID: localProjectItem.materialId ? localProjectItem.materialId : '',
                    materialName: cosProjectFile.fileName,
                    classUUID: '',
                    cosFileCover: cosProjectHeadPicFile,
                    cosFileProject: cosProjectFile,
                    projectCourse: localProjectItem.projectCourse ? localProjectItem.projectCourse : '',
                    materialCurStatus: '',
                }
                const params = {
                    authInfo: this.props.authInfo,
                    materialType: 'P',
                    ccProjectMaterial,
                }

                //保存素材到个人文件
                let ccMaterialResp = await saveCCMaterialInfo(params).catch(err=>{
                    errorCode = err.errorCode
                })
                //异常处理
                if (ccMaterialResp) {
                    errorCode = ccMaterialResp.errorCode;
                }

                if (errorCode == 0) {
                    params.ccProjectMaterial.materialUUID = ccMaterialResp.materialCurStatus.materailUUID;
                    params.ccProjectMaterial.materialId = ccMaterialResp.materialCurStatus.materailUUID;
                    this.setState({
                        isSaving: false,
                        localProjectItem: params.ccProjectMaterial
                    }, () => {
                        // 保存成功之后，判断该工程是否有微课信息
                        if (localProjectItem.projectCourse) {
                            this.handleSaveProjectCourse(ccMaterialResp.materialCurStatus.materailUUID)
                        }
                    });
                    this.props.onSetSavingState(false);
                    this.props.onSetLocalProjectItem(params.ccProjectMaterial);

                    // 保存成功后是否退出APP
                    if (this.state.isQuitApp) {
                        this.handleSaveQuit();
                    } else {
                        toasts.success(this.props.intl.formatMessage(ariaMessages.saveSucc));
                    }

                    let remindSaveType = '';
                    let typeArr = [];
                    if (typeof projectType == "string") {
                        typeArr=projectType.split(":")
                        remindSaveType = typeArr[0];
                    }

                    // 保存成功后，打开新项目
                    if (remindSaveType === 'openSelectedProject') {
                        this.openSelectedProject();
                    } else if (remindSaveType === 'openLocalProject') {
                        this.openSelectedLocalProject();
                    } else if (remindSaveType === 'newProject') {
                        this.newProject();
                    } else if (remindSaveType === 'openZwbCourse') {
                        this.props.onOpenCourseHome();
                        this.resetCodeViewAndProject();
                    } else if (remindSaveType === 'openSelectedCDC') {
                        this.handleRequestCdc();
                    } else if (remindSaveType == 'switchEquipment') {
                        this.switchEquipment();
                    } else if (remindSaveType == 'openCourse') {
                        this.handleOpenCourse(typeArr[1],typeArr[2],typeArr[3]);
                    } else if (remindSaveType === 'openProject') {
                        this.handleOpenProject(typeArr[1]);
                    }
                    // 设为已保存状态
                    this.props.onSetProjectSaved(true);
                }

            }
        }

        if (errorCode!=0) {
            toasts.error(this.props.intl.formatMessage(ariaMessages.saveFail));
            this.setState({ isSaving: false });
            this.props.onSetSavingState(false);
            if (errorCode === 1010008 || errorCode === 1010010) {
                this.handleToLoginTimeout();
            }            
        }

        this.props.onSetWillToDo('');
        this.projectType = '';
    }

    uploadCosFilePromise(cos, file, key, bucketName) {
        return new Promise((resolve, reject) => {
            uploadCosFile(cos, file, key, bucketName, null,
                (data, err) => {
                    if (data) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                })
        })
    }

    // 保存微课
    handleSaveProjectCourse(materialUUID) {
        const { courseName, courseDescription, courseCover } = this.state.localProjectItem.projectCourse;
        const { fileId, fileName } = this.state.localProjectItem.projectCourse.projectCourseVodFile;
        const commonParams = {
            authInfo: this.props.authInfo,
            materialUUID: materialUUID,
        }
        const curseInfo = {
            ...commonParams,
            courseCoverFile: courseCover,
            courseName: courseName,
            courseDescription: courseDescription,
        }
        const videoInfo = {
            ...commonParams,
            videoFileId: fileId,
            fileName: fileName
        }
        saveCCProjectCourseInfo(curseInfo).then(() => {
            saveCCProjectCourseVideoInfo(videoInfo).then(() => {
                // 保存成功后是否退出APP
                if (this.state.isQuitApp) {
                    this.handleSaveQuit();
                    return
                } else {
                    toasts.success(this.props.intl.formatMessage(ariaMessages.saveSucc));
                }
            });
        }, (err) => {
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.handleToLoginTimeout();
            }
        })
    }

    handleRestoreOption(restoreFun) {
        return () => {
            restoreFun();
            this.props.onRequestCloseEdit();
        };
    }
    handleCloseFileMenuAndThen(fn) {
        return () => {
            if (this.state.localProjectItem.projectCourse) {
                this.props.vm.loadProjectMicroLesson(this.state.localProjectItem.projectCourse)
            }
            this.props.onRequestCloseFile();
            fn();
        };
    }
    handleLoadLocalProjectCourse(microlesson) {
        if (!this.state.isOpenLocal) {
            return;
        }
        this.microlesson = microlesson;
        if (this.microlesson) {
            const fileId = this.microlesson.projectCourseVodFile.fileId;
            const fileName = this.microlesson.courseName;
            const description = this.microlesson.courseDescription;
            const coverUrl = this.microlesson.courseCover.cosUrl;
            this.props.onSetFileInfo({ fileId, fileName, description, coverUrl })
        }
    }

    restoreOptionMessage(deletedItem) {
        switch (deletedItem) {
            case 'Sprite':
                return (<FormattedMessage
                    defaultMessage="Restore Sprite"
                    description="Menu bar item for restoring the last deleted sprite."
                    id="gui.menuBar.restoreSprite"
                />);
            case 'Sound':
                return (<FormattedMessage
                    defaultMessage="Restore Sound"
                    description="Menu bar item for restoring the last deleted sound."
                    id="gui.menuBar.restoreSound"
                />);
            case 'Costume':
                return (<FormattedMessage
                    defaultMessage="Restore Costume"
                    description="Menu bar item for restoring the last deleted costume."
                    id="gui.menuBar.restoreCostume"
                />);
            default: {
                return (<FormattedMessage
                    defaultMessage="Restore"
                    description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
                    id="gui.menuBar.restore"
                />);
            }
        }
    }
    // 打开登录弹框
    handleOpenLogin() {
        if (!this.props.isOnLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(ariaMessages.netErrorMessage)));
            return;
        }
        this.props.onSetTab(LOGIN_TAB_INDEX);
    }
    //个人账户菜单
    handleClickAccount() {
        if (!navigator.onLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(ariaMessages.netErrorMessage)));
            return;
        }
        this.props.onClickAccount()
    }
    handleClickRescueDevice() {
        this.props.vm.deviceEngine.open().then(
            () => {
                this.props.defaultRescueDeviceTo();
                this.props.setRescueModalIndex(RESCUE_MODAL_DEVICE_SELECT);
            },
            errorCode => {
                if (-1 === errorCode) {
                    this.props.activateState(STATE_ASSISTANT_OCCUPIED);
                } else {
                    this.props.activateState(STATE_UNINSTALLED_ASSISTANT);
                }
            }
        );
    }
    handleCloseRescueDevice() {
        this.props.setRescueModalIndex(RESCUE_MODAL_HIDE);
    }
    //关于弹窗
    handClickAbout() {
        this.setState({
            isOpenAbout: true
        })
    }
    handleCloseAbout() {
        this.setState({
            isOpenAbout: false
        })
    }

    //打开教程弹窗
    handleOpenCourseModal() {
        this.setState({
            isOpenCourse: true
        })
    }

    handleCloseCourseModal() {
        this.setState({
            isOpenCourse: false
        })
    }

    //打开项目示例弹窗
    handleOpenProjectModal() {
        this.setState({
            isOpenProject: true
        })
    }
    handleCloseProjectModal() {
        this.setState({
            isOpenProject: false
        })
    }
        
    handClickFeedback() {
        this.props.onOpenFeedbackModal();
    }
    handleCloseFeedback() {
        const {feedbackText,attachment,isUploadCurrentProgram} = this.state
        this.feedbackTextlocalStorage = feedbackText
        this.attachmentlocalStorage = attachment
        this.isUploadCurrentProgram = isUploadCurrentProgram
        const {taskId} = this.state
        if (this.feedBackFiles) {
            this.feedBackFiles.cancelTask(taskId);
        }
        this.fileInput = null
        this.setState({
            iwidth:0,
            attachment:{},
            feedBackfilesName:'',
            feedbackText:'',
            isLoadingUploadFiles:0,
            isUploadCurrentProgram:true
        })
        this.props.onCloseFeedbackModal();
    }
    handleMouseEnter() {
        this.setState({
            isViewSuggestedExamples: true
        })
    }
    handleMouseLeave() {
        this.setState({
            isViewSuggestedExamples: false
        })
    }
    handleUploadCurrentProgram(){
        this.setState({
            isUploadCurrentProgram: !this.state.isUploadCurrentProgram
        })
    }
    getUserAgent(){
        const userAgent = navigator.userAgent

        let userAgentlVersion = ''
        if (userAgent.indexOf("Win64") >= 0 || userAgent.indexOf("wow64") >= 0 || userAgent.indexOf("WOW64") >= 0 || userAgent.indexOf("Wow64") >= 0) {
            userAgentlVersion = ' windows64'
        }else{
            userAgentlVersion = ' windows32'
        }
        if (userAgent.indexOf("Win32") >= 0 || userAgent.indexOf("wow32") >= 0 || userAgent.indexOf("WOW32") >= 0 || userAgent.indexOf("Wow32") >= 0) {
            userAgentlVersion = ' windows32'
        }
        if (userAgent.indexOf("MAC") >= 0 || userAgent.indexOf("Mac") >= 0) {
            userAgentlVersion = ' Mac' + userAgent.split("Mac")[2].substring(0,13)
        }
        if (userAgent.indexOf("X11") >= 0 || userAgent.indexOf("Linux") >= 0 || userAgent.indexOf("LINUX") >= 0) {
            userAgentlVersion = ' Linux'
        }
        console.log(userAgentlVersion)
        this.setState({
            userAgentlVersion:userAgentlVersion
        })
    }
    speedOfProgress(){//进度封装函数
        const { iwidth } = this.state
        const winwidth = 1
        this.setState({
            iwidth : this.state.iwidth+ 0.01//每次增加1%
        })
        if (iwidth >= winwidth) {//如果达到最大值就不在增加
            this.setState({
                iwidth : winwidth
            })
            clearInterval(this.timer);//定时器停止
        }
    }
    //上传附件
    handleUploadFilesProgress(){

    }
    //删除已上传未提交的附件
    handlefileDelete(){
        this.setState({
            isLoadingUploadFiles:0,
            feedBackfilesName:'',
            attachment:{},
            iwidth:0
        })
    }
    handleFileInput(){
        this.fileInput.value=null
        this.fileInput.click()
    }
    setFileInput(input) {
        this.fileInput = input;
    }
    handleCancelTask(){
        const {fileList} = this.state
        let fileListLength = fileList.length-1
        if(fileList.length>1){
            fileList.forEach((item,index) =>{
                if(index!=fileListLength){
                    if (this.feedBackFiles) {
                        this.feedBackFiles.cancelTask(item.taskId);
                    }
                }
            })
        }
    }
    //上传附件
    /**
     * 0，意见反馈附件未上传，
     * 1，意见反馈附件上传中，
     * 2，意见反馈附件上传成功，
     * 3，意见反馈附件之前未上传附件，上传失败，
     * 4，意见反馈附件之前已上传附件，上传失败，
     */
    handlefileChange(){
        const limitSize = 30 * 1024 * 1024
        const { isLoadingUploadFiles,taskId,feedBackfilesName,isFailsUploadFiles } = this.state
        let { fileList } = this.state
        let attachment = {};
        let _this = this
        this.setState({
            iwidth:0
        })
        const file = document.getElementById('fileSelect').files[0];
        let fileSize = file.size
        if(fileSize>limitSize){
            this.setState({
                iwidth:0,
                isFailsUploadFiles:true,
            })
            setTimeout(() => {
                this.setState({
                    isFailsUploadFiles: false,
                })
            }, 3000);
            return
        }
        const feedBackFilesKey  = '/attachment/'+productUUID()+'/'+file.name     
        this.feedBackFiles.putObject({
            Bucket: cosConfig.feedbackBucketName + '-' + cosConfig.appId,
            Region: cosConfig.region,    /* 必须 */
            Key: feedBackFilesKey,
            Body: file,
            TaskReady: (taskId) => {
                fileList.push({taskId})
                this.setState({
                    isLoadingUploadFiles:1,
                    taskId:taskId,
                    fileList
                })
                if(this.state.fileList.length>1){
                    this.handleCancelTask();
                }
            },
            onProgress: (progressData) => {
                this.setState({
                    iwidth:progressData.percent,
                },()=>{
                    
                })
            }
        }, function (err, data) {
            _this.setState({
                fileList:[]
            })
            if (data) {
                attachment.cosKey = feedBackFilesKey;
                attachment.cosUrl = data.Location;
                attachment.cosBucketName = cosConfig.feedbackBucketName;
                attachment.fileName = file.name;
                attachment.sortNo = 0;
                setTimeout(() => {
                    _this.setState({
                        // iwidth:1,
                        isLoadingUploadFiles:2,
                        attachment: attachment,
                        feedBackfilesName: file.name,
                    })
                }, 1800);
            }
            if(err){
                console.log(err)
                if(err.error=='params body format error, Only allow File|Blob|String.'){
                    _this.setState({
                        // iwidth:1,
                        isLoadingUploadFiles:2,
                    })
                }
                if(err.error=='error'){
                    _this.setState({
                        iwidth:0,
                        isLoadingUploadFiles:3,
                    })
                    setTimeout(() => {
                        _this.setState({
                            isLoadingUploadFiles:0
                        })
                    }, 3000);
                }
            }
        })
    }
    handleCommitFeedback() {
        //  已登录，可提交反馈，否则打开登录弹窗
        if (this.props.loginStatus) {
            this.commitRequest();
        } else {
            this.handleCloseFeedback();
            this.handleOpenLogin();
            this.setState({
                attachment:this.attachmentlocalStorage,
                feedbackText:this.feedbackTextlocalStorage,
                isUploadCurrentProgram:this.isUploadCurrentProgram
            })
            this.props.onSetWillToDo('commitFeedBack');
        }
    }
    async commitRequest() {
        const { localProjectItem,isUploadCurrentProgram,attachment,userAgentlVersion } = this.state;
        const {homePageVisible} = this.props
        let navigatorLang = navigator.language||navigator.userLanguage;//常规浏览器语言和IE浏览器
        navigatorLang = navigatorLang.substr(0, 2);//截取lang前2位字符
        let cdcFilesCos = {}
        const packageConfig = getPackageConfig();
        let channelType = 'Codecraft PC'
        if(!homePageVisible&&isUploadCurrentProgram){
            const content = await this.props.saveProjectSb3();
            let projectKey = localProjectItem.materialId ? localProjectItem.cosFileProject.cosKey : productUUID() ;
            projectKey = '/cdc/' + projectKey + '/' + this.props.projectFilename
            const feedBackCosfilesdata = await this.uploadCosFilePromise(this.feedBackFiles,content,projectKey,cosConfig.feedbackBucketName);
            cdcFilesCos.cosKey = projectKey;
            cdcFilesCos.cosUrl = feedBackCosfilesdata.Location;
            cdcFilesCos.cosBucketName = cosConfig.feedbackBucketName;
            cdcFilesCos.fileName = this.props.projectFilename;
            cdcFilesCos.sortNo = 0;
        }
        if (this.state.isRequest) {
            return
        }
        let language = this.props.intl.locale
        if(language=='zh-cn'){
            language = 'CN'+' v'
        }else if(language=='en'){
            language = 'EN'+' v'
        }else if(language=='cs'){
            language = 'CS'+' v'
        }else{
            language = 'NL'+' v'
        }
        if(navigatorLang=='zh'){
            navigatorLang = 'CN'
        }else if(navigatorLang=='en'){
            navigatorLang = 'EN'
        }else if(navigatorLang=='cs'){
            navigatorLang = 'CS'
        }else{
            navigatorLang = 'NL'
        }
        if (this.state.feedbackText) {
            const params = {
                authInfo: this.props.authInfo,
                suggestion: this.state.feedbackText,
                channelType: channelType+userAgentlVersion+' '+navigatorLang,
                channelVersion: language+packageConfig.channelVersion,
                attachment:this.state.attachment,
                cdc:homePageVisible ? {} : cdcFilesCos,
            }
            this.setState({ isRequest: true });
            commitSuggestion(params).then((data) => {
                this.handleCloseFeedback();
                this.setState({
                    feedbackText: '',
                    isRequest: false,
                    attachment:{},
                    feedBackfilesName:'',
                    iwidth:0,
                    isUploadCurrentProgram:true,
                })
                toasts.success(this.props.intl.formatMessage(ariaMessages.commitSucc));
            }, (err) => {
                this.setState({ isRequest: false });
                if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                    this.handleToLoginTimeout();
                } else {
                    toasts.error(this.props.intl.formatMessage(ariaMessages.commitFail));
                }
            })
        }
        this.props.onSetWillToDo('');
    }

    // 打开退出登录二次确认弹框
    handleToLoginOut() {
        this.props.onSetTab(LOGIN_OUT_TAB_INDEX);
    }
    // 打开帐号设置
    handleToUserSetting() {
        this.props.onSetTab(USER_SETTING_TAB_INDEX);
    }
    // 打开我的邀请码
    handleToMyInvitation() {
        this.props.onSetTab(USER_INVITATION_TAB_INDEX);
    }
    // 打开用户超时弹框
    handleToLoginTimeout() {
        this.props.onSetTab(USER_TIME_OUT_TAB_INDEX);
    }

    handleFeedbackChange(value) {
        this.setState({
            feedbackText: value
        })
    }

    onCodeViewShow() {
        this.props.setCodeViewVisible(!this.props.codeViewVisible);
        this.setState({
            codeViewInit: true
        });
    }



    // 提示保存弹框，直接x掉，不做任何操作
    handleCloseSave() {
        this.props.onSetRemindSave(false);

    }
    // 提示保存弹框，不保存，直接打开新项目
    handleCancelSaveProject() {
        this.props.onCloseEpcsLibrary();  // 关闭素材弹框
        this.props.onCloseTipsLibrary();  // 关闭素材弹框
        this.props.onSetRemindSave(false);
        this.props.vm.stopAll();
        this.props.onSetProjectSaved(true); // 点击不保存，也将工程文件设为保存状态

        let isRemindSaveType = this.props.isRemindSaveType;
        let remindSaveType = '';
        let typeArr = [];
        if (typeof isRemindSaveType == "string") {
            typeArr=isRemindSaveType.split(":")
            remindSaveType = typeArr[0];
        }

        if (remindSaveType === 'newProject') {
            this.newProject();
        } else if (remindSaveType === 'openZwbCourse') {
            this.props.onOpenCourseHome();
            this.resetCodeViewAndProject();
        } else if (remindSaveType === 'openSelectedCDC') {
            this.handleRequestCdc();
        } else if(remindSaveType  === 'openOnlineProject') {
            this.openSelectedProject();
        } else if (remindSaveType === 'openLocalProject') {
            this.openSelectedLocalProject();
        } else if (remindSaveType === 'openCourse') {
            this.handleOpenCourse(typeArr[1],typeArr[2],typeArr[3]);
        } else if (remindSaveType === 'openProject') {
            this.handleOpenProject(typeArr[1]);
        }
    }
    // 提示保存弹框，保存后，打开新项目
    handleSaveProject() {
        this.props.onCloseEpcsLibrary();  // 关闭素材弹框
        this.props.onCloseTipsLibrary();  // 关闭素材弹框
        this.props.onSetRemindSave(false);
        this.props.vm.stopAll();

        let isRemindSaveType = this.props.isRemindSaveType;
        let remindSaveType = '';
        if (typeof isRemindSaveType == "string") {
            let typeArr=isRemindSaveType.split(":")
            remindSaveType = typeArr[0];
        }

        if (remindSaveType === 'newProject') {
            this.projectType = 'newProject';
        } else if (remindSaveType === 'openZwbCourse') {
            this.projectType = 'openZwbCourse';
        } else if (remindSaveType === 'openSelectedCDC') {
            this.projectType = 'openSelectedCDC';
        } else if (remindSaveType === 'openOnlineProject') {
            this.projectType = 'openSelectedProject';
        } else if(remindSaveType === 'openLocalProject') {
            this.projectType = 'openLocalProject';
        } else if (remindSaveType === 'openCourse') {
            this.projectType = isRemindSaveType;
        } else if (remindSaveType === 'openProject') {
            this.projectType = isRemindSaveType;
        }
        this.handleClickSave(this.projectType);
    }

    resetCodeViewAndProject() {
        this.resetCodeView();
        //新建工程，清空积木
        this.newProject();
        //清空课程项目
        this.props.onUpdateCourseSku('', '', '');
        this.props.onUpdateProjectUUID('');
    }

    //重置编程文件状态
    resetCodeView() {
        this.props.setCodeViewVisible(false);
        this.props.closeRecognizeVideoModal();
        this.props.onSetFileInfo({ fileId: null, fileName: null, description: null, coverUrl: null });
    }

    //打开某个课程
    handleOpenCourse(skuUUID, courseUUID, skuNumber) {
        this.resetCodeView();
        this.props.onUpdateCourseSku('-', '-', '-');  // 用于选择同一课程时监测到变化重新拉取数据
        this.props.onUpdateProjectUUID('');
        setTimeout(() => {
            this.props.onUpdateCourseSku(skuUUID, courseUUID, skuNumber);
        }, 0);
    }

    //打开项目示例
    handleOpenProject(projectUUID) {
        this.resetCodeView();
        this.props.onUpdateCourseSku('', '', '');
        this.props.onUpdateProjectUUID('-');  // 用于选择同一课程时监测到变化重新拉取数据
        setTimeout(() => {
            this.props.onUpdateProjectUUID(projectUUID);
        }, 0);
    }

    handleRequestCdc() {
        const { requestCdcData } = this.state;
        if (JSON.stringify(requestCdcData) === '{}') {
            return;
        }
        this.resetCodeView();
        queryCourseMaterialInfo(requestCdcData).then((data) => {
            const courseMaterialInfo = data.courseMaterialInfo;
            this.cos = tcCos(requestCdcData.authInfo, courseMaterialInfo.courseMaterialCosFile.cosBucketName);
            getObjectUrl(this.cos, courseMaterialInfo.courseMaterialCosFile.cosBucketName, courseMaterialInfo.courseMaterialCosFile.cosKey).then((url) => {
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
                this.handleCdcUrl(url, cdcName);

            })
        })
    }

    getCurrentDeviceID() {
        let physicalDevices = this.props.physicalDevices;
        let currentDeviceID = 1
        physicalDevices.map((device) => {
            if (device.featured) {
                currentDeviceID = device.id;
            }
        });
        return currentDeviceID;
    }

    // 新建一个项目
    newProject() {
        this.setState({ isOpenLocal: false });
        // 如果代码编辑器打开，则关闭
        if (this.props.codeViewVisible) {
            this.props.setCodeViewVisible(false);
        }
        const canSave = this.props.canUpdateProject; // logged in
        // // if canSave===true, it's safe to replace current project, since we will auto-save first
        // const readyToReplaceProject =
        //     canSave || confirm('Replace contents of the current project?'); // eslint-disable-line no-alert
        // if (readyToReplaceProject) {
        //     this.props.onClickNew(canSave);
        // }
        let currentDeviceID = this.getCurrentDeviceID()

        this.props.onClickNew(canSave,currentDeviceID);
        this.props.closeRecognizeVideoModal();
        this.props.onSetFileInfo({ fileId: null, fileName: null, description: null, coverUrl: null });   // 清空微课
        this.props.onSetProjectTitle('SuperMaker');
        this.props.onSetProjectItem({}); // 新建
        this.props.onSetLocalProjectPath('');
        this.setState({ localProjectItem: {} });
        this.props.onSetLocalProjectItem(null);

        this.resetForNewOrOpen();
    }

    // 打开选择的云端项目
    async openSelectedProject(data) {

        this.setState({ isOpenLocal: false });
        this.props.closeRecognizeVideoModal();
        // 如果代码编辑器打开，则关闭
        if (this.props.codeViewVisible) {
            this.props.setCodeViewVisible(false);
        }
        this.props.onSetShowLoadingProject(true);    // 打开项目加载
        let dataItem;
        if (data) {
            dataItem = data;
        } else {
            dataItem = this.props.projectItem;
        }

        let coskey = dataItem.cosFileProject.cosKey
        let bucketName = dataItem.cosFileProject.cosBucketName
        //获取cdc文件防盗链链接
        dataItem.url = await getObjectUrl(this.projectCos, bucketName, coskey);

        if(this.props.homePageVisible) {
            this.props.onUpdateCourseSku('', '', '');
            this.props.onUpdateProjectUUID('');
        }

        if (dataItem.projectCourse) {
            const fileId = dataItem.projectCourse.projectCourseVodFile.fileId;
            const fileName = dataItem.projectCourse.courseName;
            const description = dataItem.projectCourse.courseDescription;
            const coverUrl = dataItem.projectCourse.courseCover.cosUrl;
            this.props.onSetFileInfo({ fileId, fileName, description, coverUrl })
        } else {
            this.props.onSetFileInfo({ fileId: null, fileName: null, description: null, coverUrl: null })
        }
        // this.props.onItemSelected(this.props.data[id]);
        fetch(dataItem.url).then(response => {
            if (!response) return;
            response.arrayBuffer().then(buffer => {
                this.props.onLoadingStarted();
                this.props.vm.loadProject(buffer)
                    .then(() => {
                        analytics.event({
                            category: 'project',
                            action: 'Import Project File',
                            nonInteraction: true
                        });
                        setTimeout(() => {
                            this.props.onActivateTab(BLOCKS_TAB_INDEX);
                            // console.log('this.props.loadingState : ' + this.props.loadingState);
                            this.props.onSetProjectTitle(dataItem.materialName);
                            this.props.onLoadingFinished(this.props.loadingState);
                            this.props.onSetShowLoadingProject(false);

	                        // console.log('data---', dataItem)
	                        this.setState({ localProjectItem: dataItem });
	                        this.props.onSetLocalProjectPath('');
	                        this.props.onSetLocalProjectItem(dataItem);

                            this.resetForNewOrOpen();
                        }, 1200);
                    })
                    .catch(error => {
                        console.log('err-', error);
                        this.props.onSetShowLoadingProject(false);
                        toasts.error(this.props.intl.formatMessage(ariaMessages.openProjectFail));
                        // alert(this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
                        this.props.onLoadingFinished(this.props.loadingState);
                    });
            }).catch(error => {
                console.log('err--', error);
                this.props.onSetShowLoadingProject(false);
                toasts.error(this.props.intl.formatMessage(ariaMessages.openProjectFail));
            })
        }).catch(error => {
            console.log('err---', error);
            this.props.onSetShowLoadingProject(false);
            toasts.error(this.props.intl.formatMessage(ariaMessages.openProjectFail));
            // alert(this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
            this.props.onLoadingFinished(this.props.loadingState);
        });
    }
    // 打开选择的本地项目
    openSelectedLocalProject(data) {
        this.setState({ isOpenLocal: true });
        this.props.closeRecognizeVideoModal();

        // 如果代码编辑器打开，则关闭
        if (this.props.codeViewVisible) {
            this.props.setCodeViewVisible(false);
        }
        let thisFileInput;
        if (data) {
            thisFileInput = data;
        } else {
            thisFileInput = this.props.projectItem;
        }

        const reader = new FileReader();
        // const thisFileInput = e.target;

        reader.onload = () => this.props.vm.loadProject(reader.result)
            .then(() => {
                analytics.event({
                    category: 'project',
                    action: 'Import Project File',
                    nonInteraction: true
                });

                if (thisFileInput.files[0].name) {
                    const matches1 = thisFileInput.files[0].name.match(/^(.*)\.cdc$/);
                    if (matches1) {
                        const truncatedProjectTitle = matches1[1].substring(0, 100);
                        this.props.onSetProjectTitle(truncatedProjectTitle);
                    }
                    const matches2 = thisFileInput.files[0].name.match(/^(.*)\.sb3$/);
                    if (matches2) {
                        const truncatedProjectTitle = matches2[1].substring(0, 100);
                        this.props.onSetProjectTitle(truncatedProjectTitle);
                    }
                }
                this.props.onSetLocalProjectPath(thisFileInput.files[0].path);  // 保存项目路径

                this.props.onActivateTab(BLOCKS_TAB_INDEX);
                // console.log('this.props.loadingState : ' + this.props.loadingState);
                this.props.onLoadingFinished(this.props.loadingState);
                // Reset the file input after project is loaded
                // This is necessary in case the user wants to reload a project
                thisFileInput.value = null;
                // 清空已选择的云端项目
                this.props.onSetProjectItem({});
                this.setState({ localProjectItem: {} });
                this.props.onSetLocalProjectItem(null);
                // 判断是否有微课信息
                if (this.microlesson) {
                    // 在本地项目中设置微课信息
                    const localProjectItem = Object.assign({}, {
                        projectCourse: this.microlesson
                    });
                    this.setState({
                        localProjectItem
                    });
                    this.props.onSetLocalProjectItem(localProjectItem);
                }

                this.resetForNewOrOpen();
            })
            .catch(error => {
                // console.log(error);
                // alert(this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
                this.props.onLoadingFinished(this.props.loadingState);
                // Reset the file input after project is loaded
                // This is necessary in case the user wants to reload a project
                thisFileInput.value = null;
                this.props.onSetShowLoadingProject(false);
                toasts.error(this.props.intl.formatMessage(ariaMessages.openProjectFail));
            });
        if (thisFileInput.files) { // Don't attempt to load if no file was selected
            this.props.onLoadingStarted();
            reader.readAsArrayBuffer(thisFileInput.files[0]);
            // extract the title from the file and set it as current project title
        }
        this.props.onSetFileInfo({ fileId: null, fileName: null, description: null, coverUrl: null });   // 清空微课
    }

    handleOpenSelectedProject(data) {
        this.props.onCloseTipsLibrary();
        this.openSelectedProject(data);
    }
    handleOpenLocalSelectedProject(data) {
        this.openSelectedLocalProject(data);
    }
    // 清空本地 localProjectItem
    clearLocalProjectItem(materailUUID) {
        if (materailUUID === this.state.localProjectItem.materialUUID) {
            const localProjectItem = this.state.localProjectItem;
            delete localProjectItem.materialId;
            this.setState({
                localProjectItem
            });
            this.props.onSetLocalProjectItem(localProjectItem);
        }
    }

    handleLanguageChange(value) {
        const newLocale = value;
        if (this.props.supportedLocales.includes(newLocale)) {
            this.props.onChangeLanguage(newLocale);
            this.props.setCodeViewVisible(false);
            document.documentElement.lang = newLocale;
        }
    }

    handleToDocument() {
        if (!this.props.isOnLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(ariaMessages.netErrorMessage)));
            return
        }
        let documentUrl = '';
        if (this.props.intl.locale === 'zh-cn') {
            documentUrl = 'https://www.yuque.com/tinkergen-help-cn/codecraft?language=zh-cn';
        } else {
            documentUrl = 'https://www.yuque.com/tinkergen-help-en/codecraft?language=en-us';
        }
        this.openNewWindow(documentUrl);
    }
    
    //跳转CC编程课
    handleToCCLesson() {
        // if(!this.props.isOnLine){
        //     toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(ariaMessages.netErrorMessage)));
        //     return;
        // }
        if (this.props.isProjectSaved) {
            this.props.onOpenCourseHome();
            this.resetCodeViewAndProject();
        } else {
            this.props.onSetRemindSave(true);
            this.props.onSetRemindSaveType('openZwbCourse');
        }
    }
    //更多课程，跳转造物吧
    handleMoreLesson() {
        if (!this.props.isOnLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(ariaMessages.netErrorMessage)));
            return
        }
        //跳转到codecraft
        this.jumpToZwb('lesson');
    }

    //跳转CC项目课
    handleToCCProject() {
        if(!this.props.isOnLine){
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(ariaMessages.netErrorMessage)));
            return;
        }
        if (this.props.isProjectSaved) {
            this.props.onOpenCourseHome();
            this.resetCodeView();
            this.newProject();
        } else {
            this.props.onSetRemindSave(true);
            this.props.onSetRemindSaveType('openZwbCourse');
        }
    }
    //更多项目课，跳转造物吧
    handleMoreProject() {
        if (!this.props.isOnLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(ariaMessages.netErrorMessage)));
            return
        }
        //跳转到codecraft
        this.jumpToZwb('projects');
    }

    jumpToZwb(destination) {
        const localAuthInfo_zwbc = localStorage.getItem('localAuthInfo');
        let locale = this.props.intl.locale;
        let _zwbcUrl = ''
        if (locale === 'zh-cn') {
            _zwbcUrl = zwbcUrl[0];
        } else {
            _zwbcUrl = zwbcUrl[1];
        }
        if (destination=='projects') {
            _zwbcUrl = _zwbcUrl + '/projects/'
        }
       
        this.openNewWindow(_zwbcUrl);
        this.reqStatsUserAction(locale,destination);
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

    // 关闭更新相关弹框
    handleCloseUpdateModal() {
        this.setState({ updateModalType: '' });
    }
    // 到下载安装包
    handleToDownload() {
        this.setState({ updateModalType: 'downloadVersion' });
    }
    // 到版本更新
    handleToUpgrade() {
        this.setState({ updateModalType: 'upgradeVersion' });
    }
    // 重置下载失败状态
    handleResetDownloadFailed() {
        this.setState({ isDownloadFailed: false });
    }

    // 打开另存为弹框
    handleSaveAs() {
        this.setState({ isShowSaveAs: true, saveAsInputValue: this.props.projectTitle });
    }
    // 取消另存为
    handleCancelSaveAs() {
        this.setState({ isShowSaveAs: false, saveAsInputValue: '' });
    }
    // 失焦时的校验
    handleSaveAsInputBlur(value) {
        this.setState({ saveAsInputValue: value ? value : this.props.projectTitle });
    }
    handleSaveAsInputChange(value) {
        this.setState({ saveAsInputValue: value });
    }
    // 确认另存为
    handleConfirmSaveAs() {
        const { localProjectItem, saveAsInputValue } = this.state;
        this.props.onSetProjectTitle(saveAsInputValue);
        if (!localProjectItem.materialUUID) {
            this.handleClickSave('', 'saveAs');
        } else {
            localProjectItem.materialId = '';
            localProjectItem.materialUUID = '';
            localProjectItem.materialName = saveAsInputValue;
            this.setState({ localProjectItem }, () => {
                this.handleClickSave('', 'saveAs');
            });
        }
        this.handleCancelSaveAs();
    }

    onMessage01(args) {

        let {
            action,
            projectType
        } = args;

        this.projectType = projectType;

        if ('saveProject' == action) {
            this.props.onCloseEpcsLibrary();  // 关闭素材弹框
            this.props.onCloseTipsLibrary();  // 关闭素材弹框
            this.props.onSetRemindSave(false);
            this.handleClickSave(this.projectType);
        }
        else if ('newProject' == action) {
            this.props.onSetProjectTitle('SuperMaker');
            this.props.onSetProjectItem({});
            this.props.onSetLocalProjectPath('');
            this.props.onSetLocalProjectItem(null);
            this.setState({ localProjectItem: {} });
        }

    }

    switchEquipment() {
        dispatch01.emit('message01-resp', {
            action: "switchEquipment"
        });
    }

    resetForNewOrOpen() {
        //关闭串口图表界面
        this.props.onCloseSerialChartModal();
        //断开串口设备
        this.props.disconnect().then(() => { this.props.resetDebugMode() });
    }

    //请求课程访问统计接口 
    reqStatsUserAction(locale, destination) {
        // 用户跳转的渠道类型
        let channelToType = locale == 'en' ? 'ZWB User' : 'ZWB User CN';
        // 获取用户信息
        let userInfo = this.props.userInfo || {};
        let {
            userAccount = 'codecraft.chmakerd.com',
            userUUID = '',
            userIdentity = "T",
        } = userInfo;
        const packageConfig = getPackageConfig();
        
        //跳转平台
        let entranceType = 'cc coding home'
        if (destination == 'projects') {
            entranceType = 'cc coding home project'
        }

        let VProjectParams = {
            entranceType,
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
                channelType: channelToType,
                channelVersion: ''
            },
            browserInfo: {
                ip: '',
                visitTime: '',
                browserName: this.browserName,
                browserVersion: this.browserVersion,
                browserLanguage: this.browserLanguage,
                browserOS: this.browserOS
            },
            visitedObjectType: 'VMoreEntrance',
            visitedObjectInfo: VProjectParams,
        }

        // 触发课程访问统计接口
        statsUserAction(params);
    }

    handleLogoClick(){
        this.handleToCCLesson();
    }

    render() {
        // 获取本地存储的用户名，判断用户是否已经登录
        const { userAccount, userNickName, userSex, userHeadPic } = this.props.userInfo;
        const { 
            loginStatus, 
            isRemindSave,
            loading,
            isLoadingProject, 
            isProjectSaved, 
            homePageVisible, 
            myWorkModalVisible, 
            accountMenuOpen, 
            onActivateTab, 
            rescuer, 
            isNeedNewProject, 
            disconnect, 
            onCloseSerialChartModal, 
            resetDebugMode, 
            onSetSavingState,
	        codeViewVisible,
	        intl,
            isOnLine
        } = this.props;
	
        const { 
            iwidth,
            isSaving, 
            isStartUpForHomePage, 
            isShowSaveAs, 
            saveAsInputValue,
            feedBackfilesName,
            isLoadingUploadFiles,
            isFailsUploadFiles, 
            isOpenAbout,
            isOpenCourse,
            isOpenProject, 
            accept
        } = this.state;
        const { updateModalType, updateData, percent, isDownloadFailed, isRemidSaveBeforeClose } = this.state;
        const saveNowMessage = (
            <FormattedMessage
                defaultMessage="Save"
                description="Menu bar item for saving now"
                id="gui.menuBar.saveNow"
            />
        );

        const savingMessage = (
            <FormattedMessage
                defaultMessage="In the save"
                description="Menu bar item for saving now"
                id="gui.menuBar.saving"
            />
        );

        const newProjectMessage = (
            <FormattedMessage
                defaultMessage="New"
                description="Menu bar item for creating a new project"
                id="gui.menuBar.new"
            />
        );
        const shareButton = (
            <Button
                className={classNames(styles.shareButton)}
                onClick={this.props.onShare}
            >
                <FormattedMessage
                    defaultMessage="Share"
                    description="Label for project share button"
                    id="gui.menuBar.share"
                />
            </Button>
        );

        const messages = defineMessages({
            savePromptLabel: {
                defaultMessage: 'Prompt',
                description: '提示',
                id: 'gui.prompt.projectSaveLabel'
            },
            projectSave: {
                defaultMessage: 'Save',
                description: '保存',
                id: 'gui.prompt.projectSave'
            },
            projectNoSave: {
                defaultMessage: 'Do not save',
                description: '不保存',
                id: 'gui.prompt.projectNoSave'
            },
            projectSaveMessage: {
                defaultMessage: 'Would you like to save the current project?',
                description: '是否保存当前文件至我的作品？',
                id: 'gui.prompt.projectSaveMessage'
            }
        });

        return (
            <Box
                className={classNames(
                    this.props.className,
                    styles.menuBar,
                    { [styles.saveInProgress]: this.props.isUpdating }
                )}
            >
                {isSaving && <div className={styles.menuBarDisabled}></div>}
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        <div className={classNames(styles.menuBarItem)}
                            style={{ cursor: 'pointer' }}
                            onClick={this.handleLogoClick}>
                            <img
                                className={styles.scratchLogo}
                                draggable={false}
                                src={scratchLogo}
                            />
                            {/* &nbsp;&nbsp;Codecraft */}
                        </div>
                        <Divider className={classNames(styles.divider)} />
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                            onMouseUp={this.props.onClickLanguage}

                        >
                            <div
                                className={classNames(styles.menuBarItemGrounp, styles.imgIconMargin)}>
                                <img
                                    className={styles.imgIcon}
                                    src={languageIcon}
                                />
                            </div>
                            {/* <LanguageSelector label={this.props.intl.formatMessage(ariaMessages.language)} /> */}
                            {
                                !homePageVisible && <MenuBarMenu
                                    className={classNames(styles.menuBarMenu)}
                                    open={this.props.languageMenuOpen}
                                    place={this.props.isRtl ? 'left' : 'right'}
                                    onRequestClose={this.props.onRequestCloseLanguage}
                                >
                                    {
                                        Object.keys(locales)
                                            .filter(l => !ignore.includes(l))
                                            .map(locale => (
                                                <MenuItem
                                                    key={locale}
                                                    onClick={() => this.handleLanguageChange(locale)}
                                                >
                                                    {locales[locale].name}
                                                </MenuItem>
                                            ))
                                    }
                                </MenuBarMenu>
                            }
                        </div>
                        <Divider className={classNames(styles.divider)} />
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.fileMenuOpen
                            })}
                            onMouseUp={this.props.onClickFile}
                        >
                            <div
                                className={styles.menuBarItemGrounp}>
                                <img
                                    className={styles.imgIcon}
                                    src={iconFile} 
                                />
                                <FormattedMessage
                                    defaultMessage="Files"
                                    description="Text for file dropdown menu"
                                    id="gui.menuBar.file"
                                />
                            </div>
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.fileMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseFile}
                            >
                                {/* for now, only enable New when there is no session */}
                                <MenuItem
                                    onClick={this.handleClickNew}
                                >
                                    <FormattedMessage
                                        defaultMessage="New"
                                        description="Menu bar item for creating a new project"
                                        id="gui.menuBar.new"
                                    />
                                </MenuItem>

                                <SBFileUploader
                                    onOpenLocalSelectedProject={this.handleOpenLocalSelectedProject}
                                >
                                    {(renderFileInput, loadProject) => (
                                        <MenuItem
                                            onClick={loadProject}
                                        >
                                            <FormattedMessage
                                                defaultMessage="Open local projects"
                                                id="gui.menuBar.openLocalProject"
                                            />
                                            {renderFileInput()}
                                        </MenuItem>
                                    )}
                                </SBFileUploader>

                                <MenuItem
                                    onClick={this.handleSaveAs}
                                >
                                    <FormattedMessage
                                        defaultMessage="Save as"
                                        id="gui.saveAs.saveAs"
                                    />
                                </MenuItem>
                                <MenuItem
                                    onClick={() => { this.saveLocalProject('saveAs'); this.props.onRequestCloseFile(); }}>
                                    <FormattedMessage
                                        defaultMessage="Download to your computer"
                                        description="Menu bar item for downloading a project to your computer"
                                        id="gui.menuBar.downloadToComputer"
                                    />
                                </MenuItem>
                            </MenuBarMenu>
                        </div>
			            <Divider className={classNames(styles.divider)} />
                        <div
                            aria-label={this.props.intl.formatMessage(ariaMessages.tutorials)}
                            className={classNames(styles.menuBarItem, styles.hoverable, styles.accountItemSpace)}
                            onClick={this.props.onClickProjects}
                        >
                            <div
                                className={styles.menuBarItemGrounp}>
                                <img src={iconLesson} style={{ width: '16px', marginLeft: '5px', marginTop: '-2px', marginRight: '4px' }} />
                                <span className={styles.userNickName}>{intl.formatMessage(ariaMessages.course)}</span>
                            </div>
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.projectsMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseProjects}
                            >
                                <MenuItem onClick={this.handleOpenCourseModal}>
                                    <FormattedMessage
                                        defaultMessage="Codecraft courses"
                                        id="gui.library.codecraftCourse"
                                    />
                                </MenuItem>
                                <MenuItem onClick={this.handleOpenProjectModal}>
                                    <FormattedMessage
                                        defaultMessage="Projects"
                                        id="gui.library.projectSample"
                                    />
                                </MenuItem>
                                <MenuItem onClick={this.handleMoreLesson}>
                                    <FormattedMessage
                                        defaultMessage="Make To Learn"
                                        id="gui.library.zwb"
                                    />
                                </MenuItem>
                            </MenuBarMenu>
                        </div>
                    </div>
                </div>
                <div className={styles.projectWrapper}>
                    <div className={classNames(styles.menuBarItem, styles.growable)}>
                        <ProjectTitleInput
                            className={classNames(styles.titleFieldGrowable)}
                            onUpdateProjectTitle={this.props.onSetProjectTitle}
                        />
                    </div>

                    <div onClick={!isSaving ? this.handleClickSave : null}
                        className={classNames(styles.saveButton)}>
                        {!isSaving && <img src={iconSave} className={styles.savePic} />}
                        {isSaving && <img src={spinner} />}
                        {!isSaving && <span style={{ whiteSpace: 'nowrap' }}>{saveNowMessage}</span>}
                        {isSaving && <span style={{ color: '#ABB9C6', whiteSpace: 'nowrap' }}>{savingMessage}</span>}

                    </div>
                </div>
                {/* show the proper UI in the account menu, given whether the user is
                logged in, and whether a session is available to log in with */}
                <div className={styles.accountInfoGroup}>
                    <Box style={{ width: "auto", flexGrow: 1 }} />

                    {/* 查看源码 */}
                    <div className={classNames(styles.menuBarItem, styles.hoverable, styles.accountItemSpace)} onClick={this.onCodeViewShow}>
                        <img src={codeViewVisible?iconSwitchDm:iconSwitchJm} style={{ width: '5.125rem', height: '1.875rem' }} />
                    </div>
                    
                    <Box style={{width:"auto", minWidth:"1.875rem"}}/>

                    <div
                        aria-label={this.props.intl.formatMessage(ariaMessages.tutorials)}
                        className={classNames(styles.menuBarItem, styles.hoverable, styles.accountItemSpace)}
                        onClick={this.props.onClickHelp}
                    >
                        <div
                            className={styles.menuBarItemGrounp}>
                            <img
                                className={styles.imgIcon}
                                src={iconHelp}
                            />
                            <FormattedMessage
                                defaultMessage="Help"
                                description=""
                                id="gui.menuBar.help"
                            />
                        </div>
                        {
                            !homePageVisible && <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.helpMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseHelp}
                            >
                                {/* for now, only enable New when there is no session */}
                                <MenuItem
                                    onClick={this.handleToDocument}
                                >
                                    <FormattedMessage
                                        defaultMessage="Online Help"
                                        description=""
                                        id="gui.menuBar.seeHelp"
                                    />
                                </MenuItem>
                                <MenuItem
                                    onClick={this.handClickFeedback}
                                >
                                    <FormattedMessage
                                        defaultMessage="Feedback"
                                        description=""
                                        id="gui.menuBar.feedback"
                                    />
                                </MenuItem>
                                <MenuItem
                                    onClick={() => { this.handleCheckUpdate('handle') }}
                                >
                                    <FormattedMessage
                                        defaultMessage="Check Update"
                                        description=""
                                        id="gui.menuBar.checkUpdate"
                                    />
                                </MenuItem>
                                <MenuItem
                                    onClick={this.handClickAbout}
                                >
                                    <FormattedMessage
                                        defaultMessage="About Codecraft"
                                        description=""
                                        id="gui.menuBar.about"
                                    />
                                </MenuItem>
                            </MenuBarMenu>
                        }
                    </div>

                    <Box style={{width:"auto", minWidth:"0.8rem"}}/>

                    <Box className={styles.userSettingPane}>
                        {loginStatus ? <div
                            className={classNames(styles.menuBarItem, styles.hoverable, styles.accountItemSpace, {
                                [styles.active]: this.props.accountMenuOpen
                            })}
                            style={{ paddingRight: '1.2rem', marginLeft: '2.5rem' }}
                            onMouseUp={this.handleClickAccount}
                        >
                            <div
                                className={styles.menuBarItemGrounp}>
                                <span className={styles.userNickName}>{userNickName}</span>
                                <img src={require('./icon_mdown.png')} style={{ width: '20px', marginLeft: '5px', marginTop: '-2px' }} />
                            </div>
                            {!homePageVisible && <MenuBarMenu
                                place="left"
                                className={classNames(styles.menuBarMenu)} style={{ minWith: '150px' }}
                                open={this.props.accountMenuOpen}
                                onRequestClose={this.props.onRequestCloseAccount}
                            >
                                <MenuItem
                                    onClick={this.props.openEpcsLibrary}
                                >
                                    <FormattedMessage
                                        defaultMessage="My projects"
                                        id="gui.menuBar.myProduction"
                                    />
                                </MenuItem>
                                <MenuItem
                                    onClick={this.handleToUserSetting}
                                >
                                    <FormattedMessage
                                        defaultMessage="Settings"
                                        description="Title for button to return to tutorials library"
                                        id="gui.menuBar.accountSetting"
                                    />
                                </MenuItem>
                                <MenuItem
                                    onClick={this.handleToMyInvitation}
                                >
                                    <FormattedMessage
                                        defaultMessage="My Invitation Code"
                                        id="gui.loginModal.myInvitationCode"
                                    />
                                </MenuItem>
                                <MenuItem
                                    onClick={this.handleToLoginOut}
                                >
                                    <FormattedMessage
                                        defaultMessage="Log out"
                                        description="Title for button to return to tutorials library"
                                        id="gui.menuBar.loginOut"
                                    />
                                </MenuItem>
                            </MenuBarMenu>}
                        </div> : <span className={styles.pleaseLogin} onClick={this.handleOpenLogin}>
                                <FormattedMessage
                                    defaultMessage="Login"
                                    description=""
                                    id="gui.menuBar.nologin"
                                />
                            </span>}
                        <div className={styles.userHeadPicContainer} onMouseUp={!loginStatus ? this.handleOpenLogin : this.props.accountMenuOpen ? null : this.handleClickAccount}>
                            {/* 未登录状态 */}
                            {!loginStatus && <img src={require('./icon_signout.png')} alt="" className={styles.userHeadPic} />}
                            {/* 已登录，有头像 */}
                            {loginStatus && userHeadPic && <img src={'https://' + userHeadPic.cosUrl} alt="" className={styles.userHeadPic} />}

                            {/* 已登录，无头像，未知 */}
                            {loginStatus && !userHeadPic && userSex === 2 && <img src={require('./icon_default_male.png')} alt="" className={styles.userHeadPic} />}
                            {/* 已登录，无头像，男 */}
                            {loginStatus && !userHeadPic && userSex === 1 && <img src={require('./icon_default_male.png')} alt="" className={styles.userHeadPic} />}
                            {/* 已登录，无头像，女 */}
                            {loginStatus && !userHeadPic && userSex === 0 && <img src={require('./icon_default_female.png')} alt="" className={styles.userHeadPic} />}
                        </div>
                    </Box>
                </div>
                
                {/* 用户认证容器 */}
                <AuthenticatePane />

                <div>
                    {homePageVisible ? (
                        <TipsLibrary
                            loading={loading}//cc的加载状态
                            isStartUpForHomePage={isStartUpForHomePage}
                            onOpenLocalSelectedProject={this.handleOpenLocalSelectedProject}
                            onOpenSelectedProject={this.handleOpenSelectedProject}
                        />
                    ) : null}
                    {myWorkModalVisible ? (
                        <EpcsLibrary
                            onOpenSelectedProject={this.handleOpenSelectedProject}
                            // onOpenLocalSelectedProject={this.handleOpenLocalSelectedProject}
                            onClearLocalProjectItem={this.clearLocalProjectItem}
                        />
                    ) : null}
                </div>

                {/* 提示保存 */}
                {isRemindSave && <PromptComponent
                    id={'remindPrompt'}
                    contentLabel={intl.formatMessage(ariaMessages.savePromptLabel)}
                    message={intl.formatMessage(ariaMessages.projectSaveMessage)}
                    cancelLabel={intl.formatMessage(ariaMessages.projectNoSave)}
                    okLabel={intl.formatMessage(ariaMessages.projectSave)}
                    onClose={this.handleCloseSave}
                    onCancel={this.handleCancelSaveProject}
                    onOk={this.handleSaveProject}
                />}
                {isLoadingProject && <Loader />}
                {/* 意见反馈 */}
                {
                    this.props.isOpenFeedback &&
                    <Feedback
                        onChange={this.handleFeedbackChange}
                        onOk={this.handleCommitFeedback}
                        onCancel={this.handleCloseFeedback}
                        onMouseEnter={this.handleMouseEnter.bind()}
                        onMouseLeave={this.handleMouseLeave.bind()}
                        onUploadCurrentProgram={this.handleUploadCurrentProgram}
                        isViewSuggestedExamples={this.state.isViewSuggestedExamples}
                        isUploadCurrentProgram={this.state.isUploadCurrentProgram}
                        feedbackText={this.state.feedbackText}
                        fileChange={this.handlefileChange}
                        fileInput={this.setFileInput}
                        handleFileInput={this.handleFileInput}
                        onFileDelete={this.handlefileDelete}
                        accept={accept}
                        feedBackfilesName={feedBackfilesName}
                        homePageVisible={homePageVisible}
                        isLoadingUploadFiles={isLoadingUploadFiles}
                        isFailsUploadFiles={isFailsUploadFiles}
                        iwidth={iwidth}
                        id={'fileSelect'}
                    />
                }
                {/* 关于界面 */}
                {
                    isOpenAbout &&
                    <About onCancel={this.handleCloseAbout} />
                }
                {/* 课程弹窗 */}
                {
                    isOpenCourse && <CourseModal onCancel={this.handleCloseCourseModal}></CourseModal>
                }
                {/* 项目案例弹窗 */}
                {
                    isOpenProject && <ProjectModal onCancel={this.handleCloseProjectModal}></ProjectModal>
                }
                {
                    /* CodeView */
                    this.state.codeViewInit &&
                    <CodeView />
                }

                {
                    <ZwbCourseSidePane onOpenCourseModal={this.handleOpenCourseModal}/>
                }
                {/* 项目课侧边栏 */}
                {isOnLine &&
                            <ZwbProjectSidePane />
                        }

                {isShowSaveAs && <SaveAsModal
                    onCancel={this.handleCancelSaveAs}
                    onSaveAsInputBlur={this.handleSaveAsInputBlur}
                    onSaveAsInputChange={this.handleSaveAsInputChange}
                    onConfirmSaveAs={this.handleConfirmSaveAs}
                    saveAsInputValue={saveAsInputValue}
                />}

                {
                    /* 设备救援 */
                    this.props.rescueModalIndex === RESCUE_MODAL_DEVICE_SELECT &&
                    <RescueDevice onCancel={this.handleCloseRescueDevice} />
                }

                {
                    this.props.rescueModalIndex === RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP1
                    &&
                    <ElfbotDownBin
                        onCancel={this.handleCloseRescueDevice}
                        versionInfo={this.props.firmwareVersion}
                        step={1}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP2
                    &&
                    <ElfbotDownBin
                        step={2}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_ELFBOT_DOWN_BIN_SETP3
                    &&
                    <ElfbotDownBin
                        onCancel={this.handleCloseRescueDevice}
                        step={3}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_ELFBOT_UPGRADE_INIT
                    &&
                    <ElfbotUpgrade
                        dtype={rescuer ? rescuer.type : ""}
                        onCancel={this.handleCloseRescueDevice}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_ELFBOT_UPGRADING
                    &&
                    <ElfbotUpgrading
                        type={rescuer ? rescuer.type : ""}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_ELFBOT_UPGRADE_SUCC
                    &&
                    <ElfbotUpgradeSucc
                        type={rescuer ? rescuer.type : ""}
                        onCancel={this.handleCloseRescueDevice}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_ELFBOT_UPGRADE_FAIL
                    &&
                    <ElfbotUpgrade
                        dtype={rescuer ? rescuer.type : ""}
                        onCancel={this.handleCloseRescueDevice}
                        type='fail'
                    />
                }
                {
                    isSaving && <LoaderSave />
                }

                {/* 检查更新 */}
                {updateModalType === 'latestVersion' && <LatestVersionModal onRequestClose={this.handleCloseUpdateModal} updateData={updateData} />}
                {updateModalType === 'upgradeVersion' && <UpgradeVersionModal onRequestClose={this.handleCloseUpdateModal} onToDownload={this.handleToDownload} updateData={updateData} />}
                {updateModalType === 'downloadVersion' && <DownloadVersionModal onRequestClose={this.handleCloseUpdateModal} updateData={updateData} percent={percent} vm={this.props.vm} onToUpgrade={this.handleToUpgrade} isDownloadFailed={isDownloadFailed} onResetDownloadFailed={this.handleResetDownloadFailed} />}

                {/* 提示保存 */}
                {isRemidSaveBeforeClose && <RemindSaveModal onQuitWithSave={this.handleQuitWithSave} onQuitWithoutSave={this.handleQuitApp} onQuitCancel={this.handleQuitCancel} />}
            </Box>
        );
    }
}

MenuBar.propTypes = {
    accountMenuOpen: PropTypes.bool,
    canUpdateProject: PropTypes.bool,
    className: PropTypes.string,
    editMenuOpen: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    intl: intlShape,
    isRtl: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    isUpdating: PropTypes.bool,
    languageMenuOpen: PropTypes.bool,
    lessonsMenuOpen: PropTypes.bool,
    projectsMenuOpen: PropTypes.bool,
    loginMenuOpen: PropTypes.bool,
    onClickAccount: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onClickLessons: PropTypes.func,
    onClickProjects: PropTypes.func,
    onClickLogin: PropTypes.func,
    onClickNew: PropTypes.func,
    onClickSave: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenRegistration: PropTypes.func,
    onOpenCourseHome: PropTypes.func,
    onRequestCloseAccount: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onRequestCloseLessons: PropTypes.func,
    onRequestCloseProjects: PropTypes.func,
    onRequestCloseLogin: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onShare: PropTypes.func,
    onToggleLoginOpen: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    renderLogin: PropTypes.func,
    sessionExists: PropTypes.bool,
    startSaving: PropTypes.func,
    username: PropTypes.string,
    onSetAuthInfo: PropTypes.func,
    onSetUserInfo: PropTypes.func,
    onSetLoginStatus: PropTypes.func,
    onActivateTab: PropTypes.func,
};

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}`;
};


const mapStateToProps = state => {
    const loadingState = state.scratchGui.projectState.loadingState;
    const user = state.session && state.session.session && state.session.session.user;
    return {
        rescuer: state.scratchGui.rescue.rescuer,
        accountMenuOpen: accountMenuOpen(state),
        canUpdateProject: typeof user !== 'undefined',
        fileMenuOpen: fileMenuOpen(state),
        helpMenuOpen: helpMenuOpen(state),
        editMenuOpen: editMenuOpen(state),
        isRtl: state.locales.isRtl,
        isUpdating: getIsUpdating(loadingState),
        isShowingProject: getIsShowingProject(loadingState),
        languageMenuOpen: languageMenuOpen(state),
        lessonsMenuOpen: lessonsMenuOpen(state),
        projectsMenuOpen: projectsMenuOpen(state),
        loginMenuOpen: loginMenuOpen(state),
        sessionExists: state.session && typeof state.session.session !== 'undefined',
        username: user ? user.username : null,

        tab: state.scratchGui.loginRegister.tab,
        userInfo: state.scratchGui.loginRegister.userInfo,
        authInfo: state.scratchGui.loginRegister.authInfo,
        loginStatus: state.scratchGui.loginRegister.loginStatus,
        willToDo: state.scratchGui.loginRegister.willToDo,
        connectModalTab: state.scratchGui.deviceConnect.tab,
        saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
        projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
        projectTitle: state.scratchGui.projectTitle,
        vm: state.scratchGui.vm,
        codeViewVisible: state.scratchGui.codeView.visible,
        projectItem: state.scratchGui.material.projectItem,
        localProjectItem: state.scratchGui.material.localProjectItem,
        isRemindSave: state.scratchGui.material.isRemindSave,
        isLoadingProject: state.scratchGui.material.isLoadingProject,
        isRemindSaveType: state.scratchGui.material.isRemindSaveType,
        isProjectSaved: state.scratchGui.material.isProjectSaved,
        loadingState: state.scratchGui.projectState.loadingState,
        homePageVisible: state.scratchGui.modals.tipsLibrary,
        myWorkModalVisible: state.scratchGui.modals.epcsLibrary,
        isOpenFeedback: state.scratchGui.modals.feedback,
        accountMenu: state.scratchGui.menus.accountMenu,
        currentLocale: state.locales.locale,
        supportedLocales: Object.keys(state.locales.messagesByLocale),
        // isFirstStart: state.scratchGui.projectState.isFirstStart,
        rescueModalIndex: state.scratchGui.rescue.modalIndex,
        firmwareVersion: state.scratchGui.rescue.firmwareVersion,
        cdcUrl: state.scratchGui.zwbCourse.cdcUrl,
        cdcName: state.scratchGui.zwbCourse.cdcName,
        requestCdcData: state.scratchGui.zwbCourse.requestCdcData,
	
        isOnLine: state.scratchGui.netStatus.isOnLine,
        localProjectPath: state.scratchGui.projectState.localProjectPath,
        changeTime: state.scratchGui.netStatus.changeTime,
        physicalDevices: state.scratchGui.physicalDevice.physicalDevices,
        disconnect: () => { return state.scratchGui.vm.deviceEngine.disconnect() },
        resetDebugMode: () => { state.scratchGui.vm.setDebugMode(0) }
    };
};

const mapDispatchToProps = dispatch => ({
    openEpcsLibrary: () => dispatch(openEpcsLibrary()),
    onOpenCourseHome: () => dispatch(openTipsLibrary()),
    onClickAccount: () => dispatch(openAccountMenu()),
    onRequestCloseAccount: () => dispatch(closeAccountMenu()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickHelp: () => dispatch(openHelpMenu()),
    onRequestCloseHelp: () => dispatch(closeHelpMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu()),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onClickLogin: () => dispatch(openLoginMenu()),
    onRequestCloseLogin: () => dispatch(closeLoginMenu()),
    onClickNew: (canSave,deviceID) => dispatch(requestNewProject(canSave,deviceID)),
    onClickSave: () => dispatch(saveProject()),
    onSeeCommunity: () => dispatch(setPlayer(true)),

    onClickLessons: () => dispatch(openLessonsMenu()),
    onRequestCloseLessons: () => dispatch(closeLessonsMenu()),

    onClickProjects: () => dispatch(openProjectsMenu()),
    onRequestCloseProjects: () => dispatch(closeProjectsMenu()),
    
    onSetTab: tab => dispatch(setUserTab(tab)),
    onSetAuthInfo: info => dispatch(setAuthInfo(info)),
    onSetUserInfo: info => dispatch(setUserInfo(info)),
    onSetLoginStatus: status => dispatch(setLoginStatus(status)),

    setCodeViewVisible: v => dispatch(setCodeViewVisible(v)),
    onSetRemindSave: bool => dispatch(setRemindSave(bool)),
    onSetRemindSaveType: type => dispatch(setRemindSaveType(type)),
    onLoadingFinished: loadingState => {
        dispatch(onLoadedProject(loadingState));
        // dispatch(closeEpcsLibrary());
        dispatch(closeLoadingProject());
    },
    onCloseEpcsLibrary: () => dispatch(closeEpcsLibrary()),
    onCloseTipsLibrary: () => dispatch(closeTipsLibrary()),
    onSetProjectTitle: title => dispatch(setProjectTitle(title)),
    onLoadingStarted: () => {
        dispatch(openLoadingProject());
        dispatch(onProjectUploadStarted());
    },
    onSetFileInfo: file => dispatch(setFileInfo(file)),
    onSetShowLoadingProject: bool => dispatch(setShowLoadingProject(bool)),
    onSetProjectItem: item => dispatch(setProjectItem(item)),
    onSetLocalProjectItem: item => dispatch(setLocalProjectItem(item)),
    onSetProjectSaved: bool => {
        dispatch(setProjectSaved(bool));
    },
    onSetSavingState: state => {
        dispatch(updateProjectSaveState(state));
    },
    onSetWillToDo: todo => dispatch(setWillToDo(todo)),
    onChangeLanguage: locale => {
        dispatch(selectLocale(locale));
        dispatch(closeLanguageMenu());
    },
    onActivateTab: tab => {
        dispatch(activateTab(tab));
    },
    // onSetIsFirstStart: isFirstStart => {
    //     dispatch(setIsFirstStart(isFirstStart));
    // },
    // onSetIsNeedNewProject: (isNeedNewProject) => {
    //     dispatch(setIsFirstStart(false));
    //     dispatch(setIsNeedNewProject(isNeedNewProject));
    // },
    activateState: state => {
        dispatch(activateState(state));
    },
    setRescueModalIndex: index => dispatch(setRescueModalIndex(index)),
    defaultRescueDeviceTo: () => dispatch(defaultRescueDeviceTo()),
    onCloseSerialChartModal: () => dispatch(closeSerialChartModal()),
    
    onSetLocalProjectPath: path => {
        dispatch(setLocalProjectPath(path));
    },
    onSetChageTime: time => dispatch(setChangeTime(time)),
    
    onOpenFeedbackModal: (tag) => dispatch(openFeedbackModal()),
    onCloseFeedbackModal: (tag) => dispatch(closeFeedbackModal()),
    onUpdateCourseSku: (skuUUID, courseUUID, skuNumber) => dispatch(updateCourseSku(skuUUID, courseUUID, skuNumber)),
    onUpdateProjectUUID: (projectUUID) => dispatch(updateProjectUUID(projectUUID)),
    onUpdateCdcUrl: (cdcUrl, cdcName) => dispatch(updateCdcUrl(cdcUrl, cdcName || '')),
    closeRecognizeVideoModal: () => dispatch(closeRecognizeVideoModal()),
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar));
