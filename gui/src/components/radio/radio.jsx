import React, { Component } from 'react';
import classNames from 'classnames';
import styles from "./radio.css"
class Radio extends Component {
    render() {
        return (
            <div className={styles.radioWrap} onClick={this.props.onClick.bind(this, this.props.value)}>
                <div className={styles.left}>
                    <div className={classNames(styles.circle, {
                        [styles.active]: this.props.active === true
                    })}/>
                    <div className={styles.label}>{this.props.label}</div>
                </div>
            </div>
        )
    }
}
export default Radio;