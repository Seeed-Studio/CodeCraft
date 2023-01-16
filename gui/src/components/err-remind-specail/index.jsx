import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

const ErrRemindComponent = ({ errComponentMsg }) => (
  <div className={classNames(styles.offLineRemind, !!errComponentMsg && styles.setOffLineRemind)}>{errComponentMsg}
  </div>
)

export default ErrRemindComponent;