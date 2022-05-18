import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './project-item.css';
import iconSpinner from './icon_spinner.gif';
import classNames from 'classnames';
import { defineMessages, injectIntl } from 'react-intl';
import Ellipsis from '../ellipsis/index.js';
import { startWithHttp } from '../../lib/utils';

const messages = defineMessages({
    author: {
        id: 'gui.library.author',
        defaultMessage: 'By'
    },
})

class ProjectItem extends React.PureComponent {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClick',
        ]);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    handleClick(e, projectBasicInfo) {
        e.preventDefault();
        if (!this.props.disabled) {
            this.props.onSelect(projectBasicInfo.projectUUID);
        }
    }


    render() {
        const { projectBasicInfo, id, intl,className } = this.props;
        let cosUrl = projectBasicInfo.projectCoverFile.cosUrl;
        return (
            projectBasicInfo && <Box
                className={classNames(
                    styles.projectItem,
                    className
                )}
                id={`projectItem_${id}`}
                onClick={cosUrl?
                    (e) => this.handleClick(e, projectBasicInfo):null}
            >
                <Box className={styles.projectItemImageContainerWrapper}>
                    {
                        cosUrl ?
                            <Box className={styles.projectItemImageContainer}>
                                <img
                                    className={styles.projectItemImage}
                                    src={startWithHttp(cosUrl)}
                                />
                            </Box>
                            :
                            <Box className={styles.projectItemImageLoadingContainer}>
                                <img
                                    className={styles.projectItemImageLoading}
                                    src={iconSpinner}
                                />
                            </Box>
                    }
                </Box>

                <div className={styles.projectItemContentContainer}>
                    <div className={styles.projectItemTitle}>
                        <Ellipsis
                            tooltip
                            lines={2}
                            parentId={`projectItemTitle_${id}`}>
                            {projectBasicInfo.projectTitle}
                        </Ellipsis>
                    </div>

                    <div className={styles.projectItemNickName}>
                        <Ellipsis
                            tooltip
                            lines={1}
                            parentId={`projectItemNickName_${id}`}>
                            {intl.formatMessage(messages.author)}：{projectBasicInfo.projectAuthor.authorNickName}
                        </Ellipsis>
                    </div>
                </div>
                
            </Box>
        );
    }
}

ProjectItem.defaultProps = {
    disabled: false
};

export default injectIntl(ProjectItem);
