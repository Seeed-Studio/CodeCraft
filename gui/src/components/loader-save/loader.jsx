import React from 'react';
import styles from './loader.css';

const LoaderComponent = () => {
    return (<div className={styles.background}
        onClick={e => {
            e.preventDefault();
            e.stopPropagation();
        }} />);
}

export default LoaderComponent;
