import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SortableAsset from '../asset-panel/sortable-asset.jsx';
import Box from '../box/box.jsx';
import DeviceSelectorItem from '../../containers/device-selector-item.jsx';
import DragConstants from '../../lib/drag-constants';
import SortableHOC from '../../lib/sortable-hoc.jsx';

import styles from './device-list.css';

const DeviceListComponent = (props) => {

    const {
        containerRef,
        editingTarget,
        draggingIndex,
        draggingType,
        hoveredTarget,
        onDeleteDevice,
        onDuplicateDevice,
        onSelectDevice,
        getIconUrl,
        onDrop,
        onAddSortable,
        onRemoveSortable,
        onOpenLinkView,
        ordering,
        raised,
        selectedId,
        items
    } = props;

    const isSpriteDrag = draggingType === DragConstants.SPRITE;

    return (

        <Box
            componentRef={containerRef}
            className={styles.deviceListWrapper}
        >
            {items.map((sprite, index) => {

                // If the sprite has just received a block drop, used for green highlight
                const receivedBlocks = (
                    hoveredTarget.sprite === sprite.id &&
                    sprite.id !== editingTarget &&
                    hoveredTarget.receivedBlocks
                );

                // If the sprite is indicating it can receive block dropping, used for blue highlight
                let isRaised = !receivedBlocks && raised && sprite.id !== editingTarget;

                return (
                    <SortableAsset
                        className={classNames(styles.deviceWrapper, {
                            [styles.placeholder]: isSpriteDrag && index === draggingIndex
                        })}
                        index={isSpriteDrag ? ordering.indexOf(index) : index}
                        key={sprite.name}
                        onAddSortable={onAddSortable}
                        onRemoveSortable={onRemoveSortable}
                    >
                        <DeviceSelectorItem
                            className={styles.device}
                            dragPayload={sprite}
                            dragType={DragConstants.SPRITE}
                            id={sprite.id}
                            index={index}
                            key={sprite.id}
                            name={sprite.name}
                            deviceId={sprite.deviceId}
                            costumeURL={getIconUrl(sprite.deviceId)}
                            selected={sprite.id === selectedId}
                            onDrop={onDrop}
                            onClick={onSelectDevice}
                            onDeleteButtonClick={onDeleteDevice}
                            onDuplicateButtonClick={onDuplicateDevice}
                            onOpenLinkView={onOpenLinkView}
                        />
                    </SortableAsset>
                );
            })}
        </Box>
    )
}

DeviceListComponent.propTypes = {
    containerRef: PropTypes.func,
    draggingIndex: PropTypes.number,
    draggingType: PropTypes.oneOf(Object.keys(DragConstants)),
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired
    })),
    getIconUrl: PropTypes.func,
    onDrop: PropTypes.func,
    onAddSortable: PropTypes.func,
    onDeleteDevice: PropTypes.func,
    onDuplicateDevice: PropTypes.func,
    onRemoveSortable: PropTypes.func,
    onSelectDevice: PropTypes.func,
    ordering: PropTypes.arrayOf(PropTypes.number),
    raised: PropTypes.bool,
    selectedId: PropTypes.string,
    onOpenLinkView: PropTypes.func,
};

export default SortableHOC(DeviceListComponent);

