import classNames from 'classnames';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import Box from '../box/box.jsx';
import { ComingSoonTooltip } from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import SBFileUploader from '../../containers/sb-file-uploader.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import { MenuItem, MenuSection } from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import RescueDevice from '../rescue-device/rescue-device.jsx'
import PythonDownBin from '../firmware-upgrade/python-down-bin.jsx'
import PythonUpgrade from '../firmware-upgrade/python-upgrade.jsx'
import PythonUpgrading from '../firmware-upgrade/python-upgrading.jsx'
import PythonUpgradeSucc from '../firmware-upgrade/python-upgrade-succ.jsx'
import RemindSaveModal from '../remind-save-special/remind-save.jsx';
import {
    closeSerialChartModal,
    closeLoadingProject,
} from '../../reducers/modals';
import LoaderSave from '../loader-save/loader.jsx';
import {
    closeRecognizeVideoModal,
} from '../../reducers/modals';
import {
    setModalIndex as setRescueModalIndex,
    defaultRescueDeviceTo,
    RESCUE_MODAL_HIDE,
    RESCUE_MODAL_DEVICE_SELECT,
    RESCUE_MODAL_PYTHON_DOWN_BIN_SETP1,
    RESCUE_MODAL_PYTHON_DOWN_BIN_SETP2,
    RESCUE_MODAL_PYTHON_DOWN_BIN_SETP3,
    RESCUE_MODAL_PYTHON_UPGRADE_INIT,
    RESCUE_MODAL_PYTHON_UPGRADING,
    RESCUE_MODAL_PYTHON_UPGRADE_SUCC,
    RESCUE_MODAL_PYTHON_UPGRADE_FAIL
} from '../../reducers/rescue'
import CodeView from '../../containers/code-view.jsx';
import PromptComponent from '../prompt-special/prompt-2.jsx';
import About from '../prompt-special/about.jsx';
import { projectTitleInitialState, setProjectTitle } from '../../reducers/project-title';
import spinner from './spinner.gif';
import { LoadingStates, onLoadedProject, onProjectUploadStarted, setLocalProjectPath } from '../../reducers/project-state';
import {
    openLoadingProject,
} from '../../reducers/modals';
import analytics from '../../lib/analytics';
import locales from '../../../../l10n/dist/l10n';
import { selectLocale } from '../../reducers/locales';
import { setVisible as setCodeViewVisible } from '../../reducers/code-view';
import {
    activateTab,
    BLOCKS_TAB_INDEX,
} from '../../reducers/editor-tab';
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
} from '../../reducers/menus';
import { 
    setProjectItem,
    setRemindSave, 
    setRemindSaveType, 
} from '../../reducers/material-special';
import {
    activateState,
} from '../../reducers/upload-state';

import styles from './menu-bar.css';
import languageIcon from '../language-selector/language-icon.svg';
import iconFile from './icon-file.svg';
import scratchLogo from './codecraft-logo.svg';
import iconSave from './icon-save.svg';
import iconHelp from './icon-help.svg';
import iconSwitchJm from './switch_jm.svg';
import iconSwitchDm from './switch_dm.svg';
import { toasts } from '../toast-special/toast.jsx';
import { getOsType,getBrowser,getBrowserLanguage } from '../../lib/os-type.js';

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
    saveSucc: {
        id: 'gui.menuBar.saveSucc',
        defaultMessage: 'Save success'
    },
    saveFail: {
        id: 'gui.menuBar.saveFail',
        defaultMessage: 'Save failed'
    },
    openProjectFail: {
        id: 'gui.menuBar.openProjectFail',
        defaultMessage: 'Failed to open project'
    },
    netErrorMessage: {
        id: 'gui.net.errorMessage',
        defaultMessage: 'Network error, please check your network.'
    },
    savePromptLabel: {
        id: 'gui.prompt.projectSaveLabel',
        defaultMessage: 'Prompt'
    },
    projectSave: {
        id: 'gui.prompt.projectSave',
        defaultMessage: 'Save'
    },
    projectNoSave: {
        id: 'gui.prompt.projectNoSave',
        defaultMessage: 'Do not save'
        
    },
    projectSaveMessage: {
        id: 'gui.menuBar.downloadToComputer',
        defaultMessage: 'Download to your computer'
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
            'handClickAbout',
            'handleCloseAbout',
            'onCodeViewShow',
            'handleCancelSaveProject',
            'handleSaveProject',
            'handleCloseSave',
            'handleOpenLocalSelectedProject',
            'handleLanguageChange',
            'handleToDocument',
            'handleCloseRescueDevice',
            'handleProjectSave',
            'saveLocalProject',
            'handleBeforeQuit',
            'handleQuitApp',
            'handleQuitWithSave',
            'handleQuitCancel',
            'onMessage01',
        ]);

        this.state = {
            isOpen: false,
            isOpenAbout: false,
            codeViewInit: false,
            isSaving: false,
            projectType: '',
            isRequest: false,
            isOpenLocal: false,

            isRemidSaveBeforeClose: false,      // 是否提示保存
            isQuitApp: false,
        }

        let { name } = getOsType();
        let { browserName,browserVersion } = getBrowser();
        this.browserName = browserName;
        this.browserVersion = browserVersion;
        this.browserOS = name;
        this.browserLanguage = getBrowserLanguage();
    }


    componentWillMount() {
        localStorage.setItem('locale', this.props.intl.locale);
    }

    componentDidMount() {
        //注册message01事件
        dispatch01.on("message01", this.onMessage01);

        const os = getOsType();
        if (os.name === 'Mac') {
            this.osType = 'Mac';
        } else {
            this.osType = 'Windows';
        }

        this.props.vm.on('projectSave', this.handleProjectSave);
        this.props.vm.on('before-quit', this.handleBeforeQuit);
    }

    componentWillUnmount() {
        dispatch01.removeListener("message01", this.onMessage01);
        this.props.vm.removeListener('projectSave', this.handleProjectSave);
        this.props.vm.removeListener('before-quit', this.handleBeforeQuit);
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
    }
    
    handleClickSave(projectType, saveType) {
        console.log(projectType, saveType)
        // 保存文件到本地
        this.saveLocalProject(saveType)
    }

    // 处理文件断网保存
    handleProjectSave(data) {
        console.log('handleProjectSave-=-', data)
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
                    if (this.projectType === 'openLocalProject') {
                        this.openSelectedLocalProject();
                    }
                    if (this.projectType === 'newProject') {
                        this.newProject();
                    }
                    if (this.projectType == 'switchEquipment') {
                        this.switchEquipment();
                    }
                    // 设为已保存状态
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
        this.props.onSetRemindSave(false);
        this.props.vm.stopAll();

        let isRemindSaveType = this.props.isRemindSaveType;
        let remindSaveType = '';
        let typeArr = [];
        if (typeof isRemindSaveType == "string") {
            typeArr=isRemindSaveType.split(":")
            remindSaveType = typeArr[0];
        }

        if (remindSaveType === 'newProject') {
            this.newProject();
        } else if (remindSaveType === 'openLocalProject') {
            this.openSelectedLocalProject();
        }
    }
    // 提示保存弹框，保存后，打开新项目
    handleSaveProject() {
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
        } else if(remindSaveType === 'openLocalProject') {
            this.projectType = 'openLocalProject';
        }
        this.handleClickSave(this.projectType);
    }

    resetCodeViewAndProject() {
        this.resetCodeView();
        //新建工程，清空积木
        this.newProject();
    }

    //重置编程文件状态
    resetCodeView() {
        this.props.setCodeViewVisible(false);
        this.props.closeRecognizeVideoModal();
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
        this.props.onSetProjectTitle('SuperMaker');
        this.props.onSetProjectItem({});
        this.props.onSetLocalProjectPath('');

        this.resetForNewOrOpen();
    }

    // 打开选择的本地项目
    openSelectedLocalProject(data) {
        console.log('openSelectedLocalProject',data)
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
        console.log(this.props.projectItem)
        console.log(data)

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
                this.props.onLoadingFinished(this.props.loadingState);
                // Reset the file input after project is loaded
                // This is necessary in case the user wants to reload a project
                thisFileInput.value = null;
                this.props.onSetProjectItem({});
                this.resetForNewOrOpen();
            })
            .catch(error => {
                // console.log(error);
                // alert(this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
                this.props.onLoadingFinished(this.props.loadingState);
                // Reset the file input after project is loaded
                // This is necessary in case the user wants to reload a project
                thisFileInput.value = null;
                toasts.error(this.props.intl.formatMessage(ariaMessages.openProjectFail));
            });
        if (thisFileInput.files) { // Don't attempt to load if no file was selected
            this.props.onLoadingStarted();
            reader.readAsArrayBuffer(thisFileInput.files[0]);
            // extract the title from the file and set it as current project title
        }
    }

    handleOpenLocalSelectedProject(data) {
        this.openSelectedLocalProject(data);
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

    onMessage01(args) {
        let {
            action,
            projectType
        } = args;

        this.projectType = projectType;

        if ('newProject' == action) {
            this.props.onSetProjectTitle('SuperMaker');
            this.props.onSetProjectItem({});
            this.props.onSetLocalProjectPath('');
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

    render() {
        const { 
            isRemindSave,
            rescuer, 
	        codeViewVisible,
	        intl,
        } = this.props;
	
        const { 
            isSaving, 
            isOpenAbout,
        } = this.state;
        const { isRemidSaveBeforeClose } = this.state;
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
                        <div className={classNames(styles.menuBarItem)}>
                            <img
                                className={styles.scratchLogo}
                                draggable={false}
                                src={scratchLogo}
                            />
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
                            {
                                <MenuBarMenu
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
                                    onClick={() => { this.saveLocalProject('saveAs'); this.props.onRequestCloseFile(); }}>
                                    <FormattedMessage
                                        defaultMessage="Download to your computer"
                                        id="gui.menuBar.downloadToComputer"
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
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.helpMenuOpen}
                                place={'left'}
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

                    <Box style={{width:"1rem"}}/>
                    
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
                
                {/* 关于界面 */}
                {
                    isOpenAbout &&
                    <About onCancel={this.handleCloseAbout} />
                }                
                {
                    /* CodeView */
                    this.state.codeViewInit &&
                    <CodeView />
                }

                {
                    /* 设备救援 */
                    this.props.rescueModalIndex === RESCUE_MODAL_DEVICE_SELECT &&
                    <RescueDevice onCancel={this.handleCloseRescueDevice} />
                }

                {
                    this.props.rescueModalIndex === RESCUE_MODAL_PYTHON_DOWN_BIN_SETP1
                    &&
                    <PythonDownBin
                        onCancel={this.handleCloseRescueDevice}
                        versionInfo={this.props.firmwareVersion}
                        step={1}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_PYTHON_DOWN_BIN_SETP2
                    &&
                    <PythonDownBin
                        step={2}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_PYTHON_DOWN_BIN_SETP3
                    &&
                    <PythonDownBin
                        onCancel={this.handleCloseRescueDevice}
                        step={3}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_PYTHON_UPGRADE_INIT
                    &&
                    <PythonUpgrade
                        dtype={rescuer ? rescuer.type : ""}
                        onCancel={this.handleCloseRescueDevice}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_PYTHON_UPGRADING
                    &&
                    <PythonUpgrading
                        type={rescuer ? rescuer.type : ""}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_PYTHON_UPGRADE_SUCC
                    &&
                    <PythonUpgradeSucc
                        type={rescuer ? rescuer.type : ""}
                        onCancel={this.handleCloseRescueDevice}
                    />
                }
                {
                    this.props.rescueModalIndex === RESCUE_MODAL_PYTHON_UPGRADE_FAIL
                    &&
                    <PythonUpgrade
                        dtype={rescuer ? rescuer.type : ""}
                        onCancel={this.handleCloseRescueDevice}
                        type='fail'
                    />
                }
                {
                    isSaving && <LoaderSave />
                }

                {/* 检查更新 */}

                {/* 提示保存 */}
                {isRemidSaveBeforeClose && <RemindSaveModal onQuitWithSave={this.handleQuitWithSave} onQuitWithoutSave={this.handleQuitApp} onQuitCancel={this.handleQuitCancel} />}
            </Box>
        );
    }
}

MenuBar.propTypes = {
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
    loginMenuOpen: PropTypes.bool,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onClickProjects: PropTypes.func,
    onClickLogin: PropTypes.func,
    onClickNew: PropTypes.func,
    onClickSave: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenRegistration: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onRequestCloseLogin: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onShare: PropTypes.func,
    onToggleLoginOpen: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    renderLogin: PropTypes.func,
    sessionExists: PropTypes.bool,
    startSaving: PropTypes.func,
    username: PropTypes.string,
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
        canUpdateProject: typeof user !== 'undefined',
        fileMenuOpen: fileMenuOpen(state),
        helpMenuOpen: helpMenuOpen(state),
        editMenuOpen: editMenuOpen(state),
        isRtl: state.locales.isRtl,
        isUpdating: getIsUpdating(loadingState),
        isShowingProject: getIsShowingProject(loadingState),
        languageMenuOpen: languageMenuOpen(state),
        loginMenuOpen: loginMenuOpen(state),
        sessionExists: state.session && typeof state.session.session !== 'undefined',
        username: user ? user.username : null,

        connectModalTab: state.scratchGui.deviceConnect.tab,
        saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
        projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState),
        projectTitle: state.scratchGui.projectTitle,
        vm: state.scratchGui.vm,
        codeViewVisible: state.scratchGui.codeView.visible,
        projectItem: state.scratchGui.material.projectItem,
        isRemindSave: state.scratchGui.material.isRemindSave,
        isRemindSaveType: state.scratchGui.material.isRemindSaveType,
        isProjectSaved: state.scratchGui.material.isProjectSaved,
        loadingState: state.scratchGui.projectState.loadingState,
        currentLocale: state.locales.locale,
        supportedLocales: Object.keys(state.locales.messagesByLocale),
        rescueModalIndex: state.scratchGui.rescue.modalIndex,
        firmwareVersion: state.scratchGui.rescue.firmwareVersion,	
        isOnLine: state.scratchGui.netStatus.isOnLine,
        localProjectPath: state.scratchGui.projectState.localProjectPath,
        physicalDevices: state.scratchGui.physicalDevice.physicalDevices,
        disconnect: () => { return state.scratchGui.vm.deviceEngine.disconnect() },
        resetDebugMode: () => { state.scratchGui.vm.setDebugMode(0) }
    };
};

const mapDispatchToProps = dispatch => ({
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
    
    setCodeViewVisible: v => dispatch(setCodeViewVisible(v)),
    onSetRemindSave: bool => dispatch(setRemindSave(bool)),
    onSetRemindSaveType: type => dispatch(setRemindSaveType(type)),
    onLoadingFinished: loadingState => {
        dispatch(onLoadedProject(loadingState));
        dispatch(closeLoadingProject());
    },
    onSetProjectTitle: title => dispatch(setProjectTitle(title)),
    onSetProjectItem: item => dispatch(setProjectItem(item)),
    onLoadingStarted: () => {
        dispatch(openLoadingProject());
        dispatch(onProjectUploadStarted());
    },

    onSetSavingState: state => {
        dispatch(updateProjectSaveState(state));
    },
    onChangeLanguage: locale => {
        dispatch(selectLocale(locale));
        dispatch(closeLanguageMenu());
    },
    onActivateTab: tab => {
        dispatch(activateTab(tab));
    },
    activateState: state => {
        dispatch(activateState(state));
    },
    setRescueModalIndex: index => dispatch(setRescueModalIndex(index)),
    defaultRescueDeviceTo: () => dispatch(defaultRescueDeviceTo()),
    onCloseSerialChartModal: () => dispatch(closeSerialChartModal()),
    
    onSetLocalProjectPath: path => {
        dispatch(setLocalProjectPath(path));
    },    
    closeRecognizeVideoModal: () => dispatch(closeRecognizeVideoModal()),
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar));
