import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import VM from '../../../../vm/';
import SpriteList from '../sprite-selector/sprite-list.jsx';
import SpriteInfo from '../../containers/sprite-info.jsx';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import Divider from '../divider/divider.jsx';

import Prompt from '../prompt-special/prompt.jsx';

import SpriteLibrary from '../../containers/sprite-library.jsx';
import StageSelector from '../../containers/stage-selector.jsx';
import { STAGE_DISPLAY_SIZES } from '../../lib/layout-constants';

import { toasts } from '../toast-special/toast.jsx';

import styles from './target-pane.css';

import iconShape from './icon_shape.svg'
import iconSound from './icon_sound.svg'

import iconCancel from './icon-cancel.png'

const promptid = "89708732121342";
const contentLabel = "Sprite deletion confirmation"

import {
    TAB_SPRITE,
    TAB_BACKDROP
} from '../../reducers/stage-tab';

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = (props) => {

    const {
        editingTarget,
        fileInputRef,
        hoveredTarget,
        spriteLibraryVisible,
        onChangeSpriteDirection,
        onChangeSpriteName,
        onChangeSpriteRotationStyle,
        onChangeSpriteSize,
        onChangeSpriteVisibility,
        onChangeSpriteX,
        onChangeSpriteY,
        onAddSprite,
        onDeleteSprite,
        onDrop,
        onDuplicateSprite,
        onExportSprite,
        onFileUploadClick,
        onNewSpriteClick,
        onPaintSpriteClick,
        onRequestCloseSpriteLibrary,
        onSelectSprite,
        onSpriteUpload,
        onSurpriseSpriteClick,
        onClickCustom,
        onClickSound,
        costumesTabVisible,
        soundsTabVisible,
        raiseSprites,
        stage,
        stageSize,
        sprites,
        onPromptCanel,
        onPromptOk,
        isOpenDelConfirm,
        vm,
        isBackdrop,
        activeStageTab,
        onActivateStageTab,
        ...componentProps
    } = props;

    const tabClassNames = {
        tabs: styles.stageTabs,
        tab: classNames(tabStyles.reactTabsTab, styles.stageTab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.stageTabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.stageTabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };

    let allowRaised = false;
    if (isBackdrop) {
        allowRaised = !isBackdrop.isStage;
    }


    let selectedSprite = sprites[editingTarget];
    let spriteInfoDisabled = false;
    if (typeof selectedSprite === 'undefined') {
        selectedSprite = {};
        spriteInfoDisabled = true;
    }

    let isSmallSize = 'small' === stageSize;
    let spriteinfoWrapper = classNames(styles.spriteinfoWrapper
        , !isSmallSize
            ? styles.row : styles.column);

    let stageExtraWrapper = classNames(styles.stageExtraWrapper
        , !isSmallSize
            ? styles.column : styles.row);

    const isStage = vm.editingTarget ? vm.editingTarget.isStage : true;

    const costumeLabel = (
        <FormattedMessage
            defaultMessage="Costumes"
            description="Button to get to the costumes panel"
            id="gui.gui.costumesTab"
        />
    );
    const backdropLabel = (
        <FormattedMessage
            defaultMessage="Backdrops"
            description="Button to get to the backdrops panel"
            id="gui.gui.backdropsTab"
        />
    );
    const soundLabel = (
        <FormattedMessage
            defaultMessage="Sounds"
            description="Button to get to the sounds panel"
            id="gui.gui.soundsTab"
        />
    );

    const saveAndClose = (
        <FormattedMessage
            defaultMessage="Save"
            description=""
            id="gui.sprite.saveAndClose"
        />
    );

    const promptTitle = (
        <FormattedMessage
            defaultMessage="Prompt"
            description=""
            id="gui.target.sprite.promptLabel"
        />
    );

    const promptText = (
        <FormattedMessage
            defaultMessage="Would you like to delete this sprite?"
            description=""
            id="gui.sprite.prompt"
        />
    );

    const promptCancelText = (
        <FormattedMessage
            defaultMessage="Cancel"
            description=""
            id="gui.sprite.cancel"
        />
    );

    const promptOkText = (
        <FormattedMessage
            defaultMessage="OK"
            description=""
            id="gui.sprite.ok"
        />
    );

    const costume = selectedSprite.costume || {};

    // const spriteAndBackdropLargePane = (
    //     <Box className={classNames(styles.spriteAndBackdropWrapper, styles.large)}>
    //         <Box className={classNames(styles.spritesWrapper, styles.large)}>
    //             {stage.id && <StageSelector
    //                 asset={
    //                     stage.costume &&
    //                     stage.costume.asset
    //                 }
    //                 backdropCount={stage.costumeCount}
    //                 id={stage.id}
    //                 selected={stage.id === editingTarget}
    //                 onSelect={onSelectSprite}
    //             // raised={raiseSprites && allowRaised}
    //             />}
    //         </Box>
    //         <Box className={classNames(styles.sbDivider, styles.large)} />
    //         <Box className={styles.backdropWrapper}>
    //             <Box className={classNames(styles.backdropWrapperTitle, styles.large)}>
    //                 <FormattedMessage
    //                     defaultMessage="Sprites"
    //                     description="Label for the stage in the stage selector"
    //                     id="gui.stageSelector.stage"
    //                 />
    //             </Box>
    //             <Box className={styles.scrollWrapperLarge}>
    //                 <SpriteList
    //                     editingTarget={editingTarget}
    //                     hoveredTarget={hoveredTarget}
    //                     items={Object.keys(sprites).map(id => sprites[id]).filter(sprite => sprite.type === 'sprite')}
    //                     raised={raiseSprites && allowRaised}
    //                     selectedId={editingTarget}
    //                     onAddSprite={onAddSprite}
    //                     onDeleteSprite={onDeleteSprite}
    //                     onDrop={onDrop}
    //                     onDuplicateSprite={onDuplicateSprite}
    //                     onExportSprite={onExportSprite}
    //                     onSelectSprite={onSelectSprite}
    //                 />
    //             </Box>
    //         </Box>
    //     </Box>
    // );


    // const spriteAndBackdropSmallPane = (
    //     <Box className={classNames(styles.spriteAndBackdropWrapper, styles.small)}>
    //         <Box className={styles.spritesWrapper}>
    //             {stage.id && <StageSelector
    //                 asset={
    //                     stage.costume &&
    //                     stage.costume.asset
    //                 }
    //                 backdropCount={stage.costumeCount}
    //                 id={stage.id}
    //                 selected={stage.id === editingTarget}
    //                 onSelect={onSelectSprite}
    //             // raised={raiseSprites && allowRaised}
    //             />}
    //         </Box>
    //         <Box className={classNames(styles.backdropWrapper, styles.backdropWrapperTitle, styles.small)}>
    //             <FormattedMessage
    //                 defaultMessage="Sprites"
    //                 description="Label for the stage in the stage selector"
    //                 id="gui.stageSelector.stage"
    //             />
    //         </Box>
    //         <Box className={styles.scrollWrapperLarge}>
    //             <SpriteList
    //                 editingTarget={editingTarget}
    //                 hoveredTarget={hoveredTarget}
    //                 items={Object.keys(sprites).map(id => sprites[id]).filter(sprite => sprite.type === 'sprite')}
    //                 raised={raiseSprites && allowRaised}
    //                 selectedId={editingTarget}
    //                 onAddSprite={onAddSprite}
    //                 onDeleteSprite={onDeleteSprite}
    //                 onDrop={onDrop}
    //                 onDuplicateSprite={onDuplicateSprite}
    //                 onExportSprite={onExportSprite}
    //                 onSelectSprite={onSelectSprite}
    //             />
    //         </Box>
    //     </Box>
    // );


    const spritesView = (
        <Box className={
            classNames(
                isSmallSize ? styles.spritesWrapperSmall : styles.spritesWrapperLarge,
                styles.scrollWrapperLarge,
            )
        }>
            <SpriteList
                editingTarget={editingTarget}
                hoveredTarget={hoveredTarget}
                items={Object.keys(sprites).map(id => sprites[id]).filter(sprite => sprite.type === 'sprite')}
                raised={raiseSprites && allowRaised}
                selectedId={editingTarget}
                onAddSprite={onAddSprite}
                onDeleteSprite={onDeleteSprite}
                onDrop={onDrop}
                onDuplicateSprite={onDuplicateSprite}
                onExportSprite={onExportSprite}
                onSelectSprite={onSelectSprite}
            />
        </Box>
    )


    const backdropView = (
        <Box className={styles.backdropWrapper}>
            {
                stage.id &&
                <StageSelector
                    asset={
                        stage.costume &&
                        stage.costume.asset
                    }
                    backdropCount={stage.costumeCount}
                    id={stage.id}
                    selected={stage.id === editingTarget}
                    onSelect={onSelectSprite}
                    stageSize={stageSize}
                />
            }
        </Box>
    )

    const spritesInfoView = (
        <SpriteInfo
            direction={selectedSprite.direction}
            disabled={spriteInfoDisabled}
            name={selectedSprite.name}
            rotationStyle={selectedSprite.rotationStyle}
            size={selectedSprite.size}
            stageSize={stageSize}
            visible={selectedSprite.visible}
            x={selectedSprite.x}
            y={selectedSprite.y}
            costume={costume}
            onChangeDirection={onChangeSpriteDirection}
            onChangeName={onChangeSpriteName}
            onChangeRotationStyle={onChangeSpriteRotationStyle}
            onChangeSize={onChangeSpriteSize}
            onChangeVisibility={onChangeSpriteVisibility}
            onChangeX={onChangeSpriteX}
            onChangeY={onChangeSpriteY}
        />
    );

    const soundAndCustomButtons = (

        <Box className={styles.stageExtraWrapper}>
            <Box
                className={classNames(styles.extraBtn, {
                    [styles.isSelected]: costumesTabVisible
                })}
                onClick={() => {
                    onClickCustom();
                }}>
                {costumesTabVisible ? null : <img src={iconShape} />}
                {costumesTabVisible ? <div className={styles.saveExit}>{saveAndClose}</div> : (isStage ? backdropLabel : costumeLabel)}
            </Box>
            <div style={{ marginTop: "0.63rem" }}></div>
            <Box
                className={classNames(styles.extraBtn, {
                    [styles.isSelected]: soundsTabVisible
                })}
                onClick={() => {
                    onClickSound();
                }}>
                {soundsTabVisible ? null : <img src={iconSound} />}
                {soundsTabVisible ? <div className={styles.saveExit}>{saveAndClose}</div> : soundLabel}
            </Box>
        </Box >
    );

    return (
        <Box
            className={styles.targetPane}
            {...componentProps}
        >
            <Tabs
                forceRenderTabPanel
                selectedIndex={activeStageTab}
                className={tabClassNames.tabs}
                selectedTabClassName={tabClassNames.tabSelected}
                selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                onSelect={onActivateStageTab}
            >
                <TabList className={tabClassNames.tabList}>
                    <Tab className={tabClassNames.tab}>
                        <FormattedMessage
                            defaultMessage="Sprites"
                            description="Label for the stage in the stage selector"
                            id="gui.stageSelector.stage"
                        />
                    </Tab>
                    <div style={{ width: "0.63rem" }} />
                    <Tab className={tabClassNames.tab}>
                        <FormattedMessage
                            defaultMessage="Backdrops"
                            description="Label for the backdrops in the stage selector"
                            id="gui.stageSelector.backdrops"
                        />
                    </Tab>
                </TabList>
                <TabPanel className={tabClassNames.tabPanel}>
                    {spritesView}
                    <div className={styles.spriteDivider} />
                    <Box className={
                        classNames(
                            styles.spriteInfoAndButtonsWrap,
                            styles.scrollWrapperLarge
                        )}>
                        {spritesInfoView}
                        {soundAndCustomButtons}
                    </Box>
                </TabPanel>
                <TabPanel className={tabClassNames.tabPanel}>
                    {backdropView}
                    <div className={styles.spriteDivider} />
                    <Box className={styles.spriteInfoAndButtonsWrap}>
                        {soundAndCustomButtons}
                    </Box>
                </TabPanel>
            </Tabs>

            {/* <Box className={spriteinfoWrapper}>
                <SpriteInfo
                    direction={selectedSprite.direction}
                    disabled={spriteInfoDisabled}
                    name={selectedSprite.name}
                    rotationStyle={selectedSprite.rotationStyle}
                    size={selectedSprite.size}
                    stageSize={stageSize}
                    visible={selectedSprite.visible}
                    x={selectedSprite.x}
                    y={selectedSprite.y}
                    onChangeDirection={onChangeSpriteDirection}
                    onChangeName={onChangeSpriteName}
                    onChangeRotationStyle={onChangeSpriteRotationStyle}
                    onChangeSize={onChangeSpriteSize}
                    onChangeVisibility={onChangeSpriteVisibility}
                    onChangeX={onChangeSpriteX}
                    onChangeY={onChangeSpriteY}
                /> */}
            {/* divider */}
            {/* {
                !isSmallSize &&
                <Box className={classNames(styles.spriteDivider)} />
            } */}
            {/* <Box className={stageExtraWrapper}>
                    <Box
                        className={classNames(styles.extraBtn, {
                            [styles.isSelected]: costumesTabVisible
                        })}
                        onClick={onClickCustom}>
                        {costumesTabVisible ? null : <img src={iconShape} />}
                        {costumesTabVisible ? <span className={styles.saveExit}>{saveAndClose}</span> : (isStage ? backdropLabel : costumeLabel)}
                    </Box>
                    <Box
                        className={classNames(styles.extraBtn, {
                            [styles.isSelected]: soundsTabVisible
                        })}
                        onClick={onClickSound}>
                        {soundsTabVisible ? null : <img src={iconSound} />}
                        {soundsTabVisible ? <span className={styles.saveExit}>{saveAndClose}</span> : soundLabel}
                    </Box>
                </Box>
            </Box> */}

            {/* {isSmallSize ? spriteAndBackdropSmallPane : spriteAndBackdropLargePane} */}


            {/* 角色库 */}
            {spriteLibraryVisible ? (
                <SpriteLibrary
                    vm={vm}
                    onRequestClose={onRequestCloseSpriteLibrary}
                    spriteFileInput={fileInputRef}
                    onSpriteUpload={onSpriteUpload}
                    onFileUploadClick={onFileUploadClick}
                />) : null}

            {/* 确认删除 */}
            {
                isOpenDelConfirm &&
                <Prompt
                    id={promptid}
                    showClose={false}
                    contentLabel={contentLabel}
                    label={promptTitle}
                    message={promptText}
                    cancelLabel={promptCancelText}
                    okLabel={promptOkText}
                    onOk={onPromptOk}
                    onCancel={onPromptCanel}
                />
            }
        </Box>
    );
}

const spriteShape = PropTypes.shape({
    costume: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        // The following are optional because costumes uploaded from disk
        // will not have these properties available
        bitmapResolution: PropTypes.number,
        rotationCenterX: PropTypes.number,
        rotationCenterY: PropTypes.number
    }),
    direction: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    size: PropTypes.number,
    visibility: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
});

TargetPane.propTypes = {
    editingTarget: PropTypes.string,
    extensionLibraryVisible: PropTypes.bool,
    fileInputRef: PropTypes.func,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    onChangeSpriteDirection: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteRotationStyle: PropTypes.func,
    onChangeSpriteSize: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onAddSprite: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDrop: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onExportSprite: PropTypes.func,
    onFileUploadClick: PropTypes.func,
    onNewSpriteClick: PropTypes.func,
    onPaintSpriteClick: PropTypes.func,
    onRequestCloseExtensionLibrary: PropTypes.func,
    onRequestCloseSpriteLibrary: PropTypes.func,
    onSelectSprite: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onSurpriseSpriteClick: PropTypes.func,
    onClickCustom: PropTypes.func,
    onClickSound: PropTypes.func,
    raiseSprites: PropTypes.bool,
    spriteLibraryVisible: PropTypes.bool,
    sprites: PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM)
};

export default injectIntl(TargetPane);
