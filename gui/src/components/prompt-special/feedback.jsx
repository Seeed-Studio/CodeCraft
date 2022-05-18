import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button-special/button.jsx';
import Modal from '../../containers/modal.jsx';
import ModalComponent from '../../containers/modal.jsx';
import styles from './feedback.css';
import selected from './selected.png'
import select from './select.png'
import { getPackageConfig } from '../../lib/package-config.js';
import Progress from '../progress/progress.js';
const FeedbackComponent = (props) => {

    let isViewSuggestedExamples = false

    const fileAccept = '.gz,.zip,.dmg,.7z'

    const feedbackLabel = (
        <FormattedMessage
            defaultMessage="Feedback"
            description=""
            id="gui.feedback.label"
        />
    );
    const packageConfig = getPackageConfig();
    const messages = defineMessages({
        currentVersion: {
            defaultMessage: 'Codecraft：v',
            description: '',
            id: 'gui.feedback.currentVersion'
        },
        placeholderText: {
            defaultMessage: 'Please write down your feedback here.',
            description: '',
            id: 'gui.feedback.placeholder'
        },
        cancelText: {
            defaultMessage: 'cancel',
            description: '',
            id: 'gui.feedback.cancel'
        },
        okText: {
            defaultMessage: 'Submit',
            description: '',
            id: 'gui.feedback.ok'
        },
        suggestedExamples: {
            defaultMessage: 'How to describe the problem',
            description: '',
            id: 'gui.feedback.suggestedExamples'
        },
        uploadTips: {
            defaultMessage: 'Submit attachments (pictures, videos, ZIP, RAR, CDC...not more than 20M)',
            description: '',
            id: 'gui.feedback.uploadTips'
        },
        buttonUploadFiles: {
            defaultMessage: 'Upload',
            description: '',
            id: 'gui.feedback.buttonUploadFiles'
        },
        deleteUploadFiles: {
            defaultMessage: 'Delete',
            description: '',
            id: 'gui.feedback.deleteUploadFiles'
        },
        buttonUploadFilesed: {
            defaultMessage: 'Upload',
            description: '',
            id: 'gui.feedback.buttonUploadFilesed'
        },
        submitCurrentProgram: {
            defaultMessage: 'Submit the current program at the same time',
            description: '',
            id: 'gui.feedback.submitCurrentProgram'
        },
        suggestedExamplesContentTitle: {
            defaultMessage: 'Describe the Issue',
            description: '',
            id: 'gui.feedback.suggestedExamplesContentTitle'
        },
        suggestedExamplesContentExpect: {
            defaultMessage: ' a) What did you expect to happen? or What did you want to happen?',
            description: '',
            id: 'gui.feedback.suggestedExamplesContentExpect'
        },
        suggestedExamplesContentResult: {
            defaultMessage: 'b) What happened instead?',
            description: '',
            id: 'gui.feedback.suggestedExamplesContentResult'
        },
        suggestedExamplesContentStep: {
            defaultMessage: 'Describe steps to reproduce the issue ',
            description: '',
            id: 'gui.feedback.suggestedExamplesContentStep'
        },
        suggestedExamplesContentSpecific: {
            defaultMessage: 'You can be written in text, preferably supported with screenshots/photos/videos.',
            description: '',
            id: 'gui.feedback.suggestedExamplesContentSpecific'
        },
        suggestedExamplesContentUpload: {
            defaultMessage: 'You can put multiple files to .zip archive and attach them with your inquiry.',
            description: '',
            id: 'gui.feedback.suggestedExamplesContentUpload'
        },
        suggestedExamplesContentExample: {
            defaultMessage: 'e.g.',
            description: '',
            id: 'gui.feedback.suggestedExamplesContentExample'
        },
        suggestedExamplesContentFirst: {
            defaultMessage: "1. Go to ...",
            description: '',
            id: 'gui.feedback.suggestedExamplesContentFirst'
        },
        suggestedExamplesContentSecond: {
            defaultMessage: " 2. Click on ...",
            description: '',
            id: 'gui.feedback.suggestedExamplesContentSecond'
        },
        suggestedExamplesContentThird: {
            defaultMessage: "3. Connect ...",
            description: '',
            id: 'gui.feedback.suggestedExamplesContentThird'
        },
        fileLarge: {
            defaultMessage: "The file is too large",
            description: '',
            id: 'gui.feedback.fileLarge'
        },
        fileUploading: {
            defaultMessage: "Uploading",
            description: '',
            id: 'gui.feedback.fileUploading'
        },
    });

    const textareaChange = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <ModalComponent
            isOpen={true}
            className={styles.feedbackModal}
            showClose={true}
            onRequestClose={props.onCancel}
            visiableTitle={true}
            title={feedbackLabel}
            id='feedbackModal'
            contentLabel='feedbackModal'
        >
            <Box className={styles.body}>
                <Box className={styles.feedbackHeader}>
                    <div className={styles.currentVersion}>
                        {props.intl.formatMessage(messages.currentVersion)}{packageConfig.channelVersion}
                    </div>
                    <div className={styles.suggestedExamples} 
                        onMouseEnter={props.onMouseEnter}
                        onMouseLeave={props.onMouseLeave}
                        >
                        {props.intl.formatMessage(messages.suggestedExamples)}
                    </div>
                </Box>
                <Box className={styles.inputWrapper}>
                    <textarea 
                        onChange={textareaChange} 
                        placeholder={props.intl.formatMessage(messages.placeholderText)} 
                        value={props.feedbackText} 
                        maxLength={400} />
                    {
                    props.isViewSuggestedExamples && <Box className={styles.inputWrapperExamples}>
                        <div> {props.intl.formatMessage(messages.suggestedExamplesContentTitle)}</div>
                        <div>&nbsp;&nbsp;{props.intl.formatMessage(messages.suggestedExamplesContentExpect)}</div>
                        <div>&nbsp;&nbsp;{props.intl.formatMessage(messages.suggestedExamplesContentResult)}</div>
                        <div>{props.intl.formatMessage(messages.suggestedExamplesContentStep)}</div>
                        <div>{props.intl.formatMessage(messages.suggestedExamplesContentSpecific)}</div>
                        <div>{props.intl.formatMessage(messages.suggestedExamplesContentUpload)}</div>
                        <div>{props.intl.formatMessage(messages.suggestedExamplesContentExample)}</div>
                        <div>&nbsp;&nbsp;{props.intl.formatMessage(messages.suggestedExamplesContentFirst)}</div>
                        <div>&nbsp;&nbsp;{props.intl.formatMessage(messages.suggestedExamplesContentSecond)}</div>
                        <div>&nbsp;&nbsp;{props.intl.formatMessage(messages.suggestedExamplesContentThird)}</div>
                    </Box>
                    }
                    {
                        props.isFailsUploadFiles && <div className={styles.uploadFilesFail}>
                            {props.intl.formatMessage(messages.fileLarge)}
                         </div>
                    }
                </Box>
                <Box>
                
                </Box>
                <Box className={styles.uploadFiles}>
                    <div className={styles.uploadTips}>
                        
                        {
                            props.isLoadingUploadFiles==0 && <div>
                                {props.intl.formatMessage(messages.uploadTips)}
                            </div> 
                        }
                        {
                            props.isLoadingUploadFiles==1 && <Progress 
                                uploading={props.intl.formatMessage(messages.fileUploading)}
                                percentageNum={props.iwidth} 
                                progressName={props.feedBackfilesName} 
                            />
                        }
                        {
                            props.isLoadingUploadFiles==2 && <div>
                                {props.feedBackfilesName}
                            </div>
                        }
                    </div>
                    {
                        props.isLoadingUploadFiles==2 &&
                            <div className={styles.deleteButton} onClick={props.onFileDelete}>
                                    {props.intl.formatMessage(messages.deleteUploadFiles)}
                            </div>
                       
                    }
                    <div className={props.isLoadingUploadFiles!=2 ? styles.uploadButton : styles.uploadButtoned}>
                        <input 
                            type="file"
                            onChange={props.fileChange}
                            id={props.id}
                            className={styles.buttonUploadFiles}
                            placeholder={'上传'}
                            ref={props.fileInput}
                            accept={props.accept}
                        />
                        <div className={styles.uploadContent} onClick={props.handleFileInput}>
                            {props.isLoadingUploadFiles!=2 ? props.intl.formatMessage(messages.buttonUploadFiles) : props.intl.formatMessage(messages.buttonUploadFilesed)}
                        </div>
                    </div>
                </Box>
                {
                    !props.homePageVisible && <Box className={styles.submitCurrentProgram}  onClick={props.onUploadCurrentProgram}> 
                        {
                            props.isUploadCurrentProgram &&  <img src={selected}/>
                        }
                        {
                            !props.isUploadCurrentProgram && <img src={select}/>
                        }
                        <div>
                            {props.intl.formatMessage(messages.submitCurrentProgram)}
                        </div>
                    </Box>
                }
                
                
            </Box>
            <Box className={styles.buttonRow}>
                    <Button
                        type='default'
                        size={'small'}
                        className={styles.buttonCancel}
                        onClick={props.onCancel}
                    >
                        {props.intl.formatMessage(messages.cancelText)}
                    </Button>
                    <Button
                        type='primary'
                        size={'small'}
                        className={styles.buttonOk}
                        onClick={props.onOk}
                        disabled={(props.feedbackText.length === 0 || props.isLoadingUploadFiles==1) ? true : false}
                    >
                        {props.intl.formatMessage(messages.okText)}
                    </Button>
                </Box>
        </ModalComponent>
    );
}

FeedbackComponent.propTypes = {
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    cancelLabel: PropTypes.string,
    okLabel: PropTypes.string,
    homePageVisible: PropTypes.bool

};

export default injectIntl(FeedbackComponent);
