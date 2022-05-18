import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Box from '../box/box.jsx';
import UploadPane from '../upload-pane/upload-pane.jsx';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';

import LibraryItem from '../library-special-item/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';
import analytics from '../../lib/analytics';
import Button from '../button-special/button.jsx'


import iconUpload from './icon-upload-local.png'
import bigSound from './icon_bigsound.png';
import loadingUrl from './icon_loading.gif';
import spinnerUrl from './icon_spinner.gif';

import huizhiIcon from './icon_huizhi.png';
import luzhiIcon from './icon_luzhi.png';

import styles from './library.css';
import ButtonComponent from '../button-special/button.jsx';
import { toasts } from '../toast-special/toast.jsx';
import { searchCCSampleMaterialInfoList, searchCCMaterialClassList, searchCCMaterialInfoList, applyXCosSecurityToken, saveCCMaterialInfo, deleteCCMaterial, saveLocalPlatformMaterial, getLocalPlatformMaterial, saveLocalMaterial, saveUserLocalMaterial, getUserLocalMaterial, deleteUserLocalMaterial, clearCacheQueue } from '../../lib/busi-proxy/busi-proxy.js';
import COS from 'cos-js-sdk-v5';
import { cosConfig } from '../../lib/cos-config.js';

import sharedMessages from '../../lib/shared-messages';

import { setUserTab, LOGIN_TAB_INDEX, USER_TIME_OUT_TAB_INDEX } from '../../reducers/login-register-special.js';

import { handleFileUpload, costumeUpload, costumeEmUpload, spriteUpload, spriteEmUpload, soundUpload, handleInputStreamUpload, handleInputStreamsUpload2, handleFileUploadSpecial, costumeUploadAsync } from '../../lib/file-uploader.js';

import {
    activateTab,
    COSTUMES_TAB_INDEX
} from '../../reducers/editor-tab';

import {
    openSoundRecorder
} from '../../reducers/modals';

let messages = defineMessages({
    tipsTitle: {
        id: 'gui.sprite.promptLabel',
        defaultMessage: 'Promt',
    },
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
    imageSupportPrompt: {
        id: 'gui.media.imageSupportPrompt',
        defaultMessage: 'Uploads of.svg,.png,.jpg,.jpeg files are only supported.'
    },
    audioSupportPrompt: {
        id: 'gui.media.audioSupportPrompt',
        defaultMessage: 'Only supports uploading files as .wav and .mp3'
    },
    uploadSucc: {
        id: 'gui.media.uploadSucc',
        defaultMessage: 'Upload successful'
    },
    uploadFail: {
        id: 'gui.media.uploadFail',
        defaultMessage: 'Upload failed. Please try again'
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
    }
});

messages = { ...messages, ...sharedMessages };

const spriteMineLabel = (
    <FormattedMessage
        defaultMessage="My Sprite"
        description=""
        id="gui.library.sprite.mine"
    />
);
const spriteCommonLabel = (
    <FormattedMessage
        defaultMessage="Sprite Library"
        description=""
        id="gui.library.sprite.common"
    />
);

const customMineLabel = (
    <FormattedMessage
        defaultMessage="My costume"
        description=""
        id="gui.library.custom.mine"
    />
);
const customCommonLabel = (
    <FormattedMessage
        defaultMessage="Costume Library"
        description=""
        id="gui.library.custom.common"
    />
);


const backdropMineLabel = (
    <FormattedMessage
        defaultMessage="My backdrop"
        description=""
        id="gui.library.backdrop.mine"
    />
);
const backdropCommonLabel = (
    <FormattedMessage
        defaultMessage="Backdrop Library"
        description=""
        id="gui.library.backdrop.common"
    />
);

const soundMineLabel = (
    <FormattedMessage
        defaultMessage="My sound"
        description=""
        id="gui.library.sound.mine"
    />
);

const soundCommonLabel = (
    <FormattedMessage
        defaultMessage="Sound Library"
        description=""
        id="gui.library.sound.common"
    />
);

const uploadLabel = (
    <FormattedMessage
        defaultMessage="Upload"
        description=""
        id="gui.library.localUpload"
    />
);
const uploadLimit = (
    <FormattedMessage
        defaultMessage="(Less than 512kb)"
        description=""
        id="gui.library.uploadLimitTwo"
    />
);

const uploadFailText = (
    <FormattedMessage
        defaultMessage="Upload failed. The file is too large. File size limit is 512kb"
        description=""
        id="gui.library.uploadFailTextTwo"
    />
);

const roleText = (
    <FormattedMessage
        defaultMessage="this sprite"
        description=""
        id="gui.library.roleText"
    />
)
const customeText = (
    <FormattedMessage
        defaultMessage="this costume"
        description=""
        id="gui.library.customeText"
    />
)
const bgText = (
    <FormattedMessage
        defaultMessage="this backdrop"
        description=""
        id="gui.library.bgText"
    />
)
const audioText = (
    <FormattedMessage
        defaultMessage="this sound"
        description=""
        id="gui.library.audioText"
    />
)

const paint = (
    <FormattedMessage
        defaultMessage="Paint"
        description=""
        id="gui.spriteSelector.addSpriteFromPaint"
    />
)

const recordSound = (
    <FormattedMessage
        defaultMessage="Record"
        description=""
        id="gui.soundTab.recordSound"
    />
)


const TAB_INDEX_PUBLIC = 0;
const TAB_INDEX_PRIVATE = 1;

const ALL_TAG = { tag: 'all', intlLabel: messages.allTag };
const tagListPrefix = [ALL_TAG];

class LibraryComponent extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClose',
            'handleFilterChange',
            'handleFilterClear',
            'handleFocus',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleSelect',
            'handleTagClick',
            'handTabSelect',
            'setFilteredDataRef',
            'handleToLogin',
            'handleToLoginTimeout',
            'handleFileChange',
            'getCosObjtUrl',
            'handleDelete',
            'handleUnDelete',
            'handleComfirmDelete',
            'handleNewSprite',
            'handleNewSound',
            'handleNewCostume',
            'handleRoleMouseEnter',
            'handleRoleMouseLeave',

            'handlePaintSprite',
            'handlePaintCostume',
            'handlePaintBackdrop',
            'handleSoundRecord'

        ]);
        this.state = {
            activeTab: TAB_INDEX_PUBLIC,
            selectedItem: null,
            filterQuery: '',
            selectedTag: ALL_TAG.tag,

            ccMaterialArr: [],      // 平台素材
            userMaterialArr: [],    // 用户素材
            bucketName: '',
            materialTypeName: '',   // 素材类型名称 ---ccRoleMaterial ccBackgroundMaterial ccAudioMaterial ccProjectMaterial
            materialListName: '',   // 素材数组名称 ---ccRoleMaterialList ccBackgroundMaterialList ccAudioMaterialList ccProjectMaterialList
            isRemindDelete: false,
            materialName: '',        // 素材名称 --- 角色 背景 声音 文件
            isLoading: false,
            isRequest: false,

            tagIndex: 0,     // 标签默认选中项 
            materialClassList: []
        };

        this.ccPageNum = 0;
        this.userPageNum = 0;
        this.pageSize = 20;

    }

    handlePaintSprite() {
        this.props.onRequestClose();
        this.props.onActivateTab(COSTUMES_TAB_INDEX);
        this.handleNewBlankSprite();
    }

    handlePaintCostume() {
        this.props.onRequestClose();
        this.handleNewBlankCostume();
    }

    handlePaintBackdrop() {
        this.props.onRequestClose();
        this.props.onActivateTab(COSTUMES_TAB_INDEX);
        this.handleNewBlankCostume();
    }

    handleSoundRecord() {
        this.props.onRequestClose();
        this.props.openSoundRecorder();
    }

    handleNewBlankCostume() {
        const storage = this.props.vm.runtime.storage;
        const name = this.props.vm.editingTarget.isStage ?
            this.props.intl.formatMessage(messages.backdrop, { index: 1 }) :
            this.props.intl.formatMessage(messages.costume, { index: 1 });
        costumeEmUpload(name, storage, this.handleNewCostume);
    }

    handleNewBlankSprite() {
        const storage = this.props.vm.runtime.storage;
        const spriteName = this.props.intl.formatMessage(messages.sprite, { index: 1 });
        spriteEmUpload(spriteName, storage, this.handleNewSprite);
    }

    // 判断素材类型
    libraryType(type) {
        switch (type) {
            case 'sprite':
                this.setState({
                    materialTypeName: 'ccRoleMaterial',
                    materialListName: 'ccRoleMaterialList',
                    materialName: roleText
                });
                return 'R';
            case 'custom':
                this.setState({
                    materialTypeName: 'ccRoleMaterial',
                    materialListName: 'ccRoleMaterialList',
                    materialName: customeText
                });
                return 'R';
            case 'backdrop':
                this.setState({
                    materialTypeName: 'ccBackgroundMaterial',
                    materialListName: 'ccBackgroundMaterialList',
                    materialName: bgText
                });
                return 'B';
            case 'sound':
                this.setState({
                    materialTypeName: 'ccAudioMaterial',
                    materialListName: 'ccAudioMaterialList',
                    materialName: audioText
                });
                return 'A';
            case 'project':
                this.setState({
                    materialTypeName: 'ccProjectMaterial',
                    materialListName: 'ccProjectMaterialList',
                    materialName: '文件'
                });
                return 'P';
            default:
                return '';
        }
    }
    // 生成UUID
    productUUID() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    // 初始化cos
    initCos() {
        const materialType = this.materialType;
        let bucketName = '';
        if (materialType === 'R' || materialType === 'B' || materialType === 'A') {
            bucketName = cosConfig.materialBucketName;
        } else if (materialType === 'P') {
            bucketName = cosConfig.projectBucketName;
        }
        this.setState({
            bucketName,
        });

        const params = {
            authInfo: this.props.authInfo,
            bucketName: bucketName,
            operaType: cosConfig.operaType
        }
        this.cos = new COS({
            getAuthorization: (options, callback) => {
                applyXCosSecurityToken(params).then((data) => {
                    callback({
                        TmpSecretId: data.data.tmpSecretId,
                        TmpSecretKey: data.data.tmpSecretKey,
                        XCosSecurityToken: data.data.xCosSecurityToken,
                        ExpiredTime: data.data.expiredTime,
                    });
                }, (err) => {
                    // console.log('err--', err)
                    // toasts.error('操作失败');
                    if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                        this.handleToLoginTimeout();
                    }
                })
            }
        });
    }

    handleSearchCCMaterialClassList() {
        searchCCMaterialClassList({
            authInfo: this.props.authInfo,
            materialType: this.materialType
        }).then(response => {
            const {
                errorCode,
                data
            } = response;
            if (errorCode == 0) {
                if (data.length > 0) {
                    data.unshift({
                        classUUID: "",
                        className: "All"
                    })
                }
                this.setState({ materialClassList: data })
            }
        }, err => { console.log('request fail...', err) });
    }


    // 获取平台素材
    handleSearchCCSampleMaterialInfoList({ pageNum = 0, pageSize = 20, classUUID }) {
        if (!this.isCanRequest) {
            return
        }

        if (pageNum === 0) {
            this.setState({
                isLoading: true
            });
        }

        let materialType = this.materialType;
        let params = {
            authInfo: this.props.authInfo,
            materialType,
            fromResult: pageNum * pageSize,
            sizeResult: pageSize
        }
        if (classUUID) {
            params = {
                classUUIDList: [classUUID],
                ...params
            }
        }
        searchCCSampleMaterialInfoList(params).then((data) => {
            console.log('handleSearchCCSampleMaterialInfoList ...')
            let {
                materialClassList,
                tagIndex
            } = this.state;
            let classUUIDList = data.classUUIDList || [""];
            let responTag = classUUIDList[0];
            let currentTag = "";
            if (materialClassList
                && materialClassList[tagIndex]
                && materialClassList[tagIndex].classUUID) {
                currentTag = materialClassList[tagIndex].classUUID;
            }
            if (responTag != currentTag) {
                return;
            }
            this.setState({
                ccMaterialArr: pageNum == 0 ? data[this.state.materialListName] : this.state.ccMaterialArr.concat(data[this.state.materialListName]),
                isLoading: false
            });
            // const materiallist = [];
            data[this.state.materialListName].map((dataItem, index) => {
                dataItem.url = spinnerUrl;
                dataItem.iconSoundPic = spinnerUrl;
                if (materialType === 'R') {
                    dataItem.iconSoundPic = '';
                    // coskey = dataItem.cosFileList[0].cosKey;
                    // if(this.props.libraryType === 'custom') {
                    dataItem.cosFileList && dataItem.cosFileList.map((item, index) => {
                        item.url = spinnerUrl;
                        if (dataItem.cosFileList.length === 1) {
                            item.realName = item.fileName;
                            item.fileName = dataItem.materialName
                        } else if (dataItem.cosFileList.length > 1) {
                            item.realName = item.fileName;
                            item.fileName = dataItem.materialName + '-' + (index + 1);
                        }
                        this.getCosObjtUrl(item.cosKey).then((data) => {
                            item.url = data;
                            if (index === 0) {
                                dataItem.url = data;
                            }
                            this.setState({}, () => {
                                const cosFileName = item.realName;
                                const suffix = cosFileName.lastIndexOf('.') > 0 ? cosFileName.substring(cosFileName.lastIndexOf('.')) : '';
                                if (suffix) {
                                    this.handleSaveLocalPlatformMaterial(data, item.cosKey + suffix);
                                }
                            });
                        })
                    })
                    // }
                } else if (materialType === 'B' || materialType === 'A') {
                    // coskey = dataItem.cosFile.cosKey;
                    this.getCosObjtUrl(dataItem.cosFile.cosKey).then((data) => {
                        dataItem.iconSoundPic = bigSound;
                        dataItem.url = data;
                        this.setState({}, () => {
                            const cosFileName = dataItem.cosFile.fileName;
                            const suffix = cosFileName.lastIndexOf('.') > 0 ? cosFileName.substring(cosFileName.lastIndexOf('.')) : '';
                            if (suffix) {
                                this.handleSaveLocalPlatformMaterial(data, dataItem.cosFile.cosKey + suffix);
                            }
                        });
                    })
                } else if (materialType === 'P') {
                    // coskey = '';
                }
            });

            // 如果数据总数大于pageSize * pageNum，继续请求
            if (data.totalCount > ((pageNum + 1) * this.pageSize)) {
                setTimeout(() => {
                    pageNum++;
                    this.handleSearchCCSampleMaterialInfoList({
                        pageNum: pageNum,
                        pageSize: 20,
                        classUUID
                    });
                }, 800)
            }

            // 当选择全部标签时，保存应答报文
            if (this.state.tagIndex == 0) {
                this.handleSaveLocalPlatformJson(materialType, data[this.state.materialListName], pageNum);
            }
        }, (err) => {
            // toasts.error('操作失败');
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.handleToLoginTimeout();
            }
            this.setState({
                isLoading: false
            })
        });
    }

    handleLocalMaterialType(type) {
        let localMaterialType = '1';
        switch (type) {
            case 'R': {
                localMaterialType = '1';
                break;
            }
            case 'B': {
                localMaterialType = '2';
                break;
            }
            case 'A': {
                localMaterialType = '3';
                break;
            }
            default:
                break;
        }
        return localMaterialType;
    }

    // 本地存储平台素材json报文
    handleSaveLocalPlatformJson(type, content, pageNum) {
        const localMaterialType = this.handleLocalMaterialType(type);
        const params = {
            type: localMaterialType,
            content,
            page: pageNum
        }
        saveLocalPlatformMaterial(params);
    }
    // 保存素材到本地
    handleSaveLocalPlatformMaterial(url, coskey) {
        const params = { url, coskey };
        saveLocalMaterial(params);
    }
    // 获取本地平台素材报文
    handleGetLocalPlatformJSON(type) {
        const localMaterialType = this.handleLocalMaterialType(type);
        const params = {
            type: localMaterialType
        }
        getLocalPlatformMaterial(params).then((res) => {
            res.data.map((item) => {
                if (item && item.cosFileList) {
                    item.url = item.cosFileList[0].url;
                }
                if (item && item.cosFile) {
                    item.url = item.cosFile.url;
                }
            })
            this.setState({ ccMaterialArr: res.data });
        });
    }
    // 获取本地用户素材报文
    handleGetLocalUserJSON(type) {
        const localMaterialType = this.handleLocalMaterialType(type);
        const params = {
            type: localMaterialType
        }
        getUserLocalMaterial(params).then((res) => {
            res.data.map((item) => {
                if (item && item.cosFileList) {
                    item.url = item.cosFileList[0].url;
                }
                if (item && item.cosFile) {
                    item.url = item.cosFile.url;
                }
            })
            this.setState({ userMaterialArr: res.data });
        });
    }

    // 获取用户素材
    handleSearchCCMaterialInfoList() {
        const materialType = this.materialType;
        const params = {
            authInfo: this.props.authInfo,
            materialType,
            fromResult: this.userPageNum * this.pageSize,
            sizeResult: this.pageSize
        }
        searchCCMaterialInfoList(params).then((data) => {
            this.setState({
                userMaterialArr: this.state.userMaterialArr.concat(data[this.state.materialListName])
            })

            data[this.state.materialListName].map((dataItem, index) => {
                dataItem.url = spinnerUrl;
                dataItem.iconSoundPic = spinnerUrl;
                if (materialType === 'R') {
                    dataItem.iconSoundPic = '';
                    dataItem.cosFileList && dataItem.cosFileList.map((item, index) => {
                        item.url = spinnerUrl;
                        if (dataItem.cosFileList.length === 1) {
                            item.fileName = dataItem.materialName;
                        } else if (dataItem.cosFileList.length > 1) {
                            item.fileName = dataItem.materialName + '-' + (index + 1);
                        }
                        this.getCosObjtUrl(item.cosKey).then((data) => {
                            item.url = data;
                            if (index === 0) {
                                dataItem.url = data;
                            }
                            this.setState({});
                        })
                    })
                    // }
                } else if (materialType === 'B' || materialType === 'A') {
                    // coskey = dataItem.cosFile.cosKey;
                    this.getCosObjtUrl(dataItem.cosFile.cosKey).then((data) => {
                        dataItem.iconSoundPic = bigSound;
                        dataItem.url = data;
                        this.setState({});
                    })
                } else if (materialType === 'P') {
                    // coskey = '';
                }
            })
            // 如果数据总数大于pageSize * pageNum，继续请求
            if (data.totalCount > ((this.userPageNum + 1) * this.pageSize)) {
                this.userPageNum += 1;
                this.handleSearchCCMaterialInfoList();
            }
        }, (err) => {
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.handleToLoginTimeout();
            }
        });
    }

    // 防盗链，转为可访问的url
    getCosObjtUrl(key) {
        return new Promise((resolve, reject) => {
            this.cos && this.cos.getObjectUrl({
                Bucket: this.state.bucketName + '-' + cosConfig.appId,
                Region: cosConfig.region,
                Key: key,
                Sign: true
            }, function (err, data) {
                if (data) {
                    resolve(data.Url);
                } else {
                    reject(err);
                }
            })
        })
    }

    componentDidMount() {
        this.isCanRequest = true;
        this.materialType = this.libraryType(this.props.libraryType);
        const { isOnLine } = this.props;
        if (isOnLine) {
            // 初始化cos
            this.initCos();
            // 获取平台素材分类列表
            this.handleSearchCCMaterialClassList();
            // 清空缓存队列后，获取平台素材
            clearCacheQueue().then((data) => {
                // 不论用户登不登录，都获取平台素材
                this.handleSearchCCSampleMaterialInfoList({});
            });

            // 用户登录时，才获取用户素材
            if (this.props.loginStatus) {
                // 获取用户素材
                this.handleSearchCCMaterialInfoList();
            }
        } else {
            // 获取本地缓存的平台素材
            this.handleGetLocalPlatformJSON(this.materialType);
            // 获取本地缓存的个人素材
            this.handleGetLocalUserJSON(this.materialType);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isOnLine === true && nextProps.isOnLine === false) {
            this.setState({ ccMaterialArr: [] }, () => {
                // 获取本地缓存的平台素材
                this.handleGetLocalPlatformJSON(this.materialType);
                // 获取本地缓存的个人素材
                this.handleGetLocalUserJSON(this.materialType);
            });
        } else if (this.props.isOnLine === false && nextProps.isOnLine === true) {
            this.setState({ ccMaterialArr: [] }, () => {
                // 清空缓存队列后，获取平台素材
                clearCacheQueue().then((data) => {
                    // this.ccPageNum = 0;
                    // 获取平台素材分类列表
                    this.handleSearchCCMaterialClassList();
                    // 不论用户登不登录，都获取平台素材
                    this.handleSearchCCSampleMaterialInfoList({});
                });
            });
        }
    }


    handleOnLineUpload(file, materialType) {
        const filename = file.name;
        const file_name = filename.lastIndexOf('.') > 0 ? filename.substring(0, filename.lastIndexOf('.')) : filename;
        const prefx_name = filename.lastIndexOf('.') > 0 ? filename.substring(filename.lastIndexOf('.')) : '';
        let fileName = '';
        if (file_name.length > (50 - prefx_name.length)) {
            fileName = file_name.substring(0, (50 - prefx_name.length));
        } else {
            fileName = file_name;
        }

        let newData = {};
        newData.materialName = fileName;
        newData.url = loadingUrl;
        newData.iconSoundPic = loadingUrl;
        if (this.props.libraryType === 'custom') {
            newData.cosFileList = [{
                fileName: fileName,
                url: loadingUrl
            }]
        }

        const userMaterialArr = this.state.userMaterialArr;
        userMaterialArr.unshift(newData)
        this.setState({
            userMaterialArr
        });
        // 直接传入工程文件
        // const fileType = file.type;
        // const storage = this.props.vm.runtime.storage;
        // if (materialType === 'R') {
        //     if (this.props.libraryType === 'custom') {
        //         handleFileUploadSpecial({ file, fileType, filename }, (buffer, fileType, filename) => {
        //             costumeUpload(buffer, fileType, filename, storage, this.handleNewCostume);
        //         });
        //     } else if (this.props.libraryType === 'sprite') {
        //         handleFileUploadSpecial({ file, fileType, filename }, (buffer, fileType, filename) => {
        //             spriteUpload(buffer, fileType, filename, storage, this.handleNewSprite, filename);
        //         });
        //     }
        // } else if (materialType === 'A') {
        //     const handleSound = newSound => this.props.vm.addSound(newSound)
        //         .then(() => this.handleNewSound());
        //     handleFileUploadSpecial({ file, fileType, filename }, (buffer, fileType, filename) => {
        //         soundUpload(buffer, fileType, filename, storage, handleSound);
        //     });
        // } else if (materialType === 'B') {
        //     handleFileUploadSpecial({ file, fileType, filename }, (buffer, fileType, filename) => {
        //         costumeUpload(buffer, fileType, filename, storage, this.handleNewCostume);
        //     });
        // }

        const key = this.productUUID();
        if (this.cos) {
            this.cos.putObject({
                Bucket: this.state.bucketName + '-' + cosConfig.appId,
                Region: cosConfig.region,
                Key: key,
                Body: file,
                TaskReady: (taskId) => {
                    // console.log('taskId---', taskId)
                },
                onProgress: (progressData) => {

                }
            }, (err, data) => {
                if (data) {
                    const cosFile = {};
                    cosFile.cosKey = key;
                    cosFile.cosUrl = data.Location;
                    cosFile.cosBucketName = this.state.bucketName;
                    cosFile.fileName = fileName + prefx_name;
                    cosFile.sortNo = 0;

                    const commonParams = {
                        materialUUID: '',           // ‘’
                        classUUID: '',              // ‘’
                        materialCurStatus: '',      // ''
                        materialName: fileName,
                    }
                    const authParams = {
                        authInfo: this.props.authInfo,
                        materialType
                    }
                    let params = null;
                    if (materialType === 'R') {
                        params = {
                            ...authParams,
                            [this.state.materialTypeName]: {
                                ...commonParams,
                                cosFileList: [cosFile]
                            }
                        }
                    } else if (materialType === 'B' || materialType === 'A') {
                        params = {
                            ...authParams,
                            [this.state.materialTypeName]: {
                                ...commonParams,
                                cosFile: cosFile,
                            }
                        }
                    } else if (materialType === 'P') {
                        params = {
                            ...authParams,
                            [this.state.materialTypeName]: {
                                ...commonParams,
                                projectCourse: {},          // 工程程的微课对象；保存请求时，该对象为空
                                cosFileCover: {},           // 工程封面图片对象
                                cosFileProject: {},         // 工程文件对象
                            }
                        }
                    }
                    saveCCMaterialInfo(params).then((data) => {
                        toasts.success(this.props.intl.formatMessage(messages.uploadSucc));
                        // 上传成功之后，重新拉取素材列表 
                        for (let key in params[this.state.materialTypeName]) {
                            newData[key] = params[this.state.materialTypeName][key];
                        }
                        newData.materialUUID = data.materialCurStatus.materailUUID;

                        this.getCosObjtUrl(cosFile.cosKey).then((data) => {
                            cosFile.url = data;
                            newData.url = data;
                            newData.iconSoundPic = bigSound;
                            this.setState({});
                        });
                    }, (err) => {
                        const userMaterialArr = this.state.userMaterialArr;
                        userMaterialArr.splice(0, 1);
                        this.setState({
                            userMaterialArr
                        });
                        if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                            this.handleToLoginTimeout();
                        } else {
                            toasts.error(this.props.intl.formatMessage(messages.uploadFail));
                        }
                    })
                }
                if (err) {
                    toasts.error(this.props.intl.formatMessage(messages.uploadFail));
                    const userMaterialArr = this.state.userMaterialArr;
                    userMaterialArr.splice(0, 1);
                    this.setState({
                        userMaterialArr
                    });
                }
            })
        } else {
            toasts.error(this.props.intl.formatMessage(messages.uploadFail));
        }
    }

    handleOffLineUpload(file, materialType) {
        const key = this.productUUID();
        const path = file.path;
        const filename = file.name;
        const file_name = filename.lastIndexOf('.') > 0 ? filename.substring(0, filename.lastIndexOf('.')) : filename;
        const prefx_name = filename.lastIndexOf('.') > 0 ? filename.substring(filename.lastIndexOf('.')) : '';
        let fileName = '';
        if (file_name.length > (50 - prefx_name.length)) {
            fileName = file_name.substring(0, (50 - prefx_name.length));
        } else {
            fileName = file_name;
        }
        const localMaterialType = this.handleLocalMaterialType(materialType);
        const material = {
            materialName: fileName,
            materialUUID: key
        }
        const cosFile = {
            cosKey: key + prefx_name,
            fileName: fileName,
            localUrl: path,
        }

        if (materialType === 'R') {
            material.cosFileList = [cosFile];
        } else {
            material.cosFile = cosFile
        }

        const params = {
            type: localMaterialType,
            material
        }
        saveUserLocalMaterial(params).then((res) => {
            // res.data.map((item) => {
            //     if (item && item.cosFileList) {
            //         item.url = item.cosFileList[0].url;
            //     }
            //     if (item && item.cosFile) {
            //         item.url = item.cosFile.url;
            //     }
            // })
            // this.setState({ userMaterialArr: res.data });
            toasts.success(this.props.intl.formatMessage(messages.uploadSucc));
            this.handleGetLocalUserJSON(materialType);
        })
    }

    // 选择文件上传至cos
    handleFileChange() {
        const file = document.getElementById('fileSelect').files[0];
        // 获取文件后缀
        const file_name = file.name;
        const file_prefx = file_name.lastIndexOf('.') > 0 ? file_name.substring(file_name.lastIndexOf('.')) : '';
        if (this.props.fileAccept.indexOf(file_prefx) === -1) {
            if ('sprite' === this.props.libraryType ||
                'backdrop' === this.props.libraryType ||
                'custom' === this.props.libraryType) {
                toasts.error(this.props.intl.formatMessage(messages.imageSupportPrompt));
            }
            else if ('sound' === this.props.libraryType) {
                toasts.error(this.props.intl.formatMessage(messages.audioSupportPrompt));
            }
            return;
        }
        const materialType = this.materialType;

        const { isOnLine } = this.props;
        if (file.size < 1024 * 512) {

            if (isOnLine) {
                this.handleOnLineUpload(file, materialType);
            } else {
                this.handleOffLineUpload(file, materialType);
            }

        } else {
            toasts.error(uploadFailText);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filterQuery !== this.state.filterQuery ||
            prevState.selectedTag !== this.state.selectedTag) {
            this.scrollToTop();
        }
    }

    componentWillUnmount() {
        // 组件销毁时，将cos置空，清理内存
        this.cos = null;
        this.isCanRequest = false;
    }

    handleBlur(id) {
        this.handleMouseLeave(id);
    }
    handleFocus(id) {
        this.handleMouseEnter(id);
    }

    handleSelect(dataItem) {
        console.log('dataItem---', dataItem)
        const isOnLine = this.props.isOnLine;
        const url = dataItem.url;
        if (url.substring(0, 7) === 'static/') {
            return;
        }
        const fileName = dataItem.materialName || dataItem.fileName;
        // let fileName = '';
        // if (filename.lastIndexOf('.') > 0) {
        //     fileName = filename.substring(0, filename.lastIndexOf('.'));
        // } else {
        //     fileName = filename;
        // }
        const storage = this.props.vm.runtime.storage;

        // 判断当前是否为声音库
        const materialType = this.materialType;
        if (materialType === 'R') {
            if (this.props.libraryType === 'custom') {
                handleInputStreamUpload({ url, fileName, isOnLine }, (buffer, fileType, fileName) => {
                    costumeUpload(buffer, fileType, fileName, storage, this.handleNewCostume, isOnLine);
                });
            } else if (this.props.libraryType === 'sprite') {
                // handleInputStreamUpload({ url, fileName }, (buffer, fileType, fileName) => {
                //     spriteUpload(buffer, fileType, fileName, storage, this.handleNewSprite, fileName);
                // });
                const spriteName = dataItem.materialName;
                handleInputStreamsUpload2(dataItem.cosFileList, isOnLine).then((responseDatas) => {
                    const spriteCostumesJson = responseDatas;
                    if (spriteCostumesJson && spriteCostumesJson.length > 0) {

                        const {
                            buffer,
                            fileName,
                            assetType,
                        } = spriteCostumesJson[0];
                        let firstCostumeName = fileName;
                        // if (fileName.lastIndexOf('.') > 0) {
                        //     firstCostumeName = fileName.substring(0, fileName.lastIndexOf('.'));
                        // } else {
                        //     firstCostumeName = fileName;
                        // }
                        if (spriteCostumesJson.length > 0) {
                            firstCostumeName
                        }
                        if (spriteCostumesJson.length === 0) {
                            spriteUpload(buffer, assetType, spriteName, storage, this.handleNewSprite, firstCostumeName);
                        } else {
                            spriteUpload(buffer, assetType, spriteName, storage, (sprite) => {
                                this.props.vm.addSprite(sprite).then(async () => {
                                    for (let index = 1; index < spriteCostumesJson.length; index++) {
                                        const costume = spriteCostumesJson[index];
                                        let costumeName = costume.fileName;
                                        // if (costume.fileName.lastIndexOf('.') > 0) {
                                        //     costumeName = costume.fileName.substring(0, costume.fileName.lastIndexOf('.')) + '-' + (index + 1);
                                        // } else {
                                        //     costumeName = costume.fileName + '-' + (index + 1);
                                        // }
                                        try {
                                            let customJsonObj = await costumeUploadAsync(costume.buffer, costume.assetType, costumeName, storage);
                                            let addCostumeResult = await this.props.vm.addCostume2(customJsonObj.md5, customJsonObj);
                                        } catch (error) {
                                            console.log("addCostume error : ", error)
                                        }
                                        // costumeUpload(costume.buffer, costume.assetType, costumeName, storage, customJsonObj => {
                                        //     this.props.vm.addCostume2(customJsonObj.md5, customJsonObj);
                                        // });
                                    }
                                    const editingTarget = this.props.vm.editingTarget;
                                    this.props.vm.setEditingTargetForStage(editingTarget.id);
                                });
                            }, firstCostumeName);
                        }
                    }
                }, error => {
                    console.log('responseDatas error ... ');
                }).catch(error => {
                    console.log('responseDatas error ... ');
                })
            }
        } else if (materialType === 'A') {
            const handleSound = newSound => this.props.vm.addSound(newSound)
                .then(() => this.handleNewSound());

            handleInputStreamUpload({ url, fileName, isOnLine }, (buffer, fileType, fileName) => {
                soundUpload(buffer, fileType, fileName, storage, handleSound);
            });
        } else if (materialType === 'B') {
            handleInputStreamUpload({ url, fileName, isOnLine }, (buffer, fileType, fileName) => {
                costumeUpload(buffer, fileType, fileName, storage, this.handleNewCostume, isOnLine);
            });
        }


        this.handleClose();
    }

    handleNewCostume(costume) {
        this.props.vm.addCostume(costume.md5, costume);
    }
    handleNewSound() {
        if (!this.props.vm.editingTarget) {
            return null;
        }
        const sprite = this.props.vm.editingTarget.sprite;
        const sounds = sprite.sounds ? sprite.sounds : [];
        // this.setState({ selectedSoundIndex: Math.max(sounds.length - 1, 0) });
    }
    handleNewSprite(spriteJSONString) {
        this.props.vm.addSprite(spriteJSONString).then(() => {
            const editingTarget = this.props.vm.editingTarget;
            this.props.vm.setEditingTargetForStage(editingTarget.id);
        });
    }

    handleClose() {
        this.props.onRequestClose();
        analytics.pageview(`/${this.props.id}/search?q=${this.state.filterQuery}`);
    }
    handleTagClick(tag) {
        this.setState({
            filterQuery: '',
            selectedTag: tag.toLowerCase()
        });
    }
    handleMouseEnter(id) {
        // if (this.props.onItemMouseEnter) this.props.onItemMouseEnter(this.getFilteredData()[id]);
    }
    handleMouseLeave(id) {
        // if (this.props.onItemMouseLeave) this.props.onItemMouseLeave(this.getFilteredData()[id]);
    }
    handleFilterChange(event) {
        this.setState({
            filterQuery: event.target.value,
            selectedTag: ALL_TAG.tag
        });
    }
    handleFilterClear() {
        this.setState({ filterQuery: '' });
    }
    getFilteredData() {
        if (this.state.selectedTag === 'all') {
            if (!this.state.filterQuery) return this.props.data;
            return this.props.data.filter(dataItem => (
                (dataItem.tags || [])
                    // Second argument to map sets `this`
                    .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                    .concat(dataItem.name.toLowerCase())
                    .join('\n') // unlikely to partially match newlines
                    .indexOf(this.state.filterQuery.toLowerCase()) !== -1
            ));
        }
        return this.props.data.filter(dataItem => (
            dataItem.tags &&
            dataItem.tags
                .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                .indexOf(this.state.selectedTag) !== -1
        ));
    }
    scrollToTop() {
        this.filteredDataRef.scrollTop = 0;
    }
    setFilteredDataRef(ref) {
        this.filteredDataRef = ref;
    }
    handTabSelect(index) {
        this.setState({
            activeTab: index
        });
        this.props.onLibraryTabSelect({
            type: this.props.libraryType,
            tabIndex: index
        });
    }

    // 到登录页
    handleToLogin() {
        this.handleClose();
        this.props.onSetUserTab(LOGIN_TAB_INDEX);
    }

    // 到超时页
    handleToLoginTimeout() {
        this.handleClose();
        this.props.onSetUserTab(USER_TIME_OUT_TAB_INDEX);
    }

    // 删除素材
    handleDelete(materialUUID) {
        console.log('materialUUID---', materialUUID)
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
        const materialType = this.materialType;
        const { isOnLine } = this.props;
        if (isOnLine) {      // 处理在线///////////////////////
            const params = {
                authInfo: this.props.authInfo,
                materialType,
                materialUUID: this.materialUUID
            }
            this.setState({ isRequest: true });
            deleteCCMaterial(params).then((data) => {
                // 删除成功后回到前一页，重新拉区列表
                const searchParams = {
                    authInfo: this.props.authInfo,
                    materialType,
                }
                toasts.success(this.props.intl.formatMessage(messages.deleteSucc));
                const userMaterialArr = Object.assign([], this.state.userMaterialArr);
                userMaterialArr.map((item, index) => {
                    if (item.materialUUID === this.materialUUID) {
                        userMaterialArr.splice(index, 1);
                    }
                })
                this.setState({
                    userMaterialArr,
                    isRemindDelete: false,
                    isRequest: false
                })
            }, (err) => {
                this.setState({ isRequest: false });
                toasts.error(this.props.intl.formatMessage(messages.deleteFail));
                if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                    this.handleToLoginTimeout();
                }
            });
        } else {    // 处理离线/////////////////////
            const localMaterialType = this.handleLocalMaterialType(materialType);
            const params = {
                type: localMaterialType,
                materialUUID: this.materialUUID
            };
            deleteUserLocalMaterial(params).then((data) => {
                toasts.success(this.props.intl.formatMessage(messages.deleteSucc));
                this.setState({
                    isRemindDelete: false,
                });
                this.handleGetLocalUserJSON(materialType);
            }, (err) => {
                toasts.error(this.props.intl.formatMessage(messages.deleteFail));
            });
        }
    }

    handleRoleMouseEnter(dataItem) {
        if (this.materialType === 'R' && this.props.libraryType === 'sprite') {
            // console.log('dataItem', dataItem)
            if (dataItem.cosFileList.length > 1) {
                let i = 1;
                this.roleTimer = setInterval(() => {
                    dataItem.url = dataItem.cosFileList[i].url;
                    this.setState({});
                    i++;
                    if (i >= dataItem.cosFileList.length) {
                        i = 0;
                    }
                }, 500);
            }
        }
    }
    handleRoleMouseLeave(dataItem) {
        if (this.materialType === 'R' && this.props.libraryType === 'sprite') {
            if (dataItem.cosFileList.length > 1) {
                clearInterval(this.roleTimer);
                dataItem.url = dataItem.cosFileList[0].url;
                this.setState({});
            }
        }
    }

    handleTagClick(element, index) {
        this.setState({
            tagIndex: index,
            ccMaterialArr: []
        }, () => {
            if (element.classUUID) {
                this.handleSearchCCSampleMaterialInfoList({ classUUID: element.classUUID });
            } else {
                this.setState
                this.handleSearchCCSampleMaterialInfoList({});
            }
        });
    }


    render() {
        const {
            title,
            fileAccept,
            fileInput,
            onUpload,
            onFileUploadClick,
            libraryType,
            loginStatus,
            onActivateTab,
            openSoundRecorder,
            isOnLine
        } = this.props;

        const { ccMaterialArr, userMaterialArr, isRemindDelete, materialName, isLoading, materialClassList, tagIndex } = this.state;
        const materialType = this.materialType;

        const hasTagView = this.state.activeTab === TAB_INDEX_PUBLIC && isOnLine;

        // console.log('ccMaterialArr--', ccMaterialArr)
        // console.log('userMaterialArr--', userMaterialArr)

        let paintIcon;
        let paintButtonText;
        let libraryMineLabel;
        let libraryCommonLabel;

        let handlePaint;

        if (libraryType === 'sprite') {
            paintIcon = huizhiIcon;
            paintButtonText = paint;
            handlePaint = this.handlePaintSprite;

            libraryMineLabel = spriteMineLabel;
            libraryCommonLabel = spriteCommonLabel;
        } else if (libraryType === 'custom') {
            paintIcon = huizhiIcon;
            paintButtonText = paint;
            handlePaint = this.handlePaintCostume;

            libraryMineLabel = customMineLabel;
            libraryCommonLabel = customCommonLabel;
        } else if (libraryType === 'backdrop') {
            paintIcon = huizhiIcon;
            paintButtonText = paint;
            handlePaint = this.handlePaintBackdrop;

            libraryMineLabel = backdropMineLabel;
            libraryCommonLabel = backdropCommonLabel;
        } else if (libraryType === 'sound') {
            paintIcon = luzhiIcon;
            paintButtonText = recordSound;
            handlePaint = this.handleSoundRecord;

            libraryMineLabel = soundMineLabel;
            libraryCommonLabel = soundCommonLabel;
        } else {
            paintIcon = huizhiIcon;
            paintButtonText = paint;
            handlePaint = this.handlePaintSprite;

            libraryMineLabel = spriteMineLabel;
            libraryCommonLabel = spriteCommonLabel;
        }

        return (!isRemindDelete ?
            <Modal
                contentLabel={this.props.title}
                id={this.props.id}
                showClose={true}
                cancelable={true}
                onRequestClose={this.handleClose}
                className={styles.libraryWrapper}
            >
                <Box className={styles.libraryHeaer}>
                    <Box
                        onClick={() => {
                            this.handTabSelect(TAB_INDEX_PUBLIC);
                        }}
                        className={classNames(
                            styles.libraryHeaerTab,
                            {
                                [styles.isSelected]: this.state.activeTab === TAB_INDEX_PUBLIC
                            }
                        )}
                    >
                        {libraryCommonLabel}
                    </Box>
                    <Box className={styles.tabSeparator} />
                    <Box
                        onClick={() => {
                            this.handTabSelect(TAB_INDEX_PRIVATE);
                        }}
                        className={classNames(
                            styles.libraryHeaerTab,
                            {
                                [styles.isSelected]: this.state.activeTab === TAB_INDEX_PRIVATE
                            }
                        )}
                    >
                        {libraryMineLabel}
                    </Box>
                </Box>
                <div className={styles.paintWrapper}>
                    <Button
                        type='default'
                        size={'small'}
                        iconSrc={paintIcon}
                        iconClassName={styles.paintBtnImg}
                        className={styles.paintBtn}
                        onClick={handlePaint}>
                        {paintButtonText}
                    </Button>
                </div>
                {
                    this.state.activeTab === TAB_INDEX_PUBLIC
                    && isOnLine
                    && <Box className={styles.tagsPane}>
                        {
                            materialClassList.length > 0
                            && materialClassList.map((element, index) => {
                                return (
                                    <span
                                        className={classNames(styles.tagItem, {
                                            [styles.tagItemSelected]: tagIndex == index
                                        })}
                                        onClick={() => this.handleTagClick(element, index)}
                                    >
                                        {element.className}
                                    </span>
                                );
                            })
                        }
                    </Box>
                }
                <div
                    className={classNames(
                        styles.libraryScrollGrid,
                        hasTagView ? styles.publicMaterialHeight : styles.userMaterialHeight
                    )}
                    ref={this.setFilteredDataRef}
                    id='img'
                >
                    {/* 平台素材 */}
                    {/* materialType === 'A' && 不是造型素材，只展示第一个 */}
                    {(this.state.activeTab !== TAB_INDEX_PRIVATE) && ccMaterialArr && (ccMaterialArr.length > 0) && (libraryType !== 'custom') && ccMaterialArr.map((dataItem, index) => {
                        return (
                            <LibraryItem
                                description={dataItem.description}
                                disabled={dataItem.disabled}
                                featured={dataItem.featured}
                                iconURL={materialType === 'A' ? (this.props.isOnLine ? dataItem.iconSoundPic : bigSound) : (this.props.isOnLine ? dataItem.url : 'file://' + dataItem.url)}   // 为音效库时，直接使用本地图片
                                id={index}
                                key={`item_${index}`}
                                name={dataItem.materialName}
                                onBlur={this.handleBlur}
                                onFocus={this.handleFocus}
                                onMouseEnter={() => this.handleRoleMouseEnter(dataItem)}
                                onMouseLeave={() => this.handleRoleMouseLeave(dataItem)}
                                onSelect={() => this.handleSelect(dataItem)}
                                materialType={materialType}
                                isOnLine={isOnLine}
                            />
                            // <LibraryItem
                            //     description={dataItem.description}
                            //     disabled={dataItem.disabled}
                            //     featured={dataItem.featured}
                            //     iconURL={scratchURL}
                            //     id={index}
                            //     key={`item_${index}`}
                            //     onBlur={this.handleBlur}
                            //     name={dataItem.name}
                            //     onFocus={this.handleFocus}
                            //     onMouseEnter={this.handleMouseEnter}
                            //     onSelect={this.handleSelect}
                            // />
                        )
                    })}
                    {(this.state.activeTab !== TAB_INDEX_PRIVATE) && ccMaterialArr && (ccMaterialArr.length > 0) && (libraryType === 'custom') && ccMaterialArr.map((dataItem, index) => {
                        return dataItem.cosFileList && dataItem.cosFileList.map((item, index) => {
                            return (
                                <LibraryItem
                                    description={dataItem.description}
                                    disabled={dataItem.disabled}
                                    featured={dataItem.featured}
                                    iconURL={this.props.isOnLine ? item.url : 'file://' + item.url}  // 为音效库时，直接使用本地图片
                                    id={index}
                                    key={`item_${index}`}
                                    name={item.fileName}
                                    onBlur={this.handleBlur}
                                    onFocus={this.handleFocus}
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave}
                                    onSelect={() => this.handleSelect(item)}
                                    isOnLine={isOnLine}
                                // onDelete={this.handleDelete}
                                // materialUUID={dataItem.materialUUID}   // 删除用
                                // showDelete={true}
                                />
                            )
                        })
                    })}


                    {/* materialType === 'A' && 是造型素材，遍历cosFileList */}
                    {(this.state.activeTab !== TAB_INDEX_PRIVATE) && ccMaterialArr && (ccMaterialArr.length > 0) && (libraryType === 'custom') && ccMaterialArr.map((dataItem, index) => {
                        // dataItem.cosFileList.map((item) => {
                        //     console.log('item--', item)
                        // })
                    })}

                    {this.state.activeTab !== TAB_INDEX_PRIVATE && isLoading && <div className={styles.toLogin}>
                        <FormattedMessage
                            defaultMessage="Loading in progress, please wait"
                            description=""
                            id="gui.library.loadingMessage"
                        />
                    </div>}

                    {this.state.activeTab !== TAB_INDEX_PRIVATE && !isLoading && ccMaterialArr && ccMaterialArr.length === 0 &&
                        (isOnLine ? <div className={styles.toLogin}>
                            <FormattedMessage
                                defaultMessage="No material is available"
                                description=""
                                id="gui.library.noMaterial"
                            />
                        </div>
                            :
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <img src={require('./offline.png')} style={{ width: '190px', height: '185px', margin: '100px auto 30px' }} />
                                <div>
                                    <FormattedMessage
                                        defaultMessage="No visible content, please connect to the Internet."
                                        description=""
                                        id="gui.library.connectNet"
                                    />
                                </div>
                            </div>)
                    }

                    {/* 个人素材 ---未登录 */}
                    {this.state.activeTab === TAB_INDEX_PRIVATE && !loginStatus && isOnLine && <div className={styles.toLogin}>
                        <div>
                            <FormattedMessage
                                defaultMessage="Log in to upload your local materials"
                                description=""
                                id="gui.library.noLoginPrompt"
                            />
                        </div>
                        <ButtonComponent className={styles.toLoginBtn} onClick={this.handleToLogin}>
                            <FormattedMessage
                                defaultMessage="Login"
                                description=""
                                id="gui.library.login"
                            />
                        </ButtonComponent>
                    </div>}

                    {/* 个人素材 ---已登录 */}
                    {(this.state.activeTab === TAB_INDEX_PRIVATE && (loginStatus || !isOnLine)) &&
                        <UploadPane
                            onClick={onFileUploadClick}
                            fileAccept={fileAccept}
                            fileChange={this.handleFileChange}
                            fileInput={fileInput}
                            className={styles.libraryLocalUpload}
                            id={'fileSelect'}
                        >
                            <Box>
                                <img src={iconUpload} />
                                <div className={styles.uploadText}>
                                    <div>{uploadLabel}</div>
                                    <div>{uploadLimit}</div>
                                </div>
                            </Box>
                        </UploadPane>}
                    {this.state.activeTab === TAB_INDEX_PRIVATE && (loginStatus || !isOnLine) && (libraryType !== 'custom') && userMaterialArr.map((dataItem, index) => {
                        // console.log('dataItem-', dataItem)
                        return (
                            <LibraryItem
                                description={dataItem.description}
                                disabled={dataItem.disabled}
                                featured={dataItem.featured}
                                // iconURL={materialType === 'A' ? dataItem.iconSoundPic : dataItem.url}   // 为音效库时，直接使用本地图片
                                iconURL={materialType === 'A' ? (this.props.isOnLine ? dataItem.iconSoundPic : bigSound) : (this.props.isOnLine ? dataItem.url : 'file://' + dataItem.url)}   // 为音效库时，直接使用本地图片
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
                                showDelete={(dataItem.url === loadingUrl || dataItem.url === spinnerUrl || dataItem.iconSoundPic === spinnerUrl) ? false : true}
                                materialType={materialType}
                                isOnLine={isOnLine}
                            />
                        )
                    })}
                    {this.state.activeTab === TAB_INDEX_PRIVATE && (loginStatus || !isOnLine) && (libraryType === 'custom') && userMaterialArr.map((dataItem, index) => {
                        return dataItem.cosFileList && dataItem.cosFileList.map((item, index) => {
                            // console.log('dataItem--', item)
                            return (
                                <LibraryItem
                                    description={dataItem.description}
                                    disabled={dataItem.disabled}
                                    featured={dataItem.featured}
                                    iconURL={this.props.isOnLine ? item.url : 'file://' + item.url}
                                    id={index}
                                    key={`item_${index}`}
                                    name={item.fileName}
                                    onBlur={this.handleBlur}
                                    onFocus={this.handleFocus}
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave}
                                    onSelect={() => this.handleSelect(item)}
                                    onDelete={this.handleDelete}
                                    materialUUID={dataItem.materialUUID}   // 删除用
                                    showDelete={(dataItem.url === loadingUrl || dataItem.url === spinnerUrl) ? false : true}
                                    isOnLine={isOnLine}
                                />
                            )
                        })
                    })}

                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                        return <div key={index} className={styles.fullPosition}></div>
                    })}
                </div>
            </Modal>
            :
            <Modal
                isOpen={true}
                className={styles.libraryModal}
                onRequestClose={null}
                visiableTitle={true}
                title={this.props.intl.formatMessage(messages.tipsTitle)}
                id='libraryModal'
                contentLabel='libraryModal'>
                <div className={styles.remmindText}>
                    <FormattedMessage
                        defaultMessage="Are you sure to delete "
                        description=""
                        id="gui.sprite.delete.prefix"
                    />
                    {materialName}
                    <FormattedMessage
                        defaultMessage="？"
                        description=""
                        id="gui.sprite.delete.suffix"
                    />
                </div>
                <div>
                    <ButtonComponent className={styles.libraryBtn} size={'small'} style={{ marginRight: '20px' }} onClick={this.handleUnDelete}>
                        <FormattedMessage
                            defaultMessage="Cancel"
                            description=""
                            id="gui.sprite.cancel"
                        /></ButtonComponent>
                    <ButtonComponent type={'default'} size={'small'} className={styles.libraryBtn} onClick={this.handleComfirmDelete}>
                        <FormattedMessage
                            defaultMessage="OK"
                            description=""
                            id="gui.sprite.ok"
                        /></ButtonComponent>
                </div>
            </Modal>
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
    filterable: PropTypes.bool,
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    libraryType: PropTypes.string,
    fileAccept: PropTypes.string,
    fileInput: PropTypes.func,
    onUpload: PropTypes.func,
    onFileUploadClick: PropTypes.func,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    onLibraryTabSelect: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired
};

LibraryComponent.defaultProps = {
    filterable: true
};

const mapStateToProps = state => ({
    authInfo: state.scratchGui.loginRegister.authInfo,
    loginStatus: state.scratchGui.loginRegister.loginStatus,
    isOnLine: state.scratchGui.netStatus.isOnLine
});

const mapDispatchToProps = dispatch => ({
    onSetUserTab: tab => dispatch(setUserTab(tab)),
    onActivateTab: tabIndex => {
        dispatch(activateTab(tabIndex));
    },
    openSoundRecorder: () => {
        dispatch(openSoundRecorder());
    }
})

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(LibraryComponent));
