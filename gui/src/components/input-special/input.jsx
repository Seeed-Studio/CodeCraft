import React from 'react';
import styles from './input.css';
import bindAll from 'lodash.bindall';
import classNames from 'classnames';


export default class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleFocus',
      'handleBlur',
      'handelChange',
    ]);

    this.state = {
      isFocus: false,
    }
  }

  handleFocus() {
    this.setState({
      isFocus: true
    }, () => {
      if(this.props.onFocus) {
        this.props.onFocus();
      }
    })
  }
  handleBlur(e) {
    this.setState({ isFocus: false });
    if(this.props.onBlur) {
      this.props.onBlur(e.target.value);
    }
  }
  handelChange(e) {
    if(this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    return <input type="text"
      className={classNames(styles.input, this.state.isFocus && styles.isFocus, this.props.className)}
      style={this.props.style}
      placeholder={this.props.placeholder}
      disabled={this.props.disabled}
      value={this.props.value}
      defaultValue={this.props.defaultValue}
      id={this.props.id}
      type={this.props.type}
      maxLength={this.props.maxLength}
      onChange={this.handelChange}
      onKeyUp={this.props.onkeyup}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
    />
  }
}