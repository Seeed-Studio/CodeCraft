import React from 'react';
import styles from './progress.css';

export default class Progress extends React.Component {
  render() {
    return <div className={styles.progressBg}>
      <div className={styles.progress} style={{ width: this.props.percent + '%' }}></div>
    </div>
  }
}