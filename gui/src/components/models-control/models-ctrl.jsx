import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './models-ctrl.css';

import { defineMessages, injectIntl } from 'react-intl';

import Box from '../box/box.jsx';

import addImage from './icon_add@2x.png';

import ModelItemView from './model-item.jsx';

const ModelsCustomView = props => {

    const messages = defineMessages({
        addModelButton: {
            id: 'gui.modelExtension.addModelButton',
            defaultMessage: 'Model'
        },
        imgModelButton: {
            id: 'gui.modelExtension.imgModelButton',
            defaultMessage: 'Image Classification Model'
        },
        objModelButton: {
            id: 'gui.modelExtension.objModelButton',
            defaultMessage: 'Object Detection Model'
        },
        deviceTrainButton: {
            id: 'gui.modelExtension.deviceTrainButton',
            defaultMessage: 'On-device training'
        },
        saveText: {
            id: 'gui.modelExtension.saveText',
            defaultMessage: 'Save'
        },
        cancelText: {
            id: 'gui.modelExtension.cancelText',
            defaultMessage: 'Cancel'
        }
    });

    const {
        vm,
        intl,
        type,
        onAddModel,
        onDeleteModel,
        onEditModel,
        dataSource = [],

        onSave,
        onCancelSave,

        ...otherProps
    } = props;

    // 标题
    let title;
    if (type == 0){
        title = intl.formatMessage(messages.imgModelButton);
    }else if(type == 1){
        title = intl.formatMessage(messages.objModelButton);
    }else if(type == 2){
        title = intl.formatMessage(messages.deviceTrainButton);
    }else{
        title = '';
    }

    return (
        <Box className={styles.modelsCtrlWrapper}>

            <Box className={styles.modelsHeader}>
                <span className={styles.modelsHeaderTitle}>
                    {title}
                </span>
                <span className={styles.modelAddBtn} onClick={onAddModel}>
                    <img src={addImage} />
                    {intl.formatMessage(messages.addModelButton)}
                </span>
            </Box>

            <Box className={styles.modelsCtrlContent}>
                <Box className={styles.modelsList}>
                    {dataSource.map((info, index) => {
                        return (
                            <ModelItemView
                                vm={vm}
                                index={index}
                                model={info}
                                modelType={type}
                                onEditModel={onEditModel}
                                onDeleteModel={onDeleteModel}
                            />
                        )
                    })}
                </Box>
            </Box>

            <Box className={styles.modelsBottom}>
                <div className={classNames(styles.button, styles.cancel)} onClick={onCancelSave}>{intl.formatMessage(messages.cancelText)}</div>
                <div className={classNames(styles.button, styles.save)} onClick={onSave}>{intl.formatMessage(messages.saveText)}</div>
            </Box>

        </Box>
    )
}


export default injectIntl(ModelsCustomView);
