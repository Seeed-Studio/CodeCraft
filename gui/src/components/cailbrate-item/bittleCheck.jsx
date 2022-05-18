import React, { Component } from "react";
import Body from './img/body.png'
import Head from './img/head.png'
import rightLeg from './img/foreleg.png'
import upperLeg from './img/Leftforeleg.png'
import leftLeg from './img/Rightforeleg.png'
import bindAll from 'lodash.bindall';
import styles from './bittleCheck.css';
import ModifyInput from '../modify-Input/modify-input.jsx';
import preview from './img/preview.png'


const bittleEstablish = (props) => {
    return (
        <div className={styles.content}>
            <img className={styles.preview} src={preview} />
            <img className={styles.checkBody} src={Body} />
            <div className={styles.checkHeadNumber}>0</div>
            <img id={props.jointIdFrom.checkHead} className={styles.checkHead} src={Head} />
            {/* 分割线 */}
            <div className={styles.rightForelegLowerNumber}>9</div>
            <div className={styles.rightForelegUpperNumber}>13</div>
            <div id={props.jointIdFrom.checkRightForeleg} className={styles.checkRightForeleg}>
                <img className={styles.rightForelegLowerNum} id={props.jointIdFrom.rightForelegLowerNum}   src={rightLeg} />
                <img className={styles.rightForelegUpperNum} id={props.jointIdFrom.rightForelegUpperNum}  src={upperLeg} />
            </div>
            {/* 分割线 */}
            <div className={styles.leftForelegLowerNumber}>8</div>
            <div className={styles.leftForelegUpperNumber}>12</div>
            <div  id={props.jointIdFrom.checkLeftForeleg}  className={styles.checkLeftForeleg}>
                <img className={styles.leftForelegLowerNum} id={props.jointIdFrom.leftForelegLowerNum}  src={leftLeg} />
                <img className={styles.leftForelegUpperNum} id={props.jointIdFrom.leftForelegUpperNum}  src={upperLeg} />
            </div>

            {/* 分割线 */}
            <div className={styles.leftHindlegLowerNumber}>10</div>
            <div className={styles.leftHindlegUpperNumber}>14</div>
            <div  id={props.jointIdFrom.checkLeftHindleg} className={styles.checkLeftHindleg}>
                <img className={styles.leftHindlegLowerNum} id={props.jointIdFrom.leftHindlegLowerNum} src={leftLeg} />
                <img className={styles.leftHindlegUpperNum} id={props.jointIdFrom.leftHindlegUpperNum} src={upperLeg} />
            </div>
            {/* 分割线 */}
            <div className={styles.rightHindlegLowerNumber}>11</div>
            <div className={styles.rightHindlegUpperNumber}>15</div>
            <div  id={props.jointIdFrom.checkRightHindleg} className={styles.checkRightHindleg}>
                <img className={styles.rightHindlegLowerNum} id={props.jointIdFrom.rightHindlegLowerNum}  src={rightLeg} />
                <img className={styles.rightHindlegUpperNum} id={props.jointIdFrom.rightHindlegUpperNum}  src={upperLeg} />
            </div>

       </div>
    );
}
export default bittleEstablish;
