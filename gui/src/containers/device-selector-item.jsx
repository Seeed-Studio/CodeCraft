import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { setHoveredSprite } from '../reducers/hovered-target';
import { updateAssetDrag } from '../reducers/asset-drag';
import { getEventXY } from '../lib/touch-utils';
import { SVGRenderer } from 'scratch-svg-renderer';


import { openDeviceViewMoreModal } from '../reducers/modals';

import DeviceSelectorItemComponent from '../components/device-selector-item/device-selector-item.jsx';

const dragThreshold = 3; // Same as the block drag threshold
// Contains 'font-family', but doesn't only contain 'font-family="none"'
const HAS_FONT_REGEXP = 'font-family(?!="none")';

class DeviceSelectorItem extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'getCostumeUrl',
            'handleClick',
            'handleDelete',
            'handleDuplicate',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleMouseDown',
            'handleMouseMove',
            'handleMouseUp',
            'handleViewMore'
        ]);
        this.svgRenderer = new SVGRenderer();
        // Asset ID of the SVG currently in SVGRenderer
        this.decodedAssetId = null;
        this.state = {
            isHovered: false
        }
    }
    // shouldComponentUpdate(nextProps) {
    //     // Ignore dragPayload due to https://github.com/LLK/scratch-gui/issues/3172.
    //     // This function should be removed once the issue is fixed.
    //     for (const property in nextProps) {
    //         if (property !== 'dragPayload' && this.props[property] !== nextProps[property]) {
    //             return true;
    //         }
    //     }
    //     return true;
    // }
    getCostumeUrl() {
        if (this.props.costumeURL) {
            return this.props.costumeURL;
        } else {
            return null;
        }
    }
    handleMouseUp() {
        this.initialOffset = null;
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('touchend', this.handleMouseUp);
        window.removeEventListener('touchmove', this.handleMouseMove);
        this.props.onDrag({
            img: null,
            currentOffset: null,
            dragging: false,
            dragType: null,
            index: null
        });
        setTimeout(() => {
            this.noClick = false;
        });
    }
    handleMouseMove(e) {
        const currentOffset = getEventXY(e);
        const dx = currentOffset.x - this.initialOffset.x;
        const dy = currentOffset.y - this.initialOffset.y;
        if (Math.sqrt((dx * dx) + (dy * dy)) > dragThreshold) {
            this.props.onDrag({
                img: this.getCostumeUrl(),
                currentOffset: currentOffset,
                dragging: true,
                dragType: this.props.dragType,
                index: this.props.index,
                payload: this.props.dragPayload
            });
            this.noClick = true;
        }
        e.preventDefault();
    }
    handleMouseDown(e) {
        this.initialOffset = getEventXY(e);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('touchmove', this.handleMouseMove);
    }
    handleClick(e) {
        e.preventDefault();
        if (!this.noClick) {
            this.props.onClick(this.props.id);
        }
    }

    handleViewMore(){
        this.props.openViewMoreModal();
    }

    handleDelete(e) {
        e.stopPropagation(); // To prevent from bubbling back to handleClick
        this.props.onDeleteButtonClick({
            id: this.props.id,
            deviceId: this.props.deviceId
        });
    }
    handleDuplicate(e) {
        e.stopPropagation(); // To prevent from bubbling back to handleClick
        this.props.onDuplicateButtonClick(this.props.id);
    }
    handleMouseLeave() {
        this.setState({ isHovered: false })
        this.props.dispatchSetHoveredSprite(null);
    }
    handleMouseEnter() {
        this.setState({ isHovered: true })
        this.props.dispatchSetHoveredSprite(this.props.id);
    }

    render() {
        const {
            /* eslint-disable no-unused-vars */
            assetId,
            id,
            deviceId,
            index,
            onClick,
            onOpenLinkView,
            connectedDevice,
            onDeleteButtonClick,
            onDuplicateButtonClick,
            openViewMoreModal,
            dragPayload,
            receivedBlocks,
            costumeURL,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;

        return (
            <DeviceSelectorItemComponent
                costumeURL={this.getCostumeUrl()}
                isHovered={this.state.isHovered}
                isConnected={connectedDevice ? connectedDevice.id === deviceId : false}
                onClick={this.handleClick}
                // onDeleteButtonClick={deviceId !== 1001 && onDeleteButtonClick ? this.handleDelete : null}
                onViewMore={this.handleViewMore}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onOpenLinkView={onOpenLinkView}
                {...props}
            />
        );
    }
}

DeviceSelectorItem.propTypes = {
    assetId: PropTypes.string,
    costumeURL: PropTypes.string,
    dispatchSetHoveredSprite: PropTypes.func.isRequired,
    dragPayload: PropTypes.shape({
        name: PropTypes.string,
        body: PropTypes.string
    }),
    dragType: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deviceId: PropTypes.number,
    index: PropTypes.number,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onDrag: PropTypes.func.isRequired,
    onDuplicateButtonClick: PropTypes.func,
    receivedBlocks: PropTypes.bool.isRequired,
    selected: PropTypes.bool,
    onOpenLinkView: PropTypes.func
};

const mapStateToProps = (state, { id }) => ({
    connectedDevice: state.scratchGui.deviceConnect.connectedDevice,
    dragging: state.scratchGui.assetDrag.dragging,
    receivedBlocks: state.scratchGui.hoveredTarget.receivedBlocks &&
        state.scratchGui.hoveredTarget.sprite === id,
});
const mapDispatchToProps = dispatch => ({
    dispatchSetHoveredSprite: spriteId => {
        dispatch(setHoveredSprite(spriteId));
    },
    onDrag: data => dispatch(updateAssetDrag(data)),
    openViewMoreModal: () => dispatch(openDeviceViewMoreModal())
});

const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceSelectorItem);

export {
    ConnectedComponent as default,
    HAS_FONT_REGEXP // Exposed for testing
};
