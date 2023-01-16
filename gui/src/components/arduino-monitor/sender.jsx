import React from 'react';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';

import styles from './sender.css';

import Button from '../button-special/button.jsx';

class Sender extends React.Component {
    constructor(props) {
        super(props);
        this.inputEl = null;
        this.onSend = this.onSend.bind(this);
    }

    onSend() {
        let msg = this.inputEl.value;
        this.inputEl.value = '';
        this.props.sendMessage(msg);
    }

    render() {

        return (
            <div className={classNames(styles.sender)}>
                <input type="text" className={classNames(styles.senderInput)} ref={el => this.inputEl = el} />
                <Button className={classNames(styles.serialSendBt)} onClick={this.onSend}>
                    <FormattedMessage
                        id='gui.arduinoMonitor.send'
                        defaultMessage='Send'
                    />
                </Button>
            </div>
        );
    }
}

export default Sender;