
import styles from './modify-input.css';
import React, { Component } from "react";
const maxLength = 3



const modifyInput = (props) => {
    const locationLeft = props.locationLeft
    const locationTop = props.locationTop

    let locationStyles = {
        left:`${locationLeft}rem`,
        top:`${locationTop}rem`
    }
    return (
        <div style={locationStyles} className={styles.modifyInputItem} >
            <div onClick={props.handleReduceValue} className={styles.red}>-</div>
            <input 
                maxLength={maxLength}
                className={styles.val} 
                value={props.value}
                onChange={props.onChange}
            />
            <div onClick={props.handleAddValue} className={styles.add}>+</div>
        </div>
    );
}
export default modifyInput;