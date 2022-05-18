import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import CourseItem from './course-item.jsx';
import Box from '../box/box.jsx';
import TagButton from '../../containers/tag-button.jsx';
import analytics from '../../lib/analytics';
import CourseSearch from './course-search.jsx';
import TagSelect from './tag-select.jsx';
import { ComingSoonTooltip } from '../coming-soon/coming-soon.jsx';
import { toasts } from '../toast-special/toast.jsx';
import styles from './course-list.css';
import {
    searchSKUBasicInfoList,
} from '../../lib/busi-proxy/busi-proxy.js';

import {
    setUserTab,
    USER_TIME_OUT_TAB_INDEX,
} from '../../reducers/login-register-special.js';
import { 
    setRemindSave, 
    setRemindSaveType, 
} from '../../reducers/material-special';
import {
    closeTipsLibrary,
} from '../../reducers/modals';

import { updateCourseSku, updateCdcUrl } from '../../reducers/zwb-course';
import { updateProjectUUID } from '../../reducers/zwb-project';
import loadingGif from './image/loading.gif';
import { getOsType,getBrowser,getBrowserLanguage } from '../../lib/os-type.js';

const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = 'bottom'
}) => {
    if (enable) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};


MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    operateFail: {
        defaultMessage: 'Failed',
        description: '',
        id: 'gui.connectModal.operateFail'
    },

    crateBtnText: {
        defaultMessage: 'Start Coding',
        description: '',
        id: 'gui.library.tips.crateBtnText'
    },
    fourYearsOld: {
        defaultMessage: '4-8',
        description: '',
        id: 'gui.library.fourYearsOld'
    },
    eightYearsOld: {
        defaultMessage: '8-12',
        description: '',
        id: 'gui.library.eightYearsOld'
    },
    twelveYearsOld: {
        defaultMessage: '12-15',
        description: '',
        id: 'gui.library.twelveYearsOld'
    },
    fifteenYearsOld: {
        defaultMessage: '15-18',
        description: '',
        id: 'gui.library.fifteenYearsOld'
    },
    beginner: {
        defaultMessage: 'Beginner',
        description: '',
        id: 'gui.library.beginner'
    },
    intermediate: {
        defaultMessage: 'Intermediate',
        description: '',
        id: 'gui.library.intermediate'
    },
    advanced: {
        defaultMessage: 'Advanced',
        description: '',
        id: 'gui.library.advanced'
    },
    ai: {
        defaultMessage: 'AI',
        description: '',
        id: 'gui.library.ai'
    },
    iot: {
        defaultMessage: 'IOT',
        description: '',
        id: 'gui.library.iot'
    },
    robotics: {
        defaultMessage: 'Robotics',
        description: '',
        id: 'gui.library.robotics'
    },
    graphicalProgram: {
        defaultMessage: 'Graphical programming',
        description: '',
        id: 'gui.library.graphicalProgram'
    },
    pythonProgram: {
        defaultMessage: 'Python programming',
        description: '',
        id: 'gui.library.pythonProgram'
    },
    netErrorMessage: {
        id: 'gui.net.errorMessage',
        defaultMessage: 'Network error, please check your network.',
    },
    glint: {
        id: 'gui.library.glint',
        defaultMessage: 'GLINT'
    },
    product: {
        id: 'gui.library.product',
        defaultMessage: 'Product'
    },
    age: {
        id: 'gui.library.age',
        defaultMessage: 'Age'
    },
    level: {
        id: 'gui.library.level',
        defaultMessage: 'Level'
    },
    popular: {
        id: 'gui.library.popular',
        defaultMessage: 'Popular'
    },
    searchCourses: {
        id: 'gui.library.searchCourses',
        defaultMessage: 'Search Courses'
    },
    
});

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleSearch',
            'handleCourseSelect',
            'handleInputTextChange',
            'handleScroll',
            'handleLoadMore',
        ]);
        this.state = {
            selectedItem: null,
            skuBasicInfoList: [],
            totalCount: 0,
            isLoading: true,
            isLoadMore: false,
            tagList: [],
            tagSelector1Open: false,
            tagSelector2Open: false,
            tagSelector3Open: false,
            tagSelector4Open: false,
            searchKeyWord: '',
            realSearchKeyWord: '',
        };
        this.pageNum = 0;
        this.pageSize = 12;

        this.productList = [
            {
                value: 'micro:bit',
                label: "micro:bit",
            },
            {
                value: 'Arduino',
                label: "Arduino",
            },
            {
                value: 'M.A.R.K',
                label: "M.A.R.K",
            },
            {
                value: 'Grove Zero',
                label: "Grove Zero",
            },
            {
                value: props.intl.formatMessage(messages.glint),
                label: props.intl.formatMessage(messages.glint),
            },
        ]

        this.ageList = [
            {
                value: props.intl.formatMessage(messages.fourYearsOld),
                label: props.intl.formatMessage(messages.fourYearsOld),
            },
            {
                value: props.intl.formatMessage(messages.eightYearsOld),
                label: props.intl.formatMessage(messages.eightYearsOld),
            },
            {
                value: props.intl.formatMessage(messages.twelveYearsOld),
                label: props.intl.formatMessage(messages.twelveYearsOld),
            },
            {
                value: props.intl.formatMessage(messages.fifteenYearsOld),
                label: props.intl.formatMessage(messages.fifteenYearsOld),
            },
        ]

        this.levelList = [
            {
                value: props.intl.formatMessage(messages.beginner),
                label: props.intl.formatMessage(messages.beginner),
            },
            {
                value: props.intl.formatMessage(messages.intermediate),
                label: props.intl.formatMessage(messages.intermediate),
            },
            {
                value: props.intl.formatMessage(messages.advanced),
                label: props.intl.formatMessage(messages.advanced),
            },
        ]

        this.popularList = [
            {
                value: props.intl.formatMessage(messages.ai),
                label: props.intl.formatMessage(messages.ai),
            },
            {
                value: props.intl.formatMessage(messages.iot),
                label: props.intl.formatMessage(messages.iot),
            },
            {
                value: props.intl.formatMessage(messages.robotics),
                label: props.intl.formatMessage(messages.robotics),
            },
            {
                value: props.intl.formatMessage(messages.graphicalProgram),
                label: props.intl.formatMessage(messages.graphicalProgram),
            },
            {
                value: props.intl.formatMessage(messages.pythonProgram),
                label: props.intl.formatMessage(messages.pythonProgram),
            },
        ]

        let { name } = getOsType();
        let { browserName,browserVersion } = getBrowser();
        this.browserName = browserName;
        this.browserVersion = browserVersion;
        this.browserOS = name;
        this.browserLanguage = getBrowserLanguage();
    }

    componentDidMount() {
        if (this.props.authInfo
            && Object.keys(this.props.authInfo).length > 0) {
                this.handleSearchSKUBasicInfoList({});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.authInfo !== this.props.authInfo && this.state.totalCount === 0) {
            this.componentDidMount();
        }
    }

    handleScroll(e) {
        const scrollTop = e.target.scrollTop;
        if (this.state.isLoading) {
            return
        }
        const offsetHeight = e.target.offsetHeight;
        const scrollHeight = e.target.scrollHeight;
        if (scrollTop && offsetHeight && scrollHeight && (scrollTop + offsetHeight + 200 > scrollHeight)) {
            this.handleLoadMore();
        }
    }

    // 获取SKU基本信息
    handleSearchSKUBasicInfoList({ pageNum = 0}) {
        if (pageNum !== 0) {
            this.setState({
                isLoadMore: true,
            })
        };
        this.setState({
            isLoading: true,
        })
        const { tagList, realSearchKeyWord } = this.state;
        let params = {
            authInfo: this.props.authInfo,
            language: this.props.intl.locale === 'zh-cn' ? 'zh' : 'en',
            skuOtherPlatform: "codecraft",
            fromResult: pageNum * this.pageSize,
            sizeResult: this.pageSize,
            tagList,
            searchKeyWord: realSearchKeyWord
        }

        this.pageNum = pageNum;

        searchSKUBasicInfoList(params).then((data) => {
            let skuBasicInfoList = data.skuBasicInfoList;
            this.setState({
                isLoading: false,
                isLoadMore: false,
                skuBasicInfoList: pageNum == 0 ? skuBasicInfoList : this.state.skuBasicInfoList.concat(skuBasicInfoList),
                totalCount: data.totalCount,
                realSearchKeyWord
            })

        }, (err) => {
            // toasts.error('操作失败');
            if (err.errorCode === 1010008 || err.errorCode === 1010010) {
                this.props.onSetTab(USER_TIME_OUT_TAB_INDEX);
            }
            this.setState({
                isLoading: false,
                isLoadMore: false,
            })
        });
    }

    // 加载更多
    handleLoadMore() {
        const { isLoadMore,isLoading } = this.state;
        if (isLoading || isLoadMore) {
            return
        }
        const { totalCount, skuBasicInfoList } = this.state;
        if (skuBasicInfoList.length < totalCount) {
            this.handleSearchSKUBasicInfoList({
                pageNum: ++this.pageNum,
            });
        }
    }

    handleChange(list, selectedItem, e) {
        const { tagList,searchKeyWord } = this.state;
        if (selectedItem) {
            const itemIndex = tagList.indexOf(selectedItem);
            if (itemIndex === -1) {
                tagList.push(selectedItem);
            } else {
                tagList.splice(itemIndex, 1);
            }
        } else {
            for (let i = 0; i < tagList.length; i++) {
                for (let j = 0; j < list.length; j++) {
                    if (tagList[i] === list[j].value) {
                        tagList.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        this.setState({ 
            tagList,
            skuBasicInfoList: [],
            realSearchKeyWord: searchKeyWord
        }, () => {
            this.handleSearchSKUBasicInfoList({});
        });
    }

    handleTagSelectorClose(index) {
        if (index==1) {
            this.setState({
                tagSelector1Open: false
            });
        }else if (index==2) {
            this.setState({
                tagSelector2Open: false
            });
        }else if (index==3) {
            this.setState({
                tagSelector3Open: false
            });
        }else if (index==4) {
            this.setState({
                tagSelector4Open: false
            });
        }
    }

    handleTagSelectorOpen(index) {
        if (index==1) {
            this.setState({
                tagSelector1Open: true
            });
        }else if (index==2) {
            this.setState({
                tagSelector2Open: true
            });
        }else if (index==3) {
            this.setState({
                tagSelector3Open: true
            });
        }else if (index==4) {
            this.setState({
                tagSelector4Open: true
            });
        }
    }

    // 搜索框事件
    handleSearch() {
        const { searchKeyWord } = this.state;
        this.setState({
            skuBasicInfoList: [],
            totalCount: 0,
            realSearchKeyWord: searchKeyWord
        }, () => {
            this.handleSearchSKUBasicInfoList({});
        });
    }

    handleInputTextChange(value) {
        this.setState({ searchKeyWord: value });
    }

    handleCourseSelect(skuUUID, courseUUID, skuNumber) {
        if (this.props.isProjectSaved) {
            this.props.onUpdateCourseSku('-', '-', '-');  // 用于选择同一课程时监测到变化重新拉取数据
            this.props.onUpdateProjectUUID('');
            setTimeout(() => {
                this.props.onUpdateCourseSku(skuUUID, courseUUID, skuNumber);
            }, 100);
            this.props.onRequestClose();
            this.props.onCloseTipsLibrary();
        }else {
            this.props.onRequestClose();
            this.props.onSetRemindSave(true);
            this.props.onSetRemindSaveType(`openCourse:${skuUUID}:${courseUUID}:${skuNumber}`);
        }
    }

    render() {
        const {
            skuBasicInfoList,
            totalCount,
            isLoading,
            isLoadMore,
            tagList,
            searchKeyWord,
            realSearchKeyWord,
            tagSelector1Open,
            tagSelector2Open,
            tagSelector3Open,
            tagSelector4Open,
        } = this.state;

        const {
            intl,
        } = this.props;

        return (
            <div className={styles.listContent} onScroll={this.handleScroll}
            >
                <div className={styles.listTop}>
                    <Box className={styles.middleGroup}>
                        <MenuBarItemTooltip
                            enable
                            id="title-field"
                        >
                            <CourseSearch
                                className={classNames(styles.titleFieldGrowable)}
                                onSearch={this.handleSearch}
                                value={this.state.searchKeyWord}
                                onInputTextChange={this.handleInputTextChange}
                                placeholder={intl.formatMessage(messages.searchCourses)}
                            />
                        </MenuBarItemTooltip>
                    </Box>

                    <Box className={styles.selectGroup}>
                        <TagSelect className={styles.select}
                            onChange={this.handleChange.bind(this, this.productList)}
                            onListClose={this.handleTagSelectorClose.bind(this, 1)}
                            onListOpen={this.handleTagSelectorOpen.bind(this, 1)}
                            title={intl.formatMessage(messages.product)}
                            list={this.productList}
                            tagList={tagList}
                            // disabled={isLoading}
                            open={tagSelector1Open}     //控制列表开关状态
                        >
                        </TagSelect>
                        {/* <TagSelect className={styles.select}
                            onChange={this.handleChange.bind(this, this.ageList)}
                            onListClose={this.handleTagSelectorClose.bind(this, 2)}
                            onListOpen={this.handleTagSelectorOpen.bind(this, 2)}
                            title={intl.formatMessage(messages.age)}
                            list={this.ageList}
                            tagList={tagList}
                            // disabled={isLoading}
                            open={tagSelector2Open}     //控制列表开关状态
                        >
                        </TagSelect> */}
                        <TagSelect className={styles.select}
                            onChange={this.handleChange.bind(this, this.levelList)}
                            onListClose={this.handleTagSelectorClose.bind(this, 3)}
                            onListOpen={this.handleTagSelectorOpen.bind(this, 3)}
                            title={intl.formatMessage(messages.level)}
                            list={this.levelList}
                            tagList={tagList}
                            // disabled={isLoading}
                            open={tagSelector3Open}     //控制列表开关状态
                        >
                        </TagSelect>
                        <TagSelect className={styles.select}
                            onChange={this.handleChange.bind(this, this.popularList)}
                            onListClose={this.handleTagSelectorClose.bind(this, 4)}
                            onListOpen={this.handleTagSelectorOpen.bind(this, 4)}
                            title={intl.formatMessage(messages.popular)}
                            list={this.popularList}
                            tagList={tagList}
                            // disabled={isLoading}
                            open={tagSelector4Open}     //控制列表开关状态
                        >
                        </TagSelect>
                    </Box>
                </div>


                <div className={styles.scrollBox}>
                    {(tagList.length > 0 || realSearchKeyWord !== '') && <div className={styles.resultBox}>
                        <div className={styles.resultText}>
                            {intl.locale === 'zh-cn' ? <span>共<span className={styles.blue}>{totalCount}</span>个满足条件的结果</span>
                                :
                                <span><span className={styles.blue} style={{ marginRight: '5px' }}>{totalCount}</span>{totalCount > 1 ? 'results' : 'result'}</span>}
                        </div>
                        {/* {[1, 2, 3].map((item, index) => <div key={index} className={styles.resultText}></div>)} */}
                    </div>}
                    <Box
                        style={{ flex: '1 1' }}
                        className={styles.libraryScrollGrid}
                    >
                        {
                            skuBasicInfoList.length > 0
                            && skuBasicInfoList.map((dataItem, index) => {
                                return (
                                    <CourseItem
                                        skuClassInfo={dataItem}
                                        onSelect={this.handleCourseSelect}
                                        className={styles.libraryTipsItem}
                                        id={dataItem.skuUUID}
                                        key={`item_${index}`}
                                        showDelete={false}
                                    />
                                );
                            })
                        }

                        {/* {[1, 2, 3].map((item, index) => {
                            return <div key={index} className={styles.fullPosition}></div>
                        })} */}

                        {
                            isLoadMore && <div className={styles.loadingGif}>
                                <div>
                                    <img src={loadingGif} alt="" />
                                    <span>{<FormattedMessage
                                        defaultMessage="Load More"
                                        description="加载更多"
                                        id="gui.library.loadMore"
                                    />}...</span>
                                </div>
                            </div>
                        }
                    </Box>

                </div>
                {
                    (isLoading&&!isLoadMore && <div className={styles.loadingBackground}>
                        <div className={styles.loadingText}>
                            <FormattedMessage
                                defaultMessage="Loading in progress, please wait"
                                description=""
                                id="gui.library.loadingMessage"
                            />
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

CourseList.propTypes = {
    data: PropTypes.arrayOf(
        /* eslint-disable react/no-unused-prop-types, lines-around-comment */
        // An item in the library
        PropTypes.shape({
            // @todo remove md5/rawURL prop from library, refactor to use storage
            md5: PropTypes.string,
            name: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ]).isRequired,
            rawURL: PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    intl: intlShape.isRequired,
    onRequestClose: PropTypes.func,
    onCloseTipsLibrary: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
};

CourseList.defaultProps = {
    
};

const mapStateToProps = state => {
    const user = state.session && state.session.session && state.session.session.user;
    return {
        authInfo: state.scratchGui.loginRegister.authInfo,
        userInfo: state.scratchGui.loginRegister.userInfo,
        cdcUrl: state.scratchGui.zwbCourse.cdcUrl,
        isRemindSave: state.scratchGui.material.isRemindSave,
        isProjectSaved: state.scratchGui.material.isProjectSaved,
    }
};

const mapDispatchToProps = dispatch => ({
    onSetTab: tab => dispatch(setUserTab(tab)),
    onUpdateCourseSku: (skuUUID, courseUUID, skuNumber) => dispatch(updateCourseSku(skuUUID, courseUUID, skuNumber)),
    onUpdateProjectUUID: (projectUUID) => dispatch(updateProjectUUID(projectUUID)),
    onCloseTipsLibrary: () => dispatch(closeTipsLibrary()),
    onUpdateCdcUrl: (cdcUrl, cdcName) => dispatch(updateCdcUrl(cdcUrl, cdcName || '')),
    onSetRemindSave: bool => dispatch(setRemindSave(bool)),
    onSetRemindSaveType: type => dispatch(setRemindSaveType(type)),
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseList));
