import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SpriteSelectorItem from '../../containers/sprite-selector-item.jsx';
import Box from '../box/box.jsx';
import SortableAsset from './sortable-asset.jsx';
import SortableHOC from '../../lib/sortable-hoc.jsx';
import DragConstants from '../../lib/drag-constants';

import iconChoseShapeN from './icon-choseshape-n.png';
import iconChoseShapeS from './icon-choseshape-s.png';
import iconChosesoundN from './icon-chosesound-n.png';
import iconChosesoundS from './icon-chosesound-s.png';
import iconDrawshapeN from './icon-drawshape-n.png';
import iconDrawshapeS from './icon-drawshape-s.png';
import iconRecordN from './icon-record-n.png';
import iconRecordS from './icon-record-s.png';

import styles from './selector.css';

let element = '';
let className = '';
const handleMouseEnter = (e) => {
    element = e.target.firstChild;
    if(!element || !element.className || !element.className.split('-')[1]) return;
    className = element.className.split('-')[1].split('_')[0];
    switch (className) {
        case 'drawshape':
            element.style.background = `url(${iconDrawshapeS}) no-repeat`;
            break;
        case 'choseshape':
            element.style.background = `url(${iconChoseShapeS}) no-repeat`;
            break;
        case 'record':
            element.style.background = `url(${iconRecordS}) no-repeat`;
            break;
        case 'chosesound':
            element.style.background = `url(${iconChosesoundS}) no-repeat`;
            break;
        default:
            break;
    }
   
}

const hnadleMouseLeave = () => {
    if(!element || !element.style) return;
    switch (className) {
        case 'drawshape':
            element.style.background = `url(${iconDrawshapeN}) no-repeat`;
            break;
        case 'choseshape':
            element.style.background = `url(${iconChoseShapeN}) no-repeat`;
            break;
        case 'record':
            element.style.background = `url(${iconRecordN}) no-repeat`;
            break;
        case 'chosesound':
            element.style.background = `url(${iconChosesoundN}) no-repeat`;
            break;
        default:
            break;
    }
}

const Selector = props => {
    const {
        buttons,
        containerRef,
        dragType,
        items,
        selectedItemIndex,
        draggingIndex,
        draggingType,
        ordering,
        onAddSortable,
        onRemoveSortable,
        onDeleteClick,
        onDuplicateClick,
        onExportClick,
        onItemClick
    } = props;

    const isRelevantDrag = draggingType === dragType;

    const newButtonSection = (
        <Box className={styles.newButtons}>
            {(buttons || []).map(({ img, title, onClick }, index) => {
                return (
                    <Box
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={hnadleMouseLeave}
                        className={styles.newButtonItem}
                        onClick={onClick}
                        key={"" + index} >
                        {img}
                        <div>{title}</div>
                    </Box>
                )
            })}
        </Box>
    );

    return (
        <Box
            className={styles.wrapper}
            componentRef={containerRef}
        >
            <Box className={styles.listArea}>
                {items.map((item, index) => (
                    <SortableAsset
                        id={item.name}
                        index={isRelevantDrag ? ordering.indexOf(index) : index}
                        key={item.name}
                        onAddSortable={onAddSortable}
                        onRemoveSortable={onRemoveSortable}
                    >
                        <SpriteSelectorItem
                            asset={item.asset}
                            className={classNames(styles.listItem, {
                                [styles.placeholder]: isRelevantDrag && index === draggingIndex
                            })}
                            costumeURL={item.url}
                            details={item.details}
                            dragPayload={item.dragPayload}
                            dragType={dragType}
                            id={index}
                            index={index}
                            name={item.name}
                            number={index + 1 /* 1-indexed */}
                            selected={index === selectedItemIndex}
                            onClick={onItemClick}
                            onDeleteButtonClick={onDeleteClick}
                            onDuplicateButtonClick={onDuplicateClick}
                            onExportButtonClick={onExportClick}
                        />
                    </SortableAsset>
                ))}
            </Box>
            {newButtonSection}
        </Box>
    );
};

Selector.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.element.isRequired,
        onClick: PropTypes.func
    })),
    containerRef: PropTypes.func,
    dragType: PropTypes.oneOf(Object.keys(DragConstants)),
    draggingIndex: PropTypes.number,
    draggingType: PropTypes.oneOf(Object.keys(DragConstants)),
    items: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired
    })),
    onAddSortable: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onDuplicateClick: PropTypes.func,
    onExportClick: PropTypes.func,
    onItemClick: PropTypes.func.isRequired,
    onRemoveSortable: PropTypes.func,
    ordering: PropTypes.arrayOf(PropTypes.number),
    selectedItemIndex: PropTypes.number.isRequired
};

export default SortableHOC(Selector);
