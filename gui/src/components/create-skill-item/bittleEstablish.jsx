import React, { Component } from "react";
import Body from './img/body.png'
import Head from './img/head.png'
import rightLeg from './img/foreleg.png'
import upperLeg from './img/Leftforeleg.png'
import leftLeg from './img/Rightforeleg.png'
import bindAll from 'lodash.bindall';
import styles from './bittleEstablish.css';


const bittleEstablish = (props) => {
    return (
        <div className={styles.content}>
            <img className={styles.newBody} src={Body} />
            <div className={styles.checkHeadNumber}>0</div>
            <img id={props.jointIdFrom.newHead} className={styles.newHead} src={Head} />
            {/* 分割线 */}

            <div id={props.jointIdFrom.newRightForeleg} className={styles.newRightForeleg}>
                <div className={styles.rightForelegLowerNumber}>8</div>
                <div className={styles.rightForelegUpperNumber}>12</div>
                <img className={styles.rightForelegLowerNum} id={props.jointIdFrom.rightForelegLowerNum}   src={rightLeg} />
                <img className={styles.rightForelegUpperNum} id={props.jointIdFrom.rightForelegUpperNum}  src={upperLeg} />
            </div>
            {/* 分割线 */}
            <div  id={props.jointIdFrom.newLeftForele}  className={styles.newLeftForele}>
                <div className={styles.leftForelegLowerNumber}>9</div>
                <div className={styles.leftForelegUpperNumber}>13</div>
                <img className={styles.leftForelegLowerNum} id={props.jointIdFrom.leftForelegLowerNum}  src={leftLeg} />
                <img className={styles.leftForelegUpperNum} id={props.jointIdFrom.leftForelegUpperNum}  src={upperLeg} />
            </div>

            {/* 分割线 */}
            <div  id={props.jointIdFrom.newLeftHindleg} className={styles.newLeftHindleg}>
                <div className={styles.leftHindlegLowerNumber}>10</div>
                <div className={styles.leftHindlegUpperNumber}>14</div>
                <img className={styles.leftHindlegLowerNum} id={props.jointIdFrom.leftHindlegLowerNum} src={leftLeg} />
                <img className={styles.leftHindlegUpperNum} id={props.jointIdFrom.leftHindlegUpperNum} src={upperLeg} />
            </div>
            {/* 分割线 */}
            <div  id={props.jointIdFrom.newRightHindleg} className={styles.newRightHindleg}>
                <div className={styles.rightHindlegLowerNumber}>11</div>
                <div className={styles.rightHindlegUpperNumber}>15</div>
                <img className={styles.rightHindlegLowerNum} id={props.jointIdFrom.rightHindlegLowerNum}  src={rightLeg} />
                <img className={styles.rightHindlegUpperNum} id={props.jointIdFrom.rightHindlegUpperNum}  src={upperLeg} />
            </div>

       </div>
    );
}
export default bittleEstablish;
