import classNames from 'classnames';
import React from 'react';
import styles from './tag-select.css';
import bindAll from 'lodash.bindall';
import PropTypes, { func } from 'prop-types';
import { injectIntl } from 'react-intl';

/**
 * onListOpen 列表打开回调
 * onListClose 列表关闭回调
 * onChange 选中改变回调
 * list 列表数组对象 [{value,label, [...args] }]
 * notListLabel 列表为空时的提示语
 * label 显示的文本
 * disabled 禁用
 */
class TagSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isListShow: false,
            selectedItem: [],
        }
        bindAll(this, [
            'listHide',
            'listShow',
            'clearSelectedItem'
        ]);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.tagList !== prevProps.tagList) {
    //         if (this.props.tagList.length == 0) {
    //             this.setState({ selectedItem: [] });
    //         }
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if (this.props.open !== nextProps.open) {
            this.setState({
                isListShow: nextProps.open,
            })
        }
        if (this.props.tagList !== nextProps.tagList) {
            if (nextProps.tagList.length == 0) {
                this.setState({ selectedItem: [] });
            }
        }
    }

    listHide(e) {
        e.stopPropagation();
        this.setState({
            isListShow: false
        });
        if (this.props.onListClose) {
            this.props.onListClose();
        }
    }

    listShow(e) {
        e.stopPropagation();
        this.setState({
            isListShow: true
        });
        if (this.props.onListOpen) {
            this.props.onListOpen();
        }

        // const documentClick = () => {
        //     this.listHide();
        //     document.removeEventListener('click', documentClick);
        // }
        // document.addEventListener('click', documentClick);
    }

    clearSelectedItem(e) {
        e.stopPropagation();
        this.setState({
            selectedItem: []
        }, () => {
            this.props.onChange('');
        });
    }

    onItemClick(item, e) {
        const { selectedItem } = this.state;
        const itemIndex = selectedItem.indexOf(item.value);
        if (itemIndex === -1) {
            selectedItem.push(item.value);
        } else {
            selectedItem.splice(itemIndex, 1);
        }
        this.setState({ selectedItem }, () => {
            this.props.onChange(item.value);
        });
    }

    render() {
        const { 
            disabled,
            className,
            selectListStyles,
            title,
            tagList
        } = this.props;

        const { selectedItem, isListShow } = this.state;
        let list = this.props.list;
        if (list.length === 0) {
            list = [{ value: 'none', label: this.props.notListLabel || 'none' }];
        }

        return (
            <div
                className={classNames(
                    styles.select,
                    disabled && styles.disabled,
                    isListShow ? styles.listShow : styles.listHide,
                    className
                )}
                onClick={(e) => {
                    isListShow ? this.listHide(e) : this.listShow(e)
                }}
            >
                <div className={classNames(
                    styles.title,
                    selectedItem.length > 0 ? styles.blue : styles.black)
                }>
                    {`${title}${selectedItem.length > 0 ? `（${selectedItem.length}）` : ''}`}
                </div>

                <div className={styles.arrow} style={{ width: selectedItem.length > 0 ? '2.5rem' : '1rem' }}>
                    {
                        selectedItem.length > 0 &&
                        <span className={styles.tagClosed} onClick={this.clearSelectedItem} />
                    }
                    <img className={styles.icon} src={require(isListShow ? './image/icon_arrowup.svg' : './image/icon_arrowdown.svg')} />
                </div>

                <div className={classNames(styles.list, selectListStyles)}>
                    <img src={require('./image/icon_del.png')} onClick={this.listHide} alt="" />
                    {
                        list.map((item, index) => {
                            let selected = tagList.indexOf(item.value) === -1 ? false : true;
                            return (
                                <div
                                    className={styles.listItem}
                                    key={index}
                                    onClick={item.value === 'none' ? null : this.onItemClick.bind(this, item)}
                                >
                                    {
                                        selected ? <span className={styles.checked} /> : <span className={styles.unchecked} />
                                    }
                                    <span className={styles.value}>{item.label}</span>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

TagSelect.propTypes = {
    onListClose: PropTypes.func,
    onListOpen: PropTypes.func,
    value: PropTypes.string,
    list: PropTypes.array,
    open: PropTypes.bool
}

export default injectIntl(TagSelect);

