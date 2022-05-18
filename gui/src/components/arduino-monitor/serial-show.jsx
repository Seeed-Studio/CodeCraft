import React from 'react'
import classNames from 'classnames';
import styles from './serial-show.css';


class SerialShow extends React.Component {
    constructor(props) {
        super();

        this.state = {
            data: []
        }

        this.serialShowEl = null;
        this.showTime = false;
        this.setSerialShow = this.setSerialShow.bind(this);
    }

    setSerialShow(el) {
        this.serialShowEl = el;
        this.props.setSerialShow(el);
    }

    render() {
        return (
            <pre className={classNames(styles.serialShow)} ref={this.setSerialShow}>
            </pre>
        );
    }
}

export default SerialShow;
