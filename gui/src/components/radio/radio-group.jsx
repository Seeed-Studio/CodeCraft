import React, { Component } from 'react';
import classNames from 'classnames';
import styles from "./radio-group.css"

class RadioGroup extends Component {

    handleActiveChange(value) {
        this.props.onChange(value)
    }

    render() {

        const {
            orientation = 'horizontal'
        } = this.props;


        return (
            <div className={classNames(
                styles.radioGroupWrap,
                {
                    [styles.orizontal]: orientation == 'horizontal'
                },
                {
                    [styles.vertical]: orientation == 'vertical'
                }
            )}>
                {
                    React.Children.map(this.props.children, child => {
                        let isActive = this.props.active === child.props.value ? true : false
                        return React.cloneElement(child, {
                            label: child.props.children,
                            value: child.props.value,
                            active: isActive,
                            onClick: this.handleActiveChange.bind(this)
                        })
                    })
                }
            </div>
        )
    }

}
export default RadioGroup;