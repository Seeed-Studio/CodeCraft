import classNames from 'classnames';
import React from 'react';
import styles from './selector.css';
import bindAll from 'lodash.bindall';
import Ellipsis from '../ellipsis/index.js';
import PropTypes, { func } from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
    none: {
        id: 'gui.projectPage.none',
        defaultMessage: 'None',
        description: '无'
    },
})

/**
 * onListOpen 列表打开回调
 * onListClose 列表关闭回调
 * onChange 选中改变回调
 * list 列表数组对象 [{value,label, [...args] }]
 * notListLabel 列表为空时的提示语
 * label 显示的文本
 * disabled 禁用
 */
class Selector extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            isListShow: false,
            selectedItem: null,
        }
        bindAll(this, [
            'listHide',
            'listShow',
        ]);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.open !== nextProps.open) {
            this.setState({
                isListShow: nextProps.open,
            })
        }
        if (this.props.list !== nextProps.list) {
            this.setState({
                selectedItem: null,
            })
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
    }

    onItemClick(item, index, e) {
        this.setState({ selectedItem:item });
        if(this.props.onChange){
            this.props.onChange(item,index);
        }
    }

    render() {
        const { 
            intl,
            disabled,
            className,
            selectListStyles,
            height,
            list,
            defaultItemIndex=0,
        } = this.props;

        const { isListShow,selectedItem } = this.state;
        
        return (
            <div
                className={classNames(
                    styles.select,
                    disabled && styles.disabled,
                    className
                )}
                style={{ height: height }}
                onClick={list&&list.length>0?(e) => {
                    isListShow ? this.listHide(e) : this.listShow(e)
                }:null}
            >
                <div className={styles.title} style={{ lineHeight: height }}>
                    <Ellipsis tooltip lines={1} parentId={`selectorLabel`}>
                        {selectedItem ? selectedItem.label :
                            list && list.length > 0 ? list[defaultItemIndex].label :
                                intl.formatMessage(messages.none)}
                    </Ellipsis>
                </div>

                <div className={styles.arrow}>
                    <img className={styles.icon} src={require(isListShow ? './image/icon_arrowup.svg' : './image/icon_arrowdown.svg')} />
                </div>

                {
                    list && list.length > 0 ? <div className={classNames(
                        styles.list,
                        selectListStyles,
                        isListShow ? styles.listShow : styles.listHide,
                    )}>
                        {
                            list.map((item, index) => {
                                return (
                                    <div
                                        className={styles.listItem}
                                        key={index}
                                        style={{ height: height,lineHeight: height }}
                                        onClick={this.onItemClick.bind(this, item, index)}
                                    >
                                        <Ellipsis tooltip lines={1} parentId={`selector_${index}`}>
                                            {item.label}
                                        </Ellipsis>
                                    </div>
                                )
                            })
                        }
                    </div> : null
                }
            </div>
        )
    }

}

Selector.propTypes = {
    onListClose: PropTypes.func,
    onListOpen: PropTypes.func,
    value: PropTypes.string,
    list: PropTypes.array,
    open: PropTypes.bool
}

export default injectIntl(Selector);

