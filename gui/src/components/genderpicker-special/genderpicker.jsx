import React from 'react';
import classNames from 'classnames';
import styles from './genderpicker.css';
import bindAll from 'lodash.bindall';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

const localeMessages = defineMessages({
  male: {
    id: 'gui.loginModal.sexs.male',
    defaultMessage: 'male'
  },
  female: {
    id: 'gui.loginModal.sexs.female',
    defaultMessage: 'female'
  }
});

class GenderPicker extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleGenderSelect',
      'handleShowGenderPick'
    ]);

    this.state = {
      genderValue: this.props.genderValue
    }
  }
  handleGenderSelect(value) {
    this.setState({
      genderValue: value
    })
    this.props.onGenderChange(value);
  }
  handleShowGenderPick() {
    this.props.onShowGenderPick();
  }

  render() {
    const { genderValue } = this.state;
    const { onShowGenderPick, isShowGenderPicker } = this.props;
    return (
      // <Calendar year={2018} month={1} day={1} yearList={[1980, this.state.date.getFullYear()]} callback={this.changeFun}
      //   onDateChange={this.props.onDateChange}
      // />
      <div className={classNames(styles.genderpickContainer, isShowGenderPicker && styles.genderpickContainerActive, this.props.className)}>
        <div className={styles.dateLabel}>
         <FormattedMessage
                defaultMessage="Gender"
                description=""
                id="gui.loginModal.setting.sex"
              /></div>
        <div className={styles.dpContainer} onClick={this.handleShowGenderPick}>
          <div className={styles.dpText}>
            {genderValue === 0 ? this.props.intl.formatMessage(localeMessages.female) : this.props.intl.formatMessage(localeMessages.male)}
            <img src={require('./ico-arrow.png')} className={styles.genderArrow} alt="" />
          </div>
          <div className={styles.dpSelectContainer}>
            {[this.props.intl.formatMessage(localeMessages.female), this.props.intl.formatMessage(localeMessages.male)].map((item, index) => {
              return <div className={classNames(styles.genderItem, genderValue === index && styles.genderItemActive)} key={index} onClick={() => this.handleGenderSelect(index)}>
                {item}
                {genderValue === index && <img src={require('./icon-active.png')} alt="" className={styles.iconActive} />}
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }
}


export default injectIntl(GenderPicker);