import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import HardwareProductsItem from './hardwareProducts-item.jsx';
import Box from '../box/box.jsx';
import TagButton from '../../containers/tag-button.jsx';
import { toasts } from '../toast-special/toast.jsx';
import styles from './hardwareProducts-list.css';

import {
    searchHardwareProductsInfoList
} from '../../lib/busi-proxy/busi-proxy.js';

import {
    setUserTab,
    USER_TIME_OUT_TAB_INDEX,
} from '../../reducers/login-register-special.js';

import loadingGif from './image/loading.gif';

class HardwareProductsList extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleHardwareProductsSelect',
            'handleScroll',
            'handleLoadMore',
        ]);
        this.state = {
            hardwareProductsBasicInfoList: [],
            totalCount: 0,
            isLoading: true,
            isLoadMore: false,
        };
        this.pageNum = 0;
        this.pageSize = 12;
    }

    componentDidMount() {
        if (this.props.authInfo
            && Object.keys(this.props.authInfo).length > 0) {
                this.handleSearchHardwareProductsInfoList({});

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

    // 获取hardwareProducts基本信息
    handleSearchHardwareProductsInfoList({ pageNum = 0}) {
        if (pageNum !== 0) {
            this.setState({
                isLoadMore: true,
            })
        };
        this.setState({
            isLoading: true,
        })
        let params = {
            ownerId:999999999,
            language: this.props.intl.locale === 'zh-cn' ? 'zh' : 'en',
            fromResult: pageNum * this.pageSize,
            sizeResult: this.pageSize,
            queryPurpose:'RT-ACCESS',
            publishStatus:3
        }

        this.pageNum = pageNum;

        searchHardwareProductsInfoList(params).then((data) => {
            let hardwareProductsBasicInfoList = data.hardwareProductsBasicInfoList;
            this.setState({
                isLoading: false,
                isLoadMore: false,
                hardwareProductsBasicInfoList: pageNum == 0 ? hardwareProductsBasicInfoList : this.state.hardwareProductsBasicInfoList.concat(hardwareProductsBasicInfoList),
                totalCount: data.totalCount,
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
        const { totalCount, hardwareProductsBasicInfoList } = this.state;
        if (hardwareProductsBasicInfoList.length < totalCount) {
            this.handleSearchHardwareProductsInfoList({
                pageNum: ++this.pageNum,
            });
        }
    }

    handleHardwareProductsSelect(hardwareProductClassInfo) {
        this.props.onRequestClose();
        let vm = this.props.vm
        if (vm) {
            vm.deviceEngine.sendWindowMessage({
                action: 'open-document',
                args: {
                    url:hardwareProductClassInfo.hardwareProductsLink
                }
            });
        }
    }

    render() {
        const {
            hardwareProductsBasicInfoList,
            isLoading,
            isLoadMore,
        } = this.state;

        const {
            intl,
        } = this.props;

        return (
            <div className={styles.listContent} onScroll={this.handleScroll}
            >
                <div className={styles.scrollBox}>
                    <Box
                        style={{ flex: '1 1' }}
                        className={styles.libraryScrollGrid}
                    >
                        {
                            hardwareProductsBasicInfoList.length > 0
                            && hardwareProductsBasicInfoList.map((dataItem, index) => {
                                return (
                                    <HardwareProductsItem
                                        hardwareProductClassInfo={dataItem}
                                        onSelect={this.handleHardwareProductsSelect}
                                        className={styles.libraryTipsItem}
                                        id={dataItem.hardwareProductsUUID}
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

HardwareProductsList.propTypes = {
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
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
};

HardwareProductsList.defaultProps = {
    
};

const mapStateToProps = state => {
    const user = state.session && state.session.session && state.session.session.user;
    return {
        vm: state.scratchGui.vm,
        authInfo: state.scratchGui.loginRegister.authInfo,
        userInfo: state.scratchGui.loginRegister.userInfo,
    }
};

const mapDispatchToProps = dispatch => ({
    onSetTab: tab => dispatch(setUserTab(tab)),
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(HardwareProductsList));
