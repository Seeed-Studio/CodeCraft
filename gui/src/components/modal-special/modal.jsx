import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import { FormattedMessage } from 'react-intl';

import styles from './modal.css';

const ModalComponent = props => {

    const {
        children,
        className,
        contentLabel,
        fullScreen = false,
        headerClassName,
        headerImage,
        isRtl,
        onHelp,
        onRequestClose,
        visiableTitle,
        cancelable = true,
        topTitle,
        title,
        showReturn,
        showMin,
        showClose,
        onClose,
        toBack,
        isBackdrop = true,
        overlayClassName
    } = props;

    return (<ReactModal
        isOpen={true}
        className={classNames(styles.modalContent, className, {
            [styles.fullScreen]: fullScreen
        })}
        contentLabel={contentLabel}
        overlayClassName={classNames(styles.modalOverlay, overlayClassName)}
        onRequestClose={isBackdrop ? onRequestClose : null}
        /* Boolean indicating if the overlay should close the modal. Defaults to true. */
        shouldCloseOnOverlayClick={cancelable}
        /* Boolean indicating if pressing the esc key should close the modal */
        shouldCloseOnEsc={cancelable}
    >
        <div className={styles.rightTopBar}>
            {showMin &&
                <spsn className={styles.titleMin}>
                    <img src={require('./icon_min.png')} alt="" />
                </spsn>}
            {showClose &&
                <span
                    onClick={onClose || onRequestClose}
                    className={styles.titleClose}>
                    <img src={require('./icon_del.png')} alt="" />
                </span>}
        </div>
        {visiableTitle &&
            <div className={styles.titleContainer}>
                {topTitle &&
                    <span className={styles.titleTopText}>
                        {topTitle}
                    </span>}
                {title &&
                    <span className={styles.titleText}>
                        {showReturn &&
                            <span className={styles.titleReture} onClick={toBack}>
                                <img src={require('./icon_return.png')} alt="" />
                            </span>}
                        <span>{title}</span>
                    </span>}
            </div>
        }
        <div className={styles.modalDetails}>
            {children}
        </div>
    </ReactModal>);
}

ModalComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    contentLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    fullScreen: PropTypes.bool,
    headerClassName: PropTypes.string,
    headerImage: PropTypes.string,
    isRtl: PropTypes.bool,
    onHelp: PropTypes.func,
    onRequestClose: PropTypes.func,

    cancelable: PropTypes.bool,      // 是否可以取消
    topTitle: PropTypes.string,      // 顶部弹窗标题
    // title: PropTypes.string,         // 弹窗标题
    showReturn: PropTypes.bool,      // 显示返回按钮
    showMin: PropTypes.bool,         // 显示最小化按钮
    showClose: PropTypes.bool,       // 显示关闭弹窗按钮
    onClose: PropTypes.func,         // 点击 x 关闭弹窗
    toBack: PropTypes.func,          // 返回按钮
    visiableTitle: PropTypes.bool,   // 是否显示标题
};

export default ModalComponent;
