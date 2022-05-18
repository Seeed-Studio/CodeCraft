import bindAll from 'lodash.bindall';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './extension-item.css';
import classNames from 'classnames';

import imgAdd from './icon_add@2x.png';
import imgDelete from './icon_delect@2x.png';



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
        // if()
        // if()
        // this.props.selected

        if (!this.props.disabled) {
            if(!this.props.selected){
                this.props.onSelect(this.props.id);
            }else{
                this.props.onDeleteExtension(this.props.id);
            }
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
        return (
            <Box
                className={classNames(
                    styles.libraryItem,
                    styles.featuredItem,
                    {
                        [styles.disabled]: this.props.disabled
                    },
                    this.props.className
                )}
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
                        src={this.props.iconURL}
                    />}
                </div>
                <div
                    className={styles.featuredText}
                >
                    <div className={styles.libraryItemName} style={{ fontWeight: 500 }}>{this.props.name}</div>
                    <div className={styles.featuredDescription} >{this.props.description}</div>
                </div>
                <div
                    className={classNames(
                        styles.funcWrap,
                        this.props.selected ? styles.delColor : styles.addColor)
                    }
                    onClick={this.handleClick}
                >
                    {this.props.selected ? <img className={styles.funcDelIcon} src={imgDelete} /> : <img className={styles.funcAddIcon} src={imgAdd} />}
                    {
                        this.props.selected ?
                            <FormattedMessage
                                defaultMessage="Delete"
                                description="Label for extensions that are not yet implemented"
                                id="gui.extensionLibrary.delete"
                            /> :
                            <FormattedMessage
                                defaultMessage="Add"
                                description="Label for extensions that are not yet implemented"
                                id="gui.extensionLibrary.add"
                            />
                    }
                </div>
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
