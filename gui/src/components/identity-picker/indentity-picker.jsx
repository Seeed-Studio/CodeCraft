import React from 'react';
import classNames from 'classnames';
import styles from './indentity-picker.css';
import bindAll from 'lodash.bindall';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

const localeMessages = defineMessages({
  label: {
    id: 'gui.Setting.Indentity.label',
    defaultMessage: 'Status'
  },
  teacher: {
    id: 'gui.Setting.Indentity.Teacher',
    defaultMessage: 'Teacher'
  },
  student: {
    id: 'gui.Setting.Indentity.Student',
    defaultMessage: 'Student'
  }
});

const IDENTIFY_VALUES = ['T', 'S'];

class IdentityPicker extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleIndentitySelect',
      'handleShowIndentityPick'
    ]);

    this.state = {
      identityValue: this.props.identityValue
    }
  }
  handleIndentitySelect(value) {
    this.setState({
      identityValue: IDENTIFY_VALUES[value]
    });
    this.props.onIdentityChange(IDENTIFY_VALUES[value]);
  }
  handleShowIndentityPick() {
    this.props.onShowIdentityPick();
  }

  render() {

    const { identityValue = 'T' } = this.state;
    const { onShowGenderPick, isShowIdentityPicker } = this.props;

    return (
      <div className={classNames(styles.genderpickContainer, isShowIdentityPicker && styles.genderpickContainerActive, this.props.className)}>
        <div className={styles.dateLabel}>
          <span>{this.props.intl.formatMessage(localeMessages.label)}</span>
        </div>
        <div className={styles.dpContainer} onClick={this.handleShowIndentityPick}>
          <div className={styles.dpText}>
            {identityValue === 'S' ? this.props.intl.formatMessage(localeMessages.student) : this.props.intl.formatMessage(localeMessages.teacher)}
            <img src={require('./ico-arrow.png')} className={styles.indentityArrow} alt="" />
          </div>
          <div className={styles.dpSelectContainer}>
            {[this.props.intl.formatMessage(localeMessages.teacher), this.props.intl.formatMessage(localeMessages.student)].map((item, index) => {
              return <div className={classNames(styles.genderItem, identityValue === index && styles.genderItemActive)} key={index} onClick={() => this.handleIndentitySelect(index)}>
                {item}
                {identityValue === IDENTIFY_VALUES[index] && <img src={require('./icon-active.png')} alt="" className={styles.iconActive} />}
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }
}


export default injectIntl(IdentityPicker);