import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import InputLabel from '../forms/input-label.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import DirectionPicker from '../../containers/direction-picker.jsx';

import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import { STAGE_DISPLAY_SIZES } from '../../lib/layout-constants.js';
import { isWideLocale } from '../../lib/locale-utils.js';

import getCostumeUrl from '../../lib/get-costume-url';

import styles from './sprite-info.css';

import xIcon from './icon--x.svg';
import yIcon from './icon--y.svg';
// import showIcon from './icon--show.svg';
// import hideIcon from './icon--hide.svg';

import showIcon from './icon_stage_eye_open_n@2x.png';
import hideIcon from './icon_stage_eye_close_n@2x.png';

import showIconFocus from './icon_stage_eye_open_s@2x.png';
import hideIconFocus from './icon_stage_eye_close_s@2x.png';

const BufferedInput = BufferedInputHOC(Input);

const BufferedLabelInput = BufferedInputHOC(InputLabel);

const messages = defineMessages({
    spritePlaceholder: {
        id: 'gui.SpriteInfo.spritePlaceholder',
        defaultMessage: 'Name',
        description: 'Placeholder text for sprite name'
    }
});

class SpriteInfo extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (
            this.props.rotationStyle !== nextProps.rotationStyle ||
            this.props.direction !== nextProps.direction ||
            this.props.disabled !== nextProps.disabled ||
            this.props.name !== nextProps.name ||
            this.props.size !== nextProps.size ||
            this.props.stageSize !== nextProps.stageSize ||
            this.props.visible !== nextProps.visible ||
            this.props.x !== nextProps.x ||
            this.props.y !== nextProps.y
        );
    }

    getCostumeData() {
        if (this.props.costume &&
            this.props.costume.asset) {
            return getCostumeUrl(this.props.costume.asset);
        } else {
            return null;
        }
    }

    render() {
        const {
            stageSize
        } = this.props;

        const sprite = (
            <FormattedMessage
                defaultMessage="Sprite"
                description="Sprite info label"
                id="gui.SpriteInfo.sprite"
            />
        );
        const showLabel = (
            <FormattedMessage
                defaultMessage="Show"
                description="Sprite info show label"
                id="gui.SpriteInfo.show"
            />
        );
        const sizeLabel = (
            <FormattedMessage
                defaultMessage="Size"
                description="Sprite info size label"
                id="gui.SpriteInfo.size"
            />
        );

        const xLabel = (
            <FormattedMessage
                defaultMessage="x"
                description=""
                id="gui.SpriteInfo.x"
            />
        );

        const yLabel = (
            <FormattedMessage
                defaultMessage="y"
                description=""
                id="gui.SpriteInfo.y"
            />
        );

        // const spriteCostumeUrl = this.getCostumeData();

        const labelAbove = isWideLocale(this.props.intl.locale);

        const spriteNameInput = (
            // <Box className={ styles.spriteInputWrap}>
            //     {/* <img src={spriteCostumeUrl}/> */}
            // </Box>
            <BufferedInput
                className={classNames(
                    styles.spriteInput,
                    {
                        [styles.columnInput]: labelAbove
                    }
                )}
                disabled={this.props.disabled}
                placeholder={this.props.intl.formatMessage(messages.spritePlaceholder)}
                tabIndex="0"
                type="text"
                value={this.props.disabled ? '' : this.props.name}
                onSubmit={this.props.onChangeName}
                maxLength={20}
            />
        );

        const xPosition = (
            <div className={styles.group}>
                <BufferedLabelInput
                    className={styles.xyInput}
                    inputwrapclassname={styles.xyInputWrap}
                    inputlabelclassname={styles.xyInputLabel}
                    small
                    disabled={this.props.disabled}
                    label={'x'}
                    placeholder="x"
                    tabIndex="0"
                    type="text"
                    value={this.props.disabled ? '' : this.props.x}
                    onSubmit={this.props.onChangeX}
                />
            </div>
        );

        const yPosition = (
            <div className={styles.group}>
                <BufferedLabelInput
                    className={styles.xyInput}
                    inputwrapclassname={styles.xyInputWrap}
                    inputlabelclassname={styles.xyInputLabel}
                    small
                    disabled={this.props.disabled}
                    label={'y'}
                    placeholder="y"
                    tabIndex="0"
                    type="text"
                    value={this.props.disabled ? '' : this.props.y}
                    onSubmit={this.props.onChangeY}
                />
            </div>
        );

        const radio = (
            <div
                className={styles.radio}
            // tabIndex="0"
            // onClick={this.props.visible ? this.props.onClickNotVisible : this.props.onClickVisible}
            // onKeyPress={this.props.onPressVisible}
            >

            </div>
        );

        return (
            <Box className={styles.spriteInfo}>
                <div className={classNames(styles.column, styles.rowPrimary)}>
                    <div className={styles.group}>
                        {spriteNameInput}
                    </div>
                    <div className={classNames(styles.group)}>
                        <img
                            className={styles.icon}
                            src={this.props.visible ? showIconFocus : showIcon}
                            onClick={this.props.onClickVisible}
                        />
                        <span style={{ marginLeft: "0.63rem" }} />
                        <img
                            className={styles.icon}
                            src={!this.props.visible ? hideIconFocus : hideIcon}
                            onClick={this.props.onClickNotVisible}
                        />
                    </div>
                </div>
                <div className={classNames(styles.row)}>
                    {xPosition}
                    {yPosition}
                </div>
                <div className={classNames(styles.column, styles.rowPrimary2)}>
                    <div className={classNames(styles.group)}>
                        <BufferedLabelInput
                            className={styles.sdInput}
                            inputwrapclassname={styles.sdInputWrap}
                            inputlabelclassname={styles.sdInputLabel}
                            small
                            disabled={this.props.disabled}
                            label={sizeLabel}
                            tabIndex="0"
                            type="text"
                            value={this.props.disabled ? '' : this.props.size}
                            onSubmit={this.props.onChangeSize}
                        />
                    </div>
                    <div className={classNames(styles.group, styles.rowPrimary)}>
                        <DirectionPicker
                            direction={this.props.direction}
                            disabled={this.props.disabled}
                            labelAbove={labelAbove}
                            rotationStyle={this.props.rotationStyle}
                            onChangeDirection={this.props.onChangeDirection}
                            onChangeRotationStyle={this.props.onChangeRotationStyle}
                        />
                    </div>
                </div>

            </Box>
        );
    }
}

SpriteInfo.propTypes = {
    direction: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    intl: intlShape,
    name: PropTypes.string,
    onChangeDirection: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeRotationStyle: PropTypes.func,
    onChangeSize: PropTypes.func,
    onChangeX: PropTypes.func,
    onChangeY: PropTypes.func,
    onClickNotVisible: PropTypes.func,
    onClickVisible: PropTypes.func,
    onPressNotVisible: PropTypes.func,
    onPressVisible: PropTypes.func,
    rotationStyle: PropTypes.string,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    visible: PropTypes.bool,
    x: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    y: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default injectIntl(SpriteInfo);
