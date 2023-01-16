import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import DragConstants from '../../lib/drag-constants';

import Box from '../box/box.jsx';
import SpriteSelectorItem from '../../containers/sprite-selector-item.jsx';
import SortableHOC from '../../lib/sortable-hoc.jsx';
import SortableAsset from '../asset-panel/sortable-asset.jsx';

import styles from './sprite-selector.css';

const SpriteList = function (props) {
    const {
        containerRef,
        editingTarget,
        draggingIndex,
        draggingType,
        hoveredTarget,
        onAddSprite,
        onDeleteSprite,
        onDuplicateSprite,
        onExportSprite,
        onSelectSprite,
        onAddSortable,
        onRemoveSortable,
        ordering,
        raised,
        selectedId,
        items
    } = props;

    const isSpriteDrag = draggingType === DragConstants.SPRITE;

    return (
        <Box
            className={styles.itemsWrapper}
            componentRef={containerRef}
        >
            <Box
                className={styles.spriteAdd}
                onClick = {onAddSprite}>
                ＋
            </Box>
            {items.map((sprite, index) => {

                // If the sprite has just received a block drop, used for green highlight
                const receivedBlocks = (
                    hoveredTarget.sprite === sprite.id &&
                    sprite.id !== editingTarget &&
                    hoveredTarget.receivedBlocks
                );

                // If the sprite is indicating it can receive block dropping, used for blue highlight
                let isRaised = !receivedBlocks && raised && sprite.id !== editingTarget;

                // A sprite is also raised if a costume or sound is being dragged.
                // Note the absence of the self-sharing check: a sprite can share assets with itself.
                // This is a quirk of 2.0, but seems worth leaving possible, it
                // allows quick (albeit unusual) duplication of assets.
                isRaised = isRaised || [
                    DragConstants.COSTUME,
                    DragConstants.SOUND,
                    DragConstants.BACKPACK_COSTUME,
                    DragConstants.BACKPACK_SOUND].includes(draggingType);
                return (
                    <SortableAsset
                        className={classNames(styles.spriteWrapper, {
                            [styles.placeholder]: isSpriteDrag && index === draggingIndex})}
                        index={isSpriteDrag ? ordering.indexOf(index) : index}
                        key={sprite.name}
                        onAddSortable={onAddSortable}
                        onRemoveSortable={onRemoveSortable}
                    >
                        <SpriteSelectorItem
                            asset={sprite.costume && sprite.costume.asset}
                            className={classNames(styles.sprite, {
                                [styles.raised]: isRaised,
                                [styles.receivedBlocks]: receivedBlocks
                            })}
                            dragPayload={sprite}
                            dragType={DragConstants.SPRITE}
                            id={sprite.id}
                            index={index}
                            key={sprite.id}
                            name={sprite.name}
                            selected={sprite.id === selectedId}
                            onClick={onSelectSprite}
                            onDeleteButtonClick={onDeleteSprite}
                            onDuplicateButtonClick={onDuplicateSprite}
                            onExportButtonClick={onExportSprite}
                        />
                    </SortableAsset>
                );
            })}
        </Box>
    );
};

SpriteList.propTypes = {
    containerRef: PropTypes.func,
    draggingIndex: PropTypes.number,
    draggingType: PropTypes.oneOf(Object.keys(DragConstants)),
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
        costume: PropTypes.shape({
            url: PropTypes.string,
            name: PropTypes.string.isRequired,
            bitmapResolution: PropTypes.number.isRequired,
            rotationCenterX: PropTypes.number.isRequired,
            rotationCenterY: PropTypes.number.isRequired
        }),
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
    })),
    onAddSortable: PropTypes.func,
    onAddSprite: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onExportSprite: PropTypes.func,
    onRemoveSortable: PropTypes.func,
    onSelectSprite: PropTypes.func,
    ordering: PropTypes.arrayOf(PropTypes.number),
    raised: PropTypes.bool,
    selectedId: PropTypes.string
};

export default SortableHOC(SpriteList);
