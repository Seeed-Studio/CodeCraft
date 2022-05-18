import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import CourseItem from './course-item.jsx';
import ProjectItem from './project-item.jsx';
import HardwareProductsItem from './hardwareProducts-item.jsx';
import CdcProjectItem from './cdc-project-item.jsx';
import Box from '../box/box.jsx';
import TagButton from '../../containers/tag-button.jsx';
import analytics from '../../lib/analytics';
import { toasts } from '../toast-special/toast.jsx';
import styles from './course-home.css';
import iconAright from './image/icon_aright.png';
import iconAleft from './image/icon_aleft.png';

import {
    searchSKUBasicInfoList,
    statsUserAction,
    searchProjectBasicInfoList,
    searchHardwareProductsInfoList,
    searchCCMaterialInfoList
} from '../../lib/busi-proxy/busi-proxy.js';
import scratchLogo from './image/logo.svg';
import iconHelp from './image/icon-help.svg';
import Divider from '../divider/divider.jsx';
import { getPackageConfig } from '../../lib/package-config.js';

import {
    updateWindowDownloadFlag
} from '../../reducers/window-event.js';
import {
    accountMenuOpen,
    openAccountMenu,
    closeAccountMenu,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openCoursesMenu,
    closeCoursesMenu,
    coursesMenuOpen,
    openHelpMenu,
    closeHelpMenu,
    helpMenuOpen,
} from '../../reducers/menus';
import {
    activateTab,
    STAGE_TAB_INDEX
} from '../../reducers/main-tab';
import { setProjectItem, setProjectSaved } from '../../reducers/material-special';
import {
    updatePhysicalDeviceFeaturedState,
} from '../../reducers/physical-device';
import {
    setUserTab,
    LOGIN_TAB_INDEX,
    LOGIN_OUT_TAB_INDEX,
    USER_SETTING_TAB_INDEX,
    USER_TIME_OUT_TAB_INDEX,
    USER_INVITATION_TAB_INDEX
} from '../../reducers/login-register-special.js';
import {
    openTipsLibrary,
    openEpcsLibrary,
    closeTipsLibrary,
    openFeedbackModal,
} from '../../reducers/modals';
import { updateCourseSku, updateCdcUrl } from '../../reducers/zwb-course';
import { updateProjectUUID } from '../../reducers/zwb-project';
import MenuBarMenu from '../menu-bar-special/menu-bar-menu.jsx';
import { MenuItem, MenuSection } from '../menu/menu.jsx';
import creatIcon from './image/icon_create.svg';
import languageIcon from '../language-selector/language-icon.svg';
import locales from '../../../../l10n';
import { selectLocale } from '../../reducers/locales';
import qrcode from './image/icon_qrcode.svg';
import iconLesson from './image/icon_lesson.png';
import iconProject from './image/icon_project.png';
import iconHardware from './image/icon_hardware.png';
import iconMywork from './image/icon_mywork.png';

import iconUp from './image/icon_up.svg';
import iconContect from './image/icon_contect.svg';
import picCode from './image/pic_code.jpg';
import iconEmail from './image/icon_email.png';
// import loadingGif from './image/loading.gif';
import About from '../prompt-special/about.jsx';
import { getOsType, getBrowser, getBrowserLanguage } from '../../lib/os-type.js';
import { zwbcUrl } from '../../lib/busi-proxy/busi-proxy';
import CourseModal from '../home-modal/course-modal.jsx';
import ProjectModal from '../home-modal/project-modal.jsx';
import HardwareProductsModal from '../home-modal/hardwareProducts-modal.jsx';
import SBFileUploader from '../../containers/sb-file-uploader.jsx';
import spriteIcon from './sprite.svg'
import devices from '../../lib/libraries/devices/index.jsx';
import { stringify } from '../../../../vm/src/util/string-util.js';
// import { tcCos } from '../../lib/txcloud.js';
// import { cosConfig } from '../../lib/cos-config.js';

//不展示的硬件
const ignore = [1003, 1007, 1010];
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

const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    operateFail: {
        defaultMessage: 'Failed',
        description: '',
        id: 'gui.connectModal.operateFail'
    },
    openProjectFail: {
        id: 'gui.menuBar.openProjectFail',
        defaultMessage: 'Failed to open project',
        description: '打开工程失败'
    },
    crateBtnText: {
        defaultMessage: 'Start Coding',
        description: '',
        id: 'gui.library.tips.crateBtnText'
    },
    mainPage: {
        defaultMessage: 'Main page',
        description: '',
        id: 'gui.library.tips.mainPage'
    },
    course: {
        id: 'gui.library.course',
        defaultMessage: 'Courses'
    },
    project: {
        id: 'gui.library.project',
        defaultMessage: 'Projects'
    },
    mywork: {
        id: 'gui.library.mywork',
        defaultMessage: 'My projects'
    },
    selectHardwareforProgramming: {
        id: 'gui.library.selectHardwareforProgramming',
        defaultMessage: 'Select hardware for programming'
    },
    netErrorMessage: {
        id: 'gui.net.errorMessage',
        defaultMessage: 'Network error, please check your network.',
    },
    codecraftCourse: {
        id: 'gui.library.codecraftCourse',
        defaultMessage: 'Codecraft courses'
    },
    projectSample: {
        id: 'gui.library.projectSample',
        defaultMessage: 'Projects'
    },
    zwb: {
        id: 'gui.library.zwb',
        defaultMessage: 'Make To Learn'
    },
    hardwareProducts: {
        id: 'gui.library.hardwareProducts',
        defaultMessage: 'Supported hardware'
    },
    moreCourses: {
        id: 'gui.library.moreCourses',
        defaultMessage: 'More Courses'
    },
    moreProject: {
        id: 'gui.library.moreProject',
        defaultMessage: 'More Projects'
    },
    back: {
        id: 'gui.courseHome.btnBack',
        defaultMessage: 'Back'
    },
    tutorials: {
        id: 'gui.menuBar.tutorialsLibrary',
        defaultMessage: 'Sample program',
        description: 'accessibility text for the tutorials button'
    },
    viewAlllogin: {
        id: 'gui.library.viewAlllogin',
        defaultMessage: 'View all (login required)',
    },
    viewAll: {
        id: 'gui.library.viewAll',
        defaultMessage: 'View all',
    },
    importProject: {
        id: 'gui.library.importProject',
        defaultMessage: 'Import project',
    },
});

const NetErrorToast = (text) => {
    return (
        <Box className={styles.netErrorStyle}>
            <span>{text}</span>
        </Box>
    );
}

const LEFT = 0;
const RIGHT = 1;

class CourseHome extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'handleMoreLesson',
            'handleToUserSetting',
            'handleToMyInvitation',
            'handleToLoginOut',
            'handleOpenLogin',
            'handleClickAccount',
            'handleSelectedCdcProject',
            'handleSelectedCourse',
            'handleSelectedProject',
            'handleSelectedHardwareProduct',
            'handleOpenCourseModal',
            'handleCloseCourseModal',
            'handleOpenProjectModal',
            'handleCloseProjectModal',
            'handleHardwareProductsModel',
            'handleCloseHardwareProductsModal',
            'handleCreate',
            'handleLanguageChange',
            'handFeedback',
            'handleCheckUpdate',
            'handleToTop',
            'handleSwipeList',
            'handleScroll',
            'handleResize',
            'handleCdcProjectScroll',
            'handleSkuScroll',
            'handleProjectScroll',
            'handleHardwareProductScroll',
            'handleLoadMoreSku',
            'handleLoadMoreProject',
            'handleLoadMoreCdcProject',
            'handleLoadMoreHardwareProduct',
            'handClickFeedback',
            'handleToDocument',
            'handClickAbout',
            'handleOpenCDC',
            // 'handleCloseFeedback',
            'handleCloseAbout',
            'handleSelectedDevice',
            'mailTo',
        ]);
        this.state = {
            skuBasicInfoList: [],
            projectBasicInfoList: [],
            hardwareProductsBasicInfoList: [],
            cdcProjectList: [],

            skuTotalCount: 0,
            projectTotalCount: 0,
            hardwareProductTotalCount: 0,
            cdcProjectTotalCount: 0,

            isShowSkuLeftArrow: false,
            isShowSkuRightArrow: false,
            isShowProjectLeftArrow: false,
            isShowProjectRightArrow: false,
            isShowHardwareProductLeftArrow: false,
            isShowHardwareProductRightArrow: false,
            isShowCdcProjectLeftArrow: false,
            isShowCdcProjectRightArrow: false,

            isSkuLoading: true,
            isProjectLoading: true,
            isHardwareProductLoading: true,
            isCdcProjectLoading: true,

            isShowToTop: false,
            isOpenAbout: false,
            isOpenCourse: false, //课程窗口开关
            isOpenProject: false, //项目示例开关
            isOpenHardwareProducts: false, //开关
        };
        this.skuPageNum = 0;
        this.projectPageNum = 0;
        this.hardwareProductPageNum = 0;
        this.cdcProjectPageNum = 0;

        this.pageSize = 12;

        this.saveRef = ref => {this.refDom = ref};

        let { name } = getOsType();
        let { browserName, browserVersion } = getBrowser();
        this.browserName = browserName;
        this.browserVersion = browserVersion;
        this.browserOS = name;
        this.browserLanguage = getBrowserLanguage();

        let sprite = [{
            id: 1000,
            name: (
                <FormattedMessage
                    defaultMessage="Stage mode"
                    description="stage mode"
                    id="gui.devices.stage.name"
                />
            ),
            objName: '舞台模式',
            iconURL: spriteIcon,
            featured: true,
            connectState: 0,
            type: 'sprite',
            tags: [],
            info: [],
            sounds: [],
            costumes: [],
            currentCostumeIndex: 0,
            scratchX: 0,
            scratchY: 0,
            scale: 1,
            direction: 0,
            rotationStyle: 'normal',
            isDraggable: false,
            visible: true,
            spriteInfo: {},
            isStage: true,
            enabled: true
        }];
        this.devicesList = sprite.concat(devices).filter(device => !ignore.includes(device.id));
    }
    componentDidMount() {
        if (this.props.authInfo
            && Object.keys(this.props.authInfo).length > 0) {
            this.handleSearchSKUBasicInfoList({});
            this.handleSearchProjectBasicInfoList({});
            this.handleSearchHardwareProductsInfoList({})
            setTimeout(() => {
                this.handleSearchCCMaterialInfoList({});
            }, 1000);
        }
        window.addEventListener('resize',this.handleResize);
        // this.initCos();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.authInfo !== this.props.authInfo) {
            this.componentDidMount();
        }

        if (prevProps.deletedProjectUUID !== this.props.deletedProjectUUID && this.props.deletedProjectUUID) {
            setTimeout(() => {
                this.handleSearchCCMaterialInfoList({});
            }, 1000);
        }
        
        //登录状态改变后，重新获取我的作品列表
        // if (prevProps.loginStatus !== this.props.loginStatus && this.props.loginStatus) {
        //     this.handleSearchCCMaterialInfoList({});
        // }
    }
    componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
        window.removeEventListener('resize',this.handleResize);
    }
    // 初始化cos
    // initCos() {
    //     let bucketName = cosConfig.projectBucketName;
    //     this.setState({
    //         bucketName,
    //     });

    //     this.cos = tcCos(this.props.authInfo, bucketName);
    // }

    //首页上下滚动
    handleScroll(e) {
        const scrollTop = e.target.scrollTop;
        if (e.target.id=='homePage') {
            if (scrollTop > 550) {
                if (!this.state.isShowToTop) { this.setState({ isShowToTop: true }) }
            } else {
                if (this.state.isShowToTop) { this.setState({ isShowToTop: false }) }
            }
        }

        // if (this.state.isLoading) {
        //     return
        // }
        // const offsetHeight = e.target.offsetHeight;
        // const scrollHeight = e.target.scrollHeight;
        // if (scrollTop && offsetHeight && scrollHeight && (scrollTop + offsetHeight + 200 > scrollHeight)) {
        //     this.handleLoadMore();
        // }
    }
    handleResize(e){
        const cdcProjectListScrollBox = document.getElementById('cdcProjectListScrollBox')
        const skuListScrollBox = document.getElementById('skuListScrollBox')
        const projectListScrollBox = document.getElementById('projectListScrollBox')
        const hardwareProductListScrollBox = document.getElementById('hardwareProductListScrollBox')
        if(cdcProjectListScrollBox){
            if(cdcProjectListScrollBox.clientWidth==this.cdcElement.clientWidth){
                this.setState({
                    isShowCdcProjectRightArrow:true
                })
            }else{
                this.setState({
                    isShowCdcProjectRightArrow:false
                })
            }
        }
        if(skuListScrollBox.clientWidth==this.skuElement.clientWidth){
            this.setState({
                isShowSkuRightArrow:true
            })
        }else{
            this.setState({
                isShowSkuRightArrow:false
            })
        }
        if(projectListScrollBox.clientWidth==this.projectElement.clientWidth){
            this.setState({
                isShowProjectRightArrow:true
            })
        }else{
            this.setState({
                isShowProjectRightArrow:false
            })
        }
        if(hardwareProductListScrollBox.clientWidth==this.hardwareProductElement.clientWidth){
            this.setState({
                isShowHardwareProductRightArrow:true
            })
        }else{
            this.setState({
                isShowHardwareProductRightArrow:false
            })
        }
    }
    //课程之类的列表左右划动
    handleCdcProjectScroll(e) {
        let scrollLeft = e.target.scrollLeft
        let width = e.target.clientWidth;
        let scrollWidth = e.target.scrollWidth;
        const { cdcProjectTotalCount, cdcProjectList } = this.state;
        this.setState({
            isShowCdcProjectLeftArrow: !scrollLeft <= 0,
            isShowCdcProjectRightArrow: !(cdcProjectList.length == cdcProjectTotalCount && scrollLeft >= scrollWidth - width)
        })
    }

    handleSkuScroll(e) {
        let scrollLeft = e.target.scrollLeft
        let width = e.target.clientWidth;
        let scrollWidth = e.target.scrollWidth;
        const { skuTotalCount, skuBasicInfoList } = this.state;
        this.setState({
            isShowSkuLeftArrow: !scrollLeft <= 0,
            isShowSkuRightArrow: !(skuBasicInfoList.length == skuTotalCount && scrollLeft >= scrollWidth - width)
        })
    }

    handleProjectScroll(e) {
        let scrollLeft = e.target.scrollLeft
        let width = e.target.clientWidth;
        let scrollWidth = e.target.scrollWidth;
        const { projectTotalCount, projectBasicInfoList } = this.state;
        this.setState({
            isShowProjectLeftArrow: !scrollLeft <= 0,
            isShowProjectRightArrow: !(projectBasicInfoList.length == projectTotalCount && scrollLeft >= scrollWidth - width)
        })
    }

    handleHardwareProductScroll(e) {
        let scrollLeft = e.target.scrollLeft
        let width = e.target.clientWidth;
        let scrollWidth = e.target.scrollWidth;
        const { hardwareProductTotalCount, hardwareProductsBasicInfoList } = this.state;
        this.setState({
            isShowHardwareProductLeftArrow: !scrollLeft <= 0,
            isShowHardwareProductRightArrow: !(hardwareProductsBasicInfoList.length == hardwareProductTotalCount && scrollLeft >= scrollWidth - width)
        })
    }

    handFeedback() {
        this.props.onOpenFeedbackModal();
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

    handleCheckUpdate(type) {
        if ('handle' == type && !this.props.isOnLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(messages.netErrorMessage)));
            return
        }
        const args = { checkUpdateType: type }
        this.props.vm.deviceEngine.sendVersionUpgradeMessage({ action: 'check-upgrade', args });
    }

    // 获取SKU基本信息
    handleSearchSKUBasicInfoList({ pageNum = 0 }) {
        this.setState({
            isSkuLoading: true,
        })
        let params = {
            authInfo: this.props.authInfo,
            language: this.props.intl.locale === 'zh-cn' ? 'zh' : 'en',
            skuOtherPlatform: "codecraft",
            fromResult: pageNum * this.pageSize,
            sizeResult: this.pageSize,
        }

        this.skuPageNum = pageNum;

        searchSKUBasicInfoList(params).then((data) => {
            let skuBasicInfoList = data.skuBasicInfoList;
            this.setState({
                isSkuLoading: false,
                skuBasicInfoList: pageNum == 0 ? skuBasicInfoList : this.state.skuBasicInfoList.concat(skuBasicInfoList),
                skuTotalCount: data.totalCount,
            }, () => {
                //第一页拿数据需要判断数据够不够一行
                if (pageNum == 0) {
                    let body = document.getElementById('body');
                    let scrollBox = document.getElementById('skuList');
                    this.setState({
                        isShowSkuRightArrow: !(body.clientWidth > scrollBox.clientWidth)
                    })
                }
            })

        }, (err) => {
            // toasts.error('操作失败');
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.props.onSetTab(USER_TIME_OUT_TAB_INDEX);
            }
            this.setState({
                isSkuLoading: false,
            })
        });
    }

    // 获取项目课基本信息
    handleSearchProjectBasicInfoList({ pageNum = 0 }) {
        this.setState({
            isProjectLoading: true,
        })
        let params = {
            authInfo: this.props.authInfo,
            language: this.props.intl.locale === 'zh-cn' ? 'zh' : 'en',
            projectType: "ccproject",
            fromResult: pageNum * this.pageSize,
            sizeResult: this.pageSize,
        }

        this.projectPageNum = pageNum;

        searchProjectBasicInfoList(params).then((data) => {
            let projectBasicInfoList = data.projectBasicInfoList;
            this.setState({
                isProjectLoading: false,
                projectBasicInfoList: pageNum == 0 ? projectBasicInfoList : this.state.projectBasicInfoList.concat(projectBasicInfoList),
                projectTotalCount: data.totalCount,
            }, () => {
                //第一页拿数据需要判断数据够不够一行
                if (pageNum == 0) {
                    let body = document.getElementById('body');
                    let scrollBox = document.getElementById('projectList');
                    this.setState({
                        isShowProjectRightArrow: !(body.clientWidth > scrollBox.clientWidth)
                    })
                }
            })

        }, (err) => {
            // toasts.error('操作失败');
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.props.onSetTab(USER_TIME_OUT_TAB_INDEX);
            }
            this.setState({
                isProjectLoading: false,
            })
        });
    }

    // 获取产品硬件列表
    handleSearchHardwareProductsInfoList({ pageNum = 0 }) {
        this.setState({
            isHardwareProductLoading: true,
        })
        let params = {
            ownerId: 999999999,
            language: this.props.intl.locale === 'zh-cn' ? 'zh' : 'en',
            fromResult: pageNum * this.pageSize,
            sizeResult: this.pageSize,
            queryPurpose: 'RT-ACCESS',
            publishStatus: 3
        }

        this.hardwareProductPageNum = pageNum;

        searchHardwareProductsInfoList(params).then((data) => {
            let hardwareProductsBasicInfoList = data.hardwareProductsBasicInfoList;
            this.setState({
                isHardwareProductLoading: false,
                hardwareProductsBasicInfoList: pageNum == 0 ? hardwareProductsBasicInfoList : this.state.hardwareProductsBasicInfoList.concat(hardwareProductsBasicInfoList),
                hardwareProductTotalCount: data.totalCount,
            }, () => {
                //第一页拿数据需要判断数据够不够一行
                if (pageNum == 0) {
                    let body = document.getElementById('body');
                    let scrollBox = document.getElementById('hardwareProductList');
                    this.setState({
                        isShowHardwareProductRightArrow: !(body.clientWidth > scrollBox.clientWidth)
                    })
                }
            })

        }, (err) => {
            // toasts.error('操作失败');
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.props.onSetTab(USER_TIME_OUT_TAB_INDEX);
            }
            this.setState({
                isHardwareProductLoading: false,
            })
        });
    }

    // 获取用户云端作品
    handleSearchCCMaterialInfoList({ pageNum = 0 }) {
        this.setState({
            isCdcProjectLoading: true,
        })
        const params = {
            authInfo: this.props.authInfo,
            materialType: 'P',
            fromResult: pageNum * this.pageSize,
            sizeResult: this.pageSize
        }

        this.cdcProjectPageNum = pageNum;

        searchCCMaterialInfoList(params).then((data) => {
            let ccProjectMaterialList = data.ccProjectMaterialList;
            this.setState({
                isCdcProjectLoading: false,
                cdcProjectList: pageNum == 0 ? ccProjectMaterialList : this.state.cdcProjectList.concat(ccProjectMaterialList),
                cdcProjectTotalCount: data.totalCount,
            }, () => {
                //第一页拿数据需要判断数据够不够一行
                if (pageNum == 0) {
                    let body = document.getElementById('body');
                    let scrollBox = document.getElementById('cdcProjectList');
                    this.setState({
                        isShowCdcProjectRightArrow: !(body.clientWidth > scrollBox.clientWidth)
                    })
                }
            })
        }, (err) => {
            // toasts.error('操作失败');
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.props.onSetTab(USER_TIME_OUT_TAB_INDEX);
            }
            this.setState({
                isCdcProjectLoading: false,
            })
        });
    }

    // 加载更多课程
    handleLoadMoreSku() {
        const { isSkuLoading } = this.state;
        if (isSkuLoading) {
            return
        }
        const { skuTotalCount, skuBasicInfoList } = this.state;
        if (skuBasicInfoList.length < skuTotalCount) {
            this.handleSearchSKUBasicInfoList({
                pageNum: ++this.skuPageNum,
            });
        }
    }

    // 加载更多项目
    handleLoadMoreProject() {
        const {isProjectLoading } = this.state;
        if (isProjectLoading) {
            return
        }
        const { projectTotalCount, projectBasicInfoList } = this.state;
        if (projectBasicInfoList.length < projectTotalCount) {
            this.handleSearchProjectBasicInfoList({
                pageNum: ++this.projectPageNum,
            });
        }
    }

    // 加载更多作品
    handleLoadMoreCdcProject() {
        const {isCdcProjectLoading } = this.state;
        if (isCdcProjectLoading) {
            return
        }
        const { cdcProjectTotalCount, cdcProjectList } = this.state;
        if (cdcProjectList.length < cdcProjectTotalCount) {
            this.handleSearchCCMaterialInfoList({
                pageNum: ++this.cdcProjectPageNum,
            });
        }
    }

    // 加载更多硬件产品
    handleLoadMoreHardwareProduct() {
        const {isHardwareProductLoading } = this.state;
        if (isHardwareProductLoading) {
            return
        }
        const { hardwareProductTotalCount, hardwareProductsBasicInfoList } = this.state;
        if (hardwareProductsBasicInfoList.length < hardwareProductTotalCount) {
            this.handleSearchHardwareProductsInfoList({
                pageNum: ++this.hardwareProductPageNum,
            });
        }
    }

    //选择云端的工程文件
    handleSelectedCdcProject(dataItem) {
        dataItem.materialId = dataItem.materialUUID;
        //设置当前工程
        this.props.onSetProjectItem(dataItem);
        //打开cdc文件
        this.props.onOpenSelectedProject(dataItem);
        this.props.onCloseCourseHome();
    }

    handleClose() {
        this.props.onRequestClose();
        // analytics.pageview(`/${this.props.id}/search?q=${this.state.filterQuery}`);
    }

    //左右滑动作品
    handleSwipeCdcProjectList(direction) {
        this.handleSwipeList('cdcProjectList', direction)
    }

    handleSwipeSkuList(direction) {
        this.handleSwipeList('skuList', direction)
    }

    handleSwipeProjectList(direction) {
        this.handleSwipeList('projectList', direction)
    }

    handleSwipeHardwareProductList(direction) {
        this.handleSwipeList('hardwareProductList', direction)
    }

    handleSwipeList(type, direction) {
        let scrollBox = document.getElementById(type);
        //列表一屏宽
        let width = scrollBox.clientWidth;
        let scrollWidth = scrollBox.scrollWidth;
        let scrollLeft = 0;
        if (direction == LEFT) {
            scrollLeft = scrollBox.scrollLeft - width;
        } else {
            scrollLeft = scrollBox.scrollLeft + width;
            //提前一页加载更多
            if (scrollLeft > scrollWidth - width * 2) {
                if (type == 'cdcProjectList') {
                    this.handleLoadMoreCdcProject()
                } else if (type == 'skuList') {
                    this.handleLoadMoreSku()
                } else if (type == 'projectList') {
                    this.handleLoadMoreProject()
                } else if (type == 'hardwareProductList') {
                    this.handleLoadMoreHardwareProduct()
                }
            }
        }

        scrollBox.scrollLeft = scrollLeft > 0 ? scrollLeft : 0
        // scrollBox.scrollTo({
        //     left: scrollLeft > 0 ? scrollLeft : 0,
        //     behavior: 'smooth'
        // });

    }

    // 更多课程点击
    handleMoreLesson() {
        this.jumpToZwb('lesson')
    }
    handleMoreProject() {
        this.jumpToZwb('projects')
    }

    jumpToZwb(destination) {
        const localAuthInfo_zwbc = localStorage.getItem('localAuthInfo');
        //获取当前语言
        let locale = this.props.intl.locale;
        let _zwbcUrl = ''
        if (locale === 'zh-cn') {
            _zwbcUrl = zwbcUrl[0];
        } else {
            _zwbcUrl = zwbcUrl[1];
        }
        if (destination == 'projects') {
            _zwbcUrl = _zwbcUrl + '/projects/'
        }
        this.openNewWindow(_zwbcUrl);
        this.reqStatsUserAction(locale, destination);
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
        let entranceType = 'cc sku home'
        if (destination == 'projects') {
            entranceType = 'cc project home'
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

    handleLanguageChange(value) {
        const newLocale = value;
        if (this.props.supportedLocales.includes(newLocale)) {
            this.props.onChangeLanguage(newLocale);
            document.documentElement.lang = newLocale;
        }
    }

    // 打开我的邀请码
    handleToMyInvitation() {
        this.props.onSetTab(USER_INVITATION_TAB_INDEX);
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

    //打开硬件产品弹窗
    handleHardwareProductsModel() {
        this.setState({
            isOpenHardwareProducts: true
        })
    }

    handleCloseHardwareProductsModal() {
        this.setState({
            isOpenHardwareProducts: false
        })
    }
    //帮助文档
    handleToDocument() {
        let documentUrl = '';
        if (this.props.intl.locale === 'zh-cn') {
            documentUrl = 'https://www.yuque.com/tinkergen-help-cn/codecraft?language=zh-cn';
        } else {
            documentUrl = 'https://www.yuque.com/tinkergen-help-en/codecraft?language=en-us';
        }
        this.openNewWindow(documentUrl);
    }
    //关于
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
    //意见反馈
    handClickFeedback() {
        this.props.onOpenFeedbackModal();
    }
    // handleCloseFeedback() {
    //     this.props.onCloseFeedbackModal();
    // }

    // 打开帐号设置
    handleToUserSetting() {
        this.props.onSetTab(USER_SETTING_TAB_INDEX);
    }
    // 打开退出登录二次确认弹框
    handleToLoginOut() {
        this.props.onSetTab(LOGIN_OUT_TAB_INDEX);
    }
    // 打开登录弹框
    handleOpenLogin() {
        if (!navigator.onLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(messages.netErrorMessage)));
            return;
        }
        this.props.onSetTab(LOGIN_TAB_INDEX);
    }

    //打开本地cdc文件
    handleOpenCDC(data) {
        this.props.onOpenLocalSelectedProject(data);
        this.props.onCloseCourseHome();
    }

    mailTo() {
        this.props.updateWindowDownloadFlag(true);
    }

    //个人账户菜单
    handleClickAccount() {
        if (!navigator.onLine) {
            toasts.showCustom(NetErrorToast(this.props.intl.formatMessage(messages.netErrorMessage)));
            return;
        }
        this.props.onClickAccount()
    }

    handleSelectedCourse(skuUUID, courseUUID, skuNumber) {
        this.props.onUpdateCourseSku('-', '-', '-');  // 用于选择同一课程时监测到变化重新拉取数据
        this.props.onUpdateProjectUUID('');
        setTimeout(() => {
            this.props.onUpdateCourseSku(skuUUID, courseUUID, skuNumber);
        }, 100);
        this.props.onCloseCourseHome();
    }

    handleSelectedProject(projectUUID) {
        this.props.onUpdateCourseSku('', '', '');
        this.props.onUpdateProjectUUID('-');  // 用于选择同一课程时监测到变化重新拉取数据
        setTimeout(() => {
            this.props.onUpdateProjectUUID(projectUUID);
        }, 100);
        this.props.onCloseCourseHome();
    }

    //硬件产品打开链接
    handleSelectedHardwareProduct(hardwareProductClassInfo) {
        this.openNewWindow(hardwareProductClassInfo.hardwareProductsLink);
    }

    handleCreate() {
        this.props.onUpdateCourseSku('', '', '');
        this.props.onUpdateProjectUUID('');
        if (this.props.cdcUrl) {
            this.props.onUpdateCdcUrl('', '');
        } else {
            this.props.onUpdateCdcUrl('-', '-');
            setTimeout(() => {
                this.props.onUpdateCdcUrl('', '');
            }, 100);
        }
        this.props.onCloseCourseHome();
    }

    //选择设备
    handleSelectedDevice(device) {
        //舞台模式直接切换
        if (device.isStage) {
            this.props.vm.onActiveStage();
            this.props.onTabIndexUpdate(STAGE_TAB_INDEX);
            this.props.onCloseCourseHome();
            this.props.onSetProjectSaved(true);
        } else {
            //非舞台模式就加载设备
            this.props.vm.loadDeviceProject(device,device.id).then(() => {
                this.props.onUpdatePhysicalDeviceState(device.id, true);
                this.handleCreate();
            }).catch((err) => {
                console.log("handleSelectPhysicalDevice loadDeviceProject ... ", err);
            });
        }
    }

    handleToTop() {
        let homePage = document.getElementById('homePage')
        homePage.scrollTop = 0;
        homePage.scrollLeft = 0;
        // homePage.scrollTo({
        //     left: 0,
        //     top: 0,
        //     behavior: 'smooth'
        // });
    }

    render() {
        const {
            skuBasicInfoList,
            projectBasicInfoList,
            hardwareProductsBasicInfoList,
            cdcProjectList,
            isSkuLoading,
            isProjectLoading,
            isHardwareProductLoading,
            isCdcProjectLoading,
            isShowToTop,
            isOpenAbout,
            isOpenCourse,
            isOpenProject,
            isOpenHardwareProducts,
            isShowSkuLeftArrow,
            isShowSkuRightArrow,
            isShowProjectLeftArrow,
            isShowProjectRightArrow,
            isShowHardwareProductLeftArrow,
            isShowHardwareProductRightArrow,
            isShowCdcProjectLeftArrow,
            isShowCdcProjectRightArrow,
        } = this.state;

        const {
            intl,
            loginStatus,
            userInfo,
            loading,//cc的加载状态，避免和当前的加载状态冲突
            vm,
            isOnLine,
        } = this.props;

        const { userAccount, userNickName, userSex, userHeadPic } = userInfo;

        return (
            <div
                id={'homePage'}
                className={styles.homePage}
                onScroll={this.handleScroll}
            >
                <Box className={styles.menuBar}>
                    <div className={styles.menuBarWrapper}>
                        <Box className={styles.leftPane}>
                            <div className={classNames(styles.menuBarItem)}>
                                <div className={styles.menuBarCodecraft}>
                                    <img
                                        className={styles.scratchLogo}
                                        draggable={false}
                                        src={scratchLogo}
                                    />
                                </div>
                            </div>

                            <Divider className={classNames(styles.verticalDivider)} />
                            <div
                                className={classNames(styles.menuBarItem, styles.hoverable)}
                                onMouseUp={this.props.onClickLanguage}
                            >
                                <div
                                    className={classNames(styles.menuBarItemGrounp, styles.imgIconMargin)}>
                                    <img
                                        className={styles.imgIcon}
                                        src={languageIcon}
                                    />
                                </div>
                                <MenuBarMenu
                                    className={classNames(styles.menuBarMenu)}
                                    open={this.props.languageMenuOpen}
                                    place={this.props.isRtl ? 'left' : 'right'}
                                    onRequestClose={this.props.onRequestCloseLanguage}
                                >
                                    {
                                        Object.keys(locales)
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
                            </div>

                            <Divider className={classNames(styles.verticalDivider)} />

                            <div
                                className={classNames(styles.menuBarItem, styles.hoverable)}
                                onMouseUp={this.props.onClickCoursesMenu}
                            >
                                <div
                                    className={styles.menuBarItemGrounp}>
                                    <img src={require('./icon_lesson.png')} style={{ width: '16px', marginLeft: '5px', marginTop: '-2px', marginRight: '4px' }} />
                                    <span className={styles.userNickName}>{intl.formatMessage(messages.course)}</span>
                                </div>
                                <MenuBarMenu
                                    place="left"
                                    className={classNames(styles.menuBarMenu)} style={{ minWith: '150px' }}
                                    open={this.props.coursesMenuOpen}
                                    onRequestClose={this.props.onRequestCoursesMenu}
                                >
                                    <MenuItem
                                        onClick={this.handleOpenCourseModal}
                                    >
                                        <FormattedMessage
                                            defaultMessage="Codecraft courses"
                                            id="gui.library.codecraftCourse"
                                        />
                                    </MenuItem>
                                    <MenuItem
                                        onClick={this.handleOpenProjectModal}
                                    >
                                        <FormattedMessage
                                            defaultMessage="Projects"
                                            id="gui.library.projectSample"
                                        />
                                    </MenuItem>
                                    <MenuItem
                                        onClick={this.handleMoreLesson}
                                    >
                                        <FormattedMessage
                                            defaultMessage="Make To Learn"
                                            id="gui.library.zwb"
                                        />
                                    </MenuItem>
                                </MenuBarMenu>
                            </div>

                        </Box>
                        <Box className={styles.centerPane}>
                            {intl.formatMessage(messages.mainPage)}
                        </Box>
                        <Box className={styles.rightPane}>

                            <div className={classNames(styles.menuBarItem, styles.createBtn)}
                                onClick={this.handleCreate}>
                                {intl.formatMessage(messages.crateBtnText)}<img src={creatIcon} />
                            </div>

                            <div
                                aria-label={intl.formatMessage(messages.tutorials)}
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
                                <MenuBarMenu
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
                            </div>
                            <div className={styles.userInfo}>
                                {loginStatus ? <div
                                    className={classNames(styles.menuBarItem, styles.hoverable, {
                                        [styles.active]: this.props.accountMenuOpen
                                    })}
                                    onMouseUp={this.handleClickAccount}
                                >
                                    <div
                                        className={styles.menuBarItemGrounp}>
                                        <span className={styles.userNickName}>{userNickName}</span>
                                        <img src={require('./icon_mdown.png')} style={{ width: '20px', marginLeft: '5px', marginTop: '-2px' }} />
                                    </div>
                                    <MenuBarMenu
                                        place="left"
                                        className={classNames(styles.menuBarMenu)} style={{ minWith: '150px' }}
                                        open={this.props.accountMenuOpen}
                                        onRequestClose={this.props.onRequestCloseAccount}
                                    >
                                        <MenuItem
                                            onClick={this.props.openMyworkModal}
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
                                    </MenuBarMenu>
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

                                    {/* 已登录，无头像，男 */}
                                    {loginStatus && !userHeadPic && userSex === 2 && <img src={require('./icon_default_male.png')} alt="" className={styles.userHeadPic} />}
                                    {/* 已登录，无头像，男 */}
                                    {loginStatus && !userHeadPic && userSex === 1 && <img src={require('./icon_default_male.png')} alt="" className={styles.userHeadPic} />}
                                    {/* 已登录，无头像，女 */}
                                    {loginStatus && !userHeadPic && userSex === 0 && <img src={require('./icon_default_female.png')} alt="" className={styles.userHeadPic} />}
                                </div>
                            </div>
                        </Box>
                    </div>
                </Box>

                <Box id={'body'} className={styles.body}>
                    <Box className={styles.devicesBox}>
                        <div className={styles.devicesBoxTitle}>
                            {
                                intl.formatMessage(messages.selectHardwareforProgramming)
                            }
                        </div>
                        <Box className={styles.physicalDeviceListWrapper}>
                            {
                                this.devicesList.map((device, index) => {
                                    return (
                                        <Box key={index}
                                            className={classNames(styles.physicalDeviceItem)}
                                            onClick={() => this.handleSelectedDevice(device)}
                                        >
                                            <div className={styles.imgContainer}>
                                                <img className={styles.physicalDeviceIcon} src={device.iconURL} />
                                            </div>
                                            <div className={styles.deviceName}>
                                                <span className={styles.deviceNameText}>
                                                    {device.name}
                                                </span>
                                            </div>
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    </Box>

                    {/* 我的作品 */}
                    <Box className={styles.middleGroup}>
                        <div className={styles.picText}>
                            <img className={styles.picTextLogo}
                                src={iconMywork}>
                            </img>
                            <span className={classNames(styles.picTextTitle, intl.locale === 'zh-cn' ? styles.zh : styles.en)}>
                                {
                                    intl.formatMessage(messages.mywork)
                                }
                            </span>
                        </div>
                        <div className={styles.workRight}>
                            <div className={styles.showAllBtn} onClick={loginStatus ? this.props.openMyworkModal : this.handleOpenLogin}>
                                {
                                    loginStatus ? intl.formatMessage(messages.viewAll) : intl.formatMessage(messages.viewAlllogin)
                                }
                            </div>
                            <SBFileUploader
                                onOpenLocalSelectedProject={this.handleOpenCDC}
                            >
                                {(renderFileInput, loadProject) => (
                                    <div
                                        onClick={loadProject}
                                    >
                                        <div className={styles.importcdc}>
                                            <span className={styles.importcdctext}>{
                                                intl.formatMessage(messages.importProject)
                                            }</span>
                                        </div>
                                        {renderFileInput()}
                                    </div>
                                )}
                            </SBFileUploader>
                        </div>

                    </Box>

                    <div className={styles.line}></div>
                    {/* 我的作品列表 */}
                    <Box 
                        id={"cdcProjectListScrollBox"} 
                        className={styles.horizontalScrollBox}>
                        {
                            isOnLine && isShowCdcProjectLeftArrow && <Box
                                className={styles.scrollItemLeft}
                                onClick={this.handleSwipeCdcProjectList.bind(this, LEFT)}
                            >
                                <img src={iconAleft} />
                            </Box>
                        }
                        <div
                            id={'cdcProjectList'}
                            ref={(cdcElement) => {this.cdcElement = cdcElement }}
                            onScroll={this.handleCdcProjectScroll}
                            className={styles.scroll}
                        >
                            {
                                loginStatus && cdcProjectList.length > 0
                                && cdcProjectList.map((dataItem, index) => {
                                    return (
                                        <CdcProjectItem
                                            className={styles.libraryEpcItem}
                                            dataUrl={dataItem.url}
                                            description={dataItem.description}
                                            disabled={dataItem.disabled}
                                            featured={dataItem.featured}
                                            iconURL={dataItem.cosFileCover.cosUrl}
                                            id={dataItem.materialUUID}
                                            key={`item_${dataItem.materialUUID}`}
                                            name={dataItem.materialName}
                                            onSelect={() => this.handleSelectedCdcProject(dataItem)}
                                            onDelete={this.handleDelete}
                                            materialUUID={dataItem.materialUUID}   // 删除用
                                            showDelete={false}
                                        />
                                    );
                                })
                            }
                        </div>
                        {
                            isOnLine && isShowCdcProjectRightArrow && <Box
                                className={styles.scrollItemRight}
                                onClick={this.handleSwipeCdcProjectList.bind(this, RIGHT)}
                            >
                                <img src={iconAright} />
                            </Box>
                        }
                    </Box>

                    {/* 课程标题 */}
                    <Box className={styles.middleGroup}>
                        <div className={styles.picText}>
                            <img className={styles.picTextLogo}
                                src={iconLesson}>
                            </img>
                            <span className={classNames(styles.picTextTitle, intl.locale === 'zh-cn' ? styles.zh : styles.en)}>
                                {
                                    intl.formatMessage(messages.codecraftCourse)
                                }
                            </span>
                        </div>
                        <div className={styles.showAllBtn} onClick={this.handleOpenCourseModal}>{
                            intl.formatMessage(messages.viewAll)
                        }</div>
                    </Box>

                    <div className={styles.line}></div>
                    {/* 课程横向列表 */}
                    <Box
                        id={"skuListScrollBox"} 
                        className={styles.horizontalScrollBox}
                    >
                        {
                            isOnLine && isShowSkuLeftArrow && <Box
                                className={styles.scrollItemLeft}
                                onClick={this.handleSwipeSkuList.bind(this, LEFT)}
                            >
                                <img src={iconAleft} />
                            </Box>
                        }
                        <div
                            id={'skuList'}
                            ref={(skuElement) => {this.skuElement = skuElement }}
                            onScroll={this.handleSkuScroll}
                            className={styles.scroll}
                        >
                            {
                                isOnLine && skuBasicInfoList.length > 0
                                && skuBasicInfoList.map((dataItem, index) => {
                                    return (
                                        <CourseItem
                                            skuClassInfo={dataItem}
                                            onSelect={this.handleSelectedCourse}
                                            className={styles.libraryTipsItem}
                                            id={dataItem.skuUUID}
                                            key={`item_${index}`}
                                            showDelete={false}
                                        />
                                    );
                                })
                            }
                        </div>
                        {
                            isOnLine && isShowSkuRightArrow && <Box
                                className={styles.scrollItemRight}
                                onClick={this.handleSwipeSkuList.bind(this, RIGHT)}
                            >
                                <img src={iconAright} />
                            </Box>
                        }
                    </Box>

                    {/* 项目示例标题 */}
                    <Box className={styles.middleGroup}>
                        <div className={styles.picText}>
                            <img className={styles.picTextLogo}
                                src={iconProject}>
                            </img>
                            <span className={classNames(styles.picTextTitle, intl.locale === 'zh-cn' ? styles.zh : styles.en)}>
                                {
                                    intl.formatMessage(messages.projectSample)
                                }
                            </span>
                        </div>
                        <div className={styles.showAllBtn} onClick={this.handleOpenProjectModal}>{
                            intl.formatMessage(messages.viewAll)
                        }</div>
                    </Box>

                    <div className={styles.line}></div>
                    {/* 项目横向列表 */}
                    <Box
                        id={"projectListScrollBox"} 
                        className={styles.horizontalScrollBox}>
                        {
                            isOnLine && isShowProjectLeftArrow && <Box
                                className={styles.scrollItemLeft}
                                onClick={this.handleSwipeProjectList.bind(this, LEFT)}
                            >
                                <img src={iconAleft} />
                            </Box>
                        }
                        <div
                            id={'projectList'}
                            ref={(projectElement) => {this.projectElement = projectElement }}
                            onScroll={this.handleProjectScroll}
                            className={styles.scroll}
                        >
                            {
                                isOnLine && projectBasicInfoList.length > 0
                                && projectBasicInfoList.map((dataItem, index) => {
                                    return (
                                        <ProjectItem
                                            projectBasicInfo={dataItem}
                                            onSelect={this.handleSelectedProject}
                                            id={dataItem.projectUUID}
                                            key={`item_${index}`}
                                            showDelete={false}
                                        />
                                    );
                                })
                            }
                        </div>
                        {
                            isOnLine && isShowProjectRightArrow && <Box
                                className={styles.scrollItemRight}
                                onClick={this.handleSwipeProjectList.bind(this, RIGHT)}
                            >
                                <img src={iconAright} />
                            </Box>
                        }
                    </Box>

                    {/* 硬件产品标题 */}
                    <Box className={styles.middleGroup}>
                        <div className={styles.picText}>
                            <img className={styles.picTextLogo}
                                src={iconHardware}>
                            </img>
                            <span className={classNames(styles.picTextTitle, intl.locale === 'zh-cn' ? styles.zh : styles.en)}>
                                {
                                    intl.formatMessage(messages.hardwareProducts)
                                }
                            </span>
                        </div>
                        <div className={styles.showAllBtn} onClick={this.handleHardwareProductsModel}>{
                            intl.formatMessage(messages.viewAll)
                        }</div>
                    </Box>

                    <div className={styles.line}></div>
                    {/* 硬件产品列表 */}
                    <Box 
                        id={"hardwareProductListScrollBox"} 
                        className={styles.horizontalScrollBox}
                    >
                        {
                            isOnLine && isShowHardwareProductLeftArrow && <Box
                                className={styles.scrollItemLeft}
                                onClick={this.handleSwipeHardwareProductList.bind(this, LEFT)}
                            >
                                <img src={iconAleft} />
                            </Box>
                        }
                        <div
                            id={'hardwareProductList'}
                            ref={(hardwareProductElement) => {this.hardwareProductElement = hardwareProductElement }}
                            onScroll={this.handleHardwareProductScroll}
                            className={styles.scroll}
                        >
                            {
                                isOnLine && hardwareProductsBasicInfoList.length > 0
                                && hardwareProductsBasicInfoList.map((dataItem, index) => {
                                    return (
                                        <HardwareProductsItem
                                            hardwareProductClassInfo={dataItem}
                                            onSelect={this.handleSelectedHardwareProduct}
                                            className={styles.hardWareItem}
                                            id={dataItem.hardwareProductsUUID}
                                            key={`item_${index}`}
                                            showDelete={false}
                                        />
                                    );
                                })
                            }
                        </div>
                        {
                            isOnLine && isShowHardwareProductRightArrow && <Box
                                className={styles.scrollItemRight}
                                onClick={this.handleSwipeHardwareProductList.bind(this, RIGHT)}
                            >
                                <img src={iconAright} />
                            </Box>
                        }
                    </Box>

                </Box>

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
                {/* 硬件产品弹窗 */}
                {
                    isOpenHardwareProducts && <HardwareProductsModal onCancel={this.handleCloseHardwareProductsModal}></HardwareProductsModal>
                }

                <div className={styles.backToTop}>
                    {
                        isShowToTop && <div>
                            <div className={styles.backToTopItem} onClick={this.handleToTop}>
                                <img src={iconUp} className={styles.backToTopItemTop} alt="" />
                            </div>
                            <div className={styles.backToTopDivider}></div>
                        </div>
                    }
                    <div className={styles.backToTopItem}>
                        <img src={iconContect} className={styles.backToTopItemContect} alt="" />
                        <div className={classNames(styles.contectContainer, intl.locale !== 'zh-cn' && styles.contectContainerEN)}>
                            <div className={styles.contectHover}></div>
                            <span className={styles.angle}></span>

                            {intl.locale === 'zh-cn' ?
                                <div>
                                    <div className={styles.contectTitle}>产品与课程合作咨询</div>
                                    <div className={styles.contectPhone}>联系电话</div>
                                    <div>0755-86716703</div>
                                    <div className={styles.contectWechat}>客服微信</div>
                                    <div><img src={picCode} className={styles.picCode} alt="" /></div>
                                </div>
                                :
                                <a href="mailto:contact@chaihuo.org"
                                    className={styles.contectHref}
                                    onClick={this.mailTo}
                                >
                                    <div className={styles.contectEmail}>
                                        <div>
                                            <img src={iconEmail} alt="" />
                                            <div className={styles.emailAddress}>contact@chaihuo.org</div>
                                        </div>
                                    </div>
                                </a>
                            }
                        </div>
                    </div>
                </div>


                {(intl.locale === 'zh-cn' ?
                    <footer className={styles.footBarCN}>
                        <div className={styles.footBarContainer}>
                            <div className={styles.footBarList}>
                                <div>柴火创客教育</div>
                                <div onClick={() => this.openNewWindow('https://www.tinkergen.com/cn_gywm')}>关于我们</div>
                                <div onClick={() => this.openNewWindow('https://jinshuju.net/f/3QnTJU')}>来访预约</div>
                            </div>
                            <div className={styles.footBarList}>
                                <div>合作与购买</div>
                                <div onClick={() => this.openNewWindow('https://jinshuju.net/f/5RsEa5')}>学校实验室合作咨询</div>
                                <div onClick={() => this.openNewWindow('https://jinshuju.net/f/5RsEa5')}>培训机构方案咨询</div>
                            </div>
                            <div className={styles.footBarList}>
                                <div>帮助与支持</div>
                                <div onClick={() => this.openNewWindow('https://www.yuque.com/tinkergen-help-cn/codecraft?language=zh-cn')}>帮助文档</div>
                                <div onClick={() => this.openNewWindow('https://jinshuju.net/f/OyJEVT')}>技术支持</div>
                                <div onClick={this.handFeedback}>意见反馈</div>
                            </div>

                            <div className={styles.footBarListRight}>
                                <img src={qrcode} alt="" style={{ width: '100px', height: '100px', borderRadius: '5px' }} />
                                <div className={styles.wechat}>官方微信公众号</div>
                            </div>

                            <div className={classNames(styles.footBarList, styles.footBarListRight)}>
                                <div>关注我们</div>
                                <div onClick={() => this.openNewWindow('https://weibo.com/u/6462749690')}>
                                    新浪微博：柴火创客校园STEM</div>
                                <div onClick={() => this.openNewWindow('https://v.douyin.com/aSKw8K/')}>
                                    官方抖音：造物吧</div>
                                <div onClick={() => this.openNewWindow('https://shop559494460.taobao.com/?spm=a230r.7195193.1997079397.21.73382f32R0KQsy')}>
                                    官方淘宝：柴火创客教育</div>
                            </div>
                        </div>
                        <div className={styles.footText}>
                            <div className={styles.footTextLine}></div>
                            <div style={{ paddingBottom: '25px' }}>© 深圳柴火创客教育服务有限公司 版权所有 <span style={{ display: 'inline-block', width: '15px' }}></span><span onClick={() => this.openNewWindow('https://beian.miit.gov.cn')} style={{ cursor: 'pointer' }}>粤ICP备18027657号</span> <span style={{ float: 'right' }}></span></div>
                        </div>
                    </footer> :
                    <footer className={styles.footBarCN}>
                        <div className={styles.footBarContainer}>
                            <div className={styles.footBarList_en}>
                                <div onClick={() => this.openNewWindow('https://www.tinkergen.com/AboutUs')}>About us</div>
                                <div onClick={() => this.openNewWindow('https://www.tinkergen.com/TechnicalSupport')}>Technical Support</div>
                                <div onClick={() => this.openNewWindow('https://www.tinkergen.com/PrivacyPolicy')}>Privacy Policy</div>
                            </div>
                            <div className={styles.footBarList_en}>
                                <div onClick={() => this.openNewWindow('https://www.tinkergen.com/Distributors')}>Distributors</div>
                                <div onClick={() => this.openNewWindow('https://www.tinkergen.com/PaymentInformation')}>Payment Information</div>
                                <div onClick={() => this.openNewWindow('https://www.tinkergen.com/WarrantyAndReturns')}>Warranty @ Returns</div>
                            </div>
                            <div className={styles.footBarList_en}>
                                <div onClick={() => this.openNewWindow('https://www.yuque.com/tinkergen-help-en/codecraft?language=en-us')}>Documentation</div>
                                <div onClick={this.handFeedback}>Feedback</div>
                            </div>
                        </div>
                        <div className={styles.footText}>
                            <div className={styles.footTextLine}></div>
                            <div style={{ paddingBottom: '25px' }}>Copyright 2020 TinkerGen.com All rights reserved<span style={{ display: 'inline-block', width: '15px' }}></span><span onClick={() => this.openNewWindow('https://beian.miit.gov.cn')} style={{ cursor: 'pointer' }}>粤ICP备18027657号</span> <span style={{ float: 'right' }}></span></div>
                        </div>
                    </footer>
                )}
                {/* </div> */}
                {/* {
                    (!loading && isLoading && <div className={styles.loadingBackground}>
                        <div className={styles.loadingText}>
                            <FormattedMessage
                                defaultMessage="Loading in progress, please wait"
                                description=""
                                id="gui.library.loadingMessage"
                            />
                        </div>
                    </div>)
                } */}
            </div>
        );
    }
}

CourseHome.propTypes = {
    data: PropTypes.arrayOf(
        /* eslint-disable react/no-unused-prop-types, lines-around-comment */
        // An item in the library
        PropTypes.shape({
            // @todo remove md5/rawURL prop from library, refactor to use storage
            md5: PropTypes.string,
            name: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ]).isRequired,
            rawURL: PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    filterable: PropTypes.bool,
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    username: PropTypes.string,
    onSetAuthInfo: PropTypes.func,
    onSetLoginStatus: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired,
    languageMenuOpen: PropTypes.bool,
    onClickLanguage: PropTypes.func,
    onClickCoursesMenu: PropTypes.func,
    onActivateTab: PropTypes.func,
};

CourseHome.defaultProps = {
    filterable: true
};

const mapStateToProps = state => {
    const user = state.session && state.session.session && state.session.session.user;
    return {
        supportedLocales: Object.keys(state.locales.messagesByLocale),
        authInfo: state.scratchGui.loginRegister.authInfo,
        userInfo: state.scratchGui.loginRegister.userInfo,
        loginStatus: state.scratchGui.loginRegister.loginStatus,
        accountMenuOpen: accountMenuOpen(state),
        cdcUrl: state.scratchGui.zwbCourse.cdcUrl,
        languageMenuOpen: languageMenuOpen(state),
        coursesMenuOpen: coursesMenuOpen(state),
        helpMenuOpen: helpMenuOpen(state),
        deletedProjectUUID: state.scratchGui.material.deletedProjectUUID,
        isOnLine: state.scratchGui.netStatus.isOnLine,
    }
};

const mapDispatchToProps = dispatch => ({
    onRequestCloseAccount: () => dispatch(closeAccountMenu()),
    openMyworkModal: () => dispatch(openEpcsLibrary()),
    onSetTab: tab => dispatch(setUserTab(tab)),
    onClickAccount: () => dispatch(openAccountMenu()),
    onUpdateCourseSku: (skuUUID, courseUUID, skuNumber) => dispatch(updateCourseSku(skuUUID, courseUUID, skuNumber)),
    onUpdateProjectUUID: (projectUUID) => dispatch(updateProjectUUID(projectUUID)),
    onCloseCourseHome: () => dispatch(closeTipsLibrary()),
    onUpdateCdcUrl: (cdcUrl, cdcName) => dispatch(updateCdcUrl(cdcUrl, cdcName || '')),
    onOpenFeedbackModal: (tag) => dispatch(openFeedbackModal()),
    updateWindowDownloadFlag: (flag) => dispatch(updateWindowDownloadFlag(flag)),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onChangeLanguage: locale => {
        dispatch(selectLocale(locale));
        dispatch(closeLanguageMenu());
    },
    onClickCoursesMenu: () => dispatch(openCoursesMenu()),
    onRequestCoursesMenu: () => dispatch(closeCoursesMenu()),
    onClickHelp: () => dispatch(openHelpMenu()),
    onRequestCloseHelp: () => dispatch(closeHelpMenu()),
    onTabIndexUpdate: (index) => {
        dispatch(activateTab(index));
    },
    onSetProjectItem: item => dispatch(setProjectItem(item)),
    onSetProjectSaved: bool => {
        dispatch(setProjectSaved(bool));
    },
    onUpdatePhysicalDeviceState: (id, featured) => {
        dispatch(updatePhysicalDeviceFeaturedState(id, featured));
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseHome));
