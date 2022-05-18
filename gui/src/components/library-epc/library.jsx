import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import SBFileUploader from '../../containers/sb-file-uploader.jsx';

import LibraryItem from '../library-item/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import TagButton from '../../containers/tag-button.jsx';
// import iconLocal from './icon-local.png';
import styles from './library.css';
import { connect } from 'react-redux';
import ButtonComponent from '../button-special/button.jsx';
import { toasts } from '../toast-special/toast.jsx';
import { searchCCMaterialInfoList, deleteCCMaterial } from '../../lib/busi-proxy/busi-proxy.js';
import { setProjectTitle } from '../../reducers/project-title';
import { LoadingStates, onLoadedProject, onProjectUploadStarted } from '../../reducers/project-state';
import {
    openLoadingProject,
    closeLoadingProject,
    closeEpcsLibrary
} from '../../reducers/modals';
import { setFileInfo } from '../../reducers/micro-course.js';
import { setProjectItem, setRemindSave, setRemindSaveType, setShowLoadingProject, setDeletedProjectUUID } from '../../reducers/material-special';
import { setUserTab, USER_TIME_OUT_TAB_INDEX } from '../../reducers/login-register-special.js';


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
    openLocalProject: {
        id: 'gui.library.openLocalProject',
        defaultMessage: 'Open local projects',
        description: ''
    },
    operateFail: {
        defaultMessage: 'Failed',
        description: '',
        id: 'gui.connectModal.operateFail'
    },
    deleteSucc: {
        defaultMessage: 'Delete successful',
        description: '',
        id: 'gui.toasts.deleteSucc'
    },
    deleteFail: {
        defaultMessage: 'Delete failed',
        description: '',
        id: 'gui.toasts.deleteFail'
    },
    deleteRemind: {
        defaultMessage: 'Prompt',
        description: '',
        id: 'gui.library.deleteRemind'
    }
});

const materialType = 'P';   // 工程文件

/**
 * Treatment engineering
 */
class LibraryComponent extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClose',
            'handleFocus',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleSelect',
            'handleDelete',
            'handleUnDelete',
            'handleComfirmDelete',
            'handleToLoginTimeout'
        ]);
        this.state = {
            projectMaterialArr: [],
            isRemindDelete: false,
            isRequest: false
        }
        this.pageNum = 0;
        this.pageSize = 20;
    }
    handleBlur(id) {
        this.handleMouseLeave(id);
    }
    handleFocus(id) {
        this.handleMouseEnter(id);
    }
    handleSelect(dataItem) {
        // 判断当前项目是否保存，true--已保存，直接打开选择的文件
        dataItem.materialId = dataItem.materialUUID;

        if (this.props.isProjectSaved) {
            this.props.onSetProjectItem(dataItem);
            this.props.onOpenSelectedProject(dataItem);
            this.handleClose();
        } else {
            // false--未保存，打开保存提示弹框
            this.props.onSetProjectItem(dataItem);
            this.props.onSetRemindSave(true);
            this.props.onSetRemindSaveType('openOnlineProject');
        }
    }
    handleClose() {
        this.props.onRequestClose();
    }
    // 到超时页
    handleToLoginTimeout() {
        this.handleClose();
        this.props.onSetUserTab(USER_TIME_OUT_TAB_INDEX);
    }
    handleMouseEnter(id) {
        // if (this.props.onItemMouseEnter) this.props.onItemMouseEnter(this.props.data[id]);
    }
    handleMouseLeave(id) {
        // if (this.props.onItemMouseLeave) this.props.onItemMouseLeave(this.props.data[id]);
    }

    

    componentDidMount() {
        // 用户登录时，获取云端作品
        if (this.props.loginStatus) {
            this.handleSearchCCMaterialInfoList();
        }
    }

    // 获取用户云端作品
    handleSearchCCMaterialInfoList() {
        const params = {
            authInfo: this.props.authInfo,
            materialType,
            fromResult: this.pageNum * this.pageSize,
            sizeResult: this.pageSize
        }
        searchCCMaterialInfoList(params).then((data) => {
            this.setState({
                projectMaterialArr: this.state.projectMaterialArr.concat(data.ccProjectMaterialList)
            })

            if (data.totalCount > ((this.pageNum + 1) * this.pageSize)) {
                this.pageNum += 1;
                this.handleSearchCCMaterialInfoList();
            }
        }, (err) => {
            // toasts.error('操作失败');
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.handleToLoginTimeout();
            } else {
                toasts.error(this.props.intl.formatMessage(messages.operateFail));
            }
        });
    }

    // 删除工程文件
    handleDelete(materialUUID) {
        this.materialUUID = materialUUID;
        this.setState({
            isRemindDelete: true
        })
    }

    // 确认不删除
    handleUnDelete() {
        this.setState({
            isRemindDelete: false
        });
    }

    // 确认删除
    handleComfirmDelete() {
        if (this.state.isRequest) {
            return
        }
        const params = {
            authInfo: this.props.authInfo,
            materialType,
            materialUUID: this.materialUUID
        }
        this.setState({ isRequest: true });
        deleteCCMaterial(params).then((data) => {
            // 删除成功后回到前一页，重新拉区列表
            toasts.success(this.props.intl.formatMessage(messages.deleteSucc));
            // this.props.onSetProjectItem({});
            this.props.onClearLocalProjectItem(this.materialUUID);
            this.props.setDeletedProjectUUID(this.materialUUID);

            const projectMaterialArr = Object.assign([], this.state.projectMaterialArr);
            projectMaterialArr.map((item, index) => {
                if (item.materialUUID === this.materialUUID) {
                    projectMaterialArr.splice(index, 1);
                }
            })
            this.setState({
                projectMaterialArr,
                isRemindDelete: false,
                isRequest: false
            })
        }, (err) => {
            this.setState({ isRequest: false });
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.handleToLoginTimeout();
            } else {
                toasts.success(this.props.intl.formatMessage(messages.deleteFail));
            }
        })
    }


    render() {
        const { projectMaterialArr, isRemindDelete } = this.state;
        return (!this.props.isRemindSave && (!isRemindDelete ?
            <Modal
                className={styles.libraryWrapper}
                contentLabel={this.props.title}
                id={this.props.id}
                showClose={true}
                cancelable={true}
                onRequestClose={this.handleClose}
            >
                <Box className={styles.libraryHeaer}>
                    {this.props.title}
                </Box>

                <div
                    className={classNames(styles.libraryScrollGrid)}
                >
                    {/* <Box className={styles.libraryEpcAdd}>
                        <SBFileUploader onRequestClose={this.handleClose} onOpenLocalSelectedProject={this.props.onOpenLocalSelectedProject}>
                            {(renderFileInput, loadProject) => (
                                <Box
                                    className={styles.epcAdd}
                                    onClick={loadProject}
                                >
                                    <img src={iconLocal} className={styles.selectLocalProject} />
                                    <div className={styles.openLocalText}>{this.props.intl.formatMessage(messages.openLocalProject)}</div>
                                    {renderFileInput()}
                                </Box>
                            )}
                        </SBFileUploader>
                    </Box> */}
                    {projectMaterialArr.map((dataItem, index) => {
                        return (
                            <LibraryItem
                                className={styles.libraryEpcItem}
                                dataUrl={dataItem.url}
                                description={dataItem.description}
                                disabled={dataItem.disabled}
                                featured={dataItem.featured}
                                iconURL={dataItem.cosFileCover.cosUrl}
                                id={index}
                                key={`item_${index}`}
                                name={dataItem.materialName}
                                onBlur={this.handleBlur}
                                onFocus={this.handleFocus}
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}
                                onSelect={() => this.handleSelect(dataItem)}
                                onDelete={this.handleDelete}
                                materialUUID={dataItem.materialUUID}   // 删除用
                                showDelete={true}
                            />
                        );
                    })}
                    {[1, 2, 3, 4].map((item, index) => {
                        return <div key={index} className={styles.fullPosition}></div>
                    })}
                </div>
            </Modal>
            :
            <Modal
                isOpen={true}
                className={styles.libraryModal}
                onRequestClose={''}
                visiableTitle={true}
                title={this.props.intl.formatMessage(messages.deleteRemind)}
                id='libraryModal'
                contentLabel='libraryModal'>
                <div className={styles.remmindText}>
                    <FormattedMessage
                        defaultMessage="Are you sure to delete this project?"
                        description=""
                        id="gui.library.deleteText"
                    />
                </div>
                <div>
                    <ButtonComponent className={styles.libraryBtn} size={'small'} style={{ marginRight: '20px' }} onClick={this.handleUnDelete}>
                        <FormattedMessage
                            defaultMessage="Cancel"
                            description=""
                            id="gui.library.notDeleteText"
                        />
                    </ButtonComponent>
                    <ButtonComponent type={'default'} size={'small'} className={styles.libraryBtn} onClick={this.handleComfirmDelete}>
                        <FormattedMessage
                            defaultMessage="OK"
                            description=""
                            id="gui.library.sureDeleteText"
                        />
                    </ButtonComponent>
                </div>
            </Modal>)
        );
    }
}

LibraryComponent.propTypes = {
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
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired
};
const mapDispatchToProps = dispatch => ({
    onLoadingFinished: loadingState => {
        // dispatch(onLoadedProject(loadingState));
        dispatch(closeEpcsLibrary());
        dispatch(closeLoadingProject());
    },
    onSetProjectTitle: title => dispatch(setProjectTitle(title)),
    onLoadingStarted: () => {
        dispatch(openLoadingProject());
        dispatch(onProjectUploadStarted());
    },
    onSetProjectItem: item => dispatch(setProjectItem(item)),
    setDeletedProjectUUID: item => dispatch(setDeletedProjectUUID(item)),
    onSetFileInfo: file => dispatch(setFileInfo(file)),
    onSetRemindSave: bool => dispatch(setRemindSave(bool)),
    onSetRemindSaveType: type => dispatch(setRemindSaveType(type)),
    onSetUserTab: tab => dispatch(setUserTab(tab)),
    onSetShowLoadingProject: bool => dispatch(setShowLoadingProject(bool)),
});

const mapStateToProps = state => ({
    authInfo: state.scratchGui.loginRegister.authInfo,
    loginStatus: state.scratchGui.loginRegister.loginStatus,
    loadingState: state.scratchGui.projectState.loadingState,
    isRemindSave: state.scratchGui.material.isRemindSave,
    isProjectSaved: state.scratchGui.material.isProjectSaved,
})


// export default injectIntl(LibraryComponent);
export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(LibraryComponent));