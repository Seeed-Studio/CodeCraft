import React from 'react';
import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

import styles from './control-bar.css';

const localMessages = defineMessages({
    baudRate: {
        id: 'gui.arduinoMonitor.baudRate',
        defaultMessage: 'Baud rate',
        description: ''
    }
});

const ControlBar = props => {
    const { onScroll, onShowTime, onClear, isScroll, isShowTime, onChangeBaud, baudRate } = props;
    let baudRateText = props.intl.formatMessage(localMessages.baudRate);

    return (
        <div className={classNames(styles.controlBar)}>
            <label className={classNames(styles.cbBox, styles.scrollCb)}>
                <div className={classNames(styles.cb, isScroll ? styles.cbChecked : null)} onClick={onScroll} />
                <span>
                    <FormattedMessage
                        defaultMessage='Automatic scrolling'
                        description=''
                        id='gui.arduinoMonitor.autoScroll'
                    />
                </span>
            </label>

            <label className={classNames(styles.cbBox, styles.timeCb)}>
                <div className={classNames(styles.cb, isShowTime ? styles.cbChecked : null)} onClick={onShowTime} />
                <span>
                    <FormattedMessage
                        defaultMessage='Display timestamp'
                        description=''
                        id='gui.arduinoMonitor.showTime'
                    />
                </span>
            </label>

            <label className={classNames(styles.btBox)}>
                <div className={classNames(styles.clearBt)} onClick={onClear}>

                    <FormattedMessage
                        defaultMessage='Clear the output'
                        description=''
                        id='gui.arduinoMonitor.clean'
                    />
                </div>
            </label>

            <label className={classNames(styles.sltBox)}>
                <div
                    className={classNames(styles.select)}
                    onClick={onChangeBaud}
                >
                    {`${baudRate} ${baudRateText}`}
                </div>
            </label>
        </div>
    );
}
export default injectIntl(ControlBar);