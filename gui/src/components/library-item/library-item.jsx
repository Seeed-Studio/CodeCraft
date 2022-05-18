import bindAll from 'lodash.bindall';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './library-item.css';
import iconSpinner from './icon_spinner.gif';
import classNames from 'classnames';
import { startWithHttp } from '../../lib/utils';
import Ellipsis from '../ellipsis';

class LibraryItem extends React.PureComponent {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClick',
            'handleFocus',
            'handleKeyPress',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleDelete'
        ]);
    }
    handleBlur() {
        this.props.onBlur(this.props.id);
    }
    handleFocus() {
        this.props.onFocus(this.props.id);
    }
    handleClick(e) {
        if (!this.props.disabled) {
            this.props.onSelect(this.props.id);
        }
        e.preventDefault();
    }
    handleKeyPress(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onSelect(this.props.id);
        }
    }
    handleMouseEnter() {
        this.props.onMouseEnter(this.props.id);
    }
    handleMouseLeave() {
        this.props.onMouseLeave(this.props.id);
    }
    // 删除
    handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.onDelete) {
            this.props.onDelete(this.props.materialUUID);
        }
    }
    render() {
        return this.props.featured ? (
            <div
                className={classNames(
                    styles.libraryItem,
                    styles.featuredItem,
                    {
                        [styles.disabled]: this.props.disabled
                    },
                   this.props.className
                )}
                onClick={this.handleClick}
            >
                <div className={styles.featuredImageContainer}>
                    {this.props.disabled ? (
                        <div className={styles.comingSoonText}>
                            <FormattedMessage
                                defaultMessage="Coming Soon"
                                description="Label for extensions that are not yet implemented"
                                id="gui.extensionLibrary.comingSoon"
                            />
                        </div>
                    ) : null}
                    {this.props.iconURL && <img
                        className={styles.featuredImage}
                        src={startWithHttp(this.props.iconURL)}
                    />}
                </div>
                <div
                    className={styles.featuredText}
                >
                    <span className={styles.libraryItemName} style={{ fontWeight: 500 }}>{this.props.name}</span>
                    <br />
                    <span className={styles.featuredDescription}>{this.props.description}</span>
                </div>
            </div>
        ) : (
                <Box
                    className={classNames(
                        styles.libraryItem,
                        this.props.className
                    )}
                    role="button"
                    tabIndex="0"
                    onBlur={this.handleBlur}
                    onClick={this.handleClick}
                    onFocus={this.handleFocus}
                    onKeyPress={this.handleKeyPress}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    {/* Layers of wrapping is to prevent layout thrashing on animation */}
                    <Box className={styles.libraryItemImageContainerWrapper}>
                        {/* {this.props.dataUrl && */}
                            <Box className={styles.libraryItemImageContainer}>
                                {this.props.iconURL && <img
                                    className={styles.libraryItemImage}
                                    src={startWithHttp(this.props.iconURL)}
                                />}
                            </Box>
                            {/* } */}
                        {/* {!this.props.dataUrl &&
                            <Box className={styles.libraryItemImageLoadingContainer}>
                                <img
                                    className={styles.libraryItemImageLoading}
                                    src={iconSpinner}
                                />
                            </Box>} */}
                    </Box>
                    <div className={classNames(styles.featuredMargin, styles.libraryItemName)}>
                        <Ellipsis tooltip={true} lines={1} parentId={"litem-" + this.props.id}>
                            {this.props.name}
                        </Ellipsis>
                    </div>
                    {this.props.showDelete && <span className={styles.libraryItemDelete} onClick={this.handleDelete}>
                        <FormattedMessage
                            defaultMessage="delete"
                            description=""
                            id="gui.spriteSelectorItem.contextMenuDelete"
                        />
                    </span>}
                </Box>
            );
    }
}

LibraryItem.propTypes = {
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    disabled: PropTypes.bool,
    featured: PropTypes.bool,
    iconURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

LibraryItem.defaultProps = {
    disabled: false
};

export default LibraryItem;
