import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// import CloseButton from '../close-button/close-button.jsx';
import styles from './device-selector-item.css';
import { ContextMenuTrigger } from 'react-contextmenu';
// import { ContextMenu, MenuItem } from '../context-menu/context-menu.jsx';

import { FormattedMessage } from 'react-intl';

// react-contextmenu requires unique id to match trigger and context menu
let contextMenuId = 0;

const DeviceSelectorItem = props => (
    <ContextMenuTrigger
        attributes={{
            className: classNames(props.className, styles.deviceSelectorItem, {
                // [styles.isSelected]: props.selected
            }),
            onClick: props.onClick,
            onMouseEnter: props.onMouseEnter,
            onMouseLeave: props.onMouseLeave,
            onMouseDown: props.onMouseDown,
            onTouchStart: props.onMouseDown
        }}
        disable={props.dragging}
        id={`${props.name}-${contextMenuId}`}
    >
        {/* {(props.selected && props.onDeleteButtonClick) ? (
            <CloseButton
                className={styles.deleteButton}
                size={CloseButton.SIZE_SMALL}
                onClick={props.onDeleteButtonClick}
            />
        ) : null} */}

        {props.costumeURL ? (
            <img
                className={styles.deviceImage}
                src={props.costumeURL}
            />
        ) : null}

        <div className={styles.deviceInfo}>
            <div className={styles.deviceName}>{props.name}</div>
            {props.details ? (
                <div className={styles.deviceDetails}>{props.details}</div>
            ) : null}
        </div>

        {props.isConnected ? (<div className={styles.iconConnected}>
            <img onClick={props.onOpenLinkView} src={require(props.selected ? './icon-link-selected.png' : './icon-link-normal.png')} />
        </div>) : null}

        {/* {props.onDuplicateButtonClick || props.onDeleteButtonClick ? (
            <ContextMenu id={`${props.name}-${contextMenuId++}`}>
                {props.onDuplicateButtonClick ? (
                    <MenuItem onClick={props.onDuplicateButtonClick}>
                        <FormattedMessage
                            defaultMessage="duplicate"
                            description="Menu item to duplicate in the right click menu"
                            id="gui.spriteSelectorItem.contextMenuDuplicate"
                        />
                    </MenuItem>
                ) : null}
                {props.onDeleteButtonClick ? (
                    <MenuItem onClick={props.onDeleteButtonClick}>
                        <FormattedMessage
                            defaultMessage="delete"
                            description="Menu item to delete in the right click menu"
                            id="gui.spriteSelectorItem.contextMenuDelete"
                        />
                    </MenuItem>
                ) : null}
            </ContextMenu>
        ) : null} */}

        {props.isHovered &&
            <div className={styles.hoveredWrapper}
                 onClick={props.onViewMore}>
                <div className={styles.viewMoreButton}>
                    <FormattedMessage
                        defaultMessage="View More"
                        description=""
                        id="gui.deviceSelector.itemviewMore"
                    />
                </div>
            </div>
        }
    </ContextMenuTrigger>
);

DeviceSelectorItem.propTypes = {
    className: PropTypes.string,
    costumeURL: PropTypes.string,
    details: PropTypes.string,
    dragging: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onDuplicateButtonClick: PropTypes.func,
    onExportButtonClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    selected: PropTypes.bool.isRequired,
    onOpenLinkView: PropTypes.func

};

export default DeviceSelectorItem;
