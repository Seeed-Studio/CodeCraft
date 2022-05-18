import React from 'react';
import classNames from 'classnames';
import styles from './datepicker.css';
import bindAll from 'lodash.bindall';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';



class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: props.year,
      month: props.month,
      day: props.day,
      dayList: 31,
      yearList: props.yearList,
      daysMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //每月对应的天数

      showYear: false,
      showMonth: false,
      showDay: false,
    };

    bindAll(this, [
      'handelChangeYear',
      'handelChangeMonth',
      'handelChangeDay',
      'handelChangeDay',
      'handleYearClick',
      'handleMonthClick',
      'handleDayClick'
    ])
  }

  componentDidMount() {
    this.changeYear(this.props.year);
    this.monthChange(this.props.month);
    this.changeDay(this.props.day);
  }

  handleYearClick(e) {
    e.stopPropagation();
    this.setState({
      showYear: true,
      showMonth: false,
      showDay: false,
    })
  }
  handleMonthClick(e) {
    e.stopPropagation();
    this.setState({
      showYear: false,
      showMonth: true,
      showDay: false,
    })

  }
  handleDayClick(e) {
    e.stopPropagation();
    this.setState({
      showYear: false,
      showMonth: false,
      showDay: true,
    })
  }

  handelChangeYear(e, value) {
    e.stopPropagation();
    this.changeYear(value);

    this.setState({
      showYear: false
    })
  }

  changeYear(value) {
    let { year, month, day, dayList } = this.state;
    // year = Number(year);
    // month = Number(month);
    // day = Number(day);
    const yearVal = Number(value);
    const monthIndex = this.state.month - 1;

    if ((yearVal % 4 === 0 && yearVal % 100 !== 0) || (yearVal % 400 === 0)) {
      this.state.daysMonth[1] = 29;
    } else {
      this.state.daysMonth[1] = 28

    }
    const dayListVal = this.state.daysMonth[monthIndex];

    this.props.onDateChange('borthYear', value);

    this.setState({
      year: value,
      dayList: dayListVal
    });
    if (!((yearVal % 4 === 0 && yearVal % 100 !== 0) || (yearVal % 400 === 0)) && (month == 2) && (day > 28)) {
      this.setState({
        day: '01'
      }, () => {
        // this.props.callback(value, this.state.month, this.state.day);
        this.props.onDateChange('borthDay', this.state.day);
      });
    }
  }


  handelChangeMonth(e, value) {
    e.stopPropagation();
    this.monthChange(value);

    this.setState({
      showMonth: false
    })
  }

  monthChange(value) {
    let { year, month, day, dayList } = this.state;
    // year = Number(year);
    // day = Number(day);
    // value = Number(value);
    const monthIndex = Number(value) - 1;
    const yearVal = Number(year);

    if ((yearVal % 4 === 0 && yearVal % 100 !== 0) || yearVal % 400 === 0) {
      this.state.daysMonth[1] = 29;
    } else {
      this.state.daysMonth[1] = 28;
    }
    const dayListVal = this.state.daysMonth[monthIndex];

    this.props.onDateChange('borthMonth', value);
    this.setState({
      month: value,
      dayList: dayListVal
    });
    if (!((yearVal % 4 === 0 && yearVal % 100 !== 0) || (yearVal % 400 === 0)) && (value == 2) && (day > 28)) {
      this.setState({
        day: '01'
      }, () => {
        this.props.onDateChange('borthDay', this.state.day);
      });
    }

    if (((value == '04') || (value == '06') || (value == '09') || (value == '11')) && (day > '30')) {
      this.setState({
        day: '01'
      }, () => {
        this.props.onDateChange('borthDay', this.state.day);

      });
    }
  }


  handelChangeDay(e, value) {
    e.stopPropagation();
    this.changeDay(value);

    this.setState({
      showDay: false
    })
  }

  changeDay(value) {
    const year = this.state.year;

    this.setState({
      day: value
    });
    // this.props.callback(this.state.year, this.state.month, value);
    this.props.onDateChange('borthDay', value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShowDatePicker === false) {
      this.setState({
        showYear: false,
        showMonth: false,
        showDay: false,
      })
    }
  }


  render() {
    const list = [];
    const listYear = [];
    for (let j = this.state.yearList[0]; j <= this.state.yearList[1]; j++) {
      listYear.unshift(j);
    }


    for (let i = 1; i <= this.state.dayList; i++) {
      i = String(i);
      if (i.length === 1) {
        i = '0' + i;
      }
      list.push(i);
    }

    // console.log('listYear', listYear)
    const { year, month, day, showYear, showMonth, showDay } = this.state;

    return (
      <div className={styles.selectContainer}>
        <div className={classNames(styles.select, showYear && styles.selectActive)} onClick={this.handleYearClick}>
          <div className={styles.selectItemTitle}>{year}
            <FormattedMessage
              defaultMessage="Year"
              description=""
              id="gui.loginModal.setting.year" />
            <img src={require('./ico-arrow.png')} alt="" className={styles.arrow} />
          </div>
          <div className={styles.selectItemContainer}>
            {
              listYear.map((yearItem, index) => {
                return (<div className={classNames(styles.selectItem, (year == yearItem) && styles.selectItemSelected)} key={index} onClick={(e) => this.handelChangeYear(e, yearItem)}>{yearItem} {(year == yearItem) && <img src={require('./icon-active.png')} alt="" className={styles.iconActive} />}</div>);
              })
            }
          </div>
        </div>
        <div className={classNames(styles.select, showMonth && styles.selectActive)} onClick={this.handleMonthClick}>
          <div className={styles.selectItemTitle}>{month}
            <FormattedMessage
              defaultMessage="Month"
              description=""
              id="gui.loginModal.setting.month" />
            <img src={require('./ico-arrow.png')} alt="" className={styles.arrow} />
          </div>
          <div className={styles.selectItemContainer}>
            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((monthItem, index) => {
              return <div className={classNames(styles.selectItem, (month == monthItem) && styles.selectItemSelected)} key={index} onClick={(e) => this.handelChangeMonth(e, monthItem)}>{monthItem} {(month == monthItem) && <img src={require('./icon-active.png')} alt="" className={styles.iconActive} />}</div>
            })}
          </div>
        </div>
        <div className={classNames(styles.select, showDay && styles.selectActive)} onClick={this.handleDayClick}>
          <div className={styles.selectItemTitle}>{day}
            <FormattedMessage
              defaultMessage="Day"
              description=""
              id="gui.loginModal.setting.day" />
            <img src={require('./ico-arrow.png')} alt="" className={styles.arrow} />
          </div>
          <div className={styles.selectItemContainer}>
            {
              list.map((dayItem, index) => {
                return (<div className={classNames(styles.selectItem, (day == dayItem) && styles.selectItemSelected)} key={index} onClick={(e) => this.handelChangeDay(e, dayItem)}>{dayItem} {(day == dayItem) && <img src={require('./icon-active.png')} alt="" className={styles.iconActive} />}</div>);
              })
            }
          </div>
        </div>
      </div>
    )
  }
}


Calendar.defaultProps = {
  year: 2017,
  month: 1,
  day: 1,
  yearList: [2000, 2020]
}


class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    }
    bindAll(this, [
      'changeFun',
      'handleShowDatePick'
    ]);
  }


  changeFun(year, month, day) {
    // console.log(year, month, day);
  }
  handleShowDatePick() {
    this.props.onShowDatePick();
  }

  render() {
    return (
      // <Calendar year={2018} month={1} day={1} yearList={[1980, this.state.date.getFullYear()]} callback={this.changeFun}
      //   onDateChange={this.props.onDateChange}
      // />
      <div className={classNames(styles.datepickContainer, this.props.isShowDatePicker && styles.datepickContainerActive, this.props.className)}>
        <div className={styles.dateLabel}>
          <FormattedMessage
            defaultMessage="Date of Birth"
            description=""
            id="gui.loginModal.setting.birthday" />
        </div>
        <div className={styles.dpContainer} onClick={this.handleShowDatePick}>
          <div className={styles.dpText}>
            {this.props.borthDayValue}
            <img src={require('./ico-arrow.png')} className={styles.iconArrow} alt=""/>
          </div>
          <div className={styles.dpSelectContainer}>
            <Calendar
              year={this.props.borthYear ? this.props.borthYear : '2018'}
              month={this.props.borthMonth ? this.props.borthMonth : '01'}
              day={this.props.borthDay ? this.props.borthDay : '01'}
              yearList={[this.state.date.getFullYear() - 100, this.state.date.getFullYear()]}
              callback={this.changeFun}
              onDateChange={this.props.onDateChange}
              isShowDatePicker={this.props.isShowDatePicker}
            />
          </div>
        </div>
      </div>
    )
  }
}


export default DatePicker;