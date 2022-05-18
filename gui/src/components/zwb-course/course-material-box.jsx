import classNames from 'classnames';
import React from 'react';
import styles from './course-material-box.css';
import bindAll from 'lodash.bindall';
import PropTypes, { func } from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl,  } from 'react-intl';
import iconRight from './image/icon_arrow_right.png';
import iconLeft from './image/icon_arrow_left.png';
import picConnotPreview from './image/icon_cnfind.png';
import iconZoom from './image/icon_zoom.png';
import iconZoomBig from './image/icon_zoom_big.svg';
import VideoPreview from './video-preview.jsx'

import { sortWithSortNo } from '../../lib/utils';
import { tcCos, tcVod, getObjectUrl, initvideo } from '../../lib/txcloud.js'; 

/**
 * 素材预览
 * 
 */

class CourseMaterialBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materialType: '',// WORD  PPT PIC VIDEO UNUSE
            meterialPicList: null,//word，ppt图片数组
            meterialPicCosUrl: null,//Pic素材cosurl
            pptPicListAtIndex: 0,//PPT页码
            wordPicListIndex: 5,//word显示的页码4
        }
        bindAll(this, [
            'handleToLeft',
            'handleToRight',
            'handleScroll',
            'handleOnFullscreen',
            'handleClearVod'
        ]);

    }

    componentDidMount() {
        if(this.props.courseMaterialInfo&&this.props.courseMaterialInfo.courseMaterialBasicInfo) {
            this.updateMaterialType(this.props.courseMaterialInfo);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.courseMaterialInfo) !== JSON.stringify(nextProps.courseMaterialInfo)) {
            this.setState({ materialType: '' }, () => {
                this.updateMaterialType(nextProps.courseMaterialInfo);
            })
        }

        // if (JSON.stringify(nextProps.course_material_data) !== '{}') {
        //     console.log('.nextProps.course_material_data--', nextProps.course_material_data)
        //     this.setState({ ...nextProps.course_material_data });
        //     this.props.onUpdateCourseMaterialBoxData({});
        // }
    }

    componentWillUnmount() {
        this.handleClearVod();
        // if (this.props.onUpdateCourseMaterialBoxData){
        //     console.log('sdfasdfsa')
        //     this.props.onUpdateCourseMaterialBoxData(this.state);
        // }
    }

    updateMaterialType(courseMaterialInfo) {
        if(courseMaterialInfo.courseMaterialBasicInfo==null){
            return;
        }
        const { authInfo } = this.props;

        let courseMaterialType = courseMaterialInfo.courseMaterialBasicInfo.courseMaterialType;

        // 素材类型   DOCUMENT(包括WORD,PPT,PDF) PIC VIDEO AUDIO ZIP
        if (courseMaterialType === 'DOCUMENT') {
            const courseMaterialCosFile = courseMaterialInfo.courseMaterialCosFile;
            const courseMaterialCosFileConvertedList = courseMaterialInfo.courseMaterialCosFileConvertedList;
            // 当素材类型是DOCUMENT时，通过文件后缀名判断具体是哪种类型
            this.handleDocument(authInfo, courseMaterialCosFile, courseMaterialCosFileConvertedList);
        } else if (courseMaterialType === 'PIC') {
            const courseMaterialCosFile = courseMaterialInfo.courseMaterialCosFile;
            // 处理图片类型
            this.handlePic(authInfo, courseMaterialCosFile);
        } else if (courseMaterialType === 'VIDEO') {
            if (courseMaterialInfo && courseMaterialInfo.courseMaterialVodFile && courseMaterialInfo.courseMaterialVodFile.videoFileId) {
                let fileId = courseMaterialInfo.courseMaterialVodFile.videoFileId;
                // 处理视频类型
                this.handleVideo(authInfo, fileId);
            }
        }
    }

    handleClearVod() {
        this.setState({ materialType: '' });
        if (this.player) {
            this.player.dispose();
            this.player = null;
        }
    }

    handleVideo(authInfo, fileId) {
        this.setState({ materialType: 'VIDEO' });
        tcVod.getSignature({
            authInfo,
            fileId,
            callBack: (res) => {
                if (res.errorCode === 0) {
                    this.player = initvideo({ fileID: fileId, ...res.data });
                } else if (res.errorCode === 9033001) {   // 未完成转码
                    this.setState({ materialType: 'UNUSE' });
                } else {
                    // .....
                }
            }
        });

    }

    handleDocument(authInfo, courseMaterialCosFile, courseMaterialCosFileConvertedList) {
        // 包括WORD, PPT, PDF
        const fileName = courseMaterialCosFile.fileName;
        if (fileName) {
            const lastIndex = fileName.lastIndexOf('.'); //取到文件名开始到最后一个点的长度
            const fileNameLength = fileName.length; //取到文件名长度
            const fileFormat = fileName.substring(lastIndex + 1, fileNameLength);
            if (!courseMaterialCosFileConvertedList) {
                this.setState({ materialType: 'UNUSE' });
                return
            }
            const convertedList = sortWithSortNo(courseMaterialCosFileConvertedList).reverse();
            // pdf doc docx docm ppt pptx
            if (fileFormat.toLowerCase() === 'pdf' || fileFormat.toLowerCase() === 'doc' || fileFormat.toLowerCase() === 'docx' || fileFormat.toLowerCase() === 'docm') {
                this.setState({
                    materialType: 'WORD',
                    meterialPicList: convertedList
                });
            } else if (fileFormat.toLowerCase() === 'ppt' || fileFormat.toLowerCase() === 'pptx') {
                this.setState({
                    materialType: 'PPT',
                    meterialPicList: convertedList
                });
            }
        } else {
            this.setState({ materialType: 'UNUSE' });
        }
    }

    handlePic(authInfo, courseMaterialCosFile) {
        this.setState({ materialType: 'PIC', meterialPicCosUrl: courseMaterialCosFile.cosUrl });
        this.cos = tcCos(authInfo, courseMaterialCosFile.cosBucketName);
        getObjectUrl(this.cos, courseMaterialCosFile.cosBucketName, courseMaterialCosFile.cosKey).then((url) => {
            this.setState({
                materialType: 'PIC',
                meterialPicCosUrl: url
            });
        }, (err) => {
            console.log('err--', err);
        });
    }

    //ppt左右切换
    handleToLeft() {
        const { pptPicListAtIndex } = this.state;
        if (pptPicListAtIndex > 0) {
            this.setState({
                pptPicListAtIndex: pptPicListAtIndex - 1
            })
        }
    }
    
    handleToRight() {
        const { pptPicListAtIndex, meterialPicList } = this.state;
        if (pptPicListAtIndex < meterialPicList.length - 1) {
            this.setState({
                pptPicListAtIndex: pptPicListAtIndex + 1
            })
        }
    }
    //word上下滚动
    handleScroll(e) {
        const scrollHeight = e.target.scrollHeight;
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;

        // scrollHeight(滚动内容高度) = scrollTop(滚动条滚动高度) + clientHeight(可视区域高度)
        if ((scrollHeight < (scrollTop + clientHeight + 300)) && (this.state.wordPicListIndex < this.state.meterialPicList.length)) {
            this.setState({
                wordPicListIndex: this.state.wordPicListIndex + 3
            });
        }
    }

    handleOnFullscreen() {
        if(this.props.onFullscreen){
            this.props.onFullscreen(!this.props.isFullscreen);
        }
    }

    render() {
        const {
            className,
            showFullscreenBar,
            isFullscreen,
            showisFullscreen,
            loginStatus,
            type
        } = this.props;

        const { 
            materialType,
            meterialPicList,
            meterialPicCosUrl,
            pptPicListAtIndex,
        } = this.state;

        return (
            <div
                className={classNames(
                    styles.courseMaterialBox,
                    className
                )}
                onScroll={this.handleScroll}
            >
                {/* word文档 */}
                {materialType === 'WORD' && <div className={classNames(
                    styles.wordBox,
                    isFullscreen&&styles.boxHeightFullscreen
                )}>
                    {meterialPicList && meterialPicList.length > 0 && meterialPicList.map((item, index) => {
                        return item.cosUrl && <div key={index}><img src={'https://' + item.cosUrl} alt='' /></div>
                    })}
                </div>}

                {/* 图片 */}
                {materialType === 'PIC' && <div className={classNames(
                    styles.imgBox,
                    isFullscreen&&styles.boxHeightFullscreen
                )}>
                    {meterialPicCosUrl && <img src={meterialPicCosUrl} alt='' />}
                </div>}

                {/* PPT */}
                {materialType === 'PPT' && meterialPicList && meterialPicList.length > 0 && <div className={classNames(
                    styles.pptBox,
                    isFullscreen&&styles.boxHeightFullscreen
                )}>
                    {meterialPicList && meterialPicList.length > 0 && <img src={'https://' + meterialPicList[pptPicListAtIndex].cosUrl} alt='' />}
                    {(pptPicListAtIndex !== 0) && <div className={styles.toLeftContainer}>
                        <span className={styles.toLeft} onClick={this.handleToLeft}><img src={iconLeft} alt='' /></span>
                    </div>}
                    {(pptPicListAtIndex !== (meterialPicList.length - 1)) && <div className={styles.toRightContainer}>
                        <span className={styles.toRight} onClick={this.handleToRight}><img src={iconRight} alt='' /></span>
                    </div>}
                </div>}

                {/* 视频 */}
                {materialType === 'VIDEO' && <div className={classNames(
                    styles.videoBox,
                    isFullscreen&&styles.boxHeightFullscreen
                )}>
                    <VideoPreview onClearVod={ this.handleClearVod }></VideoPreview>
                </div>}

                {/* 无法预览 */}
                {materialType === 'UNUSE' && <div className={classNames(
                    styles.cannotPreview,
                    isFullscreen&&styles.boxHeightFullscreen
                )}>
                    <div>
                        <img className={styles.cannotPreviewImg} src={picConnotPreview} alt='' />
                        <div className={styles.cannotPreviewText}>
                            <FormattedMessage
                                defaultMessage="Temproarily unable to preview"
                                id="gui.coursePage.connotPreview"
                            />
                        </div>
                    </div>
                </div>}

                {/* 放大缩小工具栏 */}
                {
                    showisFullscreen && <div className={materialType === 'VIDEO' ? styles.toolBarVideo : styles.toolBar}>
                        <div className={styles.fullscreenBtn} onClick={this.handleOnFullscreen}>
                            <img className={classNames(styles.fullscreenIcon)} src={isFullscreen ? iconZoomBig : iconZoom}>
                            </img>
                        </div>
                    </div>
                }

            </div>
        )
    }

}

CourseMaterialBox.propTypes = {
    courseMaterialInfo: PropTypes.object,
}

export default injectIntl(CourseMaterialBox);

