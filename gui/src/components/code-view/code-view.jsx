import React from 'react';
import classNames from 'classnames';
import styles from './code-view.css';
import { defineMessages, injectIntl } from 'react-intl';

// import UploadCode from '../../containers/upload-code.jsx';

const CodeViewComponent = props => {

    let messages = defineMessages({
        downloadBtnText: {
            defaultMessage: 'Download',
            id: 'gui.workspace.codeDownloadBtn'
        }
    });

    const {
        intl,
        onExportWorkspaceCode,
        codeLanguage = 'Python',
        visible: isShowCodeView = false
    } = props;

    const isCodePython = codeLanguage == 'Python';

    const codeView = (
        (
            <div
                className={classNames(
                    styles.codeViewBox,
                    isShowCodeView ? styles.show : styles.hide
                )}
                ref={props.setContainer}
            >
                <div className={classNames(styles.title)}>
                    <div className={classNames(styles.closeBt)} onClick={props.onClose} />
                    <span className={classNames(styles.titleText)}>
                        {codeLanguage}
                    </span>
                    {
                        isCodePython &&
                        <span className={styles.downloadBtn} onClick={onExportWorkspaceCode}>
                            {intl.formatMessage(messages.downloadBtnText)}
                        </span>
                    }
                </div>
                <div ref={props.setMonacoContainer} className={classNames(styles.monacoBox)} />
                {/* <div
                    className={classNames(styles.dragBt)}
                    onMouseDown={props.onMouseDown}
                    onMouseUp={props.onMouseUp}
                /> */}
                {/* <div className={styles.uploadWrapper}>
                    <UploadCode/>
                </div> */}
            </div>

        )
    )
    return codeView;
}

export default injectIntl(CodeViewComponent);