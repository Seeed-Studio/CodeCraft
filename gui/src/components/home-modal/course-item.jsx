import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './course-item.css';
import iconSpinner from './icon_spinner.gif';
import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import Ellipsis from '../ellipsis/index.js';
import { sortWithSortNo } from '../../lib/utils';
const messages = defineMessages({
    classHourUnit:{
        id:'gui.courseItem.classHourUnit',
        defaultMessage:' lessons',
        description:'课时'
    }
})
class CourseItem extends React.PureComponent {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleShowTagTooltip',
            'handleHideTagTooltip',
        ]);
        this.state = {
            isShowMore: false,
            isShowTagTooltip: false
        }
    }

    componentDidMount() {
        const { id } = this.props;
        const tagContainer = document.getElementById('tags_' + id);
        if (tagContainer && tagContainer.scrollHeight > 25) {
            this.setState({ isShowMore: true });
        }
    }

    handleClick(e, skuClassInfo) {
        e.preventDefault();
        if (!this.props.disabled) {
            this.props.onSelect(skuClassInfo.skuUUID, skuClassInfo.courseUUID, skuClassInfo.skuNumber);
        }
    }

    handleShowTagTooltip() {
        this.setState({ isShowTagTooltip: true });
    }
    handleHideTagTooltip() {
        this.setState({ isShowTagTooltip: false });
    }


    render() {
        const { skuClassInfo, id } = this.props;
        const { isShowMore, isShowTagTooltip } = this.state;
        let cosUrl = skuClassInfo.courseCoverFile.cosUrl;
        return (
            skuClassInfo && <Box
                className={classNames(
                    styles.courseItem,
                    this.props.className
                )}
                id={`courseItem_${id}`}
                onClick={cosUrl?
                    (e) => this.handleClick(e, skuClassInfo):null}
            >
                <Box className={styles.courseItemImageContainerWrapper}>
                    {
                        cosUrl ?
                            <Box className={styles.courseItemImageContainer}>
                                <img
                                    className={styles.courseItemImage}
                                    src={cosUrl}
                                />
                            </Box>
                            :
                            <Box
                                className={styles.courseItemImageLoadingContainer}>
                                <img
                                    className={styles.courseItemImageLoading}
                                    src={iconSpinner}
                                />
                            </Box>
                    }
                </Box>
                <div className={classNames(styles.featuredMargin, styles.courseItemName)}>
                    <Ellipsis tooltip lines={2} parentId={`courseItemName_${id}`}>{skuClassInfo.courseName}</Ellipsis>

                    <div className={classNames(styles.tagTooltip, isShowTagTooltip && styles.showTagTooltip)}>
                        {skuClassInfo.classHourCount && 
                            <span className={styles.tagItem}>{skuClassInfo.classHourCount}
                                {this.props.intl.formatMessage(messages.classHourUnit)}
                            </span>}

                        {skuClassInfo.skuTagList && skuClassInfo.skuTagList.length > 0 && sortWithSortNo(skuClassInfo.skuTagList).map((tag, index) => {
                            return <span key={index} className={styles.tagItem}>{tag.skuTagContent}</span>
                        })}
                    </div>
                </div>
                <div className={classNames(styles.tagContainer, styles.tagsMargin)}>
                    <div className={styles.tags} id={'tags_' + id}>
                        {
                            skuClassInfo.classHourCount &&
                            (skuClassInfo.classHourCount + this.props.intl.formatMessage(messages.classHourUnit))
                        }
                        {
                            skuClassInfo.skuTagList && skuClassInfo.skuTagList.length > 0 &&
                            sortWithSortNo(skuClassInfo.skuTagList).map((tag) => {
                                return "   " + tag.skuTagContent
                            })
                        }
                    </div>
                    {isShowMore && <div className={styles.tagOmit} onMouseEnter={this.handleShowTagTooltip} onMouseLeave={this.handleHideTagTooltip}>...</div>}

                </div>
            </Box>
        );
    }
}

CourseItem.defaultProps = {
    disabled: false
};

export default injectIntl(CourseItem);
