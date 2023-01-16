import classNames from 'classnames';
import React from 'react';
import styles from './select.css';
import bindAll from 'lodash.bindall';
import PropTypes, { func } from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

/**
 * onListOpen 列表打开回调
 * onListClose 列表关闭回调
 * onChange 选中改变回调
 * list 列表数组对象 [{value,label, [...args] }]
 * notListLabel 列表为空时的提示语
 * label 显示的文本
 * disabled 禁用
 */
class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isListShow: false,
            selectItem: null,
        }
        bindAll(this, [
            'onSelectClick',
            'onItemClick',
            'listHide',
            'listShow'
        ]);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    listHide() {
        this.setState({
            isListShow: false
        });
        if (this.props.onListClose) {
            this.props.onListClose();
        }
    }

    listShow() {
        this.setState({
            isListShow: true
        });
        if (this.props.onListOpen) {
            this.props.onListOpen();
        }

        const documentClick = () => {
            this.listHide();
            document.removeEventListener('click', documentClick);
        }
        document.addEventListener('click', documentClick);
    }

    onSelectClick(e) {
        // e.stopPropagation();
        if (this.state.isListShow) {
            this.listHide();
        } else {
            this.listShow();
        }
    }


    onItemClick(e) {
        let index = e.target.getAttribute('data-index');
        let item = this.props.list[index];
        if (this.props.onChange) {
            this.props.onChange(item);
        }
    }

    render() {
        const { disabled,
                className,
                selectListStyles
            } = this.props;
        let list = this.props.list;
        if (list.length === 0) {
            list = [{ value: 'none', label: this.props.notListLabel || 'none' }];
        }
        let label = this.props.label || 'Please select';

        return (
            <div
                className={classNames(
                    styles.select,
                    disabled && styles.disabled,
                    this.state.isListShow ? styles.listShow : styles.listHide,
                    className
                )}
                onClick={disabled ? null : this.onSelectClick}
                id={'selectContainer'}
            >
                <div className={classNames(styles.value)}>{label}</div>

                <div className={classNames(styles.icon)}></div>

                <div className={classNames(styles.list,selectListStyles)}>
                    {
                        list.map((item, index) => {
                            return (
                                <div
                                    className={classNames(styles.listItem)}
                                    data-index={index}
                                    key={index}
                                    onClick={item.value === 'none' ? null : this.onItemClick}
                                >
                                    {item.label}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

Select.propTypes = {
    onListClose: PropTypes.func,
    onListOpen: PropTypes.func,
    value: PropTypes.string,
    list: PropTypes.array
}

export default injectIntl(Select);

